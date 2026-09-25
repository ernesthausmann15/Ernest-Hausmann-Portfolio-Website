"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Points as PointsObject } from "three";

function createPositions(count: number, seedStart: number, spread: number) {
  const buffer = new Float32Array(count * 3);
  let seed = seedStart;

  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  for (let index = 0; index < count; index += 1) {
    const radius = 1.1 + random() ** 0.45 * spread;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const offset = index * 3;

    buffer[offset] = radius * Math.sin(phi) * Math.cos(theta);
    buffer[offset + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.82;
    buffer[offset + 2] = radius * Math.cos(phi);
  }

  return buffer;
}

const goldPositions = createPositions(1800, 15, 2.6);
const bluePositions = createPositions(700, 42, 1.8);

/**
 * Bright field on the open side of the hero.
 *
 * What: Two particle clouds plus a lit gold ring, shifted right.
 * Why: A huge field drawn over the headline makes the name hard to read.
 *      The motion stays visible in the empty half of the hero, and the
 *      copy sits on a clear wash.
 * How: Positions are seeded once at module scope. `useFrame` rotates by
 *      `delta` so the speed stays steady. The parent sets `frameloop` to
 *      "demand" when the hero leaves the viewport, which stops the loop.
 */
function GoldField() {
  const points = useRef<PointsObject>(null);

  useFrame((_, delta) => {
    const mesh = points.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.14;
    mesh.rotation.x += delta * 0.03;
  });

  return (
    <Points ref={points} positions={goldPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffe38a"
        size={0.042}
        sizeAttenuation
        depthWrite={false}
        opacity={1}
      />
    </Points>
  );
}

function BlueField() {
  const points = useRef<PointsObject>(null);

  useFrame((_, delta) => {
    const mesh = points.current;
    if (!mesh) return;
    mesh.rotation.y -= delta * 0.18;
    mesh.rotation.z += delta * 0.04;
  });

  return (
    <Points ref={points} positions={bluePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8ec5ff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

function SignalRing() {
  const ring = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = ring.current;
    if (!mesh) return;
    mesh.rotation.x += delta * 0.28;
    mesh.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={ring}>
      <torusGeometry args={[1.55, 0.04, 24, 100]} />
      <meshStandardMaterial
        color="#f6d56a"
        emissive="#f6d56a"
        emissiveIntensity={1.8}
        metalness={0.35}
        roughness={0.25}
      />
    </mesh>
  );
}

export function HeroCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [1.35, 0.15, 6.2], fov: 46 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3.5, 2.2, 4]} intensity={28} color="#ffe38a" />
      <pointLight position={[-2.4, -1.2, 2]} intensity={16} color="#8ec5ff" />
      <group position={[1.7, 0, 0]}>
        <SignalRing />
        <GoldField />
        <BlueField />
      </group>
    </Canvas>
  );
}
