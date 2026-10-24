# Plan: Realistic 3D Walkthrough (Procedural PBR)

## Goal
Make the 3D walkthrough (gate scene + campus scene) look realistic using procedural geometry enhanced with PBR materials, IBL environment, contact shadows, and a sky — no external GLTF assets. Realism jump without asset-management risk.

## Decision (resolved)
- Procedural geometry only (no GLTF). GLTF can be added later for hero elements once baseline is solid.
- Quality target: "good enough for a marketing website" (not photoreal).
- Skybox: drei `Sky` + `Environment` (city preset) for IBL.

## Affected files
- `src/components/walkthrough/GateScene.tsx` — lighting, sky, fog, PBR materials, contact shadows, gate detail, watchman.
- `src/components/walkthrough/CampusScene.tsx` — lighting, sky, fog, PBR ground/path, building detail (windows/roofs), contact shadows.
- `src/components/walkthrough/Watchman.tsx` — better procedural character, idle sway, PBR materials.
- `src/components/walkthrough/WalkthroughView.tsx` — loading screen polish (optional).

## Implementation tasks (ordered)

### 1. Shared 3D environment setup (both scenes)
- Replace flat ambient+directional with: `<Environment preset="city" />` for IBL, `<Sky sunPosition={[100, 20, 100]} />`, fog `<fog attach="fog" args={['#87CEEB', 30, 90]} />` (gate) / `['#0C1B2A', 40, 120]` (campus night).
- Add `<ContactShadows position={[0,-0.01,0]} opacity={0.5} scale={40} blur={2} far={10} />`.
- Enable shadows on Canvas: `gl={{ ... }}` already; add `shadows` prop to `<Canvas shadows>`.

### 2. GateScene realism
- Gate pillars: stone PBR (roughness 0.9, color #6B7280) with subtle normal-ish via box bevels.
- Gate leaves: wood PBR (color #5C3A21, roughness 0.7).
- Gold details: metalness 0.9, roughness 0.15, envMapIntensity 1.5.
- Ground: grass PBR (color #2D6A4F, roughness 0.95) with slight variation; path: stone (color #9CA3AF, roughness 0.6).
- Add lamps (cylinder + sphere emissive) flanking gate.
- Add Jain Genius sign text via drei `<Text>` or `<Html>` overlay on gate.
- Watchman rendered at entrance with PBR materials.

### 3. Watchman improvements
- Add PBR materials (navy uniform metalness 0.1 roughness 0.6, skin roughness 0.8).
- Add idle animation via `useFrame` (gentle sway + arm swing) — respect reduced motion.
- Add a small "welcome" speech bubble indicator (optional).

### 4. CampusScene realism
- Ground: large plane with grass PBR + subtle noise via vertex colors or texture-less variation.
- Central path: stone PBR circle.
- Buildings: layered boxes (base + roof slab + window strips) with PBR materials; windows emissive at night.
- Hotspot labels: keep drei `<Html>` tooltips but style as branded signboards.
- Add a few trees/props (cone + cylinder) for life.
- Contact shadows under buildings.

### 5. Materials helper
- Create a small `src/components/walkthrough/materials.ts` exporting reusable PBR material props objects (stone, wood, gold, grass, glass) to keep consistency. (Optional but recommended.)

### 6. Camera & motion
- Gate: keep existing cinematic easing but add slight FOV/position polish; respect reduced motion.
- Campus: OrbitControls with damping already; ensure min/max distances feel good.

### 7. Loading & fallback
- Keep WebGL fallback message; ensure `Suspense` fallback shows branded loading bar (already in WalkthroughView).
- Add `onError` boundary? Optional — skip for now; fallback covers no-WebGL.

## Validation
- `npm run build` completes without errors.
- `tsc --noEmit` passes.
- Manual: walkthrough renders, gate animates, watchman shows, campus hotspots clickable, reduced-motion respected, WebGL fallback works, no console errors.
- Performance: acceptable on mid-range laptop (target 30+ fps).

## Risks
- drei `Environment`/`Sky` increase bundle size; acceptable for a marketing site.
- `ContactShadows` can be expensive; tune `blur`/`far`.
- PBR materials with no textures still look flat-ish; consider adding procedural noise via `onBeforeCompile` only if needed (defer).

## Out of scope
- GLTF model loading (deferred).
- Real texture files (deferred; procedural colors only).
- Mobile-specific optimizations beyond existing reduced-motion handling.