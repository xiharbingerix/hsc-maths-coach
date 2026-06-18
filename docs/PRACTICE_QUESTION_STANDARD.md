# Practice Question Standard

Defines structure, coverage, and quality for the practice sections of every Nova Maths lesson. Gated by [CONTENT_QUALITY_STANDARD.md](./CONTENT_QUALITY_STANDARD.md) (Gate 3 — Practice depth).

> **The Band-6 engine.** The 19-question spine builds fluency, but fluency alone is a Band 4–5. What separates a Band 6 is the harder, multi-step, *unfamiliar-context* work: a deep, difficulty-ramped mastery pool and HSC Section II-style multi-part questions. At **Stage 6 (Year 11–12) these are REQUIRED, not optional** — a lesson without them is incomplete. (At Stage 4–5 they are strongly recommended.)

---

## Section structure

| Section | Count | Purpose |
|---|---|---|
| `guidedPractice` | 4 questions | Scaffold the new skill with low cognitive load |
| `independentPractice` | 5 questions | Consolidate across varied contexts |
| `masteryQuiz` | 10 questions | Verify durable understanding without scaffolding |
| `masteryQuizPool` | ~30–40 questions, difficulty-ramped | **Required at Stage 6.** Pool the mastery quiz draws a fresh ramped set from each attempt |
| `multiPartPractice` | ≥1 (Stage 6); typically 1–3 | **Required at Stage 6.** HSC Section II-style multi-part exam questions |

**The 19-question spine (4 + 5 + 10) is fixed — do not deviate from that count.** On top of the spine, every Stage 6 lesson must also ship a `masteryQuizPool` and at least one `multiPartPractice` item. These sit outside the 19 count and are audited separately, but at Stage 6 they are mandatory, not extension extras.

---

## Difficulty scale

Difficulty is inferred by `seed-question-bank.ts` from the question's position and `choices` presence. Do not set it manually in lesson TypeScript. Set it explicitly in JSON batches.

| Level | When assigned |
|---|---|
| D1 | Guided MCQ (`choices` present) |
| D2 | Guided typed answer; Independent Q1–Q3 |
| D3 | Independent Q4–Q5; Mastery Q1–Q4 |
| D4 | Mastery Q5–Q7 |
| D5 | Mastery Q8–Q10; `multiPartPractice` section; or if prompt contains "exam" or "prove" |

---

## MCQ vs typed answer

| Choose MCQ when | Choose typed answer when |
|---|---|
| Testing conceptual understanding or identification | Testing calculation or procedural skill |
| Common misconceptions make useful distractors | The answer is a specific, auto-markable value |
| The correct method needs to be distinguished from typical errors | The student must produce the answer, not recognise it |

Standard distribution: **1–2 MCQ in guided**, **0–1 MCQ in independent**, **2–3 MCQ in mastery**.

---

## When to use the display `latex` field

The `latex` field shows a separate display formula block below the prompt. This guidance is about that display block, not inline LaTeX inside `prompt`, `hint`, `explanation`, or choice text. Use inline LaTeX freely when it makes the question text clearer or prettier.

Use the display `latex` field when:

- The question involves a formula or expression that is part of the stimulus
- The prompt alone is ambiguous without displaying the given algebraic object
- The question asks the student to choose or interpret a setup, so the setup itself is assessable

Skip the display `latex` field when the prompt is self-contained (e.g. "Find y when x = 3 in the rule y = 2x + 1"). **Prefer no display `latex` block over a decorative or redundant one.**

Do **not** use the display `latex` field to show the calculation setup, substitution, operation, or first working step for a typed-answer question. That gives away the method before the student has attempted the question. Put working in `explanation`, and use `hint` for a nudge only.

---

## Guided practice — 4 questions

**Purpose:** introduce the new skill with low cognitive load. Should closely mirror the worked examples.

### Rules

- Q1: MCQ or very direct typed — confirm the student can identify the core rule
- Q2–Q4: typed answers — step up complexity slightly each question
- Hints should be **generous** (see FEEDBACK_AND_HINTS_STANDARD.md)
- No surprise twists, transfers, or multi-step reasoning beyond what was taught
- Should feel achievable after reading the teaching section

### Suitable

- "Rule: y = 3x + 1. Find y when x = 4." (D2, direct substitution)
- "Which rule matches the pattern x=1→5, x=2→8, x=3→11?" (D1, MCQ, pattern identification)
- "Plot the point (2, 5) on a number plane." (D2, direct coordinate task)

