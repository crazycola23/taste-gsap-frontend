# Taste + GSAP Frontend

A coding-agent skill combining the **complete tasteskill 2.5.1 website kit** from
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) with GSAP motion engineering.
Taste supplies composition, typography, photography, UI assets and browser checks;
GSAP supplies purposeful choreography with scoped cleanup and accessible fallbacks.

## Install

```bash
npx skills add https://github.com/crazycola23/taste-gsap-frontend --skill taste-gsap-frontend
```

Or run `./install.sh --codex` / `./install.sh --all-agents` from a permanent checkout
to link the skill. The install name remains `taste-gsap-frontend`.

## Use

```text
Use $taste-gsap-frontend to build a product website.
Use Directed motion with cinematic ambition; keep the heading readable.
```

```text
Use $taste-gsap-frontend to restyle this Next.js page.
Preserve its copy, brand, server actions and routes. Motion mode: Static.
```

The entry selects a full website, existing-product, app-screen, component, motion-only
or review route. Small changes load only the references they need. Motion mode
(Static / Subtle / Directed / Narrative) and creative ambition are separate decisions.

## What is included

- The complete upstream kit: system and layout, trade palettes and type, licensed
  photographs, icons, UI fragments, diagrams, effects, objects, moments and scenes.
- The current dealers and checks: `start.mjs`, `photos.mjs`, `icons.mjs`,
  `moments.mjs`, `effects.mjs`, `copy-lint.mjs`, `consistency.mjs`,
  `perf.mjs`, `shoot.mjs`, `gate.mjs` and layout tools.
- GSAP capability routing, framework lifecycles, accessible patterns, advanced
  choreography and a source audit for common motion hazards.
- Explicit integration rules: one animation owner per property; user-requested
  Static mode; existing framework, real content and brand preserved.
- A pinned upstream inventory with hashes, so missing assets and accidental edits
  are caught in CI. See [UPSTREAM.md](UPSTREAM.md).

The original upstream workflow is preserved in
`skills/taste-gsap-frontend/references/taste-workflow.md`. The shorter `SKILL.md`
is the active integration entry. No Stop hook is automatically installed by this fork;
the manual finish gate is used for full website builds.

## Requirements and validation

Node **22+** and Chrome, Edge or Chromium. Optional ffmpeg helps with photo processing.
Bundled assets work offline; additional photo/icon/font downloads need network access.
The skill scripts install nothing and require no API keys.

Repository checks:

```bash
npm install --no-save --no-package-lock yaml@2.6.1
node tests/frontmatter.mjs
node tests/text-encoding.mjs
node tests/upstream-integrity.mjs
node tests/scripts-parse.mjs
node skills/taste-gsap-frontend/scripts/audit-motion.test.mjs
node --test tests/motion-audit.mjs
```

Optional real-browser kit regression (one model or the whole kit):

```bash
node tests/kit-clean.mjs --only hero-split.html
```

For generated custom GSAP source:

```bash
node skills/taste-gsap-frontend/scripts/audit-motion.mjs --strict src
```

The audit is heuristic: review warnings and verify actual playback, reduced motion,
mobile behavior and teardown in a browser. A clean static scan is not proof of those.
The kit settles motion in ordinary headless screenshots; its documented
`data-motion="live"` mode is needed to inspect actual playback.

## Migration from 4.x

This is a **5.0.0** update from tasteskill 2.1.4 to 2.5.1. The old `draw.mjs`,
`inspect.mjs`, `lint.mjs` and shared stage are retired upstream. Use the current
dealers, system and checker; do not mix old project kit copies with new ones.
Existing app screens use the scoped app route instead of marketing-site quotas.

For Static or specifically requested custom motion, retain honest checker output and
record individual, explained waivers when an upstream motion quota conflicts with the
brief. `GATE: OPEN` is unresolved findings, never a pass. Real content and rendering
behavior take priority over defaults such as draft contacts or static export.

## Credits and licence

The upstream kit and archived workflow are © 2026 Leonxlnx, MIT, synced from
[commit f6b7657](https://github.com/Leonxlnx/taste-skill/commit/f6b76575f949707b4e3c37cd86cb44b0b98643e8).
This repository's GSAP integration and audit are MIT. Photography and third-party
assets retain their individual licence and credit requirements.
