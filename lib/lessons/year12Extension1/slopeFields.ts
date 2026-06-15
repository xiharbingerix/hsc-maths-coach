import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function sfChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer,
    hint: "Substitute the point (x, y) into the right-hand side of the DE to read the slope at that location.",
    explanation,
  };
}

function sfTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Substitute x and y into f(x, y) on the right-hand side of the DE. The result is the slope at that point.",
    explanation,
  };
}

// ─── Lesson: Slope Fields ────────────────────────────────────────────────────

const slopeFields: Partial<ExplicitLesson> = {
  description:
    "Construct and read slope fields (direction fields) for first-order differential equations, sketch solution curves through the field, identify equilibria and their stability, and determine long-run behaviour.",
  learningIntention:
    "Read a slope field by substituting a point into dy/dx = f(x, y), sketch solution curves by following the field directions, locate equilibria where f(x, y) = 0, and classify them as stable or unstable from the slope directions.",
  successCriteria: [
    "Compute the slope at a given point (x, y) by substituting into the DE.",
    "Interpret a slope field diagram: short segments show the gradient of the solution at each point.",
    "Sketch a solution curve through a given point by following the direction field.",
    "Identify the equilibrium value A by setting f(x, y) = 0 and solving for y.",
    "Classify an equilibrium as stable (neighbouring solutions converge) or unstable (diverge).",
    "Describe the long-run behaviour of solutions from the slope field.",
  ],
  teaching: {
    paragraphs: [
      "A slope field (or direction field) is a picture of a differential equation dy/dx = f(x, y). At each point (x, y) in the plane we draw a short line segment whose slope equals f(x, y). The collection of all these segments forms the slope field — it shows the slope of every solution curve at every point.",
      "To read a slope field: go to the point (x, y) you are interested in, substitute into f(x, y), and that value is the slope there. Positive means the segment tilts up-right; negative means down-right; zero means horizontal.",
      "To sketch a solution curve (particular solution) through a given point: start at the point and follow the direction of nearby segments, always moving in the direction the segments point. The curve you trace is the particular solution through that initial condition.",
      "An equilibrium is a y-value where dy/dx = 0 for all x — the solution y = A is constant. Stable: nearby curves converge to it (k < 0 in dQ/dt = k(Q−A)). Unstable: nearby curves diverge from it (k > 0).",
    ],
    latexBlocks: [
      "\\text{Slope at }(x,y)=f(x,y)\\quad\\text{from }\\frac{dy}{dx}=f(x,y)",
      "\\text{Equilibrium: solve }f(x,y)=0\\text{ for }y\\;\\Rightarrow\\;y=A",
      "\\text{Stable: }f(x,y)>0\\text{ below }A,\\;f(x,y)<0\\text{ above }A\\;(\\text{e.g. }k<0\\text{ in }k(y-A))",
    ],
  },
  workedExamples: [
    {
      title: "Reading and sketching: dy/dx = y",
      questionLatex:
        "\\text{The slope field for }\\dfrac{dy}{dx}=y\\text{ is shown.}\\\\\\text{(a) Find the slope at }(1,3).\\quad\\text{(b) Find the equilibrium.}\\\\\\text{(c) Classify the equilibrium as stable or unstable.}",
      steps: [
        {
          explanation: "Read the slope at (1, 3) by substituting into f(x, y) = y.",
          latex: "\\text{slope at }(1,3)=y=3",
        },
        {
          explanation: "Find the equilibrium by setting f(x, y) = 0.",
          latex: "y=0\\;\\Rightarrow\\;\\frac{dy}{dx}=0\\;\\Rightarrow\\;y=0\\text{ is the equilibrium}",
        },
        {
          explanation: "Check stability: above y = 0, f = y > 0 (segments slope upward — solutions move away). Below, f < 0 (solutions move away downward). Both sides diverge.",
          latex: "\\text{Equilibrium }y=0\\text{ is \\textbf{unstable}: solutions diverge from it.}",
        },
      ],
      finalAnswerLatex:
        "\\text{Slope at }(1,3)=3;\\quad y=0\\text{ (unstable equilibrium)}",
      slopeFieldDiagram: {
        description:
          "Slope field for dy/dx = y. Segments are horizontal along y = 0 (the unstable equilibrium, shown dashed). Above y = 0 the segments tilt upward, below they tilt downward — solutions diverge away from y = 0. The two blue curves show particular solutions y = eˣ (starting at (0,1)) and y = −eˣ (starting at (0,−1)), which move away from the equilibrium.",
        de: { kind: "linear", b: 1 },
        xMin: -2, xMax: 3, yMin: -3, yMax: 3,
        gridSpacing: 0.5,
        equilibriumY: 0,
        solutionCurves: [
          { x0: 0, y0: 1, label: "y=eˣ" },
          { x0: 0, y0: -1, label: "y=−eˣ" },
        ],
        xAxisLabel: "x",
        yAxisLabel: "y",
      },
    },
    {
      title: "Stable equilibrium: dy/dx = −0.5(y − 2)",
      questionLatex:
        "\\text{The slope field for }\\dfrac{dy}{dx}=-0.5(y-2)\\text{ is shown.}\\\\\\text{(a) Find the equilibrium and classify it.}\\\\\\text{(b) Describe the long-run behaviour of all solutions.}",
      steps: [
        {
          explanation: "Find the equilibrium: set −0.5(y − 2) = 0.",
          latex: "-0.5(y-2)=0\\;\\Rightarrow\\;y=2",
        },
        {
          explanation: "Check stability: if y > 2, then −0.5(y−2) < 0 (segments tilt down → y decreases toward 2). If y < 2, then −0.5(y−2) > 0 (segments tilt up → y increases toward 2). Both sides converge.",
          latex: "\\text{Equilibrium }y=2\\text{ is \\textbf{stable}.}",
        },
        {
          explanation: "Long-run behaviour: regardless of initial condition, all solutions approach y = 2 as x → ∞.",
          latex: "\\lim_{x\\to\\infty}y(x)=2\\quad\\text{for all initial conditions}",
        },
      ],
      finalAnswerLatex:
        "y=2\\text{ is a stable equilibrium; all solutions}\\to 2\\text{ as }x\\to\\infty",
      slopeFieldDiagram: {
        description:
          "Slope field for dy/dx = −0.5(y − 2). The dashed red line at y = 2 is the stable equilibrium: segments above y = 2 slope downward and segments below slope upward, drawing all solutions toward y = 2. The two blue curves start at y₀ = 4 (above equilibrium) and y₀ = 0 (below equilibrium) and both converge to y = 2.",
        de: { kind: "linear", b: -0.5, c: 1 },
        xMin: 0, xMax: 6, yMin: -0.5, yMax: 4.5,
        gridSpacing: 0.5,
        equilibriumY: 2,
        solutionCurves: [
          { x0: 0, y0: 4, label: "y₀=4" },
          { x0: 0, y0: 0, label: "y₀=0" },
        ],
        xAxisLabel: "x",
        yAxisLabel: "y",
      },
    },
  ],
  guidedPractice: [
    {
      ...sfChoice(
        "y12e1-sf-g1",
        "Using the slope field for dy/dx = y shown above: what is the slope at the point (2, 3)?",
        "B",
        ["2", "3", "6", "0"],
        "The slope at (x, y) equals f(x, y) = y. At (2, 3), slope = y = 3."
      ),
      slopeFieldDiagram: {
        description:
          "Slope field for dy/dx = y (same as worked example 1). Segments are horizontal along y = 0, tilting upward above it and downward below. Use this to read off the slope at any point by looking at the segment direction.",
        de: { kind: "linear", b: 1 },
        xMin: -2, xMax: 3, yMin: -3, yMax: 3,
        gridSpacing: 0.5,
        equilibriumY: 0,
        xAxisLabel: "x",
        yAxisLabel: "y",
      },
    },
    sfChoice(
      "y12e1-sf-g2",
      "For dy/dx = k(y − A) with k < 0, all horizontal segments (slope = 0) lie along:",
      "C",
      ["y = k", "y = 0", "y = A", "x = A"],
      "The slope is zero when y − A = 0, i.e. y = A. This is the equilibrium line."
    ),
    sfTyped(
      "y12e1-sf-g3",
      "For dy/dx = −0.5(y − 2), what value of y gives slope = 0?",
      "-0.5(y-2)=0",
      "2",
      ["y=2"],
      "−0.5(y − 2) = 0 → y = 2. This is the equilibrium value."
    ),
    sfChoice(
      "y12e1-sf-g4",
      "A slope field for dy/dx = −y has equilibrium at y = 0. Solutions starting near y = 2 will:",
      "B",
      [
        "Diverge away from y = 0.",
        "Decrease toward y = 0.",
        "Stay at y = 2 indefinitely.",
        "Oscillate around y = 0.",
      ],
      "dy/dx = −y: when y > 0, slope is negative (y decreases). All positive solutions approach y = 0 — it is a stable equilibrium."
    ),
  ],
  independentPractice: [
    {
      ...sfTyped(
        "y12e1-sf-i1",
        "dy/dx = x. What is the slope at (−2, 5)?",
        "\\frac{dy}{dx}=x\\;\\text{at }(-2,5)",
        "-2",
        ["slope = -2"],
        "The slope equals x = −2. Note: this DE's slope depends only on x, not y."
      ),
      slopeFieldDiagram: {
        description:
          "Slope field for dy/dx = x. All segments in the same vertical column (same x) have the same slope. Segments are horizontal along x = 0, tilt downward for x < 0 and upward for x > 0. Solutions are parabolas y = ½x² + C.",
        de: { kind: "linear", a: 1 },
        xMin: -3, xMax: 3, yMin: -3, yMax: 3,
        gridSpacing: 0.5,
        solutionCurves: [
          { x0: 0, y0: 0 },
          { x0: 0, y0: 1.5 },
        ],
        xAxisLabel: "x",
        yAxisLabel: "y",
      },
    },
    sfChoice(
      "y12e1-sf-i2",
      "A slope field shows segments that are horizontal along y = 4, slope downward above y = 4, and slope upward below y = 4. The equilibrium y = 4 is:",
      "A",
      ["Stable — solutions converge to y = 4.", "Unstable — solutions diverge from y = 4.", "Neither — there is no equilibrium.", "Neutral — solutions neither converge nor diverge."],
      "Convergence from both sides is the definition of a stable equilibrium."
    ),
    sfTyped(
      "y12e1-sf-i3",
      "dy/dx = y − x. What is the slope at (2, 3)?",
      "\\frac{dy}{dx}=y-x\\;\\text{at }(2,3)",
      "1",
      ["slope=1"],
      "slope = y − x = 3 − 2 = 1."
    ),
    sfChoice(
      "y12e1-sf-i4",
      "For dy/dx = y, the equilibrium y = 0 is:",
      "D",
      [
        "Stable — solutions converge to y = 0.",
        "Neutral — solutions are parabolas.",
        "Not an equilibrium — dy/dx is never 0.",
        "Unstable — solutions diverge away from y = 0.",
      ],
      "dy/dx = y: above y = 0, slope > 0 (solutions move upward away from 0); below, slope < 0 (solutions move downward away from 0). Both sides diverge — y = 0 is unstable."
    ),
    sfTyped(
      "y12e1-sf-i5",
      "For dy/dx = −2(y − 3), what is the long-run value of y for all solutions (except y₀ = 3)?",
      "\\lim_{x\\to\\infty}y(x)=?",
      "3",
      ["y=3"],
      "The stable equilibrium is y = 3. As x → ∞, all solutions approach y = 3."
    ),
  ],
  masteryQuiz: [
    sfTyped(
      "y12e1-sf-m1",
      "dy/dx = x + y. What is the slope at (1, 1)?",
      "\\frac{dy}{dx}=x+y\\;\\text{at }(1,1)",
      "2",
      [],
      "slope = 1 + 1 = 2."
    ),
    sfTyped(
      "y12e1-sf-m2",
      "dy/dx = −y. What is the slope at (1, 2)?",
      "\\frac{dy}{dx}=-y\\;\\text{at }(1,2)",
      "-2",
      ["slope=-2"],
      "slope = −y = −2."
    ),
    sfChoice(
      "y12e1-sf-m3",
      "For dy/dx = k(y − A) with k < 0, as x → ∞ all solution curves:",
      "B",
      ["Diverge to ±∞.", "Approach the equilibrium y = A.", "Oscillate about y = A.", "Approach y = 0."],
      "k < 0 makes A a stable equilibrium. All solutions approach A."
    ),
    sfTyped(
      "y12e1-sf-m4",
      "dy/dx = y − x. What is the slope at (1, 2)?",
      "\\frac{dy}{dx}=y-x\\;\\text{at }(1,2)",
      "1",
      ["slope=1"],
      "slope = 2 − 1 = 1."
    ),
    sfChoice(
      "y12e1-sf-m5",
      "A slope field has horizontal segments everywhere on the line y = 5. Which DE is consistent with this?",
      "C",
      [
        "dy/dx = 5",
        "dy/dx = x − 5",
        "dy/dx = y − 5",
        "dy/dx = 5x",
      ],
      "dy/dx = y − 5 gives slope 0 when y = 5 (for all x) — this matches a horizontal equilibrium line at y = 5."
    ),
    sfTyped(
      "y12e1-sf-m6",
      "dy/dx = −2(y − 3). What is the slope at (0, 5)?",
      "-2(5-3)",
      "-4",
      ["slope=-4"],
      "−2(5 − 3) = −2(2) = −4. The curve is above the equilibrium y = 3 and sloping downward toward it."
    ),
    sfChoice(
      "y12e1-sf-m7",
      "A solution curve is sketched through a slope field by:",
      "A",
      [
        "Following the direction of the nearby segments at each step.",
        "Drawing a straight line from the initial point.",
        "Connecting all points where the slope equals 1.",
        "Averaging the slopes of adjacent segments.",
      ],
      "You trace the curve by continuously following the local direction of the segments — the curve is always tangent to the field."
    ),
    sfTyped(
      "y12e1-sf-m8",
      "dy/dx = x². What is the slope at (−2, 5)?",
      "\\frac{dy}{dx}=x^2\\;\\text{at }(-2,5)",
      "4",
      ["slope=4"],
      "slope = (−2)² = 4. Note: x² is always non-negative, so all segments slope upward (or horizontal at x = 0)."
    ),
    sfChoice(
      "y12e1-sf-m9",
      "If at every point the slope field has the same slope in each column (same x, any y), the DE:",
      "C",
      [
        "Depends only on y.",
        "Has a stable equilibrium.",
        "Depends only on x.",
        "Must be linear in both x and y.",
      ],
      "If f(x, y) = f(x) — i.e. the slope depends only on x — then every point in the same vertical column has the same slope (all segments in a column are parallel)."
    ),
    sfTyped(
      "y12e1-sf-m10",
      "dy/dx = y − 4. What value of y gives the equilibrium?",
      "y-4=0",
      "4",
      ["y=4"],
      "Set y − 4 = 0 → y = 4. (Since the coefficient of y is +1 > 0, this equilibrium is unstable.)"
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "calculus-applications-slope-fields": slopeFields,
};

export function year12Extension1SlopeFieldsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "calculus-applications") return undefined;
  return lessons[lesson.slug];
}
