# Year 10 Advanced — Restructure to Cambridge 10 & 10A Textbook Layout

## Context

`year-10-mathematics-advanced` is currently a **derived** course: the base `year-10-mathematics` pathway (`lib/newCourseCatalog.ts:3986`, 10 units `algebraic-techniques`→`financial-mathematics`, ending ~:4660) is the single source of truth, and Advanced is built verbatim from it via `namespaceSkillMapIds(year10Base.units, "y10-", "y10a-")` (`:5363`). Core is the same base run through `year10CoreTrimmedUnits` (`:5286-5362`), which **hardcodes lesson-slug blacklists** to drop Path/Extending lessons. There is **no Core/Path/Extending tag field** on `CourseLessonSeed` today — the pathway split is encoded only by lesson presence/absence.

The user wants Advanced realigned to the standard **Cambridge Mathematics NSW Year 10 & 10A** textbook layout — 12 chapters with lettered sections, each tagged Core / Path / Extending / Consolidating (those tags = Stage 5.2 / 5.3 / 5.3§ / review). For an **Advanced** pathway, Core + Path + Extending sections are all active; the Core pathway gets Core + Consolidating only.

Auditing the current 10-unit course against this layout shows it covers maybe ~40% of the target. Entire strands are missing: **logarithms** (3H–3K), **surds** (4A–4D), the whole **functions/polynomials** chapter (ch10: function notation, polynomials, remainder/factor theorem, cubics, transformations), advanced trig (**unit circle, trig graphs, exact values** 6I–6K, 3D applications), **rates of change / variation** (7H–7J), and both online appendices — **Networks** (ch11) and **Counting principles** (ch12). The trigonometry unit also carries 8 hidden legacy lessons to clean up.

**Decisions carried over from the Year 12 Standard 1 plan ("same way"):** section-level granularity (each lettered section is its own lesson, ~113 lessons), full build (restructure *and* author all net-new content), and keep orphaned content by folding into the nearest chapter. Intended outcome: a complete, Cambridge-faithful 12-chapter Year 10 Advanced course, reusing existing authored content as seed and preserving student progress.

## Key architectural decision: add a `pathTag` field + tag-driven derivation

Unlike Standard 1 (a standalone course), restructuring Year 10 Advanced means **restructuring the shared base `year-10-mathematics`** because Advanced and Core both derive from it. Recommended approach:

1. **Add `pathTag?: "core" | "path" | "extending" | "consolidating"` to `CourseLessonSeed`** (`lib/courseTypes.ts`). This makes the textbook's own tagging declarative instead of hidden in slug blacklists.
2. **Restructure the base `year-10-mathematics` units to the 12-chapter layout** with every section carrying its `pathTag` (matching the textbook).
3. **Replace the hardcoded `year10CoreTrimmedUnits` slug blacklists (`:5286-5362`) with a tag filter:** Core keeps `core` + `consolidating`; Advanced keeps everything (`core`+`path`+`extending`+`consolidating`). The `namespaceSkillMapIds` re-prefixing (`y10-`→`y10a-`/`y10c-`) is unchanged.

This keeps Advanced as the primary deliverable while Core stays coherent automatically from the same tagged base. Net effect: the base = the full 10&10A book; Advanced shows all of it; Core is a tag-filtered view.

## Target structure (12 units, ~113 sections)

Slugs are pure topic-kebab; the "1A/1B" label and the Core/Path/Extending tag live on the lesson (`title` + new `pathTag`). Unit array order = textbook chapter order. Reuse existing unit slugs where the content centroid matches (preserves overrides + diagnostics); new slugs otherwise.

