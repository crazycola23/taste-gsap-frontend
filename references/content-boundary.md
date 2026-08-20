# Content Boundary

Use this reference when a task involves creating, redesigning, or modifying a
user-facing frontend.

Its purpose is to keep implementation context separate from product content.

## Core principle

The brief informs the design.

The brief is not the product copy.

Task instructions belong to the control plane. User-facing text belongs to the
content plane. Do not move text from one plane into the other unless the user
explicitly asks for copywriting.

## Content provenance

Every visible string must have an identifiable source.

### Allowed sources

User-facing copy may come from:

1. Existing product copy already present in the project.
2. Copy explicitly provided by the user for the interface.
3. Application, API, CMS, localization, or database content intended for display.
4. New copy explicitly requested by the user.

### Disallowed implicit sources

Do not derive visible copy from:

- the user's task description;
- implementation instructions;
- design requirements;
- feature requirements;
- acceptance criteria;
- repository notes;
- developer comments;
- Design Read output;
- Motion Map output;
- reasoning about the audience;
- visual-direction adjectives;
- inferred product positioning;
- summaries generated while understanding the task.

These may influence design decisions but must not silently become page content.

## Forbidden transformations

Do not perform transformations such as:

```text
task description
→ product summary
→ hero headline
feature requirement
→ marketing benefit
→ feature card copy
design adjectives
→ brand positioning
→ badge or tagline
audience analysis
→ conversion copy
→ CTA
Design Read
→ polished prose
→ visible homepage text

unless the user explicitly requested copywriting.
```

### Examples

#### Not allowed

User says:

Build a landing page for an AI analytics product for independent creators.
Make it fast, premium, simple, and privacy-focused.

Do not invent:

"Analytics built for independent creators."
"Fast insights. Zero complexity."
"Privacy-first analytics."
"Create smarter with AI-powered insights."

Those phrases were derived from task context rather than supplied product copy.

#### Allowed

The same prompt may inform:

a sparse or dense layout;
the visual hierarchy;
typography choices;
animation restraint;
information ordering;
visual emphasis;
motion pacing.

It must not automatically determine the words shown to visitors.

### Existing copy

Existing product copy is part of the product state.

Preserve it unless the user explicitly requests a copy change.

Do not rewrite copy merely to:

- make the design feel more premium;
- improve visual balance;
- make a hero more concise;
- make cards more consistent;
- fit a new animation;
- make the page feel more marketable;
- match the agent's preferred tone.

If existing text creates a layout problem, adapt the layout before rewriting the
content.

### Missing copy

When a component requires text and no authorized copy exists:

Prefer preserving or reusing existing product content.
If that is impossible, use minimal neutral placeholders.
Keep placeholders semantically obvious and non-marketing.
Do not invent product benefits or claims.

Acceptable temporary placeholders include:

Product name
Short description
Primary action
Feature title
Feature description

Avoid placeholders that sound like finished marketing copy.

### Marketing copy

Marketing copy is a separate creative task.

Do not infer permission to write marketing copy merely because the task involves:

- a landing page;
- a homepage;
- a brand site;
- a portfolio;
- a product launch page;
- a visually polished redesign.

The user must explicitly request writing, rewriting, generating, improving, or
replacing copy before new marketing language is introduced.

### Navigation and interface labels

Do not unnecessarily rename:

- navigation items;
- buttons;
- tabs;
- filters;
- form labels;
- status labels;
- settings;
- menu items;
- feature names.

Stable terminology is part of the product interface.

Only change it when required by the task or explicitly requested.

### Design Read boundary

The Design Read is an internal decision record.

Its audience, job, visual direction, and motion thesis exist to guide design
choices.

They must never be copied, polished, summarized, or paraphrased into the
rendered product.

For example:

Design Read:
Audience: independent creative professionals
Job: understand project profitability quickly
Visual direction: calm, precise, editorial

must not silently become:

Built for independent creatives.
Understand profitability at a glance.
Calm, precise insights for modern teams.

### Motion boundary

Motion must adapt to content.

Content must not be rewritten to justify motion.

Do not add, remove, shorten, split, duplicate, or invent visible text merely to
make a GSAP sequence work.

If an animation depends on a particular copy length or number of phrases,
redesign the animation instead.

### Final provenance check

Before handoff, inspect every newly added or modified visible string.

For each string, ask:

Did this already exist in the product?
Did the user explicitly provide it as product copy?
Does it come from intended application data?
Did the user explicitly ask me to write this copy?

If all answers are no, remove or replace the string.

Also ask:

Could this sentence plausibly be a polished summary of the task prompt?

If yes, it is probably instruction-to-copy leakage and must be removed.
