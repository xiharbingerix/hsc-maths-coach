import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import {
  formatChoiceText,
  practicalChoice,
  formulaAnswer as baseFormulaAnswer,
} from "../questionHelpers";

type QualityTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "synthesis";

type QualityPracticeQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function qualityAnswer({
  id,
  prompt,
  latex,
  answer,
  acceptedAnswers,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers: string[];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
  };
}

function qualityChoice({
  id,
  prompt,
  latex,
  answer,
  choices,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  distractorMisconceptions,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: "A" | "B" | "C" | "D";
  choices: [string, string, string, string];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    distractorMisconceptions,
  };
}

function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function coordinateVariants(x: number, y: number): string[] {
  return [
    `(${x}, ${y})`,
    `${x},${y}`,
    `${x}, ${y}`,
    `x=${x},y=${y}`,
    `x = ${x}, y = ${y}`,
  ];
}

const GRAPH_TRANSFORM_EXPLANATIONS: Record<string, string> = {
  // ── Composite functions ────────────────────────────────────────────────────
  "y11adv-gtc-i4":
    "Evaluate the inner function first: g(1) = 2. Then use that output as input to the outer function: f(2) = 5. For (f∘g)(x), always substitute into g before f.",
  "y11adv-gtc-m6":
    "Work from the inside out: g(3) = −1, so the inner output is −1. Then f(−1) = 7. In a composite function, the right-hand function is always applied first.",

  // General translations
  "y11adv-gt-trans-g2":
    "In y = f(x) + 6, the +6 is outside the function, so every y-coordinate increases by 6. The vertical translation is 6 units up.",
  "y11adv-gt-trans-g3":
    "The expression x + 4 is inside the function, so the horizontal direction reverses. y = f(x + 4) shifts the graph 4 units left.",
  "y11adv-gt-trans-g4":
    "For y = f(x - 3) - 2, every point moves right 3 and down 2. The point (1,5) moves to (4,3).",
  "y11adv-gt-trans-i1":
    "The -7 is outside f(x), so it changes only the y-values. The graph shifts 7 units down.",
  "y11adv-gt-trans-i2":
    "A shift right 5 is written with x - 5 inside the function. The minus sign inside does not mean left; it means the image moves right.",
  "y11adv-gt-trans-i4":
    "Under y = f(x + 2) + 3, points move left 2 and up 3. Starting from (6,-1), the image is (4,2).",
  "y11adv-gt-trans-i5":
    "The transformation is left 3 and down 4. Applying that to (-2,6) gives x = -5 and y = 2, so the image is (-5,2).",
  "y11adv-gt-trans-m3":
    "For y = f(x - 8), the x - 8 is inside the function, so the graph shifts 8 units right.",
  "y11adv-gt-trans-m5":
    "The rule y = f(x + 1) - 6 moves every point left 1 and down 6. The point (2,9) becomes (1,3).",
  "y11adv-gt-trans-m6":
    "A vertical shift down 4 is written outside the function as -4. The required equation form is y = f(x) - 4.",
  "y11adv-gt-trans-m7":
    "For y = f(x - a) + b, the point (x,y) moves to (x + a, y + b). Here (0,-2) moves right 5 and up 7 to (5,5).",
  "y11adv-gt-trans-m9":
    "To move (-3,4) to (-6,9), the x-coordinate decreases by 3 and the y-coordinate increases by 5. The translation is left 3 and up 5.",
  "y11adv-gt-trans-m10":
    "The inside expression x + 4 shifts left 4, and the outside -1 shifts down 1. Applying both to (7,2) gives (3,1).",

  // Dilations and reflections
  "y11adv-gt-dil-g2":
    "In y = 4f(x), the 4 is outside the function, so y-values are multiplied by 4. The vertical dilation factor is 4.",
  "y11adv-gt-dil-g3":
    "For y = f(2x), x-coordinates are divided by 2. The horizontal scale factor is 1/2, not 2.",
  "y11adv-gt-dil-g4":
    "The rule y = -f(x) changes each y-coordinate to its opposite. The point (3,-5) reflects in the x-axis to (3,5).",
  "y11adv-gt-dil-i1":
    "The coefficient 3 outside f(x) multiplies every y-coordinate by 3. The image of (2,-4) is (2,-12).",
  "y11adv-gt-dil-i3":
    "For y = f(x/5), x-coordinates are multiplied by 5. The horizontal scale factor is 5.",
  "y11adv-gt-dil-i4":
    "The rule y = f(-x) changes each x-coordinate to its opposite and leaves y unchanged. The point (-6,1) becomes (6,1).",
  "y11adv-gt-dil-i5":
    "A vertical dilation by factor 1/2 multiplies y by 1/2. The point (4,10) becomes (4,5).",
  "y11adv-gt-dil-m2":
    "For y = f(3x), the horizontal scale factor is the reciprocal of 3. The graph is horizontally dilated by factor 1/3.",
  "y11adv-gt-dil-m4":
    "Reflection in the y-axis changes x to -x. The equation form is y = f(-x).",
  "y11adv-gt-dil-m5":
    "The rule y = -2f(x) multiplies y-values by -2: this combines a reflection in the x-axis with a vertical dilation by factor 2. The point (-1,3) becomes (-1,-6).",
  "y11adv-gt-dil-m6":
    "For y = f(x/4), x-coordinates are multiplied by 4. The point (2,-3) becomes (8,-3).",
  "y11adv-gt-dil-m8":
    "Reflecting in the y-axis changes x from 5 to -5. Then the vertical dilation by factor 3 multiplies y from -2 to -6, giving (-5,-6).",
  "y11adv-gt-dil-m10":
    "The factor 1/2 outside f(x) halves each y-coordinate. The point (-4,8) becomes (-4,4).",

  // ── Polynomial and reciprocal graphs ──────────────────────────────────────
  "y11adv-gt-poly-g1":
    "Compare with vertex form y = (x − h)² + k. Here h = 4 and k = −1, so the vertex is (4, −1). The minus sign inside the brackets makes h positive — it is not −4.",
  "y11adv-gt-poly-g3":
    "Set the denominator equal to zero: x − 5 = 0 gives x = 5. Division by zero is undefined there, so x = 5 is the vertical asymptote.",
  "y11adv-gt-poly-i1":
    "In vertex form y = (x − h)² + k, the bracket x + 1 equals x − (−1), so h = −1 and k = 5. The negative sign outside reflects the parabola down but does not shift the vertex.",
  "y11adv-gt-poly-i2":
    "As x grows very large, the fraction 1/(x + 3) approaches zero, and the remaining constant −4 becomes the limiting value. The horizontal asymptote is y = −4.",
  "y11adv-gt-poly-m1":
    "Vertex form y = (x − h)² + k gives vertex (h, k) directly. Here h = 2 and k = 6, so the parabola has shifted 2 units right and 6 units up from the origin.",
  "y11adv-gt-poly-m2":
    "Set the denominator to zero: x + 7 = 0 gives x = −7. The sign is negative because the bracket uses +7, not −7.",
  "y11adv-gt-poly-m5":
    "The coefficient 2 in the numerator does not affect the horizontal asymptote. As x grows large, 2/(x − 1) → 0, and the expression approaches the constant 4.",
  "y11adv-gt-poly-m7":
    "Set the denominator to zero: x − 6 = 0 gives x = 6. Division by zero is undefined, so x = 6 is excluded from the domain.",

  // ── Circles ───────────────────────────────────────────────────────────────
  "y11adv-gt-circles-g2":
    "The right-hand side of (x−h)²+(y−k)²=r² gives r²=16, so the radius r=√16=4.",
  "y11adv-gt-circles-i2":
    "The right-hand side gives r²=9, so the radius r=√9=3.",
  "y11adv-gt-circles-m2":
    "The right-hand side gives r²=49, so the radius r=√49=7.",
  "y11adv-gt-circles-m5":
    "Completing the square: (x−3)²−9+(y+1)²−1=6, so (x−3)²+(y+1)²=16. The radius r=√16=4.",
  "y11adv-gt-circles-m6":
    "The bracket x−7 means h=7, so the centre x-coordinate is 7 (positive — the minus sign inside gives a positive shift).",
  "y11adv-gt-circles-m8":
    "Complete the square: (x+4)²−16+(y−1)²−1=8, so (x+4)²+(y−1)²=25. Thus r²=25.",

  // ── Exam practice ─────────────────────────────────────────────────────────
  "y11adv-gt-exam-g2":
    "Compare with vertex form y = (x − h)² + k. The bracket x + 4 equals x − (−4), so h = −4. With k = −6 the vertex is (−4, −6).",
  "y11adv-gt-exam-g4":
    "Set the denominator to zero: x + 2 = 0 gives x = −2. The vertical asymptote is at x = −2, not x = 2 — the sign comes from the bracket, not the number.",
  "y11adv-gt-exam-i2":
    "The term 3/(x − 7) approaches zero as x grows large regardless of the 3 in the numerator. The constant −2 outside is what the graph approaches, giving horizontal asymptote y = −2.",
  "y11adv-gt-exam-i4":
    "In y = (x − a)² + 1, the vertex x-coordinate is the value that makes x − a = 0. Since the vertex is at x = 5, the parameter a = 5.",
  "y11adv-gt-exam-m3":
    "Compare with vertex form y = a(x − h)² + k. Here h = 2 and k = 8, so the vertex is (2, 8). The negative sign outside reflects the parabola downward but does not change the vertex position.",
  "y11adv-gt-exam-m4":
    "Set the denominator to zero: x − 9 = 0 gives x = 9. The graph is undefined at x = 9, which is the vertical asymptote.",
  "y11adv-gt-exam-m8":
    "The fraction 1/(x + 1) can get arbitrarily close to zero but never equals zero, so the whole expression can never equal −3. The horizontal asymptote y = −3 is the excluded y-value in the range.",
};

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
) {
  const q = baseFormulaAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]);
  const explanation =
    GRAPH_TRANSFORM_EXPLANATIONS[id] ??
    `Identify whether the question needs a coordinate, an asymptote, or a parameter value, then read it from the equation directly to get ${answer}.`;
  return { ...q, explanation };
}

