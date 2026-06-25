import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 9 Mathematics Advanced",

  units: [
    {
      slug: "quadratic-equations-parabolas",
      title: "Quadratic Equations and Parabolas",
      startHref: "/course/year-9-mathematics-advanced/quadratic-equations-parabolas",
    },
    {
      slug: "quadratic-expressions-algebraic-techniques",
      title: "Quadratic Expressions and Algebraic Techniques",
      startHref: "/course/year-9-mathematics-advanced/quadratic-expressions-algebraic-techniques",
    },
    {
      slug: "expressions-equations-inequalities",
      title: "Expressions, Equations and Inequalities",
      startHref: "/course/year-9-mathematics-advanced/expressions-equations-inequalities",
    },
    {
      slug: "pythagoras-trigonometry",
      title: "Right-Angled Triangles: Pythagoras and Trigonometry",
      startHref: "/course/year-9-mathematics-advanced/pythagoras-trigonometry",
    },
    {
      slug: "indices-surds",
      title: "Indices and Surds",
      startHref: "/course/year-9-mathematics-advanced/indices-surds",
    },
    {
      slug: "length-area-surface-area-volume",
      title: "Length, Area, Surface Area and Volume",
      startHref: "/course/year-9-mathematics-advanced/length-area-surface-area-volume",
    },
    {
      slug: "computation-financial-maths",
      title: "Computation and Financial Maths",
      startHref: "/course/year-9-mathematics-advanced/computation-financial-maths",
    },
    {
      slug: "linear-relationships",
      title: "Linear Relationships",
      startHref: "/course/year-9-mathematics-advanced/linear-relationships",
    },
    {
      slug: "probability-data-analysis",
      title: "Probability and Single Variable Data Analysis",
      startHref: "/course/year-9-mathematics-advanced/probability-data-analysis",
    },
    {
      slug: "properties-geometrical-figures",
      title: "Properties of Geometrical Figures",
      startHref: "/course/year-9-mathematics-advanced/properties-geometrical-figures",
    },
  ],

  questions: [
    {
      id: "y9adv-d5-parabola-vertex-axis",
      difficulty: 5,
      targetMisconception: "Reads the axis of symmetry as -b rather than -b/2a, or treats c as the minimum value.",
      unitSlug: "quadratic-equations-parabolas",
      assessedUnitSlugs: ["quadratic-expressions-algebraic-techniques"],
      prompt: "For the parabola $y=x^2-6x+5$, which statement is correct?",
      choices: [
        { label: "A", text: "Axis of symmetry $x=3$, minimum value $-4$, roots $x=1$ and $x=5$." },
        { label: "B", text: "Axis of symmetry $x=6$, minimum value $5$, roots $x=1$ and $x=5$." },
        { label: "C", text: "Axis of symmetry $x=-3$, minimum value $-4$, roots $x=-1$ and $x=-5$." },
        { label: "D", text: "Minimum value $5$ at $x=0$, because the constant term is the lowest point." },
      ],
      correctAnswer: "A",
      explanation:
        "Axis of symmetry $x=-\\dfrac{b}{2a}=\\dfrac{6}{2}=3$. Then $y=3^2-6(3)+5=-4$, so the minimum is $-4$. Factorising $x^2-6x+5=(x-1)(x-5)$ gives roots $x=1,5$. Option B uses $-b$ and the constant term instead of the true vertex.",
    },
    {
      id: "y9adv-d5-factorise-fully",
      difficulty: 5,
      targetMisconception: "Takes out the common factor but does not recognise the remaining bracket is a difference of two squares.",
      unitSlug: "quadratic-expressions-algebraic-techniques",
      assessedUnitSlugs: ["expressions-equations-inequalities"],
      prompt: "Which expression is $2x^2-8$ written in fully factorised form?",
      choices: [
        { label: "A", text: "$2(x-2)(x+2)$" },
        { label: "B", text: "$2(x^2-4)$" },
        { label: "C", text: "$2(x-4)(x+4)$" },
        { label: "D", text: "$(2x-4)(x-2)$" },
      ],
      correctAnswer: "A",
      explanation:
        "First take out the common factor: $2x^2-8=2(x^2-4)$. The bracket is a difference of two squares, $x^2-4=(x-2)(x+2)$, so the full factorisation is $2(x-2)(x+2)$. Option B is correct in value but not fully factorised; option C expands to $2x^2-32$.",
    },
    {
      id: "y9adv-d5-inequality-sign-flip",
      difficulty: 5,
      targetMisconception: "Divides both sides by a negative coefficient without reversing the inequality sign.",
      unitSlug: "expressions-equations-inequalities",
      assessedUnitSlugs: ["linear-relationships"],
      prompt: "Solve the inequality $7-2x<1$. Which solution is correct?",
      choices: [
        { label: "A", text: "$x>3$" },
        { label: "B", text: "$x<3$" },
        { label: "C", text: "$x>-3$" },
        { label: "D", text: "$x<-3$" },
      ],
      correctAnswer: "A",
      explanation:
        "Subtract $7$: $-2x<-6$. Dividing both sides by $-2$ reverses the inequality: $x>3$. Option B keeps the sign unchanged, which is the most common error when dividing by a negative.",
    },
    {
      id: "y9adv-d5-trig-tan-side",
      difficulty: 5,
      targetMisconception: "Treats the known horizontal distance as the hypotenuse and uses sine, instead of recognising it as the adjacent side and using tangent.",
      unitSlug: "pythagoras-trigonometry",
      assessedUnitSlugs: ["properties-geometrical-figures"],
      prompt:
        "A flagpole stands vertically. From a point $10$ m away on level ground, the angle of elevation to the top is $50^\\circ$. Which is closest to the height of the flagpole?",
      choices: [
        { label: "A", text: "$11.9$ m, using $10\\tan50^\\circ$." },
        { label: "B", text: "$7.7$ m, using $10\\sin50^\\circ$." },
        { label: "C", text: "$6.4$ m, using $10\\cos50^\\circ$." },
        { label: "D", text: "$8.4$ m, using $\\dfrac{10}{\\tan50^\\circ}$." },
      ],
      correctAnswer: "A",
      explanation:
        "The $10$ m distance is the side adjacent to the $50^\\circ$ angle, and the height is the opposite side. So $\\tan50^\\circ=\\dfrac{\\text{height}}{10}$, giving height $=10\\tan50^\\circ\\approx11.9$ m. Option B wrongly treats the $10$ m as the hypotenuse.",
    },
    {
      id: "y9adv-d5-surd-subtraction",
      difficulty: 5,
      targetMisconception: "Combines surds by operating on the numbers inside the roots instead of simplifying to like surds first.",
      unitSlug: "indices-surds",
      assessedUnitSlugs: ["quadratic-expressions-algebraic-techniques"],
      prompt: "Simplify $\\sqrt{50}-\\sqrt{18}$.",
      choices: [
        { label: "A", text: "$2\\sqrt{2}$" },
        { label: "B", text: "$\\sqrt{32}$" },
        { label: "C", text: "$8\\sqrt{2}$" },
        { label: "D", text: "$\\sqrt{2}$" },
      ],
      correctAnswer: "A",
      explanation:
        "Simplify each surd to a like form: $\\sqrt{50}=5\\sqrt{2}$ and $\\sqrt{18}=3\\sqrt{2}$. Then $5\\sqrt{2}-3\\sqrt{2}=2\\sqrt{2}$. Option B comes from subtracting inside the roots ($\\sqrt{50-18}$), which is not valid.",
    },
    {
      id: "y9adv-d5-cone-volume",
      difficulty: 5,
      targetMisconception: "Uses the cylinder volume formula for a cone, omitting the factor of one third.",
      unitSlug: "length-area-surface-area-volume",
      assessedUnitSlugs: ["indices-surds"],
      prompt: "A cone has radius $3$ cm and perpendicular height $10$ cm. What is its exact volume?",
      choices: [
        { label: "A", text: "$30\\pi\\text{ cm}^3$" },
        { label: "B", text: "$90\\pi\\text{ cm}^3$" },
        { label: "C", text: "$60\\pi\\text{ cm}^3$" },
        { label: "D", text: "$100\\pi\\text{ cm}^3$" },
      ],
      correctAnswer: "A",
      explanation:
        "The volume of a cone is $V=\\dfrac{1}{3}\\pi r^2h=\\dfrac{1}{3}\\pi(3^2)(10)=\\dfrac{1}{3}\\pi(90)=30\\pi\\text{ cm}^3$. Option B ($90\\pi$) forgets the factor of $\\dfrac{1}{3}$ and uses the cylinder formula.",
    },
    {
      id: "y9adv-d5-compound-vs-simple",
      difficulty: 5,
      targetMisconception: "Models repeated percentage growth additively (rate times years) instead of compounding.",
      unitSlug: "computation-financial-maths",
      assessedUnitSlugs: ["indices-surds"],
      prompt:
        "$\\$1000$ is invested at $10\\%$ per annum. How much more does it earn with interest compounded annually than with simple interest, over $3$ years?",
      choices: [
        { label: "A", text: "$\\$31$" },
        { label: "B", text: "$\\$0$, because both methods give the same total." },
        { label: "C", text: "$\\$10$" },
        { label: "D", text: "$\\$100$" },
      ],
      correctAnswer: "A",
      explanation:
        "Compound: $1000(1.1)^3=1331$, so interest $=\\$331$. Simple: $1000\\times0.10\\times3=\\$300$. The difference is $\\$331-\\$300=\\$31$. The compound total grows on previous interest, so it exceeds the linear simple-interest total.",
    },
    {
      id: "y9adv-d5-perpendicular-gradient",
      difficulty: 5,
      targetMisconception: "Finds a perpendicular gradient by negating the gradient without taking the reciprocal, or by taking the reciprocal without negating.",
      unitSlug: "linear-relationships",
      assessedUnitSlugs: ["expressions-equations-inequalities"],
      prompt:
        "Which line is perpendicular to $y=2x+3$ and passes through the point $(4,1)$?",
      choices: [
        { label: "A", text: "$y=-\\dfrac{1}{2}x+3$" },
        { label: "B", text: "$y=-2x+9$" },
        { label: "C", text: "$y=\\dfrac{1}{2}x-1$" },
        { label: "D", text: "$y=2x-7$" },
      ],
      correctAnswer: "A",
      explanation:
        "Perpendicular gradients are negative reciprocals: the perpendicular gradient is $-\\dfrac{1}{2}$. Using $(4,1)$: $1=-\\dfrac{1}{2}(4)+c\\Rightarrow c=3$, so $y=-\\dfrac{1}{2}x+3$. Option B only negates the gradient; option C only takes the reciprocal.",
    },
    {
      id: "y9adv-d5-prob-exactly-one",
      difficulty: 5,
      targetMisconception: "Counts only one order of a two-stage event, or treats the draws as having replacement.",
      unitSlug: "probability-data-analysis",
      assessedUnitSlugs: ["computation-financial-maths"],
      prompt:
        "A bag has $5$ red and $3$ green counters. Two are drawn without replacement. What is the probability of getting exactly one red and one green?",
      choices: [
        { label: "A", text: "$\\dfrac{15}{28}$" },
        { label: "B", text: "$\\dfrac{15}{56}$" },
        { label: "C", text: "$\\dfrac{15}{32}$" },
        { label: "D", text: "$\\dfrac{8}{15}$" },
      ],
      correctAnswer: "A",
      explanation:
        "Both orders count: $P(\\text{RG})+P(\\text{GR})=\\dfrac{5}{8}\\cdot\\dfrac{3}{7}+\\dfrac{3}{8}\\cdot\\dfrac{5}{7}=\\dfrac{15}{56}+\\dfrac{15}{56}=\\dfrac{30}{56}=\\dfrac{15}{28}$. Option B counts only one order; option C uses replacement ($\\dfrac{3}{8}$ on the second draw).",
    },
    {
      id: "y9adv-d5-similar-triangle-side",
      difficulty: 5,
      targetMisconception: "Treats similarity as adding a constant difference to each side rather than multiplying by a scale factor.",
      unitSlug: "properties-geometrical-figures",
      assessedUnitSlugs: ["length-area-surface-area-volume"],
      prompt:
        "Triangle $ABC$ is similar to triangle $DEF$. Side $AB=6$ cm corresponds to $DE=9$ cm, and side $BC=8$ cm corresponds to $EF$. What is the length of $EF$?",
      choices: [
        { label: "A", text: "$12$ cm" },
        { label: "B", text: "$11$ cm" },
        { label: "C", text: "$5\\dfrac{1}{3}$ cm" },
        { label: "D", text: "$8$ cm" },
      ],
      correctAnswer: "A",
      explanation:
        "The scale factor is $\\dfrac{DE}{AB}=\\dfrac{9}{6}=1.5$. Corresponding sides scale by the same factor, so $EF=8\\times1.5=12$ cm. Option B adds the difference $9-6=3$ to $8$, treating similarity as additive rather than multiplicative.",
    },
  ],
};
