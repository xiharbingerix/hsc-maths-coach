# Year 12 Advanced — Question Batch Audit

**Audited:** 2026-06-10
**Batches:** 3 files, 66 records total
**Validator:** `scripts/validate-question-batch.ts --strict`

---

## 1. Total valid records per batch

| Batch | File | Records | Pass (strict) | Fail | Status |
|---|---|---|---|---|---|
| MA-C3.6 Area Under a Curve | `nova_maths_c36_sample_v2.json` | 25 | 25 | 0 | ✓ Ready |
| MA-C2.3 Optimisation | `nova_maths_c23_sample.json` | 20 | 20 | 0 | ✓ Ready |
| MA-S1.2 Conditional Probability | `nova_maths_s12_sample.json` | 21 | 21 | 0 | ✓ Ready |
| **Total** | | **66** | **66** | **0** | |

Validator output (summary lines):

```
nova_maths_c36_sample_v2.json   25/25  0 warnings  0 errors  ✓
nova_maths_c23_sample.json      20/20  0 warnings  0 errors  ✓
nova_maths_s12_sample.json      21/21  0 warnings  0 errors  ✓
```

Import dry-run output (summary lines):

```
nova_maths_c36_sample_v2.json   Total: 25  Valid: 25  Invalid: 0  Insert candidates: 25
nova_maths_c23_sample.json      Total: 20  Valid: 20  Invalid: 0  Insert candidates: 20
nova_maths_s12_sample.json      Total: 21  Valid: 21  Invalid: 0  Insert candidates: 21
```

---

## 2. Course / topic / subtopic breakdown

All three batches target `course_slug: year-12-advanced`, `year_level: year-12`.

| Batch | topic_slug | subtopic_slug | Records |
|---|---|---|---|
| C3.6 | `calculus` | `area-under-a-curve` | 25 |
| C2.3 | `calculus` | `optimisation` | 20 |
| S1.2 | `statistics` | `conditional-probability` | 21 |

Each batch covers exactly one subtopic. No cross-subtopic mixing in any file.

**Notable:** C3.6 questions 19a/b/c and 20a/b/c/d are scenario clusters — three and four linked sub-parts respectively treated as independent records. Students could encounter sub-part (b) or (c) without the shared setup context.

**Notable:** S1.2 original sample-17 was split into 17a (addition rule / intersection) and 17b (independence of complements) to resolve the multi-part prompt issue, raising the record count from 20 to 21.

---

## 3. Difficulty breakdown

| Difficulty | C3.6 | C2.3 | S1.2 | Total |
|---|---|---|---|---|
| 1 — guided | 5 | 5 | 5 | 15 |
| 2 — standard | 5 | 5 | 5 | 15 |
| 3 — independent | 4 | 4 | 4 | 12 |
| 4 — harder | 4 | 4 | 5 | 13 |
| 5 — mastery / exam | 7 | 2 | 2 | 11 |
| **Total** | **25** | **20** | **21** | **66** |

C3.6 is D5-heavy (7/25 = 28%) because the scenario clusters each contribute multiple records at difficulty 5. C2.3 and S1.2 have a thinner D5 tail (2 records each). S1.2 has 5 D4 records (the split of sample-17 added one extra D4 record).

---

## 4. Question type breakdown

| Type | C3.6 | C2.3 | S1.2 | Notes |
|---|---|---|---|---|
| `procedural` | 25 | 20 | 21 | All valid; typed answer, `choices: null` |

All records across all three batches use `question_type: "procedural"` with `choices: null`. No MCQ records in any batch.

---

## 5. Fixes applied before finalisation

### S1.2 — type corrections (completed)

All 11 originally-failing S1.2 records were corrected prior to this audit pass:

| Records | Original issue | Fix applied |
|---|---|---|
| samples 11, 12, 13, 14 | `"conceptual"` / no choices | Changed to `"procedural"` |
| samples 15, 16, 18, 19, 20 | `"application"` invalid type | Changed to `"procedural"` |
| sample 17 | Multi-part prompt + wrong type | Split into 17a and 17b; both `"procedural"` |
| sample 08 | Multi-part prompt (false positive) | Prompt rephrased to remove ambiguity |

### C3.6 — wrapper format (completed)

The file was a bare JSON array. Wrapped with:
```json
{
  "batch_id": "nova-maths-2026-06-10-y12adv-c36",
  "generated_by": "manus",
  "questions": [ ... ]
}
```

### C2.3 — type corrections (previously completed)

All 13 original C2.3 records that used `"conceptual"` without choices were changed to `"procedural"` in a prior pass.

---

## 6. Validator rules triggered during development

### ERROR — `question_type: "application"` not recognised

Triggered on 5 records in S1.2 (samples 15, 16, 18, 19, 20) and on 14 records in the original C2.3 batch (before correction). The only accepted values are `"conceptual"` and `"procedural"`. External generators frequently use `"application"` or `"multi-step"` as a third tier; always remap to `"procedural"` for typed-answer questions.

### ERROR — multi-part prompt with single answer field

Triggered on sample 17 in S1.2. The validator detected a prompt asking for two distinct results in a single record. Resolution: split into 17a and 17b. Sample 08 was a false positive; the prompt was rephrased slightly.

### WARN — `question_type: "conceptual"` with `choices: null`

Triggered on 5 S1.2 records (11, 12, 13, 14, 17). In strict mode this is treated as an error. The rule: `"conceptual"` means MCQ (choices present); typed answer is `"procedural"`.

### WARN — odd LaTeX `$` delimiter count

