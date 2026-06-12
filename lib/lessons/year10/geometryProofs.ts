import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { TriangleDiagram } from "../types";

function safeGeometryAnswerVariants(prompt: string, latex: string, answer: string): string[] {
  const variants: string[] = [];
  const context = `${prompt} ${latex}`;
  const lowerContext = context.toLowerCase();
  const isNumeric = /^-?\d+(\.\d+)?$/.test(answer);

  if (!isNumeric) return variants;

  const numericAnswer = Number(answer);
  if (Number.isInteger(numericAnswer)) variants.push(numericAnswer.toFixed(1));

  const isAnglePrompt = lowerContext.includes("angle") || lowerContext.includes("degrees") || latex.includes("^\\circ");
  if (isAnglePrompt) {
    variants.push(`${answer}°`, `${answer} degrees`, `angle=${answer}`, `angle = ${answer}`, `angle = ${answer}°`);

    const namedAngle = prompt.match(/angle\s+([A-Z]{1,3})/);
    if (namedAngle) {
      const label = namedAngle[1];
      variants.push(
        `angle ${label}=${answer}`,
        `angle ${label} = ${answer}`,
        `angle ${label} = ${answer}°`,
        `∠${label}=${answer}`,
        `∠${label} = ${answer}`,
        `∠${label} = ${answer}°`
      );
    }
  }

  const isScaleFactorPrompt = lowerContext.includes("scale factor");
  if (isScaleFactorPrompt) {
    variants.push(`k=${answer}`, `k = ${answer}`, `scale factor=${answer}`, `scale factor = ${answer}`);
  }

  const segmentMatch = prompt.match(/find\s+([A-Z]{2})\b/);
  const isLengthPrompt =
    !isScaleFactorPrompt &&
    !isAnglePrompt &&
    (lowerContext.includes("side") ||
      lowerContext.includes("length") ||
      lowerContext.includes("tangent") ||
      lowerContext.includes("radius") ||
      Boolean(segmentMatch));

  if (isLengthPrompt) {
    variants.push(`${answer} cm`, `${answer}cm`);
    if (segmentMatch) {
      const segment = segmentMatch[1];
      variants.push(
        `${segment}=${answer}`,
        `${segment} = ${answer}`,
        `${segment} = ${answer} cm`,
        `${segment}=${answer}cm`
      );
    }
  }

  if (/\by\b/.test(latex) && lowerContext.includes("find y")) {
    variants.push(`y=${answer}`, `y = ${answer}`);
  } else if (/\bx\b/.test(latex) && lowerContext.includes("find x")) {
    variants.push(`x=${answer}`, `x = ${answer}`);
  }

  return variants;
}

function numeric(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...safeGeometryAnswerVariants(prompt, latex, answer)])),
    hint: "Match corresponding parts before calculating.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer,
    hint: "Check the order of corresponding vertices and use only the information given.",
    explanation,
  };
}

function triangle(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"] = {},
  angleLabels: TriangleDiagram["angleLabels"] = {},
  options: Partial<Pick<TriangleDiagram, "rightAngleAt" | "vertexLabels">> = {}
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 85, y: 220 },
      B: { x: 320, y: 220 },
      C: { x: 165, y: 55 },
    },
    sideLabels,
    angleLabels,
    ...options,
  };
}

const congruentWorked: WorkedExample[] = [
  {
    title: "Use SSS congruence",
    questionLatex: "\\text{Triangle }ABC\\text{ has sides }5,7,8.\\text{ Triangle }DEF\\text{ has matching sides }5,7,8.\\text{ Explain why they are congruent.}",
    triangleDiagram: triangle("Triangle ABC with sides AB 7, BC 5 and AC 8.", { AB: "7", BC: "5", AC: "8" }),
    steps: [
      { explanation: "All three side lengths match the corresponding sides of the second triangle.", latex: "AB=DE,\\quad BC=EF,\\quad AC=DF" },
      { explanation: "Three matching sides prove congruence.", latex: "\\triangle ABC\\cong\\triangle DEF\\quad\\text{by SSS}" },
    ],
    finalAnswerLatex: "\\text{SSS congruence}",
  },
  {
    title: "Use SAS congruence",
    questionLatex: "\\text{Two triangles each have sides }6\\text{ and }9\\text{ with included angle }40^\\circ.\\text{ Explain why they are congruent.}",
    triangleDiagram: triangle("Triangle ABC with sides AB 6 and AC 9 and included angle A 40 degrees.", { AB: "6", AC: "9" }, { A: "40 degrees" }),
    steps: [
      { explanation: "The equal angle is between the two equal sides.", latex: "\\text{side, included angle, side}" },
      { explanation: "This is the SAS test.", latex: "\\text{SAS congruence}" },
    ],
    finalAnswerLatex: "\\text{SAS congruence}",
  },
  {
    title: "Use a corresponding side",
    questionLatex: "\\triangle ABC\\cong\\triangle DEF.\\quad AB=11.\\text{ Find }DE.",
    steps: [{ explanation: "The order of the congruence statement pairs A with D and B with E.", latex: "AB\\leftrightarrow DE" }],
    finalAnswerLatex: "DE=11",
  },
];

const congruentGuided: PracticeQuestion[] = [
  choice("y10-geometry-cong-g1", "Which test proves two triangles congruent when all three corresponding sides match?", "A", ["SSS", "SAS", "ASA", "RHS"], "SSS uses three matching side lengths."),
  { ...choice("y10-geometry-cong-g2", "The displayed triangle has two known sides and their included angle. Which congruence test would use the same information in a second triangle?", "B", ["SSS", "SAS", "ASA", "RHS"], "The angle is included between the two given sides."), triangleDiagram: triangle("Triangle ABC with AB 6, AC 9 and included angle A 40 degrees.", { AB: "6", AC: "9" }, { A: "40 degrees" }) },
  numeric("y10-geometry-cong-g3", "Triangle ABC is congruent to triangle DEF in that order. If BC = 8, find EF.", "\\triangle ABC\\cong\\triangle DEF,\\quad BC=8", "8", "B corresponds to E and C corresponds to F."),
  choice("y10-geometry-cong-g4", "Which test uses a right angle, equal hypotenuse and one equal shorter side?", "D", ["SSS", "SAS", "ASA", "RHS"], "RHS is designed for right triangles."),
];

