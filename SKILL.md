---
name: taste-gsap-frontend
description: Design and implement distinctive marketing, brand, and portfolio frontends with purposeful motion from subtle to cinematic. Use for coordinated GSAP timelines, expressive hero choreography, text or SVG animation, Flip transitions, MotionPath, ScrollTrigger pinning/scrubbing/parallax/horizontal stories, and motion audits. Preserve the project's stack, content, and accessibility. Avoid for ordinary utility UI or simple CSS-only effects unless explicitly requested.
---

# Taste + GSAP Frontend

Use this skill as a combined art-direction and motion-engineering workflow. Preserve the existing framework, viable brand assets, content, SEO, and accessibility unless the brief requests a change. User requirements override defaults in this skill.

Taste decides why the page should look and move a certain way. GSAP provides the mechanics for executing that direction reliably. Design taste and technical capability are complementary: visual restraint is a valid choice, but it is not a reason to under-deliver on an intentionally expressive brief.

The brief informs design decisions; it does not automatically become product copy.

## Operating contract

1. Inspect the project before choosing a visual direction, animation system, dependency, or implementation pattern.
2. Treat task instructions as control-plane context, not product content. Never reuse the user's brief, requirements, Design Read, Motion Map, acceptance criteria, or developer commentary as user-facing copy.
3. Visible copy may come from existing project content, user-provided copy, application/CMS data, or copy the user explicitly asks you to write. Preserve existing copy unless modification is requested. Do not invent marketing claims, testimonials, badges, headlines, or CTAs from design adjectives.
4. State a concise Design Read and Motion Map before implementation. If the user asks for direct coding, keep them brief and proceed without waiting for approval.
5. Choose the simplest implementation that fully satisfies the requested visual result—not the simplest effect regardless of the brief. Never downgrade an explicitly cinematic, premium, experimental, immersive, or high-impact request to a generic fade/stagger merely because it is easier or more restrained.
6. Do not add motion just because GSAP is available. Every motion should serve hierarchy, narrative, feedback, tactility, spatial understanding, or a meaningful state change.
7. If the user requests motion off, choose Static, render content in its final visible state, and do not add an animation dependency.
8. Preserve the existing framework, design system, copy, routing, and assets whenever viable. User instructions take precedence over defaults and examples in this skill.
9. Verify the result with available build, lint, and test commands plus the motion audit script when applicable. Never claim checks passed unless they ran.
10. Before handoff, check both motion behavior and content provenance. Do not let implementation language or inferred marketing claims leak into the rendered interface.

## 1. Read the project

Identify the page kind, audience, first-viewport job, visual signals, existing design tokens, framework, routing, asset loading, motion ownership, and current dependencies. Inspect package metadata and components before installing libraries. Preserve existing conventions when they are viable.

Treat product descriptions and task context as design inputs only. They may inform hierarchy, composition, density, contrast, visual tone, and motion, but they are not automatically authorized sources of user-facing copy.

Avoid defaulting to purple gradients, a centered dark mesh hero, equal feature cards, generic glassmorphism, or one-font-everywhere typography. Choose a visual system that serves the actual content and state the reason briefly.

## 2. Define motion mode and creative ambition

Use the modes in references/motion-levels.md. These are two separate decisions:

- **Motion mode** describes how motion behaves: Static, Subtle, Directed, or Narrative.
- **Creative ambition** describes the requested degree of visual expression: restrained, expressive, or cinematic/high-impact.

Do not confuse Narrative with “the most animated.” Narrative specifically means the scroll position drives a meaningful sequence or relationship. A highly polished, character-by-character title animation can be Directed; a quiet pinned comparison can be Narrative.

Translate explicit language such as premium, cinematic, editorial, immersive, playful, experimental, Awwwards-like, or product-film-inspired into a concrete motion concept rather than treating it as permission for random effects. For high-ambition briefs, actively consider advanced timing, masks, split typography, image choreography, SVG drawing/morphing, path motion, layout transitions, layered depth, or scroll-linked scenes when they fit the content. You do not need to use every technique; explainable selection beats plugin collecting.

If the user supplies a numeric MOTION_INTENSITY value, use it as a guide to creative ambition, not as a substitute for deciding whether scroll should control the animation. See references/motion-levels.md for the compatibility mapping.

## 3. Produce the Design Read and Motion Map

Before editing, write:

~~~text
Design Read: [page kind/audience]; [visual direction]; [type/layout/color system and why].
Motion mode: [Static | Subtle | Directed | Narrative].
Creative ambition: [restrained | expressive | cinematic/high-impact].
Motion Map:
- [region] — [purpose] — [owner/technique] — [trigger] — [mobile fallback] — [reduced-motion fallback]
~~~

