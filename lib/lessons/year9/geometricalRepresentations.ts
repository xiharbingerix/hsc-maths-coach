import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

type LessonContent = Pick<ExplicitLesson, "description" | "learningIntention" | "successCriteria" | "teaching" | "workedExamples" | "guidedPractice" | "independentPractice" | "commonMistakes" | "masteryQuiz">;

function answer(id: string, prompt: string, latex: string, value: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  const displayLatex = /-(?:g|i)\d+$/.test(id) ? "\\text{Show your method clearly.}" : latex;
  const autoVariants: string[] = [];

  // Plain integers → decimal form (e.g. 4 → 4.0)
  if (/^-?\d+$/.test(value)) {
    autoVariants.push(`${value}.0`);
  }

  // Decimals → one trailing zero (e.g. 2.5 → 2.50)
  if (/^-?\d*\.\d+$/.test(value)) {
    autoVariants.push(`${value}0`);
  }

  // Leading-zero decimal → no leading zero (e.g. 0.25 → .25)
  if (/^0\./.test(value)) {
    autoVariants.push(value.slice(1));
  }

  return { id, prompt, latex: displayLatex, answer: value, acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers, ...autoVariants])), hint: "Identify the matching information, then calculate or interpret carefully.", explanation };
}

function number(id: string, prompt: string, latex: string, value: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return answer(id, prompt, latex, value, explanation, acceptedAnswers);
}

function length(id: string, prompt: string, latex: string, value: string, unit: string, explanation: string): PracticeQuestion {
  return answer(id, prompt, latex, value, explanation, [`${value} ${unit}`, `${value}${unit}`]);
}

function scale(id: string, prompt: string, latex: string, value: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return answer(id, prompt, latex, value, explanation, [`scale factor ${value}`, `scale factor of ${value}`, ...acceptedAnswers]);
}

function ratio(id: string, prompt: string, latex: string, value: string, explanation: string): PracticeQuestion {
  return answer(id, prompt, latex, value, explanation, [value.replace(":", " to ")]);
}

function choice(id: string, prompt: string, value: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = "\\text{Select A, B, C, or D.}"): PracticeQuestion {
  return { id, prompt, latex, answer: value, choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })), hint: "Compare the options with the description.", explanation };
}