1. **Algebra, equations and linear relationships** (`algebra-equations-linear-relationships`, new — absorbs `equations-simultaneous` + `linear-relationships`): 1A Review of algebra, 1B Solving linear equations, 1C Linear inequalities, 1D Equations with complex algebraic fractions, 1E Graphing straight lines, 1F Finding the equation of a line, 1G Distance and midpoint, 1H Parallel & perpendicular lines, 1I Simultaneous (substitution), 1J Simultaneous (elimination), 1K Further applications of simultaneous, 1L Regions on the Cartesian plane
2. **Properties of geometrical figures and circle geometry** (`geometrical-figures-circle-geometry`, rename of `geometry-proofs`): 2A Review of geometry, 2B Congruent triangles, 2C Congruence & quadrilaterals, 2D Similar figures, 2E Proving similar triangles, 2F Circle terminology & chord properties, 2G Angle properties of circles, 2H Further angle properties, 2I Theorems involving tangents, 2J Intersecting chords/secants/tangents
3. **Indices, exponentials and logarithms** (`indices-exponentials-logarithms`, new — **mostly net-new**): 3A Review of index laws, 3B Negative indices, 3C Scientific notation, 3D Fractional indices, 3E Exponential equations, 3F Exponential functions & graphs, 3G Exponential growth & decay, 3H Introducing logarithms, 3I Logarithmic scales, 3J Laws of logarithms, 3K Solving exponential equations using logs
4. **Measurement and surds** (`measurement-and-surds`, rename of `measurement` — **surds net-new**): 4A Irrational numbers & surds, 4B Adding/subtracting surds, 4C Multiplying/dividing surds, 4D Rationalising the denominator, 4E Review of length, 4F Pythagoras incl. 3D, 4G Area of triangles/quads/circles/sectors, 4H Accuracy of measuring instruments, 4I Surface area prisms/cylinders, 4J Surface area pyramids/cones, 4K Volume prisms/cylinders, 4L Volume pyramids/cones, 4M SA & volume of spheres
5. **Quadratic expressions and equations** (`quadratic-expressions-equations`, new — absorbs `algebraic-techniques` + quadratics): 5A Expanding, 5B Factorising, 5C Multiplying/dividing algebraic fractions, 5D Monic trinomials, 5E Non-monic trinomials, 5F Completing the square (factorising), 5G Solving by factorisation, 5H Quadratic problems, 5I Solving by completing the square, 5J Quadratic formula
6. **Trigonometry** (`trigonometry`, **reuse slug** — preserves all trig `stableSkillId`s): 6A Trig ratios, 6B Finding unknown angles, 6C Applications in 2D, 6D Directions & bearings, 6E Applications in 3D, 6F Sine rule, 6G Cosine rule, 6H Area of a triangle, 6I The unit circle, 6J Graphs of trig functions, 6K Exact values & trig equations
7. **Parabolas, rates of change and variation** (`parabolas-rates-variation`, new — absorbs parabola lessons): 7A Exploring parabolas, 7B Sketching by transformations, 7C Sketching by factorisation, 7D Sketching by completing the square, 7E Sketching by quadratic formula & discriminant, 7F Applications, 7G Intersection of lines & parabolas, 7H Rates of change, 7I Average & instantaneous rates (Extending), 7J Direct & inverse variation
8. **Probability** (`probability`, **reuse slug**): 8A Review of probability, 8B Venn & two-way table notation, 8C Mutually/non-mutually exclusive events, 8D Conditional probability notation, 8E Arrays for two-step experiments, 8F Tree diagrams, 8G Dependent & independent events
9. **Single variable and bivariate statistics** (`single-variable-bivariate-statistics`, rename of `statistics-data`): 9A Collecting/misusing data, 9B Review of data displays, 9C Two-way tables, 9D Summary statistics, 9E Box plots, 9F Standard deviation, 9G Time-series data, 9H Bivariate data & scatter plots, 9I Line of best fit by eye, 9J Linear regression with technology (Extending)
10. **Functions, polynomials and other graphs** (`functions-polynomials-graphs`, new — absorbs `circle-graphs`/`hyperbolas`, **mostly net-new**): 10A Functions & notation, 10B Introducing polynomials, 10C Expanding/simplifying polynomials, 10D Dividing polynomials, 10E Remainder & factor theorem, 10F Factorising to find zeros, 10G Graphing cubics y=a(x−h)³+k, 10H Graphs of polynomials, 10I Graphs of circles, 10J Hyperbolic functions, 10K Further transformations
11. **Appendix 1: Networks (online)** (`networks`, **all net-new**): 11A Introduction to networks, 11B Isomorphic & planar graphs, 11C Trails/paths & Eulerian circuits, 11D Shortest path problems (Extending)
12. **Appendix 2: Counting principles (online)** (`counting-principles`, **all net-new, all Extending**): 12A Counting principles & factorial notation, 12B Arrangements, 12C Selections, 12D Counting in probability

