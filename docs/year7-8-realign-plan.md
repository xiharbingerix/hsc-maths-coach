# Year 7 + Year 8 realign to the Nova skill-tree map (2026-06-18)

Source of truth: `Syllabus map - years 7 to 10` (user-supplied). Architecture: pathway seeds in `lib/newCourseCatalog.ts` define units/lessons; `yearXLessonOverride(course, unit, lesson)` functions in `lib/lessons/yearN/*.ts` supply content and gate on `course.slug` + `unit.slug`. Moving a unit across years = edit both pathway seeds **and** widen the override's `course.slug` check.

User decisions: **Year 7 + Year 8 together; remove the Year-7 duplicates from Year 8 (clean align).**

## Target Year 7 (12 units, all MA4)
| # | Unit (outcome) | Source |
|---|---|---|
| 1 | Computation with Integers (MA4-INT-C-01) | exists (year7Integers) |
| 2 | Fractions, Decimals and Percentages (MA4-FRC-C-01) | exists (year7Fractions + year7Percentages) |
| 3 | Algebraic Techniques (MA4-ALG-C-01) | exists (year7AlgebraicTechniques) |
| 4 | Equations (MA4-EQU-C-01) | exists (year7Equations) |
| 5 | Indices (MA4-IND-C-01) | exists (year7Indices) |
| 6 | Angle Relationships (MA4-ANG-C-01) | exists (year7Angles) |
| 7 | **Ratios and Rates (MA4-RAT-C-01)** | **MOVE from Y8** (year8RatiosRates → rebind to year-7) |
| 8 | Perimeter of Plane Shapes (MA4-LEN-C-01) | exists (year7Perimeter) |
| 9 | Area of Plane Shapes (MA4-ARE-C-01) | exists (year7Area) |
| 10 | **Volume (MA4-VOL-C-01)** | **MOVE from Y8** (year8VolumeSurfaceArea basic-prism/cylinder part → rebind to year-7) |
| 11 | **Probability (MA4-PRO-C-01)** | **MOVE from Y8** (year8StatisticsProbability probability lessons → rebind to year-7) |
| 12 | Data Classification and Visualisation (MA4-DAT-C-01) | exists (year7Data) |

## Target Year 8 (12 units, Stage-4 finish + early Stage-5 bridge)
| # | Unit (outcome) | Action |
|---|---|---|
| 1 | Pythagoras' Theorem (MA4-PYT-C-01) | KEEP (year8PythagorasTheorem) |
| 2 | Linear Relationships (MA4-LIN-C-01) | KEEP (year8LinearRelationships) |
| 3 | Properties of Geometrical Figures (MA4-GEO-C-01) | REFOCUS year8GeometryAngles → triangles/quadrilaterals/reasoning (angle basics now Y7) |
| 4 | Data Analysis (MA4-DAT-C-02) | REFOCUS year8 data → centre/spread/distribution/interpretation |
| 5 | Surface Area of Solids (MA5-ARE-C-01) | SPLIT from year8VolumeSurfaceArea (surface-area lessons) |
| 6 | Volume of Composite Solids (MA5-VOL-C-01) | SPLIT from year8VolumeSurfaceArea (composite-volume lessons) |
| 7 | **Introduction to Networks (MA5-NET-P-01)** | **NEW** — author override + content |
| 8 | **Algebraic Techniques Stage 5 (MA5-ALG-C-01)** | **NEW** — algebraic fractions, expansion, binomial products, equivalence |
| 9 | Indices A (MA5-IND-C-01) | REFOCUS year8IndexLawsExtension → algebraic index laws, zero/negative indices |
| 10 | **Indices B Extension (MA5-IND-P-01)** | **NEW/extend** — advanced manipulation, algebraic bases, indicial equations |
| 11 | Earning and Making Money (MA5-FIN-C-01) | REFOCUS year8NumberFinancialMathematics → wages/tax/simple interest/budgeting (drop compound interest → Y10) |
| 12 | **Data Analysis Investigation (MA5-DAT-C-01, MA5-DAT-P-01)** | **NEW** — statistical-inquiry/collect/analyse/communicate |

### Removed from Year 8 (Year-7 duplicates; covered in Year 7)
Number Operations and Properties · Algebra Foundations · Algebra and Equations · Circumference and Arc Length · Area of Circles/Sectors/Annuli · Probability (→Y7) · Ratios and Rates (→Y7) · basic Volume (→Y7). Lesson code retained for reference/reuse.

## Execution phases
1. **Structure** — rewrite the year-7 + year-8 pathway seeds in `newCourseCatalog.ts` to the tables above. Keep unit slugs the overrides expect; introduce new slugs for new units.
2. **Re-bind moved overrides** — widen `course.slug` checks for year8RatiosRates / year8VolumeSurfaceArea / year8StatisticsProbability to also serve `year-7-mathematics`; map their unit slugs.
3. **Author new Stage-5 Year-8 units** (Networks, Algebraic Techniques S5, Indices B, Data Investigation) — new override functions + full lesson content (teaching + 19-question spine), via agents.
4. **Depth-parity** — masteryQuizPool + multiPartPractice on all Year 7 + Year 8 lessons (agents).
5. **Verify + reseed.**

Note vs current NSW 2024 K–10: the map deliberately front-loads Stage-5 bridge content into Year 8; we follow the **map** (user's intended structure), not a literal NSW year-by-year split.
