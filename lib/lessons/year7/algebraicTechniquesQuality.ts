import type {
  ExplicitLesson,
  PracticeQuestion,
} from "../differentialCalculus";
import type {
  PlaneShapeDiagram,
  Solid3DDiagram,
  TriangleDiagram,
} from "../types";

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
  | "masteryQuizPool"
  | "multiPartPractice"
>;

type AnswerOptions = {
  accepted?: string[];
  difficulty: number;
};

function typed(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  hint: string,
  explanation: string,
  options: AnswerOptions
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...(options.accepted ?? [])],
    hint,
    explanation,
    difficulty: options.difficulty,
  };
}

function mcq(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string,
  difficulty: number
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: choices.map((text, index) => ({
      label: (["A", "B", "C", "D"] as const)[index],
      text,
    })),
    hint,
    explanation,
    difficulty,
  };
}

const masteryByLesson: Record<string, PracticeQuestion[]> = {
  "algebraic-notation": [
    typed("y7-alg-not-m1", "Three consecutive integers begin with $n$. Write their sum as a simplified expression.", "n+(n+1)+(n+2)", "3n+3", "Represent the next two integers as n + 1 and n + 2 before collecting the three n-terms.", "The integers are n, n + 1 and n + 2. Their sum is n + n + 1 + n + 2 = 3n + 3.", { difficulty: 3, accepted: ["3n + 3", "3(n+1)"] }),
    mcq("y7-alg-not-m2", "Which expression represents the square of the difference between $x$ and 4?", "\text{square of }(x-4)", "C", ["$x^2-4$", "$x^2-16$", "$(x-4)^2$", "$(4-x)$"], "Translate 'the difference' first and place that whole expression inside brackets before squaring.", "The difference between x and 4 is x - 4. Squaring the entire difference gives (x - 4)², so C is correct.", 3),
    typed("y7-alg-not-m3", "Adult tickets cost $a$ dollars, child tickets cost $c$ dollars, and every booking has a $4 fee. Write the cost of 2 adult and 3 child tickets.", "2\text{ adults}+3\text{ children}+\text{fee}", "2a+3c+4", "Form one term for each ticket type, then add the fixed booking fee as a constant term.", "Two adult tickets cost 2a and three child tickets cost 3c. Adding the fixed fee gives 2a + 3c + 4.", { difficulty: 3, accepted: ["2a + 3c + 4", "4+2a+3c"] }),
    typed("y7-alg-not-m4", "Using the labelled rectangle, write its perimeter as a simplified expression.", "P=2l+2w", "4x+6", "Use two lengths and two widths, then collect the x-terms and constants separately.", "The perimeter is 2(x + 3) + 2x = 2x + 6 + 2x = 4x + 6.", { difficulty: 3, accepted: ["4x + 6", "6+4x"] }),
    typed("y7-alg-not-m5", "A student translates 'five less than twice $n$' as $5-2n$. Write the correct expression.", "\text{five less than twice }n", "2n-5", "Start with twice n. The words 'five less than' tell you to subtract 5 from that quantity.", "Twice n is 2n. Five less than this quantity is 2n - 5, not 5 - 2n.", { difficulty: 4, accepted: ["2n - 5"] }),
    typed("y7-alg-not-m6", "One machine doubles $n$ and then adds 5. Another adds 5 to $n$ and then doubles. By how much is the second output greater?", "2(n+5)-(2n+5)", "5", "Write both operation sequences as expressions, then subtract the first output from the second.", "The outputs are 2n + 5 and 2(n + 5) = 2n + 10. Their difference is 5 for every value of n.", { difficulty: 4 }),
    mcq("y7-alg-not-m7", "A hire company charges $b$ dollars to book and $r$ dollars per hour. Which expression models an $h$-hour hire plus a $6 cleaning fee?", "\text{fixed fees}+\text{hourly charge}", "B", ["$brh+6$", "$b+rh+6$", "$(b+r)h+6$", "$b+r(h+6)$"], "Separate fixed charges from the charge that changes with the number of hours.", "The booking and cleaning fees are fixed, while rh is the hourly cost. The total is b + rh + 6, so B is correct.", 4),
    typed("y7-alg-not-m8", "The sum of three consecutive integers beginning with $n$ is $3n+3$. Divide this expression by 3 to write the average of the integers.", "\dfrac{3n+3}{3}", "n+1", "Factor 3 from the numerator before dividing; the result should identify the middle integer.", "Since 3n + 3 = 3(n + 1), dividing by 3 gives n + 1. This is the middle of the three integers.", { difficulty: 5, accepted: ["n + 1", "1+n"] }),
    typed("y7-alg-not-m9", "A two-digit number has tens digit $a$ and units digit $a+3$. Its digits are reversed. Find original number minus reversed number.", "[10a+(a+3)]-[10(a+3)+a]", "-27", "Represent a two-digit number as 10 times its tens digit plus its units digit, then compare the two forms.", "The original is 10a + a + 3 = 11a + 3. The reverse is 10(a + 3) + a = 11a + 30, so the difference is -27.", { difficulty: 5, accepted: ["−27", "-27.0"] }),
    typed("y7-alg-not-m10", "A border has $n$ counters on each of four sides. Counting $4n$ counts each corner twice. Write the number of distinct counters.", "4n-\text{corner overcount}", "4n-4", "Begin with 4n and correct for the four corner counters that were each counted one extra time.", "Four sides give 4n counter positions, but each of the four corners was counted twice. Subtracting the four extra counts gives 4n - 4.", { difficulty: 5, accepted: ["4n - 4", "4(n-1)"] }),
  ],
  "collecting-like-terms": [
    typed("y7-alg-like-m1", "Simplify $7x+3y-2x+5y-x$.", "7x+3y-2x+5y-x", "4x+8y", "Group the x-terms and y-terms separately before operating on their coefficients.", "The x-coefficients give 7 - 2 - 1 = 4 and the y-coefficients give 3 + 5 = 8, so the result is 4x + 8y.", { difficulty: 3, accepted: ["4x + 8y", "8y+4x"] }),
    mcq("y7-alg-like-m2", "Which expression is equivalent to $4a+3b-2a+b$?", "4a+3b-2a+b", "D", ["$6a+4b$", "$2a+3b$", "$6ab$", "$2a+4b$"], "Only combine terms that have exactly the same pronumeral part.", "The a-terms give 4a - 2a = 2a and the b-terms give 3b + b = 4b. Therefore D is equivalent.", 3),
    typed("y7-alg-like-m3", "Using the labelled rectangle, write its perimeter as a simplified expression.", "P=2(3x+2)+2(x+1)", "8x+6", "Add two copies of each labelled side, then collect x-terms and constants separately.", "The perimeter is 2(3x + 2) + 2(x + 1) = 6x + 4 + 2x + 2 = 8x + 6.", { difficulty: 3, accepted: ["8x + 6", "6+8x"] }),
    typed("y7-alg-like-m4", "Simplify $5p+2q-5p+7-q$.", "5p+2q-5p+7-q", "q+7", "Look for a pair that cancels completely, then combine the remaining like terms.", "The p-terms cancel because 5p - 5p = 0. The q-terms give 2q - q = q, leaving q + 7.", { difficulty: 3, accepted: ["q + 7", "7+q"] }),
    typed("y7-alg-like-m5", "A student writes $3x+4x^2+2x=9x^3$. Write the coefficient of $x$ in the correct simplification.", "3x+4x^2+2x", "5", "Keep the x² term separate and combine only the two terms whose pronumeral part is x.", "Only 3x and 2x are like terms, so the correct expression is 4x² + 5x. The coefficient of x is 5.", { difficulty: 4 }),
    typed("y7-alg-like-m6", "Expression A is $8m+3n-5m+n$. Expression B is $2m+6n$. Find the coefficient of $m$ in A minus B.", "(8m+3n-5m+n)-(2m+6n)", "1", "Simplify each expression first, then subtract matching coefficients in A - B.", "Expression A simplifies to 3m + 4n and B is 2m + 6n. In A - B, the m-coefficient is 3 - 2 = 1.", { difficulty: 4 }),
    mcq("y7-alg-like-m7", "Which expression simplifies to zero for every value of $x$?", "\text{identify complete cancellation}", "C", ["$4x-3x$", "$2x+2$", "$5x-5$", "$7x-3x-4x$"], "For an expression to be zero for every x, both its x-coefficient and constant term must cancel.", "In C, 7x - 3x - 4x = (7 - 3 - 4)x = 0x = 0 for every value of x.", 4),
    typed("y7-alg-like-m8", "Three ticket bundles cost $(2a+c)$, $(a+3c)$ and $(4a-c)$ dollars. Write their combined cost.", "(2a+c)+(a+3c)+(4a-c)", "7a+3c", "Remove the brackets, then total the a-coefficients and c-coefficients independently.", "The a-coefficients total 2 + 1 + 4 = 7. The c-coefficients total 1 + 3 - 1 = 3, giving 7a + 3c.", { difficulty: 5, accepted: ["7a + 3c", "3c+7a"] }),
    typed("y7-alg-like-m9", "The expression $kx+4x-3+5$ simplifies to $11x+2$. Find $k$.", "kx+4x-3+5=11x+2", "7", "Match the x-coefficient on each side after combining the constants.", "The left side simplifies to (k + 4)x + 2. Matching its x-coefficient to 11 gives k + 4 = 11, so k = 7.", { difficulty: 5 }),
    typed("y7-alg-like-m10", "Two expressions have sum $12x+5$. One is $7x-3$. Find the other expression.", "(12x+5)-(7x-3)", "5x+8", "Subtract the known expression, remembering that the minus sign changes both of its terms.", "The missing expression is 12x + 5 - (7x - 3) = 12x + 5 - 7x + 3 = 5x + 8.", { difficulty: 5, accepted: ["5x + 8", "8+5x"] }),
  ],
  "expanding-brackets": [
    typed("y7-alg-exp-m1", "Expand and simplify $3(x+4)+2(x-1)$.", "3(x+4)+2(x-1)", "5x+10", "Distribute each outside factor before collecting the x-terms and constants.", "Expanding gives 3x + 12 + 2x - 2. Collecting like terms produces 5x + 10.", { difficulty: 3, accepted: ["5x + 10", "10+5x"] }),
    mcq("y7-alg-exp-m2", "Which is the correct expansion of $-3(2x-5)$?", "-3(2x-5)", "B", ["$-6x-15$", "$-6x+15$", "$6x-15$", "$-6x+5$"], "Apply the negative factor to both terms and check the sign of negative times negative.", "Multiplying both terms by -3 gives -6x and +15 because a negative times a negative is positive. Therefore B is correct.", 3),
    typed("y7-alg-exp-m3", "Expand and simplify $5(2a+1)-3(a-4)$.", "5(2a+1)-3(a-4)", "7a+17", "Treat the subtraction as multiplying the second bracket by -3.", "The expansion is 10a + 5 - 3a + 12. Combining like terms gives 7a + 17.", { difficulty: 3, accepted: ["7a + 17", "17+7a"] }),
    typed("y7-alg-exp-m4", "Expand $2x(3x-4)$ and write the resulting expression.", "2x(3x-4)", "6x^2-8x", "Multiply 2x by each term, including multiplying x by x in the first product.", "The products are 2x × 3x = 6x² and 2x × (-4) = -8x, so the expansion is 6x² - 8x.", { difficulty: 3, accepted: ["6x^2 - 8x", "6x²-8x", "6x² - 8x"] }),
    typed("y7-alg-exp-m5", "A student expands $-4(x-3)$ as $-4x-12$. Write the correct expanded expression.", "-4(x-3)", "-4x+12", "Focus on the second product: a negative outside factor multiplies a negative constant.", "The second product is (-4) × (-3) = +12, so the correct expanded expression is -4x + 12.", { difficulty: 4, accepted: ["-4x + 12", "12-4x", "12 - 4x"] }),
    typed("y7-alg-exp-m6", "Using the labelled rectangle, expand its area and write the simplified expression.", "A=5(2x+3)", "10x+15", "Multiply the fixed width by both terms in the labelled length.", "The area is 5(2x + 3). Distributing 5 gives 5 × 2x + 5 × 3 = 10x + 15.", { difficulty: 4, accepted: ["10x + 15", "15+10x"] }),
    mcq("y7-alg-exp-m7", "Which expression is equivalent to $4(x+2)-2(x-1)$ for every $x$?", "4(x+2)-2(x-1)", "A", ["$2x+10$", "$2x+6$", "$6x+10$", "$2x-10$"], "Expand both brackets, paying attention to the subtraction before the second bracket.", "The expression becomes 4x + 8 - 2x + 2 = 2x + 10, so A is equivalent for every x.", 4),
    typed("y7-alg-exp-m8", "The coefficient of $x$ after expanding $k(x+3)+2(x-1)$ is 7. Find $k$.", "k(x+3)+2(x-1)", "5", "The x-coefficient is formed from kx and 2x; equate their combined coefficient to 7.", "Expanding gives kx + 3k + 2x - 2, whose x-coefficient is k + 2. Since k + 2 = 7, k = 5.", { difficulty: 5 }),
    typed("y7-alg-exp-m9", "Two students expand $3(2x+5)$. One writes $6x+15$ and the other writes $6x+5$. Find the difference between their values when $x=4$.", "(6x+15)-(6x+5)", "10", "Compare the two expressions directly; the x-terms cancel, so substitution can be delayed.", "The difference is (6x + 15) - (6x + 5) = 10 for every x. Therefore at x = 4 the difference is still 10.", { difficulty: 5 }),
    typed("y7-alg-exp-m10", "For what positive integer $k$ does $k(2x-3)$ have constant term $-21$?", "-3k=-21", "7", "The constant term comes from multiplying k by -3; use the required constant to determine k.", "Expanding gives 2kx - 3k. Requiring the constant term -3k to equal -21 gives k = 7.", { difficulty: 5 }),
  ],
  "factorising-common-factors": [
    typed("y7-alg-fac-m1", "Factorise $18x+30$ fully.", "18x+30", "6(3x+5)", "Find the highest common factor of 18 and 30, then divide both terms by it.", "The HCF of 18 and 30 is 6. Dividing each term by 6 gives the fully factorised form 6(3x + 5).", { difficulty: 3, accepted: ["6(3x + 5)", "6(5+3x)"] }),
    mcq("y7-alg-fac-m2", "Which is the fully factorised form of $24a+36b$?", "24a+36b", "C", ["$2(12a+18b)$", "$6(4a+6b)$", "$12(2a+3b)$", "$24(a+12b)$"], "Use the highest common factor, not merely any common factor.", "The HCF of 24 and 36 is 12. Dividing both terms by 12 gives 12(2a + 3b), so C is fully factorised.", 3),
    typed("y7-alg-fac-m3", "Factorise $15x^2-25x$ fully.", "15x^2-25x", "5x(3x-5)", "Take the HCF of the coefficients and the lowest power of x common to both terms.", "The coefficients share 5 and both terms share x. Dividing by 5x gives 3x - 5, so the result is 5x(3x - 5).", { difficulty: 3, accepted: ["5x(3x - 5)", "5x(3x-5)"] }),
    typed("y7-alg-fac-m4", "Factorise $14m+21n-7$ fully.", "14m+21n-7", "7(2m+3n-1)", "Find the factor shared by all three coefficients, including the negative constant.", "All three coefficients are divisible by 7. Dividing term by term gives 7(2m + 3n - 1).", { difficulty: 3, accepted: ["7(2m + 3n - 1)", "7(2m+3n-1)"] }),
    typed("y7-alg-fac-m5", "A student writes $18p+12q=3(6p+4q)$ and calls it fully factorised. Write the factor that should be outside in the fully factorised form.", "18p+12q", "6", "Check whether the two coefficients left inside the bracket still share a factor.", "The bracket coefficients 6 and 4 still share 2, so 3 was not the HCF. The full factor outside is 6.", { difficulty: 4 }),
    typed("y7-alg-fac-m6", "The identity $k(3x+2)=12x+8$ holds for every $x$. Find $k$.", "k(3x+2)=12x+8", "4", "Match either pair of corresponding coefficients after expanding the left side.", "Expanding the left side gives 3kx + 2k. Matching 3k = 12 and 2k = 8 gives the consistent value k = 4.", { difficulty: 4 }),
    mcq("y7-alg-fac-m7", "Which proposed factorisation is not equivalent to $20x+30$?", "20x+30", "D", ["$2(10x+15)$", "$5(4x+6)$", "$10(2x+3)$", "$4(5x+6)$"], "Expand each option; a valid factorisation must reproduce both original terms.", "Options A, B and C all expand to 20x + 30. Option D expands to 20x + 24, so it is not equivalent.", 4),
    typed("y7-alg-fac-m8", "How many integer common factors greater than 1 can be taken from both terms of $24x+36$?", "\text{common divisors of }24\text{ and }36", "5", "Find the HCF first, then list its divisors greater than 1.", "The HCF is 12. Its divisors greater than 1 are 2, 3, 4, 6 and 12, so there are five possible common factors.", { difficulty: 5 }),
    typed("y7-alg-fac-m9", "Using the labelled rectangle, its area is $18x+24$ square units and one side is the HCF of 18 and 24. Write the other side.", "18x+24", "3x+4", "Factorise the area fully; the factor inside the bracket represents the missing side.", "The HCF of 18 and 24 is 6, so 18x + 24 = 6(3x + 4). The other side is therefore 3x + 4.", { difficulty: 5, accepted: ["3x + 4", "4+3x"] }),
    typed("y7-alg-fac-m10", "How many positive integer values of $k$ make both coefficients inside $k(ax+b)=42x+70$ integers?", "k\mid42\text{ and }k\mid70", "4", "The valid k-values are the positive common divisors of 42 and 70.", "The HCF of 42 and 70 is 14. Its positive divisors are 1, 2, 7 and 14, so four values of k work.", { difficulty: 5 }),
  ],
  substitution: [
    typed("y7-alg-sub-m1", "Evaluate $3a^2-2b+c$ when $a=-2$, $b=5$ and $c=-3$.", "3a^2-2b+c", "-1", "Substitute negative values in brackets and evaluate powers before multiplication and addition.", "Substitution gives 3(-2)² - 2(5) + (-3) = 12 - 10 - 3 = -1.", { difficulty: 3, accepted: ["−1", "-1.0"] }),
    mcq("y7-alg-sub-m2", "What is $2x^2$ when $x=-3$?", "2x^2,\quad x=-3", "C", ["$-18$", "$36$", "$18$", "$-36$"], "Square the substituted value before multiplying by the coefficient 2.", "Because (-3)² = 9, the value is 2 × 9 = 18. The negative sign disappears when -3 is squared, so C is correct.", 3),
    typed("y7-alg-sub-m3", "The rules are $A=4n+7$ and $B=6n-1$. Find $B-A$ when $n=5$.", "(6n-1)-(4n+7)", "2", "Evaluate both rules at the same input, then subtract A from B in the stated order.", "At n = 5, A = 27 and B = 29. Therefore B - A = 29 - 27 = 2.", { difficulty: 3 }),
    typed("y7-alg-sub-m4", "Using the labelled rectangular prism and $V=lwh$, find its volume in cubic centimetres.", "V=lwh", "60", "Substitute the three labelled dimensions into the formula and multiply them.", "The prism has l = 5, w = 4 and h = 3. Thus V = 5 × 4 × 3 = 60 cubic centimetres.", { difficulty: 3, accepted: ["60 cm^3", "60 cm³", "60.0"] }),
    typed("y7-alg-sub-m5", "A student evaluates $4x^2$ at $x=3$ as $(4x)^2=144$. Write the correct value.", "4x^2,\quad x=3", "36", "The exponent belongs only to x; square 3 first and then multiply by 4.", "The expression is 4 × x², not (4x)². Substituting x = 3 gives 4 × 9 = 36.", { difficulty: 4 }),
    typed("y7-alg-sub-m6", "The rule $C=12+3m$ gives $C=39$. Find $m$.", "39=12+3m", "9", "Remove the fixed 12 from the total, then divide the remaining amount by 3.", "Subtracting 12 gives 3m = 27. Dividing by 3 gives m = 9.", { difficulty: 4 }),
    mcq("y7-alg-sub-m7", "Which substitution correctly evaluates $5-2y$ when $y=-4$?", "5-2y,\quad y=-4", "B", ["$5-2(4)=-3$", "$5-2(-4)=13$", "$5+2(-4)=-3$", "$5-(-4)=9$"], "Put the negative input in brackets before applying the subtraction and multiplication.", "Correct substitution gives 5 - 2(-4) = 5 + 8 = 13, so B shows both the correct setup and value.", 4),
    typed("y7-alg-sub-m8", "A service costs $C=80+25h$. Without calculating both totals separately, find how much more a 7-hour service costs than a 4-hour service.", "C(7)-C(4)", "75", "The fixed charge cancels, so use only the hourly rate and the change in hours.", "The services differ by 7 - 4 = 3 hours. The fixed $80 is unchanged, so the cost difference is 3 × $25 = $75.", { difficulty: 5, accepted: ["$75", "75.0"] }),
    typed("y7-alg-sub-m9", "For $E=2a^2-3b$, the value of $a$ changes from 2 to 3 while $b$ stays fixed. Find the increase in $E$.", "[2(3)^2-3b]-[2(2)^2-3b]", "10", "Subtract the two formula values symbolically; the unchanged b-terms cancel.", "The increase is (18 - 3b) - (8 - 3b) = 18 - 8 = 10. It does not depend on b because those terms cancel.", { difficulty: 5 }),
    typed("y7-alg-sub-m10", "The rule $F=\dfrac95C+32$ converts Celsius to Fahrenheit. If two Celsius temperatures differ by 10 degrees, find their Fahrenheit difference.", "F(C+10)-F(C)", "18", "Subtract the two formula outputs; the fixed 32 cancels and only the change in C remains.", "The difference is [9(C + 10)/5 + 32] - [9C/5 + 32] = 9 × 10/5 = 18 degrees Fahrenheit.", { difficulty: 5, accepted: ["18°F", "18 degrees"] }),
  ],
};

