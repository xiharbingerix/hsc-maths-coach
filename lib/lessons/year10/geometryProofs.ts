import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { TriangleDiagram } from "../types";

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
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
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

export function year10GeometryProofsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "geometry-proofs") return null;
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
  return null;
}
