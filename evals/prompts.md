# Forward-test prompts

Use these prompts in fresh threads. The evaluator should not reveal the target
level or expected implementation before the run.

## Should activate

1. Build a brand landing page with a coordinated hero timeline and accessible
   reduced-motion behavior.
2. Add a pinned sticky stack that compares three product capabilities as the
   user scrolls.
3. Audit this existing React page for GSAP leaks, raw scroll loops, and mobile
   ScrollTrigger behavior.
4. Implement a horizontal story with a normal-flow mobile fallback.
5. Redesign this portfolio page with an editorial visual system and restrained
   GSAP choreography.

## Should not activate implicitly

1. Add a CSS-only hover state to a button.
2. Build a CRUD dashboard with no animation requirement.
3. Fix a form validation message with a simple opacity transition.
4. Convert a static HTML page to semantic markup without visual changes.
5. Change a card's border color on focus for keyboard accessibility.

## Score each activated run

Give 0–2 points for each criterion:

- trigger decision matches the prompt;
- Design Read is specific and content-led;
- Motion Map names purpose, owner, trigger, and fallbacks;
- the chosen motion level is proportionate;
- framework lifecycle and selector scope are correct;
- reduced-motion and mobile behavior are implemented;
- no raw scroll loop or avoidable layout animation is introduced;
- build, lint, or tests are actually run and reported;
- final handoff lists known limitations instead of claiming unrun checks passed.

Record the prompt, changed files, tool output, and score. Compare revisions on
the same prompts; do not judge a revision only from a single showcase page.
