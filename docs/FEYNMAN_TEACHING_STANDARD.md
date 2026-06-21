# FEYNMAN TEACHING STANDARD

Standard for `teaching.paragraphs`, `teaching.latexBlocks`, and `workedExamples` in Nova Maths lesson files.

This document defines how mathematics should be taught, not merely how content should be formatted.

A lesson that satisfies the schema but fails this teaching standard should be rejected.

---

# Core Goal

The purpose of teaching content is not to tell students what to do.

The purpose is to help students build correct mathematical understanding.

After reading a lesson, a student should be able to:

* explain the concept in plain English
* recognise the concept in unfamiliar situations
* avoid common misconceptions
* apply the concept independently
* explain why the method works

If a student can only repeat a procedure, the lesson has failed.

---

# Core Teaching Principles

## 1. Intuition before notation

Students should understand the idea before seeing the formal mathematics.

Bad:

"The gradient formula is m = (y₂ − y₁)/(x₂ − x₁)."

Good:

"Gradient measures how quickly a line rises or falls."

Introduce the formula only after the concept is understood.

---

## 2. Concrete before abstract

Show specific examples before general rules.

Students learn ideas more easily when they can observe them happening with real numbers, diagrams, or familiar situations.

Only after the pattern is visible should the general rule be introduced.

---

## 3. Why before how

Students should understand why a method works before being asked to follow it.

Procedures without reasoning create fragile understanding.

Every important method should be linked to the principle that justifies it.

---

## 4. Build from prior knowledge

Every lesson should explicitly connect to something students already know.

Examples:

* fractions before algebraic fractions
* ratios before gradient
* arithmetic sequences before linear functions
* area models before algebraic expansion

Never assume prerequisite understanding is obvious.

---

## 5. Misconceptions are part of teaching

Teaching is not complete until the most likely misconception has been addressed.

Strong lessons anticipate mistakes before students make them.

---

## 6. Mathematics is about relationships

Students should understand what quantities are changing, what stays the same, and how ideas connect.

Avoid teaching mathematics as a collection of isolated formulas.

---

# Lesson Design Requirements

Before authoring content, define:

## Knowledge Goal

What idea should the student understand?

Example:

"Gradient measures rate of change."

---

## Skill Goal

What should the student be able to do?

Example:

"Calculate gradient from coordinates or graphs."

---

## Misconception Goal

What misunderstanding should be removed?

Example:

"Students should not confuse gradient with y-intercept."

---

Every paragraph, example, formula, and visual should support at least one of these goals.

---

# Mental Model Requirement

Every lesson must provide a conceptual model.

A conceptual model is an explanation that still makes sense if the student forgets the formula.

Examples:

Gradient:
"How much y changes whenever x increases by one."

Probability:
"The long-run proportion of times an event occurs."

Area:
"How much space is covered."

Index laws:
"A shortcut for repeated multiplication."

Ratios:
"A comparison between quantities."

If a lesson contains only procedures and formulas, it is incomplete.

---

# Representation Rule

Students should encounter mathematics in multiple forms.

Where appropriate, lessons should connect at least two representations:

* words
* diagrams
* tables
* graphs
* equations
* real-world contexts

Examples:

Table ↔ Graph

Graph ↔ Equation

Diagram ↔ Formula

Context ↔ Algebra

Students should understand that these are different views of the same mathematics.

---

# Productive Thinking Rule

At least one section of every lesson should require the student to think before the explanation is given.

Examples:

* prediction
* estimation
* comparison
* classification
* error spotting

Example:

"Which line is steeper: rise 4 run 2, or rise 6 run 4?"

Allow the student to think before revealing the explanation.

Learning is stronger when students make a prediction and then evaluate it.

---

# Generalisation Rule

After every concrete example, explicitly identify:

## What changes

The numbers, context, labels, or specific values.

## What stays the same

The mathematical structure, rule, or relationship.

Example:

Changes:

* coordinates

Stays the same:

* gradient = rise ÷ run

Students should learn the structure behind the example, not just the example itself.

---

# Misconception Framework

