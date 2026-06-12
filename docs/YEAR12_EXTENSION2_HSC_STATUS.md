# Year 12 Mathematics Extension 2 HSC Status

Audited: June 2026

## 1. Course Registration

| Field | Value |
|---|---|
| Slug | `year-12-extension-2` |
| Status | `coming_soon` |
| App routes | `/course/year-12-extension-2` scaffolded |
| Unit routes | Present; complex-numbers unit now has 4 active lessons |
| Lesson routes | Active for complex-numbers lessons; other units still return 404 |
| Diagnostic | Not added |
| Question bank | `complex-numbers` unit seeds real questions; other units still prepare 0 rows |
| Lesson files | `lib/lessons/year12Extension2/complexNumbers.ts` — 4 lessons authored |

Extension 2 has real lessons in the Complex Numbers unit. The course status remains `coming_soon` until all five units have authored content. It must not be marketed as available until lessons, diagnostics and question-bank items exist across all units.

## 2. Registered NSW Topic Areas

The scaffold registers the five NSW Mathematics Extension 2 Year 12 topic areas:

| Unit slug | Unit title | Status |
|---|---|---|
| `proof` | Proof | Planned only |
| `vectors-3d` | Vectors in Three Dimensions | Planned only |
| `complex-numbers` | Complex Numbers | **4 lessons active** |
| `calculus` | Calculus | Planned only |
| `mechanics` | Mechanics | Planned only |

The Complex Numbers unit has 4 authored lessons with full question sets and multi-part exam practice. The remaining four units have empty `lessons: []` arrays to prevent generated fallback content.

### Complex Numbers lessons

| Lesson slug | Title | Multi-part |
|---|---|---|
| `complex-number-arithmetic` | Complex Number Arithmetic | Yes — zw and z² |
| `modulus-argument-conjugate` | Modulus, Argument and Conjugate | No |
| `argand-diagram-geometry` | Argand Diagram and Geometry | No |
| `polar-form-de-moivre` | Polar Form and De Moivre's Theorem | Yes — √3+i polar/power |

## 3. Coverage Still Missing

| Topic | Current coverage |
|---|---|
| Proof: advanced induction, contradiction, contrapositive, inequalities | None |
| 3D vectors: component form, dot/cross products, lines and planes | None |
| Complex numbers: arithmetic, modulus/arg, Argand diagram, polar form, De Moivre | **4 lessons — core HSC skills covered** |
| Complex numbers: roots of unity, loci proofs, advanced De Moivre applications | Not yet |
| Calculus: integration by parts, partial fractions, trig substitution, volumes, ODEs | None |
| Mechanics: SHM, circular motion, projectile motion, growth/decay models | None |

## 4. Diagnostic Position

No Extension 2 diagnostic has been added. A diagnostic should only be created once there is enough authored, reviewed content to produce useful remediation and study-plan guidance.

Minimum recommendation before adding a diagnostic:

- 3 to 4 real questions per registered unit
- coverage across both procedural and conceptual skills
- no placeholder prompts, generic explanations or unsupported multi-part questions
- alignment with `docs/QUESTION_AUTHORING_STANDARD.md`

## 5. Question Bank Position

`scripts/seed-question-bank.ts --course year-12-extension-2 --dry-run` is supported. With the current scaffold it should prepare 0 questions and perform no writes.

Question seeding must remain empty until real lesson overrides or approved external question batches exist. Do not seed generated catalogue fallback content.

## 6. Known Product Gaps Before Real Extension 2 Lessons

| Gap | Blocks |
|---|---|
| Multi-part question type | HSC-style Section II proof, mechanics and calculus questions |
| Extended response/free-text marking | Show-that and proof questions |
| Argand diagram renderer | Complex number loci |
| 3D vector/geometry visual support | Lines, planes and spatial vector diagrams |
| Mechanics diagrams and multi-step solution support | SHM, circular motion and projectile modelling |
| Past-paper import workflow | Authentic HSC Extension 2 exam preparation |

## 7. Recommended Implementation Order

1. Complex Numbers fundamentals: arithmetic, modulus, argument and polar form.
2. Proof: contradiction, contrapositive and inequality proof patterns.
3. Vectors in Three Dimensions: component operations and scalar product.
4. Calculus: integration by parts and partial fractions before volumes.
5. Mechanics: defer until multi-part question support is ready.
6. Diagnostic: add only after enough real content exists across the five units.
