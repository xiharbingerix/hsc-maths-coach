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
      id: "y7-int-1", unitSlug: "integers",
      prompt: "At sunrise the temperature was \\(-4^\\circ\\text{C}\\). It rose by \\(9^\\circ\\text{C}\\), then fell by \\(6^\\circ\\text{C}\\). What was the final temperature?",
      choices: [
        { label: "A", text: "\\(-19^\\circ\\text{C}\\)" }, { label: "B", text: "\\(-1^\\circ\\text{C}\\)" },
        { label: "C", text: "\\(1^\\circ\\text{C}\\)" }, { label: "D", text: "\\(11^\\circ\\text{C}\\)" },
      ], correctAnswer: "B",
      explanation: "Starting at \\(-4\\), add \\(9\\) to reach \\(5\\). A fall of \\(6\\) gives \\(5-6=-1\\), so the final temperature was \\(-1^\\circ\\text{C}\\).",
    },
    {
      id: "y7-int-2", unitSlug: "integers",
      prompt: "Mia evaluates \\(3+2\\times(-5)\\) as \\(-25\\). Which mistake best explains her answer?",
      choices: [
        { label: "A", text: "She added before multiplying, then calculated \\(5\\times(-5)\\)." },
        { label: "B", text: "She treated a negative times a positive as positive." },
        { label: "C", text: "She subtracted \\(5\\) from \\(2\\) first." },
        { label: "D", text: "She multiplied correctly but then ignored the \\(3\\)." },
      ], correctAnswer: "A",
      explanation: "The answer \\(-25\\) comes from incorrectly doing \\(3+2=5\\) before multiplication. Multiplication must come first: \\(2\\times(-5)=-10\\), then \\(3-10=-7\\).",
    },
    {
      id: "y7-int-3", unitSlug: "integers",
      prompt: "A diver is at \\(-18\\) m. They rise \\(7\\) m, descend \\(4\\) m, then rise \\(9\\) m. Where are they now?",
      choices: [
        { label: "A", text: "\\(-38\\) m" }, { label: "B", text: "\\(-14\\) m" },
        { label: "C", text: "\\(-6\\) m" }, { label: "D", text: "\\(2\\) m" },
      ], correctAnswer: "C",
      explanation: "Represent rises as positive and descents as negative: \\(-18+7-4+9=-11-4+9=-6\\). The diver is \\(6\\) m below sea level.",
    },
    {
      id: "y7-fr-1", unitSlug: "fractions", prompt: "Which list is ordered from smallest to largest?",
      choices: [
        { label: "A", text: "\\(0.6,\\; \\frac{2}{3},\\; \\frac{3}{4}\\)" }, { label: "B", text: "\\(\\frac{2}{3},\\; 0.6,\\; \\frac{3}{4}\\)" },
        { label: "C", text: "\\(\\frac{3}{4},\\; \\frac{2}{3},\\; 0.6\\)" }, { label: "D", text: "\\(0.6,\\; \\frac{3}{4},\\; \\frac{2}{3}\\)" },
      ], correctAnswer: "A",
      explanation: "Write each value as a decimal: \\(0.6=0.600\\), \\(\\frac{2}{3}\\approx0.667\\), and \\(\\frac{3}{4}=0.75\\). Therefore \\(0.6<\\frac{2}{3}<\\frac{3}{4}\\).",
    },
    {
      id: "y7-fr-2", unitSlug: "fractions",
      prompt: "A student claims \\(\\frac{2}{3}+\\frac{1}{6}=\\frac{3}{9}\\) because they added both numerators and denominators. What is the correct sum?",
      choices: [
        { label: "A", text: "\\(\\frac{1}{2}\\)" }, { label: "B", text: "\\(\\frac{2}{9}\\)" },
        { label: "C", text: "\\(\\frac{5}{6}\\)" }, { label: "D", text: "\\(\\frac{3}{6}\\)" },
      ], correctAnswer: "C",
      explanation: "Fractions need a common denominator before addition. Since \\(\\frac{2}{3}=\\frac{4}{6}\\), the sum is \\(\\frac{4}{6}+\\frac{1}{6}=\\frac{5}{6}\\).",
    },
    {
      id: "y7-fr-3", unitSlug: "fractions",
      prompt: "A \\(2\\frac{1}{2}\\)-litre jug is used to fill cups holding \\(\\frac{1}{4}\\) litre each. How many full cups can be filled?",
      choices: [
        { label: "A", text: "\\(6\\)" }, { label: "B", text: "\\(8\\)" }, { label: "C", text: "\\(10\\)" }, { label: "D", text: "\\(12\\)" },
      ], correctAnswer: "C",
      explanation: "Convert \\(2\\frac{1}{2}\\) to \\(\\frac{5}{2}\\), then divide by the cup size: \\(\\frac{5}{2}\\div\\frac{1}{4}=\\frac{5}{2}\\times4=10\\). Ten cups can be filled.",
    },
    {
      id: "y7-at-1", unitSlug: "algebraic-techniques", prompt: "Which expression is equivalent to \\(4x+7-x+2\\) for every value of \\(x\\)?",
      choices: [
        { label: "A", text: "\\(3x+9\\)" }, { label: "B", text: "\\(3x+5\\)" }, { label: "C", text: "\\(4x+8\\)" }, { label: "D", text: "\\(5x+9\\)" },
      ], correctAnswer: "A",
      explanation: "Only like terms can be combined. The variable terms give \\(4x-x=3x\\), and the constants give \\(7+2=9\\), so the equivalent expression is \\(3x+9\\).",
    },
    {
      id: "y7-at-2", unitSlug: "algebraic-techniques",
      prompt: "A rectangle has length \\(x+3\\) cm and width \\(2\\) cm. Which expression gives its perimeter?",
      choices: [
        { label: "A", text: "\\(2x+5\\)" }, { label: "B", text: "\\(2x+6\\)" }, { label: "C", text: "\\(2x+10\\)" }, { label: "D", text: "\\(4x+12\\)" },
      ], correctAnswer: "C",
      explanation: "Perimeter is twice the length plus twice the width: \\(2(x+3)+2(2)=2x+6+4=2x+10\\). This requires expanding the bracket and collecting constants.",
    },
    {
      id: "y7-at-3", unitSlug: "algebraic-techniques", prompt: "Which expression is fully factorised?",
      choices: [
        { label: "A", text: "\\(12a+18=2(6a+9)\\)" }, { label: "B", text: "\\(12a+18=3(4a+6)\\)" },
        { label: "C", text: "\\(12a+18=6(2a+3)\\)" }, { label: "D", text: "\\(12a+18=12(a+6)\\)" },
      ], correctAnswer: "C",
      explanation: "The highest common factor of \\(12a\\) and \\(18\\) is \\(6\\). Dividing both terms by \\(6\\) gives \\(12a+18=6(2a+3)\\), which is fully factorised.",
    },
    {
      id: "y7-pc-1", unitSlug: "percentages", prompt: "Which value is greatest?",
      choices: [
        { label: "A", text: "\\(0.58\\)" }, { label: "B", text: "\\(\\frac{3}{5}\\)" }, { label: "C", text: "\\(59\\%\\)" }, { label: "D", text: "They are all equal." },
      ], correctAnswer: "B",
      explanation: "Convert each value to a percentage: \\(0.58=58\\%\\), \\(\\frac{3}{5}=60\\%\\), and \\(59\\%=59\\%\\). Therefore \\(\\frac{3}{5}\\) is greatest.",
    },
    {
      id: "y7-pc-2", unitSlug: "percentages", prompt: "A $40 shirt is increased in price by \\(10\\%\\). What is the new price?",
      choices: [{ label: "A", text: "$4" }, { label: "B", text: "$36" }, { label: "C", text: "$44" }, { label: "D", text: "$50" }], correctAnswer: "C",
      explanation: "Ten per cent of $40 is \\(0.10\\times40=4\\) dollars. Because the price increases, add $4 to $40 to get the new price of $44.",
    },
    {
      id: "y7-pc-3", unitSlug: "percentages", prompt: "A game is discounted from $80 to $68. What percentage discount was applied?",
      choices: [
        { label: "A", text: "\\(12\\%\\)" }, { label: "B", text: "\\(15\\%\\)" }, { label: "C", text: "\\(18\\%\\)" }, { label: "D", text: "\\(85\\%\\)" },
      ], correctAnswer: "B",
      explanation: "The discount is $12 because $80 minus $68 equals $12. Compare it with the original price: \\(12\\div80=0.15=15\\%\\), so the discount was \\(15\\%\\).",
    },
    {
      id: "y7-eq-1", unitSlug: "equations", prompt: "Solve \\(3x+5=23\\).",
      choices: [
        { label: "A", text: "\\(x=4\\)" }, { label: "B", text: "\\(x=6\\)" }, { label: "C", text: "\\(x=\\frac{28}{3}\\)" }, { label: "D", text: "\\(x=14\\)" },
      ], correctAnswer: "B",
      explanation: "Undo the addition first: \\(3x=23-5=18\\). Then divide both sides by \\(3\\): \\(x=6\\). Substitution confirms \\(3(6)+5=23\\).",
    },
    {
      id: "y7-eq-2", unitSlug: "equations",
      prompt: "Three identical notebooks and a $4 pen cost $25 altogether. Which equation finds the price \\(n\\) of one notebook?",
      choices: [
        { label: "A", text: "\\(3+n+4=25\\)" }, { label: "B", text: "\\(3n+4=25\\)" }, { label: "C", text: "\\(4n+3=25\\)" }, { label: "D", text: "\\(3n=25+4\\)" },
      ], correctAnswer: "B",
      explanation: "Three notebooks at \\(n\\) dollars each cost \\(3n\\) dollars, and the pen adds $4. Therefore the total-cost equation is \\(3n+4=25\\).",
    },
    {
      id: "y7-eq-3", unitSlug: "equations",
      prompt: "A square has area \\(49\\text{ cm}^2\\). Which statement gives every solution to \\(s^2=49\\) and interprets the side length \\(s\\)?",
      choices: [
        { label: "A", text: "\\(s=7\\) or \\(s=-7\\), but only \\(7\\) cm is a valid side length" }, { label: "B", text: "Only \\(s=-7\\)" },
        { label: "C", text: "\\(s=24.5\\)" }, { label: "D", text: "\\(s=49\\)" },
      ], correctAnswer: "A",
      explanation: "Both \\(7^2\\) and \\((-7)^2\\) equal \\(49\\), so the equation has solutions \\(s=\\pm7\\). A physical side length cannot be negative, so the square's side is \\(7\\) cm.",
    },
    {
      id: "y7-in-1", unitSlug: "indices",
      prompt: "Two buses leave together. One returns every \\(12\\) minutes and the other every \\(18\\) minutes. When will they next return together?",
      choices: [{ label: "A", text: "\\(6\\) min" }, { label: "B", text: "\\(30\\) min" }, { label: "C", text: "\\(36\\) min" }, { label: "D", text: "\\(216\\) min" }], correctAnswer: "C",
      explanation: "A shared return time must be a common multiple of \\(12\\) and \\(18\\). Their least common multiple is \\(36\\), so both buses return together after \\(36\\) minutes.",
    },
    {
      id: "y7-in-2", unitSlug: "indices", prompt: "Which is the prime factorisation of \\(180\\)?",
      choices: [
        { label: "A", text: "\\(2\\times2\\times45\\)" }, { label: "B", text: "\\(2^2\\times3^2\\times5\\)" },
        { label: "C", text: "\\(2\\times3\\times30\\)" }, { label: "D", text: "\\(2^2\\times3\\times15\\)" },
      ], correctAnswer: "B",
      explanation: "Continue factorising until every factor is prime: \\(180=18\\times10=(2\\times3^2)(2\\times5)=2^2\\times3^2\\times5\\).",
    },
    {
      id: "y7-in-3", unitSlug: "indices", prompt: "Simplify \\(2^3\\times2^4\\div2^5\\), then evaluate it.",
      choices: [
        { label: "A", text: "\\(2^2=4\\)" }, { label: "B", text: "\\(2^3=8\\)" }, { label: "C", text: "\\(2^{12}=4096\\)" }, { label: "D", text: "\\(2^{-2}=\\frac14\\)" },
      ], correctAnswer: "A",
      explanation: "For the same base, add exponents when multiplying and subtract when dividing: \\(2^{3+4-5}=2^2=4\\).",
    },
    {
      id: "y7-pe-1", unitSlug: "perimeter",
      prompt: "A rectangular garden is \\(9\\) m long and \\(4\\) m wide. A \\(2\\)-metre gate needs no fencing. How much fencing is required?",
      choices: [{ label: "A", text: "\\(11\\) m" }, { label: "B", text: "\\(24\\) m" }, { label: "C", text: "\\(26\\) m" }, { label: "D", text: "\\(34\\) m" }], correctAnswer: "B",
      explanation: "The full perimeter is \\(2(9+4)=26\\) m. Subtract the \\(2\\)-metre gate opening: \\(26-2=24\\) m of fencing is required.",
    },
    {
      id: "y7-pe-2", unitSlug: "perimeter",
      prompt: "A regular hexagon and a square each have perimeter \\(48\\) cm. How much longer is one side of the square than one side of the hexagon?",
      choices: [{ label: "A", text: "\\(2\\) cm" }, { label: "B", text: "\\(4\\) cm" }, { label: "C", text: "\\(8\\) cm" }, { label: "D", text: "\\(12\\) cm" }], correctAnswer: "B",
      explanation: "A square side is \\(48\\div4=12\\) cm, while a regular hexagon side is \\(48\\div6=8\\) cm. The difference is \\(12-8=4\\) cm.",
    },
    {
      id: "y7-pe-3", unitSlug: "perimeter", prompt: "A rectangular photo has perimeter \\(54\\) cm and length \\(17\\) cm. What is its width?",
      choices: [{ label: "A", text: "\\(5\\) cm" }, { label: "B", text: "\\(10\\) cm" }, { label: "C", text: "\\(20\\) cm" }, { label: "D", text: "\\(37\\) cm" }], correctAnswer: "B",
      explanation: "Half the perimeter is one length plus one width: \\(54\\div2=27\\). Therefore the width is \\(27-17=10\\) cm.",
    },
    {
      id: "y7-ar-1", unitSlug: "area",
      prompt: "Noah calculates the area of a triangle with base \\(10\\) cm and perpendicular height \\(6\\) cm as \\(60\\text{ cm}^2\\). What did he forget?",
      choices: [
        { label: "A", text: "To add the base and height" }, { label: "B", text: "To divide \\(b\\times h\\) by \\(2\\)" },
        { label: "C", text: "To double the perpendicular height" }, { label: "D", text: "To convert centimetres to metres" },
      ], correctAnswer: "B",
      explanation: "A triangle occupies half of a rectangle with the same base and perpendicular height. Its area is \\(\\frac12\\times10\\times6=30\\text{ cm}^2\\), so Noah forgot to divide by \\(2\\).",
    },
    {
      id: "y7-ar-2", unitSlug: "area", prompt: "A trapezoid has parallel sides \\(8\\) cm and \\(14\\) cm, with perpendicular height \\(5\\) cm. What is its area?",
      choices: [
        { label: "A", text: "\\(40\\text{ cm}^2\\)" }, { label: "B", text: "\\(55\\text{ cm}^2\\)" },
        { label: "C", text: "\\(70\\text{ cm}^2\\)" }, { label: "D", text: "\\(110\\text{ cm}^2\\)" },
      ], correctAnswer: "B",
      explanation: "Use the average of the parallel sides times the height: \\(\\frac{8+14}{2}\\times5=11\\times5=55\\text{ cm}^2\\).",
    },
    {
      id: "y7-ar-3", unitSlug: "area",
      prompt: "A \\(12\\) m by \\(8\\) m wall contains a \\(2\\) m by \\(1.5\\) m window. Paint covers \\(10\\text{ m}^2\\) per litre. What is the least whole number of litres needed?",
      choices: [{ label: "A", text: "\\(9\\) L" }, { label: "B", text: "\\(9.3\\) L" }, { label: "C", text: "\\(10\\) L" }, { label: "D", text: "\\(12\\) L" }], correctAnswer: "C",
      explanation: "The paintable area is \\(12\\times8-2\\times1.5=96-3=93\\text{ m}^2\\). This needs \\(93\\div10=9.3\\) litres, so at least \\(10\\) whole litres are required.",
    },
    {
      id: "y7-an-1", unitSlug: "angles",
      prompt: "Two angles on a straight line are \\(112^\\circ\\) and \\(x\\). A student says \\(x=112^\\circ\\) because vertically opposite angles are equal. Why is the student wrong?",
      choices: [
        { label: "A", text: "The angles are adjacent and supplementary, so \\(x=68^\\circ\\)." },
        { label: "B", text: "All angles on a line are equal, so \\(x=90^\\circ\\)." },
        { label: "C", text: "The angles sum to \\(360^\\circ\\), so \\(x=248^\\circ\\)." },
        { label: "D", text: "Vertically opposite angles add to \\(180^\\circ\\), so \\(x=112^\\circ\\)." },
      ], correctAnswer: "A",
      explanation: "The angles described are next to each other on a straight line, not vertically opposite. Adjacent angles on a straight line sum to \\(180^\\circ\\), so \\(x=180^\\circ-112^\\circ=68^\\circ\\).",
    },
    {
      id: "y7-an-2", unitSlug: "angles", prompt: "An isosceles triangle has a vertex angle of \\(38^\\circ\\). What is the size of each equal base angle?",
      choices: [{ label: "A", text: "\\(38^\\circ\\)" }, { label: "B", text: "\\(71^\\circ\\)" }, { label: "C", text: "\\(76^\\circ\\)" }, { label: "D", text: "\\(142^\\circ\\)" }], correctAnswer: "B",
      explanation: "The two equal base angles share the remaining \\(180^\\circ-38^\\circ=142^\\circ\\). Each is \\(142^\\circ\\div2=71^\\circ\\).",
    },
    {
      id: "y7-an-3", unitSlug: "angles",
      prompt: "Two parallel lines are crossed by a transversal. One acute angle is \\(64^\\circ\\). What are the only two angle sizes in the diagram?",
      choices: [
        { label: "A", text: "\\(64^\\circ\\) and \\(90^\\circ\\)" }, { label: "B", text: "\\(64^\\circ\\) and \\(116^\\circ\\)" },
        { label: "C", text: "\\(64^\\circ\\) and \\(126^\\circ\\)" }, { label: "D", text: "\\(64^\\circ\\) and \\(296^\\circ\\)" },
      ], correctAnswer: "B",
      explanation: "Corresponding and vertically opposite acute angles are \\(64^\\circ\\). Every adjacent obtuse angle is supplementary: \\(180^\\circ-64^\\circ=116^\\circ\\).",
    },
    {
      id: "y7-da-1", unitSlug: "data",
      prompt: "A school wants to estimate how students travel to school. Which method is most likely to produce a representative sample?",
      choices: [
        { label: "A", text: "Survey only students waiting at the bus stop." }, { label: "B", text: "Survey every tenth student entering through all school gates." },
        { label: "C", text: "Survey only the Year \\(7\\) cycling club." }, { label: "D", text: "Ask students who volunteer on the school website." },
      ], correctAnswer: "B",
      explanation: "Sampling every tenth student across all entrances includes students using different types of transport. The other methods favour one transport group or rely on self-selection, creating bias.",
    },
    {
      id: "y7-da-2", unitSlug: "data",
      prompt: "A frequency table shows scores \\(1,2,3,4\\) with frequencies \\(2,5,6,2\\). What proportion of students scored at least \\(3\\)?",
      choices: [
        { label: "A", text: "\\(\\frac{6}{15}\\)" }, { label: "B", text: "\\(\\frac{8}{15}\\)" },
        { label: "C", text: "\\(\\frac{8}{13}\\)" }, { label: "D", text: "\\(\\frac{3}{4}\\)" },
      ], correctAnswer: "B",
      explanation: "Scores of at least \\(3\\) have frequencies \\(6+2=8\\). There are \\(2+5+6+2=15\\) students altogether, so the required proportion is \\(\\frac{8}{15}\\).",
    },
    {
      id: "y7-da-3", unitSlug: "data",
      prompt: "Two bar charts show the same values, \\(48\\) and \\(52\\). One vertical axis starts at \\(0\\); the other starts at \\(47\\). What effect does the second axis have?",
      choices: [
        { label: "A", text: "It makes the difference look much larger than it is." }, { label: "B", text: "It changes the values to \\(1\\) and \\(5\\)." },
        { label: "C", text: "It proves that \\(52\\) is more than twice \\(48\\)." }, { label: "D", text: "It makes the chart more accurate because it uses fewer numbers." },
      ], correctAnswer: "A",
      explanation: "Truncating the axis at \\(47\\) magnifies a difference of only \\(4\\). The data values do not change, but the visual difference can misleadingly appear much larger.",
    },
  ],
};
