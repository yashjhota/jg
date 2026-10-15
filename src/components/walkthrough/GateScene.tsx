import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Circle } from '@react-three/drei';
import * as THREE from 'three';
import Watchman from './Watchman'; // Fixed import for Watchman component

const GateScene: React.FunctionComponent<{ lang: 'en' | 'hi'; onNavigate: (page: 'home') => void }> = ({ lang, onNavigate }) => {
  const { size } = useThree();
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: gate opening, 2: camera moving, 3: done
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(0, 5, 10));
  const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0));
  const [welcomeShown, setWelcomeShown] = useState(false);
  const gateLeftRef = useRef<THREE.Group>(null);
  const gateRightRef = useRef<THREE.Group>(null);
  const continueClickedRef = useRef(false);

  // Animation timing (in seconds for useFrame)
  const gateOpenDuration = 2.0; // seconds
  const cameraMoveDuration = 3.0; // seconds
  const pauseDuration = 1.0; // seconds

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    if (animationStep === 0) {
      // Initial position: just set the camera
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cameraTarget);
    } else if (animationStep === 1) {
      // Gate opening animation
      const progress = Math.min(elapsed / gateOpenDuration, 1);
      const angle = progress * Math.PI / 2; // 90 degrees in radians

      if (gateLeftRef.current) {
        // Left leaf: hinge at x=-2, rotate counter-clockwise (positive angle)
        gateLeftRef.current.rotation.y = angle;
      }
      if (gateRightRef.current) {
        // Right leaf: hinge at x=2, rotate clockwise (negative angle)
        gateRightRef.current.rotation.y = -angle;
      }
      if (progress >= 1) {
        setAnimationStep(2);
        setSkipEnabled(true);
      }
    } else if (animationStep === 2) {
      // Camera moving forward through the gate
      const elapsed = state.clock.elapsedTime - (gateOpenDuration + pauseDuration);
      const progress = Math.min(elapsed / cameraMoveDuration, 1);
      // Interpolate camera position from start to end
      const startPos = new THREE.Vector3(0, 5, 10);
      const endPos = new THREE.Vector3(0, 2, 0); // inside the gate, looking forward
      const newPos = startPos.clone().lerp(endPos, progress);
      setCameraPosition(newPos);
      // Also adjust target to look at the path inside
      const startTarget = new THREE.Vector3(0, 0, 0);
      const endTarget = new THREE.Vector3(0, 0, -5); // looking deeper into the campus
      const newTarget = startTarget.clone().lerp(endTarget, progress);
      setCameraTarget(newTarget);
      if (progress >= 1) {
        setAnimationStep(3);
        setSkipEnabled(true);
      }
    } else if (animationStep === 3) {
      // Animation done, keep camera settled
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cameraTarget);
    }
  });

  // Handle reduced motion preference
  const reduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (reduceMotion) {
      // Skip animation, go directly to the end
      setAnimationStep(3);
      setSkipEnabled(true);
      // Set camera to final position
      setCameraPosition(new THREE.Vector3(0, 2, 0));
      setCameraTarget(new THREE.Vector3(0, 0, -5));
    }
  }, [reduceMotion]);

  // Trigger welcome when gate/camera animation completes
  useEffect(() => {
    if (animationStep === 3 && !welcomeShown) {
      setWelcomeShown(true);
    }
  }, [animationStep, welcomeShown]);

  // Skip animation handler
  const handleSkip = () => {
    if (skipEnabled) {
      setAnimationStep(3);
      setSkipEnabled(true);
      // Set camera to final position
      setCameraPosition(new THREE.Vector3(0, 2, 0));
      setCameraTarget(new THREE.Vector3(0, 0, -5));
    }
  };

  // Continue to M3 handler - hides welcome panel to allow exploration
  const handleContinue = () => {
    if (!continueClickedRef.current) {
      continueClickedRef.current = true;
      setWelcomeShown(false);
    }
  };

  // Exit handler
  const handleExit = () => {
    onNavigate('home');
  };


  // Materials
  const gateMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' }); // SaddleBrown for wood
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: '#2F4F4F' }); // DarkSlateGray
  const goldMaterial = new THREE.MeshStandardMaterial({ color: '#E59A1E', metalness: 0.8, roughness: 0.2 });
  const pathMaterial = new THREE.MeshStandardMaterial({ color: '#8B8000' }); // DarkGoldenrod
  const grassMaterial = new THREE.MeshStandardMaterial({ color: '#228B22' }); // ForestGreen
  const buildingMaterial = new THREE.MeshStandardMaterial({ color: '#4682B4' }); // SteelBlue

  return (
    <>
      {/* Exit Control (top-right) */}
      <div className="absolute top-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer" onClick={handleExit}>
        <span className="text-sm font-medium">Exit</span>
      </div>

      {/* Skip Animation Control (bottom-right, appears after animation starts) */}
      {animationStep > 0 && animationStep < 3 && (
        <div className="absolute bottom-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-70" onClick={handleSkip}>
          <span className="text-sm font-medium">Skip</span>
        </div>
      )}

      {/* Continue Control (bottom-center, appears after animation ends) */}
      {animationStep === 3 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer" onClick={handleContinue}>
          <span className="text-sm font-medium">Continue</span>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="fixed inset-0 z-[100]">
        <Canvas
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ position: cameraPosition, fov: 60 }}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Lights */}
          <ambientLight intensity={0.3} color={0x00a0ff} />
          <directionalLight position={[10, 20, 10]} intensity={1.0} castShadow />
          <hemisphereLight intensity={0.5} />

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
            {/* Jain Genius sign (placeholder text) */}
            <group position={[0, 4.5, 0.12]}>
              <Box args={[4, 1, 0.01]} material={goldMaterial} />
            </group>
            {/* Path through the gate */}
            <Circle args={[4, 32]} position={[0, -0.05, -3]} rotation={[ -Math.PI / 2, 0, 0 ]} material={pathMaterial} />
            {/* Grass on sides */}
            <Circle args={[2, 32]} position={[-6, -0.05, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} material={grassMaterial} />
            <Circle args={[2, 32]} position={[6, -0.05, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} material={grassMaterial} />
            {/* Distant building silhouette */}
            <Box args={[10, 5, 2]} position={[0, 0, -15]} material={buildingMaterial} castShadow receiveShadow />
            {/* Watchman (appears after animation completes) */}
            {welcomeShown && <Watchman lang={lang} onContinue={handleContinue} />}
          </group>

          {/* Camera controls (only if not animating) */}
          {animationStep === 3 && !reduceMotion && (
            <OrbitControls
              enableZoom
              enablePan
              maxDistance={50}
              minDistance={5}
              target={[0, 0, -5]}
            />
          )}
        </Canvas>
      </div>

      {/* Welcome Panel (appears after animation completes) */}
      {welcomeShown && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50" onClick={handleContinue}>
          <div className="relative w-[90%] max-w-[400px] p-6 bg-white/90 backdrop-blur-md rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {lang === 'en'
                ? 'Welcome to Jain Genius! I\'m here to help you explore our campus.'
                : 'जीनियस जैन में आपका स्वागत है! मैं आपको हमारे परिसर की खोज करने में मदद करने के लिए यहाँ हूँ.'}
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

      {/* Fallback for WebGL unavailability */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C1B2A] text-[#FAF8F5] p-6">
        <p>Your browser does not support 3D experiences. Please explore our site using the standard menu.</p>
        <button onClick={handleExit} className="mt-4 px-4 py-2 bg-[#E59A1E] text-[#0C1B2A] rounded hover:bg-[#F3A628]">
          Exit to Site
        </button>
      </div>
    </>
  );
};

export default GateScene;

// Helper hook for media queries
function useMatchMedia(query: string): boolean {
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