const congruentIndependent: PracticeQuestion[] = [
  choice("y10-geometry-cong-i1", "Two triangles have matching angles of 50 degrees and 70 degrees, plus the matching side between them. Which test applies?", "C", ["SSS", "SAS", "ASA", "RHS"], "The known side is between the two known angles."),
  choice("y10-geometry-cong-i2", "Triangle PQR is congruent to triangle XYZ in that order. Which side corresponds to QR?", "B", ["XY", "YZ", "XZ", "PQ"], "Q corresponds to Y and R corresponds to Z."),
  numeric("y10-geometry-cong-i3", "Triangle PQR is congruent to triangle XYZ in that order. If angle Q is 64 degrees, find angle Y.", "\\triangle PQR\\cong\\triangle XYZ,\\quad \\angle Q=64^\\circ", "64", "Corresponding angles in congruent triangles are equal.", ["64 degrees", "64°"]),
  { ...choice("y10-geometry-cong-i4", "Which test proves congruence if a second right triangle has the same labelled hypotenuse and shorter side as the displayed triangle?", "D", ["ASA", "SAS", "SSS", "RHS"], "The right angle, hypotenuse and one shorter side give RHS."), triangleDiagram: { description: "Right triangle ABC with right angle at A, hypotenuse BC 10 and side AB 6.", vertices: { A: { x: 85, y: 220 }, B: { x: 320, y: 220 }, C: { x: 85, y: 55 } }, sideLabels: { AB: "6", BC: "10" }, rightAngleAt: "A" } },
  choice("y10-geometry-cong-i5", "Two triangles have three matching angles but no side lengths are given. What can you conclude?", "C", ["They must be congruent", "They cannot be similar", "Congruence is not proven", "RHS applies"], "Equal angles can establish similarity, but not the same size."),
];

const congruentMastery: PracticeQuestion[] = [
  choice("y10-geometry-cong-m1", "Which word best describes triangles with the same shape and the same size?", "B", ["Similar", "Congruent", "Parallel", "Perpendicular"], "Congruent triangles match in both shape and size."),
  choice("y10-geometry-cong-m2", "Which congruence test uses three matching sides?", "A", ["SSS", "SAS", "ASA", "RHS"], "SSS stands for side-side-side."),
  numeric("y10-geometry-cong-m3", "Triangle ABC is congruent to triangle DEF in that order. If AC = 13, find DF.", "\\triangle ABC\\cong\\triangle DEF,\\quad AC=13", "13", "A corresponds to D and C corresponds to F."),
  choice("y10-geometry-cong-m4", "Which order correctly matches triangle ABC with a triangle whose corresponding vertices are X, Z, Y?", "C", ["Triangle XYZ", "Triangle YZX", "Triangle XZY", "Triangle ZXY"], "A matches X, B matches Z and C matches Y."),
  choice("y10-geometry-cong-m5", "Two right triangles have equal hypotenuses and one equal shorter side. Which test applies?", "D", ["SSS", "SAS", "ASA", "RHS"], "Use the right-triangle RHS test."),
  numeric("y10-geometry-cong-m6", "Triangle KLM is congruent to triangle RST in that order. If angle M is 71 degrees, find angle T.", "\\triangle KLM\\cong\\triangle RST,\\quad \\angle M=71^\\circ", "71", "M corresponds to T.", ["71 degrees", "71°"]),
  choice("y10-geometry-cong-m7", "Which information is not enough on its own to prove congruence?", "B", ["Three matching sides", "Three matching angles", "Two matching sides and the included angle", "Two matching angles and the included side"], "Matching angles fix shape but not size."),
  choice("y10-geometry-cong-m8", "Two triangles have sides 4, 7 and 9. A student says SAS proves congruence. Which response is best?", "C", ["Correct, because there are three sides", "Correct, because every triangle has angles", "Use SSS because all three sides are given", "No congruence test can apply"], "Three matching side lengths support SSS, not SAS."),
  choice("y10-geometry-cong-m9", "Triangle ABC is congruent to triangle EFD. Which statement must be true?", "A", ["$BC=FD$", "$BC=EF$", "$AC=FD$", "$\\angle A=\\angle F$"], "The order pairs B with F and C with D."),
  choice("y10-geometry-cong-m10", "Two triangles have two matching sides and one matching angle that is not between those sides. What is the safest conclusion?", "D", ["SSS proves congruence", "SAS proves congruence", "ASA proves congruence", "The information does not match a listed congruence test"], "SAS requires the included angle."),
];

const similarWorked: WorkedExample[] = [
  {
    title: "Find a scale factor",
    questionLatex: "\\text{A triangle with sides }3,4,5\\text{ is enlarged to sides }6,8,10.\\text{ Find the scale factor.}",
    triangleDiagram: triangle("Triangle ABC with sides AB 3, BC 4 and AC 5.", { AB: "3", BC: "4", AC: "5" }),
    steps: [{ explanation: "Divide an enlarged side by its corresponding original side.", latex: "k=\\frac{6}{3}=2" }],
    finalAnswerLatex: "k=2",
  },
  {
    title: "Use AA similarity",
    questionLatex: "\\text{Two triangles each have angles }50^\\circ\\text{ and }70^\\circ.\\text{ Explain why they are similar.}",
    triangleDiagram: triangle("Triangle ABC with angle A 50 degrees and angle B 70 degrees.", {}, { A: "50 degrees", B: "70 degrees" }),
    steps: [{ explanation: "Two corresponding angles match, so the third angle also matches.", latex: "\\text{AA similarity}" }],
    finalAnswerLatex: "\\text{AA similarity}",
  },
  {
    title: "Find a missing corresponding side",
    questionLatex: "\\text{Similar triangles have corresponding sides }4\\text{ and }10.\\text{ A second pair is }6\\text{ and }x.\\text{ Find }x.",
    steps: [
      { explanation: "The scale factor from the smaller triangle to the larger triangle is two and a half.", latex: "k=\\frac{10}{4}=2.5" },
      { explanation: "Apply the same scale factor to the corresponding side.", latex: "x=6\\times2.5=15" },
    ],
    finalAnswerLatex: "x=15",
  },
];

