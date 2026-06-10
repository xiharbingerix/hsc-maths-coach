# Question Authoring Standard

Single source of truth for all question authoring on Nova Maths — lesson TypeScript and external JSON batches.

See also: [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) · [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md) · [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md) · [QUESTION-BATCH-IMPORT.md](./QUESTION-BATCH-IMPORT.md)

---

## Pre-flight checklist

- [ ] Every question has a real, specific prompt — no TODO, lorem ipsum, TBD, or "sample question"
- [ ] Every answer is correct and matches the explanation numerically
- [ ] Every explanation is step-by-step, ≥ 40 characters, specific to this question
- [ ] No multi-part prompts unless the answer field explicitly covers all parts
- [ ] No draft/self-correction wording (Wait, Hmm, recalculate, on second thought, actually that)
- [ ] No mojibake (Â, â€, Ï€, Ë, áµ)
- [ ] Currency amounts use plain `$500` — never `\$500` or `\\$500`
- [ ] All `$...$` LaTeX spans are closed (no unclosed math)
- [ ] LaTeX spans starting with a digit use `\( ... \)` not `$...$`
- [ ] MCQ: exactly 4 choices (A, B, C, D); `answer` is one of those labels
- [ ] Typed: `accepted_answers` covers reasonable alternate forms
- [ ] `question_type` matches `choices` presence
- [ ] Source IDs are human-readable slugs, not UUIDs

---

## Two question formats

### Format A — Lesson TypeScript (`PracticeQuestion`)

Used in `lib/lessons/`. Written in TypeScript, imported by the lesson override function.

```typescript
type PracticeQuestion = {
  id:              string;    // e.g. "y8-lin-gra-g1"
  prompt:          string;    // MathText-rendered question text
  latex:           string;    // KaTeX display formula (no $ delimiters)
  answer:          string;    // Canonical answer string
  acceptedAnswers: string[];  // Alternate accepted forms ([] is fine)
  hint:            string;    // One next-step hint
  explanation:     string;    // Step-by-step worked solution
  choices?: { label: string; text: string }[];  // MCQ only
};
```

> Lesson TypeScript questions do not carry `question_type`, `difficulty`, or `course_slug`. Those are inferred by `seed-question-bank.ts`.

### Format B — External JSON batch (`QuestionBatchRecord`)

Used in `question-batches/`. Validated by `scripts/validate-question-batch.ts`.

```typescript
type QuestionBatchRecord = {
  source_id:            string;                      // Human-readable slug (not UUID)
  topic_slug:           string;                      // e.g. "financial-mathematics"
  subtopic_slug:        string;                      // e.g. "simple-interest"
  year_level:           string;                      // Format: "year-9"
  course_slug:          string;                      // e.g. "year-9-mathematics"
  difficulty:           1 | 2 | 3 | 4 | 5;
  question_type:        "conceptual" | "procedural"; // See table below
  prompt:               string;
  latex?:               string | null;
  choices?:             { label: string; text: string }[] | null;
  answer:               string;
  accepted_answers:     string[];                    // [] is valid
  hint?:                string | null;
  explanation:          string;
  syllabus_ref?:        string | null;
  transfer_from_topics: string[];                    // [] is valid
  is_active?:           boolean;                     // default true
  diagram_data?:        object | null;
};
```

---

## Allowed question types

| `question_type` | `choices` | Use for |
|---|---|---|
| `"conceptual"` | Non-null array | Multiple choice |
| `"procedural"` | `null` | Typed answer |

These are the **only two** valid values. The validator rejects all others (`"application"`, `"analytical"`, etc.).

---

## Multiple choice rules

- Exactly **4 choices** labelled `A`, `B`, `C`, `D` (warning if different count)
- `answer` must be exactly one of: `"A"`, `"B"`, `"C"`, `"D"`
- All four choices must be plausible — use common misconceptions as distractors
- Choice `text` is MathText-rendered: apply the same LaTeX/currency rules as prompt text
- `accepted_answers` should be `[]` for MCQ
- Use `question_type: "conceptual"` for MCQ

