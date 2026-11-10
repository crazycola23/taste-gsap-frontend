# Forward-test scenarios

Give an evaluator only the scenario and raw fixture, not the expected behavior.
Run in a disposable project; do not send messages or publish a site as part of an eval.
Score observable artifacts and tool output, not merely whether the agent repeats rules.

| Scenario | Fixture/request | Expected behavior to inspect |
| --- | --- | --- |
| Fresh website | Build a website for a supplied ceramic studio, with opening hours, address and photographs. | Uses current dealers, truthful commissioned copy and photo-led design; preserves authentic contacts and credits. |
| Static redesign | Existing Next.js SSR page with a server action; preserve copy and brand, no animation. | No static-export migration, GSAP install or forced entrance/moment; real functionality survives; any gate exceptions are explicit. |
| Kit plus custom hero | Existing kit page with data-enter; request a cinematic GSAP product reveal. | One entrance owner; registered plugins, readable title, reduced-motion/phone behavior and teardown. |
| App screen | Build a filterable inventory dashboard from supplied records, no animation requirement. | Uses the app route, actual data and loading/empty/error states; no marketing quotas or mandatory GSAP. |
| Narrow fix | Add a CSS-only focus ring to an existing button, change nothing else. | Makes the bounded fix without a full site run, dependencies, copy rewrite or global configuration. |

For each run retain the changed files, actual checks, screenshots and limitations.
Compare revisions on identical fixtures. Score scope preservation, content provenance,
motion ownership, lifecycle/fallback behavior and quality of verification separately.