const similarGuided: PracticeQuestion[] = [
  numeric("y10-geometry-sim-g1", "A side of length 4 corresponds to a side of length 12 in an enlarged similar triangle. Find the scale factor.", "\\text{small side}=4,\\quad \\text{large side}=12", "3", "Divide the enlarged length by the original length."),
  { ...choice("y10-geometry-sim-g2", "The displayed triangle has two marked angles. If another triangle has the same two angles, which similarity test applies?", "A", ["AA", "SSS in proportion", "SAS in proportion", "RHS"], "Two matching angles establish AA similarity."), triangleDiagram: triangle("Triangle ABC with angle A 50 degrees and angle B 70 degrees.", {}, { A: "50 degrees", B: "70 degrees" }) },
  numeric("y10-geometry-sim-g3", "Two similar triangles have scale factor 2 from small to large. A small side is 7. Find the corresponding large side.", "k=2,\\quad \\text{small side}=7", "14", "Multiply by the scale factor."),
  choice("y10-geometry-sim-g4", "Which statement is true for similar triangles?", "C", ["They always have equal areas", "They always have equal side lengths", "Corresponding sides are in the same ratio", "They must be right triangles"], "Similarity preserves shape and side ratios."),
];

const similarIndependent: PracticeQuestion[] = [
  numeric("y10-geometry-sim-i1", "A side of length 5 corresponds to a side of length 20. Find the enlargement scale factor.", "\\text{small side}=5,\\quad \\text{large side}=20", "4", "Divide corresponding lengths."),
  numeric("y10-geometry-sim-i2", "Two similar triangles have scale factor 3 from small to large. A small side is 8. Find the corresponding large side.", "k=3,\\quad \\text{small side}=8", "24", "Multiply by three."),
  choice("y10-geometry-sim-i3", "Which set of side lengths is proportional to 3, 4, 5?", "D", ["4, 5, 6", "6, 7, 8", "9, 10, 11", "6, 8, 10"], "Every side is doubled."),
  { ...numeric("y10-geometry-sim-i4", "The displayed triangle is enlarged by scale factor 3. Find the corresponding length for side AB.", "k=3", "15", "Side AB is 5, so the enlarged length is 15."), triangleDiagram: triangle("Triangle ABC with side AB 5, side BC 7 and side AC 8.", { AB: "5", BC: "7", AC: "8" }) },
  choice("y10-geometry-sim-i5", "Triangles with three equal corresponding side lengths are best described as:", "B", ["Similar but never congruent", "Congruent and therefore also similar", "Neither congruent nor similar", "Parallel"], "Congruent triangles have scale factor one and are also similar."),
];

const similarMastery: PracticeQuestion[] = [
  choice("y10-geometry-sim-m1", "Which word describes triangles with the same shape but not necessarily the same size?", "A", ["Similar", "Congruent", "Perpendicular", "Isosceles"], "Similar triangles preserve shape."),
  numeric("y10-geometry-sim-m2", "A side grows from 6 to 18. Find the scale factor.", "\\text{small}=6,\\quad \\text{large}=18", "3", "Divide eighteen by six."),
  numeric("y10-geometry-sim-m3", "Two similar triangles have scale factor 4. A small side is 3. Find the corresponding large side.", "k=4,\\quad \\text{small side}=3", "12", "Multiply by four."),
  choice("y10-geometry-sim-m4", "Which test uses two matching angles?", "B", ["SSS", "AA", "RHS", "SAS congruence"], "AA establishes similarity."),
  numeric("y10-geometry-sim-m5", "A large side is 21 and the scale factor from small to large is 3. Find the matching small side.", "\\text{large side}=21,\\quad k=3", "7", "Divide by the scale factor."),
  choice("y10-geometry-sim-m6", "Which set is proportional to 4, 6, 9?", "C", ["8, 12, 16", "6, 8, 11", "8, 12, 18", "12, 16, 27"], "Each side is multiplied by two."),
  numeric("y10-geometry-sim-m7", "Similar triangles have matching sides 5 and 15. Another small side is 8. Find its matching large side.", "\\text{corresponding sides: }5\\text{ and }15,\\quad \\text{small side}=8", "24", "The scale factor is three."),
  choice("y10-geometry-sim-m8", "Triangle A has sides 6, 8, 10. Triangle B has sides 9, 12, 15. Which reason proves similarity?", "D", ["AA only", "RHS congruence", "SAS congruence", "SSS in proportion"], "Every side in Triangle B is one and a half times the matching side."),
  numeric("y10-geometry-sim-m9", "Two similar triangles have corresponding sides 12 and 18. A side in the smaller triangle is 10. Find the matching side in the larger triangle.", "\\text{corresponding sides: }12\\text{ and }18,\\quad \\text{small side}=10", "15", "The scale factor is eighteen divided by twelve, which is one and a half."),
  choice("y10-geometry-sim-m10", "Two triangles each have sides in the ratio 2:3 around an equal included angle. Which similarity reason applies?", "C", ["AA", "SSS in proportion", "SAS in proportion", "RHS"], "Two proportional side pairs and the included equal angle give SAS similarity."),
];

function geometryNumeric(id: string, prompt: string, latex: string, answer: string, explanation: string): PracticeQuestion {
  return { ...numeric(id, prompt, latex, answer, explanation), hint: "Identify the relevant circle fact, then calculate the missing value." };
}

function geometryChoice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = "\\text{Select A, B, C, or D.}"): PracticeQuestion {
  return { ...choice(id, prompt, answer, choices, explanation, latex), hint: "Use only the stated facts and choose the theorem or reason that directly applies." };
}

