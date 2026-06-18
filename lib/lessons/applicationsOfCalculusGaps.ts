import type { ExplicitLesson } from "./differentialCalculus";

export const sketchingTheDerivativeGraphLesson: ExplicitLesson = {
  id: "sketching-the-derivative-graph",
  slug: "sketching-the-derivative-graph",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Sketching the Derivative: Graphing f′(x) and f″(x) from f(x)",
  description:
    "Read the gradient of a curve to sketch y=f'(x), then read the gradient of that to sketch y=f''(x): stationary points become x-intercepts, increasing/decreasing become sign of f', and concavity becomes the sign of f''.",
  syllabusArea: "Calculus",
  focus: "Applications of calculus",
  status: "active",
  video: {
    title: "Sketching the Derivative: Graphing f′(x) and f″(x) from f(x)",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how to read the gradient of a graph of y=f(x) to sketch y=f'(x), and to read that gradient again to sketch y=f''(x).",
  successCriteria: [
    "At a stationary point of $f$, state that $f'(x)=0$ (an $x$-intercept of the derivative graph).",
    "Where $f$ is increasing $f'(x)>0$, and where $f$ is decreasing $f'(x)<0$.",
    "The steeper the graph of $f$, the larger $|f'(x)|$.",
    "Where $f$ is concave up $f''(x)>0$, and concave down $f''(x)<0$.",
    "At a point of inflection of $f$, $f''(x)=0$ and $f'(x)$ has a turning point.",
    "A maximum of $f$ gives an $x$-intercept of $f'$ where $f'$ changes from $+$ to $-$; a minimum gives a $-$ to $+$ crossing.",
    "Build the chain $f \\to f' \\to f''$ by treating each derivative as 'the gradient of the one before'.",
  ],
  teaching: {
    paragraphs: [
      "The derivative $f'(x)$ is nothing more than the gradient of $f$ at each value of $x$. So to sketch $y=f'(x)$ from a picture of $y=f(x)$, you do not need the equation at all — you walk along the curve of $f$ from left to right, read off how steep it is and whether it is rising or falling, and plot that gradient as the height of a new graph. The derivative graph is a record of the slope of the original.",
      "Start with the flat spots. Wherever $f$ has a stationary point — a maximum, a minimum, or a horizontal point of inflection — the tangent is horizontal, so the gradient is zero. That means every stationary point of $f$ sits directly above (or below) an $x$-intercept of $f'$. This is the single most useful anchor: mark the $x$-values of the turning points of $f$, and those become the zeros of $f'$.",
      "Next read the sign. Where $f$ is increasing (going uphill as $x$ increases) the gradient is positive, so $f'$ lies above the $x$-axis there. Where $f$ is decreasing (downhill) the gradient is negative, so $f'$ lies below the $x$-axis. This tells you which side of each zero the derivative graph is on, and it lets you classify the turning points: a maximum of $f$ has $f$ rising then falling, so $f'$ goes from positive to negative — it crosses the axis with a $+\\to-$ sign change. A minimum is the reverse, $-\\to+$.",
      "Now read the steepness for the size. The gradient is not just a sign; it has a magnitude. The steeper the curve of $f$, the further $f'$ is from the $x$-axis. A nearly flat stretch of $f$ keeps $f'$ close to zero; a sharply rising stretch sends $f'$ high above the axis. The places where $f$ is at its steepest are exactly the places where $f'$ reaches its own peaks and troughs — and those steepest points of $f$ are its points of inflection.",
      "That observation is the bridge to the second derivative. Repeat the whole process, but now treat $f'$ as the curve and ask for *its* gradient: $f''(x)$ is the gradient of $f'$, the rate at which the slope of $f$ is changing. So the chain is $f \\to f' \\to f''$, each step being 'take the gradient of the previous graph'. Everything you did to get $f'$ from $f$, you do again to get $f''$ from $f'$.",
      "Concavity is what $f''$ measures directly. Where $f$ is concave up (curving like a cup, $\\smile$) the tangent lines are getting steeper as $x$ increases, so the gradient $f'$ is increasing, which means $f''>0$. Where $f$ is concave down (curving like a cap, $\\frown$) the gradient is decreasing, so $f''<0$. You can read concavity straight off the shape of $f$ without ever computing $f'$ first.",
      "The two ideas meet at a point of inflection, where $f$ changes concavity. At such a point $f''=0$ and changes sign. But concavity changing also means the slope $f'$ has stopped increasing and started decreasing (or vice versa) — so $f'$ has a turning point exactly where $f$ has an inflection. This is the easy mistake to avoid: an inflection of $f$ is *not* a zero of $f'$ in general (the curve can still be sloping there); it is a zero of $f''$ and a turning point of $f'$.",
      "Two cautions worth stating before you practise. First, $f'$ being zero does not by itself tell you maximum versus minimum — you must check the sign change, $+\\to-$ for a maximum and $-\\to+$ for a minimum. Second, the derivative graph throws away the vertical position of $f$: shifting $f$ up or down by a constant does not change any gradient, so it leaves $f'$ completely unchanged. The derivative sees slope, not height.",
    ],
    latexBlocks: [
      "f'(x) = \\text{gradient of } f \\text{ at } x, \\qquad f''(x) = \\text{gradient of } f' \\text{ at } x",
      "\\text{stationary point of } f \\;\\Leftrightarrow\\; f'(x)=0 \\;\\;(x\\text{-intercept of } f')",
      "f \\text{ increasing} \\Rightarrow f'>0, \\qquad f \\text{ decreasing} \\Rightarrow f'<0",
      "f \\text{ concave up} \\Rightarrow f''>0, \\qquad f \\text{ concave down} \\Rightarrow f''<0",
      "\\text{inflection of } f: \\; f''=0 \\text{ (sign change)}, \\; f' \\text{ has a turning point}",
      "\\text{max of } f: \\; f' \\text{ crosses } +\\to-; \\qquad \\text{min of } f: \\; f' \\text{ crosses } -\\to+",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Sign of f′ from increasing/decreasing",
      questionLatex:
        "\\text{A function } f \\text{ is decreasing for } x<3 \\text{ and increasing for } x>3. \\text{ Describe } f'(x).",
      steps: [
        { explanation: "Decreasing means the gradient is negative there.", latex: "x<3:\\; f'(x)<0" },
        { explanation: "Increasing means the gradient is positive there.", latex: "x>3:\\; f'(x)>0" },
        { explanation: "The change happens at the minimum, where the gradient is zero.", latex: "x=3:\\; f'(3)=0" },
      ],
      finalAnswerLatex:
        "f' \\text{ is negative, crosses zero at } x=3 \\;(-\\to+), \\text{ then positive: a minimum of } f.",
    },
    {
      title: "Worked example 2: Turning points of f become zeros of f′",
      questionLatex:
        "\\text{A cubic } f \\text{ has a maximum at } x=-1 \\text{ and a minimum at } x=2. \\text{ Where does } f'(x)=0?",
      steps: [
        { explanation: "Every turning point of $f$ has a horizontal tangent, so $f'=0$ there.", latex: "f'(-1)=0, \\quad f'(2)=0" },
        { explanation: "Between the max and min, $f$ is decreasing, so $f'$ is below the axis.", latex: "-1<x<2:\\; f'(x)<0" },
        { explanation: "Outside that interval $f$ is increasing, so $f'$ is above the axis.", latex: "x<-1 \\text{ or } x>2:\\; f'(x)>0" },
      ],
      finalAnswerLatex:
        "f'(x)=0 \\text{ at } x=-1 \\text{ and } x=2; \\; f' \\text{ is an upward parabola with these roots.}",
    },
    {
      title: "Worked example 3: Concavity gives the sign of f″",
      questionLatex:
        "\\text{For } f(x)=x^3, \\text{ use concavity to state the sign of } f''(x) \\text{ on each side of } x=0.",
      steps: [
        { explanation: "For $x<0$ the cubic curves like a cap (concave down).", latex: "x<0:\\; f''(x)<0" },
        { explanation: "For $x>0$ the cubic curves like a cup (concave up).", latex: "x>0:\\; f''(x)>0" },
        { explanation: "Concavity changes at $x=0$, so that is a point of inflection where $f''=0$.", latex: "f''(0)=0" },
        { explanation: "Check against the rule: $f''(x)=6x$, which is indeed $<0$, $0$, $>0$.", latex: "f''(x)=6x" },
      ],
      finalAnswerLatex:
        "f''<0 \\text{ for } x<0,\\; f''(0)=0,\\; f''>0 \\text{ for } x>0.",
    },
    {
      title: "Worked example 4: Full chain f → f′ → f″ for a quartic-shaped curve",
      questionLatex:
        "\\text{A curve } f \\text{ has minima at } x=-2 \\text{ and } x=2, \\text{ a maximum at } x=0, \\text{ and inflections at } x=\\pm 1. \\text{ Describe } f' \\text{ and the zeros of } f''.",
      steps: [
        { explanation: "All three turning points give zeros of $f'$.", latex: "f'(-2)=f'(0)=f'(2)=0" },
        { explanation: "From a minimum at $-2$ to a maximum at $0$, $f$ rises, so $f'>0$ between them.", latex: "-2<x<0:\\; f'(x)>0" },
        { explanation: "From the maximum at $0$ to the minimum at $2$, $f$ falls, so $f'<0$ between them.", latex: "0<x<2:\\; f'(x)<0" },
        { explanation: "The inflections of $f$ are where $f$ is steepest, so $f'$ turns there — those are the turning points of $f'$ and the zeros of $f''$.", latex: "f''(\\pm 1)=0" },
      ],
      finalAnswerLatex:
        "f' \\text{ has zeros at } -2,0,2 \\text{ with turning points at } \\pm 1; \\; f''=0 \\text{ at } x=\\pm 1.",
    },
  ],
  guidedPractice: [
    {
      id: "sketchderiv-guided-1",
      prompt:
        "At a maximum or minimum turning point of $f$, the value of $f'(x)$ is:",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
        { label: "D", text: "undefined" },
      ],
      hint: "The tangent is horizontal at a turning point.",
      explanation:
        "A turning point has a horizontal tangent, so the gradient $f'(x)=0$. This is why turning points of $f$ sit above $x$-intercepts of $f'$.",
    },
    {
      id: "sketchderiv-guided-2",
      prompt:
        "A function $f$ is increasing on an interval. State the sign of $f'(x)$ there (write 'positive', 'negative' or 'zero').",
      latex: "\\text{Sign of } f'(x)",
      answer: "positive",
      acceptedAnswers: ["Positive", "+", "positive (>0)"],
      hint: "Increasing means going uphill as $x$ increases.",
      explanation:
        "Increasing means the gradient is positive, so $f'(x)>0$ and the derivative graph lies above the $x$-axis on that interval.",
    },
    {
      id: "sketchderiv-guided-3",
      prompt:
        "A curve $f$ is concave down on an interval. State the sign of $f''(x)$ there (write 'positive', 'negative' or 'zero').",
      latex: "\\text{Sign of } f''(x)",
      answer: "negative",
      acceptedAnswers: ["Negative", "-", "−", "negative (<0)"],
      hint: "Concave down is the cap shape $\\frown$; the slope is decreasing.",
      explanation:
        "Concave down means the gradient $f'$ is decreasing, so its rate of change $f''(x)<0$.",
    },
    {
      id: "sketchderiv-guided-4",
      prompt:
        "A function $f$ has a maximum turning point at $x=4$. As $f'$ crosses the $x$-axis at $x=4$, it changes from:",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "positive to negative" },
        { label: "B", text: "negative to positive" },
        { label: "C", text: "zero to positive" },
        { label: "D", text: "negative to zero only" },
      ],
      hint: "At a maximum $f$ rises then falls.",
      explanation:
        "At a maximum $f$ increases ($f'>0$) then decreases ($f'<0$), so $f'$ crosses from $+$ to $-$. The reverse ($-\\to+$) signals a minimum.",
    },
  ],
  independentPractice: [
    {
      id: "sketchderiv-ind-1",
      prompt:
        "A function $f$ is decreasing for all $x$ in an interval. State the sign of $f'(x)$ there (write 'positive', 'negative' or 'zero').",
      latex: "\\text{Sign of } f'(x)",
      answer: "negative",
      acceptedAnswers: ["Negative", "-", "−"],
      hint: "Downhill as $x$ increases.",
      explanation:
        "Decreasing means a negative gradient, so $f'(x)<0$ and the derivative graph lies below the $x$-axis.",
    },
    {
      id: "sketchderiv-ind-2",
      prompt:
        "A curve $f$ is concave up throughout an interval. State the sign of $f''(x)$ (write 'positive', 'negative' or 'zero').",
      latex: "\\text{Sign of } f''(x)",
      answer: "positive",
      acceptedAnswers: ["Positive", "+"],
      hint: "Concave up is the cup shape $\\smile$; the slope is increasing.",
      explanation:
        "Concave up means $f'$ is increasing, so $f''(x)>0$.",
    },
    {
      id: "sketchderiv-ind-3",
      prompt:
        "A cubic $f$ has turning points at $x=-3$ and $x=1$. How many $x$-intercepts does the graph of $y=f'(x)$ have? Give a number.",
      latex: "\\text{Number of } x\\text{-intercepts of } f'",
      answer: "2",
      acceptedAnswers: ["two"],
      hint: "Each turning point gives a zero of $f'$.",
      explanation:
        "Each turning point of $f$ is a zero of $f'$. Two turning points give two $x$-intercepts of $f'$ (at $x=-3$ and $x=1$).",
    },
    {
      id: "sketchderiv-ind-4",
      prompt:
        "Two functions differ only by a constant: $g(x)=f(x)+5$. Compared with $f'(x)$, the graph of $g'(x)$ is:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "shifted up by 5" },
        { label: "B", text: "exactly the same as $f'(x)$" },
        { label: "C", text: "shifted down by 5" },
        { label: "D", text: "multiplied by 5" },
      ],
      hint: "Does adding a constant change any gradient?",
      explanation:
        "Adding a constant shifts $f$ vertically but changes no gradient, so $g'(x)=f'(x)$. The derivative sees slope, not height.",
    },
    {
      id: "sketchderiv-ind-5",
      prompt:
        "A point of inflection of $f$ corresponds to which feature on the graph of $f'$? Answer in one short phrase.",
      latex: "\\text{Feature of } f'",
      answer: "turning point",
      acceptedAnswers: [
        "a turning point",
        "turning point of f'",
        "maximum or minimum",
        "stationary point",
      ],
      hint: "At an inflection the slope $f'$ stops increasing and starts decreasing (or vice versa).",
      explanation:
        "At an inflection of $f$ the gradient $f'$ reaches a maximum or minimum, so $f'$ has a turning point there (and $f''=0$).",
    },
  ],
  commonMistakes: [
    {
      mistake:
        "Thinking a point of inflection of $f$ is an $x$-intercept of $f'$.",
      fix: "An inflection makes $f''=0$ and $f'$ turn, not $f'=0$. $f'$ is zero only at stationary points of $f$.",
    },
    {
      mistake:
        "Reading $f'(x)=0$ as 'maximum' without checking the sign change.",
      fix: "Check the change: $+\\to-$ is a maximum, $-\\to+$ is a minimum. No sign change is a horizontal inflection.",
    },
    {
      mistake:
        "Confusing the sign of $f'$ (increasing/decreasing) with the sign of $f''$ (concavity).",
      fix: "$f'$ tells you up/down hill; $f''$ tells you the cup/cap curving. They are independent — a curve can be increasing yet concave down.",
    },
    {
      mistake:
        "Forgetting that vertical shifts of $f$ leave $f'$ unchanged.",
      fix: "Only the slope matters. $f(x)$ and $f(x)+c$ have identical derivative graphs.",
    },
  ],
  masteryQuiz: [
    {
      id: "sketchderiv-m-1",
      prompt: "At a stationary point of $f$, $f'(x)$ equals:",
      latex: "\\text{Choose one}",
      answer: "C",
      difficulty: 3,
      choices: [
        { label: "A", text: "a maximum value" },
        { label: "B", text: "1" },
        { label: "C", text: "0" },
        { label: "D", text: "undefined" },
      ],
      hint: "Horizontal tangent.",
      explanation: "A stationary point has a horizontal tangent, so $f'(x)=0$.",
    },
    {
      id: "sketchderiv-m-2",
      prompt:
        "$f$ is increasing on $(2,5)$. State the sign of $f'$ on $(2,5)$ (positive/negative/zero).",
      latex: "\\text{Sign of } f'",
      answer: "positive",
      difficulty: 3,
      acceptedAnswers: ["Positive", "+"],
      hint: "Uphill.",
      explanation: "Increasing $\\Rightarrow f'>0$.",
    },
    {
      id: "sketchderiv-m-3",
      prompt:
        "$f$ is concave down on $(0,4)$. State the sign of $f''$ on $(0,4)$ (positive/negative/zero).",
      latex: "\\text{Sign of } f''",
      answer: "negative",
      difficulty: 3,
      acceptedAnswers: ["Negative", "-", "−"],
      hint: "Cap shape, slope decreasing.",
      explanation: "Concave down $\\Rightarrow f''<0$.",
    },
    {
      id: "sketchderiv-m-4",
      prompt:
        "A minimum turning point of $f$ shows up on the graph of $f'$ as a crossing from:",
      latex: "\\text{Choose one}",
      answer: "B",
      difficulty: 3,
      choices: [
        { label: "A", text: "positive to negative" },
        { label: "B", text: "negative to positive" },
        { label: "C", text: "a turning point, not a crossing" },
        { label: "D", text: "no change of sign" },
      ],
      hint: "At a minimum $f$ falls then rises.",
      explanation: "Minimum: $f'$ goes $-\\to+$, crossing the axis from below to above.",
    },
    {
      id: "sketchderiv-m-5",
      prompt:
        "A quartic-shaped $f$ has three turning points. How many $x$-intercepts does $f'$ have? Give a number.",
      latex: "\\text{Number}",
      answer: "3",
      difficulty: 4,
      acceptedAnswers: ["three"],
      hint: "One zero of $f'$ per turning point.",
      explanation: "Three turning points $\\Rightarrow$ three zeros of $f'$.",
    },
    {
      id: "sketchderiv-m-6",
      prompt:
        "At a point of inflection of $f$, the graph of $f'$ has a ___ and the graph of $f''$ has a ___. Choose the pair.",
      latex: "\\text{Choose one}",
      answer: "A",
      difficulty: 4,
      choices: [
        { label: "A", text: "turning point; $x$-intercept" },
        { label: "B", text: "$x$-intercept; turning point" },
        { label: "C", text: "maximum; maximum" },
        { label: "D", text: "$x$-intercept; $x$-intercept" },
      ],
      hint: "$f''=0$ at an inflection; $f'$ stops increasing.",
      explanation:
        "At an inflection $f''=0$ (an $x$-intercept of $f''$) and $f'$ has a turning point.",
    },
    {
      id: "sketchderiv-m-7",
      prompt:
        "$g(x)=f(x)-7$. How does the graph of $g'$ compare with $f'$?",
      latex: "\\text{Choose one}",
      answer: "C",
      difficulty: 4,
      choices: [
        { label: "A", text: "shifted down 7" },
        { label: "B", text: "shifted up 7" },
        { label: "C", text: "identical to $f'$" },
        { label: "D", text: "reflected in the $x$-axis" },
      ],
      hint: "Constant shifts change no gradient.",
      explanation: "$g'(x)=f'(x)$: vertical shifts leave the derivative unchanged.",
    },
    {
      id: "sketchderiv-m-8",
      prompt:
        "For $f(x)=x^2$, the graph of $f'(x)$ is a straight line. State the sign of $f'$ for $x<0$ (positive/negative/zero).",
      latex: "f(x)=x^2",
      answer: "negative",
      difficulty: 5,
      acceptedAnswers: ["Negative", "-", "−"],
      hint: "$f'(x)=2x$.",
      explanation:
        "$f'(x)=2x$, which is negative for $x<0$ — matching that $x^2$ is decreasing there.",
    },
    {
      id: "sketchderiv-m-9",
      prompt:
        "$f$ is increasing and concave down on an interval. Which pair of signs is correct for $(f',\\,f'')$?",
      latex: "\\text{Choose one}",
      answer: "B",
      difficulty: 5,
      choices: [
        { label: "A", text: "$(+,\\,+)$" },
        { label: "B", text: "$(+,\\,-)$" },
        { label: "C", text: "$(-,\\,+)$" },
        { label: "D", text: "$(-,\\,-)$" },
      ],
      hint: "Increasing fixes $f'$; concave down fixes $f''$.",
      explanation:
        "Increasing $\\Rightarrow f'>0$; concave down $\\Rightarrow f''<0$. So $(+,-)$ — a curve can rise while its slope decreases.",
    },
    {
      id: "sketchderiv-m-10",
      prompt:
        "$f''(x)>0$ for all $x$. Choose the true statement about the graph of $f$.",
      latex: "\\text{Choose one}",
      answer: "A",
      difficulty: 5,
      choices: [
        { label: "A", text: "$f$ is concave up everywhere (no inflections)" },
        { label: "B", text: "$f$ is increasing everywhere" },
        { label: "C", text: "$f$ has a maximum" },
        { label: "D", text: "$f'$ is constant" },
      ],
      hint: "$f''$ controls concavity, not increasing/decreasing.",
      explanation:
        "$f''>0$ everywhere means concave up throughout with no inflection. It says nothing about whether $f$ itself rises or falls.",
    },
  ],
  masteryQuizPool: [
    { id: "sketchderiv-p-1", prompt: "At a stationary point of $f$, $f'$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "large" }, { label: "B", text: "1" }, { label: "C", text: "0" }, { label: "D", text: "negative" }], hint: "Horizontal tangent.", explanation: "$f'=0$ at a stationary point." },
    { id: "sketchderiv-p-2", prompt: "$f$ increasing $\\Rightarrow$ sign of $f'$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "positive", difficulty: 1, acceptedAnswers: ["Positive", "+"], hint: "Uphill.", explanation: "Increasing means $f'>0$." },
    { id: "sketchderiv-p-3", prompt: "$f$ decreasing $\\Rightarrow$ sign of $f'$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "negative", difficulty: 1, acceptedAnswers: ["Negative", "-", "−"], hint: "Downhill.", explanation: "Decreasing means $f'<0$." },
    { id: "sketchderiv-p-4", prompt: "$f$ concave up $\\Rightarrow$ sign of $f''$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "positive", difficulty: 2, acceptedAnswers: ["Positive", "+"], hint: "Cup $\\smile$.", explanation: "Concave up means $f''>0$." },
    { id: "sketchderiv-p-5", prompt: "$f$ concave down $\\Rightarrow$ sign of $f''$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "negative", difficulty: 2, acceptedAnswers: ["Negative", "-", "−"], hint: "Cap $\\frown$.", explanation: "Concave down means $f''<0$." },
    { id: "sketchderiv-p-6", prompt: "A turning point of $f$ corresponds to which feature of $f'$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "a turning point" }, { label: "B", text: "an $x$-intercept" }, { label: "C", text: "an asymptote" }, { label: "D", text: "a maximum" }], hint: "$f'=0$ there.", explanation: "It is an $x$-intercept of $f'$." },
    { id: "sketchderiv-p-7", prompt: "A maximum of $f$ makes $f'$ cross from:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "positive to negative" }, { label: "B", text: "negative to positive" }, { label: "C", text: "zero to zero" }, { label: "D", text: "no crossing" }], hint: "Rises then falls.", explanation: "Maximum: $f'$ goes $+\\to-$." },
    { id: "sketchderiv-p-8", prompt: "A minimum of $f$ makes $f'$ cross from:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "positive to negative" }, { label: "B", text: "negative to positive" }, { label: "C", text: "no crossing" }, { label: "D", text: "positive to zero only" }], hint: "Falls then rises.", explanation: "Minimum: $f'$ goes $-\\to+$." },
    { id: "sketchderiv-p-9", prompt: "The steeper the graph of $f$, the value of $|f'|$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "larger" }, { label: "B", text: "smaller" }, { label: "C", text: "unchanged" }, { label: "D", text: "zero" }], hint: "Slope magnitude.", explanation: "Steeper means a larger magnitude of gradient." },
    { id: "sketchderiv-p-10", prompt: "$f''$ is the gradient of which graph?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$f$" }, { label: "B", text: "$f'$" }, { label: "C", text: "the $x$-axis" }, { label: "D", text: "$f''$ itself" }], hint: "Gradient of gradient.", explanation: "$f''$ is the gradient of $f'$." },
    { id: "sketchderiv-p-11", prompt: "A cubic with 2 turning points: how many zeros does $f'$ have? (number)", latex: "\\text{Number}", answer: "2", difficulty: 3, acceptedAnswers: ["two"], hint: "One per turning point.", explanation: "Two turning points give two zeros of $f'$." },
    { id: "sketchderiv-p-12", prompt: "An inflection of $f$ corresponds to which feature of $f'$?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "a turning point" }, { label: "B", text: "an $x$-intercept" }, { label: "C", text: "an asymptote" }, { label: "D", text: "nothing" }], hint: "Slope stops increasing.", explanation: "$f'$ has a turning point at an inflection of $f$." },
    { id: "sketchderiv-p-13", prompt: "An inflection of $f$ corresponds to which feature of $f''$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "a turning point" }, { label: "B", text: "an $x$-intercept (sign change)" }, { label: "C", text: "a maximum" }, { label: "D", text: "nothing" }], hint: "$f''=0$ and changes sign.", explanation: "$f''=0$ with a sign change: an $x$-intercept of $f''$." },
    { id: "sketchderiv-p-14", prompt: "$g(x)=f(x)+10$. The graph of $g'$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "shifted up 10" }, { label: "B", text: "shifted down 10" }, { label: "C", text: "identical to $f'$" }, { label: "D", text: "scaled by 10" }], hint: "Constant shift.", explanation: "Vertical shifts leave $f'$ unchanged." },
    { id: "sketchderiv-p-15", prompt: "For $f(x)=x^2$, sign of $f'$ when $x>0$? (positive/negative/zero)", latex: "f(x)=x^2", answer: "positive", difficulty: 3, acceptedAnswers: ["Positive", "+"], hint: "$f'=2x$.", explanation: "$f'(x)=2x>0$ for $x>0$." },
    { id: "sketchderiv-p-16", prompt: "For $f(x)=x^2$, sign of $f'$ when $x<0$? (positive/negative/zero)", latex: "f(x)=x^2", answer: "negative", difficulty: 3, acceptedAnswers: ["Negative", "-", "−"], hint: "$f'=2x$.", explanation: "$f'(x)=2x<0$ for $x<0$." },
    { id: "sketchderiv-p-17", prompt: "For $f(x)=x^2$, $f''(x)$ equals: (number)", latex: "f(x)=x^2", answer: "2", difficulty: 3, acceptedAnswers: ["two"], hint: "Differentiate $2x$.", explanation: "$f''(x)=2$: a constant, so $f$ is concave up everywhere." },
    { id: "sketchderiv-p-18", prompt: "If $f'(x)>0$ on an interval, then on that interval $f$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "increasing" }, { label: "B", text: "decreasing" }, { label: "C", text: "concave up" }, { label: "D", text: "constant" }], hint: "Sign of $f'$.", explanation: "$f'>0 \\Rightarrow f$ increasing." },
    { id: "sketchderiv-p-19", prompt: "If $f''(x)<0$ on an interval, then $f$ is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "decreasing" }, { label: "B", text: "concave down" }, { label: "C", text: "increasing" }, { label: "D", text: "linear" }], hint: "Sign of $f''$.", explanation: "$f''<0 \\Rightarrow$ concave down." },
    { id: "sketchderiv-p-20", prompt: "$f$ decreasing and concave up: signs of $(f',f'')$?", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$(+,+)$" }, { label: "B", text: "$(+,-)$" }, { label: "C", text: "$(-,+)$" }, { label: "D", text: "$(-,-)$" }], hint: "Decreasing fixes $f'$; concave up fixes $f''$.", explanation: "$f'<0$, $f''>0$: $(-,+)$." },
    { id: "sketchderiv-p-21", prompt: "$f$ increasing and concave up: signs of $(f',f'')$?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$(+,+)$" }, { label: "B", text: "$(+,-)$" }, { label: "C", text: "$(-,+)$" }, { label: "D", text: "$(-,-)$" }], hint: "Both positive.", explanation: "$f'>0$, $f''>0$: $(+,+)$." },
    { id: "sketchderiv-p-22", prompt: "A horizontal point of inflection of $f$ is a point where $f'=0$ AND $f'$:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "changes sign $+\\to-$" }, { label: "B", text: "touches zero without changing sign" }, { label: "C", text: "changes sign $-\\to+$" }, { label: "D", text: "is undefined" }], hint: "No sign change, so not a max or min.", explanation: "$f'$ touches the axis (a turning point on the axis) without a sign change." },
    { id: "sketchderiv-p-23", prompt: "If the graph of $f'$ is positive then negative then positive, how many turning points does $f$ have? (number)", latex: "\\text{Number}", answer: "2", difficulty: 4, acceptedAnswers: ["two"], hint: "Each sign change of $f'$ is a turning point.", explanation: "Two sign changes ($+\\to-$ and $-\\to+$) give two turning points." },
    { id: "sketchderiv-p-24", prompt: "If $f'$ is a straight line with positive gradient, then $f''$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "a positive constant" }, { label: "B", text: "zero" }, { label: "C", text: "a negative constant" }, { label: "D", text: "a parabola" }], hint: "$f''$ is the gradient of $f'$.", explanation: "A straight $f'$ with positive slope has constant positive gradient, so $f''$ is a positive constant." },
    { id: "sketchderiv-p-25", prompt: "Where $f'$ reaches a maximum, the graph of $f$ has its:", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "maximum" }, { label: "B", text: "minimum" }, { label: "C", text: "steepest upward point (an inflection)" }, { label: "D", text: "$x$-intercept" }], hint: "Max of $f'$ = max gradient.", explanation: "A peak of $f'$ is the steepest rise of $f$, which occurs at a point of inflection." },
    { id: "sketchderiv-p-26", prompt: "$f''(x)<0$ for all $x$. The graph of $f$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "concave down everywhere" }, { label: "B", text: "decreasing everywhere" }, { label: "C", text: "increasing everywhere" }, { label: "D", text: "a straight line" }], hint: "$f''$ controls concavity.", explanation: "$f''<0$ everywhere means concave down throughout; it does not fix increasing/decreasing." },
    { id: "sketchderiv-p-27", prompt: "$f$ has a maximum at $x=0$. Just to the right of $0$, sign of $f'$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "negative", difficulty: 5, acceptedAnswers: ["Negative", "-", "−"], hint: "After a max $f$ falls.", explanation: "Past a maximum $f$ decreases, so $f'<0$ just to the right." },
    { id: "sketchderiv-p-28", prompt: "$f$ has a minimum at $x=0$. Just to the left of $0$, sign of $f'$? (positive/negative/zero)", latex: "\\text{Sign}", answer: "negative", difficulty: 5, acceptedAnswers: ["Negative", "-", "−"], hint: "Before a min $f$ falls.", explanation: "Approaching a minimum from the left, $f$ is decreasing, so $f'<0$." },
    { id: "sketchderiv-p-29", prompt: "For $f(x)=x^3$, $f''(x)=6x$. Sign of $f''$ for $x<0$? (positive/negative/zero)", latex: "f(x)=x^3", answer: "negative", difficulty: 5, acceptedAnswers: ["Negative", "-", "−"], hint: "$6x$ with $x<0$.", explanation: "$f''(x)=6x<0$ for $x<0$: concave down there, matching the cap shape." },
    { id: "sketchderiv-p-30", prompt: "For $f(x)=x^3$, how many points of inflection does $f$ have? (number)", latex: "f(x)=x^3", answer: "1", difficulty: 4, acceptedAnswers: ["one"], hint: "Where $f''=6x$ changes sign.", explanation: "$f''=6x$ changes sign once (at $x=0$), so there is one inflection." },
  ],
  multiPartPractice: [
    {
      id: "sketchderiv-mp-1",
      prompt:
        "A cubic function $f$ has a maximum turning point at $x=-2$ and a minimum turning point at $x=3$. Its derivative $f'$ is therefore a parabola. Answer the parts about the graph of $y=f'(x)$.",
      latex: "f \\text{ has a maximum at } x=-2 \\text{ and a minimum at } x=3.",
      answer: "2",
      hint: "Turning points of $f$ are zeros of $f'$; the sign of $f'$ matches increasing/decreasing of $f$.",
      explanation:
        "$f'$ is an upward parabola with roots at $x=-2$ and $x=3$. (a) It has 2 $x$-intercepts. (b) Between the max and min, $f$ decreases, so $f'<0$ there: the sign is negative. (c) The vertex of $f'$ sits at the midpoint of the roots, $x=\\tfrac{-2+3}{2}=0.5$, which is the inflection of $f$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "How many $x$-intercepts does the graph of $f'$ have?",
          latex: "\\text{Number of intercepts}",
          marks: 1,
          answer: "2",
          acceptedAnswers: ["two"],
          hint: "One zero of $f'$ per turning point of $f$.",
          explanation:
            "Each turning point of $f$ ($x=-2$ and $x=3$) is a zero of $f'$, giving 2 $x$-intercepts.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "On the interval $-2<x<3$, state the sign of $f'(x)$ (positive/negative/zero).",
          latex: "-2<x<3",
          marks: 2,
          answer: "negative",
          acceptedAnswers: ["Negative", "-", "−"],
          hint: "Between a maximum and the following minimum, is $f$ rising or falling?",
          explanation:
            "From the maximum at $x=-2$ down to the minimum at $x=3$, $f$ is decreasing, so $f'(x)<0$: the sign is negative.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "The vertex of the parabola $f'$ sits at the $x$-value of $f$'s point of inflection. Find that $x$-value.",
          latex: "x=\\tfrac{-2+3}{2}",
          marks: 2,
          answer: "0.5",
          acceptedAnswers: ["1/2", "\\frac{1}{2}", "0.50"],
          hint: "The vertex is midway between the two roots of $f'$.",
          explanation:
            "The roots of $f'$ are $-2$ and $3$; the vertex (and the inflection of $f$) is at their midpoint $x=\\tfrac{-2+3}{2}=0.5$.",
        },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const differentiabilityAndContinuityLesson: ExplicitLesson = {
  id: "differentiability-and-continuity",
  slug: "differentiability-and-continuity",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiability and Continuity",
  description:
    "Define differentiability via the limit of the difference quotient, show differentiable implies continuous (but not the converse), and identify corners, cusps and vertical tangents where a continuous function fails to be differentiable.",
  syllabusArea: "Calculus",
  focus: "Applications of calculus",
  status: "active",
  video: {
    title: "Differentiability and Continuity",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn the limit definition of differentiability, why differentiable implies continuous, and how to spot points where a continuous function is not differentiable.",
  successCriteria: [
    "State that $f$ is differentiable at $x=a$ if $\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$ exists.",
    "Explain differentiability as the existence of a single, non-vertical tangent line.",
    "Justify that differentiable at $x=a$ implies continuous at $x=a$.",
    "Recognise that continuous does NOT imply differentiable (the converse fails).",
    "Identify corners (e.g. $y=|x|$ at $x=0$), cusps and vertical tangents as non-differentiable points.",
    "Test a piecewise function for differentiability where its pieces join.",
  ],
  teaching: {
    paragraphs: [
      "Differentiability is just a precise way of asking: does this graph have a single, well-defined tangent line at a point — one straight line that the curve hugs as you zoom in? If you can zoom in on the point and the graph looks more and more like one straight (non-vertical) line, the function is differentiable there, and the gradient of that line is $f'(a)$.",
      "The formal version of 'zoom in and look at the slope' is the limit of the difference quotient. The fraction $\\frac{f(a+h)-f(a)}{h}$ is the gradient of the chord (secant) joining the point $(a,f(a))$ to a nearby point a distance $h$ away. As $h\\to 0$ the second point slides towards the first, and the chord rotates towards the tangent. We say $f$ is differentiable at $x=a$ exactly when this limit exists: $f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$.",
      "For the limit to exist, the chord must approach the *same* gradient whether the nearby point comes in from the right ($h\\to 0^+$) or from the left ($h\\to 0^-$). If the left-hand and right-hand limits disagree, there is no single tangent, and the function is not differentiable there even though the graph may be perfectly unbroken.",
      "Differentiability is a stronger condition than continuity, and there is a clean one-way implication: if $f$ is differentiable at $x=a$ then $f$ is continuous at $x=a$. The reason is direct. We can write $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$. As $h\\to 0$ the first factor tends to the finite number $f'(a)$ and the second tends to $0$, so their product tends to $0$. That means $f(a+h)\\to f(a)$, which is exactly the statement that $f$ is continuous at $a$. A graph with a tangent cannot have a break in it.",
      "The converse is false, and this is the heart of the lesson: continuous does not imply differentiable. A function can be perfectly continuous — drawable without lifting the pen — yet still fail to have a tangent at a point. The classic example is $y=|x|$ at $x=0$. The graph is an unbroken V, so it is continuous everywhere. But coming in from the left the gradient is $-1$, and coming in from the right it is $+1$. The two one-sided gradients disagree, the limit of the difference quotient does not exist, and so $|x|$ is not differentiable at $x=0$.",
      "There are three standard ways a continuous function fails to be differentiable, and all are about the tangent. A corner (or sharp point) is where two different gradients meet, like the V of $|x|$ — the left and right slopes are finite but unequal. A cusp is a sharper version where the curve comes to a spike and the two sides have slopes heading to $+\\infty$ and $-\\infty$. A vertical tangent is where the tangent line exists geometrically but is vertical, so its gradient is infinite and $f'(a)$ is undefined (for example $y=\\sqrt[3]{x}$ at $x=0$). In every case the curve is continuous but has no single finite gradient.",
      "Piecewise functions are where this is tested most often. When two pieces are stitched together at $x=a$, ask two separate questions. First, do the pieces meet — does the left piece and the right piece give the same value at $x=a$? If not, there is a jump and the function is not even continuous (so certainly not differentiable). Second, if they do meet, do the pieces arrive with the same gradient? Compute the derivative of each piece and evaluate at $x=a$: if the left gradient equals the right gradient, the join is smooth and differentiable; if they differ, you have a corner — continuous but not differentiable.",
      "Hold on to the logic in one direction only. 'Differentiable $\\Rightarrow$ continuous' is always true, so a discontinuity instantly rules out differentiability. But 'continuous $\\Rightarrow$ differentiable' is not a rule you can use — you must check the gradients. The common slip is to assume that because a piecewise graph joins up neatly it must be smooth; meeting in value is necessary but not sufficient, and the slopes must match too.",
    ],
    latexBlocks: [
      "f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h} \\quad (\\text{differentiable if this limit exists})",
      "\\lim_{h\\to 0^-}\\frac{f(a+h)-f(a)}{h}=\\lim_{h\\to 0^+}\\frac{f(a+h)-f(a)}{h} \\;\\text{ required}",
      "\\text{differentiable at } a \\;\\Rightarrow\\; \\text{continuous at } a",
      "\\text{continuous at } a \\;\\not\\Rightarrow\\; \\text{differentiable at } a",
      "\\text{not differentiable: corners, cusps, vertical tangents} \\;(\\text{e.g. } y=|x| \\text{ at } x=0)",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: The corner of y = |x|",
      questionLatex:
        "\\text{Show that } f(x)=|x| \\text{ is continuous but not differentiable at } x=0.",
      steps: [
        { explanation: "At $x=0$ the graph is unbroken (value $0$ from both sides), so it is continuous.", latex: "\\lim_{x\\to 0}|x|=0=f(0)" },
        { explanation: "From the right, $|x|=x$, so the gradient is $+1$.", latex: "\\lim_{h\\to 0^+}\\frac{|0+h|-0}{h}=\\frac{h}{h}=1" },
        { explanation: "From the left, $|x|=-x$, so the gradient is $-1$.", latex: "\\lim_{h\\to 0^-}\\frac{|0+h|-0}{h}=\\frac{-h}{h}=-1" },
        { explanation: "The one-sided limits disagree, so the difference-quotient limit does not exist.", latex: "1 \\neq -1" },
      ],
      finalAnswerLatex:
        "f \\text{ is continuous at } 0 \\text{ but not differentiable: a corner.}",
    },
    {
      title: "Worked example 2: Differentiable implies continuous",
      questionLatex:
        "\\text{Explain why a function differentiable at } x=a \\text{ must be continuous at } x=a.",
      steps: [
        { explanation: "Write the change in $f$ as the difference quotient times $h$.", latex: "f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h" },
        { explanation: "As $h\\to 0$ the quotient tends to the finite number $f'(a)$.", latex: "\\frac{f(a+h)-f(a)}{h}\\to f'(a)" },
        { explanation: "A finite number times $h\\to 0$ gives $0$.", latex: "f'(a)\\cdot 0 = 0" },
        { explanation: "So $f(a+h)\\to f(a)$, which is continuity at $a$.", latex: "\\lim_{h\\to 0} f(a+h)=f(a)" },
      ],
      finalAnswerLatex:
        "\\text{Differentiable at } a \\Rightarrow \\text{continuous at } a.",
    },
    {
      title: "Worked example 3: A continuous join that is not smooth",
      questionLatex:
        "f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ 2x-2 & x>1 \\end{cases}. \\text{ Is } f \\text{ differentiable at } x=1?",
      steps: [
        { explanation: "Check the pieces meet: evaluate each at $x=1$.", latex: "1^2=1, \\quad 2(1)-2=0" },
        { explanation: "The values differ, so there is a jump — $f$ is not even continuous at $x=1$.", latex: "1 \\neq 0" },
        { explanation: "A discontinuity rules out differentiability immediately.", latex: "\\text{not continuous} \\Rightarrow \\text{not differentiable}" },
      ],
      finalAnswerLatex:
        "f \\text{ is not differentiable at } x=1 \\text{ (it is discontinuous there).}",
    },
    {
      title: "Worked example 4: A piecewise function that IS differentiable",
      questionLatex:
        "f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ 2x-1 & x>1 \\end{cases}. \\text{ Is } f \\text{ differentiable at } x=1?",
      steps: [
        { explanation: "Check the pieces meet in value at $x=1$.", latex: "1^2=1, \\quad 2(1)-1=1 \\;\\Rightarrow\\; \\text{continuous}" },
        { explanation: "Differentiate each piece.", latex: "\\tfrac{d}{dx}(x^2)=2x, \\quad \\tfrac{d}{dx}(2x-1)=2" },
        { explanation: "Compare the one-sided gradients at $x=1$.", latex: "\\text{left: } 2(1)=2, \\quad \\text{right: } 2" },
        { explanation: "The values meet and the gradients match, so the join is smooth.", latex: "2=2" },
      ],
      finalAnswerLatex:
        "f \\text{ is differentiable at } x=1 \\text{ with } f'(1)=2.",
    },
  ],
  guidedPractice: [
    {
      id: "diffcont-guided-1",
      prompt:
        "A function $f$ is differentiable at $x=a$ when which quantity exists?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$f(a)$" },
        { label: "B", text: "$\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$" },
        { label: "C", text: "$\\lim_{h\\to 0} f(a+h)$" },
        { label: "D", text: "$f(a+h)-f(a)$" },
      ],
      hint: "Differentiability is about the limit of the gradient of a chord.",
      explanation:
        "$f$ is differentiable at $a$ exactly when the limit of the difference quotient $\\frac{f(a+h)-f(a)}{h}$ exists.",
    },
    {
      id: "diffcont-guided-2",
      prompt:
        "Is $y=|x|$ continuous at $x=0$? Answer 'yes' or 'no'.",
      latex: "y=|x|",
      answer: "yes",
      acceptedAnswers: ["Yes", "continuous"],
      hint: "Can you draw the V without lifting the pen?",
      explanation:
        "The graph of $|x|$ is an unbroken V, so it is continuous at $x=0$ — even though it is not differentiable there.",
    },
    {
      id: "diffcont-guided-3",
      prompt:
        "Is $y=|x|$ differentiable at $x=0$? Answer 'yes' or 'no'.",
      latex: "y=|x|",
      answer: "no",
      acceptedAnswers: ["No", "not differentiable"],
      hint: "Compare the gradient coming from the left ($-1$) and the right ($+1$).",
      explanation:
        "The left gradient is $-1$ and the right gradient is $+1$; they disagree, so the difference-quotient limit does not exist. Not differentiable.",
    },
    {
      id: "diffcont-guided-4",
      prompt:
        "If $f$ is differentiable at $x=a$, then $f$ is also ___ at $x=a$. Fill the blank with one word.",
      latex: "\\text{differentiable} \\Rightarrow \\;?",
      answer: "continuous",
      acceptedAnswers: ["Continuous"],
      hint: "Having a tangent means having no break.",
      explanation:
        "Differentiable $\\Rightarrow$ continuous: if a tangent exists the graph cannot jump. (The reverse is not guaranteed.)",
    },
  ],
  independentPractice: [
    {
      id: "diffcont-ind-1",
      prompt:
        "Does 'continuous at $x=a$' guarantee 'differentiable at $x=a$'? Answer 'yes' or 'no'.",
      latex: "\\text{continuous} \\Rightarrow \\text{differentiable?}",
      answer: "no",
      acceptedAnswers: ["No"],
      hint: "Think of $y=|x|$ at $x=0$.",
      explanation:
        "No. The converse fails: $y=|x|$ is continuous at $0$ but not differentiable there. Continuity is necessary, not sufficient.",
    },
    {
      id: "diffcont-ind-2",
      prompt:
        "A continuous curve comes to a sharp spike where the slopes on each side head to $+\\infty$ and $-\\infty$. This feature is called a:",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "corner" },
        { label: "B", text: "jump" },
        { label: "C", text: "cusp" },
        { label: "D", text: "asymptote" },
      ],
      hint: "Sharper than a corner; the slopes blow up.",
      explanation:
        "A cusp is a spike where the one-sided slopes tend to $+\\infty$ and $-\\infty$. The function is continuous but not differentiable there.",
    },
    {
      id: "diffcont-ind-3",
      prompt:
        "At $x=0$ the curve $y=\\sqrt[3]{x}$ has a vertical tangent. State $f'(0)$ as 'undefined' or a number.",
      latex: "y=\\sqrt[3]{x}",
      answer: "undefined",
      acceptedAnswers: ["Undefined", "does not exist", "DNE"],
      hint: "A vertical line has infinite gradient.",
      explanation:
        "A vertical tangent has infinite gradient, so $f'(0)$ is undefined: the function is continuous but not differentiable at $x=0$.",
    },
    {
      id: "diffcont-ind-4",
      prompt:
        "For $f(x)=\\begin{cases} x^2 & x\\le 2 \\\\ 4x-4 & x>2 \\end{cases}$, find the value of the left piece at $x=2$. Give a number.",
      latex: "f(x)=x^2 \\text{ for } x\\le 2",
      answer: "4",
      acceptedAnswers: ["four"],
      hint: "Substitute $x=2$ into $x^2$.",
      explanation:
        "$2^2=4$. The right piece gives $4(2)-4=4$ too, so the pieces meet and $f$ is continuous at $x=2$.",
    },
    {
      id: "diffcont-ind-5",
      prompt:
        "For the same $f$, the left gradient at $x=2$ is $\\frac{d}{dx}(x^2)=2x$ evaluated at $2$, and the right gradient is $\\frac{d}{dx}(4x-4)=4$. Is $f$ differentiable at $x=2$? Answer 'yes' or 'no'.",
      latex: "\\text{left } 2x|_{x=2}=4,\\; \\text{right }=4",
      answer: "yes",
      acceptedAnswers: ["Yes", "differentiable"],
      hint: "Do the two one-sided gradients match?",
      explanation:
        "Left gradient $2(2)=4$ equals the right gradient $4$, and the pieces meet in value, so the join is smooth: differentiable with $f'(2)=4$.",
    },
  ],
  commonMistakes: [
    {
      mistake:
        "Assuming a continuous graph is automatically differentiable.",
      fix: "Continuity is necessary but not sufficient. $y=|x|$ is continuous at $0$ yet has no tangent there. Always check the gradients.",
    },
    {
      mistake:
        "Checking only that piecewise pieces meet in value, then declaring it differentiable.",
      fix: "Matching values gives continuity only. You must also check the one-sided derivatives match for differentiability.",
    },
    {
      mistake:
        "Reversing the implication into 'continuous $\\Rightarrow$ differentiable'.",
      fix: "Only 'differentiable $\\Rightarrow$ continuous' holds. The converse is false.",
    },
    {
      mistake:
        "Thinking a vertical tangent counts as differentiable because a tangent line exists.",
      fix: "A vertical tangent has infinite gradient, so $f'(a)$ is undefined — not differentiable.",
    },
  ],
  masteryQuiz: [
    {
      id: "diffcont-m-1",
      prompt: "$f$ is differentiable at $a$ when which limit exists?",
      latex: "\\text{Choose one}",
      answer: "A",
      difficulty: 3,
      choices: [
        { label: "A", text: "$\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$" },
        { label: "B", text: "$\\lim_{h\\to 0} f(a+h)$" },
        { label: "C", text: "$\\lim_{x\\to\\infty} f(x)$" },
        { label: "D", text: "$f(a)$" },
      ],
      hint: "Difference quotient.",
      explanation: "The limit of $\\frac{f(a+h)-f(a)}{h}$ must exist.",
    },
    {
      id: "diffcont-m-2",
      prompt: "Differentiable at $a$ implies $f$ is ___ at $a$. One word.",
      latex: "\\text{Fill the blank}",
      answer: "continuous",
      difficulty: 3,
      acceptedAnswers: ["Continuous"],
      hint: "No break.",
      explanation: "Differentiable $\\Rightarrow$ continuous.",
    },
    {
      id: "diffcont-m-3",
      prompt: "Is $y=|x|$ differentiable at $x=0$? (yes/no)",
      latex: "y=|x|",
      answer: "no",
      difficulty: 3,
      acceptedAnswers: ["No"],
      hint: "Slopes $-1$ and $+1$.",
      explanation: "One-sided gradients disagree, so no.",
    },
    {
      id: "diffcont-m-4",
      prompt: "Does continuous imply differentiable? (yes/no)",
      latex: "\\text{continuous} \\Rightarrow \\text{differentiable?}",
      answer: "no",
      difficulty: 3,
      acceptedAnswers: ["No"],
      hint: "Converse fails.",
      explanation: "No — $|x|$ is the counterexample.",
    },
    {
      id: "diffcont-m-5",
      prompt: "A point where two finite but unequal slopes meet is a:",
      latex: "\\text{Choose one}",
      answer: "B",
      difficulty: 4,
      choices: [
        { label: "A", text: "cusp" },
        { label: "B", text: "corner" },
        { label: "C", text: "jump" },
        { label: "D", text: "vertical tangent" },
      ],
      hint: "Like the V of $|x|$.",
      explanation: "Two unequal finite slopes meeting is a corner.",
    },
    {
      id: "diffcont-m-6",
      prompt: "At a vertical tangent (e.g. $y=\\sqrt[3]{x}$ at $0$), $f'(0)$ is:",
      latex: "\\text{Choose one}",
      answer: "C",
      difficulty: 4,
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$1$" },
        { label: "C", text: "undefined (infinite gradient)" },
        { label: "D", text: "$-1$" },
      ],
      hint: "Vertical line slope.",
      explanation: "Infinite gradient means $f'$ is undefined: not differentiable.",
    },
    {
      id: "diffcont-m-7",
      prompt:
        "For $f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ x+1 & x>1 \\end{cases}$, find the left value at $x=1$. (number)",
      latex: "x^2 \\text{ at } x=1",
      answer: "1",
      difficulty: 4,
      acceptedAnswers: ["one"],
      hint: "$1^2$.",
      explanation: "$1^2=1$; the right piece gives $1+1=2$, so they do not meet — discontinuous.",
    },
    {
      id: "diffcont-m-8",
      prompt:
        "For that same $f$ (pieces $x^2$ and $x+1$), is it differentiable at $x=1$? (yes/no)",
      latex: "\\text{pieces } x^2,\\, x+1",
      answer: "no",
      difficulty: 5,
      acceptedAnswers: ["No"],
      hint: "The values $1$ and $2$ disagree.",
      explanation: "The pieces do not even meet ($1\\neq 2$), so it is discontinuous and not differentiable.",
    },
    {
      id: "diffcont-m-9",
      prompt:
        "For $f(x)=\\begin{cases} x^2 & x\\le 0 \\\\ x^3 & x>0 \\end{cases}$, compare the one-sided gradients at $x=0$ ($2x$ and $3x^2$). Is $f$ differentiable at $0$? (yes/no)",
      latex: "2x \\text{ vs } 3x^2 \\text{ at } 0",
      answer: "yes",
      difficulty: 5,
      acceptedAnswers: ["Yes"],
      hint: "Both gradients are $0$ at $x=0$, and both pieces give value $0$.",
      explanation:
        "Values meet ($0=0$) and gradients meet ($2(0)=0=3(0)^2$), so $f$ is differentiable at $0$ with $f'(0)=0$.",
    },
    {
      id: "diffcont-m-10",
      prompt:
        "Which statement is always TRUE?",
      latex: "\\text{Choose one}",
      answer: "A",
      difficulty: 5,
      choices: [
        { label: "A", text: "If $f$ is differentiable at $a$, it is continuous at $a$." },
        { label: "B", text: "If $f$ is continuous at $a$, it is differentiable at $a$." },
        { label: "C", text: "Every continuous function has a corner." },
        { label: "D", text: "A vertical tangent makes $f$ differentiable." },
      ],
      hint: "Only one direction of the implication holds.",
      explanation:
        "Only 'differentiable $\\Rightarrow$ continuous' is always true; the others are false.",
    },
  ],
  masteryQuizPool: [
    { id: "diffcont-p-1", prompt: "$f$ differentiable at $a$ means which limit exists?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$" }, { label: "B", text: "$f(a)$" }, { label: "C", text: "$\\lim_{h\\to 0} f(a+h)$" }, { label: "D", text: "$f(a+h)$" }], hint: "Difference quotient.", explanation: "The difference-quotient limit must exist." },
    { id: "diffcont-p-2", prompt: "Differentiable at $a$ implies ___ at $a$. (one word)", latex: "\\text{Fill}", answer: "continuous", difficulty: 1, acceptedAnswers: ["Continuous"], hint: "No break.", explanation: "Differentiable $\\Rightarrow$ continuous." },
    { id: "diffcont-p-3", prompt: "Is $y=|x|$ continuous at $0$? (yes/no)", latex: "y=|x|", answer: "yes", difficulty: 1, acceptedAnswers: ["Yes"], hint: "Unbroken V.", explanation: "Yes, the V is continuous." },
    { id: "diffcont-p-4", prompt: "Is $y=|x|$ differentiable at $0$? (yes/no)", latex: "y=|x|", answer: "no", difficulty: 2, acceptedAnswers: ["No"], hint: "Slopes $\\pm 1$.", explanation: "No: one-sided slopes disagree." },
    { id: "diffcont-p-5", prompt: "Does continuous imply differentiable? (yes/no)", latex: "\\text{?}", answer: "no", difficulty: 2, acceptedAnswers: ["No"], hint: "Converse.", explanation: "No, the converse is false." },
    { id: "diffcont-p-6", prompt: "The difference quotient $\\frac{f(a+h)-f(a)}{h}$ is the gradient of a:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "tangent" }, { label: "B", text: "chord (secant)" }, { label: "C", text: "normal" }, { label: "D", text: "asymptote" }], hint: "Two points.", explanation: "It is the gradient of the chord between two points." },
    { id: "diffcont-p-7", prompt: "From the right of $0$, the gradient of $|x|$ is: (number)", latex: "y=|x|", answer: "1", difficulty: 2, acceptedAnswers: ["+1", "one"], hint: "$|x|=x$ for $x>0$.", explanation: "Right gradient is $+1$." },
    { id: "diffcont-p-8", prompt: "From the left of $0$, the gradient of $|x|$ is: (number)", latex: "y=|x|", answer: "-1", difficulty: 2, acceptedAnswers: ["−1", "minus 1"], hint: "$|x|=-x$ for $x<0$.", explanation: "Left gradient is $-1$." },
    { id: "diffcont-p-9", prompt: "Two finite unequal slopes meeting at a point is a:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "corner" }, { label: "B", text: "cusp" }, { label: "C", text: "jump" }, { label: "D", text: "hole" }], hint: "Like $|x|$.", explanation: "A corner." },
    { id: "diffcont-p-10", prompt: "A spike where slopes head to $\\pm\\infty$ is a:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "corner" }, { label: "B", text: "cusp" }, { label: "C", text: "jump" }, { label: "D", text: "vertical line" }], hint: "Sharper than a corner.", explanation: "A cusp." },
    { id: "diffcont-p-11", prompt: "At a vertical tangent, $f'(a)$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "undefined" }, { label: "D", text: "$-1$" }], hint: "Infinite gradient.", explanation: "Undefined: infinite gradient." },
    { id: "diffcont-p-12", prompt: "A jump discontinuity at $a$ means $f$ is differentiable at $a$? (yes/no)", latex: "\\text{?}", answer: "no", difficulty: 3, acceptedAnswers: ["No"], hint: "Discontinuity rules it out.", explanation: "No: not even continuous, so not differentiable." },
    { id: "diffcont-p-13", prompt: "For piecewise $f$, matching VALUES at the join gives:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "continuity" }, { label: "B", text: "differentiability" }, { label: "C", text: "both" }, { label: "D", text: "neither" }], hint: "Values vs slopes.", explanation: "Matching values gives continuity only." },
    { id: "diffcont-p-14", prompt: "For piecewise $f$ that is already continuous, differentiability needs matching:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "values" }, { label: "B", text: "one-sided gradients" }, { label: "C", text: "intercepts" }, { label: "D", text: "domains" }], hint: "Slopes.", explanation: "The one-sided derivatives must match." },
    { id: "diffcont-p-15", prompt: "$f(x)=x^2$ for $x\\le 1$. Value at $x=1$? (number)", latex: "x^2", answer: "1", difficulty: 2, acceptedAnswers: ["one"], hint: "$1^2$.", explanation: "$1$." },
    { id: "diffcont-p-16", prompt: "$f(x)=2x-1$ for $x>1$. Limit value at $x=1$? (number)", latex: "2x-1", answer: "1", difficulty: 2, acceptedAnswers: ["one"], hint: "$2(1)-1$.", explanation: "$1$ — matches $x^2$, so continuous." },
    { id: "diffcont-p-17", prompt: "Pieces $x^2$ and $2x-1$ meet at $x=1$; gradients $2x$ and $2$. Differentiable at $1$? (yes/no)", latex: "2x|_{1}=2,\\,2", answer: "yes", difficulty: 4, acceptedAnswers: ["Yes"], hint: "$2=2$.", explanation: "Values and gradients match: differentiable, $f'(1)=2$." },
    { id: "diffcont-p-18", prompt: "Pieces $x^2$ and $2x-2$; values $1$ and $0$ at $x=1$. Continuous at $1$? (yes/no)", latex: "1 \\text{ vs } 0", answer: "no", difficulty: 4, acceptedAnswers: ["No"], hint: "Values disagree.", explanation: "Not continuous, so not differentiable." },
    { id: "diffcont-p-19", prompt: "Pieces $x^2$ ($x\\le 0$) and $x^3$ ($x>0$). Gradients at $0$ are $0$ and $0$; values $0$ and $0$. Differentiable? (yes/no)", latex: "2x,\\,3x^2 \\text{ at } 0", answer: "yes", difficulty: 4, acceptedAnswers: ["Yes"], hint: "All match at $0$.", explanation: "Values and gradients match at $0$: differentiable, $f'(0)=0$." },
    { id: "diffcont-p-20", prompt: "Which always holds?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "differentiable $\\Rightarrow$ continuous" }, { label: "B", text: "continuous $\\Rightarrow$ differentiable" }, { label: "C", text: "continuous $\\Rightarrow$ has a corner" }, { label: "D", text: "differentiable $\\Rightarrow$ has a cusp" }], hint: "One-way.", explanation: "Only differentiable $\\Rightarrow$ continuous." },
    { id: "diffcont-p-21", prompt: "$y=\\sqrt[3]{x}$ at $x=0$ is continuous but not differentiable because it has a:", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "corner" }, { label: "B", text: "jump" }, { label: "C", text: "vertical tangent" }, { label: "D", text: "hole" }], hint: "Tangent is vertical.", explanation: "Vertical tangent: infinite gradient." },
    { id: "diffcont-p-22", prompt: "Why does differentiable imply continuous? Because $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h \\to$ (number)", latex: "f'(a)\\cdot 0", answer: "0", difficulty: 5, acceptedAnswers: ["zero"], hint: "Finite times $0$.", explanation: "$f'(a)\\cdot 0=0$, so $f(a+h)\\to f(a)$." },
    { id: "diffcont-p-23", prompt: "A function with a removable discontinuity (a hole) at $a$ is differentiable at $a$? (yes/no)", latex: "\\text{?}", answer: "no", difficulty: 5, acceptedAnswers: ["No"], hint: "Discontinuity of any kind.", explanation: "Any discontinuity rules out differentiability." },
    { id: "diffcont-p-24", prompt: "Pieces $3x$ ($x\\le 2$) and $x+4$ ($x>2$): values $6$ and $6$ at $2$; gradients $3$ and $1$. Differentiable at $2$? (yes/no)", latex: "3 \\text{ vs } 1", answer: "no", difficulty: 5, acceptedAnswers: ["No"], hint: "Gradients differ.", explanation: "Continuous (values $6=6$) but gradients $3\\neq 1$: a corner, not differentiable." },
    { id: "diffcont-p-25", prompt: "If $f'(a)$ exists, the tangent at $a$ is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "vertical" }, { label: "B", text: "a single non-vertical line" }, { label: "C", text: "two lines" }, { label: "D", text: "absent" }], hint: "One finite slope.", explanation: "A single, non-vertical tangent line." },
    { id: "diffcont-p-26", prompt: "For differentiability the left and right difference-quotient limits must:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "be equal" }, { label: "B", text: "differ" }, { label: "C", text: "be infinite" }, { label: "D", text: "be zero" }], hint: "Same tangent from both sides.", explanation: "They must agree for the two-sided limit to exist." },
    { id: "diffcont-p-27", prompt: "A corner makes a function continuous but not:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "defined" }, { label: "B", text: "differentiable" }, { label: "C", text: "positive" }, { label: "D", text: "bounded" }], hint: "No single tangent.", explanation: "Continuous but not differentiable." },
    { id: "diffcont-p-28", prompt: "Pieces $x^2$ ($x\\le 0$) and $-x^2$ ($x>0$): values $0,0$; gradients $2x,-2x$ both $0$ at $0$. Differentiable? (yes/no)", latex: "2x,\\,-2x \\text{ at } 0", answer: "yes", difficulty: 5, acceptedAnswers: ["Yes"], hint: "Both gradients $0$ at $0$.", explanation: "Values and gradients meet at $0$: differentiable, $f'(0)=0$." },
    { id: "diffcont-p-29", prompt: "The graph of $y=|x-3|$ has a corner at $x=$ (number)", latex: "y=|x-3|", answer: "3", difficulty: 3, acceptedAnswers: ["three"], hint: "Where the inside is $0$.", explanation: "The corner is at $x=3$, where $x-3=0$." },
    { id: "diffcont-p-30", prompt: "$f'(a)$ exists $\\Rightarrow$ the graph has no break at $a$: this restates which fact?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "differentiable $\\Rightarrow$ continuous" }, { label: "B", text: "continuous $\\Rightarrow$ differentiable" }, { label: "C", text: "corners are smooth" }, { label: "D", text: "all functions are continuous" }], hint: "A tangent forbids a jump.", explanation: "It restates differentiable $\\Rightarrow$ continuous." },
  ],
  multiPartPractice: [
    {
      id: "diffcont-mp-1",
      prompt:
        "Consider the piecewise function $f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ ax+b & x>1 \\end{cases}$. The constants $a$ and $b$ are chosen so that $f$ is differentiable at $x=1$.",
      latex: "f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ ax+b & x>1 \\end{cases}",
      answer: "2",
      hint: "Match the gradients first (that gives $a$), then match the values (that gives $b$).",
      explanation:
        "For differentiability the gradients must match: left $\\frac{d}{dx}(x^2)=2x$ gives $2$ at $x=1$, so $a=2$. The values must also match: $1^2=1$ and $a(1)+b=2+b$, so $2+b=1$ giving $b=-1$. Then $f'(1)=2$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Find the value of $a$ that makes the one-sided gradients match at $x=1$.",
          latex: "2x|_{x=1}=a",
          marks: 2,
          answer: "2",
          acceptedAnswers: ["two"],
          hint: "Left gradient is $\\frac{d}{dx}(x^2)=2x$ at $x=1$; set it equal to the slope $a$ of the right piece.",
          explanation:
            "The left gradient is $2x$, which is $2(1)=2$ at $x=1$. The right piece has gradient $a$, so $a=2$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Using $a=2$, find the value of $b$ that makes the pieces meet (continuity) at $x=1$.",
          latex: "2(1)+b=1^2",
          marks: 2,
          answer: "-1",
          acceptedAnswers: ["−1", "minus 1"],
          hint: "Set the right piece $2x+b$ equal to the left value $x^2=1$ at $x=1$.",
          explanation:
            "At $x=1$: left value $1^2=1$; right value $2(1)+b=2+b$. Setting $2+b=1$ gives $b=-1$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "With these constants, state the value of $f'(1)$.",
          latex: "f'(1)",
          marks: 2,
          answer: "2",
          acceptedAnswers: ["two"],
          hint: "The common matched gradient is the derivative at the join.",
          explanation:
            "Both pieces have gradient $2$ at $x=1$, so $f'(1)=2$.",
        },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const exponentialGrowthDecayLesson: ExplicitLesson = {
  id: "exponential-growth-and-decay",
  slug: "exponential-growth-and-decay",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Exponential Growth and Decay",
  description:
    "Model situations where a quantity changes at a rate proportional to its size: dQ/dt=kQ, the solution Q=Aeᵏᵗ, and growth/decay problems.",
  syllabusArea: "Calculus",
  focus: "Applications of calculus",
  status: "active",
  video: {
    title: "Exponential Growth and Decay",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how a rate of change proportional to the quantity leads to exponential growth or decay, and how to model it with Q=Aeᵏᵗ.",
  successCriteria: [
    "Recognise 'rate proportional to amount' as $\\frac{dQ}{dt}=kQ$.",
    "Verify by substitution that $Q=Ae^{kt}$ satisfies $\\frac{dQ}{dt}=kQ$.",
    "Identify $A$ as the initial value $Q(0)$.",
    "Use the sign of $k$: $k>0$ is growth, $k<0$ is decay.",
    "Find a rate using $\\frac{dQ}{dt}=kQ$ and find a quantity using $Q=Ae^{kt}$.",
  ],
  teaching: {
    paragraphs: [
      "Many quantities in nature and finance change at a rate that depends on how much is already there. A large population produces more offspring than a small one; a large lump of radioactive material decays faster (in absolute terms) than a small one; a bigger investment earns more interest. In each case the rate of change is proportional to the current amount, which we write as $\\frac{dQ}{dt}=kQ$ — the rate equals a constant $k$ times the quantity $Q$.",
      "This is a differential equation: it describes the quantity by a statement about its derivative. To solve it we need a function whose derivative is a constant multiple of itself. You already know one — the exponential. Try $Q=Ae^{kt}$ and differentiate: $\\frac{dQ}{dt}=A\\cdot k\\,e^{kt}=k\\,(Ae^{kt})=kQ$. It works, so $Q=Ae^{kt}$ is the solution. The syllabus asks you to confirm this by substitution exactly as shown — differentiate the proposed $Q$ and check it reproduces $kQ$.",
      "The constant $A$ has a concrete meaning: it is the starting amount. Putting $t=0$ gives $Q(0)=Ae^{0}=A$, so $A$ is simply the value of $Q$ when the clock starts. You read $A$ straight off the initial condition.",
      "The constant $k$ controls the behaviour. If $k>0$ the exponential grows without bound — this is exponential growth. If $k<0$ it shrinks towards zero — exponential decay, with the $t$-axis ($Q=0$) as a horizontal asymptote that the curve approaches but never reaches. The size of $k$ sets the speed: a larger $|k|$ means faster growth or decay.",
      "Two kinds of question follow, and they use the two forms. To find the quantity at a given time, use $Q=Ae^{kt}$ and substitute. To find the rate of change at a given moment, you can either differentiate, or — more quickly — use the defining relationship itself: $\\frac{dQ}{dt}=kQ$, so the rate is just $k$ times the current amount. For instance if $P=500e^{0.04t}$ then at $t=0$, $P=500$ and $\\frac{dP}{dt}=0.04\\times 500=20$ — no exponential evaluation needed.",
      "A note on reading off $k$: in $Q=Ae^{kt}$ the number multiplying $t$ in the exponent is $k$. So $P=500e^{0.04t}$ has $k=0.04$ (growth), while $N=1000e^{-0.1t}$ has $k=-0.1$ (decay). Watch the sign — a negative coefficient in the exponent is the signature of decay.",
    ],
    latexBlocks: [
      "\\frac{dQ}{dt}=kQ \\quad (\\text{rate proportional to amount})",
      "Q=Ae^{kt} \\quad (\\text{solution})",
      "A=Q(0) \\quad (\\text{initial value})",
      "k>0:\\text{ growth}, \\qquad k<0:\\text{ decay}",
      "\\text{rate at any time}=\\frac{dQ}{dt}=kQ",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Verify the solution",
      questionLatex:
        "\\text{Verify that } Q=Ae^{kt} \\text{ satisfies } \\frac{dQ}{dt}=kQ.",
      steps: [
        { explanation: "Differentiate $Q=Ae^{kt}$ with respect to $t$ (chain rule on the exponent).", latex: "\\frac{dQ}{dt}=A\\cdot k\\,e^{kt}" },
        { explanation: "Factor to recognise $Q$.", latex: "=k\\,(Ae^{kt})=kQ" },
        { explanation: "This matches the differential equation.", latex: "\\frac{dQ}{dt}=kQ \\;\\checkmark" },
      ],
      finalAnswerLatex: "Q=Ae^{kt} \\text{ satisfies } \\frac{dQ}{dt}=kQ.",
    },
    {
      title: "Worked example 2: Initial value and the constant k",
      questionLatex:
        "P=500e^{0.04t}. \\quad \\text{State the initial value and whether it is growth or decay.}",
      steps: [
        { explanation: "Put $t=0$ for the initial value.", latex: "P(0)=500e^{0}=500" },
        { explanation: "The exponent coefficient is positive.", latex: "k=0.04>0 \\Rightarrow \\text{growth}" },
      ],
      finalAnswerLatex: "P(0)=500,\\quad \\text{growth }(k=0.04)",
    },
    {
      title: "Worked example 3: Rate of change without evaluating e",
      questionLatex:
        "P=500e^{0.04t}. \\quad \\text{Find } \\frac{dP}{dt} \\text{ when } t=0.",
      steps: [
        { explanation: "Use $\\frac{dP}{dt}=kP$ with the current value $P=500$.", latex: "\\frac{dP}{dt}=0.04\\times 500" },
        { explanation: "Evaluate.", latex: "=20" },
      ],
      finalAnswerLatex: "\\frac{dP}{dt}=20 \\text{ (per unit time) at } t=0",
    },
    {
      title: "Worked example 4: A decay value",
      questionLatex:
        "N=8e^{-0.5t}\\text{ grams}. \\quad \\text{Find } N \\text{ at } t=4. \\text{ Use } e^{-2}\\approx 0.135;\\ 3\\text{ d.p.}",
      steps: [
        { explanation: "Substitute $t=4$ into $N=8e^{-0.5t}$.", latex: "N=8e^{-0.5\\times 4}=8e^{-2}" },
        { explanation: "Use the given value of $e^{-2}$.", latex: "=8\\times 0.135\\approx 1.083" },
      ],
      finalAnswerLatex: "N\\approx 1.083\\text{ grams}",
    },
  ],
  guidedPractice: [
    {
      id: "growthdecay-guided-1",
      prompt: "'The rate of change is proportional to the amount present' is written:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$\\frac{dQ}{dt}=k$" },
        { label: "B", text: "$\\frac{dQ}{dt}=kQ$" },
        { label: "C", text: "$\\frac{dQ}{dt}=kt$" },
        { label: "D", text: "$Q=kt$" },
      ],
      hint: "Rate equals a constant times the quantity.",
      explanation: "$\\frac{dQ}{dt}=kQ$.",
    },
    {
      id: "growthdecay-guided-2",
      prompt: "The solution of $\\frac{dQ}{dt}=kQ$ is:",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$Q=kt+A$" },
        { label: "B", text: "$Q=At^k$" },
        { label: "C", text: "$Q=Ae^{kt}$" },
        { label: "D", text: "$Q=A\\ln(kt)$" },
      ],
      hint: "Derivative proportional to itself = exponential.",
      explanation: "$Q=Ae^{kt}$.",
    },
    {
      id: "growthdecay-guided-3",
      prompt: "For $P=500e^{0.04t}$, find the initial value $P(0)$.",
      latex: "P(0)=Ae^{0}",
      answer: "500",
      hint: "$e^0=1$.",
      explanation: "$P(0)=500$.",
    },
    {
      id: "growthdecay-guided-4",
      prompt: "For $N=1000e^{-0.1t}$, is this growth or decay? (write 'growth' or 'decay')",
      latex: "k=-0.1",
      answer: "decay",
      acceptedAnswers: ["Decay"],
      hint: "Sign of $k$.",
      explanation: "$k=-0.1<0$, so it is decay.",
    },
  ],
  independentPractice: [
    {
      id: "growthdecay-ind-1",
      prompt: "For $P=500e^{0.04t}$, find $\\frac{dP}{dt}$ at $t=0$.",
      latex: "\\frac{dP}{dt}=kP",
      answer: "20",
      hint: "$0.04\\times 500$.",
      explanation: "$\\frac{dP}{dt}=0.04\\times 500=20$.",
    },
    {
      id: "growthdecay-ind-2",
      prompt: "For $N=1000e^{-0.1t}$, find $\\frac{dN}{dt}$ at $t=0$.",
      latex: "\\frac{dN}{dt}=kN",
      answer: "-100",
      hint: "$-0.1\\times 1000$.",
      explanation: "$\\frac{dN}{dt}=-0.1\\times 1000=-100$.",
    },
    {
      id: "growthdecay-ind-3",
      prompt: "For $P=500e^{0.04t}$, find $P$ at $t=10$. Use $e^{0.4}\\approx 1.492$; nearest whole number.",
      latex: "P=500e^{0.4}",
      answer: "746",
      acceptedAnswers: ["746.0"],
      hint: "$500\\times 1.492$.",
      explanation: "$P=500e^{0.4}\\approx 500\\times 1.492=746$.",
    },
    {
      id: "growthdecay-ind-4",
      prompt: "In $Q=Ae^{kt}$, the constant $A$ represents:",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "the initial value $Q(0)$" },
        { label: "B", text: "the growth rate" },
        { label: "C", text: "the time" },
        { label: "D", text: "the final value" },
      ],
      hint: "Put $t=0$.",
      explanation: "$Q(0)=Ae^0=A$.",
    },
    {
      id: "growthdecay-ind-5",
      prompt: "Which differential equation does $Q=7e^{3t}$ satisfy?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$\\frac{dQ}{dt}=7Q$" },
        { label: "B", text: "$\\frac{dQ}{dt}=Q$" },
        { label: "C", text: "$\\frac{dQ}{dt}=3Q$" },
        { label: "D", text: "$\\frac{dQ}{dt}=3t$" },
      ],
      hint: "$k$ is the exponent coefficient.",
      explanation: "$\\frac{dQ}{dt}=3\\cdot 7e^{3t}=3Q$.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Writing the model as $\\frac{dQ}{dt}=k$ (constant rate) instead of $\\frac{dQ}{dt}=kQ$.",
      fix: "Proportional to the amount means the rate has a factor of $Q$: $\\frac{dQ}{dt}=kQ$.",
    },
    {
      mistake: "Evaluating an exponential to find a rate.",
      fix: "Use $\\frac{dQ}{dt}=kQ$ directly with the current amount — no $e$ needed.",
    },
    {
      mistake: "Misreading $k$ or its sign.",
      fix: "$k$ is the coefficient of $t$ in the exponent; a negative value means decay.",
    },
    {
      mistake: "Thinking a decaying quantity reaches zero.",
      fix: "$Q=Ae^{kt}$ with $k<0$ approaches the asymptote $Q=0$ but never equals it.",
    },
  ],
  masteryQuiz: [
    { id: "growthdecay-m-1", prompt: "'Rate proportional to amount' is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{dQ}{dt}=k$" }, { label: "B", text: "$\\frac{dQ}{dt}=kQ$" }, { label: "C", text: "$\\frac{dQ}{dt}=kt$" }, { label: "D", text: "$Q=kt$" }], hint: "Times the quantity.", explanation: "$\\frac{dQ}{dt}=kQ$." },
    { id: "growthdecay-m-2", prompt: "Solution of $\\frac{dQ}{dt}=kQ$:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$Q=kt+A$" }, { label: "B", text: "$Q=At^k$" }, { label: "C", text: "$Q=Ae^{kt}$" }, { label: "D", text: "$Q=Ae^{t}$" }], hint: "Exponential.", explanation: "$Q=Ae^{kt}$." },
    { id: "growthdecay-m-3", prompt: "$P=800e^{0.05t}$: find $P(0)$.", latex: "P(0)", answer: "800", difficulty: 3, hint: "$e^0=1$.", explanation: "$800$." },
    { id: "growthdecay-m-4", prompt: "$P=800e^{0.05t}$: find $\\frac{dP}{dt}$ at $t=0$.", latex: "kP", answer: "40", difficulty: 4, hint: "$0.05\\times 800$.", explanation: "$40$." },
    { id: "growthdecay-m-5", prompt: "$N=600e^{-0.2t}$: find $\\frac{dN}{dt}$ at $t=0$.", latex: "kN", answer: "-120", difficulty: 4, hint: "$-0.2\\times 600$.", explanation: "$-120$." },
    { id: "growthdecay-m-6", prompt: "$Q=5e^{2t}$ satisfies which equation?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{dQ}{dt}=5Q$" }, { label: "B", text: "$\\frac{dQ}{dt}=2Q$" }, { label: "C", text: "$\\frac{dQ}{dt}=Q$" }, { label: "D", text: "$\\frac{dQ}{dt}=2t$" }], hint: "$k=2$.", explanation: "$\\frac{dQ}{dt}=2Q$." },
    { id: "growthdecay-m-7", prompt: "$P=500e^{0.04t}$: find $P$ at $t=10$. Use $e^{0.4}\\approx1.492$ (nearest whole).", latex: "500e^{0.4}", answer: "746", difficulty: 5, acceptedAnswers: ["746.0"], hint: "$500\\times 1.492$.", explanation: "$746$." },
    { id: "growthdecay-m-8", prompt: "$N=8e^{-0.5t}$ g: find $N$ at $t=4$. Use $e^{-2}\\approx0.135$ (3 d.p.).", latex: "8e^{-2}", answer: "1.083", difficulty: 5, acceptedAnswers: ["1.08", "1.080"], hint: "$8\\times 0.135$.", explanation: "$1.083$." },
    { id: "growthdecay-m-9", prompt: "$Q=Ae^{kt}$ with $k<0$ approaches which asymptote?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$Q=0$" }, { label: "B", text: "$Q=A$" }, { label: "C", text: "$Q=k$" }, { label: "D", text: "none" }], hint: "Decay heads to zero.", explanation: "$Q\\to 0$." },
    { id: "growthdecay-m-10", prompt: "Verify $Q=Ae^{kt}$: $\\frac{dQ}{dt}=$", latex: "\\frac{d}{dt}(Ae^{kt})", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$Ae^{kt}$" }, { label: "B", text: "$Ate^{kt}$" }, { label: "C", text: "$kAe^{kt}=kQ$" }, { label: "D", text: "$\\frac{A}{k}e^{kt}$" }], hint: "Chain rule.", explanation: "$kAe^{kt}=kQ$." },
  ],
  masteryQuizPool: [
    { id: "growthdecay-p-1", prompt: "'Rate proportional to amount':", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\frac{dQ}{dt}=k$" }, { label: "B", text: "$\\frac{dQ}{dt}=kQ$" }, { label: "C", text: "$\\frac{dQ}{dt}=kt$" }, { label: "D", text: "$Q=k$" }], hint: "Times $Q$.", explanation: "$\\frac{dQ}{dt}=kQ$." },
    { id: "growthdecay-p-2", prompt: "Solution of $\\frac{dQ}{dt}=kQ$:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$Q=kt+A$" }, { label: "B", text: "$Q=At^k$" }, { label: "C", text: "$Q=Ae^{kt}$" }, { label: "D", text: "$Q=A+e^{kt}$" }], hint: "Exponential.", explanation: "$Q=Ae^{kt}$." },
    { id: "growthdecay-p-3", prompt: "In $Q=Ae^{kt}$, $A$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "initial value" }, { label: "B", text: "rate" }, { label: "C", text: "time" }, { label: "D", text: "asymptote" }], hint: "$t=0$.", explanation: "$Q(0)=A$." },
    { id: "growthdecay-p-4", prompt: "$k>0$ means:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "growth" }, { label: "B", text: "decay" }, { label: "C", text: "constant" }, { label: "D", text: "zero" }], hint: "Positive exponent grows.", explanation: "Growth." },
    { id: "growthdecay-p-5", prompt: "$k<0$ means:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "growth" }, { label: "B", text: "decay" }, { label: "C", text: "constant" }, { label: "D", text: "undefined" }], hint: "Negative exponent shrinks.", explanation: "Decay." },
    { id: "growthdecay-p-6", prompt: "$P=300e^{0.1t}$: $P(0)=$", latex: "P(0)", answer: "300", difficulty: 2, hint: "$e^0=1$.", explanation: "$300$." },
    { id: "growthdecay-p-7", prompt: "$P=300e^{0.1t}$: $\\frac{dP}{dt}$ at $t=0$:", latex: "kP", answer: "30", difficulty: 3, hint: "$0.1\\times 300$.", explanation: "$30$." },
    { id: "growthdecay-p-8", prompt: "$N=400e^{-0.25t}$: $\\frac{dN}{dt}$ at $t=0$:", latex: "kN", answer: "-100", difficulty: 3, hint: "$-0.25\\times 400$.", explanation: "$-100$." },
    { id: "growthdecay-p-9", prompt: "$P=800e^{0.05t}$: $\\frac{dP}{dt}$ at $t=0$:", latex: "kP", answer: "40", difficulty: 3, hint: "$0.05\\times 800$.", explanation: "$40$." },
    { id: "growthdecay-p-10", prompt: "$Q=5e^{2t}$ satisfies:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{dQ}{dt}=5Q$" }, { label: "B", text: "$\\frac{dQ}{dt}=2Q$" }, { label: "C", text: "$\\frac{dQ}{dt}=Q$" }, { label: "D", text: "$\\frac{dQ}{dt}=10Q$" }], hint: "$k=2$.", explanation: "$2Q$." },
    { id: "growthdecay-p-11", prompt: "$Q=3e^{-t}$ satisfies:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{dQ}{dt}=-Q$" }, { label: "B", text: "$\\frac{dQ}{dt}=Q$" }, { label: "C", text: "$\\frac{dQ}{dt}=-3Q$" }, { label: "D", text: "$\\frac{dQ}{dt}=3Q$" }], hint: "$k=-1$.", explanation: "$-Q$." },
    { id: "growthdecay-p-12", prompt: "$P=500e^{0.04t}$: $k=$", latex: "k", answer: "0.04", difficulty: 2, hint: "Exponent coefficient.", explanation: "$0.04$." },
    { id: "growthdecay-p-13", prompt: "$N=1000e^{-0.1t}$: $k=$", latex: "k", answer: "-0.1", difficulty: 2, hint: "Exponent coefficient.", explanation: "$-0.1$." },
    { id: "growthdecay-p-14", prompt: "$P=500e^{0.04t}$: $P$ at $t=10$, $e^{0.4}\\approx1.492$ (whole):", latex: "500e^{0.4}", answer: "746", difficulty: 4, acceptedAnswers: ["746.0"], hint: "$500\\times1.492$.", explanation: "$746$." },
    { id: "growthdecay-p-15", prompt: "$N=8e^{-0.5t}$: $N$ at $t=4$, $e^{-2}\\approx0.135$ (3 d.p.):", latex: "8e^{-2}", answer: "1.083", difficulty: 4, acceptedAnswers: ["1.08", "1.080"], hint: "$8\\times0.135$.", explanation: "$1.083$." },
    { id: "growthdecay-p-16", prompt: "$P=200e^{0.1t}$: $P$ at $t=5$, $e^{0.5}\\approx1.649$ (whole):", latex: "200e^{0.5}", answer: "330", difficulty: 4, acceptedAnswers: ["329.8", "329.7"], hint: "$200\\times1.649$.", explanation: "$\\approx 330$." },
    { id: "growthdecay-p-17", prompt: "$\\frac{d}{dt}(Ae^{kt})=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$Ae^{kt}$" }, { label: "B", text: "$Ate^{kt}$" }, { label: "C", text: "$kAe^{kt}$" }, { label: "D", text: "$\\frac{A}{k}e^{kt}$" }], hint: "Chain rule.", explanation: "$kAe^{kt}$." },
    { id: "growthdecay-p-18", prompt: "Decay quantity approaches:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$A$" }, { label: "C", text: "$\\infty$" }, { label: "D", text: "$k$" }], hint: "Asymptote.", explanation: "$Q\\to 0$." },
    { id: "growthdecay-p-19", prompt: "To find a rate quickly, use:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$Q=Ae^{kt}$" }, { label: "B", text: "$\\frac{dQ}{dt}=kQ$" }, { label: "C", text: "$A=Q(0)$" }, { label: "D", text: "the asymptote" }], hint: "Rate form.", explanation: "$\\frac{dQ}{dt}=kQ$." },
    { id: "growthdecay-p-20", prompt: "$P=1200e^{0.03t}$: $\\frac{dP}{dt}$ at $t=0$:", latex: "kP", answer: "36", difficulty: 3, hint: "$0.03\\times1200$.", explanation: "$36$." },
    { id: "growthdecay-p-21", prompt: "$\\frac{dQ}{dt}=kQ$ is best described as:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "an algebraic equation" }, { label: "B", text: "a differential equation" }, { label: "C", text: "a polynomial" }, { label: "D", text: "an integral" }], hint: "Involves a derivative.", explanation: "A differential equation." },
    { id: "growthdecay-p-22", prompt: "$Q=10e^{0.5t}$: $\\frac{dQ}{dt}$ at $t=0$:", latex: "kQ", answer: "5", difficulty: 3, hint: "$0.5\\times10$.", explanation: "$5$." },
    { id: "growthdecay-p-23", prompt: "$P=250e^{-0.4t}$ models which behaviour?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "growth" }, { label: "B", text: "decay" }, { label: "C", text: "neither" }, { label: "D", text: "both" }], hint: "Sign of $k$.", explanation: "$k=-0.4<0$: decay." },
    { id: "growthdecay-p-24", prompt: "$Q=Ae^{kt}$ is the solution because its derivative is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "a constant multiple ($k$) of itself" }, { label: "B", text: "zero" }, { label: "C", text: "always 1" }, { label: "D", text: "$t$" }], hint: "$\\frac{dQ}{dt}=kQ$.", explanation: "Its derivative is $k$ times itself." },
    { id: "growthdecay-p-25", prompt: "$N=900e^{-0.2t}$: $\\frac{dN}{dt}$ at $t=0$:", latex: "kN", answer: "-180", difficulty: 4, hint: "$-0.2\\times900$.", explanation: "$-180$." },
    { id: "growthdecay-p-26", prompt: "$P=400e^{0.02t}$: $P(0)=$", latex: "P(0)", answer: "400", difficulty: 1, hint: "$e^0=1$.", explanation: "$400$." },
  ],
  multiPartPractice: [
    {
      id: "growthdecay-mp-1",
      prompt:
        "A bacterial culture has population (in thousands) $P=200e^{0.05t}$, where $t$ is in hours. Use $e^{1}\\approx 2.718$.",
      latex: "P=200e^{0.05t}",
      answer: "200",
      hint: "Use $P(0)$ for the start, $\\frac{dP}{dt}=kP$ for the rate, and substitute for a later value.",
      explanation:
        "(a) $P(0)=200e^0=200$ thousand. (b) $\\frac{dP}{dt}=kP=0.05\\times 200=10$ thousand per hour at $t=0$. (c) $P(20)=200e^{0.05\\times 20}=200e^{1}\\approx 200\\times 2.718=543.6$ thousand.",
      parts: [
        { key: "a", label: "(a)", prompt: "State the initial population (in thousands).", latex: "P(0)", marks: 1, answer: "200", acceptedAnswers: [], hint: "$e^0=1$.", explanation: "$P(0)=200$." },
        { key: "b", label: "(b)", prompt: "Find the rate $\\frac{dP}{dt}$ (thousands/hour) at $t=0$.", latex: "\\frac{dP}{dt}=kP", marks: 2, answer: "10", acceptedAnswers: [], hint: "$0.05\\times 200$.", explanation: "$0.05\\times 200=10$." },
        { key: "c", label: "(c)", prompt: "Find the population at $t=20$ hours (thousands, 1 d.p.).", latex: "200e^{1}", marks: 2, answer: "543.6", acceptedAnswers: ["543.6"], hint: "$200\\times 2.718$.", explanation: "$200e^{1}\\approx 543.6$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const applicationsOfCalculusGapsLessons = [
  sketchingTheDerivativeGraphLesson,
  differentiabilityAndContinuityLesson,
  exponentialGrowthDecayLesson,
];
