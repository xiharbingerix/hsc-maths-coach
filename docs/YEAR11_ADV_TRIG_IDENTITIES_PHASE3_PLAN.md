# Year 11 Advanced Trig Identities and Equations Phase 3 Plan

Created: 2026-06-14
Status: implemented locally, validation clean
Course: `year-11-advanced`
Unit: `trigonometric-identities-equations`

## Goal

Expand the deployed Phase 2 unit toward exam readiness while staying marking-safe. Phase 3 adds advanced equation-solving and identity proof strategy practice without requiring free-text proof marking.

## Current Base

Phase 2 is deployed at commit `473aede`.

Existing visible unit lessons before this phase:

- `trigonometric-equations`
- `trigonometric-identities`
- `related-angle-identities`
- `trig-equations-basic`
- `trigonometric-identities-equations-exam-practice`

Phase 2 production reseed prepared and upserted `999` Year 11 Advanced questions.

## Implemented Phase 3 Lessons

| Slug | Title | Standard questions | Multi-part | Visual payload |
|---|---|---:|---|---|
| `trig-equations-advanced` | Advanced Trigonometric Equations | 19 | None | None |
| `trig-identities-proof-strategies` | Trigonometric Identity Proof Strategies | 19 | None | None |

Expected dry-run increase: `+38` questions, from `999` to about `1037`.

## Lesson Scope

### `trig-equations-advanced`

Learning goal: solve Year 11 Advanced exam-style trigonometric equations that require an algebraic or identity step before finite-domain solution listing.

Coverage:

- Pythagorean identity substitution before solving.
- Factorising expressions such as `sin x(2sin x - 1)` and `tan^2 x - tan x`.
- Quadratic-style equations in `sin x`, `cos x`, or `tan x`.
- Squared equations such as `sin^2 x = 3/4`, using positive and negative branches.
- Complete finite-domain solutions in `0 <= x <= 2pi` or `0 degrees <= x <= 360 degrees`.

Marking strategy:

- MCQ for complete solution sets.
- Typed answers only for single reference angles, single solutions, factor branches, or simple factorised forms.
- No general solution notation.

### `trig-identities-proof-strategies`

Learning goal: build proof strategy by choosing useful first steps and simplifying one side of an identity.

Coverage:

- Simplify the more complicated side first.
- Convert tangent to sine and cosine.
- Use `1 - sin^2 x = cos^2 x` and `1 - cos^2 x = sin^2 x`.
- Recognise difference of squares and cancellation after rewriting.

Marking strategy:

- No typed full proofs.
- MCQ for strategy and invalid-step recognition.
- Typed short simplified expressions only: `sinx`, `cosx`, `sin^2x`, `cos^2x`, with accepted formatting variants.

## Files Changed

- `lib/lessons/year11Advanced/trigIdentitiesEquations.ts`
- `lib/newCourseCatalog.ts`
- `docs/YEAR11_ADV_TRIG_IDENTITIES_PHASE3_PLAN.md`

## Risk Controls

- Full proof wording is confined to teaching and worked examples, not free-text marked answers.
- Complete multi-solution trig equation answers use MCQ where ordering or formatting would be fragile.
- No new renderers, no checkout/auth/payments/ads/Stripe/Supabase config, no seed scripts.
- No production deploy or reseed in this implementation task.

## Validation

Required after implementation:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check
```

Results:

| Check | Result |
|---|---|
| `npx.cmd tsc --noEmit` | Clean |
| `npm.cmd run build` | Clean |
| `npm.cmd run audit:lessons` | PASS, 0 fail-level issues |
| `npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run` | 1037 prepared questions; new lessons seed 19 each; no Supabase writes |
| `git diff --check` | Clean; LF/CRLF working-copy notices only |

Non-fail audit note: the two Phase 3 lessons each receive a `no-visual-payload` warning because no visual payload is needed for the text-based equation and proof-strategy tasks.
