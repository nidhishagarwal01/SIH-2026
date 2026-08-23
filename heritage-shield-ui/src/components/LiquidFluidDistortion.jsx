import React, { useEffect, useRef } from 'react';

/**
 * 🌊 WebGL Liquid Distortion, Fluid Flowmaps & Dynamic Swirling Dye Trails
 * GPU-accelerated Navier-Stokes style fluid velocity simulation with vorticity,
 * refractive surface distortion, chromatic dispersion, and warm heritage molten terracotta-gold dye.
 */
export default function LiquidFluidDistortion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context with float or half-float texture extensions if available
    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    });

    if (!gl) return;

    // Simulation parameters
    const SIM_RESOLUTION = 128; // Fluid grid resolution (fast & responsive)
    const DYE_RESOLUTION = 512;
    const DENSITY_DISSIPATION = 0.975; // Rate at which dye fades
    const VELOCITY_DISSIPATION = 0.98; // Rate at which motion slows down
    const PRESSURE_ITERATIONS = 18;
    const SPLAT_RADIUS = 0.0035; // Radius of mouse splash
    const SPLAT_FORCE = 6000.0; // Force of mouse impulse
    const CURL = 28.0; // Fluid vorticity / swirliness

    // Check extensions
    const extHalfFloat = gl.getExtension('OES_texture_half_float');
    const extHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
    const extFloat = gl.getExtension('OES_texture_float');
    const extFloatLinear = gl.getExtension('OES_texture_float_linear');

    const textureType = extHalfFloat ? extHalfFloat.HALF_FLOAT_OES : (extFloat ? gl.FLOAT : gl.UNSIGNED_BYTE);
    const filterType = (extHalfFloatLinear || extFloatLinear) ? gl.LINEAR : gl.NEAREST;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    resize();
    window.addEventListener('resize', resize);

    // Quad geometry (Full screen)
    const quadVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    // Shader compiler helper
    function createShader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    function createProgram(vsSrc, fsSrc) {
      const p = gl.createProgram();
      const vs = createShader(gl.VERTEX_SHADER, vsSrc);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    }

    // Base Vertex Shader
    const baseVS = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 uTexelSize;

      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(uTexelSize.x, 0.0);
        vR = vUv + vec2(uTexelSize.x, 0.0);
        vT = vUv + vec2(0.0, uTexelSize.y);
        vB = vUv - vec2(0.0, uTexelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // 1. Splat Shader (Injects mouse velocity & dye)
    const splatFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float uAspectRatio;
      uniform vec3 uColor;
      uniform vec2 uPoint;
      uniform float uRadius;

      void main() {
        vec2 p = vUv - uPoint;
        p.x *= uAspectRatio;
        vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    // 2. Advection Shader (Carries velocity/dye through the flow field)
    const advectionFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;

      void main() {
        vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
        gl_FragColor = uDissipation * texture2D(uSource, coord);
      }
    `;

    // 3. Divergence Shader
    const divergenceFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main() {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // 4. Curl & Vorticity Shader (Creates organic fluid swirls)
    const curlFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main() {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float uCurl;
      uniform float uDt;

      void main() {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= uCurl * C;
        force.y *= -1.0;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
      }
    `;

    // 5. Pressure Poisson Solver Shader
    const pressureFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    // 6. Gradient Subtraction Shader
    const gradSubtractFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    // 7. Liquid Display & Chromatic Distortion Shader (Heritage Molten Gold / Terracotta / Liquid Glow)
    const displayFS = `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uDye;
      uniform sampler2D uVelocity;

      void main() {
        vec2 vel = texture2D(uVelocity, vUv).xy;
        float flowMagnitude = length(vel) * 0.0008;

        // Chromatic Refractive Distortion
        vec2 rUv = vUv + vel * 0.0004;
        vec2 gUv = vUv;
        vec2 bUv = vUv - vel * 0.0004;

        vec3 dyeR = texture2D(uDye, rUv).xyz;
        vec3 dyeG = texture2D(uDye, gUv).xyz;
        vec3 dyeB = texture2D(uDye, bUv).xyz;

        vec3 color = vec3(dyeR.r, dyeG.g, dyeB.b);

        // Specular Liquid Sheen
        float intensity = max(color.r, max(color.g, color.b));
        float liquidGlint = pow(intensity, 2.2) * 1.5;

        // Map intensity to Royal Gold/Terracotta
        vec3 moltenTerracotta = vec3(0.92, 0.44, 0.22); // #EB7038
        vec3 moltenGold = vec3(1.0, 0.82, 0.45);        // #FFD173
        vec3 liquidColor = mix(moltenTerracotta, moltenGold, smoothstep(0.1, 0.8, intensity));

        // Soft ambient glow
        vec3 finalColor = color * liquidColor + vec3(liquidGlint * 0.5);
        float alpha = clamp(intensity * 1.4, 0.0, 0.92);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Compile Programs
    const splatProg = createProgram(baseVS, splatFS);
    const advectProg = createProgram(baseVS, advectionFS);
    const divProg = createProgram(baseVS, divergenceFS);
    const curlProg = createProgram(baseVS, curlFS);
    const vortProg = createProgram(baseVS, vorticityFS);
    const pressureProg = createProgram(baseVS, pressureFS);
    const gradSubProg = createProgram(baseVS, gradSubtractFS);
    const displayProg = createProgram(baseVS, displayFS);

    // FBO Texture helpers
    function createFBO(w, h) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterType);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterType);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, textureType, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        fbo,
        texture,
        width: w,
        height: h,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    }

    function createDoubleFBO(w, h) {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w,
        height: h,
        get read() { return fbo1; },
        set read(value) { fbo1 = value; },
        get write() { return fbo2; },
        set write(value) { fbo2 = value; },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    }

    const simW = SIM_RESOLUTION;
    const simH = Math.round(SIM_RESOLUTION * (height / width));
    const dyeW = DYE_RESOLUTION;
    const dyeH = Math.round(DYE_RESOLUTION * (height / width));

    let density = createDoubleFBO(dyeW, dyeH);
    let velocity = createDoubleFBO(simW, simH);
    let divergence = createFBO(simW, simH);
    let curl = createFBO(simW, simH);
    let pressure = createDoubleFBO(simW, simH);

    // Blit helper
    function blit(dest) {
      if (!dest) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, dest.fbo);
        gl.viewport(0, 0, dest.width, dest.height);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // Mouse Tracking
    const mouse = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      moved: false,
      splats: []
    };

    let colorCycle = 0;

    function splat(x, y, dx, dy, color) {
      // Velocity splat
      gl.useProgram(splatProg);
      gl.uniform1i(gl.getUniformLocation(splatProg, 'uTarget'), velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(splatProg, 'uAspectRatio'), width / height);
      gl.uniform2f(gl.getUniformLocation(splatProg, 'uPoint'), x / width, 1.0 - y / height);
      gl.uniform3f(gl.getUniformLocation(splatProg, 'uColor'), dx, -dy, 1.0);
      gl.uniform1f(gl.getUniformLocation(splatProg, 'uRadius'), SPLAT_RADIUS);
      blit(velocity.write);
      velocity.swap();

      // Dye splat (Heritage terracotta to glowing imperial gold)
      gl.uniform1i(gl.getUniformLocation(splatProg, 'uTarget'), density.read.attach(0));
      gl.uniform3f(gl.getUniformLocation(splatProg, 'uColor'), color.r, color.g, color.b);
      blit(density.write);
      density.swap();
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (mouse.moved) {
        mouse.dx = (currentX - mouse.x) * SPLAT_FORCE * 0.001;
        mouse.dy = (currentY - mouse.y) * SPLAT_FORCE * 0.001;

        // Oscillate between rich terracotta (#E06D44) and royal gold (#F5C451)
        colorCycle += 0.08;
        const mixVal = (Math.sin(colorCycle) + 1.0) * 0.5;

        // Terracotta: (1.0, 0.45, 0.22) | Gold: (1.0, 0.78, 0.32)
        const color = {
          r: 1.0,
          g: 0.45 + mixVal * 0.33,
          b: 0.22 + mixVal * 0.12
        };

        if (Math.hypot(mouse.dx, mouse.dy) > 0.05) {
          mouse.splats.push({
            x: currentX,
            y: currentY,
            dx: mouse.dx,
            dy: mouse.dy,
            color
          });
        }
      }

      mouse.x = currentX;
      mouse.y = currentY;
      mouse.moved = true;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Main Simulation & Rendering Loop
    let lastTime = performance.now();
    let animId;

    function step() {
      const now = performance.now();
      let dt = Math.min((now - lastTime) / 1000, 0.024);
      lastTime = now;

      // 1. Process Mouse Splats
      while (mouse.splats.length > 0) {
        const s = mouse.splats.pop();
        splat(s.x, s.y, s.dx, s.dy, s.color);
      }

      // 2. Curl / Vorticity Calculation
      gl.useProgram(curlProg);
      gl.uniform2f(gl.getUniformLocation(curlProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(curlProg, 'uVelocity'), velocity.read.attach(0));
      blit(curl);

      gl.useProgram(vortProg);
      gl.uniform2f(gl.getUniformLocation(vortProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(vortProg, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(vortProg, 'uCurl'), curl.attach(1));
      gl.uniform1f(gl.getUniformLocation(vortProg, 'uCurl'), CURL);
      gl.uniform1f(gl.getUniformLocation(vortProg, 'uDt'), dt);
      blit(velocity.write);
      velocity.swap();

      // 3. Divergence Calculation
      gl.useProgram(divProg);
      gl.uniform2f(gl.getUniformLocation(divProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(divProg, 'uVelocity'), velocity.read.attach(0));
      blit(divergence);

      // 4. Pressure Solve (Jacobi Iterations)
      gl.useProgram(pressureProg);
      gl.uniform2f(gl.getUniformLocation(pressureProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(pressureProg, 'uDivergence'), divergence.attach(1));

      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(gl.getUniformLocation(pressureProg, 'uPressure'), pressure.read.attach(0));
        blit(pressure.write);
        pressure.swap();
      }

      // 5. Subtract Pressure Gradient from Velocity
      gl.useProgram(gradSubProg);
      gl.uniform2f(gl.getUniformLocation(gradSubProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(gradSubProg, 'uPressure'), pressure.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(gradSubProg, 'uVelocity'), velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // 6. Advect Velocity
      gl.useProgram(advectProg);
      gl.uniform2f(gl.getUniformLocation(advectProg, 'uTexelSize'), 1.0 / simW, 1.0 / simH);
      gl.uniform1i(gl.getUniformLocation(advectProg, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(advectProg, 'uSource'), velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(advectProg, 'uDt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectProg, 'uDissipation'), VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // 7. Advect Dye (Liquid Trails)
      gl.useProgram(advectProg);
      gl.uniform2f(gl.getUniformLocation(advectProg, 'uTexelSize'), 1.0 / dyeW, 1.0 / dyeH);
      gl.uniform1i(gl.getUniformLocation(advectProg, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(advectProg, 'uSource'), density.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(advectProg, 'uDissipation'), DENSITY_DISSIPATION);
      blit(density.write);
      density.swap();

      // 8. Render Liquid Distortion & Molten Dye to Screen
      gl.useProgram(displayProg);
      gl.uniform1i(gl.getUniformLocation(displayProg, 'uDye'), density.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(displayProg, 'uVelocity'), velocity.read.attach(1));
      blit(null);

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45] w-full h-full mix-blend-screen"
    />
  );
}
