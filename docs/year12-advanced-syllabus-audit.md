# Year 12 Mathematics Advanced — Syllabus Audit (NESA **2024** syllabus)

_Audit dated 2026-06-17, **revised 2026-06-18** against the authoritative 2024 syllabus PDF (`docs/Syllabuses/NESA - mathematics_advanced_11_12_2024 (S6).pdf`, extracted with `pdftotext -layout`). The first version of this audit used the 2017 topic codes; the 2024 syllabus (examined from 2026) is materially reorganised, so this revision supersedes it._

## The 2024 structure (what we now target)

Year 12 Mathematics Advanced = **seven focus areas** (outcomes MAV-12-01…08):

| # | 2024 focus area | Outcome | Course unit (slug) | Lessons |
|---|---|---|---|---|
| 1 | Further graph transformations and modelling | MAV-12-01/02 | `ma-f2-further-graph-transformations-and-modelling` | 5 |
| 2 | Sequences and series | MAV-12-03 | `ma-sequences-and-series` | 5 |
| 3 | Differential calculus | MAV-12-04 | `ma-c2-differential-calculus` | 5 |
| 4 | Integral calculus | MAV-12-05 | `ma-c4-integral-calculus` | 16 |
| 5 | Applications of calculus | MAV-12-06 | `ma-c3-applications-of-differentiation` | 11 |
| 6 | Random variables | MAV-12-07 | `ma-s3-random-variables` | 3 |
| 7 | Financial mathematics | MAV-12-08 | `ma-m1-modelling-financial-situations` | 6 |

(Some `href` slugs keep legacy `ma-c#`/`ma-m1` identifiers for URL/seed stability; the titles are the 2024 names.)

### Key 2024 changes vs the old 8-unit (2017) structure — **done**

- **Bivariate data / correlation / least-squares regression / residuals REMOVED** from Mathematics Advanced (now Standard-only). The old "Descriptive Statistics and Bivariate Data" unit was deleted. Data displays/centre/spread are Year 11; standard deviation and z-scores now sit inside **Random variables**.
- **No separate Year-12 trigonometry unit.** Trig-function transformations + periodic modelling are part of **Further graph transformations and modelling** (Functions). General transformations, reciprocal/absolute-value/inverse and exp/log graphs are **Year 11**.
- **Sequences and series is its own Year-12 focus area** (split out of the old financial-maths unit).
- "Applications of differentiation" → **"Applications of calculus"** (now includes motion via *both* differentiation and integration, and exponential growth/decay `dQ/dt = kQ`).

The structural re-alignment (unit list, lesson `moduleSlug` remaps, titles, page copy) is complete and typechecks; route resolves to 7 units / 51 lessons. **Not re-seeded yet.**

---

## Content gaps vs the 2024 dot-points (the work remaining)

Legend: ❌ verified missing · ⚠️ present but check/expand.

### 1. Further graph transformations and modelling
- ❌ **Logarithmic scales** — decibels (dB), the Richter/seismic scale, star magnitudes, and pH. Brand-new 2024 content; entirely absent. Needs a lesson.
- ⚠️ General (non-trig) "model practical problems involving functions and their transformations" — partial; consider a dedicated modelling lesson.
- ⚠️ The "Mixed Trigonometric Functions Exam Practice" lesson blurb references *identities* (Year 11 in 2024) — audit its questions for out-of-scope identity content.

