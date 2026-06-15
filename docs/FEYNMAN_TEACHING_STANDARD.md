# Feynman Teaching Standard

Standard for `teaching.paragraphs`, `teaching.latexBlocks`, and `workedExamples` in Nova Maths lesson files.

---

## Core principles

1. **Simple language before formal notation.** Introduce the idea in plain English. The formula comes second.
2. **Concrete example before the general rule.** Show specific numbers first, then the abstract form.
3. **Explain the why, not just the how.** A student should understand why the method works.
4. **Connect to prior knowledge.** Name what the student already knows and build on it explicitly.
5. **Name the common misconception.** Tell students the easy mistake before they make it.
6. **Short paragraphs.** One idea per paragraph. Three to four sentences maximum.
7. **Calm, exam-aware tone.** Direct and practical. No hype, no filler, no hedging.

---

## What to avoid

| Avoid | Reason |
|---|---|
| Unexplained formula drop | Starting with a formula before the concept is understood |
| Circular definitions | "A linear equation is one that is linear" |
| Jargon without explanation | Using "common difference" before defining it |
| Wall-of-text paragraphs | More than 5 sentences in a single block |
| Vague motivational filler | "This is a really important concept you'll use throughout your studies" |
| Step-by-step without reasoning | Showing calculation without explaining each step |
| Passive voice for key steps | "The values are substituted" → "Substitute P, R, T into the formula" |

---

## Teaching section structure

```typescript
teaching: {
  paragraphs:  string[];   // 3–5 paragraphs, MathText-rendered
  latexBlocks: string[];   // 2–4 key formulas/rules, KaTeX BlockMath (no $ delimiters)
}
```

### Paragraph sequence

1. **Paragraph 1 — What is this?** Introduce the concept in plain language. No formula yet.
2. **Paragraph 2 — Concrete intuition.** Give a specific worked example or real-world anchor.
3. **Paragraph 3 — Formal notation.** Introduce the formula or algebraic rule. Explain each symbol.
4. **Paragraph 4 (optional) — Common misconception or edge case.** Address the most likely error.

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
};
```

### Rules

- 2–3 worked examples per lesson (more for complex topics)
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

Teaching paragraphs and worked examples can reference diagrams, but the teaching section itself does not embed `VisualPayloadRenderer` payloads — those live on individual questions. When a concept is inherently visual (graphs, geometry, probability trees, slope fields), the **worked example** is the right place to anchor the visual reasoning: reference the diagram in `questionLatex` and describe what the student should read from it in the step `explanation`.

Write teaching paragraphs as if the student has the relevant diagram in front of them. Use concrete spatial language: "the curve crosses", "the triangle has", "the field shows", "the tree branches into". Never describe a graph or diagram in abstract symbol form alone when spatial description would be clearer.

---

## NSW exam connection

A single direct sentence linking the concept to exam context:

> "In exam questions, gradient is often described as a 'rate of change' applied to a real-world context like cost per item or speed — the concept and calculation are identical."

One sentence is enough. Avoid multi-sentence motivational passages.

---

## Length guide

| Field | Target length |
|---|---|
| `paragraphs` | 3–5 paragraphs, 3–4 sentences each |
| `latexBlocks` | 2–4 formulas |
| Worked examples | 2–3 per lesson |
| Steps per worked example | 2–4 steps |

Shorter is better. A teaching section that takes 90 seconds to read is ideal.
