import type { ExamPaper } from "./types";

// Year 12 Mathematics Standard 1 — mini practice exam (Paper 1).
// Every answer SymPy-verified. Standard 1 uses the regular Band scale.
// Covers algebra/linear models, financial mathematics, right-angle
// trigonometry, rates, scale drawings, statistics and networks.
const REMEDIATION = "/course/year-12-standard-1";

export const year12Standard1Paper1: ExamPaper = {
  id: "y12-std1-paper-1",
  courseSlug: "year-12-standard-1",
  courseTitle: "Year 12 Mathematics Standard 1",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Standard 1 paper across compound interest, right-angle trigonometry, rates, scale drawings, simultaneous models, depreciation, statistics and networks. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 22,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y12s1-p1-q1",
          prompt:
            "$3000 is invested at 5% per annum compounded annually. What is the value after 2 years?",
          latex: "A = 3000(1.05)^2",
          marks: 1,
          difficulty: 3,
          topicSlug: "investment-compound-interest",
          topicTitle: "Compound interest",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$3307.50" },
            { label: "B", text: "$3300.00" },
            { label: "C", text: "$3150.00" },
            { label: "D", text: "$3315.00" },
          ],
          answer: "A",
          explanation: "$A = 3000(1.05)^2 = 3307.50$.",
        },
        {
          id: "y12s1-p1-q2",
          prompt:
            "In a right-angled triangle the hypotenuse is 10 cm and one angle is 30°. Find the side opposite the 30° angle.",
          latex: "\\text{opposite} = \\text{hyp} \\times \\sin 30°",
          marks: 1,
          difficulty: 3,
          topicSlug: "right-angle-trigonometry",
          topicTitle: "Right-angle trigonometry",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "5 cm" },
            { label: "B", text: "8.66 cm" },
            { label: "C", text: "10 cm" },
            { label: "D", text: "20 cm" },
          ],
          answer: "A",
          explanation: "$\\text{opp} = 10\\sin 30° = 10 \\times 0.5 = 5$ cm.",
        },
        {
          id: "y12s1-p1-q3",
          prompt:
            "A car uses fuel at 8 litres per 100 km. How much fuel is needed for a 250 km trip?",
          latex: "\\text{fuel} = \\dfrac{8}{100} \\times \\text{distance}",
          marks: 1,
          difficulty: 2,
          topicSlug: "rates-practical-problems",
          topicTitle: "Rates",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "20 L" },
            { label: "B", text: "31.25 L" },
            { label: "C", text: "2000 L" },
            { label: "D", text: "16 L" },
          ],
          answer: "A",
          explanation: "$\\dfrac{8}{100} \\times 250 = 20$ litres.",
        },
        {
          id: "y12s1-p1-q4",
          prompt: "Find the mean of the data set: 4, 6, 8, 10, 12.",
          latex: "\\bar{x} = \\dfrac{\\sum x}{n}",
          marks: 1,
          difficulty: 2,
          topicSlug: "data-displays-summary-statistics",
          topicTitle: "Summary statistics",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "8" },
            { label: "B", text: "10" },
            { label: "C", text: "40" },
            { label: "D", text: "6" },
          ],
          answer: "A",
          explanation: "$\\bar{x} = \\dfrac{4+6+8+10+12}{5} = \\dfrac{40}{5} = 8$.",
        },
        {
          id: "y12s1-p1-q5",
          prompt:
            "A floor plan uses a scale of 1:200. A wall is 4 cm long on the plan. What is the real length of the wall?",
          latex: "\\text{scale }1:200",
          marks: 1,
          difficulty: 2,
          topicSlug: "scale-drawings-and-plans",
          topicTitle: "Scale drawings",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "0.8 m" },
            { label: "B", text: "2 m" },
            { label: "C", text: "8 m" },
            { label: "D", text: "80 m" },
          ],
          answer: "C",
          explanation: "4 cm on the plan represents 4 x 200 = 800 cm, which is 8 m.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y12s1-p1-q6",
          prompt:
            "Two phone plans are compared. Plan A costs $20 plus $0.50 per GB of data (n GB). Plan B is a flat $35.",
          latex: "A = 20 + 0.5n,\\quad B = 35",
          marks: 3,
          difficulty: 5,
          topicSlug: "simultaneous-equations-context",
          topicTitle: "Simultaneous equations in context",
          remediationHref: REMEDIATION,
          explanation:
            "Equal cost when $20 + 0.5n = 35 \\Rightarrow n = 30$ GB, where both cost $35. For 50 GB, Plan A costs $20 + 0.5(50) = 45$, which is more than Plan B's $35, so Plan B is cheaper.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "At how many GB do the two plans cost the same?",
              marks: 1,
              answer: "30",
              acceptedAnswers: ["30 GB", "n=30"],
              explanation: "$20 + 0.5n = 35 \\Rightarrow 0.5n = 15 \\Rightarrow n = 30$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "What is that equal cost, in dollars?",
              marks: 1,
              answer: "35",
              acceptedAnswers: ["$35"],
              explanation: "Both plans cost $35 at 30 GB.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "For a user needing 50 GB, which plan is cheaper — A or B?",
              marks: 1,
              answer: "B",
              acceptedAnswers: ["plan b", "B (Plan B)"],
              explanation:
                "Plan A: $20 + 0.5(50) = 45$; Plan B: $35. Plan B is cheaper.",
            },
          ],
        },
        {
          id: "y12s1-p1-q7",
          prompt:
            "A wheelchair ramp rises a vertical height of 1.5 m over a horizontal distance of 6 m.",
          latex: "\\tan\\theta = \\dfrac{\\text{rise}}{\\text{run}}",
          marks: 3,
          difficulty: 5,
          topicSlug: "right-angle-trig-applications",
          topicTitle: "Right-angle trigonometry — applications",
          remediationHref: REMEDIATION,
          explanation:
            "Angle $= \\tan^{-1}\\left(\\tfrac{1.5}{6}\\right) \\approx 14°$. Ramp length $= \\sqrt{1.5^2 + 6^2} \\approx 6.18$ m. Since 14° exceeds a 10° limit, the ramp would not comply.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "Find the angle the ramp makes with the horizontal, to the nearest degree.",
              marks: 1,
              answer: "14",
              acceptedAnswers: ["14°", "14 degrees"],
              explanation: "$\\tan^{-1}\\left(\\tfrac{1.5}{6}\\right) \\approx 14°$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the length of the ramp surface, to 2 decimal places (m).",
              marks: 1,
              answer: "6.18",
              acceptedAnswers: ["6.18 m", "6.2"],
              explanation: "$\\sqrt{1.5^2 + 6^2} = \\sqrt{38.25} \\approx 6.18$ m.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "If the maximum allowed angle is 10°, does this ramp comply? Answer yes or no.",
              marks: 1,
              answer: "no",
              acceptedAnswers: ["no it does not comply"],
              explanation: "14° is greater than 10°, so it does not comply.",
            },
          ],
        },
        {
          id: "y12s1-p1-q8",
          prompt:
            "A car bought for $30 000 depreciates by a fixed $4000 each year (straight-line).",
          latex: "S = V_0 - Dn",
          marks: 3,
          difficulty: 4,
          topicSlug: "depreciation-loans",
          topicTitle: "Straight-line depreciation",
          remediationHref: REMEDIATION,
          explanation:
            "After 1 year: $30000 - 4000 = 26000$. After 5 years: $30000 - 5(4000) = 10000$. Value reaches $6000 when $30000 - 4000n = 6000 \\Rightarrow n = 6$ years.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the value after 1 year, in dollars.",
              marks: 1,
              answer: "26000",
              acceptedAnswers: ["$26000", "26,000"],
              explanation: "$30000 - 4000 = 26000$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the value after 5 years, in dollars.",
              marks: 1,
              answer: "10000",
              acceptedAnswers: ["$10000", "10,000"],
              explanation: "$30000 - 5(4000) = 10000$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "After how many years is the car worth $6000?",
              marks: 1,
              answer: "6",
              acceptedAnswers: ["6 years"],
              explanation: "$30000 - 4000n = 6000 \\Rightarrow n = 6$.",
            },
          ],
        },
        {
          id: "y12s1-p1-q9",
          prompt: "Consider the data set: 5, 8, 8, 10, 14.",
          latex: "5,\\ 8,\\ 8,\\ 10,\\ 14",
          marks: 3,
          difficulty: 4,
          topicSlug: "data-displays-summary-statistics",
          topicTitle: "Summary statistics",
          remediationHref: REMEDIATION,
          explanation:
            "Mean $= \\dfrac{45}{5} = 9$. The median (middle value) is 8. The mode (most frequent) is 8.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the mean.",
              marks: 1,
              answer: "9",
              explanation: "$\\dfrac{5+8+8+10+14}{5} = \\dfrac{45}{5} = 9$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the median.",
              marks: 1,
              answer: "8",
              explanation: "The middle (3rd) value of 5 ordered values is 8.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the mode.",
              marks: 1,
              answer: "8",
              explanation: "8 occurs twice — more than any other value.",
            },
          ],
        },
        {
          id: "y12s1-p1-q10",
          prompt:
            "A delivery network has weighted edges AB = 6, AC = 4, BC = 3, BD = 5 and CD = 7.",
          latex: "AB=6,\\ AC=4,\\ BC=3,\\ BD=5,\\ CD=7",
          marks: 3,
          difficulty: 5,
          topicSlug: "shortest-paths-minimum-spanning-trees",
          topicTitle: "Weighted networks and shortest paths",
          remediationHref: REMEDIATION,
          explanation:
            "Route A-B-D has total 11. Route A-C-D has total 11. Route A-C-B-D has total 12, so the shortest route length from A to D is 11.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the total weight of route A-B-D.",
              marks: 1,
              answer: "11",
              explanation: "Route A-B-D uses AB and BD, so the total is 6 + 5 = 11.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the total weight of route A-C-D.",
              marks: 1,
              answer: "11",
              explanation: "Route A-C-D uses AC and CD, so the total is 4 + 7 = 11.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "What is the shortest route length from A to D?",
              marks: 1,
              answer: "11",
              explanation:
                "A-B-D and A-C-D both have total 11; A-C-B-D has total 12, so the shortest route length is 11.",
            },
          ],
        },
      ],
    },
  ],
};