### 2. Sequences and series
- ⚠️ Summation (sigma) notation and partial-sum `Sₙ` (both AP forms) — confirm explicit coverage.
- ⚠️ The geometric-sum derivation identity `(x−1)(xⁿ⁻¹+…+1) = xⁿ−1` — likely absent (it's the derivation behind the GP sum; good Band-6 depth).

### 3. Differential calculus
- ❌ Derivatives of **`aˣ`** (`= (ln a)aˣ`) and **`log_a x`** — likely only `eˣ`/`ln x` covered.
- ❌ Derivatives of **cosec x, sec x, cot x**.
- ⚠️ Deriving `sin′/cos′` informally from the graphs — confirm as explicit teaching.

### 4. Integral calculus
- ❌ **`∫(1/x) dx = ln|x|`** and `∫1/(ax+b) dx`; `∫ u′/u dx = ln|u|`.
- ❌ **`∫aˣ dx = aˣ/ln a`**.
- ❌ **Areas with respect to the y-axis** (`∫x dy`), and areas between an exp/log curve and the axes via the `y=x` reflection.
- ⚠️ Using **odd/even symmetry** to simplify definite integrals.

### 5. Applications of calculus
- ❌ **Graphing `y=f′(x)` and `y=f″(x)` from a graph of `y=f(x)`**.
- ⚠️ **Differentiability vs continuity** (identify where a function is continuous but not differentiable).
- ⚠️ **Exponential growth/decay as calculus** (`dQ/dt = kQ`, `Q = Aeᵏᵗ`) — ensure it lives here, not only in the Year-11 exp/log material.
- ⚠️ **Motion via integration** — the integration-motion content currently sits in the Integral calculus unit; in 2024 it belongs in this focus area. Reorganise/duplicate as appropriate.

### 6. Random variables  ← biggest gap
- ❌ **Continuous random variables** — probability density functions (PDF), cumulative distribution functions (CDF) and their properties, the continuous uniform distribution, median/quartiles from a CDF, and `E(X)`/`Var(X)` by integration. Entirely new in 2024; multiple lessons.
- ❌ **z-scores using standard-normal tables** for arbitrary probabilities (not just the empirical rule), and finding the mean/SD given a probability.
- ⚠️ Discrete `E(X)`/`Var(X)` — present; verify against the 2024 formulas.
- ⚠️ Remove the out-of-scope **regression** worked example from the retained "Mixed Statistical Analysis" lesson.

### 7. Financial mathematics
- ⚠️ **Reducing-balance loans** and **present/future value of annuities via the geometric-series formula** — confirm both are covered to the 2024 framing.

---

## Cross-cutting (still applies, per [CONTENT_QUALITY_STANDARD.md](./CONTENT_QUALITY_STANDARD.md))

- **Depth parity:** only the old C1 (Year 11) unit had `masteryQuizPool` + `multiPartPractice`. Every retained Year-12 unit still needs the pool + multi-part treatment to hit Band 6.
- **Teaching depth:** the Feynman pass (derive-don't-drop) applies to every lesson.

## ⚠️ Applications of Calculus unit — duplication (recommendation, awaiting decision)

The Applications unit (ma-c3) currently has **14 lessons**, but two parallel sets cover the **same** MAV-12-06 sub-topics:

| 2024 sub-topic | Set A — `differentialCalculus.ts` (hand-authored) | Set B — `applicationsDifferentiation.ts` (factory) |
|---|---|---|
| 2nd derivative / concavity / classify | `second-derivative-test` | `second-derivative-concavity` + `stationary-point-classification` |
| Curve sketching | `curve-sketching` | `curve-sketching-calculus` |
| Optimisation | `optimisation` | `optimisation` ← **duplicate slug** (one URL-shadowed) |
| Rates / motion | `rates-of-change-applications` | `kinematics-rates-change` |
| Mixed exam | `mixed-exam-practice` | `applications-differentiation-exam-practice` |

Plus 3 genuinely-distinct new lessons (`sketching-the-derivative-graph`, `differentiability-and-continuity`, `exponential-growth-and-decay`). So ~11 lessons do the work of ~6, with a hard slug collision.

**Trade-off:** Set A has richer hand-authored teaching prose (and already carried pools). Set B is more granular — separate concavity / classification / kinematics lessons — which better matches the distinct 2024 dot-points **and** aligns with your stated "more focused lessons, don't cram" preference.

**Recommendation:** Keep **Set B** (6 granular lessons) + the 3 new lessons = a clean 9-lesson unit, and exclude Set A's 5 overlapping lessons (re-point their `moduleSlug` off `ma-c3` so they leave the course; the lesson code stays for reference). Then run a Feynman teaching-depth pass on Set B to lift its factory prose to Set A's level. **Alternative:** keep Set A (5) + 3 new = 8 lessons, drop Set B — simpler and richer teaching now, but less granular. Either way fixes the duplicate `optimisation` slug and trims the unit from 14 → 8–9.

_No lessons deleted yet — this is your decision (per "you investigate & recommend")._

## Build order
Structure ✅ → content gaps (this list) → depth parity (pools + multi-part) → Feynman teaching pass. Within the gaps, the largest genuinely-new area is **Continuous random variables**.
