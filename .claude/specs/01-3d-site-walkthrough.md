# Specification: Jain Genius 3D Site Walkthrough

## 1. Problem Statement & Objectives
The Jain Genius website provides comprehensive information but lacks an immersive way to experience the "campus" or the essence of the organization. The objective is to create a 3D virtual walkthrough that serves as an interactive storytelling layer, guiding users through a cinematic entrance into a virtual campus where 3D locations map to functional website sections.

## 2. User Stories
- **As a new visitor**, I want to click an "Explore" button on the homepage so that I can experience the Jain Genius environment in 3D.
- **As a visitor**, I want to see a cinematic entrance sequence (branding $\rightarrow$ gate opening $\rightarrow$ welcome) to feel immersed in the experience.
- **As a visitor**, I want to move through the virtual campus and interact with buildings or signboards to learn more about specific sections (e.g., "Programmes", "Impact").
- **As a visitor**, I want a clear way to exit the 3D experience and return to the standard 2D website navigation at any time.
- **As a user with motion sensitivity**, I want the 3D experience to respect my reduced-motion preferences.

## 3. Functional Requirements (FR)
### 3.1 Entry & Sequence
- **FR1: Trigger**: The walkthrough must be accessible via an "Explore" button added to the `Hero` component.
- **FR2: Cinematic Intro**:
    - Display Jain Genius branding on a closed main gate.
    - Trigger a gate-opening animation.
    - Transition from the gate to the campus interior.
- **FR3: Welcome Sequence**: A watchman NPC (Non-Player Character) must stand near the entrance and provide a welcome message (text-based or animated).
- **FR4: Exploration**: The user must be able to navigate the 3D environment (First-person or Third-person orbit).

### 3.2 Integration & Navigation
- **FR5: Hotspots**: Specific 3D objects (buildings, rooms, signboards) must be interactive "hotspots".
- **FR6: Portal Logic**: Interacting with a hotspot must trigger the `handleNavigate` callback in `App.tsx` to the corresponding `PageId`.
- **FR7: Exit Mechanism**: A persistent "Exit Walkthrough" or "Back to Site" button must be visible, triggering `handleNavigate('home')`.

## 4. Non-Functional Requirements (NFR)
- **NFR1: Performance**: 
    - The 3D engine must be lazy-loaded to avoid impacting initial page load.
    - A branded loading screen with a progress bar is required.
- **NFR2: Visual Consistency**: The 3D environment must use the site's theme:
    - Navy: `#0C1B2A` (Primary)
    - Gold: `#E59A1E` / `#F3A628` (Accents)
    - Cream: `#FAF8F5` (Backgrounds)
- **NFR3: Responsiveness**: The walkthrough must be functional on both desktop and mobile browsers.
- **NFR4: Accessibility**: 
    - Must support `prefers-reduced-motion` (disables cinematic camera pans).
    - Key interactions must be reachable via keyboard.
- **NFR5: Asset Constraints**: Use only free, legally usable (CC0 or similar) 3D assets or procedural geometry. No paid APIs or large unoptimized assets.

## 5. Navigation & Interaction Contract
The following verified `PageId` routes from `App.tsx` will be the destinations for 3D hotspots:

| 3D Location/Hotspot | Website Target (`PageId`) | Interaction Type |
| :--- | :--- | :--- |
| Main Entrance / Welcome Center | `home` | Click/Interact |
| History Hall / Archive | `about` | Click/Interact |
| Activity Hub | `what-we-do` | Click/Interact |
| Learning Center / Classrooms | `programmes` | Click/Interact |
| Event Plaza | `events` | Click/Interact |
| Art Gallery / Showcase | `gallery` | Click/Interact |
| Success Wall / Impact Center | `impact` | Click/Interact |
| Member Lounge | `membership` | Click/Interact |
| News Kiosk | `news` | Click/Interact |
| Inquiry Desk | `contact` | Click/Interact |

## 6. Technical Constraints & Dependencies
- **Framework**: React 19.
- **3D Engine**: Three.js via `@react-three/fiber` and `@react-three/drei`.
- **Animation**: Framer Motion for UI overlays; Three.js `AnimationMixer` for 3D animations.
- **Assets**: GLTF/GLB format or procedural geometry.
- **Loading**: Use `React.lazy` and `Suspense` for the walkthrough component.

## 7. Loading & Error Handling
- **Loading State**: Full-screen overlay with branded loading bar.
- **Fallback**: If WebGL is not supported, display: "Your browser does not support 3D experiences. Please explore our site using the standard menu."
- **Error Recovery**: Use generic placeholder objects for failed asset loads.

## 8. Acceptance Criteria (by Milestone)
### M1: Entry Point & Shell
- [ ] "Explore" button exists in `Hero` and triggers `handleNavigate('walkthrough')`.
- [ ] `Walkthrough` page renders as a separate view in `App.tsx`.
- [ ] Standard website navigation (Header/Footer) remains functional.

### M2: Cinematic Gate
- [ ] Main gate renders with Jain Genius branding.
- [ ] Gate opens via animation on load.
- [ ] Camera transitions from outside to inside the campus.

### M3: Watchman Interaction
- [ ] Watchman NPC renders at the entrance.
- [ ] Welcome message triggers upon arrival.
- [ ] Interaction initiates the exploration phase.

### M4: Navigable Campus
- [ ] User can navigate the campus environment.
- [ ] All 10 verified hotspots are present and interactive.
- [ ] Clicking a hotspot triggers the correct `PageId` navigation.

### M5: Optimization & Validation
- [ ] Loading screen displays progress accurately.
- [ ] Experience is usable on mobile touch devices.
- [ ] `prefers-reduced-motion` removes camera animations.
- [ ] Build command (`npm run build`) completes without errors.
