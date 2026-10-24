import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Sky, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PageId, Language } from '../../types';
import { GRASS, STONE_PATH, BUILDING, NIGHT_BUILDING } from './materials';

const CENTER_Y = 0.6;

interface CampusHotspot {
  id: PageId;
  labelEn: string;
  labelHi: string;
  position: [number, number, number];
  color: string;
}

const HOTSPOTS: CampusHotspot[] = [
  { id: 'home', labelEn: 'Welcome Center', labelHi: 'स्वागत केंद्र', position: [0, CENTER_Y, 5], color: '#E59A1E' },
  { id: 'about', labelEn: 'History Hall', labelHi: 'इतिहास कक्ष', position: [-9, CENTER_Y, 2], color: '#4682B4' },
  { id: 'what-we-do', labelEn: 'Activity Hub', labelHi: 'गतिविधि केंद्र', position: [-7, CENTER_Y, -2], color: '#10B981' },
  { id: 'programmes', labelEn: 'Learning Center', labelHi: 'शिक्षा केंद्र', position: [0, CENTER_Y, -8], color: '#8B5CF6' },
  { id: 'events', labelEn: 'Event Plaza', labelHi: 'कार्यक्रम प्लाजा', position: [7, CENTER_Y, -2], color: '#F59E0B' },
  { id: 'gallery', labelEn: 'Art Gallery', labelHi: 'कला दीर्घा', position: [9, CENTER_Y, 2], color: '#E11D48' },
  { id: 'impact', labelEn: 'Success Wall', labelHi: 'सफलता दीवार', position: [-5, CENTER_Y, -10], color: '#D97706' },
  { id: 'membership', labelEn: 'Member Lounge', labelHi: 'सदस्य लाउंज', position: [5, CENTER_Y, -10], color: '#06B6D4' },
  { id: 'news', labelEn: 'News Kiosk', labelHi: 'समाचार कियोस्क', position: [-3, CENTER_Y, 6], color: '#4F46E5' },
  { id: 'contact', labelEn: 'Inquiry Desk', labelHi: 'संपर्क डेस्क', position: [3, CENTER_Y, 6], color: '#64748B' },
];

const HotspotBuilding: React.FunctionComponent<{
  hotspot: CampusHotspot;
  lang: Language;
  onNavigate: (page: PageId) => void;
}> = ({ hotspot, lang, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const scaleValue = isHovered ? 1.12 : 1;

  const handleClick = () => {
    onNavigate(hotspot.id);
  };

  const rootColor = new THREE.Color(hotspot.color);
  const roofColor = rootColor.clone().offsetHSL(0, 0.15, -0.15);

  return (
    <group
      position={hotspot.position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <mesh castShadow receiveShadow scale={[scaleValue, scaleValue, scaleValue]}>
        <boxGeometry args={[2.2, 4.2, 2.2]} />
        <meshStandardMaterial color={rootColor} roughness={0.45} metalness={0.25} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[2.9, 0.35, 2.9]} />
        <meshStandardMaterial color={roofColor} roughness={0.3} metalness={0.6} />
      </mesh>
      <Html position={[0, 4.6, 0]}>
        <div
          className="inline-block px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E59A1E]/40 shadow-xl text-xs sm:text-sm font-bold text-[#0C1B2A] leading-tight whitespace-nowrap"
        >
          {lang === 'en' ? hotspot.labelEn : hotspot.labelHi}
        </div>
      </Html>
    </group>
  );
};

interface CampusSceneProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onBackToWelcome: () => void;
  onExit: () => void;
}

export const CampusScene: React.FunctionComponent<CampusSceneProps> = ({
  lang,
  onNavigate,
  onBackToWelcome,
  onExit,
}) => {
  const reduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');

  const groundColor = '#2D6A4F';
  const pathColor = '#8B8000';

  return (
    <div className="fixed inset-0 z-[130] bg-[#0C1B2A] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 z-[140] bg-[#0C1B2A]/90 backdrop-blur-md border-b border-[#E59A1E]/30">
        <div className="flex items-center gap-2 text-[#FAF8F5]">
          <span className="text-xs font-bold text-[#E59A1E] uppercase tracking-wider">Jain Genius Campus</span>
          <span className="text-xs text-slate-300 font-medium">Explore</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWelcome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-sm font-medium transition-all hover:scale-105 cursor-pointer"
          >
            <span>Back to Welcome</span>
          </button>
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E59A1E] text-[#0C1B2A] hover:bg-[#F3A628] font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <span>Exit Campus</span>
          </button>
        </div>
      </div>

      <div className="flex-grow relative">
        <Canvas
          shadows
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ position: new THREE.Vector3(0, 4, 6), fov: 60 }}
          style={{ height: '100%', width: '100%' }}
        >
          <Sky sunPosition={[50, 10, 50]} />
          <Environment preset="city" />
          <fog attach="fog" args={['#0C1B2A', 40, 120]} />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={60} blur={2} far={12} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[15, 25, 10]} intensity={1.1} castShadow />
          <hemisphereLight intensity={0.5} />

          <mesh position={[0, 0, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} receiveShadow>
            <circleGeometry args={[26, 64]} />
            <meshStandardMaterial color={GRASS.color} roughness={GRASS.roughness} metalness={GRASS.metalness} />
          </mesh>

          <mesh position={[0, 0.02, 0]} rotation={[ -Math.PI / 2, 0, 0 ]} receiveShadow>
            <circleGeometry args={[9, 64]} />
            <meshStandardMaterial color={STONE_PATH.color} roughness={STONE_PATH.roughness} metalness={STONE_PATH.metalness} />
          </mesh>

          {HOTSPOTS.map((hotspot) => (
            <HotspotBuilding
              key={hotspot.id}
              hotspot={hotspot}
              lang={lang}
              onNavigate={onNavigate}
            />
          ))}

          <mesh position={[0, 1, -22]}>
            <boxGeometry args={[26, 6, 2]} />
            <meshStandardMaterial color={NIGHT_BUILDING.color} roughness={NIGHT_BUILDING.roughness} metalness={NIGHT_BUILDING.metalness} />
          </mesh>

          {!reduceMotion && (
            <OrbitControls
              enableZoom
              enablePan
              maxDistance={40}
              minDistance={6}
              target={[0, CENTER_Y, -5]}
              dampingFactor={0.1}
              enableDamping
            />
          )}
        </Canvas>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[140] flex flex-col items-center gap-1 text-[#FAF8F5]/80 text-[10px] font-medium tracking-wider uppercase px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        <span>Click a building to visit that section</span>
        <span>{lang === 'en' ? '• Hover to highlight' : '• उजागर करने के लिए होवर करें'}</span>
      </div>
    </div>
  );
};

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

export default CampusScene;
