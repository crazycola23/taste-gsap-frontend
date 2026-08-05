# Taste variant routing

The companion Taste repository contains variants. Select one deliberately; do not load or apply every variant at once.

| Brief signal | Variant | Use |
|---|---|---|
| General landing page, portfolio, or redesign | `design-taste-frontend` | Default anti-slop direction and design-read workflow. |
| GPT/Codex needs stricter anti-slop and stronger motion direction | `gpt-taste` | Use its stricter constraints while keeping the GSAP rules here. |
| Existing UI needs audit and improvement | `redesign-existing-projects` | Audit first; preserve SEO, content, and viable brand assets. |
| Calm, premium, soft visual language | `high-end-visual-design` | Use restrained contrast, whitespace, premium typography, and spring-like restraint. |
| Editorial, Linear-like, restrained UI | `minimalist-ui` | Reduce variance, motion, and density. |
| Hard mechanical, high-contrast, experimental UI | `industrial-brutalist-ui` | Use sharp geometry, strong type, and deliberate asymmetry. |
| Google Stitch-compatible output | `stitch-design-taste` | Follow Stitch conventions and produce `DESIGN.md` when requested. |
| Generate image references before coding | `image-to-code` | Treat the image pipeline as a separate phase; implement motion only after the visual reference is understood. |
| Image-only web/mobile/brand reference generation | `imagegen-frontend-web`, `imagegen-frontend-mobile`, or `brandkit` | Generate references; do not confuse them with implementation motion. |
| Prevent incomplete output | `full-output-enforcement` | Apply when the user or project needs complete implementation with no placeholders. |

## Variant precedence

The user's brief overrides defaults. A chosen visual variant can change the design direction and motion intensity, but it cannot override accessibility, cleanup, performance, or the explicit `MOTION_INTENSITY: 1` static mode.