### Not suitable

- A question introducing a second new concept
- A question requiring multi-step reasoning beyond what was taught
- An exam-style contextual problem as the first guided question
- A question that requires a concept from later in the unit

---

## Independent practice — 5 questions

**Purpose:** same skill, varied contexts. Less scaffolding. Mild transfer is acceptable.

### Rules

- Q1–Q3: D2 — direct application in a new numeric context or scenario
- Q4–Q5: D3 — mild transfer, slightly varied framing, or different real-world context
- One MCQ is acceptable; the rest should be typed
- Avoid trick questions; focus on durable understanding
- Hints should be **less direct** than guided — nudge rather than guide

### Suitable

- A gradient question in a real-world context (e.g. cost per km) after learning rise ÷ run
- A table-of-values question with a negative gradient
- An MCQ where distractors are the two most common errors for the topic

### Not suitable

- A question that requires content from a future lesson
- An exam-style multi-part question
- A question identical to guided practice (different numbers, same structure)
- A question testing only arithmetic, not the lesson's specific skill

---

## Mastery quiz — 10 questions

**Purpose:** verify the student can apply the skill without scaffolding. Mixed difficulty.

### Rules

- Q1–Q4: D3 | Q5–Q7: D4 | Q8–Q10: D5
- Include 2–3 MCQ to test conceptual understanding and misconception traps
- Hints are minimal or absent
- Every question must be auto-markable
- Use `multiPartPractice`, not `masteryQuiz`, for HSC Section II-style multi-part extension practice
- Must include at least one question targeting the most common misconception (see `commonMistakes`)
- Explanations must be particularly clear — mastery quiz is the student's primary review stage

### Suitable

- "A line falls 4 units over 2 units of run. Find the gradient." (D4, tests negative gradient)
- An MCQ with three common error distractors testing the conceptual rule (D3)
- A contextual question (e.g. gradient of a distance-time graph as speed) (D5)
- A question combining two sub-skills from the same lesson

### Not suitable

- "Find x and then sketch the graph." (not auto-markable unless each part has a structured, exact/numeric/algebraic answer)
- A repeat of a guided question with the same numbers
- A question at D1 or D2 difficulty (too easy for mastery)
- A question requiring a calculator when none is available

---

## Mastery quiz pool (`masteryQuizPool`) — required at Stage 6

**Purpose:** so each mastery attempt is a fresh, difficulty-ramped quiz rather than the same fixed 10 questions. The pool is a larger bank (target **~30–40 difficulty-tagged questions**) that `buildMasteryQuiz` draws `masteryQuiz.length` items from per attempt, ramped easy→hard.

### Rules

- **Required for every Stage 6 (Year 11–12) lesson.** A fixed `masteryQuiz` with no pool does not pass the Definition of Done at Stage 6. (Strongly recommended at Stage 4–5.)
- Tag each pool question with an explicit `difficulty` (1–5). Spread them so a built quiz can ramp D3→D5.
- The pool must cover **every success criterion and sub-skill**, with multiple variants per sub-skill so repeat attempts are not identical.
- The **top of the pool (D5) must contain genuine Band-6 items**: multi-step, combining sub-skills, set in unfamiliar contexts — see the Band-6 difficulty bar below.
- Every question auto-markable, with a misconception-aware distractor set (MCQ) or exact/accepted answers (typed), and a teaching explanation.

---

## The Band-6 difficulty bar

Fluency questions earn a Band 4–5. A Band 6 is earned on questions that are **multi-step, combine more than one idea, and are set in an unfamiliar framing**. Every Stage 6 lesson must include such questions — at the top (D5) of the mastery pool and in `multiPartPractice`.

A question clears the Band-6 bar when it does **at least two** of:

