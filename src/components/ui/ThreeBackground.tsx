"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - maath library does not provide typescript declarations
import * as random from "maath/random/dist/maath-random.esm";
import { useRef, useState } from "react";
import * as THREE from "three";

function ParticleRing() {
  const ref = useRef<THREE.Points>(null);
  
  // Generates 2000 random points inside a sphere of radius 1.5 (2000 points * 3 coords = 6000 elements)
  const [sphere] = useState(() => {
    try {
      return random.inSphere(new Float32Array(6000), { radius: 1.5 }) as Float32Array;
    } catch {
      // Fallback in case of generation error
      const arr = new Float32Array(6000);
      for (let i = 0; i < 6000; i++) {
        arr[i] = (Math.random() - 0.5) * 3;
      }
      return arr;
    }
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleRing />
      </Canvas>
    </div>
  );
}