const similarFigures: LessonContent = {
  description: "Recognise similar figures and use matching side lengths to solve simple problems.",
  learningIntention: "Explain similarity as the same shape with matching sides changed by one scale factor.",
  successCriteria: ["Recognise similar figures.", "Match corresponding sides.", "Find a missing side.", "Distinguish similar and congruent figures."],
  teaching: { paragraphs: ["Similar figures have the same shape, although their sizes may differ.", "Matching angles are equal. Matching sides are multiplied by the same scale factor.", "The word matching matters: compare sides that play the same role in each figure.", "Congruent figures are a special case: they match in both shape and size, so their scale factor is 1."], latexBlocks: ["\\frac{\\text{new matching side}}{\\text{original matching side}}=\\text{scale factor}", "\\text{similar: same shape}\\qquad\\text{congruent: same shape and size}"] },
  workedExamples: [
    { title: "Check matching side ratios", questionLatex: "\\text{Rectangle A is }3\\text{ cm by }5\\text{ cm. Rectangle B is }6\\text{ cm by }10\\text{ cm. Are they similar?}", steps: [{ explanation: "Compare matching sides.", latex: "6\\div3=2,\\quad10\\div5=2" }, { explanation: "Both sides use one multiplier.", latex: "\\text{scale factor}=2" }], finalAnswerLatex: "\\text{Yes, the rectangles are similar.}" },
    { title: "Find a missing side", questionLatex: "\\text{Similar triangles have matching sides }4\\text{ cm and }10\\text{ cm. Another matching side changes from }6\\text{ cm to }x.\\text{ Find }x.", steps: [{ explanation: "Find the scale factor.", latex: "10\\div4=2.5" }, { explanation: "Apply it to the matching side.", latex: "x=6\\times2.5=15\\text{ cm}" }], finalAnswerLatex: "15\\text{ cm}" },
    { title: "Reject a false similarity claim", questionLatex: "\\text{Rectangle A is }2\\text{ cm by }4\\text{ cm. Rectangle B is }4\\text{ cm by }7\\text{ cm. Are they similar?}", steps: [{ explanation: "Compare both side multipliers.", latex: "4\\div2=2,\\quad7\\div4=1.75" }, { explanation: "The multipliers do not match.", latex: "2\\ne1.75" }], finalAnswerLatex: "\\text{No.}" },
  ],
  guidedPractice: [
    choice("y9-geo-sim-g1", "A 3 cm by 4 cm rectangle and a 6 cm by 8 cm rectangle are compared. Are they similar?", "A", ["Yes, scale factor 2", "Yes, scale factor 3", "No, because the sizes differ", "No, because all rectangles are different"], "Both matching sides are doubled."),
    length("y9-geo-sim-g2", "Two similar figures have matching sides 5 cm and 15 cm. A 7 cm side on the smaller figure matches a side on the larger figure. Find that length.", "15\\div5=3,\\quad7\\times3", "21", "cm", "Use scale factor 3."),
    choice("y9-geo-sim-g3", "Which statement is always true for similar figures?", "C", ["They have equal areas", "They are the same size", "Matching angles are equal", "Every side length is equal"], "Similar figures have equal matching angles."),
    choice("y9-geo-sim-g4", "Which pair is congruent?", "B", ["Two squares with sides 3 cm and 6 cm", "Two triangles with matching sides 3 cm, 4 cm, 5 cm", "Two rectangles 2 cm by 4 cm and 4 cm by 8 cm", "Two circles with radii 2 cm and 5 cm"], "Matching side lengths make the triangles the same shape and size."),
  ],
  independentPractice: [
    choice("y9-geo-sim-i1", "Are rectangles 4 cm by 7 cm and 8 cm by 14 cm similar?", "A", ["Yes", "No", "Only if their areas match", "Only if they are drawn together"], "Both dimensions are doubled."),
    length("y9-geo-sim-i2", "A 3 cm side becomes 12 cm in a similar enlargement. Find the matching enlarged length for a 5 cm side.", "12\\div3=4,\\quad5\\times4", "20", "cm", "Use scale factor 4."),
    choice("y9-geo-sim-i3", "Are triangles with side lengths 3, 4, 5 and 6, 8, 11 similar?", "D", ["Yes, scale factor 2", "Yes, because two sides double", "Yes, because both are triangles", "No, because one matching ratio differs"], "The final side would need to be 10, not 11."),
    choice("y9-geo-sim-i4", "What is the difference between congruent and similar figures?", "C", ["Similar figures always have different angles", "Congruent figures have different shapes", "Congruent figures have the same shape and size", "Similar figures must be rectangles"], "Congruent figures match in shape and size."),
    length("y9-geo-sim-i5", "Similar figures have scale factor 1.5 from small to large. Find the large matching side for 8 cm.", "8\\times1.5", "12", "cm", "Multiply by 1.5."),
  ],
  commonMistakes: [
    { mistake: "Comparing sides that do not correspond.", fix: "Match sides that occupy the same position in each figure." },
    { mistake: "Assuming all rectangles or triangles are similar.", fix: "Check that every matching side uses the same scale factor." },
    { mistake: "Calling enlarged similar figures congruent.", fix: "Congruent figures must also have the same size." },
    { mistake: "Using different scale factors for different sides.", fix: "One scale factor applies to all matching lengths." },
  ],
  masteryQuiz: [
    choice("y9-geo-sim-m1", "Are 2 cm by 5 cm and 6 cm by 15 cm rectangles similar?", "A", ["Yes", "No", "Only if drawn to scale", "Only if their areas match"], "Both sides use scale factor 3."),
    length("y9-geo-sim-m2", "A 4 cm side becomes 10 cm. Find the matching enlarged length for a 6 cm side.", "10\\div4=2.5,\\quad6\\times2.5", "15", "cm", "Apply scale factor 2.5."),
    choice("y9-geo-sim-m3", "Which statement is true for congruent figures?", "D", ["Scale factor must be 2", "Angles differ", "Only areas match", "Scale factor is 1"], "Congruent figures keep every length unchanged."),
    scale("y9-geo-sim-m4", "A 7 cm side matches a 21 cm side in a similar figure. Find the scale factor from small to large.", "21\\div7", "3", "Divide new length by original length."),
    choice("y9-geo-sim-m5", "Which pair is not similar?", "B", ["3 by 6 and 5 by 10", "4 by 7 and 8 by 13", "2 by 3 and 6 by 9", "5 by 8 and 10 by 16"], "The matching multipliers for 4 by 7 and 8 by 13 are not equal."),
    length("y9-geo-sim-m6", "A similar reduction has scale factor 1/4. Find the reduced matching length for 28 cm.", "28\\times\\frac14", "7", "cm", "Multiply by one quarter."),
    choice("y9-geo-sim-m7", "A student says any two right triangles are similar. What is the best correction?", "C", ["All triangles are congruent", "Right angles cannot match", "A right angle alone is not enough to guarantee the same shape", "Scale factors apply only to squares"], "The other angles and side proportions also matter."),
    length("y9-geo-sim-m8", "A triangular sign is enlarged. A 12 cm side becomes 18 cm. Find the enlarged matching length for a 20 cm side.", "18\\div12=1.5,\\quad20\\times1.5", "30", "cm", "Use scale factor 1.5."),
    length("y9-geo-sim-m9", "Similar figures have matching sides 9 cm and 15 cm. A side on the larger figure is 25 cm. Find its matching smaller side.", "25\\div(15\\div9)", "15", "cm", "Reverse the enlargement by dividing by 5/3."),
    choice("y9-geo-sim-m10", "Triangle A has sides 6, 8, 10. Triangle B has sides 15, 12, 9. Which statement is correct?", "D", ["They are not similar because the lists are ordered differently", "They are congruent", "Their scale factor is 3", "They are similar after matching 6 to 9, 8 to 12 and 10 to 15"], "Each matching side is multiplied by 1.5."),
  ],
};