---

## Typed answer rules

- `answer` is the canonical form the marking engine compares against
- Strip units, degree symbols, and dollar signs from the canonical form
- Use `accepted_answers` for alternate forms
- Use `question_type: "procedural"` for typed answers

### Canonical answer examples

| Situation | `answer` | `accepted_answers` |
|---|---|---|
| Whole number | `"120"` | `["$120", "120.00", "$120.00"]` |
| Fraction | `"1/2"` | `["0.5", "13/26"]` |
| Negative integer | `"-3"` | `["-3", "−3"]` |
| Angle | `"53"` | `["53°", "53 degrees"]` |
| Algebraic term | `"15a"` | `[]` |
| Text (congruence test) | `"SSS"` | `[]` |
| Named point | `"minimum at (3, -4)"` | `["min at (3, -4)", "(3, -4) minimum"]` |
| Axis name | `"x-axis"` | `["X-axis", "the x-axis"]` |

---

## Accepted answer variants

Add variants when reasonable alternate forms exist that the marking engine will not automatically handle:

- Unicode minus `−` vs ASCII minus `-` → add both
- Comma-formatted numbers `1,200` vs `1200` → add both
- `$120` vs `120` in a financial context → add both
- `d=3` vs `3` for "find the common difference" → add labelled variants

**Do not** add variants for:
- Different rounding — pick the correct answer and accept only that precision
- Alternate solution paths that yield a different number

---

## Numeric tolerance (contradiction lint)

The validator checks that the number in `answer` is consistent with the final number in `explanation`.

Tolerance: `max(0.01, 0.2% of answer value)`

| Answer | Tolerance | Explanation must contain |
|---|---|---|
| `"5"` | ±0.01 | A number within [4.99, 5.01] |
| `"120"` | ±0.24 | A number within [119.76, 120.24] |
| `"1000"` | ±2.00 | A number within [998, 1002] |

This is a lint check — it catches copy-paste errors where the answer and explanation diverged. It does not affect student answer matching.

---

## LaTeX and MathText formatting

All `prompt`, `hint`, `explanation`, and choice `text` fields are rendered by `app/components/MathText.tsx`.

### How MathText processes text

| Input | Behaviour |
|---|---|
| `$500` ($ followed by digit) | Currency — rendered as plain text `$500` |
| `$x + 1$` | Inline math (KaTeX) |
| `\(...\)` | Inline math (KaTeX) |
| `\[...\]` | Block math (KaTeX) |
| `T_2`, `a_n`, `x^2` | Auto-wrapped as `$T_2$` etc. (1–3 char suffix only) |
| `$$...$$` | **Not supported** — use `$...$` or `\(...\)` |

### The `latex` field

Rendered as a **KaTeX BlockMath display formula**. Write the expression directly — no `$` delimiters:

```json
"latex": "T_n = a + (n-1)d"    ✓
"latex": "$T_n = a + (n-1)d$"  ✗  (dollar signs appear as literal characters)
```

### Currency amounts

Use plain `$500`. Never use `\$500` or `\\$500`.

| Write | Renders as | Validator |
|---|---|---|
| `$500` | $500 (currency) | ✓ |
| `\$500` | \$500 (stray backslash) | ERROR |
| `\\$500` | Same bug in JSON | ERROR |

### LaTeX spans starting with a digit

`$` followed by a digit is treated as currency, not math. This breaks `$1000 \times r$`.

**Fix: use `\( ... \)` or prefix with `=` or a letter:**

| Wrong | Why it breaks | Fix |
|---|---|---|
| `$1000 \times r$` | `$1000` = currency; `\times r$` = plain text | `\(1000 \times r\)` |
| `$500 \div n$` | `$500` = currency | `\(500 \div n\)` or `$= 500 \div n$` |

### Unclosed LaTeX spans

Every `$` that opens math must have a closing `$`. An odd count produces a validator warning.