const rectangle = (
  description: string,
  lengthLabel: string,
  widthLabel: string
): PlaneShapeDiagram => ({
  description,
  vertices: [
    { x: 0, y: 0, rightAngle: true },
    { x: 6, y: 0, rightAngle: true },
    { x: 6, y: 3, rightAngle: true },
    { x: 0, y: 3, rightAngle: true },
  ],
  edges: [
    { label: lengthLabel },
    { label: widthLabel },
    { label: lengthLabel },
    { label: widthLabel },
  ],
  fill: "blue",
});

const square = (description: string, sideLabel: string): PlaneShapeDiagram => ({
  description,
  vertices: [
    { x: 0, y: 0, rightAngle: true },
    { x: 4, y: 0, rightAngle: true },
    { x: 4, y: 4, rightAngle: true },
    { x: 0, y: 4, rightAngle: true },
  ],
  edges: Array.from({ length: 4 }, () => ({ label: sideLabel, ticks: 1 })),
  fill: "teal",
});

const triangle: TriangleDiagram = {
  description: "Right triangle with horizontal base 10 centimetres and perpendicular side height 6 centimetres.",
  vertices: { A: { x: 50, y: 60 }, B: { x: 50, y: 240 }, C: { x: 350, y: 240 } },
  sideLabels: { AB: "6 cm", BC: "10 cm" },
  rightAngleAt: "B",
  vertexLabels: { A: "", B: "", C: "" },
};