const ratioScale: LessonContent = {
  description: "Use ratios and scale factors to describe enlargements and reductions.",
  learningIntention: "Treat scale factor as the multiplier connecting matching lengths.",
  successCriteria: ["Find a scale factor.", "Use a scale factor to calculate a matching length.", "Recognise enlargement and reduction.", "Write simple scale ratios."],
  teaching: { paragraphs: ["A ratio compares two quantities. A scale factor answers a practical question: what do I multiply by?", "A scale factor greater than 1 enlarges a figure. A scale factor between 0 and 1 reduces it.", "To find the scale factor, divide the new matching length by the original matching length.", "Keep the direction clear. Small to large and large to small use reciprocal scale factors."], latexBlocks: ["k=\\frac{\\text{new length}}{\\text{original length}}", "\\text{new length}=k\\times\\text{original length}"] },
  workedExamples: [
    { title: "Find an enlargement factor", questionLatex: "\\text{A }4\\text{ cm side becomes }12\\text{ cm. Find }k.", steps: [{ explanation: "Divide new by original.", latex: "k=12\\div4=3" }], finalAnswerLatex: "3" },
    { title: "Apply a reduction", questionLatex: "\\text{A }15\\text{ m length is scaled by }\\frac15.\\text{ Find the new length.}", steps: [{ explanation: "Multiply by the reduction factor.", latex: "15\\times\\frac15=3\\text{ m}" }], finalAnswerLatex: "3\\text{ m}" },
    { title: "Reverse a scale", questionLatex: "\\text{A model length is }6\\text{ cm after scaling a real length by }\\frac14.\\text{ Find the real length.}", steps: [{ explanation: "Reverse the reduction.", latex: "6\\div\\frac14=24\\text{ cm}" }], finalAnswerLatex: "24\\text{ cm}" },
  ],
  guidedPractice: [
    scale("y9-geo-scale-g1", "A length changes from 5 cm to 20 cm. Find the scale factor.", "20\\div5", "4", "Divide new by original."),
    length("y9-geo-scale-g2", "Scale 9 m by a factor of 3.", "9\\times3", "27", "m", "Multiply by 3."),
    length("y9-geo-scale-g3", "Reduce 16 cm by scale factor 1/4.", "16\\times\\frac14", "4", "cm", "Multiply by one quarter."),
    choice("y9-geo-scale-g4", "Which scale factor describes a reduction?", "B", ["3", "0.5", "2", "10"], "A reduction factor lies between 0 and 1."),
  ],
  independentPractice: [
    scale("y9-geo-scale-i1", "A 6 cm side becomes 15 cm. Find the scale factor.", "15\\div6", "2.5", "Divide new by original."),
    length("y9-geo-scale-i2", "Enlarge 7 cm by scale factor 4.", "7\\times4", "28", "cm", "Multiply by 4."),
    length("y9-geo-scale-i3", "Reduce 35 m by scale factor 1/5.", "35\\times\\frac15", "7", "m", "Multiply by one fifth."),
    choice("y9-geo-scale-i4", "A model uses scale factor 1/10 from real object to model. Which statement is correct?", "C", ["The model is ten times longer", "The lengths are equal", "Each model length is one tenth of the real length", "The model has no matching sides"], "The factor one tenth reduces each length."),
    ratio("y9-geo-scale-i5", "Write the ratio of model length 1 cm to real length 100 cm.", "1:100", "1:100", "The model-to-real ratio is one to one hundred."),
  ],
  commonMistakes: [
    { mistake: "Dividing original by new when the direction is small to large.", fix: "Use new divided by original for the requested direction." },
    { mistake: "Adding the scale factor instead of multiplying.", fix: "Scale factor is a multiplier." },
    { mistake: "Calling a factor below 1 an enlargement.", fix: "A factor between 0 and 1 gives a reduction." },
    { mistake: "Ignoring direction when reversing a scale.", fix: "Use the reciprocal factor when the direction reverses." },
  ],
  masteryQuiz: [
    scale("y9-geo-scale-m1", "A side changes from 4 cm to 12 cm. Find the scale factor.", "12\\div4", "3", "Divide new by original."),
    length("y9-geo-scale-m2", "Scale 11 m by factor 2.", "11\\times2", "22", "m", "Multiply by 2."),
    length("y9-geo-scale-m3", "Reduce 40 cm by factor 1/8.", "40\\times\\frac18", "5", "cm", "Multiply by one eighth."),
    choice("y9-geo-scale-m4", "Which factor enlarges a figure?", "D", ["0", "1/4", "0.8", "1.5"], "A factor greater than 1 enlarges."),
    scale("y9-geo-scale-m5", "A 12 cm side becomes 3 cm. Find the scale factor.", "3\\div12", "0.25", "Divide new by original.", ["1/4"]),
    length("y9-geo-scale-m6", "A model length is 8 cm using scale factor 1/5 from real to model. Find the real length.", "8\\div\\frac15", "40", "cm", "Reverse the reduction."),
    ratio("y9-geo-scale-m7", "Write the scale ratio for 1 cm representing 250 cm.", "1:250", "1:250", "Write drawing length to real length."),
    length("y9-geo-scale-m8", "A 14 cm side is enlarged to 35 cm. Find the enlarged match for a 22 cm side.", "35\\div14=2.5,\\quad22\\times2.5", "55", "cm", "Find and apply scale factor 2.5."),
    length("y9-geo-scale-m9", "A reduction maps 36 m to 9 m. Find the reduced match for 52 m.", "9\\div36=\\frac14,\\quad52\\times\\frac14", "13", "m", "Apply the same reduction factor."),
    choice("y9-geo-scale-m10", "A figure is enlarged by 3, then reduced by 1/3. What happens to each length?", "A", ["It returns to its original length", "It triples", "It becomes one third", "It increases by 2"], "The factors multiply to 1."),
  ],
};