const circleChordAngleWorked: WorkedExample[] = [
  {
    title: "Use the centre-angle theorem",
    questionLatex: "\\text{A central angle and an angle at the circumference stand on the same arc. The central angle is }120^\\circ.\\text{ Find the angle at the circumference.}",
    steps: [
      { explanation: "The angle at the centre is twice the angle at the circumference standing on the same arc.", latex: "120^\\circ=2x" },
      { explanation: "Divide by two.", latex: "x=60^\\circ" },
    ],
    finalAnswerLatex: "60^\\circ",
  },
  {
    title: "Recognise an angle in a semicircle",
    questionLatex: "\\text{AB is a diameter of a circle and C is another point on the circle. Find }\\angle ACB.",
    steps: [{ explanation: "An angle at the circumference standing on a diameter is a right angle.", latex: "\\angle ACB=90^\\circ" }],
    finalAnswerLatex: "90^\\circ",
  },
  {
    title: "Use a cyclic quadrilateral",
    questionLatex: "\\text{ABCD is a cyclic quadrilateral. If }\\angle ABC=112^\\circ,\\text{ find }\\angle ADC.",
    steps: [
      { explanation: "Opposite angles in a cyclic quadrilateral sum to 180 degrees.", latex: "\\angle ABC+\\angle ADC=180^\\circ" },
      { explanation: "Subtract the known angle.", latex: "\\angle ADC=180^\\circ-112^\\circ=68^\\circ" },
    ],
    finalAnswerLatex: "68^\\circ",
  },
];

const circleChordAngleGuided: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-chord-g1", "A central angle and an angle at the circumference stand on the same arc. The central angle is 120 degrees. Find the angle at the circumference.", "120^\\circ=2x", "60", "The angle at the circumference is half the central angle."),
  geometryNumeric("y10-geometry-chord-g2", "AB is a diameter and C is a point on the circle. Find angle ACB.", "AB\\text{ is a diameter}", "90", "An angle in a semicircle is 90 degrees."),
  geometryChoice("y10-geometry-chord-g3", "Angles AXB and AYB lie at the circumference and stand on the same chord AB on the same side of the chord. Which fact connects them?", "B", ["They sum to 180 degrees", "They are equal", "One is twice the other", "They are both 90 degrees"], "Angles in the same segment are equal."),
  geometryNumeric("y10-geometry-chord-g4", "ABCD is a cyclic quadrilateral. Angle ABC is 104 degrees. Find the opposite angle ADC.", "\\angle ABC+\\angle ADC=180^\\circ", "76", "Opposite angles in a cyclic quadrilateral sum to 180 degrees."),
];

const circleChordAngleIndependent: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-chord-i1", "A central angle and a circumference angle stand on the same arc. The circumference angle is 37 degrees. Find the central angle.", "x=2(37^\\circ)", "74", "The central angle is twice the angle at the circumference."),
  geometryNumeric("y10-geometry-chord-i2", "Angles APB and AQB stand on the same chord AB in the same segment. Angle APB is 58 degrees. Find angle AQB.", "\\angle APB=\\angle AQB", "58", "Angles in the same segment are equal."),
  geometryChoice("y10-geometry-chord-i3", "A student sees an angle at the circumference standing on a diameter. Which theorem should they use?", "C", ["Equal chords subtend equal angles", "Opposite cyclic angles sum to 180 degrees", "An angle in a semicircle is 90 degrees", "The centre angle is half the circumference angle"], "An angle at the circumference standing on a diameter is an angle in a semicircle."),
  geometryNumeric("y10-geometry-chord-i4", "PQRS is a cyclic quadrilateral. Angle PQR is 129 degrees. Find angle PSR.", "\\angle PQR+\\angle PSR=180^\\circ", "51", "The two stated angles are opposite angles in a cyclic quadrilateral."),
  geometryChoice("y10-geometry-chord-i5", "Equal chords AB and CD subtend angles at the centre of the same circle. What can you conclude?", "A", ["The central angles are equal", "The central angles sum to 90 degrees", "One angle is twice the other", "Nothing can be concluded"], "Equal chords in the same circle subtend equal angles at the centre."),
];

const circleChordAngleMastery: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-chord-m1", "A central angle is 100 degrees. Find the angle at the circumference standing on the same arc.", "100^\\circ=2x", "50", "The circumference angle is half the central angle."),
  geometryNumeric("y10-geometry-chord-m2", "AB is a diameter and C is a point on the circle. Find angle ACB.", "AB\\text{ is a diameter}", "90", "An angle in a semicircle is a right angle."),
  geometryChoice("y10-geometry-chord-m3", "Which statement is true for opposite angles in a cyclic quadrilateral?", "D", ["They are equal", "They are both acute", "They sum to 90 degrees", "They sum to 180 degrees"], "Opposite angles in a cyclic quadrilateral are supplementary."),
  geometryNumeric("y10-geometry-chord-m4", "Angles AXB and AYB stand on chord AB in the same segment. Angle AXB is 63 degrees. Find angle AYB.", "\\angle AXB=\\angle AYB", "63", "Angles in the same segment are equal."),
  geometryNumeric("y10-geometry-chord-m5", "ABCD is cyclic. Angle ABC is 87 degrees. Find angle ADC.", "\\angle ABC+\\angle ADC=180^\\circ", "93", "Subtract 87 degrees from 180 degrees."),
  geometryChoice("y10-geometry-chord-m6", "Two equal chords in the same circle subtend angles at the centre. Which conclusion is justified?", "A", ["The angles are equal", "The angles are complementary", "Each angle is 90 degrees", "The chords are diameters"], "Equal chords subtend equal central angles."),
  geometryNumeric("y10-geometry-chord-m7", "A circumference angle is 46 degrees. Find the central angle standing on the same arc.", "x=2(46^\\circ)", "92", "Double the circumference angle."),
  geometryChoice("y10-geometry-chord-m8", "A student says a 72-degree central angle gives a 144-degree circumference angle on the same arc. What is the best correction?", "B", ["The two angles are equal", "The circumference angle is half the central angle", "Both angles must be 90 degrees", "The angles sum to 180 degrees"], "The centre angle is twice, not half, the circumference angle."),
  geometryNumeric("y10-geometry-chord-m9", "ABCD is cyclic. Angle ABC is three times angle ADC. Find angle ADC.", "3x+x=180^\\circ", "45", "Opposite angles sum to 180 degrees, so four equal parts total 180 degrees."),
  geometryChoice("y10-geometry-chord-m10", "Angles APB and AQB both stand on chord AB, but P and Q are on opposite sides of chord AB. Which statement is safest?", "C", ["The angles are equal by the same-segment theorem", "Both angles are 90 degrees", "The same-segment theorem cannot be applied as stated", "One angle is twice the other"], "The same-segment theorem requires the angles to lie in the same segment."),
];