`non-linear-relationships` is **dissolved**: parabolas → ch7, circle-graphs/hyperbolas → ch10, exponential-functions → ch3.

## Slug & progress-preservation strategy

- **Reuse `trigonometry` unit slug and every active trig lesson slug** (`trig-ratios-sin-cos-tan`, `sine-rule-finding-sides`, etc.) — these are the only Year 10 lessons with `stableSkillId` + `skillCheckpoints`, and progress persists by `stableCheckpointId` (re-prefixed `y10-`→`y10a-`/`y10c-` per pathway). Renaming them orphans progress. New trig sections (6E/6I/6J/6K) get fresh checkpoint IDs.
- **Retire the 8 hidden legacy trig lessons** (`trigonometric-ratios`, `finding-sides-trig`, `sine-rule`, `cosine-rule`, `area-trig-formula`, `bearings`, etc., all `showInCourseNav:false`) — they're migration artifacts, safe to remove.
- **Keep existing lesson slugs** for every section whose content maps cleanly (e.g. `solving-linear-equations`→1B, `expanding-binomial-products`→5A, `congruent-triangles`→2B, `box-whisker-plots`→9E) so their shared override content survives untouched.
- New sections get clean topic-kebab slugs. Old unit URLs (`/non-linear-relationships/…`, `/equations-simultaneous/…`, `/linear-relationships/…`, `/measurement/…`, `/geometry-proofs/…`, `/statistics-data/…`) will 404 after renames — add `next.config` redirects for the renamed unit roots if bookmarks/SEO matter.

## Coupling surface to update (ordered, per unit/wave)

1. **`lib/courseTypes.ts`** — add `pathTag` to `CourseLessonSeed`.
2. **Base catalog** — `lib/newCourseCatalog.ts:3995-4659`: rewrite the `year-10-mathematics` `units[]` to the 12-chapter layout with section titles + `pathTag`; carry `stableSkillId`/checkpoints on the trig sections that inherit them.
3. **Core derivation** — `lib/newCourseCatalog.ts:5286-5362`: replace the slug-blacklist trim with a `pathTag`-based filter (`core`+`consolidating`). Advanced derivation (`:5363`) needs no filter (keeps all).
4. **Overrides** — `lib/lessons/year10/*.ts`: update each override's `unit.slug` guard to the new unit slug (guards already accept all three course slugs via the `["year-10-mathematics","-advanced","-core"].includes(course.slug)` pattern at e.g. `algebraicTechniques.ts:900`, `trigonometry.ts:4386`, `nonLinearRelationships.ts:413`). **Highest execution risk: a stale `unit.slug` guard silently returns `null` → generic content.** Add new override functions for net-new sections following the same pattern; register them in the dispatch chain (`buildLesson`, `:388-397`). Year 10 has **no normalize function** (unlike Standard 1), so authored question counts render as-is.
5. **Diagnostics** — `lib/diagnostics/year-10-mathematics-advanced.ts`: update the 10 unit slugs + `startHref` + per-question `unitSlug` to the new 12-unit slugs (currently 2 questions/unit, advanced-only).
6. **Challenges** — `lib/challenges/index.ts:79`: `algebraic-techniques`→`surdsIndicesChallenge` key must move to the surviving unit slug (likely ch4 surds or ch5 quadratics).
7. **Routes** — `app/course/year-10-mathematics-advanced/[unitSlug]/[lessonSlug]/` is fully dynamic; new slug pairs work once in the catalog.

**Override authoring pattern** (replicate from e.g. `lib/lessons/year10/trigonometry.ts`): guard on `["year-10-mathematics","year-10-mathematics-advanced","year-10-mathematics-core"].includes(course.slug)` + `unit.slug` + `lesson.slug` → return `Partial<ExplicitLesson>` with teaching/worked examples/guided(≥4)/independent(≥5)/mastery(≥10)/commonMistakes. Author full question depth since there's no normalize backstop.

## Implementation waves (one plan, shippable incrementally)

Each wave ships independently: unauthored sections render generic interim content; routes accept any catalog slug.

