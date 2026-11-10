# Motion QA checklist

Mark each relevant item pass, fail or not run. Static checks do not prove behavior.

## Scope and content

- Existing copy, real contacts, brand and rendering model are preserved as requested.
- Fresh-page copy follows supplied facts; no invented proof or implementation prose.
- Sources and stand-ins have credits; missing facts/integrations are disclosed.
- App screens and small components are not forced through the full website workflow.

## Motion and input

- Each animated property has one owner: kit, CSS, existing system or GSAP.
- The first screen communicates its purpose without waiting for animation.
- Intermediate frames, interruption and final states are readable.
- Keyboard focus remains visible; essential actions work with touch and keyboard.
- Static mode has no entrances, loops, autoplay, pins or motion dependencies.

## Reduced motion and lifecycle

- Test reduced motion at initial load and when the preference changes.
- Skipped animations leave final content visible; phone layouts have no hover dependency.
- Desktop/phone resize and back restores the intended geometry.
- Unmount/remount does not accumulate timelines, triggers, media handlers or listeners.
- Dynamic distances refresh after layout changes, not on every frame.

## Performance and checks

- Prefer transforms/opacity; avoid per-frame application state and duplicate scroll drivers.
- Run the project's applicable build/lint/tests and audit changed custom GSAP source.
- For full sites, run the full consistency pass as well as the quick finish gate.
- Kit screenshots may settle motion; inspect playback with documented live mode.
- Report gate waivers and remaining OPEN findings; neither is an unconditional pass.

## Handoff

```text
Checks: commands and browser states actually exercised.
Motion: mode + ambition; region ownership and purpose.
Fallbacks: reduced motion, phone, missing script.
Content: preserved/newly commissioned; sources, stand-ins and unresolved facts.
Limitations: skipped checks, open failures, waivers and integration gaps.
```