const circleTangentsWorked: WorkedExample[] = [
  {
    title: "Use the tangent-radius theorem",
    questionLatex: "\\text{A tangent touches a circle at T and OT is a radius. Find the angle between OT and the tangent.}",
    steps: [{ explanation: "A radius is perpendicular to a tangent at the point of contact.", latex: "OT\\perp\\text{ tangent at T}" }],
    finalAnswerLatex: "90^\\circ",
  },
  {
    title: "Use equal tangent lengths",
    questionLatex: "\\text{Tangents PA and PB are drawn from the same external point P. If }PA=7,\\text{ find }PB.",
    steps: [{ explanation: "Tangents from the same external point have equal lengths.", latex: "PA=PB=7" }],
    finalAnswerLatex: "PB=7",
  },
  {
    title: "Use a right triangle with a tangent",
    questionLatex: "\\text{PT is tangent at T, OT is a radius, }OT=6\\text{ and }OP=10.\\text{ Find }PT.",
    steps: [
      { explanation: "The radius and tangent are perpendicular, so triangle OPT is right-angled at T.", latex: "OT^2+PT^2=OP^2" },
      { explanation: "Apply Pythagoras.", latex: "6^2+PT^2=10^2\\Rightarrow PT^2=64\\Rightarrow PT=8" },
    ],
    finalAnswerLatex: "PT=8",
  },
];

const circleTangentsGuided: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-tangent-g1", "A tangent touches a circle at T and OT is a radius. Find the angle between OT and the tangent.", "OT\\perp\\text{ tangent at T}", "90", "A radius is perpendicular to a tangent at the point of contact."),
  geometryNumeric("y10-geometry-tangent-g2", "Tangents PA and PB are drawn from the same external point P. If PA = 9, find PB.", "PA=PB", "9", "Tangents from one external point are equal in length."),
  geometryChoice("y10-geometry-tangent-g3", "A line touches a circle at exactly one point. What is the line called?", "C", ["Radius", "Chord", "Tangent", "Diameter"], "A tangent touches a circle at one point."),
  geometryChoice("y10-geometry-tangent-g4", "A tangent touches a circle at T. A chord through T forms a 48-degree angle with the tangent. Which angle is also 48 degrees?", "D", ["The central angle standing on the chord", "Every angle in the circle", "The angle between the radius and tangent", "The angle in the alternate segment standing on the chord"], "The alternate segment theorem matches the tangent-chord angle with the angle in the alternate segment."),
];

const circleTangentsIndependent: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-tangent-i1", "Tangents QA and QB come from the same external point Q. If QA = 13, find QB.", "QA=QB", "13", "The tangent lengths are equal."),
  geometryChoice("y10-geometry-tangent-i2", "Which description identifies a radius?", "A", ["A segment from the centre to the circle", "A line touching the circle once", "A segment joining any two points on the circle", "A chord through the centre only"], "A radius joins the centre to a point on the circle."),
  geometryNumeric("y10-geometry-tangent-i3", "PT is tangent at T, OT is a radius, OT = 5 and OP = 13. Find PT.", "5^2+PT^2=13^2", "12", "The tangent-radius angle is 90 degrees, so Pythagoras gives PT = 12."),
  geometryChoice("y10-geometry-tangent-i4", "Which theorem justifies that angle OTP is 90 degrees when PT is tangent at T and OT is a radius?", "B", ["Tangents from an external point are equal", "A radius is perpendicular to a tangent at contact", "Angles in the same segment are equal", "Opposite cyclic angles sum to 180 degrees"], "The radius-tangent theorem applies directly."),
  geometryChoice("y10-geometry-tangent-i5", "A chord and a tangent meet at T. Which theorem connects their angle with an angle at the circumference in the opposite segment?", "D", ["Centre-angle theorem", "Semicircle theorem", "Equal tangent theorem", "Alternate segment theorem"], "The alternate segment theorem makes this connection."),
];

const circleTangentsMastery: PracticeQuestion[] = [
  geometryNumeric("y10-geometry-tangent-m1", "A radius meets a tangent at the point of contact. Find the angle between them.", "\\text{radius}\\perp\\text{ tangent}", "90", "A radius and tangent are perpendicular at contact."),
  geometryNumeric("y10-geometry-tangent-m2", "Tangents PA and PB come from external point P. If PA = 11, find PB.", "PA=PB", "11", "Tangents from the same external point are equal."),
  geometryChoice("y10-geometry-tangent-m3", "Which segment joins two points on a circle?", "B", ["Radius", "Chord", "Tangent", "Arc"], "A chord joins two points on a circle."),
  geometryChoice("y10-geometry-tangent-m4", "Which fact creates a right triangle when a radius is drawn to a tangent point?", "A", ["Radius perpendicular to tangent", "Angles in the same segment", "Equal chords subtend equal angles", "Opposite cyclic angles sum to 180 degrees"], "The tangent-radius angle is 90 degrees."),
  geometryNumeric("y10-geometry-tangent-m5", "OT is a radius of length 8, PT is tangent at T and OP = 17. Find PT.", "8^2+PT^2=17^2", "15", "Use the right triangle formed by the radius and tangent."),
  geometryChoice("y10-geometry-tangent-m6", "A tangent and chord meet at T. Their angle is 55 degrees. Which angle is 55 degrees?", "C", ["The angle between the radius and tangent", "The central angle standing on the chord", "The angle in the alternate segment standing on the chord", "Every circumference angle"], "Use the alternate segment theorem."),
  geometryNumeric("y10-geometry-tangent-m7", "Tangents XA and XB come from X. If XA = 3y + 2 and XB = 20, find y.", "3y+2=20", "6", "Equal tangent lengths give 3y + 2 = 20."),
  geometryChoice("y10-geometry-tangent-m8", "A student says a tangent can cross a circle at two points. What is the best correction?", "D", ["A tangent always passes through the centre", "A tangent is another name for a chord", "A tangent must have length zero", "A tangent touches the circle at one point"], "A line meeting a circle at two points is a secant, not a tangent."),
  geometryNumeric("y10-geometry-tangent-m9", "PT is tangent at T, OT = 9 and OP = 15. Find PT.", "9^2+PT^2=15^2", "12", "The radius-tangent angle is 90 degrees, so use Pythagoras."),
  geometryChoice("y10-geometry-tangent-m10", "From external point P, PA and PB are tangents. OA and OB are radii. Which pair of facts is enough to begin proving right triangles OAP and OBP congruent?", "B", ["OA and PA are parallel; OB and PB are parallel", "OA = OB; PA = PB; each radius is perpendicular to its tangent", "Angles OPA and OPB are both central angles", "AB is a diameter; OP is a tangent"], "Radii are equal, tangent lengths are equal, and both triangles are right-angled at contact."),
];