```
"Simplify $x + 3 and write the result."    ✗ unclosed
"Simplify $x + 3$ and write the result."   ✓
```

### Auto-wrapped notation

MathText auto-wraps these patterns without explicit delimiters:

| Plain text | Rendered as |
|---|---|
| `T_2`, `a_n`, `x_1` | Subscript notation |
| `x^2`, `r^3`, `e^x` | Superscript notation |
| `T_5=486` | With trailing value |

**Limit:** suffix must be 1–3 alphanumeric characters. For longer expressions, use explicit `$...$`:

```
T_n      → auto-wrapped ✓
T_{10}   → needs explicit: $T_{10}$
T_{n-1}  → needs explicit: $T_{n-1}$
```

### Complex expressions — always use explicit LaTeX

Always wrap with `$...$` or `\(...\)`:

```
$T_n = ar^{n-1}$
$\frac{a(1-r^n)}{1-r}$
$\sum_{k=1}^{n} k$
```

---

## Source ID conventions

Human-readable, stable, unique across the codebase. Never a UUID.

Pattern: `{year-abbrev}-{topic-abbrev}-{subtopic-abbrev}-{section}{position}`

| ID | Meaning |
|---|---|
| `y8-lin-gra-g1` | Year 8, linear relationships, graphing, guided Q1 |
| `y9-fin-si-i3` | Year 9, financial maths, simple interest, independent Q3 |
| `y11-seq-arith-m7` | Year 11, sequences, arithmetic, mastery Q7 |
| `y10-trig-rat-mc2` | Year 10, trig, ratios, MCQ 2 |

---

## Known course slugs

```
year-8-mathematics    year-9-mathematics    year-10-mathematics
year-11-standard      year-11-advanced      year-11-extension
year-12-advanced      year-12-standard-2    year-12-extension-1
```

Unknown slugs produce a validator warning (not error).

`year_level` format: `"year-9"` (lowercase, hyphenated). Other formats produce a warning.

---

## What is not allowed

| Prohibited | Why |
|---|---|
| Placeholder text (TODO, lorem ipsum, TBD, "sample question", "insert question here") | Validator ERROR |
| Generic explanation: "Review the worked method and compare each step…" | Validator ERROR (exact string match) |
| Draft language: "Wait", "Hmm", "recalculate", "on second thought", "actually that", "let me check" | Validator ERROR |
| `question_type: "application"` or any value other than `"conceptual"` / `"procedural"` | Validator ERROR |
| Multi-part prompt with single `answer` field | Validator ERROR |
| `answer` contradicts final number in `explanation` (beyond tolerance) | Validator ERROR |
| Prompt says "does not equal" but explanation says "equals" | Validator ERROR |
| Mojibake characters (Â, â€, Ï€, Ë, áµ) | Validator ERROR |
| `\$500` or `\\$500` | Validator ERROR |
| UUID as `source_id` | Validator WARNING |
| Duplicate `source_id` in same batch | Validator ERROR |
| MCQ with fewer than 2 choices | Validator ERROR |
| MCQ `answer` label not present in `choices` | Validator ERROR |
| `explanation` shorter than 40 characters | Validator WARNING |
| `question_type: "procedural"` with non-null `choices` | Validator WARNING |
| `question_type: "conceptual"` with null `choices` | Validator WARNING |
| `$$...$$` in any text field | Renders incorrectly (not caught by validator) |

---

## Valid examples

### Typed answer — JSON batch

```json
{
  "source_id": "y9-fin-si-g1",
  "topic_slug": "financial-mathematics",
  "subtopic_slug": "simple-interest",
  "year_level": "year-9",
  "course_slug": "year-9-mathematics",
  "difficulty": 2,
  "question_type": "procedural",
  "prompt": "Calculate the simple interest on $800 at $5\\%$ p.a. for 3 years.",
  "latex": "I = \\frac{PRT}{100}",
  "choices": null,
  "answer": "120",
  "accepted_answers": ["$120", "120.00", "$120.00"],
  "hint": "Substitute P = 800, R = 5, T = 3 into the formula.",
  "explanation": "$I = \\frac{800 \\times 5 \\times 3}{100} = \\frac{12000}{100} = 120$. The simple interest is $120.",
  "syllabus_ref": null,
  "transfer_from_topics": ["percentages"],
  "is_active": true,
  "diagram_data": null
}
```

