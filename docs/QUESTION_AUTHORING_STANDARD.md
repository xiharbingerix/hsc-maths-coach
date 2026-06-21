# Question Authoring Standard

Single source of truth for all question authoring on Nova Maths - lesson TypeScript and external JSON batches.

See also: [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) | [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md) | [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md) | [QUESTION-BATCH-IMPORT.md](./QUESTION-BATCH-IMPORT.md)

---

# Question Quality Standard (Mandatory)

This standard overrides all formatting, schema, and validation rules.

A question that passes validation but fails this quality standard must be rejected.

The goal of Nova Maths is not merely to generate valid questions.

The goal is to generate questions that accurately measure mathematical understanding.

---

# Core Principle

Every question must create evidence of student understanding.

A student response should tell us something meaningful about what the student knows, misunderstands, can transfer, can model, or can reason about.

Questions that merely produce an answer without revealing understanding are low-quality questions and should not be authored.

---

# Characteristics of an Excellent Question

Every question should satisfy as many of the following characteristics as possible.

1. Requires genuine mathematical thinking.
2. Requires at least one decision, inference, or representation change.
3. Cannot be solved purely through answer extraction.
4. Produces diagnostic information when answered incorrectly.
5. Rewards reasoning over pattern matching.
6. Has a clear educational purpose.
7. Measures understanding rather than memory alone.
8. Uses context only when the context adds mathematical value.
9. Is concise and free of unnecessary wording.
10. Is the shortest version of itself that still measures the target skill.

---

# The Diagnostic Test

Before approving a question, ask:

"If the student gets this wrong, what misconception does that reveal?"

If the author cannot answer this question clearly, the item is likely weak.

Every question should target at least one identifiable misconception, such as:

* sign errors
* inverse-operation errors
* proportional reasoning errors
* place value confusion
* probability misconceptions
* graphical interpretation mistakes
* algebraic structure misconceptions
* unit conversion errors
* rate reasoning errors

Questions that do not discriminate between misconceptions and random guessing should be avoided.

---

# No Answer Extraction

Questions must not merely ask students to locate, copy, or directly substitute information.

Weak:

A car travels 60 km in 2 hours. What is its speed?

Better:

Two cars travel the same distance. One takes 2 hours and one takes 3 hours. Compare their average speeds.

Strong:

A driver claims reducing travel time from 3 hours to 2 hours increases speed by 50%. Determine whether the claim is correct.

Every question must require at least one mathematical transformation, inference, comparison, decision, or interpretation.

---

# Difficulty Definitions

Difficulty is determined by cognitive demand, not notation, wording, or exam appearance.

A question is difficult because of the thinking required, not because it looks difficult.

The scale is **absolute**: a level reflects the intrinsic cognitive demand of the
task, independent of year level, course, or who is answering — the same problem
is the same difficulty in Year 9 or Year 12. Calibrate against the definitions
below, never against the cohort.

## D1

Direct recall or single-step procedure.

Student knows exactly what method to use.

## D2

Routine application.

Student applies a familiar procedure with minor variation.

## D3

Multi-step reasoning.

Student must connect multiple ideas or perform multiple linked operations.

At least one intermediate decision is required.

## D4

Transfer and interpretation.

Student must:

* choose a method independently
* connect multiple concepts
* reject at least one plausible incorrect path
* interpret results

Formula substitution alone can never qualify as D4.

## D5

Novel reasoning and synthesis.

Student must perform one or more of:

* constraint reasoning
* modelling
* abstraction
* generalisation
* optimisation
* proof-like reasoning
* transfer between domains

Exam wording alone never qualifies a question as D5.

## D6

Exam-mastery synthesis — the absolute ceiling. The hardest exam-level items: the
final, highest-band-discriminating questions of an HSC paper.

A D6 question must satisfy **all** of:

* **Synoptic** — it combines at least two distinct concepts or subtopics in one
  problem (not one idea applied repeatedly).
* **Sustained** — it requires a multi-stage solution of three or more linked
  stages, where each stage depends on the result of the previous one.
* **Non-routine** — at least one stage needs a strategic decision or insight the
  wording does not cue; the student must see the path, not just follow it.