- **Wave 0 — Tag field + skeleton + remap (no new authoring).** Add `pathTag`; rewrite base catalog to all 12 units/~113 sections with tags; convert Core trim to tag filter; update every override `unit.slug` guard; update diagnostics + challenge key. Existing content lands on its primary section; gaps render generic.
- **Wave 1 — Split/relocate existing content (reuse seed, light authoring).** Author sibling sections seeded from existing overrides: algebra/equations→ch1 (1B/1C/1E/1F/1G/1H/1I/1J), algebraic-techniques+quadratics→ch5 (5A–5E/5G/5J), measurement→ch4 (4G/4I–4M), geometry→ch2 (2B/2D/2E/2I), parabolas→ch7 (7A/7B), non-linear→ch10 (10I/10J) + ch3 (3F), probability→ch8, statistics→ch9 (9E/9F/9H/9I), trig active lessons→ch6 (6A–6D/6F–6H).
- **Wave 2 — Indices, exponentials & logarithms (heavy net-new):** 3A–3E indices, 3G growth/decay, 3H–3K logarithms (entirely new strand).
- **Wave 3 — Measurement & surds (heavy net-new):** 4A–4D surds, 4E review of length, 4F Pythagoras 3D, 4H accuracy.
- **Wave 4 — Functions, polynomials & graphs (heaviest net-new):** 10A–10H polynomials/functions/cubics, 10K transformations.
- **Wave 5 — Quadratics & parabolas completion:** 5F/5H/5I completing-the-square & problems; 7C–7J sketching variants, rates of change, variation.
- **Wave 6 — Advanced trig:** 6E 3D applications, 6I unit circle, 6J trig graphs, 6K exact values & equations.
- **Wave 7 — Reviews & stats/probability gaps:** 1A/2A/8A/9A/9B reviews, 1D/1K/1L, 2C/2F–2H/2J, 8C/8E/8G, 9C/9D/9G/9J.
- **Wave 8 — Networks appendix (online):** 11A–11D, fully isolated net-new. Mine Standard 2 `lib/lessons/year12Standard2/networksCriticalPathAnalysis.ts` for diagram primitives/helpers only (its content is too advanced to reuse).
- **Wave 9 — Counting principles appendix (online):** 12A–12D, fully isolated net-new (all Extending — lowest priority; could be deferred).

## Risks

- **Cross-pathway blast radius (key):** restructuring the base touches `year-10-mathematics`, `-advanced`, AND `-core` simultaneously. The `pathTag` filter must be validated so Core doesn't silently gain Path/Extending sections or lose Core ones. Compare the Core lesson set before/after against the current blacklist (`:5286-5362`) as an acceptance check.
- **Progress preservation:** safe to rename non-checkpointed lessons; unsafe to rename/reuse trig `stableCheckpointId`s. Keep trig slugs + checkpoint IDs on inheriting sections; mint fresh IDs for new sections. Confirm the progress store keys on `stableCheckpointId` (not slug) before retiring legacy lessons.
- **Guard-update fan-out:** every `year10/*.ts` override self-gates on `unit.slug`; missing one → silent generic content. Do a mechanical pass mapping each kept override to its new unit slug.
- **Scale:** ~113 sections with ~65+ net-new is substantially larger than the Standard 1 build; Waves 2–9 are mandatory follow-through, not optional, or most of the book renders generic.
- **Diagnostics coverage:** the advanced diagnostic covers 10 units × 2 questions; post-restructure it must be remapped to 12 units and ideally expanded (ch3/4/10/11/12 have no diagnostic items). A separate Core diagnostic may be warranted once Core diverges.
- **Old URLs 404** after the 6 unit renames/dissolutions — add redirects if needed; grep sitemap/`generateStaticParams` for hardcoded old slugs before shipping.

## Verification

- `npx tsc --noEmit` — catalog/override/`pathTag` types compile; all new overrides registered.
- `npm run audit:questions` — MCQ self-reveal + LaTeX audit across new lessons.
- **Pathway-filter check:** assert Core's derived lesson set matches the intended `core`+`consolidating` tags (diff against the current blacklist behaviour); assert Advanced contains every base section.
- Build + spot-route: load `/course/year-10-mathematics-advanced` and several new unit/section URLs (incl. a logarithms, a surds, and a networks section) — no `notFound()`.
- Diagnostic: `/diagnostic/year-10-mathematics-advanced` shows the updated 12 units, no stale slugs.
- Per-wave: confirm authored sections show real teaching (not generic), trig checkpoints retained, and the 8 legacy trig lessons gone from nav.
