# Taste + GSAP Frontend

A Codex skill that combines Taste Skill's visual direction with GSAP motion engineering.

Use it for landing pages, portfolios, brand sites, and redesigns built with React, Next.js, Vue, Svelte, or vanilla frontend code.

## What it provides

- Brief reading: page type, audience, visual language, and design system
- Anti-template design rules for layout, typography, spacing, color, and density
- `MOTION_INTENSITY` from static to advanced choreography
- GSAP tweens, timelines, stagger, easing, ScrollTrigger, pin, scrub, and parallax
- Plugin routing for Flip, Draggable, Observer, SplitText, MotionPath, and more
- React/framework lifecycle cleanup, responsive breakpoints, performance, and reduced motion
- A deliberate split: CSS/Motion for simple reveals, GSAP for coordinated or scroll-driven motion

## Installation

Copy this directory into the Codex skills directory:

```text
~/.codex/skills/taste-gsap-frontend
```

On Windows:

```text
C:\Users\CX\.codex\skills\taste-gsap-frontend
```

## Usage

Call the single combined skill:

```text
Use $taste-gsap-frontend to build this frontend page.
```

To disable automatic motion:

```text
Use $taste-gsap-frontend with MOTION_INTENSITY: 1. Do not import Motion or GSAP.
```

For complex scroll motion:

```text
Use $taste-gsap-frontend and implement the sticky stack, ScrollTrigger scrub, and horizontal pan with GSAP.
```

## Structure

```text
SKILL.md
LICENSE
agents/openai.yaml
references/
├─ gsap-catalog.md
├─ gsap-patterns.md
├─ gsap-selection.md
└─ taste-variants.md
```

## Design and motion contract

Taste decides why the page should look and move a certain way. GSAP decides how the motion is implemented reliably. Every animation must communicate hierarchy, narrative, feedback, or a state change; it must not exist only for decoration.

Complex motion must support mobile behavior, keyboard interaction, `prefers-reduced-motion`, and component teardown cleanup.

## License

MIT
