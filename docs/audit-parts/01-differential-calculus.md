# Differential Calculus Audit

## lib/lessons/differentialCalculus.ts

Audited all 12 exported `ExplicitLesson` objects (Year 12 Mathematics Advanced — Differential Calculus). The file contains **no factory/helper functions**; every question is a plain object literal, so the literal `answer`, `acceptedAnswers`, and `explanation` are exactly what the student sees. All `guidedPractice`, `independentPractice`, `masteryQuiz`, `masteryQuiz[].steps`, and `multiPartPractice[].parts` were independently recomputed.

Lessons covered: `rate-of-change`, `differentiating-polynomial-terms`, `differentiating-polynomial-functions`, `tangents-and-normals`, `stationary-points`, `increasing-decreasing-functions`, `first-derivative-test`, `second-derivative-test`, `curve-sketching`, `optimisation`, `rates-of-change-applications`, `mixed-exam-practice`.

### Mathematical correctness

Every numeric and algebraic answer was recomputed and is **correct**. Representative spot-checks (all confirmed):

- `roc-mastery-fp2` — $f(x)=x^2$, $\frac{(3+h)^2-9}{h}=6+h\to 6$. Answer C ($6$) correct; distractors all wrong. ✓
- `tan-norm-mastery-9` — $y=x^3$, $m_t(1)=3$, $m_n=-\tfrac13$, point $(1,1)$, $c=\tfrac43$. Answer `4/3` correct. ✓
- `stationary-mastery-3/4` — $y(-2)=32$, $y(4)=-76$. ✓
- `stationary-ind-4` — $f(-2)=21$, $f(2)=-11$. ✓
- `fdt-mastery-4` — $f(1)=6$, $f(3)=2$. ✓
- `curve-guided-2` — $f(\tfrac52)=-\tfrac14$. ✓
- `optimisation-mastery-9` — $x=12.5$, $y=25$. ✓
- `roc-mp-1` — $v(2)=-3$, rest at $t=1,3$, $v(2)<0$. ✓
- `tan-norm-mp-1/2/3`, `stat-mp-1` multi-part chains — all parts and their cross-references correct. ✓
- All MCQ labelled-correct choices are correct and no distractor is also correct. ✓

No P1 (wrong-answer) issues found.

### Accepted-answer gaps (P2)

- [P2] rates-of-change-applications::rates-guided-1 — Free-text answer is `s'(t)` with no `acceptedAnswers`. A student who writes the equally-correct Leibniz form `ds/dt` would be marked wrong; this is not auto-normalized. Note the parallel mastery step `rates-mastery-6` (step 1) *does* accept `dP/dt` alongside `P'(t)`, so the gap is inconsistent within the same lesson. Current: answer `"s'(t)"`, no accepted alts. Proposed: add `acceptedAnswers: ["ds/dt"]`. Evidence: both $s'(t)$ and $\frac{ds}{dt}$ denote the derivative; only the prime form is accepted.

- [P2] mixed-exam-practice::mixed-guided-1 — Free-text answer is `derivative`. The prompt asks which calculus *skill* is needed, and the explanation states "The skill needed is **differentiation**." A student typing the word the explanation uses ("differentiation"), or the verb "differentiate", would be rejected. Current: answer `"derivative"`, no accepted alts. Proposed: `acceptedAnswers: ["differentiation", "differentiate", "differentiating"]`. Evidence: explanation itself uses "differentiation" as the intended response.

### Multi-part candidacy (P3)

No P3 findings. The author has already extracted the genuinely multi-deliverable questions into `multiPartPractice` (`roc-mp-1`, `tan-norm-mp-1/2/3`, `stat-mp-1`) and into the step-based mastery items in `rates-of-change-applications` (`rates-mastery-1/6/10`). Single-answer practice questions each have one conventionally-atomic deliverable; explanations that compute extra context (e.g. listing both intercepts when only the y-intercept is asked) do not bury a second *graded* deliverable, so they are out of scope for P3.

### Other quality

- No broken/unclosed LaTeX, mojibake, draft wording ("Wait, recalculate"), or `\$` currency-escaping issues found.
- `acceptedAnswers` containing decimal/fraction equivalents that the runtime already auto-equates (e.g. `-1/4` with `["-0.25"]`, `-1/5` with `["-0.2"]`, `4/3` with `["1.3333333333333333"]`, coordinate forms like `["2,-3","2, -3","(2, -3)"]`, and `−3`/`−1` unicode-minus duplicates) are **redundant but harmless** — not flagged.
- MCQ `choices`/`answer` label alignment is correct throughout; no `question_type`/`choices` mismatch.

### Minor note (sub-P4, not flagged)

`roc-mp-1` top-level `answer: "-3"` reflects only part (a); parts (b)=`1`, (c)=`negative` are graded independently via `parts`, so the container `answer` is not used for marking. Consistent with the multi-part schema — no issue.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| differentialCalculus.ts | 0 | 2 | 0 | 0 |

**P1 list:** None.

No P1 issues. Two P2 accepted-answer gaps (both free-text derivative-notation / skill-name questions): `rates-guided-1` (reject `ds/dt`) and `mixed-guided-1` (reject "differentiation"/"differentiate").