const prism = (
  description: string,
  length: string,
  width: string,
  height: string
): Solid3DDiagram => ({
  description,
  solid: "rectangularPrism",
  labels: { length, width, height },
  color: "violet",
});

const visualById: Record<string, Partial<PracticeQuestion>> = {
  "y7-alg-not-m4": { planeShapeDiagram: rectangle("Rectangle with length x plus 3 and width x.", "x + 3", "x") },
  "y7-alg-like-i4": { prompt: "Using the labelled rectangle, write its perimeter as a simplified expression.", planeShapeDiagram: rectangle("Rectangle with length 3x centimetres and width x centimetres.", "3x cm", "x cm") },
  "y7-alg-like-m3": { planeShapeDiagram: rectangle("Rectangle with length 3x plus 2 and width x plus 1.", "3x + 2", "x + 1") },
  "y7-alg-exp-m6": { planeShapeDiagram: rectangle("Rectangle with length 2x plus 3 and width 5.", "2x + 3", "5") },
  "y7-alg-fac-m9": { planeShapeDiagram: rectangle("Rectangle of area 18x plus 24 square units with one side 6 and the other side unknown.", "?", "6") },
  "y7-alg-sub-g3": { prompt: "Using the labelled triangle and $A=\\dfrac{bh}{2}$, find its area.", triangleDiagram: triangle },
  "y7-alg-sub-i2": { prompt: "Using the labelled square and $P=4s$, find its perimeter.", planeShapeDiagram: square("Square with side length 7 units.", "7") },
  "y7-alg-sub-m4": { solid3DDiagram: prism("Rectangular prism with length 5 centimetres, width 4 centimetres and height 3 centimetres.", "5 cm", "4 cm", "3 cm") },
};

