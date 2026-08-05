# GSAP implementation patterns

These are compact patterns. Adapt selectors and framework lifecycle to the project; do not paste them blindly.

## React/Next.js with `useGSAP`

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.65, ease: "power2.out" } });
    tl.from(".hero-kicker", { y: 16, autoAlpha: 0 })
      .from(".hero-title", { y: 28, autoAlpha: 0 }, "<0.1")
      .from(".hero-cta", { y: 12, autoAlpha: 0 }, "<0.12");
  }, { scope: root });
  return <div ref={root}>{/* scoped elements */}</div>;
}
```

For a project without `@gsap/react`, use `useLayoutEffect` plus `gsap.context()` and return `ctx.revert()`. Do not use global selector strings outside a scoped root.

## Timeline with reduced motion

```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });
  tl.from(".item", { y: 20, autoAlpha: 0, stagger: 0.08 });
});
// call mm.revert() on teardown
```

In reduced mode, render content in its final state. Do not hide content waiting for an animation that has been skipped.

## ScrollTrigger scrub

```ts
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    start: "top top",
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    scrub: 0.7,
    pin: true,
    invalidateOnRefresh: true,
  },
});
```

Keep the horizontal track overflow-safe, provide a mobile fallback, and skip the entire setup under reduced motion.

## Sticky stack

Use one pinned card per stage only when stacking communicates comparison or progression. Use `pinSpacing: false` deliberately and set `start: "top top"`; verify the final card and teardown behavior.

## Flip layout transition

```ts
const state = Flip.getState(cards);
container.classList.toggle("expanded");
Flip.from(state, {
  duration: 0.55,
  ease: "power2.inOut",
  absolute: true,
  stagger: 0.03,
  onComplete: () => Flip.killFlipsOf(cards),
});
```

Use Flip for visible layout-state changes, not as a substitute for a coherent layout model.

## Lifecycle checklist

- Register plugins once at the client/module boundary.
- Scope selectors to a component root.
- Revert contexts, matchMedia, and ScrollTriggers on unmount.
- Recalculate dynamic distances on refresh.
- Animate transforms/opacity before layout properties.
- Test keyboard, touch, resize, slow devices, and reduced motion.
