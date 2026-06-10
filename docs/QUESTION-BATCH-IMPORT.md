# Question Batch Import Guide

How to prepare, validate, and import externally generated question batches (e.g. from Manus) into the Nova Maths question bank.

> **Authoring standards:** For the full rules on question fields, LaTeX formatting, MCQ design, hint/explanation quality, and question difficulty — see the authoring standards pack:
> - [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md) — fields, types, LaTeX/currency rules, validation commands
> - [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md) — hints, explanations, common mistakes
> - [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) — guided/independent/mastery structure, difficulty, MCQ guidance
> - [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md) — teaching paragraphs and worked example style

---

## Overview

The pipeline is:

```
Manus generates JSON  →  validate-question-batch.ts  →  (human review)  →  seed-question-bank.ts
```

The validator is a **gate, not a loader**. It exits 1 on any error and never writes to the database.

---

## Batch file format

A batch file is a JSON file containing either:

- **An array** of question records (bare format), or
- **A wrapper object** with metadata and a `questions` array (preferred)

### Wrapper format (preferred)

```json
{
  "batch_id": "manus-2026-06-10-y9-financial",
  "generated_by": "manus",
  "questions": [
    { ...record },
    { ...record }
  ]
}
```

The `batch_id` string is logged but not written to the database. Use a date + topic slug so batches are traceable.

---

## Record shape

Each question record must match this TypeScript type:

```typescript
type QuestionBatchRecord = {
  // ── Identity ──────────────────────────────────────────────────────
  source_id:             string;                  // REQUIRED. Stable human-readable ID (see below)
  topic_slug:            string;                  // REQUIRED. e.g. "financial-mathematics"
  subtopic_slug:         string;                  // REQUIRED. e.g. "simple-interest"
  year_level:            string;                  // REQUIRED. e.g. "year-9"
  course_slug:           string;                  // REQUIRED. e.g. "year-9-mathematics"

  // ── Classification ────────────────────────────────────────────────
  difficulty:            1 | 2 | 3 | 4 | 5;      // REQUIRED. 1=easiest, 5=hardest
  question_type:         "conceptual" | "procedural"; // REQUIRED

  // ── Content ───────────────────────────────────────────────────────
  prompt:                string;                  // REQUIRED. Question text (MathText-rendered)
  latex?:                string | null;           // Optional. Display formula (KaTeX BlockMath)
  choices?:              Choice[] | null;         // Present for MCQ, null for typed answer
  answer:                string;                  // REQUIRED. Correct answer or choice label
  accepted_answers:      string[];                // REQUIRED. Alternative accepted forms ([] is fine)
  hint?:                 string | null;           // Optional hint shown on request
  explanation:           string;                  // REQUIRED. Step-by-step worked solution

  // ── Metadata ──────────────────────────────────────────────────────
  syllabus_ref?:         string | null;           // NSW syllabus dot-point reference
  transfer_from_topics:  string[];                // Prerequisite topic slugs ([] is fine)
  is_active?:            boolean;                 // Default true. Set false to exclude from worksheets
  diagram_data?:         object | null;           // Leave null unless you know the diagram schema
}

type Choice = {
  label: string;   // "A", "B", "C", "D"
  text:  string;   // Choice text (MathText-rendered)
}
```

---

## Field rules

### `source_id`

Use a stable, human-readable slug. **Do not use UUIDs** — they are not stable across regeneration.

Convention: `{year-prefix}-{unit-prefix}-{lesson-prefix}-{section}{position}`

| Example | Meaning |
|---|---|
| `y9-fin-si-g1` | Year 9, financial maths, simple interest, guided Q1 |
| `y9-fin-ci-mc1` | Year 9, financial maths, compound interest, MCQ 1 |
| `y10-trig-rat-i3` | Year 10, trig, ratios, independent Q3 |

### `difficulty`

| Value | Typical use |
|---|---|
| 1 | Guided practice, MCQ |
| 2 | Guided practice, typed answer |
| 3 | Independent practice |
| 4 | Independent practice (harder) |
| 5 | Mastery quiz or exam-style |

### `question_type`

| Value | When to use |
|---|---|
| `"conceptual"` | MCQ — `choices` is non-null |
| `"procedural"` | Typed answer — `choices` is null |

### `answer`

- For MCQ: the label of the correct choice (`"A"`, `"B"`, `"C"`, or `"D"`).
- For typed: the canonical form of the answer (`"120"`, `"2/3"`, `"-4"`).
  - Strip units, dollar signs, and formatting from the canonical form.
    The `accepted_answers` array handles alternate forms.

### `accepted_answers`

Alternate forms the answer-marking engine will accept. The engine already handles:
- `$500` ↔ `500` (dollar sign stripped)
- `1/2` ↔ `0.5` ↔ `50%` (fraction/decimal/percentage equivalence)
- `12 cm` ↔ `12` (unit ignored)
- `53°` ↔ `53 degrees` ↔ `53` (degree symbol/word)

Only add an `accepted_answers` entry when the equivalence is **not** covered above. Examples:

```json
"answer": "1200",
"accepted_answers": ["1,200", "$1,200", "1200.00"]
```

### `explanation`

- Must be a step-by-step worked solution, not a single sentence.
- Do not use the seed fallback: *"Review the worked method and compare each step..."*
- Minimum ~40 characters. Prefer 100+ for multi-step problems.
- Use LaTeX math spans (`$...$`) for all expressions.

---

## Math formatting rules

Prompts, choice text, and explanations are rendered by the **MathText** component which parses inline `$...$` LaTeX and detects currency amounts.

### Correct patterns

