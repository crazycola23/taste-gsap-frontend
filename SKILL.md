---
name: taste-gsap-frontend
description: Design and implement motion-rich marketing frontends with purposeful GSAP animation. Use for landing pages, portfolios, brand sites, and redesigns that explicitly need coordinated timelines, ScrollTrigger pinning, scrub, parallax, or a motion audit. Preserve the existing stack and design system. Do not use for ordinary dashboards, forms, static pages, or simple hover and reveal effects that CSS can handle.
---

# Taste + GSAP Frontend

Use this skill as a focused design-and-motion workflow. Preserve the existing
framework, viable brand assets, content, SEO, and accessibility behavior unless
the brief asks for a change. User requirements override this skill.

Taste decides why the page should look and move a certain way. GSAP decides how
coordinated motion is implemented reliably.

The brief informs design decisions; it does not become product content.

## Operating contract

1. Inspect the project before choosing a visual direction or animation library.

2. Treat task instructions as control-plane context, not product content.
   Never derive, summarize, paraphrase, transform, or creatively reuse the
   user's task description, design brief, implementation instructions,
   requirements, acceptance criteria, Design Read, Motion Map, or developer
   commentary as user-facing copy.

3. User-facing copy may come only from:
   - existing product content already present in the project;
   - copy explicitly supplied by the user for the page;
   - application or CMS data intended to be rendered;
   - new copy the user explicitly asks you to write.

   When copy is missing, preserve existing content or use minimal neutral
   placeholders. Do not invent homepage headlines, taglines, feature claims,
   badges, testimonials, navigation labels, or CTA copy from the task brief.

4. State a concise Design Read and Motion Map before implementation. If the
   user asks for direct coding, keep this to a few lines and continue without
   waiting for approval.

5. Use the smallest motion system that communicates the intended hierarchy,
   narrative, feedback, or state change. Do not add motion because GSAP is
   available.

6. Keep motion optional. If the user says motion off, use Static level, do not
   import Motion or GSAP, and render content in its final visible state.

7. Preserve existing user-facing copy unless the user explicitly asks to
   rewrite, replace, shorten, localize, or otherwise modify it.

8. Verify the result with the project's available build, lint, and test commands
   plus the motion audit script when JavaScript or TypeScript is involved.

9. Before handoff, perform a content-provenance check in addition to the motion
   QA. No implementation language, task language, Design Read wording, or
   inferred marketing claims may leak into the rendered interface.

## 1. Read the project

Identify the page kind, audience, product or brand constraints, visual signals,
existing design tokens, framework, routing, asset loading, and current motion
ownership. Inspect package metadata and existing components before adding a
dependency. Preserve existing conventions when they are viable.

Treat product descriptions and task context discovered during this step as
design inputs only. They may inform hierarchy, composition, density, visual
tone, and motion decisions, but they are not automatically authorized sources
of user-facing copy.

Do not default to purple gradients, centered dark mesh heroes, equal feature
cards, generic glassmorphism, or Inter/slate-900. Choose a visual system that
serves the content and state the reason briefly.

## 2. Set the motion level

Use the four levels in `references/motion-levels.md`. If a brief provides the
legacy `MOTION_INTENSITY: 1–10`, map 1–3 to Static, 4–6 to Subtle, 7–8 to
Directed, and 9–10 to Narrative.

- **Static**: final-state layout with CSS feedback only.
- **Subtle**: restrained CSS or an already-installed animation library.
- **Directed**: coordinated GSAP timelines, stagger, or component transitions.
- **Narrative**: ScrollTrigger pinning, scrub, parallax, or horizontal stories.

Do not use Narrative behavior for a simple reveal. Do not use GSAP for a single
hover, focus, opacity, or transform transition that CSS can express clearly.

## 3. Produce the Design Read and Motion Map

Before editing, write:

```text
Design Read: [page kind] for [audience]; [visual direction]; [type/layout/color system].
Motion level: [Static | Subtle | Directed | Narrative].
Motion Map:
- [region] — [purpose] — [owner] — [trigger] — [mobile/reduced-motion fallback]
```

Use `references/design-read.md` for the visual decision and
`references/motion-levels.md` for the motion budget. Always load
`references/content-boundary.md` when the task creates or modifies user-facing
frontend content. Load only the other technical reference that matches the
chosen framework or GSAP capability.

## 4. Assign motion ownership

- **CSS** owns hover, focus, active, simple reveal, color, and small transform
  feedback when no coordination or scroll progress is needed.
- **The existing animation system** owns layout transitions when the project
  already uses Motion or another framework-native system.
- **GSAP** owns coordinated sequences, ScrollTrigger pin/scrub/parallax,
  timeline labels, gesture plugins, and interactions that need precise control.

Never animate the same property from two animation systems without documenting
the handoff. Load `references/gsap-selection.md` before selecting a plugin or
ScrollTrigger pattern.

## 5. Implement safely

Follow `references/framework-lifecycles.md` for the active framework.

- Scope selectors to a component root; prefer refs over global selectors.
- Use `useGSAP` or `gsap.context()` in React/Next.js and revert on teardown.
- Use the framework mount/unmount lifecycle in Vue, Svelte, and vanilla code.
- Use `gsap.matchMedia()` for breakpoints and reduced-motion conditions.
- Animate transforms and opacity before layout-heavy properties.
- Keep ScrollTrigger on a top-level tween or timeline; use function-based
  distances and refresh after fonts or images change layout.
- Provide a touch and keyboard alternative for drag, gesture, or horizontal
  storytelling interactions.
- Collapse pinning, parallax, infinite loops, and magnetic physics under
  `prefers-reduced-motion: reduce`; never hide essential content while waiting
  for an animation that is skipped.
- Keep at most one continuous marquee or loop per page unless the brief makes a
  second loop essential and the performance cost is understood.
- Never implement continuous scroll behavior with a raw `scroll` event loop or
  per-frame React state updates.

## 6. Verify before handoff

Run the project's available checks. When source files are available, also run:

```bash
node scripts/audit-motion.mjs <source-or-project-path>
```

Use `--strict` in CI or when the user asks for a hard gate. Review
`references/qa-checklist.md` and report any checks that could not run.

Verify at minimum:

- content is visible and usable with reduced motion;
- keyboard focus and touch input remain usable;
- desktop and narrow mobile layouts do not overflow or depend on hover;
- dynamic ScrollTrigger distances refresh after layout changes;
- contexts, media queries, and triggers clean up on unmount;
- no raw scroll loop, duplicate marquee, or avoidable layout shift was added;
- the chosen motion level is justified by the content.

## Reference routing

- `references/design-read.md` — visual direction, tokens, density, and anti-template checks.
- `references/content-boundary.md` — content provenance, copy preservation, and prevention of instruction-to-copy leakage.
- `references/motion-levels.md` — four motion levels, budgets, and fallbacks.
- `references/framework-lifecycles.md` — React/Next, Vue/Nuxt, Svelte, and vanilla setup/cleanup.
- `references/gsap-selection.md` — choose core, timeline, ScrollTrigger, plugins, utilities, or performance patterns.
- `references/gsap-patterns.md` — concise implementation skeletons.
- `references/gsap-catalog.md` — API families and when to use them.
- `references/taste-variants.md` — optional visual variants; use only when the brief calls for one.
- `references/qa-checklist.md` — acceptance checks and handoff format.

## Default response contract

Before implementation, provide the Design Read, motion level, and ownership of
each motion area. At handoff, summarize changed files, checks run, reduced-motion
behavior, mobile behavior, and any remaining limitation. Do not claim a check
passed unless it actually ran.
