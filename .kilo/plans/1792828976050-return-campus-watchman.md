# Plan: Return-to-Campus + Watchman Gate Opener

## Goal
Add a contextual "Return to Campus" control on content pages after a campus-building visit, and make the gate watchman the agent that opens the gate.

## Decisions
- Track `cameFromCampus` in App state, set true when CampusScene navigates to a content page, cleared on walkthrough/exit.
- Show "Return to Campus" floating button only when `cameFromCampus` is true and current page is a content page.
- Button navigates to `exploration` (CampusScene).
- Watchman animates to gate and triggers gate opening; camera waits until gate opens.

## Affected Files
- `src/App.tsx`: add `cameFromCampus` state; pass wrapped navigate to CampusScene; render floating button.
- `src/components/walkthrough/CampusScene.tsx`: on hotspot click, mark campus origin (via callback or App-level flag).
- `src/components/walkthrough/GateScene.tsx`: make gate opening contingent on watchman action; pass callback.
- `src/components/walkthrough/Watchman.tsx`: add walk-to-gate + arm push animation calling `onOpenGate`.

## Implementation Tasks
1. Add `cameFromCampus` state and `handleCampusNavigate` in App that sets flag and navigates.
2. Pass `onNavigate={handleCampusNavigate}` to CampusScene.
3. Add floating "Return to Campus" button (bottom-left) visible when cameFromCampus && currentPage not in {walkthrough, exploration, home?}. On click navigate to exploration and keep flag.
4. Clear flag when entering walkthrough or home or admin.
5. Watchman: accept `onOpenGate` prop; animate group from (3,0,-1.5) to (0,0,0) over ~1.5s, then call onOpenGate once; respect reduced motion (immediate).
6. GateScene: start animationStep at 0; don't auto-open; when onOpenGate fires set step 1. Camera sequence remains.
7. GateScene pass onOpenGate to Watchman (render watchman at start? currently only when welcomeShown; need render earlier). Render Watchman immediately inside gate scene, passing onOpenGate.

## Validation
- tsc --noEmit, npm run build.
- Manual: click building -> page -> button -> campus; watchman opens gate then camera moves.

## Risks
- Watchman rendered before welcome; ensure no duplicate.
- Reduced motion: skip walk and open immediately.
