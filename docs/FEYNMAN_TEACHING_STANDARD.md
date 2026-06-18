# Feynman Teaching Standard

Standard for `teaching.paragraphs`, `teaching.latexBlocks`, and `workedExamples` in Nova Maths lesson files. This standard is gated by [CONTENT_QUALITY_STANDARD.md](./CONTENT_QUALITY_STANDARD.md) (Gate 2 — Teaching depth).

> **The depth mandate.** The goal is a Band 6: a student who can *justify* and *transfer* a method to an unfamiliar problem, not just execute its steps. Teaching that asserts formulas, states procedures, and stops there fails this standard even when it is clear and correct. Feynman's discipline is two-sided: explain in the simplest language possible **and** explain the real *why* completely. Concision means removing filler — it never means skipping the derivation, the intuition, or the reason a method works. **Go exactly as deep as the concept requires; let understanding, not a word budget, set the length.**

---

## Core principles

1. **Simple language before formal notation.** Introduce the idea in plain English. The formula comes second.
2. **Concrete example before the general rule.** Show specific numbers first, then the abstract form.
3. **Derive or motivate every formula — never drop it cold.** Each formula or rule the lesson uses must be built from something the student can see (a concrete model, a short derivation, a limiting argument). Asserting `z=(x−x̄)/s` is a failure; explaining *why* subtracting the mean re-centres and *why* dividing by `s` makes distributions comparable is the lesson.
4. **Explain the why, not just the how — to the point of transfer.** The student should understand *why* the method is valid well enough to adapt it to an unfamiliar context, which is exactly what a Band 6 exam question demands.
5. **Connect representations.** Link algebra ↔ graph ↔ context ↔ numerical explicitly where relevant. Attach the real diagram; never fake a visual in LaTeX.
6. **Connect to prior knowledge.** Name what the student already knows and build on it explicitly.
7. **Dissolve the misconception in the narrative.** Name the easy mistake *at the moment it would occur* and explain why the correct path is correct — not only in the `commonMistakes` list.
8. **One idea per paragraph.** Keep each paragraph to a single idea so the reasoning is easy to follow. Use as many paragraphs as the concept needs — do not compress a multi-step derivation into one dense block, and do not drop steps to save space.
9. **Calm, exam-aware tone.** Direct and practical. No hype, no filler, no hedging.

---

## What to avoid

| Avoid | Reason |
|---|---|
| Unexplained formula drop | Starting with (or stopping at) a formula before the concept and its *why* are built |
| Asserting a rule with no derivation/model | A Band 6 student must know why it works, not just that it does |
| Circular definitions | "A linear equation is one that is linear" |
| Jargon without explanation | Using "common difference" before defining it |
| Cramming a derivation into one dense block | More than one idea per paragraph; split it across paragraphs instead |
| Vague motivational filler | "This is a really important concept you'll use throughout your studies" |
| Step-by-step without reasoning | Showing calculation without explaining each step |
| Truncating the concept to hit a length | Depth is set by the concept, not a word budget — see the depth mandate |
| Passive voice for key steps | "The values are substituted" → "Substitute P, R, T into the formula" |

---

## Teaching section structure

```typescript
teaching: {
  paragraphs:  string[];   // typically 4–8 paragraphs (more for richer concepts), MathText-rendered
  latexBlocks: string[];   // key formulas/rules, KaTeX BlockMath (no $ delimiters)
}
```

### Paragraph sequence

Use this as the backbone, expanding any step that needs more than one paragraph. Steps 1–5 are required; the derivation (step 4) is what separates this standard from a procedure summary.

1. **What is this?** Introduce the concept in plain language. No formula yet.
2. **Concrete intuition.** Give a specific worked example, physical model, or real-world anchor the student can picture.
3. **Formal notation.** Introduce the formula or algebraic rule. Explain each symbol.
4. **Why it works (the derivation/justification).** Build the rule from the concrete model or a short derivation, so the student could reconstruct or adapt it. Never skip this to save space.
5. **Transfer + misconception.** Show how the idea applies in an unfamiliar framing, and name/dissolve the most likely error at the point it occurs.

---

## Bad vs good paragraphs

### Bad — formula drop, no intuition

> "The gradient of a line is calculated using the formula $m = \frac{y_2 - y_1}{x_2 - x_1}$. Use this to find the gradient between any two points."

Problems: starts with formula, no explanation of what gradient means, no concrete example.

### Good

> "The gradient of a line measures how steep it is — how much it rises or falls for every unit you move to the right. A steeper line has a larger gradient."

> "To calculate gradient, pick any two points on the line and measure the vertical change (rise) and horizontal change (run). For example, a line that rises 6 units over 3 units of run has gradient 6 ÷ 3 = 2."

> "In algebra, rise = y₂ − y₁ and run = x₂ − x₁, so gradient = (y₂ − y₁) ÷ (x₂ − x₁). A positive gradient means the line rises from left to right; a negative gradient means it falls."

---

### Bad — circular and jargon-heavy

> "A linear relationship produces a linear graph because the relationship between the variables is linear. The equation y = mx + c is the standard form."

Problems: circular definition, no example, formula dropped without context.

### Good

> "A linear relationship is one where equal changes in x produce equal changes in y. That's what makes the graph a straight line — not curved, not bent."

> "For example, if a taxi charges $3 per kilometre, every extra kilometre costs exactly the same extra amount. That's a linear relationship: cost = 3 × distance."

> "Any straight-line relationship can be written as y = mx + c. The number m is the gradient (rate of change), and c is the y-intercept (the value of y when x = 0)."

