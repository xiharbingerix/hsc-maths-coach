import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(answer)) {
    autoVariants.push(answer.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(answer)) {
    autoVariants.push(`${answer}.0`);
  }
  if (/^-?\d*\.\d+$/.test(answer)) {
    autoVariants.push(`${answer}0`);
  }
  if (/^0\./.test(answer)) {
    autoVariants.push(answer.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...autoVariants])),
    hint: "Apply the index rule carefully, then check the form of your answer.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer,
    hint: "Test each option against the index rule used in the lesson.",
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

const indexNotation: LessonContent = {
  description: "Read index notation, identify the base and exponent, and evaluate small powers.",
  learningIntention: "Use index notation to represent repeated multiplication and evaluate simple powers.",
  successCriteria: [
    "Identify the base and exponent in a power.",
    "Write repeated multiplication using index notation.",
    "Expand index notation as repeated multiplication.",
    "Evaluate small powers, including squares, cubes and powers of 10.",
  ],
  teaching: {
    paragraphs: [
      "Index notation is a short way to write repeated multiplication. The base is the number being multiplied, and the exponent tells us how many factors of that base are used.",
      "In 3^4, the base is 3 and the exponent is 4. This means four factors of 3, not 3 multiplied by 4.",
      "A power with exponent 2 is called a square. A power with exponent 3 is called a cube.",
      "Powers of 10 are especially useful: the exponent tells us the number of zeros after 1 for positive whole-number exponents.",
    ],
    latexBlocks: ["a^n=\\underbrace{a\\times a\\times\\cdots\\times a}_{n\\text{ factors}}", "3^4=3\\times3\\times3\\times3=81", "10^5=100000"],
  },
  workedExamples: [
    { title: "Expand a power", questionLatex: "\\text{Write }3^4\\text{ as repeated multiplication.}", steps: [{ explanation: "The exponent 4 means four factors of the base 3.", latex: "3^4=3\\times3\\times3\\times3" }], finalAnswerLatex: "3\\times3\\times3\\times3" },
    { title: "Evaluate a cube", questionLatex: "\\text{Evaluate }4^3.", steps: [{ explanation: "Write three factors of 4.", latex: "4^3=4\\times4\\times4" }, { explanation: "Multiply the factors.", latex: "4\\times4\\times4=64" }], finalAnswerLatex: "64" },
    { title: "Read a power of 10", questionLatex: "\\text{Evaluate }10^6.", steps: [{ explanation: "Write 1 followed by six zeros.", latex: "10^6=1000000" }], finalAnswerLatex: "1000000" },
  ],
  guidedPractice: [
    answer("y9-ind-not-g1", "Evaluate the power.", "2^5", "32", "Five factors of 2 multiply to 32."),
    answer("y9-ind-not-g2", "What is the base?", "7^3", "7", "The base is the number being multiplied."),
    answer("y9-ind-not-g3", "What is the exponent?", "5^4", "4", "The exponent tells us how many factors are used."),
    choice("y9-ind-not-g4", "Which repeated multiplication matches the power shown?", "C", ["$6\\times4$", "$4\\times4\\times4\\times4\\times4\\times4$", "$6\\times6\\times6\\times6$", "$6+6+6+6$"], "The exponent 4 requires four factors of the base 6.", "6^4"),
  ],
  independentPractice: [
    answer("y9-ind-not-i1", "Evaluate the power.", "3^4", "81", "Four factors of 3 multiply to 81."),
    answer("y9-ind-not-i2", "Evaluate the cube.", "5^3", "125", "Three factors of 5 multiply to 125."),
    answer("y9-ind-not-i3", "Evaluate the power of 10.", "10^7", "10000000", "A positive exponent of 7 gives 1 followed by seven zeros."),
    choice("y9-ind-not-i4", "Which index notation represents the repeated multiplication shown?", "B", ["$4^6$", "$6^4$", "$6\\times4$", "$24^1$"], "There are four factors of 6, so the notation is 6^4.", "6\\times6\\times6\\times6"),
    choice("y9-ind-not-i5", "Which statement is correct?", "D", ["$2^5=2\\times5$", "$8^2=8+8$", "$3^3=3\\times3$", "$4^3=4\\times4\\times4$"], "An exponent of 3 means three factors of the base."),
  ],
  commonMistakes: [
    { mistake: "Multiplying the base by the exponent.", fix: "Write the base as a factor repeatedly. For example, 3^4 means 3 x 3 x 3 x 3." },
    { mistake: "Counting multiplication signs instead of factors.", fix: "Four factors have three multiplication signs between them." },
    { mistake: "Reading a square as twice the number.", fix: "A square means the number multiplied by itself." },
    { mistake: "Writing the wrong number of zeros for a power of 10.", fix: "For positive whole-number exponents, count the zeros after 1." },
  ],
  masteryQuiz: [
    answer("y9-ind-not-m1", "Evaluate.", "2^4", "16", "Four factors of 2 multiply to 16."),
    answer("y9-ind-not-m2", "What is the exponent?", "9^5", "5", "The exponent is the raised number."),
    answer("y9-ind-not-m3", "Evaluate.", "10^4", "10000", "Write 1 followed by four zeros."),
    choice("y9-ind-not-m4", "Which repeated multiplication matches the power?", "A", ["$5\\times5\\times5$", "$5\\times3$", "$3\\times3\\times3\\times3\\times3$", "$5+5+5$"], "The exponent 3 means three factors of 5.", "5^3"),
    answer("y9-ind-not-m5", "Evaluate.", "6^2", "36", "Six squared is 6 x 6."),
    answer("y9-ind-not-m6", "Evaluate.", "2^7", "128", "Seven factors of 2 multiply to 128."),
    choice("y9-ind-not-m7", "Which power has value 64?", "B", ["$4^2$", "$4^3$", "$8^3$", "$2^5$"], "4 x 4 x 4 equals 64."),
    choice("y9-ind-not-m8", "A student writes 7^3 = 21. What did they do?", "C", ["Added three factors of 7 correctly", "Used the wrong base", "Multiplied the base by the exponent instead of using repeated multiplication", "Evaluated the cube correctly"], "The student calculated 7 x 3 instead of 7 x 7 x 7.", "7^3=21"),
    answer("y9-ind-not-m9", "How many factors of 3 are used?", "3^8", "8", "The exponent gives the number of factors."),
    choice("y9-ind-not-m10", "Which value is greatest?", "D", ["$2^5$", "$3^3$", "$5^2$", "$10^2$"], "The values are 32, 27, 25 and 100, so 10^2 is greatest."),
  ],
};

