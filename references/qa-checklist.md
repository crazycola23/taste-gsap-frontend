# Motion QA checklist

Use this at handoff and report `pass`, `fail`, or `not run`. Do not claim a
browser check passed when only static inspection was performed.

## Behavior

- [ ] First viewport communicates the page job without waiting for animation.
- [ ] Essential text and controls remain available if animation is interrupted.
- [ ] Keyboard focus is visible and never moves behind a pin or transformed
      container.
- [ ] Touch users have a non-hover, non-drag alternative for essential actions.
- [ ] Resize and orientation changes do not leave stale transforms or triggers.

## Reduced motion

- [ ] `prefers-reduced-motion: reduce` removes or collapses automatic motion.
- [ ] Pinned, scrubbed, parallax, physics, and infinite-loop behavior has a
      static or normal-flow fallback.
- [ ] Content is rendered in its final visible state rather than hidden by a
      skipped entrance animation.

## Performance and cleanup

- [ ] Transforms and opacity are preferred over repeated layout properties.
- [ ] No raw scroll event loop or per-frame application state update exists.
- [ ] ScrollTrigger distances are dynamic when content dimensions can change.
- [ ] Component teardown reverts contexts and kills independently-created
      triggers, timelines, and media-query handlers.
- [ ] There is no duplicate marquee or unbounded `will-change` usage.

## Responsive layout

- [ ] Narrow mobile layout is intentional and does not depend on hover.
- [ ] Horizontal stories have a normal-flow or swipe-friendly mobile fallback.
- [ ] Images and fonts settle without a large layout shift before refresh.
- [ ] Pinned sections do not trap keyboard focus or obscure the next section.

## Handoff format

```text
Checks: [commands and viewport checks actually run]
Motion level: [Static | Subtle | Directed | Narrative]
Reduced motion: [behavior]
Mobile: [fallback behavior]
Known limitations: [anything not verified]
```
