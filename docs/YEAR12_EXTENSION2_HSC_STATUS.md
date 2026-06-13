# Year 12 Mathematics Extension 2 HSC Status

Audited: June 2026

## 1. Course Registration

| Field | Value |
|---|---|
| Slug | `year-12-extension-2` |
| Status | `coming_soon` |
| App routes | `/course/year-12-extension-2` scaffolded |
| Unit routes | Active for complex-numbers and vectors-3d; remaining units return 404 |
| Lesson routes | Active for 8 lessons across two units |
| Diagnostic | Not added |
| Question bank | 158 questions seeded across complex-numbers and vectors-3d |
| Lesson files | `complexNumbers.ts` (4 lessons), `vectors3D.ts` (4 lessons) |
| Skill Map v2 | Phase 1a catalogue metadata pilot on Complex Numbers |

Extension 2 has real lessons in Complex Numbers and Vectors in 3D. Course status remains `coming_soon` — three units (Proof, Calculus, Mechanics) still have no content.

## 2. Registered NSW Topic Areas

The scaffold registers the five NSW Mathematics Extension 2 Year 12 topic areas:

| Unit slug | Unit title | Status |
|---|---|---|
| `proof` | Proof | Planned only |
| `vectors-3d` | Vectors in Three Dimensions | **4 lessons active** |
| `complex-numbers` | Complex Numbers | **4 lessons active** |
| `calculus` | Calculus | Planned only |
| `mechanics` | Mechanics | Planned only |

### Complex Numbers lessons

| Lesson slug | Title | Multi-part | Skill Map v2 metadata |
|---|---|---|---|
| `complex-number-arithmetic` | Complex Number Arithmetic | Yes - z+w, zw, Im(z^2) | `stableSkillId` + 3 checkpoints |
| `modulus-argument-conjugate` | Modulus, Argument and Conjugate | No | `stableSkillId` + 2 checkpoints |
| `argand-diagram-geometry` | Argand Diagram and Geometry | No | `stableSkillId` + 2 checkpoints |
| `polar-form-de-moivre` | Polar Form and De Moivre's Theorem | Yes - sqrt(3)+i to modulus/arg/Re(z^4) | `stableSkillId` + 4 checkpoints |

### Vectors in Three Dimensions lessons

| Lesson slug | Title | Multi-part | Diagrams |
|---|---|---|---|
| `vectors-and-points-3d` | Vectors and Points in 3D | Yes — a+b, \|a\|, unit vector | `vector3DDiagram` on worked example + G2 |
| `dot-product-and-angle` | Dot Product and Angle | Yes — a·b, cosθ, perpendicularity | None |
| `equations-of-lines-3d` | Equations of Lines in 3D | Yes — parametric z, coordinates, plane crossing | `vector3DDiagram` on worked example + G2 |
| `vector-applications-exam-practice` | Vector Applications and Exam Practice | Yes — d₁·d₂, \|d₁\|, cosθ | None |

## 3. Coverage Still Missing

| Topic | Current coverage |
|---|---|
| Proof: advanced induction, contradiction, contrapositive, inequalities | None |
| 3D vectors: component form, magnitude, dot product, angle, lines | **4 lessons — core HSC skills covered** |
| 3D vectors: cross product, planes, skew lines, distance from point to line | Not yet |
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

## 5. Skill Map v2 Phase 1a Position

Complex Numbers now carries catalogue-only Skill Map v2 metadata:

- stable skill IDs on the four existing lesson seeds
- legacy slug arrays pointing back to current public lesson slugs
- checkpoint labels for planned finer-grained Complex Numbers slots

This does not change public URLs, lesson rendering, worksheet generation, mastery writes, or Continue Learning. The metadata is consumed by audit tooling and dry-run reporting only until a later migration adds nullable database columns such as `questions.skill_id` or `mastery_events.checkpoint_id`.

## 6. Question Bank Position

`scripts/seed-question-bank.ts --course year-12-extension-2 --dry-run` is supported. With the current active lessons it prepares approved Complex Numbers and Vectors in Three Dimensions questions and performs no writes in dry-run mode.

Question seeding currently prepares approved rows for the active Complex Numbers and Vectors in Three Dimensions lessons. It must continue to skip generated catalogue fallback content for empty Proof, Calculus and Mechanics units.

## 7. Known Product Gaps Before Real Extension 2 Lessons

| Gap | Blocks |
|---|---|
| Multi-part question type | HSC-style Section II proof, mechanics and calculus questions |
| Extended response/free-text marking | Show-that and proof questions |
| Argand diagram renderer | Complex number loci |
| 3D vector/geometry visual support | Lines, planes and spatial vector diagrams |
| Mechanics diagrams and multi-step solution support | SHM, circular motion and projectile modelling |
| Past-paper import workflow | Authentic HSC Extension 2 exam preparation |

## 8. Recommended Implementation Order

1. Complex Numbers fundamentals: arithmetic, modulus, argument and polar form.
2. Proof: contradiction, contrapositive and inequality proof patterns.
3. Vectors in Three Dimensions: component operations and scalar product.
4. Calculus: integration by parts and partial fractions before volumes.
5. Mechanics: defer until multi-part question support is ready.
6. Diagnostic: add only after enough real content exists across the five units.
