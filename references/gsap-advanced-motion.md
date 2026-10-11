# Advanced GSAP motion playbook

Use this reference when the brief calls for high-impact art direction, cinematic or immersive choreography, text/SVG effects, complex scroll scenes, or a plugin-specific interaction. It extends the index in gsap-catalog.md; it does not require every project to use advanced techniques.

## 1. Design the sequence before selecting APIs

For a hero or scene, describe the visual beats first: establish the initial frame, direct attention, reveal the main subject, add supporting detail, then settle into a usable state. Decide which elements move together, which overlap, which remain still, and how the sequence resolves. Use timeline labels and nested timelines to express those relationships; do not build the page as a collection of unrelated delays.

A strong sequence might combine a masked headline reveal, a product image crop/scale, a restrained background or SVG path movement, and a delayed supporting element. Use only the ingredients that reinforce the same idea. Do not animate every element merely because the page is meant to feel premium.

## 2. Advanced capability map

| Visual result | Candidate API | Planning notes |
|---|---|---|
| Kinetic words, lines, characters, staggered type | SplitText | Decide line/word/character granularity based on the typography. Preserve the exact copy; account for reflow and font loading. |
| Text or object reveal through a clipped mask | SplitText masks, wrapper overflow, nested timeline | Make sure hidden content is still accessible and is not left invisible if motion is skipped. |
| Draw-on logo, route, outline, diagram | DrawSVG | Confirm the SVG has suitable strokes and that scaling/stroke behavior matches the art direction. |
| Brand mark or illustration transforms into another shape | MorphSVG | Confirm path compatibility; create a stable visual resting state and test across responsive sizes. |
| Object follows a curve or moves with orientation | MotionPath | Treat path coordinates, alignment, auto-rotation, and resize behavior as part of the composition. |
| Card moves from grid to featured view, list reorder, expanding media | Flip | Capture the old state before changing layout; use absolute/nested options only when needed and verify stacking/overflow. |
| Pinned product comparison or chapter-based story | ScrollTrigger + timeline | Use pinning for a meaningful spatial relationship, dynamic end distances, markers during development, and a normal-flow mobile fallback. |
| Progress-linked visual transformation | ScrollTrigger scrub | Use ease: "none" for directly progress-mapped movement. Keep key content readable through the full progress range. |
| Drag, throw, swipe, or full-scene gesture | Draggable / Inertia / Observer | Keep controls discoverable and provide keyboard alternatives. Do not hijack normal scrolling for a decorative flourish. |
| Distinctive easing or elastic accent | CustomEase / EasePack / CustomWiggle / CustomBounce | Define a coherent timing language; reserve unusual curves for moments that need emphasis. |
| Pointer-following, magnetic hover, frequent position updates | quickTo / quickSetter | Bound values, avoid per-frame framework state updates, honor reduced motion, and clean up listeners. |

Plugin names and import paths can vary by installed version. Check the actual package/API before implementation instead of guessing.

## 3. SplitText reliability and accessibility

- Split only as granularly as the effect needs. Character-level effects are expensive and often harder to read; line- or word-level motion is usually more robust.
- Where line layout can change, consider autoSplit and put animation creation inside onSplit so it targets the current split elements. Return the tween/timeline when required by the API so re-splits can clean up and synchronize correctly.
- Account for font loading, element width changes, and responsive reflow. Never assume a line split measured at initial render remains valid forever.
- Preserve semantic content and exact copy. Do not rewrite text to improve animation timing.
- Check aria behavior and nested links/inline markup. Screen readers should receive the intended phrase once, and interactive descendants must remain operable.
- Ensure the unanimated/reduced-motion state is visible and call revert or use the owning GSAP context during teardown.

Canonical docs: https://gsap.com/docs/v3/Plugins/SplitText/

## 4. ScrollTrigger architecture