export function year11AdvancedGraphTransformationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "graph-transformations"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "transformations-composite-functions") {
    return {
      ...base,
      description:
        "Describe vertical and horizontal translations, reflections, transformation order, and simple composite-function values.",
      learningIntention:
        "Describe and recognise transformations of y = f(x), including translations, reflections, transformation order, and simple composite functions.",
      successCriteria: [
        "Describe vertical translations using y = f(x) + a.",
        "Describe horizontal translations using y = f(x - a) and recognise the reversed direction.",
        "Recognise reflections in the x-axis and y-axis.",
        "Evaluate simple composite functions from given values.",
        "Identify common transformation errors from equations and descriptions.",
      ],
      teaching: {
        paragraphs: [
          "A graph transformation changes the position or orientation of a known graph. In Year 11 Advanced, many questions describe the change from y = f(x) to a transformed graph.",
          "Changes outside the function, such as f(x) + a, move the graph vertically. A positive a shifts the graph up and a negative a shifts it down.",
          "Changes inside the function, such as f(x - a), move the graph horizontally. The direction is easy to reverse by mistake: f(x - 3) shifts the graph 3 units right.",
          "A negative sign outside the function, -f(x), reflects the graph in the x-axis. A negative sign inside the function, f(-x), reflects the graph in the y-axis.",
          "Composite functions apply one function first, then another. In a graph-transformation question, composition can appear when one rule is applied after another.",
        ],
        latexBlocks: [
          "y=f(x)+a \\quad \\text{vertical translation by }a",
          "y=f(x-a) \\quad \\text{horizontal translation }a\\text{ units right}",
          "y=-f(x) \\quad \\text{reflection in the }x\\text{-axis}",
          "y=f(-x) \\quad \\text{reflection in the }y\\text{-axis}",
          "(f\\circ g)(x)=f(g(x))",
        ],
      },
      workedExamples: [
        {
          title: "Describe a combined translation",
          questionLatex: "y=f(x-3)+2",
          steps: [
            {
              explanation:
                "The expression inside the function controls the horizontal shift.",
              latex: "x-3 \\Rightarrow 3\\text{ units right}",
            },
            {
              explanation:
                "The number outside the function controls the vertical shift.",
              latex: "+2 \\Rightarrow 2\\text{ units up}",
            },
          ],
          finalAnswerLatex:
            "\\text{Shift }y=f(x)\\text{ right }3\\text{ units and up }2\\text{ units.}",
        },
        {
          title: "Write the equation after a reflection and shift",
          questionLatex:
            "\\text{Reflect }y=f(x)\\text{ in the }x\\text{-axis, then shift }4\\text{ units up.}",
          steps: [
            {
              explanation:
                "Reflection in the x-axis puts a negative sign outside the function.",
              latex: "y=-f(x)",
            },
            {
              explanation: "A shift 4 units up adds 4 outside the function.",
              latex: "y=-f(x)+4",
            },
          ],
          finalAnswerLatex: "y=-f(x)+4",
        },
        {
          title: "Recognise the horizontal-shift error",
          questionLatex:
            "y=f(x+4)",
          steps: [
            {
              explanation:
                "The plus sign is inside the function, so the shift direction is reversed.",
              latex: "x+4=x-(-4)",
            },
            {
              explanation:
                "This shifts the graph left, not right.",
            },
          ],
          finalAnswerLatex:
            "\\text{The graph shifts }4\\text{ units left.}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-gtc-g1", "Describe the transformation shown.", "B", ["Left 3 and up 2", "Right 3 and up 2", "Right 3 and down 2", "Left 2 and up 3"], "Inside x - 3 shifts right 3; outside +2 shifts up 2.", "y=f(x-3)+2"),
        practicalChoice("y11adv-gtc-g2", "Which equation represents a vertical shift 5 units up?", "A", ["y = f(x) + 5", "y = f(x + 5)", "y = f(x - 5)", "y = -f(x)"], "A number added outside f(x) shifts the graph vertically.", "\\text{Shift }y=f(x)\\text{ up }5\\text{ units.}"),
        practicalChoice("y11adv-gtc-g3", "Which equation represents the described reflection and shift?", "C", ["y = f(-x) + 4", "y = f(x) - 4", "y = -f(x) + 4", "y = -f(x + 4)"], "Reflecting in the x-axis gives -f(x), then shifting up gives +4.", "\\text{Reflect in the }x\\text{-axis, then shift up }4."),
        practicalChoice("y11adv-gtc-g4", "A student describes the transformation as a shift right 4 units. Which option identifies the error?", "D", ["The shift should be down 4", "The graph reflects in the x-axis", "The graph does not move", "The graph shifts left 4 units"], "A plus sign inside the function shifts left.", "y=f(x+4)"),
      ],
      independentPractice: [
        practicalChoice("y11adv-gtc-i1", "Describe the transformation shown.", "A", ["Right 2 and down 1", "Left 2 and down 1", "Right 1 and down 2", "Left 2 and up 1"], "Inside x - 2 shifts right 2; outside -1 shifts down 1.", "y=f(x-2)-1"),
        practicalChoice("y11adv-gtc-i2", "Which reflection is represented by the displayed equation?", "B", ["Reflection in the x-axis", "Reflection in the y-axis", "Vertical shift up", "Horizontal shift right"], "Replacing x by -x reflects the graph in the y-axis.", "y=f(-x)"),
        practicalChoice("y11adv-gtc-i3", "Which equation represents a reflection in the x-axis followed by a shift 3 units down?", "C", ["y = f(-x) - 3", "y = f(x - 3)", "y = -f(x) - 3", "y = -f(x - 3)"], "Reflection in the x-axis gives -f(x); down 3 gives -3 outside.", "\\text{Reflect in the }x\\text{-axis and shift down }3."),
        formulaAnswer("y11adv-gtc-i4", "Use the given function values to evaluate the composite value.", "g(1)=2,\\quad f(2)=5,\\quad (f\\circ g)(1)", "5", ["(f o g)(1)=5", "f(g(1))=5"]),
        practicalChoice("y11adv-gtc-i5", "Which equation represents a reflection in the y-axis followed by a shift 2 units up?", "A", ["y = f(-x) + 2", "y = -f(x) + 2", "y = f(x - 2)", "y = f(x) - 2"], "Reflection in the y-axis changes x to -x; up 2 adds outside.", "\\text{Reflect in the }y\\text{-axis and shift up }2."),
      ],
      commonMistakes: [
        { mistake: "Reversing horizontal translations.", fix: "Remember that y = f(x - a) shifts the graph right a units, not left." },
        { mistake: "Confusing vertical and horizontal changes.", fix: "Outside the function changes y-values; inside the function changes x-values." },
        { mistake: "Reflecting in the wrong axis.", fix: "A negative outside f reflects in the x-axis; a negative inside f reflects in the y-axis." },
        { mistake: "Evaluating a composite function in the wrong order.", fix: "For f(g(x)), evaluate g(x) first, then use that output in f." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-gtc-m1", "Describe the transformation shown.", "C", ["Left 3", "Up 3", "Right 3", "Down 3"], "Inside x - 3 shifts right 3.", "y=f(x-3)"),
        practicalChoice("y11adv-gtc-m2", "Describe the transformation shown.", "A", ["Up 4", "Down 4", "Right 4", "Left 4"], "A number outside the function shifts the graph vertically.", "y=f(x)+4"),
        practicalChoice("y11adv-gtc-m3", "Which equation represents reflection in the x-axis?", "D", ["y = f(-x)", "y = f(x) + 1", "y = f(x - 1)", "y = -f(x)"], "A negative outside the function reflects y-values.", "\\text{Reflect }y=f(x)\\text{ in the }x\\text{-axis.}"),
        practicalChoice("y11adv-gtc-m4", "Describe the combined transformation shown.", "B", ["Left 2 and down 5", "Right 2 and down 5", "Right 5 and down 2", "Left 2 and up 5"], "Inside x - 2 shifts right 2; outside -5 shifts down 5.", "y=f(x-2)-5"),
        practicalChoice("y11adv-gtc-m5", "Which equation represents a shift 6 units left?", "A", ["y = f(x + 6)", "y = f(x - 6)", "y = f(x) + 6", "y = -f(x)"], "A shift left 6 uses x + 6 inside the function.", "\\text{Shift }y=f(x)\\text{ left }6\\text{ units.}"),
        formulaAnswer("y11adv-gtc-m6", "Use the given function values to evaluate the composite value.", "g(3)=-1,\\quad f(-1)=7,\\quad (f\\circ g)(3)", "7", ["(f o g)(3)=7", "f(g(3))=7"]),
        practicalChoice("y11adv-gtc-m7", "Which option identifies the common horizontal-shift error?", "B", ["The graph shifts right 4 units", "The graph shifts left 4 units", "The graph shifts up 4 units", "The graph reflects in the y-axis"], "The sign is inside the function, so the direction reverses.", "y=f(x+4)"),
        practicalChoice("y11adv-gtc-m8", "Which equation shows reflection in the y-axis and a vertical shift down 2?", "C", ["y = -f(x) - 2", "y = f(x - 2)", "y = f(-x) - 2", "y = -f(-x) + 2"], "Reflection in the y-axis gives f(-x), then down 2 gives -2 outside.", "\\text{Reflect in the }y\\text{-axis and shift down }2."),
        practicalChoice("y11adv-gtc-m9", "A point on the original graph is transformed by the displayed rule. Where does it move?", "D", ["(4, 4)", "(-1, 4)", "(4, 1)", "(-1, 1)"], "The graph moves left 4 and down 3, so (3,4) moves to (-1,1).", "y=f(x+4)-3,\\quad (3,4)"),
        practicalChoice("y11adv-gtc-m10", "Which equation matches the transformation sequence shown?", "A", ["y = -f(x - 2) + 1", "y = f(-x - 2) + 1", "y = -f(x + 2) - 1", "y = f(x - 2) - 1"], "Right 2 gives f(x - 2), reflecting in the x-axis gives -f(x - 2), then up 1 gives +1.", "\\text{Shift right }2,\\text{ reflect in the }x\\text{-axis, then shift up }1."),
      ],
    };
  }

  if (lesson.slug === "function-translations-general") {
    const translationWorkedGraph: import("../types").CartesianGraph = {
      description:
        "The graph of y = x^2 and its translation y = (x - 2)^2 + 3, with the vertex image labelled.",
      xMin: -3,
      xMax: 6,
      yMin: -1,
      yMax: 8,
      xStep: 1,
      yStep: 1,
      showGrid: true,
      parabolas: [
        { kind: "quadratic", a: 1, b: 0, c: 0, label: "y = f(x)" },
        { kind: "quadratic", a: 1, b: -4, c: 7, label: "y = f(x - 2) + 3" },
      ],
      points: [
        { x: 0, y: 0, label: "(0,0)" },
        { x: 2, y: 3, label: "(2,3)" },
      ],
    };

    return {
      ...base,
      description:
        "Translate functions vertically, horizontally and in combination, and find image points after a translation.",
      learningIntention:
        "Apply general translation rules for y = f(x), including vertical shifts, horizontal shifts with reversed inside signs, combined translations and image coordinates.",
      successCriteria: [
        "Identify vertical translations from y = f(x) + a and y = f(x) - a.",
        "Identify horizontal translations from y = f(x + a) and y = f(x - a).",
        "Find the image of a point after a combined translation.",
        "Match a translation description to the correct equation form.",
      ],
      teaching: {
        paragraphs: [
          "A translation slides the graph without changing its shape. For y = f(x), changes outside the function move points up or down.",
          "The rules y = f(x) + a and y = f(x) - a are vertical translations. Adding outside shifts up; subtracting outside shifts down.",
          "Horizontal translations use the input inside f. This is the sign trap: y = f(x + a) shifts left a, while y = f(x - a) shifts right a.",
          "For a combined translation y = f(x - a) + b, a point (x,y) on the original graph moves to (x + a, y + b). If the rule is y = f(x + a) + b, the x-coordinate moves to x - a.",
        ],
        latexBlocks: [
          "y=f(x)+a \\Rightarrow \\text{up }a",
          "y=f(x)-a \\Rightarrow \\text{down }a",
          "y=f(x+a) \\Rightarrow \\text{left }a",
          "y=f(x-a) \\Rightarrow \\text{right }a",
        ],
      },
      workedExamples: [
        {
          title: "Translate a graph and a point",
          questionLatex: "y=f(x-2)+3,\\quad (0,0)\\text{ on }y=f(x)",
          cartesianGraph: translationWorkedGraph,
          steps: [
            { explanation: "The expression x - 2 is inside f, so the graph shifts 2 units right.", latex: "x-2\\Rightarrow \\text{right }2" },
            { explanation: "The +3 is outside f, so the graph shifts 3 units up.", latex: "+3\\Rightarrow \\text{up }3" },
            { explanation: "Apply the same movement to the point (0,0).", latex: "(0,0)\\mapsto(2,3)" },
          ],
          finalAnswerLatex: "\\text{Right }2\\text{ and up }3;\\quad (0,0)\\mapsto(2,3).",
        },
        {
          title: "Read the sign in a horizontal translation",
          questionLatex: "y=f(x+5)",
          steps: [
            { explanation: "The +5 is inside the function, so the horizontal shift reverses direction.", latex: "x+5=x-(-5)" },
            { explanation: "The graph shifts left 5 units, not right 5 units.", latex: "\\text{left }5" },
          ],
          finalAnswerLatex: "\\text{Shift }y=f(x)\\text{ left }5\\text{ units.}",
        },
        {
          title: "Find the image under a combined translation",
          questionLatex: "y=f(x+3)-4,\\quad (-2,6)\\text{ on }y=f(x)",
          steps: [
            { explanation: "The x + 3 inside f shifts the graph 3 units left.", latex: "x\\mapsto x-3" },
            { explanation: "The -4 outside f shifts the graph 4 units down.", latex: "y\\mapsto y-4" },
            { explanation: "Apply both changes to (-2,6).", latex: "(-2,6)\\mapsto(-5,2)" },
          ],
          finalAnswerLatex: "(-5,2)",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-gt-trans-g1", "Which description matches the transformation?", "B", ["Right 3", "Left 3", "Up 3", "Down 3"], "The +3 is inside f, so the graph shifts left 3 units.", "y=f(x+3)"),
        formulaAnswer("y11adv-gt-trans-g2", "Find the vertical shift distance for the transformation.", "y=f(x)+6", "6", ["up 6", "6 up"]),
        formulaAnswer("y11adv-gt-trans-g3", "Find the horizontal shift distance for the transformation.", "y=f(x+4)", "4", ["left 4", "4 left"]),
        formulaAnswer("y11adv-gt-trans-g4", "A point (1,5) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x-3)-2", "(4,3)", coordinateVariants(4, 3)),
      ],
      independentPractice: [
        formulaAnswer("y11adv-gt-trans-i1", "Find the vertical shift distance for the transformation.", "y=f(x)-7", "7", ["down 7", "7 down"]),
        formulaAnswer("y11adv-gt-trans-i2", "A graph is shifted 5 units right. Find the number that appears inside y = f(x - a).", "y=f(x-a)", "5", ["a=5"]),
        practicalChoice("y11adv-gt-trans-i3", "Which equation shifts y = f(x) left 2 and up 4?", "A", ["y = f(x + 2) + 4", "y = f(x - 2) + 4", "y = f(x + 4) + 2", "y = f(x - 2) - 4"], "Left 2 uses x + 2 inside f, and up 4 adds +4 outside.", "\\text{Left }2,\\quad \\text{up }4"),
        formulaAnswer("y11adv-gt-trans-i4", "A point (6,-1) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x+2)+3", "(4,2)", coordinateVariants(4, 2)),
        formulaAnswer("y11adv-gt-trans-i5", "A point (-2,6) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x+3)-4", "(-5,2)", coordinateVariants(-5, 2)),
      ],
      commonMistakes: [
        { mistake: "Reading y = f(x + a) as a shift right.", fix: "Inside the function, the sign reverses: x + a shifts left a." },
        { mistake: "Reading y = f(x - a) as a shift left.", fix: "x - a inside f shifts the graph right a." },
        { mistake: "Applying a vertical shift to the x-coordinate.", fix: "Outside changes affect y-values only." },
        { mistake: "Applying a horizontal shift to the y-coordinate.", fix: "Inside changes affect x-values only." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-gt-trans-qm1",
          prompt:
            "A point $(2,-1)$ on $y=f(x)$ moves to $(-3,4)$. Which equation gives the translated function?",
          latex: "",
          answer: "D",
          choices: [
            "$y=f(x-5)+5$",
            "$y=f(x+5)-5$",
            "$y=f(x-5)-5$",
            "$y=f(x+5)+5$",
          ],
          hint: "Compare the change in each coordinate.",
          explanation:
            "The point moves 5 units left and 5 units up. A left shift uses $x+5$ inside the function, and an upward shift adds 5 outside, so $y=f(x+5)+5$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student coordinates horizontal sign reversal with the vertical shift.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses the horizontal movement as the inside sign without reversing it.",
            B: "Reverses the vertical direction while handling the horizontal shift correctly.",
            C: "Reverses both the horizontal and vertical directions.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm2",
          prompt:
            "The point $(7,-2)$ lies on the translated function. Find the corresponding point on $y=f(x)$.",
          latex: "g(x)=f(x-4)+3",
          answer: "(3,-5)",
          acceptedAnswers: coordinateVariants(3, -5),
          hint: "Undo the translation applied to points on $f$.",
          explanation:
            "The rule moves original points 4 units right and 3 units up. Reversing those changes sends $(7,-2)$ left 4 and down 3, giving the original point $(3,-5)$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student can reverse a combined translation instead of applying it twice.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-gt-trans-qm3",
          prompt:
            "A student says that under $g(x)=f(x+3)-2$, the point $(4,5)$ moves to $(7,3)$. Which image is correct?",
          latex: "",
          answer: "B",
          choices: ["$(7,3)$", "$(1,3)$", "$(1,7)$", "$(7,7)$"],
          hint: "Treat the inside and outside changes separately.",
          explanation:
            "The $x+3$ shifts points 3 units left, while the $-2$ shifts them 2 units down. Therefore $(4,5)$ maps to $(1,3)$; the student failed to reverse the horizontal sign.",
          difficulty: 3,
          diagnosticIntent:
            "Targets the common error of moving right when the input is changed to $x+3$.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Moves right for $x+3$ but applies the vertical shift correctly.",
            C: "Applies the horizontal shift correctly but moves vertically upward.",
            D: "Moves right and upward, reversing both directions.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm4",
          prompt:
            "The points $(-1,2)$ and $(3,14)$ lie on $y=f(x)$. Under $g(x)=f(x-2)+4$, find the gradient of the line through their image points.",
          latex: "g(x)=f(x-2)+4",
          answer: "3",
          acceptedAnswers: ["m=3", "gradient 3"],
          hint: "A translation changes position but not the slope between corresponding points.",
          explanation:
            "The images are $(1,6)$ and $(5,18)$. Their gradient is $(18-6)/(5-1)=12/4=3$. This also shows that translations preserve the gradient between corresponding points.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student changes only position or incorrectly changes the graph's shape.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm5",
          prompt:
            "An unknown translation maps both $(-2,5)$ to $(4,-1)$ and $(1,0)$ to $(7,-6)$. Write the translated equation in terms of $f$.",
          latex: "y=f(x)",
          answer: "y=f(x-6)-6",
          acceptedAnswers: ["f(x-6)-6", "g(x)=f(x-6)-6", "g(x) = f(x - 6) - 6"],
          hint: "Use both point pairs to confirm one common movement.",
          explanation:
            "Each point moves 6 units right and 6 units down. A right shift by 6 uses $x-6$ inside $f$, and a downward shift by 6 subtracts 6 outside, giving $y=f(x-6)-6$.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student can infer a rule from consistent coordinate evidence.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm6",
          prompt:
            "The function $g(x)=f(x-a)+b$ has vertex $(5,-7)$. Find $a+b$.",
          latex: "f(x)=x^2-4x+1",
          answer: "-1",
          acceptedAnswers: ["a+b=-1", "a + b = -1"],
          hint: "First find the vertex of $f$, then track both coordinates.",
          explanation:
            "Completing the square gives $f(x)=(x-2)^2-3$, so its vertex is $(2,-3)$. Reaching $(5,-7)$ requires a shift right 3 and down 4, hence $a=3$, $b=-4$, and $a+b=-1$.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student can connect vertex form with translation parameters.",
          taskType: "analytical",
        }),
        qualityChoice({
          id: "y11adv-gt-trans-qm7",
          prompt:
            "Relative to $g$, which translation produces $h$?",
          latex: "g(x)=f(x-3)+2,\\qquad h(x)=f(x+1)-4",
          answer: "C",
          choices: [
            "Right 4 and down 2",
            "Left 2 and down 6",
            "Left 4 and down 6",
            "Right 4 and up 6",
          ],
          hint: "Compare the final locations of the same point on $f$.",
          explanation:
            "Relative to $f$, $g$ is right 3 and up 2, while $h$ is left 1 and down 4. Moving from $g$ to $h$ therefore requires 4 units left and 6 units down.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student compares transformations rather than reading each equation in isolation.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Subtracts the inside constants without converting them to actual shifts.",
            B: "Compares only one horizontal parameter and the full vertical change.",
            D: "Reverses both relative movement directions.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm8",
          prompt:
            "Find $k$ so that the translated curve is tangent to the $x$-axis.",
          latex: "f(x)=(x+1)(x-5),\\qquad g(x)=f(x+2)+k",
          answer: "9",
          acceptedAnswers: ["k=9", "k = 9"],
          hint: "Tangency occurs when the translated minimum is exactly zero.",
          explanation:
            "The roots of $f$ are $-1$ and $5$, so its axis is $x=2$ and $f(2)=-9$. The horizontal shift does not change this minimum value. Raising the graph by $k=9$ makes the minimum zero, so $g$ is tangent to the $x$-axis.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student connects translation, vertex value, and the condition for a double root.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm9",
          prompt:
            "The transformed function has a zero at $x=-2$, and its vertex lies on $y=x+2$. Find the sum of all possible values of $a+b$.",
          latex: "f(x)=x^2-6x+13,\\qquad g(x)=f(x-a)+b",
          answer: "-20",
          acceptedAnswers: ["-20.0"],
          hint: "Represent the transformed vertex as $(h,k)$ before solving the two constraints.",
          explanation:
            "Since $f(x)=(x-3)^2+4$, write the transformed graph as $(x-h)^2+k$, where $h=3+a$ and $k=4+b$. The vertex condition gives $k=h+2$. The zero at $x=-2$ gives $(-2-h)^2+k=0$, so $(h+2)(h+3)=0$. The two vertices are $(-2,0)$ and $(-3,-1)$, giving $a+b=-9$ and $-11$. Their sum is $-20$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can combine a locus constraint with a translated quadratic and retain both solutions.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-trans-qm10",
          prompt:
            "The translated function has a double root at $x=5$. Find $a+b$.",
          latex: "f(x)=(x+4)(x-2),\\qquad g(x)=f(x-a)+b",
          answer: "15",
          acceptedAnswers: ["a+b=15", "a + b = 15"],
          hint: "A double root occurs when the translated vertex lies on the $x$-axis.",
          explanation:
            "The roots of $f$ are $-4$ and $2$, so the vertex occurs at $x=-1$ and has value $f(-1)=-9$. Moving the vertex to $(5,0)$ requires a shift right 6 and up 9. Therefore $a=6$, $b=9$, and $a+b=15$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student synthesises root symmetry, vertex value, and translation parameters.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "function-dilations-reflections") {
    const dilationWorkedGraph: import("../types").CartesianGraph = {
      description:
        "The graph of y = x^2 and its vertical dilation y = 3x^2, with the image of (1,1) labelled.",
      xMin: -3,
      xMax: 3,
      yMin: -1,
      yMax: 8,
      xStep: 1,
      yStep: 1,
      showGrid: true,
      parabolas: [
        { kind: "quadratic", a: 1, b: 0, c: 0, label: "y = f(x)" },
        { kind: "quadratic", a: 3, b: 0, c: 0, label: "y = 3f(x)" },
      ],
      points: [
        { x: 1, y: 1, label: "(1,1)" },
        { x: 1, y: 3, label: "(1,3)" },
      ],
    };

    return {
      ...base,
      description:
        "Dilate and reflect functions, including vertical dilation, horizontal dilation, axis reflections and image points.",
      learningIntention:
        "Apply general dilation and reflection rules for y = f(x), including the reciprocal scale factor in y = f(ax).",
      successCriteria: [
        "Find the effect of y = kf(x) on y-coordinates.",
        "Find the horizontal scale factor in y = f(kx) and y = f(x/k).",
        "Find image points under reflections in the x-axis and y-axis.",
        "Match dilation and reflection descriptions to equation forms.",
      ],
      teaching: {
        paragraphs: [
          "A dilation changes the size of a graph relative to an axis. A reflection flips the graph in an axis.",
          "In y = kf(x), the multiplier is outside the function, so it multiplies y-coordinates by k. A negative outside also reflects in the x-axis.",
          "Horizontal dilations are counterintuitive. In y = f(ax), x-coordinates are divided by a, so the horizontal scale factor is 1/a.",
          "The form y = f(x/a) has horizontal scale factor a. Reflections follow the same inside/outside idea: y = -f(x) reflects in the x-axis, while y = f(-x) reflects in the y-axis.",
        ],
        latexBlocks: [
          "y=kf(x) \\Rightarrow y\\text{-values multiply by }k",
          "y=f(ax) \\Rightarrow x\\text{-values multiply by }\\frac{1}{a}",
          "y=f(x/a) \\Rightarrow x\\text{-values multiply by }a",
          "y=-f(x)\\Rightarrow \\text{reflection in the }x\\text{-axis}",
          "y=f(-x)\\Rightarrow \\text{reflection in the }y\\text{-axis}",
        ],
      },
      workedExamples: [
        {
          title: "Apply a vertical dilation",
          questionLatex: "y=3f(x),\\quad (1,1)\\text{ on }y=f(x)",
          cartesianGraph: dilationWorkedGraph,
          steps: [
            { explanation: "The 3 is outside f, so it multiplies every y-coordinate by 3.", latex: "y\\mapsto 3y" },
            { explanation: "The x-coordinate is unchanged because the input x has not changed.", latex: "x\\mapsto x" },
            { explanation: "Apply the change to (1,1).", latex: "(1,1)\\mapsto(1,3)" },
          ],
          finalAnswerLatex: "\\text{Vertical dilation factor }3;\\quad (1,1)\\mapsto(1,3).",
        },
        {
          title: "Use the reciprocal horizontal scale factor",
          questionLatex: "y=f(2x),\\quad (6,1)\\text{ on }y=f(x)",
          steps: [
            { explanation: "The 2 is inside f with x, so the horizontal scale factor is the reciprocal.", latex: "\\text{scale factor }\\frac{1}{2}" },
            { explanation: "Divide the x-coordinate by 2 and leave y unchanged.", latex: "(6,1)\\mapsto(3,1)" },
          ],
          finalAnswerLatex: "(3,1)",
        },
        {
          title: "Reflect in an axis",
          questionLatex: "y=-f(x),\\quad (-3,5)\\text{ on }y=f(x)",
          steps: [
            { explanation: "The negative sign is outside f, so y-values change sign.", latex: "y\\mapsto -y" },
            { explanation: "The x-coordinate is unchanged.", latex: "x\\mapsto x" },
            { explanation: "Apply the reflection to (-3,5).", latex: "(-3,5)\\mapsto(-3,-5)" },
          ],
          finalAnswerLatex: "\\text{Reflection in the }x\\text{-axis; }(-3,-5).",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-gt-dil-g1", "Which transformation is represented?", "A", ["Reflection in the x-axis", "Reflection in the y-axis", "Vertical dilation by factor 2", "Horizontal dilation by factor 2"], "A negative outside f reflects the graph in the x-axis.", "y=-f(x)"),
        formulaAnswer("y11adv-gt-dil-g2", "Find the vertical dilation factor.", "y=4f(x)", "4", ["factor 4"]),
        formulaAnswer("y11adv-gt-dil-g3", "Find the horizontal scale factor.", "y=f(2x)", "1/2", ["0.5", "factor 1/2", "scale factor 1/2"]),
        formulaAnswer("y11adv-gt-dil-g4", "A point (3,-5) lies on y = f(x). Find its image under the displayed transformation.", "y=-f(x)", "(3,5)", coordinateVariants(3, 5)),
      ],
      independentPractice: [
        formulaAnswer("y11adv-gt-dil-i1", "A point (2,-4) lies on y = f(x). Find its image under the displayed transformation.", "y=3f(x)", "(2,-12)", coordinateVariants(2, -12)),
        practicalChoice("y11adv-gt-dil-i2", "Which equation represents reflection in the y-axis?", "C", ["y = -f(x)", "y = f(x) - 1", "y = f(-x)", "y = 2f(x)"], "Reflection in the y-axis changes x to -x inside f.", "\\text{Reflect }y=f(x)\\text{ in the }y\\text{-axis.}"),
        formulaAnswer("y11adv-gt-dil-i3", "Find the horizontal scale factor.", "y=f(x/5)", "5", ["factor 5", "scale factor 5"]),
        formulaAnswer("y11adv-gt-dil-i4", "A point (-6,1) lies on y = f(x). Find its image under the displayed transformation.", "y=f(-x)", "(6,1)", coordinateVariants(6, 1)),
        formulaAnswer("y11adv-gt-dil-i5", "A point (4,10) lies on y = f(x). Find its image under a vertical dilation by factor 1/2.", "y=\\frac{1}{2}f(x)", "(4,5)", coordinateVariants(4, 5)),
      ],
      commonMistakes: [
        { mistake: "Using k instead of 1/k for y = f(kx).", fix: "Inside multipliers affect x-coordinates by the reciprocal factor." },
        { mistake: "Reflecting in the wrong axis.", fix: "A negative outside f reflects in the x-axis; a negative inside f reflects in the y-axis." },
        { mistake: "Changing both coordinates for a vertical dilation.", fix: "Vertical dilation changes y-values only." },
        { mistake: "Changing y-values for a horizontal dilation.", fix: "Horizontal dilation changes x-values only." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-gt-dil-qm1",
          prompt:
            "The point $(6,-2)$ lies on $y=f(x)$. Which point lies on the transformed function?",
          latex: "g(x)=-3f(2x)",
          answer: "C",
          choices: ["$(12,6)$", "$(3,-6)$", "$(3,6)$", "$(-3,6)$"],
          hint: "The inside factor changes $x$; the outside factor changes $y$.",
          explanation:
            "For $f(2x)$, the horizontal scale factor is $1/2$, so $x=6$ becomes $x=3$. Multiplying outside by $-3$ sends $y=-2$ to $y=6$. The image is $(3,6)$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student applies the reciprocal horizontal factor and the signed vertical factor to different coordinates.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses 2 rather than its reciprocal for the horizontal scale factor.",
            B: "Uses the reciprocal horizontal factor but ignores the outside reflection.",
            D: "Treats the negative outside factor as a reflection in the y-axis.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm2",
          prompt:
            "The point $(-4,5)$ lies on $y=g(x)$. Find the corresponding point on $y=f(x)$.",
          latex: "g(x)=\\frac12 f\\!\\left(-\\frac{x}{3}\\right)",
          answer: "(4/3,10)",
          acceptedAnswers: [
            "(4/3, 10)",
            "4/3,10",
            "4/3, 10",
            "(1.3333333333,10)",
          ],
          hint: "Use the input of $f$ for the original $x$-coordinate and undo the outside factor for $y$.",
          explanation:
            "At transformed input $x=-4$, the input sent to $f$ is $-(-4)/3=4/3$. Since the transformed output 5 is half the original output, the original $y$-value is 10. The corresponding point is $(4/3,10)$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student can reverse both an inside reflection/dilation and an outside dilation.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-gt-dil-qm3",
          prompt:
            "The point $(4,3)$ lies on $y=f(x)$. Which option gives its images on $y=2f(x)$ and $y=f(2x)$, in that order?",
          latex: "",
          answer: "B",
          choices: [
            "$(2,3)$ and $(4,6)$",
            "$(4,6)$ and $(2,3)$",
            "$(8,3)$ and $(4,6)$",
            "$(4,6)$ and $(8,3)$",
          ],
          hint: "Outside factors change $y$; inside factors change $x$ by the reciprocal.",
          explanation:
            "The outside factor in $2f(x)$ doubles the $y$-coordinate, giving $(4,6)$. The inside factor in $f(2x)$ halves the $x$-coordinate, giving $(2,3)$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student distinguishes vertical and horizontal dilation effects.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Swaps which equation acts on each coordinate.",
            C: "Uses a horizontal factor of 2 and also assigns the first image incorrectly.",
            D: "Uses 2 instead of its reciprocal for the inside horizontal factor.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm4",
          prompt:
            "Three points on $y=f(x)$ are $(0,0)$, $(4,0)$ and $(6,3)$. Find the area enclosed by their images.",
          latex: "g(x)=-2f\\!\\left(\\frac{x}{2}\\right)",
          answer: "24",
          acceptedAnswers: ["24 square units", "24 units^2", "24 units²"],
          hint: "Map all three coordinates before finding the triangle's area.",
          explanation:
            "The inside $x/2$ doubles all $x$-coordinates, while the outside $-2$ multiplies all $y$-coordinates by $-2$. The images are $(0,0)$, $(8,0)$ and $(12,-6)$. Their area is $\\tfrac12\\lvert 8(-6)\\rvert=24$ square units.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student applies horizontal and vertical scale factors consistently to a geometric configuration.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm5",
          prompt:
            "The transformation $g(x)=a f(bx)$ maps the point $(8,5)$ on $f$ to $(-2,-10)$ on $g$. Find $a+b$.",
          latex: "",
          answer: "-6",
          acceptedAnswers: ["a+b=-6", "a + b = -6"],
          hint: "Relate the image coordinates to $(8/b,5a)$.",
          explanation:
            "A point $(x,y)$ on $f$ maps to $(x/b,ay)$ on $g$. Thus $8/b=-2$, giving $b=-4$, and $5a=-10$, giving $a=-2$. Therefore $a+b=-6$.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student can infer signed inside and outside parameters from a point image.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm6",
          prompt:
            "The function $f$ has $x$-intercepts $-3$ and $1$. Find the sum of the $x$-intercepts of $g$.",
          latex: "g(x)=-2f\\!\\left(-\\frac{x}{3}\\right)",
          answer: "6",
          acceptedAnswers: ["sum=6", "6.0"],
          hint: "Set the input $-x/3$ equal to each original root.",
          explanation:
            "The outside factor does not change the zeros. Solving $-x/3=-3$ gives $x=9$, and solving $-x/3=1$ gives $x=-3$. The transformed intercepts therefore sum to $9+(-3)=6$.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student knows that outside dilation preserves roots while inside changes move them.",
          taskType: "analytical",
        }),
        qualityChoice({
          id: "y11adv-gt-dil-qm7",
          prompt:
            "A student says that $y=f(x/4)$ is a horizontal compression because the input is divided by 4. The point $(2,3)$ lies on $f$. Which statement correctly diagnoses the error?",
          latex: "",
          answer: "A",
          choices: [
            "It is a stretch by factor 4, and the point moves to $(8,3)$.",
            "It is a compression by factor 4, and the point moves to $(1/2,3)$.",
            "It is a vertical stretch by factor 4, and the point moves to $(2,12)$.",
            "It is a reflection in the y-axis, and the point moves to $(-2,3)$.",
          ],
          hint: "Rewrite $x/4$ as $(1/4)x$ and take the reciprocal factor.",
          explanation:
            "The inside multiplier is $1/4$, so the horizontal scale factor is its reciprocal, 4. The graph stretches horizontally and $(2,3)$ maps to $(8,3)$.",
          difficulty: 4,
          diagnosticIntent:
            "Targets the misconception that division inside a function causes horizontal compression.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Uses the inside multiplier directly rather than its reciprocal.",
            C: "Applies an inside factor to the y-coordinate.",
            D: "Treats a positive fractional input factor as a reflection.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm8",
          prompt:
            "The function $g(x)=a f(bx)$ has vertex $(-1,4)$ and opens downward. Find $a+b$.",
          latex: "f(x)=x^2-4x+3",
          answer: "-6",
          acceptedAnswers: ["a+b=-6", "a + b = -6"],
          hint: "Find the original vertex, then transform each coordinate.",
          explanation:
            "Since $f(x)=(x-2)^2-1$, its vertex is $(2,-1)$. Under $g(x)=af(bx)$, the vertex becomes $(2/b,-a)$. Hence $2/b=-1$ gives $b=-2$, and $-a=4$ gives $a=-4$. Thus $a+b=-6$; $a<0$ also confirms the downward opening.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can reconstruct signed dilation parameters from vertex position and orientation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm9",
          prompt:
            "The function $g(x)=a f(x/b)$ has $x$-intercepts $-6$ and $12$ and $y$-intercept $24$. Find $a+b$.",
          latex: "f(x)=(x+2)(x-4)",
          answer: "0",
          acceptedAnswers: ["a+b=0", "a + b = 0", "0.0"],
          hint: "Use the transformed roots to find $b$, then use the y-intercept to find $a$.",
          explanation:
            "The roots $-2$ and $4$ are multiplied by $b$ under $f(x/b)$. The new roots $-6$ and $12$ give $b=3$. Also $f(0)=-8$, so $g(0)=a(-8)=24$ gives $a=-3$. Therefore $a+b=0$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can combine root scaling with vertical scaling to reconstruct a transformation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-dil-qm10",
          prompt:
            "The function $g(x)=a f(bx)$ has $x$-intercepts $-6$ and $3$ and $y$-intercept $10$. Find $a+b$.",
          latex: "f(x)=(x-1)(x+2)",
          answer: "-14/3",
          acceptedAnswers: [
            "-\\frac{14}{3}",
            "-4.6666666667",
            "a+b=-14/3",
            "a + b = -14/3",
          ],
          hint: "Match the ordered pair of original roots to the transformed roots before using the y-intercept.",
          explanation:
            "The transformed roots are $1/b$ and $-2/b$. Matching them to $3$ and $-6$ gives $b=1/3$. Since $f(0)=-2$ and $g(0)=10$, $-2a=10$, so $a=-5$. Hence $a+b=-5+1/3=-14/3$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can reconstruct a two-parameter dilation from roots and an intercept.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "transformations-polynomial-reciprocal-graphs") {
    return {
      ...base,
      description:
        "Transform quadratic, cubic, and reciprocal graphs, and interpret vertices, intercepts, asymptotes, domain, and range.",
      learningIntention:
        "Use transformations to identify key features of polynomial and reciprocal graphs, including vertices, intercepts, and asymptotes.",
      successCriteria: [
        "Identify vertex movement in transformed quadratic graphs.",
        "Recognise translations and reflections of cubic graphs.",
        "Find vertical and horizontal asymptotes of transformed reciprocal graphs.",
        "Choose equations that match graph descriptions.",
        "State simple domain or range effects where they are clear from the transformation.",
      ],
      teaching: {
        paragraphs: [
          "Transformed polynomial and reciprocal graphs are often tested through their key features rather than by drawing the whole graph.",
          "A quadratic in the form $y = (x - h)^2 + k$ has vertex $(h, k)$. This is a direct way to read the movement from $y = x^2$.",
          "Cubic graphs can be shifted and reflected using the same transformation ideas as $y = f(x)$. For example, $y = -(x - 2)^3$ shifts right 2 and reflects in the x-axis.",
          "A reciprocal graph in the form y = 1/(x - h) + k has vertical asymptote x = h and horizontal asymptote y = k.",
          "Domain and range can change when a transformation moves an asymptote or vertex. For reciprocal graphs, the excluded x-value and y-value come from the asymptotes.",
        ],
        latexBlocks: [
          "y=(x-h)^2+k \\quad \\Rightarrow \\quad \\text{vertex }(h,k)",
          "y=(x-h)^3+k \\quad \\Rightarrow \\quad \\text{cubic shifted by }(h,k)",
          "y=\\frac{1}{x-h}+k \\quad \\Rightarrow \\quad x=h,\\ y=k\\text{ are asymptotes}",
          "y=-(x-h)^2+k \\quad \\Rightarrow \\quad \\text{reflection in the }x\\text{-axis}",
        ],
      },
      workedExamples: [
        {
          title: "Transform a quadratic and identify the vertex",
          questionLatex: "y=(x-3)^2+2",
          steps: [
            {
              explanation:
                "Compare the equation with vertex form.",
              latex: "y=(x-h)^2+k",
            },
            {
              explanation:
                "Here h = 3 and k = 2.",
              latex: "(h,k)=(3,2)",
            },
          ],
          finalAnswerLatex:
            "\\text{The graph of }y=x^2\\text{ shifts right }3\\text{ and up }2;\\text{ vertex }(3,2).",
        },
        {
          title: "Transform a reciprocal graph",
          questionLatex: "y=\\frac{1}{x-2}-1",
          steps: [
            {
              explanation:
                "The denominator shows the vertical asymptote.",
              latex: "x-2=0\\Rightarrow x=2",
            },
            {
              explanation:
                "The outside shift shows the horizontal asymptote.",
              latex: "y=-1",
            },
          ],
          finalAnswerLatex:
            "\\text{Vertical asymptote }x=2,\\quad \\text{horizontal asymptote }y=-1.",
        },
        {
          title: "Match a graph description to an equation",
          questionLatex:
            "\\text{Reciprocal graph shifted }4\\text{ units left and }3\\text{ units up.}",
          steps: [
            {
              explanation:
                "A shift left 4 puts x + 4 in the denominator.",
              latex: "\\frac{1}{x+4}",
            },
            {
              explanation:
                "A shift up 3 adds 3 outside.",
              latex: "y=\\frac{1}{x+4}+3",
            },
          ],
          finalAnswerLatex: "y=\\frac{1}{x+4}+3",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-gt-poly-g1", "Find the vertex of the transformed quadratic.", "y=(x-4)^2-1", "(4,-1)", ["4,-1", "(4, -1)", "vertex (4,-1)"]),
        practicalChoice("y11adv-gt-poly-g2", "Which equation matches the described quadratic transformation?", "B", ["y = (x + 2)^2 + 3", "y = (x - 2)^2 + 3", "y = x^2 - 2 + 3", "y = -(x - 2)^2 + 3"], "A horizontal shift 2 units right replaces $x$ with $x-2$. A vertical shift 3 units up then adds 3 outside the square, giving $y=(x-2)^2+3$.", "\\text{Shift }y=x^2\\text{ right }2\\text{ and up }3."),
        formulaAnswer("y11adv-gt-poly-g3", "Find the vertical asymptote of the transformed reciprocal graph.", "y=\\frac{1}{x-5}+2", "x=5", ["5"]),
        practicalChoice("y11adv-gt-poly-g4", "Which equation matches the described reciprocal graph?", "A", ["y = 1/(x - 2) - 1", "y = 1/(x + 2) - 1", "y = 1/(x - 1) + 2", "y = -1/(x - 2) + 1"], "Right 2 uses x - 2; down 1 gives -1 outside.", "\\text{Shift }y=\\frac{1}{x}\\text{ right }2\\text{ and down }1."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-gt-poly-i1", "Find the vertex of the transformed quadratic.", "y=-(x+1)^2+5", "(-1,5)", ["-1,5", "(-1, 5)", "vertex (-1,5)"]),
        formulaAnswer("y11adv-gt-poly-i2", "Find the horizontal asymptote of the transformed reciprocal graph.", "y=\\frac{1}{x+3}-4", "y=-4", ["-4"]),
        practicalChoice("y11adv-gt-poly-i3", "Which description matches the transformed cubic?", "C", ["Shift left 2 and up 1", "Shift right 2 and down 1", "Shift right 2 and up 1", "Reflect in the y-axis only"], "x - 2 shifts right 2 and +1 shifts up 1.", "y=(x-2)^3+1"),
        practicalChoice("y11adv-gt-poly-i4", "Which equation has the displayed asymptotes?", "D", ["y = 1/(x - 4) + 3", "y = 1/(x + 3) - 4", "y = 1/(x - 3) - 4", "y = 1/(x + 4) + 3"], "For vertical asymptote $x=-4$, the denominator must be $x+4$. The outside constant $+3$ gives horizontal asymptote $y=3$, so option D has both required features.", "\\text{Asymptotes }x=-4,\\quad y=3"),
        practicalChoice("y11adv-gt-poly-i5", "Which statement is correct for the displayed reciprocal graph?", "B", ["The domain excludes y = 2", "The domain excludes x = 2", "The vertical asymptote is y = 2", "The graph has vertex (2, 1)"], "The denominator $x-2$ is zero when $x=2$, so the function is undefined there and its domain excludes $x=2$. The outside $+1$ instead determines horizontal asymptote $y=1$.", "y=\\frac{1}{x-2}+1"),
      ],
      commonMistakes: [
        { mistake: "Using the sign inside brackets as the shift direction.", fix: "In y = (x - h)^2 + k, the vertex x-coordinate is h." },
        { mistake: "Calling an asymptote an intercept.", fix: "A reciprocal graph approaches an asymptote; it is not the same as crossing an axis." },
        { mistake: "Moving only the vertex but forgetting reflection.", fix: "A negative outside a quadratic reflects the graph in the x-axis." },
        { mistake: "Mixing up vertical and horizontal asymptotes.", fix: "The denominator gives the vertical asymptote; the outside shift gives the horizontal asymptote." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-gt-poly-qm1",
          prompt:
            "Which equation has vertex $(-2,5)$, opens downward, and has vertical dilation factor 2?",
          latex: "",
          answer: "B",
          choices: [
            "$y=2(x+2)^2+5$",
            "$y=-2(x+2)^2+5$",
            "$y=-2(x-2)^2+5$",
            "$y=-\\frac12(x+2)^2+5$",
          ],
          hint: "Match the vertex, orientation, and dilation factor separately.",
          explanation:
            "The vertex $(-2,5)$ requires $(x+2)^2+5$. Opening downward requires a negative coefficient, and vertical factor 2 gives coefficient $-2$. Hence $y=-2(x+2)^2+5$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student can coordinate vertex signs, orientation, and dilation in one equation.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses the correct vertex and factor but omits the reflection.",
            C: "Uses the vertex x-coordinate as the bracket sign without reversal.",
            D: "Uses the reciprocal vertical factor.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm2",
          prompt:
            "Add the excluded $x$-value in the domain to the excluded $y$-value in the range.",
          latex: "y=-\\frac{3}{x-4}+2",
          answer: "6",
          acceptedAnswers: ["6.0"],
          hint: "Read the two asymptotes before adding their values.",
          explanation:
            "The denominator is zero at $x=4$, so the domain excludes 4. The fraction never equals zero, so the graph never reaches its horizontal asymptote $y=2$. The requested sum is $4+2=6$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student distinguishes the excluded domain and range values of a reciprocal graph.",
          taskType: "analytical",
        }),
        qualityChoice({
          id: "y11adv-gt-poly-qm3",
          prompt:
            "Which option gives both the point of rotational symmetry and the right-end behaviour of the cubic?",
          latex: "y=-(x+1)^3+4",
          answer: "D",
          choices: [
            "$(-1,4)$ and rises to the right",
            "$(1,4)$ and falls to the right",
            "$(1,-4)$ and rises to the right",
            "$(-1,4)$ and falls to the right",
          ],
          hint: "Use the translated centre point and the sign of the leading coefficient.",
          explanation:
            "The translated cubic is centred at $(-1,4)$. Its leading coefficient is negative, so as $x$ increases the graph falls rather than rises. Both features match option D.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student connects transformations with cubic end behaviour.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Finds the centre correctly but ignores the reflection.",
            B: "Reverses the horizontal translation sign while identifying the reflection.",
            C: "Reverses both coordinate signs and the end behaviour.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm4",
          prompt:
            "The reciprocal function passes through $(3,4)$. Find $a$.",
          latex: "y=\\frac{a}{x-2}-1",
          answer: "5",
          acceptedAnswers: ["a=5", "a = 5", "5.0"],
          hint: "Substitute the point into the equation.",
          explanation:
            "Substituting $(x,y)=(3,4)$ gives $4=a/(3-2)-1=a-1$. Therefore $a=5$. The asymptotes remain $x=2$ and $y=-1$ regardless of this numerator.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student knows that asymptotes alone do not determine the reciprocal scale parameter.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm5",
          prompt:
            "A reciprocal function has asymptotes $x=-2$ and $y=3$ and passes through $(0,1)$. Find its numerator $a$.",
          latex: "y=\\frac{a}{x+2}+3",
          answer: "-4",
          acceptedAnswers: ["a=-4", "a = -4", "-4.0"],
          hint: "Use the asymptotes to confirm the form, then substitute the point.",
          explanation:
            "The given form already has the required asymptotes. Substituting $(0,1)$ gives $1=a/2+3$, so $a/2=-2$ and $a=-4$. The negative value places the branches in the opposite pair of quadrants about the asymptote intersection.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student uses a point, not just asymptotes, to determine the reciprocal graph.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm6",
          prompt:
            "A student claims that the horizontal line $y=5$ intersects the parabola twice. How many real intersections are there?",
          latex: "y=-(x-3)^2+4",
          answer: "0",
          acceptedAnswers: ["zero", "0 intersections", "no intersections"],
          hint: "Compare the line with the maximum value of the parabola.",
          explanation:
            "The parabola opens downward and has maximum value 4 at its vertex. Since every point satisfies $y\\le4$, the line $y=5$ lies above the whole graph and has zero real intersections. The student's claim ignores the range.",
          difficulty: 4,
          diagnosticIntent:
            "Targets the misconception that every horizontal line meets a parabola twice.",
          taskType: "analytical",
        }),
        qualityChoice({
          id: "y11adv-gt-poly-qm7",
          prompt:
            "A reciprocal function has asymptotes $x=2$ and $y=-1$ and passes through $(3,4)$. Which equation is correct?",
          latex: "",
          answer: "A",
          choices: [
            "$y=\\frac{5}{x-2}-1$",
            "$y=-\\frac{5}{x-2}-1$",
            "$y=\\frac{1}{x-2}-1$",
            "$y=\\frac{4}{x-2}-1$",
          ],
          hint: "All choices have the same asymptotes; use the point to distinguish them.",
          explanation:
            "With $y=a/(x-2)-1$, substituting $(3,4)$ gives $4=a-1$, so $a=5$. The required equation is $y=5/(x-2)-1$.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student recognises that asymptotes do not determine the numerator.",
          taskType: "problem-solving",
          distractorMisconceptions: {
            B: "Uses the correct magnitude but reverses the branch orientation.",
            C: "Assumes every reciprocal transformation has numerator 1.",
            D: "Copies the point's y-coordinate into the numerator.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm8",
          prompt:
            "The reciprocal function uses the same parameters $h$ and $k$ as the quadratic. Find its horizontal asymptote.",
          latex: "q(x)=(x-h)^2+k,\\quad q(-1)=q(5)=0,\\qquad r(x)=\\frac1{x-h}+k",
          answer: "y=-9",
          acceptedAnswers: ["-9", "y = -9", "horizontal asymptote y=-9"],
          hint: "Use the two quadratic roots to recover its vertex.",
          explanation:
            "The roots $-1$ and $5$ are symmetric about $h=2$. Substituting either root gives $0=(-1-2)^2+k=9+k$, so $k=-9$. The reciprocal graph therefore has horizontal asymptote $y=k=-9$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can recover transformation parameters from quadratic roots and transfer them to another function family.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm9",
          prompt:
            "The parabola has $x$-intercepts 1 and 7. The reciprocal function uses the same $a$ and $b$ and passes through $(5,12)$. Find $a+b+c$.",
          latex: "q(x)=-(x-a)^2+b,\\qquad r(x)=\\frac{c}{x-a}+b",
          answer: "16",
          acceptedAnswers: ["a+b+c=16", "a + b + c = 16", "16.0"],
          hint: "Recover the parabola's vertex from its symmetric roots before using the reciprocal point.",
          explanation:
            "The roots 1 and 7 give axis $a=4$. Since $0=-(1-4)^2+b$, we get $b=9$. Substituting $(5,12)$ into the reciprocal gives $12=c/(5-4)+9$, so $c=3$. Hence $a+b+c=4+9+3=16$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can synthesise quadratic root symmetry with reciprocal scaling.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-gt-poly-qm10",
          prompt:
            "The cubic has zero at $x=1$. The reciprocal function uses the same $h$ and $k$ and passes through $(4,2)$. Find $a+h+k$.",
          latex: "c(x)=-(x-h)^3+k,\\quad h=2,\qquad r(x)=\\frac{a}{x-h}+k",
          answer: "7",
          acceptedAnswers: ["a+h+k=7", "a + h + k = 7", "7.0"],
          hint: "Use the cubic zero to find $k$, then use the reciprocal point to find $a$.",
          explanation:
            "Using $c(1)=0$ gives $-(-1)^3+k=1+k=0$, so $k=-1$. Then $r(4)=2$ gives $2=a/(4-2)-1$, so $a/2=3$ and $a=6$. Therefore $a+h+k=6+2-1=7$.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can transfer shared transformation parameters between cubic and reciprocal models.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "graph-transformations-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed graph-transformation questions involving equations, features, asymptotes, order, and common errors.",
      learningIntention:
        "Apply graph transformation skills to mixed assessment-style questions involving function notation, polynomial graphs, reciprocal graphs, and feature interpretation.",
      successCriteria: [
        "Choose equations that match transformation descriptions.",
        "Interpret vertices, asymptotes, reflections, and translations.",
        "Recognise common horizontal-shift and axis-reflection errors.",
        "Use short, markable answers for coordinates, asymptotes, and simple parameters.",
      ],
      teaching: {
        paragraphs: [
          "Mixed graph-transformation questions often ask for a description, an equation, or a graph feature. Decide which one is being tested before calculating.",
          "For y = f(x), outside changes affect vertical movement and reflections in the x-axis. Inside changes affect horizontal movement and reflections in the y-axis.",
          "For quadratics, vertex form gives the moved vertex directly. For reciprocal graphs, the denominator and outside shift give the asymptotes.",
          "When a question asks for an error, look for reversed horizontal shifts, a reflection in the wrong axis, or an asymptote moved in the wrong direction.",
        ],
        latexBlocks: [
          "y=f(x-a)+b",
          "y=(x-h)^2+k",
          "y=\\frac{1}{x-h}+k",
          "x=h,\\quad y=k\\quad \\text{for reciprocal asymptotes}",
        ],
      },
      workedExamples: [
        {
          title: "Choose the matching transformed equation",
          questionLatex:
            "\\text{Shift }y=f(x)\\text{ left }2\\text{ and reflect in the }x\\text{-axis.}",
          steps: [
            {
              explanation:
                "A shift left 2 means x + 2 inside the function.",
              latex: "f(x+2)",
            },
            {
              explanation:
                "Reflection in the x-axis puts a negative sign outside.",
              latex: "y=-f(x+2)",
            },
          ],
          finalAnswerLatex: "y=-f(x+2)",
        },
        {
          title: "Read transformed graph features",
          questionLatex: "y=\\frac{1}{x-4}+3",
          steps: [
            {
              explanation:
                "The vertical asymptote comes from the denominator.",
              latex: "x-4=0\\Rightarrow x=4",
            },
            {
              explanation:
                "The horizontal asymptote comes from the vertical shift.",
              latex: "y=3",
            },
          ],
          finalAnswerLatex: "x=4,\\quad y=3",
        },
        {
          title: "Recognise an order and sign error",
          questionLatex:
            "\\text{A student says }y=f(x-5)\\text{ shifts the graph left }5\\text{ units.}",
          steps: [
            {
              explanation:
                "Horizontal transformations work in the opposite direction to the sign inside the brackets.",
              latex: "x-5 \\Rightarrow \\text{right }5",
            },
          ],
          finalAnswerLatex:
            "\\text{The graph shifts right }5\\text{ units, not left.}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-gt-exam-g1", "Which equation matches the described transformation?", "A", ["y = f(x + 2) + 3", "y = f(x - 2) + 3", "y = f(x + 3) + 2", "y = -f(x + 2) + 3"], "A shift 2 units left replaces $x$ with $x+2$, while a shift 3 units up adds 3 to the output. Together these give $y=f(x+2)+3$.", "\\text{Shift left }2\\text{ and up }3."),
        formulaAnswer("y11adv-gt-exam-g2", "Find the vertex of the transformed quadratic.", "y=(x+4)^2-6", "(-4,-6)", ["-4,-6", "(-4, -6)", "vertex (-4,-6)"]),
        practicalChoice("y11adv-gt-exam-g3", "Which statement identifies the horizontal-shift error?", "B", ["It shifts left 5", "It shifts right 5", "It shifts up 5", "It reflects in the x-axis"], "For a point originally at input $u$, the equation $x-5=u$ gives its new input $x=u+5$. Every point therefore moves 5 units right, so option B identifies the error.", "y=f(x-5)"),
        formulaAnswer("y11adv-gt-exam-g4", "Find the vertical asymptote of the reciprocal graph.", "y=\\frac{1}{x+2}+5", "x=-2", ["-2"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-gt-exam-i1", "Which equation matches the described transformation?", "D", ["y = f(-x) - 1", "y = f(x - 1)", "y = -f(x) + 1", "y = -f(x) - 1"], "Reflection in the x-axis gives -f(x), then down 1 gives -1 outside.", "\\text{Reflect in the }x\\text{-axis and shift down }1."),
        formulaAnswer("y11adv-gt-exam-i2", "Find the horizontal asymptote of the reciprocal graph.", "y=\\frac{3}{x-7}-2", "y=-2", ["-2"]),
        practicalChoice("y11adv-gt-exam-i3", "Which description matches the displayed transformed cubic?", "C", ["Left 2 and up 4", "Right 4 and down 2", "Right 2 and up 4", "Left 2 and down 4"], "x - 2 shifts right 2 and +4 shifts up 4.", "y=(x-2)^3+4"),
        formulaAnswer("y11adv-gt-exam-i4", "Find the value of the horizontal shift parameter.", "y=(x-a)^2+1,\\quad \\text{vertex }(5,1)", "5", ["a=5"]),
        practicalChoice("y11adv-gt-exam-i5", "Which equation has the displayed reciprocal asymptotes?", "A", ["y = 1/(x - 3) - 4", "y = 1/(x + 3) - 4", "y = 1/(x - 4) - 3", "y = 1/(x + 4) + 3"], "Vertical asymptote x = 3 gives x - 3; horizontal asymptote y = -4 gives -4.", "x=3,\\quad y=-4"),
      ],
      commonMistakes: [
        { mistake: "Treating x - a as a shift left.", fix: "Inside the function, x - a shifts the graph right a units." },
        { mistake: "Using the reciprocal asymptote as an intercept.", fix: "Asymptotes are approached, not read as crossing points." },
        { mistake: "Forgetting that a negative outside the function reflects vertically.", fix: "Use -f(x) for reflection in the x-axis." },
        { mistake: "Giving a long description when a short feature is asked for.", fix: "If the question asks for a vertex or asymptote, give just that feature." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-gt-exam-qm1",
          prompt:
            "The point $(-2,3)$ lies on $y=f(x)$. Which point lies on $y=-f(x-4)+1$?",
          latex: "g(x)=-f(x-4)+1",
          choices: ["$(-6,-2)$", "$(2,-2)$", "$(2,4)$", "$(-6,4)$"],
          answer: "B",
          hint: "First apply the horizontal translation, then transform the output.",
          explanation:
            "Replacing $x$ by $x-4$ shifts the point four units right, so $x=-2$ becomes $x=2$. The outside transformation sends $y$ to $-y+1$, so $3$ becomes $-2$. Therefore the image is $(2,-2)$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks whether students coordinate horizontal translation with an outside reflection and translation.",
          distractorMisconceptions: {
            A: "Applies the horizontal translation in the wrong direction.",
            C: "Translates the output without reflecting it.",
            D: "Reverses the horizontal direction and omits the reflection.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm2",
          prompt:
            "The functions $q(x)=(x+3)^2-2$ and $r(x)=\\dfrac{1}{x+3}-2$ share the same translation parameters. Add the excluded $x$-value of $r$ to its excluded $y$-value.",
          latex: "q(x)=(x+3)^2-2,\\qquad r(x)=\\frac{1}{x+3}-2",
          answer: "-5",
          acceptedAnswers: ["−5", "-5.0"],
          hint: "Read the reciprocal graph's vertical and horizontal asymptotes.",
          explanation:
            "The denominator is zero when $x=-3$, so $x=-3$ is excluded from the domain. The outside translation gives horizontal asymptote $y=-2$, so that value is excluded from the range. Their sum is $-3+(-2)=-5$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks transfer of common translation parameters from a quadratic to a reciprocal graph.",
        }),
        qualityChoice({
          id: "y11adv-gt-exam-qm3",
          prompt:
            "A student says $y=f(-2x)$ reflects $y=f(x)$ in the $x$-axis and stretches it horizontally by factor 2. Which correction is complete?",
          latex: "g(x)=f(-2x)",
          choices: [
            "Reflect in the $y$-axis and compress horizontally by factor $\\tfrac12$",
            "Reflect in the $x$-axis and compress horizontally by factor $\\tfrac12$",
            "Reflect in the $y$-axis and stretch horizontally by factor $2$",
            "Reflect in both axes and stretch vertically by factor $2$",
          ],
          answer: "A",
          hint: "An inside multiplier changes input coordinates inversely.",
          explanation:
            "The negative is inside the function, so it reflects input positions in the $y$-axis, not output values in the $x$-axis. The factor 2 inside acts inversely on horizontal coordinates, giving a horizontal scale factor of $\\tfrac12$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Distinguishes inside reflection and inverse horizontal scale from outside transformations.",
          distractorMisconceptions: {
            B: "Uses the outside-reflection axis for an inside negative.",
            C: "Uses the direct rather than reciprocal horizontal scale factor.",
            D: "Treats both inside operations as outside operations.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm4",
          prompt:
            "Complete the square for $x^2+y^2+4x-6y-12=0$. Then add the centre's coordinates to the radius.",
          latex: "x^2+y^2+4x-6y-12=0",
          answer: "6",
          acceptedAnswers: ["6.0", "sum=6"],
          hint: "Rewrite the equation in centre-radius form before combining the requested values.",
          explanation:
            "Completing both squares gives $(x+2)^2+(y-3)^2=25$. The centre is $(-2,3)$ and the radius is $5$. Hence the required sum is $-2+3+5=6$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks accurate completing of two squares and interpretation of centre-radius form.",
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm5",
          prompt:
            "For $g(x)=a f(x-3)+k$, the points $(0,1)$ and $(2,5)$ on $y=f(x)$ map to $(3,0)$ and $(5,8)$ on $y=g(x)$. Find $a+k$.",
          latex: "g(x)=a f(x-3)+k",
          answer: "0",
          acceptedAnswers: ["0.0", "a+k=0"],
          hint: "The two output mappings form simultaneous equations in $a$ and $k$.",
          explanation:
            "The horizontal coordinates confirm the shift right by 3. The output mappings give $a+k=0$ and $5a+k=8$. Subtracting yields $4a=8$, so $a=2$ and $k=-2$. Therefore $a+k=0$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks whether students can infer an outside dilation and translation from two point images.",
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm6",
          prompt:
            "A circle is centred at the vertex of $y=(x-2)^2-3$ and passes through the $y$-intercept of that parabola. Find the square of the circle's radius.",
          latex: "y=(x-2)^2-3",
          answer: "20",
          acceptedAnswers: ["20", "r^2=20", "$r^2=20$"],
          hint: "Find the vertex and the point where $x=0$, then use squared distance.",
          explanation:
            "The parabola's vertex is $(2,-3)$. At $x=0$, $y=4-3=1$, so the circle passes through $(0,1)$. The squared distance from the centre is $(0-2)^2+(1+3)^2=4+16=20$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Connects transformed quadratic features with the geometric definition of a circle.",
        }),
        qualityChoice({
          id: "y11adv-gt-exam-qm7",
          prompt:
            "Let $p(x)=\\dfrac{1}{x-1}+2$ and $q(x)=\\dfrac{-2}{x-1}+2$. Which statement at $x=2$ is correct and disproves the claim that equal asymptotes make the functions identical?",
          latex: "p(x)=\\frac1{x-1}+2,\\qquad q(x)=\\frac{-2}{x-1}+2",
          choices: [
            "$p(2)=3$ and $q(2)=0$",
            "$p(2)=q(2)=3$",
            "$p(2)=0$ and $q(2)=3$",
            "Both values are undefined",
          ],
          answer: "A",
          hint: "Substitute the same admissible input into both functions.",
          explanation:
            "At $x=2$, the denominator is 1. Thus $p(2)=1+2=3$, while $q(2)=-2+2=0$. The graphs share $x=1$ and $y=2$ as asymptotes, but the numerator changes their scale and orientation.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Tests whether students understand that asymptotes do not uniquely determine a reciprocal graph.",
          distractorMisconceptions: {
            B: "Assumes common asymptotes force identical function values.",
            C: "Reverses the two evaluated outputs.",
            D: "Treats every input near an asymptote as excluded.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm8",
          prompt:
            "Let $f(x)=x^2-4x+7$. The function $g(x)=-2f(x-a)+b$ has vertex $(5,1)$. Find $a+b$.",
          latex: "f(x)=x^2-4x+7,\\qquad g(x)=-2f(x-a)+b",
          answer: "10",
          acceptedAnswers: ["10.0", "a+b=10"],
          hint: "Write $f$ in vertex form, then track the vertex through all transformations.",
          explanation:
            "Since $f(x)=(x-2)^2+3$, its vertex is $(2,3)$. Replacing $x$ by $x-a$ moves the vertex to $(2+a,3)$; multiplying by $-2$ and adding $b$ changes its height to $-6+b$. Therefore $2+a=5$ and $-6+b=1$, giving $a=3$, $b=7$, and $a+b=10$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires reconstruction of a base vertex followed by coordinated horizontal and vertical transformations.",
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm9",
          prompt:
            "A circle is centred at the point of rotational symmetry of $y=(x-3)^3-2$ and is tangent to the $y$-axis. In $x^2+y^2+Dx+Ey+F=0$, find $F$.",
          latex: "y=(x-3)^3-2",
          answer: "4",
          acceptedAnswers: ["4", "F=4", "$F=4$"],
          hint: "Use the cubic's translation to locate the centre, then use its distance from the $y$-axis.",
          explanation:
            "The translated cubic has point of rotational symmetry $(3,-2)$, so this is the circle's centre. Tangency to the $y$-axis makes the radius $3$. Thus $(x-3)^2+(y+2)^2=9$, which expands to $x^2+y^2-6x+4y+4=0$. Hence $F=4$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines cubic transformation features, tangency geometry, and expansion of a circle equation.",
        }),
        qualityAnswer({
          id: "y11adv-gt-exam-qm10",
          prompt:
            "The functions $q(x)=(x-4)^2-1$ and $r(x)=\\dfrac{a}{x-4}-1$ share the same translation. If $r$ passes through $(5,2)$, find its $x$-intercept.",
          latex: "q(x)=(x-4)^2-1,\\qquad r(x)=\\frac{a}{x-4}-1",
          answer: "7",
          acceptedAnswers: ["7", "x=7", "$x=7$"],
          hint: "Use the given point to determine $a$, then set the reciprocal function equal to zero.",
          explanation:
            "Substituting $(5,2)$ gives $2=a/(5-4)-1$, so $a=3$. For the $x$-intercept, solve $0=3/(x-4)-1$. Then $3/(x-4)=1$, so $x-4=3$ and $x=7$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires determining an unknown reciprocal scale before solving for a new graph feature.",
        }),
      ],
    };
  }

  if (lesson.slug === "circles-completing-the-square") {
    return {
      ...base,
      description:
        "Recognise (x−h)²+(y−k)²=r² as a circle with centre (h,k) and radius r; write equations from given features; complete the square to convert general form.",
      learningIntention:
        "Learn how to read and write circle equations in centre-radius form, and convert general-form circle equations by completing the square.",
      successCriteria: [
        "Identify the centre and radius from (x−h)²+(y−k)²=r².",
        "Write the equation of a circle given its centre and radius.",
        "Complete the square for x² + bx to obtain (x + b/2)² − (b/2)².",
        "Convert x²+y²+Dx+Ey+F=0 to centre-radius form by completing the square.",
        "Explain why a circle fails the vertical line test and is not a function.",
      ],
      teaching: {
        paragraphs: [
          "A circle with centre (h, k) and radius r satisfies the distance formula: every point on the circle is exactly r units from (h, k). Squaring the distance formula gives the centre-radius equation.",
          "Reading features directly: in (x−h)²+(y−k)²=r², the centre is the pair (h, k) — take care with signs. The number h is whatever makes the bracket zero, so (x+3)² has h=−3, not h=3. The radius is √(r²).",
          "Writing an equation: choose h and k to match the centre, choose r² to match the square of the radius, then assemble (x−h)²+(y−k)²=r².",
          "Completing the square converts general form. For x²+Dx, add (D/2)² inside the bracket: x²+Dx=(x+D/2)²−(D/2)². Add the same amounts to both sides of the equation to keep it balanced.",
          "A circle is not a function. A vertical line through the interior crosses it at two points, failing the vertical line test. Circles are relations, not functions.",
        ],
        latexBlocks: [
          "(x-h)^2+(y-k)^2=r^2\\quad\\text{centre }(h,k),\\text{ radius }r",
          "x^2+Dx=\\left(x+\\frac{D}{2}\\right)^2-\\left(\\frac{D}{2}\\right)^2",
          "x^2+y^2+Dx+Ey+F=0\\;\\Longrightarrow\\;\\text{complete the square for }x\\text{ and }y",
        ],
      },
      workedExamples: [
        {
          title: "Read centre and radius from centre-radius form",
          questionLatex: "(x-4)^2+(y+1)^2=25",
          steps: [
            { explanation: "The bracket x−4 gives h=4 (the value that makes it zero).", latex: "h=4" },
            { explanation: "The bracket y+1 equals y−(−1), so k=−1.", latex: "k=-1" },
            { explanation: "The right-hand side gives r²=25, so take the square root.", latex: "r=\\sqrt{25}=5" },
          ],
          finalAnswerLatex: "\\text{Centre }(4,-1),\\text{ radius }5.",
        },
        {
          title: "Write the equation of a circle",
          questionLatex: "\\text{Centre }(-2,3),\\text{ radius }4",
          steps: [
            { explanation: "Use h=−2 and k=3 in the template.", latex: "(x-(-2))^2+(y-3)^2=r^2" },
            { explanation: "Simplify the x bracket and substitute r²=16.", latex: "(x+2)^2+(y-3)^2=16" },
          ],
          finalAnswerLatex: "(x+2)^2+(y-3)^2=16",
        },
        {
          title: "Complete the square to find centre and radius",
          questionLatex: "x^2+y^2-6x+4y-3=0",
          steps: [
            { explanation: "Group the x and y terms and move the constant to the right.", latex: "x^2-6x+y^2+4y=3" },
            { explanation: "Complete the square for x: add (−6/2)²=9 to both sides.", latex: "(x-3)^2-9+y^2+4y=3" },
            { explanation: "Complete the square for y: add (4/2)²=4 to both sides.", latex: "(x-3)^2+(y+2)^2-9-4=3" },
            { explanation: "Collect constants on the right.", latex: "(x-3)^2+(y+2)^2=16" },
          ],
          finalAnswerLatex: "\\text{Centre }(3,-2),\\text{ radius }4.",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y11adv-gt-circles-g1",
          "Which coordinates give the centre of the displayed circle?",
          "C",
          ["$(-3,-1)$", "$(-3,1)$", "$(3,1)$", "$(3,-1)$"],
          "The bracket x−3 gives h=3 and y−1 gives k=1; the centre is (3,1).",
          "(x-3)^2+(y-1)^2=16"
        ),
        formulaAnswer(
          "y11adv-gt-circles-g2",
          "Find the radius of the displayed circle.",
          "(x-3)^2+(y-1)^2=16",
          "4"
        ),
        practicalChoice(
          "y11adv-gt-circles-g3",
          "Which equation gives a circle with the displayed centre?",
          "B",
          [
            "$(x+2)^2+(y-5)^2=r^2$",
            "$(x-2)^2+(y+5)^2=r^2$",
            "$(x-2)^2+(y-5)^2=r^2$",
            "$(x+2)^2+(y+5)^2=r^2$",
          ],
          "Centre (2,−5) means h=2 (use x−2) and k=−5 (use y+5).",
          "\\text{centre }(2,-5)"
        ),
        practicalChoice(
          "y11adv-gt-circles-g4",
          "Which equation gives a circle centred at the origin with the displayed radius?",
          "A",
          ["$x^2+y^2=36$", "$x^2+y^2=6$", "$(x-6)^2+y^2=36$", "$x^2+y^2=12$"],
          "Centre (0,0) makes h=k=0; radius 6 gives r²=36.",
          "\\text{radius }6"
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y11adv-gt-circles-i1",
          "Which coordinates give the centre of the displayed circle?",
          "D",
          ["$(4,2)$", "$(4,-2)$", "$(-4,-2)$", "$(-4,2)$"],
          "x+4 means h=−4 and y−2 means k=2; the centre is (−4,2).",
          "(x+4)^2+(y-2)^2=9"
        ),
        formulaAnswer(
          "y11adv-gt-circles-i2",
          "Find the radius of the displayed circle.",
          "(x+4)^2+(y-2)^2=9",
          "3"
        ),
        practicalChoice(
          "y11adv-gt-circles-i3",
          "After completing the square, which is the correct centre-radius form?",
          "C",
          [
            "$(x-2)^2+(y+3)^2=4$",
            "$(x+2)^2+(y-3)^2=16$",
            "$(x-2)^2+(y+3)^2=16$",
            "$(x-4)^2+(y+6)^2=16$",
          ],
          "x²−4x completes to (x−2)²−4; y²+6y completes to (y+3)²−9; the right side becomes 3+4+9=16.",
          "x^2+y^2-4x+6y-3=0"
        ),
        practicalChoice(
          "y11adv-gt-circles-i4",
          "Which equation matches a circle with the displayed centre and radius?",
          "D",
          [
            "$(x-3)^2+(y-1)^2=25$",
            "$(x+3)^2+(y-1)^2=25$",
            "$(x-3)^2+(y+1)^2=5$",
            "$(x-3)^2+(y+1)^2=25$",
          ],
          "Centre (3,−1) gives h=3 and k=−1; radius 5 gives r²=25.",
          "\\text{centre }(3,-1),\\text{ radius }5"
        ),
        practicalChoice(
          "y11adv-gt-circles-i5",
          "Which statement correctly explains why a circle is NOT a function?",
          "A",
          [
            "It fails the vertical line test — a vertical line can cross it at two points",
            "It has no x-intercepts",
            "It is defined by two variables",
            "It has no y-intercept",
          ],
          "A function must pass the vertical line test; a vertical line through a circle's interior hits it at two points.",
          "(x-2)^2+(y-1)^2=9"
        ),
      ],
      commonMistakes: [
        { mistake: "Treating (x+a)²+(y+b)²=r² as centre (a,b).", fix: "The centre is (−a,−b); the bracket x+a equals x−(−a), so h=−a." },
        { mistake: "Using r instead of r² in the equation.", fix: "The right-hand side of the equation is r², not r. Write 25, not 5, for a circle of radius 5." },
        { mistake: "Forgetting to add the completing-the-square constant to both sides.", fix: "Whatever you add inside the bracket on the left must also be added to the right to keep the equation balanced." },
        { mistake: "Calling a circle a function.", fix: "A circle fails the vertical line test; it is a relation, not a function." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-gt-circles-qm1",
          prompt:
            "After completing the square, which centre and radius describe $x^2+y^2-6x+4y-12=0$?",
          latex: "x^2+y^2-6x+4y-12=0",
          choices: [
            "Centre $(3,-2)$, radius $5$",
            "Centre $(-3,2)$, radius $5$",
            "Centre $(3,-2)$, radius $25$",
            "Centre $(-3,2)$, radius $25$",
          ],
          answer: "A",
          hint: "Complete each square and remember that the right side is $r^2$.",
          explanation:
            "Rearranging and completing the squares gives $(x-3)^2+(y+2)^2=25$. The bracket signs show centre $(3,-2)$, and the radius is $\\sqrt{25}=5$. This distinguishes the radius from its square.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks both sign interpretation and the distinction between radius and radius squared.",
          distractorMisconceptions: {
            B: "Reads the centre coordinates directly from the bracket signs.",
            C: "Uses the correct centre but reports radius squared as the radius.",
            D: "Combines both sign reversal and radius-squared errors.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm2",
          prompt:
            "A circle has centre $(-2,3)$ and passes through $(1,7)$. Write its equation in centre-radius form.",
          latex: "\\text{centre }(-2,3),\\quad (1,7)\\text{ on the circle}",
          answer: "(x+2)^2+(y-3)^2=25",
          acceptedAnswers: [
            "(x+2)^2+(y-3)^2=25",
            "$(x+2)^2+(y-3)^2=25$",
            "(y-3)^2+(x+2)^2=25",
          ],
          hint: "Use squared distance from the centre to the given point to find $r^2$.",
          explanation:
            "The squared radius is the squared distance from $(-2,3)$ to $(1,7)$: $r^2=(1+2)^2+(7-3)^2=9+16=25$. Substituting the centre and this value gives $(x+2)^2+(y-3)^2=25$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks construction of a circle equation when radius must first be inferred from a point.",
        }),
        qualityChoice({
          id: "y11adv-gt-circles-qm3",
          prompt:
            "A student claims $(x+4)^2+(y-1)^2=36$ has centre $(4,-1)$ and radius 36. Which correction is complete?",
          latex: "(x+4)^2+(y-1)^2=36",
          choices: [
            "Centre $(-4,1)$ and radius $6$",
            "Centre $(4,-1)$ and radius $6$",
            "Centre $(-4,1)$ and radius $36$",
            "Centre $(4,1)$ and radius $18$",
          ],
          answer: "A",
          hint: "Write each bracket as a variable minus its centre coordinate, then take a square root.",
          explanation:
            "The bracket $x+4$ is $x-(-4)$, while $y-1$ gives centre coordinate $1$. Thus the centre is $(-4,1)$. Since $r^2=36$, the radius is $r=6$, not 36.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Directly diagnoses the two most common centre-radius interpretation errors.",
          distractorMisconceptions: {
            B: "Corrects the radius but retains both centre sign errors.",
            C: "Corrects the centre but treats radius squared as the radius.",
            D: "Applies inconsistent sign and square-root operations.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm4",
          prompt:
            "The endpoints of a diameter are $(-2,1)$ and $(4,5)$. Find the square of the circle's radius.",
          latex: "A(-2,1),\\qquad B(4,5)",
          answer: "13",
          acceptedAnswers: ["13", "r^2=13", "$r^2=13$"],
          hint: "The centre is the midpoint; the radius is half the diameter.",
          explanation:
            "The diameter vector is $(6,4)$, so its squared length is $6^2+4^2=52$. Halving a length divides its square by 4, hence $r^2=52/4=13$. Equivalently, the midpoint is $(1,3)$ and its squared distance to either endpoint is 13.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks use of diameter geometry without confusing diameter length with radius.",
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm5",
          prompt:
            "For what value of $k$ is $x^2+y^2-6x+4y+k=0$ a circle tangent to the $y$-axis?",
          latex: "x^2+y^2-6x+4y+k=0",
          answer: "4",
          acceptedAnswers: ["4", "k=4", "$k=4$"],
          hint: "Find the centre and express $r^2$ in terms of $k$; tangency fixes the radius.",
          explanation:
            "Completing the squares gives $(x-3)^2+(y+2)^2=13-k$, with centre $(3,-2)$. A circle tangent to the $y$-axis has radius equal to the centre's horizontal distance from that axis, so $r=3$. Hence $13-k=9$ and $k=4$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Combines a parameterised completing-the-square calculation with a geometric tangency condition.",
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm6",
          prompt:
            "Find the product of the constants defining the two vertical tangent lines to $(x-2)^2+(y+1)^2=25$.",
          latex: "(x-2)^2+(y+1)^2=25",
          answer: "-21",
          acceptedAnswers: ["−21", "(-21)"],
          hint: "The vertical tangents occur one radius left and right of the centre.",
          explanation:
            "The centre is $(2,-1)$ and the radius is 5. Therefore the vertical tangent lines are $x=2-5=-3$ and $x=2+5=7$. The product of their constants is $(-3)(7)=-21$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks geometric interpretation of extreme coordinates rather than routine feature recall.",
        }),
        qualityChoice({
          id: "y11adv-gt-circles-qm7",
          prompt:
            "What does $x^2+y^2-4x+6y+20=0$ represent in the real coordinate plane?",
          latex: "x^2+y^2-4x+6y+20=0",
          choices: [
            "No real circle, because completing the square gives $r^2=-7$",
            "A circle with centre $(2,-3)$ and radius $\\sqrt7$",
            "A circle with centre $(-2,3)$ and radius $\\sqrt7$",
            "A single point at $(2,-3)$",
          ],
          answer: "A",
          hint: "Complete both squares and inspect the sign of the resulting right-hand side.",
          explanation:
            "Completing the squares gives $(x-2)^2+(y+3)^2=-7$. The left side is a sum of squares and cannot be negative for real $x$ and $y$. Therefore the equation has no real points and does not represent a real circle.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Tests whether students examine the sign of radius squared instead of automatically taking a square root.",
          distractorMisconceptions: {
            B: "Ignores the negative sign on the computed radius squared.",
            C: "Ignores the negative radius squared and reverses centre signs.",
            D: "Confuses a negative radius squared with the zero-radius case.",
          },
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm8",
          prompt:
            "The centre of a circle lies on the $x$-axis, and the circle passes through $A(1,4)$ and $B(5,2)$. Find the centre's $x$-coordinate.",
          latex: "C=(h,0),\\qquad A(1,4),\\qquad B(5,2)",
          answer: "3/2",
          acceptedAnswers: ["3/2", "1.5", "$\\frac32$", "h=3/2"],
          hint: "Equate the squared distances from $(h,0)$ to the two given points.",
          explanation:
            "Equal radii give $(h-1)^2+4^2=(h-5)^2+2^2$. Expanding and cancelling $h^2$ yields $-2h+17=-10h+29$. Thus $8h=12$, so the centre's $x$-coordinate is $h=\\tfrac32$.",
          difficulty: 5,
          taskType: "problem-solving",
          diagnosticIntent:
            "Requires modelling an unknown centre using equal-distance constraints.",
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm9",
          prompt:
            "A circle has diameter endpoints $(-2,1)$ and $(6,5)$. It is then translated 3 units right and 4 units down. In the translated equation $x^2+y^2+Dx+Ey+F=0$, find $F$.",
          latex: "A(-2,1),\\quad B(6,5),\\quad (x,y)\\mapsto(x+3,y-4)",
          answer: "6",
          acceptedAnswers: ["6", "F=6", "$F=6$"],
          hint: "Find the original midpoint and squared radius, translate the centre, then expand.",
          explanation:
            "The original centre is the midpoint $(2,3)$, and $r^2=(4)^2+(2)^2=20$. After translation the centre is $(5,-1)$, so $(x-5)^2+(y+1)^2=20$. Expanding gives $x^2+y^2-10x+2y+6=0$, hence $F=6$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates diameter geometry, coordinate translation, and conversion to general form.",
        }),
        qualityAnswer({
          id: "y11adv-gt-circles-qm10",
          prompt:
            "The line $x=1$ cuts a chord of length $4\\sqrt3$ from $x^2+y^2-2ax+4y+a^2-12=0$. Find the sum of all possible values of $a$.",
          latex: "x^2+y^2-2ax+4y+a^2-12=0",
          answer: "2",
          acceptedAnswers: ["2.0", "sum=2"],
          hint: "Complete the square, then relate half the chord, the radius, and the centre-to-line distance.",
          explanation:
            "Completing the square gives $(x-a)^2+(y+2)^2=16$, so the radius is 4 and the centre is $(a,-2)$. Half the chord is $2\\sqrt3$, so the perpendicular distance $d$ to the line satisfies $d^2+(2\\sqrt3)^2=4^2$, giving $d=2$. Thus $|a-1|=2$, so $a=3$ or $a=-1$; their sum is $2$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires extracting invariant radius, applying chord geometry, and retaining both parameter solutions.",
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-gt-circles-mp1",
          prompt: "Identify the centre and radius of the circle (x − 2)² + (y − 3)² = 36.",
          latex: "(x-2)^2+(y-3)^2=36",
          answer: "2",
          hint: "In (x−h)²+(y−k)²=r², the centre is (h,k) and the radius is √(r²).",
          explanation:
            "(a) x−2 gives h=2; centre x-coordinate is 2. (b) y−3 gives k=3; centre y-coordinate is 3. (c) r²=36, so r=6.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the x-coordinate of the centre.",
              latex: "(x-2)^2",
              marks: 1,
              answer: "2",
              hint: "The bracket x−h equals zero when x=h.",
              explanation: "x−2=0 when x=2, so the centre x-coordinate is 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the y-coordinate of the centre.",
              latex: "(y-3)^2",
              marks: 1,
              answer: "3",
              hint: "The bracket y−k equals zero when y=k.",
              explanation: "y−3=0 when y=3, so the centre y-coordinate is 3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the radius.",
              latex: "r^2=36",
              marks: 1,
              answer: "6",
              hint: "Take the square root of the right-hand side.",
              explanation: "r²=36, so r=√36=6.",
            },
          ],
        },
        {
          id: "y11adv-gt-circles-mp2",
          prompt: "Complete the square to find the centre-radius form of x² + y² − 4x + 2y − 4 = 0.",
          latex: "x^2+y^2-4x+2y-4=0",
          answer: "4",
          hint: "Group x terms and y terms. For each group, add (half the coefficient)² to both sides.",
          explanation:
            "(a) (−4/2)²=4 is added. (b) (2/2)²=1 is added. (c) r²=4+4+1=9, giving (x−2)²+(y+1)²=9.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "What constant is added to complete the square for x² − 4x?",
              latex: "x^2-4x+\\,?",
              marks: 1,
              answer: "4",
              hint: "Use (coefficient of x ÷ 2)².",
              explanation: "Half of −4 is −2; (−2)²=4. Adding 4 gives (x−2)²−4.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "What constant is added to complete the square for y² + 2y?",
              latex: "y^2+2y+\\,?",
              marks: 1,
              answer: "1",
              hint: "Use (coefficient of y ÷ 2)².",
              explanation: "Half of 2 is 1; 1²=1. Adding 1 gives (y+1)²−1.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find r² in the final centre-radius form (x − 2)² + (y + 1)² = r².",
              latex: "(x-2)^2+(y+1)^2=r^2",
              marks: 2,
              answer: "9",
              hint: "Add the right-hand side constant (4) and the two completing-the-square constants (4 and 1).",
              explanation: "r²=4+4+1=9. The circle has centre (2,−1) and radius 3.",
            },
          ],
        },
      ],
    };
  }

  return null;
}

