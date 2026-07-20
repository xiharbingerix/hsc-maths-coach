# Year 12 Standard 2 Diagram Audit

Date: 2026-07-20

Scope: the current live `year-12-standard-2` catalogue, including all 58 lessons,
worked examples, guided practice, independent practice, mastery pools, multipart
practice, challenges, and seeded exam questions.

Standard applied: `docs/QUESTION_AUTHORING_STANDARD.md`, especially the visual
payload rules at lines 1376-1517:

- a visual payload is mandatory when a question or worked example involves a
  graph, diagram, plot, table, number line, geometric figure, solid, or network;
- the matching renderer must be used instead of prose, an edge list, coordinate
  list, or LaTeX imitation;
- `description` must be meaningful accessibility text;
- inherently visual content must be diagram-first, not given a decorative visual
  after the question is already complete; and
- a visual stimulus must be relevant and numerically consistent with the prompt.

This was a read-only audit. No lesson or question content was changed.

## Remediation completed

Status updated: 2026-07-20

The audited findings have now been remediated lesson by lesson across the live
Standard 2 catalogue:

- the course-scoped visual gate now inspects all 1,124 seeded rows and reports
  **0 required visual stimuli without a payload**;
- the stricter audit now recognises general data tables, Gantt schedules,
  conceptual networks, non-right triangles, correlations, function graphs, and
  distribution-shape questions that the original gate missed;
- 301 rows now have a top-level visual payload and two additional MCQs use
  diagrams in their choices;
- 66 worked examples have relevant authored visuals, and the broad worked-example
  visual-language scan reports no missing payloads;
- the 20 recycled Standard 1 fallback visuals have been removed from the Standard
  2 build path;
- all 14 stale worked-example visuals and the confirmed contradictory question
  diagrams have been corrected or removed;
- generic `Use the diagram to answer the question.` prefixes and the 31 vague
  accessibility descriptions are gone;
- general `dataTableDiagram` and `ganttChartDiagram` payloads and renderers were
  added, along with exact composite-solid support for a triangular prism on a
  rectangular prism, a hemisphere, a hemisphere on a cylinder, and a capsule;
  and
- regression tests now lock the missing-visual gate, the known contradiction
  fixes, payload serialization, accessible finite rendering, and all 58 lessons'
  worked-example coverage.

Verification completed: 218 repository tests passed, the course-scoped visual
audit passed with zero findings, the Standard 2 seed dry-run prepared all 1,124
rows with zero warnings, changed-file lint reported no errors, TypeScript passed,
and the Next.js production build completed successfully.

## Executive verdict

**FAIL — not publication-ready under the current Question Authoring Standard.**

The course has substantial diagram coverage, but coverage is not trustworthy as a
quality signal:

- 1,124 question-bank rows were inspected.
- 136 rows have a top-level visual payload, and one additional MCQ uses diagrams
  in its choices.
- The repository's question-visual audit reports **42 confirmed Standard 2 rows
  where a required visual is missing**.
- A broader strict-standard scan finds **95 rows** that mention or depend on a
  graph, diagram, chart, plot, table, number line, solid, shape, triangle, network,
  curve, scatterplot, or Gantt chart but have neither a top-level nor choice visual.
  The 42 are confirmed gate failures; the remaining 53 are additional review
  candidates exposed by blind spots in the current auditor.
- **95 of the 136 top-level question visuals (69.9%) are inferred after the
  question is written** and receive the prefix `Use the diagram to answer the
  question.` This conflicts with the diagram-first rule.
- **31 of 136 visual questions (22.8%) have non-compliant accessibility text**, for
  example `Right-angled triangle.`, `Line-of-sight triangle.`, `Schematic
  cylinder.`, or `Schematic rectangular prism.`
- Of the 80 worked examples with a visual, **34 (42.5%) have a verified irrelevant
  or contradictory visual**: 20 recycled generic fallback diagrams and 14 stale
  lesson-specific diagrams.
- Existing question payloads are often incomplete: 18 of 63 triangle diagrams
  have no side labels, 24 of 63 have no angle labels, and 19 of 29 solid diagrams
  have no dimension labels.

The most serious problem is therefore not visual absence. It is **false visual
confidence**: a payload exists, but it can show the wrong mathematics.

## P0 findings — mathematically wrong or misleading stimuli

### 1. Recycled worked-example diagrams are unrelated to the question

Twenty worked examples receive one of three fixed payloads selected from a lesson
slug:

- 5 copies of a graph containing `model A: y = 4x + 10`, `model B: y = 2x + 18`,
  and intersection `(4, 26)`;
