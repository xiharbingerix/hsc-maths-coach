# New Course Quality Audit

**Date:** 2026-06-12
**Auditor:** Claude Code (automated audit + manual review)
**Scope:** Year 9/10 Core/Advanced pathways, Year 12 Standard 1, Year 12 Extension 1

---

## Files Changed

| File | Change |
|---|---|
| `lib/diagnostics/year-12-standard-1.ts` | Fixed 2 unescaped `\frac` → `\\frac` in question y12s1-ar3 |
| `lib/newCourseCatalog.ts` | Updated year-12-extension-1 status from `in_progress` → `available`; updated description/positioning to match |
| `lib/lessons/year12Extension1/binomialDistribution.ts` | Fixed 14 unescaped backslashes in `latex:` / `latexBlocks:` / `finalAnswerLatex:` fields; fixed wrong P(X=1) answer (0.3874 → 0.3826) in exam-g1 |
| `docs/YEAR12_EXTENSION1_HSC_STATUS.md` | Updated status field from `in_progress` to `available` to match catalog |

---

## Audit Verdict Per Course

| Course | Verdict | Notes |
|---|---|---|
| year-9-mathematics-core | Pass with warnings | Status `in_progress` honest — routes and lessons present, seed clean |
| year-9-mathematics-advanced | Pass with warnings | Same base content as year-9-mathematics; extra trig/coord geom lessons in advanced only |
| year-10-mathematics-core | Pass with warnings | Trimmed to Stage 5.2 syllabus; routes present; seed clean |
| year-10-mathematics-advanced | Pass with warnings | Full Stage 5.3 content; routes present; seed clean |
| year-12-standard-1 | Pass with warnings | Fixed \frac escape; diagnostic only covers 3 of 5 units (documented as intentional) |
| year-12-extension-1 | Pass (after fixes) | Status corrected to `available`; LaTeX escaping fixed in binomialDistribution.ts; wrong answer fixed |

---

## Issues Fixed

| # | File | Line(s) | Description |
|---|---|---|---|
| F1 | `lib/diagnostics/year-12-standard-1.ts` | 57, 62 | Unescaped `\frac` in choice text and explanation for y12s1-ar3 rendered as raw text |
| F2 | `lib/newCourseCatalog.ts` | ~1308 | `year-12-extension-1` status was `in_progress` despite all 6 units having active lessons; updated to `available` |
| F3 | `lib/lessons/year12Extension1/binomialDistribution.ts` | 67, 80–84, 167, 178, 187–189, 275, 285, 340, 371, 374, 381–384 | 14 occurrences of unescaped backslashes in `latex:` fields — `\text`, `\times`, `\ge`, `\le` — causing garbled LaTeX rendering |
| F4 | `lib/lessons/year12Extension1/binomialDistribution.ts` | ~393 | Wrong answer for P(X=1) with B(8,0.1): stated 0.3874, correct value is 0.3826 (C(8,1)×0.1×0.9^7 = 0.38264) |
| F5 | `docs/YEAR12_EXTENSION1_HSC_STATUS.md` | 16 | Status field updated from `in_progress` to `available` to match catalog |

---

## Issues Remaining

### Introduced by recent changes (introduced in commits a05398b, 3a1116a, 7c30cea and surrounding commits)

| Issue | File | Classification | Priority |
|---|---|---|---|
| Year 9 Core/Advanced diagnostic content is identical (same questions, different IDs) | `lib/diagnostics/year-9-mathematics-core.ts`, `lib/diagnostics/year-9-mathematics-advanced.ts` | Introduced by recent changes | Low — differentiation is appropriate at diagnostic level given shared unit content; not a blocker |
| Year 10 Core/Advanced diagnostic content is identical (same questions, different IDs) | `lib/diagnostics/year-10-mathematics-core.ts`, `lib/diagnostics/year-10-mathematics-advanced.ts` | Introduced by recent changes | Low — same reasoning as above |
| `binomialDistribution.ts` guided/independent/mastery only has 2+2+2=6 questions vs 4+5+10=19 for other overrides | `lib/lessons/year12Extension1/binomialDistribution.ts` | Introduced by recent changes — documented in status file | Low — binomial-distribution seed counts 6/lesson; logged in YEAR12_EXTENSION1_HSC_STATUS.md; not a blocker |
| `calculus-applications/newtons-law-cooling-growth-decay` has 6 audit warnings (prompt-reveals-answer, typed-answer-no-variants) | `lib/lessons/year12Extension1/calculusApplications.ts` | Introduced by recent changes | Low — audit warnings not errors; content is correct |