* **Ceiling-level** — it is genuinely harder in cognitive demand than any D5, at
  the level that separates the top band.

A D6 question must **not**:

* Be a D5 dressed up with bigger numbers, more notation, or exam tone — none of
  these raise difficulty.
* Rest on a single clever idea, however hard (that is D5).
* Depend on free-text proof or justification for marking (MVP constraint): carry
  the multi-stage reasoning through auto-markable numeric/exact answers,
  typically as multi-part (Section II–style) questions whose later parts build on
  earlier results.

**D5 vs D6 in one line:** D5 demands one novel idea; D6 demands several connected
ideas sustained across a multi-stage solution.

---

# Productive Struggle Requirement

D3-D6 questions must contain at least one meaningful decision point.

Examples:

* selecting a representation
* choosing a strategy
* identifying relevant information
* comparing competing approaches
* determining assumptions

Students should not immediately recognise a single obvious algorithm.

If the solution path is fully determined by the wording, the item is likely too procedural.

---

# Authentic Modelling Standard

A word problem is not automatically a modelling task.

To qualify as modelling, the student must do at least one of:

* decide what information matters
* create a mathematical representation
* make assumptions
* interpret a mathematical result in context
* evaluate whether a result is reasonable

Changing names or wrapping arithmetic in a story does not create modelling.

---

# Multiple-Skill Assessment

Strong questions often assess more than one skill.

Examples:

* algebra + interpretation
* geometry + proportional reasoning
* statistics + critical thinking
* graph reading + modelling

Questions that assess only one isolated procedural skill should primarily appear in fluency sections.

Mastery and high-difficulty questions should typically assess multiple connected ideas.

---

# Distractor Quality Standard

For MCQs, every incorrect option must correspond to a specific student misconception.

Bad distractors:

* random numbers
* obviously impossible answers
* arbitrary arithmetic mistakes

Good distractors:

* sign error
* denominator error
* common algebra mistake
* misread graph feature
* incorrect proportional reasoning

If a distractor cannot be linked to a known misconception, it should be replaced.

---

# Pool Diversity Requirements

A question pool should not repeatedly assess the same skill.

Across a mastery pool, assessment should include:

* procedural fluency
* conceptual understanding
* interpretation
* modelling/application
* transfer
* error analysis

No more than 30% of a pool should assess the same cognitive skill in the same way.

Changing only the numbers does not create diversity.

---

# Question Quality Rubric

Every D4-D6 question should score at least 4/5 in Mathematical Richness and Diagnostic Value (a D6 should score 5/5 on Richness).

## Mathematical Richness

1 = trivial procedure
3 = connected reasoning
5 = genuine mathematical thinking

## Diagnostic Value

1 = wrong answers reveal little
3 = reveals broad misunderstanding
5 = reveals specific misconception

## Transfer

1 = direct repetition
3 = minor adaptation
5 = novel application

## Authenticity

1 = artificial exercise
3 = somewhat realistic
5 = genuinely meaningful mathematical context

## Markability

1 = ambiguous
3 = mostly reliable
5 = completely objective and robust

Questions scoring below threshold should be rewritten or rejected.

---

# Gold Standard Test

Before approving a question, ask:

"Would an experienced mathematics teacher choose this question over five alternative questions assessing the same concept?"

If the answer is no, the question should not be published.

---

# Operational Quality Requirements (v2)

The sections above define *what* a good question is. The sections below make those
goals **operational and enforceable** — testable rules an author (human or agent)
applies to every item before emitting it. Where a rule sharpens an earlier section,
it is cross-referenced.

## Diagnostic intent is mandatory (not advice)