| What you want | How to write it |
|---|---|
| Dollar amount | `$500` (no backslash) — MathText detects as currency |
| Inline math | `$x + 1$` |
| Display formula in `latex` field | `\\frac{P \\times R \\times T}{100}` (no `$` delimiters needed in `latex`) |
| Percentage inside math | `$6\\%$` |

### Common mistakes to avoid

| Wrong | Problem | Right |
|---|---|---|
| `\\$500` | Stray backslash rendered before `$` | `$500` |
| `\$500` | Same backslash-dollar bug | `$500` |
| `$x + 1` | Unclosed math span — rest of text disappears | `$x + 1$` |
| `$$x + 1$$` | Double-dollar (display math) not supported by MathText | `$x + 1$` |
| `$1000 \times r$` | `$1000` matches the currency detector; `\times r$` renders as plain text | `$= 1000 \times r$` (prefix with `=` or a letter so `$` is not followed by a digit) |

The validator catches all four of the above.

---

## Valid example

```json
{
  "batch_id": "manus-2026-06-10-y9-financial",
  "generated_by": "manus",
  "questions": [
    {
      "source_id": "y9-fin-si-g1",
      "topic_slug": "financial-mathematics",
      "subtopic_slug": "simple-interest",
      "year_level": "year-9",
      "course_slug": "year-9-mathematics",
      "difficulty": 2,
      "question_type": "procedural",
      "prompt": "Calculate the simple interest on $800 at $5\\%$ p.a. for $3$ years.",
      "latex": "I = \\frac{PRT}{100}",
      "choices": null,
      "answer": "120",
      "accepted_answers": ["$120", "120.00", "$120.00"],
      "hint": "Substitute P = 800, R = 5, T = 3.",
      "explanation": "$I = \\frac{800 \\times 5 \\times 3}{100} = \\frac{12000}{100} = 120$. The interest is $120.",
      "syllabus_ref": null,
      "transfer_from_topics": ["percentages"],
      "is_active": true,
      "diagram_data": null
    },
    {
      "source_id": "y9-fin-ci-mc1",
      "topic_slug": "financial-mathematics",
      "subtopic_slug": "compound-interest",
      "year_level": "year-9",
      "course_slug": "year-9-mathematics",
      "difficulty": 3,
      "question_type": "conceptual",
      "prompt": "Which expression gives the compound amount when $P = 1000$, $r = 0.05$, and $n = 2$?",
      "latex": "A = P(1 + r)^n",
      "choices": [
        { "label": "A", "text": "$= 1000 \\times 0.05 \\times 2$" },
        { "label": "B", "text": "$= 1000 \\times (1.05)^2$" },
        { "label": "C", "text": "$= 1000 + 0.05 \\times 2$" },
        { "label": "D", "text": "$= 1000 \\times 1.1$" }
      ],
      "answer": "B",
      "accepted_answers": [],
      "hint": null,
      "explanation": "$A = 1000(1.05)^2 = 1000 \\times 1.1025 = 1102.50$. Only option B uses the correct compound formula.",
      "syllabus_ref": null,
      "transfer_from_topics": ["financial-mathematics/simple-interest"],
      "is_active": true,
      "diagram_data": null
    }
  ]
}
```

---

## Invalid examples (what the validator catches)

### ERROR — stray backslash before currency

```json
"prompt": "Find the value of \\$500 invested for 2 years."
```

The rendered output shows a literal `\` before `$500`. Fix: remove the backslash.

```json
"prompt": "Find the value of $500 invested for 2 years."
```

### ERROR — answer label not in choices

```json
"choices": [
  { "label": "A", "text": "$10$" },
  { "label": "B", "text": "$20$" }
],
"answer": "C"
```

`"C"` doesn't appear in the choices. Fix: match the label to one of `A`, `B`, etc.

### ERROR — generic fallback explanation

```json
"explanation": "Review the worked method and compare each step with the expected answer."
```

This is the seed script's auto-generated fallback. Fix: write the actual step-by-step solution.

### ERROR — duplicate source_id

Two records with `"source_id": "y9-fin-si-g1"` in the same file. Fix: make IDs unique.

### WARNING — unclosed LaTeX span

```json
"prompt": "Simplify $x + 3 and write the result."
```

The `$` before `x` opens a math span but there is no closing `$`. Fix:

```json
"prompt": "Simplify $x + 3$ and write the result."
```

### WARNING — question_type / choices mismatch

```json
"question_type": "conceptual",
"choices": null
```

Typed answers (no choices) should use `"procedural"`.

---

## Running the validator

```bash
# Validate a file
npx tsx scripts/validate-question-batch.ts path/to/batch.json

# Fail on warnings too (recommended before final import)
npx tsx scripts/validate-question-batch.ts path/to/batch.json --strict

# Print an example batch to stdout
npx tsx scripts/validate-question-batch.ts --example > example-batch.json
```

Exit codes:

| Code | Meaning |
|---|---|
| `0` | All records pass (or only warnings in standard mode) |
| `1` | One or more errors (or warnings in `--strict` mode) |

---

## Import process (when ready)

1. Manus generates `batch.json` following this spec.
2. Run the validator: `npx tsx scripts/validate-question-batch.ts batch.json --strict`
3. Fix any errors and re-validate until exit code 0.
4. Human review: spot-check 5–10 questions for accuracy.
5. Copy the question records into the appropriate lesson file in `lib/lessons/` as `PracticeQuestion` entries, OR trigger `seed-question-bank.ts` via the service role.
6. Run `npm run audit:lessons` to confirm no new failures.

> **Database writes are not automated yet.** Step 5 is a manual process. The validator only reads; it never connects to Supabase.
