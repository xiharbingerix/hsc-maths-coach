import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formulaAnswer, practicalChoice } from "../questionHelpers";

function intAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const intVal = Number(answer);
  const intVariant = Number.isInteger(intVal) && !Number.isNaN(intVal) ? [`${answer}.0`] : [];
  const question = formulaAnswer(id, prompt, latex, answer, [...intVariant, ...acceptedAnswers]);
  return { ...question, explanation };
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return practicalChoice(id, prompt, answer, choices, explanation, latex);
}

const base = {
  syllabusArea: "Combinatorics",
  masteryPassMark: 0.8,
};

function lessonBase(
  lesson: CourseLessonSeed,
  description: string,
  focus: string
): Partial<ExplicitLesson> {
  return {
    ...base,
    description,
    focus,
    status: "active",
  };
}

const pascalExamples: WorkedExample[] = [
  {
    title: "Write a row of Pascal's triangle",
    questionLatex: "\\text{Write row }5\\text{ of Pascal's triangle, starting with row }0.",
    steps: [
      { explanation: "Rows start with row 0 as 1.", latex: "\\text{row }0:1" },
      { explanation: "Row 5 is the coefficient row for a fifth power.", latex: "1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1" },
    ],
    finalAnswerLatex: "1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1",
  },
  {
    title: "Use a row to expand a small power",
    questionLatex: "(x+1)^4",
    steps: [
      { explanation: "Use row 4 of Pascal's triangle.", latex: "1,\\ 4,\\ 6,\\ 4,\\ 1" },
      { explanation: "Attach descending powers of x.", latex: "x^4+4x^3+6x^2+4x+1" },
    ],
    finalAnswerLatex: "x^4+4x^3+6x^2+4x+1",
  },
  {
    title: "Use symmetry",
    questionLatex: "\\text{Row }6:\\quad 1,\\ 6,\\ 15,\\ 20,\\ \\square,\\ 6,\\ 1",
    steps: [
      { explanation: "Pascal rows are symmetric.", latex: "1,6,15,20,15,6,1" },
      { explanation: "The missing value mirrors the earlier 15.", latex: "\\square=15" },
    ],
    finalAnswerLatex: "15",
  },
  {
    title: "Use the row sum",
    questionLatex: "\\text{Find the sum of the entries in row }7.",
    steps: [
      { explanation: "The sum of row n is two to the power n.", latex: "2^n" },
      { explanation: "For row 7, calculate the row sum.", latex: "2^7=128" },
    ],
    finalAnswerLatex: "128",
  },
];

const theoremExamples: WorkedExample[] = [
  {
    title: "Expand with binomial coefficients",
    questionLatex: "(x+2)^4",
    steps: [
      { explanation: "Use row 4 coefficients.", latex: "1,\\ 4,\\ 6,\\ 4,\\ 1" },
      { explanation: "Apply descending powers of x and ascending powers of 2.", latex: "x^4+4x^3(2)+6x^2(2^2)+4x(2^3)+2^4" },
      { explanation: "Simplify the coefficients.", latex: "x^4+8x^3+24x^2+32x+16" },
    ],
    finalAnswerLatex: "x^4+8x^3+24x^2+32x+16",
  },
  {
    title: "Handle alternating signs",
    questionLatex: "(1-x)^5",
    steps: [
      { explanation: "Use row 5 coefficients.", latex: "1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1" },
      { explanation: "Powers of negative x alternate signs.", latex: "1-5x+10x^2-10x^3+5x^4-x^5" },
    ],
    finalAnswerLatex: "1-5x+10x^2-10x^3+5x^4-x^5",
  },
  {
    title: "Find one coefficient",
    questionLatex: "\\text{Find the coefficient of }x^3\\text{ in }(x+2)^5.",
    steps: [
      { explanation: "The x cubed term occurs when the power of 2 is 2.", latex: "\\binom{5}{2}x^3(2^2)" },
      { explanation: "Evaluate the coefficient.", latex: "\\binom{5}{2}2^2=10\\times4=40" },
    ],
    finalAnswerLatex: "40",
  },
  {
    title: "Choose a binomial coefficient",
    questionLatex: "\\text{In }(a+b)^8,\\text{ which coefficient belongs with }a^5b^3?",
    steps: [
      { explanation: "The exponent of b is 3, so choose r equals 3.", latex: "\\binom{8}{3}" },
      { explanation: "By symmetry, this is also equal to the coefficient for a cubed b to the fifth.", latex: "\\binom{8}{3}=\\binom{8}{5}" },
    ],
    finalAnswerLatex: "\\binom{8}{3}",
  },
];

const generalExamples: WorkedExample[] = [
  {
    title: "Write a general term",
    questionLatex: "(x+3)^5",
    steps: [
      { explanation: "Use the general term convention.", latex: "T_{r+1}=\\binom{n}{r}a^{n-r}b^r" },
      { explanation: "Here, a is x, b is 3, and n is 5.", latex: "T_{r+1}=\\binom{5}{r}x^{5-r}3^r" },
    ],
    finalAnswerLatex: "T_{r+1}=\\binom{5}{r}x^{5-r}3^r",
  },
  {
    title: "Coefficient of a power",
    questionLatex: "\\text{Find the coefficient of }x^3\\text{ in }(x+2)^5.",
    steps: [
      { explanation: "The power of x is five minus r.", latex: "5-r=3" },
      { explanation: "So r equals 2.", latex: "r=2" },
      { explanation: "Use the term with r equals 2.", latex: "\\binom{5}{2}x^3(2^2)=40x^3" },
    ],
    finalAnswerLatex: "40",
  },
  {
    title: "Find a constant term",
    questionLatex: "\\text{Find the constant term in }\\left(x+\\frac{2}{x}\\right)^4.",
    steps: [
      { explanation: "The general term has x to the power four minus r, and x to the power negative r.", latex: "x^{4-r}x^{-r}=x^{4-2r}" },
      { explanation: "A constant term has power zero.", latex: "4-2r=0" },
      { explanation: "So r equals 2, then calculate the coefficient.", latex: "\\binom{4}{2}2^2=24" },
    ],
    finalAnswerLatex: "24",
  },
  {
    title: "Choose r for a target power",
    questionLatex: "\\text{In }(x+4)^7,\\text{ which r-value gives the }x^2\\text{ term?}",
    steps: [
      { explanation: "The power of x is seven minus r.", latex: "7-r=2" },
      { explanation: "Solve for r.", latex: "r=5" },
    ],
    finalAnswerLatex: "5",
  },
];

const identityExamples: WorkedExample[] = [
  {
    title: "Sum of coefficients",
    questionLatex: "\\text{Find the sum of coefficients in }(2x+1)^5.",
    steps: [
      { explanation: "Set x equal to 1.", latex: "(2(1)+1)^5" },
      { explanation: "Evaluate.", latex: "3^5=243" },
    ],
    finalAnswerLatex: "243",
  },
  {
    title: "Alternating sum of coefficients",
    questionLatex: "\\text{Find the alternating sum of coefficients in }(x+3)^4.",
    steps: [
      { explanation: "Set x equal to negative 1.", latex: "(-1+3)^4" },
      { explanation: "Evaluate.", latex: "2^4=16" },
    ],
    finalAnswerLatex: "16",
  },
  {
    title: "Use coefficient symmetry",
    questionLatex: "\\binom{9}{2}",
    steps: [
      { explanation: "Use symmetry of binomial coefficients.", latex: "\\binom{n}{r}=\\binom{n}{n-r}" },
      { explanation: "Replace r with n minus r.", latex: "\\binom{9}{2}=\\binom{9}{7}" },
    ],
    finalAnswerLatex: "\\binom{9}{7}",
  },
  {
    title: "Use Pascal's identity",
    questionLatex: "\\binom{6}{2}+\\binom{6}{3}",
    steps: [
      { explanation: "Pascal's identity combines adjacent entries.", latex: "\\binom{n}{r}+\\binom{n}{r+1}=\\binom{n+1}{r+1}" },
      { explanation: "Apply the identity.", latex: "\\binom{6}{2}+\\binom{6}{3}=\\binom{7}{3}" },
      { explanation: "Evaluate if needed.", latex: "\\binom{7}{3}=35" },
    ],
    finalAnswerLatex: "35",
  },
];