const multiplyingDividing: LessonContent = {
  description: "Use the index laws for multiplying and dividing powers with the same base.",
  learningIntention: "Simplify products and quotients of powers that have the same base.",
  successCriteria: ["Add exponents when multiplying powers with the same base.", "Subtract exponents when dividing powers with the same base.", "Recognise when bases are not the same.", "Distinguish index laws from ordinary addition and subtraction."],
  teaching: {
    paragraphs: [
      "When powers with the same base are multiplied, combine the repeated factors by adding the exponents. The base can be a number or a variable — the law works the same way.",
      "When powers with the same base are divided, cancel matching factors by subtracting the exponents. For now, division examples keep a positive exponent in the result.",
      "The base must stay the same. The law does not allow unlike bases to be combined.",
      "These rules are about multiplication and division of powers, not addition or subtraction of powers.",
    ],
    latexBlocks: ["a^m\\times a^n=a^{m+n}", "\\frac{a^m}{a^n}=a^{m-n}\\quad(m>n)", "2^3\\times2^4=2^7", "x^2\\times x^3=x^5", "\\frac{5^6}{5^2}=5^4", "\\frac{a^6}{a^2}=a^4"],
  },
  workedExamples: [
    { title: "Multiply powers with the same base", questionLatex: "\\text{Simplify }2^3\\times2^4.", steps: [{ explanation: "The bases match, so add the exponents.", latex: "2^3\\times2^4=2^{3+4}=2^7" }], finalAnswerLatex: "2^7" },
    { title: "Divide powers with the same base", questionLatex: "\\text{Simplify }5^6\\div5^2.", steps: [{ explanation: "The bases match, so subtract the exponents.", latex: "5^6\\div5^2=5^{6-2}=5^4" }], finalAnswerLatex: "5^4" },
    { title: "Check whether the law applies", questionLatex: "\\text{Can }2^3\\times5^4\\text{ be simplified by adding exponents?}", steps: [{ explanation: "The bases are different, so the same-base law does not apply.", latex: "2\\ne5" }], finalAnswerLatex: "\\text{No}" },
  ],
  guidedPractice: [
    choice("y9-ind-md-g1", "Simplify the expression. Write your answer as a single power.", "B", ["$x^{20}$", "$x^9$", "$2x^9$", "$x^5$"], "The bases match, so add the exponents: 4 + 5 = 9.", "x^4\\times x^5"),
    choice("y9-ind-md-g2", "Simplify the expression. Write your answer as a single power.", "C", ["$a^8$", "$a^5$", "$a^6$", "$1^6$"], "The bases match, so subtract the exponents: 8 − 2 = 6.", "a^8\\div a^2"),
    choice("y9-ind-md-g3", "Which product can be simplified by adding exponents?", "A", ["$4^3\\times4^5$", "$4^3+4^5$", "$4^3\\times5^4$", "$3^4\\times5^4$"], "Only the first expression multiplies powers with the same base."),
    choice("y9-ind-md-g4", "Which statement is correct?", "D", ["$2^3\\times2^4=4^7$", "$5^8\\div5^3=5^{11}$", "$3^2+3^4=3^6$", "$6^7\\div6^2=6^5$"], "Division with the same base uses exponent subtraction."),
  ],
  independentPractice: [
    choice("y9-ind-md-i1", "Simplify.", "A", ["$2^{11}$", "$4^{11}$", "$2^3$", "$2^{28}$"], "Add 7 and 4.", "2^7\\times2^4"),
    choice("y9-ind-md-i2", "Simplify.", "B", ["$10^{12}$", "$10^6$", "$10^3$", "$1^6$"], "Subtract 3 from 9.", "10^9\\div10^3"),
    choice("y9-ind-md-i3", "Which step is invalid?", "C", ["$8^2\\times8^5=8^7$", "$3^9\\div3^4=3^5$", "$2^4\\times5^3=10^7$", "$6^3\\times6^2=6^5$"], "Unlike bases cannot be combined by adding exponents."),
    answer("y9-ind-md-i4", "Evaluate the simplified value.", "3^5\\div3^3", "9", "Subtract the exponents to get 3^2, which equals 9."),
    choice("y9-ind-md-i5", "Simplify.", "D", ["$5^2$", "$5^8$", "$25^8$", "$5^{14}$"], "Add 6 and 8.", "5^6\\times5^8"),
  ],
  commonMistakes: [
    { mistake: "Multiplying the exponents when multiplying powers.", fix: "For a^m x a^n, add m and n." },
    { mistake: "Adding exponents when dividing powers.", fix: "For a^m divided by a^n, subtract n from m." },
    { mistake: "Using the law when bases differ.", fix: "Check the bases first. Same-base laws require identical bases." },
    { mistake: "Using the law for addition of powers.", fix: "These index laws apply to multiplication and division, not addition." },
  ],
  masteryQuiz: [
    choice("y9-ind-md-m1", "Simplify.", "A", ["$2^8$", "$4^8$", "$2^2$", "$2^{15}$"], "Add the exponents.", "2^3\\times2^5"),
    choice("y9-ind-md-m2", "Simplify.", "B", ["$4^{10}$", "$4^4$", "$4^6$", "$1^4$"], "Subtract 3 from 7.", "4^7\\div4^3"),
    choice("y9-ind-md-m3", "Which law is used?", "C", ["Multiply the bases", "Multiply the exponents", "Add the exponents", "Subtract the bases"], "Multiplication of same-base powers uses exponent addition.", "9^2\\times9^6"),
    choice("y9-ind-md-m4", "Simplify.", "D", ["$n^3$", "$n^{18}$", "$2n^9$", "$n^9$"], "Add the exponents: 4 + 5 = 9.", "n^4\\times n^5"),
    answer("y9-ind-md-m5", "Evaluate.", "2^6\\div2^4", "4", "Subtract exponents to get 2^2."),
    choice("y9-ind-md-m6", "Which expression cannot use a same-base index law?", "B", ["$5^8\\div5^3$", "$3^4\\times7^2$", "$10^2\\times10^5$", "$6^9\\div6^4$"], "The second expression has different bases."),
    choice("y9-ind-md-m7", "Simplify.", "A", ["$p^8$", "$p^{18}$", "$2p^8$", "$p^2$"], "Add the exponents: 5 + 3 = 8.", "p^5\\times p^3"),
    choice("y9-ind-md-m8", "A student writes 8^9 divided by 8^4 as 8^13. What is the correction?", "C", ["Change the base to 1", "Multiply the exponents", "Subtract the exponents to get $8^5$", "Add the bases to get $16^5$"], "Division of same-base powers uses exponent subtraction.", "8^9\\div8^4"),
    choice("y9-ind-md-m9", "Simplify the expression.", "D", ["$2^9$", "$2^{11}$", "$4^{11}$", "$2^5$"], "Combine the exponents: 6 + 3 - 4 = 5.", "2^6\\times2^3\\div2^4"),
    choice("y9-ind-md-m10", "Simplify the expression.", "D", ["$10^4$", "$10^{10}$", "$20^8$", "$10^8$"], "Combine exponents: 7 + 5 - 4 = 8.", "10^7\\times10^5\\div10^4"),
  ],
};

