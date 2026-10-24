# tasteskill v2 + GSAP (`taste-gsap-frontend`)

A design and motion skill for coding agents: tasteskill v2 (upstream
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) 2.1.4), built from a study of 247
curated sites (One Page Love and Awwwards Sites of the Day, October 2026), synced with a deliberate
GSAP motion layer. It gives an agent an art direction instead of letting it fall back on the average
landing page, holds it to a strict no-ornament house style checked in a real browser, makes it look
at its own render before calling the work done, and engineers motion from restrained to cinematic
with reduced-motion, mobile and cleanup guarantees.

## How it works

1. **Inventory.** The agent lists what only this client has: the name and what it means, the street,
   the numbers, the one constraint, the materials, the hours.
2. **Draw.** `scripts/draw.mjs` deals three of 20 directions (each an idea engine seen on the
   strongest studied sites); the agent picks the one that can carry something from the inventory, and
   the script deals the rest: a hero composition, section compositions, a type system of real free
   fonts, a palette, photographs, motions, scroll scenes, studied references, and under every
   blueprint a list of where it disagrees with the house rules. Recent draws are remembered so
   projects do not repeat.
3. **Idea and live thing.** One sentence tying the client's own material to the direction's device,
   checked against the nearest competitor, and one thing the visitor can do on the page.
4. **Design Read and Motion Map.** The plan is written down before markup: the dealt direction in
   the agent's own words, the motion mode (Static / Subtle / Directed / Narrative) and the creative
   ambition (restrained / expressive / cinematic) decided separately, and the mapped regions with
   their mobile and reduced-motion fallbacks (`references/motion-levels.md`).
5. **Build** from the sheet, words first, full content. When the project has no photographs of its
   own, `scripts/assets.mjs` finds real pictures of the subject's world in open collections (its
   street in old postcards, old maps, its materials, engravings of its trade, museum objects of its
   kind), downloads them into the project and records their credits; the subject is drawn in code
   only where no honest picture exists. Scroll scenes are built on the shared GSAP stage
   (`assets/scenes/`, `references/scenes.md`).
6. **Gate.** `scripts/lint.mjs` (source), `scripts/inspect.mjs` (real browser, 1440 / 768 / 390),
   `scripts/scenes.mjs` (scroll scenes) and `scripts/audit-motion.mjs` (GSAP hazards: raw scroll
   loops, missing cleanup, missing reduced motion, unscoped selectors, per-frame state, stacked
   loops) measure the result.
7. **Look.** The inspector saves screenshots; the agent critiques them with an Awwwards-weighted
   rubric, fixes the top three problems and repeats, at most three rounds.
8. **Move.** The motion layer is engineered deliberately: CSS owns the quiet layer, GSAP owns
   coordinated sequences (timelines, SplitText, Flip, MotionPath, ScrollTrigger pinning, scrubbing,
   parallax, horizontal tracks), an existing animation system keeps layout transitions it already
   owns. High ambition is built as a composed sequence, never flattened to generic fades — and the
   motion laws (first frame readable, reduced motion is the finished page) hold for every ambition.

Five rounds of blind tests against a no-skill baseline and another design skill are recorded in
`references/research.md` §11 (upstream v2); the motion prompts for forward-testing this sync are in
`evals/`.

## Contents

```
SKILL.md                 the run (11 steps), the house rules, the laws
references/              copy, type, colour, layout, imagery, motion, scenes, critique, tells,
                         research, app-screens (tasteskill) + design-read, motion-levels,
                         content-boundary, gsap-selection, gsap-catalog, gsap-advanced-motion,
                         gsap-patterns, framework-lifecycles, qa-checklist, taste-variants (GSAP layer)
scripts/draw.mjs         deal options / a direction / reprint / redraw; --alternatives, --photos, --site
scripts/assets.mjs       search open image collections (Openverse, Wikimedia Commons, Art Institute of
                         Chicago, the Met) and, with --video, real footage (Wikimedia Commons, Internet
                         Archive, NASA); --get downloads with the credit, --credits prints them
scripts/lint.mjs         static scan for banned patterns and stock phrases
scripts/inspect.mjs      render, measure, photograph
scripts/scenes.mjs       photograph every scroll scene at 0–100% of its hold, desktop, phone, reduced motion
scripts/audit-motion.mjs static scan for GSAP and scroll-motion hazards (--strict for a hard gate)
scripts/lib/             zero-dependency Chrome DevTools client, the in-page probe, the rules
library/                 directions (20), heroes, sections, type systems, palettes, photographs,
                         studied sites, motions, app styles
assets/base.css, base.js an optional neutral foundation
assets/scenes/           the shared GSAP/Lenis stage and the scroll scenes
assets/app.css, charts.js the app-screen shell and charts
evals/                   evals.json (page and app-screen briefs) + motion forward-test prompts
```

## Requirements

Node 22 or newer and an installed Chrome, Edge or Chromium for `inspect.mjs` (it drives the browser
over the DevTools protocol with Node's built-in WebSocket; nothing is installed). `draw.mjs`,
`lint.mjs`, `assets.mjs` and `audit-motion.mjs` run on Node 18+; `assets.mjs` needs network access
and no API keys. Set `CHROME_PATH` if the browser is somewhere unusual. GSAP itself is needed only
when motion is built with it; the scroll scenes pin `gsap@3.15.0` and `lenis@1.3.26` from a CDN by
default (`references/scenes.md`).

## Install

Copy this folder to your skills directory, for example `~/.claude/skills/taste-gsap-frontend/`, or
install from the repository root:

```bash
npx skills add https://github.com/crazycola23/taste-gsap-frontend --skill taste-gsap-frontend
```

or link it with `./install.sh` (Claude Code, Codex, or `--all-agents`).

## Notes

- Photographs in the library are served by Lorem Picsum from Unsplash, under the Unsplash licence.
  They are placeholders for atmosphere; replace them with the project's own pictures.
- Pictures found with `assets.mjs` keep their own licences. By default it offers only CC0, public
  domain, CC BY and CC BY-SA, and `--get` records the title, creator, licence and source of every
  download in `assets/credits.json`. The page must carry the credits (`--credits` prints them).
- `assets.mjs --video` finds short clips of the subject's world, takes a 720p-or-smaller rendition,
  refuses files over 25 MB unless `--max-mb` is passed, and saves a poster frame with each clip; how
  to use one on a page (muted loop, poster, stopped under reduced motion) is in
  `references/imagery.md` §11.
- Fonts are loaded from Google Fonts and Fontshare. Check each face's licence for your use.
- The scores in `references/research.md` are model judgements from screenshots, not Awwwards scores.
- The draw history lives in `~/.taste-skill/history.json` (set `TASTE_SKILL_HISTORY` to move it).
  Delete it to reset.
- A build takes an agent roughly 30–45 minutes and a few hundred thousand tokens with the full
  look-and-fix loop; most of that is finding or drawing pictures when a project has no photographs.
- This is a derivative work: the art-direction core comes from Leonxlnx/taste-skill (MIT), kept in
  sync with upstream; the motion-engineering layer is this repository's own.