const lessonHints: Record<string, string> = {
  "algebraic-notation": "Translate the wording in order: identify multiplication or powers first, then addition or subtraction, and write numbers before pronumerals.",
  "collecting-like-terms": "Group terms with exactly the same pronumeral part, then operate on their coefficients while leaving unlike terms separate.",
  "expanding-brackets": "Multiply the factor outside the bracket by every term inside it, keeping careful track of each sign.",
  "factorising-common-factors": "Find the highest factor shared by every term, then divide each term by it to build the bracket.",
  substitution: "Replace each pronumeral with its given value in brackets, then evaluate using the order of operations.",
};

function acceptedVariants(question: PracticeQuestion): string[] | undefined {
  if (question.choices?.length) return undefined;
  const answer = question.answer;
  const variants = new Set(question.acceptedAnswers ?? []);
  variants.add(answer);
  if (/^-?\d+$/.test(answer)) {
    variants.add(`${answer}.0`);
    if (answer.startsWith("-")) variants.add(answer.replace("-", "−"));
  }
  if (/[a-z]/i.test(answer)) {
    variants.add(answer.replace(/([+-])/g, " $1 ").replace(/\s+/g, " ").trim());
    variants.add(answer.replace(/(\d)([a-z])/gi, "$1*$2"));
    variants.add(answer.replace(/\^2/g, "²").replace(/\^3/g, "³"));
  }
  return [...variants];
}

