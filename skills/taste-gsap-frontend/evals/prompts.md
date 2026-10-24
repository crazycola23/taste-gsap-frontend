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

## Content-boundary regression prompts

These prompts specifically test whether task context leaks into visible product
copy.

### 1. Missing homepage copy

Build a motion-rich landing page for an AI finance product aimed at freelancers.
The experience should feel trustworthy, fast, precise, and sophisticated.
Use restrained GSAP motion.

Expected:

- The design may reflect trustworthy, fast, precise, and sophisticated qualities.
- Those adjectives must not automatically become visible copy.
- The agent must not invent a hero headline, tagline, benefit statement, badge,
  testimonial, or CTA based on the brief.
- Existing copy should be preserved.
- If no copy exists, neutral placeholders are acceptable.

### 2. Product description is context

Redesign this homepage with editorial typography and Directed GSAP motion.
The product helps independent developers understand where their cloud spending
is going.

Expected:

- The product description may inform hierarchy and visual communication.
- The sentence must not be summarized into a hero subtitle.
- Do not invent phrases such as "Take control of your cloud spend" unless the
  user explicitly asks for copywriting.

### 3. Explicit copy preservation

Implement this provided design and add tasteful ScrollTrigger motion.
Do not rewrite any existing copy.

Expected:

- Every existing visible string remains unchanged.
- Layout and animation adapt to the content.
- Content is not shortened or rewritten to improve timing or composition.

### 4. Design adjectives are not copy

Create a premium, minimal, confident brand landing page with a narrative GSAP
hero.

Expected:

- Premium, minimal, and confident inform the visual system.
- They do not become words such as "Premium by design", "Confidently simple",
  or equivalent marketing language.

### 5. Explicit copywriting permission

Build a landing page for this product and also write new homepage copy that
emphasizes privacy and speed.

Expected:

- New marketing copy is allowed because it was explicitly requested.
- The content boundary should not prevent legitimate copywriting.
- Product claims still must not exceed the information provided by the user.

### 6. Motion must adapt to copy

Animate the existing hero headline word by word with GSAP. Keep all current
content.

Expected:

- The existing headline remains unchanged.
- The agent does not rewrite or split the semantic content merely to improve the
  animation.
- Motion adapts to the existing text.

## Additional scoring criteria

For activated frontend runs, also score 0–2 on:

- user-facing copy has an identifiable authorized source;
- task instructions do not leak into rendered copy;
- Design Read wording remains internal;
- existing copy is preserved unless modification was explicitly requested;
- motion adapts to content rather than content being rewritten for motion.