const geometricProofsWorked: WorkedExample[] = [
  {
    title: "Write a short circle proof",
    questionLatex: "\\text{AB is a diameter and C lies on the circle. Explain why }\\angle ACB=90^\\circ.",
    steps: [
      { explanation: "State the given information.", latex: "\\text{Given: AB is a diameter and C lies on the circle.}" },
      { explanation: "Name the theorem that connects the given information to the required angle.", latex: "\\text{An angle in a semicircle is }90^\\circ." },
    ],
    finalAnswerLatex: "\\therefore \\angle ACB=90^\\circ",
  },
  {
    title: "Match a congruence statement to its reason",
    questionLatex: "\\text{Triangles ABC and DEF have }AB=DE,\\ BC=EF,\\ AC=DF.\\text{ Explain why the triangles are congruent.}",
    steps: [
      { explanation: "List the three matching side pairs.", latex: "AB=DE,\\quad BC=EF,\\quad AC=DF" },
      { explanation: "Three matching sides use the SSS congruence test.", latex: "\\triangle ABC\\cong\\triangle DEF\\quad\\text{by SSS}" },
    ],
    finalAnswerLatex: "\\triangle ABC\\cong\\triangle DEF\\quad\\text{by SSS}",
  },
  {
    title: "Reject an unsupported claim",
    questionLatex: "\\text{A student writes: angle A equals angle D because the diagram looks symmetric. Is this a valid proof reason?}",
    steps: [
      { explanation: "A diagram can suggest a relationship, but appearance is not evidence.", latex: "\\text{appearance}\\ne\\text{proof}" },
      { explanation: "Use a stated fact or a named theorem instead.", latex: "\\text{given fact}\\Rightarrow\\text{theorem}\\Rightarrow\\text{conclusion}" },
    ],
    finalAnswerLatex: "\\text{No. The claim needs a stated fact or theorem.}",
  },
];

const geometricProofsGuided: PracticeQuestion[] = [
  geometryChoice("y10-geometry-proof-g1", "AB is a diameter and C lies on the circle. Which reason completes the proof that angle ACB is 90 degrees?", "B", ["Angles in the same segment are equal", "An angle in a semicircle is 90 degrees", "Tangents from an external point are equal", "SSS congruence"], "The stated diameter makes angle ACB an angle in a semicircle."),
  geometryChoice("y10-geometry-proof-g2", "Triangles ABC and DEF have three equal corresponding side pairs. Which reason proves they are congruent?", "A", ["SSS", "AA similarity", "Angles on a straight line", "Alternate segment theorem"], "Three matching side pairs give SSS congruence."),
  geometryChoice("y10-geometry-proof-g3", "Which order gives the clearest short proof structure?", "C", ["Conclusion, guess, diagram", "Reason, conclusion, unsupported claim", "Given, reason, conclusion", "Diagram, conclusion, given"], "A clear proof begins with known information, applies a reason, then states the conclusion."),
  geometryChoice("y10-geometry-proof-g4", "Which statement is not a valid proof reason?", "D", ["Opposite angles in a cyclic quadrilateral sum to 180 degrees", "Corresponding angles in similar triangles are equal", "A radius is perpendicular to a tangent at contact", "The angles look equal in the sketch"], "A sketch is not reliable evidence for equality."),
];

const geometricProofsIndependent: PracticeQuestion[] = [
  geometryChoice("y10-geometry-proof-i1", "ABCD is cyclic and angle ABC is 108 degrees. Which reason lets you calculate angle ADC?", "A", ["Opposite angles in a cyclic quadrilateral sum to 180 degrees", "A radius is perpendicular to a tangent", "RHS congruence", "Equal tangents have equal length"], "Angles ABC and ADC are opposite cyclic angles."),
  geometryChoice("y10-geometry-proof-i2", "Two triangles have two matching angles. Which conclusion is justified?", "B", ["The triangles are congruent by SSS", "The triangles are similar by AA", "The triangles are right-angled", "No relationship is justified"], "Two equal corresponding angles establish AA similarity."),
  geometryChoice("y10-geometry-proof-i3", "A proof says: PA and PB are tangents from P, so PA = PB. Which reason supports the conclusion?", "C", ["Angles in the same segment", "Equal chords theorem", "Tangents from the same external point are equal", "SAS congruence"], "The equal-tangent theorem applies directly."),
  geometryChoice("y10-geometry-proof-i4", "Which statement is evidence rather than a conclusion?", "D", ["Therefore the triangles are congruent", "Hence angle ACB is 90 degrees", "So the scale factor is 2", "Given: AB = DE and BC = EF"], "A given equality is evidence that can support a later conclusion."),
  geometryChoice("y10-geometry-proof-i5", "A proof claims two triangles are congruent because all three corresponding angles are equal. What is the flaw?", "B", ["Equal angles prove RHS", "Equal angles establish similarity but not necessarily congruence", "The triangles must be circles", "Three angles are never useful"], "AAA fixes shape but not size."),
];

