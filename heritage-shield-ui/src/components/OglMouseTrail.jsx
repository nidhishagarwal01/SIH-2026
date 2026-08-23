import React, { useEffect, useRef } from 'react';

/**
 * 🎨 OGL / WebGL Smooth Polyline Mouse Ribbon
 * High-performance GPU-accelerated ribbon trail that fluidly follows mouse movements,
 * rendered with dynamic width tapering, additive glow blending, and heritage terracotta-gold palette.
 */
export default function OglMouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: false 
    });

    if (!gl) return;

    // Configuration
    const NUM_POINTS = 55;
    const SPRING = 0.18;
    const FRICTION = 0.82;
    const BASE_WIDTH = 22; // Ribbon max width in pixels

    // Point array with positions and velocities
    const points = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      points.push({
        x: -500,
        y: -500,
        vx: 0,
        vy: 0
      });
    }

    let mouse = { x: -500, y: -500, moved: false };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.moved) {
        mouse.moved = true;
        // Initialize all points to cursor position on first move
        for (let i = 0; i < NUM_POINTS; i++) {
          points[i].x = mouse.x;
          points[i].y = mouse.y;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Shaders
    const vsSource = `
      attribute vec2 aPosition;
      attribute vec2 aNormal;
      attribute float aSide;
      attribute float aU; // 0 (head) to 1 (tail)
      
      uniform vec2 uResolution;
      uniform float uBaseWidth;
      
      varying float vU;
      varying float vSide;

      void main() {
        vU = aU;
        vSide = aSide;
        
        // Taper line width gracefully from head to tail
        float taper = pow(1.0 - aU, 1.2);
        float currentWidth = uBaseWidth * taper;
        
        // Extrude vertices along normal vector in pixel space
        vec2 offset = aNormal * aSide * (currentWidth * 0.5);
        vec2 pixelPos = aPosition + offset;
        
        // Convert pixel coordinates to WebGL Clip Space (-1 to 1)
        vec2 clipSpace = (pixelPos / uResolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      
      varying float vU;
      varying float vSide;
      
      void main() {
        // Heritage Museum Palette Ramp:
        // Head: #FFA57E (Peach Gold) -> #E06D44 (Terracotta) -> #C85A32 (Sandstone) -> #D4AF37 (Imperial Gold Tail)
        vec3 colorHead = vec3(1.0, 0.65, 0.49);   // #FFA57E
        vec3 colorMid1 = vec3(0.88, 0.43, 0.27);  // #E06D44
        vec3 colorMid2 = vec3(0.78, 0.35, 0.20);  // #C85A32
        vec3 colorTail = vec3(0.83, 0.69, 0.22);  // #D4AF37

        vec3 color;
        if (vU < 0.35) {
          color = mix(colorHead, colorMid1, vU / 0.35);
        } else if (vU < 0.7) {
          color = mix(colorMid1, colorMid2, (vU - 0.35) / 0.35);
        } else {
          color = mix(colorMid2, colorTail, (vU - 0.7) / 0.3);
        }

        // Smooth cross-sectional feathered falloff (round ribbon edges)
        float edge = 1.0 - abs(vSide);
        edge = smoothstep(0.0, 0.7, edge);

        // Smooth longitudinal fade out towards tail
        float alpha = pow(1.0 - vU, 1.4) * edge * 0.85;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Uniforms
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uBaseWidthLoc = gl.getUniformLocation(program, 'uBaseWidth');

    // Attributes
    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    const aNormalLoc = gl.getAttribLocation(program, 'aNormal');
    const aSideLoc = gl.getAttribLocation(program, 'aSide');
    const aULoc = gl.getAttribLocation(program, 'aU');

    // Buffers
    const positionBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const sideBuffer = gl.createBuffer();
    const uBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    // Triangle strip indices
    const indices = [];
    for (let i = 0; i < NUM_POINTS - 1; i++) {
      const idx = i * 2;
      indices.push(idx, idx + 1, idx + 2);
      indices.push(idx + 2, idx + 1, idx + 3);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Pre-allocate geometry arrays
    const numVerts = NUM_POINTS * 2;
    const positions = new Float32Array(numVerts * 2);
    const normals = new Float32Array(numVerts * 2);
    const sides = new Float32Array(numVerts);
    const uValues = new Float32Array(numVerts);

    // Precompute constant UV and side values
    for (let i = 0; i < NUM_POINTS; i++) {
      const u = i / (NUM_POINTS - 1);
      sides[i * 2] = -1.0;
      sides[i * 2 + 1] = 1.0;
      uValues[i * 2] = u;
      uValues[i * 2 + 1] = u;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, sideBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sides, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, uBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uValues, gl.STATIC_DRAW);

    // Enable Blending (Additive / Semi-transparent)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animId;

    function render() {
      // 1. Spring-based physics update
      if (mouse.moved) {
        // Head point follows mouse directly
        points[0].x += (mouse.x - points[0].x) * 0.35;
        points[0].y += (mouse.y - points[0].y) * 0.35;

        // Trailing points follow preceding points with spring and friction
        for (let i = 1; i < NUM_POINTS; i++) {
          const p = points[i];
          const prev = points[i - 1];

          const dx = prev.x - p.x;
          const dy = prev.y - p.y;

          p.vx = (p.vx + dx * SPRING) * FRICTION;
          p.vy = (p.vy + dy * SPRING) * FRICTION;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // 2. Compute polyline vertex positions and normals
      for (let i = 0; i < NUM_POINTS; i++) {
        const p = points[i];
        const prev = i > 0 ? points[i - 1] : points[i];
        const next = i < NUM_POINTS - 1 ? points[i + 1] : points[i];

        // Tangent calculation
        let tx = next.x - prev.x;
        let ty = next.y - prev.y;
        let len = Math.hypot(tx, ty);

        let nx = 0;
        let ny = 0;

        if (len > 0.0001) {
          tx /= len;
          ty /= len;
          // Perpendicular normal: (-ty, tx)
          nx = -ty;
          ny = tx;
        } else {
          nx = 0;
          ny = 1;
        }

        const vIdx = i * 2;
        // Left vertex
        positions[vIdx * 2] = p.x;
        positions[vIdx * 2 + 1] = p.y;
        normals[vIdx * 2] = nx;
        normals[vIdx * 2 + 1] = ny;

        // Right vertex
        positions[(vIdx + 1) * 2] = p.x;
        positions[(vIdx + 1) * 2 + 1] = p.y;
        normals[(vIdx + 1) * 2] = nx;
        normals[(vIdx + 1) * 2 + 1] = ny;
      }

      // 3. Render WebGL frame
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, width, height);
      gl.uniform1f(uBaseWidthLoc, BASE_WIDTH);

      // Bind positions
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aPositionLoc);
      gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

      // Bind normals
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aNormalLoc);
      gl.vertexAttribPointer(aNormalLoc, 2, gl.FLOAT, false, 0, 0);

      // Bind sides
      gl.bindBuffer(gl.ARRAY_BUFFER, sideBuffer);
      gl.enableVertexAttribArray(aSideLoc);
      gl.vertexAttribPointer(aSideLoc, 1, gl.FLOAT, false, 0, 0);

      // Bind UVs
      gl.bindBuffer(gl.ARRAY_BUFFER, uBuffer);
      gl.enableVertexAttribArray(aULoc);
      gl.vertexAttribPointer(aULoc, 1, gl.FLOAT, false, 0, 0);

      // Draw ribbon
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45] w-full h-full"
    />
  );
}
