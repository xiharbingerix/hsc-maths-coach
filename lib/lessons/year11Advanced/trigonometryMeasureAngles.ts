import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../newCourseCatalog";
import { practicalChoice, formulaAnswer } from "../questionHelpers";
export function year11AdvancedTrigonometryMeasureLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "trigonometry-measure-angles"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "radians-exact-trigonometric-values") {
    return {
      ...base,
      description:
        "Convert between degrees and radians, use arc length and sector area, and evaluate benchmark exact trigonometric values.",
      learningIntention:
        "Learn how radians measure angles, how to convert between angle units, and how exact trigonometric values arise from special triangles.",
      successCriteria: [
        "Convert common angles from degrees to radians.",
        "Convert common angles from radians to degrees.",
        "Use $s=r\\theta$ to find arc length when theta is in radians.",
        "Use $A=\\frac12r^2\\theta$ to find sector area when theta is in radians.",
        "Evaluate exact trigonometric values from special triangles.",
        "Identify exact values at quadrant boundaries.",
      ],
      teaching: {
        paragraphs: [
          "A radian measures angle using the relationship between arc length and radius. One full turn is $2\\pi$ radians.",
          "A half turn is $\\pi$ radians, and a right angle is $\\frac{\\pi}{2}$ radians.",
          "To convert degrees to radians, multiply by $\\frac{\\pi}{180}$. To convert radians to degrees, multiply by $\\frac{180}{\\pi}$.",
          "The formulas for arc length and sector area use radians. If the angle is given in degrees, convert it first.",
          "Exact trigonometric values for $\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, and $\\frac{\\pi}{3}$ come from the 30-60-90 and 45-45-90 triangles.",
          "Quadrant-boundary angles such as $0$, $\\frac{\\pi}{2}$, $\\pi$, and $2\\pi$ have exact values that can be read from the axes.",
        ],
        latexBlocks: [
          "360^\\circ=2\\pi,\\quad 180^\\circ=\\pi,\\quad 90^\\circ=\\frac{\\pi}{2}",
          "\\theta\\text{ radians}=\\theta^\\circ\\times\\frac{\\pi}{180}",
          "\\theta^\\circ=\\theta\\text{ radians}\\times\\frac{180}{\\pi}",
          "s=r\\theta",
          "A=\\frac12r^2\\theta",
          "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12,\\quad \\sin\\left(\\frac{\\pi}{4}\\right)=\\frac{\\sqrt2}{2},\\quad \\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}",
        ],
      },
      workedExamples: [
        {
          title: "Convert to radians and identify the quadrant",
          questionLatex:
            "150^\\circ\\quad \\text{convert to radians and identify the quadrant.}",
          steps: [
            { explanation: "Multiply by the degree-to-radian conversion factor.", latex: "150^\\circ\\times\\frac{\\pi}{180}" },
            { explanation: "Simplify the fraction.", latex: "\\frac{150\\pi}{180}=\\frac{5\\pi}{6}" },
            { explanation: "The angle lies between a right angle and a half turn.", latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi" },
          ],
          finalAnswerLatex: "\\frac{5\\pi}{6},\\quad \\text{quadrant II}",
        },
        {
          title: "Evaluate an exact value using a special triangle",
          questionLatex: "\\sin\\left(\\frac{\\pi}{3}\\right)",
          steps: [
            { explanation: "Use the 30-60-90 triangle.", latex: "\\frac{\\pi}{3}=60^\\circ" },
            { explanation: "For this angle, sine is opposite over hypotenuse.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "\\frac{\\sqrt3}{2}",
        },
        {
          title: "Find arc length",
          questionLatex: "r=8,\\quad \\theta=\\frac{\\pi}{4}",
          steps: [
            { explanation: "Use the arc length formula with theta in radians.", latex: "s=r\\theta" },
            { explanation: "Substitute the values.", latex: "s=8\\cdot\\frac{\\pi}{4}" },
            { explanation: "Simplify.", latex: "s=2\\pi" },
          ],
          finalAnswerLatex: "2\\pi",
        },
        {
          title: "Find sector area",
          questionLatex: "r=6,\\quad \\theta=\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Use the sector area formula with theta in radians.", latex: "A=\\frac12r^2\\theta" },
            { explanation: "Substitute the radius and angle.", latex: "A=\\frac12(6)^2\\cdot\\frac{2\\pi}{3}" },
            { explanation: "Simplify.", latex: "A=12\\pi" },
          ],
          finalAnswerLatex: "12\\pi",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-rad-g1", "Convert the angle to radians.", "60^\\circ", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-trig-rad-g2", "Convert the angle to degrees.", "\\frac{3\\pi}{2}", "270", ["270 degrees", "270°"]),
        formulaAnswer("y11adv-trig-rad-g3", "Find the arc length.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "2pi", ["2\\pi", "2π"]),
        practicalChoice("y11adv-trig-rad-g4", "Which exact value is correct?", "C", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 30-60-90 triangle exact values.", "\\sin\\left(\\frac{\\pi}{3}\\right)"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-rad-i1", "Convert the angle to radians.", "135^\\circ", "3pi/4", ["3\\pi/4", "3π/4"]),
        formulaAnswer("y11adv-trig-rad-i2", "Convert the angle to degrees.", "\\frac{5\\pi}{6}", "150", ["150 degrees", "150°"]),
        formulaAnswer("y11adv-trig-rad-i3", "Find the sector area.", "r=4,\\quad \\theta=\\frac{\\pi}{3}", "8pi/3", ["8\\pi/3", "8π/3"]),
        practicalChoice("y11adv-trig-rad-i4", "Which exact value is correct?", "B", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 45-45-90 triangle exact values.", "\\cos\\left(\\frac{\\pi}{4}\\right)"),
        practicalChoice("y11adv-trig-rad-i5", "Why must theta be in radians for the displayed formula?", "A", ["Radians connect arc length directly to radius", "Degrees always make the area zero", "Radians are only used for triangles", "The radius must be one"], "The formula s = r theta is derived from the radian definition.", "s=r\\theta"),
      ],
      commonMistakes: [
        { mistake: "Using degree values directly in arc length or sector area formulas.", fix: "Convert the angle to radians before using $s=r\\theta$ or $A=\\frac12r^2\\theta$." },
        { mistake: "Forgetting that a full turn is $2\\pi$ radians.", fix: "Use $360^\\circ=2\\pi$ as the anchor conversion." },
        { mistake: "Swapping the exact sine values for $\\frac{\\pi}{6}$ and $\\frac{\\pi}{3}$.", fix: "Use the 30-60-90 triangle: sine is smaller at $\\frac{\\pi}{6}$ and larger at $\\frac{\\pi}{3}$." },
        { mistake: "Leaving answers in decimal form when an exact pi expression is expected.", fix: "Keep pi in the answer unless the question asks for a decimal." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-rad-m1", "Convert the angle to radians.", "90^\\circ", "pi/2", ["\\pi/2", "π/2"]),
        formulaAnswer("y11adv-trig-rad-m2", "Convert the angle to degrees.", "\\frac{\\pi}{6}", "30", ["30 degrees", "30°"]),
        practicalChoice("y11adv-trig-rad-m3", "Which exact value is correct?", "A", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$0$"], "Use the 30-60-90 triangle exact values.", "\\sin\\left(\\frac{\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-rad-m4", "Find the arc length.", "r=8,\\quad \\theta=\\frac{\\pi}{4}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-trig-rad-m5", "Find the sector area.", "r=6,\\quad \\theta=\\frac{2\\pi}{3}", "12pi", ["12\\pi", "12π"]),
        practicalChoice("y11adv-trig-rad-m6", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{5\\pi}{6}"),
        practicalChoice("y11adv-trig-rad-m7", "A student uses the angle in degrees directly in the arc length formula. Which option identifies the error?", "D", ["The radius should be squared", "The sine value should be used", "The answer must be negative", "The angle must be converted to radians first"], "The formula s = r theta requires theta in radians.", "s=r\\theta"),
        practicalChoice("y11adv-trig-rad-m8", "Which exact boundary value is correct?", "C", ["$1$", "$-1$", "$0$", "$\\frac12$"], "At a half turn, the y-coordinate is zero.", "\\sin(\\pi)"),
        formulaAnswer("y11adv-trig-rad-m9", "Find the sector area.", "r=2,\\quad \\theta=\\frac{2\\pi}{3}", "4pi/3", ["4\\pi/3", "4π/3"]),
        formulaAnswer("y11adv-trig-rad-m10", "Convert the angle to radians.", "300^\\circ", "5pi/3", ["5\\pi/3", "5π/3"]),
      ],
    };
  }

  if (lesson.slug === "unit-circle-trigonometric-graphs") {
    return {
      ...base,
      description:
        "Use the unit circle, quadrant signs, reference angles, and graph features of sine, cosine, and tangent.",
      learningIntention:
        "Learn how the unit circle gives trigonometric values and how the basic sine, cosine, and tangent graphs behave.",
      successCriteria: [
        "Use $(\\cos\\theta,\\sin\\theta)$ as the unit-circle coordinate rule.",
        "Use tangent as $\\frac{\\sin\\theta}{\\cos\\theta}$ where defined.",
        "Identify quadrant signs for sine, cosine, and tangent.",
        "Use reference angles to evaluate exact values in other quadrants.",
        "State the period, range, and starting value of sine and cosine graphs.",
        "Recognise tangent's period, range, and vertical asymptotes.",
      ],
      teaching: {
        paragraphs: [
          "On the unit circle, the point at angle theta has x-coordinate cosine and y-coordinate sine.",
          "Tangent is sine divided by cosine, so tangent is undefined when cosine is zero.",
          "Quadrant signs can be remembered using ASTC: all positive in quadrant I, sine positive in quadrant II, tangent positive in quadrant III, and cosine positive in quadrant IV.",
          "A reference angle is the acute angle made with the x-axis. It gives the size of the exact value; the quadrant gives the sign.",
          "The basic sine and cosine graphs have period $2\\pi$ and range $[-1,1]$. Sine starts at 0, while cosine starts at 1.",
          "The basic tangent graph has period $\\pi$, all real y-values, and vertical asymptotes where cosine is zero.",
        ],
        latexBlocks: [
          "(x,y)=(\\cos\\theta,\\sin\\theta)",
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta},\\quad \\cos\\theta\\ne0",
          "\\text{ASTC: I all, II sine, III tangent, IV cosine}",
          "y=\\sin x:\\quad \\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=0",
          "y=\\cos x:\\quad \\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=1",
          "y=\\tan x:\\quad \\text{period }\\pi,\\quad \\text{asymptotes }x=\\frac{\\pi}{2}+k\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Identify quadrant signs",
          questionLatex: "\\theta=\\frac{5\\pi}{6}",
          steps: [
            { explanation: "Compare the angle with quadrant boundaries.", latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi" },
            { explanation: "The angle is in quadrant II.", latex: "\\text{quadrant II}" },
            { explanation: "In quadrant II, sine is positive and cosine is negative.", latex: "\\sin\\theta>0,\\quad \\cos\\theta<0" },
          ],
          finalAnswerLatex: "\\text{quadrant II; sine positive, cosine negative}",
        },
        {
          title: "Evaluate using a reference angle",
          questionLatex: "\\cos\\left(\\frac{5\\pi}{6}\\right)",
          steps: [
            { explanation: "The reference angle is one sixth of pi.", latex: "\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}" },
            { explanation: "Cosine has magnitude root three over two at this reference angle.", latex: "\\left|\\cos\\left(\\frac{5\\pi}{6}\\right)\\right|=\\frac{\\sqrt3}{2}" },
            { explanation: "Cosine is negative in quadrant II.", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)=-\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "-\\frac{\\sqrt3}{2}",
        },
        {
          title: "State cosine graph features",
          questionLatex: "y=\\cos x",
          steps: [
            { explanation: "The basic cosine graph repeats every full turn.", latex: "\\text{period}=2\\pi" },
            { explanation: "Cosine values run from -1 to 1.", latex: "\\text{range}=[-1,1]" },
            { explanation: "At zero, cosine starts at its maximum.", latex: "\\cos 0=1" },
          ],
          finalAnswerLatex: "\\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=1",
        },
        {
          title: "Find tangent asymptotes",
          questionLatex: "y=\\tan x",
          steps: [
            { explanation: "Tangent is undefined where cosine is zero.", latex: "\\cos x=0" },
            { explanation: "The first two positive angles where cosine is zero are shown.", latex: "x=\\frac{\\pi}{2},\\quad x=\\frac{3\\pi}{2}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{2},\\quad x=\\frac{3\\pi}{2}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-trig-circle-g1", "Which coordinate rule matches the unit circle?", "C", ["$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\sin\\theta)$", "$(\\cos\\theta,\\sin\\theta)$", "$(\\cos\\theta,\\tan\\theta)$"], "Cosine is the x-coordinate and sine is the y-coordinate.", "\\theta"),
        practicalChoice("y11adv-trig-circle-g2", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{5\\pi}{6}"),
        practicalChoice("y11adv-trig-circle-g3", "Which exact value is correct?", "A", ["$-\\frac{\\sqrt3}{2}$", "$\\frac{\\sqrt3}{2}$", "$-\\frac12$", "$\\frac12$"], "Use the reference angle and quadrant II cosine sign.", "\\cos\\left(\\frac{5\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-circle-g4", "State the period of the basic cosine graph.", "y=\\cos x", "2pi", ["2\\pi", "2π"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-trig-circle-i1", "Which signs are correct in the quadrant shown?", "D", ["Sine positive, cosine positive", "Sine positive, cosine negative", "Sine negative, cosine positive", "Sine negative, cosine negative"], "In quadrant III, both coordinates are negative.", "\\text{Quadrant III}"),
        practicalChoice("y11adv-trig-circle-i2", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-circle-i3", "State the starting value of the basic sine graph.", "y=\\sin x,\\quad x=0", "0"),
        practicalChoice("y11adv-trig-circle-i4", "Where is tangent undefined?", "A", ["Where cosine is zero", "Where sine is zero", "Where tangent is positive", "Where x is any multiple of pi"], "Tangent is sine divided by cosine.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        formulaAnswer("y11adv-trig-circle-i5", "State the period of the basic tangent graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
      ],
      commonMistakes: [
        { mistake: "Swapping sine and cosine coordinates on the unit circle.", fix: "Use $(\\cos\\theta,\\sin\\theta)$." },
        { mistake: "Using the reference angle sign without checking the quadrant.", fix: "Find the magnitude from the reference angle, then apply the quadrant sign." },
        { mistake: "Giving tangent the same range as sine and cosine.", fix: "Tangent has all real y-values." },
        { mistake: "Forgetting tangent is undefined where cosine is zero.", fix: "Use $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$ and check the denominator." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-trig-circle-m1", "Which coordinate rule matches the unit circle?", "A", ["$(\\cos\\theta,\\sin\\theta)$", "$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\cos\\theta)$", "$(\\theta,\\sin\\theta)$"], "Cosine is the x-coordinate and sine is the y-coordinate.", "\\theta"),
        practicalChoice("y11adv-trig-circle-m2", "Which quadrant contains the angle?", "C", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a half turn and three quarters of a turn.", "\\frac{4\\pi}{3}"),
        formulaAnswer("y11adv-trig-circle-m3", "State the period of the basic sine graph.", "y=\\sin x", "2pi", ["2\\pi", "2π"]),
        practicalChoice("y11adv-trig-circle-m4", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-circle-m5", "Which exact value is correct?", "D", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant II cosine sign.", "\\cos\\left(\\frac{5\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-circle-m6", "Which feature belongs to the basic tangent graph?", "C", ["Range $[-1,1]$", "Period $2\\pi$", "Vertical asymptote at $x=\\frac{\\pi}{2}$", "Starting value 1"], "Tangent is undefined where cosine is zero.", "y=\\tan x"),
        practicalChoice("y11adv-trig-circle-m7", "A student says tangent is undefined where sine is zero. Which option identifies the error?", "A", ["Tangent is undefined where cosine is zero", "Tangent is never undefined", "Sine and cosine are always equal", "The reference angle should be doubled"], "Tangent has cosine in the denominator.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        practicalChoice("y11adv-trig-circle-m8", "Which graph starts at its maximum value?", "B", ["$y=\\sin x$", "$y=\\cos x$", "$y=\\tan x$", "$y=-\\sin x$"], "Cosine starts at 1 when x is zero.", "x=0"),
        formulaAnswer("y11adv-trig-circle-m9", "State the first positive vertical asymptote of the basic tangent graph.", "y=\\tan x", "pi/2", ["\\pi/2", "π/2"]),
        practicalChoice("y11adv-trig-circle-m10", "Which statement correctly describes the basic cosine graph?", "D", ["Period pi and range all real values", "Period pi and range [-1,1]", "Period 2pi and range all real values", "Period 2pi and range [-1,1]"], "The basic cosine graph repeats every full turn and stays between -1 and 1.", "y=\\cos x"),
      ],
    };
  }

  if (lesson.slug === "trigonometry-measure-angles-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed assessment-style questions on radians, exact values, arc length, sector area, the unit circle, and basic trigonometric graphs.",
      learningIntention:
        "Apply angle-measure, exact-value, unit-circle, and trigonometric-graph skills to mixed assessment-style questions.",
      successCriteria: [
        "Convert common angles between degrees and radians.",
        "Use arc length and sector area formulas with radians.",
        "Evaluate exact trigonometric values using special triangles and quadrant signs.",
        "Use the unit-circle coordinate rule.",
        "Identify tangent undefined values and asymptotes.",
        "State basic sine, cosine, and tangent graph features.",
      ],
      teaching: {
        paragraphs: [
          "This exam-practice lesson mixes the skills from the unit. First identify whether the question is about angle conversion, arc length, sector area, exact values, the unit circle, or graph features.",
          "Keep exact answers in terms of pi where appropriate, and use radians for arc length and sector area formulas.",
          "For exact trigonometric values outside quadrant I, use the reference angle for the size and the quadrant for the sign.",
          "For graph questions, remember that sine and cosine have period $2\\pi$, while tangent has period $\\pi$ and vertical asymptotes.",
        ],
        latexBlocks: [
          "180^\\circ=\\pi",
          "s=r\\theta,\\quad A=\\frac12r^2\\theta",
          "(x,y)=(\\cos\\theta,\\sin\\theta)",
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}",
          "y=\\sin x,\\ y=\\cos x:\\text{ period }2\\pi;\\quad y=\\tan x:\\text{ period }\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Mixed conversion and exact value",
          questionLatex: "120^\\circ,\\quad \\sin\\left(\\frac{2\\pi}{3}\\right)",
          steps: [
            { explanation: "Convert the angle to radians.", latex: "120^\\circ=120\\times\\frac{\\pi}{180}=\\frac{2\\pi}{3}" },
            { explanation: "Use the reference angle and quadrant II sine sign.", latex: "\\sin\\left(\\frac{2\\pi}{3}\\right)=\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "\\frac{2\\pi}{3},\\quad \\frac{\\sqrt3}{2}",
        },
        {
          title: "Arc length in an assessment context",
          questionLatex: "r=9,\\quad \\theta=\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Use the arc length formula.", latex: "s=r\\theta" },
            { explanation: "Substitute and simplify.", latex: "s=9\\cdot\\frac{2\\pi}{3}=6\\pi" },
          ],
          finalAnswerLatex: "6\\pi",
        },
        {
          title: "Graph feature check",
          questionLatex: "y=\\tan x",
          steps: [
            { explanation: "The tangent graph repeats every pi.", latex: "\\text{period}=\\pi" },
            { explanation: "The first positive vertical asymptote occurs where cosine is zero.", latex: "x=\\frac{\\pi}{2}" },
          ],
          finalAnswerLatex: "\\text{period }\\pi,\\quad \\text{asymptote }x=\\frac{\\pi}{2}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-exam-g1", "Convert the angle to radians.", "30^\\circ", "pi/6", ["\\pi/6", "π/6"]),
        formulaAnswer("y11adv-trig-exam-g2", "Find the arc length.", "r=3,\\quad \\theta=2\\pi", "6pi", ["6\\pi", "6π"]),
        practicalChoice("y11adv-trig-exam-g3", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt2}{2}$", "$-\\frac{\\sqrt2}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-exam-g4", "Which graph feature is correct?", "D", ["Sine has period pi", "Cosine has range all real values", "Tangent has range [-1,1]", "Tangent has period pi"], "The basic tangent graph repeats every pi.", "\\text{Basic trigonometric graphs}"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-exam-i1", "Convert the angle to degrees.", "\\frac{3\\pi}{4}", "135", ["135 degrees", "135°"]),
        formulaAnswer("y11adv-trig-exam-i2", "Find the sector area.", "r=3,\\quad \\theta=\\frac{2\\pi}{3}", "3pi", ["3\\pi", "3π"]),
        practicalChoice("y11adv-trig-exam-i3", "Which coordinate rule is correct?", "A", ["$(\\cos\\theta,\\sin\\theta)$", "$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\sin\\theta)$", "$(\\theta,\\tan\\theta)$"], "On the unit circle, cosine is x and sine is y.", "\\theta"),
        practicalChoice("y11adv-trig-exam-i4", "Which sign pattern is correct?", "C", ["Sine positive, cosine positive", "Sine positive, cosine negative", "Sine negative, cosine positive", "Sine negative, cosine negative"], "In quadrant IV, y is negative and x is positive.", "\\text{Quadrant IV}"),
        formulaAnswer("y11adv-trig-exam-i5", "State the first positive vertical asymptote of the tangent graph.", "y=\\tan x", "pi/2", ["\\pi/2", "π/2"]),
      ],
      commonMistakes: [
        { mistake: "Forgetting to convert degrees to radians before using circular-measure formulas.", fix: "Use radians in $s=r\\theta$ and $A=\\frac12r^2\\theta$." },
        { mistake: "Using the reference angle but forgetting the quadrant sign.", fix: "Reference angles give magnitude; quadrant signs give positive or negative." },
        { mistake: "Mixing up sine and cosine on the unit circle.", fix: "The unit-circle point is $(\\cos\\theta,\\sin\\theta)$." },
        { mistake: "Giving tangent the same period and range as sine and cosine.", fix: "Tangent has period $\\pi$ and all real y-values." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-exam-m1", "Convert the angle to radians.", "180^\\circ", "pi", ["\\pi", "π"]),
        formulaAnswer("y11adv-trig-exam-m2", "Convert the angle to degrees.", "\\frac{\\pi}{4}", "45", ["45 degrees", "45°"]),
        practicalChoice("y11adv-trig-exam-m3", "Which exact value is correct?", "A", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 30-60-90 triangle.", "\\cos\\left(\\frac{\\pi}{3}\\right)"),
        formulaAnswer("y11adv-trig-exam-m4", "Find the arc length.", "r=5,\\quad \\theta=\\frac{2\\pi}{5}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-trig-exam-m5", "Find the sector area.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "6pi", ["6\\pi", "6π"]),
        practicalChoice("y11adv-trig-exam-m6", "Which quadrant contains the angle?", "D", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between three quarters of a turn and one full turn.", "\\frac{5\\pi}{3}"),
        practicalChoice("y11adv-trig-exam-m7", "Which statement identifies the common tangent error?", "B", ["Tangent is undefined where sine is zero", "Tangent is undefined where cosine is zero", "Tangent has range [-1,1]", "Tangent has period 2pi"], "Tangent has cosine in the denominator.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        practicalChoice("y11adv-trig-exam-m8", "Which graph has starting value one?", "C", ["$y=\\sin x$", "$y=\\tan x$", "$y=\\cos x$", "$y=-\\cos x$"], "Cosine starts at 1 when x is zero.", "x=0"),
        practicalChoice("y11adv-trig-exam-m9", "Which exact value is correct?", "D", ["$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt2}{2}$", "$\\frac12$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III cosine sign.", "\\cos\\left(\\frac{7\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-exam-m10", "State the period of the basic tangent graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
      ],
    };
  }

  return null;
}

