"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error - maath does not provide types for this specific dist entry
import * as random from "maath/random/dist/maath-random.esm";

function Starfield(props: React.ComponentProps<typeof Points>) {
  const ref = useRef<THREE.Points>(null);
  
  // Generating points array only once
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#39D0FF"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Starfield />
      </Canvas>
      {/* Radial Gradient Mask for better text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background-primary)_100%)] opacity-80" />
    </div>
  );
}
