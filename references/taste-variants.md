# Taste variant routing

These are compact local variants for this skill. Select one deliberately; do
not load or apply every variant at once. If a user names an external Taste
variant that is unavailable, use the closest local direction and say so.

| Brief signal | Variant | Use |
|---|---|---|
| General landing page, portfolio, or redesign | `design-taste-frontend` | Use the default anti-template direction and Design Read workflow. |
| Stricter anti-template and stronger motion direction | `gpt-taste` | Raise the evidence bar for design and motion decisions. |
| Existing UI needs audit and improvement | `redesign-existing-projects` | Audit first; preserve SEO, content, and viable brand assets. |
| Calm, premium, soft visual language | `high-end-visual-design` | Use restrained contrast, whitespace, premium typography, and quiet motion. |
| Editorial, Linear-like, restrained UI | `minimalist-ui` | Reduce variance, motion, and density; favor clear hierarchy. |
| Hard mechanical, high-contrast, experimental UI | `industrial-brutalist-ui` | Use sharp geometry, strong type, asymmetry, and deliberate rhythm. |
| Image references before coding | `image-to-code` | Understand the visual reference first; implement motion after layout is stable. |
| Complete output with no placeholders | `full-output-enforcement` | Keep content, states, and responsive behavior complete before handoff. |

## Variant precedence

The user's brief overrides defaults. A chosen visual variant can change the design direction and motion intensity, but it cannot override accessibility, cleanup, performance, or the explicit `MOTION_INTENSITY: 1` static mode.
