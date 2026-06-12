# Practice Question Standard

Defines structure, coverage, and quality for the three practice sections of every Nova Maths lesson.

---

## Section structure

| Section | Count | Purpose |
|---|---|---|
| `guidedPractice` | 4 questions | Scaffold the new skill with low cognitive load |
| `independentPractice` | 5 questions | Consolidate across varied contexts |
| `masteryQuiz` | 10 questions | Verify durable understanding without scaffolding |
| `multiPartPractice` | Optional | HSC Section II-style multipart extension practice |

**Total: 19 standard questions per lesson.** Do not deviate from this count. Optional `multiPartPractice` questions sit outside this count and are audited separately.

---

## Difficulty scale

Difficulty is inferred by `seed-question-bank.ts` from the question's position and `choices` presence. Do not set it manually in lesson TypeScript. Set it explicitly in JSON batches.

| Level | When assigned |
|---|---|
| D1 | Guided MCQ (`choices` present) |
| D2 | Guided typed answer; Independent Q1–Q3 |
| D3 | Independent Q4–Q5; Mastery Q1–Q4 |
| D4 | Mastery Q5–Q7 |
| D5 | Mastery Q8–Q10; or if prompt contains "exam" or "prove" |

---

## MCQ vs typed answer

| Choose MCQ when | Choose typed answer when |
|---|---|
| Testing conceptual understanding or identification | Testing calculation or procedural skill |
| Common misconceptions make useful distractors | The answer is a specific, auto-markable value |
| The correct method needs to be distinguished from typical errors | The student must produce the answer, not recognise it |

Standard distribution: **1–2 MCQ in guided**, **0–1 MCQ in independent**, **2–3 MCQ in mastery**.

---

## When to use the `latex` field

The `latex` field shows a display formula below the prompt. Use it when:

- The question involves a formula the student needs to apply
- A worked expression clarifies what is being asked
- The prompt alone is ambiguous without the algebraic setup

Skip it for simple questions where the prompt is self-contained (e.g. "Find y when x = 3 in the rule y = 2x + 1").

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
