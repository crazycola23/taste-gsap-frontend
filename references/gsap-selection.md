# GSAP capability routing

This is a decision index, not a limit on animation ambition. Pick the smallest correct implementation for the requested result, not the smallest-looking effect. If the brief calls for cinematic, expressive, kinetic, experimental, or immersive motion, evaluate advanced capabilities before settling on a generic fade/stagger.

## Capability routes

| Need or visual intent | Start with | Notes |
|---|---|---|
| DOM/SVG tween, properties, easing, stagger, keyframes | GSAP core | Use aliases, defaults, overwrite, keyframes, and matchMedia where appropriate. |
| Coordinated hero or component choreography | Timeline | Prefer labels, position parameters, nested timelines, and callbacks over a chain of unrelated delays. |
| React or Next.js | @gsap/react + scoped refs | Prefer useGSAP, a root scope, and automatic cleanup. |
| Vue, Nuxt, Svelte, SvelteKit, or another non-React framework | Framework lifecycle | Create on mount; revert/kill on teardown; guard browser-only code for SSR. |
| Scroll-linked scenes, pinning, scrubbing, parallax, horizontal story | ScrollTrigger | Use when scroll position has meaning. Compute dynamic distances with functions and refresh after layout changes. |
| Character/word/line choreography or masked type | SplitText | Read the advanced reference for autoSplit, onSplit, masks, re-splitting, and accessible text behavior. |
| Reflow, card expansion, grid/list changes, shared-element transitions | Flip | Capture state before the layout mutation, then animate to the new state. |
| SVG strokes, shape transitions, or movement along a path | DrawSVG, MorphSVG, MotionPath | Check path compatibility, dimensions, responsive scaling, and cleanup. |
| Pointer/touch dragging, velocity, wheel/swipe gesture | Draggable, Inertia, Observer | Use only for a real interaction need; provide keyboard/touch alternatives and preserve native scrolling where possible. |
| Scroll position tweening or site-wide smooth scrolling | ScrollTo, ScrollSmoother | These solve different problems. ScrollSmoother changes the page's scroll model and requires extra accessibility/device testing. |
| Custom branded timing or elastic accents | CustomEase, CustomWiggle, CustomBounce, EasePack | Establish a consistent motion language; avoid making every element bounce. |
| Continuous pointer-following or high-frequency updates | quickTo / quickSetter or a controlled ticker | Avoid React state updates every frame; ensure cleanup and reduced-motion behavior. |
| Jank, FPS, layout thrash, large lists | Performance review | Measure first; batch reads/writes and minimize unnecessary will-change/layer creation. |

## Implementation rules

- Inspect the installed GSAP version and project conventions before relying on an API. Register only plugins used, once at the correct app/client boundary.
- Never assume this catalog is the entire GSAP API. If the visual intent suggests another documented GSAP capability, investigate it instead of forcing the effect into a listed primitive.
- For advanced work, read references/gsap-advanced-motion.md and the relevant canonical documentation links it provides. Confirm exact imports, options, and version requirements before implementing.
- Avoid dependency changes when the existing animation system fully satisfies the brief. Do not avoid a necessary GSAP plugin only because the project does not currently import it; first weigh the requested result, dependency constraints, bundle cost, and whether the package is available.
- Prefer refs and scoped selectors. The useGSAP scope owns animations created inside it. Any independent media query, listener, Observer, or Draggable needs explicit cleanup.
- Keep ScrollTrigger on a top-level tween or timeline; do not put separately triggered ScrollTriggers inside another timeline. For pinning, pin a stable wrapper and animate its children.
- Never implement continuous scroll-linked motion with a raw scroll event or per-frame React state updates.
- For reduced motion, remove nonessential movement and pinning but keep content and state immediately available.

## Canonical React pattern

~~~tsx
const root = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add({
    desktop: "(min-width: 768px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  }, ({ conditions }) => {
    const { desktop, reduceMotion } = conditions as {
      desktop: boolean;
      reduceMotion: boolean;
    };
    if (reduceMotion) return;

    const tl = gsap.timeline({
      defaults: { duration: desktop ? 0.7 : 0.45, ease: "power2.out" },
    });
    tl.from(".hero-line", { y: 24, autoAlpha: 0, stagger: 0.08 });
  });
}, { scope: root });
~~~

The useGSAP scope should own animations created inside it. If an animation, plugin listener, media query, or observer is created outside that scope, add explicit teardown and call revert/kill as appropriate.

## Canonical references

- GSAP core: https://gsap.com/docs/v3/GSAP/
- Timelines: https://gsap.com/docs/v3/GSAP/Timeline/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
- Flip: https://gsap.com/docs/v3/Plugins/Flip/
- MotionPath: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- MorphSVG: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/
- DrawSVG: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
- Observer: https://gsap.com/docs/v3/Plugins/Observer/
- Draggable: https://gsap.com/docs/v3/Plugins/Draggable/
- GSAP utils: https://gsap.com/docs/v3/GSAP/UtilityMethods/