const examExamples: WorkedExample[] = [
  {
    title: "Coefficient from an expansion",
    questionLatex: "\\text{Find the coefficient of }x^2\\text{ in }(x+3)^5.",
    steps: [
      { explanation: "The x squared term occurs when r equals 3.", latex: "5-r=2" },
      { explanation: "Use the matching term.", latex: "\\binom{5}{3}x^2(3^3)" },
      { explanation: "Evaluate the coefficient.", latex: "10\\times27=270" },
    ],
    finalAnswerLatex: "270",
  },
  {
    title: "Signed term",
    questionLatex: "\\text{Find the }x^3\\text{ term in }(2-x)^5.",
    steps: [
      { explanation: "The x cubed term uses r equals 3.", latex: "\\binom{5}{3}2^2(-x)^3" },
      { explanation: "The odd power of negative x gives a negative sign.", latex: "-40x^3" },
    ],
    finalAnswerLatex: "-40x^3",
  },
  {
    title: "Identity from substitution",
    questionLatex: "\\text{Find the sum of coefficients in }(3x-2)^4.",
    steps: [
      { explanation: "Set x equal to 1.", latex: "(3(1)-2)^4" },
      { explanation: "Evaluate.", latex: "1^4=1" },
    ],
    finalAnswerLatex: "1",
  },
  {
    title: "Constant term",
    questionLatex: "\\text{Find the constant term in }\\left(x^2+\\frac{1}{x}\\right)^6.",
    steps: [
      { explanation: "The power of x in the general term is from x squared and x inverse.", latex: "x^{2(6-r)}x^{-r}=x^{12-3r}" },
      { explanation: "Set the exponent to zero.", latex: "12-3r=0" },
      { explanation: "So r equals 4, then calculate the coefficient.", latex: "\\binom{6}{4}=15" },
    ],
    finalAnswerLatex: "15",
  },
];

function pascalLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use Pascal's triangle to identify binomial coefficient patterns, row sums, and small expansions.",
      "Pascal's triangle and binomial patterns"
    ),
    learningIntention:
      "Use Pascal's triangle to connect row number, symmetry, row sums, and coefficients in small binomial expansions.",
    successCriteria: [
      "Write rows of Pascal's triangle using row 0 as the starting row.",
      "Match a Pascal row to the coefficients of a binomial power.",
      "Use symmetry to find missing coefficients.",
      "Use row sums to calculate powers of two.",
      "Expand small powers using Pascal's triangle.",
      "Identify coefficient positions without expanding unnecessarily.",
    ],
    teaching: {
      paragraphs: [
        "Pascal's triangle begins with row 0. Row n gives the coefficients in the expansion of a binomial to the power n.",
        "Each new entry is formed by adding the two entries above it. The outside entries in every row are 1.",
        "Rows are symmetric. This means coefficients the same distance from each end are equal.",
        "The sum of the entries in row n is two to the power n. This follows from substituting 1 and 1 into a binomial expansion.",
        "For small powers such as $(x+1)^4$, Pascal's triangle gives the coefficients quickly.",
      ],
      latexBlocks: [
        "\\text{row }0:\\ 1",
        "\\text{row }n\\text{ gives coefficients of }(a+b)^n",
        "\\binom{n}{r}=\\binom{n}{n-r}",
        "\\text{sum of row }n=2^n",
      ],
    },
    workedExamples: pascalExamples,
    guidedPractice: [
      intAnswer("y11ext-bt-pascal-g1", "Find the middle coefficient in row 4 of Pascal's triangle.", "\\text{row }4:\\ 1,\\ 4,\\ \\square,\\ 4,\\ 1", "6",
        "Row 4 of Pascal's triangle is 1, 4, 6, 4, 1. The middle coefficient, formed by adding the two 3s above it in row 3, is 6."),
      intAnswer("y11ext-bt-pascal-g2", "Find the sum of the entries in row 5.", "\\text{row }5\\text{ of Pascal's triangle}", "32",
        "The sum of all entries in row n is 2ⁿ. For row 5: 2⁵ = 32."),
      choice("y11ext-bt-pascal-g3", "Which row gives the coefficients of a sixth power?", "C", ["Row 4", "Row 5", "Row 6", "Row 7"], "Row n gives the coefficients of a binomial to the power n."),
      choice("y11ext-bt-pascal-g4", "Choose the coefficient row for the displayed expansion.", "B", ["$1,3,3,1$", "$1,4,6,4,1$", "$1,5,10,10,5,1$", "$1,6,15,20,15,6,1$"], "A fourth power uses row 4.", "(x+1)^4"),
    ],
    independentPractice: [
      intAnswer("y11ext-bt-pascal-i1", "Find the missing coefficient using symmetry.", "\\text{row }6:\\ 1,\\ 6,\\ 15,\\ 20,\\ \\square,\\ 6,\\ 1", "15",
        "Row 6 is symmetric. The missing entry is the same distance from the right as the earlier 15 is from the left — both are 15."),
      intAnswer("y11ext-bt-pascal-i2", "Find the sum of the entries in row 8.", "\\text{row }8\\text{ of Pascal's triangle}", "256",
        "The sum of all entries in row n is 2ⁿ. For row 8: 2⁸ = 256."),
      choice("y11ext-bt-pascal-i3", "Which expansion has coefficient row 1, 5, 10, 10, 5, 1?", "D", ["$(x+1)^3$", "$(x+1)^4$", "$(x+1)^6$", "$(x+1)^5$"], "The row shown is row 5."),
      intAnswer("y11ext-bt-pascal-i4", "Find the coefficient of the squared term in the displayed expansion.", "(x+1)^4", "6",
        "The coefficients of (x+1)⁴ come from row 4: 1, 4, 6, 4, 1. The x² term is the third coefficient: 6."),
      choice("y11ext-bt-pascal-i5", "Why are the second and second-last entries in a Pascal row equal?", "A", ["The row is symmetric", "The entries are all one", "The row sum is zero", "The powers decrease"], "Pascal rows are symmetric."),
    ],
    commonMistakes: [
      { mistake: "Calling the first row row 1 instead of row 0.", fix: "Use row 0 as the row containing only 1." },
      { mistake: "Using row n plus 1 for a power n expansion.", fix: "The coefficients of $(a+b)^n$ come from row n." },
      { mistake: "Ignoring symmetry when finding a missing coefficient.", fix: "Match entries the same distance from the ends of the row." },
      { mistake: "Adding only part of a row for the row sum.", fix: "The whole row sum is $2^n$." },
    ],
    masteryQuiz: [
      intAnswer("y11ext-bt-pascal-m1", "Find the missing entry in the displayed Pascal row.", "\\text{row }4:\\ 1,\\ 4,\\ \\square,\\ 4,\\ 1", "6",
        "Row 4 is 1, 4, 6, 4, 1. The middle entry is found by adding the two entries above it in row 3 (3+3 = 6), or by symmetry."),
      intAnswer("y11ext-bt-pascal-m2", "Find the sum of the entries in row 6.", "\\text{row }6\\text{ of Pascal's triangle}", "64",
        "The sum of all entries in row n is 2ⁿ. For row 6: 2⁶ = 64."),
      choice("y11ext-bt-pascal-m3", "Which row gives the coefficients of the displayed power?", "C", ["Row 3", "Row 4", "Row 5", "Row 6"], "A fifth power uses row 5.", "(x+1)^5"),
      intAnswer("y11ext-bt-pascal-m4", "Find the coefficient of the cubed term in the displayed expansion.", "(x+1)^5", "10",
        "The coefficients of (x+1)⁵ come from row 5: 1, 5, 10, 10, 5, 1. The x³ term is the fourth coefficient: 10."),
      choice("y11ext-bt-pascal-m5", "Choose the coefficient row for the displayed expansion.", "A", ["$1,6,15,20,15,6,1$", "$1,5,10,10,5,1$", "$1,7,21,35,35,21,7,1$", "$1,4,6,4,1$"], "A sixth power uses row 6.", "(x+1)^6"),
      choice("y11ext-bt-pascal-m6", "Which statement correctly describes the row sum?", "D", ["It is always n", "It is always n squared", "It is always zero", "It is $2^n$ for row n"], "The sum of row n is $2^n$."),
      choice("y11ext-bt-pascal-m7", "A student uses row 6 for a fifth power. What is the issue?", "B", ["The row is too short", "The row number is one too high", "The coefficients must all be negative", "The row sum must be one"], "A fifth power uses row 5 when rows start at row 0."),
      choice("y11ext-bt-pascal-m8", "Which property explains why the missing value mirrors the earlier value?", "C", ["Alternating signs", "Constant term", "Symmetry", "Differentiation"], "Pascal rows are symmetric.", "\\text{row }7:\\ 1,\\ 7,\\ 21,\\ 35,\\ \\square,\\ 21,\\ 7,\\ 1"),
      intAnswer("y11ext-bt-pascal-m9", "Find the missing value in row 7 using symmetry.", "\\text{row }7:\\ 1,\\ 7,\\ 21,\\ 35,\\ \\square,\\ 21,\\ 7,\\ 1", "35",
        "Row 7 is symmetric. The missing entry is the same distance from the right as the earlier 35 is from the left — both are 35."),
      intAnswer("y11ext-bt-pascal-m10", "The entries in a Pascal row sum to 512. Find the row number.", "\\text{row sum}=512", "9",
        "The sum of row n is 2ⁿ. Setting 2ⁿ = 512: since 2⁹ = 512, the row number is 9."),
    ],
  };
}

function theoremLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use binomial coefficients to expand powers, track signs, and find selected coefficients.",
      "The binomial theorem"
    ),
    learningIntention:
      "Apply the binomial theorem to expand binomials and find coefficients without expanding every term.",
    successCriteria: [
      "Use binomial coefficient notation in expansions.",
      "Expand simple powers of $(a+b)^n$ using coefficient patterns.",
      "Track alternating signs in powers of $(a-b)^n$.",
      "Find a selected coefficient without writing every term.",
      "Choose the correct binomial coefficient for a target term.",
      "Connect binomial coefficients with combinations.",
    ],
    teaching: {
      paragraphs: [
        "The binomial theorem expands powers of a two-term expression using binomial coefficients.",
        "In $(a+b)^n$, powers of a decrease while powers of b increase. The coefficients are combinations.",
        "The coefficient of $a^{n-r}b^r$ is $\\binom{n}{r}$.",
        "For $(a-b)^n$, the signs alternate because powers of the negative term alternate.",
        "Often a question only asks for one coefficient. In that case, choose the term that matches the required power instead of expanding everything.",
      ],
      latexBlocks: [
        "(a+b)^n=\\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r",
        "\\binom{n}{r}=\\frac{n!}{r!(n-r)!}",
        "(a-b)^n\\text{ has alternating signs}",
      ],
    },
    workedExamples: theoremExamples,
    guidedPractice: [
      intAnswer("y11ext-bt-thm-g1", "Find the coefficient of the squared term in the displayed expansion.", "(x+3)^4", "54",
        "The x² term has r = 2 (since 4−r = 2). Using the binomial theorem: C(4,2)·x²·3² = 6·9 = 54."),
      choice("y11ext-bt-thm-g2", "Choose the correct expansion.", "A", ["$x^3+6x^2+12x+8$", "$x^3+2x^2+4x+8$", "$x^3+6x+8$", "$x^3+8$"], "Use row 3 coefficients with powers of 2.", "(x+2)^3"),
      choice("y11ext-bt-thm-g3", "Which sign belongs to the cubic term in the displayed expansion?", "B", ["Positive", "Negative", "Zero", "Cannot be determined"], "Odd powers of the negative term are negative.", "(1-x)^5"),
      choice("y11ext-bt-thm-g4", "Which binomial coefficient belongs with the displayed term form?", "D", ["$\\binom{8}{2}$", "$\\binom{8}{4}$", "$\\binom{5}{3}$", "$\\binom{8}{3}$"], "The exponent of b is 3, so use $\\binom{8}{3}$.", "a^5b^3\\text{ in }(a+b)^8"),
    ],
    independentPractice: [
      intAnswer("y11ext-bt-thm-i1", "Find the coefficient of the cubed term in the displayed expansion.", "(x+2)^5", "40",
        "The x³ term has r = 2 (since 5−r = 3). C(5,2)·x³·2² = 10·4 = 40."),
      intAnswer("y11ext-bt-thm-i2", "Find the coefficient of the squared term in the displayed expansion.", "(2x+1)^4", "24",
        "The (2x)² term has r = 2: C(4,2)·(2x)²·1² = 6·4x². The numerical coefficient is 24."),
      choice("y11ext-bt-thm-i3", "Choose the correct expansion.", "C", ["$1-4x+4x^2$", "$1+4x+6x^2+4x^3+x^4$", "$1-4x+6x^2-4x^3+x^4$", "$1-6x+4x^2-x^4$"], "The signs alternate in $(1-x)^4$.", "(1-x)^4"),
      choice("y11ext-bt-thm-i4", "Which coefficient expression matches the displayed term?", "A", ["$\\binom{7}{2}3^2$", "$\\binom{7}{5}3^5$", "$\\binom{5}{2}3^7$", "$\\binom{7}{3}$"], "The power of 3 is 2 in the $x^5$ term.", "x^5\\text{ in }(x+3)^7"),
      intAnswer("y11ext-bt-thm-i5", "Find the coefficient of the displayed power.", "(1+2x)^5,\\quad x^2", "40",
        "The x² term has r = 2: C(5,2)·1³·(2x)² = 10·4x². The numerical coefficient is 40."),
    ],
    commonMistakes: [
      { mistake: "Using ordinary powers but forgetting binomial coefficients.", fix: "Include the coefficient $\\binom{n}{r}$ for each term." },
      { mistake: "Making every term positive in an expansion with subtraction.", fix: "Track powers of the negative term carefully." },
      { mistake: "Using the wrong r-value for the target power.", fix: "Match the target power with the power pattern in the general term." },
      { mistake: "Expanding the whole expression when only one coefficient is needed.", fix: "Select the single term that contains the requested power." },
    ],
    masteryQuiz: [
      intAnswer("y11ext-bt-thm-m1", "Find the coefficient of the squared term in the displayed expansion.", "(x+2)^4", "24",
        "The x² term has r = 2 (since 4−r = 2). C(4,2)·x²·2² = 6·4 = 24."),
      choice("y11ext-bt-thm-m2", "Choose the correct expansion.", "A", ["$x^3+9x^2+27x+27$", "$x^3+3x^2+9x+27$", "$x^3+27$", "$x^3+6x^2+12x+8$"], "Use row 3 coefficients with powers of 3.", "(x+3)^3"),
      choice("y11ext-bt-thm-m3", "Which sign belongs to the squared term?", "A", ["Positive", "Negative", "Zero", "Cannot be determined"], "An even power of the negative term is positive.", "(1-x)^5"),
      intAnswer("y11ext-bt-thm-m4", "Find the coefficient of the cubed term in the displayed expansion.", "(x+2)^5", "40",
        "The x³ term has r = 2 (since 5−r = 3). C(5,2)·x³·2² = 10·4 = 40."),
      intAnswer("y11ext-bt-thm-m5", "Find the coefficient of the displayed power.", "(2x+1)^5,\\quad x^3", "80",
        "The x³ term has r = 2: C(5,2)·(2x)³·1² = 10·8 = 80."),
      choice("y11ext-bt-thm-m6", "Which binomial coefficient belongs with the displayed term form?", "C", ["$\\binom{9}{2}$", "$\\binom{9}{4}$", "$\\binom{9}{5}$", "$\\binom{5}{9}$"], "The exponent of b is 5, so use $\\binom{9}{5}$.", "a^4b^5\\text{ in }(a+b)^9"),
      choice("y11ext-bt-thm-m7", "A student expands $(1-x)^4$ with all positive signs. What is the issue?", "B", ["The coefficients are too small", "Powers of the negative term change signs", "The row number is zero", "The expression has no middle terms"], "Odd powers of negative x produce negative terms." ),
      choice("y11ext-bt-thm-m8", "Why can a coefficient be found without expanding every term?", "D", ["The answer is always 1", "The powers are irrelevant", "Only row sums matter", "The target power identifies one term"], "The required power determines the relevant term." ),
      intAnswer("y11ext-bt-thm-m9", "Find the coefficient of the displayed power.", "(x+3)^6,\\quad x^4", "135",
        "The x⁴ term has r = 2 (since 6−r = 4). C(6,2)·x⁴·3² = 15·9 = 135."),
      intAnswer("y11ext-bt-thm-m10", "Find the coefficient of the displayed power.", "(2x+1)^6,\\quad x^4", "240",
        "The x⁴ term has r = 2 (since 6−r = 4): C(6,2)·(2x)⁴·1² = 15·16 = 240."),
    ],
  };
}

function generalTermLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use the general term to identify r-values, particular coefficients, and constant terms.",
      "Finding a general term"
    ),
    learningIntention:
      "Use the $T_{r+1}$ convention to locate target powers and extract coefficients from binomial expansions.",
    successCriteria: [
      "State the role of r in the general term.",
      "Use $T_{r+1}$ to identify a particular term position.",
      "Find the r-value that produces a target power of x.",
      "Extract integer coefficients from selected terms.",
      "Find simple constant terms in binomial expansions.",
      "Recognise common indexing errors in the $T_{r+1}$ convention.",
    ],
    teaching: {
      paragraphs: [
        "The general term gives a way to describe any term in a binomial expansion without writing the whole expansion.",
        "The convention $T_{r+1}$ is used because r starts at 0 for the first term.",
        "In $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$, the power of the first part decreases and the power of the second part increases.",
        "To find a coefficient of a target power, match the exponent of x to the target and solve for r.",
        "For a constant term, set the total exponent of x equal to zero.",
      ],
      latexBlocks: [
        "T_{r+1}=\\binom{n}{r}a^{n-r}b^r",
        "r=0\\text{ gives the first term}",
        "\\text{constant term: total power of }x=0",
      ],
    },
    workedExamples: generalExamples,
    guidedPractice: [
      intAnswer("y11ext-bt-gen-g1", "Find the r-value that gives the cubed power in the displayed expansion.", "(x+2)^6,\\quad x^3", "3",
        "In T_{r+1} = C(6,r)·x^{6−r}·2^r, the power of x is 6−r. Set 6−r = 3, so r = 3."),
      intAnswer("y11ext-bt-gen-g2", "Find the coefficient of the displayed power.", "(x+3)^5,\\quad x^2", "270",
        "Set 5−r = 2, so r = 3. The term is C(5,3)·x²·3³ = 10·27 = 270."),
      choice("y11ext-bt-gen-g3", "Which general term matches the displayed expansion?", "B", ["$T_r=\\binom{5}{r}x^r3^{5-r}$", "$T_{r+1}=\\binom{5}{r}x^{5-r}3^r$", "$T_{r+1}=5x^r3^r$", "$T_1=\\binom{r}{5}x^53^r$"], "Use $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$.", "(x+3)^5"),
      intAnswer("y11ext-bt-gen-g4", "Find the constant term in the displayed expansion.", "\\left(x+\\frac{1}{x}\\right)^4", "6",
        "The general term gives x^{4-r}·x^{-r} = x^{4-2r}. For a constant: 4−2r = 0, so r = 2. C(4,2) = 6."),
    ],
    independentPractice: [
      intAnswer("y11ext-bt-gen-i1", "Find the r-value that gives the squared power in the displayed expansion.", "(x+4)^7,\\quad x^2", "5",
        "The power of x in T_{r+1} is 7−r. Set 7−r = 2, so r = 5."),
      intAnswer("y11ext-bt-gen-i2", "Find the coefficient of the displayed power.", "(x+2)^6,\\quad x^4", "60",
        "Set 6−r = 4, so r = 2. The term is C(6,2)·x⁴·2² = 15·4 = 60."),
      intAnswer("y11ext-bt-gen-i3", "Find the constant term in the displayed expansion.", "\\left(x+\\frac{2}{x}\\right)^4", "24",
        "The general term: x^{4-r}·(2/x)^r = C(4,r)·2^r·x^{4-2r}. For a constant: 4−2r = 0, so r = 2. C(4,2)·2² = 6·4 = 24."),
      choice("y11ext-bt-gen-i4", "In the $T_{r+1}$ convention, what term number is produced by r equals 3?", "C", ["Second term", "Third term", "Fourth term", "Fifth term"], "The term number is r plus 1." ),
      choice("y11ext-bt-gen-i5", "A student sets r equal to the target term number. What is the indexing issue?", "A", ["The term number is r plus 1", "The row sum should be used", "The coefficient must be negative", "The expansion has no terms"], "In this convention, r is one less than the term number." ),
    ],
    commonMistakes: [
      { mistake: "Using r as the term number instead of one less than the term number.", fix: "Remember that $T_{r+1}$ is the term number." },
      { mistake: "Matching the wrong part of the term to the target power.", fix: "Track the total power of x across both factors." },
      { mistake: "Trying to type a full symbolic general term as an answer.", fix: "Use multiple choice for formula recognition and integer answers for coefficients." },
      { mistake: "Forgetting signs or constants in the second term.", fix: "Include the full second part of the binomial when forming the general term." },
    ],
    masteryQuiz: [
      intAnswer("y11ext-bt-gen-m1", "Find the r-value that gives the displayed power.", "(x+2)^5,\\quad x^3", "2",
        "The power of x in T_{r+1} is 5−r. Set 5−r = 3, so r = 2."),
      choice("y11ext-bt-gen-m2", "Which term number corresponds to r equals 4?", "D", ["Third term", "Fourth term", "Sixth term", "Fifth term"], "The term number is r plus 1." ),
      intAnswer("y11ext-bt-gen-m3", "Find the coefficient of the displayed power.", "(x+2)^5,\\quad x^3", "40",
        "r = 2 (since 5−r = 3). The term is C(5,2)·x³·2² = 10·4 = 40."),
      intAnswer("y11ext-bt-gen-m4", "Find the coefficient of the displayed power.", "(x+3)^6,\\quad x^4", "135",
        "Set 6−r = 4, so r = 2. The term is C(6,2)·x⁴·3² = 15·9 = 135."),
      intAnswer("y11ext-bt-gen-m5", "Find the constant term in the displayed expansion.", "\\left(x+\\frac{1}{x}\\right)^6", "20",
        "The general term: x^{6-r}·x^{-r} = x^{6-2r}. For a constant: 6−2r = 0, so r = 3. C(6,3) = 20."),
      choice("y11ext-bt-gen-m6", "Which equation identifies the r-value for the displayed target power?", "B", ["$r=2$", "$7-r=2$", "$7+r=2$", "$2r=7$"], "The power of x from the first term is $7-r$.", "(x+4)^7,\\quad x^2"),
      choice("y11ext-bt-gen-m7", "A student uses $T_r$ as the term number in the $T_{r+1}$ convention. What is the issue?", "A", ["The index is shifted by one", "The coefficients disappear", "The signs must all be negative", "The expansion is circular"], "The $T_{r+1}$ convention means r starts at 0." ),
      choice("y11ext-bt-gen-m8", "A question asks for the coefficient of a target power. What should the final answer usually be?", "C", ["The full expansion", "The whole general term", "A single integer coefficient", "The row number only"], "A coefficient question asks for the number multiplying the target power." ),
      intAnswer("y11ext-bt-gen-m9", "Find the constant term in the displayed expansion.", "\\left(x^2+\\frac{1}{x}\\right)^6", "15",
        "The general term: (x²)^{6-r}·x^{-r} = x^{12-3r}. For a constant: 12−3r = 0, so r = 4. C(6,4) = 15."),
      intAnswer("y11ext-bt-gen-m10", "Find the coefficient of the displayed power.", "(2x+1)^7,\\quad x^5", "672",
        "The x⁵ term needs 7−r = 5, so r = 2. C(7,2)·(2x)⁵·1² = 21·32 = 672."),
    ],
  };
}

function identitiesLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use substitution and coefficient identities to evaluate sums, alternating sums, and coefficient relationships.",
      "Binomial identities and coefficients"
    ),
    learningIntention:
      "Use binomial substitutions and coefficient identities to evaluate coefficient sums and recognise equivalent binomial coefficients.",
    successCriteria: [
      "Find the sum of coefficients by substituting x equals 1.",
      "Find alternating sums of coefficients by substituting x equals negative 1.",
      "Use coefficient symmetry to match equivalent binomial coefficients.",
      "Apply Pascal's identity to adjacent coefficients.",
      "Choose the correct substitution for a coefficient identity.",
      "Evaluate simple coefficient relationships exactly.",
    ],
    teaching: {
      paragraphs: [
        "Binomial expansions can produce useful identities when a value is substituted for x.",
        "The sum of coefficients in a polynomial is found by setting x equal to 1.",
        "The alternating sum of coefficients is found by setting x equal to negative 1.",
        "Binomial coefficients are symmetric because choosing r objects is equivalent to leaving out n minus r objects.",
        "Pascal's identity combines adjacent entries from one row to form an entry in the next row.",
      ],
      latexBlocks: [
        "\\text{sum of coefficients}=P(1)",
        "\\text{alternating sum of coefficients}=P(-1)",
        "\\binom{n}{r}=\\binom{n}{n-r}",
        "\\binom{n}{r}+\\binom{n}{r+1}=\\binom{n+1}{r+1}",
      ],
    },
    workedExamples: identityExamples,
    guidedPractice: [
      intAnswer("y11ext-bt-id-g1", "Find the sum of coefficients in the displayed expansion.", "(2x+1)^4", "81",
        "Substitute x = 1: (2·1+1)⁴ = 3⁴ = 81."),
      intAnswer("y11ext-bt-id-g2", "Find the alternating sum of coefficients in the displayed expansion.", "(x+3)^5", "32",
        "Substitute x = −1: (−1+3)⁵ = 2⁵ = 32."),
      choice("y11ext-bt-id-g3", "Choose the equivalent binomial coefficient.", "C", ["$\\binom{10}{2}$", "$\\binom{7}{3}$", "$\\binom{10}{7}$", "$\\binom{3}{10}$"], "Use $\\binom{n}{r}=\\binom{n}{n-r}$.", "\\binom{10}{3}"),
      intAnswer("y11ext-bt-id-g4", "Evaluate the displayed coefficient relationship.", "\\binom{5}{2}+\\binom{5}{3}", "20",
        "By Pascal's identity: C(5,2) + C(5,3) = C(6,3) = 20."),
    ],
    independentPractice: [
      intAnswer("y11ext-bt-id-i1", "Find the sum of coefficients in the displayed expansion.", "(3x+1)^3", "64",
        "Substitute x = 1: (3·1+1)³ = 4³ = 64."),
      intAnswer("y11ext-bt-id-i2", "Find the alternating sum of coefficients in the displayed expansion.", "(2x+5)^4", "81",
        "Substitute x = −1: (2·(−1)+5)⁴ = 3⁴ = 81."),
      choice("y11ext-bt-id-i3", "Choose the equivalent binomial coefficient.", "A", ["$\\binom{9}{7}$", "$\\binom{7}{9}$", "$\\binom{9}{3}$", "$\\binom{2}{9}$"], "Use symmetry across the row.", "\\binom{9}{2}"),
      intAnswer("y11ext-bt-id-i4", "Evaluate the displayed coefficient relationship.", "\\binom{7}{3}+\\binom{7}{4}", "70",
        "By Pascal's identity: C(7,3) + C(7,4) = C(8,4) = 70."),
      choice("y11ext-bt-id-i5", "Which substitution finds the sum of coefficients?", "B", ["$x=0$", "$x=1$", "$x=-1$", "$x=2$"], "Set x equal to 1 to add all coefficients.", "P(x)=(2x-3)^6"),
    ],
    commonMistakes: [
      { mistake: "Using x equals 0 for the sum of all coefficients.", fix: "Use x equals 1; x equals 0 only selects the constant term." },
      { mistake: "Using x equals 1 for an alternating sum.", fix: "Use x equals negative 1 for alternating signs." },
      { mistake: "Reversing symmetry incorrectly.", fix: "Keep the top number the same and replace r with n minus r." },
      { mistake: "Applying Pascal's identity to non-adjacent entries.", fix: "Pascal's identity combines adjacent entries from the same row." },
    ],
    masteryQuiz: [
      intAnswer("y11ext-bt-id-m1", "Find the sum of coefficients in the displayed expansion.", "(2x+1)^5", "243",
        "Substitute x = 1: (2·1+1)⁵ = 3⁵ = 243."),
      intAnswer("y11ext-bt-id-m2", "Find the alternating sum of coefficients in the displayed expansion.", "(x+4)^3", "27",
        "Substitute x = −1: (−1+4)³ = 3³ = 27."),
      choice("y11ext-bt-id-m3", "Which binomial coefficient is equivalent to the displayed one?", "D", ["$\\binom{12}{5}$", "$\\binom{7}{12}$", "$\\binom{12}{6}$", "$\\binom{12}{7}$"], "Use coefficient symmetry.", "\\binom{12}{5}"),
      intAnswer("y11ext-bt-id-m4", "Evaluate the displayed coefficient relationship.", "\\binom{6}{2}+\\binom{6}{3}", "35",
        "By Pascal's identity: C(6,2) + C(6,3) = C(7,3) = 35."),
      intAnswer("y11ext-bt-id-m5", "Find the sum of coefficients in the displayed expansion.", "(3x-2)^4", "1",
        "Substitute x = 1: (3·1−2)⁴ = 1⁴ = 1."),
      intAnswer("y11ext-bt-id-m6", "Find the alternating sum of coefficients in the displayed expansion.", "(3x+2)^4", "1",
        "Substitute x = −1: (3·(−1)+2)⁴ = (−1)⁴ = 1."),
      choice("y11ext-bt-id-m7", "Which identity matches adjacent entries in Pascal's triangle?", "A", ["$\\binom{n}{r}+\\binom{n}{r+1}=\\binom{n+1}{r+1}$", "$\\binom{n}{r}+\\binom{n}{r}=\\binom{n}{2r}$", "$\\binom{n}{r}=\\binom{r}{n}$", "$\\binom{n}{r}=n^r$"], "Pascal's identity combines adjacent entries into the next row."),
      choice("y11ext-bt-id-m8", "A student uses x equals 0 to find a sum of coefficients. What does that actually find?", "B", ["The leading coefficient", "The constant term", "The row sum", "The alternating sum"], "Substituting x equals 0 selects the constant term."),
      intAnswer("y11ext-bt-id-m9", "Find the sum of coefficients in the displayed expansion.", "(2x-3)^6", "1",
        "Substitute x = 1: (2·1−3)⁶ = (−1)⁶ = 1."),
      intAnswer("y11ext-bt-id-m10", "Find the alternating sum of coefficients in the displayed expansion.", "(4x+1)^4", "81",
        "Substitute x = −1: (4·(−1)+1)⁴ = (−3)⁴ = 81."),
    ],
  };
}