- Requires **chaining 2+ sub-skills** (e.g. differentiate → solve `f'(x)=0` → classify → interpret).
- Is set in an **unfamiliar or applied context** the worked examples did not directly cover (transfer, not recall).
- Requires **selecting the method**, not just executing a named one (the question doesn't tell the student which rule to use).
- Involves a **non-routine value, constraint, or edge case** (awkward domain, parameter, or sign that defeats pattern-matching).

What does **not** clear the bar: the same template with bigger or uglier numbers; a one-step application of the lesson's headline formula; anything a student could answer by mimicking a worked example without understanding it.

Aim for **at least 3–4 Band-6-level items per lesson** across the D5 mastery pool and multi-part questions.

---

## Visual payload guidance

**You MUST attach a visual payload whenever a question involves a diagram, graph, plot, table, number line, geometric figure, or solid.** Never describe a visual in words, fake it in LaTeX, or spell a plot out as text when a renderer exists for it.

There are **28 renderers** covering number lines, every common statistics display (dot/stem/bar/histogram/scatter/box/pie), plane shapes, sectors, 3D solids, nets, bearings, step graphs, and the full function/coordinate set. The single source of truth — the full catalogue, the content→renderer map ("use the right renderer, never fake it"), MCQ-diagram answers, and how to add a new renderer via the registry — is **[QUESTION_AUTHORING_STANDARD.md → Visual payloads](./QUESTION_AUTHORING_STANDARD.md#visual-payloads)**. The schema for every field is `lib/lessons/types.ts`.

The lesson auditor flags **"visual required, no payload"**; fix it by adding the payload, not by rewording the prompt. Visual payloads support student understanding, but answers must still be auto-markable unless the question is explicitly for teacher-led discussion.

### The `description` field

Every visual payload has a required `description: string`. Write it as a specific accessibility label — not `"Diagram."` but a sentence describing what it actually shows (labels, values, key features). See [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md) for examples.

### Diagram-first design

For visual topics, choose the diagram first and write the question around what the student reads from it. Do not add a diagram as an afterthought to a text-first question.

### Multi-part questions + visual payloads

Attach the visual payload to the top-level question only. Part prompts should refer to it with "Using the diagram above…" or "From the graph…". Never duplicate the payload per-part.

---

## Multi-part practice (`multiPartPractice`)

**Purpose:** exam-rehearsal. Multi-part questions replicate the structure of HSC Section II items — a shared stem, 2–4 dependent parts, and a marks-based mark scheme. They sit outside the 19-question lesson count. **At Stage 6 every lesson must ship at least one** — this is the single biggest Band-5-to-Band-6 lever and is part of the Definition of Done. (At Stage 4–5 they remain strongly recommended.)

**You MUST use the `multiPartPractice` array whenever a question is structurally multi-part** (shared stem, 2–4 dependent parts). The multi-part system is production-ready and supports marks-weighted partial credit. Never collapse a multi-part question into a single unstructured `answer` field.

### Placement

`multiPartPractice` appears after the student has completed guided, independent, and mastery sections. It is positioned as "Working Mathematically / Exam Practice" — the exam-rehearsal layer on top of fluency and mastery work (required at Stage 6), not a replacement for them.

Do not put a question here because it is hard. Put it here because it is **structurally multi-part** — that is, it has a shared stem with 2–4 dependent parts where later parts build on earlier ones.

### Rules

- Always seeded at **D5** regardless of individual part difficulty.
- Not counted toward the 19-question standard lesson total.
- Not audited by the standard section-count check in `audit:lessons`.
- Every part must be auto-markable. No "explain", "justify", "show that", "prove", or "describe" in any part prompt (free-text). See [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md) for the full MVP-safe/unsafe table.
- Total marks per question: 4–6. Distribute as: (a) 1–2 marks, (b) 1–2 marks, (c) 2–3 marks.
- Prefer specific numeric outputs over full equations. Equations have too many equivalent forms; exact matching will produce false negatives.
- Each part needs its own `hint` and `explanation`. The top-level `hint` and `explanation` are the post-submission summary across all parts.
- The optional `working?: string[]` field on each part holds KaTeX lines that are rendered as a worked solution panel after submission. Use it for multi-step calculations where the explanation prose alone is not enough to show the working clearly. Each element should be one line of KaTeX (no `$` delimiters).

### What belongs here

- A calculus question with parts: compute derivative → classify stationary point → find inflection
- A linear modelling question: build equation → solve → interpret changed parameter
- A probability question: compute P(A) → compute P(A|B) → interpret result
- An Extension 1 question mirroring an actual HSC Section II item

### What does not belong here

- A hard but single-output question (put in `masteryQuiz` at D4–D5)
- A question where any part requires a proof or written explanation
- A question where parts are independent (no shared stem, no dependency between parts)
- A question where the answer to any part is a full equation with no canonical unique form

### Marks-weighted scoring

Multi-part worksheet questions receive marks-weighted partial credit. Each correct part earns its `marks` value, and worksheet feedback shows total marks plus per-part marks, answers, and explanations. The question-level result is `correct`, `partial`, or `incorrect` based on total marks earned.

This still relies on exact, numeric, coordinate, or simple algebraic auto-marking. Do not author proof-only or free-text parts for primary graded use.

### Recommended future audit checks (not yet implemented)

| Check | Severity |
|---|---|
| Part `key` values not unique within a question | Fail |
| Any part `answer` is empty | Fail |
| Any part prompt contains "explain", "justify", "show that", "prove", "describe" | Fail |
| Top-level `answer` does not match part (a)'s `answer` | Warn |
| Part `explanation` shorter than 40 characters | Warn |
| Any part has no `hint` | Warn |

---

## Distribution summary

| Section | Q count | MCQ | Typed | Difficulty |
|---|---|---|---|---|
| Guided | 4 | 1–2 | 2–3 | D1–D2 |
| Independent | 5 | 0–1 | 4–5 | D2–D3 |
| Mastery | 10 | 2–3 | 7–8 | D3–D5 |

---

## Coverage requirements

The 19 questions across a lesson must cover:

- Every success criterion at least once
- Each distinct sub-skill at least twice (once in guided, once in independent or mastery)
- Common misconceptions — tested via MCQ distractors or question framing
- Both positive and negative cases where applicable (e.g. positive and negative gradient)
- At least one contextual/real-world question in independent or mastery

In addition, every **Stage 6** lesson must ship (outside the 19-question spine):

- A `masteryQuizPool` (~30–40 difficulty-tagged questions) covering every sub-skill with multiple variants
- At least one `multiPartPractice` (HSC Section II-style) item
- At least 3–4 questions that clear the **Band-6 difficulty bar** (above), split across the D5 mastery pool and multi-part items

---

## MCQ distractor design

Distractors should be wrong answers students actually produce:

- Reversed operation (e.g. run ÷ rise instead of rise ÷ run)
- Sign error (e.g. positive gradient when it should be negative)
- Incorrect formula (e.g. using wrong angle rule)
- Common arithmetic error (e.g. off-by-one, incorrect order of operations)

Do not use:
- Random implausible numbers
- Correct answer with a unit removed (too obviously wrong)
- Trick distractors that a careful reader would spot immediately

---

## Examples by section

### Guided Q1 — MCQ (D1)

```typescript
choice(
  "y8-lin-grd-g1",
  "Gradient is calculated as…",
  "B",
  ["run ÷ rise", "rise ÷ run", "rise × run", "rise + run"],
  "Gradient = rise ÷ run (vertical change divided by horizontal change).",
)
```

### Guided Q2 — typed (D2)

```typescript
answer(
  "y8-lin-grd-g2",
  "A line rises 6 units for every 3 units it runs. Find the gradient.",
  "\\text{gradient} = \\frac{6}{3}",
  "2",
  "Gradient = 6 ÷ 3 = 2.",
)
```

### Independent Q4 — typed (D3, mild transfer)

```typescript
answer(
  "y8-lin-grd-i4",
  "A car travels 200 km in 4 hours. What is the gradient of the distance-time graph?",
  "\\text{gradient} = \\frac{200}{4}",
  "50",
  "Gradient = 200 ÷ 4 = 50. The gradient of a distance-time graph equals the speed in km/h.",
)
```

### Mastery Q2 — MCQ (D3, misconception trap)

```typescript
choice(
  "y8-lin-grd-m2",
  "A horizontal line has gradient…",
  "D",
  ["1", "−1", "undefined", "0"],
  "A horizontal line has no rise: gradient = 0 ÷ run = 0. Undefined gradient applies to vertical lines.",
)
```

### Mastery Q9 — typed (D5, context)

```typescript
answer(
  "y8-lin-grd-m9",
  "Find the gradient of the line through (1, 7) and (3, 3).",
  "\\text{gradient} = \\frac{3-7}{3-1}",
  "-2",
  "Rise = 3 − 7 = −4, run = 3 − 1 = 2. Gradient = −4 ÷ 2 = −2.",
  ["-2", "−2"],
)
```

---

## Cross-references

- Question format and field rules: [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md)
- Hint and explanation quality: [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md)
- Teaching section content: [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md)
- External JSON batch format: [QUESTION-BATCH-IMPORT.md](./QUESTION-BATCH-IMPORT.md)
