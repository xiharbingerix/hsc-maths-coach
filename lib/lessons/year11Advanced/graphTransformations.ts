import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

const GRAPH_TRANSFORM_EXPLANATIONS: Record<string, string> = {
  // ── Composite functions ────────────────────────────────────────────────────
  "y11adv-gtc-i4":
    "Evaluate the inner function first: g(1) = 2. Then use that output as input to the outer function: f(2) = 5. For (f∘g)(x), always substitute into g before f.",
  "y11adv-gtc-m6":
    "Work from the inside out: g(3) = −1, so the inner output is −1. Then f(−1) = 7. In a composite function, the right-hand function is always applied first.",

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
          "A quadratic in the form y = (x - h)^2 + k has vertex (h, k). This is a direct way to read the movement from y = x^2.",
          "Cubic graphs can be shifted and reflected using the same transformation ideas as y = f(x). For example, y = -(x - 2)^3 shifts right 2 and reflects in the x-axis.",
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
        practicalChoice("y11adv-gt-poly-m8", "Which graph feature moves from the origin to the displayed point?", "B", ["The y-intercept of every graph", "The vertex of y = x^2", "The vertical asymptote", "The horizontal asymptote"], "A transformed quadratic y = (x - h)^2 + k moves the vertex to (h,k).", "y=(x+5)^2-1,\\quad (-5,-1)"),
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

  return null;
}