Every lesson should explicitly address at least one major misconception.

Use the following structure:

1. State the misconception.
2. Explain why students make it.
3. Show why it fails.
4. Replace it with the correct idea.

Example:

Many students think a negative gradient means the graph is below the x-axis.

This seems reasonable because negative numbers are often associated with being below zero.

However, gradient describes direction, not position.

A line can have negative gradient while remaining entirely above the x-axis.

---

# What To Avoid

| Avoid                              | Reason                                        |
| ---------------------------------- | --------------------------------------------- |
| Formula drop                       | Students memorise without understanding       |
| Circular definitions               | No new understanding is created               |
| Unexplained jargon                 | Increases cognitive load                      |
| Wall-of-text paragraphs            | Students stop processing ideas                |
| Motivational filler                | Adds length without learning value            |
| Purely procedural explanations     | Creates fragile knowledge                     |
| Multiple new ideas in one sentence | Overloads working memory                      |
| "Just apply the formula"           | Does not explain why                          |
| Worked examples without reasoning  | Demonstrates calculation rather than thinking |

---

# Teaching Section Structure

```typescript
teaching: {
  paragraphs: string[];
  latexBlocks: string[];
}
```

---

# Paragraph Structure

## Paragraph 1 — Intuition

What is the idea?

Explain the concept in plain English.

No formula.

---

## Paragraph 2 — Concrete Example

Show the concept using:

* numbers
* a familiar situation
* a visual example

Students should be able to picture the idea.

---

## Paragraph 3 — Formal Rule

Introduce notation and formulas.

Explain every symbol.

Connect the notation back to the intuition.

---

## Paragraph 4 — Misconception

Address the most common mistake.

Explain why students make it.

Correct it.

---

## Paragraph 5 (Optional) — Exam Connection

Explain how the concept appears in NSW exam questions.

Keep to one or two sentences.

---

# Paragraph Quality Rules

Each paragraph should:

* teach one idea
* contain 2–4 sentences
* use direct language
* avoid unnecessary jargon

Every paragraph should answer one question:

* What is it?
* Why does it work?
* How is it represented?
* What mistake do students make?
* Where does it appear in exams?

If a paragraph does not answer one of these questions, remove it.

---

# Worked Example Structure

```typescript
type WorkedExample = {
  title: string;
  questionLatex: string;
  steps: {
    explanation: string;
    latex?: string;
  }[];
  finalAnswerLatex: string;
}
```

Worked examples may also include any supported visual payload field.

---

# Worked Example Philosophy

Worked examples are demonstrations of mathematical thinking.

Students should learn:

* what to notice
* what decision to make
* why that decision is correct
* how to execute the mathematics
* how to interpret the result

A worked example should reveal thinking, not merely algebra.

---

# Worked Example Structure

Every worked example should follow:

## Observation

What information matters?

Example:

"The graph rises from left to right."

---

## Decision

What mathematical idea should be used?

Example:

"We need gradient."

---

## Execution

Carry out the mathematics.

Example:

"Gradient = rise ÷ run."

---

## Interpretation

Explain what the answer means.

Example:

"The positive gradient means the quantity increases."

---

# Worked Example Rules

* 2–3 worked examples per lesson
* More for complex topics
* Each step contains one explanation and one piece of working
* Do not combine multiple operations in a single step
* Explanations must justify decisions
* Final answers must clearly state what the answer represents

---

# Principle-First Explanations

Do not explain a step by restating it.

Weak:

"Subtract 5 because we need x by itself."

Strong:

"Subtract 5 because equations remain balanced when the same operation is applied to both sides."

Every important step should be linked to a mathematical principle.

---

# latexBlocks Rules

Key formulas and rules displayed as block mathematics.

No `$` delimiters.

```typescript
latexBlocks: [
  "\\text{gradient} = \\frac{\\text{rise}}{\\text{run}}",
  "m = \\frac{y_2-y_1}{x_2-x_1}"
]
```

Include:

* core formula
* key notation
* important sign rule or edge case

Aim for 2–4 blocks.