Most common rule in C2.3 development (18+ occurrences across 10 records, all fixed before this audit). Root cause: `countLatexDollars()` uses currency detection — it skips `$` when the next character is a digit. A math span like `$2x - 6$` loses its opening `$` from the count, leaving an odd total.

**Fix pattern:** wrap digit-starting spans in parentheses: `$2x - 6$` → `$(2x - 6)$`. This makes the opening character `(` not a digit, so the `$` is counted normally.

---

## 7. Remaining risks before enabling `--write` import

### R1 — ~~S1.2 batch not import-ready~~ (RESOLVED)

All 11 originally-failing S1.2 records are fixed. Strict validation passes 21/21.

### R2 — ~~C3.6 uses bare array format~~ (RESOLVED)

C3.6 now uses the preferred wrapper object with `batch_id: "nova-maths-2026-06-10-y12adv-c36"`.

### R3 — C3.6 scenario sub-parts lack self-contained context

Questions 19a/b/c (velocity/displacement) and 20a/b/c/d (marginal revenue) are linked sub-parts stored as independent records. The worksheet engine can select sub-part (b) or (c) without (a). Each sub-part prompt should restate the scenario setup so it is self-contained, or the records should carry a `transfer_from_topics` pointer to the parent question ID.

### R4 — No human content review documented

The import guide (`docs/QUESTION-BATCH-IMPORT.md`) requires spotchecking 5–10 questions per batch for mathematical accuracy before seeding. No such review has been recorded for any of the three batches. Complete spot-checks before running `--write`.

### R5 — `student_subtopic_mastery` migration must be live

The adaptive worksheet upgrade routes now query `student_subtopic_mastery`. Verify the migration creating this table is applied in the production Supabase project before importing questions and testing the adaptive worksheet flow end-to-end.

### R6 — Stripe key in `.env.local`

Per prior audit: the local `STRIPE_SECRET_KEY` has an `mk_` prefix and is invalid. Confirm the production key is correct before any payment-path testing post-import.

---

## 8. Recommended import order

All three batches now pass strict validation. Import in this order:

**Step 1 — MA-C2.3 Optimisation** (`nova_maths_c23_sample.json`)

- 20 records, all pass strict, wrapper format with `batch_id`, generated by manus.

**Step 2 — MA-C3.6 Area Under a Curve** (`nova_maths_c36_sample_v2.json`)

- 25 records, all pass strict. Wrapper added (`batch_id: nova-maths-2026-06-10-y12adv-c36`).
- After import, review the 19a/b/c and 20a/b/c/d sub-part records for context self-containment (R3).

**Step 3 — MA-S1.2 Conditional Probability** (`nova_maths_s12_sample.json`)

- 21 records, all pass strict. Original sample-17 was split into 17a and 17b.

```bash
# Validate all (should all pass strict)
npx tsx scripts/validate-question-batch.ts question-batches/nova_maths_c23_sample.json --strict
npx tsx scripts/validate-question-batch.ts question-batches/nova_maths_c36_sample_v2.json --strict
npx tsx scripts/validate-question-batch.ts question-batches/nova_maths_s12_sample.json --strict

# Dry-run all (no Supabase writes)
npx tsx scripts/import-question-batch.ts question-batches/nova_maths_c23_sample.json
npx tsx scripts/import-question-batch.ts question-batches/nova_maths_c36_sample_v2.json
npx tsx scripts/import-question-batch.ts question-batches/nova_maths_s12_sample.json
```

---

## 9. Recommended next 3 subtopics

Priorities are based on: (a) HSC exam frequency, (b) adjacency to already-covered subtopics, and (c) gaps needed for adaptive worksheets to generate complete topic coverage.

### Priority 1 — MA-C2.2 Applications of Differentiation: curve sketching

**Slug:** `calculus` / `curve-sketching`  
**Why:** Directly precedes C2.3 Optimisation in the syllabus. Covers stationary points, points of inflection, sign of first and second derivatives, and sketch from derivative information. Students who struggle with C2.3 optimisation almost always have gaps in C2.2 curve sketching first. Many C2.3 records already assume this knowledge. Having C2.2 questions in the bank allows the adaptive worksheet engine to detect the underlying weakness.

### Priority 2 — MA-C3.2–C3.4 Integration techniques

**Slug:** `calculus` / `integration-techniques`  
**Why:** The C3.6 area questions assume fluency with integrating polynomials, exponentials (`e^x`, `e^(kx)`), and trigonometric functions (`sin`, `cos`). Gaps here are the most common reason students lose marks on C3.6 area questions. A batch covering reverse-chain-rule and standard integrals of `e^(kx)`, `sin(kx)`, `cos(kx)`, and `1/x` would directly support the 25 C3.6 questions already in the pipeline.

### Priority 3 — MA-S1.1 Probability and Counting

**Slug:** `statistics` / `probability`  
**Why:** S1.1 is the prerequisite for S1.2 Conditional Probability. The S1.2 records reference sample spaces, complementary events, and the addition rule without re-deriving them. A student who has not mastered S1.1 will struggle with every S1.2 question. Having S1.1 in the bank also allows the adaptive worksheet engine to fall back to easier probability questions when S1.2 mastery is very low.

---

## Appendix — Validator command reference

```bash
# Validate single batch (lenient)
npx tsx scripts/validate-question-batch.ts path/to/batch.json

# Validate single batch (strict — warnings are errors)
npx tsx scripts/validate-question-batch.ts path/to/batch.json --strict

# Print an example batch
npx tsx scripts/validate-question-batch.ts --example > example-batch.json
```

Exit codes: `0` = all pass, `1` = any errors (or warnings in strict mode).
