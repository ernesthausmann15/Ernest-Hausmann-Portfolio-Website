"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useRef } from "react";
import type { Points as PointsObject } from "three";

function createPositions(count: number) {
  const buffer = new Float32Array(count * 3);
  let seed = 15;

  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  for (let index = 0; index < count; index += 1) {
    const radius = 1.35 + random() ** 0.55 * 2.5;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const offset = index * 3;

    buffer[offset] = radius * Math.sin(phi) * Math.cos(theta);
    buffer[offset + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
    buffer[offset + 2] = radius * Math.cos(phi);
  }

  return buffer;
}

const particlePositions = createPositions(1400);

/**
 * Decorative particle field for the hero.
 *
 * What: A slow-turning cloud of points, drawn with WebGL.
 * Why: The hero should feel cinematic without becoming a game. Points are
 *      cheap: one geometry, one material, no shadows, no post-processing.
 * How: Positions are built once, outside the component, with a seeded
 *      generator. That keeps the cloud identical on every render and avoids
 *      calling `Math.random` during render. `useFrame` receives the time
 *      since the last frame (`delta`) and rotates by that amount, which
 *      keeps the speed steady when the frame rate dips. The parent passes
 *      `active` from an IntersectionObserver. When the hero leaves the
 *      viewport, `frameloop="demand"` stops this loop until it returns.
 */
function ParticleField() {
  const points = useRef<PointsObject>(null);

  useFrame((_, delta) => {
    const mesh = points.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.055;
    mesh.rotation.x += delta * 0.012;
  });

  return (
    <Points ref={points} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f3c94d"
        size={0.016}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

export function HeroCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ParticleField />
    </Canvas>
  );
}
