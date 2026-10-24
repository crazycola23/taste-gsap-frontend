# Framework lifecycles

Use only the section for the active stack. Keep the animated surface isolated
from server-rendered code when the framework requires a client boundary.

## React and Next.js

- Add a client boundary only to the component that owns browser animation.
- Prefer `useGSAP` with a root ref and scoped selectors. If `@gsap/react` is
  unavailable, use `useLayoutEffect` with `gsap.context()`.
- Keep match-media setup inside the scoped lifecycle. If a media-query object is
  created outside that scope, explicitly call `.revert()` on cleanup.
- Do not put a continuously changing animation value into React state.
- Re-run dynamic measurements after images, fonts, or layout-affecting data are
  ready; use `invalidateOnRefresh` for function-based ScrollTrigger distances.

## Vue and Nuxt

- Create animations in `onMounted` and keep the root element in a template ref.
- Use a GSAP context or a local collection of triggers/timelines.
- Revert the context and kill any separately-created media query or plugin
  state in `onBeforeUnmount`.
- Guard browser-only imports and DOM access in SSR builds.

## Svelte and SvelteKit

- Create animations in `onMount`; return a cleanup function from that callback.
- Keep selectors scoped to the component root and avoid module-level DOM work.
- Gate browser-only GSAP plugins behind the client lifecycle in SvelteKit.
- Restore final-state styles when reduced motion is active.

## Vanilla HTML/CSS/JS

- Initialize after the relevant DOM and fonts are ready.
- Store every returned tween, timeline, media-query object, and ScrollTrigger
  that must be destroyed when the page or view is replaced.
- Use a root element and element references instead of document-wide selectors.
- Use `matchMedia` or `gsap.matchMedia()` for reduced motion and breakpoints.

## Common teardown shape

```ts
const ctx = gsap.context(() => {
  // scoped timelines and ScrollTriggers
}, root);

return () => ctx.revert();
```

When using a framework helper that owns the context, do not create a second
independent animation lifecycle for the same property. Let one owner clean up.