The Motion Map should identify a few meaningful sequences, not prescribe an animation for every element. For a brief that asks for a distinctive hero, plan the hero as a composition with timing, hierarchy, entrances/exits, and spatial relationships—not just a list of independent fade-ins.

Use references/design-read.md for visual decisions and references/motion-levels.md for modes and fallbacks. Load references/content-boundary.md when the task adds or modifies user-facing content.

## 4. Choose the right animation system

- **CSS** owns hover, focus, active, simple reveal, color, and small transform feedback when no coordination, timeline control, scroll progress, or complex lifecycle is needed.
- **An existing animation system** owns layout transitions when the project already relies on Motion or another framework-native solution and it can satisfy the brief.
- **GSAP** owns coordinated sequences, nested timelines, precise sequencing, SplitText choreography, complex SVG/path effects, Flip transitions, ScrollTrigger pin/scrub/parallax, gesture plugins, and interactions requiring precise control or reversal.

Never animate the same property from multiple systems without defining the handoff. Read references/gsap-selection.md before selecting a capability. For cinematic briefs, complex type or SVG motion, advanced scroll behavior, or plugin-specific work, also read references/gsap-advanced-motion.md. The catalog is an index, not a technical ceiling.

## 5. Implement deliberately

Follow references/framework-lifecycles.md for the active framework and load only the relevant sections.

- Scope selectors to a component root; prefer element refs over global selectors.
- Use @gsap/react with useGSAP or gsap.context() in React/Next.js and revert on teardown.
- Use the framework mount/unmount lifecycle in Vue, Svelte, and vanilla code.
- Register plugins once at the appropriate module/client boundary. Inspect the installed GSAP version and confirm the target API before using it; do not assume every plugin is installed or available in every project.
- Use gsap.matchMedia() for breakpoints and reduced-motion conditions. In reduced mode, essential content must be visible immediately.
- Animate transforms and opacity when they express the design well; do not contort the visual result merely to avoid a necessary layout or SVG animation.
- Put ScrollTrigger on a top-level tween/timeline. Use function-based distances and invalidateOnRefresh for dynamic layout; refresh after fonts, images, or content change measurements.
- For pinning, generally pin a stable wrapper and animate its children. Provide a normal-flow mobile alternative when a pin or horizontal track would harm usability.
- Provide keyboard and touch alternatives for drag, gesture, or horizontal storytelling. Never make essential navigation or content depend only on wheel gestures.
- Respect prefers-reduced-motion by removing or simplifying nonessential movement, not by hiding content. Avoid pinning, parallax, autoplay loops, and physics in reduced mode.
- Keep continuous loops rare and purposeful. Do not implement continuous scroll behavior with raw scroll event loops or per-frame React state updates.
- Clean up contexts, timelines, media-query handlers, ScrollTriggers, event listeners, observers, and draggable instances on teardown.

## 6. Verify before handoff

Run the project's available checks. When source files are available, also run:

~~~bash
node scripts/audit-motion.mjs <source-or-project-path>
~~~

Use --strict in CI or when the user asks for a hard gate. Review references/qa-checklist.md. Report checks that could not run.

Verify at minimum:

- The selected visual and motion direction matches the brief rather than a generic template.
- High-ambition requests received a genuinely considered motion design; they were not flattened into generic reveals.
- Content is visible and usable with reduced motion.
- Keyboard focus, touch input, and the page's natural scroll behavior remain usable.
- Desktop and narrow mobile layouts do not overflow or depend on hover.
- Dynamic ScrollTrigger distances refresh after layout changes.
- Contexts, media queries, observers, and triggers clean up on unmount.
- No raw scroll loop, duplicate marquee, or avoidable layout shift was added.
- Build/lint/tests/audit outcomes are reported truthfully.

## Reference routing

- references/design-read.md — art direction, tokens, content density, and anti-template checks.
- references/content-boundary.md — content provenance and copy preservation.
- references/motion-levels.md — motion mode, creative ambition, numeric compatibility, and fallbacks.
- references/framework-lifecycles.md — React/Next, Vue/Nuxt, Svelte, and vanilla setup/cleanup.
- references/gsap-selection.md — capability routing and implementation guardrails.
- references/gsap-catalog.md — quick API family index; not a cap on what may be used.
- references/gsap-advanced-motion.md — advanced plugin selection, complex choreography, scroll architecture, and failure modes.
- references/gsap-patterns.md — concise implementation skeletons.
- references/taste-variants.md — optional visual variants; use only when the brief calls for one.
- references/qa-checklist.md — acceptance checks and handoff format.

Load the capability index first, then the advanced or framework reference needed for the task. Do not load every reference by default.

## Default response contract

Before implementation, provide the Design Read, motion mode, creative ambition, and ownership of each important motion area. At handoff, summarize changed files, checks run, reduced-motion behavior, mobile behavior, and known limitations.
