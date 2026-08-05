---
name: taste-gsap-frontend
description: Design distinctive landing pages, portfolios, and redesigns, then implement purposeful accessible motion with GSAP across React, Next.js, Vue, Svelte, or vanilla frontend code. Use when a frontend task needs both visual direction and coordinated animation, especially timelines, ScrollTrigger, pinning, scrub, parallax, or interaction polish.
---

# Taste + GSAP Frontend

Use this as the single frontend design-and-motion director. Preserve the existing project's stack and brand assets unless the brief asks for a change.

## Authority and division of labor

1. Read the brief before coding. State one Design Read: page kind, audience, vibe, and design system.
2. Taste controls visual intent: hierarchy, composition, typography, spacing, color, density, and whether motion is justified.
3. GSAP controls implementation: tweens, timelines, easing, plugins, ScrollTrigger, lifecycle cleanup, responsive behavior, and performance.
4. Never add motion merely because GSAP is available. Every animation must communicate hierarchy, narrative, feedback, or a state transition.
5. Keep the skill's motion layer optional. If the user says “motion off”, set `MOTION_INTENSITY: 1`, do not import Motion or GSAP, and ship static CSS states only. Otherwise infer a 1–10 value from the brief; 1–3 means no automatic animation, 4–7 means restrained fluid motion, and 8–10 means advanced choreography.

## Workflow

### 1. Read the room

Identify page kind, audience, vibe words, references, existing assets, accessibility or regulatory constraints, and whether this is greenfield or redesign. Do not default to purple gradients, centered dark mesh heroes, equal feature cards, generic glassmorphism, or Inter/slate-900.

Use a real design system where one applies. Keep hero copy concise, keep the initial viewport useful, and make mobile collapse rules explicit.

### 2. Choose the motion layer

- **Static (`1–3`)**: no automatic entrance, scroll, marquee, parallax, or physics. Allow only useful CSS hover/focus/active feedback unless the user explicitly requests a one-off animation.
- **Fluid (`4–7`)**: use CSS or Motion for simple reveals, layout transitions, and light interaction states. Use GSAP for coordinated sequences or effects that need precise control.
- **Choreographed (`8–10`)**: use GSAP timelines and ScrollTrigger for motivated pin/scrub, sticky stacks, horizontal pans, or narrative sequences. Keep one marquee maximum per page.

Prefer Motion's `whileInView` for simple reveal-on-scroll if Motion is already present. Use GSAP for actual pinning, scrubbing, scroll hijacks, complex sequencing, plugins, or when the user explicitly requests GSAP. Do not mix two animation systems on the same property or component without a clear reason.

### 3. Implement safely

- React/Next.js: isolate animated leaves as client components, prefer `useGSAP` or `gsap.context()`, scope selectors to a ref, and clean up on unmount.
- Vue/Svelte/other frameworks: create animations in the framework mount lifecycle and revert/kill them on unmount.
- ScrollTrigger: use `start: "top top"` for pinned sections when the section must begin at the viewport top; calculate dynamic distances in functions; refresh after layout-affecting assets load.
- Timelines: use `gsap.timeline({ defaults })`, labels, and position parameters instead of scattered delays.
- Performance: animate transforms and opacity; avoid layout-heavy properties; batch reads and writes; do not put continuous values in React state; never use a raw `window.addEventListener('scroll', ...)` loop.
- Accessibility: respect `prefers-reduced-motion`; collapse pinning, parallax, infinite loops, and magnetic physics to static or instant behavior. Test keyboard focus and touch behavior.
- Responsive behavior: use `gsap.matchMedia()` for breakpoint-specific setup and reduced-motion conditions, then revert it on teardown.

### 4. Verify before handoff

Check the design read, motion rationale, mobile behavior, reduced-motion fallback, cleanup, no raw scroll loop, no accidental layout shift, no duplicate marquee, and no motion that obscures content or interaction.

## Reference routing

The skill includes a compact GSAP knowledge base. Load the relevant reference before writing animation code; do not guess plugin APIs:

- `references/gsap-catalog.md` — the available GSAP animation families, plugins, methods, and when to use them.
- `references/gsap-patterns.md` — implementation skeletons for core tweens, timelines, ScrollTrigger, React, framework lifecycles, plugins, and reduced motion.
- `references/gsap-selection.md` — choose among core, React/framework, timeline, ScrollTrigger, plugins, utils, and performance patterns.
- `references/taste-variants.md` — adapt the visual direction using the companion Taste variants without loading every variant by default.

## Default response contract

Before implementation, output the Design Read and the chosen `MOTION_INTENSITY`. Briefly identify which animation system owns each motion area. If motion is disabled, say so and do not smuggle in GSAP or Motion imports.
