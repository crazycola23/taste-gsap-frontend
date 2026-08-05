# GSAP animation catalog

Use this as the local menu of GSAP capabilities. Choose the smallest primitive that communicates the intended design idea. The catalog is grouped by the effect the user sees, not only by package name.

## Core tween families

Import `{ gsap } from "gsap"`.

| Effect | API | Typical use |
|---|---|---|
| Animate to a final state | `gsap.to(target, vars)` | Hover response, reveal completion, progress, emphasis. |
| Animate from the current state | `gsap.from(target, vars)` | Entrance animation; beware immediate render when stacking from tweens. |
| Define both endpoints | `gsap.fromTo(target, fromVars, toVars)` | Deterministic component entrance or responsive state. |
| Sequence multiple changes | `gsap.timeline(options)` | Hero choreography, modal open/close, page transitions. |
| Offset repeated items | `stagger` | Feature list, navigation items, editorial text lines; keep stagger meaningful. |
| Fade and disable interaction | `autoAlpha` | Use instead of raw opacity when hidden content must not capture pointer events. |
| Transform motion | `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `skewX/Y` | Performant movement, parallax, tilt, card emphasis. |
| CSS/SVG style values | `backgroundColor`, CSS variables, `attr` | Color transitions, progress indicators, SVG attributes. |
| Reversible interaction | store returned tween/timeline; `.play()`, `.reverse()`, `.restart()`, `.pause()`, `.kill()` | Menus, toggles, hover state machines. |
| Global defaults | `gsap.defaults()` | Only for deliberately consistent project-wide timing. Prefer local timeline defaults. |
| Responsive/reduced motion | `gsap.matchMedia()` | Desktop/mobile variants and `prefers-reduced-motion`. |

## Easing and timing

Use documented string eases: `power1.out`, `power2.out`, `power3.inOut`, `back.out(1.7)`, `elastic.out(1, 0.5)`, `circ.out`, `expo.out`, `sine.inOut`, and `none` for scrubbed scroll-linked motion. Use spring-like behavior sparingly; do not make every surface bounce. Use `CustomEase` only when the art direction requires a named custom curve.

## Timeline choreography

Use the position parameter instead of unrelated delays:

- `"<"` starts with the previous animation.
- `">"` starts after the previous animation.
- `"<0.2"` starts 0.2 seconds after the previous animation starts.
- `"-=0.2"` overlaps the previous animation by 0.2 seconds.
- Labels such as `"intro"` make longer sequences readable.

Keep `ScrollTrigger` on the top-level timeline/tween. Do not put independently-triggered ScrollTriggers inside a timeline.

## Scroll and viewport effects

Import `ScrollTrigger` from `gsap/ScrollTrigger` and register it once in the module/client boundary.

| Effect | ScrollTrigger configuration | Taste rule |
|---|---|---|
| Reveal on entry | `start`, `once: true` or a simple `toggleActions` | Prefer Motion/CSS when there is no pin or scrub. |
| Scrubbed reveal | `scrub: true` or a number | Use for a visual relationship to scroll position, not decoration. |
| Pinned sticky stack | `pin: true`, `start: "top top"`, `end`/`endTrigger`, `pinSpacing` | Use for narrative comparison or progressive layering. |
| Horizontal pan | pin wrapper, animate inner track `x`/`xPercent`, dynamic `end` | Use only when horizontal sequencing improves comprehension. |
| Parallax | scrub a transform at a small range | Respect reduced motion and avoid disorienting large offsets. |
| Section callbacks | `onEnter`, `onLeave`, `onUpdate` | Use for state/analytics or small feedback; never set React state every frame. |
| Refresh after layout change | `ScrollTrigger.refresh()` | Call after fonts/images/layout dimensions settle when required. |

Never implement these with a raw `scroll` event or `window.scrollY` in React state.

## Plugin catalog

Import only the plugin needed and register it. Check the installed GSAP version before using a plugin.

| Plugin | What it does | Good UI use |
|---|---|---|
| `ScrollToPlugin` | Tween window/container scroll position | Anchor navigation, “back to top”, guided section focus. |
| `ScrollSmoother` | Smooth scrolling and effects around ScrollTrigger | Only when the whole site needs it; test touch, focus, and accessibility carefully. |
| `Flip` | Animate between layout states | Reordering cards, expanding media, shared-element transitions. |
| `Draggable` | Pointer/touch dragging with bounds, snapping, inertia hooks | Sliders, movable panels, cards; provide keyboard alternatives. |
| `InertiaPlugin` | Velocity-based continuation | Tossable/physics interactions; avoid for essential controls. |
| `Observer` | Normalize wheel, touch, pointer, and gesture events | Intentional full-screen gesture navigation or section transitions. |
| `SplitText` | Split text into chars/words/lines for animation | Kinetic headings and editorial reveals; preserve accessible text semantics. |
| `ScrambleTextPlugin` | Scramble/replace text during a transition | Short labels, terminal-style status feedback; never essential content. |
| `DrawSVGPlugin` | Animate SVG stroke drawing | Logos, diagrams, route/path explanation. |
| `MotionPathPlugin` | Move/rotate along an SVG or coordinate path | Guided object motion, diagrams, playful hero accents. |
| `MorphSVGPlugin` | Morph compatible SVG shapes | Brand marks, icon state transitions, illustrative storytelling. |
| `TextPlugin` | Tween text content | Short status/type transitions; avoid replacing readable content too quickly. |
| `CustomEase` | Define a reusable custom easing curve | Branded motion language when built-in eases cannot express it. |
| `Physics2DPlugin` / `PhysicsPropsPlugin` | Physics-like movement | Decorative particles or playful feedback; disable under reduced motion. |
| `CustomWiggle` / `CustomBounce` | Generate reusable wiggle/bounce eases | Rare emphasis moments, never global defaults. |
| `GSDevTools` | Inspect and control GSAP animations | Development/debugging only; never ship as a production dependency. |

## Utility catalog

Use `gsap.utils` for animation math without unnecessary state:

- `toArray()` — normalize selector/array-like targets.
- `clamp(min, max, value)` — constrain pointer/scroll-derived values.
- `mapRange(inMin, inMax, outMin, outMax, value)` — map progress into a transform range.
- `normalize(min, max, value)` — convert a value to 0–1 progress.
- `interpolate(a, b, progress)` — interpolate numbers, colors, arrays, or objects.
- `snap(incrementOrArray, value)` — snap sliders, drag positions, or progress.
- `wrap(min, max, value)` / `wrapYoyo()` — loop indexes and carousel positions.
- `pipe(...functions)` — compose reusable transform calculations.
- `random(min, max, snap)` — generate bounded decorative variation; avoid nondeterminism in core layout.

## Selection rule

If the user names an effect, map it to this catalog first. If the effect needs viewport progress or pinning, use ScrollTrigger. If it needs multi-step order, use a timeline. If it needs layout-state interpolation, use Flip. If it needs gesture input, use Draggable or Observer. If it is only a simple reveal, use CSS or Motion unless GSAP is explicitly requested.
