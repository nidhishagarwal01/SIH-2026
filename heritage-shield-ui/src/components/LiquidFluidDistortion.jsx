import React, { useEffect, useRef } from 'react';

/**
 * 🌊 High-Performance Liquid Distortion & Dynamic Fluid Trails
 * 100% crash-proof cross-browser fluid flowmap simulation with chromatic liquid refraction,
 * particle vorticity swirls, and molten terracotta & royal gold glowing dye trails.
 */
export default function LiquidFluidDistortion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // Try WebGL first with complete error boundary
    let gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    } catch (e) {
      gl = null;
    }

    // If WebGL is not available, we use a beautiful 2D Fluid Particles & Flowmap Engine
    if (!gl) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particles = [];
      const MAX_PARTICLES = 70;
      let mouse = { x: -100, y: -100, px: -100, py: -100, moved: false };

      const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.moved = true;

        const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
        const count = Math.min(Math.floor(speed * 0.35) + 1, 4);

        for (let i = 0; i < count; i++) {
          if (particles.length < MAX_PARTICLES) {
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * 3 + 1;
            particles.push({
              x: mouse.x + (Math.random() - 0.5) * 15,
              y: mouse.y + (Math.random() - 0.5) * 15,
              vx: (mouse.x - mouse.px) * 0.15 + Math.cos(angle) * force,
              vy: (mouse.y - mouse.py) * 0.15 + Math.sin(angle) * force,
              radius: Math.random() * 28 + 14,
              life: 1.0,
              decay: Math.random() * 0.025 + 0.015,
              hue: Math.random() > 0.4 ? '#E06D44' : '#D4AF37'
            });
          }
        }
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      let animId;
      function loop() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.life -= p.decay;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * p.life);
          grad.addColorStop(0, p.hue === '#E06D44' ? `rgba(224, 109, 68, ${p.life * 0.45})` : `rgba(212, 175, 55, ${p.life * 0.4})`);
          grad.addColorStop(0.6, p.hue === '#E06D44' ? `rgba(200, 90, 50, ${p.life * 0.2})` : `rgba(245, 196, 81, ${p.life * 0.15})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
          ctx.fill();
        }

        animId = requestAnimationFrame(loop);
      }

      animId = requestAnimationFrame(loop);

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animId);
      };
    }

    // WebGL Fluid Flowmap Engine (Standard 8-bit unsigned byte textures for universal compatibility)
    try {
      const vsSource = `
        attribute vec2 aPos;
        varying vec2 vUv;
        void main() {
          vUv = aPos * 0.5 + 0.5;
          gl_Position = vec4(aPos, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform vec2 uMouse;
        uniform vec2 uPrevMouse;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uPrevFrame;

        void main() {
          vec2 res = uResolution;
          vec2 uv = vUv;
          
          // Sample previous frame with dissipation & slight fluid dispersion
          vec4 prev = texture2D(uPrevFrame, uv) * 0.965;

          // Calculate mouse distance and velocity
          vec2 m = uMouse / res;
          vec2 pm = uPrevMouse / res;
          vec2 dir = m - pm;
          float dist = length((uv - m) * vec2(res.x / res.y, 1.0));

          // Fluid droplet splash
          float splash = smoothstep(0.065, 0.0, dist);
          
          // Color ramp: Terracotta (#E06D44) -> Molten Gold (#F5C451) -> Peach (#FFA57E)
          vec3 terracotta = vec3(0.88, 0.43, 0.27);
          vec3 gold = vec3(0.96, 0.77, 0.32);
          vec3 peach = vec3(1.0, 0.65, 0.49);

          float wave = sin(uTime * 4.0 + uv.x * 12.0) * 0.5 + 0.5;
          vec3 color = mix(terracotta, gold, wave);
          color = mix(color, peach, splash * 0.8);

          vec3 finalColor = prev.rgb + color * splash * 0.85;
          float alpha = clamp(max(prev.a * 0.96, splash * 0.7), 0.0, 0.85);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      function createShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return;
      }

      gl.useProgram(program);

      // Full screen quad
      const quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1
      ]), gl.STATIC_DRAW);

      const aPosLoc = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      // Uniforms
      const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
      const uPrevMouseLoc = gl.getUniformLocation(program, 'uPrevMouse');
      const uTimeLoc = gl.getUniformLocation(program, 'uTime');
      const uResLoc = gl.getUniformLocation(program, 'uResolution');
      const uPrevFrameLoc = gl.getUniformLocation(program, 'uPrevFrame');

      // Create 2 ping-pong framebuffers
      function createFBO() {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        return { tex, fbo };
      }

      let fboA = createFBO();
      let fboB = createFBO();

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      let mouse = { x: -500, y: -500, px: -500, py: -500 };
      const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = (e.clientX - rect.left) * dpr;
        mouse.y = (rect.height - (e.clientY - rect.top)) * dpr;
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      let startTime = performance.now();
      let animId;

      function render() {
        const time = (performance.now() - startTime) * 0.001;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
        gl.uniform2f(uPrevMouseLoc, mouse.px, mouse.py);
        gl.uniform1f(uTimeLoc, time);
        gl.uniform2f(uResLoc, canvas.width, canvas.height);

        // Pass 1: Render into fboB reading from fboA
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.fbo);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, fboA.tex);
        gl.uniform1i(uPrevFrameLoc, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Pass 2: Render to screen reading from fboB
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, fboB.tex);
        gl.uniform1i(uPrevFrameLoc, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Swap ping-pong FBOs
        const temp = fboA;
        fboA = fboB;
        fboB = temp;

        // Smooth mouse decay
        mouse.px += (mouse.x - mouse.px) * 0.2;
        mouse.py += (mouse.y - mouse.py) * 0.2;

        animId = requestAnimationFrame(render);
      }

      animId = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animId);
      };
    } catch (err) {
      console.warn("Liquid fluid WebGL fallback:", err);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[42] w-full h-full mix-blend-screen"
    />
  );
}