const greatestTermExamples: WorkedExample[] = [
  {
    title: "Greatest coefficient in (1+x)^8",
    questionLatex: "\\text{Find the greatest coefficient in }(1+x)^8.",
    steps: [
      { explanation: "Write the general term.", latex: "T_{r+1}=\\binom{8}{r}x^r" },
      { explanation: "Form the ratio of consecutive terms.", latex: "\\frac{T_{r+2}}{T_{r+1}}=\\frac{\\binom{8}{r+1}}{\\binom{8}{r}}=\\frac{8-r}{r+1}" },
      { explanation: "Set the ratio at least 1 and solve.", latex: "\\frac{8-r}{r+1}\\geq 1\\implies 8-r\\geq r+1\\implies r\\leq 3.5" },
      { explanation: "The ratio is at least 1 for r=0,1,2,3, meaning terms are still increasing up to T_5. At r=4 the ratio drops below 1, so T_5 is the last increase.", latex: "r=4\\text{ gives the greatest term: }T_5=\\binom{8}{4}=70" },
    ],
    finalAnswerLatex: "70",
  },
  {
    title: "Greatest term in (2+3)^6",
    questionLatex: "\\text{Find the greatest term in the expansion of }(2+3)^6,\\text{ i.e. }T_{r+1}=\\binom{6}{r}2^{6-r}3^r.",
    steps: [
      { explanation: "Form the ratio of consecutive terms.", latex: "\\frac{T_{r+2}}{T_{r+1}}=\\frac{6-r}{r+1}\\cdot\\frac{3}{2}=\\frac{3(6-r)}{2(r+1)}" },
      { explanation: "Set the ratio at least 1 and solve.", latex: "\\frac{3(6-r)}{2(r+1)}\\geq 1\\implies 18-3r\\geq 2r+2\\implies r\\leq 3.2" },
      { explanation: "The ratio is at least 1 for r=0,1,2,3. At r=4, ratio drops below 1. Greatest term is T_5.", latex: "T_5=\\binom{6}{4}\\cdot2^2\\cdot3^4=15\\cdot4\\cdot81=4860" },
    ],
    finalAnswerLatex: "4860",
  },
  {
    title: "Two terms tie for greatest",
    questionLatex: "\\text{Find the greatest coefficient in }(1+x)^9.",
    steps: [
      { explanation: "Form the ratio.", latex: "\\frac{T_{r+2}}{T_{r+1}}=\\frac{9-r}{r+1}" },
      { explanation: "Set the ratio at least 1.", latex: "\\frac{9-r}{r+1}\\geq 1\\implies 9-r\\geq r+1\\implies r\\leq 4" },
      { explanation: "At r=4 the ratio equals exactly 1, meaning T_5 = T_6. Both tie for greatest.", latex: "T_5=\\binom{9}{4}=126,\\quad T_6=\\binom{9}{5}=126" },
      { explanation: "When the boundary is an integer, two consecutive terms are equal and both are greatest.", latex: "\\text{Greatest coefficient}=126" },
    ],
    finalAnswerLatex: "126",
  },
];

function greatestTermLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use the ratio method to find the greatest term or greatest coefficient in a binomial expansion.",
      "Greatest coefficient and greatest term"
    ),
    learningIntention:
      "Apply the ratio method to locate the greatest term or greatest coefficient in a binomial expansion, including cases where two terms tie.",
    successCriteria: [
      "Form the ratio T_{r+2}/T_{r+1} and simplify it in terms of r.",
      "Set the ratio at least 1 and solve for r.",
      "Identify the value of r that gives the greatest term.",
      "Calculate the value of the greatest term.",
      "Recognise when two consecutive terms tie for greatest.",
      "Distinguish between greatest term and greatest coefficient.",
    ],
    teaching: {
      paragraphs: [
        "The terms of a binomial expansion first increase and then decrease. To find the greatest term, compare adjacent terms using a ratio.",
        "Form the ratio $T_{r+2}/T_{r+1}$ and simplify. This ratio is a fraction in $r$. When it is at least 1, the sequence is still increasing.",
        "Set the ratio at least 1 and solve for $r$. The solution has the form $r \\leq k$ for some threshold $k$. The ratio is at least 1 for all integer $r$ up to $\\lfloor k \\rfloor$, so terms increase up to $T_{\\lfloor k \\rfloor + 2}$, which is the greatest term.",
        "If the threshold $k$ is itself an integer, the ratio equals exactly 1 at $r = k$, meaning $T_{k+1} = T_{k+2}$. Two consecutive terms tie for greatest.",
        "The greatest coefficient refers to the largest binomial coefficient $\\binom{n}{r}$. Use the same method with $a = b = 1$. The greatest term refers to the largest numerical value in the full expansion with specific values of $a$ and $b$.",
      ],
      latexBlocks: [
        "T_{r+1}=\\binom{n}{r}a^{n-r}b^r",
        "\\frac{T_{r+2}}{T_{r+1}}=\\frac{n-r}{r+1}\\cdot\\frac{b}{a}",
        "\\text{Set }\\frac{T_{r+2}}{T_{r+1}}\\geq 1,\\text{ solve for }r\\leq k",
        "\\text{Greatest term: }T_{\\lfloor k\\rfloor+2}\\quad(\\text{or two tied terms if }k\\in\\mathbb{Z})",
      ],
    },
    workedExamples: greatestTermExamples,
    guidedPractice: [
      choice(
        "y11ext-bt-grt-g1",
        "The ratio T_{r+2}/T_{r+1} for a binomial expansion simplifies to r ≤ 2.5. Which term is the greatest?",
        "C",
        ["T₂", "T₃", "T₄", "T₅"],
        "r ≤ 2.5 means the ratio is at least 1 for r = 0, 1, 2, so terms increase up to T₄. At r = 3 the ratio drops below 1 and T₅ < T₄. The greatest term is T₄.",
        "\\frac{T_{r+2}}{T_{r+1}}\\geq 1\\implies r\\leq 2.5"
      ),
      choice(
        "y11ext-bt-grt-g2",
        "Write the simplified ratio T_{r+2}/T_{r+1} for the expansion of (1+x)^5.",
        "B",
        ["\\dfrac{r+1}{5-r}", "\\dfrac{5-r}{r+1}", "\\dfrac{5-r}{r}", "\\dfrac{6-r}{r+1}"],
        "T_{r+2}/T_{r+1} = C(5,r+1)/C(5,r) = (5-r)/(r+1).",
        "(1+x)^5"
      ),
      intAnswer(
        "y11ext-bt-grt-g3",
        "Find the value of r that gives the greatest term in (1+x)^8.",
        "(1+x)^8",
        "4",
        "Ratio: (8-r)/(r+1) ≥ 1 → r ≤ 3.5. Terms increase up to T₅, which is T_{r+1} at r = 4. The value of r is 4."
      ),
      intAnswer(
        "y11ext-bt-grt-g4",
        "Find the value of the greatest term in (1+2x)^6, treating each term as C(6,r)·2^r (evaluated at x=1).",
        "T_{r+1}=\\binom{6}{r}2^r",
        "240",
        "Ratio: 2(6-r)/(r+1) ≥ 1 → 12 − 2r ≥ r + 1 → r ≤ 11/3 ≈ 3.67. Greatest term at r = 4: C(6,4)·2⁴ = 15·16 = 240."
      ),
    ],
    independentPractice: [
      intAnswer(
        "y11ext-bt-grt-i1",
        "Find the greatest coefficient in (1+x)^7.",
        "(1+x)^7",
        "35",
        "Ratio: (7-r)/(r+1) ≥ 1 → r ≤ 3. At r = 3 the ratio equals exactly 1, so C(7,3) = C(7,4) = 35 and two terms tie. The greatest coefficient is 35."
      ),
      intAnswer(
        "y11ext-bt-grt-i2",
        "Find the greatest coefficient in (1+x)^9.",
        "(1+x)^9",
        "126",
        "Ratio: (9-r)/(r+1) ≥ 1 → r ≤ 4. At r = 4 the ratio equals exactly 1, so C(9,4) = C(9,5) = 126 and two terms tie. The greatest coefficient is 126."
      ),
      choice(
        "y11ext-bt-grt-i3",
        "Which value of n gives exactly one greatest coefficient in (1+x)^n?",
        "B",
        ["n=7", "n=8", "n=9", "n=11"],
        "When n is even the middle term at r = n/2 is the unique greatest. For n = 8 (even), the unique greatest is C(8,4) = 70. Odd n always produces two tied greatest coefficients.",
        "\\text{Select A, B, C, or D.}"
      ),
      intAnswer(
        "y11ext-bt-grt-i4",
        "Find the value of the greatest term in (2+3x)^5 at x=1, where T_{r+1} = C(5,r)·2^{5-r}·3^r.",
        "T_{r+1}=\\binom{5}{r}\\cdot2^{5-r}\\cdot3^r",
        "1080",
        "Ratio: 3(5-r)/(2(r+1)) ≥ 1 → 15 − 3r ≥ 2r + 2 → r ≤ 2.6. Greatest term at r = 3: C(5,3)·2²·3³ = 10·4·27 = 1080."
      ),
      intAnswer(
        "y11ext-bt-grt-i5",
        "Find the value of the greatest term in the expansion (1+2)^5, where T_{r+1} = C(5,r)·2^r.",
        "T_{r+1}=\\binom{5}{r}\\cdot2^r",
        "80",
        "Ratio: 2(5-r)/(r+1) ≥ 1 → 10 − 2r ≥ r + 1 → r ≤ 3. At r = 3 the ratio equals exactly 1, so T₄ = C(5,3)·8 = 80 and T₅ = C(5,4)·16 = 80 tie. Greatest term value is 80."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Using the last r satisfying the inequality as the r-value for the greatest term in T_{r+1}.",
        fix: "If the inequality gives r ≤ k with floor(k) = m, the ratio at r = m is still ≥ 1, meaning T_{m+2} > T_{m+1}. The greatest term is T_{m+2}, corresponding to r = m+1 in T_{r+1}.",
      },
      {
        mistake: "Forgetting to include the values of a and b when finding the greatest term value.",
        fix: "The ratio must include the factor b/a. For the greatest coefficient, set a = b = 1; otherwise use the actual values.",
      },
      {
        mistake: "Assuming only one term can be greatest.",
        fix: "When the threshold k is a whole number, the ratio at r = k equals exactly 1 and two consecutive terms tie for greatest.",
      },
    ],
    masteryQuiz: [
      choice(
        "y11ext-bt-grt-m1",
        "T_{r+2}/T_{r+1} ≥ 1 simplifies to r ≤ 2 for a binomial expansion. Which term is the greatest?",
        "C",
        ["T₂", "T₃", "T₄", "T₅"],
        "At r = 2 the ratio equals exactly 1, so T₄ = T₃ and both tie for greatest. At r = 3 the ratio drops below 1, so T₅ < T₄. T₄ is among the greatest terms (tied with T₃).",
        "\\frac{T_{r+2}}{T_{r+1}}\\geq 1\\implies r\\leq 2"
      ),
      choice(
        "y11ext-bt-grt-m2",
        "In (1+x)^9, the greatest coefficient appears in which two terms?",
        "B",
        ["T₄ and T₅", "T₅ and T₆", "T₆ and T₇", "T₄ and T₆"],
        "Ratio: (9-r)/(r+1) ≥ 1 → r ≤ 4. At r = 4 ratio = 1, so T₅ = T₆ = C(9,4) = C(9,5) = 126. The greatest coefficient appears in T₅ and T₆.",
        "(1+x)^9"
      ),
      intAnswer(
        "y11ext-bt-grt-m3",
        "Find the greatest coefficient in (1+x)^{11}.",
        "(1+x)^{11}",
        "462",
        "Ratio: (11-r)/(r+1) ≥ 1 → r ≤ 5. At r = 5 ratio = 1, so C(11,5) = C(11,6) = 462. Two terms tie; greatest coefficient is 462."
      ),
      intAnswer(
        "y11ext-bt-grt-m4",
        "Find the value of the greatest term in (3+2)^4, where T_{r+1} = C(4,r)·3^{4-r}·2^r.",
        "T_{r+1}=\\binom{4}{r}\\cdot3^{4-r}\\cdot2^r",
        "216",
        "Ratio: 2(4-r)/(3(r+1)) ≥ 1 → 8 − 2r ≥ 3r + 3 → r ≤ 1. At r = 1 ratio = 2·3/(3·2) = 1, so T₂ = C(4,1)·3³·2 = 216 and T₃ = C(4,2)·3²·4 = 216 tie. Greatest term is 216."
      ),
      intAnswer(
        "y11ext-bt-grt-m5",
        "Find the greatest coefficient in (1+x)^{12}.",
        "(1+x)^{12}",
        "924",
        "Ratio: (12-r)/(r+1) ≥ 1 → r ≤ 5.5. floor(5.5) = 5, so greatest term at r = 6: C(12,6) = 924. Unique maximum since 5.5 is not an integer."
      ),
      intAnswer(
        "y11ext-bt-grt-m6",
        "Find the value of r that gives the greatest term in (x+2)^8, where T_{r+1} = C(8,r)·2^r (at x=1).",
        "T_{r+1}=\\binom{8}{r}\\cdot2^r",
        "5",
        "Ratio: 2(8-r)/(r+1) ≥ 1 → 16 − 2r ≥ r + 1 → r ≤ 5. At r = 5 ratio = 2·3/6 = 1, so T₆ = T₇. r = 5 gives the last term at which the ratio first reaches 1. Both r = 5 and r = 6 give equal greatest terms."
      ),
      choice(
        "y11ext-bt-grt-m7",
        "A student claims the greatest term always occurs at the middle value of r. Is this correct?",
        "D",
        ["Yes, always", "Only when a = b", "Only when n is even", "No — the values of a and b shift the position of the greatest term"],
        "The ratio includes b/a. Unless a = b = 1, the position of the greatest term depends on the relative sizes of a and b, not just n.",
        "\\text{Select A, B, C, or D.}"
      ),
      intAnswer(
        "y11ext-bt-grt-m8",
        "Find the value of the greatest term in (1+3)^5, where T_{r+1} = C(5,r)·3^r.",
        "T_{r+1}=\\binom{5}{r}\\cdot3^r",
        "405",
        "Ratio: 3(5-r)/(r+1) ≥ 1 → 15 − 3r ≥ r + 1 → r ≤ 3.5. floor(3.5) = 3, so terms are still increasing at r = 3 (ratio = 1.5 ≥ 1). Greatest term is at r = 4: C(5,4)·3⁴ = 5·81 = 405."
      ),
      intAnswer(
        "y11ext-bt-grt-m9",
        "Find the value of the greatest term in (2+1)^{10}, where T_{r+1} = C(10,r)·2^{10-r}.",
        "T_{r+1}=\\binom{10}{r}\\cdot2^{10-r}",
        "15360",
        "Ratio: (10-r)/(2(r+1)) ≥ 1 → 10 − r ≥ 2r + 2 → r ≤ 8/3 ≈ 2.67. floor(2.67) = 2, so terms are still increasing at r = 2 (ratio = 8/6 > 1). Greatest term is at r = 3: C(10,3)·2⁷ = 120·128 = 15360."
      ),
      intAnswer(
        "y11ext-bt-grt-m10",
        "Find n if the greatest coefficient in (1+x)^n is C(n,4) = 70.",
        "\\binom{n}{4}=70",
        "8",
        "C(n,4) = 70 → n!/(4!(n-4)!) = 70. Try n = 8: C(8,4) = 70 ✓. For n = 8 (even), the unique greatest coefficient is C(8,4) = 70. So n = 8."
      ),
    ],
  };
}

function examPracticeLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Practise mixed binomial theorem questions involving Pascal rows, coefficients, general terms, signs, and identities.",
      "Binomial theorem exam practice"
    ),
    learningIntention:
      "Select and apply binomial theorem strategies in mixed exam-style questions involving coefficients, terms, and identities.",
    successCriteria: [
      "Use Pascal's triangle and row sums in mixed contexts.",
      "Find coefficients using binomial theorem structure.",
      "Track signs in expansions involving subtraction.",
      "Use the general term to locate target powers.",
      "Evaluate constant terms in simple rational binomial expansions.",
      "Use substitutions to evaluate coefficient sums.",
    ],
    teaching: {
      paragraphs: [
        "This lesson brings together the main techniques from the unit. The first decision is usually whether the question is asking for a row fact, a coefficient, a particular term, or an identity.",
        "For coefficient questions, avoid expanding the whole expression unless the power is very small.",
        "For target powers, use the general term and solve for the value of r that creates the required power.",
        "For sums of coefficients, substitution is usually faster than expansion.",
        "For expressions involving subtraction, signs come from powers of the negative part of the binomial.",
      ],
      latexBlocks: [
        "(a+b)^n=\\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r",
        "T_{r+1}=\\binom{n}{r}a^{n-r}b^r",
        "P(1)=\\text{sum of coefficients}",
        "P(-1)=\\text{alternating sum of coefficients}",
      ],
    },
    workedExamples: examExamples,
    guidedPractice: [
      intAnswer("y11ext-bt-exam-g1", "Find the coefficient of the displayed power.", "(x+3)^5,\\quad x^2", "270",
        "Set 5−r = 2, so r = 3. The term is C(5,3)·x²·3³ = 10·27 = 270."),
      intAnswer("y11ext-bt-exam-g2", "Find the row sum for the displayed Pascal row.", "\\text{row }7", "128",
        "The sum of all entries in row n is 2ⁿ. For row 7: 2⁷ = 128."),
      choice("y11ext-bt-exam-g3", "Which term has the negative sign in the displayed expansion?", "B", ["The squared term", "The cubed term", "The fourth-power term", "The constant term"], "Odd powers of the negative part are negative.", "(2-x)^5"),
      intAnswer("y11ext-bt-exam-g4", "Find the sum of coefficients in the displayed expansion.", "(3x-2)^4", "1",
        "Substitute x = 1: (3·1−2)⁴ = 1⁴ = 1."),
    ],
    independentPractice: [
      intAnswer("y11ext-bt-exam-i1", "Find the coefficient of the displayed power.", "(1+2x)^5,\\quad x^2", "40",
        "The x² term has r = 2: C(5,2)·1³·(2x)² = 10·4 = 40."),
      intAnswer("y11ext-bt-exam-i2", "Find the constant term in the displayed expansion.", "\\left(x^2+\\frac{1}{x}\\right)^6", "15",
        "The general term: (x²)^{6-r}·x^{-r} = x^{12-3r}. For a constant: 12−3r = 0, so r = 4. C(6,4) = 15."),
      choice("y11ext-bt-exam-i3", "Which coefficient expression matches the displayed target?", "D", ["$\\binom{6}{2}2^2$", "$\\binom{6}{4}2^2$", "$\\binom{6}{3}2^4$", "$\\binom{6}{4}2^4$"], "The x fourth term uses four powers of $2x$.", "(2x+1)^6,\\quad x^4"),
      intAnswer("y11ext-bt-exam-i4", "Find the alternating sum of coefficients in the displayed expansion.", "(4x+1)^4", "81",
        "Substitute x = −1: (4·(−1)+1)⁴ = (−3)⁴ = 81."),
      choice("y11ext-bt-exam-i5", "A student chooses row 8 for a seventh power. What is the issue?", "C", ["The signs must alternate", "The coefficient row is too small", "The row number is one too high", "The constant term is missing"], "A seventh power uses row 7."),
    ],
    commonMistakes: [
      { mistake: "Expanding a high power when only one coefficient is needed.", fix: "Use the general term to target the requested power." },
      { mistake: "Ignoring a negative sign inside the binomial.", fix: "Let the sign travel with the powered term." },
      { mistake: "Confusing a row sum with a coefficient.", fix: "A row sum uses all entries; a coefficient is one entry or one selected term." },
      { mistake: "Using coefficient identities without checking the question type.", fix: "Decide whether the question asks for a coefficient, a term, a row fact, or a substitution identity." },
    ],
    masteryQuiz: [
      intAnswer("y11ext-bt-exam-m1", "Find the row sum for the displayed Pascal row.", "\\text{row }5", "32",
        "The sum of all entries in row n is 2ⁿ. For row 5: 2⁵ = 32."),
      intAnswer("y11ext-bt-exam-m2", "Find the coefficient of the displayed power.", "(x+1)^4,\\quad x^2", "6",
        "The x² term has r = 2 (since 4−r = 2). C(4,2)·x²·1² = 6. The coefficient is 6."),
      intAnswer("y11ext-bt-exam-m3", "Find the coefficient of the displayed power.", "(x+2)^4,\\quad x^3", "8",
        "The x³ term has r = 1 (since 4−r = 3). C(4,1)·x³·2¹ = 4·2 = 8."),
      intAnswer("y11ext-bt-exam-m4", "Find the coefficient of the displayed power.", "(1+2x)^5,\\quad x^2", "40",
        "The x² term has r = 2: C(5,2)·1³·(2x)² = 10·4 = 40."),
      intAnswer("y11ext-bt-exam-m5", "Find the r-value that gives the displayed power.", "(x+3)^7,\\quad x^2", "5",
        "The power of x in T_{r+1} is 7−r. Set 7−r = 2, so r = 5."),
      intAnswer("y11ext-bt-exam-m6", "Find the constant term in the displayed expansion.", "\\left(x+\\frac{1}{x}\\right)^6", "20",
        "The general term: x^{6-r}·x^{-r} = x^{6-2r}. For a constant: 6−2r = 0, so r = 3. C(6,3) = 20."),
      choice("y11ext-bt-exam-m7", "A student writes every term in $(1-x)^5$ as positive. What is the issue?", "A", ["Odd powers of the negative term should be negative", "The row number is too small", "The constant term should be zero", "The row sum should be used"], "Odd powers of negative x produce negative terms."),
      choice("y11ext-bt-exam-m8", "Which substitution finds the sum of coefficients in a polynomial?", "B", ["$x=-1$", "$x=1$", "$x=0$", "$x=2$"], "Set x equal to 1 to add the coefficients."),
      intAnswer("y11ext-bt-exam-m9", "Find the coefficient of the displayed power.", "(2x+1)^7,\\quad x^4", "560",
        "The x⁴ term needs 7−r = 4, so r = 3. C(7,3)·(2x)⁴·1³ = 35·16 = 560."),
      intAnswer("y11ext-bt-exam-m10", "Find the sum of coefficients in the displayed expansion.", "(3x-2)^5", "1",
        "Substitute x = 1: (3·1−2)⁵ = 1⁵ = 1."),
    ],
  };
}

export function year11ExtensionBinomialTheoremLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-extension" || unit.slug !== "binomial-theorem") {
    return null;
  }

  if (lesson.slug === "pascals-triangle") {
    return pascalLesson(lesson);
  }

  if (lesson.slug === "binomial-theorem") {
    return theoremLesson(lesson);
  }

  if (lesson.slug === "general-term") {
    return generalTermLesson(lesson);
  }

  if (lesson.slug === "binomial-identities") {
    return identitiesLesson(lesson);
  }

  if (lesson.slug === "binomial-theorem-exam-practice") {
    return examPracticeLesson(lesson);
  }

  if (lesson.slug === "greatest-term-binomial") {
    return greatestTermLesson(lesson);
  }

  return null;
}
