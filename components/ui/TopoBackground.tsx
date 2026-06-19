"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TopoBackground({ ready = false }: { ready?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    // Initialise la scène une fois qu'on a une taille de container valide
    // (peut être 0x0 au montage si la mise en page n'est pas encore stable,
    // par ex. juste sous une section pinned GSAP/ScrollTrigger).
    function init(w: number, h: number) {
      if (renderer || w === 0 || h === 0) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, w / h, 1, 100);
      camera.position.z = 2;

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      Object.assign(renderer.domElement.style, {
        position: "absolute",
        top: "0", left: "0",
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: "0",
        opacity: "0.18",
      });
      container!.appendChild(renderer.domElement);
      buildMesh();
      renderer.render(scene, camera!);
    }

    function buildMesh() {
    const geometry = new THREE.PlaneGeometry(6, 6, 200, 200);
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: Math.random() * 100 }, // forme aléatoire au refresh
        waveDefinition: { value: 5.3 },
        waveAmplitude: { value: 0.13 },
        topoDefinition: { value: 30 },
        topoColor: { value: new THREE.Color(1, 1, 1) },
      },
      vertexShader: `
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        uniform float time;
        uniform float waveDefinition;
        uniform float waveAmplitude;
        varying vec3 vPosition;
        void main(void) {
          float newZ = snoise(uv) + snoise((uv * waveDefinition) + time);
          newZ *= waveAmplitude;
          vec3 newPosition = vec3(position.xy, position.z + newZ);
          vPosition = newPosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float topoDefinition;
        uniform vec3 topoColor;
        varying vec3 vPosition;
        void main(void) {
          float coord = vPosition.z * topoDefinition;
          float line = abs(fract(coord - 0.1) - 0.5) / fwidth(coord);
          line /= 1.1;
          gl_FragColor = vec4(topoColor, 1.0 - line);
        }
      `,
    });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y += 0.2;
      mesh.rotation.x = -Math.PI / 4;
      scene!.add(mesh);
    }

    function onResize(w: number, h: number) {
      if (w === 0 || h === 0) return;
      if (!renderer) {
        init(w, h);
        return;
      }
      camera!.aspect = w / h;
      camera!.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene!, camera!);
    }

    // ResizeObserver gère à la fois la taille initiale (qui peut être 0x0
    // si le layout n'est pas stabilisé au montage) et tout changement
    // ultérieur (resize fenêtre, reflow déclenché par une autre section).
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      onResize(Math.round(width), Math.round(height));
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      if (renderer) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, [ready]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}