const scaleDrawings: LessonContent = {
  description: "Interpret map and plan scales and convert drawing lengths into real lengths.",
  learningIntention: "Use a stated drawing scale while keeping units consistent.",
  successCriteria: ["Interpret a written scale.", "Use a ratio scale.", "Convert drawing and real lengths.", "Check units before calculating."],
  teaching: { paragraphs: ["A scale drawing keeps the shape of an object while shrinking or enlarging its lengths.", "A written scale such as 1 cm represents 2 m tells you how drawing lengths connect to real lengths.", "A ratio scale such as 1:100 uses the same unit on both sides: 1 cm on the drawing represents 100 cm in reality.", "Convert units before comparing or writing a ratio. This small habit prevents large errors."], latexBlocks: ["\\text{real length}=\\text{drawing length}\\times\\text{scale multiplier}", "1:100\\quad\\text{means}\\quad1\\text{ cm}:100\\text{ cm}"] },
  workedExamples: [
    { title: "Use a written plan scale", questionLatex: "\\text{A plan uses }1\\text{ cm}:2\\text{ m. A wall is }4.5\\text{ cm on the plan. Find its real length.}", steps: [{ explanation: "Multiply by 2 m per centimetre.", latex: "4.5\\times2=9\\text{ m}" }], finalAnswerLatex: "9\\text{ m}" },
    { title: "Use ratio scale", questionLatex: "\\text{A drawing uses }1:100.\\text{ A line is }7\\text{ cm. Find the real length in metres.}", steps: [{ explanation: "Find the real centimetres.", latex: "7\\times100=700\\text{ cm}" }, { explanation: "Convert to metres.", latex: "700\\text{ cm}=7\\text{ m}" }], finalAnswerLatex: "7\\text{ m}" },
    { title: "Find map distance", questionLatex: "\\text{A map uses }1\\text{ cm}:5\\text{ km. A route is }3.2\\text{ cm. Find the real distance.}", steps: [{ explanation: "Multiply by 5 km per centimetre.", latex: "3.2\\times5=16\\text{ km}" }], finalAnswerLatex: "16\\text{ km}" },
  ],
  guidedPractice: [
    length("y9-geo-draw-g1", "A plan uses 1 cm to represent 3 m. A line is 4 cm. Find the real length.", "4\\times3", "12", "m", "Multiply by 3 m per centimetre."),
    length("y9-geo-draw-g2", "A map uses 1 cm to represent 5 km. A route is 6 cm. Find the real distance.", "6\\times5", "30", "km", "Multiply by 5 km per centimetre."),
    length("y9-geo-draw-g3", "A plan uses scale 1:100. A line is 5 cm. Find the real length in metres.", "5\\times100=500\\text{ cm}", "5", "m", "Five hundred centimetres is five metres."),
    choice("y9-geo-draw-g4", "What does scale 1:200 mean on a plan?", "B", ["1 m represents 200 cm", "1 cm represents 200 cm", "200 cm represents 1 km", "Units do not matter"], "A ratio scale compares lengths in the same unit."),
  ],
  independentPractice: [
    length("y9-geo-draw-i1", "A map uses 1 cm to represent 8 km. A route is 2.5 cm. Find the real distance.", "2.5\\times8", "20", "km", "Multiply by 8 km per centimetre."),
    length("y9-geo-draw-i2", "A plan uses 1 cm to represent 2 m. A real wall is 14 m. Find its drawing length.", "14\\div2", "7", "cm", "Divide by 2 m per centimetre."),
    length("y9-geo-draw-i3", "A scale drawing uses 1:50. A line is 8 cm. Find the real length in metres.", "8\\times50=400\\text{ cm}", "4", "m", "Convert four hundred centimetres to four metres."),
    choice("y9-geo-draw-i4", "A student treats scale 1:100 as 1 cm representing 100 m. What is the error?", "C", ["They should add 100", "They should use kilometres", "A ratio scale uses the same units on both sides", "The drawing must be enlarged"], "One centimetre represents one hundred centimetres, not one hundred metres."),
    length("y9-geo-draw-i5", "A room is 6 m long. A plan uses 1 cm to represent 0.5 m. Find its drawing length.", "6\\div0.5", "12", "cm", "Divide by the real length represented by each centimetre."),
  ],
  commonMistakes: [
    { mistake: "Ignoring the units in a scale.", fix: "Read both sides and convert units when needed." },
    { mistake: "Multiplying when finding drawing length from real length.", fix: "Reverse the scale by dividing." },
    { mistake: "Reading 1:100 as 1 cm to 100 m.", fix: "Ratio scales compare the same unit on both sides." },
    { mistake: "Rounding too early.", fix: "Keep exact values until the final length is calculated." },
  ],
  masteryQuiz: [
    length("y9-geo-draw-m1", "A map uses 1 cm to represent 4 km. A route is 3 cm. Find the real distance.", "3\\times4", "12", "km", "Multiply by the map scale."),
    length("y9-geo-draw-m2", "A plan uses 1 cm to represent 2 m. A real wall is 10 m. Find its drawing length.", "10\\div2", "5", "cm", "Reverse the scale."),
    length("y9-geo-draw-m3", "A plan uses 1:100. A line is 9 cm. Find the real length in metres.", "9\\times100=900\\text{ cm}", "9", "m", "Convert nine hundred centimetres to metres."),
    ratio("y9-geo-draw-m4", "Write the ratio scale if 1 cm represents 300 cm.", "1:300", "1:300", "Use drawing length to real length."),
    choice("y9-geo-draw-m5", "Which statement correctly interprets 1:500?", "D", ["1 cm is 500 m", "500 cm is 1 km", "Units can differ without conversion", "1 cm represents 500 cm"], "Both sides use the same unit."),
    length("y9-geo-draw-m6", "A map uses 1 cm to represent 6 km. A route is 4.5 cm. Find the real distance.", "4.5\\times6", "27", "km", "Multiply by 6."),
    length("y9-geo-draw-m7", "A 16 m wall is shown on a plan using 1 cm to represent 2.5 m. Find the drawing length.", "16\\div2.5", "6.4", "cm", "Divide real length by scale multiplier."),
    length("y9-geo-draw-m8", "A plan uses 1:250. A room is drawn as 3.6 cm long. Find its real length in metres.", "3.6\\times250=900\\text{ cm}", "9", "m", "Convert nine hundred centimetres to metres."),
    length("y9-geo-draw-m9", "A map uses 1 cm to represent 7.5 km. Two route sections measure 2.4 cm and 1.6 cm. Find the total real distance.", "(2.4+1.6)\\times7.5", "30", "km", "Add the map sections, then apply the scale."),
    choice("y9-geo-draw-m10", "A 5 m room is drawn as 4 cm. Which written scale is correct?", "A", ["1 cm represents 1.25 m", "1 cm represents 20 m", "1 cm represents 9 m", "1 cm represents 0.8 m"], "Divide five metres by four centimetres."),
  ],
};