function enrichQuestion(question: PracticeQuestion, lessonSlug: string): PracticeQuestion {
  const explanation = question.explanation?.trim() ?? "";
  const enriched: PracticeQuestion = {
    ...question,
    ...visualById[question.id],
    acceptedAnswers: acceptedVariants(question),
    hint: question.hint && !/Re-read the teaching section|Consider the key rule/i.test(question.hint)
      ? question.hint
      : lessonHints[lessonSlug],
    explanation:
      explanation.length >= 40
        ? explanation
        : `${explanation} Therefore the required answer is ${question.answer}.`,
  };
  return enriched;
}

const multipartByLesson: Record<string, PracticeQuestion[]> = {
  "algebraic-notation": [
    {
      id: "y7-alg-not-mp1",
      prompt: "A school orders supplies. A pen costs p dollars and a notebook costs n dollars.",
      latex: "\text{pen}=p,\quad\text{notebook}=n",
      answer: "4p+3n",
      acceptedAnswers: ["4p + 3n", "3n+4p"],
      difficulty: 4,
      hint: "Build one term for the pens and one for the notebooks, then use that expression in each later part.",
      explanation: "Four pens and three notebooks cost 4p + 3n. This expression has two terms, and substituting p = 3 and n = 5 gives 27 dollars.",
      parts: [
        { key: "a", label: "(a)", prompt: "Write an expression for the total cost of 4 pens and 3 notebooks.", marks: 1, answer: "4p+3n", acceptedAnswers: ["4p + 3n", "3n+4p"], hint: "Multiply each item price by its quantity, then add the two costs.", explanation: "Four pens cost 4p and three notebooks cost 3n, so the total cost is 4p + 3n." },
        { key: "b", label: "(b)", prompt: "How many terms are in your expression from part (a)?", marks: 1, answer: "2", acceptedAnswers: ["2.0"], hint: "Count the algebraic parts separated by addition or subtraction signs.", explanation: "The expression 4p + 3n has the two terms 4p and 3n, so it contains two terms." },
        { key: "c", label: "(c)", prompt: "Find the total cost when a pen costs $3 and a notebook costs $5.", marks: 2, answer: "27", acceptedAnswers: ["$27", "27.0"], hint: "Substitute p = 3 and n = 5 into your expression from part (a).", explanation: "Substituting gives 4(3) + 3(5) = 12 + 15 = 27, so the supplies cost 27 dollars." },
      ],
    },
  ],
  "collecting-like-terms": [
    {
      id: "y7-alg-like-mp1",
      prompt: "The labelled rectangle has length 4x + 2 centimetres and width x + 3 centimetres.",
      latex: "P=2l+2w",
      answer: "10x+10",
      acceptedAnswers: ["10x + 10", "10(x+1)"],
      difficulty: 4,
      planeShapeDiagram: rectangle("Rectangle with length 4x plus 2 centimetres and width x plus 3 centimetres.", "4x + 2 cm", "x + 3 cm"),
      hint: "Use two lengths and two widths, then collect x-terms and constants separately.",
      explanation: "The perimeter is 2(4x + 2) + 2(x + 3) = 10x + 10. Its coefficient and constant are both 10, and at x = 5 it is 60 centimetres.",
      parts: [
        { key: "a", label: "(a)", prompt: "Write the perimeter as a simplified expression.", marks: 2, answer: "10x+10", acceptedAnswers: ["10x + 10", "10(x+1)"], hint: "Add two copies of each labelled side before collecting like terms.", explanation: "P = 2(4x + 2) + 2(x + 3) = 8x + 4 + 2x + 6 = 10x + 10." },
        { key: "b", label: "(b)", prompt: "State the constant term of your expression from part (a).", marks: 1, answer: "10", acceptedAnswers: ["10.0"], hint: "The constant is the term in your simplified expression that has no x.", explanation: "In the simplified perimeter 10x + 10, the term without x is 10, so the constant term is 10." },
        { key: "c", label: "(c)", prompt: "Find the perimeter in centimetres when x = 5.", marks: 1, answer: "60", acceptedAnswers: ["60 cm", "60.0"], hint: "Substitute x = 5 into the simplified perimeter from part (a).", explanation: "Using P = 10x + 10 gives P = 10(5) + 10 = 60, so the perimeter is 60 centimetres." },
      ],
    },
  ],
  "expanding-brackets": [
    {
      id: "y7-alg-exp-mp1",
      prompt: "The labelled rectangular room has length 2x + 5 metres and width 4 metres.",
      latex: "A=l\times w",
      answer: "8x+20",
      acceptedAnswers: ["8x + 20", "4(2x+5)"],
      difficulty: 4,
      planeShapeDiagram: rectangle("Rectangular room with length 2x plus 5 metres and width 4 metres.", "2x + 5 m", "4 m"),
      hint: "Multiply the labelled length by the width, then use the expanded area in the later parts.",
      explanation: "The area is 4(2x + 5) = 8x + 20. Its constant term is 20, and substituting x = 3 gives an area of 44 square metres.",
      parts: [
        { key: "a", label: "(a)", prompt: "Expand the room's area and write the simplified expression.", marks: 1, answer: "8x+20", acceptedAnswers: ["8x + 20", "20+8x"], hint: "Multiply the width 4 by both terms in the labelled length.", explanation: "The area is 4(2x + 5). Distributing 4 gives 8x + 20 as the expanded expression." },
        { key: "b", label: "(b)", prompt: "State the constant term of your expression from part (a).", marks: 1, answer: "20", acceptedAnswers: ["20.0"], hint: "Identify the term in your expanded area that contains no x.", explanation: "The expanded area is 8x + 20, so the term without a pronumeral is the constant 20." },
        { key: "c", label: "(c)", prompt: "Find the area in square metres when x = 3.", marks: 2, answer: "44", acceptedAnswers: ["44 m^2", "44 m²", "44.0"], hint: "Substitute x = 3 into the expanded area from part (a).", explanation: "Substitution gives A = 8(3) + 20 = 24 + 20 = 44, so the area is 44 square metres." },
      ],
    },
  ],
  "factorising-common-factors": [
    {
      id: "y7-alg-fac-mp1",
      prompt: "Consider the expression 12x + 18.",
      latex: "12x+18",
      answer: "6(2x+3)",
      acceptedAnswers: ["6(2x + 3)", "6(3+2x)"],
      difficulty: 4,
      hint: "Find the HCF, divide both terms by it, and use the factorised structure in each later part.",
      explanation: "The HCF is 6, so 12x + 18 = 6(2x + 3). The bracket's constant is 3, and the original expression equals 66 when x = 4.",
      parts: [
        { key: "a", label: "(a)", prompt: "Factorise the expression fully.", marks: 1, answer: "6(2x+3)", acceptedAnswers: ["6(2x + 3)", "6(3+2x)"], hint: "Find the highest number that divides both 12 and 18.", explanation: "The HCF of 12 and 18 is 6. Dividing each term by 6 gives the full factorisation 6(2x + 3)." },
        { key: "b", label: "(b)", prompt: "State the constant inside the bracket in your answer to part (a).", marks: 1, answer: "3", acceptedAnswers: ["3.0"], hint: "Read the term without x from the bracket you produced in part (a).", explanation: "The factorised expression is 6(2x + 3), so the constant term inside its bracket is 3." },
        { key: "c", label: "(c)", prompt: "Evaluate the original expression when x = 4.", marks: 2, answer: "66", acceptedAnswers: ["66.0"], hint: "Substitute x = 4 into either the original or factorised expression.", explanation: "Using the original expression gives 12(4) + 18 = 48 + 18 = 66, matching the factorised calculation." },
      ],
    },
  ],
  substitution: [
    {
      id: "y7-alg-sub-mp1",
      prompt: "A removalist charges C = 80 + 25h dollars, where h is the number of hours worked.",
      latex: "C=80+25h",
      answer: "180",
      acceptedAnswers: ["$180", "180.0"],
      difficulty: 4,
      hint: "Substitute each duration into the rule; for the final part, reverse the operations to find h.",
      explanation: "The rule gives costs of 180 dollars for 4 hours and 230 dollars for 6 hours. Reversing the rule for a 280-dollar charge gives 8 hours.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the cost in dollars for a job lasting 4 hours.", marks: 1, answer: "180", acceptedAnswers: ["$180", "180.0"], hint: "Substitute h = 4 into the charging rule.", explanation: "Substituting h = 4 gives C = 80 + 25(4) = 80 + 100 = 180 dollars." },
        { key: "b", label: "(b)", prompt: "Find the cost in dollars for a job lasting 6 hours.", marks: 1, answer: "230", acceptedAnswers: ["$230", "230.0"], hint: "Use the same charging rule, this time substituting h = 6 for the duration.", explanation: "Substituting h = 6 gives C = 80 + 25(6) = 80 + 150 = 230 dollars." },
        { key: "c", label: "(c)", prompt: "A customer is charged $280. How many hours did the job take?", marks: 2, answer: "8", acceptedAnswers: ["8 hours", "8.0"], hint: "Subtract the fixed charge first, then divide the remainder by the hourly rate.", explanation: "From 280 = 80 + 25h, subtracting 80 gives 25h = 200. Dividing by 25 gives h = 8 hours." },
      ],
    },
  ],
};

export function applyYear7AlgebraicTechniquesQuality(
  content: LessonContent,
  lessonSlug: string
): LessonContent {
  return {
    ...content,
    guidedPractice: content.guidedPractice.map((question) => enrichQuestion(question, lessonSlug)),
    independentPractice: content.independentPractice.map((question) => enrichQuestion(question, lessonSlug)),
    masteryQuiz: masteryByLesson[lessonSlug].map((question) => enrichQuestion(question, lessonSlug)),
    // The former 26-item pools repeated one procedure and failed the 30% diversity cap.
    // Reject them rather than keeping low-value variants in the live question bank.
    masteryQuizPool: [],
    multiPartPractice: multipartByLesson[lessonSlug].map((question) => enrichQuestion(question, lessonSlug)),
  };
}