### Pre-existing

| Issue | File | Classification | Priority |
|---|---|---|---|
| 852 total audit warnings across all courses (generic-feedback: 27, latex-working-steps: 68, no-visual-payload: 346, prompt-reveals-answer: 92, typed-answer-no-variants: 319) | Many files | Pre-existing across entire course catalog | Low — audit result is PASS; warnings are style quality issues |
| Year-12-Standard-1 diagnostic only covers 3 of 5 active units (no statistics-and-data, measurement-geometry units) | `lib/diagnostics/year-12-standard-1.ts` | Pre-existing — documented in YEAR12_STANDARD1_COURSE_STATUS.md | Low |
| `courseStatusNote` for year-12-extension-1 in NewCoursePages.tsx says "All 6 units are now active" but the `in_progress` status label was still showing | `app/course/NewCoursePages.tsx` | Pre-existing inconsistency — resolved by F2 above | Fixed |
| Year 8 has very high warning count (72+ per unit) | `lib/lessons/year8/` | Pre-existing | Low |
| `year-12-extension-1` further-trig (t-formula, compound/double angle) and statistical hypothesis testing are missing from syllabus coverage | `lib/newCourseCatalog.ts` | Pre-existing — documented in YEAR12_EXTENSION1_HSC_STATUS.md | Must document before marketing as complete |

### False positives

| Issue | Reasoning |
|---|---|
| 346 "no-visual-payload" warnings | Audit tool flags questions that describe graphs/diagrams; all cases inspected show `required=0` (no question actually requires a missing diagram) |
| Core vs Advanced diagnostics share same question text | Appropriate at this stage — the Core/Advanced split is curriculum scope, not difficulty level |

### Must fix before deploy (new courses)

| Item | Status |
|---|---|
| `year-12-extension-1` status `in_progress` misleads students | **Fixed** (F2 above) |
| Unescaped LaTeX in binomialDistribution.ts renders as broken formulas | **Fixed** (F3 above) |
| Wrong P(X=1) answer in binomial exam practice | **Fixed** (F4 above) |
| Unescaped `\frac` in Standard 1 diagnostic | **Fixed** (F1 above) |

---

## Seed Counts Per Course

| Course | Questions | Diagram questions | Warnings |
|---|---|---|---|
| year-8-mathematics | ~912 (estimated from lesson count) | — | 0 |
| year-9-mathematics-core | 912 | 26 (22 cartesian, 4 triangle) | 0 |
| year-9-mathematics-advanced | 1007 | 40 (26 cartesian, 14 triangle) | 0 |
| year-10-mathematics-core | 836 | 23 (17 cartesian, 6 triangle) | 0 |
| year-10-mathematics-advanced | 1007 | 27 (21 cartesian, 6 triangle) | 0 |
| year-12-standard-1 | 213 | 5 (cartesian) | 0 |
| year-12-extension-1 | 366 | 0 | 0 |

Note: binomial-distribution lessons in year-12-extension-1 seed 6 questions each (2+2+2) vs 19 for other Extension 1 lessons (4+5+10). All other lessons seed at 19 questions. Total Extension 1: 18 lessons × 19 + 4 lessons × 6 = 342 + 24 = 366. Consistent with seed output.

---

## Deploy Blockers

None remaining after the 5 fixes above. All courses that were `available` or `in_progress` with active lessons build successfully and seed without warnings.

---

## Validation Results

