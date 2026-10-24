# Changelog

All notable changes to taste-gsap-frontend live here.

---

## 4.0.0 - 2026-10-24

Synced with upstream tasteskill v2 ([Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
2.1.4). This is a restructure: the standalone single-SKILL.md skill becomes the full tasteskill v2
folder with the GSAP motion layer merged in, so every upstream capability is carried.

### Adopted from tasteskill v2 (2.0.0 → 2.1.4)

- **The library and the draw** (`scripts/draw.mjs`, `library/`): 20 researched directions, hero and
  section compositions, type systems, palettes, photographs, studied sites, motions; redraw,
  alternatives, `--keep`, `--have`, `--site`, draw history.
- **Real pictures from open collections** (`scripts/assets.mjs`): Openverse, Wikimedia Commons, the
  Art Institute of Chicago, the Met; commercial-use licences by default, credits recorded and
  printed; `--video` for open-licence footage with a poster frame.
- **The measured gate** (`scripts/lint.mjs`, `scripts/inspect.mjs`): banned patterns in source; the
  real-browser inspector at 1440/768/390 measuring headline lines, type sizes, the assistant
  palette, gradients, shadows, the frame (equal margins, untitled sections, blank stretches), the
  four-real-pictures floor and the still-page floor (8 moving elements).
- **The scroll-scene engine** (2.1.0): the shared sticky stage scrubbed by native scroll with GSAP
  ScrollTrigger (`assets/scenes/stage.js`), optional Lenis smoothing off for touch and reduced
  motion, `scripts/scenes.mjs` photographing every scene at 0–100% of its hold, and
  `inspect.mjs --film`.
- **App screens** (2.1.0): `references/app-screens.md`, `draw.mjs --app` with seven app styles and
  screen patterns, `assets/app.css` and `assets/charts.js`, `inspect.mjs --app` / `lint.mjs --app`.
- **The redesign route** (2.1.1): record the before, keep the stack and content, prove the after.
- **The run rewritten around the dealt direction**: inventory, the argument, the idea sentence and
  the live thing, the copy deck with two-line arithmetic, the still build, the gate, the
  look-and-fix loop with `references/critique.md`, the report.
- **The house rules and laws of the craft** from the 247-site study, measured by the inspector.
- **Repo structure**: plugin manifests (`.claude-plugin/`, `.codex-plugin/`, `.agents/plugins/`),
  `install.sh`, `tests/` (frontmatter parsing, browser-profile cleanup regression) and the CI
  workflow from 2.1.2–2.1.4, adapted to `skills/taste-gsap-frontend/`.

### Kept from this repository (the GSAP layer)

- Motion mode (Static/Subtle/Directed/Narrative) and creative ambition
  (restrained/expressive/cinematic) as separate decisions, including the corrected
  `MOTION_INTENSITY` mapping (`references/motion-levels.md`).
- The Design Read and Motion Map, now step 5 of the run, filled from the dealt direction sheet
  (`references/design-read.md`).
- Engine routing: CSS for the quiet layer, GSAP for coordinated sequences, existing systems for
  what they already own; the catalog is an index, not a ceiling (`references/gsap-selection.md`,
  `gsap-catalog.md`, `gsap-advanced-motion.md`, `gsap-patterns.md`,
  `references/framework-lifecycles.md`).
- Content provenance on existing products: the brief is design context, never product copy
  (`references/content-boundary.md`).
- `scripts/audit-motion.mjs` (+ self-test), now part of the gate (step 8) and CI.
- The forward-test prompts (`evals/prompts.md`, `evals/advanced-motion-prompts.md`) alongside the
  upstream evals.

### How the two layers meet

- Step 9 (Move) keeps the tasteskill motion laws — first frame readable, settled by 1.2s, no
  preloader/gate/custom cursor/wheel capture, reduced motion is the finished page — and adds the
  engine routing and framework integration from the GSAP layer. High ambition is engineered as a
  composed sequence on top of those laws, never flattened and never exempt.
- The scroll scenes already run on GSAP ScrollTrigger through the shared stage; the GSAP layer
  extends them rather than replacing them.
- On a fresh build the copy deck is written because the page is the commission; on an existing
  product `references/content-boundary.md` governs and copy is preserved.
- New special case: motion added to an existing page with no redesign.

### Other changes

- `taste-variants.md` rewritten for the 2.1.3 world: the classic variants live in
  `Leonxlnx/taste-skill-classics`, image-generation skills in `Leonxlnx/imagegen-skills`, and the
  redesign route is built in.
- `agents/openai.yaml` moved into the skill folder and updated.
- Install name unchanged: `taste-gsap-frontend`.

---

## 3.0.0 - (previous)

- Separated motion mode from creative ambition; corrected the legacy numeric intensity mapping.
- Made the capability catalog an index, not a ceiling; added the advanced-motion playbook.
- Content provenance guardrails (`references/content-boundary.md`).

## 1.0.0 - (initial)

- Taste-style art direction + GSAP implementation workflow as a single SKILL.md skill.