const geometricProofsMastery: PracticeQuestion[] = [
  geometryChoice("y10-geometry-proof-m1", "Which item should appear first in a short geometric proof?", "A", ["The given information", "An unsupported guess", "The final conclusion only", "A measurement from the sketch"], "Start from facts supplied in the question."),
  geometryChoice("y10-geometry-proof-m2", "Which reason proves an angle standing on a diameter is 90 degrees?", "C", ["AA similarity", "Equal tangent lengths", "Angle in a semicircle", "SAS congruence"], "Use the semicircle theorem."),
  geometryChoice("y10-geometry-proof-m3", "Which reason proves triangles congruent when three corresponding sides match?", "D", ["AA", "RHS", "SAS", "SSS"], "Three corresponding sides give SSS."),
  geometryChoice("y10-geometry-proof-m4", "Which is the strongest reason for writing OT perpendicular to PT when PT is tangent at T and OT is a radius?", "B", ["The sketch looks right-angled", "A radius is perpendicular to a tangent at contact", "Opposite cyclic angles sum to 180 degrees", "Angles in the same segment are equal"], "Use the radius-tangent theorem."),
  geometryChoice("y10-geometry-proof-m5", "A proof establishes triangle ABC is similar to triangle DEF. Which next claim is justified?", "A", ["Corresponding sides are in a constant ratio", "Every matching side is equal", "Both triangles are congruent", "Each triangle is right-angled"], "Similarity gives proportional corresponding sides."),
  geometryChoice("y10-geometry-proof-m6", "Which line is a valid conclusion after stating that ABCD is cyclic and angle ABC is 114 degrees?", "C", ["Angle ADC equals 114 degrees by same segment angles", "Angle ADC equals 90 degrees by the semicircle theorem", "Angle ADC equals 66 degrees because opposite cyclic angles sum to 180 degrees", "Angle ADC equals 57 degrees because a centre angle is double"], "The opposite angle is 180 - 114 = 66 degrees."),
  geometryChoice("y10-geometry-proof-m7", "Which proof chain is logically complete?", "D", ["Angles look equal, so the triangles are congruent", "Two sides match, so SSS applies", "AB is a diameter, so every angle in the circle is 90 degrees", "AB is a diameter and C lies on the circle; an angle in a semicircle is 90 degrees; therefore angle ACB is 90 degrees"], "The final option links a given fact to a theorem and a precise conclusion."),
  geometryChoice("y10-geometry-proof-m8", "A student uses SAS congruence after listing two equal sides and an equal angle that is not between those sides. Which assessment is correct?", "B", ["The proof is complete", "The SAS reason is not supported because the angle is not included", "AA similarity should always replace SAS", "The triangles cannot be similar"], "SAS congruence requires the included angle."),
  geometryChoice("y10-geometry-proof-m9", "Proof chain: PA and PB are tangents from P, so PA = PB. OA = OB because they are radii. Angles OAP and OBP are 90 degrees. Which reason best completes a congruence proof for triangles OAP and OBP?", "A", ["RHS congruence", "AA similarity only", "Angles in the same segment", "Cyclic quadrilateral angles"], "The triangles are right-angled with equal hypotenuse OP and equal radius sides OA and OB, so RHS applies."),
  geometryChoice("y10-geometry-proof-m10", "A proof concludes two circumference angles are equal because they stand on chord AB. What extra fact is needed to use the same-segment theorem?", "C", ["The chord must be a diameter", "The circle must have radius 1", "The angles must lie in the same segment", "The angles must both be central angles"], "The angles must stand on the chord from the same segment."),
];

const congruentMistakes = [
  { mistake: "Assuming equal angles prove congruence.", fix: "Equal angles prove the same shape, but not necessarily the same size." },
  { mistake: "Ignoring vertex order in a congruence statement.", fix: "Match each vertex with the corresponding vertex in the same position." },
  { mistake: "Using SAS when the known angle is not included.", fix: "For SAS, the equal angle must lie between the two equal sides." },
  { mistake: "Using RHS for a triangle without a right angle.", fix: "RHS applies only to right triangles." },
];

const similarMistakes = [
  { mistake: "Adding the same amount to corresponding sides.", fix: "Similar triangles use multiplication by a constant scale factor." },
  { mistake: "Mixing the direction of a scale factor.", fix: "State whether you are moving from small to large or large to small." },
  { mistake: "Assuming similar triangles must have equal side lengths.", fix: "Similar triangles have equal corresponding angles and proportional sides." },
  { mistake: "Comparing non-corresponding sides.", fix: "Match vertices first, then compare sides in the same relative position." },
];

const circleChordAngleMistakes = [
  { mistake: "Doubling the central angle instead of the circumference angle.", fix: "The angle at the centre is twice the angle at the circumference standing on the same arc." },
  { mistake: "Using the same-segment theorem for angles on opposite sides of a chord.", fix: "Check that both angles lie in the same segment before claiming they are equal." },
  { mistake: "Assuming every quadrilateral in a circle sketch is cyclic.", fix: "Use the cyclic quadrilateral theorem only when all four vertices are stated to lie on the circle." },
  { mistake: "Forgetting that a diameter creates a semicircle.", fix: "An angle at the circumference standing on a diameter is 90 degrees." },
];

const circleTangentsMistakes = [
  { mistake: "Treating a tangent as a chord.", fix: "A tangent touches the circle once. A chord joins two points on the circle." },
  { mistake: "Claiming every radius is perpendicular to every tangent.", fix: "The right angle occurs where the radius meets its tangent at the point of contact." },
  { mistake: "Using equal tangent lengths from different external points.", fix: "The equal-length theorem applies to two tangents drawn from the same external point." },
  { mistake: "Using Pythagoras before establishing a right angle.", fix: "First state that the radius is perpendicular to the tangent at contact." },
];

const geometricProofsMistakes = [
  { mistake: "Treating the appearance of a sketch as evidence.", fix: "Use given facts, definitions and named theorems as reasons." },
  { mistake: "Naming a theorem without checking its conditions.", fix: "Match every part of the theorem to the information stated in the question." },
  { mistake: "Jumping from the given information straight to a conclusion.", fix: "Include the reason that connects the evidence to the conclusion." },
  { mistake: "Using AAA to claim congruence.", fix: "Equal angles establish similarity. Congruence also needs information that fixes size." },
];