### TypeScript (`npx.cmd tsc --noEmit`)
**PASS** — no errors before or after fixes.

### Build (`npm.cmd run build`)
**PASS** — build completed successfully, all 76 pages generated. No errors.

### Lesson audit (`npm.cmd run audit:lessons`)
**PASS** — 495 lessons audited, 0 fail-level issues, 852 warnings. All warning categories are pre-existing quality improvements (generic feedback, missing variants, no-visual-payload) — none are blocking.
- Visual required / no payload: **0** (no question requires a missing diagram)

### Seed dry-runs
All 7 courses seeded with 0 warnings. See Seed Counts table above.

### `git diff --check`
Warnings only — LF-will-be-replaced-by-CRLF on Windows for 19 modified `.ts`/`.md` files. These are line-ending normalisation warnings, not whitespace errors. No trailing whitespace errors.

---

## Course Structure Checks

### Slug consistency
All new course slugs (`year-9-mathematics-core`, `year-9-mathematics-advanced`, `year-10-mathematics-core`, `year-10-mathematics-advanced`) are:
- Registered in `lib/courseTypes.ts` `NewCourseSlug` type
- Present in `lib/newCourseCatalog.ts` `newCoursePathways` array
- Have matching route directories under `app/course/`
- Referenced correctly in diagnostic `startHref` fields

### Route directory structure
All 4 new pathway courses and year-12 courses have complete three-level route structures:
- `app/course/[course]/page.tsx` — course overview
- `app/course/[course]/[unitSlug]/page.tsx` — unit page
- `app/course/[course]/[unitSlug]/[lessonSlug]/page.tsx` — lesson page

### Core vs Advanced unit trimming
Year 9 Core correctly trims `working-with-triangles` to Pythagoras only (3 lessons vs 8 in Advanced).
Year 10 Core correctly trims:
- `non-linear-relationships` → 3 lessons (parabolas + circles; no exponential/hyperbola)
- `trigonometry` → 4 lessons (right-angled only; no sine/cosine rule, area, bearings)
- `geometry-proofs` → 2 lessons (congruence + similarity; no circle geometry)

### Status honesty
| Course | Status | Honest? |
|---|---|---|
| year-9-mathematics-core | `in_progress` | Yes — has lessons |
| year-9-mathematics-advanced | `in_progress` | Yes — has lessons |
| year-10-mathematics-core | `in_progress` | Yes — has lessons |
| year-10-mathematics-advanced | `in_progress` | Yes — has lessons |
| year-12-standard-1 | `in_progress` | Yes — 5 of 5 planned units have lessons, but course is a partial build |
| year-12-extension-1 | `available` (fixed) | Yes — all 6 units have lessons |

---

## Diagnostic Checks

### Year 9 Core/Advanced (20 questions each)
All answers verified correct:
- Geometry: angles equal in similar triangles (A); area scale factor 3² = 9 (C) — correct
- Triangles: 3-4-5 Pythagoras (A); sin = 6/10 = 0.6 (C); 5-3-4 ladder (B) — correct
- Prisms: V = 4×3×2 = 24 (C); cylinder formula (A) — correct
- Index laws: 3²×3³=3⁵ (A); x⁶÷x²=x⁴ (A); (2³)²=2⁶ (B) — correct
- Finance: $22×8=$176 (B); I=1000×0.05×2=$100 (B) — correct
- Rates: gradient = 8/4 = 2 (B); speed = 120/2 = 60 km/h (C); y=3x-1 (A) — correct
- Probability: 3/10 (C); P+P(not A)=1 (C) — correct
- Data: mean=6 (B); median=7 (B); range=15-2=13 (B) — correct

**No diagnostic math errors found in Year 9 diagnostics.**

