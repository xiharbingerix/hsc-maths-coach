# Year 12 Standard 2 Editorial Review

## Remediation Status (Completed)

The findings below describe the pre-remediation course. The remediation was
completed against the live catalogue output:

- all 58 lessons retain the required 4 guided, 5 independent and 10 mastery
  questions;
- all 174 mastery Q8-Q10 positions now use explicitly authored transfer,
  modelling, interpretation or misconception-diagnosis questions;
- generated mastery pools and generated multipart wrappers remain disabled;
- the live generic-explanation fallback count is zero;
- all lessons flagged as visual-first now carry relevant renderer payloads;
- `npm run audit:lessons` reports zero Year 12 Standard 2 failures and zero
  Year 12 Standard 2 warnings;
- `npm run audit:questions` reports no Year 12 Standard 2 findings; and
- `npx tsc --noEmit` passes.

Repo-wide audit findings outside Year 12 Standard 2 remain out of scope for
this remediation.

## Verdict

Year 12 Standard 2 is structurally compliant, but it is not yet consistently
high quality under the updated Practice Question and Question Authoring
standards.

The automated audit now reports zero Standard 2 warnings. A human-style review
of the built course found material pedagogical defects that the audit does not
measure:

- mastery Q8-Q10 are usually direct procedure or recognition rather than D5;
- 387 questions use generic or weakly specific explanation patterns;
- several explanations are mathematically unrelated to their questions;
- some canonical answers were rewritten into unnatural phrases to satisfy an
  audit heuristic;
- generic visual fallbacks are present in lessons where the graph does not
  support the question;
- generated multipart practice reused category blueprints instead of being
  explicitly authored for the lesson.

The course should not be described as guaranteed high quality until the
remediation below is completed and spot-checked.

## Review Scope

- 58 live lessons
- 232 guided questions
- 290 independent questions
- 580 mastery questions
- 174 mastery positions designated D5 (Q8-Q10)
- built output from the live catalogue, not source-file appearance alone

Review criteria:

- mathematical correctness of answer and explanation;
- cognitive demand at the assigned section position;
- production versus recognition;
- misconception quality and distractor plausibility;
- explanation specificity;
- accepted-answer usability;
- visual relevance;
- compliance with authored-pool and multipart rules.

## Critical Findings

### 1. Mastery Q8-Q10 are generally not D5

The late mastery layer is dominated by direct substitution, recall, formula
selection, or one-step calculation. Representative failures include:

- Algebra revision Q8: substitute x = 0 into y = 2x + 7.
- Reciprocal relationships Q8: solve y = 15/x when y = 3.
- Exponential models Q8: state the multiplier for a 15% decrease.
- Formulae Q9: calculate speed from 300 km and 2.5 h.
- Trigonometry revision Q10: use Pythagoras for sides 8, 15, 17.
- Normal distribution Q10: recall that empirical-rule percentages are
  approximate.
- Network terminology Q9: recall the word "weighted".
- Critical path revision Q10: recall that a critical path has zero float.

These are mostly D2-D3 tasks. D5 requires non-routine transfer, modelling,
constraint reasoning, interpretation, or synthesis.

Required remedy:

- explicitly rewrite all 174 Q8-Q10 positions;
- make them independent scenarios rather than artificial fragments of one
  shared stem;
- retain auto-markable answers;
- use multipart practice only for genuinely dependent shared-stem tasks.

### 2. Incorrect or unrelated explanations

The review found explanations that are not merely generic but wrong for the
question:

- linear modelling Q8 explains C = 25 + 0.12g using the definition of mode;
- right-angled trig/radians Q10 refers to an angle of depression and an
  opposite side of 80 when neither appears in the question;
- normal distribution revision Q9 invents a mean calculation of 180 / 2 for
  the statement that a score equal to the mean is at the mean;
- critical path analysis Q9 explains float using prerequisite finish times
  instead of latest start minus earliest start;
- expected-frequency questions are explained as prediction, residual, or
  standardisation tasks;
- several network-flow questions use a generic path/activity-time explanation
  for capacity and cut calculations.

Required remedy:

- replace broad regex-generated explanations with topic-specific authored
  solutions;
- numerically verify every changed answer against its explanation;
- add regression tests for known cross-topic explanation mismatches.

### 3. Generic explanations remain widespread

The built course contains 387 explanations matching generic fallback families,
including:

- "Use the relationship stated in the prompt...";
- "The correct option is the one that matches...";
- "Read what the network quantity represents...";
- broad statistical or trig feedback that does not show the actual working.

These often exceed 40 characters but do not meet the requirement for a
question-specific worked solution.

Required remedy:

- rewrite each flagged explanation with the actual substitution, equation,
  comparison, or interpretation;
- for MCQ, explain why the correct choice is right and identify the
  misconception represented by at least the strongest distractor;
- prohibit generic fallback text in the Standard 2 build path.

### 4. Audit-friendly canonical answers reduce usability

Some answers were changed to phrases such as "value is 18", "result is 150",
or "amount is 200" to avoid the prompt-reveals-answer warning. These forms are
awkward for students and disguise legitimate interpretation questions.

Required remedy:

- improve the auditor so intentional interpretation prompts are distinguishable
  from accidental answer leakage;
- restore natural canonical answers with units or concise labels;
- retain common numeric and labelled variants in acceptedAnswers.

### 5. Visual presence does not guarantee visual relevance

A generic Cartesian graph is added when no topic-specific visual is found.
That can make the audit pass while adding no pedagogical value to finance,
networks, measurement, probability, or time-zone questions.

Required remedy:

- remove generic graph fallback visuals;
- add only relevant payloads:
  - triangle and bearings diagrams for trigonometry/navigation;
  - solid and net diagrams for measurement;
  - scatterplots and normal curves for statistics;
  - probability trees and two-way tables for probability;
  - network diagrams for shortest path, flow, and critical path;
  - cash-flow timelines or tables where supported for finance;
- manually verify that labels and values match the associated question.

### 6. Generated multipart practice violated the standard

The Standard 2 enrichment layer generated the same category-level multipart
blueprint across multiple lessons. The updated standard requires explicitly
authored shared-stem questions and forbids backfilled wrappers.

Action taken:

- generated multipart backfill has been disabled;
- only explicitly authored lesson multipart items are preserved.

### 7. Mastery pool status

The former 30-item mastery pools were template-expanded recognition questions.
They violated the updated authoring standard and have been disabled.

Required remedy if pools are restored:

- author lesson-specific questions explicitly;
- tag genuine difficulty;
- ensure D4-D5 items require mathematics, not method naming;
- review every pool item independently of the fixed mastery quiz.

## Remediation Order

1. Correct all known wrong explanations.
2. Replace all 174 late-mastery questions with genuine D5 authored tasks.
3. Rewrite the 387 generic explanations.
4. Remove irrelevant generic visuals and add topic-relevant payloads.
5. Restore natural canonical answers and improve the answer-leak audit rule.
6. Manually verify calculations, units, accepted answers, and distractors.
7. Review optional multipart items only where a genuine shared stem exists.
8. Re-run automated checks and manually spot-check at least one lesson per unit.

## Acceptance Criteria

The course is ready for a high-quality claim only when:

- every mastery Q8-Q10 earns D5 through transfer, modelling, interpretation,
  constraint reasoning, or synthesis;
- no explanation is generic, cross-topic, or numerically inconsistent;
- MCQ distractors represent plausible misconceptions;
- visuals are relevant and numerically consistent with their questions;
- no generated mastery pool or multipart backfill is present;
- all lesson and question audits have zero Standard 2 findings;
- a manual sample from every unit passes independent mathematical review.

## Verification Completed

- Standard 2 lesson audit: zero Standard 2 warnings.
- TypeScript: passes.
- Standard 2 live-output structural scan: zero count or MCQ-distribution issues.
- Standard 2 live-output hygiene scan: zero mechanical phrases, broken encoding
  code points, short explanations, or typed answers without variants.
- Repo-wide question audit: no remaining Standard 2 finding; unrelated findings
  remain elsewhere in the repository.

These checks establish structural and technical compliance. They do not
override the editorial defects documented above.
