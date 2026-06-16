# Nova Maths Question-Bank Audit — 2026-06-16

Quality audit of every `nova_maths_*.json` batch in [`question-batches/`](../question-batches/):
mathematical correctness of questions, answers, hints, and explanations; adequacy of
`accepted_answers`; and whether single-answer questions should be restructured as
multi-part questions.

**Scope:** 10 files · 169 questions (incl. multi-part children). Audited by four parallel
agents, one per file group, each independently re-deriving every answer.

**Outcome:** the catalog is mathematically sound. **1 genuinely incorrect answer** was found
and fixed; **3 accepted-answer gaps** that would wrongly reject correct students were fixed;
**5 multi-part restructuring candidates** are recommended (not applied — see §4).

---

## 1. How answers are marked (audit baseline)

`lib/answerMarking.ts` → `markTypedAnswer` normalizes both the student input and each accepted
answer before comparing. The following are **auto-equated** and therefore do **not** need explicit
`accepted_answers` entries:

- integers/decimals; decimal ⇔ fraction (`0.5` == `1/2`); percentages (`50%` == `0.5`); thousands separators
- coordinates `(x, y)` / `x=.., y=..`; ratios `a:b` / `a to b`; clock times (24 h vs am/pm)
- trailing units (`$`, `°`, m, cm, km, kg, g, L, mL, m²/m³, h/min/s); leading `$`
- case, whitespace, unicode minus (`−`/`–`/`—`), `x²`⇔`x^2`, `x³`⇔`x^3`, `min`⇔`minimum`, `max`⇔`maximum`
- a leading `variable =` prefix (`t=4` matches `4`)

**Not** auto-equated — these need explicit accepted forms: reorderable/factored algebraic
expressions, surd/π exact-vs-decimal forms, order-differing solution sets (`2, 3` vs `3, 2`),
function/interval-notation variants, and `+C` algebraic antiderivatives (LaTeX `\frac{1}{2}` is
never what a student types).

---

## 2. Severity scale

| Tag | Meaning | Action |
|-----|---------|--------|
| **P1** | Wrong answer — mis-marks students | Fixed in this pass |
| **P2** | Correct answer wrongly rejected (missing accepted form not auto-normalized) | Safe ones fixed; algebraic ones noted |
| **P3** | Should be restructured as a multi-part question | Reported only (§4) — not applied |
| **P4** | Cosmetic (punctuation, exact-form spelling, extra-precision decimals) | Reported only |

---

## 3. Findings by file

| File | Q | P1 | P2 | P3 | P4 |
|------|---|----|----|----|----|
| nova_maths_y12_advanced_hsc_2025.json | 11 | 0 | 0 | 0 | 0 |
| nova_maths_y12_advanced_hsc_2025_graphs.json | 5 | 0 | 0 | 0 | 0 |
| nova_maths_y12_advanced_hsc_s2_2020.json | 8 | **1** | 2 | 0 | 1 |
| nova_maths_y12_advanced_hsc_section_i_clean_001.json | 19 | 0 | 0 | 0 | 0 |
| nova_maths_c23_sample.json | 20 | 0 | 0 | 1 | 1 |
| nova_maths_c36_sample_v2.json | 25 | 0 | 1 | 0 | 1 |
| nova_maths_s12_sample.json | 21 | 0 | 0 | 0 | 1 |
| nova_maths_y8_..._directed_numbers_extra_001.json | 20 | 0 | 0 | 0 | 1 |
| nova_maths_y8_..._fractions_decimals_extra_001.json | 20 | 0 | 0 | 2 | 0 |
| nova_maths_y8_..._percentages_fractions_extra_001.json | 20 | 0 | 0 | 2 | 0 |
| **Total** | **169** | **1** | **3** | **5** | **5** |

---

## 3a. P1 — incorrect answer (FIXED)

**`nova_maths_y12_advanced_hsc_s2_2020.json` · `hsc-advanced-2020-s2-q26` · part (c)**

Reducing-balance annuity: $A_n = A_{n-1}(1.005) - 800$, $A_0 = 60\,000$; closed form
$A_n = 160000 - 100000(1.005)^n$.

- The explanation used $(1.005)^{94} \approx 1.598126$ — wrong. The true value is
  $1.5981215$, giving $A_{94} = 160000 - 159812.15 = \mathbf{187.85}$ (iterating the
  recurrence 94 times gives $187.846$, confirming).
- Stored `answer` was `187.40` (the value the wrong factor produces). Worse, `accepted_answers`
  was `["187", "188"]` — `187` is not a correct rounding of `187.85` at all.

**Fix applied:** `answer` `187.40 → 187.85`; `accepted_answers` `["187","188"] → ["188","$187.85"]`
(nearest-dollar and exact-cent forms); explanation factor `1.598126 → 1.5981215` and final
result `187.40 → 187.85`.

---

## 3b. P2 — correct answers wrongly rejected (FIXED)

These add **only** correct equivalent forms, so they cannot cause a wrong answer to be accepted.

1. **`c36-sample-19a`** ("times at which the particle is at rest" → `{2, 3}`). The set is
   order-independent, but order-differing solution lists are not auto-normalized, so a student
   typing `3, 2` was rejected. **Added:** `3, 2`, `3 and 2`, `t=3 and t=2`, `t = 3 and t = 2`.

