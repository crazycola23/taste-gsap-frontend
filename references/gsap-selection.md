# GSAP capability routing

Use the smallest relevant capability. These rules consolidate the companion GSAP series skills.

| Need | Use | Core rule |
|---|---|---|
| Basic DOM/SVG tween, easing, stagger, reduced motion | `gsap-core` | Prefer transform aliases, `autoAlpha`, documented eases, and `gsap.matchMedia()`. |
| React or Next.js | `gsap-react` | Prefer `useGSAP`, refs, scoped selectors, and automatic cleanup. |
| Vue, Nuxt, Svelte, SvelteKit, or another non-React framework | `gsap-frameworks` | Use the framework mount/unmount lifecycle and revert animations on teardown. |
| Multi-step choreography | `gsap-timeline` | Use a timeline, defaults, labels, and position parameters; avoid delay chains. |
| Pinning, scrubbing, parallax, horizontal scroll | `gsap-scrolltrigger` | Pin the wrapper, use precise start/end values, and clean up every trigger. |
| ScrollTo, Flip, Draggable, Inertia, Observer, SplitText, SVG, physics | `gsap-plugins` | Register only the plugins actually used; check touch and reduced-motion fallbacks. |
| Clamp, mapRange, normalize, snap, wrap, pipe, array helpers | `gsap-utils` | Keep calculations pure and avoid per-frame React state updates. |
| Jank, FPS, layout thrash, large lists | `gsap-performance` | Prefer transform/opacity, batch measurements, minimize will-change, and avoid forced layout. |

## Canonical implementation rules

```tsx
const root = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add({
    desktop: '(min-width: 768px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  }, ({ conditions }) => {
    const { desktop, reduceMotion } = conditions as { desktop: boolean; reduceMotion: boolean };
    if (reduceMotion) return;
    const tl = gsap.timeline({ defaults: { duration: desktop ? 0.7 : 0.45, ease: 'power2.out' } });
    tl.from('.hero-line', { y: 24, autoAlpha: 0, stagger: 0.08 });
  }, root);
  return () => mm.revert();
}, { scope: root });
```

For ScrollTrigger, prefer a top-level tween or timeline with `scrollTrigger`, not triggers nested inside other timelines. Use `gsap.context()`/`useGSAP` scope and revert on teardown. Never use a raw scroll event loop.