- 13 copies of an arbitrary bar chart `Option A = 12`, `Option B = 18`,
  `Option C = 15`; and
- 2 copies of an arbitrary frequency chart `A = 6`, `B = 9`, `C = 5`, `D = 8`.

Affected lessons:

- generic Cartesian graph: `algebraic-relationships-revision`,
  `linear-relationships-modelling`, `simultaneous-equations-context`,
  `linear-inequalities-modelling`, `algebraic-relationships-exam-practice`;
- generic finance/rate bar chart: `ratios-rates-revision`,
  `ratios-rates-unit-conversions`, `investment-loans-revision`,
  `investment-compound-interest`, `depreciation-loans`,
  `straight-line-vs-declining-depreciation`, `annuities-revision`,
  `annuities-regular-payments`, `present-value-annuities`,
  `annuity-interest-factor-tables`, `retirement-annuity-planning`,
  `comparing-investments-risk-return`, `credit-cards-consumer-decisions`;
- generic statistics bar chart: `probability-revision`,
  `relative-frequency-probability`.

Examples of direct mismatch:

- `algebraic-relationships-revision` asks students to solve `3x - 7 = 14` and
  substitute into `y = 2x - 3`, but displays the unrelated two-model graph.
- `ratios-rates-revision` asks students to simplify `24:36` and share `$420` in
  the ratio `2:5`, but displays the arbitrary 12/18/15 option chart.
- `probability-revision` asks about a bag containing red, blue, and green marbles,
  but displays the unrelated A/B/C/D frequency chart.

Cause: `normalizeYear12Standard1Lesson()` calls a fallback `addVisuals()` routine
whose slug-based branches live in `lib/lessons/year12Standard1.ts`. Standard 2 is
sent through that Standard 1 normalizer in `lib/newCourseCatalog.ts` before its own
editorial remediation.

### 2. Fourteen lesson-specific worked-example visuals are stale or contradictory

| Lesson | Current worked-example stimulus | Current visual problem |
|---|---|---|
| `working-with-formulae-substitution` | Compound interest `A=P(1+r)^n` | Rectangle showing `A=lw` |
| `ambiguous-case-sine-rule` | `a=7, b=9, A=45°` | Diagram labels `a=8, b=11, A=35°` |
| `bearings-navigation-problems` | Bearing `050°` | Ray shown at `060°` |
| `scale-drawings-site-plans` | `4.5 cm × 3.2 cm`, scale `1:100` | `7.6 cm × 5 cm`, scale `1:250` |
| `energy-consumption-watts-kilowatts` | `2.4 kW` for `2.5 h` | Bars for `1.5 kW × 2 h` and `0.9 kW × 3.5 h` |
| `surface-area-prisms-cylinders` | Rectangular prism `8 × 5 × 3 cm` | Cylinder `r=4 cm, h=10 cm` |
| `volume-prisms-cylinders-spheres` | Cylinder `r=5 cm, h=12 cm` | Sphere `r=9 cm` |
| `composite-solids-practical` | Cylinder on rectangular prism | Capsule-cylinder section with unrelated values |
| `shares-dividends-brokerage` | 500 shares at `$3.20`, dividend `$0.16` | Purchase chart `$500/$5/$505` |
| `financial-decision-making-exam-practice` | Car depreciation | Regular-payment investment chart |
| `bivariate-data-revision` | Mean/median/mode/range of one data list | Delivery-distance scatterplot |
| `statistical-analysis-exam-practice` | Strong positive scatterplot association | Normal distribution of package masses |
| `network-flow-capacity-cuts` | Arc `A→B` has capacity 12 | Diagram gives `A→B` capacity 3 |
| `networks-exam-practice` | Method choice for connecting five buildings | Four-vertex weighted road network |

Most of these stale payloads are hard-coded in `addEditorialVisuals()` in
`lib/lessons/year12Standard2/editorialRemediation.ts`.

### 3. Existing question diagrams can contradict the prompt

Confirmed examples:

- `y12s2-rtv-g2`: the 10 m hypotenuse is attached to side `BC`, while the same
  string `10 m and angle 30°` is incorrectly used as an angle label at B.
- `y12s2-trv-i5`: the prompt explicitly says the triangle is non-right-angled,
  while the payload draws a right angle at A.
- `y12s2-nfr-g3`, `y12s2-nfr-i3`, `y12s2-nfr-m4`: parsing a route arrow adds a
  directed copy of an edge already present as an undirected weighted edge.
