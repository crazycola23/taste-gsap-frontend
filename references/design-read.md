# Design Read

Use this reference only when choosing or auditing visual direction. A Design
Read is a short decision record, not a generic mood board.

## Required fields

1. **Page kind** — brand, product, portfolio, editorial, event, or utility.
2. **Audience and job** — who is arriving and what they should understand or do
   in the first viewport. Use this only to determine hierarchy, composition,
   density, emphasis, and motion. It is not a source of user-facing copy.
3. **Visual direction** — two or three concrete adjectives plus one sentence
   explaining the contrast with a generic template.
4. **System** — type roles, layout grammar, spacing rhythm, color roles, border
   and surface treatment, and content density.
5. **Motion thesis** — what movement teaches, prioritizes, or confirms.

## Content boundary

The Design Read is an internal design artifact.

Do not render its wording in the product. Do not summarize, paraphrase, polish,
or transform its audience, job, visual direction, or motion thesis into hero
copy, feature copy, navigation labels, badges, CTAs, or other visible text.

Load `content-boundary.md` whenever a frontend task adds or modifies visible
copy.

## Decision prompts

| Axis | Decide | Avoid by default |
|---|---|---|
| Composition | grid, editorial offset, full-bleed, modular, or layered | centered hero plus equal cards |
| Typography | display/body/utility roles and readable measure | one font for every role |
| Color | background, surface, text, muted, accent, status roles | arbitrary accent colors per section |
| Density | sparse, balanced, or information-rich; mobile collapse rule | shrinking desktop into a narrow column |
| Shape | radius, border, shadow, image crop, and repetition rules | unmotivated glass panels |
| Motion | hierarchy, narrative, feedback, or state change | decorative movement with no job |

## Token output

When the project lacks a usable design system, define a small token set before
building components. Prefer semantic names over raw values:

```text
--color-bg / --color-surface / --color-text / --color-muted / --color-accent
--font-display / --font-body / --font-mono
--space-1 ... --space-6
--radius-sm / --radius-lg
--motion-duration-fast / --motion-duration-base / --motion-ease-standard
```

Keep the token set small enough to apply consistently. Do not add a new token
for every component.

## Anti-template check

Before handoff, answer yes or no:

- Can the page direction be described without naming a framework or library?
- Does the first viewport communicate the page's job without waiting for motion?
- Do type, spacing, color, and density reinforce the same audience and tone?
- Is every large or continuous animation tied to a content relationship?
- Does the mobile composition have an intentional rule rather than a scale-down?
