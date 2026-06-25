import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 7 Mathematics",
  units: [
    { slug: "integers", title: "Computation with Integers", startHref: "/course/year-7-mathematics/integers" },
    { slug: "fractions", title: "Understanding Fractions and Decimals", startHref: "/course/year-7-mathematics/fractions" },
    { slug: "algebraic-techniques", title: "Algebraic Techniques", startHref: "/course/year-7-mathematics/algebraic-techniques" },
    { slug: "percentages", title: "Understanding Percentages", startHref: "/course/year-7-mathematics/percentages" },
    { slug: "equations", title: "Equations", startHref: "/course/year-7-mathematics/equations" },
    { slug: "indices", title: "Indices", startHref: "/course/year-7-mathematics/indices" },
    { slug: "perimeter", title: "Perimeter of Plane Shapes", startHref: "/course/year-7-mathematics/perimeter" },
    { slug: "area", title: "Areas of Triangles and Quadrilaterals", startHref: "/course/year-7-mathematics/area" },
    { slug: "angles", title: "Angle Relationships", startHref: "/course/year-7-mathematics/angles" },
    { slug: "data", title: "Data Classification and Visualisation", startHref: "/course/year-7-mathematics/data" },
  ],
  questions: [
    {
      id: "y7-int-order-of-operations",
      difficulty: 3,
      targetMisconception: "Works left to right instead of doing multiplication before addition.",
      unitSlug: "integers",
      prompt: "Evaluate \\(3+2\\times(-5)\\).",
      choices: [
        { label: "A", text: "\\(-7\\)" },
        { label: "B", text: "\\(-25\\)" },
        { label: "C", text: "\\(13\\)" },
        { label: "D", text: "\\(-10\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "Multiplication comes before addition: \\(2\\times(-5)=-10\\), then \\(3+(-10)=-7\\). Option B comes from adding \\(3+2=5\\) first and then multiplying by \\(-5\\), which breaks the order of operations.",
    },
    {
      id: "y7-fr-add-unlike",
      difficulty: 3,
      targetMisconception: "Adds numerators and denominators instead of using a common denominator.",
      unitSlug: "fractions",
      prompt: "Calculate \\(\\dfrac{2}{3}+\\dfrac{1}{6}\\).",
      choices: [
        { label: "A", text: "\\(\\dfrac{5}{6}\\)" },
        { label: "B", text: "\\(\\dfrac{3}{9}\\)" },
        { label: "C", text: "\\(\\dfrac{2}{9}\\)" },
        { label: "D", text: "\\(\\dfrac{1}{2}\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "Use a common denominator: \\(\\dfrac{2}{3}=\\dfrac{4}{6}\\), so \\(\\dfrac{4}{6}+\\dfrac{1}{6}=\\dfrac{5}{6}\\). Option B comes from adding across the top and bottom, \\(\\dfrac{2+1}{3+6}\\), which is not how fractions add.",
    },
    {
      id: "y7-alg-unlike-terms",
      difficulty: 3,
      targetMisconception: "Combines terms with different powers as though they were like terms.",
      unitSlug: "algebraic-techniques",
      prompt: "Simplify \\(5a+3a^2\\) as far as possible.",
      choices: [
        { label: "A", text: "It is already simplest: \\(5a+3a^2\\)" },
        { label: "B", text: "\\(8a^2\\)" },
        { label: "C", text: "\\(8a\\)" },
        { label: "D", text: "\\(8a^3\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "\\(5a\\) and \\(3a^2\\) are not like terms because the powers of \\(a\\) differ, so they cannot be combined. The expression is already in simplest form. Options B-D wrongly add the coefficients as if the terms matched.",
    },
    {
      id: "y7-pc-discount-percentage",
      difficulty: 3,
      targetMisconception: "Reports the dollar discount as the percentage, or compares it with the new price instead of the original.",
      unitSlug: "percentages",
      prompt: "A game is discounted from $80 to $68. What percentage discount was applied?",
      choices: [
        { label: "A", text: "\\(15\\%\\)" },
        { label: "B", text: "\\(12\\%\\)" },
        { label: "C", text: "\\(17.6\\%\\)" },
        { label: "D", text: "\\(85\\%\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "The discount is \\(80-68=12\\) dollars. Compare it with the original price: \\(\\dfrac{12}{80}=0.15=15\\%\\). Option B just restates the dollar amount; option C divides by the new price \\(68\\) instead of the original \\(80\\).",
    },
    {
      id: "y7-eq-solve-two-step",
      difficulty: 3,
      targetMisconception: "Adds instead of subtracting the constant, or stops before dividing by the coefficient.",
      unitSlug: "equations",
      prompt: "Solve \\(3x+5=23\\).",
      choices: [
        { label: "A", text: "\\(x=6\\)" },
        { label: "B", text: "\\(x=18\\)" },
        { label: "C", text: "\\(x=\\dfrac{28}{3}\\)" },
        { label: "D", text: "\\(x=14\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "Undo the addition first: \\(3x=23-5=18\\). Then divide by the coefficient: \\(x=18\\div3=6\\). Option B stops at \\(3x=18\\) without dividing; option C adds \\(5\\) instead of subtracting it.",
    },
    {
      id: "y7-idx-product-rule",
      difficulty: 3,
      targetMisconception: "Multiplies the indices, or operates on the base, instead of adding the indices when multiplying powers of the same base.",
      unitSlug: "indices",
      prompt: "Simplify \\(2^3\\times2^4\\) as a single power.",
      choices: [
        { label: "A", text: "\\(2^7\\)" },
        { label: "B", text: "\\(2^{12}\\)" },
        { label: "C", text: "\\(4^7\\)" },
        { label: "D", text: "\\(4^{12}\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "When multiplying powers of the same base, add the indices: \\(2^{3+4}=2^7\\). Option B multiplies the indices (\\(3\\times4\\)); options C and D also change the base from \\(2\\) to \\(4\\), which the product rule never does.",
    },
    {
      id: "y7-pe-rectangle-width",
      difficulty: 3,
      targetMisconception: "Subtracts one length from the full perimeter without halving, or confuses perimeter with area.",
      unitSlug: "perimeter",
      prompt: "A rectangular photo has perimeter \\(54\\) cm and length \\(17\\) cm. What is its width?",
      choices: [
        { label: "A", text: "\\(10\\) cm" },
        { label: "B", text: "\\(37\\) cm" },
        { label: "C", text: "\\(20\\) cm" },
        { label: "D", text: "\\(27\\) cm" },
      ],
      correctAnswer: "A",
      explanation:
        "Half the perimeter is one length plus one width: \\(54\\div2=27\\). So the width is \\(27-17=10\\) cm. Option B subtracts the length from the whole perimeter without halving first.",
    },
    {
      id: "y7-ar-triangle-half",
      difficulty: 3,
      targetMisconception: "Multiplies base by height without halving, applying the rectangle rule to a triangle.",
      unitSlug: "area",
      prompt: "A triangle has base \\(10\\) cm and perpendicular height \\(6\\) cm. What is its area?",
      choices: [
        { label: "A", text: "\\(30\\text{ cm}^2\\)" },
        { label: "B", text: "\\(60\\text{ cm}^2\\)" },
        { label: "C", text: "\\(16\\text{ cm}^2\\)" },
        { label: "D", text: "\\(32\\text{ cm}^2\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "A triangle is half of a rectangle with the same base and height: \\(\\dfrac12\\times10\\times6=30\\text{ cm}^2\\). Option B forgets the \\(\\dfrac12\\); option C adds the base and height instead of multiplying.",
    },
    {
      id: "y7-an-triangle-sum",
      difficulty: 3,
      targetMisconception: "Uses 360 degrees for the angle sum of a triangle instead of 180 degrees.",
      unitSlug: "angles",
      prompt: "A triangle has two angles measuring \\(50^\\circ\\) and \\(60^\\circ\\). What is the size of the third angle?",
      choices: [
        { label: "A", text: "\\(70^\\circ\\)" },
        { label: "B", text: "\\(250^\\circ\\)" },
        { label: "C", text: "\\(110^\\circ\\)" },
        { label: "D", text: "\\(80^\\circ\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "The angles in a triangle add to \\(180^\\circ\\): \\(180^\\circ-50^\\circ-60^\\circ=70^\\circ\\). Option B uses \\(360^\\circ\\) by mistake; option C stops after subtracting only one of the two known angles.",
    },
    {
      id: "y7-da-even-median",
      difficulty: 3,
      targetMisconception: "With an even number of values, picks a single middle value instead of averaging the two middle values.",
      unitSlug: "data",
      prompt: "Find the median of the data set \\(3,\\ 7,\\ 8,\\ 12\\).",
      choices: [
        { label: "A", text: "\\(7.5\\)" },
        { label: "B", text: "\\(8\\)" },
        { label: "C", text: "\\(7\\)" },
        { label: "D", text: "\\(10\\)" },
      ],
      correctAnswer: "A",
      explanation:
        "With four values, the median is the average of the two middle ones: \\(\\dfrac{7+8}{2}=7.5\\). Options B and C each pick just one of the middle values rather than averaging them.",
    },
  ],
};