const powerOfPower: LessonContent = {
  description: "Use the power-of-a-power law and distinguish it from multiplying separate powers.",
  learningIntention: "Simplify a power raised to another power by multiplying the exponents.",
  successCriteria: ["Multiply exponents when a power is raised to another power.", "Keep the base unchanged.", "Distinguish a power of a power from a product of powers.", "Evaluate simple numerical examples."],
  teaching: {
    paragraphs: [
      "A power of a power means that an indexed expression is itself raised to another exponent. The base can be a number or a variable — the law works the same way.",
      "The repeated groups combine by multiplying the exponents. The base stays unchanged.",
      "This is different from multiplying separate powers with the same base, where the exponents are added.",
      "Brackets matter because they show that the whole first power is raised again.",
    ],
    latexBlocks: ["(a^m)^n=a^{mn}", "(2^3)^2=2^{3\\times2}=2^6", "(x^3)^2=x^{3\\times2}=x^6", "a^m\\times a^n=a^{m+n}\\quad\\text{but}\\quad(a^m)^n=a^{mn}"],
  },
  workedExamples: [
    { title: "Simplify a power of a power", questionLatex: "\\text{Simplify }(2^3)^2.", steps: [{ explanation: "Multiply the exponents.", latex: "(2^3)^2=2^{3\\times2}=2^6" }], finalAnswerLatex: "2^6" },
    { title: "Use a power of 10", questionLatex: "\\text{Simplify }(10^2)^4.", steps: [{ explanation: "Multiply 2 by 4.", latex: "(10^2)^4=10^{2\\times4}=10^8" }], finalAnswerLatex: "10^8" },
    { title: "Compare two index laws", questionLatex: "\\text{Compare }3^2\\times3^4\\text{ and }(3^2)^4.", steps: [{ explanation: "For the product, add exponents.", latex: "3^2\\times3^4=3^6" }, { explanation: "For the power of a power, multiply exponents.", latex: "(3^2)^4=3^8" }], finalAnswerLatex: "3^6\\text{ and }3^8" },
  ],
  guidedPractice: [
    choice("y9-ind-pp-g1", "Simplify the expression. Write your answer as a single power.", "A", ["$x^6$", "$x^5$", "$2x^6$", "$x^9$"], "Multiply the exponents: 2 × 3 = 6.", "(x^2)^3"),
    choice("y9-ind-pp-g2", "Simplify.", "D", ["$2^9$", "$4^{10}$", "$2^{25}$", "$2^{10}$"], "Multiply 5 and 2.", "(2^5)^2"),
    choice("y9-ind-pp-g3", "Which statement is correct?", "B", ["$(7^3)^2=7^5$", "$(7^3)^2=7^6$", "$(7^3)^2=14^6$", "$(7^3)^2=7^9$"], "A power of a power multiplies exponents."),
    choice("y9-ind-pp-g4", "Simplify the expression. Write your answer as a single power.", "C", ["$a^{10}$", "$a^2$", "$a^8$", "$a^{12}$"], "Multiply the exponents: 4 × 2 = 8.", "(a^4)^2"),
  ],
  independentPractice: [
    choice("y9-ind-pp-i1", "Simplify.", "D", ["$4^4$", "$8^8$", "$4^{10}$", "$4^8$"], "Multiply 4 and 2.", "(4^4)^2"),
    choice("y9-ind-pp-i2", "Simplify.", "A", ["$10^{12}$", "$10^7$", "$30^4$", "$10^{64}$"], "Multiply 3 and 4.", "(10^3)^4"),
    choice("y9-ind-pp-i3", "Which expression simplifies to 6^10?", "C", ["$6^5+6^5$", "$(6^2)^4$", "$(6^5)^2$", "$6^{12}\\div6^4$"], "The power of a power gives exponent 5 x 2 = 10.", "\\text{Choose the power-of-a-power expression.}"),
    choice("y9-ind-pp-i4", "Which rule should be used first?", "B", ["Subtract the exponents", "Multiply the exponents", "Add the bases", "Multiply the bases"], "The brackets show a power raised to another power.", "(8^3)^5"),
    answer("y9-ind-pp-i5", "Evaluate.", "(2^2)^3", "64", "The expression simplifies to 2^6, which is 64."),
  ],
  commonMistakes: [
    { mistake: "Adding exponents for a power of a power.", fix: "Brackets indicate repeated groups, so multiply the exponents." },
    { mistake: "Multiplying the base as well as the exponents.", fix: "Keep the base unchanged." },
    { mistake: "Ignoring the brackets.", fix: "Use the brackets to decide whether the exponents should be multiplied." },
    { mistake: "Confusing a product of powers with a power of a power.", fix: "Separate powers multiplied together use addition; nested powers use multiplication." },
  ],
  masteryQuiz: [
    choice("y9-ind-pp-m1", "Simplify.", "B", ["$x^5$", "$x^6$", "$2x^6$", "$x^9$"], "Multiply the exponents: 2 × 3 = 6.", "(x^2)^3"),
    choice("y9-ind-pp-m2", "Simplify.", "A", ["$10^{10}$", "$10^7$", "$20^{10}$", "$10^{25}$"], "Multiply 5 and 2.", "(10^5)^2"),
    choice("y9-ind-pp-m3", "Which law applies?", "D", ["Subtract exponents", "Add bases", "Add exponents", "Multiply exponents"], "Nested powers use exponent multiplication.", "(4^3)^6"),
    answer("y9-ind-pp-m4", "Evaluate.", "(2^3)^2", "64", "This is 2^6."),
    choice("y9-ind-pp-m5", "Simplify.", "C", ["$m^3$", "$m^7$", "$m^{12}$", "$4m^{12}$"], "Multiply the exponents: 4 × 3 = 12.", "(m^4)^3"),
    choice("y9-ind-pp-m6", "Which expression has the larger value?", "B", ["$2^3\\times2^2$", "$(2^3)^2$", "They are equal", "Neither can be simplified"], "The first is 2^5 and the second is 2^6."),
    choice("y9-ind-pp-m7", "A student writes (5^2)^4 = 5^6. What is the correction?", "A", ["$5^8$", "$5^2$", "$20^8$", "$5^{16}$"], "Multiply 2 by 4."),
    choice("y9-ind-pp-m8", "Simplify.", "D", ["$3^7$", "$3^9$", "$3^{24}$", "$3^{10}$"], "First multiply 2 and 4 to get 8, then add 2 to get 10.", "(3^2)^4\\times3^2"),
    choice("y9-ind-pp-m9", "Simplify.", "C", ["$2^5$", "$2^{24}$", "$2^8$", "$4^8$"], "Multiply 6 and 2 to get 12, then subtract 4 to get 8.", "(2^6)^2\\div2^4"),
    choice("y9-ind-pp-m10", "Which pair has equal values?", "B", ["$(5^2)^3$ and $5^5$", "$(4^3)^2$ and $4^6$", "$(2^4)^2$ and $2^6$", "$(10^2)^3$ and $10^5$"], "Both expressions in option B equal 4^6."),
  ],
};

