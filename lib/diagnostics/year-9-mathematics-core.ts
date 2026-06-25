import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 9 Mathematics Core",

  units: [
    {
      slug: "properties-geometrical-figures",
      title: "Properties of Geometrical Figures",
      startHref: "/course/year-9-mathematics-core/properties-geometrical-figures",
    },
    {
      slug: "pythagoras-trigonometry",
      title: "Right-Angled Triangles: Pythagoras and Trigonometry",
      startHref: "/course/year-9-mathematics-core/pythagoras-trigonometry",
    },
    {
      slug: "length-area-surface-area-volume",
      title: "Length, Area, Surface Area and Volume",
      startHref: "/course/year-9-mathematics-core/length-area-surface-area-volume",
    },
    {
      slug: "indices-surds",
      title: "Indices and Surds",
      startHref: "/course/year-9-mathematics-core/indices-surds",
    },
    {
      slug: "computation-financial-maths",
      title: "Computation and Financial Maths",
      startHref: "/course/year-9-mathematics-core/computation-financial-maths",
    },
    {
      slug: "linear-relationships",
      title: "Linear Relationships",
      startHref: "/course/year-9-mathematics-core/linear-relationships",
    },
    {
      slug: "probability-data-analysis",
      title: "Probability and Single Variable Data Analysis",
      startHref: "/course/year-9-mathematics-core/probability-data-analysis",
    },
  ],

  questions: [
    {
      id: "y9core-d5-similar-area-ratio",
      difficulty: 5,
      targetMisconception: "Scales area by the linear ratio instead of squaring the scale factor.",
      unitSlug: "properties-geometrical-figures",
      assessedUnitSlugs: ["length-area-surface-area-volume"],
      prompt:
        "Two similar rectangles have a length ratio of $1:3$ (smaller to larger). The smaller rectangle has area $6\\text{ cm}^2$. Which statement is correct?",
      choices: [
        { label: "A", text: "The larger rectangle has area $54\\text{ cm}^2$, because area scales by the square of the length ratio." },
        { label: "B", text: "The larger rectangle has area $18\\text{ cm}^2$, because the side ratio applies directly to the area." },
        { label: "C", text: "The larger rectangle has area $162\\text{ cm}^2$, because volume rules apply and the ratio is cubed." },
        { label: "D", text: "The larger rectangle has area $9\\text{ cm}^2$, because only one dimension is scaled." },
      ],
      correctAnswer: "A",
      explanation:
        "Area scales by the square of the linear scale factor. The length ratio is $1:3$, so the area ratio is $1^2:3^2=1:9$. The larger area is $6\\times9=54\\text{ cm}^2$.",
    },
    {
      id: "y9core-d5-pythagoras-sum-error",
      difficulty: 5,
      targetMisconception: "Adds the squares of all known lengths when a shorter side is unknown, instead of subtracting.",
      unitSlug: "pythagoras-trigonometry",
      assessedUnitSlugs: ["properties-geometrical-figures"],
      prompt:
        "A $10$ m ladder leans against a vertical wall with its base $6$ m from the wall. A student writes the height as $\\sqrt{10^2+6^2}\\approx11.7$ m. Which statement is correct?",
      choices: [
        { label: "A", text: "The student is wrong; the height is $\\sqrt{10^2-6^2}=8$ m because the ladder is the hypotenuse." },
        { label: "B", text: "The student is correct; the height and base are the two legs, so their squares add." },
        { label: "C", text: "The student is wrong; the height is $10-6=4$ m." },
        { label: "D", text: "The student is wrong; the height is $\\sqrt{6^2-10^2}$, which gives an error because $6<10$." },
      ],
      correctAnswer: "A",
      explanation:
        "The ladder is the hypotenuse ($10$ m). To find the unknown shorter side: $h=\\sqrt{10^2-6^2}=\\sqrt{100-36}=\\sqrt{64}=8$ m. The student incorrectly added $6^2$ to $10^2$ rather than subtracting it.",
    },
    {
      id: "y9core-d5-trig-cos-ratio",
      difficulty: 5,
      targetMisconception: "Uses the sine ratio with the adjacent side and hypotenuse instead of the cosine ratio.",
      unitSlug: "pythagoras-trigonometry",
      assessedUnitSlugs: ["properties-geometrical-figures"],
      prompt:
        "In a right triangle, the angle $\\theta$ has an adjacent side of $5$ cm and a hypotenuse of $13$ cm. A student writes $\\theta=\\sin^{-1}\\!\\left(\\dfrac{5}{13}\\right)\\approx22.6^\\circ$. Which statement is correct?",
      choices: [
        { label: "A", text: "$\\theta=\\cos^{-1}\\!\\left(\\dfrac{5}{13}\\right)\\approx67.4^\\circ$, because the known sides are the adjacent and the hypotenuse." },
        { label: "B", text: "The student is correct because sine always uses the shorter available side over the hypotenuse." },
        { label: "C", text: "$\\theta=\\tan^{-1}\\!\\left(\\dfrac{5}{13}\\right)\\approx21.0^\\circ$, because tangent compares the two known sides." },
        { label: "D", text: "$\\theta=\\sin^{-1}\\!\\left(\\dfrac{13}{5}\\right)$, which is undefined." },
      ],
      correctAnswer: "A",
      explanation:
        "$\\cos\\theta=\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}=\\dfrac{5}{13}$, so $\\theta=\\cos^{-1}\\!\\left(\\dfrac{5}{13}\\right)\\approx67.4^\\circ$. The student used sine, which requires the opposite side over the hypotenuse.",
    },
    {
      id: "y9core-d5-cylinder-surface-area",
      difficulty: 5,
      targetMisconception: "Calculates the curved surface area only and omits the two circular ends.",
      unitSlug: "length-area-surface-area-volume",
      assessedUnitSlugs: ["indices-surds"],
      prompt:
        "A cylinder has radius $4$ cm and height $6$ cm. A student gives the total surface area as $2\\pi(4)(6)=48\\pi\\text{ cm}^2$. Which statement is correct?",
      choices: [
        { label: "A", text: "The total surface area is $80\\pi\\text{ cm}^2$ because the two circular ends must be added: $48\\pi+2\\pi(4^2)=48\\pi+32\\pi$." },
        { label: "B", text: "The student is correct; the curved surface is the only surface of a cylinder." },
        { label: "C", text: "The total surface area is $96\\pi\\text{ cm}^2$ because the diameter $8$ should replace the radius in the curved-surface formula." },
        { label: "D", text: "The total surface area is $24\\pi\\text{ cm}^2$ because the formula divides by $2$." },
      ],
      correctAnswer: "A",
      explanation:
        "Total surface area $= 2\\pi rh+2\\pi r^2=2\\pi(4)(6)+2\\pi(4^2)=48\\pi+32\\pi=80\\pi\\text{ cm}^2$. The student found only the curved surface area and forgot to include the two circular ends.",
    },
    {
      id: "y9core-d5-negative-index-decay",
      difficulty: 5,
      targetMisconception: "Treats a negative index as producing a negative multiplier rather than a reciprocal.",
      unitSlug: "indices-surds",
      assessedUnitSlugs: ["computation-financial-maths"],
      prompt:
        "A colony starts with $8000$ bacteria. Each hour, the count is multiplied by $2^{-1}$. Which statement about the count after $3$ hours is correct?",
      choices: [
        { label: "A", text: "The count is $1000$ because $8000\\times2^{-3}=8000\\div8$." },
        { label: "B", text: "The count is $-1000$ because the negative index makes the result negative." },
        { label: "C", text: "The count is $2000$ because $2^{-1}=\\tfrac{1}{2}$ is applied only twice in $3$ hours." },
        { label: "D", text: "The count is $64\\,000$ because $2^{-3}$ is treated as $2^3=8$." },
      ],
      correctAnswer: "A",
      explanation:
        "$2^{-1}=\\dfrac{1}{2}$, so after $3$ hours the count is $8000\\times\\left(\\dfrac{1}{2}\\right)^3=8000\\times\\dfrac{1}{8}=1000$. A negative index means take the reciprocal of the positive power; it does not make the result negative.",
    },
    {
      id: "y9core-d5-percentage-reverse",
      difficulty: 5,
      targetMisconception: "Recovers the original price by adding the discount percentage of the sale price instead of dividing by the multiplier.",
      unitSlug: "computation-financial-maths",
      assessedUnitSlugs: ["linear-relationships"],
      prompt:
        "A laptop costs $\\$1200$ after a $20\\%$ discount. Which statement correctly identifies the original price?",
      choices: [
        { label: "A", text: "The original price was $\\$1500$ because $1200\\div0.8=1500$." },
        { label: "B", text: "The original price was $\\$1440$ because $20\\%$ of $1200$ is $\\$240$, so add $\\$240$." },
        { label: "C", text: "The original price was $\\$960$ because a further $20\\%$ reduction gives the original." },
        { label: "D", text: "The original price was $\\$1000$ because $1200\\div1.2=1000$." },
      ],
      correctAnswer: "A",
      explanation:
        "A $20\\%$ discount means the sale price is $80\\%$ of the original. Dividing by $0.8$ reverses this: $\\$1200\\div0.8=\\$1500$. Adding $20\\%$ of the sale price (option B) uses the wrong base.",
    },
    {
      id: "y9core-d5-gradient-two-points",
      difficulty: 5,
      targetMisconception: "Computes the gradient correctly but substitutes incorrectly to find the y-intercept, or loses track of the sign.",
      unitSlug: "linear-relationships",
      assessedUnitSlugs: ["computation-financial-maths"],
      prompt:
        "A line passes through $(1,\\ 5)$ and $(4,\\ -1)$. Which statement is correct?",
      choices: [
        { label: "A", text: "Gradient $=-2$ and equation $y=-2x+7$." },
        { label: "B", text: "Gradient $=-2$ and equation $y=-2x-1$." },
        { label: "C", text: "Gradient $=2$ and equation $y=2x+3$." },
        { label: "D", text: "Gradient $=-\\dfrac{1}{2}$ and equation $y=-\\dfrac{x}{2}+\\dfrac{11}{2}$." },
      ],
      correctAnswer: "A",
      explanation:
        "$m=\\dfrac{-1-5}{4-1}=\\dfrac{-6}{3}=-2$. Substituting $(1,\\ 5)$: $5=-2(1)+b$, so $b=7$. The equation is $y=-2x+7$. Option B uses the $y$-value of the second point as the intercept. Option D swaps rise and run.",
    },
    {
      id: "y9core-d5-probability-without-replacement",
      difficulty: 5,
      targetMisconception: "Reduces the numerator after the first draw but keeps the denominator fixed at the original total.",
      unitSlug: "probability-data-analysis",
      assessedUnitSlugs: ["computation-financial-maths"],
      prompt:
        "A bag contains $4$ red and $2$ blue counters. Two counters are drawn without replacement. What is the probability that both are red?",
      choices: [
        { label: "A", text: "$\\dfrac{2}{5}$, because $\\dfrac{4}{6}\\times\\dfrac{3}{5}=\\dfrac{12}{30}$." },
        { label: "B", text: "$\\dfrac{4}{9}$, because $\\left(\\dfrac{4}{6}\\right)^2=\\dfrac{16}{36}$." },
        { label: "C", text: "$\\dfrac{1}{3}$, because $\\dfrac{4}{6}\\times\\dfrac{3}{6}=\\dfrac{12}{36}$." },
        { label: "D", text: "$\\dfrac{2}{3}$, because the first draw alone gives $\\dfrac{4}{6}$." },
      ],
      correctAnswer: "A",
      explanation:
        "After removing one red counter, $3$ red counters remain in a bag of $5$. $P(\\text{both red})=\\dfrac{4}{6}\\times\\dfrac{3}{5}=\\dfrac{12}{30}=\\dfrac{2}{5}$. Option C correctly reduces the numerator but keeps the denominator at $6$ instead of $5$.",
    },
    {
      id: "y9core-d5-mean-median-outlier",
      difficulty: 5,
      targetMisconception: "Claims that outliers affect the median more than the mean, or treats mean and median as always equal.",
      unitSlug: "probability-data-analysis",
      assessedUnitSlugs: ["linear-relationships"],
      prompt:
        "Five students record weekly screen times of $8,\\ 9,\\ 10,\\ 11$ and $32$ hours. Which statement is correct?",
      choices: [
        { label: "A", text: "Mean $=14$ h and median $=10$ h; the outlier pulls the mean above the median." },
        { label: "B", text: "Mean $=10$ h and median $=14$ h; outliers raise the median more than the mean." },
        { label: "C", text: "Both mean and median equal $10$ h because the middle value always matches the average." },
        { label: "D", text: "Both mean and median equal $14$ h because both measures divide the data evenly." },
      ],
      correctAnswer: "A",
      explanation:
        "Mean $=\\dfrac{8+9+10+11+32}{5}=\\dfrac{70}{5}=14$ h. The median is the middle value when sorted: $10$ h. The large value $32$ raises the mean but does not shift the median.",
    },
    {
      id: "y9core-d5-linear-fraction-solve",
      difficulty: 5,
      targetMisconception: "Correctly isolates x/4 by adding 3 to both sides but does not multiply both sides by 4 to complete the solution.",
      unitSlug: "linear-relationships",
      assessedUnitSlugs: ["computation-financial-maths"],
      prompt: "Solve $\\dfrac{x}{4}-3=5$. Which solution is correct?",
      choices: [
        { label: "A", text: "$x=32$, because $\\dfrac{x}{4}=8$ gives $x=8\\times4$." },
        { label: "B", text: "$x=8$, because $\\dfrac{x}{4}=8$ and so $x=8$." },
        { label: "C", text: "$x=2$, because $(5+3)\\div4=2$." },
        { label: "D", text: "$x=20$, because the $-3$ is ignored and $5\\times4=20$." },
      ],
      correctAnswer: "A",
      explanation:
        "Add $3$ to both sides: $\\dfrac{x}{4}=8$. Then multiply both sides by $4$: $x=32$. Option B correctly isolates $\\dfrac{x}{4}=8$ but forgets the final multiplication step.",
    },
  ],
};
