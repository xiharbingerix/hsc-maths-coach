# Audit — Functions & Graphing Techniques

## lib/lessons/functionsGraphingTechniques.ts

### Scope
The file exports 11 `ExplicitLesson` objects (Year 12 Mathematics Advanced, Functions /
Graphing techniques) plus an outline array and an aggregate array. There are **no factory /
helper functions** — every `PracticeQuestion` is a literal object, so the student-facing
`answer`, `acceptedAnswers`, `choices`, `hint`, and `explanation` are exactly as written. No
`parts`/`steps`/`multiPartPractice` are used anywhere in the file; all gradeable items are
single-answer free-response or MCQ.

Lessons audited (every `guidedPractice`, `independentPractice`, `masteryQuiz` item):
- `domain-range-function-notation`
- `graph-transformations`
- `reflections-stretches-translations`
- `intercepts-key-features`
- `asymptotes-reciprocal-graphs`
- `solving-equations-inequalities-graphically`
- `modelling-with-functions`
- `mixed-functions-graphing-exam-practice`
- `exponential-logarithmic-graphs`
- `absolute-value-functions`
- `inverse-functions`

### Mathematical correctness
Every gradeable answer was independently recomputed and is **correct**, and every
`explanation` final result matches its `answer`. Spot-checks of the non-trivial items:

- `domain-ind-1`: $g(5)=25-20=5$. OK.
- `domain-mastery-2`: $(x+1)^2+4(x+1)=x^2+2x+1+4x+4=x^2+6x+5$. OK.
- `features-mastery-10`: $x^2-2x-8=(x-4)(x+2)$ → $x=4,-2$; y-int $-8$. OK.
- `features-ind-5`: $x^2-4x-5=(x-5)(x+1)$ → $x=5,-1$. OK.
- `graphsolve-mastery-3`: $x^2-3x-4=(x-4)(x+1)$ → $x=-1,4$. OK.
- `graphsolve-mastery-9`: $x^2-2x-3=(x-3)(x+1)$ → $x=-1,3$. OK.
- `mixed-fg-ind-5`: $x^2-5x+6=(x-2)(x-3)$ → $x=2,3$. OK.
- `mixed-fg-mastery-9`: $(x-1)^2=9$ → $x=4,-2$. OK.
- `model-composite-m1`: $g(1)=4,\ f(4)=16$. OK. `model-composite-m2`: $g(3)=9,\ 2(9)-1=17$. OK.
  `model-composite-m3`: $f(g(x))=(3x+1)^2$ (choice B); distractors A/C/D are all distinct
  incorrect expansions — no ambiguity. OK.
- Inverse functions all verified by solving $x=f(y)$:
  `inv-guided-3` $x+6\to x-6$; `inv-ind-2` $3x+1\to(x-1)/3$ (D);
  `inv-mastery-3` $2x-7\to(x+7)/2$ (B); `inv-mastery-6` $(x-4)/3\to 3x+4$ (A). OK.
- Transformation MCQs (direction/scale/reflection) all keyed correctly, including the subtle
  composite cases: `rst-mastery-10` $f(-x+2)=f(-(x-2))$ = reflect in y-axis then right 2 (B);
  `asym-mastery-9` $-\tfrac{2}{x+4}+1$ = left 4, reflect x-axis, ×2, up 1 (B);
  `mixed-fg-ind-2` $-2f(x+1)$ = left 1, reflect x-axis, ×2 (C). OK.
- Asymptote MCQs and `x=`/`y=` free-response items all correct; the `x-h`/`+k` sign handling
  is right throughout (`asym-ind-3`, `asym-mastery-3`, `mixed-fg-mastery-10`, etc.).
- Absolute-value items: `abs-mastery-8` $|x-2|=4\Rightarrow x=6,-2$ (D);
  `abs-mastery-9` $|f(-2)|=5\Rightarrow(-2,5)$ (C); `abs-mastery-10` $f(|-4|)=f(4)=-1\Rightarrow(-4,-1)$ (A). OK.

No MCQ has a second correct/ambiguous distractor.

### Multi-part candidacy (P3)
No genuine P3 candidates. The file is deliberately built from atomic single-deliverable items;
the multi-feature work (vertex + intercepts + axis + opening) only appears in **worked
examples**, which are not graded. `model-mastery-4` ("Find the y-intercept value and interpret
it as the initial amount") folds an interpretation into the prompt, but the graded deliverable
is a single number and the interpretation is a conventional restatement — not worth restructuring.

### Accepted-answer adequacy
All two-value solution-set answers carry generous `acceptedAnswers` arrays covering the reversed
order, the `x=`-prefixed forms, and the "a and b" form (e.g. `features-guided-1`, every
`graphsolve-*` solve item, all `abs-*` solve items). All single `x=…`/`y=…` answers include the
bare-number variant (and the runtime strips a leading `variable =` anyway). Coordinate answers
rely on auto-normalisation of `(x,y)` and also list spacing variants. No order-sensitive set was
found without its reverse listed.

### Findings

- [P2] graph-transformations::domain-ind-2 / (file: domain-range-function-notation) — algebraic
  answer `2x+7` (acceptedAnswers `["2x + 7"]`) does not accept the commuted form. Current: `2x+7`,
  `2x + 7`. Proposed: also accept `7+2x` / `7 + 2x`. Evidence: reorderable expressions are not
  auto-equated per the marking spec; a student writing $f(x+2)=3+2(x+2)\dots=7+2x$ would be
  mis-rejected. Low impact (canonical order strongly expected).
- [P2] domain-range-function-notation::domain-mastery-2 — answer `x^2+6x+5`
  (acceptedAnswers `["x^2 + 6x + 5"]`) does not accept reordered equivalents. Current:
  `x^2+6x+5`. Proposed: optionally accept `5+6x+x^2`. Evidence: polynomial term-reordering is not
  auto-normalised; very low impact since descending order is the universal convention here.
- [P4] (no math errors) — `inv-guided-1` / `inv-ind-1` prompts ("Use the inverse relationship.")
  only display `f(4)=9` / `g(-2)=5` without explicitly stating what to find; the answer (`4` / `-2`)
  and explanation ($f^{-1}(9)=4$ / $g^{-1}(5)=-2$) are correct and consistent, but the wording is
  terse. Cosmetic only.

No P1 issues. No mojibake, no unclosed LaTeX, no draft wording, no `\$` escaping problems, and no
`question_type`/`choices` mismatch were found.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| functionsGraphingTechniques.ts | 0 | 2 | 0 | 1 |

### P1 list
None.
