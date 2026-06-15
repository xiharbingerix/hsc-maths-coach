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
    hint: "Identify the relevant region or formula, substitute the counts, and simplify the fraction.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
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

// ---------------------------------------------------------------------------
// Lesson 1 — Venn Diagrams and Set Notation
// ---------------------------------------------------------------------------

const vennDiagrams: LessonContent = {
  description:
    "Interpret two-set Venn diagrams using set notation and calculate probabilities for unions, intersections, complements, and single-set regions.",
  learningIntention:
    "Use Venn diagrams and set notation to represent events and calculate probabilities, including P(A), P(A∪B), P(A∩B), P(A'), and P(A only).",
  successCriteria: [
    "Identify the regions of a two-set Venn diagram: A only, B only, A∩B, and neither.",
    "Use set notation A∪B, A∩B, and A' correctly.",
    "Calculate P(A), P(B), P(A∩B), and P(A∪B) from frequency counts in a Venn diagram.",
    "Find the complement P(A') = 1 − P(A).",
    "Apply the addition rule P(A∪B) = P(A) + P(B) − P(A∩B).",
  ],
  teaching: {
    paragraphs: [
      "A Venn diagram uses overlapping circles inside a rectangle that represents the entire sample space. Each circle represents an event. Elements in the overlapping region belong to BOTH events — this region is the intersection A∩B. Elements outside both circles belong to neither event.",
      "Set notation helps describe regions precisely. A∪B (union) contains everything in A or B or both. A∩B (intersection) contains only elements in both A and B. A' (complement) contains everything NOT in A. The total of all regions always equals the total number of outcomes in the sample space.",
      "To calculate probabilities, count the elements in each region and divide by the total. P(A) = n(A) ÷ n(S), where n(S) is the total. The intersection probability is P(A∩B) = n(A∩B) ÷ n(S). The region 'A only' means elements in A but NOT in B, so n(A only) = n(A) − n(A∩B).",
      "The addition rule avoids double-counting the intersection: P(A∪B) = P(A) + P(B) − P(A∩B). Without subtracting the intersection, elements in both sets would be counted twice. This rule always applies, whether or not A and B overlap.",
    ],
    latexBlocks: [
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "P(A')=1-P(A)",
      "P(A\\cap B)=\\frac{n(A\\cap B)}{n(S)}",
    ],
  },
  workedExamples: [
    {
      title: "Read probabilities from a Venn diagram",
      questionLatex:
        "\\text{A survey of 40 students asked whether they play sport (S) or music (M).}\\\\\\text{The Venn diagram shows: S only = 15, S}\\cap\\text{M = 8, M only = 12, neither = 5.}\\\\\\text{Find P(S), P(M), P(S}\\cap\\text{M), P(S}\\cup\\text{M), and P(S').}",
      vennDiagram: {
        description:
          "Venn diagram for 40 students. Sport only = 15, both sport and music = 8, music only = 12, neither = 5.",
        setALabel: "Sport",
        setBLabel: "Music",
        aOnly: 15,
        intersection: 8,
        bOnly: 12,
        neither: 5,
        total: 40,
        showCounts: true,
      },
      steps: [
        {
          explanation: "n(S) = S only + intersection = 15 + 8 = 23. Divide by 40.",
          latex: "P(S)=\\frac{23}{40}",
        },
        {
          explanation: "n(M) = M only + intersection = 12 + 8 = 20. Divide by 40.",
          latex: "P(M)=\\frac{20}{40}=\\frac{1}{2}",
        },
        {
          explanation: "The intersection region has 8 students.",
          latex: "P(S\\cap M)=\\frac{8}{40}=\\frac{1}{5}",
        },
        {
          explanation: "The union covers all students in at least one circle: 15 + 8 + 12 = 35.",
          latex: "P(S\\cup M)=\\frac{35}{40}=\\frac{7}{8}",
        },
        {
          explanation: "The complement of S includes everyone not in S: M only + neither = 12 + 5 = 17.",
          latex: "P(S')=1-\\frac{23}{40}=\\frac{17}{40}",
        },
      ],
      finalAnswerLatex:
        "P(S)=\\dfrac{23}{40},\\;P(M)=\\dfrac{1}{2},\\;P(S\\cap M)=\\dfrac{1}{5},\\;P(S\\cup M)=\\dfrac{7}{8},\\;P(S')=\\dfrac{17}{40}",
    },
    {
      title: "Find P(A only)",
      questionLatex:
        "\\text{Using the same diagram, find P(sport only) — the probability a student plays sport but NOT music.}",
      vennDiagram: {
        description:
          "Venn diagram for 40 students. Sport only = 15, both sport and music = 8, music only = 12, neither = 5.",
        setALabel: "Sport",
        setBLabel: "Music",
        aOnly: 15,
        intersection: 8,
        bOnly: 12,
        neither: 5,
        total: 40,
        showCounts: true,
      },
      steps: [
        {
          explanation: "The 'S only' region contains students in S but not in M. The diagram shows 15 students there.",
          latex: "n(S\\text{ only})=15",
        },
        {
          explanation: "Divide by the total of 40.",
          latex: "P(S\\text{ only})=\\frac{15}{40}=\\frac{3}{8}",
        },
      ],
      finalAnswerLatex: "P(S\\text{ only})=\\dfrac{3}{8}",
    },
    {
      title: "Verify the addition rule",
      questionLatex:
        "\\text{Use the addition rule to verify P(S}\\cup\\text{M) = 7/8 for the same diagram.}",
      vennDiagram: {
        description:
          "Venn diagram for 40 students. Sport only = 15, both sport and music = 8, music only = 12, neither = 5.",
        setALabel: "Sport",
        setBLabel: "Music",
        aOnly: 15,
        intersection: 8,
        bOnly: 12,
        neither: 5,
        total: 40,
        showCounts: true,
      },
      steps: [
        {
          explanation: "Write the addition rule.",
          latex: "P(S\\cup M)=P(S)+P(M)-P(S\\cap M)",
        },
        {
          explanation: "Substitute the values found earlier.",
          latex: "P(S\\cup M)=\\frac{23}{40}+\\frac{20}{40}-\\frac{8}{40}=\\frac{35}{40}=\\frac{7}{8}",
        },
        {
          explanation: "This matches the direct count (15 + 8 + 12 = 35 out of 40), confirming the rule.",
          latex: "\\checkmark",
        },
      ],
      finalAnswerLatex: "P(S\\cup M)=\\dfrac{7}{8}\\text{ — verified by the addition rule.}",
    },
  ] as WorkedExample[],
  guidedPractice: [
    choice(
      "prb-ven-g1",
      "A Venn diagram has two circles A and B. Which region represents A∩B?",
      "B",
      [
        "The region inside A but outside B",
        "The region inside both A and B",
        "The region inside B but outside A",
        "The region outside both circles",
      ],
      "A∩B is the intersection — the region where both circles overlap, containing elements belonging to BOTH A and B."
    ),
    choice(
      "prb-ven-g2",
      "A Venn diagram shows: A only = 10, A∩B = 4, B only = 6, neither = 5. What is the total n(S)?",
      "C",
      ["15", "20", "25", "30"],
      "Add all four regions: 10 + 4 + 6 + 5 = 25. Every element of the sample space falls in exactly one of these four regions."
    ),
    answer(
      "prb-ven-g3",
      "A Venn diagram shows: A only = 10, A∩B = 4, B only = 6, neither = 5. Total = 25. Find P(A∩B). Give your answer as a fraction in simplest form.",
      "P(A\\cap B)=\\dfrac{n(A\\cap B)}{n(S)}",
      "4/25",
      "The intersection region has 4 elements. P(A∩B) = 4/25. This fraction is already in simplest form.",
      ["4 / 25"]
    ),
    answer(
      "prb-ven-g4",
      "Using the same diagram (A only = 10, A∩B = 4, B only = 6, neither = 5, total = 25), find P(A'). Give your answer as a fraction in simplest form.",
      "P(A')=1-P(A)",
      "11/25",
      "n(A) = 10 + 4 = 14, so P(A) = 14/25. P(A') = 1 − 14/25 = 11/25. Elements NOT in A: B only + neither = 6 + 5 = 11.",
      ["11 / 25"]
    ),
  ],
  independentPractice: [
    answer(
      "prb-ven-i1",
      "A Venn diagram shows: A only = 6, A∩B = 5, B only = 9, neither = 10, total = 30. Find P(A∩B) as a fraction in simplest form.",
      "P(A\\cap B)=\\dfrac{n(A\\cap B)}{n(S)}",
      "1/6",
      "P(A∩B) = 5/30 = 1/6.",
      ["5/30", "1 / 6"]
    ),
    answer(
      "prb-ven-i2",
      "Using the same diagram (A only = 6, A∩B = 5, B only = 9, neither = 10, total = 30), find P(A∪B) as a fraction in simplest form.",
      "P(A\\cup B)=\\dfrac{n(A\\cup B)}{n(S)}",
      "2/3",
      "n(A∪B) = 6 + 5 + 9 = 20. P(A∪B) = 20/30 = 2/3.",
      ["20/30", "2 / 3"]
    ),
    answer(
      "prb-ven-i3",
      "Using the same diagram (A only = 6, A∩B = 5, B only = 9, neither = 10, total = 30), find P(A only) as a fraction in simplest form.",
      "P(A\\text{ only})=\\dfrac{n(A\\text{ only})}{n(S)}",
      "1/5",
      "n(A only) = 6. P(A only) = 6/30 = 1/5.",
      ["6/30", "1 / 5"]
    ),
    answer(
      "prb-ven-i4",
      "A Venn diagram shows: A only = 8, A∩B = 7, B only = 10, neither = 5, total = 30. Find P(A') as a fraction in simplest form.",
      "P(A')=1-P(A)",
      "1/2",
      "n(A) = 8 + 7 = 15. P(A) = 15/30 = 1/2. P(A') = 1 − 1/2 = 1/2.",
      ["15/30", "1 / 2"]
    ),
    choice(
      "prb-ven-i5",
      "P(A) = 0.6 and P(B) = 0.5 and P(A∩B) = 0.2. What is P(A∪B)?",
      "C",
      ["0.7", "0.8", "0.9", "1.1"],
      "P(A∪B) = P(A) + P(B) − P(A∩B) = 0.6 + 0.5 − 0.2 = 0.9."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing A∩B (intersection) with A∪B (union): thinking the overlapping region is the union.",
      fix: "The intersection A∩B is only the overlapping part. The union A∪B includes everything in either circle (all three inner regions).",
    },
    {
      mistake: "Forgetting to subtract P(A∩B) in the addition rule, getting P(A∪B) = P(A) + P(B).",
      fix: "Elements in A∩B are counted in both P(A) and P(B), so subtract P(A∩B) once to avoid double-counting.",
    },
    {
      mistake: "Using n(S) = n(A) + n(B) rather than including 'neither'.",
      fix: "The total n(S) = n(A only) + n(A∩B) + n(B only) + n(neither). Always add all four regions.",
    },
    {
      mistake: "Calculating P(A) as just the 'A only' region, forgetting to include A∩B.",
      fix: "P(A) includes all elements in A: n(A) = n(A only) + n(A∩B).",
    },
  ],
  masteryQuiz: [
    answer(
      "prb-ven-m1",
      "A Venn diagram shows: A only = 12, A∩B = 6, B only = 8, neither = 4, total = 30. Find P(A∩B) as a fraction in simplest form.",
      "P(A\\cap B)=\\dfrac{n(A\\cap B)}{n(S)}",
      "1/5",
      "P(A∩B) = 6/30 = 1/5.",
      ["6/30", "1 / 5"]
    ),
    answer(
      "prb-ven-m2",
      "Using the same diagram (A only = 12, A∩B = 6, B only = 8, neither = 4, total = 30), find P(A∪B) as a fraction in simplest form.",
      "P(A\\cup B)=\\dfrac{n(A\\cup B)}{n(S)}",
      "13/15",
      "n(A∪B) = 12 + 6 + 8 = 26. P(A∪B) = 26/30 = 13/15.",
      ["26/30", "13 / 15"]
    ),
    choice(
      "prb-ven-m3",
      "Which expression correctly represents the region 'A only' (inside A but outside B)?",
      "A",
      ["$P(A) - P(A\\cap B)$", "$P(A) + P(B)$", "$P(A\\cup B) - P(B)$", "$1 - P(A)$"],
      "The 'A only' region equals everything in A minus the part shared with B: P(A) − P(A∩B)."
    ),
    answer(
      "prb-ven-m4",
      "A Venn diagram shows: A only = 9, A∩B = 3, B only = 12, neither = 6, total = 30. Find P(B only) as a fraction in simplest form.",
      "P(B\\text{ only})=\\dfrac{n(B\\text{ only})}{n(S)}",
      "2/5",
      "P(B only) = 12/30 = 2/5.",
      ["12/30", "2 / 5"]
    ),
    answer(
      "prb-ven-m5",
      "P(A) = 7/20 and P(A∩B) = 3/20. Find P(A only) as a fraction in simplest form.",
      "P(A\\text{ only})=P(A)-P(A\\cap B)",
      "1/5",
      "P(A only) = 7/20 − 3/20 = 4/20 = 1/5.",
      ["4/20", "1 / 5"]
    ),
    answer(
      "prb-ven-m6",
      "P(A) = 0.45 and P(B) = 0.55 and P(A∩B) = 0.15. Find P(A∪B).",
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "0.85",
      "P(A∪B) = 0.45 + 0.55 − 0.15 = 0.85.",
      [".85"]
    ),
    choice(
      "prb-ven-m7",
      "A Venn diagram shows P(A) = 0.5 and P(A∩B) = 0.2. What is P(A')?",
      "B",
      ["0.3", "0.5", "0.7", "0.8"],
      "P(A') = 1 − P(A) = 1 − 0.5 = 0.5. Note: P(A∩B) is not needed to find P(A')."
    ),
    answer(
      "prb-ven-m8",
      "A Venn diagram has A only = 14, A∩B = 6, B only = 10, neither = 10, total = 40. Find P(neither A nor B) as a fraction in simplest form.",
      "P(\\text{neither})=\\dfrac{n(\\text{neither})}{n(S)}",
      "1/4",
      "P(neither) = 10/40 = 1/4.",
      ["10/40", "1 / 4"]
    ),
    answer(
      "prb-ven-m9",
      "Using the same diagram (A only = 14, A∩B = 6, B only = 10, neither = 10, total = 40), find P(A∪B) using both the direct count and the addition rule. What is P(A∪B)?",
      "P(A\\cup B)=\\dfrac{14+6+10}{40}",
      "3/4",
      "Direct: (14+6+10)/40 = 30/40 = 3/4. Formula: P(A)=20/40, P(B)=16/40, P(A∩B)=6/40. 20/40+16/40−6/40=30/40=3/4. Both agree.",
      ["30/40", "3 / 4"]
    ),
    choice(
      "prb-ven-m10",
      "A class of 30 students: 18 like reading (R), 14 like art (A), and 6 like both. How many like neither?",
      "A",
      ["4", "2", "6", "8"],
      "n(R∪A) = 18 + 14 − 6 = 26. Neither = 30 − 26 = 4."
    ),
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 — Two-Way Tables
// ---------------------------------------------------------------------------

const twoWayTables: LessonContent = {
  description:
    "Construct and read two-way frequency tables to find marginal frequencies, joint probabilities, and informal conditional probabilities.",
  learningIntention:
    "Use two-way tables to organise data for two categorical variables and calculate probabilities, including informal conditional probabilities.",
  successCriteria: [
    "Identify rows, columns, cells, marginal totals, and the grand total in a two-way table.",
    "Find a probability by dividing a cell count (or row/column total) by the grand total.",
    "Find a conditional probability from a table by restricting to the relevant row or column.",
    "Describe the difference between P(A and B) and P(A | B).",
  ],
  teaching: {
    paragraphs: [
      "A two-way table (also called a contingency table) displays two categorical variables at once. Rows represent one variable and columns represent another. Each cell shows the count (frequency) of outcomes with that particular combination of categories.",
      "The totals at the end of each row and at the bottom of each column are called marginal frequencies — they show the total for one variable, ignoring the other. The bottom-right cell is the grand total, which equals the sample size and is also the sum of all row totals or all column totals.",
      "To find probabilities, divide the relevant count by the grand total. P(male and sport) = (count in the male-and-sport cell) ÷ (grand total). P(sport) = (sport column total) ÷ (grand total).",
      "A conditional probability from a table restricts the sample space to one row or column. P(sport | male) = (count in the male-and-sport cell) ÷ (male row total). We are 'given' the person is male, so we only look within the male row. This equals P(male and sport) ÷ P(male).",
    ],
    latexBlocks: [
      "P(\\text{event})=\\frac{\\text{cell count}}{\\text{grand total}}",
      "P(A\\mid B)=\\frac{n(A\\text{ and }B)}{n(B)}",
      "\\text{row total or column total = marginal frequency}",
    ],
  },
  workedExamples: [
    {
      title: "Find joint and marginal probabilities",
      questionLatex:
        "\\text{60 students were surveyed about gender and activity preference.}\\\\\\text{Use the table to find P(male), P(sport), and P(male and sport).}",
      twoWayTableDiagram: {
        description:
          "Two-way table: rows are Male and Female, columns are Sport and Music. Male/Sport = 18, Male/Music = 12, Female/Sport = 14, Female/Music = 16. Row totals: Male = 30, Female = 30. Column totals: Sport = 32, Music = 28. Grand total = 60.",
        rowLabels: ["Male", "Female"],
        columnLabels: ["Sport", "Music"],
        values: [
          [18, 12],
          [14, 16],
        ],
        rowTotals: [30, 30],
        columnTotals: [32, 28],
        grandTotal: 60,
      },
      steps: [
        {
          explanation: "P(male) uses the Male row total divided by the grand total.",
          latex: "P(\\text{male})=\\frac{30}{60}=\\frac{1}{2}",
        },
        {
          explanation: "P(sport) uses the Sport column total divided by the grand total.",
          latex: "P(\\text{sport})=\\frac{32}{60}=\\frac{8}{15}",
        },
        {
          explanation: "P(male and sport) uses the cell at the intersection of Male row and Sport column.",
          latex: "P(\\text{male and sport})=\\frac{18}{60}=\\frac{3}{10}",
        },
      ],
      finalAnswerLatex:
        "P(\\text{male})=\\dfrac{1}{2},\\quad P(\\text{sport})=\\dfrac{8}{15},\\quad P(\\text{male and sport})=\\dfrac{3}{10}",
    },
    {
      title: "Find a conditional probability from the table",
      questionLatex:
        "\\text{Using the same table, find P(sport | male) — the probability a student prefers sport, given they are male.}",
      twoWayTableDiagram: {
        description:
          "Same table. The Male row is highlighted: Sport = 18, Music = 12, total = 30.",
        rowLabels: ["Male", "Female"],
        columnLabels: ["Sport", "Music"],
        values: [
          [18, 12],
          [14, 16],
        ],
        rowTotals: [30, 30],
        columnTotals: [32, 28],
        grandTotal: 60,
        highlight: { kind: "row", rowIndex: 0, label: "Restrict to Male row" },
      },
      steps: [
        {
          explanation: "Restrict to the Male row. Within that row, 18 out of 30 prefer sport.",
          latex: "P(\\text{sport}\\mid\\text{male})=\\frac{18}{30}=\\frac{3}{5}",
        },
        {
          explanation: "Alternatively, use the formula: P(sport | male) = P(male and sport) / P(male).",
          latex: "P(\\text{sport}\\mid\\text{male})=\\frac{18/60}{30/60}=\\frac{18}{30}=\\frac{3}{5}",
        },
      ],
      finalAnswerLatex: "P(\\text{sport}\\mid\\text{male})=\\dfrac{3}{5}",
    },
    {
      title: "Check independence using the table",
      questionLatex:
        "\\text{Are gender and activity preference independent for this group?}\\\\\\text{Compare P(sport | male) with P(sport).}",
      twoWayTableDiagram: {
        description:
          "Same table. P(sport) = 32/60 = 8/15 ≈ 0.533. P(sport | male) = 18/30 = 3/5 = 0.6.",
        rowLabels: ["Male", "Female"],
        columnLabels: ["Sport", "Music"],
        values: [
          [18, 12],
          [14, 16],
        ],
        rowTotals: [30, 30],
        columnTotals: [32, 28],
        grandTotal: 60,
      },
      steps: [
        {
          explanation: "P(sport) = 32/60 = 8/15 ≈ 0.53.",
          latex: "P(\\text{sport})=\\frac{32}{60}=\\frac{8}{15}\\approx0.53",
        },
        {
          explanation: "P(sport | male) = 18/30 = 3/5 = 0.60.",
          latex: "P(\\text{sport}\\mid\\text{male})=\\frac{18}{30}=\\frac{3}{5}=0.60",
        },
        {
          explanation:
            "Since P(sport | male) ≠ P(sport), knowing the student is male changes the probability of preferring sport. The variables are NOT independent.",
          latex: "\\frac{3}{5}\\neq\\frac{8}{15}\\Rightarrow\\text{not independent}",
        },
      ],
      finalAnswerLatex:
        "P(\\text{sport}\\mid\\text{male})\\neq P(\\text{sport})\\Rightarrow\\text{gender and preference are NOT independent.}",
    },
  ] as WorkedExample[],
  guidedPractice: [
    choice(
      "prb-twt-g1",
      "In a two-way table, what is the grand total?",
      "D",
      [
        "The total for one row",
        "The total for one column",
        "The total for one category only",
        "The sum of all cell counts in the table",
      ],
      "The grand total is the overall sample size — the sum of every cell in the table. It equals the sum of all row totals and also the sum of all column totals."
    ),
    answer(
      "prb-twt-g2",
      "A two-way table shows: Male/Sport = 18, Male/Music = 12, Female/Sport = 14, Female/Music = 16. Grand total = 60. How many students prefer sport in total?",
      "\\text{Sport column total}=18+14",
      "32",
      "Sport column total = 18 + 14 = 32."
    ),
    answer(
      "prb-twt-g3",
      "Using the same table (grand total = 60, Female/Music = 16), find P(female and music) as a fraction in simplest form.",
      "P(\\text{female and music})=\\dfrac{16}{60}",
      "4/15",
      "P(female and music) = 16/60 = 4/15.",
      ["16/60", "4 / 15"]
    ),
    answer(
      "prb-twt-g4",
      "Using the same table (Female row total = 30, Female/Music = 16), find P(music | female) as a fraction in simplest form.",
      "P(\\text{music}\\mid\\text{female})=\\dfrac{16}{30}",
      "8/15",
      "Restrict to the Female row: 16 out of 30. P(music | female) = 16/30 = 8/15.",
      ["16/30", "8 / 15"]
    ),
  ],
  independentPractice: [
    answer(
      "prb-twt-i1",
      "A two-way table shows: Male/Sport = 18, Male/Music = 12, Female/Sport = 14, Female/Music = 16. Grand total = 60. Find P(female) as a fraction in simplest form.",
      "P(\\text{female})=\\dfrac{\\text{Female row total}}{\\text{grand total}}",
      "1/2",
      "Female row total = 14 + 16 = 30. P(female) = 30/60 = 1/2.",
      ["30/60", "1 / 2"]
    ),
    answer(
      "prb-twt-i2",
      "Using the same table (Male/Sport = 18, Male row total = 30), find P(sport | male) as a fraction in simplest form.",
      "P(\\text{sport}\\mid\\text{male})=\\dfrac{18}{30}",
      "3/5",
      "Within the Male row: 18 out of 30 prefer sport. P(sport | male) = 18/30 = 3/5.",
      ["18/30", "3 / 5"]
    ),
    answer(
      "prb-twt-i3",
      "Using the same table (Female/Music = 16, Music column total = 28), find P(female | music) as a fraction in simplest form.",
      "P(\\text{female}\\mid\\text{music})=\\dfrac{16}{28}",
      "4/7",
      "Restrict to the Music column: 16 out of 28 are female. P(female | music) = 16/28 = 4/7.",
      ["16/28", "4 / 7"]
    ),
    answer(
      "prb-twt-i4",
      "A two-way table shows: Passed/Studied = 35, Passed/Did not study = 5, Failed/Studied = 10, Failed/Did not study = 10. Grand total = 60. Find P(passed and studied) as a fraction in simplest form.",
      "P(\\text{passed and studied})=\\dfrac{35}{60}",
      "7/12",
      "P(passed and studied) = 35/60 = 7/12.",
      ["35/60", "7 / 12"]
    ),
    choice(
      "prb-twt-i5",
      "In the same table (Studied row total = 45, Passed/Studied = 35), what is P(passed | studied)?",
      "B",
      ["$\\dfrac{35}{60}$", "$\\dfrac{7}{9}$", "$\\dfrac{35}{40}$", "$\\dfrac{5}{9}$"],
      "Restrict to the Studied row: 35 out of 45 passed. P(passed | studied) = 35/45 = 7/9."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the grand total instead of a row or column total when finding a conditional probability.",
      fix: "For P(A | B), divide the joint count by the row or column total for B, not by the grand total.",
    },
    {
      mistake: "Confusing P(male and sport) with P(sport | male).",
      fix: "P(male and sport) divides by the grand total. P(sport | male) divides by the male row total only.",
    },
    {
      mistake: "Misreading the table: reading the wrong cell because rows and columns are swapped.",
      fix: "Always check: row label first, then column label. Trace across the row to the correct column.",
    },
    {
      mistake: "Adding row totals and column totals to get the grand total (double-counting).",
      fix: "The grand total is the sum of all cell counts — add the individual cells, not the marginal totals.",
    },
  ],
  masteryQuiz: [
    answer(
      "prb-twt-m1",
      "A table shows 80 adults: Exercises/Healthy = 45, Exercises/Unhealthy = 15, Does not exercise/Healthy = 10, Does not exercise/Unhealthy = 10. Grand total = 80. Find P(healthy) as a fraction in simplest form.",
      "P(\\text{healthy})=\\dfrac{45+10}{80}",
      "11/16",
      "Healthy column total = 45 + 10 = 55. P(healthy) = 55/80 = 11/16.",
      ["55/80", "11 / 16"]
    ),
    answer(
      "prb-twt-m2",
      "Using the same table (Exercises row total = 60, Exercises/Healthy = 45), find P(healthy | exercises) as a fraction in simplest form.",
      "P(\\text{healthy}\\mid\\text{exercises})=\\dfrac{45}{60}",
      "3/4",
      "Restrict to the Exercises row: 45 out of 60. P(healthy | exercises) = 45/60 = 3/4.",
      ["45/60", "3 / 4"]
    ),
    choice(
      "prb-twt-m3",
      "A table has grand total 100. P(A and B) = 0.24 and P(B) = 0.4. What is P(A | B)?",
      "B",
      ["0.096", "0.6", "0.24", "0.16"],
      "P(A | B) = P(A and B) / P(B) = 0.24 / 0.4 = 0.6."
    ),
    answer(
      "prb-twt-m4",
      "A two-way table: Male/Pass = 22, Male/Fail = 8, Female/Pass = 24, Female/Fail = 6. Grand total = 60. Find P(pass) as a fraction in simplest form.",
      "P(\\text{pass})=\\dfrac{22+24}{60}",
      "23/30",
      "Pass column total = 22 + 24 = 46. P(pass) = 46/60 = 23/30.",
      ["46/60", "23 / 30"]
    ),
    answer(
      "prb-twt-m5",
      "Using the same table (Female row total = 30, Female/Pass = 24), find P(pass | female) as a fraction in simplest form.",
      "P(\\text{pass}\\mid\\text{female})=\\dfrac{24}{30}",
      "4/5",
      "Restrict to Female row: 24 out of 30. P(pass | female) = 24/30 = 4/5.",
      ["24/30", "4 / 5"]
    ),
    answer(
      "prb-twt-m6",
      "Using the same table (Male row total = 30, Male/Pass = 22), find P(pass | male) as a fraction in simplest form.",
      "P(\\text{pass}\\mid\\text{male})=\\dfrac{22}{30}",
      "11/15",
      "Restrict to Male row: 22 out of 30. P(pass | male) = 22/30 = 11/15.",
      ["22/30", "11 / 15"]
    ),
    choice(
      "prb-twt-m7",
      "A table shows P(pass) = 23/30 ≈ 0.767. P(pass | female) = 4/5 = 0.8. Are gender and pass/fail independent?",
      "B",
      [
        "Yes, because P(pass | female) is close to P(pass).",
        "No, because P(pass | female) ≠ P(pass).",
        "Yes, because both probabilities are greater than 0.5.",
        "Cannot be determined from a two-way table.",
      ],
      "For independence, P(pass | female) must equal P(pass). Since 4/5 ≠ 23/30, the events are not independent."
    ),
    answer(
      "prb-twt-m8",
      "A two-way table: City/Car = 30, City/Train = 20, Country/Car = 40, Country/Train = 10. Grand total = 100. Find P(country and car) as a decimal.",
      "P(\\text{country and car})=\\dfrac{40}{100}",
      "0.4",
      "P(country and car) = 40/100 = 0.4.",
      [".4", "40/100"]
    ),
    answer(
      "prb-twt-m9",
      "Using the same table (Country row total = 50, Country/Car = 40), find P(car | country) as a fraction in simplest form.",
      "P(\\text{car}\\mid\\text{country})=\\dfrac{40}{50}",
      "4/5",
      "Restrict to Country row: 40 out of 50. P(car | country) = 40/50 = 4/5.",
      ["40/50", "4 / 5"]
    ),
    choice(
      "prb-twt-m10",
      "Which calculation gives P(train | city) from a two-way table?",
      "A",
      [
        "(city and train cell) ÷ (city row total)",
        "(city and train cell) ÷ (grand total)",
        "(train column total) ÷ (grand total)",
        "(city row total) ÷ (train column total)",
      ],
      "Conditional probability P(train | city) restricts to the City row. Divide the city-and-train cell by the city row total."
    ),
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 — Conditional Probability
// ---------------------------------------------------------------------------

const conditionalProbability: LessonContent = {
  description:
    "Apply the formal conditional probability formula P(A|B) = P(A∩B)/P(B) to problems involving Venn diagrams, two-way tables, and sequential events.",
  learningIntention:
    "Understand and apply P(A|B) = P(A∩B)/P(B) to calculate conditional probabilities and determine whether two events are independent.",
  successCriteria: [
    "State and apply the formula P(A|B) = P(A∩B) / P(B).",
    "Interpret P(A|B) as restricting the sample space to outcomes where B has occurred.",
    "Use the multiplication rule P(A∩B) = P(A|B) × P(B) to find joint probabilities.",
    "Determine independence by checking whether P(A|B) = P(A).",
    "Calculate P(A|B) from a Venn diagram, two-way table, or sequential sampling problem.",
  ],
  teaching: {
    paragraphs: [
      "P(A|B) reads 'the probability of A given B'. It restricts the sample space to only those outcomes where B has occurred, then asks what fraction of those outcomes also belong to A. The formula is P(A|B) = P(A∩B) / P(B). The denominator P(B) becomes the new total, and the numerator P(A∩B) is the part of B that is also in A.",
      "Think of P(A|B) as zooming in on B. Once we know B occurred, the rest of the sample space is irrelevant. Within B, we count how many outcomes also satisfy A. So P(A|B) = n(A and B) / n(B). This is why P(A|B) and P(B|A) are different: they zoom in on different events.",
      "If P(A|B) = P(A), then knowing B occurred gives no information about A — the events are independent. Equivalently, A and B are independent when P(A∩B) = P(A) × P(B). If these are not equal, the events are dependent.",
      "The multiplication rule rearranges the conditional probability formula: P(A∩B) = P(A|B) × P(B). This is useful when you know a conditional probability and want to find the joint probability. For sequential experiments (drawing without replacement), the second draw is conditional on the first.",
    ],
    latexBlocks: [
      "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
      "P(A\\cap B)=P(A\\mid B)\\times P(B)",
      "\\text{independent: }P(A\\mid B)=P(A)",
    ],
  },
  workedExamples: [
    {
      title: "Apply the conditional probability formula",
      questionLatex:
        "\\text{P(A) = 0.4, P(B) = 0.5, P(A}\\cap\\text{B) = 0.2.}\\\\\\text{Find P(A|B). Are A and B independent?}",
      steps: [
        {
          explanation: "Apply the formula P(A|B) = P(A∩B) / P(B).",
          latex: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{0.2}{0.5}=0.4",
        },
        {
          explanation: "Compare P(A|B) with P(A). If they are equal, A and B are independent.",
          latex: "P(A\\mid B)=0.4=P(A)\\Rightarrow\\text{A and B are independent.}",
        },
      ],
      finalAnswerLatex: "P(A\\mid B)=0.4.\\;\\text{Since }P(A\\mid B)=P(A)\\text{, A and B are independent.}",
    },
    {
      title: "Find P(A|B) from a Venn diagram",
      questionLatex:
        "\\text{A Venn diagram of 30 people shows: A only = 8, B only = 10, A}\\cap\\text{B = 7, neither = 5.}\\\\\\text{Find P(A|B).}",
      vennDiagram: {
        description:
          "Venn diagram of 30 people. A only = 8, intersection = 7, B only = 10, neither = 5.",
        setALabel: "A",
        setBLabel: "B",
        aOnly: 8,
        intersection: 7,
        bOnly: 10,
        neither: 5,
        total: 30,
        showCounts: true,
      },
      steps: [
        {
          explanation: "n(B) = B only + A∩B = 10 + 7 = 17. This is the new sample space.",
          latex: "n(B)=17",
        },
        {
          explanation: "n(A∩B) = 7. Within B, 7 people also belong to A.",
          latex: "P(A\\mid B)=\\frac{n(A\\cap B)}{n(B)}=\\frac{7}{17}",
        },
      ],
      finalAnswerLatex: "P(A\\mid B)=\\dfrac{7}{17}",
    },
    {
      title: "Conditional probability with sequential sampling",
      questionLatex:
        "\\text{A bag contains 3 red and 5 blue marbles (8 total). One marble is drawn}\\\\\\text{and it is red. It is NOT replaced. Find P(red on 2nd draw | red on 1st draw).}",
      steps: [
        {
          explanation:
            "After drawing one red marble without replacement, 7 marbles remain: 2 red and 5 blue.",
          latex: "\\text{Remaining: 7 marbles, 2 red, 5 blue}",
        },
        {
          explanation: "Given that the first draw was red, the second draw comes from the 7 remaining marbles, 2 of which are red.",
          latex: "P(\\text{red}_2\\mid\\text{red}_1)=\\frac{2}{7}",
        },
      ],
      finalAnswerLatex: "P(\\text{red}_2\\mid\\text{red}_1)=\\dfrac{2}{7}",
    },
  ] as WorkedExample[],
  guidedPractice: [
    choice(
      "prb-con-g1",
      "Which formula correctly defines conditional probability?",
      "A",
      [
        "$P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}$",
        "$P(A\\mid B)=P(A)\\times P(B)$",
        "$P(A\\mid B)=P(A)+P(B)$",
        "$P(A\\mid B)=\\dfrac{P(A)}{P(B)}$",
      ],
      "The conditional probability formula is P(A|B) = P(A∩B) / P(B). It divides the joint probability by the probability of the given event B."
    ),
    answer(
      "prb-con-g2",
      "P(A∩B) = 0.12 and P(B) = 0.4. Find P(A|B).",
      "P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}",
      "0.3",
      "P(A|B) = 0.12 / 0.4 = 0.3.",
      [".3", "3/10"]
    ),
    answer(
      "prb-con-g3",
      "P(A|B) = 0.6 and P(B) = 0.5. Find P(A∩B) using the multiplication rule.",
      "P(A\\cap B)=P(A\\mid B)\\times P(B)",
      "0.3",
      "P(A∩B) = 0.6 × 0.5 = 0.3.",
      [".3", "3/10"]
    ),
    choice(
      "prb-con-g4",
      "P(A) = 0.3 and P(A|B) = 0.3. What can we conclude?",
      "C",
      [
        "A and B are mutually exclusive.",
        "A and B are dependent.",
        "A and B are independent.",
        "P(B|A) = 0.",
      ],
      "If P(A|B) = P(A), knowing B gives no new information about A. The events are independent."
    ),
  ],
  independentPractice: [
    answer(
      "prb-con-i1",
      "P(A∩B) = 0.15 and P(B) = 0.25. Find P(A|B).",
      "P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}",
      "0.6",
      "P(A|B) = 0.15 / 0.25 = 0.6.",
      [".6", "3/5"]
    ),
    answer(
      "prb-con-i2",
      "A Venn diagram of 40 people shows: A only = 10, B only = 15, A∩B = 5, neither = 10. Find P(B|A) as a fraction in simplest form.",
      "P(B\\mid A)=\\dfrac{n(A\\cap B)}{n(A)}",
      "1/3",
      "n(A) = 10 + 5 = 15. P(B|A) = 5/15 = 1/3.",
      ["5/15", "1 / 3"]
    ),
    answer(
      "prb-con-i3",
      "A bag has 4 green and 6 yellow marbles (10 total). A green marble is drawn and not replaced. Find P(green on 2nd draw | green on 1st draw) as a fraction in simplest form.",
      "P(G_2\\mid G_1)=\\dfrac{3}{9}",
      "1/3",
      "After drawing one green, 9 marbles remain: 3 green and 6 yellow. P(G₂|G₁) = 3/9 = 1/3.",
      ["3/9", "1 / 3"]
    ),
    answer(
      "prb-con-i4",
      "P(A) = 0.5, P(B) = 0.6, P(A∩B) = 0.3. Find P(A|B). Are A and B independent? Enter just the value of P(A|B).",
      "P(A\\mid B)=\\dfrac{0.3}{0.6}",
      "0.5",
      "P(A|B) = 0.3 / 0.6 = 0.5. Since P(A|B) = P(A) = 0.5, A and B are independent.",
      [".5", "1/2"]
    ),
    choice(
      "prb-con-i5",
      "P(A|B) = 0.4 and P(A) = 0.6. Which statement is correct?",
      "B",
      [
        "A and B are independent because both probabilities are less than 1.",
        "A and B are dependent because P(A|B) ≠ P(A).",
        "A and B are mutually exclusive.",
        "P(B|A) = 0.4.",
      ],
      "P(A|B) ≠ P(A) means knowing B changes the probability of A. The events are dependent."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing P(A|B) with P(B|A): assuming they are equal.",
      fix: "P(A|B) and P(B|A) are generally different. P(A|B) zooms into B; P(B|A) zooms into A.",
    },
    {
      mistake: "Using the grand total instead of n(B) in the denominator when computing P(A|B).",
      fix: "The denominator of P(A|B) is P(B) (or n(B)), not the grand total. We restrict to B.",
    },
    {
      mistake: "Multiplying P(A) and P(B) to find P(A∩B) when the events are dependent.",
      fix: "P(A∩B) = P(A) × P(B) only when A and B are independent. Use P(A|B) × P(B) in general.",
    },
    {
      mistake: "Confusing 'mutually exclusive' with 'independent'.",
      fix: "Mutually exclusive means P(A∩B) = 0 — they cannot both occur. Independent means P(A|B) = P(A) — they do not influence each other.",
    },
  ],
  masteryQuiz: [
    answer(
      "prb-con-m1",
      "P(A∩B) = 0.18 and P(B) = 0.45. Find P(A|B). Give your answer as a decimal.",
      "P(A\\mid B)=\\dfrac{0.18}{0.45}",
      "0.4",
      "P(A|B) = 0.18 / 0.45 = 0.4.",
      [".4", "2/5"]
    ),
    answer(
      "prb-con-m2",
      "A Venn diagram of 30 people: A only = 8, B only = 10, A∩B = 7, neither = 5. Find P(A|B) as a fraction in simplest form.",
      "P(A\\mid B)=\\dfrac{n(A\\cap B)}{n(B)}=\\dfrac{7}{17}",
      "7/17",
      "n(B) = 10 + 7 = 17. P(A|B) = 7/17.",
      ["7 / 17"]
    ),
    choice(
      "prb-con-m3",
      "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Are A and B independent?",
      "A",
      [
        "Yes, because P(A|B) = P(A∩B)/P(B) = 0.4 = P(A).",
        "No, because P(A∩B) ≠ 0.",
        "No, because P(A) ≠ P(B).",
        "Yes, because P(A) + P(B) = 0.9.",
      ],
      "P(A|B) = 0.2/0.5 = 0.4 = P(A). Since P(A|B) = P(A), the events are independent."
    ),
    answer(
      "prb-con-m4",
      "P(A|B) = 0.7 and P(B) = 0.4. Find P(A∩B).",
      "P(A\\cap B)=P(A\\mid B)\\times P(B)",
      "0.28",
      "P(A∩B) = 0.7 × 0.4 = 0.28.",
      [".28"]
    ),
    answer(
      "prb-con-m5",
      "A bag has 5 red and 3 blue marbles. One is drawn (red) and not replaced. Find P(red on 2nd | red on 1st) as a fraction in simplest form.",
      "P(R_2\\mid R_1)=\\dfrac{4}{7}",
      "4/7",
      "After removing one red, 7 remain: 4 red and 3 blue. P(R₂|R₁) = 4/7.",
      ["4 / 7"]
    ),
    answer(
      "prb-con-m6",
      "From a two-way table: Study/Pass = 42, Study/Fail = 8, No-study/Pass = 15, No-study/Fail = 35. Grand total = 100. Study row total = 50. Find P(pass | study) as a fraction in simplest form.",
      "P(\\text{pass}\\mid\\text{study})=\\dfrac{42}{50}",
      "21/25",
      "Restrict to Study row: 42 out of 50. P(pass | study) = 42/50 = 21/25.",
      ["42/50", "21 / 25"]
    ),
    choice(
      "prb-con-m7",
      "P(pass) = 57/100 = 0.57 and P(pass | study) = 21/25 = 0.84. What can we conclude?",
      "B",
      [
        "Studying and passing are independent.",
        "Studying and passing are dependent — studying increases the probability of passing.",
        "Studying and passing are mutually exclusive.",
        "P(study | pass) = 0.57.",
      ],
      "P(pass | study) = 0.84 ≠ P(pass) = 0.57. Knowing a student studied changes the probability of passing. The events are dependent."
    ),
    answer(
      "prb-con-m8",
      "P(A∩B) = 3/20 and P(A) = 3/5. Find P(B|A) as a fraction in simplest form.",
      "P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}",
      "1/4",
      "P(B|A) = (3/20) ÷ (3/5) = (3/20) × (5/3) = 15/60 = 1/4.",
      ["15/60", "1 / 4"]
    ),
    answer(
      "prb-con-m9",
      "A Venn diagram of 50 people: A only = 15, B only = 20, A∩B = 10, neither = 5. Find P(B|A) as a fraction in simplest form.",
      "P(B\\mid A)=\\dfrac{n(A\\cap B)}{n(A)}",
      "2/5",
      "n(A) = 15 + 10 = 25. P(B|A) = 10/25 = 2/5.",
      ["10/25", "2 / 5"]
    ),
    choice(
      "prb-con-m10",
      "Two events A and B have P(A) = 0.6, P(B) = 0.5, and P(A∩B) = 0.3. Find P(A|B).",
      "C",
      ["0.5", "0.18", "0.6", "0.3"],
      "P(A|B) = P(A∩B) / P(B) = 0.3 / 0.5 = 0.6. Since P(A|B) = P(A) = 0.6, A and B are also independent."
    ),
  ],
};

// ---------------------------------------------------------------------------
// Lesson registry and override
// ---------------------------------------------------------------------------

const lessons: Record<string, LessonContent> = {
  "venn-diagrams": vennDiagrams,
  "two-way-tables": twoWayTables,
  "conditional-probability": conditionalProbability,
};

export function year9ProbabilityBLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced"].includes(course.slug) ||
    unit.slug !== "probability-b"
  ) {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Probability and Statistics",
    masteryPassMark: 0.8,
    ...content,
  };
}