- Attach ScrollTrigger to the top-level tween/timeline that it controls. Do not put independently triggered ScrollTriggers inside a timeline.
- For pinning, pin a stable wrapper and animate children. Be deliberate about pinSpacing and the geometry of following sections.
- Use function-based start/end values for content whose dimensions vary. Use invalidateOnRefresh when tween values must be recalculated; refresh only after meaningful layout changes settle.
- Consider refresh order when many scenes depend on measurements. Use markers during development and remove them from production.
- A horizontal story should calculate travel from actual track and viewport dimensions, avoid hard-coded wide-screen distances, and return to ordinary vertical flow on narrow screens when appropriate.
- containerAnimation-based triggers have limitations (including pinning and snapping). Do not assume every ScrollTrigger feature composes with a fake-horizontal-scroll track.
- Use snap only when it helps the reader land on meaningful stages. Never make the page feel trapped, break anchor navigation, or prevent touch users from moving naturally.
- Test browser resizing, loaded fonts/images, route changes, and teardown to detect stale triggers or cumulative pin spacing.

Canonical docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

## 5. Flip and layout changes

Flip is for animating between two real layout states, not for replacing the layout model itself.

1. Call Flip.getState() before changing classes, order, or DOM state.
2. Apply the state/layout mutation.
3. Call Flip.from() using the captured state.
4. Manage interruption, rapid repeated interaction, and cleanup; avoid overlapping Flip instances fighting the same elements.
5. Validate nested transforms, stacking context, clipping, and responsive layout before adding absolute positioning.

Canonical docs: https://gsap.com/docs/v3/Plugins/Flip/

## 6. SVG and MotionPath

- Prefer animating a small number of meaningful paths or shapes instead of every SVG node.
- Verify viewBox, responsive scaling, fill/stroke behavior, transform origin, and path compatibility before animating.
- For path travel, coordinate the starting position with the path's geometry and use auto-rotation only when orientation is semantically useful.
- Provide the final illustration/brand mark without motion, and avoid morphing essential iconography into ambiguous intermediate states.

Docs: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/
https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/

## 7. Interaction, input, and smooth scrolling

- Use Draggable for a real drag affordance such as a carousel thumb, reorderable list, or direct manipulation surface. Set bounds/snapping as needed and provide keyboard-operable controls for the same task.
- Inertia requires the appropriate plugin; do not assume it is available simply because Draggable is installed.
- Use Observer when normalizing deliberate wheel/touch/pointer gestures. Keep it scoped and clean up its listeners. Avoid replacing native document scrolling with full-page wheel gestures unless the user explicitly asks for that interaction and accessible alternatives are provided.
- ScrollTo is for animating the scroll position to an anchor/target. ScrollSmoother changes the broader scroll experience; it is not a drop-in substitute for ScrollTrigger and needs careful touch, focus, fixed-position, and reduced-motion testing.

Docs: https://gsap.com/docs/v3/Plugins/Draggable/
https://gsap.com/docs/v3/Plugins/Observer/
https://gsap.com/docs/v3/Plugins/ScrollToPlugin/
https://gsap.com/docs/v3/Plugins/ScrollSmoother/

## 8. Performance and delivery

- Prefer transform/opacity when they suit the design, but do not sacrifice the intended art direction solely to avoid a different property.
- Avoid read/write layout thrashing. Measure geometry before animating and avoid repeatedly reading layout inside per-frame callbacks.
- Use quickTo or quickSetter for suitable high-frequency pointer updates; do not push every frame through React state.
- Do not add will-change broadly or permanently. Apply it only when there is a measured reason and remove it when no longer needed.
- Keep infinite loops and physics sparse, pause or remove them when off-screen where appropriate, and disable nonessential motion under prefers-reduced-motion.
- Register plugins at the appropriate boundary and make the owning context responsible for timelines, tweens, ScrollTriggers, matchMedia objects, observers, event listeners, and draggable instances.
- For advanced API signatures, exact options, or version-sensitive behavior, verify the canonical docs linked above and the installed package version before coding.

## Review question

After implementation, ask: does the motion express a clear visual idea, does each transition have a job, and did the result meet the brief's requested ambition without sacrificing control, readability, accessibility, or performance?