---

# Visual Teaching Standard

When a concept is visual, teach through the visual.

Students should read:

* shapes
* trends
* movement
* symmetry
* position
* structure

Do not reduce visual mathematics to symbol manipulation.

A graph is not merely a source of numbers.

A graph is a representation of relationships.

---

# Diagram Rules

When a concept depends on a diagram:

* attach the correct visual payload to the worked example
* refer to the diagram explicitly
* explain what students should notice
* explain why it matters

Never fake diagrams using LaTeX or prose when a renderer exists.

Follow all visual payload requirements from QUESTION_AUTHORING_STANDARD.md.

---

# Information Load Rule

Do not introduce:

* new notation
* new vocabulary
* new procedures

in the same sentence.

Students should process one new idea at a time.

Complexity should increase gradually.

---

# NSW Exam Connection

Include a brief statement connecting the concept to exam usage.

Example:

"In exam questions, gradient is often described as a rate of change in contexts such as speed, cost, or population growth."

One sentence is enough.

Avoid motivational filler.

---

# Length Guide

| Field             | Target Length  |
| ----------------- | -------------- |
| paragraphs        | 4–5 paragraphs |
| latexBlocks       | 2–4 formulas   |
| worked examples   | 2–3 examples   |
| steps per example | 2–5 steps      |

A teaching section should take approximately 60–120 seconds to read.

Shorter is usually better.

---

# Teaching Quality Test

Before approving a lesson, ask:

Can a student:

1. Explain the concept in plain English?
2. Recognise it in a different representation?
3. Avoid the most common misconception?
4. Predict what happens in a new example?
5. Apply the method independently?
6. Explain why the method works?

If any answer is "no", revise the lesson.

---

# Gold Standard Test

Imagine the formulas are removed from the lesson.

Would a strong student still understand the concept?

If the answer is no, the lesson is teaching procedures rather than mathematics.

Rewrite it.

---

# Course-Level Calibration

These rules calibrate how strictly the standard applies. They were added after auditing teaching across Standard, Advanced, and Extension courses, and they make the standard usable as a scoring instrument without over-pitching any course.

---

## A. Course-Level Depth Guidance

Benchmark teaching is not the same depth at every level. Pitch to the course.

### Standard

Benchmark requires:

* one plain-English intuition before each formula
* one concrete worked context (money, shape, rate, measurement)
* a practical conceptual model the student can picture
* worked-example steps that carry reasoning, not just labels

Derivations are **not** required. Transferable understanding is. Accessibility outranks rigour.

### Advanced

Benchmark requires everything above, plus:

* the *why* of each method — the principle that justifies it
* at least one derivation or limiting argument where the syllabus expects it (for example, first principles)

### Extension

Benchmark requires everything above, plus:

* structural and general reasoning
* proof intuition
* explicit connections between representations and between topics

Rule of thumb: Standard teaches "what it means and how to use it"; Advanced adds "why it is true"; Extension adds "how it generalises." Do not pitch a Standard lesson at Advanced depth.

---

## B. Underivable Formula Rule

Some formulas are not expected to be derived at the course level (for example, the volume of a sphere in a Standard course).

For these, "must be memorised" is **not** an acceptable explanation on its own.

Provide at least one of:

* a sense-check (units or scale)
* a scaling intuition (doubling the radius multiplies the volume by eight)
* a dimensional reason (three lengths multiplied give cubic units)
* an analogy
* a practical interpretation

One sentence is enough. State plainly that the formula is accepted without derivation, then give the intuition.

---

## C. Productive Thinking and Generalisation Placement

The Productive Thinking Rule (predict before the explanation) and the Generalisation Rule (what changes and what stays the same) may be satisfied in **any** of:

* teaching paragraphs
* worked examples
* practice questions

They are **not** required inside teaching prose.

Auditable test: a lesson passes if at least one of its components — teaching or questions — makes the student predict, classify, or spot an error before the explanation is given, and at least one example identifies the invariant structure behind the specific numbers.

Do not penalise teaching prose for delegating these to the question layer.