const geometricRepresentations: LessonContent = {
  description: "Choose and interpret nets, plans, elevations and simple geometric diagrams.",
  learningIntention: "Select a representation that communicates the required geometric information.",
  successCriteria: ["Explain what a net shows.", "Interpret plan and elevation descriptions.", "Choose a useful representation.", "Identify missing information and avoid assuming diagrams are to scale."],
  teaching: { paragraphs: ["A representation is a useful view of an object or relationship. Different views answer different questions.", "A net shows the flat faces that fold into a solid. A plan is a view from above. An elevation is a view from one side.", "A diagram can communicate lengths, angles or connections, but only use information that is labelled or stated.", "Unless a question says otherwise, do not assume a diagram is drawn exactly to scale."], latexBlocks: ["\\text{plan}=\\text{view from above}", "\\text{elevation}=\\text{view from a side}", "\\text{net}=\\text{flat faces that fold into a solid}"] },
  workedExamples: [
    { title: "Choose a plan", questionLatex: "\\text{Which representation best shows the arrangement of rooms viewed from above?}", steps: [{ explanation: "The required view is from above.", latex: "\\text{use a plan}" }], finalAnswerLatex: "\\text{A plan}" },
    { title: "Interpret a cube net", questionLatex: "\\text{A flat diagram contains six equal squares joined edge-to-edge and can fold without overlap. What can it represent?}", steps: [{ explanation: "A cube has six equal square faces.", latex: "6\\text{ square faces}" }], finalAnswerLatex: "\\text{A cube net}" },
    { title: "Avoid an unsafe assumption", questionLatex: "\\text{A sketch looks like a right angle but has no right-angle marker. Can the angle be assumed to be }90^\\circ?", steps: [{ explanation: "Only stated or marked information can be used.", latex: "\\text{not marked}\\Rightarrow\\text{not guaranteed}" }], finalAnswerLatex: "\\text{No.}" },
  ],
  guidedPractice: [
    choice("y9-geo-rep-g1", "Which representation shows a building from above?", "A", ["Plan", "Front elevation", "Side elevation", "Circuit"], "A plan is viewed from above."),
    choice("y9-geo-rep-g2", "Which representation shows the faces of a prism laid flat?", "C", ["Scale factor", "Path", "Net", "Median"], "A net unfolds the faces."),
    number("y9-geo-rep-g3", "How many square faces appear in a cube net?", "6", "6", "A cube has six square faces."),
    choice("y9-geo-rep-g4", "A diagram looks to scale but no scale is stated. Which is safest?", "D", ["Measure every drawn side", "Assume every angle", "Ignore labels", "Use only labelled or stated information"], "Appearance alone is not reliable."),
  ],
  independentPractice: [
    choice("y9-geo-rep-i1", "Which view best shows the front height and width of a shed?", "B", ["Plan", "Front elevation", "Network", "Net only"], "A front elevation shows the object from the front."),
    choice("y9-geo-rep-i2", "A net contains two congruent triangles and three rectangles. Which solid can it form?", "C", ["Cube", "Cylinder", "Triangular prism", "Sphere"], "A triangular prism has two triangular ends and three rectangular faces."),
    choice("y9-geo-rep-i3", "Which information is missing if a drawing gives a room shape but no lengths or scale?", "A", ["Its actual dimensions", "Its number of corners", "Its general outline", "That it is a room"], "Actual dimensions cannot be inferred safely."),
    choice("y9-geo-rep-i4", "Which representation is most useful for checking whether all faces of a box are included?", "D", ["Median", "Side ratio only", "Route list", "Net"], "A net displays every outside face."),
    choice("y9-geo-rep-i5", "A sketch appears to show equal sides but has no matching marks or lengths. Which statement is correct?", "B", ["The sides are definitely equal", "Equality cannot be assumed", "The shape must be a square", "Measure the screen"], "Use marked or stated facts only."),
  ],
  commonMistakes: [
    { mistake: "Assuming a diagram is drawn exactly to scale.", fix: "Use labelled and stated information only." },
    { mistake: "Confusing a plan with an elevation.", fix: "Plan means above; elevation means a side view." },
    { mistake: "Leaving out a face when interpreting a net.", fix: "Count each flat face once." },
    { mistake: "Expecting one representation to answer every question.", fix: "Choose the view that displays the needed information." },
  ],
  masteryQuiz: [
    choice("y9-geo-rep-m1", "Which representation shows an object viewed from above?", "A", ["Plan", "Elevation", "Net", "Scale factor"], "A plan is the top view."),
    choice("y9-geo-rep-m2", "Which representation unfolds the faces of a solid?", "B", ["Elevation", "Net", "Network", "Ratio"], "A net lays the faces flat."),
    number("y9-geo-rep-m3", "How many rectangular side faces does a triangular prism have?", "3", "3", "Each triangle side forms a rectangular face."),
    choice("y9-geo-rep-m4", "Which view best shows the side height of a building?", "C", ["Plan", "Net", "Side elevation", "Map route"], "A side elevation shows a side view."),
    choice("y9-geo-rep-m5", "A sketch has no scale and no equal-side marks. Which claim is safe?", "D", ["All drawn lengths are exact", "The longest drawn side is truly longest", "Matching-looking sides are equal", "Only stated lengths can be used"], "The picture alone is not enough."),
    choice("y9-geo-rep-m6", "Which net description matches a rectangular prism?", "B", ["Two circles only", "Six rectangles arranged to fold into a box", "One square only", "Three triangles only"], "A rectangular prism has six rectangular faces."),
    choice("y9-geo-rep-m7", "A plan shows a rectangular room but no scale. What cannot be determined?", "A", ["The real room length", "That the room has four corners", "That the view is from above", "That the outline is rectangular"], "A scale or length label is needed."),
    choice("y9-geo-rep-m8", "A packaging designer wants to check where each face folds. Which representation is most useful?", "C", ["Front elevation", "Plan only", "Net", "List of medians"], "A net shows connected flat faces."),
    choice("y9-geo-rep-m9", "A builder needs the arrangement of rooms and the outside height. Which pair is most useful?", "D", ["Two nets", "Two routes", "A ratio only", "A plan and an elevation"], "The plan shows arrangement; the elevation shows height."),
    choice("y9-geo-rep-m10", "A diagram appears to show a right angle and equal sides, but neither fact is marked. What should a student do?", "B", ["Use both assumptions", "Use neither assumption unless stated", "Measure with a ruler and claim exact values", "Assume the drawing is a square"], "Visual appearance is not proof."),
  ],
};

