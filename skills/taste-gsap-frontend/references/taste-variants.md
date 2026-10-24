# Where the other taste skills live

This skill (`taste-gsap-frontend`) is tasteskill v2 with the GSAP motion layer: it carries the
default anti-template run, the redesign route and the motion engineering in one skill. Select a
direction deliberately; do not stack another design skill on top of a run in progress. If a user
names a variant that is unavailable, say so and continue with the closest capability here.

| Brief signal | Where to go | Notes |
|---|---|---|
| General landing page, portfolio, redesign or motion work | This skill | The run (SKILL.md steps 1–11) covers it, including dashboards via `references/app-screens.md`. |
| Redesign, restyle or review of an existing project | This skill | Built in since tasteskill 2.1.1: the redesign route in Special cases (record the before, keep the stack and content, prove the after). |
| Stricter anti-template direction (`gpt-taste`), soft premium (`high-end-visual-design`), restrained UI (`minimalist-ui`), hard experimental (`industrial-brutalist-ui`) | [Leonxlnx/taste-skill-classics](https://github.com/Leonxlnx/taste-skill-classics) | The classic skills moved to their own repo in tasteskill 2.1.3. Same install names. Opt-in; call them by name. |
| Image-reference-first builds (`image-to-code`), image generation (`imagegen-frontend-web`/`-mobile`, `brandkit`) | [Leonxlnx/imagegen-skills](https://github.com/Leonxlnx/imagegen-skills) | Moved there in tasteskill 2.1.1. |
| Older behaviour pins (`design-taste-frontend-v1`, `design-taste-frontend-v2-experimental`) | taste-skill-classics | For projects that depend on a previous run's shape. Not iterated. |

## Precedence

The user's brief overrides defaults. A chosen variant can change the design direction and the motion
intensity, but it cannot override accessibility, cleanup, performance, the house rules measured by
`inspect.mjs`, or an explicit Static (`MOTION_INTENSITY: 1`) request.