const zeroIndex: LessonContent = {
  description: "Understand and use the zero-index law for non-zero bases.",
  learningIntention: "Use the rule that any non-zero base raised to the power zero equals one.",
  successCriteria: ["Evaluate a non-zero number raised to zero.", "Explain the rule using division of equal powers.", "Distinguish a zero exponent from a zero base.", "Avoid treating 0^0 as an ordinary zero-index example."],
  teaching: {
    paragraphs: [
      "Any non-zero base raised to the power zero equals 1. This applies to both numerical and variable bases: for example, x^0 = 1 for any non-zero value of x.",
      "The rule fits the division law: dividing a power by itself gives 1, while subtracting equal exponents gives an exponent of zero.",
      "A zero exponent is not the same as a zero base. For example, 7^0 is 1, while 0^7 is 0.",
      "The expression 0^0 is not used as an ordinary application of this rule.",
    ],
    latexBlocks: ["a^0=1\\quad(a\\ne0)", "x^0=1\\quad(x\\ne0)", "\\frac{a^3}{a^3}=a^{3-3}=a^0=1", "7^0=1\\quad\\text{but}\\quad0^7=0"],
  },
  workedExamples: [
    { title: "Evaluate a zero index", questionLatex: "\\text{Evaluate }7^0.", steps: [{ explanation: "The non-zero base has exponent zero.", latex: "7^0=1" }], finalAnswerLatex: "1" },
    { title: "Use the division pattern", questionLatex: "\\text{Explain why }5^0=1.", steps: [{ explanation: "Divide equal powers of 5.", latex: "\\frac{5^4}{5^4}=1" }, { explanation: "Apply exponent subtraction.", latex: "\\frac{5^4}{5^4}=5^{4-4}=5^0" }], finalAnswerLatex: "5^0=1" },
    { title: "Distinguish exponent and base", questionLatex: "\\text{Compare }0^4\\text{ and }4^0.", steps: [{ explanation: "Zero multiplied four times is zero.", latex: "0^4=0" }, { explanation: "A non-zero base to exponent zero is one.", latex: "4^0=1" }], finalAnswerLatex: "0^4=0,\\quad4^0=1" },
  ],
  guidedPractice: [
    answer("y9-ind-zero-g1", "Simplify the expression, where x is a non-zero variable.", "x^0", "1", "Any non-zero base to exponent zero equals 1, whether the base is a number or a variable."),
    answer("y9-ind-zero-g2", "Evaluate.", "100^0", "1", "The base is non-zero."),
    choice("y9-ind-zero-g3", "Which statement is correct?", "C", ["$6^0=0$", "$0^6=1$", "$6^0=1$", "$6^0=6$"], "A non-zero base to exponent zero equals 1."),
    choice("y9-ind-zero-g4", "Which expression is not treated as an ordinary zero-index example?", "D", ["$8^0$", "$12^0$", "$1000^0$", "$0^0$"], "The usual zero-index rule is stated for non-zero bases."),
  ],
  independentPractice: [
    answer("y9-ind-zero-i1", "Simplify the expression, where k is a non-zero variable.", "k^0", "1", "The zero-index law applies to variable bases: k^0 = 1 for any non-zero k."),
    answer("y9-ind-zero-i2", "Evaluate.", "0^5", "0", "Five factors of zero multiply to zero."),
    choice("y9-ind-zero-i3", "Simplify.", "A", ["$3^0=1$", "$3^0=0$", "$3^0=3$", "$3^0=9$"], "Subtracting equal exponents gives zero.", "3^7\\div3^7"),
    choice("y9-ind-zero-i4", "Which pair has different values?", "B", ["$5^0$ and $12^0$", "$0^5$ and $5^0$", "$8^0$ and $2^0$", "$100^0$ and $9^0$"], "0^5 is zero, while 5^0 is one."),
    choice("y9-ind-zero-i5", "Why does 11^0 equal 1?", "D", ["The base is zero", "Eleven minus zero is one", "Every power equals one", "Dividing equal non-zero powers gives one and subtracts the exponents to zero"], "The division pattern supports the zero-index rule."),
  ],
  commonMistakes: [
    { mistake: "Writing a^0 = 0.", fix: "For any non-zero base, a^0 = 1." },
    { mistake: "Treating a zero exponent as a zero base.", fix: "Check the position of the zero carefully." },
    { mistake: "Using 0^0 as a routine example.", fix: "State the zero-index rule for non-zero bases only." },
    { mistake: "Forgetting the link to division.", fix: "Use a^n divided by a^n = 1 to explain why the exponent-zero result is 1." },
  ],
  masteryQuiz: [
    answer("y9-ind-zero-m1", "Simplify the expression, where t is a non-zero variable.", "t^0", "1", "The zero-index law applies to variable bases: t^0 = 1 for any non-zero t."),
    answer("y9-ind-zero-m2", "Evaluate.", "250^0", "1", "The base is non-zero."),
    choice("y9-ind-zero-m3", "Which statement is correct?", "A", ["$12^0=1$", "$12^0=0$", "$0^{12}=1$", "$12^0=12$"], "A non-zero base raised to zero is one."),
    answer("y9-ind-zero-m4", "Evaluate.", "0^8", "0", "Multiplying factors of zero gives zero."),
    choice("y9-ind-zero-m5", "Simplify.", "B", ["$6^1$", "$6^0$", "$0^6$", "$1^6$"], "Subtract equal exponents.", "6^9\\div6^9"),
    choice("y9-ind-zero-m6", "Which expression has value 0?", "C", ["$7^0$", "$100^0$", "$0^7$", "$1^0$"], "A positive power of zero equals zero."),
    choice("y9-ind-zero-m7", "Which base restriction belongs with a^0 = 1?", "D", ["$a=0$", "$a<0$", "$a=1$", "$a\\ne0$"], "The ordinary zero-index rule uses a non-zero base."),
    choice("y9-ind-zero-m8", "A student says 15^0 = 0 because there are no factors. What is the best correction?", "B", ["The answer is 15", "The division pattern gives $15^0=1$", "The exponent should become 15", "Zero powers are never used"], "Equal powers divide to one and produce exponent zero."),
    choice("y9-ind-zero-m9", "Simplify.", "A", ["$2^0=1$", "$2^2=4$", "$2^5=32$", "$0^2=0$"], "Combine exponents: 7 - 4 - 3 = 0.", "2^7\\div2^4\\div2^3"),
    choice("y9-ind-zero-m10", "Which comparison is correct?", "C", ["$0^5=5^0$", "$0^5>5^0$", "$0^5<5^0$", "$0^5$ and $5^0$ are both undefined"], "0^5 = 0 and 5^0 = 1."),
  ],
};

