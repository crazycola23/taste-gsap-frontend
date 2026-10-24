# Taste + GSAP Frontend

A skill for coding agents that combines **tasteskill v2** (art direction distilled from a study of
247 curated gallery sites, synced from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
2.1.4) with a **deliberate GSAP motion layer**: purposeful motion from restrained to cinematic
across React, Next.js, Vue, Svelte and vanilla projects.

Taste decides why the page should look and move a certain way. GSAP provides the mechanics for
executing that direction reliably. The goal is not maximum animation everywhere: it is a visual
result that matches the brief, from quiet to cinematic, without hiding technical options behind an
over-conservative default and without shipping the average AI landing page.

## What the sync brings in from tasteskill v2 (2.1.4)

- **The dealt direction:** `scripts/draw.mjs` deals researched directions, hero and section
  compositions, type systems of free fonts, palettes, photographs, motions and scroll scenes from
  `library/` (distilled from 247 studied sites). Adopt, don't blend.
- **Real pictures, credited:** `scripts/assets.mjs` searches Openverse, Wikimedia Commons, the Art
  Institute of Chicago and the Met (no API keys) for pictures of the subject's world; `--get`
  downloads with the licence, `--credits` prints the footer line. `--video` finds open-licence
  footage.
- **A measured house style:** `scripts/lint.mjs` scans source; `scripts/inspect.mjs` opens the page
  in a real browser at 1440/768/390 and measures the rules (headline line counts, eyebrows,
  gradients, resting shadows, the assistant palette, the frame, still-page floor, and more).
- **Scroll scenes:** the shared GSAP/Lenis stage in `assets/scenes/` and `scripts/scenes.mjs`, which
  photographs every scene at 0–100% of its hold, on desktop, phone and under reduced motion.
- **App screens:** dashboards, admin, settings and inboxes get their own run, draw (`draw.mjs
  --app`), shell and charts (`assets/app.css`, `assets/charts.js`) and inspector rules
  (`references/app-screens.md`).
- **The look-and-fix loop:** screenshot critique with an Awwwards-weighted rubric
  (`references/critique.md`), fix the top three, repeat, at most three rounds.
- **The redesign route:** record the before, keep the stack and content, prove the after.

## What the GSAP layer keeps from this repo

- **Motion mode and creative ambition as separate decisions** (Static / Subtle / Directed /
  Narrative × restrained / expressive / cinematic), with the legacy `MOTION_INTENSITY` mapping.
- **The Design Read and Motion Map**, stated before implementation and never rendered as content.
- **Engine routing:** CSS for the quiet layer, GSAP for coordinated sequences (timelines, SplitText,
  Flip, MotionPath, ScrollTrigger pinning/scrubbing/parallax/horizontal), existing systems for what
  they already own — the catalog is an index, not a ceiling.
- **Content provenance on existing products:** the brief is design context, never product copy.
- **`scripts/audit-motion.mjs`:** static scan for raw scroll loops, missing cleanup, missing
  reduced-motion fallbacks, unscoped selectors, per-frame state updates and stacked infinite loops.

## Use

~~~text
Use $taste-gsap-frontend to build this landing page with a Directed mode and cinematic creative ambition.
~~~

For a static page:

~~~text
Use $taste-gsap-frontend with MOTION_INTENSITY: 1. Do not add an animation dependency.
~~~

For a full taste run on a fresh page, the skill's 11-step run covers it end to end: inventory,
argument, dealt direction, idea, Design Read + Motion Map, copy deck, still build (real pictures,
live thing, scroll scenes), the gate, the look, the motion layer, the report.

## Install

~~~bash
npx skills add https://github.com/crazycola23/taste-gsap-frontend --skill taste-gsap-frontend
~~~

or from a checkout: `./install.sh` (Claude Code), `./install.sh --codex`, or `./install.sh
--all-agents` (symlinks, so `git pull` updates in place).

## Requirements

Node 22+ and an installed Chrome, Edge or Chromium for the inspector; Node 18+ for `draw.mjs`,
`lint.mjs`, `assets.mjs` and `audit-motion.mjs`. Nothing is installed by the scripts; no API keys.
A full run takes an agent roughly 30–45 minutes and a few hundred thousand tokens.

## Audit the result

~~~bash
node skills/taste-gsap-frontend/scripts/audit-motion.mjs /path/to/frontend
node skills/taste-gsap-frontend/scripts/audit-motion.mjs --strict /path/to/frontend
node skills/taste-gsap-frontend/scripts/audit-motion.test.mjs
~~~

## Structure

~~~text
skills/taste-gsap-frontend/
├─ SKILL.md                    the 11-step run, house rules, laws, special cases
├─ agents/openai.yaml          Codex interface
├─ references/                 21 files: tasteskill core + GSAP layer
├─ scripts/                    draw, assets, lint, inspect, scenes, audit-motion (+ lib/)
├─ library/                    the dealt data: directions, heroes, sections, type, palettes,
│                              photos, sites, motions, app styles
├─ assets/                     base.css/js, scenes/ (stage + demos), app.css, charts.js
└─ evals/                      evals.json + motion forward-test prompts
tests/                         frontmatter, profile-cleanup (CI: .github/workflows/check-skills.yml)
.claude-plugin/ .codex-plugin/ .agents/plugins/   plugin manifests
install.sh                     symlink installer
~~~

## Design and motion contract

Taste decides why the page looks and moves a certain way; GSAP decides how coordinated motion is
implemented reliably. The skill respects the requested level of expression; accessibility,
performance, lifecycle cleanup and the measured house rules are acceptance criteria, not reasons to
replace an ambitious brief with a generic effect — and never a licence to break the readability of
the page.

Complex motion must support mobile behavior, keyboard interaction, `prefers-reduced-motion`, and
component teardown cleanup.

## Credits and license

The art-direction core (SKILL.md run, house rules, references, library, scripts, assets) comes from
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT), synced at 2.1.4. The
motion-engineering layer (motion modes, Design Read/Motion Map, GSAP references, audit-motion) is
this repository's work. MIT.
