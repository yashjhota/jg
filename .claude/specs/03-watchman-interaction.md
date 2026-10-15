# Specification: M3 Watchman Interaction for Jain Genius 3D Walkthrough

## 1. Feature Overview
Add a friendly watchman NPC (Non-Player Character) at the campus entrance who welcomes visitors after the M2 gate-opening animation completes and the camera settles. This initiates the exploration phase of the 3D walkthrough experience.

## 2. Requirements

### 2.1 Functional Requirements
- **FR3.1**: Add a modular watchman component in the existing walkthrough architecture
- **FR3.2**: Use a lightweight, locally generated 3D character or simple procedural geometry (prefer polished, friendly character)
- **FR3.3**: Place the watchman naturally beside the entrance path, outside the camera's path
- **FR3.4**: Trigger the welcome only after the M2 camera arrival completes (when animationStep === 3)
- **FR3.5**: Display an accessible welcome panel with a short, friendly greeting in both English and Hindi
- **FR3.6**: Include a clear Continue button that advances to the next walkthrough stage
- **FR3.7**: Preserve existing functionality: Skip Animation, Exit, reduced-motion support, WebGL fallback, lazy loading, and language behavior
- **FR3.8**: Clean up event handlers and animation resources appropriately

### 2.2 Non-Functional Requirements
- **NFR3.1**: Performance-friendly - use simple geometry or low-poly model
- **NFR3.2**: Maintain visual consistency with existing 3D environment
- **NFR3.3**: Respect prefers-reduced-motion media query
- **NFR3.4**: Ensure keyboard accessibility for all interactive elements
- **NFR3.5**: Support WebGL fallback for unsupported browsers

## 3. Implementation Details

### 3.1 Component Structure
Create a new `Watchman.tsx` component in `src/components/walkthrough/` that:
- Generates a simple 3D character using Three.js basic geometries (Box, Cylinder, Sphere) or loads a lightweight GLTF model
- Positions the watchman beside the entrance path (outside camera trajectory)
- Includes animation/idle state for the character
- Triggers welcome message display when camera arrival is detected

### 3.2 Welcome Panel
Create an accessible HTML panel that:
- Appears after M2 camera animation completes (animationStep === 3)
- Displays localized welcome message:
  - English: "Welcome to Jain Genius! I'm here to help you explore our campus."
  - Hindi: "जीनियस जैन में आपका स्वागत है! मैं आपको हमारे परिसर की खोज करने में मदद करने के लिए यहाँ हूँ।"
- Includes a prominent Continue button
- Respects reduced-motion preferences (no animations if enabled)
- Is keyboard navigable

### 3.3 Integration Points
Modify `GateScene.tsx` to:
- Import and render the Watchman component
- Add state tracking for welcome message display
- Trigger welcome panel when animationStep === 3 and welcome not yet shown
- Continue button should transition to exploration phase (not back to home)
- Clean up resources when component unmounts

### 3.4 Language Support
Use existing language conventions from App.tsx:
- Access `lang` prop passed to WalkthroughView → GateScene
- Conditionally render English/Hindi text based on `lang` value
- Ensure all UI text in watchman component follows this pattern

## 4. Acceptance Criteria
- [ ] Watchman NPC renders at the entrance beside the path
- [ ] Welcome message triggers automatically upon M2 camera arrival completion
- [ ] Welcome message is available in both English and Hindi
- [ ] Continue button advances to next walkthrough stage (exploration phase)
- [ ] Skip Animation functionality preserved
- [ ] Exit functionality preserved
- [ ] Reduced-motion support respected (disables welcome panel animations)
- [ ] WebGL fallback maintained
- [ ] Lazy loading preserved
- [ ] No modification to unrelated website/Firebase/authentication/admin/routing functionality
- [ ] Proper cleanup of event handlers and animation resources

## 5. Open Questions & Considerations
1. Should the watchman be a simple procedural geometry or attempt to load a lightweight character model?
2. What defines the "next walkthrough stage" for the Continue button if M4 is not implemented yet?
3. Should the watchman have any idle animations or remain static?
4. How should the welcome panel be positioned for optimal visibility on different screen sizes?

## 6. Dependencies
- Existing Three.js setup in GateScene.tsx
- React 19, @react-three/fiber, @react-three/drei
- Framer Motion for UI animations (if used for welcome panel)
- TypeScript