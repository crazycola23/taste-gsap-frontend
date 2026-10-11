# Taste + GSAP Frontend

A Codex skill for designing distinctive marketing frontends and implementing purposeful GSAP motion across React, Next.js, Vue, Svelte, and vanilla projects.

It combines Taste-style art direction and content discipline with a capability-oriented GSAP implementation workflow. The goal is not maximum animation everywhere: it is a visual result that matches the brief, from restrained to cinematic, without hiding technical options behind an over-conservative default.

## What changed in v3

- separated motion mode (Static/Subtle/Directed/Narrative) from creative ambition (restrained/expressive/cinematic);
- corrected the legacy numeric intensity mapping so 9–10 means high ambition, not automatically scroll-driven Narrative;
- made the capability catalog explicitly an index, not a ceiling on advanced GSAP usage;
- added an advanced-motion playbook for SplitText, SVG, Flip, ScrollTrigger architecture, interaction plugins, and performance guardrails;
- added forward-test prompts for cinematic intent, advanced capability selection, and avoiding generic under-delivery;
- retained the Design Read, Motion Map, content provenance, framework lifecycle, reduced-motion, mobile, and cleanup requirements.

## Use

Explicitly invoke the skill when the task calls for it:

~~~text
Use $taste-gsap-frontend to build this landing page with a Directed mode and cinematic creative ambition.
~~~

For a static page:

~~~text
Use $taste-gsap-frontend with MOTION_INTENSITY: 1. Do not add an animation dependency.
~~~

For a narrative scroll sequence:

~~~text
Use $taste-gsap-frontend to create a chapter-based product story with ScrollTrigger pinning and scrub, with mobile and reduced-motion fallbacks.
~~~

## Audit the result

From the skill directory, scan a frontend project or source folder:

~~~bash
node scripts/audit-motion.mjs /path/to/frontend
node scripts/audit-motion.mjs --strict /path/to/frontend
node scripts/audit-motion.test.mjs
~~~

The auditor reports common hazards such as raw scroll loops, missing cleanup signals, missing reduced-motion handling, unscoped selectors, per-frame state updates, and multiple infinite loops. It is a static warning tool, not a replacement for a browser pass.

## Structure

~~~text
SKILL.md
agents/openai.yaml
references/
├─ design-read.md
├─ framework-lifecycles.md
├─ gsap-advanced-motion.md
├─ gsap-catalog.md
├─ gsap-patterns.md
├─ gsap-selection.md
├─ motion-levels.md
├─ qa-checklist.md
└─ taste-variants.md
scripts/
├─ audit-motion.mjs
└─ audit-motion.test.mjs
evals/
├─ advanced-motion-prompts.md
└─ prompts.md
~~~

## Design and motion contract

Taste decides why the page should look and move a certain way. GSAP decides how coordinated motion is implemented reliably. The skill must respect the requested level of expression; accessibility, performance, and lifecycle safety are acceptance criteria, not reasons to replace an ambitious brief with a generic effect.

Complex motion must support mobile behavior, keyboard interaction, prefers-reduced-motion, and component teardown cleanup.

## License

MIT