### MCQ — JSON batch

```json
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
    { "label": "A", "text": "$1000 \\times 0.05 \\times 2$" },
    { "label": "B", "text": "$1000 \\times (1.05)^2$" },
    { "label": "C", "text": "$1000 + 0.05 \\times 2$" },
    { "label": "D", "text": "$1000 \\times 1.1$" }
  ],
  "answer": "B",
  "accepted_answers": [],
  "hint": "Use the compound interest formula A = P(1 + r)^n.",
  "explanation": "$A = 1000(1.05)^2 = 1000 \\times 1.1025 = 1102.50$. Only option B uses the correct compound formula.",
  "syllabus_ref": null,
  "transfer_from_topics": ["financial-mathematics/simple-interest"],
  "is_active": true,
  "diagram_data": null
}
```

### Typed answer — lesson TypeScript

```typescript
answer(
  "y8-lin-tab-m6",
  "Rule: y = 2x + 1. For which x is y = 15?",
  "2x + 1 = 15",
  "7",
  "Subtract 1 from both sides: 2x = 14. Divide by 2: x = 7.",
)
```

### MCQ — lesson TypeScript

```typescript
choice(
  "y8-geo-par-i3",
  "Co-interior angles between parallel lines are always…",
  "B",
  [
    "Equal in size",
    "Supplementary — they sum to 180°",
    "Complementary — they sum to 90°",
    "Vertically opposite",
  ],
  "Co-interior angles (C-shape) sum to 180° when lines are parallel."
)
```

---

## Invalid examples

```json
"question_type": "application"
```
❌ ERROR — only `"conceptual"` or `"procedural"` are valid.

---

```json
"explanation": "Review the worked method and compare each step with the expected answer."
```
❌ ERROR — exact generic seed fallback. Write the actual worked solution.

---

```json
"prompt": "Find x and then find y.",
"answer": "3"
```
❌ ERROR — multi-part prompt with single answer field. Split or ask for one value only.

---

```json
"prompt": "Simplify $x + 3 and write in standard form."
```
⚠ WARNING — unclosed LaTeX span. Fix: `$x + 3$`.

---

```json
"prompt": "The investment of \\$500 grows at 5% per year."
```
❌ ERROR — stray backslash. Fix: `$500` (no backslash).

---

```json
"explanation": "Wait, I need to recalculate. The answer is x = 7."
```
❌ ERROR — draft language. Remove "Wait" and rewrite as a clean worked solution.

---

```json
"choices": [
  { "label": "A", "text": "…" },
  { "label": "B", "text": "…" }
],
"answer": "C"
```
❌ ERROR — `"C"` is not a valid label in this choices array.

---

```json
"source_id": "a4b2c3d4-e5f6-7890-abcd-ef1234567890"
```
⚠ WARNING — UUID. Use `y9-fin-si-g1` style instead.

---

## Validation commands

```bash
# Validate a JSON batch
npx tsx scripts/validate-question-batch.ts path/to/batch.json

# Strict mode — warnings also fail
npx tsx scripts/validate-question-batch.ts path/to/batch.json --strict

# Print a valid example batch
npx tsx scripts/validate-question-batch.ts --example

# TypeScript check after editing lesson files
npx tsc --noEmit

# Full lesson audit (structure, placeholders)
npm run audit:lessons

# Full build check
npm run build

# Whitespace check
git diff --check
```

Exit codes for `validate-question-batch.ts`:
- `0` — all records pass (warnings in standard mode do not fail)
- `1` — one or more errors; or any warnings in `--strict` mode

**Import requires zero issues (errors or warnings) when using `--write`.** Fix everything before attempting a write.
