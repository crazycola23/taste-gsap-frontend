# Motion levels

Choose one level before writing animation code. The numbers below are defaults,
not rigid laws; the brief and accessibility requirements can lower a level.

| Level | Use when | Default implementation | Guardrails |
|---|---|---|---|
| **Static** | motion is off, content is task-critical, or the page is utility-first | final-state CSS; focus/active feedback only | no automatic entrance, scroll, loop, pin, or parallax |
| **Subtle** | the interface benefits from quiet affordance | CSS or an existing framework animation system | short transitions, no scroll hijack, no hidden essential content |
| **Directed** | order and hierarchy are part of the story | GSAP timeline, labels, stagger, reversible state transitions | one coordinated entrance per major region; no unnecessary pinning |
| **Narrative** | scroll position explains comparison, progression, or a spatial relationship | ScrollTrigger pin/scrub/parallax/horizontal sequence | mobile fallback, reduced-motion fallback, dynamic end, teardown |

## Legacy `MOTION_INTENSITY`

Map existing numeric prompts as follows:

- `1–3` → Static
- `4–6` → Subtle
- `7–8` → Directed
- `9–10` → Narrative

If a numeric value conflicts with an explicit user request, honor the explicit
request and explain the mapping briefly.

## Motion budget

Use these as review signals, not hard limits:

- prefer a 400–800 ms entrance range and one readable stagger rhythm;
- use one continuous loop or marquee maximum by default;
- keep parallax ranges small enough that content remains legible and focus does
  not appear to move away from the user;
- pin only when the pinned relationship improves comprehension;
- use `ease: "none"` for scrubbed progress and deliberate eases for time-based
  sequences;
- make reduced motion render the final state immediately.

## Motion Map template

```text
Region | purpose | owner | trigger | desktop behavior | mobile fallback | reduced-motion
Hero   | reading order | GSAP timeline | load | line reveal | simple fade or final state | final state
Cards  | compare items | CSS/GSAP | hover or entry | small emphasis | no hover dependency | no auto motion
Story  | show progression | ScrollTrigger | scroll | pin + scrub | normal vertical flow | normal vertical flow
```
