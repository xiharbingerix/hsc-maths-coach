import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 8 Mathematics",

  units: [
    {
      slug: "index-laws-extension",
      title: "Indices A",
      startHref: "/course/year-8-mathematics/index-laws-extension",
    },
    {
      slug: "number-financial-mathematics",
      title: "Number and Financial Mathematics",
      startHref: "/course/year-8-mathematics/number-financial-mathematics",
    },
    {
      slug: "algebraic-techniques-stage5",
      title: "Algebraic Techniques (Stage 5)",
      startHref: "/course/year-8-mathematics/algebraic-techniques-stage5",
    },
    {
      slug: "linear-relationships",
      title: "Linear Relationships",
      startHref: "/course/year-8-mathematics/linear-relationships",
    },
    {
      slug: "pythagoras-theorem",
      title: "Pythagoras' Theorem",
      startHref: "/course/year-8-mathematics/pythagoras-theorem",
    },
    {
      slug: "geometry-angles",
      title: "Geometry and Angles",
      startHref: "/course/year-8-mathematics/geometry-angles",
    },
    {
      slug: "volume-of-composite-solids",
      title: "Volume of Composite Solids",
      startHref: "/course/year-8-mathematics/volume-of-composite-solids",
    },
    {
      slug: "data-and-graphs",
      title: "Data Analysis and Graphs",
      startHref: "/course/year-8-mathematics/data-and-graphs",
    },
    {
      slug: "introduction-to-networks",
      title: "Introduction to Networks",
      startHref: "/course/year-8-mathematics/introduction-to-networks",
    },
  ],

  questions: [
    {
      id: "y8-idx-power-of-product",
      difficulty: 4,
      targetMisconception: "Raises the variable to the power but leaves the coefficient unchanged, or adds the indices instead of multiplying.",
      unitSlug: "index-laws-extension",
      prompt: "Simplify $(3x^2)^3$.",
      choices: [
        { label: "A", text: "$27x^6$" },
        { label: "B", text: "$3x^6$" },
        { label: "C", text: "$27x^5$" },
        { label: "D", text: "$9x^6$" },
      ],
      correctAnswer: "A",
      explanation:
        "A power outside the bracket applies to every factor: $(3x^2)^3=3^3\\times x^{2\\times3}=27x^6$. Option B forgets to cube the $3$; option C adds the indices instead of multiplying.",
    },
    {
      id: "y8-num-successive-percentage",
      difficulty: 4,
      targetMisconception: "Assumes an increase followed by an equal-percentage decrease returns to the original amount.",
      unitSlug: "number-financial-mathematics",
      prompt:
        "A jacket priced at $\\$200$ is increased by $10\\%$, then later reduced by $10\\%$ from its new price. What is the final price?",
      choices: [
        { label: "A", text: "$\\$198$" },
        { label: "B", text: "$\\$200$" },
        { label: "C", text: "$\\$220$" },
        { label: "D", text: "$\\$180$" },
      ],
      correctAnswer: "A",
      explanation:
        "Increase: $200\\times1.1=\\$220$. Decrease: $220\\times0.9=\\$198$. The $10\\%$ reduction is taken from the larger $\\$220$, not the original $\\$200$, so the price does not return to $\\$200$.",
    },
    {
      id: "y8-alg-expand-negative",
      difficulty: 4,
      targetMisconception: "Does not distribute the negative sign across both terms when expanding a bracket subtracted from another.",
      unitSlug: "algebraic-techniques-stage5",
      prompt: "Expand and simplify $3(2x-4)-2(x-5)$.",
      choices: [
        { label: "A", text: "$4x-2$" },
        { label: "B", text: "$4x-22$" },
        { label: "C", text: "$4x+8$" },
        { label: "D", text: "$8x-2$" },
      ],
      correctAnswer: "A",
      explanation:
        "$3(2x-4)=6x-12$ and $-2(x-5)=-2x+10$. Combining: $6x-12-2x+10=4x-2$. Option B comes from writing $-2(x-5)$ as $-2x-10$, forgetting that $-2\\times-5=+10$.",
    },
    {
      id: "y8-lin-table-rule",
      difficulty: 3,
      targetMisconception: "Identifies the constant difference as the gradient but omits the starting value (y-intercept).",
      unitSlug: "linear-relationships",
      prompt:
        "A table of values gives $x=0,1,2,3$ with $y=5,8,11,14$. Which rule fits the table?",
      choices: [
        { label: "A", text: "$y=3x+5$" },
        { label: "B", text: "$y=3x$" },
        { label: "C", text: "$y=5x+3$" },
        { label: "D", text: "$y=x+5$" },
      ],
      correctAnswer: "A",
      explanation:
        "Each step in $x$ raises $y$ by $3$, so the gradient is $3$. When $x=0$, $y=5$, so the $y$-intercept is $5$, giving $y=3x+5$. Option B captures the gradient but drops the starting value.",
    },
    {
      id: "y8-pyth-shorter-side",
      difficulty: 4,
      targetMisconception: "Adds the squares when finding a shorter side instead of subtracting from the square of the hypotenuse.",
      unitSlug: "pythagoras-theorem",
      prompt:
        "A right-angled triangle has a hypotenuse of $26$ cm and one shorter side of $10$ cm. What is the length of the other shorter side?",
      choices: [
        { label: "A", text: "$24$ cm" },
        { label: "B", text: "$27.9$ cm" },
        { label: "C", text: "$16$ cm" },
        { label: "D", text: "$14$ cm" },
      ],
      correctAnswer: "A",
      explanation:
        "Because the unknown is a shorter side, subtract: $26^2-10^2=676-100=576$, so the side is $\\sqrt{576}=24$ cm. Option B comes from adding $26^2+10^2$, which only applies when finding the hypotenuse.",
    },
    {
      id: "y8-geo-co-interior",
      difficulty: 3,
      targetMisconception: "Treats co-interior (allied) angles between parallel lines as equal rather than supplementary.",
      unitSlug: "geometry-angles",
      prompt:
        "Two parallel lines are crossed by a transversal. One of a pair of co-interior angles is $70^\\circ$. What is the size of the other co-interior angle?",
      choices: [
        { label: "A", text: "$110^\\circ$" },
        { label: "B", text: "$70^\\circ$" },
        { label: "C", text: "$90^\\circ$" },
        { label: "D", text: "$20^\\circ$" },
      ],
      correctAnswer: "A",
      explanation:
        "Co-interior (allied) angles between parallel lines are supplementary, so they add to $180^\\circ$: $180^\\circ-70^\\circ=110^\\circ$. Option B confuses co-interior angles with equal alternate or corresponding angles.",
    },
    {
      id: "y8-vol-triangular-prism",
      difficulty: 4,
      targetMisconception: "Uses base times height for the triangular cross-section without halving it.",
      unitSlug: "volume-of-composite-solids",
      prompt:
        "A triangular prism has a triangular cross-section with base $6$ cm and perpendicular height $4$ cm. The prism is $10$ cm long. What is its volume?",
      choices: [
        { label: "A", text: "$120\\text{ cm}^3$" },
        { label: "B", text: "$240\\text{ cm}^3$" },
        { label: "C", text: "$60\\text{ cm}^3$" },
        { label: "D", text: "$100\\text{ cm}^3$" },
      ],
      correctAnswer: "A",
      explanation:
        "Volume $=$ cross-sectional area $\\times$ length. The triangular area is $\\tfrac12\\times6\\times4=12\\text{ cm}^2$, so $V=12\\times10=120\\text{ cm}^3$. Option B forgets the $\\tfrac12$ and uses $6\\times4\\times10$.",
    },
    {
      id: "y8-data-recompute-mean",
      difficulty: 4,
      targetMisconception: "Averages the old mean with the new value instead of recomputing the mean from the total.",
      unitSlug: "data-and-graphs",
      prompt:
        "The mean of five numbers is $12$. A sixth number, $18$, is added to the set. What is the new mean?",
      choices: [
        { label: "A", text: "$13$" },
        { label: "B", text: "$15$" },
        { label: "C", text: "$12$" },
        { label: "D", text: "$30$" },
      ],
      correctAnswer: "A",
      explanation:
        "The original five numbers total $5\\times12=60$. Adding $18$ gives a total of $78$ across six numbers: $78\\div6=13$. Option B incorrectly averages the old mean and the new value, $(12+18)\\div2$.",
    },
    {
      id: "y8-net-edges-from-degrees",
      difficulty: 3,
      targetMisconception: "Sums the degrees of all vertices without halving, counting each edge twice.",
      unitSlug: "introduction-to-networks",
      prompt:
        "In a network, each of the $5$ vertices is connected to exactly $2$ others. How many edges does the network have?",
      choices: [
        { label: "A", text: "$5$" },
        { label: "B", text: "$10$" },
        { label: "C", text: "$7$" },
        { label: "D", text: "$2$" },
      ],
      correctAnswer: "A",
      explanation:
        "Each edge joins two vertices, so the sum of all degrees counts every edge twice. The degrees total $5\\times2=10$, so the number of edges is $10\\div2=5$. Option B forgets to halve.",
    },
    {
      id: "y8-alg-substitute-negative",
      difficulty: 4,
      targetMisconception: "Treats the square of a negative number as negative, or applies the coefficient before squaring.",
      unitSlug: "algebraic-techniques-stage5",
      prompt: "Evaluate $5-2p^2$ when $p=-3$.",
      choices: [
        { label: "A", text: "$-13$" },
        { label: "B", text: "$23$" },
        { label: "C", text: "$41$" },
        { label: "D", text: "$11$" },
      ],
      correctAnswer: "A",
      explanation:
        "Square first: $(-3)^2=9$. Then $5-2\\times9=5-18=-13$. Option B comes from treating $(-3)^2$ as $-9$, giving $5-2\\times(-9)=23$. Only the $p$ is squared, and squaring a negative gives a positive.",
    },
  ],
};