Every authored question MUST have a one-line **target misconception** — the specific
error a wrong answer reveals (see [The Diagnostic Test](#the-diagnostic-test)). If the
author cannot state it in one sentence, the item fails: rewrite it, or relabel it as a
*fluency* item and place it accordingly. Diagnostic intent is a gate, not a nicety.

* For MCQ, the misconception mapping is per-distractor (below).
* For typed items, the wrong-answer story is the method a student would mis-execute.

## Authentic distractors (MCQ)

Every distractor MUST be the **actual output of one specific, common wrong method** —
never a random or "obviously wrong" number. Each distractor must also be:

* **Same form, type, and order of magnitude** as the key, so it cannot be eliminated
  on shape or size alone (e.g. if the key is `\frac{3}{8}`, distractors are fractions
  near that size, not `12` or `-1`).
* **Distinct in its error** from the other distractors (no two encode the same mistake).

**Author test:** for each distractor, write the one-line student error that produces it.
If you cannot, replace the distractor. This strengthens [Distractor Quality](#distractor-quality-standard).

## Number & elegance guidance

Numbers should make the *mathematics* the challenge, not the arithmetic, and must never
leak the answer:

* **Don't let numbers leak the key.** The answer must not equal a value stated in the
  prompt, and "convenient" inputs (0, 1, two equal values, an answer identical to an
  input) are used only when that is the deliberate point.
* **Test your distractor methods against the chosen numbers.** If a *wrong* method
  happens to produce the *right* answer for these numbers, change the numbers — the
  item no longer discriminates.
* **Clean but not trivial.** Pick numbers so a correct method yields a clean (ideally
  exact) result, but not so clean that the answer is guessable without the method.
* **Specify rounding in the prompt** whenever the exact answer is not clean ("to 1
  decimal place"), so the marker has one canonical target.
* **Vary structure across a pool, not just values** — magnitudes, signs, and
  fraction/decimal/surd forms. Number-swaps are not diversity (see
  [Pool Diversity](#pool-diversity-requirements)).

## Multiple solution paths (D3+)

For **D3 and above, prefer questions solvable by at least two valid methods** (e.g.
algebraic vs graphical, ratio vs unitary, substitution vs elimination). Multiple paths:

* reward understanding over a single memorised algorithm,
* make the item robust (a student is not gated on recalling one trick),
* improve diagnostics (different wrong paths expose different misconceptions).

This is a strong preference, not a hard gate. But a D4/D5 that admits **only one rigid
procedure** must be scrutinised: is it genuine transfer, or a D2 dressed up? (See
[No Fake Depth](#no-fake-depth).)

## Operational difficulty test

Beyond the prose [Difficulty Definitions](#difficulty-definitions), assign and verify a
level with a repeatable test:

* **Count the genuine decisions** — points where the student must *choose*, not merely
  *execute*. D1: none. D2: none, or one trivial variation. D3: ≥1 real intermediate
  decision. D4: choose the method independently + reject ≥1 plausible wrong path +
  interpret the result. D5: ≥1 novel/constraint/modelling/abstraction move. D6:
  synoptic + ≥3 dependent stages + ≥1 uncued strategic insight.
* **What does NOT raise difficulty:** bigger numbers, more notation, exam tone, longer
  wording, or naming a formula. None of these change the level.
* **Solve it the lazy way.** If answer-extraction, elimination/guessing, or one rote
  algorithm reaches the answer, the *true* level is ≤D2 regardless of appearance.

## The Formal Quality Gate

A question is publishable only if **every** condition holds:

1. **Markability = 5** — exactly one unambiguous correct answer (or a labelled MCQ key),
   auto-markable, with accepted-variant forms listed for typed answers. **Non-negotiable.**
2. **Not extraction** — requires ≥1 transformation, inference, comparison, decision, or
   interpretation.
3. **Stated diagnostic intent** — author can name the target misconception in one line.
4. **For D3+** — Mathematical Richness ≥4 *and* Diagnostic Value ≥4 *and* ≥1 genuine
   decision point.
5. **For MCQ** — every distractor is misconception-linked, authentic, and same-form.
6. **Lean and non-leaking** — the shortest version of itself; numbers don't leak the key.
7. **For D6** — additionally Richness = 5, synoptic, ≥3 dependent stages, all reasoning
   carried by auto-markable parts (no free-text justification).

Fail any condition → **rewrite, or relabel to the level it actually is** (e.g. demote to
a fluency item). Never publish a failing item.

## Agent self-check protocol

Before emitting **any** question, run these in order; stop and fix on the first failure:

1. **Markability** — one unambiguous answer (or MCQ key)? Will the auto-marker accept the
   forms a correct student will type? List the accepted variants. *(Fail → fix or reject.)*
2. **Extraction** — answerable by copying a stated value, guessing, or one rote step?
   *(Yes → it is ≤D2: accept as labelled fluency or rewrite for depth.)*
3. **Diagnostic** — state in one line what a wrong answer reveals. *(Can't → rewrite.)*
4. **Distractors (MCQ)** — name the student error behind each; confirm same form/magnitude.
   *(Any throwaway or duplicate-error → replace.)*
5. **Numbers** — do they leak the key, or let a wrong method hit the right answer?
   *(Yes → change them.)*
6. **Difficulty** — run the operational test; does the claimed level match the genuine
   decisions? *(No → relabel.)*
7. **Concision** — is this the shortest version that still measures the skill? *(No → trim.)*
8. **Schema** — prompt, answer, and step-by-step explanation present; explanation matches
   the answer numerically; currency/LaTeX/format rules met. *(No → fix.)*

Emit only when all eight pass.

## Worked examples — weak vs strong

**Misconception-linked distractors** — `Simplify 3/9.`
* Weak choices: `1/3`, `27`, `6`, `0.5` (only `1/3` is a fraction; the rest are
  eliminable on form and encode no specific error).
* Strong choices: `1/3` (key), `1/6` (divided 9 by 3 then 3 by... mis-cancel),
  `3/3` (cancelled only the numerator's factor), `1/9` (cancelled the 3 into the 3,
  left the 9) — all fractions, each a named cancelling error.

**Numbers leaking the key** — *"A region of area 36 has width 4; find its length."*
* Weak: width 6, area 36 → length 6 (answer equals an input; a student can guess "6"
  by symmetry without dividing).
* Strong: width 4, area 36 → length 9 (no input equals the answer; the division is real).

**Single vs multiple path (D3)** — *"Find where 2x + 3 = x + 9."*
* Weak (one rigid path, near-D2): "Solve 2x + 3 = x + 9."
* Strong (≥2 paths, genuine D3): "Two phone plans cost C = 2x + 3 and C = x + 9 dollars
  for x units. Find the usage where they cost the same, and state which is cheaper below
  it." — solvable algebraically *or* by reasoning about the rates/intercepts, and the
  second part forces interpretation.

## Risks to markability (and how this upgrade contains them)

The chief risk of "richer" questions is drift toward open-endedness and ambiguity. This
upgrade contains that risk by construction:

* **Markability = 5 is condition 1 of the gate** and explicitly non-negotiable; depth
  never overrides it.
* **D3+ depth is carried by auto-markable numeric/exact/MCQ answers** — and, for
  sustained reasoning, by multi-part items whose parts are each individually markable —
  **never by free-text justification.**
* **"Compare / determine whether / decide" items must resolve to a specific markable
  output** — a value, a yes/no *plus* the deciding value, or a labelled choice — not a
  written argument.
* **Every typed item ships its `acceptedAnswers` variants**, so legitimate alternate
  forms mark correct and automatic-marking compatibility does not regress.
* **No open-ended items** unless the marking model explicitly supports them.

---

## Pre-flight checklist

- [ ] Every question has a real, specific prompt - no TODO, lorem ipsum, TBD, or "sample question"
- [ ] Every answer is correct and matches the explanation numerically
- [ ] Every explanation is step-by-step, >= 40 characters, specific to this question
- [ ] Multi-part prompts use `parts` / `question_parts`; do not hide (a), (b), (c) inside one unstructured answer
- [ ] No draft/self-correction wording (Wait, Hmm, recalculate, on second thought, actually that)
- [ ] No mojibake (for example broken characters from bad encoding)
- [ ] Currency amounts use plain `$500` - never `\$500` or `\\$500`
- [ ] All `$...$` LaTeX spans are closed (no unclosed math)
- [ ] LaTeX spans starting with a digit use `\( ... \)` not `$...$`
- [ ] MCQ: exactly 4 choices (A, B, C, D); `answer` is one of those labels
- [ ] Typed: `accepted_answers` covers reasonable alternate forms
- [ ] `question_type` matches `choices` presence
- [ ] Source IDs are human-readable slugs, not UUIDs
- [ ] High-difficulty questions earn their difficulty through transfer, interpretation, modelling, or synthesis - not just notation or exam-style wording
- [ ] Every question has a stated target misconception (what a wrong answer reveals); items that cannot state one are relabelled as fluency
- [ ] MCQ: every distractor is the output of a named student error and matches the key's form/magnitude - no throwaways, no duplicate errors
- [ ] Numbers do not leak the key (answer is not equal to a stated input) and no wrong method reaches the right answer for the chosen numbers
- [ ] D3+ items contain at least one genuine decision point and pass the Formal Quality Gate (Markability=5, Richness>=4, Diagnostic>=4)
- [ ] `masteryQuizPool` entries are explicitly authored questions, not template-expanded generator output
- [ ] `multiPartPractice` entries are explicitly authored shared-stem questions, not backfilled wrappers around existing single questions

---

## Two question formats

### Format A - Lesson TypeScript (`PracticeQuestion`)

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
  choices?: Choice[];         // MCQ only - a Choice may also carry a diagram (see Visual payloads)
  parts?: PracticeQuestionPart[];               // HSC Section II-style parts only
  // ...plus any visual payload field (cartesianGraph, numberLineDiagram, ...) - see Visual payloads
};
```

> Any of the visual payload fields documented under [Visual payloads](#visual-payloads) may be set on a `PracticeQuestion` (and on a `WorkedExample`). They are carried through the whole pipeline - lesson display, worksheets, admin preview, and seed-to-database - automatically.

> Lesson TypeScript questions do not carry `question_type`, `difficulty`, or `course_slug`. Those are inferred by `seed-question-bank.ts`.

### Multi-part question design

**You MUST use multi-part questions whenever a question has a shared stem with 2-4 dependent parts.** Do not bury multi-part structure inside a single unstructured `answer` field. Multi-part infrastructure is production-ready and supports marks-weighted partial credit - use it.

Multi-part questions live in the optional `multiPartPractice` array on a lesson - separate from the standard 4+5+10 sections. They are seeded at **D5** (exam-style) and not counted against the standard lesson-section counts. See also [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) for placement rules.

## No Fake Depth

Do not simulate difficulty with abstract phrasing, symbolic density, or exam tone alone.

- A question is not high-difficulty merely because it looks advanced.
- Method-naming, formula-selection, and structure-identification prompts are usually recognition tasks and should not be used as standalone D4-D5 questions.
- If a student can answer correctly without doing meaningful mathematics, the question is not genuinely difficult.
- Error-analysis questions are only acceptable when the flaw is mathematically specific and the correction requires real understanding.
- High-difficulty questions should usually involve production, transfer, interpretation, modelling, constraint reasoning, or synthesis.

### Prohibited shortcut patterns

- Generic prompts such as "What should you identify first?", "Which method should you use?", or "Which first step best matches...?" as standalone high-difficulty questions
- Template-expanded mastery-pool generators that produce lesson questions from reusable blueprints
- Multi-part backfill that wraps existing single questions into artificial parts after the fact
- Shared-stem questions where the parts are structurally independent and only grouped for convenience

#### Taxonomy

Choose a type before authoring. Each type measures different skills.

| Type | What it measures | Parts | MVP-safe? |
|---|---|---|---|
| **Fluency chain** | Procedural steps sharing one stem | 2-3 | Yes |
| **Concept-to-procedure** | Identify rule -> apply it | 3 | (a)(b) yes; (c) "explain why" = free-text |
| **Interpret-and-check** | Compute -> interpret in context -> verify | 3 | Yes if verify = number |
| **Modelling/application** | Set up -> solve -> interpret result | 3 | Yes if result is numeric |
| **Error analysis** | Spot wrong step -> correct -> get final answer | 3 | Yes if correction = number |
| **Compare methods** | Method A -> Method B -> choose | 3 | (a)(b) yes; choice = free-text |
| **Parameter/condition** | Compute -> find constraint -> interpret condition | 3 | Yes if constraint is a value |
| **Graph/table reading** | Read from diagram -> compute -> interpret | 2-3 | Needs diagram-response infra |
| **HSC Section II style** | Multi-skill layered exam item | 3-4 | (a)(b) usually yes; deeper parts risky |

The pilot questions (`tan-norm-mp-*`) are fluency chains. They are correct but should not be the dominant type.

#### Cognitive ladder

The recommended part structure for all types except fluency chain:

| Part | Cognitive demand | Typical answer | MVP-safe |
|---|---|---|---|
| **(a)** | Local procedural fact - compute one quantity from the stem | Number, coordinate | Yes |
| **(b)** | Connected calculation - apply or extend (a) | Number, named outcome | Yes |
| **(c)** | Interpret, check, model, or classify - a new cognitive mode | Classification, condition, parameter | Yes if specific; no if "explain why" |

**Critical rule: part (c) must not merely be more arithmetic of the same type as parts (a) and (b).** If all three parts are the same cognitive demand, the question is a fluency chain - label it as such and consider whether it belongs in `masteryQuiz` instead.

#### Authoring rules

1. **No free-text parts (MVP constraint).** Do not ask "Explain why...", "Justify...", "Show that...", "Describe...", "Comment on..." until free-text/AI marking exists. These produce silent incorrect marking.

2. **No equation-as-answer unless one canonical form is unambiguous.** `y = 2x + 1`, `y - 1 = 2(x - 0)`, and `2x - y + 1 = 0` are the same line but will not match. Ask for a specific coefficient, y-intercept, or gradient value instead.

3. **Prefer specific numeric outputs.** Gradient, y-intercept, coordinate, parameter value, domain boundary - these collapse to one unambiguous answer.

4. **Mark allocation:** Total 4-6 marks per question. Part (a): 1-2 marks. Part (b): 1-2 marks. Part (c): 2-3 marks.

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
| Full equation | `"y=2x+1"` | **No** | Too many equivalent forms - ask for a component value |
| "Explain why..." | Free text | **No** | Requires future free-text marking |
| "Justify..." | Free text | **No** | Same |
| Graph sketch | Drawing | **No** | Requires diagram-response infrastructure |

#### Three blueprints

**Blueprint 1 - Year 9/10 Core: Modelling/application**

> Stem: A water tank holds 400 L and drains at 25 L/min.

- **(a)** [1 mark] How many litres remain after 6 minutes? -> `"250"`
- **(b)** [2 marks] Find the time (in minutes) when the tank is empty. -> `"16"`
- **(c)** [1 mark] The drain rate doubles. Find the new time to empty. -> `"8"`

Part (c) changes a parameter - it is not just more arithmetic on the same setup. Fully MVP-safe.

---

**Blueprint 2 - Year 12 Advanced: Interpret-and-check (second derivative classification)**

> Stem: A function has $f'(x) = 3x^2 - 12x + 9$.

- **(a)** [2 marks] Find the x-values where $f'(x) = 0$. -> `"1"` and `"3"` (two separate sub-parts, or `"1, 3"`)
- **(b)** [1 mark] Find $f''(1)$. -> `"-6"`
- **(c)** [1 mark] State whether $x = 1$ is a local maximum or minimum. -> `"maximum"`

Part (c) is a classification from sign, not another differentiation. Fully MVP-safe.

---

**Blueprint 3 - Year 12 Extension 1/2: Parameter/condition reasoning**

> Stem: The curve $y = x^3 + ax^2 + b$ passes through $(0, 5)$ and has a stationary point at $x = 2$.

- **(a)** [1 mark] Find $b$. -> `"5"`
- **(b)** [2 marks] Find $a$. -> `"-3"`
- **(c)** [1 mark] Find the y-coordinate of the stationary point. -> `"1"`

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

### Format B - External JSON batch (`QuestionBatchRecord`)

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

### Not automatic in the local (Tier 0) marker — but the CAS tier handles it

The fast local marker does **not** perform symbolic algebra. The forms below are
rescued by the **CAS / SymPy tier** when it is enabled (see
[Symbolic answer marking](#symbolic-answer-marking-cas--sympy) below). When CAS
is **off**, add the common forms to `accepted_answers` as a safety net:

| Forms that look equivalent | Local marker | CAS tier (when on) |
|---|---|---|
| `x/2` and `0.5x` and `(1/2)x` | ✗ — add to `accepted_answers` | ✓ equivalent |
| `x^2 + 6x + 5` and `(x+1)(x+5)` | ✗ — pick one canonical | ✓ equivalent |
| `2x + 2` and `2(x+1)` | ✗ — pick expanded canonical | ✓ equivalent |
| `sqrt(x)` and `x^(1/2)` | ✗ — pick one; add other | ✓ equivalent |

### Convention for algebraic canonical answers

- Use `x^2` not `x^(2)`, `x²`
- Use `x^3` not `x^(3)`, `x³`
- Use the **expanded** polynomial form as canonical, e.g. `x^2+6x+5`
- Add spaced forms as accepted variants: `["x^2 + 6x + 5"]`
- For coefficient fractions (`x/2`, `1/2 x`), add all common student forms to `accepted_answers`

---

## Symbolic answer marking (CAS / SymPy)

Typed answers are marked in tiers:
[lib/answerMarking.ts](../lib/answerMarking.ts) → [lib/cas/markAnswerWithCas.ts](../lib/cas/markAnswerWithCas.ts) → the Python [cas-service/](../cas-service/).

- **Tier 0 — local (always on, ~0 ms):** exact match, `accepted_answers`,
  normalisation (Unicode, `^(n)` → `^n`, unit stripping, …), and
  numeric/coordinate/ratio/clock matching. Most numeric answers stop here.
- **Tier 1 — CAS (SymPy), when deployed:** runs only when Tier 0 says "wrong"
  **and** the answer "looks symbolic" (has a variable, operator, fraction,
  bracket, or maths glyph). It confirms genuine *mathematical equivalence*. It
  can only upgrade wrong → right, never the reverse, and confirms every positive
  both symbolically (`simplify(a − b) == 0`) **and** by a numeric spot-check, so
  false positives are very unlikely.

**So you may author a symbolic answer as the canonical answer** — equivalent
student forms are then accepted automatically (where CAS is enabled):

| Kind | Detected by | Accepts, e.g. |
|---|---|---|
| Expression | default | `2(x+3)` = `2x+6`; `√8` = `2√2`; `sin x cos x` = `½ sin 2x` |
| Antiderivative | trailing `+ C` | `-\cos x + C` = `C − cos x`; the `+C` cancels automatically |
| Equation | contains `=` | `2x − y + 1 = 0` = `y = 2x + 1` |
| Solution set | `{…}` / comma list with `=` | `x = 1, x = 3` = `{3, 1}` (order-independent) |
| Inequality | `< > <= >=` | `x > 2` = `2 < x` |
| Interval | `(-∞, 4]` | matched to the equivalent inequality set |

Input cleanup folds the Unicode the app emits (`π ≤ ² ×`) and a limited LaTeX
vocabulary (`\frac \sqrt \sin \pi ^{} \le`) into SymPy.

**Conventions / limits** (see [cas-service/README.md](../cas-service/README.md)):

- `e` is Euler's number (`e^x` = `exp x`); a literal variable named `e` is not supported.
- `ln` and `log` both mean natural log. Forms differing by domain (e.g.
  `2 ln x` vs `ln x²`) are deliberately **not** treated as equal (conservative).
- Only the LaTeX macro set our stored answers use is parsed; anything else
  **defers** (falls back to Tier 0) rather than guessing.

**Authoring guidance:**

- A clean symbolic canonical answer is fine: `x^2 + 6x + 5`, `-\cos x + C`,
  `2x - y + 1 = 0`, `x > 2`, `(-2, 3]`.
- CAS is **gated by deployment** (`CAS_SERVICE_URL`; instant kill-switch
  `CAS_MARKING_ENABLED=false`). When off, only Tier 0 runs — so still add the
  *common* equivalent forms a student is likely to type to `accepted_answers`.
  Treat CAS as covering the long tail, not as a licence to skip obvious variants.
- CAS never rescues a genuinely different value (`12.5` vs `13`) — those are real
  mismatches.

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
| Mojibake characters / broken encoding text | Validator ERROR |
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
