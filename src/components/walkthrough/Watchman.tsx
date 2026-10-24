import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMatchMedia } from './GateScene';
import * as THREE from 'three';
import { NAVY, SKIN, GOLD, DARK_GRAY } from './materials';

const Watchman: React.FunctionComponent<{ lang: 'en' | 'hi'; onOpenGate?: () => void }> = ({ lang, onOpenGate }) => {
  const groupRef = useRef<THREE.Group>(null);
  const reduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const startedRef = useRef<number | null>(null);
  const calledRef = useRef(false);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    if (reduceMotion) {
      g.position.set(0, 0, 0);
      if (!calledRef.current) {
        calledRef.current = true;
        onOpenGate?.();
      }
      return;
    }
    if (startedRef.current === null) startedRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startedRef.current;
    const duration = 1.5;
    const t = Math.min(elapsed / duration, 1);
    const eased = t * t * (3 - 2 * t);
    g.position.x = 3 * (1 - eased);
    g.position.z = -1.5 * (1 - eased);
    if (t >= 1 && !calledRef.current) {
      calledRef.current = true;
      onOpenGate?.();
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, -1.5]}>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1.7, 8]} />
        <meshStandardMaterial color={NAVY.color} roughness={NAVY.roughness} metalness={NAVY.metalness} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={SKIN.color} roughness={SKIN.roughness} metalness={SKIN.metalness} />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 8]} />
        <meshStandardMaterial color={NAVY.color} roughness={NAVY.roughness} metalness={NAVY.metalness} />
      </mesh>
      <mesh position={[0, 2.01, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.02, 8]} />
        <meshStandardMaterial color={NAVY.color} roughness={NAVY.roughness} metalness={NAVY.metalness} />
      </mesh>
      <mesh position={[0, 2.08, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 8]} />
        <meshStandardMaterial color={GOLD.color} roughness={GOLD.roughness} metalness={GOLD.metalness} envMapIntensity={GOLD.envMapIntensity} />
      </mesh>
      <mesh position={[-0.3, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
        <meshStandardMaterial color={NAVY.color} roughness={NAVY.roughness} metalness={NAVY.metalness} />
      </mesh>
      <mesh position={[0.3, 1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
        <meshStandardMaterial color={NAVY.color} roughness={NAVY.roughness} metalness={NAVY.metalness} />
      </mesh>
      <mesh position={[-0.1, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 4]} />
        <meshStandardMaterial color={DARK_GRAY.color} roughness={DARK_GRAY.roughness} metalness={DARK_GRAY.metalness} />
      </mesh>
      <mesh position={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 4]} />
        <meshStandardMaterial color={DARK_GRAY.color} roughness={DARK_GRAY.roughness} metalness={DARK_GRAY.metalness} />
      </mesh>
    </group>
  );
};

export default Watchman;