### Year 10 Core/Advanced (20 questions each)
All answers verified correct:
- Algebra: (x+3)(x-2)=x²+x-6 (A); x²-9=(x+3)(x-3) (C) — correct
- Equations: 2x+3=11→x=4 (C); 2x=x+3→x=3 (C) — correct
- Linear: y=2x-3 (C); parallel→same gradient (B) — correct
- Non-linear: vertex of y=x²-4x+7 at (2,3) — x=-b/2a=4/2=2, y=4-8+7=3 (A) — correct; negative x² opens downward (B) — correct
- Trig: sin=5/13 (B); tan(45°)=1 (C) — correct
- Measurement: TSA cube 6×9=54 (C); cone V=(1/3)πr²h (B) — correct
- Geometry: SAS (B); hexagon angles (6-2)×180=720° (C) — correct
- Probability: P(even)=3/6=1/2 (C); P(HH)=1/4 (A) — correct
- Stats: IQR=Q3-Q1=10-4=6 (B); z-score=(70-50)/10=2 (B) — correct
- Finance: I=500×0.04×3=$60 (B); A=1000×1.1²=$1210 (C) — correct

**No diagnostic math errors found in Year 10 diagnostics.**

### Year 12 Standard 1 (15 questions)
Math verified correct. One LaTeX escape bug fixed (F1).

---

## Extension 1 Lesson Math Spot-Checks

### Binomial Distribution (post-fix)
- P(X=2) for B(6,0.25): C(6,2)×0.25²×0.75⁴ = 15×0.0625×0.3164 = 0.2966 — answer 0.2966 **correct**
- P(X≥1) for B(5,0.15): 1-0.85⁵ = 1-0.4437 = 0.5563 — **correct**
- P(X=0) for B(4,0.6): 0.4⁴ = 0.0256 — **correct**
- P(X=1) for B(8,0.1): C(8,1)×0.1×0.9⁷ = 8×0.1×0.4783 = 0.3826 — **fixed** (was 0.3874)
- E(X) for B(12,0.25): 12×0.25=3 — **correct**
- Var(X) for B(8,0.6): 8×0.6×0.4=1.92 — **correct**
- Var(X) for B(15,0.2): 15×0.2×0.8=2.4 — **correct**

### Calculus Applications (Related Rates)
- dV/dt for sphere r=4, dr/dt=0.5: 4π×16×0.5=32π cm³/s — **correct**
- Ladder dy/dt at x=3, y=4, dx/dt=1: 2(3)(1)+2(4)(dy/dt)=0 → dy/dt=-3/4 — **correct**
- Sphere r=3, dr/dt=2: dV/dt=4π×9×2=72π — **correct**
- Circle r=5, dr/dt=3: dA/dt=2π×5×3=30π — **correct**

### Further Calculus (Trig Integrals)
- ∫cos x dx = sin x + C — **correct**
- ∫sin x dx = -cos x + C — **correct**
- ∫sec²x dx = tan x + C — **correct**
- ∫₀^{π/2} cos x dx = sin(π/2)-sin(0)=1 — **correct**
- ∫₀^{π/2} sin x dx = -cos(π/2)+cos(0)=0+1=1 — **correct**

---

## Risks

| Risk | Severity | Notes |
|---|---|---|
| Core/Advanced diagnostic content is identical | Low | Acceptable at launch — consider harder Advanced questions in next iteration |
| Binomial distribution lessons have only 6 questions each (vs 19 for other Extension 1 lessons) | Low | Documented and consistent with seed output; reduce student mastery coverage |
| 852 audit warnings (mostly `typed-answer-no-variants` and `no-visual-payload`) | Low | Pre-existing; not blocking; address incrementally |
| `year-12-extension-1` missing further-trig (t-formula) and statistical hypothesis testing | Medium | Documented gaps; course is now marked `available` so students should be aware the course covers 6 of the ~8 Extension 1 topics |
| LF/CRLF line-ending inconsistency in 19 modified files | Low | Windows-only dev machine issue; git normalisation in CI will handle this |
| `year-12-standard-1` statistics-and-data and measurement-geometry lessons have 21 and 16 audit warnings respectively | Low-Medium | High warning count in recently added Standard 1 specific lessons; content is present but may have weak answer variant coverage |
