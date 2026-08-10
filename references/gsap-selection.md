# GSAP capability routing

Use the smallest relevant capability. These routes are guidance inside this
skill; they do not require separate skills to be installed.

| Need | Use | Core rule |
|---|---|---|
| Basic DOM/SVG tween, easing, stagger, reduced motion | `gsap-core` | Prefer transform aliases, `autoAlpha`, documented eases, and `gsap.matchMedia()`. |
| React or Next.js | `@gsap/react` + scoped refs | Prefer `useGSAP`, refs, scoped selectors, and automatic cleanup. |
| Vue, Nuxt, Svelte, SvelteKit, or another non-React framework | framework lifecycle | Create on mount and revert or kill on teardown. |
| Multi-step choreography | `gsap.timeline()` | Use defaults, labels, and position parameters; avoid delay chains. |
| Pinning, scrubbing, parallax, horizontal scroll | `ScrollTrigger` | Pin the wrapper, use precise dynamic distances, and clean up every trigger. |
| ScrollTo, Flip, Draggable, Inertia, Observer, SplitText, SVG, physics | one required plugin | Register only the plugin actually used; check touch and reduced-motion fallbacks. |
| Clamp, mapRange, normalize, snap, wrap, pipe, array helpers | `gsap.utils` | Keep calculations pure and avoid per-frame React state updates. |
| Jank, FPS, layout thrash, large lists | performance review | Prefer transform/opacity, batch measurements, minimize will-change, and avoid forced layout. |

Inspect the project's installed GSAP version before using a plugin or helper.
Do not silently add a dependency when an existing CSS or framework-native
solution is sufficient.

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
  });
}, { scope: root });
```

The `useGSAP` scope owns the animations created inside it. If a media-query
object, plugin listener, or animation is created outside that scope, add an
explicit framework cleanup and call its `.revert()` or `.kill()` method.

For ScrollTrigger, prefer a top-level tween or timeline with `scrollTrigger`, not triggers nested inside other timelines. Use `gsap.context()`/`useGSAP` scope and revert on teardown. Never use a raw scroll event loop.
