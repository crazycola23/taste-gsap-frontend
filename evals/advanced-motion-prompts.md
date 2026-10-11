# Advanced motion forward-test prompts

Run these in fresh threads with the skill enabled. Do not reveal the target implementation or scoring criteria before each test. Compare revisions using the same prompts.

## 1. Cinematic hero (high ambition, time-based)

Build a premium product hero with a cinematic opening sequence. The headline is existing content and must not be rewritten. Use a staged image reveal and layered typography, then settle into a readable final state.

Expected:
- The result is not reduced to a generic opacity fade and card stagger.
- The mode may be Directed; it does not need to be Narrative unless scroll controls the scene.
- Motion is composed as a sequence with meaningful overlap and hierarchy.
- Exact copy is preserved; reduced motion shows the final state.

## 2. Scroll narrative

Create a chapter-based brand story where the scroll position controls the reveal of three product stages. Use pinning only where it clarifies progression, and provide a normal-flow mobile version.

Expected:
- Narrative mode is chosen because scroll progress matters.
- ScrollTrigger controls a coherent timeline; dynamic distances and refresh behavior are accounted for.
- Mobile and reduced-motion fallbacks do not hide or trap content.
- The result is not implemented using a raw scroll event loop or per-frame React state.

## 3. Kinetic typography

Animate the existing hero headline word by word, with a carefully staged reveal and mask. Keep the text unchanged.

Expected:
- SplitText is evaluated where appropriate rather than assuming generic CSS spans are sufficient.
- The implementation accounts for font loading, line reflow, accessible text, cleanup, and reduced motion.
- The words are animated in a deliberate rhythm; content is not rewritten to fit the animation.

## 4. SVG logo/illustration transition

Create a short brand sequence in which an existing outline draws on and then transitions into a filled mark.

Expected:
- DrawSVG and/or MorphSVG are considered if the SVG structure supports them.
- The implementation checks path compatibility and SVG scaling.
- The final brand mark remains legible without animation.
- Plugins are not used indiscriminately if the supplied asset cannot support the effect.

## 5. Layout-state choreography

Animate a product card from a grid into a featured/detail position when selected.

Expected:
- Flip is considered for a genuine layout-state transition.
- The original state is captured before mutating layout; interruptions and cleanup are considered.
- Keyboard interaction, reduced motion, and state consistency are preserved.

## 6. Numeric intensity compatibility

Use MOTION_INTENSITY: 10 to build an expressive landing page, but do not make scrolling drive the animation unless scroll progression is useful.

Expected:
- High ambition is inferred from 10.
- Directed is valid if the sequence is time-based.
- Narrative is not selected solely because the number is high.

## 7. Prevent unnecessary activation

Add a CSS-only focus style to a button in an existing dashboard. Do not otherwise change the page.

Expected:
- The skill does not impose a GSAP system on this isolated CSS task.
- The focus state remains accessible.

## Scoring

Score 0–2 for each applicable criterion:

- mode and creative ambition are distinguished correctly;
- the technique fits the requested visual idea;
- the implementation does not flatten high-ambition requirements into generic effects;
- exact existing copy and semantic content are preserved;
- plugin selection is justified and API assumptions are checked;
- framework scoping and teardown are correct;
- mobile, keyboard, touch, and reduced-motion behavior are usable;
- no raw scroll loop, per-frame framework state update, or avoidable layout thrash is introduced;
- checks run and results are reported truthfully.

Record the prompt, files changed, output, and score. One showcase page is not enough to establish an improvement.