2. **`s2-2020-q17`** ($\int \frac{x}{4+x^2}dx = \frac12\ln(4+x^2)+C$). Only LaTeX `\frac{1}{2}…`
   forms were accepted — a student never types `\frac{1}{2}`, so every plain-typed correct answer
   was rejected. **Added:** `0.5ln(4+x^2)+C`, `(1/2)ln(4+x^2)+C`, `ln(4+x^2)/2+C`.

3. **`s2-2020-q18` · part (b)** ($\int (x+1)e^{2x}dx = \frac14 e^{2x}(2x+1)+C$). Same issue.
   **Added:** `0.25e^{2x}(2x+1)+C`, `(1/4)e^{2x}(2x+1)+C`, `e^{2x}(2x+1)/4+C`.

> **Systemic note.** Free-response algebraic answers (antiderivatives especially) are inherently
> fragile under string matching — the additions above cover the common renderings but not every
> equivalent form (abs-value, term reorder, `e^(2x)` vs `e^{2x}`). A durable fix is a CAS-style /
> structural comparator for `+C` and expression answers, or constraining these to a structured
> input. Tracked here as a recommendation, not done in this pass.

---

## 4. P3 — multi-part restructuring candidates (RECOMMENDED, not applied)

Per the authoring standard ([`QUESTION_AUTHORING_STANDARD.md`](./QUESTION_AUTHORING_STANDARD.md)):
*"You MUST use multi-part `question_parts` whenever a question has a shared stem with 2–4 dependent
deliverables; do not bury (a)(b)(c) inside one unstructured answer."* These were left **unchanged**
because converting them is a structural authoring change (new parts, marks, per-part answers/hints/
explanations), and the task scope was to fix incorrect answers, not restructure — flagging for a
follow-up authoring pass.

| File | source_id | Why it's a candidate | Suggested split |
|------|-----------|----------------------|-----------------|
| c23_sample | `y12adv-c23-sample-03` | "**Express** the area $A$ in terms of $x$, **then find** the dimensions…" — two deliverables; the $A(x)$ deliverable currently has no gradable answer field | (a) $A = x(20-x)$  (b) `10 cm by 10 cm` |
| y8 fractions_decimals | `y8-no-fracdec-extra-011` | "Which is larger, $3/5$ or $0.55$? Write as a decimal." — convert-then-compare | (a) $3/5 = 0.6$  (b) larger = `0.6` |
| y8 fractions_decimals | `y8-no-fracdec-extra-018` | convert $-1/4$, then compare with $-0.3$ | (a) $-1/4 = -0.25$  (b) larger = `-0.25` |
| y8 percentages_fractions | `y8-no-percentfrac-extra-013` | convert $2/5$, then compare with $45\%$ | (a) $2/5 = 0.4$  (b) larger = `0.45` |
| y8 percentages_fractions | `y8-no-percentfrac-extra-020` | convert $7/10$, then compare with $65\%$ | (a) $7/10 = 70\%$  (b) larger = `70%` |

The four Year-8 "convert-then-compare" items already accept both answer forms, so they do **not**
mis-mark students today (hence P3, not P2) — restructuring is a pedagogical/clarity improvement that
also makes the intermediate conversion step separately gradable.

**Confirmed NOT candidates** (single atomic deliverable): `c23-sample-01` (`minimum at (3,−4)` is one
stationary-point answer), all `s12_sample` independence-verdict items, `c36-sample-13/20c`, and every
directed-numbers word problem. All genuine 2+-deliverable HSC items already use `question_parts`
(`2025-q13`, `2025-q24`, `graphs-q16`, `s2-2020-q18/q21/q26/q28`).

---

## 5. P4 — cosmetic (reported only)

- `s2-2020-q19` — "Prove that…" item is not auto-markable by typed comparison (already `is_active: false`); the proof itself is correct.
- `c23-sample-10` — bare `30` (the intermediate $x$ in hundreds) not accepted; defensible since the prompt asks for "number of items" = `3000`.
- `c36-sample-16` — exact-form coverage of $\tfrac12(1-e^{-4})$ is thin (`e^-4` vs `e^(-4)` spellings); the three listed forms cover the likely inputs.
- `s12_sample` conditional-probability items (`-04,-05,-06,-07,-09,-13,-15,-19`) — accept 2–3 dp decimals; a 4-dp student answer would be rejected. Low impact (the supplied precision is the conventionally expected one).
- `y8-no-directed-extra-012` — run-on in explanation: `"… -3 + 8 = 5 This gives …"` (missing full stop). Arithmetic correct.

---

## 6. Changes applied in this pass

| File | Change |
|------|--------|
| nova_maths_y12_advanced_hsc_s2_2020.json | q26(c): answer `187.40 → 187.85`; accepted `["187","188"] → ["188","$187.85"]`; explanation factor/result corrected. q17 & q18(b): added plain-typed antiderivative forms. |
| nova_maths_c36_sample_v2.json | 19a: added reversed-order solution forms (`3, 2`, …). |

All edits re-validated with `scripts/validate-question-batch.ts` (8/8 and 25/25 pass, 0 warnings,
0 errors) and confirmed as valid JSON.

## 7. Recommended follow-ups (not in this pass)

1. Restructure the 5 P3 candidates into `question_parts` (§4).
2. Add a structural/CAS comparator for `+C` antiderivatives and reorderable algebraic answers (§3b note).
3. Fix the `q19` punctuation slip and consider extra-precision decimal acceptance for the s12 set (§5).
