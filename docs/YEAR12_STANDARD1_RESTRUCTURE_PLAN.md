# Year 12 Standard 1 — Restructure to NESA Textbook Layout

## Context

The `year-12-standard-1` course is currently an ad-hoc, in-development 5-unit / 21-lesson pathway (`status: "in_progress"`) that was scaffolded with crossover content from Standard 2. The user wants it realigned to the standard **NESA Year 12 Mathematics Standard 1 textbook structure** — 9 chapters, each broken into the textbook's lettered sections (1A, 1B, …).

Auditing the current course against that layout surfaced three structural problems the restructure must resolve:

- **Networks and paths (ch2) is entirely missing** — 0 references to networks / spanning trees / Eulerian / shortest path anywhere in Standard 1.
- **Reciprocal graphs (9E/9F)** and a dedicated **Pythagoras (4A/4B)** lesson don't exist (0 / scattered hits).
- Several current lessons (probability, univariate data displays, relative frequency, the 3 "exam practice" lessons) **have no home** in the 9-chapter Year-12 layout (they're Year-11-level topics).

**Decisions confirmed with user:** (1) **section-level granularity** — each lettered section becomes its own lesson (~57 lessons); (2) **full build in one plan** — restructure *and* author all net-new content including the whole Networks unit; (3) **keep orphaned content** by folding it into the nearest unit (no authored content is lost).

Intended outcome: a complete, NESA-faithful 9-unit Standard 1 course, with existing authored teaching content reused as seed material and student progress preserved.

## Target structure (9 units, 57 sections + 3 folded orphans)

Slugs are **pure topic-kebab** (matches existing convention `linear-relationships-modelling`); the "1A/1B" label lives in the lesson `title` only, so NESA reordering never churns slugs. Unit array order = NESA chapter order.

1. **Rates** (`rates`): 1A Rates, 1B Unitary method, 1C Using rates to compare, 1D Speed as a rate, 1E Distance–time graphs, 1F Fuel consumption rate, 1G Heart rate, 1H Blood pressure
2. **Networks and paths** (`networks-and-paths`, **all net-new**): 2A Networks, 2B Travelling a network, 2C Drawing a network diagram, 2D Eulerian & Hamiltonian walks, 2E Network problems, 2F Minimal spanning trees, 2G Shortest path
3. **Investments** (`investments`): 3A Simple interest, 3B Simple interest graphs, 3C Compound interest – future value, 3D Compound interest – present value, 3E Compound interest graphs, 3F Appreciation and inflation
4. **Right-angled triangles** (`right-angled-triangles`): 4A Pythagoras, 4B Applying Pythagoras, 4C Trig ratios, 4D Using the calculator, 4E Finding an unknown side, 4F Finding an unknown angle, 4G Solving practical problems, 4H Angles of elevation & depression, 4I Compass & true bearings
5. **Simultaneous linear equations** (`simultaneous-linear-equations`): 5A Linear functions, 5B Linear models, 5C Simultaneous equations graphically, 5D Simultaneous equation models, 5E Break-even analysis
6. **Further statistical analysis** (`further-statistical-analysis`): 6A Constructing a scatterplot, 6B Using a scatterplot, 6C Line of best fit, 6D Interpolation & extrapolation, 6E Statistical investigation **+ folded:** probability-and-chance, data-displays-summary-statistics, relative-frequency-expected-value
7. **Scale drawing** (`scale-drawing`): 7A Ratios, 7B Dividing a quantity in a ratio, 7C Similarity & scale factors, 7D Scale drawing, 7E Plans and elevations
8. **Depreciation and loans** (`depreciation-and-loans`): 8A Declining-balance depreciation, 8B Reducing-balance loans, 8C Credit cards, 8D Credit card statements, 8E Fees and charges
9. **Graphs of practical situations** (`graphs-of-practical-situations`): 9A Exponential graphs, 9B Exponential models, 9C Quadratic functions, 9D Quadratic models, 9E Reciprocal graphs, 9F Reciprocal models, 9G Miscellaneous problems

## Slug & progress-preservation strategy

The old 5 units fan out into 9, so 3 unit slugs are **renamed** from their nearest old unit (to minimise diagnostics edits) and 6 are **new**:

| Reuse (rename) | New |
|---|---|
| `trigonometry-ratios-rates`→`rates`, `investments-loans-annuities`→`investments`, `statistics-and-data`→`further-statistical-analysis`, `algebraic-relationships`→`simultaneous-linear-equations` | `networks-and-paths`, `right-angled-triangles`, `scale-drawing`, `depreciation-and-loans`, `graphs-of-practical-situations` (`measurement-geometry` is dissolved) |

**Keep these exact existing lesson slugs** (so their override content + normalize patches + checkpoints survive) on the section that inherits the bulk of their content:
`right-angle-trig-applications` (→4G, has `stableSkillId`+checkpoints+challenge), `rates-practical-problems` (→1C, checkpoints), `investment-compound-interest` (→3C, challenge), `depreciation-loans` (→8A, challenge), `data-displays-summary-statistics` (→6E, challenge), `quadratic-models` (→9D, has `addVisuals`+`editorialRewrite`), `exponential-inverse-variation` (→9B, has `addMissingQuestions`), `right-angle-trigonometry` (→4C, `addVisuals`), `linear-relationships-modelling` (→5B), `simultaneous-equations-context` (→5D), `bivariate-data-scatter-plots` (→6A), `line-of-best-fit-predictions` (→6C), `scale-drawings-and-plans` (→7D), `probability-and-chance`, `relative-frequency-expected-value` (folded into ch6).

**Progress rule (highest risk):** progress persists by `stableCheckpointId`. Renaming lesson slugs / reordering units is safe. When a checkpointed lesson is split, the original slug + its exact `stableSkillId`/`stableCheckpointId`s stay on the inheriting section; new sibling sections get **fresh** checkpoint IDs (`y12s1-{topic}-cp-a`). **Never** reuse or rename an existing checkpoint ID.

**Orphaned/retired slugs** (`measurement-area-volume`, `annuities-regular-payments`, the 3 `*-exam-practice` lessons): keep as hidden/optional lessons to preserve any progress rather than deleting outright — confirm progress-store key before retiring. `measurement-area-volume` has no NESA-Std1 home; flag for retirement.

## Coupling surface to update (in this order, per unit/wave)

Downstream depends on upstream slugs existing:

1. **Catalog units** — `lib/newCourseCatalog.ts:963-1209`: rewrite `units[]` (new slugs, section titles, carry `stableSkillId`/checkpoints on inheriting sections, fresh IDs on new ones). Array order = NESA order.
2. **Override registrations** — `lib/newCourseCatalog.ts:278-300`: add `??`-chained calls for each new override fn.
3. **Override functions** — `lib/lessons/year12Standard1.ts`: add new `year12Standard1{Section}LessonOverride` fns, AND **update the `unit.slug` guard on every moved/kept override** (highest execution-risk step — a stale guard silently returns `null` → generic content, no error).
4. **Normalize patch maps** — same file: `addVisuals` (switch at :8500), `addMissingQuestions` (:8376), `editorialRewritePriorityLesson` (question-id cases at :8831) — migrate any renamed slug/question-id, or lose visuals/patches silently. Move the inverse-variation patch from the exponential section to the reciprocal section (9E/9F).
5. **Diagnostics** — `lib/diagnostics/year-12-standard-1.ts`: update the 3 unit slugs + `startHref` + per-question `unitSlug`.
6. **Exam** — `lib/exams/year12Standard1Paper1.ts`: update the 9 `topicSlug`s to surviving slugs (`remediationHref` is unit-root, no 404 risk).
7. **Challenges** — `lib/challenges/index.ts:89-91`: keys are `right-angle-trig-applications`, `data-displays-summary-statistics`, `depreciation-loans` — **no change** if those slugs are preserved (they are).
8. **Editorial D5** — `lib/lessons/year12Standard2/editorialRemediation.ts`: **no change**; only fires for `course.slug === "year-12-standard-2"`, independent of Standard 1's copies of the shared slugs.

**Override authoring pattern** (replicate from existing fns, e.g. `year12Standard1RightAngleTrigonometryLessonOverride` at `year12Standard1.ts:5`): guard on all three slugs → return `Partial<ExplicitLesson>` with `description`, `learningIntention`, `successCriteria[]`, `teaching{paragraphs,latexBlocks}`, `workedExamples[]`, `guidedPractice[]` (≥4), `independentPractice[]` (≥5), `commonMistakes[]`, `masteryQuiz[]` (≥10), `masteryPassMark`. Use unprefixed question IDs (prefix `y12s1-` is auto-added). Reuse helpers `practicalChoice`, `measurementAnswer`, `dataAnswer` from `questionHelpers`. Author ≥4/5/10 because `normalizeYear12Standard1Lesson` (`:9269`) truncates extras and auto-fills shortfalls with low-quality generic questions.

## Implementation waves (one plan, shippable incrementally)

Each wave is independently shippable: unresolved sections degrade to generic content; routes (`app/course/year-12-standard-1/[unitSlug]/[lessonSlug]/page.tsx`) accept any catalog slug.

- **Wave 0 — Skeleton + remap (no new authoring).** Rewrite catalog to all 9 units / 57 sections; carry stable IDs; update every override guard's `unit.slug`; migrate normalize patch maps; fix diagnostics (3 units + hrefs) and exam topicSlugs. Existing content lands on its primary section; unauthored sections render generic interim content.
- **Wave 1 — Split chunky lessons (reuse seed, light authoring).** Author sibling sections seeded from existing overrides: ratios/rates→1A/1B/7A/7B, trig→4C/4E/4F, rates→1C/1D/1F, linear→5A/5B, quadratic→9C/9D, simultaneous→5C/5D, CI→3A/3C, depreciation/loans→8A/8B, credit→8C/8D/8E, scale→7C/7D/7E, bivariate→6A/6B, line-of-best-fit→6C/6D. Each = copy-trim-rebalance of an existing override (see migration table below).
- **Wave 2 — Right-angled triangles net-new (heavy):** 4A Pythagoras, 4B Applying Pythagoras, 4D Using the calculator, 4H elevation/depression.
- **Wave 3 — Investments net-new:** 3B simple-interest graphs (heavy: graph authoring), 3D present value, 3E CI graphs, 3F appreciation/inflation (light seed, 7 hits).
- **Wave 4 — Graphs of practical situations net-new:** 9E/9F reciprocal (heavy: 0 seed), 9G miscellaneous; relocate the inverse-variation patch here.
- **Wave 5 — Rates remainder + misc:** 1E distance–time graphs, 1G heart rate, 1H blood pressure, 5E break-even, 6E statistical investigation.
- **Wave 6 — Networks and paths (heaviest, fully isolated):** 2A–2G all net-new. Standard 2's `lib/lessons/year12Standard2/networksCriticalPathAnalysis.ts` is too advanced (critical-path/Gantt) to reuse directly, but mine its diagram primitives / answer helpers / D5 question style for structure. Build last.

### Content-migration summary (existing override → target sections)

- `ratios-rates-unit-conversions` → split to 1A/1B/7A/7B (ratio-share→7A/7B, conversions→1B, rate intro→1A)
- `right-angle-trigonometry` (keep slug) → 4C + seed 4E/4F
- `right-angle-trig-applications` (keep slug+checkpoints+challenge) → 4G + seed 4H
- `bearings-and-compass` → reuse whole as 4I
- `rates-practical-problems` (keep slug+checkpoints) → 1C + seed 1D/1F
- `linear-relationships-modelling` (keep slug) → 5B + seed 5A
- `exponential-inverse-variation` (keep slug+`addMissingQuestions`) → 9B + seed 9A; move inverse-variation patch to 9E/9F
- `quadratic-models` (keep slug+`addVisuals`+`editorialRewrite`) → 9D + seed 9C (keep `y12s1-quad-*` IDs on the slug-holder)
- `simultaneous-equations-context` (keep slug) → 5D + seed 5C/5E
- `investment-compound-interest` (keep slug+challenge) → 3C + seed 3A (30 simple-interest hits) / 3D / 3E
- `depreciation-loans` (keep slug+challenge) → 8A + seed 8B
- `credit-cards-and-loans` → split to 8C/8D/8E
- `annuities-regular-payments` → fold into 8B or retire (no NESA section)
- `scale-drawings-and-plans` (keep slug) → 7D + seed 7C/7E
- `bivariate-data-scatter-plots` (keep slug) → 6A + seed 6B
- `line-of-best-fit-predictions` (keep slug) → 6C + seed 6D
- `data-displays-summary-statistics` / `probability-and-chance` / `relative-frequency-expected-value` → fold under ch6 (keep slugs/challenge)
- `measurement-area-volume` → retire (flag); 3 `*-exam-practice` lessons → keep hidden/optional
- **Net-new, no seed:** all of ch2; 9E/9F; 4A/4B/4D; 3B/3D/3E; 1E/1G/1H; 5E

## Risks

- **Guard-update fan-out:** each override self-gates on `unit.slug`; a missed update returns `null` → silent generic content. Do a mechanical pass confirming every kept override's guard matches its new unit + surviving section slug.
- **normalize() over ~57 lessons:** unauthored sections get topic-templated generic questions; Waves 1–6 are mandatory follow-through, not optional. Audit ≥4/5/10 question counts per authored override.
- **Diagnostics/exam coverage:** diagnostics will still cover only 3 of 9 units post-restructure (ch2/4/7/8/9 have none) — expanding diagnostic coverage is a flagged follow-up, out of scope for the structural restructure.
- **Old URLs 404** after unit renames (`/trigonometry-ratios-rates/…`, `/measurement-geometry/…`, `/algebraic-relationships/…`, `/investments-loans-annuities/…`, `/statistics-and-data/…`). If bookmarks/SEO matter, add `next.config` redirects for the 5 renamed unit roots; grep the sitemap/`generateStaticParams` layer for hard-coded old slugs before shipping.

## Verification

- `npx tsc --noEmit` (or project typecheck) — catalog/override types compile; no missing override registrations.
- `npm run audit:questions` — MCQ self-reveal + LaTeX rendering audit across the new lessons (per `reference-question-audit`).
- Build + spot-route check: load `/course/year-12-standard-1` and several new unit/section URLs (incl. a Networks section) to confirm the catalog resolves and no `notFound()`.
- Diagnostic check: `/diagnostic/year-12-standard-1` renders updated unit titles/links (no stale slugs).
- Per-wave: confirm each authored section shows its real teaching content (not generic fallback) and that checkpointed lessons retain their checkpoint IDs.
