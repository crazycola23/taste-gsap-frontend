# Integrating the kit with GSAP

## Ownership before effects

The 2.5 kit already animates heroes, hover states, fragments and mounted moments.
Record each region's owner. GSAP must not tween properties that the kit is changing.
Use a separate wrapper when independent coordinate spaces need independent owners.

For the ordinary website run, keep kit implementations. Custom GSAP belongs in a
separate region with its own lifecycle. For an explicitly requested custom hero,
omit `data-enter` and the `m-enter` boot line for that hero; let GSAP own its visual
targets and keep the heading readable. Retain the kit's hover CSS for controls.
Record the resulting `hero-enter` finding as an individual waiver explaining the
custom owner. A kit marker is not evidence that custom GSAP worked.

Prefer native scrolling. Do not put ScrollTrigger pinning around an already sticky
kit moment. For a requested custom pinned scene, pin a stable wrapper, animate
children, measure actual travel and restore normal flow on phone/reduced motion.

CSS or the existing system is valid when it satisfies the request. Do not install
GSAP just because the skill is active. Equally, the upstream no-library default for
non-tech sites does not override an explicit request for purposeful GSAP choreography.
Keep the subject, readable content and usable fallback states.

## Static and Subtle

Static: set `data-motion="off"`, omit the entrance boot line, animation JS, moment,
effect and scene mounts, and stop autoplay. Keep final states and instant focus/active
feedback. The kit's motion CSS may remain for focus rules; base CSS may still have
transitions, so verify the page and disable those in page CSS. Add no GSAP dependency.
Do not mount a nominal moment to satisfy a checker.

Subtle: retain only justified short feedback/entrance, no automatic scroll narrative.
If the full website gate reports `hero-enter` or `moment-none`, use its existing
`.taste-skill/waivers.json` with the exact target printed and the mode plus user request
as the reason. Waivers stay in the report. Handle genuine supplied-brand/content
conflicts individually. Never waive hidden content, broken controls, inaccessible
focus or missing fallbacks. More than five conflicts means the full kit contract
does not fit: report that limitation and use project checks, not fabricated success.

## Verify actual motion

The kit settles its entrance in headless screenshots. Use its documented
`data-motion="live"` setting while testing playback; inspect intermediate frames and
the final state. Never add webdriver/user-agent branches to custom code. A still
screenshot and `GATE: PASS` alone do not test animation playback.

Exercise reduced motion before load and while mounted. Resize desktop to phone and
back; navigate away and remount; rapid-click reversible interactions. Active triggers
and listeners must not accumulate. Inspect console errors and run the full consistency
check: the quick finish gate omits some hover, form and reduced-motion checks.

The upstream workflow describes Stop hooks. This fork uses the manual gate by default.
Install hooks only when the user asks, using this skill's actual path and install name.