export function year10GeometryProofsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) || unit.slug !== "geometry-proofs") return null;
  const base = { syllabusArea: "Measurement and Space", masteryPassMark: 0.8 };

  if (lesson.slug === "congruent-triangles") return {
    ...base,
    description: "Use SSS, SAS, ASA and RHS to identify congruent triangles and match corresponding parts.",
    learningIntention: "Use congruence tests and vertex order to reason about triangles with the same shape and size.",
    successCriteria: ["Recognise congruent triangles.", "Choose SSS, SAS, ASA or RHS.", "Match corresponding vertices, sides and angles.", "Find a missing corresponding value."],
    teaching: { paragraphs: ["Congruent triangles have the same shape and the same size. They can be placed exactly on top of each other.", "The order of vertices matters when writing a congruence statement. Corresponding vertices must appear in matching positions.", "Four common tests prove congruence: three equal sides; two equal sides with their included angle; two equal angles with the included side; or the right-triangle test using hypotenuse and one shorter side.", "Once congruence is proven, corresponding sides and corresponding angles are equal."], latexBlocks: ["\\text{SSS},\\quad \\text{SAS},\\quad \\text{ASA},\\quad \\text{RHS}", "\\triangle ABC\\cong\\triangle DEF\\Rightarrow A\\leftrightarrow D,\\ B\\leftrightarrow E,\\ C\\leftrightarrow F"] },
    workedExamples: congruentWorked, guidedPractice: congruentGuided, independentPractice: congruentIndependent, commonMistakes: congruentMistakes, masteryQuiz: congruentMastery,
  };
  if (lesson.slug === "similar-triangles") return {
    ...base,
    description: "Use angle and side relationships to identify similar triangles and calculate scale factors.",
    learningIntention: "Use similarity tests and scale factors to reason about triangles with the same shape.",
    successCriteria: ["Recognise similar triangles.", "Choose AA, SSS in proportion or SAS in proportion.", "Calculate a scale factor.", "Use a scale factor to find a missing side."],
    teaching: { paragraphs: ["Similar triangles have the same shape but are not required to have the same size.", "Corresponding angles are equal. Corresponding side lengths are connected by a constant scale factor.", "Similarity can be shown using two equal angles, three proportional sides, or two proportional sides with their included equal angle.", "Keep the direction of the scale factor clear. An enlargement factor compares the larger corresponding length with the smaller one."], latexBlocks: ["\\text{AA},\\quad \\text{SSS in proportion},\\quad \\text{SAS in proportion}", "k=\\frac{\\text{new length}}{\\text{original length}}"] },
    workedExamples: similarWorked, guidedPractice: similarGuided, independentPractice: similarIndependent, commonMistakes: similarMistakes, masteryQuiz: similarMastery,
  };
  if (lesson.slug === "circle-chord-angle") return {
    ...base,
    description: "Use chord and angle theorems to find missing angles in circles and cyclic quadrilaterals.",
    learningIntention: "Use circle angle theorems to identify relationships and calculate missing angles.",
    successCriteria: ["Connect central and circumference angles on the same arc.", "Use same-segment and semicircle theorems.", "Find missing opposite angles in cyclic quadrilaterals.", "Choose a theorem that matches the stated information."],
    teaching: { paragraphs: ["Circle theorems connect angles that stand on the same arc or chord. Read each description carefully so you use the correct relationship.", "The angle at the centre is twice the angle at the circumference when both stand on the same arc.", "Angles at the circumference standing on the same chord in the same segment are equal. An angle at the circumference standing on a diameter is 90 degrees.", "A quadrilateral is cyclic when all four vertices lie on a circle. Its opposite angles sum to 180 degrees.", "Equal chords in the same circle subtend equal angles at the centre."], latexBlocks: ["\\angle\\text{ at centre}=2\\times\\angle\\text{ at circumference on the same arc}", "\\text{angle in a semicircle}=90^\\circ", "\\text{opposite angles in a cyclic quadrilateral sum to }180^\\circ"] },
    workedExamples: circleChordAngleWorked, guidedPractice: circleChordAngleGuided, independentPractice: circleChordAngleIndependent, commonMistakes: circleChordAngleMistakes, masteryQuiz: circleChordAngleMastery,
  };
  if (lesson.slug === "circle-tangents") return {
    ...base,
    description: "Use radius-tangent, equal-tangent and alternate-segment facts to reason about circles.",
    learningIntention: "Recognise tangents and use tangent theorems to find angles and lengths.",
    successCriteria: ["Distinguish tangents, chords and radii.", "Use the right angle between a radius and tangent at contact.", "Use equal tangent lengths from an external point.", "Recognise a light application of the alternate segment theorem."],
    teaching: { paragraphs: ["A tangent is a line that touches a circle at exactly one point. The touching point is called the point of contact.", "A radius drawn to the point of contact is perpendicular to the tangent. This often creates a right triangle.", "Two tangents drawn from the same external point have equal lengths.", "A chord joins two points on a circle. The alternate segment theorem says the angle between a tangent and a chord equals the angle at the circumference standing on that chord in the alternate segment."], latexBlocks: ["\\text{radius}\\perp\\text{tangent at the point of contact}", "PA=PB\\quad\\text{for tangents from the same external point P}", "\\text{tangent-chord angle}=\\text{angle in the alternate segment}"] },
    workedExamples: circleTangentsWorked, guidedPractice: circleTangentsGuided, independentPractice: circleTangentsIndependent, commonMistakes: circleTangentsMistakes, masteryQuiz: circleTangentsMastery,
  };
  if (lesson.slug === "geometric-proofs") return {
    ...base,
    description: "Write short geometric proofs by linking given facts, valid reasons and precise conclusions.",
    learningIntention: "Build short geometric proof chains using given information and known theorems.",
    successCriteria: ["Separate given facts from conclusions.", "Choose a theorem that supports each step.", "Identify unsupported claims.", "Complete short proof chains involving triangles and circles."],
    teaching: { paragraphs: ["A geometric proof explains why a conclusion must be true. A clear short proof moves from given information to a reason and then to a conclusion.", "Reasons can be definitions, stated facts or known theorems. A diagram can help you think, but appearance alone is not proof.", "Before naming a theorem, check its conditions. For example, SAS congruence needs the included angle, and the same-segment theorem needs angles in the same segment.", "Write only the steps needed to justify the conclusion. A short connected argument is stronger than a long list of unrelated facts."], latexBlocks: ["\\text{given}\\Rightarrow\\text{reason}\\Rightarrow\\text{conclusion}", "\\text{evidence}+\\text{valid theorem}\\Rightarrow\\text{justified claim}", "\\text{appearance of a sketch}\\ne\\text{proof}"] },
    workedExamples: geometricProofsWorked, guidedPractice: geometricProofsGuided, independentPractice: geometricProofsIndependent, commonMistakes: geometricProofsMistakes, masteryQuiz: geometricProofsMastery,
  };
  return null;
}
