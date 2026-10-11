# Motion mode and creative ambition

Make two independent decisions before writing animation code. The mode describes the mechanics and trigger model. Creative ambition describes the visual expression requested by the brief. Neither should silently override the other.

## Motion mode

| Mode | Choose when | Typical implementation | Guardrails |
|---|---|---|---|
| **Static** | Motion is off, the page is utility-first, or movement would reduce clarity | Final-state CSS; focus/active feedback only | No automatic entrances, scroll motion, loops, pinning, or parallax |
| **Subtle** | Quiet affordance and a little tactility are enough | CSS or an existing framework animation system | Short transitions; no scroll hijacking; no hidden essential content |
| **Directed** | Timing, order, hierarchy, or expressive choreography matters | GSAP timelines, labels, stagger, reversible states, advanced text/SVG/layout transitions | Coordinate related elements; avoid gratuitous effects |
| **Narrative** | Scroll progress meaningfully explains comparison, progression, or a spatial relationship | ScrollTrigger pin/scrub/parallax/horizontal sequence | Provide mobile and reduced-motion alternatives; keep natural navigation usable |

Narrative is not a synonym for “maximum intensity.” Choose it because scroll position is part of the story. A cinematic hero sequence that plays on load can be Directed; a deliberately quiet sticky comparison can be Narrative.

## Creative ambition

| Ambition | Signals in the brief | Expected approach |
|---|---|---|
| **Restrained** | Quiet, minimal, understated, content-first | Few motions, strong timing, deliberate easing and negative space |
| **Expressive** | Distinctive, playful, editorial, tactile, bold | More intentional choreography, meaningful overlap, depth, masks, or interaction details where useful |
| **Cinematic / high-impact** | Cinematic, immersive, experimental, product-film-inspired, award-level | Design a composed sequence with clear staging and transitions; consider SplitText, SVG/path motion, image reveals, Flip, layered scroll scenes, or custom easing when supported by the brief |

High ambition does not mean more motion everywhere. It means a stronger visual idea and a more carefully composed execution. Do not substitute a generic fade-and-stagger for a specifically requested cinematic sequence. Equally, do not add pinning or scroll hijacking just to make a page look “advanced.”

## Legacy MOTION_INTENSITY compatibility

Treat the old numeric value as an ambition hint:

- **1–3:** Static mode and restrained ambition, unless the brief explicitly asks for a small interaction.
- **4–6:** Usually Subtle; restrained to expressive polish.
- **7–8:** Usually Directed; expressive choreography.
- **9–10:** Cinematic/high-impact ambition. Choose Directed or Narrative based on whether scroll progress should drive the story.

If the prompt explicitly specifies a mode or technique, that instruction takes precedence over this default mapping. Never map 9–10 to Narrative automatically.

## Motion budget: review signals, not ceilings

- A 400–800 ms entrance range and a consistent stagger rhythm are starting points, not fixed limits.
- Use one continuous loop or marquee by default; add another only when each has a distinct purpose.
- Keep parallax ranges within the visual composition so text stays readable and focus does not appear to drift away.
- Pin only when the pinned relationship improves comprehension, staging, or continuity.
- Use ease: "none" for directly scrubbed progress; choose deliberate eases for time-based sequences.
- In reduced-motion mode, show final content immediately and remove nonessential movement.
- It is fine to use longer sequences, nested timelines, custom curves, masks, or complex plugin choreography when the brief benefits from them and the experience remains usable.

## Motion Map template

~~~text
Region | purpose | owner/technique | trigger | desktop behavior | mobile fallback | reduced-motion behavior
Hero   | establish hierarchy | GSAP timeline + SplitText | load | staged type/image choreography | simplified entrance or final state | final state
Cards  | compare items | CSS or Flip | interaction | coherent state transition | no hover dependency | instant state change
Story  | show progression | ScrollTrigger | scroll | pin + scrub | normal vertical flow | normal vertical flow
~~~
