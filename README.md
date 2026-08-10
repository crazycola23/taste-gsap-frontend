# Taste + GSAP Frontend

A Codex skill for designing distinctive marketing frontends and implementing
purposeful, accessible GSAP motion across React, Next.js, Vue, Svelte, and
vanilla projects.

It is intentionally a skill package, not a runnable frontend application. The
skill is most useful when a page needs coordinated timelines, ScrollTrigger
pinning, scrub, parallax, or an existing-motion audit.

## What changed in v2

- narrower trigger boundaries so ordinary app UI does not activate the skill;
- four named motion levels instead of relying only on a subjective 1–10 scale;
- a required Design Read and Motion Map before implementation;
- self-contained visual direction and token guidance;
- framework-specific lifecycle and SSR guidance;
- reduced-motion, mobile, keyboard, and cleanup acceptance checks;
- `scripts/audit-motion.mjs` for deterministic static warnings;
- `scripts/audit-motion.test.mjs` for a smoke test of the auditor.

## Use

Explicitly invoke the skill when the task calls for it:

```text
Use $taste-gsap-frontend to build this landing page with a Directed motion level.
```

For a static page:

```text
Use $taste-gsap-frontend with MOTION_INTENSITY: 1. Do not import Motion or GSAP.
```

For a narrative scroll sequence:

```text
Use $taste-gsap-frontend to implement the sticky stack and horizontal story with ScrollTrigger, including mobile and reduced-motion fallbacks.
```

## Audit the result

From the skill directory, scan a frontend project or source folder:

```bash
node scripts/audit-motion.mjs /path/to/frontend
node scripts/audit-motion.mjs --strict /path/to/frontend
node scripts/audit-motion.test.mjs
```

The auditor reports common hazards such as raw scroll loops, missing cleanup
signals, missing reduced-motion handling, unscoped selectors, per-frame state
updates, and multiple infinite loops. It is a static warning tool, not a
replacement for a browser pass.

## Structure

```text
SKILL.md
agents/openai.yaml
references/
├─ design-read.md
├─ framework-lifecycles.md
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
└─ prompts.md
```

## Design and motion contract

Taste decides why the page should look and move a certain way. GSAP decides how
coordinated motion is implemented reliably. Every animation must communicate
hierarchy, narrative, feedback, or a state change; it must not exist only for
decoration.

Complex motion must support mobile behavior, keyboard interaction,
`prefers-reduced-motion`, and component teardown cleanup.

## License

MIT
