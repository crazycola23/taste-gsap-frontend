# App screens

App screens support repeated tasks: dashboards, inboxes, editors, settings or billing.
The upstream 2.5 website recipe is not their layout contract. Marketing photo quotas,
hero entrances, moments and fixed screen-height sections do not apply.

1. Read the actual route, components, data model, actions and tokens. Preserve working
   filtering, selection, navigation and submission.
2. Reuse the existing system. For a fresh app choose semantic tokens and a task-appropriate
   layout. Tables, quiet borders, repeated panels and compact labels can aid scanning.
3. Populate useful content, loading, empty, error and disabled states. Demo data must
   be internally consistent and identified in the handoff. Tie charts to real data.
4. Default to Static or Subtle. Use Flip or a short timeline when it explains a state
   change; preserve focus and an instant reduced-motion equivalent. Never animate
   typing or per-frame values through framework state.
5. Run project checks and exercise the task with keyboard, touch and a narrow viewport.
   Capture before/after for redesigns. Run `audit-motion.mjs` for custom GSAP changes;
   do not arm the website finish gate.

Read `content-boundary.md` for copy, `framework-lifecycles.md` for the active stack,
and `qa-checklist.md` for motion verification.