---

### Bad — step-by-step without reasoning

> "x + 5 = 12. Subtract 5 from both sides. x = 7."

Too terse. No reasoning. A student who got it wrong won't understand why.

### Good

> "To solve x + 5 = 12, we need x by itself on one side. Since 5 is being added to x, we undo that by subtracting 5 from both sides: x + 5 − 5 = 12 − 5, which gives x = 7."

---

## Worked example structure

```typescript
type WorkedExample = {
  title:           string;   // Short descriptive title of the skill demonstrated
  questionLatex:   string;   // The question, written in KaTeX
  steps: {
    explanation:   string;   // One line of plain-text reasoning
    latex?:        string;   // One line of working in KaTeX (optional)
  }[];
  finalAnswerLatex: string;  // Clear statement of the final answer
  // …plus any visual payload field (cartesianGraph, sectorDiagram, …) — see below
};
```

A `WorkedExample` carries the **same visual payload fields as a `PracticeQuestion`** (it extends `DiagramFields`). When a worked example is about a diagram, attach the matching payload — see [QUESTION_AUTHORING_STANDARD.md → Visual payloads](./QUESTION_AUTHORING_STANDARD.md#visual-payloads) for the full renderer catalogue.

### Rules

- At least 3 worked examples per lesson (more for complex topics), and **at least one must be a harder, multi-concept or unfamiliar-context example** at Band-6 difficulty — not just the easy template repeated
- Each step: **one** line of explanation + **one** line of working
- Do not combine multiple operations in a single step
- `explanation` should say *why* the step is taken, not just what it does
- `finalAnswerLatex` states the answer clearly — not just the number

### Good worked example

```typescript
{
  title: "Find the gradient between two points",
  questionLatex: "\\text{Find the gradient of the line through }(1,\\,2)\\text{ and }(3,\\,8).",
  steps: [
    {
      explanation: "Identify the rise (vertical change) and run (horizontal change).",
      latex: "\\text{rise} = 8 - 2 = 6, \\quad \\text{run} = 3 - 1 = 2",
    },
    {
      explanation: "Divide rise by run to find gradient.",
      latex: "\\text{gradient} = \\frac{\\text{rise}}{\\text{run}} = \\frac{6}{2} = 3",
    },
  ],
  finalAnswerLatex: "\\text{gradient} = 3",
}
```

### Bad worked example

```typescript
{
  title: "Gradient",
  questionLatex: "\\text{Find gradient of line through }(1,2)\\text{ and }(3,8).",
  steps: [
    {
      explanation: "Apply the formula.",
      latex: "\\frac{8-2}{3-1} = 3",   // no reasoning, combined steps
    },
  ],
  finalAnswerLatex: "3",  // doesn't state what 3 is
}
```

---

## `latexBlocks` rules

Key formulas and rules displayed as block math. Written in KaTeX — **no `$` delimiters** (the field is BlockMath-rendered directly).

```typescript
latexBlocks: [
  "\\text{gradient} = \\frac{\\text{rise}}{\\text{run}}",
  "m = \\frac{y_2 - y_1}{x_2 - x_1}",
  "\\text{positive gradient: rises left to right;} \\quad \\text{negative gradient: falls left to right}",
]
```

Include:
- The core formula
- Key notation conventions
- The edge case or sign rule, if applicable

Aim for 2–4 blocks. Do not include `$...$` wrappers — the field is rendered as display math directly.

---

## Visual support in teaching sections

When a concept is inherently visual (graphs, geometry, statistics displays, probability trees, slope fields), the **worked example** is the right place to anchor the visual reasoning. A `WorkedExample` accepts the same visual payloads as a question, so **attach the diagram to the worked example itself** — set the matching payload field (e.g. `cartesianGraph`, `planeShapeDiagram`, `histogramDiagram`), refer to it in `questionLatex` ("From the graph…"), and describe what the student reads from it in the step `explanation`. Do not fake the diagram in LaTeX or describe a plot in words when a renderer exists — the same "use the right renderer, never fake a visual" rule from the question standard applies here.

The `teaching.paragraphs` / `teaching.latexBlocks` fields are text-only and do not take payloads; when the teaching prose needs a picture, carry it on the worked example. Write paragraphs as if the student has that diagram in front of them — use concrete spatial language: "the curve crosses", "the triangle has", "the histogram peaks at", "the tree branches into". Never describe a graph or diagram in abstract symbol form alone when spatial description would be clearer.

---

## NSW exam connection

A single direct sentence linking the concept to exam context:

> "In exam questions, gradient is often described as a 'rate of change' applied to a real-world context like cost per item or speed — the concept and calculation are identical."

One sentence is enough. Avoid multi-sentence motivational passages.

---

## Length guide

These are floors and typical ranges, **not caps**. The concept sets the length; never truncate the derivation or intuition to fit a target.

| Field | Guide |
|---|---|
| `paragraphs` | 4–8+ paragraphs; one idea each. Richer or multi-step concepts need more, including a dedicated "why it works" derivation. |
| `latexBlocks` | As many as the lesson genuinely uses — the core formula(s), key derivation lines, notation, and sign/edge rules |
| Worked examples | 3+ per lesson; include at least one harder, multi-concept / unfamiliar-context example, not only the easy template |
| Steps per worked example | As many as the method takes — one operation per step, each with its reasoning |

Cut filler ruthlessly; never cut understanding. A teaching section is the right length when a capable student finishes it able to **justify and transfer** the method — not when it hits a time target. If the concept is genuinely simple, it can be short; if it is deep, make it as long as the depth requires.
