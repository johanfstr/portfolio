"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import * as THREE from "three";

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  useEffect(() => {
    // Auto-fit: compute bounding box and center+scale the model
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Center the model
    scene.position.sub(center);

    // Scale so the tallest dimension fits in ~2 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    scene.scale.setScalar(scale);

    // Re-center after scale
    const box2 = new THREE.Box3().setFromObject(scene);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);
    scene.position.sub(center2);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) mat.envMapIntensity = 1.2;
      }
    });
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingSpinner() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.4, 0.05, 8, 32, Math.PI * 1.5]} />
      <meshStandardMaterial color="#a855f7" />
    </mesh>
  );
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  return (
    <Canvas
      // Caméra reculée et en hauteur pour voir l'ensemble du modèle
      camera={{ position: [1, 1, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 3, -3]} intensity={1.5} color="#a855f7" />
      <pointLight position={[3, -2, 3]} intensity={0.6} color="#7c3aed" />

      <Suspense fallback={<LoadingSpinner />}>
        <Environment preset="city" />
        <Model path={modelPath} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={1000}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
