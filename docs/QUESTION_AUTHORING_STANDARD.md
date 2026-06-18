# Question Authoring Standard

Single source of truth for all question authoring on Nova Maths — lesson TypeScript and external JSON batches.

See also: [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) · [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md) · [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md) · [QUESTION-BATCH-IMPORT.md](./QUESTION-BATCH-IMPORT.md)

---

## Pre-flight checklist

- [ ] Every question has a real, specific prompt — no TODO, lorem ipsum, TBD, or "sample question"
- [ ] Every answer is correct and matches the explanation numerically
- [ ] Every explanation is step-by-step, ≥ 40 characters, specific to this question
- [ ] Multi-part prompts use `parts` / `question_parts`; do not hide (a), (b), (c) inside one unstructured answer
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
  choices?: Choice[];         // MCQ only — a Choice may also carry a diagram (see Visual payloads)
  parts?: PracticeQuestionPart[];               // HSC Section II-style parts only
  // …plus any visual payload field (cartesianGraph, numberLineDiagram, …) — see Visual payloads
};
```

> Any of the visual payload fields documented under [Visual payloads](#visual-payloads) may be set on a `PracticeQuestion` (and on a `WorkedExample`). They are carried through the whole pipeline — lesson display, worksheets, admin preview, and seed-to-database — automatically.

> Lesson TypeScript questions do not carry `question_type`, `difficulty`, or `course_slug`. Those are inferred by `seed-question-bank.ts`.

### Multi-part question design

**You MUST use multi-part questions whenever a question has a shared stem with 2–4 dependent parts.** Do not bury multi-part structure inside a single unstructured `answer` field. Multi-part infrastructure is production-ready and supports marks-weighted partial credit — use it.

Multi-part questions live in the optional `multiPartPractice` array on a lesson — separate from the standard 4+5+10 sections. They are seeded at **D5** (exam-style) and not counted against the standard lesson-section counts. See also [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) for placement rules.

#### Taxonomy

Choose a type before authoring. Each type measures different skills.

| Type | What it measures | Parts | MVP-safe? |
|---|---|---|---|
| **Fluency chain** | Procedural steps sharing one stem | 2–3 | Yes |
| **Concept-to-procedure** | Identify rule → apply it | 3 | (a)(b) yes; (c) "explain why" = free-text |
| **Interpret-and-check** | Compute → interpret in context → verify | 3 | Yes if verify = number |
| **Modelling/application** | Set up → solve → interpret result | 3 | Yes if result is numeric |
| **Error analysis** | Spot wrong step → correct → get final answer | 3 | Yes if correction = number |
| **Compare methods** | Method A → Method B → choose | 3 | (a)(b) yes; choice = free-text |
| **Parameter/condition** | Compute → find constraint → interpret condition | 3 | Yes if constraint is a value |
| **Graph/table reading** | Read from diagram → compute → interpret | 2–3 | Needs diagram-response infra |
| **HSC Section II style** | Multi-skill layered exam item | 3–4 | (a)(b) usually yes; deeper parts risky |

The pilot questions (`tan-norm-mp-*`) are fluency chains. They are correct but should not be the dominant type.

#### Cognitive ladder

The recommended part structure for all types except fluency chain:

| Part | Cognitive demand | Typical answer | MVP-safe |
|---|---|---|---|
| **(a)** | Local procedural fact — compute one quantity from the stem | Number, coordinate | Yes |
| **(b)** | Connected calculation — apply or extend (a) | Number, named outcome | Yes |
| **(c)** | Interpret, check, model, or classify — a new cognitive mode | Classification, condition, parameter | Yes if specific; no if "explain why" |

**Critical rule: part (c) must not merely be more arithmetic of the same type as parts (a) and (b).** If all three parts are the same cognitive demand, the question is a fluency chain — label it as such and consider whether it belongs in `masteryQuiz` instead.

#### Authoring rules

1. **No free-text parts (MVP constraint).** Do not ask "Explain why…", "Justify…", "Show that…", "Describe…", "Comment on…" until free-text/AI marking exists. These produce silent incorrect marking.

2. **No equation-as-answer unless one canonical form is unambiguous.** `y = 2x + 1`, `y − 1 = 2(x − 0)`, and `2x − y + 1 = 0` are the same line but will not match. Ask for a specific coefficient, y-intercept, or gradient value instead.

3. **Prefer specific numeric outputs.** Gradient, y-intercept, coordinate, parameter value, domain boundary — these collapse to one unambiguous answer.

4. **Mark allocation:** Total 4–6 marks per question. Part (a): 1–2 marks. Part (b): 1–2 marks. Part (c): 2–3 marks.

5. **Part-specific hints.** Each part's `hint` must help only with that part. A hint on part (a) must not reveal the setup or answer for part (c). Hints that span parts spoil the cognitive sequence.

6. **Part-specific explanations.** Each part's `explanation` covers only that part's working. The top-level `hint` and `explanation` are the combined post-submission summary across all parts.

7. **Top-level `answer` = part (a)'s answer.** The seed stores this for backward compatibility. The per-part answers drive marking.

8. **`acceptedAnswers` is required for formatting-sensitive types:**

| Answer type | Canonical | Must add to `acceptedAnswers` |
|---|---|---|
| Coordinate | `"(2,-4)"` | `"(2, -4)"`, `"2,-4"`, `"2, -4"` |
| Fraction | `"1/3"` | `"0.333"`, `"0.3333"` |
| Named classification | `"maximum"` | `"local max"`, `"max"`, `"local maximum"` |
| Inequality | `"x>2"` | `"x > 2"` |
| Unicode minus | `"-6"` | `"−6"` |

#### MVP-safe and unsafe answer types

| Answer type | Example | Safe? | Notes |
|---|---|---|---|
| Integer | `"10"` | Yes | |
| Negative number | `"-6"` | Yes | Add Unicode minus to `acceptedAnswers` |
| Fraction | `"1/3"` | Yes | Add decimal to `acceptedAnswers` |
| Coordinate | `"(2,-4)"` | Yes | Add space variants |
| Classification | `"maximum"` | Yes | Add common variants |
| Inequality | `"x>2"` | Yes | Add spaced form; test direction |
| Simple expression | `"3x^2-6x"` | **Risky** | Add all formatting variants; prefer asking for a numeric value |
| Full equation | `"y=2x+1"` | **No** | Too many equivalent forms — ask for a component value |
| "Explain why…" | Free text | **No** | Requires future free-text marking |
| "Justify…" | Free text | **No** | Same |
| Graph sketch | Drawing | **No** | Requires diagram-response infrastructure |

#### Three blueprints

**Blueprint 1 — Year 9/10 Core: Modelling/application**

> Stem: A water tank holds 400 L and drains at 25 L/min.

- **(a)** [1 mark] How many litres remain after 6 minutes? → `"250"`
- **(b)** [2 marks] Find the time (in minutes) when the tank is empty. → `"16"`
- **(c)** [1 mark] The drain rate doubles. Find the new time to empty. → `"8"`

Part (c) changes a parameter — it is not just more arithmetic on the same setup. Fully MVP-safe.

---

**Blueprint 2 — Year 12 Advanced: Interpret-and-check (second derivative classification)**

> Stem: A function has $f'(x) = 3x^2 - 12x + 9$.

- **(a)** [2 marks] Find the x-values where $f'(x) = 0$. → `"1"` and `"3"` (two separate sub-parts, or `"1, 3"`)
- **(b)** [1 mark] Find $f''(1)$. → `"-6"`
- **(c)** [1 mark] State whether $x = 1$ is a local maximum or minimum. → `"maximum"`

Part (c) is a classification from sign, not another differentiation. Fully MVP-safe.

---

**Blueprint 3 — Year 12 Extension 1/2: Parameter/condition reasoning**

> Stem: The curve $y = x^3 + ax^2 + b$ passes through $(0, 5)$ and has a stationary point at $x = 2$.

- **(a)** [1 mark] Find $b$. → `"5"`
- **(b)** [2 marks] Find $a$. → `"-3"`
- **(c)** [1 mark] Find the y-coordinate of the stationary point. → `"1"`

Each part uses a different algebraic condition. Fully MVP-safe.

---

#### Marks-weighted scoring

Multi-part worksheet questions are scored by part marks. Each part contributes its `marks` value when auto-marked correct, and contributes 0 when incorrect. The question state is:

- `correct` when earned marks equal available marks
- `partial` when earned marks are greater than 0 but less than available marks
- `incorrect` when earned marks are 0

Part results are stored with the student answer, correct answer, explanation, and marks earned/available. AI/free-text marking is still not supported, so every part must have an exact, numeric, coordinate, or simple algebraic answer.

#### Future audit checks (recommended, not yet implemented)

When `audit:lessons` is extended to validate `multiPartPractice`:

- Fail if part `key` values are not unique within a question
- Fail if any part `answer` is empty
- Fail if any part `prompt` contains "explain", "justify", "show that", "prove", or "describe"
- Warn if part `explanation` is shorter than 40 characters
- Warn if any part has no `hint`
- Warn if top-level `answer` does not match part (a)'s `answer`

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
  choices?:             { label: string; text: string }[] | null;  // each choice may also carry diagram fields
  question_parts?:      QuestionPart[] | null;
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

### Multi-part questions

Use multi-part questions for HSC Section II-style items where parts (a), (b), (c) share a stem but must be answered and marked separately. Do not use them as a replacement for guided `steps`: `steps` are a scaffolded teaching flow; `parts` are assessable question parts.

Each part must be auto-markable with exact, numeric, coordinate, or simple algebraic accepted answers. AI/free-text proof marking is not supported yet.

```typescript
type PracticeQuestionPart = {
  key: "a" | "b" | "c";
  label: "(a)";
  prompt: string;
  latex?: string;
  marks: number;
  answer: string;
  acceptedAnswers?: string[];
  hint?: string;
  explanation: string;
  working?: string[];   // Optional: KaTeX lines shown as a worked solution panel
};
```

External JSON uses the same shape in `question_parts`. `accepted_answers` is also accepted inside a part for batch compatibility. Keep the top-level `answer` and `explanation` as a short summary/fallback, but student marking uses the per-part answers when `question_parts` exists.

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
| Time (minutes) | `"5"` | `[]` |
| Algebraic term | `"15a"` | `[]` |
| Text (congruence test) | `"SSS"` | `[]` |
| Named point | `"minimum at (3, -4)"` | `["min at (3, -4)", "(3, -4) minimum"]` |
| Axis name | `"x-axis"` | `["X-axis", "the x-axis"]` |

---

## Unit handling (automatic)

The marking engine automatically strips the following unit suffixes before comparing. The canonical `answer` should be unitless.

### Angle
`degree`, `degrees`, `deg`, `°`

### Length
`mm`, `cm`, `km`, `m` and their full word forms:
`millimetre(s)`, `millimeter(s)`, `centimetre(s)`, `centimeter(s)`, `kilometre(s)`, `kilometer(s)`, `metre(s)`, `meter(s)`

### Mass and volume
`g`, `kg`, `ml`, `l` and their full word forms:
`gram(s)`, `kilogram(s)`, `millilitre(s)`, `milliliter(s)`, `litre(s)`, `liter(s)`

### Time
`min`, `mins`, `minute`, `minutes`, `sec`, `secs`, `second`, `seconds`, `hr`, `hrs`, `hour`, `hours`

### Currency
Leading `$` and trailing `dollar`, `dollars`, `AUD`

### Spacing
Spacing between number and unit is ignored: `5 min`, `5min`, `5 minutes` all match canonical `"5"`.

### Squared/cubic units
A `^2`, `²`, `^(2)`, `2`, `^3`, `³`, `^(3)`, `3` suffix after the unit is also stripped.
The word prefixes `square` and `cubic` before a unit name are also stripped.

All of these match canonical `"12"`:

| Student types | Matches `"12"` |
|---|---|
| `12 cm^2` | ✓ |
| `12 cm²` | ✓ |
| `12 cm^(2)` | ✓ |
| `12cm2` | ✓ |
| `12 square centimetres` | ✓ |
| `12 square centimeters` | ✓ |
| `12 square metres` | ✓ |
| `12 m^3` | ✓ |
| `12 m^(3)` | ✓ |
| `12 cubic metres` | ✓ |
| `12 cubic centimetres` | ✓ |

### Clock time (automatic with meridiem)

When at least one side (user answer or canonical/accepted answer) contains an explicit `am` or `pm` marker, the engine converts both sides to minutes-since-midnight and compares.

| Student types | Canonical | Result |
|---|---|---|
| `2:30 pm` | `14:30` | ✓ |
| `14:30` | `2:30 pm` | ✓ |
| `9:05 am` | `9:05` | ✓ |
| `12:15 am` | `00:15` | ✓ |
| `12:00 pm` | `12:00` | ✓ |
| `2:30` | `14:30` | ✗ (no meridiem — ambiguous) |

**Duration vs clock time**: Unit stripping handles duration answers (`"43 min"` → `"43"`). Clock time matching handles point-in-time answers (`"14:30"` = `"2:30 pm"`). These do not conflict because clock time matching only activates when `am`/`pm` is present.

**When to add acceptedAnswers for time**: Add the 24h form as an `acceptedAnswer` when the canonical answer is `am`/`pm` format (or vice versa), so students who skip the meridiem marker are not penalised for ambiguous short forms like `"9:05"`.

### What is NOT automatic

- **Cross-unit conversion**: `100 cm` does not match `1 m`. Conversion logic does not exist — do not rely on it.
- **Compound units**: `km/h`, `m/s` are not stripped. Write unit-free canonical answers for speed/rate questions.
- **Repeating decimals**: `0.333` does not match `1/3`. Add `"0.33"` or `"0.333"` to `accepted_answers` if a specific precision is expected.

---

## Algebraic answer equivalence

### What is automatic

| Student types | Canonical | Matches? |
|---|---|---|
| `x^(2)` | `x^2` | ✓ parenthesised exponents are stripped |
| `x²` | `x^2` | ✓ Unicode superscript normalised |
| `x^2` | `x^(2)` | ✓ |
| `-18x^(2)` | `-18x^2` | ✓ |

The engine normalises `^(N)` → `^N` for any integer exponent before comparing. Write canonical answers **without** parentheses (`x^2`, not `x^(2)`).

### What is NOT automatic — use `accepted_answers` instead

The engine does **not** perform symbolic algebra. These forms require explicit `accepted_answers` entries:

| Forms that look equivalent | Why NOT auto-matched | How to handle |
|---|---|---|
| `x/2` and `0.5x` and `(1/2)x` | Requires polynomial CAS | Add all forms to `accepted_answers` |
| `x^2 + 6x + 5` and `(x+1)(x+5)` | Requires factoring | Pick one canonical form |
| `2x + 2` and `2(x+1)` | Requires expansion | Pick expanded form as canonical |
| `sqrt(x)` and `x^(1/2)` | Different notation | Pick one; add other to `accepted_answers` |

### Convention for algebraic canonical answers

- Use `x^2` not `x^(2)`, `x²`
- Use `x^3` not `x^(3)`, `x³`
- Use the **expanded** polynomial form as canonical, e.g. `x^2+6x+5`
- Add spaced forms as accepted variants: `["x^2 + 6x + 5"]`
- For coefficient fractions (`x/2`, `1/2 x`), add all common student forms to `accepted_answers`

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

### The display `latex` field

Rendered as a **KaTeX BlockMath display formula**. Write the expression directly — no `$` delimiters:

```json
"latex": "T_n = a + (n-1)d"    ✓
"latex": "$T_n = a + (n-1)d$"  ✗  (dollar signs appear as literal characters)
```

This rule is about the separate display `latex` field/block only. It does **not** discourage inline LaTeX inside `prompt`, `hint`, `explanation`, or choice text; inline LaTeX is encouraged when it makes mathematical text clearer.

Use the display `latex` field only when the displayed expression is necessary stimulus. If the prompt is already clear, leave it blank/neutral rather than adding a decorative formula block. For typed-answer questions, never put the calculation setup, substitution, operation, or first working step in the display `latex` field; that belongs in `explanation` after submission. If the student is meant to choose a setup, make it an MCQ and put the candidate setups in the choices.

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
year-12-advanced      year-12-standard-2    year-12-standard-1
year-12-extension-1   year-12-extension-2
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
| Multi-part prompt with single unstructured `answer` field | Validator ERROR; use `parts` / `question_parts` |
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
| Prompt states the numeric answer verbatim (e.g. "There are 120 students. How many are there?") | Validator WARNING (`prompt-reveals-answer`) |
| `latex` field contains a multi-step evaluation chain (`= X = Y`) or step arrows (`\Rightarrow`) | Validator WARNING (`latex-working-steps`); move worked steps to `explanation` |

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

## Visual payloads

**You MUST attach a visual payload whenever a question (or worked example) involves a diagram, graph, plot, table, number line, geometric figure, or solid.** Never describe a visual in words, fake it in LaTeX, or spell a plot out as text when a renderer exists for it. Keep the prompt self-contained and let the payload carry the visual stimulus.

There are **28 renderers**, dispatched through one registry. The authoritative schema for every payload field is **`lib/lessons/types.ts`**; the registry is **`lib/lessons/diagramRegistry.ts`** (payload types) + **`app/components/diagramRegistry.tsx`** (renderers). Any of these fields may be set on a `PracticeQuestion`, a `WorkedExample`, or an MCQ `Choice`.

### Available renderers

**Coordinate graphs & functions**

| Payload field | Use for |
|---|---|
| `cartesianGraph` | Coordinate graphs — lines, parabolas, circles, sinusoids, and (via `curves`) exponential, logarithmic, reciprocal/hyperbola, absolute-value, square-root and cubic functions |
| `numberLineDiagram` | Integers, inequalities, absolute value, intervals — points (open/closed) and shaded rays |
| `stepGraphDiagram` | Step / piecewise-constant graphs — tariffs, postage, tax brackets |
| `polynomialCurveDiagram` | Polynomial sketching — roots with multiplicity, end behaviour |
| `unitCircleDiagram` | Unit circle — terminal points, reference angles, quadrant signs |
| `trigGraphDiagram` | sin / cos / tan graphs — symbolic radian ticks, asymptotes, period markers |
| `slopeFieldDiagram` | Slope fields for differential equations (Ext 2) |
| `trapezoidalRuleDiagram` | Trapezoidal strips under a curve |

**Statistics & probability**

| Payload field | Use for |
|---|---|
| `dotPlotDiagram` | Dot plots over a number line |
| `stemAndLeafDiagram` | Stem-and-leaf plots (including back-to-back) |
| `barChartDiagram` | Column / bar graphs for categorical data (vertical or horizontal) |
| `histogramDiagram` | Grouped continuous data; optional frequency polygon / cumulative ogive |
| `scatterPlotDiagram` | Bivariate scatter + line of best fit + correlation |
| `boxPlotDiagram` | Box-and-whisker plots, five-number summary |
| `normalDistributionDiagram` | Normal curves, shaded regions, z-scores |
| `pieChartDiagram` | Categorical proportions as a pie |
| `probabilityTreeDiagram` | Multi-stage probability trees |
| `twoWayTableDiagram` | Two-way frequency / probability tables |
| `vennDiagram` | Two- or three-set Venn diagrams |

**Geometry & measurement**

| Payload field | Use for |
|---|---|
| `triangleDiagram` | Labelled triangles — sides, angles, right-angle marks |
| `planeShapeDiagram` | Any polygon / quadrilateral / composite shape — side & angle labels, right-angle marks, equal-length ticks, parallel chevrons |
| `sectorDiagram` | Circle sector — arc length, sector area, radians |
| `solid3DDiagram` | 3D solids (prism, cube, cylinder, cone, pyramid, sphere) for volume / surface area |
| `netDiagram` | 2D nets of solids for surface area |
| `bearingsDiagram` | Compass bearings — true bearings, multiple rays from an origin |

**Other**

| Payload field | Use for |
|---|---|
| `diagram` (`networkDiagram`) | Graphs, networks, critical paths |
| `argandDiagram` | Complex-number plots, modulus circles, loci (Ext 2) |
| `vector3DDiagram` | 3D vectors, points, direction lines (Ext 2) |

### Use the right renderer — never fake a visual

If a question refers to a visual, it must ship the matching payload. The lesson auditor flags **"visual required, no payload"** — do not satisfy it by rewording the prompt. In particular:

| Content | Use | Do NOT |
|---|---|---|
| Inequality / interval on a line | `numberLineDiagram` | LaTeX arrows/circles like `\circ\!\!\longrightarrow` |
| Dot plot | `dotPlotDiagram` | dots typed as text |
| Stem-and-leaf | `stemAndLeafDiagram` | the plot written as inline LaTeX rows |
| Column / bar graph | `barChartDiagram` | a frequency table standing in for the graph |
| Histogram | `histogramDiagram` | a bar chart with gaps between bars |
| Scatter / line of best fit | `scatterPlotDiagram` | a list of coordinate pairs |
| exp / log / hyperbola / abs / √ / cubic graph | `cartesianGraph` `curves` | omitting the graph because "Cartesian only does lines" |
| Polygon / composite area figure | `planeShapeDiagram` | a stretched `triangleDiagram`, or no figure |
| Arc length / sector area | `sectorDiagram` | a full circle with the wedge only described |
| Prism / cylinder / cone / pyramid / sphere | `solid3DDiagram` | a single 2D face standing in for the solid |
| Net for surface area | `netDiagram` | listing face dimensions in prose |
| Bearings | `bearingsDiagram` | a triangle approximating the compass |

If genuinely no renderer fits, add one via the registry **before** authoring: define the type in `lib/lessons/types.ts`, register it in `lib/lessons/diagramRegistry.ts` (`DIAGRAM_SPECS` + `DiagramFields`) and `app/components/diagramRegistry.tsx` (`DIAGRAM_COMPONENTS`), and create the `*View` component. The `Record<DiagramType, …>` typing makes a missing renderer a compile error, and every surface (lessons, worksheets, admin preview, seed, audit) picks it up automatically — no other wiring.

### Diagrams as MCQ answers

An MCQ `Choice` is `{ label, text } & DiagramFields`, so any option can carry its own diagram (rendered beneath the text). Use this for "Which graph/diagram matches …?" items: give A–D the same payload type with different values, and keep `text` short or empty.

```typescript
choices: [
  { label: "A", text: "", cartesianGraph: { description: "Parabola opening up, vertex (0,0).", parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }] } },
  { label: "B", text: "", cartesianGraph: { description: "Parabola opening down, vertex (0,0).", parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 0 }] } },
  // C, D …
]
```

### Labels are typeset automatically

Renderer text labels run through `mathLabel`, so write `x^2`, `pi`, `theta`, `<=`, `>=`, `sqrt`, `+-` and they render as x², π, θ, ≤, ≥, √, ±. Do not pre-convert to Unicode.

### The `description` field

Every visual payload type has a required `description: string` field. **Write it as an accessibility label** — specific enough that a student who cannot see the diagram understands what it shows. Treat it like alt-text for an image.

| Too vague | Specific |
|---|---|
| `"Diagram."` | `"Right triangle with sides 3, 4, and hypotenuse 5. The right angle is at vertex B."` |
| `"Graph."` | `"Cartesian graph showing y = 2x + 1 crossing the y-axis at (0, 1) and passing through (2, 5)."` |
| `"Slope field."` | `"Slope field for dy/dx = y. Segments are horizontal at y = 0 and tilt upward above it; two solution curves diverge from y = 0."` |

The `description` also appears in audit output and is the first thing a content author sees when reviewing a question — make it informative.

### Diagram-first design

For inherently visual topics (geometry, trig graphs, slope fields, probability trees, polynomial curves), **choose the diagram first** and design the question around what the student reads from it. Do not add a diagram as an afterthought to a question that was already self-contained in text.

Steps for diagram-first authoring:
1. Decide what the student must visually read or reason about.
2. Construct the diagram payload with the specific values needed.
3. Write the prompt so it refers to the diagram ("Using the diagram above…", "From the graph…", "The network below shows…").
4. Ensure the answer is a specific value the student reads from or computes using the diagram — not a general rule.

### Multi-part questions + visual payloads

When a multi-part question needs a visual, attach the payload to the **top-level question object** — not to individual parts. Parts refer to the shared visual using phrases like "Using the diagram above" or "From the graph in part (a)". Do not duplicate the payload on each part.

### ArgandDiagram

Use `argandDiagram` for Extension 2 complex-number questions involving plotted complex numbers, conjugates, modulus circles, geometric loci, distances, and arguments.

```typescript
argandDiagram: {
  description: "Argand diagram showing z = 2 - 3i and its conjugate.",
  realMin: -1,
  realMax: 4,
  imaginaryMin: -4,
  imaginaryMax: 4,
  points: [{ re: 2, im: -3, label: "z = 2 - 3i" }],
  vectorsFromOrigin: [{ to: { re: 2, im: -3 }, label: "z" }],
  showConjugates: true,
  modulusCircles: [{ radius: 2, label: "|z| = 2" }],
}
```

### Vector3DDiagram

Use `vector3DDiagram` for Extension 2 vectors in three dimensions: labelled points, directed vectors, and lines through a point with a direction vector. It is for schematic reasoning, not exact 3D measurement.

```typescript
vector3DDiagram: {
  description: "3D vector diagram showing point A and vector v.",
  axisLength: 4,
  points: [{ x: 1, y: 2, z: 3, label: "A" }],
  vectors: [{ to: { x: 1, y: 2, z: 3 }, label: "OA" }],
  lines: [
    {
      point: { x: 1, y: 0, z: 2 },
      direction: { x: 2, y: 1, z: -1 },
      label: "r = a + tv",
    },
  ],
}
```

### UnitCircleDiagram

Use `unitCircleDiagram` for exact trigonometric values, quadrant signs, reference angles, terminal points, and symmetry on the unit circle.

```typescript
unitCircleDiagram: {
  description: "Unit circle showing angle 2pi/3 in quadrant II.",
  angleRadians: "2pi/3",
  angleDegrees: "120",
  terminalPoint: { x: "-1/2", y: "sqrt{3}/2", label: "(-1/2, sqrt(3)/2)" },
  quadrant: 2,
  referenceAngle: "pi/3",
  showReferenceTriangle: true,
  highlightRadius: true,
  symmetryPoints: [
    { x: "1/2", y: "sqrt{3}/2", label: "Q1 related point" },
  ],
  notes: ["Cosine is negative and sine is positive in quadrant II."],
}
```

### TrigGraphDiagram

Use `trigGraphDiagram` for sine, cosine, and tangent graph features when symbolic radian labels, key points, period markers, or tangent asymptotes matter.

```typescript
trigGraphDiagram: {
  description: "Graph of y = tan x from -pi to pi with asymptotes.",
  functionType: "tan",
  equationLabel: "y = tan x",
  xMin: "-pi",
  xMax: "pi",
  yMin: -4,
  yMax: 4,
  keyPoints: [{ x: "0", y: "0", label: "(0, 0)" }],
  asymptotes: [
    { x: "-pi/2", label: "x = -pi/2" },
    { x: "pi/2", label: "x = pi/2" },
  ],
  periodMarkers: [
    { x: "0", label: "centre" },
    { x: "pi", label: "period pi" },
  ],
  notes: ["Tangent repeats every pi radians."],
}
```

### PolynomialCurveDiagram

Use `polynomialCurveDiagram` for polynomial curve sketching — roots with multiplicity, leading coefficient, key points, and end behaviour.

```typescript
polynomialCurveDiagram: {
  description: "Cubic y = (x+1)(x-2)^2 showing a touch at x=2.",
  roots: [
    { value: -1, multiplicity: 1 },
    { value: 2, multiplicity: 2 },
  ],
  leadingCoefficient: 1,
  xMin: -3,
  xMax: 4,
  yMin: -5,
  yMax: 10,
  keyPoints: [
    { x: -1, y: 0, label: "(-1, 0)" },
    { x: 2, y: 0, label: "(2, 0) touch" },
    { x: 0, y: 4, label: "y-int (0, 4)" },
  ],
}
```

### SlopeFieldDiagram

Use `slopeFieldDiagram` for Extension 2 differential equations: slope fields showing the gradient pattern and optional solution curves through initial conditions.

```typescript
slopeFieldDiagram: {
  description: "Slope field for dy/dx = x with solution curve through (0, 1).",
  de: { kind: "linear", a: 1, b: 0, c: 0 },
  xMin: -3,
  xMax: 3,
  yMin: -4,
  yMax: 4,
  gridStep: 0.75,
  solutionCurves: [{ x0: 0, y0: 1, label: "y = x²/2 + 1" }],
}
```

### Examples — newer renderers

Compact examples for the most-used new payloads. See `lib/lessons/types.ts` for the full field list of every type (including `dotPlotDiagram`, `barChartDiagram`, `pieChartDiagram`, `netDiagram`, `stepGraphDiagram`, which follow the same shape).

```typescript
// Inequality on a number line: -2 ≤ x < 3
numberLineDiagram: {
  description: "Number line showing -2 ≤ x < 3: closed circle at -2, open circle at 3, segment shaded between.",
  min: -5, max: 5,
  intervals: [{ from: -2, to: 3, toOpen: true }],
}

