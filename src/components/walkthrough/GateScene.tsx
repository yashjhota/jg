import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Circle, Environment, Sky, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Language, PageId } from '../../types';
import Watchman from "./Watchman";
import { CampusScene } from './CampusScene';
import { STONE, WOOD, GOLD, GRASS, STONE_PATH, BUILDING } from './materials';

const GateScene: React.FunctionComponent<{ lang: Language; onNavigate: (page: PageId) => void }> = ({ lang, onNavigate }) => {
  // Refs for animation control (avoid state updates in render loop)
  const animationStepRef = useRef(0); // 0: initial, 1: gate opening, 2: camera moving, 3: done
  const gateOpenStartTimeRef = useRef(0);
  const cameraMoveStartTimeRef = useRef(0);

  // State for UI triggers (only changes that need re-renders)
  const [animationStepState, setAnimationStepState] = useState(0);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [explorationShown, setExplorationShown] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const gateLeftRef = useRef<THREE.Group>(null);
  const gateRightRef = useRef<THREE.Group>(null);
  const continueClickedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setWebglSupported(false);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(Boolean(context));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Animation timing (in seconds for useFrame)
  const gateOpenDuration = 2.0; // seconds
  const cameraMoveDuration = 3.0; // seconds
  const pauseDuration = 1.0; // seconds

  // Handle reduced motion preference
  // Handle reduced motion preference
  const reduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (!webglSupported) {
      return;
    }

    if (reduceMotion) {
      animationStepRef.current = 3;
      gateOpenStartTimeRef.current = 0;
      cameraMoveStartTimeRef.current = 0;
      setAnimationStepState(3);
      return;
    }

    animationStepRef.current = 0;
    setAnimationStepState(0);
  }, [reduceMotion, webglSupported]);

  const handleOpenGate = () => {
    if (animationStepRef.current !== 0) return;
    animationStepRef.current = 1;
    setAnimationStepState(1);
  };

  // Frame loop for 3D animation - must be inside Canvas
  const FrameLoop = () => {
    useFrame((state) => {
      const elapsed = state.clock.elapsedTime;

      // Handle reduced motion - skip to final state immediately
      if (reduceMotion) {
        // Set camera to final position
        state.camera.position.set(0, 2, 0);
        state.camera.lookAt(0, 0, -5);
        // Ensure gates are open
        if (gateLeftRef.current) {
          gateLeftRef.current.rotation.y = Math.PI / 2;
        }
        if (gateRightRef.current) {
          gateRightRef.current.rotation.y = -Math.PI / 2;
        }
        return;
      }

      switch (animationStepRef.current) {
        case 0: // Initial position
          state.camera.position.set(0, 5, 10);
          state.camera.lookAt(0, 0, 0);
          break;

        case 1: // Gate opening animation
          if (gateOpenStartTimeRef.current === 0) {
            gateOpenStartTimeRef.current = elapsed;
          }
          const gateProgress = Math.min((elapsed - gateOpenStartTimeRef.current) / gateOpenDuration, 1);
          const gateAngle = gateProgress * Math.PI / 2; // 90 degrees in radians

          if (gateLeftRef.current) {
            gateLeftRef.current.rotation.y = gateAngle;
          }
          if (gateRightRef.current) {
            gateRightRef.current.rotation.y = -gateAngle;
          }

          if (gateProgress >= 1) {
            animationStepRef.current = 2;
            gateOpenStartTimeRef.current = 0;
            setAnimationStepState(2);
          }
          break;

        case 2: // Camera moving forward through the gate
          if (cameraMoveStartTimeRef.current === 0) {
            cameraMoveStartTimeRef.current = elapsed;
          }
          const cameraProgress = Math.min((elapsed - cameraMoveStartTimeRef.current) / cameraMoveDuration, 1);

          // Interpolate camera position from start to end
          const startPos = new THREE.Vector3(0, 5, 10);
          const endPos = new THREE.Vector3(0, 2, 0); // inside the gate, looking forward
          const newPos = startPos.clone().lerp(endPos, cameraProgress);
          state.camera.position.copy(newPos);

          // Interpolate camera target to look deeper into campus
          const startTarget = new THREE.Vector3(0, 0, 0);
          const endTarget = new THREE.Vector3(0, 0, -5);
          const newTarget = startTarget.clone().lerp(endTarget, cameraProgress);
          state.camera.lookAt(newTarget);

          if (cameraProgress >= 1) {
            animationStepRef.current = 3;
            cameraMoveStartTimeRef.current = 0;
            setAnimationStepState(3);
          }
          break;

        case 3: // Animation done, keep camera settled
          // Camera position is maintained from last frame of case 2
          // OrbitControls will be enabled outside based on animationStepState
          break;
      }
    });
    return null; // This component doesn't render anything, just runs the useFrame hook
  };

  // Trigger welcome when gate/camera animation completes
  useEffect(() => {
    if (animationStepState === 3 && !welcomeShown) {
      setWelcomeShown(true);
    }
  }, [animationStepState, welcomeShown]);

  // Skip animation handler
  const handleSkip = () => {
    // Only allow skip during animation (steps 1 or 2)
    if (animationStepState > 0 && animationStepState < 3) {
      animationStepRef.current = 3;
      gateOpenStartTimeRef.current = 0;
      cameraMoveStartTimeRef.current = 0;
      setAnimationStepState(3);
      // Note: camera will be set to final position in next FrameLoop iteration
    }
  };

  // Continue to M3 handler - enters campus exploration after welcome
  const handleContinue = () => {
    if (!continueClickedRef.current) {
      continueClickedRef.current = true;
      setWelcomeShown(false);
      setExplorationShown(true);
    }
  };

  // Exit handler
  const handleExit = () => {
    onNavigate('home');
  };

  // Back to welcome from exploration
  const handleBackToWelcome = () => {
    setExplorationShown(false);
    // Reset continue clicked flag so welcome can be shown again if needed
    continueClickedRef.current = false;
  };

  // Materials
  const gateMaterial = new THREE.MeshStandardMaterial({ color: WOOD.color, roughness: WOOD.roughness, metalness: WOOD.metalness });
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: STONE.color, roughness: STONE.roughness, metalness: STONE.metalness });
  const goldMaterial = new THREE.MeshStandardMaterial({ color: GOLD.color, roughness: GOLD.roughness, metalness: GOLD.metalness, envMapIntensity: GOLD.envMapIntensity });
  const pathMaterial = new THREE.MeshStandardMaterial({ color: STONE_PATH.color, roughness: STONE_PATH.roughness, metalness: STONE_PATH.metalness });
  const grassMaterial = new THREE.MeshStandardMaterial({ color: GRASS.color, roughness: GRASS.roughness, metalness: GRASS.metalness });
  const buildingMaterial = new THREE.MeshStandardMaterial({ color: BUILDING.color, roughness: BUILDING.roughness, metalness: BUILDING.metalness });

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C1B2A] text-[#FAF8F5] p-6 text-center">
        <p className="max-w-md text-lg leading-relaxed">
          Your browser does not support 3D experiences. Please explore our site using the standard menu.
        </p>
        <button
          onClick={handleExit}
          className="mt-6 px-4 py-2 bg-[#E59A1E] text-[#0C1B2A] rounded hover:bg-[#F3A628] transition-colors"
        >
          Exit to Site
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Exit Control (top-right) */}
      <div className="absolute top-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer" onClick={handleExit}>
        <span className="text-sm font-medium">Exit</span>
      </div>

      {/* Skip Animation Control (bottom-right, appears after animation starts) */}
      {animationStepState > 0 && animationStepState < 3 && (
        <div className="absolute bottom-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-70" onClick={handleSkip}>
          <span className="text-sm font-medium">Skip</span>
        </div>
      )}

      {/* Continue Control (bottom-center, appears after animation ends) */}
      {animationStepState === 3 && !explorationShown && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer" onClick={handleContinue}>
          <span className="text-sm font-medium">Continue</span>
        </div>
      )}

      {/* 3D Canvas (gate sequence) */}
      {!explorationShown && (
        <div className="fixed inset-0 z-[100]">
        <Canvas
          shadows
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ position: new THREE.Vector3(0, 5, 10), fov: 60 }} // Initial position
          style={{ height: '100%', width: '100%' }}
        >
          {/* Environment */}
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="city" />
          <fog attach="fog" args={['#87CEEB', 30, 90]} />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.5} scale={40} blur={2} far={10} />
          {/* Lights */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.0} castShadow />

          {/* Gate structure */}
          <group>
            {/* Left pillar */}
            <Box args={[2, 8, 2]} position={[-4, 0, 0]} material={pillarMaterial} castShadow receiveShadow />
            {/* Right pillar */}
            <Box args={[2, 8, 2]} position={[4, 0, 0]} material={pillarMaterial} castShadow receiveShadow />
            {/* Gate base (threshold) */}
            <Box args={[4, 0.2, 2]} position={[0, -0.1, 0]} material={gateMaterial} castShadow receiveShadow />
            {/* Left gate leaf */}
            <group ref={gateLeftRef} position={[-2, 3.5, 0]}> {/* hinge at x=-2, y=3.5, z=0 */}
              <Box args={[2, 7, 0.2]} position={[1, 0, 0]} material={gateMaterial} castShadow receiveShadow />
            </group>
            {/* Right gate leaf */}
            <group ref={gateRightRef} position={[2, 3.5, 0]}> {/* hinge at x=2, y=3.5, z=0 */}
              <Box args={[2, 7, 0.2]} position={[-1, 0, 0]} material={gateMaterial} castShadow receiveShadow />
            </group>
            {/* Gold detailing on gate leaves (vertical strips) */}
            <Box args={[0.1, 7, 0.01]} position={[-1.5, 3.5, 0.11]} material={goldMaterial} />
            <Box args={[0.1, 7, 0.01]} position={[1.5, 3.5, 0.11]} material={goldMaterial} />
            {/* Horizontal gold bar across the top */}
            <Box args={[4, 0.2, 0.01]} position={[0, 6.5, 0.11]} material={goldMaterial} />
            {/* Jain Genius sign */}
            <group position={[0, 4.5, 0.12]}>
              <Box args={[4, 1, 0.01]} material={goldMaterial} />
              <Text position={[0, 0, 0.02]} fontSize={0.4} color="#0C1B2A" anchorX="center" anchorY="middle">
                Jain Genius
              </Text>
            </group>
            {/* Path through the gate */}
            <Circle args={[4, 32]} position={[0, -0.05, -3]} rotation={[ -Math.PI / 2, 0, 0 ]} material={pathMaterial} />
            {/* Grass on sides */}
            <Circle args={[2, 32]} position={[-6, -0.05, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} material={grassMaterial} />
            <Circle args={[2, 32]} position={[6, -0.05, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} material={grassMaterial} />
            {/* Distant building silhouette */}
            <Box args={[10, 5, 2]} position={[0, 0, -15]} material={buildingMaterial} castShadow receiveShadow />
            {/* Watchman opens the gate */}
            <Watchman lang={lang} onOpenGate={handleOpenGate} />
          </group>

          {/* Camera controls (only if not animating) */}
          {animationStepState === 3 && !reduceMotion && (
            <OrbitControls
              enableZoom
              enablePan
              maxDistance={50}
              minDistance={5}
              target={[0, 0, -5]}
            />
          )}

          {/* Frame loop for 3D animation - must be inside Canvas */}
          <FrameLoop />
        </Canvas>
      </div>
      )}

      {/* Welcome Panel (appears after animation completes) */}
      {welcomeShown && !explorationShown && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50" onClick={handleContinue}>
          <div className="relative w-[90%] max-w-[400px] p-6 bg-white/90 backdrop-blur-md rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {lang === 'en'
                ? 'Welcome to Jain Genius! I\'m here to help you explore our campus.'
                : 'जैन जीनियस में आपका स्वागत है! मैं आपको हमारे परिसर को देखने में मदद करूँगा।'}
            </h2>
            <button
              onClick={handleContinue}
              className="w-full px-4 py-2 bg-[#E59A1E] text-[#0C1B2A] rounded hover:bg-[#F3A628] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E59A1E] focus:ring-offset-2 disabled:opacity-50"
            >
              {lang === 'en' ? 'Continue Exploration' : 'खोज जारी रखें'}
            </button>
          </div>
        </div>
      )}

      {/* Campus Exploration (M4) - navigable 3D campus with hotspots */}
      {explorationShown && (
        <CampusScene
          lang={lang}
          onNavigate={onNavigate}
          onBackToWelcome={handleBackToWelcome}
          onExit={handleExit}
        />
      )}
    </>
  );
};

export default GateScene;

// Helper hook for media queries
export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [matches, query]);
  return matches;
}