const negativeIndices: LessonContent = {
  description: "Interpret numerical negative indices as reciprocals and connect negative powers of 10 to decimals.",
  learningIntention: "Evaluate simple numerical negative indices by writing the reciprocal of the matching positive power.",
  successCriteria: ["Rewrite a numerical negative index as a reciprocal.", "Evaluate simple numerical negative indices.", "Convert negative powers of 10 to decimals.", "Keep the negative sign in the exponent separate from the value of the power."],
  teaching: {
    paragraphs: [
      "A negative exponent tells us to take the reciprocal of the corresponding positive power.",
      "For example, 2^-3 means 1 divided by 2^3. It does not mean a negative answer.",
      "Negative powers of 10 connect neatly to decimal place value: 10^-1 is one tenth and 10^-2 is one hundredth.",
      "This lesson uses numerical bases only. Algebraic negative indices come later.",
    ],
    latexBlocks: ["a^{-n}=\\frac{1}{a^n}\\quad(a\\ne0)", "2^{-3}=\\frac{1}{2^3}=\\frac{1}{8}", "10^{-1}=0.1,\\quad10^{-2}=0.01,\\quad10^{-3}=0.001"],
  },
  workedExamples: [
    { title: "Write a reciprocal", questionLatex: "\\text{Evaluate }2^{-3}.", steps: [{ explanation: "Use the reciprocal of the matching positive power.", latex: "2^{-3}=\\frac{1}{2^3}" }, { explanation: "Evaluate the denominator.", latex: "\\frac{1}{2^3}=\\frac{1}{8}" }], finalAnswerLatex: "\\frac{1}{8}" },
    { title: "Convert a negative power of 10", questionLatex: "\\text{Write }10^{-2}\\text{ as a decimal.}", steps: [{ explanation: "$10^{-2}$ is one hundredth.", latex: "10^{-2}=\\frac{1}{100}=0.01" }], finalAnswerLatex: "0.01" },
    { title: "Evaluate a reciprocal power", questionLatex: "\\text{Evaluate }5^{-2}.", steps: [{ explanation: "Write the reciprocal.", latex: "5^{-2}=\\frac{1}{5^2}" }, { explanation: "Evaluate the square.", latex: "\\frac{1}{25}=0.04" }], finalAnswerLatex: "\\frac{1}{25}=0.04" },
  ],
  guidedPractice: [
    choice("y9-ind-neg-g1", "Choose the correct value.", "B", ["$-8$", "$\\frac{1}{8}$", "$\\frac{1}{6}$", "$8$"], "Use the reciprocal of 2^3.", "2^{-3}"),
    answer("y9-ind-neg-g2", "Write the value as a decimal.", "10^{-1}", "0.1", "10^-1 is one tenth.", ["1/10"]),
    answer("y9-ind-neg-g3", "Write the value as a decimal.", "10^{-3}", "0.001", "10^-3 is one thousandth.", ["1/1000"]),
    choice("y9-ind-neg-g4", "Choose the correct reciprocal form.", "D", ["$-\\frac{1}{4}$", "$\\frac{1}{6}$", "$-4$", "$\\frac{1}{4}$"], "Use 1 divided by 4.", "4^{-1}"),
  ],
  independentPractice: [
    choice("y9-ind-neg-i1", "Choose the correct value.", "A", ["$\\frac{1}{9}$", "$-9$", "$\\frac{1}{6}$", "$9$"], "Use 1 divided by 3^2.", "3^{-2}"),
    answer("y9-ind-neg-i2", "Write the value as a decimal.", "10^{-4}", "0.0001", "10^-4 is one ten-thousandth.", ["1/10000"]),
    choice("y9-ind-neg-i3", "Which statement is correct?", "C", ["$5^{-2}=-25$", "$5^{-2}=25$", "$5^{-2}=\\frac{1}{25}$", "$5^{-2}=\\frac{1}{10}$"], "Use the reciprocal of 5^2."),
    answer("y9-ind-neg-i4", "Write the value as a decimal.", "2^{-2}", "0.25", "2^-2 is 1/4, which is 0.25.", ["1/4", "0.250"]),
    choice("y9-ind-neg-i5", "Which value is greatest?", "B", ["$10^{-3}$", "$10^{-1}$", "$10^{-4}$", "$10^{-2}$"], "One tenth is larger than one hundredth, one thousandth and one ten-thousandth."),
  ],
  commonMistakes: [
    { mistake: "Treating a negative exponent as a negative value.", fix: "A negative exponent creates a reciprocal, not a negative sign in front." },
    { mistake: "Writing 10^-3 as 0.003.", fix: "10^-3 is exactly 0.001." },
    { mistake: "Forgetting to evaluate the positive power in the denominator.", fix: "After writing the reciprocal, calculate the denominator." },
    { mistake: "Applying algebraic negative-index rules too early.", fix: "Keep this lesson numerical and focus on reciprocal meaning." },
  ],
  masteryQuiz: [
    choice("y9-ind-neg-m1", "Choose the correct value.", "A", ["$\\frac{1}{4}$", "$-4$", "$4$", "$\\frac{1}{2}$"], "Use the reciprocal of 2^2.", "2^{-2}"),
    answer("y9-ind-neg-m2", "Write the value as a decimal.", "10^{-2}", "0.01", "10^-2 is one hundredth.", ["1/100"]),
    choice("y9-ind-neg-m3", "Choose the correct value.", "D", ["$-27$", "$\\frac{1}{9}$", "$27$", "$\\frac{1}{27}$"], "Use the reciprocal of 3^3.", "3^{-3}"),
    answer("y9-ind-neg-m4", "Write the value as a decimal.", "10^{-5}", "0.00001", "10^-5 is one hundred-thousandth.", ["1/100000"]),
    choice("y9-ind-neg-m5", "Which statement is correct?", "B", ["$6^{-1}=-6$", "$6^{-1}=\\frac{1}{6}$", "$6^{-1}=0$", "$6^{-1}=6$"], "An exponent of -1 gives the reciprocal."),
    answer("y9-ind-neg-m6", "Write the value as a decimal.", "4^{-1}", "0.25", "4^-1 is one quarter.", ["1/4", "0.250"]),
    choice("y9-ind-neg-m7", "Which value is smallest?", "C", ["$10^{-2}$", "$10^{-4}$", "$10^{-5}$", "$10^{-3}$"], "10^-5 is one hundred-thousandth."),
    choice("y9-ind-neg-m8", "A student writes 10^-3 = -1000. What is the correction?", "D", ["$-0.001$", "$1000$", "$0.003$", "$0.001$"], "A negative exponent gives the reciprocal: 1/1000."),
    choice("y9-ind-neg-m9", "Which pair has equal values?", "A", ["$5^{-2}$ and $0.04$", "$2^{-3}$ and $0.25$", "$10^{-3}$ and $0.01$", "$4^{-1}$ and $0.4$"], "5^-2 = 1/25 = 0.04."),
    choice("y9-ind-neg-m10", "Arrange the values from smallest to largest.", "C", ["$10^{-1},10^{-2},10^{-3}$", "$10^{-2},10^{-1},10^{-3}$", "$10^{-3},10^{-2},10^{-1}$", "$10^{-3},10^{-1},10^{-2}$"], "0.001 < 0.01 < 0.1."),
  ],
};

