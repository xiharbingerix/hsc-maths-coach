import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Use the method taught in this lesson carefully, then check your answer.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key rule taught in this lesson before choosing.",
    explanation,
  };
}

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
>;

// ─── Lesson 1: Graphical Method ──────────────────────────────────────────────

const simultaneousEquationsGraphical: LessonContent = {
  description: "Graph two linear equations on the same axes and identify the point of intersection as the solution of the simultaneous system.",
  learningIntention: "Solve simultaneous linear equations by graphing both lines and identifying their point of intersection.",
  successCriteria: [
    "Find two points on each line by substituting values, then draw the line.",
    "Identify the coordinates of the point of intersection of the two lines.",
    "State the solution as an ordered pair (x, y) and verify it satisfies both equations.",
    "Recognise inconsistent systems (parallel lines, no solution) and dependent systems (same line, infinite solutions).",
  ],
  teaching: {
    paragraphs: [
      "Two linear equations with two unknowns form a system of simultaneous equations. A solution is a pair (x, y) that satisfies BOTH equations at the same time — the x and y values must work in each equation.",
      "Graphically, each equation represents a straight line. The solution of the system is the point where the two lines intersect. Read the x-coordinate and y-coordinate of that intersection point to find the solution.",
      "If the lines are parallel — they have the same gradient but different y-intercepts — they never meet. There is no solution; the system is called inconsistent. If both equations represent the same line, every point on the line is a solution; there are infinitely many solutions.",
      "To graph each equation, use two points — often the x-intercept (set y = 0) and the y-intercept (set x = 0) — or rearrange to gradient-intercept form y = mx + b and use the y-intercept and gradient to plot.",
    ],
    latexBlocks: [
      "y=mx+b",
      "\\text{intersection point: the solution }(x,y)",
      "\\text{parallel lines: no solution; same line: infinite solutions}",
    ],
  },
  workedExamples: [
    {
      title: "Solve a system graphically and check",
      questionLatex: "\\text{Solve }y=2x+1\\text{ and }y=-x+4\\text{ graphically.}",
      steps: [
        {
          explanation: "Graph y = 2x + 1. When x = 0, y = 1. When x = 2, y = 5. Plot (0, 1) and (2, 5) and draw the line.",
          latex: "y=2x+1:\\quad(0,\\,1),\\;(2,\\,5)",
        },
        {
          explanation: "Graph y = -x + 4. When x = 0, y = 4. When x = 4, y = 0. Plot (0, 4) and (4, 0) and draw the line.",
          latex: "y=-x+4:\\quad(0,\\,4),\\;(4,\\,0)",
        },
        {
          explanation: "The lines intersect at (1, 3). Read the coordinates from the graph.",
          latex: "\\text{Intersection: }(1,\\,3)",
        },
        {
          explanation: "Check in both equations: y = 2(1) + 1 = 3 and y = -1 + 4 = 3.",
          latex: "2(1)+1=3\\;\\checkmark,\\quad -1+4=3\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=1,\\quad y=3",
    } as WorkedExample,
    {
      title: "Identify a system with no solution (parallel lines)",
      questionLatex: "\\text{How many solutions does }y=3x+2\\text{ and }y=3x-1\\text{ have?}",
      steps: [
        {
          explanation: "Both lines have gradient m = 3. Their y-intercepts are different: +2 and -1.",
          latex: "m_1=3=m_2,\\quad b_1=2\\neq b_2=-1",
        },
        {
          explanation: "Lines with equal gradients are parallel. Parallel lines never intersect, so there is no solution.",
          latex: "\\text{Parallel lines}\\Rightarrow\\text{no solution}",
        },
      ],
      finalAnswerLatex: "\\text{No solution (inconsistent system)}",
    } as WorkedExample,
    {
      title: "Read the solution from a graph",
      questionLatex: "\\text{Two lines on a graph cross at the point }(2,\\,-1).\\text{ State the solution.}",
      steps: [
        {
          explanation: "The intersection point gives the x-coordinate and y-coordinate of the solution directly.",
          latex: "\\text{Intersection}=(2,\\,-1)",
        },
        {
          explanation: "The solution of the simultaneous equations is x = 2 and y = -1.",
          latex: "x=2,\\quad y=-1",
        },
      ],
      finalAnswerLatex: "x=2,\\quad y=-1",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "sim-gra-g1",
      "Two lines are graphed on the same axes. They cross at the point (3, 5). What is the solution of the simultaneous equations?",
      "B",
      ["x = 5, y = 3", "x = 3, y = 5", "x = 3, y = 3", "x = 5, y = 5"],
      "The intersection point is (x, y) = (3, 5), so x = 3 and y = 5.",
      "\\text{Lines cross at }(3,5)"
    ),
    choice(
      "sim-gra-g2",
      "Two lines have equations y = 2x + 1 and y = 2x - 3. How many solutions does this system have?",
      "C",
      ["One solution", "Infinite solutions", "No solution", "Two solutions"],
      "Both lines have gradient 2 but different y-intercepts (+1 and -3), so they are parallel and never intersect. The system has no solution.",
      "y=2x+1\\text{ and }y=2x-3"
    ),
    answer(
      "sim-gra-g3",
      "The lines y = x + 2 and y = -x + 6 are graphed. At the intersection, what is the x-coordinate? (Solve by setting x + 2 = -x + 6 if needed.)",
      "y=x+2\\text{ and }y=-x+6",
      "2",
      "x + 2 = -x + 6 gives 2x = 4, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-gra-g4",
      "For the system y = x + 2 and y = -x + 6, once you know x = 2, what is the y-coordinate at the intersection?",
      "y=x+2,\\quad x=2",
      "4",
      "Substitute x = 2 into y = x + 2: y = 2 + 2 = 4. The intersection is (2, 4).",
      ["4"]
    ),
  ],
  independentPractice: [
    answer(
      "sim-gra-i1",
      "The lines y = 3x - 2 and y = x + 4 intersect. What is the x-coordinate of the intersection?",
      "y=3x-2\\text{ and }y=x+4",
      "3",
      "Set equal: 3x - 2 = x + 4 gives 2x = 6, so x = 3.",
      ["3"]
    ),
    answer(
      "sim-gra-i2",
      "For y = 3x - 2 and y = x + 4, using x = 3, what is the y-coordinate of the intersection?",
      "y=x+4,\\quad x=3",
      "7",
      "y = 3 + 4 = 7. The intersection is (3, 7). Check: 3(3)-2=7.",
      ["7"]
    ),
    answer(
      "sim-gra-i3",
      "The lines y = -2x + 5 and y = x - 1 are drawn on the same axes. What is the x-coordinate of their intersection?",
      "y=-2x+5\\text{ and }y=x-1",
      "2",
      "-2x + 5 = x - 1 gives 6 = 3x, so x = 2.",
      ["2"]
    ),
    choice(
      "sim-gra-i4",
      "Which point lies on BOTH lines y = 2x - 1 and y = -x + 5?",
      "B",
      ["(1, 4)", "(2, 3)", "(3, 5)", "(0, -1)"],
      "Test (2, 3): y = 2(2) - 1 = 3 and y = -2 + 5 = 3. Both equations are satisfied.",
      "y=2x-1\\text{ and }y=-x+5"
    ),
    answer(
      "sim-gra-i5",
      "A pair of simultaneous equations has the same gradient and the same y-intercept. How many solutions are there? Enter a number or write 'infinite'.",
      "\\text{same gradient, same }y\\text{-intercept}",
      "infinite",
      "When both equations represent the same line, every point on the line is a solution — there are infinitely many solutions.",
      ["Infinite", "infinitely many", "infinity"]
    ),
  ],
  commonMistakes: [
    { mistake: "Reading the intersection coordinates in the wrong order (y first, then x).", fix: "An intersection point is always written as (x, y) — x-coordinate first, y-coordinate second." },
    { mistake: "Concluding that parallel lines have the solution (0, 0).", fix: "Parallel lines never intersect. If the gradients are equal and the y-intercepts differ, there is no solution." },
    { mistake: "Not checking the solution in both equations after reading from the graph.", fix: "Always substitute your (x, y) values back into BOTH original equations to confirm the solution." },
    { mistake: "Plotting lines with only one point.", fix: "You need at least two points to draw a straight line accurately. Use x = 0 and y = 0 as easy test values." },
  ],
  masteryQuiz: [
    answer(
      "sim-gra-m1",
      "The lines y = x - 1 and y = -2x + 5 intersect. What is the x-coordinate of the intersection?",
      "y=x-1\\text{ and }y=-2x+5",
      "2",
      "x - 1 = -2x + 5 gives 3x = 6, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-gra-m2",
      "For y = x - 1 and y = -2x + 5, using x = 2, what is the y-coordinate?",
      "y=x-1,\\quad x=2",
      "1",
      "y = 2 - 1 = 1. Solution is (2, 1). Check: -2(2)+5=1.",
      ["1"]
    ),
    choice(
      "sim-gra-m3",
      "Which of the following correctly describes a system of equations with no solution?",
      "A",
      [
        "The lines are parallel (same gradient, different y-intercepts).",
        "The lines cross at the origin (0, 0).",
        "The lines are the same (same gradient, same y-intercept).",
        "The lines cross at a negative x-value.",
      ],
      "Parallel lines have the same gradient and different y-intercepts, so they never intersect — no solution."
    ),
    answer(
      "sim-gra-m4",
      "A graph shows two lines crossing at (-1, 3). What is the x-coordinate of the solution?",
      "\\text{Intersection at }(-1,3)",
      "-1",
      "The intersection point is (-1, 3), so x = -1.",
      ["-1"]
    ),
    answer(
      "sim-gra-m5",
      "A graph shows two lines crossing at (-1, 3). What is the y-coordinate of the solution?",
      "\\text{Intersection at }(-1,3)",
      "3",
      "The intersection point is (-1, 3), so y = 3.",
      ["3"]
    ),
    choice(
      "sim-gra-m6",
      "The lines y = 4x - 2 and y = 4x - 2 are graphed. How many solutions does the system have?",
      "C",
      ["No solution", "Exactly one solution", "Infinitely many solutions", "Exactly two solutions"],
      "Both equations are identical — they represent the same line. Every point on the line is a solution, giving infinitely many solutions.",
      "y=4x-2\\text{ and }y=4x-2"
    ),
    answer(
      "sim-gra-m7",
      "The lines y = 5 - x and y = 2x - 1 are drawn. What is the x-coordinate of their intersection?",
      "y=5-x\\text{ and }y=2x-1",
      "2",
      "5 - x = 2x - 1 gives 6 = 3x, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-gra-m8",
      "For y = 5 - x and y = 2x - 1, using x = 2, what is the y-coordinate?",
      "y=5-x,\\quad x=2",
      "3",
      "y = 5 - 2 = 3. Check: 2(2)-1=3.",
      ["3"]
    ),
    choice(
      "sim-gra-m9",
      "Which point is the solution to the system y = 3x - 4 and y = -x + 4?",
      "B",
      ["(1, -1)", "(2, 2)", "(3, 5)", "(0, 4)"],
      "Test (2, 2): y = 3(2)-4 = 2 and y = -2+4 = 2. Both equations are satisfied.",
      "y=3x-4\\text{ and }y=-x+4"
    ),
    answer(
      "sim-gra-m10",
      "The lines y = x + 3 and y = -x + 7 intersect. What is the y-coordinate at the intersection?",
      "y=x+3\\text{ and }y=-x+7",
      "5",
      "x + 3 = -x + 7 gives 2x = 4, so x = 2. Then y = 2 + 3 = 5. Check: -2+7=5.",
      ["5"]
    ),
  ],
};

// ─── Lesson 2: Substitution Method ───────────────────────────────────────────

const simultaneousEquationsSubstitution: LessonContent = {
  description: "Solve simultaneous linear equations using the substitution method — isolate one variable, substitute into the second equation, and back-substitute to find both unknowns.",
  learningIntention: "Solve simultaneous linear equations algebraically using the substitution method.",
  successCriteria: [
    "Identify which variable to isolate and express it in terms of the other variable.",
    "Substitute the expression into the second equation to form a one-variable equation.",
    "Solve for the first variable, then back-substitute to find the second variable.",
    "Check the solution by substituting both values into both original equations.",
  ],
  teaching: {
    paragraphs: [
      "The substitution method works when one variable is already isolated (or easy to isolate) in one of the equations. Express that variable in terms of the other and substitute the entire expression into the second equation in place of that variable.",
      "After substituting, the result is a single-variable equation — solve it in the usual way. Then substitute the value you found back into either original equation to find the value of the second variable.",
      "Always check your solution by substituting BOTH values into BOTH original equations. If either equation is not satisfied, go back and look for an arithmetic error.",
      "Common mistake: after finding the first variable, substituting its value back into the equation you already used for substitution — this always gives a true statement and does not help. To find the second variable, use a different equation from the one you substituted into.",
    ],
    latexBlocks: [
      "\\text{Step 1: isolate one variable, e.g. }y=2x+3",
      "\\text{Step 2: substitute into other equation}",
      "\\text{Step 3: solve, then back-substitute}",
    ],
  },
  workedExamples: [
    {
      title: "Substitute an already-isolated variable",
      questionLatex: "\\text{Solve }y=3x-1\\text{ and }2x+y=9.",
      steps: [
        {
          explanation: "The first equation already has y isolated: y = 3x - 1. Substitute this expression for y into the second equation.",
          latex: "2x+(3x-1)=9",
        },
        {
          explanation: "Collect like terms and solve for x.",
          latex: "5x-1=9\\Rightarrow 5x=10\\Rightarrow x=2",
        },
        {
          explanation: "Back-substitute x = 2 into y = 3x - 1 to find y.",
          latex: "y=3(2)-1=5",
        },
        {
          explanation: "Check in the second equation: 2(2) + 5 = 9.",
          latex: "2(2)+5=9\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=2,\\quad y=5",
    } as WorkedExample,
    {
      title: "Isolate a variable first, then substitute",
      questionLatex: "\\text{Solve }x+2y=7\\text{ and }3x-y=7.",
      steps: [
        {
          explanation: "Isolate x from the first equation.",
          latex: "x=7-2y",
        },
        {
          explanation: "Substitute x = 7 - 2y into 3x - y = 7.",
          latex: "3(7-2y)-y=7\\Rightarrow 21-6y-y=7\\Rightarrow 21-7y=7",
        },
        {
          explanation: "Solve for y.",
          latex: "-7y=7-21=-14\\Rightarrow y=2",
        },
        {
          explanation: "Back-substitute y = 2 into x = 7 - 2y.",
          latex: "x=7-2(2)=3",
        },
        {
          explanation: "Check in 3x - y = 7: 3(3) - 2 = 7.",
          latex: "3(3)-2=7\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=3,\\quad y=2",
    } as WorkedExample,
    {
      title: "Use a given expression for x",
      questionLatex: "\\text{Solve }2x+3y=12\\text{ and }x=y+1.",
      steps: [
        {
          explanation: "The second equation gives x = y + 1. Substitute into the first equation.",
          latex: "2(y+1)+3y=12\\Rightarrow 2y+2+3y=12\\Rightarrow 5y=10\\Rightarrow y=2",
        },
        {
          explanation: "Back-substitute y = 2 into x = y + 1.",
          latex: "x=2+1=3",
        },
        {
          explanation: "Check in 2x + 3y = 12: 2(3) + 3(2) = 6 + 6 = 12.",
          latex: "2(3)+3(2)=12\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=3,\\quad y=2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "sim-sub-g1",
      "In the system y = 4x + 1 and 2x + y = 13, which substitution starts the solution correctly?",
      "A",
      [
        "Replace y in 2x + y = 13 with (4x + 1)",
        "Replace x in y = 4x + 1 with 13",
        "Add the two equations together",
        "Subtract the two equations",
      ],
      "Since y = 4x + 1 isolates y, substitute (4x + 1) for y in the second equation: 2x + (4x + 1) = 13.",
      "y=4x+1\\text{ and }2x+y=13"
    ),
    answer(
      "sim-sub-g2",
      "Solve y = 2x and x + y = 9. What is the value of x?",
      "y=2x\\text{ and }x+y=9",
      "3",
      "Substitute y = 2x: x + 2x = 9 gives 3x = 9, so x = 3.",
      ["3"]
    ),
    answer(
      "sim-sub-g3",
      "For y = 2x and x + y = 9, using x = 3, what is the value of y?",
      "y=2x,\\quad x=3",
      "6",
      "y = 2(3) = 6. Check: 3 + 6 = 9.",
      ["6"]
    ),
    answer(
      "sim-sub-g4",
      "Solve y = x + 3 and 2x + y = 12. What is the value of x?",
      "y=x+3\\text{ and }2x+y=12",
      "3",
      "Substitute: 2x + (x+3) = 12 gives 3x + 3 = 12, so 3x = 9 and x = 3.",
      ["3"]
    ),
  ],
  independentPractice: [
    answer(
      "sim-sub-i1",
      "Solve y = x + 3 and 2x + y = 12. What is the value of y?",
      "y=x+3,\\quad x=3",
      "6",
      "y = 3 + 3 = 6. Check: 2(3) + 6 = 12.",
      ["6"]
    ),
    answer(
      "sim-sub-i2",
      "Solve y = 5 - x and 3x + y = 11. What is the value of x?",
      "y=5-x\\text{ and }3x+y=11",
      "3",
      "3x + (5-x) = 11 gives 2x + 5 = 11, so 2x = 6 and x = 3.",
      ["3"]
    ),
    answer(
      "sim-sub-i3",
      "For y = 5 - x and 3x + y = 11, using x = 3, what is y?",
      "y=5-x,\\quad x=3",
      "2",
      "y = 5 - 3 = 2. Check: 3(3) + 2 = 11.",
      ["2"]
    ),
    answer(
      "sim-sub-i4",
      "Solve x = 2y - 1 and x + 3y = 14. What is the value of y?",
      "x=2y-1\\text{ and }x+3y=14",
      "3",
      "Substitute: (2y-1) + 3y = 14 gives 5y - 1 = 14, so 5y = 15 and y = 3.",
      ["3"]
    ),
    choice(
      "sim-sub-i5",
      "A student solves y = 3x - 1 and x + y = 7 and gets x = 2, y = 5. Which check confirms this is correct?",
      "C",
      [
        "2 + 3 = 5",
        "y = 3(2) gives 6, not 5",
        "y = 3(2) - 1 = 5 and 2 + 5 = 7",
        "Only the first equation needs to be checked",
      ],
      "The solution must satisfy BOTH equations: y = 3(2)-1 = 5 and x + y = 2 + 5 = 7.",
      "y=3x-1\\text{ and }x+y=7"
    ),
  ],
  commonMistakes: [
    { mistake: "Substituting back into the same equation that was used for the substitution.", fix: "After finding the first variable, substitute into the OTHER original equation to find the second variable." },
    { mistake: "Only checking the solution in one equation.", fix: "A solution must satisfy BOTH equations. Check in each original equation separately." },
    { mistake: "Forgetting to substitute the full expression (including its sign) when the variable has a negative coefficient.", fix: "Use brackets when substituting: if y = 2x - 3, write (2x - 3) in place of y to avoid sign errors." },
    { mistake: "Not isolating a single variable before substituting.", fix: "The substitution method requires one equation to express y (or x) alone. Rearrange first if needed." },
  ],
  masteryQuiz: [
    answer(
      "sim-sub-m1",
      "Solve y = 2x + 1 and x + y = 7. What is x?",
      "y=2x+1\\text{ and }x+y=7",
      "2",
      "x + (2x+1) = 7 gives 3x = 6, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-sub-m2",
      "Solve y = 2x + 1 and x + y = 7. What is y?",
      "y=2x+1,\\quad x=2",
      "5",
      "y = 2(2)+1 = 5. Check: 2+5=7.",
      ["5"]
    ),
    answer(
      "sim-sub-m3",
      "Solve y = 4 - x and 2x + 3y = 10. What is x?",
      "y=4-x\\text{ and }2x+3y=10",
      "2",
      "2x + 3(4-x) = 10 gives 2x + 12 - 3x = 10, so -x = -2 and x = 2.",
      ["2"]
    ),
    answer(
      "sim-sub-m4",
      "Solve y = 4 - x and 2x + 3y = 10. What is y?",
      "y=4-x,\\quad x=2",
      "2",
      "y = 4 - 2 = 2. Check: 2(2)+3(2) = 4+6 = 10.",
      ["2"]
    ),
    choice(
      "sim-sub-m5",
      "Solve y = 3x + 2 and 2x - y = -4. What is the solution?",
      "B",
      ["x = 0, y = 2", "x = 2, y = 8", "x = -2, y = -4", "x = 1, y = 5"],
      "2x - (3x+2) = -4 gives -x - 2 = -4, so x = 2. Then y = 3(2)+2 = 8. Check: 2(2)-8=-4.",
      "y=3x+2\\text{ and }2x-y=-4"
    ),
    answer(
      "sim-sub-m6",
      "Solve x = 2y + 1 and 2x + y = 17. What is y?",
      "x=2y+1\\text{ and }2x+y=17",
      "3",
      "2(2y+1) + y = 17 gives 4y+2+y = 17, so 5y = 15 and y = 3.",
      ["3"]
    ),
    answer(
      "sim-sub-m7",
      "Solve x = 2y + 1 and 2x + y = 17. What is x?",
      "x=2y+1,\\quad y=3",
      "7",
      "x = 2(3)+1 = 7. Check: 2(7)+3=17.",
      ["7"]
    ),
    choice(
      "sim-sub-m8",
      "In solving a simultaneous system by substitution, why should you check your answer in BOTH original equations?",
      "A",
      [
        "Because the substitution step only uses one equation, so the other must be verified separately.",
        "Because the two equations are always the same.",
        "Because the back-substitution step automatically checks both equations.",
        "Because one equation is always incorrect.",
      ],
      "Substitution uses one equation to eliminate a variable. Only checking in that equation is circular — you must verify the solution in the OTHER original equation too."
    ),
    answer(
      "sim-sub-m9",
      "Solve y = 2 - 3x and x + 2y = 4. What is x?",
      "y=2-3x\\text{ and }x+2y=4",
      "0",
      "x + 2(2-3x) = 4 gives x + 4 - 6x = 4, so -5x = 0 and x = 0.",
      ["0"]
    ),
    answer(
      "sim-sub-m10",
      "Solve y = 2 - 3x and x + 2y = 4. What is y?",
      "y=2-3x,\\quad x=0",
      "2",
      "y = 2 - 3(0) = 2. Check: 0 + 2(2) = 4.",
      ["2"]
    ),
  ],
};

// ─── Lesson 3: Elimination Method ────────────────────────────────────────────

const simultaneousEquationsElimination: LessonContent = {
  description: "Solve simultaneous linear equations by adding or subtracting the equations to eliminate one variable, multiplying by a constant first if needed to match coefficients.",
  learningIntention: "Solve simultaneous linear equations algebraically using the elimination method.",
  successCriteria: [
    "Identify which variable to eliminate by comparing coefficients in both equations.",
    "Multiply one or both equations by a constant to create equal coefficients if needed.",
    "Add or subtract the equations to eliminate one variable and solve for the other.",
    "Substitute back to find the second variable, then check the solution in both equations.",
  ],
  teaching: {
    paragraphs: [
      "The elimination method adds or subtracts the two equations to cancel one variable entirely. If the same variable has the same coefficient in both equations, you can add or subtract directly: subtract when the signs are the same, add when the signs are opposite.",
      "If the coefficients do not match, multiply one or both equations by a constant to create matching coefficients before eliminating. Choose the variable that is easier to match — often the one with smaller coefficients.",
      "After eliminating one variable, you are left with a single-variable equation. Solve it, then substitute the value back into either original equation to find the other variable.",
      "Choose between substitution and elimination based on the form of the equations. Substitution is best when a variable is already isolated; elimination is most efficient when coefficients are easy to match by multiplying by a small integer.",
    ],
    latexBlocks: [
      "\\text{if }y\\text{ coefficients match: add or subtract}",
      "\\text{multiply equation by constant to match coefficients}",
      "\\text{always check in BOTH original equations}",
    ],
  },
  workedExamples: [
    {
      title: "Eliminate by direct subtraction",
      questionLatex: "\\text{Solve }x+2y=8\\text{ and }x-y=2.",
      steps: [
        {
          explanation: "Both equations have an x term with coefficient 1. Subtract the second equation from the first to eliminate x.",
          latex: "(x+2y)-(x-y)=8-2\\Rightarrow 3y=6\\Rightarrow y=2",
        },
        {
          explanation: "Substitute y = 2 into the second equation x - y = 2.",
          latex: "x-2=2\\Rightarrow x=4",
        },
        {
          explanation: "Check in both equations: 4 + 2(2) = 8 and 4 - 2 = 2.",
          latex: "4+4=8\\;\\checkmark,\\quad 4-2=2\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=4,\\quad y=2",
    } as WorkedExample,
    {
      title: "Eliminate by direct addition (opposite signs)",
      questionLatex: "\\text{Solve }2x+3y=7\\text{ and }4x-3y=5.",
      steps: [
        {
          explanation: "The y coefficients are +3 and -3 (opposite signs). Add the equations to eliminate y.",
          latex: "(2x+3y)+(4x-3y)=7+5\\Rightarrow 6x=12\\Rightarrow x=2",
        },
        {
          explanation: "Substitute x = 2 into 2x + 3y = 7.",
          latex: "4+3y=7\\Rightarrow 3y=3\\Rightarrow y=1",
        },
        {
          explanation: "Check in 4x - 3y = 5: 4(2) - 3(1) = 8 - 3 = 5.",
          latex: "4(2)-3(1)=5\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=2,\\quad y=1",
    } as WorkedExample,
    {
      title: "Multiply to match coefficients, then eliminate",
      questionLatex: "\\text{Solve }3x+2y=13\\text{ and }2x+3y=12.",
      steps: [
        {
          explanation: "To eliminate y, multiply the first equation by 3 and the second by 2 so both have 6y.",
          latex: "3(3x+2y)=3(13)\\Rightarrow 9x+6y=39",
        },
        {
          explanation: "Multiply the second equation by 2.",
          latex: "2(2x+3y)=2(12)\\Rightarrow 4x+6y=24",
        },
        {
          explanation: "Subtract the second scaled equation from the first to eliminate y.",
          latex: "(9x+6y)-(4x+6y)=39-24\\Rightarrow 5x=15\\Rightarrow x=3",
        },
        {
          explanation: "Substitute x = 3 into 3x + 2y = 13.",
          latex: "9+2y=13\\Rightarrow 2y=4\\Rightarrow y=2",
        },
        {
          explanation: "Check in 2x + 3y = 12: 2(3) + 3(2) = 6 + 6 = 12.",
          latex: "2(3)+3(2)=12\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x=3,\\quad y=2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "sim-eli-g1",
      "To solve 3x + y = 10 and x + y = 4 by elimination, what operation should you perform?",
      "B",
      [
        "Add the two equations to eliminate x.",
        "Subtract the second equation from the first to eliminate y.",
        "Multiply the first equation by 3.",
        "Subtract the first equation from the second to eliminate x.",
      ],
      "Both equations have y with coefficient 1 (same sign), so subtracting eliminates y: (3x+y)-(x+y) = 10-4 gives 2x = 6.",
      "3x+y=10\\text{ and }x+y=4"
    ),
    answer(
      "sim-eli-g2",
      "Solve 3x + y = 10 and x + y = 4 by elimination. What is x?",
      "3x+y=10\\text{ and }x+y=4",
      "3",
      "Subtract: (3x+y)-(x+y) = 10-4 gives 2x = 6, so x = 3.",
      ["3"]
    ),
    answer(
      "sim-eli-g3",
      "For 3x + y = 10 and x + y = 4, using x = 3, what is y?",
      "x+y=4,\\quad x=3",
      "1",
      "3 + y = 4 gives y = 1. Check: 3(3)+1=10.",
      ["1"]
    ),
    answer(
      "sim-eli-g4",
      "Solve x + 2y = 8 and x - y = 2 by elimination. What is y?",
      "x+2y=8\\text{ and }x-y=2",
      "2",
      "Subtract 2nd from 1st: (x+2y)-(x-y) = 8-2 gives 3y = 6, so y = 2.",
      ["2"]
    ),
  ],
  independentPractice: [
    answer(
      "sim-eli-i1",
      "Solve x + 2y = 8 and x - y = 2 by elimination. What is x?",
      "x-y=2,\\quad y=2",
      "4",
      "x - 2 = 2 gives x = 4. Check: 4+2(2)=8.",
      ["4"]
    ),
    answer(
      "sim-eli-i2",
      "Solve 5x + 2y = 16 and 3x + 2y = 12 by elimination. What is x?",
      "5x+2y=16\\text{ and }3x+2y=12",
      "2",
      "Subtract: (5x+2y)-(3x+2y) = 16-12 gives 2x = 4, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-eli-i3",
      "For 5x + 2y = 16 and 3x + 2y = 12, using x = 2, what is y?",
      "3x+2y=12,\\quad x=2",
      "3",
      "3(2)+2y=12 gives 6+2y=12, so 2y=6 and y=3. Check: 5(2)+2(3)=16.",
      ["3"]
    ),
    answer(
      "sim-eli-i4",
      "Solve 4x + y = 11 and 2x - y = 1 by elimination. What is x?",
      "4x+y=11\\text{ and }2x-y=1",
      "2",
      "Add (opposite signs on y): (4x+y)+(2x-y) = 11+1 gives 6x = 12, so x = 2.",
      ["2"]
    ),
    choice(
      "sim-eli-i5",
      "Solve 3x + 4y = 18 and x + 2y = 8. Which first step correctly sets up elimination of x?",
      "A",
      [
        "Multiply the second equation by 3 to get 3x + 6y = 24, then subtract from the first.",
        "Add the two equations directly.",
        "Multiply the first equation by 2 and add.",
        "Subtract the first equation from the second.",
      ],
      "Multiply equation 2 by 3: 3x+6y=24. Subtract from 3x+4y=18: -2y=-6 gives y=3. Then x=8-2(3)=2.",
      "3x+4y=18\\text{ and }x+2y=8"
    ),
  ],
  commonMistakes: [
    { mistake: "Adding equations when you should subtract (or vice versa) — choosing the wrong operation to eliminate a variable.", fix: "Subtract when the coefficients of the variable have the SAME sign; add when they have OPPOSITE signs." },
    { mistake: "Only multiplying part of an equation when scaling to match coefficients.", fix: "When you multiply an equation by a constant, multiply EVERY term on both sides by that constant." },
    { mistake: "Substituting the found value back into the modified (scaled) equation rather than an original equation.", fix: "Always back-substitute into one of the original equations, not the scaled version." },
    { mistake: "Forgetting to check the solution in both equations after finding x and y.", fix: "Substitute both values into BOTH original equations. Both must be satisfied." },
  ],
  masteryQuiz: [
    answer(
      "sim-eli-m1",
      "Solve 2x + 3y = 7 and 4x - 3y = 5 by elimination. What is x?",
      "2x+3y=7\\text{ and }4x-3y=5",
      "2",
      "Add: (2x+3y)+(4x-3y) = 7+5 gives 6x = 12, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-eli-m2",
      "Solve 2x + 3y = 7 and 4x - 3y = 5. What is y?",
      "2x+3y=7,\\quad x=2",
      "1",
      "2(2)+3y=7 gives 4+3y=7, so 3y=3 and y=1. Check: 4(2)-3(1)=5.",
      ["1"]
    ),
    answer(
      "sim-eli-m3",
      "Solve 3x + 2y = 13 and 2x + 3y = 12 by elimination. What is x?",
      "3x+2y=13\\text{ and }2x+3y=12",
      "3",
      "Multiply eq1 by 3: 9x+6y=39. Multiply eq2 by 2: 4x+6y=24. Subtract: 5x=15, so x=3.",
      ["3"]
    ),
    answer(
      "sim-eli-m4",
      "Solve 3x + 2y = 13 and 2x + 3y = 12. What is y?",
      "3x+2y=13,\\quad x=3",
      "2",
      "3(3)+2y=13 gives 9+2y=13, so 2y=4 and y=2. Check: 2(3)+3(2)=12.",
      ["2"]
    ),
    choice(
      "sim-eli-m5",
      "To solve 2x + y = 9 and 2x - 3y = 1, what operation eliminates x?",
      "B",
      [
        "Add the two equations.",
        "Subtract the second from the first.",
        "Multiply the first equation by 3.",
        "Multiply the second equation by 2.",
      ],
      "Both equations have 2x (same sign), so subtract: (2x+y)-(2x-3y) = 9-1 gives 4y=8, so y=2.",
      "2x+y=9\\text{ and }2x-3y=1"
    ),
    answer(
      "sim-eli-m6",
      "Solve 2x + y = 9 and 2x - 3y = 1. What is y?",
      "2x+y=9\\text{ and }2x-3y=1",
      "2",
      "Subtract: (2x+y)-(2x-3y) = 9-1 gives 4y=8, so y=2.",
      ["2"]
    ),
    answer(
      "sim-eli-m7",
      "Solve 5x + y = 13 and 3x - y = 3 by elimination. What is x?",
      "5x+y=13\\text{ and }3x-y=3",
      "2",
      "Add (opposite signs on y): (5x+y)+(3x-y) = 13+3 gives 8x = 16, so x = 2.",
      ["2"]
    ),
    answer(
      "sim-eli-m8",
      "Solve x + 4y = 14 and x - 2y = 2 by elimination. What is y?",
      "x+4y=14\\text{ and }x-2y=2",
      "2",
      "Subtract: (x+4y)-(x-2y) = 14-2 gives 6y=12, so y=2.",
      ["2"]
    ),
    answer(
      "sim-eli-m9",
      "Solve x + 4y = 14 and x - 2y = 2. What is x?",
      "x-2y=2,\\quad y=2",
      "6",
      "x - 2(2) = 2 gives x = 6. Check: 6+4(2)=14.",
      ["6"]
    ),
    choice(
      "sim-eli-m10",
      "A student multiplies 2x + y = 7 by 3 and gets 6x + y = 21. What error did they make?",
      "B",
      [
        "They chose the wrong equation to multiply.",
        "They forgot to multiply the y term — the result should be 6x + 3y = 21.",
        "They should have divided, not multiplied.",
        "They should have multiplied the right-hand side by a different number.",
      ],
      "Every term must be multiplied by 3: 3(2x) = 6x, 3(y) = 3y, 3(7) = 21. The y term was not multiplied.",
      "3\\times(2x+y=7)"
    ),
  ],
};

// ─── Registry & Override ──────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "simultaneous-equations-graphical": simultaneousEquationsGraphical,
  "simultaneous-equations-substitution": simultaneousEquationsSubstitution,
  "simultaneous-equations-elimination": simultaneousEquationsElimination,
};

export function year9SimultaneousEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced"].includes(course.slug) ||
    unit.slug !== "simultaneous-equations"
  ) {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
