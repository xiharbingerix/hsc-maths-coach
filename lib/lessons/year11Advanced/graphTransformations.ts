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
      masteryQuizPool: [
        { id: "y11adv-gtc-p1", prompt: "Describe the transformation shown.", latex: "y=f(x)+5", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Down 5" }, { label: "B", text: "Up 5" }, { label: "C", text: "Right 5" }, { label: "D", text: "Left 5" }], hint: "A number added outside $f$ shifts vertically.", explanation: "$+5$ outside $f$ shifts the graph up 5." },
        { id: "y11adv-gtc-p2", prompt: "Describe the transformation shown.", latex: "y=f(x)-3", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Down 3" }, { label: "B", text: "Up 3" }, { label: "C", text: "Right 3" }, { label: "D", text: "Left 3" }], hint: "A number subtracted outside $f$ shifts vertically.", explanation: "$-3$ outside $f$ shifts the graph down 3." },
        { id: "y11adv-gtc-p3", prompt: "Describe the transformation shown.", latex: "y=f(x-3)", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Left 3" }, { label: "B", text: "Up 3" }, { label: "C", text: "Right 3" }, { label: "D", text: "Down 3" }], hint: "Inside the function the direction reverses.", explanation: "$x-3$ inside $f$ shifts the graph right 3." },
        { id: "y11adv-gtc-p4", prompt: "Describe the transformation shown.", latex: "y=f(x+4)", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Right 4" }, { label: "B", text: "Up 4" }, { label: "C", text: "Down 4" }, { label: "D", text: "Left 4" }], hint: "Inside the function the sign reverses.", explanation: "$x+4$ inside $f$ shifts the graph left 4." },
        { id: "y11adv-gtc-p5", prompt: "Which equation represents a reflection in the x-axis?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$y=f(-x)$" }, { label: "B", text: "$y=f(x)+1$" }, { label: "C", text: "$y=f(x-1)$" }, { label: "D", text: "$y=-f(x)$" }], hint: "A negative outside $f$ flips the $y$-values.", explanation: "$y=-f(x)$ reflects the graph in the $x$-axis." },
        { id: "y11adv-gtc-p6", prompt: "Which equation represents a reflection in the y-axis?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$y=-f(x)$" }, { label: "B", text: "$y=f(-x)$" }, { label: "C", text: "$y=f(x)-2$" }, { label: "D", text: "$y=f(x-2)$" }], hint: "A negative inside $f$ flips the $x$-values.", explanation: "$y=f(-x)$ reflects the graph in the $y$-axis." },
        { id: "y11adv-gtc-p7", prompt: "Which equation represents a shift 6 units left?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$y=f(x+6)$" }, { label: "B", text: "$y=f(x-6)$" }, { label: "C", text: "$y=f(x)+6$" }, { label: "D", text: "$y=-f(x)$" }], hint: "Left uses $x+a$ inside $f$.", explanation: "A shift left 6 uses $x+6$ inside the function." },
        { id: "y11adv-gtc-p8", prompt: "Describe the combined transformation shown.", latex: "y=f(x-2)-5", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Left 2 and down 5" }, { label: "B", text: "Right 2 and down 5" }, { label: "C", text: "Right 5 and down 2" }, { label: "D", text: "Left 2 and up 5" }], hint: "Inside controls horizontal; outside controls vertical.", explanation: "$x-2$ shifts right 2; $-5$ shifts down 5." },
        { id: "y11adv-gtc-p9", prompt: "Describe the combined transformation shown.", latex: "y=f(x+1)+3", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Right 1 and up 3" }, { label: "B", text: "Left 3 and up 1" }, { label: "C", text: "Left 1 and up 3" }, { label: "D", text: "Right 1 and down 3" }], hint: "Inside $+1$ reverses to left.", explanation: "$x+1$ shifts left 1; $+3$ shifts up 3." },
        { id: "y11adv-gtc-p10", prompt: "Which equation represents reflection in the x-axis followed by a shift 3 units down?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=f(-x)-3$" }, { label: "B", text: "$y=f(x-3)$" }, { label: "C", text: "$y=-f(x)-3$" }, { label: "D", text: "$y=-f(x-3)$" }], hint: "Reflect first, then shift outside.", explanation: "Reflection gives $-f(x)$; down 3 gives $-3$ outside." },
        { id: "y11adv-gtc-p11", prompt: "Which equation represents reflection in the y-axis followed by a shift 2 units up?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=f(-x)+2$" }, { label: "B", text: "$y=-f(x)+2$" }, { label: "C", text: "$y=f(x-2)$" }, { label: "D", text: "$y=f(x)-2$" }], hint: "Reflect $x$, then add outside.", explanation: "Reflection in the $y$-axis gives $f(-x)$; up 2 adds $+2$." },
        { id: "y11adv-gtc-p12", prompt: "Which option identifies the common horizontal-shift error for the displayed rule?", latex: "y=f(x+4)", answer: "B", difficulty: 3, choices: [{ label: "A", text: "It shifts right 4" }, { label: "B", text: "It shifts left 4, not right 4" }, { label: "C", text: "It shifts up 4" }, { label: "D", text: "It reflects in the $y$-axis" }], hint: "The sign inside reverses the direction.", explanation: "$x+4$ inside $f$ shifts left 4, not right." },
        { id: "y11adv-gtc-p13", prompt: "Use the given function values to evaluate the composite value.", latex: "g(1)=2,\\quad f(2)=5,\\quad (f\\circ g)(1)", answer: "5", difficulty: 2, acceptedAnswers: ["f(g(1))=5", "(f o g)(1)=5"], hint: "Apply $g$ first, then $f$.", explanation: "$g(1)=2$, then $f(2)=5$." },
        { id: "y11adv-gtc-p14", prompt: "Use the given function values to evaluate the composite value.", latex: "g(3)=-1,\\quad f(-1)=7,\\quad (f\\circ g)(3)", answer: "7", difficulty: 3, acceptedAnswers: ["f(g(3))=7", "(f o g)(3)=7"], hint: "Evaluate the inner function first.", explanation: "$g(3)=-1$, then $f(-1)=7$." },
        { id: "y11adv-gtc-p15", prompt: "Use the given function values to evaluate the composite value.", latex: "f(2)=0,\\quad g(0)=4,\\quad (g\\circ f)(2)", answer: "4", difficulty: 3, acceptedAnswers: ["g(f(2))=4"], hint: "For $g\\circ f$, apply $f$ first.", explanation: "$f(2)=0$, then $g(0)=4$." },
        { id: "y11adv-gtc-p16", prompt: "A point (3,4) lies on y = f(x). Find its image under the displayed rule.", latex: "y=f(x+4)-3", answer: "(-1,1)", difficulty: 4, acceptedAnswers: ["-1,1", "(-1, 1)"], hint: "Left 4 and down 3.", explanation: "$x+4$ moves left 4: $3\\to-1$; $-3$ moves down 3: $4\\to1$." },
        { id: "y11adv-gtc-p17", prompt: "Which equation matches the sequence: shift right 2, reflect in the x-axis, then shift up 1?", latex: "\\text{Transform }y=f(x).", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$y=-f(x-2)+1$" }, { label: "B", text: "$y=f(-x-2)+1$" }, { label: "C", text: "$y=-f(x+2)-1$" }, { label: "D", text: "$y=f(x-2)-1$" }], hint: "Build the rule in order.", explanation: "Right 2 gives $f(x-2)$; reflect gives $-f(x-2)$; up 1 gives $+1$." },
        { id: "y11adv-gtc-p18", prompt: "A point (5,-2) lies on y = f(x). Find its image under the displayed rule.", latex: "y=-f(x)", answer: "(5,2)", difficulty: 2, acceptedAnswers: ["5,2", "(5, 2)"], hint: "Reflection in the $x$-axis flips $y$.", explanation: "$x$ unchanged; $y\\to-(-2)=2$, giving $(5,2)$." },
        { id: "y11adv-gtc-p19", prompt: "A point (-6,1) lies on y = f(x). Find its image under the displayed rule.", latex: "y=f(-x)", answer: "(6,1)", difficulty: 2, acceptedAnswers: ["6,1", "(6, 1)"], hint: "Reflection in the $y$-axis flips $x$.", explanation: "$y$ unchanged; $x\\to-(-6)=6$, giving $(6,1)$." },
        { id: "y11adv-gtc-p20", prompt: "Which equation shifts y = f(x) left 3 and up 7?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=f(x+3)+7$" }, { label: "B", text: "$y=f(x-3)+7$" }, { label: "C", text: "$y=f(x+7)+3$" }, { label: "D", text: "$y=f(x-3)-7$" }], hint: "Left uses $+$ inside; up adds outside.", explanation: "Left 3 gives $x+3$; up 7 gives $+7$ outside." },
        { id: "y11adv-gtc-p21", prompt: "A point (0,0) lies on y = f(x). Find its image under the displayed rule.", latex: "y=f(x-5)+2", answer: "(5,2)", difficulty: 3, acceptedAnswers: ["5,2", "(5, 2)"], hint: "Right 5 and up 2.", explanation: "$x-5$ moves right 5: $0\\to5$; $+2$ moves up 2: $0\\to2$." },
        { id: "y11adv-gtc-p22", prompt: "Which transformation is NOT a reflection?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=-f(x)$" }, { label: "B", text: "$y=f(-x)$" }, { label: "C", text: "$y=f(x)+4$" }, { label: "D", text: "$y=-f(-x)$" }], hint: "Reflections involve a negative on $f$ or on $x$.", explanation: "$y=f(x)+4$ is a vertical shift, not a reflection." },
        { id: "y11adv-gtc-p23", prompt: "Use the function values to evaluate the composite value.", latex: "h(4)=-2,\\quad k(-2)=9,\\quad (k\\circ h)(4)", answer: "9", difficulty: 4, acceptedAnswers: ["k(h(4))=9"], hint: "Apply $h$ first.", explanation: "$h(4)=-2$, then $k(-2)=9$." },
        { id: "y11adv-gtc-p24", prompt: "A point (2,-3) lies on y = f(x). Find its image under reflection in the x-axis then a shift up 5.", latex: "y=-f(x)+5", answer: "(2,8)", difficulty: 4, acceptedAnswers: ["2,8", "(2, 8)"], hint: "Flip $y$, then add 5.", explanation: "$y\\to-(-3)=3$, then $3+5=8$, giving $(2,8)$." },
        { id: "y11adv-gtc-p25", prompt: "A point (-4,6) lies on y = f(x). Find its image under the displayed rule.", latex: "y=f(-x)-4", answer: "(4,2)", difficulty: 5, acceptedAnswers: ["4,2", "(4, 2)"], hint: "Reflect $x$, then shift $y$ down 4.", explanation: "$x\\to-(-4)=4$; $y\\to6-4=2$, giving $(4,2)$." },
        { id: "y11adv-gtc-p26", prompt: "The point (1,3) on y = f(x) maps to (4,3) under y = f(x - a). Find a.", latex: "y=f(x-a)", answer: "3", difficulty: 5, acceptedAnswers: ["a=3"], hint: "The $x$-coordinate increased by $a$.", explanation: "$1+a=4$ gives $a=3$ (a shift right 3)." },
        { id: "y11adv-gtc-p27", prompt: "The point (2,5) on y = f(x) maps to (2,-5). Which single transformation was applied?", latex: "(2,5)\\mapsto(2,-5)", answer: "A", difficulty: 5, choices: [{ label: "A", text: "Reflection in the $x$-axis" }, { label: "B", text: "Reflection in the $y$-axis" }, { label: "C", text: "Shift down 5" }, { label: "D", text: "Shift left 4" }], hint: "Only the $y$-coordinate changed sign.", explanation: "$x$ unchanged, $y$ negated: reflection in the $x$-axis." },
        { id: "y11adv-gtc-p28", prompt: "A point (3,4) on y = f(x) maps to (1,4) under y = f(x + a). Find a.", latex: "y=f(x+a)", answer: "2", difficulty: 5, acceptedAnswers: ["a=2"], hint: "Left shift: $x$ decreased by $a$.", explanation: "$3-a=1$ gives $a=2$ (a shift left 2)." },
        { id: "y11adv-gtc-p29", prompt: "Given g(x)=x+1 and f(x)=x², evaluate (f∘g)(2).", latex: "g(x)=x+1,\\quad f(x)=x^2", answer: "9", difficulty: 5, acceptedAnswers: ["f(g(2))=9"], hint: "Find $g(2)$ first, then square.", explanation: "$g(2)=3$, then $f(3)=3^2=9$." },
        { id: "y11adv-gtc-p30", prompt: "Given g(x)=2x and f(x)=x-3, evaluate (g∘f)(5).", latex: "g(x)=2x,\\quad f(x)=x-3", answer: "4", difficulty: 5, acceptedAnswers: ["g(f(5))=4"], hint: "Apply $f$ first, then $g$.", explanation: "$f(5)=2$, then $g(2)=2\\times2=4$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-gtc-mp1",
          prompt: "The point $(2,5)$ lies on the graph of $y=f(x)$. A new graph is formed by the rule $y=f(x-3)+4$.",
          latex: "y=f(x-3)+4,\\quad (2,5)\\text{ on }y=f(x)",
          answer: "5",
          hint: "For (a) read the inside shift, for (b) the outside shift, for (c) apply both to the point.",
          explanation: "(a) $x-3$ shifts right 3. (b) $+4$ shifts up 4. (c) $(2,5)\\mapsto(5,9)$, so the image $x$-coordinate is 5 and $y$-coordinate is 9.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the horizontal shift distance (units to the right).", marks: 1, answer: "3", hint: "$x-3$ inside $f$ shifts right.", explanation: "$x-3$ shifts the graph 3 units right." },
            { key: "b", label: "(b)", prompt: "State the vertical shift distance (units up).", marks: 1, answer: "4", hint: "$+4$ is outside the function.", explanation: "$+4$ shifts the graph 4 units up." },
            { key: "c", label: "(c)", prompt: "Find the x-coordinate of the image of (2,5).", marks: 2, answer: "5", hint: "Add the horizontal shift to the $x$-coordinate.", explanation: "$2+3=5$, so the image $x$-coordinate is 5." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-gt-trans-p1", prompt: "Find the vertical shift direction and distance.", latex: "y=f(x)+6", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Down 6" }, { label: "B", text: "Up 6" }, { label: "C", text: "Right 6" }, { label: "D", text: "Left 6" }], hint: "Outside $f$ shifts vertically.", explanation: "$+6$ outside $f$ shifts up 6." },
        { id: "y11adv-gt-trans-p2", prompt: "Find the vertical shift distance for the transformation.", latex: "y=f(x)-7", answer: "7", difficulty: 1, acceptedAnswers: ["down 7", "7 down"], hint: "Read the number outside $f$.", explanation: "$-7$ outside shifts down 7 units." },
        { id: "y11adv-gt-trans-p3", prompt: "Find the horizontal shift direction.", latex: "y=f(x+4)", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Left" }, { label: "B", text: "Right" }, { label: "C", text: "Up" }, { label: "D", text: "Down" }], hint: "Inside the sign reverses.", explanation: "$x+4$ inside $f$ shifts left." },
        { id: "y11adv-gt-trans-p4", prompt: "Find the horizontal shift distance for the transformation.", latex: "y=f(x-8)", answer: "8", difficulty: 2, acceptedAnswers: ["right 8", "8 right"], hint: "$x-8$ shifts right.", explanation: "$x-8$ inside $f$ shifts right 8 units." },
        { id: "y11adv-gt-trans-p5", prompt: "Which transformation is represented?", latex: "y=f(x+4)", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Up 4" }, { label: "B", text: "Right 4" }, { label: "C", text: "Down 4" }, { label: "D", text: "Left 4" }], hint: "Inside, the sign reverses.", explanation: "$x+4$ inside $f$ shifts left 4." },
        { id: "y11adv-gt-trans-p6", prompt: "Which transformation is represented?", latex: "y=f(x)-9", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Down 9" }, { label: "B", text: "Up 9" }, { label: "C", text: "Left 9" }, { label: "D", text: "Right 9" }], hint: "Outside $f$ shifts vertically.", explanation: "$-9$ outside $f$ shifts down 9." },
        { id: "y11adv-gt-trans-p7", prompt: "A graph is shifted 5 units right. Find the number inside y = f(x - a).", latex: "y=f(x-a)", answer: "5", difficulty: 2, acceptedAnswers: ["a=5"], hint: "Right shift uses $x-a$.", explanation: "A shift right 5 means $a=5$." },
        { id: "y11adv-gt-trans-p8", prompt: "A graph shifts 4 units down. Find the outside term b in y = f(x) + b.", latex: "y=f(x)+b", answer: "-4", difficulty: 2, acceptedAnswers: ["b=-4", "−4"], hint: "Down means negative outside.", explanation: "Down 4 gives $b=-4$." },
        { id: "y11adv-gt-trans-p9", prompt: "Which equation shifts y = f(x) left 2 and up 4?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=f(x+2)+4$" }, { label: "B", text: "$y=f(x-2)+4$" }, { label: "C", text: "$y=f(x+4)+2$" }, { label: "D", text: "$y=f(x-2)-4$" }], hint: "Left uses $+$ inside; up adds outside.", explanation: "Left 2 gives $x+2$; up 4 gives $+4$." },
        { id: "y11adv-gt-trans-p10", prompt: "Which equation shifts y = f(x) right 6 and down 2?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=f(x+6)-2$" }, { label: "B", text: "$y=f(x-2)+6$" }, { label: "C", text: "$y=f(x-6)-2$" }, { label: "D", text: "$y=f(x+6)+2$" }], hint: "Right uses $-$ inside; down subtracts outside.", explanation: "Right 6 gives $x-6$; down 2 gives $-2$." },
        { id: "y11adv-gt-trans-p11", prompt: "Which equation matches a shift left 3 and down 5?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=f(x-3)-5$" }, { label: "B", text: "$y=f(x+3)-5$" }, { label: "C", text: "$y=f(x+5)-3$" }, { label: "D", text: "$y=f(x-3)+5$" }], hint: "Left uses $+$ inside; down subtracts.", explanation: "Left 3 gives $x+3$; down 5 gives $-5$." },
        { id: "y11adv-gt-trans-p12", prompt: "A point (1,5) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x-3)-2", answer: "(4,3)", difficulty: 3, acceptedAnswers: ["4,3", "(4, 3)"], hint: "Right 3 and down 2.", explanation: "$1+3=4$ and $5-2=3$, giving $(4,3)$." },
        { id: "y11adv-gt-trans-p13", prompt: "A point (6,-1) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x+2)+3", answer: "(4,2)", difficulty: 3, acceptedAnswers: ["4,2", "(4, 2)"], hint: "Left 2 and up 3.", explanation: "$6-2=4$ and $-1+3=2$, giving $(4,2)$." },
        { id: "y11adv-gt-trans-p14", prompt: "A point (-2,6) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x+3)-4", answer: "(-5,2)", difficulty: 3, acceptedAnswers: ["-5,2", "(-5, 2)"], hint: "Left 3 and down 4.", explanation: "$-2-3=-5$ and $6-4=2$, giving $(-5,2)$." },
        { id: "y11adv-gt-trans-p15", prompt: "A point (2,9) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x+1)-6", answer: "(1,3)", difficulty: 3, acceptedAnswers: ["1,3", "(1, 3)"], hint: "Left 1 and down 6.", explanation: "$2-1=1$ and $9-6=3$, giving $(1,3)$." },
        { id: "y11adv-gt-trans-p16", prompt: "A point (0,-2) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x-5)+7", answer: "(5,5)", difficulty: 3, acceptedAnswers: ["5,5", "(5, 5)"], hint: "Right 5 and up 7.", explanation: "$0+5=5$ and $-2+7=5$, giving $(5,5)$." },
        { id: "y11adv-gt-trans-p17", prompt: "A point (7,2) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x+4)-1", answer: "(3,1)", difficulty: 3, acceptedAnswers: ["3,1", "(3, 1)"], hint: "Left 4 and down 1.", explanation: "$7-4=3$ and $2-1=1$, giving $(3,1)$." },
        { id: "y11adv-gt-trans-p18", prompt: "Which option identifies the common horizontal-shift error for the displayed rule?", latex: "y=f(x+6)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "It shifts left 6, not right 6" }, { label: "B", text: "It shifts down 6" }, { label: "C", text: "It shifts up 6" }, { label: "D", text: "It reflects the graph" }], hint: "Inside $+$ reverses to left.", explanation: "$x+6$ inside $f$ shifts left 6." },
        { id: "y11adv-gt-trans-p19", prompt: "A point (-3,4) is translated to (-6,9). Find the vertical shift distance.", latex: "(-3,4)\\mapsto(-6,9)", answer: "5", difficulty: 4, acceptedAnswers: ["up 5", "5 up"], hint: "Compare the $y$-coordinates.", explanation: "$9-4=5$, a shift up 5." },
        { id: "y11adv-gt-trans-p20", prompt: "A point (-3,4) is translated to (-6,9). Find the horizontal shift distance.", latex: "(-3,4)\\mapsto(-6,9)", answer: "3", difficulty: 4, acceptedAnswers: ["left 3", "3 left"], hint: "Compare the $x$-coordinates.", explanation: "$-6-(-3)=-3$, a shift left 3 units." },
        { id: "y11adv-gt-trans-p21", prompt: "The point (4,1) maps to (4,7) under y = f(x) + b. Find b.", latex: "y=f(x)+b", answer: "6", difficulty: 4, acceptedAnswers: ["b=6"], hint: "Only $y$ changed.", explanation: "$1+b=7$ gives $b=6$." },
        { id: "y11adv-gt-trans-p22", prompt: "The point (5,2) maps to (1,2) under y = f(x - a). Find a.", latex: "y=f(x-a)", answer: "-4", difficulty: 4, acceptedAnswers: ["a=-4", "−4"], hint: "$x-a$ moves the $x$-coordinate by $+a$.", explanation: "$5+a=1$ gives $a=-4$ (equivalently a shift left 4)." },
        { id: "y11adv-gt-trans-p23", prompt: "A point (8,-3) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x-2)+6", answer: "(10,3)", difficulty: 4, acceptedAnswers: ["10,3", "(10, 3)"], hint: "Right 2 and up 6.", explanation: "$8+2=10$ and $-3+6=3$, giving $(10,3)$." },
        { id: "y11adv-gt-trans-p24", prompt: "A point (-5,-4) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x+7)-3", answer: "(-12,-7)", difficulty: 4, acceptedAnswers: ["-12,-7", "(-12, -7)"], hint: "Left 7 and down 3.", explanation: "$-5-7=-12$ and $-4-3=-7$, giving $(-12,-7)$." },
        { id: "y11adv-gt-trans-p25", prompt: "The point (2,3) maps to (-1,8). Which rule describes the translation?", latex: "(2,3)\\mapsto(-1,8)", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$y=f(x-3)+5$" }, { label: "B", text: "$y=f(x+3)+5$" }, { label: "C", text: "$y=f(x+3)-5$" }, { label: "D", text: "$y=f(x-3)-5$" }], hint: "Find each coordinate change first.", explanation: "$x$ falls by 3 (left 3, so $x+3$) and $y$ rises by 5 (up 5), giving $y=f(x+3)+5$." },
        { id: "y11adv-gt-trans-p26", prompt: "A point (a,b) on y = f(x) maps to (a-4, b+1). Find the value of the inside constant c in y = f(x + c).", latex: "y=f(x+c)+1", answer: "4", difficulty: 5, acceptedAnswers: ["c=4"], hint: "Left 4 uses $x+c$.", explanation: "A shift left 4 means $c=4$." },
        { id: "y11adv-gt-trans-p27", prompt: "Two translations are applied: first right 3, then left 8. Find the single horizontal shift (negative = left).", latex: "\\text{net shift}", answer: "-5", difficulty: 5, acceptedAnswers: ["left 5", "−5"], hint: "Combine the two shifts.", explanation: "$+3-8=-5$, a net shift of 5 units left." },
        { id: "y11adv-gt-trans-p28", prompt: "The image of (3,2) under y = f(x - h) + k is (7,-1). Find h.", latex: "y=f(x-h)+k", answer: "4", difficulty: 5, acceptedAnswers: ["h=4"], hint: "$x$ increased by $h$.", explanation: "$3+h=7$ gives $h=4$." },
        { id: "y11adv-gt-trans-p29", prompt: "The image of (3,2) under y = f(x - h) + k is (7,-1). Find k.", latex: "y=f(x-h)+k", answer: "-3", difficulty: 5, acceptedAnswers: ["k=-3", "−3"], hint: "$y$ changed by $k$.", explanation: "$2+k=-1$ gives $k=-3$." },
        { id: "y11adv-gt-trans-p30", prompt: "A point (1,1) maps to (1,1) under y = f(x - a) + b with a = 0. Find b.", latex: "y=f(x)+b", answer: "0", difficulty: 5, acceptedAnswers: ["b=0"], hint: "The point did not move vertically.", explanation: "$1+b=1$ gives $b=0$; there is no vertical shift." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-gt-trans-mp1",
          prompt: "The point $(4,-1)$ lies on the graph of $y=f(x)$. The graph is transformed by the rule $y=f(x+2)-5$.",
          latex: "y=f(x+2)-5,\\quad (4,-1)\\text{ on }y=f(x)",
          answer: "2",
          hint: "For (a) read the horizontal shift, for (b) the image $x$-coordinate, for (c) the image $y$-coordinate.",
          explanation: "(a) $x+2$ shifts left 2. (b) $4-2=2$. (c) $-1-5=-6$. The image is $(2,-6)$.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the horizontal shift distance (units to the left).", marks: 1, answer: "2", hint: "$x+2$ inside $f$ shifts left.", explanation: "$x+2$ shifts the graph 2 units left." },
            { key: "b", label: "(b)", prompt: "Find the x-coordinate of the image of (4,-1).", marks: 2, answer: "2", hint: "Subtract the left shift from the $x$-coordinate.", explanation: "$4-2=2$, so the image $x$-coordinate is 2." },
            { key: "c", label: "(c)", prompt: "Find the y-coordinate of the image of (4,-1).", marks: 1, answer: "-6", acceptedAnswers: ["−6"], hint: "Subtract 5 from the $y$-coordinate.", explanation: "$-1-5=-6$, so the image $y$-coordinate is $-6$." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-gt-dil-p1", prompt: "Find the vertical dilation factor.", latex: "y=4f(x)", answer: "4", difficulty: 1, acceptedAnswers: ["factor 4"], hint: "The number outside $f$ multiplies $y$.", explanation: "$y=4f(x)$ multiplies $y$-values by 4." },
        { id: "y11adv-gt-dil-p2", prompt: "Find the vertical dilation factor.", latex: "y=3f(x)", answer: "3", difficulty: 1, acceptedAnswers: ["factor 3"], hint: "Read the multiplier outside $f$.", explanation: "$y=3f(x)$ multiplies $y$-values by 3." },
        { id: "y11adv-gt-dil-p3", prompt: "Which transformation is represented?", latex: "y=-f(x)", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Reflection in the $x$-axis" }, { label: "B", text: "Reflection in the $y$-axis" }, { label: "C", text: "Vertical dilation factor 2" }, { label: "D", text: "Shift down 1" }], hint: "Negative outside $f$.", explanation: "$-f(x)$ reflects in the $x$-axis." },
        { id: "y11adv-gt-dil-p4", prompt: "Which transformation is represented?", latex: "y=f(-x)", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Reflection in the $x$-axis" }, { label: "B", text: "Reflection in the $y$-axis" }, { label: "C", text: "Shift left 1" }, { label: "D", text: "Vertical dilation factor 1" }], hint: "Negative inside $f$.", explanation: "$f(-x)$ reflects in the $y$-axis." },
        { id: "y11adv-gt-dil-p5", prompt: "Find the horizontal scale factor.", latex: "y=f(2x)", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5", "factor 1/2"], hint: "Use the reciprocal of the inside multiplier.", explanation: "$y=f(2x)$ has horizontal scale factor $1/2$." },
        { id: "y11adv-gt-dil-p6", prompt: "Find the horizontal scale factor.", latex: "y=f(3x)", answer: "1/3", difficulty: 2, acceptedAnswers: ["0.333", "factor 1/3"], hint: "Reciprocal of the inside multiplier.", explanation: "$y=f(3x)$ has horizontal scale factor $1/3$." },
        { id: "y11adv-gt-dil-p7", prompt: "Find the horizontal scale factor.", latex: "y=f(x/5)", answer: "5", difficulty: 2, acceptedAnswers: ["factor 5"], hint: "$f(x/a)$ multiplies $x$ by $a$.", explanation: "$y=f(x/5)$ has horizontal scale factor 5." },
        { id: "y11adv-gt-dil-p8", prompt: "Find the horizontal scale factor.", latex: "y=f(x/4)", answer: "4", difficulty: 2, acceptedAnswers: ["factor 4"], hint: "$f(x/a)$ multiplies $x$ by $a$.", explanation: "$y=f(x/4)$ has horizontal scale factor 4." },
        { id: "y11adv-gt-dil-p9", prompt: "A point (2,-4) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=3f(x)", answer: "(2,-12)", difficulty: 3, acceptedAnswers: ["2,-12", "(2, -12)"], hint: "Multiply $y$ by 3.", explanation: "$x$ unchanged; $-4\\times3=-12$, giving $(2,-12)$." },
        { id: "y11adv-gt-dil-p10", prompt: "A point (3,-5) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=-f(x)", answer: "(3,5)", difficulty: 2, acceptedAnswers: ["3,5", "(3, 5)"], hint: "Flip the $y$-coordinate.", explanation: "$x$ unchanged; $y\\to5$, giving $(3,5)$." },
        { id: "y11adv-gt-dil-p11", prompt: "A point (-6,1) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(-x)", answer: "(6,1)", difficulty: 2, acceptedAnswers: ["6,1", "(6, 1)"], hint: "Flip the $x$-coordinate.", explanation: "$y$ unchanged; $x\\to6$, giving $(6,1)$." },
        { id: "y11adv-gt-dil-p12", prompt: "A point (4,10) lies on y = f(x). Find its image under a vertical dilation by factor 1/2.", latex: "y=\\tfrac{1}{2}f(x)", answer: "(4,5)", difficulty: 3, acceptedAnswers: ["4,5", "(4, 5)"], hint: "Halve the $y$-coordinate.", explanation: "$x$ unchanged; $10\\times\\tfrac12=5$, giving $(4,5)$." },
        { id: "y11adv-gt-dil-p13", prompt: "Which equation gives a vertical dilation by factor 5?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$y=f(5x)$" }, { label: "B", text: "$y=f(x/5)$" }, { label: "C", text: "$y=-f(x)$" }, { label: "D", text: "$y=5f(x)$" }], hint: "Outside multiplier scales $y$.", explanation: "$y=5f(x)$ multiplies $y$-values by 5." },
        { id: "y11adv-gt-dil-p14", prompt: "Which equation represents reflection in the y-axis? Enter the expression after y =.", latex: "y=f(-x)", answer: "f(-x)", difficulty: 3, acceptedAnswers: ["y=f(-x)", "y = f(-x)"], hint: "Replace $x$ with $-x$.", explanation: "Reflection in the $y$-axis gives $y=f(-x)$." },
        { id: "y11adv-gt-dil-p15", prompt: "Which statement is correct for y = f(4x)?", latex: "y=f(4x)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Stretches horizontally by factor 4" }, { label: "B", text: "Shifts right 4" }, { label: "C", text: "Horizontal scale factor $1/4$" }, { label: "D", text: "Reflects in the $y$-axis" }], hint: "Inside multiplier gives reciprocal factor.", explanation: "$y=f(ax)$ has horizontal scale factor $1/a=1/4$." },
        { id: "y11adv-gt-dil-p16", prompt: "Which transformation is represented?", latex: "y=f(3x)", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Vertical dilation factor 3" }, { label: "B", text: "Horizontal dilation factor $1/3$" }, { label: "C", text: "Horizontal dilation factor 3" }, { label: "D", text: "Reflection in the $y$-axis" }], hint: "Inside multiplier gives reciprocal factor.", explanation: "$y=f(3x)$ scales $x$ by $1/3$." },
        { id: "y11adv-gt-dil-p17", prompt: "A point (-1,3) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=-2f(x)", answer: "(-1,-6)", difficulty: 4, acceptedAnswers: ["-1,-6", "(-1, -6)"], hint: "Multiply $y$ by $-2$.", explanation: "$x$ unchanged; $3\\times(-2)=-6$, giving $(-1,-6)$." },
        { id: "y11adv-gt-dil-p18", prompt: "A point (2,-3) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=f(x/4)", answer: "(8,-3)", difficulty: 4, acceptedAnswers: ["8,-3", "(8, -3)"], hint: "Multiply $x$ by 4.", explanation: "$2\\times4=8$; $y$ unchanged, giving $(8,-3)$." },
        { id: "y11adv-gt-dil-p19", prompt: "A point (5,-2) lies on y = f(x). Find its image under y = 3f(-x).", latex: "y=3f(-x)", answer: "(-5,-6)", difficulty: 4, acceptedAnswers: ["-5,-6", "(-5, -6)"], hint: "Flip $x$, then triple $y$.", explanation: "$x\\to-5$ and $-2\\times3=-6$, giving $(-5,-6)$." },
        { id: "y11adv-gt-dil-p20", prompt: "A point (-4,8) lies on y = f(x). Find its image under the displayed transformation.", latex: "y=\\tfrac{1}{2}f(x)", answer: "(-4,4)", difficulty: 3, acceptedAnswers: ["-4,4", "(-4, 4)"], hint: "Halve the $y$-coordinate.", explanation: "$8\\times\\tfrac12=4$; $x$ unchanged, giving $(-4,4)$." },
        { id: "y11adv-gt-dil-p21", prompt: "A point (6,2) lies on y = f(x). Find its image under y = f(2x).", latex: "y=f(2x)", answer: "(3,2)", difficulty: 3, acceptedAnswers: ["3,2", "(3, 2)"], hint: "Divide $x$ by 2.", explanation: "$6\\div2=3$; $y$ unchanged, giving $(3,2)$." },
        { id: "y11adv-gt-dil-p22", prompt: "Which equation gives a horizontal dilation by factor 3 (x stretched)?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=f(3x)$" }, { label: "B", text: "$y=f(x/3)$" }, { label: "C", text: "$y=3f(x)$" }, { label: "D", text: "$y=f(-x)$" }], hint: "$f(x/a)$ stretches by $a$.", explanation: "$y=f(x/3)$ has horizontal scale factor 3." },
        { id: "y11adv-gt-dil-p23", prompt: "A point (-2,-4) lies on y = f(x). Find its image under y = -f(-x).", latex: "y=-f(-x)", answer: "(2,4)", difficulty: 5, acceptedAnswers: ["2,4", "(2, 4)"], hint: "Flip $x$ and flip $y$.", explanation: "$x\\to2$ and $y\\to-(-4)=4$, giving $(2,4)$." },
        { id: "y11adv-gt-dil-p24", prompt: "A point (4,6) lies on y = f(x). Find its image under y = 2f(x/2).", latex: "y=2f(x/2)", answer: "(8,12)", difficulty: 5, acceptedAnswers: ["8,12", "(8, 12)"], hint: "Multiply $x$ by 2 and $y$ by 2.", explanation: "$4\\times2=8$ and $6\\times2=12$, giving $(8,12)$." },
        { id: "y11adv-gt-dil-p25", prompt: "The point (3,4) maps to (3,8). Find the vertical dilation factor.", latex: "(3,4)\\mapsto(3,8)", answer: "2", difficulty: 4, acceptedAnswers: ["factor 2"], hint: "Compare the $y$-coordinates.", explanation: "$8\\div4=2$, a vertical dilation factor 2." },
        { id: "y11adv-gt-dil-p26", prompt: "The point (6,1) maps to (2,1). Find the horizontal scale factor.", latex: "(6,1)\\mapsto(2,1)", answer: "1/3", difficulty: 5, acceptedAnswers: ["0.333", "factor 1/3"], hint: "Compare the $x$-coordinates.", explanation: "$2\\div6=1/3$, a horizontal scale factor $1/3$." },
        { id: "y11adv-gt-dil-p27", prompt: "The point (-2,5) maps to (-2,-5). Which transformation was applied?", latex: "(-2,5)\\mapsto(-2,-5)", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Reflection in the $x$-axis" }, { label: "B", text: "Reflection in the $y$-axis" }, { label: "C", text: "Vertical dilation factor 5" }, { label: "D", text: "Horizontal dilation factor 2" }], hint: "Only $y$ changed sign.", explanation: "$x$ unchanged, $y$ negated: reflection in the $x$-axis." },
        { id: "y11adv-gt-dil-p28", prompt: "Under y = kf(x), the point (1,3) maps to (1,-9). Find k.", latex: "y=kf(x)", answer: "-3", difficulty: 5, acceptedAnswers: ["k=-3", "−3"], hint: "$3k=-9$.", explanation: "$3k=-9$ gives $k=-3$ (reflection and dilation factor 3)." },
        { id: "y11adv-gt-dil-p29", prompt: "Under y = f(ax), the point (8,2) maps to (4,2). Find a.", latex: "y=f(ax)", answer: "2", difficulty: 5, acceptedAnswers: ["a=2"], hint: "$x$ is divided by $a$.", explanation: "$8\\div a=4$ gives $a=2$." },
        { id: "y11adv-gt-dil-p30", prompt: "A point (2,6) maps to (-2,3). Which combined rule was applied?", latex: "(2,6)\\mapsto(-2,3)", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$y=2f(-x)$" }, { label: "B", text: "$y=-\\tfrac12 f(x)$" }, { label: "C", text: "$y=\\tfrac12 f(-x)$" }, { label: "D", text: "$y=f(-x)+3$" }], hint: "$x$ flipped sign; $y$ halved.", explanation: "$x\\to-x$ flips $2\\to-2$; $y\\times\\tfrac12$ gives $6\\to3$, so $y=\\tfrac12 f(-x)$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-gt-dil-mp1",
          prompt: "The point $(4,-3)$ lies on the graph of $y=f(x)$. The graph is transformed by the rule $y=-2f(x)$.",
          latex: "y=-2f(x),\\quad (4,-3)\\text{ on }y=f(x)",
          answer: "4",
          hint: "For (a) the $x$-coordinate is unchanged, for (b) multiply $y$ by $-2$, for (c) state the dilation factor.",
          explanation: "(a) $x$ is unchanged at 4. (b) $-3\\times(-2)=6$. (c) The $|{-2}|=2$ vertical dilation factor (with a reflection in the $x$-axis).",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the x-coordinate of the image of (4,-3).", marks: 1, answer: "4", hint: "Vertical dilation leaves $x$ unchanged.", explanation: "$x$ is unchanged, so the image $x$-coordinate is 4." },
            { key: "b", label: "(b)", prompt: "Find the y-coordinate of the image of (4,-3).", marks: 2, answer: "6", hint: "Multiply the $y$-coordinate by $-2$.", explanation: "$-3\\times(-2)=6$, so the image $y$-coordinate is 6." },
            { key: "c", label: "(c)", prompt: "State the vertical dilation factor (the size of the multiplier).", marks: 1, answer: "2", hint: "Take the size of the outside multiplier.", explanation: "The factor is $|-2|=2$; the negative also reflects in the $x$-axis." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-gt-poly-p1", prompt: "Find the vertex of the transformed quadratic.", latex: "y=(x-4)^2-1", answer: "(4,-1)", difficulty: 1, acceptedAnswers: ["4,-1", "(4, -1)"], hint: "Compare with $y=(x-h)^2+k$.", explanation: "$h=4,k=-1$, so the vertex is $(4,-1)$." },
        { id: "y11adv-gt-poly-p2", prompt: "Find the vertex of the transformed quadratic.", latex: "y=(x-2)^2+6", answer: "(2,6)", difficulty: 1, acceptedAnswers: ["2,6", "(2, 6)"], hint: "Read $h$ and $k$ directly.", explanation: "$h=2,k=6$, so the vertex is $(2,6)$." },
        { id: "y11adv-gt-poly-p3", prompt: "Find the vertical asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x-5}+2", answer: "x=5", difficulty: 1, acceptedAnswers: ["5"], hint: "Set the denominator to zero.", explanation: "$x-5=0$ gives $x=5$." },
        { id: "y11adv-gt-poly-p4", prompt: "Find the vertical asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x+7}-3", answer: "x=-7", difficulty: 2, acceptedAnswers: ["-7", "−7"], hint: "Set the denominator to zero.", explanation: "$x+7=0$ gives $x=-7$." },
        { id: "y11adv-gt-poly-p5", prompt: "Find the vertex of the transformed quadratic.", latex: "y=-(x+1)^2+5", answer: "(-1,5)", difficulty: 2, acceptedAnswers: ["-1,5", "(-1, 5)"], hint: "$x+1=x-(-1)$.", explanation: "$h=-1,k=5$, so the vertex is $(-1,5)$; the negative reflects it downward." },
        { id: "y11adv-gt-poly-p6", prompt: "Find the horizontal asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x+3}-4", answer: "y=-4", difficulty: 2, acceptedAnswers: ["-4", "−4"], hint: "The outside constant is the horizontal asymptote.", explanation: "As $x$ grows large the fraction $\\to0$, leaving $y=-4$." },
        { id: "y11adv-gt-poly-p7", prompt: "Find the horizontal asymptote of the transformed reciprocal graph.", latex: "y=\\frac{2}{x-1}+4", answer: "y=4", difficulty: 2, acceptedAnswers: ["4"], hint: "The numerator does not affect it.", explanation: "$\\frac{2}{x-1}\\to0$, so $y=4$." },
        { id: "y11adv-gt-poly-p8", prompt: "Find the excluded x-value in the domain.", latex: "y=\\frac{1}{x-6}-2", answer: "6", difficulty: 2, acceptedAnswers: ["x=6"], hint: "Set the denominator to zero.", explanation: "$x-6=0$ gives the excluded value $x=6$." },
        { id: "y11adv-gt-poly-p9", prompt: "Which equation matches the described quadratic: vertex (4,-3), opens upward?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=(x-3)^2+4$" }, { label: "B", text: "$y=(x+4)^2-3$" }, { label: "C", text: "$y=(x-4)^2-3$" }, { label: "D", text: "$y=-(x-4)^2+3$" }], hint: "Use vertex form $(x-h)^2+k$.", explanation: "Vertex $(4,-3)$ gives $(x-4)^2-3$." },
        { id: "y11adv-gt-poly-p10", prompt: "Which equation matches the described reciprocal graph with asymptotes x = -2 and y = 5?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=\\frac{1}{x+2}+5$" }, { label: "B", text: "$y=\\frac{1}{x-2}+5$" }, { label: "C", text: "$y=\\frac{1}{x+5}+2$" }, { label: "D", text: "$y=\\frac{1}{x-5}-2$" }], hint: "Vertical asymptote $x=-2$ gives $x+2$.", explanation: "$x+2$ in the denominator and $+5$ outside give the asymptotes." },
        { id: "y11adv-gt-poly-p11", prompt: "Which description matches the transformed cubic?", latex: "y=(x-2)^3+1", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Left 2 and up 1" }, { label: "B", text: "Right 2 and down 1" }, { label: "C", text: "Right 2 and up 1" }, { label: "D", text: "Reflect in the $y$-axis only" }], hint: "Inside controls horizontal; outside vertical.", explanation: "$x-2$ shifts right 2; $+1$ shifts up 1." },
        { id: "y11adv-gt-poly-p12", prompt: "Which equation has asymptotes x = -4 and y = 3?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$y=\\frac{1}{x-4}+3$" }, { label: "B", text: "$y=\\frac{1}{x+3}-4$" }, { label: "C", text: "$y=\\frac{1}{x-3}-4$" }, { label: "D", text: "$y=\\frac{1}{x+4}+3$" }], hint: "$x+4=0$ gives $x=-4$.", explanation: "$x+4$ gives $x=-4$; $+3$ gives $y=3$." },
        { id: "y11adv-gt-poly-p13", prompt: "Find the vertex of the quadratic.", latex: "y=-(x-2)^2+8", answer: "(2,8)", difficulty: 3, acceptedAnswers: ["2,8", "(2, 8)"], hint: "Read $h$ and $k$; the negative does not move the vertex.", explanation: "$h=2,k=8$, so the vertex is $(2,8)$." },
        { id: "y11adv-gt-poly-p14", prompt: "Find the vertical asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x-9}+2", answer: "x=9", difficulty: 3, acceptedAnswers: ["9"], hint: "Set the denominator to zero.", explanation: "$x-9=0$ gives $x=9$." },
        { id: "y11adv-gt-poly-p15", prompt: "Which equation shows a cubic shifted left 1 and reflected in the x-axis?", latex: "\\text{Transform }y=x^3.", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=-(x+1)^3$" }, { label: "B", text: "$y=(x-1)^3$" }, { label: "C", text: "$y=(-x+1)^3$" }, { label: "D", text: "$y=(x+1)^3$" }], hint: "Left 1 uses $x+1$; reflect with a negative outside.", explanation: "Left 1 gives $(x+1)^3$; reflection gives $-(x+1)^3$." },
        { id: "y11adv-gt-poly-p16", prompt: "Find the excluded y-value in the range of the reciprocal graph.", latex: "y=\\frac{1}{x+1}-3", answer: "-3", difficulty: 3, acceptedAnswers: ["y=-3", "−3"], hint: "The horizontal asymptote is the excluded $y$-value.", explanation: "The fraction never equals zero, so $y$ never equals $-3$." },
        { id: "y11adv-gt-poly-p17", prompt: "Find the vertex of the quadratic.", latex: "y=(x+5)^2-1", answer: "(-5,-1)", difficulty: 3, acceptedAnswers: ["-5,-1", "(-5, -1)"], hint: "$x+5=x-(-5)$.", explanation: "$h=-5,k=-1$, so the vertex is $(-5,-1)$." },
        { id: "y11adv-gt-poly-p18", prompt: "Which description matches the displayed quadratic?", latex: "y=-(x-3)^2+2", answer: "D", difficulty: 4, choices: [{ label: "A", text: "Left 3, down 2, opens upward" }, { label: "B", text: "Right 3, up 2, opens upward" }, { label: "C", text: "Left 3, up 2, opens downward" }, { label: "D", text: "Right 3, up 2, opens downward" }], hint: "Negative outside reflects downward.", explanation: "$x-3$ right 3, $+2$ up 2, negative opens downward." },
        { id: "y11adv-gt-poly-p19", prompt: "Find the y-intercept of the transformed quadratic.", latex: "y=(x-3)^2+2,\\quad x=0", answer: "11", difficulty: 4, acceptedAnswers: ["(0,11)", "y=11"], hint: "Substitute $x=0$.", explanation: "$(0-3)^2+2=9+2=11$." },
        { id: "y11adv-gt-poly-p20", prompt: "Find the y-intercept of the transformed reciprocal graph.", latex: "y=\\frac{1}{x-2}+3,\\quad x=0", answer: "5/2", difficulty: 4, acceptedAnswers: ["2.5", "5/2"], hint: "Substitute $x=0$ and simplify.", explanation: "$\\frac{1}{0-2}+3=-\\tfrac12+3=\\tfrac52$." },
        { id: "y11adv-gt-poly-p21", prompt: "A reciprocal graph has vertical asymptote x = 4. Find the value of h in y = 1/(x - h).", latex: "y=\\frac{1}{x-h}", answer: "4", difficulty: 3, acceptedAnswers: ["h=4"], hint: "The asymptote is at $x=h$.", explanation: "$x-h=0$ at $x=h$, so $h=4$." },
        { id: "y11adv-gt-poly-p22", prompt: "In y = (x - a)² + 1 the vertex is at x = 5. Find a.", latex: "y=(x-a)^2+1,\\quad \\text{vertex }x=5", answer: "5", difficulty: 3, acceptedAnswers: ["a=5"], hint: "The vertex $x$-coordinate equals $a$.", explanation: "$x-a=0$ at the vertex, so $a=5$." },
        { id: "y11adv-gt-poly-p23", prompt: "Find the x-intercept of the transformed cubic.", latex: "y=(x-2)^3,\\quad y=0", answer: "2", difficulty: 4, acceptedAnswers: ["x=2", "(2,0)"], hint: "Set the cube to zero.", explanation: "$(x-2)^3=0$ gives $x=2$." },
        { id: "y11adv-gt-poly-p24", prompt: "The graph y = (x - 1)² + k passes through (3,9). Find k.", latex: "y=(x-1)^2+k,\\quad (3,9)", answer: "5", difficulty: 5, acceptedAnswers: ["k=5"], hint: "Substitute $(3,9)$.", explanation: "$(3-1)^2+k=9$ gives $4+k=9$, so $k=5$." },
        { id: "y11adv-gt-poly-p25", prompt: "The graph y = (x - h)² + 2 passes through (5,2). Find h.", latex: "y=(x-h)^2+2,\\quad (5,2)", answer: "5", difficulty: 5, acceptedAnswers: ["h=5"], hint: "The point is the vertex (minimum).", explanation: "$(5-h)^2+2=2$ gives $(5-h)^2=0$, so $h=5$." },
        { id: "y11adv-gt-poly-p26", prompt: "A reciprocal graph y = 1/(x - 2) + k passes through (3,7). Find k.", latex: "y=\\frac{1}{x-2}+k,\\quad (3,7)", answer: "6", difficulty: 5, acceptedAnswers: ["k=6"], hint: "Substitute the point.", explanation: "$\\frac{1}{3-2}+k=7$ gives $1+k=7$, so $k=6$." },
        { id: "y11adv-gt-poly-p27", prompt: "The reciprocal graph y = a/(x - 3) + 1 passes through (5,4). Find a.", latex: "y=\\frac{a}{x-3}+1,\\quad (5,4)", answer: "6", difficulty: 5, acceptedAnswers: ["a=6"], hint: "Substitute and solve for $a$.", explanation: "$\\frac{a}{5-3}+1=4$ gives $\\frac{a}{2}=3$, so $a=6$." },
        { id: "y11adv-gt-poly-p28", prompt: "A parabola y = (x - h)² + k has vertex (2,-5). Find the sum h + k.", latex: "y=(x-h)^2+k,\\quad \\text{vertex }(2,-5)", answer: "-3", difficulty: 5, acceptedAnswers: ["−3"], hint: "$h=2$ and $k=-5$.", explanation: "$h+k=2+(-5)=-3$." },
        { id: "y11adv-gt-poly-p29", prompt: "The graph y = 1/(x - h) + k has asymptotes x = -1 and y = 4. Find k - h.", latex: "y=\\frac{1}{x-h}+k", answer: "5", difficulty: 5, acceptedAnswers: ["5"], hint: "$h=-1$ and $k=4$.", explanation: "$h=-1,k=4$, so $k-h=4-(-1)=5$." },
        { id: "y11adv-gt-poly-p30", prompt: "A cubic y = (x + 2)³ - 8 cuts the x-axis where (x + 2)³ = 8. Find the x-intercept.", latex: "y=(x+2)^3-8,\\quad y=0", answer: "0", difficulty: 5, acceptedAnswers: ["x=0", "(0,0)"], hint: "Cube root both sides.", explanation: "$(x+2)^3=8$ gives $x+2=2$, so $x=0$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-gt-poly-mp1",
          prompt: "Consider the reciprocal graph $y=\\dfrac{1}{x-3}+2$.",
          latex: "y=\\frac{1}{x-3}+2",
          answer: "3",
          hint: "For (a) set the denominator to zero, for (b) read the outside constant, for (c) substitute $x=0$.",
          explanation: "(a) Vertical asymptote $x=3$. (b) Horizontal asymptote $y=2$. (c) $y=\\frac{1}{0-3}+2=-\\tfrac13+2=\\tfrac53$.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the x-value of the vertical asymptote.", marks: 1, answer: "3", acceptedAnswers: ["x=3"], hint: "Set $x-3=0$.", explanation: "$x-3=0$ gives $x=3$." },
            { key: "b", label: "(b)", prompt: "State the y-value of the horizontal asymptote.", marks: 1, answer: "2", acceptedAnswers: ["y=2"], hint: "Read the constant outside the fraction.", explanation: "The fraction $\\to0$, so $y=2$." },
            { key: "c", label: "(c)", prompt: "Find the y-intercept value (at x = 0).", marks: 2, answer: "5/3", acceptedAnswers: ["1.667", "5/3"], hint: "Substitute $x=0$.", explanation: "$\\frac{1}{0-3}+2=-\\tfrac13+2=\\tfrac53$." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-gt-exam-p1", prompt: "Describe the transformation shown.", latex: "y=f(x-4)+1", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Right 4 and up 1" }, { label: "B", text: "Left 4 and up 1" }, { label: "C", text: "Right 1 and up 4" }, { label: "D", text: "Left 4 and down 1" }], hint: "Inside controls horizontal; outside vertical.", explanation: "$x-4$ right 4; $+1$ up 1." },
        { id: "y11adv-gt-exam-p2", prompt: "Which equation matches a shift 3 units down?", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$y=f(x-3)$" }, { label: "B", text: "$y=f(x+3)$" }, { label: "C", text: "$y=f(x)-3$" }, { label: "D", text: "$y=-f(x)$" }], hint: "Down subtracts outside.", explanation: "A vertical shift down 3 gives $-3$ outside $f$." },
        { id: "y11adv-gt-exam-p3", prompt: "Find the vertex of the transformed quadratic.", latex: "y=(x+4)^2-6", answer: "(-4,-6)", difficulty: 1, acceptedAnswers: ["-4,-6", "(-4, -6)"], hint: "$x+4=x-(-4)$.", explanation: "$h=-4,k=-6$, so the vertex is $(-4,-6)$." },
        { id: "y11adv-gt-exam-p4", prompt: "Find the vertical asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x+2}+5", answer: "x=-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "Set the denominator to zero.", explanation: "$x+2=0$ gives $x=-2$." },
        { id: "y11adv-gt-exam-p5", prompt: "Find the vertex of the quadratic graph.", latex: "y=-(x-2)^2+8", answer: "(2,8)", difficulty: 2, acceptedAnswers: ["2,8", "(2, 8)"], hint: "The negative does not move the vertex.", explanation: "$h=2,k=8$, so the vertex is $(2,8)$." },
        { id: "y11adv-gt-exam-p6", prompt: "Find the vertical asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x-9}+2", answer: "x=9", difficulty: 2, acceptedAnswers: ["9"], hint: "Set the denominator to zero.", explanation: "$x-9=0$ gives $x=9$." },
        { id: "y11adv-gt-exam-p7", prompt: "Find the horizontal asymptote of the reciprocal graph.", latex: "y=\\frac{3}{x-7}-2", answer: "y=-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "The numerator does not matter.", explanation: "$\\frac{3}{x-7}\\to0$, so $y=-2$." },
        { id: "y11adv-gt-exam-p8", prompt: "Find the excluded y-value in the range of the reciprocal graph.", latex: "y=\\frac{1}{x+1}-3", answer: "-3", difficulty: 2, acceptedAnswers: ["y=-3", "−3"], hint: "The horizontal asymptote is excluded.", explanation: "The fraction never equals zero, so $y\\ne-3$." },
        { id: "y11adv-gt-exam-p9", prompt: "Which equation matches the transformation: shift left 2 and up 3?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=f(x+2)+3$" }, { label: "B", text: "$y=f(x-2)+3$" }, { label: "C", text: "$y=f(x+3)+2$" }, { label: "D", text: "$y=-f(x+2)+3$" }], hint: "Left uses $+$ inside.", explanation: "Left 2 gives $x+2$; up 3 adds $+3$." },
        { id: "y11adv-gt-exam-p10", prompt: "Which equation matches the transformation: shift left 4 and reflect in the x-axis?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=f(-x)+4$" }, { label: "B", text: "$y=-f(x+4)$" }, { label: "C", text: "$y=-f(x-4)$" }, { label: "D", text: "$y=f(x+4)$" }], hint: "Left 4 gives $x+4$; reflect with a negative outside.", explanation: "Left 4 gives $f(x+4)$; reflection gives $-f(x+4)$." },
        { id: "y11adv-gt-exam-p11", prompt: "Which equation matches the transformation: reflect in the x-axis then shift down 1?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$y=f(-x)-1$" }, { label: "B", text: "$y=f(x-1)$" }, { label: "C", text: "$y=-f(x)+1$" }, { label: "D", text: "$y=-f(x)-1$" }], hint: "Reflect first, then subtract outside.", explanation: "Reflection gives $-f(x)$; down 1 gives $-1$." },
        { id: "y11adv-gt-exam-p12", prompt: "Find the value of the horizontal shift parameter a (vertex at x = 5).", latex: "y=(x-a)^2+1,\\quad \\text{vertex }x=5", answer: "5", difficulty: 3, acceptedAnswers: ["a=5"], hint: "Vertex $x$-coordinate equals $a$.", explanation: "$x-a=0$ at the vertex, so $a=5$." },
        { id: "y11adv-gt-exam-p13", prompt: "Find the horizontal asymptote of the reciprocal graph.", latex: "y=\\frac{1}{x+2}+5", answer: "y=5", difficulty: 3, acceptedAnswers: ["5"], hint: "Read the outside constant.", explanation: "$\\frac{1}{x+2}\\to0$, so $y=5$." },
        { id: "y11adv-gt-exam-p14", prompt: "Which description matches the displayed transformed cubic?", latex: "y=(x-2)^3+4", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Left 2 and up 4" }, { label: "B", text: "Right 4 and down 2" }, { label: "C", text: "Right 2 and up 4" }, { label: "D", text: "Left 2 and down 4" }], hint: "Inside horizontal; outside vertical.", explanation: "$x-2$ right 2; $+4$ up 4." },
        { id: "y11adv-gt-exam-p15", prompt: "Which option identifies the common error for the displayed rule?", latex: "y=f(x+6)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "It shifts left 6, not right 6" }, { label: "B", text: "It shifts down 6" }, { label: "C", text: "It reflects in the $x$-axis" }, { label: "D", text: "It has vertex $(6,0)$" }], hint: "Inside $+$ reverses to left.", explanation: "$x+6$ inside $f$ shifts left 6." },
        { id: "y11adv-gt-exam-p16", prompt: "Which equation has reciprocal asymptotes x = 3 and y = -4?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=\\frac{1}{x-3}-4$" }, { label: "B", text: "$y=\\frac{1}{x+3}-4$" }, { label: "C", text: "$y=\\frac{1}{x-4}-3$" }, { label: "D", text: "$y=\\frac{1}{x+4}+3$" }], hint: "$x-3$ gives $x=3$.", explanation: "$x-3$ gives $x=3$; $-4$ gives $y=-4$." },
        { id: "y11adv-gt-exam-p17", prompt: "Which equation matches a quadratic with vertex (-2,3) opening downward?", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$y=(x+2)^2+3$" }, { label: "B", text: "$y=-(x-2)^2-3$" }, { label: "C", text: "$y=-(x+2)^2+3$" }, { label: "D", text: "$y=(x-2)^2+3$" }], hint: "Vertex $(-2,3)$ gives $x+2$ and $+3$; downward needs a negative.", explanation: "$-(x+2)^2+3$ has vertex $(-2,3)$ and opens downward." },
        { id: "y11adv-gt-exam-p18", prompt: "Find the y-intercept of the transformed quadratic.", latex: "y=(x-1)^2+3,\\quad x=0", answer: "4", difficulty: 4, acceptedAnswers: ["(0,4)", "y=4"], hint: "Substitute $x=0$.", explanation: "$(0-1)^2+3=1+3=4$." },
        { id: "y11adv-gt-exam-p19", prompt: "A point (3,2) on y = f(x) maps to (5,-1). State the horizontal shift.", latex: "(3,2)\\mapsto(5,-1)", answer: "2", difficulty: 4, acceptedAnswers: ["right 2", "2 right"], hint: "Compare $x$-coordinates.", explanation: "$5-3=2$, a shift right 2." },
        { id: "y11adv-gt-exam-p20", prompt: "A point (3,2) on y = f(x) maps to (5,-1). State the vertical shift distance.", latex: "(3,2)\\mapsto(5,-1)", answer: "3", difficulty: 4, acceptedAnswers: ["down 3", "3 down"], hint: "Compare $y$-coordinates.", explanation: "$-1-2=-3$, a shift down 3." },
        { id: "y11adv-gt-exam-p21", prompt: "Find the y-intercept of the reciprocal graph.", latex: "y=\\frac{1}{x-4}+3,\\quad x=0", answer: "11/4", difficulty: 4, acceptedAnswers: ["2.75", "11/4"], hint: "Substitute $x=0$.", explanation: "$\\frac{1}{0-4}+3=-\\tfrac14+3=\\tfrac{11}{4}$." },
        { id: "y11adv-gt-exam-p22", prompt: "The quadratic y = (x - h)² + k has vertex (3,-2). Find h - k.", latex: "y=(x-h)^2+k,\\quad \\text{vertex }(3,-2)", answer: "5", difficulty: 5, acceptedAnswers: ["5"], hint: "$h=3,k=-2$.", explanation: "$h-k=3-(-2)=5$." },
        { id: "y11adv-gt-exam-p23", prompt: "The graph y = (x - 2)² + k passes through (4,7). Find k.", latex: "y=(x-2)^2+k,\\quad (4,7)", answer: "3", difficulty: 5, acceptedAnswers: ["k=3"], hint: "Substitute the point.", explanation: "$(4-2)^2+k=7$ gives $4+k=7$, so $k=3$." },
        { id: "y11adv-gt-exam-p24", prompt: "The reciprocal graph y = 1/(x - h) + 2 passes through (4,3). Find h.", latex: "y=\\frac{1}{x-h}+2,\\quad (4,3)", answer: "3", difficulty: 5, acceptedAnswers: ["h=3"], hint: "Substitute and solve.", explanation: "$\\frac{1}{4-h}+2=3$ gives $\\frac{1}{4-h}=1$, so $4-h=1$ and $h=3$." },
        { id: "y11adv-gt-exam-p25", prompt: "A point (1,4) lies on y = f(x). Find its image y-coordinate under y = -f(x) + 5.", latex: "y=-f(x)+5", answer: "1", difficulty: 5, acceptedAnswers: ["(1,1)"], hint: "Flip $y$, then add 5.", explanation: "$4\\to-4$, then $-4+5=1$, so the image $y$-coordinate is 1." },
        { id: "y11adv-gt-exam-p26", prompt: "The cubic y = (x + 1)³ - 27 cuts the x-axis where (x + 1)³ = 27. Find the x-intercept.", latex: "y=(x+1)^3-27,\\quad y=0", answer: "2", difficulty: 5, acceptedAnswers: ["x=2", "(2,0)"], hint: "Cube root both sides.", explanation: "$(x+1)^3=27$ gives $x+1=3$, so $x=2$." },
        { id: "y11adv-gt-exam-p27", prompt: "A reciprocal graph has asymptotes x = -2 and y = 5. The point (a, 6) lies on y = 1/(x + 2) + 5. Find a.", latex: "y=\\frac{1}{x+2}+5,\\quad (a,6)", answer: "-1", difficulty: 5, acceptedAnswers: ["a=-1", "−1"], hint: "Set $y=6$ and solve.", explanation: "$\\frac{1}{a+2}+5=6$ gives $\\frac{1}{a+2}=1$, so $a+2=1$ and $a=-1$." },
        { id: "y11adv-gt-exam-p28", prompt: "A parabola has x-intercepts 2 and 8. Find the x-coordinate of the vertex.", latex: "\\text{midpoint of }2\\text{ and }8", answer: "5", difficulty: 5, acceptedAnswers: ["x=5"], hint: "Average the intercepts.", explanation: "$\\frac{2+8}{2}=5$." },
        { id: "y11adv-gt-exam-p29", prompt: "Under y = f(x - 3) + k, the point (2,5) maps to (5,1). Find k.", latex: "y=f(x-3)+k", answer: "-4", difficulty: 5, acceptedAnswers: ["k=-4", "−4"], hint: "Compare the $y$-coordinates.", explanation: "$5+k=1$ gives $k=-4$." },
        { id: "y11adv-gt-exam-p30", prompt: "The graph y = a(x - 1)² passes through (3,12). Find a.", latex: "y=a(x-1)^2,\\quad (3,12)", answer: "3", difficulty: 5, acceptedAnswers: ["a=3"], hint: "Substitute the point.", explanation: "$a(3-1)^2=12$ gives $4a=12$, so $a=3$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-gt-exam-mp1",
          prompt: "Consider the quadratic $y=(x-3)^2-4$.",
          latex: "y=(x-3)^2-4",
          answer: "3",
          hint: "For (a) and (b) read the vertex from $(x-h)^2+k$, for (c) substitute $x=0$.",
          explanation: "(a) $h=3$. (b) $k=-4$. (c) $y=(0-3)^2-4=9-4=5$.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the x-coordinate of the vertex.", marks: 1, answer: "3", hint: "$x-3=0$ at the vertex.", explanation: "$h=3$, so the vertex $x$-coordinate is 3." },
            { key: "b", label: "(b)", prompt: "State the y-coordinate of the vertex.", marks: 1, answer: "-4", acceptedAnswers: ["−4"], hint: "The constant outside is $k$.", explanation: "$k=-4$, so the vertex $y$-coordinate is $-4$." },
            { key: "c", label: "(c)", prompt: "Find the y-intercept value (at x = 0).", marks: 2, answer: "5", hint: "Substitute $x=0$.", explanation: "$(0-3)^2-4=9-4=5$." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-gt-circles-p1", prompt: "Find the radius of the displayed circle.", latex: "(x-3)^2+(y-1)^2=16", answer: "4", difficulty: 1, acceptedAnswers: ["r=4"], hint: "Take the square root of the right-hand side.", explanation: "$r^2=16$, so $r=4$." },
        { id: "y11adv-gt-circles-p2", prompt: "Find the radius of the displayed circle.", latex: "(x+4)^2+(y-2)^2=9", answer: "3", difficulty: 1, acceptedAnswers: ["r=3"], hint: "Square-root the right-hand side.", explanation: "$r^2=9$, so $r=3$." },
        { id: "y11adv-gt-circles-p3", prompt: "Find the x-coordinate of the centre.", latex: "(x-7)^2+(y+3)^2=25", answer: "7", difficulty: 1, acceptedAnswers: ["h=7"], hint: "The bracket $x-h$ is zero at $x=h$.", explanation: "$x-7=0$ gives $h=7$." },
        { id: "y11adv-gt-circles-p4", prompt: "Find the y-coordinate of the centre.", latex: "(x-5)^2+(y+2)^2=49", answer: "-2", difficulty: 2, acceptedAnswers: ["k=-2", "−2"], hint: "$y+2=y-(-2)$.", explanation: "$y+2=0$ gives $k=-2$." },
        { id: "y11adv-gt-circles-p5", prompt: "Which coordinates give the centre of the displayed circle?", latex: "(x-3)^2+(y-1)^2=16", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$(-3,-1)$" }, { label: "B", text: "$(-3,1)$" }, { label: "C", text: "$(3,1)$" }, { label: "D", text: "$(3,-1)$" }], hint: "$x-h$ and $y-k$ give the centre.", explanation: "$x-3,y-1$ give centre $(3,1)$." },
        { id: "y11adv-gt-circles-p6", prompt: "Which coordinates give the centre of the displayed circle?", latex: "(x+4)^2+(y-2)^2=9", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$(4,2)$" }, { label: "B", text: "$(4,-2)$" }, { label: "C", text: "$(-4,-2)$" }, { label: "D", text: "$(-4,2)$" }], hint: "$x+4=x-(-4)$.", explanation: "$h=-4,k=2$, so centre $(-4,2)$." },
        { id: "y11adv-gt-circles-p7", prompt: "Find the radius of the displayed circle.", latex: "(x-5)^2+(y+2)^2=49", answer: "7", difficulty: 2, acceptedAnswers: ["r=7"], hint: "Square-root the right-hand side.", explanation: "$r^2=49$, so $r=7$." },
        { id: "y11adv-gt-circles-p8", prompt: "Find r² for a circle of radius 6.", latex: "r=6", answer: "36", difficulty: 2, acceptedAnswers: ["r^2=36"], hint: "Square the radius.", explanation: "$r^2=6^2=36$." },
        { id: "y11adv-gt-circles-p9", prompt: "Which equation gives a circle with centre (2,-5)?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(x+2)^2+(y-5)^2=r^2$" }, { label: "B", text: "$(x-2)^2+(y+5)^2=r^2$" }, { label: "C", text: "$(x-2)^2+(y-5)^2=r^2$" }, { label: "D", text: "$(x+2)^2+(y+5)^2=r^2$" }], hint: "Centre $(h,k)$ uses $x-h$ and $y-k$.", explanation: "Centre $(2,-5)$ gives $(x-2)^2+(y+5)^2$." },
        { id: "y11adv-gt-circles-p10", prompt: "Which equation gives a circle centred at the origin with radius 6?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x^2+y^2=36$" }, { label: "B", text: "$x^2+y^2=6$" }, { label: "C", text: "$(x-6)^2+y^2=36$" }, { label: "D", text: "$x^2+y^2=12$" }], hint: "$h=k=0$; $r^2=36$.", explanation: "Origin centre with $r^2=36$ gives $x^2+y^2=36$." },
        { id: "y11adv-gt-circles-p11", prompt: "Which equation matches a circle with centre (3,-1) and radius 5?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$(x-3)^2+(y-1)^2=25$" }, { label: "B", text: "$(x+3)^2+(y-1)^2=25$" }, { label: "C", text: "$(x-3)^2+(y+1)^2=5$" }, { label: "D", text: "$(x-3)^2+(y+1)^2=25$" }], hint: "Use $x-h$, $y-k$, and $r^2$.", explanation: "Centre $(3,-1)$ gives $(x-3)^2+(y+1)^2$; $r^2=25$." },
        { id: "y11adv-gt-circles-p12", prompt: "Which coordinates give the centre of the displayed circle?", latex: "(x-5)^2+(y+2)^2=49", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(5,2)$" }, { label: "B", text: "$(5,-2)$" }, { label: "C", text: "$(-5,2)$" }, { label: "D", text: "$(-5,-2)$" }], hint: "$x-5,y+2$.", explanation: "$h=5,k=-2$, so centre $(5,-2)$." },
        { id: "y11adv-gt-circles-p13", prompt: "What constant completes the square for x² - 6x?", latex: "x^2-6x+\\,?", answer: "9", difficulty: 3, acceptedAnswers: ["9"], hint: "Use $(\\text{coefficient}\\div2)^2$.", explanation: "$(-6/2)^2=9$." },
        { id: "y11adv-gt-circles-p14", prompt: "What constant completes the square for y² + 4y?", latex: "y^2+4y+\\,?", answer: "4", difficulty: 3, acceptedAnswers: ["4"], hint: "Use $(\\text{coefficient}\\div2)^2$.", explanation: "$(4/2)^2=4$." },
        { id: "y11adv-gt-circles-p15", prompt: "After completing the square, which is the correct centre-radius form?", latex: "x^2+y^2-4x+6y-3=0", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$(x-2)^2+(y+3)^2=4$" }, { label: "B", text: "$(x+2)^2+(y-3)^2=16$" }, { label: "C", text: "$(x-2)^2+(y+3)^2=16$" }, { label: "D", text: "$(x-4)^2+(y+6)^2=16$" }], hint: "Complete the square for both variables.", explanation: "$(x-2)^2-4+(y+3)^2-9=3$ gives $r^2=16$." },
        { id: "y11adv-gt-circles-p16", prompt: "Find the radius of the circle after completing the square.", latex: "x^2+y^2-6x+2y-6=0", answer: "4", difficulty: 4, acceptedAnswers: ["r=4"], hint: "Find $r^2$ first, then square-root.", explanation: "$(x-3)^2+(y+1)^2=6+9+1=16$, so $r=4$." },
        { id: "y11adv-gt-circles-p17", prompt: "Find r² after completing the square.", latex: "x^2+y^2-2x-8y+1=0", answer: "16", difficulty: 4, acceptedAnswers: ["r^2=16"], hint: "Add the completing-the-square constants to the right.", explanation: "$(x-1)^2-1+(y-4)^2-16+1=0$ gives $r^2=16$." },
        { id: "y11adv-gt-circles-p18", prompt: "Find r² after completing the square.", latex: "x^2+y^2+8x-2y-8=0", answer: "25", difficulty: 4, acceptedAnswers: ["r^2=25"], hint: "Complete the square for $x$ and $y$.", explanation: "$(x+4)^2-16+(y-1)^2-1-8=0$ gives $r^2=25$." },
        { id: "y11adv-gt-circles-p19", prompt: "Which circle has radius 5?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$(x-2)^2+(y+1)^2=5$" }, { label: "B", text: "$(x-2)^2+(y+1)^2=10$" }, { label: "C", text: "$(x-2)^2+(y+1)^2=25$" }, { label: "D", text: "$(x-2)^2+(y+1)^2=50$" }], hint: "$r^2=25$ for radius 5.", explanation: "Radius 5 means $r^2=25$." },
        { id: "y11adv-gt-circles-p20", prompt: "Which statement explains why a circle is NOT a function?", latex: "(x-2)^2+(y-1)^2=9", answer: "A", difficulty: 3, choices: [{ label: "A", text: "It fails the vertical line test" }, { label: "B", text: "It has no $x$-intercepts" }, { label: "C", text: "It uses two variables" }, { label: "D", text: "It has no $y$-intercept" }], hint: "A vertical line can cross it twice.", explanation: "A vertical line meets the circle at two points, failing the test." },
        { id: "y11adv-gt-circles-p21", prompt: "Find the x-coordinate of the centre after completing the square.", latex: "x^2+y^2-10x+4y+20=0", answer: "5", difficulty: 4, acceptedAnswers: ["h=5"], hint: "Half the coefficient of $x$ with sign reversed.", explanation: "$x^2-10x=(x-5)^2-25$, so $h=5$." },
        { id: "y11adv-gt-circles-p22", prompt: "Find the y-coordinate of the centre after completing the square.", latex: "x^2+y^2-10x+4y+20=0", answer: "-2", difficulty: 4, acceptedAnswers: ["k=-2", "−2"], hint: "Half the coefficient of $y$ with sign reversed.", explanation: "$y^2+4y=(y+2)^2-4$, so $k=-2$." },
        { id: "y11adv-gt-circles-p23", prompt: "Find the radius after completing the square.", latex: "x^2+y^2-10x+4y+20=0", answer: "3", difficulty: 5, acceptedAnswers: ["r=3"], hint: "$r^2$ is what remains on the right.", explanation: "$(x-5)^2+(y+2)^2=25+4-20=9$, so $r=3$." },
        { id: "y11adv-gt-circles-p24", prompt: "A circle has centre (1,-2) and passes through (4,2). Find r².", latex: "\\text{centre }(1,-2),\\ \\text{through }(4,2)", answer: "25", difficulty: 5, acceptedAnswers: ["r^2=25"], hint: "Use the squared distance from the centre.", explanation: "$r^2=(4-1)^2+(2-(-2))^2=9+16=25$." },
        { id: "y11adv-gt-circles-p25", prompt: "A circle has centre (1,-2) and passes through (4,2). Find the radius.", latex: "\\text{centre }(1,-2),\\ \\text{through }(4,2)", answer: "5", difficulty: 5, acceptedAnswers: ["r=5"], hint: "Square-root $r^2$.", explanation: "$r^2=9+16=25$, so $r=5$." },
        { id: "y11adv-gt-circles-p26", prompt: "A circle has a diameter from (0,0) to (6,8). Find the radius.", latex: "\\text{diameter }(0,0)\\text{ to }(6,8)", answer: "5", difficulty: 5, acceptedAnswers: ["r=5"], hint: "Radius is half the diameter length.", explanation: "Diameter $=\\sqrt{36+64}=10$, so radius $=5$." },
        { id: "y11adv-gt-circles-p27", prompt: "A circle has a diameter from (0,0) to (6,8). Find the x-coordinate of its centre.", latex: "\\text{diameter }(0,0)\\text{ to }(6,8)", answer: "3", difficulty: 5, acceptedAnswers: ["h=3"], hint: "The centre is the midpoint of the diameter.", explanation: "Midpoint $x=\\frac{0+6}{2}=3$." },
        { id: "y11adv-gt-circles-p28", prompt: "A student says the centre of (x + 5)² + (y - 3)² = 4 is (5,-3). Which option identifies the error?", latex: "(x+5)^2+(y-3)^2=4", answer: "B", difficulty: 4, choices: [{ label: "A", text: "The radius is 4, not 2" }, { label: "B", text: "The centre is $(-5,3)$; $x+5$ means $h=-5$" }, { label: "C", text: "The $y$-coordinate $-3$ is correct" }, { label: "D", text: "It is not a circle" }], hint: "$x+5=x-(-5)$.", explanation: "$h=-5,k=3$, so the centre is $(-5,3)$." },
        { id: "y11adv-gt-circles-p29", prompt: "The circle x² + y² = k passes through (3,4). Find k.", latex: "x^2+y^2=k,\\quad (3,4)", answer: "25", difficulty: 5, acceptedAnswers: ["k=25"], hint: "Substitute the point.", explanation: "$3^2+4^2=9+16=25$, so $k=25$." },
        { id: "y11adv-gt-circles-p30", prompt: "A circle has equation (x - 2)² + (y + 1)² = 25. Find the largest x-value on the circle.", latex: "(x-2)^2+(y+1)^2=25", answer: "7", difficulty: 5, acceptedAnswers: ["x=7"], hint: "Add the radius to the centre $x$-coordinate.", explanation: "Centre $x=2$, radius 5, so the largest $x$ is $2+5=7$." },
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