const scientificNotation: LessonContent = {
  description: "Write large and small numbers in scientific notation and convert them back to ordinary form.",
  learningIntention: "Use scientific notation to represent, convert and compare very large and very small numbers.",
  successCriteria: ["Write numbers in the form a x 10^n where 1 <= a < 10.", "Convert large numbers to and from scientific notation.", "Convert small decimals to and from scientific notation.", "Use the sign of the exponent to interpret magnitude."],
  teaching: {
    paragraphs: [
      "Scientific notation writes a number as a value from 1 up to but not including 10, multiplied by a power of 10.",
      "For a large number, the exponent is positive. Count how many places the decimal point moves left to create the first factor.",
      "For a small decimal, the exponent is negative. Count how many places the decimal point moves right to reach the first non-zero digit.",
      "Scientific notation makes it easier to compare magnitudes and interpret calculator displays.",
    ],
    latexBlocks: ["a\\times10^n\\quad\\text{where }1\\le a<10", "45000=4.5\\times10^4", "0.0032=3.2\\times10^{-3}"],
  },
  workedExamples: [
    { title: "Write a large number", questionLatex: "\\text{Write }45000\\text{ in scientific notation.}", steps: [{ explanation: "Move the decimal point four places left.", latex: "45000=4.5\\times10^4" }], finalAnswerLatex: "4.5\\times10^4" },
    { title: "Write a small number", questionLatex: "\\text{Write }0.0032\\text{ in scientific notation.}", steps: [{ explanation: "Move the decimal point three places right to reach 3.2.", latex: "0.0032=3.2\\times10^{-3}" }], finalAnswerLatex: "3.2\\times10^{-3}" },
    { title: "Return to ordinary notation", questionLatex: "\\text{Write }6.07\\times10^5\\text{ as an ordinary number.}", steps: [{ explanation: "Move the decimal point five places right.", latex: "6.07\\times10^5=607000" }], finalAnswerLatex: "607000" },
  ],
  guidedPractice: [
    answer("y9-ind-sci-g1", "Write the number in scientific notation.", "72000", "7.2 x 10^4", "Move the decimal point four places left.", ["7.2x10^4", "7.2 * 10^4", "7.2×10^4"]),
    answer("y9-ind-sci-g2", "Write the number in ordinary notation.", "3.5\\times10^3", "3500", "Move the decimal point three places right.", ["3,500"]),
    answer("y9-ind-sci-g3", "Write the number in scientific notation.", "0.006", "6 x 10^-3", "Move the decimal point three places right.", ["6x10^-3", "6 * 10^-3", "6×10^-3"]),
    choice("y9-ind-sci-g4", "Which is valid scientific notation?", "B", ["$45\\times10^3$", "$4.5\\times10^4$", "$0.45\\times10^5$", "$45000\\times10^0$"], "The first factor must be at least 1 and less than 10."),
  ],
  independentPractice: [
    answer("y9-ind-sci-i1", "Write the number in scientific notation.", "860000", "8.6 x 10^5", "Move the decimal point five places left.", ["8.6x10^5", "8.6 * 10^5", "8.6×10^5"]),
    answer("y9-ind-sci-i2", "Write the number in ordinary notation.", "4.2\\times10^{-3}", "0.0042", "Move the decimal point three places left."),
    answer("y9-ind-sci-i3", "Write the number in scientific notation.", "0.00091", "9.1 x 10^-4", "Move the decimal point four places right.", ["9.1x10^-4", "9.1 * 10^-4", "9.1×10^-4"]),
    choice("y9-ind-sci-i4", "Which number is greatest?", "C", ["$7.1\\times10^3$", "$9.5\\times10^2$", "$2.4\\times10^4$", "$8.9\\times10^3$"], "The exponent 4 gives the greatest magnitude."),
    choice("y9-ind-sci-i5", "Which calculator-style display represents 0.00053?", "D", ["$5.3\\times10^4$", "$53\\times10^{-4}$", "$0.53\\times10^{-3}$", "$5.3\\times10^{-4}$"], "The first factor is 5.3 and the decimal moves four places."),
  ],
  commonMistakes: [
    { mistake: "Using a first factor outside the range from 1 to less than 10.", fix: "Adjust the power of 10 until the first factor is at least 1 and below 10." },
    { mistake: "Using a positive exponent for a small decimal.", fix: "Numbers between 0 and 1 use a negative exponent in scientific notation." },
    { mistake: "Counting decimal-place moves incorrectly.", fix: "Write the starting and finishing decimal positions, then count each move." },
    { mistake: "Dropping zeros inside a number when returning to ordinary notation.", fix: "Use place value carefully and include zeros where the empty places must be shown." },
  ],
  masteryQuiz: [
    answer("y9-ind-sci-m1", "Write the number in scientific notation.", "53000", "5.3 x 10^4", "Move four places left.", ["5.3x10^4", "5.3 * 10^4", "5.3×10^4"]),
    answer("y9-ind-sci-m2", "Write the number in ordinary notation.", "2.8\\times10^4", "28000", "Move four places right.", ["28,000"]),
    answer("y9-ind-sci-m3", "Write the number in scientific notation.", "0.0074", "7.4 x 10^-3", "Move three places right.", ["7.4x10^-3", "7.4 * 10^-3", "7.4×10^-3"]),
    answer("y9-ind-sci-m4", "Write the number in ordinary notation.", "6.1\\times10^{-5}", "0.000061", "Move five places left."),
    choice("y9-ind-sci-m5", "Which is valid scientific notation?", "A", ["$9.2\\times10^6$", "$92\\times10^5$", "$0.92\\times10^7$", "$9200000\\times10^0$"], "The first factor must be at least 1 and less than 10."),
    choice("y9-ind-sci-m6", "Which number is smallest?", "D", ["$4\\times10^{-2}$", "$7\\times10^{-3}$", "$9\\times10^{-4}$", "$2\\times10^{-5}$"], "The most negative exponent gives the smallest magnitude here."),
    answer("y9-ind-sci-m7", "Write the number in scientific notation.", "3040000", "3.04 x 10^6", "Move six places left and retain the zero in 3.04.", ["3.04x10^6", "3.04 * 10^6", "3.04×10^6"]),
    choice("y9-ind-sci-m8", "A student writes 0.00082 as 8.2 x 10^4. What must change?", "B", ["The first factor should be 82", "The exponent should be -4", "The exponent should be -3", "The first factor should be 0.82"], "Small decimals use a negative exponent; the decimal moves four places."),
    answer("y9-ind-sci-m9", "Write the number in ordinary notation.", "7.05\\times10^5", "705000", "Move five places right and preserve the zero in 7.05.", ["705,000"]),
    choice("y9-ind-sci-m10", "Which number lies between 0.004 and 0.005?", "C", ["$4.8\\times10^{-2}$", "$3.9\\times10^{-3}$", "$4.8\\times10^{-3}$", "$5.1\\times10^{-3}$"], "4.8 x 10^-3 is 0.0048."),
  ],
};

