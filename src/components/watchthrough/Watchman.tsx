import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Watchman: React.FunctionComponent<{
  lang: 'en' | 'hi';
  onContinue: () => void
}> = ({ lang, onContinue }) => {
  const { scene } = useThree();
  const watchmanRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Create procedural watchman
    const group = new THREE.Group();
    watchmanRef.current = group;

    // Body/Torso
    const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.7, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' }); // SaddleBrown
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.85; // Center of body
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.18, 12, 12);
    const headMaterial = new THREE.MeshStandardMaterial({ color: '#F5DEB3' }); // Wheat
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.85; // Top of body + head radius
    group.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4);
    const armMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.3, 1.1, 0); // Left side, mid-body height
    leftArm.rotation.z = Math.PI / 6; // Slight angle outward
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.3, 1.1, 0); // Right side, mid-body height
    rightArm.rotation.z = -Math.PI / 6; // Slight angle outward
    group.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 4);
    const legMaterial = new THREE.MeshStandardMaterial({ color: '#2F4F4F' }); // DarkSlateGray

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.1, 0.0, 0); // Left side, bottom
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.1, 0.0, 0); // Right side, bottom
    group.add(rightLeg);

    // Position watchman beside entrance path, outside camera trajectory
    // Gate is centered at (0,0,0) with pillars at x=-4 and x=4
    // Path goes through center (0,0,-3) to (0,0,3) etc.
    // Place watchman at (3, 0, -1.5) - right side of path, slightly back from center
    group.position.set(3, 0, -1.5);

    scene.add(group);

    // Simple idle animation (gentle swaying) - respects reduced motion
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle sway: side-to-side movement and slight vertical bounce
      const swayAmount = Math.sin(elapsed * 0.5) * 0.02; // Slow side-to-side sway
      const bounceAmount = Math.abs(Math.sin(elapsed * 0.3)) * 0.01; // Gentle vertical bounce

      group.position.x = 3 + swayAmount;
      group.position.y = bounceAmount;

      // Very slow rotation for subtle idle movement
      group.rotation.y = Math.sin(elapsed * 0.2) * 0.05;
    };
    animate();

    return () => {
      scene.remove(group);
    };
  }, [scene]);

  return null; // Watchman is purely 3D, UI elements handled separately
};

export default Watchman;