// Stem-and-leaf
stemAndLeafDiagram: {
  description: "Stem-and-leaf plot of test scores from 12 to 36.",
  keyText: "3 | 7 = 37",
  rows: [{ stem: 1, leaves: [2, 3, 5] }, { stem: 2, leaves: [1, 4, 4, 8] }, { stem: 3, leaves: [0, 6] }],
}

// Histogram with frequency polygon
histogramDiagram: {
  description: "Histogram of times (s) in 10-wide classes from 0 to 40.",
  axisLabel: "Time (s)",
  bins: [{ label: "0–10", frequency: 3 }, { label: "10–20", frequency: 8 }, { label: "20–30", frequency: 6 }, { label: "30–40", frequency: 2 }],
  showFrequencyPolygon: true,
}

// Scatter with auto line of best fit
scatterPlotDiagram: {
  description: "Scatter of hours studied vs mark with a positive trend.",
  xAxisLabel: "Hours", yAxisLabel: "Mark",
  points: [{ x: 1, y: 52 }, { x: 2, y: 60 }, { x: 3, y: 67 }, { x: 4, y: 78 }],
  lineOfBestFit: "auto",
  correlationLabel: "r = 0.99",
}

// Composite plane shape (L-shape) with side labels and a right angle
planeShapeDiagram: {
  description: "L-shaped figure with sides 6, 4, 2, 2 cm and right angles at each corner.",
  vertices: [
    { x: 0, y: 0, rightAngle: true }, { x: 6, y: 0, rightAngle: true },
    { x: 6, y: 2, rightAngle: true }, { x: 2, y: 2, rightAngle: true },
    { x: 2, y: 4, rightAngle: true }, { x: 0, y: 4, rightAngle: true },
  ],
  edges: [{ label: "6 cm" }, { label: "2 cm" }, {}, {}, {}, { label: "4 cm" }],
}

// Sector for arc length / area
sectorDiagram: {
  description: "Sector of radius 6 cm subtending 60° at the centre.",
  angleDegrees: 60, radiusLabel: "6 cm", angleLabel: "60°", arcLabel: "l",
}

// 3D solid for volume / surface area
solid3DDiagram: {
  description: "Cylinder of radius 4 cm and height 10 cm.",
  solid: "cylinder",
  labels: { radius: "4 cm", height: "10 cm" },
}

// Bearings
bearingsDiagram: {
  description: "B is on a bearing of 060° from A; C is on a bearing of 150° from A.",
  originLabel: "A",
  rays: [{ bearing: 60, label: "B", showAngle: true }, { bearing: 150, label: "C", showAngle: true }],
}
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
