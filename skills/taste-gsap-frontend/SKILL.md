---
name: taste-gsap-frontend
description: >-
  Design, build, redesign or polish websites and app screens with tasteskill 2.5.1
  art direction and deliberate GSAP motion. Use for frontend visual work, pages
  that look generic, and expressive or scroll-driven animation in HTML, React,
  Next.js, Vue, Svelte or Astro. Preserve existing brands, content and application
  behavior; support static, subtle, directed and narrative motion.
---

# Taste + GSAP Frontend

Taste chooses composition, material and visual purpose. GSAP executes coordinated
movement when the result needs it. This folder contains the complete tasteskill 2.5.1
kit plus this integration layer. `<skill>` always means this folder, including inside
references. Scripts need Node 22+; browser checks need Chrome, Edge or Chromium.

## Choose the task before loading the workflow

Inspect the project, dependencies, existing animation owners, real content and assets
first. Read only the route the task needs.

| Task | Route |
| --- | --- |
| New company, product, portfolio or marketing website | Read `references/taste-workflow.md` for the upstream page run, then its references selected by business kind. Apply the integration priorities below. |
| Redesign or restyle an existing website | Record screenshots and working interactions first. Use the page run for the requested scope, preserving routes, content, brand and stack. |
| Dashboard, settings, editor or other app screen | Read `references/app-screens.md`; no marketing hero, screen-height sections or photo/moment quotas. |
| Motion only, or one component | Keep the composition. Read `references/motion-levels.md`, `references/gsap-selection.md` and the active framework section in `references/framework-lifecycles.md`. |
| Review only | Inspect and report actionable findings with evidence. Do not modify or arm a build gate. |

## Integration priorities

These resolve differences with the upstream recipe. Its house style is the default
for a fresh website, not permission to change an existing product.

1. **User scope and real facts come first.** Preserve supplied copy, contacts, brand,
   routing, SEO, data and interactions. Do not replace authentic contacts with
   `.example`, invent proof or rewrite content to fit motion. On a new site, write
   copy supported by the brief. See `references/content-boundary.md`.
2. **Keep the stack and rendering model.** Next.js retains its SSR, server actions
   and API routes. Static export is appropriate only when the project supports it
   and the task calls for it. Do not copy the starter over an existing app.
3. **Separate motion mode from ambition.** Static / Subtle / Directed / Narrative
   describes behavior; restrained / expressive / cinematic describes the idea.
   Premium does not automatically mean pinning. An explicit cinematic request deserves
   a composed sequence with usable fallbacks, not a generic fade on every block.
4. **One owner per animated property.** The kit owns its hero entrance, hover layer
   and moments. Do not tween those targets with GSAP too. Use a separate region or
   deliberately replace its owner; read `references/integration.md` before mixing.
5. **Check the requested result.** Static means no animation dependency, entrance,
   scrub, pin, loop or autoplay. Keep instant focus/active feedback and final content.
   Do not add motion to satisfy a gate. Record exceptions individually and visibly.

## Make the direction concrete

Before implementation, state two short lines, then proceed without an approval pause:

```text
Design Read: kind, reader's job, preserved brand, dealt palette/type/hero, real imagery.
Motion Map: mode + ambition; region, purpose, owner, trigger, phone and reduced-motion states.
```

`references/design-read.md` gives the record; `references/motion-levels.md` gives the
mode decision. For a fresh website, use the current dealers from the project folder:

```bash
node <skill>/scripts/start.mjs deal --page <kind> --trade "<trade>" --history .taste-skill/history.json
node <skill>/assets/layout/deal.mjs --type <page-type> --has <available-assets> --history .taste-skill/layout-history.json
```

The upstream workflow defines six business kinds, full commands, photography, copy
and section recipes. Skip moment/effect deals in Static mode; Subtle uses only the
feedback/entrance justified by the brief. Preserve fixed brand choices.

## Implement and verify

Build a readable resting page. Keep nonessential movement behind reduced-motion and
device conditions. For custom GSAP use `references/gsap-selection.md`,
`references/framework-lifecycles.md` and `references/gsap-patterns.md`.
Read `references/gsap-advanced-motion.md` only for advanced choreography or a relevant
plugin; the catalog is an index, not a ceiling.

For a full website, run the upstream copy, consistency, layout, performance and finish
gate commands. For components, motion-only work and app screens, run the project's
relevant checks and inspect the changed UI at desktop and phone widths.
For implementation and review of bordered or filled UI, apply the rendered
content-inset check in `references/content-insets.md`. A surface that fits the
viewport still needs measured clearance between its own edge and its content.
Whenever custom GSAP is written, run:

```bash
node <skill>/scripts/audit-motion.mjs --strict <changed-source-files-or-folder>
```

The audit is heuristic, not proof of cleanup or accessibility. Review its findings.
Verify resize, keyboard, touch, route/unmount cleanup, reduced motion, and actual
animation playback. A resting screenshot does not prove a timeline ran. Run kit
browser scripts sequentially with disposable profiles. If they cannot run, use the
host's approved browser tools and state exactly what remains unverified.

`references/integration.md` explains gate exceptions and real-motion inspection;
`references/qa-checklist.md` is the handoff checklist. Report checks that ran,
remaining failures/waivers, motion ownership/fallbacks and source/stand-in credits.
`GATE: OPEN` means unresolved findings, not a pass. No global hook or editor
configuration is installed by using this skill.

## Maintenance

The repository's `upstream.lock.json` records the upstream commit and every imported
file; `UPSTREAM.md` explains updates. `references/taste-workflow.md` is the unmodified
upstream entry: its original frontmatter is archival, not this skill's activation or
hook configuration. Retired 2.1 tools (`draw`, `inspect`, `lint`, old stage) are
replaced by the 2.5 dealers and checker.