const networks: LessonContent = {
  description: "Introduce vertices, edges, degrees, paths, circuits and simple weighted routes.",
  learningIntention: "Read a network as points joined by connections and use it for simple route reasoning.",
  successCriteria: ["Count vertices and edges.", "Find vertex degree.", "Recognise paths and circuits.", "Compare simple weighted routes."],
  teaching: { paragraphs: ["A network is a simplified picture of connections. The points are called vertices and the joining lines are called edges.", "The degree of a vertex is the number of edges meeting it.", "A path follows connected edges from one vertex to another. A circuit is a path that returns to its starting vertex.", "Weights can show distance, time or cost. For a route, add the edge weights used."], latexBlocks: ["\\text{degree of a vertex}=\\text{number of incident edges}", "\\text{route weight}=\\text{sum of edge weights used}"] },
  workedExamples: [
    { title: "Count vertices and edges", questionLatex: "\\text{A network has vertices A, B, C and edges AB, BC, AC. Count vertices and edges.}", steps: [{ explanation: "Count the named points.", latex: "A,B,C\\Rightarrow3\\text{ vertices}" }, { explanation: "Count the connections.", latex: "AB,BC,AC\\Rightarrow3\\text{ edges}" }], finalAnswerLatex: "3\\text{ vertices and }3\\text{ edges}" },
    { title: "Find a degree", questionLatex: "\\text{Edges AB, AC, AD and BC meet in a network. Find the degree of A.}", steps: [{ explanation: "Count edges containing A.", latex: "AB,AC,AD" }], finalAnswerLatex: "3" },
    { title: "Compare weighted routes", questionLatex: "\\text{From A to C, route A-B-C has weights }4,3.\\text{ Route A-D-C has weights }2,6.\\text{ Find the shorter route.}", steps: [{ explanation: "Add route weights.", latex: "A-B-C:4+3=7,\\quad A-D-C:2+6=8" }], finalAnswerLatex: "A-B-C" },
  ],
  guidedPractice: [
    number("y9-geo-net-g1", "A network has vertices A, B, C and D. How many vertices are there?", "4", "4", "Count the named points."),
    number("y9-geo-net-g2", "A network has edges AB, BC, CD and DA. How many edges are there?", "4", "4", "Count each listed connection once."),
    number("y9-geo-net-g3", "A network has edges AB, AC and AD. Find the degree of A.", "3", "3", "Three edges meet A."),
    choice("y9-geo-net-g4", "Which description is a circuit?", "D", ["A-B-C", "A-B", "C-D-E", "A-B-C-A"], "A circuit returns to its starting vertex."),
  ],
  independentPractice: [
    number("y9-geo-net-i1", "A network has edges AB, BC, CD, DA and AC. How many edges are there?", "5", "5", "Count each edge once."),
    number("y9-geo-net-i2", "A network has edges AB, BC, BD and BE. Find the degree of B.", "4", "4", "Four edges meet B."),
    choice("y9-geo-net-i3", "Which list describes a path from A to D using edges AB, BC and CD?", "B", ["A-C-D", "A-B-C-D", "D-B-A", "A-D"], "The listed path follows connected edges."),
    number("y9-geo-net-i4", "Route A-B-C has weights 5 and 4. Find its total weight.", "5+4", "9", "Add the edge weights."),
    choice("y9-geo-net-i5", "What can an edge weight represent?", "C", ["Only a vertex name", "Only degree", "Distance, time or cost", "Only the number of vertices"], "Weights record useful quantities on connections."),
  ],
  commonMistakes: [
    { mistake: "Counting a vertex twice because several edges meet it.", fix: "Count each named point once." },
    { mistake: "Calling every path a circuit.", fix: "A circuit must return to its starting vertex." },
    { mistake: "Finding degree by counting all edges in the network.", fix: "Count only edges meeting the chosen vertex." },
    { mistake: "Comparing routes without adding weights.", fix: "Add the weights along each candidate route." },
  ],
  masteryQuiz: [
    number("y9-geo-net-m1", "A network lists vertices A, B, C, D and E. How many vertices are there?", "5", "5", "Count the named points."),
    number("y9-geo-net-m2", "A network has edges AB, AC, BC and CD. How many edges are there?", "4", "4", "Count each listed connection."),
    number("y9-geo-net-m3", "Edges AB, AC, AD and AE meet A. Find degree A.", "4", "4", "Four edges meet A."),
    choice("y9-geo-net-m4", "Which route is a circuit?", "C", ["A-B-C", "A-D", "A-B-D-A", "B-C-D"], "The route returns to A."),
    number("y9-geo-net-m5", "Route P-Q-R has weights 7 and 5. Find its total weight.", "7+5", "12", "Add the route weights."),
    choice("y9-geo-net-m6", "Which statement correctly defines a path?", "A", ["A sequence of connected edges", "A single unconnected point only", "The total number of vertices", "A scale drawing"], "A path follows connections."),
    number("y9-geo-net-m7", "A network has edges AB, BC, CD, DA and AC. Find degree A.", "AB,AD,AC", "3", "Edges AB, AD and AC meet A."),
    number("y9-geo-net-m8", "From A to D, route A-B-D has weights 4 and 7. Route A-C-D has weights 6 and 3. Find the smaller route weight.", "\\min(4+7,6+3)", "9", "Compare 11 and 9."),
    choice("y9-geo-net-m9", "A route A-B-C-A uses existing edges and returns to A. What is it?", "B", ["A vertex", "A circuit", "A scale factor", "An elevation"], "A closed path is a circuit."),
    number("y9-geo-net-m10", "From S to T, route S-A-T has weights 8 and 5. Route S-B-C-T has weights 3, 4 and 4. Find the shortest route weight.", "\\min(8+5,3+4+4)", "11", "Compare 13 with 11."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "similar-figures": similarFigures,
  "ratio-scale-factors": ratioScale,
  "scale-drawings": scaleDrawings,
  "geometric-representations": geometricRepresentations,
  "networks-introduction": networks,
};

export function year9GeometricalRepresentationsLessonOverride(course: CoursePathwaySeed, unit: CourseUnitSeed, lesson: CourseLessonSeed): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-9-mathematics" || unit.slug !== "geometrical-representations") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return { syllabusArea: "Measurement and Space", masteryPassMark: 0.8, ...content };
}
