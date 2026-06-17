import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

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
        practicalChoice("y11adv-gt-trans-m1", "Which transformation is represented?", "D", ["Up 4", "Right 4", "Down 4", "Left 4"], "The +4 is inside f, so the graph shifts left 4.", "y=f(x+4)"),
        practicalChoice("y11adv-gt-trans-m2", "Which transformation is represented?", "A", ["Down 9", "Up 9", "Left 9", "Right 9"], "The -9 is outside f, so the graph shifts down 9.", "y=f(x)-9"),
        formulaAnswer("y11adv-gt-trans-m3", "Find the horizontal shift distance for the transformation.", "y=f(x-8)", "8", ["right 8", "8 right"]),
        practicalChoice("y11adv-gt-trans-m4", "Which equation shifts y = f(x) right 6 and down 2?", "C", ["y = f(x + 6) - 2", "y = f(x - 2) + 6", "y = f(x - 6) - 2", "y = f(x + 6) + 2"], "Right 6 uses x - 6 inside f, and down 2 gives -2 outside.", "\\text{Right }6,\\quad \\text{down }2"),
        formulaAnswer("y11adv-gt-trans-m5", "A point (2,9) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x+1)-6", "(1,3)", coordinateVariants(1, 3)),
        formulaAnswer("y11adv-gt-trans-m6", "A graph shifts 4 units down. Find the outside term b in y = f(x) + b.", "y=f(x)+b", "-4", ["b=-4", "b = -4"]),
        formulaAnswer("y11adv-gt-trans-m7", "A point (0,-2) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x-5)+7", "(5,5)", coordinateVariants(5, 5)),
        practicalChoice("y11adv-gt-trans-m8", "Which equation matches a shift left 3 and down 5?", "B", ["y = f(x - 3) - 5", "y = f(x + 3) - 5", "y = f(x + 5) - 3", "y = f(x - 3) + 5"], "Left 3 uses x + 3 inside f, and down 5 gives -5 outside.", "\\text{Left }3,\\quad \\text{down }5"),
        formulaAnswer("y11adv-gt-trans-m9", "A point (-3,4) is translated to (-6,9). Find the vertical shift distance.", "(-3,4)\\mapsto(-6,9)", "5", ["up 5", "5 up"]),
        formulaAnswer("y11adv-gt-trans-m10", "A point (7,2) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x+4)-1", "(3,1)", coordinateVariants(3, 1)),
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
        practicalChoice("y11adv-gt-dil-m1", "Which transformation is represented?", "B", ["Vertical dilation by factor 3", "Horizontal dilation by factor 1/3", "Horizontal dilation by factor 3", "Reflection in the y-axis"], "For y = f(3x), x-values multiply by 1/3.", "y=f(3x)"),
        formulaAnswer("y11adv-gt-dil-m2", "Find the horizontal scale factor.", "y=f(3x)", "1/3", ["0.333", "0.3333", "factor 1/3", "scale factor 1/3"]),
        practicalChoice("y11adv-gt-dil-m3", "Which equation gives a vertical dilation by factor 5?", "D", ["y = f(5x)", "y = f(x/5)", "y = -f(x)", "y = 5f(x)"], "A multiplier outside f multiplies the y-values.", "\\text{Vertical dilation factor }5"),
        formulaAnswer("y11adv-gt-dil-m4", "Which equation form represents reflection in the y-axis? Enter the expression after y =.", "y=f(-x)", "f(-x)", ["y=f(-x)", "y = f(-x)"]),
        formulaAnswer("y11adv-gt-dil-m5", "A point (-1,3) lies on y = f(x). Find its image under the displayed transformation.", "y=-2f(x)", "(-1,-6)", coordinateVariants(-1, -6)),
        formulaAnswer("y11adv-gt-dil-m6", "A point (2,-3) lies on y = f(x). Find its image under the displayed transformation.", "y=f(x/4)", "(8,-3)", coordinateVariants(8, -3)),
        practicalChoice("y11adv-gt-dil-m7", "Which transformation is represented by y = -f(x)?", "A", ["Reflection in the x-axis", "Reflection in the y-axis", "Horizontal dilation by factor -1", "Vertical shift down 1"], "The negative sign outside f changes y-values to their opposites.", "y=-f(x)"),
        formulaAnswer("y11adv-gt-dil-m8", "A point (5,-2) lies on y = f(x). Find its image under y = 3f(-x).", "y=3f(-x)", "(-5,-6)", coordinateVariants(-5, -6)),
        practicalChoice("y11adv-gt-dil-m9", "Which statement is correct for y = f(4x)?", "C", ["The graph stretches horizontally by factor 4", "The graph shifts right 4", "The graph has horizontal scale factor 1/4", "The graph reflects in the y-axis"], "For y = f(ax), the horizontal scale factor is 1/a.", "y=f(4x)"),
        formulaAnswer("y11adv-gt-dil-m10", "A point (-4,8) lies on y = f(x). Find its image under the displayed transformation.", "y=\\frac{1}{2}f(x)", "(-4,4)", coordinateVariants(-4, 4)),
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
        practicalChoice("y11adv-gt-poly-g2", "Which equation matches the described quadratic transformation?", "B", ["y = (x + 2)^2 + 3", "y = (x - 2)^2 + 3", "y = x^2 - 2 + 3", "y = -(x - 2)^2 + 3"], "Right 2 uses x - 2; up 3 adds outside.", "\\text{Shift }y=x^2\\text{ right }2\\text{ and up }3."),
        formulaAnswer("y11adv-gt-poly-g3", "Find the vertical asymptote of the transformed reciprocal graph.", "y=\\frac{1}{x-5}+2", "x=5", ["5"]),
        practicalChoice("y11adv-gt-poly-g4", "Which equation matches the described reciprocal graph?", "A", ["y = 1/(x - 2) - 1", "y = 1/(x + 2) - 1", "y = 1/(x - 1) + 2", "y = -1/(x - 2) + 1"], "Right 2 uses x - 2; down 1 gives -1 outside.", "\\text{Shift }y=\\frac{1}{x}\\text{ right }2\\text{ and down }1."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-gt-poly-i1", "Find the vertex of the transformed quadratic.", "y=-(x+1)^2+5", "(-1,5)", ["-1,5", "(-1, 5)", "vertex (-1,5)"]),
        formulaAnswer("y11adv-gt-poly-i2", "Find the horizontal asymptote of the transformed reciprocal graph.", "y=\\frac{1}{x+3}-4", "y=-4", ["-4"]),
        practicalChoice("y11adv-gt-poly-i3", "Which description matches the transformed cubic?", "C", ["Shift left 2 and up 1", "Shift right 2 and down 1", "Shift right 2 and up 1", "Reflect in the y-axis only"], "x - 2 shifts right 2 and +1 shifts up 1.", "y=(x-2)^3+1"),
        practicalChoice("y11adv-gt-poly-i4", "Which equation has the displayed asymptotes?", "D", ["y = 1/(x - 4) + 3", "y = 1/(x + 3) - 4", "y = 1/(x - 3) - 4", "y = 1/(x + 4) + 3"], "x + 4 = 0 gives x = -4; +3 gives y = 3.", "\\text{Asymptotes }x=-4,\\quad y=3"),
        practicalChoice("y11adv-gt-poly-i5", "Which statement is correct for the displayed reciprocal graph?", "B", ["The domain excludes y = 2", "The domain excludes x = 2", "The vertical asymptote is y = 2", "The graph has vertex (2, 1)"], "The denominator is zero when x = 2.", "y=\\frac{1}{x-2}+1"),
      ],
      commonMistakes: [
        { mistake: "Using the sign inside brackets as the shift direction.", fix: "In y = (x - h)^2 + k, the vertex x-coordinate is h." },
        { mistake: "Calling an asymptote an intercept.", fix: "A reciprocal graph approaches an asymptote; it is not the same as crossing an axis." },
        { mistake: "Moving only the vertex but forgetting reflection.", fix: "A negative outside a quadratic reflects the graph in the x-axis." },
        { mistake: "Mixing up vertical and horizontal asymptotes.", fix: "The denominator gives the vertical asymptote; the outside shift gives the horizontal asymptote." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-gt-poly-m1", "Find the vertex of the transformed quadratic.", "y=(x-2)^2+6", "(2,6)", ["2,6", "(2, 6)", "vertex (2,6)"]),
        formulaAnswer("y11adv-gt-poly-m2", "Find the vertical asymptote of the reciprocal graph.", "y=\\frac{1}{x+7}-3", "x=-7", ["-7"]),
        practicalChoice("y11adv-gt-poly-m3", "Which equation matches the described quadratic graph?", "C", ["y = (x - 3)^2 + 4", "y = (x + 4)^2 - 3", "y = (x - 4)^2 - 3", "y = -(x - 4)^2 + 3"], "Right 4 uses x - 4; down 3 gives -3 outside.", "\\text{Vertex }(4,-3)\\text{ and opens upward.}"),
        practicalChoice("y11adv-gt-poly-m4", "Which equation matches the described reciprocal graph?", "A", ["y = 1/(x + 2) + 5", "y = 1/(x - 2) + 5", "y = 1/(x + 5) + 2", "y = 1/(x - 5) - 2"], "Vertical asymptote x = -2 gives x + 2; horizontal asymptote y = 5 gives +5.", "\\text{Asymptotes }x=-2,\\quad y=5"),
        formulaAnswer("y11adv-gt-poly-m5", "Find the horizontal asymptote of the transformed reciprocal graph.", "y=\\frac{2}{x-1}+4", "y=4", ["4"]),
        practicalChoice("y11adv-gt-poly-m6", "Which description matches the displayed quadratic?", "D", ["Left 3, down 2, opens upward", "Right 3, up 2, opens upward", "Left 3, up 2, opens downward", "Right 3, up 2, opens downward"], "x - 3 shifts right 3, +2 shifts up 2, and the negative reflects downward.", "y=-(x-3)^2+2"),
        formulaAnswer("y11adv-gt-poly-m7", "Find the excluded x-value in the domain.", "y=\\frac{1}{x-6}-2", "6", ["x=6"]),
        practicalChoice("y11adv-gt-poly-m8", "Which graph feature moves from the origin to the displayed point?", "B", ["The y-intercept of every graph", "The vertex of y = x^2", "The vertical asymptote", "The horizontal asymptote"], "A transformed quadratic $y = (x - h)^2 + k$ moves the vertex to $(h,k)$.", "y=(x+5)^2-1,\\quad (-5,-1)"),
        practicalChoice("y11adv-gt-poly-m9", "Which equation shows a cubic shifted left 1 and reflected in the x-axis?", "A", ["y = -(x + 1)^3", "y = (x - 1)^3", "y = (-x + 1)^3", "y = (x + 1)^3"], "Left 1 uses x + 1, and reflection in the x-axis puts a negative outside.", "\\text{Transform }y=x^3."),
        practicalChoice("y11adv-gt-poly-m10", "A student says the vertical asymptote is x = 3. Which option identifies the error?", "C", ["The horizontal asymptote is x = 3", "The graph has no asymptotes", "The vertical asymptote is x = -3", "The vertex is (3, 2)"], "The denominator x + 3 is zero at x = -3.", "y=\\frac{1}{x+3}+2"),
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
        practicalChoice("y11adv-gt-exam-g1", "Which equation matches the described transformation?", "A", ["y = f(x + 2) + 3", "y = f(x - 2) + 3", "y = f(x + 3) + 2", "y = -f(x + 2) + 3"], "Left 2 uses x + 2; up 3 adds outside.", "\\text{Shift left }2\\text{ and up }3."),
        formulaAnswer("y11adv-gt-exam-g2", "Find the vertex of the transformed quadratic.", "y=(x+4)^2-6", "(-4,-6)", ["-4,-6", "(-4, -6)", "vertex (-4,-6)"]),
        practicalChoice("y11adv-gt-exam-g3", "Which statement identifies the horizontal-shift error?", "B", ["It shifts left 5", "It shifts right 5", "It shifts up 5", "It reflects in the x-axis"], "x - 5 inside f shifts right 5.", "y=f(x-5)"),
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
        practicalChoice("y11adv-gt-exam-m1", "Describe the transformation shown.", "A", ["Right 4 and up 1", "Left 4 and up 1", "Right 1 and up 4", "Left 4 and down 1"], "x - 4 shifts right 4 and +1 shifts up 1.", "y=f(x-4)+1"),
        practicalChoice("y11adv-gt-exam-m2", "Which equation matches a shift 3 units down?", "C", ["y = f(x - 3)", "y = f(x + 3)", "y = f(x) - 3", "y = -f(x)"], "A vertical shift down subtracts outside the function.", "\\text{Shift }y=f(x)\\text{ down }3."),
        formulaAnswer("y11adv-gt-exam-m3", "Find the vertex of the quadratic graph.", "y=-(x-2)^2+8", "(2,8)", ["2,8", "(2, 8)", "vertex (2,8)"]),
        formulaAnswer("y11adv-gt-exam-m4", "Find the vertical asymptote of the reciprocal graph.", "y=\\frac{1}{x-9}+2", "x=9", ["9"]),
        practicalChoice("y11adv-gt-exam-m5", "Which equation matches the described transformation?", "B", ["y = f(-x) + 4", "y = -f(x + 4)", "y = -f(x - 4)", "y = f(x + 4)"], "Left 4 uses x + 4, and reflection in the x-axis puts a negative outside.", "\\text{Shift left }4\\text{ and reflect in the }x\\text{-axis.}"),
        practicalChoice("y11adv-gt-exam-m6", "Which feature is affected directly by the outside +5 in the reciprocal graph?", "D", ["The vertical asymptote", "The excluded x-value", "The graph type", "The horizontal asymptote"], "The outside shift moves the horizontal asymptote.", "y=\\frac{1}{x-2}+5"),
        practicalChoice("y11adv-gt-exam-m7", "Which option identifies the common error?", "A", ["The graph shifts left 6, not right 6", "The graph shifts down 6", "The graph reflects in the x-axis", "The graph has vertex (6,0)"], "x + 6 inside f shifts left 6.", "y=f(x+6)"),
        formulaAnswer("y11adv-gt-exam-m8", "Find the excluded y-value in the range of the reciprocal graph.", "y=\\frac{1}{x+1}-3", "-3", ["y=-3"]),
        practicalChoice("y11adv-gt-exam-m9", "Which equation matches the graph description?", "C", ["y = (x + 2)^2 + 3", "y = -(x - 2)^2 - 3", "y = -(x + 2)^2 + 3", "y = (x - 2)^2 + 3"], "Vertex (-2,3) gives x + 2 and +3; opening downward gives a negative outside.", "\\text{Quadratic with vertex }(-2,3)\\text{ opening downward.}"),
        practicalChoice("y11adv-gt-exam-m10", "A transformed reciprocal graph has the displayed asymptotes. Which equation is possible?", "D", ["y = 1/(x - 1) + 4", "y = 1/(x + 4) - 1", "y = 1/(x - 4) - 1", "y = 1/(x + 1) + 4"], "x = -1 gives x + 1 in the denominator; y = 4 gives +4 outside.", "x=-1,\\quad y=4"),
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
        practicalChoice(
          "y11adv-gt-circles-m1",
          "Which coordinates give the centre of the displayed circle?",
          "B",
          ["$(5,2)$", "$(5,-2)$", "$(-5,2)$", "$(-5,-2)$"],
          "x−5 gives h=5 and y+2 gives k=−2; centre is (5,−2).",
          "(x-5)^2+(y+2)^2=49"
        ),
        formulaAnswer(
          "y11adv-gt-circles-m2",
          "Find the radius of the displayed circle.",
          "(x-5)^2+(y+2)^2=49",
          "7"
        ),
        practicalChoice(
          "y11adv-gt-circles-m3",
          "Which equation gives a circle with the displayed centre and radius?",
          "C",
          [
            "$(x-1)^2+(y-3)^2=16$",
            "$(x+1)^2+(y+3)^2=16$",
            "$(x+1)^2+(y-3)^2=16$",
            "$(x+1)^2+(y-3)^2=4$",
          ],
          "Centre (−1,3) means h=−1 (use x+1) and k=3; radius 4 gives r²=16.",
          "\\text{centre }(-1,3),\\text{ radius }4"
        ),
        practicalChoice(
          "y11adv-gt-circles-m4",
          "Which is the correct centre-radius form after completing the square?",
          "A",
          [
            "$(x-1)^2+(y-4)^2=16$",
            "$(x-2)^2+(y-8)^2=1$",
            "$(x-1)^2+(y-4)^2=1$",
            "$(x+1)^2+(y+4)^2=16$",
          ],
          "x²−2x completes to (x−1)²−1; y²−8y completes to (y−4)²−16; right side becomes −1+1+16=16.",
          "x^2+y^2-2x-8y+1=0"
        ),
        formulaAnswer(
          "y11adv-gt-circles-m5",
          "Find the radius of the circle after completing the square.",
          "x^2+y^2-6x+2y-6=0",
          "4"
        ),
        formulaAnswer(
          "y11adv-gt-circles-m6",
          "Find the x-coordinate of the centre of the displayed circle.",
          "(x-7)^2+(y+3)^2=25",
          "7"
        ),
        practicalChoice(
          "y11adv-gt-circles-m7",
          "Which option correctly identifies the student's error?",
          "B",
          [
            "The radius is 4, not 2",
            "The centre is $(-5,3)$; the bracket $x+5$ means $h=-5$",
            "The y-coordinate $-3$ is correct",
            "The equation is not a circle",
          ],
          "x+5 means h=−5, so the centre x-coordinate is −5, not 5.",
          "\\text{Student says centre of }(x+5)^2+(y-3)^2=4\\text{ is }(5,-3)."
        ),
        formulaAnswer(
          "y11adv-gt-circles-m8",
          "Find the value of r² after completing the square.",
          "x^2+y^2+8x-2y-8=0",
          "25"
        ),
        practicalChoice(
          "y11adv-gt-circles-m9",
          "Which circle has radius 5?",
          "C",
          [
            "$(x-2)^2+(y+1)^2=5$",
            "$(x-2)^2+(y+1)^2=10$",
            "$(x-2)^2+(y+1)^2=25$",
            "$(x-2)^2+(y+1)^2=50$",
          ],
          "Radius 5 means r²=25; the right-hand side must be 25.",
          "\\text{radius }5"
        ),
        practicalChoice(
          "y11adv-gt-circles-m10",
          "Which statement about the displayed circle is correct?",
          "C",
          [
            "Centre $(1,2)$ and radius $9$",
            "Centre $(-1,2)$ and radius $3$",
            "Centre $(1,-2)$ and radius $3$",
            "Centre $(1,-2)$ and radius $9$",
          ],
          "x−1 gives h=1; y+2 gives k=−2; r²=9 gives r=3.",
          "(x-1)^2+(y+2)^2=9"
        ),
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

