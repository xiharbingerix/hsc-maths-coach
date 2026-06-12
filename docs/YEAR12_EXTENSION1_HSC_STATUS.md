# Year 12 Mathematics Extension 1 — HSC Status

_Audited: June 2026_

---

## 1. Course Registration

| Field | Value |
|---|---|
| Slug | `year-12-extension-1` |
| Type alias | `NewCourseSlug` — registered in `lib/courseTypes.ts` |
| Status | `in_progress` |
| App routes | `app/course/year-12-extension-1/page.tsx` only — no unit or lesson sub-routes |
| Diagnostic | `lib/diagnostics/year-12-extension-1.ts` — 20 questions across 6 units |
| Question bank | In `SUPPORTED_COURSE_SLUGS` in `scripts/seed-question-bank.ts` — seedable |

---

## 2. Unit and Lesson Inventory

### Active (explicit lesson overrides in `lib/lessons/year12Extension1/`)

| Unit slug | Title | Lessons | Override file |
|---|---|---|---|
| `proof-induction` | Proof by Mathematical Induction | 3 | `proofInduction.ts` |
| `vectors` | Introduction to Vectors | 4 | `vectors.ts` |
| `inverse-trig` | Inverse Trigonometric Functions | 3 | `inverseTrig.ts` |

**Lesson slugs:**
- `intro-to-mathematical-induction`, `induction-divisibility`, `induction-inequalities`
- `vectors-scalars-notation`, `vector-addition-subtraction`, `dot-product`, `vector-projections-applications`
- `inverse-sine-cosine`, `inverse-tangent`, `differentiating-inverse-trig`

### Planned (in catalog, zero lessons)

| Unit slug | Title | Lessons |
|---|---|---|
| `further-calculus` | Further Calculus Skills | 0 |
| `calculus-applications` | Further Applications of Calculus | 0 |
| `binomial-distribution` | The Binomial Distribution | 0 |

---

## 3. Question Counts (estimates)

Each explicit lesson override includes: 4 guided + 5 independent + 10 mastery = **19 questions**.

| Unit | Lessons | Est. questions |
|---|---|---|
| Proof by Mathematical Induction | 3 | ~57 |
| Introduction to Vectors | 4 | ~76 |
| Inverse Trigonometric Functions | 3 | ~57 |
| Further Calculus Skills | 0 | 0 |
| Further Applications of Calculus | 0 | 0 |
| The Binomial Distribution | 0 | 0 |
| **Total** | **10** | **~190** |

Diagnostic questions: 20 (3 + 4 + 3 + 4 + 3 + 3 across all 6 units including stubs).

---

## 4. Coverage: Curriculum vs HSC Exam Preparation

### Curriculum lesson coverage

| NSW Ext 1 Yr 12 topic | Status |
|---|---|
| Proof by mathematical induction (summation, divisibility, inequalities) | Active — 3 lessons |
| Introduction to vectors (operations, dot product, projections) | Active — 4 lessons |
| Inverse trigonometric functions (arcsin, arccos, arctan, derivatives) | Active — 3 lessons |
| Further trig (t-formula, compound/double angle in depth) | **Missing** |
| Further calculus — trig integration, IBP basics, substitution | **Missing** |
| Applications of calculus — related rates, Newton's law of cooling, SHM intro | **Missing** |
| The binomial distribution — B(n,p), E(X), Var(X), probability calculations | Unit stub only — 0 lessons |
| Statistical hypothesis testing with binomial | **Missing** |

### HSC exam preparation coverage

| HSC prep feature | Status |
|---|---|
| Section I MCQ practice (short) | Partial — mastery quiz and guided practice are MCQ-capable |
| Section II short-response practice | Partial — typed-answer questions exist, but single-mark only |
| Section II multi-part questions | **Missing** — no multi-part question structure |
| Worked solutions with marking criteria | **Missing** — explanations exist, no mark-allocation display |
| Extended response (show that, prove, sketch) | **Missing** — no question type for open-ended proofs |
| Timed exam simulation | **Missing** |
| Past paper questions | **Missing** — HSC import pipeline not yet implemented for Extension |
| Band predictor | **Missing** |

### Past-paper coverage

No past HSC Extension 1 questions are imported. The Advanced import audit (`docs/HSC_ADVANCED_2020_2025_IMPORT_AUDIT.md`) documented structural blockers (multi-part compound answers, diagram dependencies, schema gaps) that apply equally to Extension papers.

---

## 5. Missing HSC-Specific Features

1. **Timed exam practice** — no countdown timer, no exam-mode UI
2. **Multi-mark questions** — `PracticeQuestion` type supports only a single `answer` field; multi-part (a)(b)(c) cannot be structured
3. **Marking criteria** — no per-question mark allocation or part-mark rubric display
4. **Extended response support** — no free-text or show-that question type; no teacher-marking workflow
5. **Past paper question bank** — no Extension 1 past paper questions imported
6. **Band predictor for Extension 1** — not wired up; band predictor on dashboard does not cover this course

---

## 6. Recommended Structure — Next Slugs

### Content slugs to complete the `year-12-extension-1` course

Add explicit lesson overrides for the three empty units:

```
further-calculus
  further-trig-functions               (t-formula, compound/double angle integration)
  integration-by-substitution
  integration-trig-products
  further-calculus-exam-practice

calculus-applications
  related-rates-of-change
  newtons-law-cooling-growth-decay
  simple-harmonic-motion-intro
  calculus-applications-exam-practice

binomial-distribution
  bernoulli-trials-binomial-model
  binomial-probabilities
  mean-variance-binomial
  binomial-distribution-exam-practice
```

### HSC exam preparation slug (new course)

`hsc-extension-1-practice` — a separate course focused on exam technique:

```
hsc-extension-1-practice
  exam-technique-ext1                  (structure of paper, time allocation, mark estimation)
  section-i-mcq-practice               (timed MCQ sets)
  proof-induction-exam-questions       (past-paper style questions by topic)
  vectors-exam-questions
  calculus-exam-questions
  statistics-exam-questions
  mock-exam-section-i                  (15 MCQs, 22.5 min)
  mock-exam-section-ii                 (extended response, timed)
```

---

## 7. Recommended Implementation Order

1. **Fill `further-calculus` unit** — closest to existing Advanced calculus overrides; fastest to author
2. **Fill `binomial-distribution` unit** — self-contained probability topic, no cross-unit dependencies
3. **Fill `calculus-applications` unit** — builds on step 1
4. **Add unit-level and lesson-level app routes** — currently only the course landing page exists; unit pages and lesson pages are needed for lesson-by-lesson study
5. **Wire band predictor to `year-12-extension-1`** — currently not connected
6. **Multi-part question type** — requires schema change to `PracticeQuestion` and UI changes; prerequisite for any serious HSC Section II prep
7. **`hsc-extension-1-practice` course** — once multi-part questions exist and past-paper content is cleaned up
