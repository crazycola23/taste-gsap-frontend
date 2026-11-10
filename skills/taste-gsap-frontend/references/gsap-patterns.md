# GSAP implementation patterns

Use these only for a region GSAP owns; the kit already owns its entrance and moments.
Check imports against the installed versions. Keep final content visible in HTML/CSS.

## React / Next.js

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function ProductMotion() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-product-art]", {
        scale: 0.98, duration: 0.8, ease: "power2.out",
      });
    }, root);
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root}><div data-product-art>{/* real product visual */}</div></div>;
}
```

This media query matches desktop AND phone; a desktop-only condition would silently
skip mobile. Add separate breakpoint branches when the composition needs them.
Use `dependencies` plus `revertOnUpdate: true` when inputs rebuild the animation.
For callbacks that create animations after setup, use `contextSafe` and remove their
event listeners on cleanup. Context ownership does not remove arbitrary DOM listeners.

## Native-scroll story with scoped cleanup

Use only for a custom scene, never around a sticky kit moment. Import/register
ScrollTrigger in the client module first.

```js
const mm = gsap.matchMedia();
mm.add({
  desktop: "(min-width: 768px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
}, ({ conditions }) => {
  if (!conditions.desktop || conditions.reduceMotion) return;
  const travel = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);
  if (!travel()) return;
  gsap.to(track, {
    x: () => -travel(),
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: () => "+=" + travel(),
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}, wrapper);
// Return this from the framework's mount lifecycle, or call when removing the view.
const destroy = () => mm.revert();
```

The phone and reduced-motion CSS use normal vertical flow. Refresh after relevant
images/fonts/layout data settle; do not refresh on every animation frame.

## Flip for an actual layout change

Capture `Flip.getState(elements)` before the DOM/layout mutation, then call
`Flip.from(state, { duration: 0.45, ease: "power2.inOut" })`.
Under reduced motion apply the layout mutation instantly without Flip. Wrap delayed
event handlers in the owning context, handle interruption, and preserve focus.
Do not use a decorative hover flip on kit cards.