- `y12s2-spmst-i2`, `y12s2-spmst-m2`, `y12s2-cpa-i3`,
  `y12s2-net-exam-m4`: whole-route totals such as `A-C-D=10` are misread as a
  single edge `C-D` of weight 10; start vertex A disappears from the diagram.
- `y12s2-spmst-m8`: the prompt describes three P-to-T routes, but the payload
  omits P and most route structure.
- `y12s2-flow-m8`: a flow network is rendered with undirected edges, so capacity
  direction is lost.
- `y12s2-net-term-i2`: the diagram already contains edge `C-E`, while the prompt
  says a new `C-E` edge is added and then counts it again. In a simple network,
  this is not a valid update.

Cause: `applyQuestionVisualStandards()` in
`lib/lessons/visualAuthoringStandards.ts` infers a diagram by regex from already
written prose. It is not capable of reliably distinguishing edge weights from
route totals, paths from directed edges, or textual angle fragments from diagram
labels.

## P1 findings — missing required visuals

### 4. The automated question-bank visual gate finds 42 definite omissions

Breakdown:

| Suggested renderer | Count |
|---|---:|
| `networkDiagram` | 23 |
| `solid3DDiagram` | 9 |
| `scatterPlotDiagram` | 5 |
| `twoWayTableDiagram` | 2 |
| `numberLineDiagram` | 1 |
| `bearingsDiagram` | 1 |
| `cartesianGraph` | 1 |

Confirmed IDs:

- number line: `y12s2-ineq-i5`;
- bearings/triangle: `y12s2-bear-i3`, `y12s2-bear-m8`;
- composite solids: `y12s2-comp-g1`, `y12s2-comp-g4`, `y12s2-comp-i1`,
  `y12s2-comp-i3`, `y12s2-comp-i5`, `y12s2-comp-m1`, `y12s2-comp-m5`,
  `y12s2-comp-m7`, `y12s2-comp-m8`;
- scatterplots: `y12s2-biv-g3`, `y12s2-biv-m4`, `y12s2-biv-m10`,
  `y12s2-corr-i1`, `y12s2-corr-i4`;
- two-way tables: `y12s2-relfreq-i4`, `y12s2-relfreq-m5`;
- missing referenced table: `y12s2-eft-g2`;
- network flow/revision: `y12s2-nfr-g1`, `y12s2-nfr-g2`, `y12s2-nfr-g4`,
  `y12s2-nfr-i1`, `y12s2-nfr-i4`, `y12s2-nfr-m1`, `y12s2-nfr-m2`;
- terminology: `y12s2-net-term-i4`, `y12s2-net-term-m4`,
  `y12s2-net-term-m5`;
- shortest path/MST: `y12s2-spmst-g1`, `y12s2-spmst-g2`;
- critical-path revision: `y12s2-cpr-g2`, `y12s2-cpr-i2`,
  `y12s2-cpr-m2`;
- critical-path analysis: `y12s2-cpa-i2`, `y12s2-cpa-m4`,
  `y12s2-cpa-m8`, `y12s2-cpa-m9`, `y12s2-cpa-m10`;
- Gantt/dummy activity: `y12s2-gcd-i1`;
- exam practice: `y12s2-net-exam-i2`.

### 5. The current auditor under-detects strict-standard failures

The broad scan found 95 visual-reference rows without a payload. Important blind
spots include:

- `y12s2-eft-g3`, `y12s2-eft-g4`, `y12s2-eft-m3`, and `y12s2-eft-m6` all depend
  on the same absent sport survey table as `y12s2-eft-g2`, but are not flagged
  because they say `From the sport survey` rather than `table`.
- Numerous scatterplot questions describe a complete visual pattern in prose but
  are not flagged unless they match the auditor's narrower pattern.
- General value tables and finance tables have no general table renderer. The
  registry only provides specialised table-like renderers such as two-way and
  stem-and-leaf displays.
- Gantt questions (`y12s2-gcd-i3`, `i4`, `m1`, `m7`, `m10`) have no Gantt payload
  and there is no Gantt renderer in the registry.
- Several `Project Alpha` questions rely on an earlier network/worked example and
  are not self-contained as seeded bank rows, notably `y12s2-gcd-g3`, `m3`, `m6`,
  `m8`, and `m9`.

The standard says that if no renderer fits, a renderer must be added before
authoring. General tables and Gantt charts therefore need an explicit product
decision rather than prose workarounds.

## P1 findings — accessibility and diagram-first compliance

### 6. Accessibility descriptions are too vague

Thirty-one question payloads fail the standard's accessibility intent. The
repeated descriptions are:

- `Right-angled triangle.` — 8 occurrences;
- `Line-of-sight triangle.` — 4 occurrences;
- `Schematic cylinder.` — 10 occurrences;
- `Schematic rectangular prism.` — 7 occurrences;
- `Schematic sphere.` — 2 occurrences.

These labels omit the dimensions, marked angle, unknown, orientation, and
relationship the student is expected to use. They cannot substitute for the visual
for a student who cannot see it.

### 7. Automatic after-the-fact inference violates diagram-first authoring

The 95 inferred question visuals keep all numerical stimulus in prose, prepend a
generic sentence, clear the LaTeX field, and attach a best-effort payload. This has
three consequences:

1. the prompt and diagram duplicate the same stimulus;
2. the question remains answerable without the diagram, so the diagram is often
   decorative rather than assessed; and
3. parser mistakes silently become mathematical misinformation.

Five worked examples also present a full LaTeX table/edge table and the matching
visual payload at the same time:

- `expected-frequency-contingency-tables`;
- `network-concepts-terminology`;
- both worked examples in `shortest-paths-minimum-spanning-trees`; and
- `critical-path-analysis`.

This duplicates or fakes the visual stimulus instead of letting the payload carry
it.

## P2 findings — coverage and relevance

### 8. Question-level renderer coverage is heavily skewed

The 136 top-level visual question rows use only five renderer types:

| Renderer | Count |
|---|---:|
| `triangleDiagram` | 63 |
| `solid3DDiagram` | 29 |
| `networkDiagram` | 25 |
| `bearingsDiagram` | 13 |
| `cartesianGraph` | 6 |

There are no top-level question payloads for scatterplots, normal distributions,
two-way tables, general tables, Gantt charts, or number lines, despite live course
content in those areas. The single choice-visual question is
`y12s2-net-term-g1`.

Only 19 of the 58 lessons have a visual question. Every lesson appears to have at
least one visual only because the worked-example fallback injects one. That metric
must not be used as evidence of quality.

### 9. Some valid payloads are still decorative

Examples include `y12s2-expinv-g2`, `y12s2-expinv-m6`, and several formula-first
triangle/solid questions where all data remains in the prompt and the diagram adds
no new information. These should either be rebuilt as diagram-reading questions or
have the unnecessary payload removed after the underlying coverage requirement is
met elsewhere with genuine diagram-first items.

## Recommended remediation order

1. **Disable the Standard 1 generic visual fallback for Standard 2.** Do not ship
   any visual selected only from a lesson slug.
2. **Remove or replace the 34 verified bad worked-example visuals.** A wrong visual
   is more harmful than no visual.
3. **Replace regex-inferred question payloads with explicitly authored payloads in
   the source question objects.** Start with the confirmed contradictory IDs in
   P0.
4. **Fix the 42 confirmed missing-visual rows**, then adjudicate the remaining 53
   strict-scan candidates.
5. **Add renderer support for general data/value tables and Gantt charts**, or make
   an explicit standards amendment if those visuals are intentionally out of
   scope.
6. **Rewrite all 31 vague descriptions** so each states the actual values,
   orientation, marked features, and unknown.
7. **Strengthen the audit gate** to detect:
   - `above`, `same`, `from the survey`, and earlier-question dependencies;
   - Gantt charts and general tables;
   - a directed and undirected copy of the same network edge;
   - prompt/payload entity and number mismatches;
   - empty dimension/side/angle labels; and
   - generic fallback descriptions/payload fingerprints.
8. **Add course-scoped regression tests** for the repaired diagrams, checking the
   seeded `diagram_data` type and the exact semantic values for high-risk network,
   trig, solid, statistics, and Gantt/table questions.
9. **Complete a rendered visual QA pass** at desktop and mobile widths after the
   semantic fixes. The in-app preview was unavailable during this audit, so this
   report does not claim pixel-level verification of clipping, overlap, font size,
   or responsive layout.

## Commands and checks used

- `npm.cmd run audit:question-visuals -- --details`
- `npm.cmd run audit:lessons`
- `npm.cmd run audit:questions`
- course-scoped inspection of `collectAllQuestions(["year-12-standard-2"])`
- course-scoped traversal of all 58 live lessons and their worked examples
- payload-level checks for renderer type, description quality, missing labels,
  duplicate/mixed network edges, and prompt/payload consistency

The lesson and general question audits report no Standard 2 failures because they
primarily validate structure and mechanical quality. They do not currently prove
diagram relevance or semantic consistency. The dedicated question-visual audit and
the payload-level review are the decisive checks for this report.