const magnitudeRounding: LessonContent = {
  description: "Round numbers using decimal places and significant figures, identify order of magnitude, and estimate sensibly.",
  learningIntention: "Use rounding and order of magnitude to communicate and check numerical results.",
  successCriteria: ["Round to a stated number of decimal places.", "Round to a stated number of significant figures.", "Identify a number's order of magnitude.", "Estimate products using rounded scientific notation."],
  teaching: {
    paragraphs: [
      "Decimal places count digits after the decimal point. Significant figures begin at the first non-zero digit.",
      "To round, inspect the next digit. A digit of 5 or more rounds the kept digit up; a digit below 5 leaves it unchanged.",
      "Order of magnitude describes the nearest power of 10 scale of a number. It helps us judge whether an answer is reasonable.",
      "Scientific notation makes estimation efficient: round the first factor, then combine powers of 10.",
    ],
    latexBlocks: ["6.284\\approx6.28\\quad\\text{to 2 decimal places}", "48700\\approx49000\\quad\\text{to 2 significant figures}", "2.7\\times10^6\\text{ has order of magnitude }10^6"],
  },
  workedExamples: [
    { title: "Round to significant figures", questionLatex: "\\text{Round }48700\\text{ to 2 significant figures.}", steps: [{ explanation: "Keep 4 and 8. The next digit is 7, so round 8 up.", latex: "48700\\approx49000" }], finalAnswerLatex: "49000" },
    { title: "Round to decimal places", questionLatex: "\\text{Round }3.1468\\text{ to 3 decimal places.}", steps: [{ explanation: "Keep three digits after the decimal point. The next digit is 8, so round up.", latex: "3.1468\\approx3.147" }], finalAnswerLatex: "3.147" },
    { title: "Estimate using scientific notation", questionLatex: "\\text{Estimate }(4.8\\times10^5)(2.1\\times10^3).", steps: [{ explanation: "Round the first factors to convenient whole numbers.", latex: "(5\\times10^5)(2\\times10^3)" }, { explanation: "Multiply the factors and add the powers of 10.", latex: "10\\times10^8=10^9" }], finalAnswerLatex: "10^9" },
  ],
  guidedPractice: [
    answer("y9-ind-round-g1", "Round to 2 decimal places.", "7.386", "7.39", "The third decimal digit is 6, so round up."),
    answer("y9-ind-round-g2", "Round to 2 significant figures.", "6420", "6400", "Keep 6 and 4. The next digit is 2.", ["6,400"]),
    choice("y9-ind-round-g3", "What is the order of magnitude?", "C", ["$10^3$", "$10^4$", "$10^5$", "$10^6$"], "The number is on the hundred-thousands scale.", "3.2\\times10^5"),
    answer("y9-ind-round-g4", "Round to 3 decimal places.", "0.72846", "0.728", "The fourth decimal digit is 4, so the third decimal digit stays unchanged."),
  ],
  independentPractice: [
    answer("y9-ind-round-i1", "Round to 3 significant figures.", "58320", "58300", "Keep 5, 8 and 3. The next digit is 2.", ["58,300"]),
    answer("y9-ind-round-i2", "Round to 2 decimal places.", "12.995", "13.00", "The third decimal digit is 5, so 12.99 rounds up to 13.00.", ["13", "13.0"]),
    choice("y9-ind-round-i3", "What is the order of magnitude?", "B", ["$10^{-2}$", "$10^{-3}$", "$10^{-4}$", "$10^3$"], "The number is on the thousandths scale.", "2.4\\times10^{-3}"),
    choice("y9-ind-round-i4", "Which is the best estimate?", "A", ["$6\\times10^6$", "$6\\times10^5$", "$60\\times10^7$", "$6\\times10^8$"], "Round the first factors to 3 and 2, then add exponents.", "(3.1\\times10^4)(1.9\\times10^2)"),
    choice("y9-ind-round-i5", "Which rounded value is most suitable for a quick reasonableness check of 79840?", "D", ["$79839$", "$79800.4$", "$79001$", "$80000$"], "A quick estimate uses a convenient nearby value."),
  ],
  commonMistakes: [
    { mistake: "Counting significant figures from the decimal point.", fix: "Start significant figures at the first non-zero digit." },
    { mistake: "Rounding every digit one at a time.", fix: "Look only at the first digit after the required accuracy." },
    { mistake: "Dropping required trailing zeros after rounding decimals.", fix: "Keep zeros that show the requested decimal-place accuracy." },
    { mistake: "Treating an estimate as an exact answer.", fix: "Use an approximation sign and describe the result as an estimate." },
  ],
  masteryQuiz: [
    answer("y9-ind-round-m1", "Round to 2 decimal places.", "5.678", "5.68", "The third decimal digit is 8."),
    answer("y9-ind-round-m2", "Round to 2 significant figures.", "7310", "7300", "Keep 7 and 3. The next digit is 1.", ["7,300"]),
    choice("y9-ind-round-m3", "What is the order of magnitude?", "A", ["$10^7$", "$10^6$", "$10^{-7}$", "$10^8$"], "The exponent gives the scale.", "2.6\\times10^7"),
    answer("y9-ind-round-m4", "Round to 3 decimal places.", "0.90456", "0.905", "The fourth decimal digit is 5, so round up."),
    answer("y9-ind-round-m5", "Round to 3 significant figures.", "0.006438", "0.00644", "Start counting at 6. The next digit after 4 is 8."),
    choice("y9-ind-round-m6", "Which number rounds to 4.7 x 10^4 to 2 significant figures?", "B", ["$46100$", "$46800$", "$47500$", "$45900$"], "46800 rounds to 47000."),
    choice("y9-ind-round-m7", "Which is the best quick estimate?", "D", ["$10^4$", "$10^5$", "$10^7$", "$10^6$"], "Round to (4 x 10^3)(3 x 10^2) = 12 x 10^5, close to 10^6.", "(4.1\\times10^3)(2.8\\times10^2)"),
    choice("y9-ind-round-m8", "A calculator gives 0.0004796. Which value is this to 2 significant figures?", "A", ["$0.00048$", "$0.00047$", "$0.000479$", "$0.0048$"], "The first two significant digits are 4 and 7; the next digit is 9, so round up."),
    answer("y9-ind-round-m9", "Round to 3 significant figures.", "7.996\\times10^5", "8.00 x 10^5", "Rounding 7.996 to three significant figures gives 8.00.", ["8x10^5", "8.0x10^5", "8.00x10^5", "800000"]),
    choice("y9-ind-round-m10", "A measured value is about 6 x 10^-4. Which result is unreasonable for a nearby estimate?", "C", ["$5.8\\times10^{-4}$", "$6.2\\times10^{-4}$", "$6.1\\times10^4$", "$0.00059$"], "6.1 x 10^4 is many orders of magnitude larger."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "index-notation": indexNotation,
  "multiplying-dividing-powers": multiplyingDividing,
  "power-of-a-power": powerOfPower,
  "zero-index": zeroIndex,
  "numerical-negative-indices": negativeIndices,
  "scientific-notation": scientificNotation,
  "magnitude-and-rounding": magnitudeRounding,
};

export function year9IndexLawsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || (unit.slug !== "index-laws" && unit.slug !== "numbers-of-any-magnitude")) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) {
    return null;
  }

  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
