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

const goldPositions = createPositions(2600, 15, 3.2);
const bluePositions = createPositions(900, 42, 2.1);

/**
 * Bright field behind the hero copy.
 *
 * What: Two particle clouds plus a lit gold ring.
 * Why: A faint cloud disappears into the navy background. Larger points,
 *      a second cool-colored layer, and an emissive ring stay readable
 *      even under the text scrim.
 * How: Positions are seeded once at module scope. `useFrame` rotates by
 *      `delta` so the speed stays steady. The parent sets `frameloop` to
 *      "demand" when the hero leaves the viewport, which stops the loop.
 */
function GoldField() {
  const points = useRef<PointsObject>(null);

  useFrame((_, delta) => {
    const mesh = points.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.12;
    mesh.rotation.x += delta * 0.03;
  });

  return (
    <Points ref={points} positions={goldPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffe38a"
        size={0.045}
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
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.95}
      />
    </Points>
  );
}

function SignalRing() {
  const ring = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = ring.current;
    if (!mesh) return;
    mesh.rotation.x += delta * 0.35;
    mesh.rotation.y += delta * 0.45;
  });

  return (
    <mesh ref={ring}>
      <torusGeometry args={[1.85, 0.055, 32, 120]} />
      <meshStandardMaterial
        color="#f6d56a"
        emissive="#f6d56a"
        emissiveIntensity={2.2}
        metalness={0.35}
        roughness={0.2}
      />
    </mesh>
  );
}

export function HeroCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 48 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.85} />
      <pointLight position={[3.5, 2.2, 4]} intensity={40} color="#ffe38a" />
      <pointLight position={[-3.2, -1.4, 2]} intensity={24} color="#8ec5ff" />
      <SignalRing />
      <GoldField />
      <BlueField />
    </Canvas>
  );
}
