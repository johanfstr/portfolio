import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  disablePointer?: boolean;
};

const InteractiveNeuralVortex: React.FC<Props> = ({ className = "", disablePointer = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = (canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl")) as
      | WebGLRenderingContext
      | null;
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }
      
      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);
        float t = .001 * u_time;
        vec3 color = vec3(0.);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));
        color = vec3(0.55, 0.12, 0.75); // purple base
        color = mix(color, vec3(0.35, 0.08, 0.6), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
        color += vec3(0.2, 0.05, 0.5) * sin(2.0 * u_scroll_progress + 1.5);
        color = color * noise;
        gl_FragColor = vec4(color, noise);
      }
    `;

    const compileShader = (glCtx: WebGLRenderingContext, source: string, type: number) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) {
      console.error("Failed to create program");
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointerPosition = gl.getUniformLocation(program, "u_pointer_position");
    const uScrollProgress = gl.getUniformLocation(program, "u_scroll_progress");

    let parentRect = canvasEl.parentElement?.getBoundingClientRect() ?? { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };

    const resizeCanvas = () => {
      parentRect = canvasEl.parentElement?.getBoundingClientRect() ?? { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.floor(parentRect.width * devicePixelRatio);
      canvasEl.height = Math.floor(parentRect.height * devicePixelRatio);
      canvasEl.style.width = `${parentRect.width}px`;
      canvasEl.style.height = `${parentRect.height}px`;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      if (uRatio) gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const currentTime = performance.now();

      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.2;

      if (uTime) gl.uniform1f(uTime, currentTime);
      if (uPointerPosition) {
        const w = Math.max(parentRect.width, 1);
        const h = Math.max(parentRect.height, 1);
        gl.uniform2f(uPointerPosition, pointer.current.x / w, 1 - pointer.current.y / h);
      }
      if (uScrollProgress) gl.uniform1f(uScrollProgress, window.pageYOffset / (2 * window.innerHeight));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvasEl.parentElement?.getBoundingClientRect();
      const left = rect?.left ?? 0;
      const top = rect?.top ?? 0;
      pointer.current.tX = (e.clientX - left);
      pointer.current.tY = (e.clientY - top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvasEl.parentElement?.getBoundingClientRect();
      const left = rect?.left ?? 0;
      const top = rect?.top ?? 0;
      if (e.touches && e.touches[0]) {
        pointer.current.tX = e.touches[0].clientX - left;
        pointer.current.tY = e.touches[0].clientY - top;
      }
    };

    if (!disablePointer) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (!disablePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("touchmove", handleTouchMove);
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, [disablePointer]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`} />;
};

export default InteractiveNeuralVortex;
