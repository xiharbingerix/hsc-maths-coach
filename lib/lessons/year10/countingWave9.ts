// Year 10 restructure — Wave 9 (Counting Principles). Authors all hidden stubs in Unit 12
// (counting-principles): counting-factorial-notation (12A), arrangements (12B), selections (12C),
// counting-in-probability (12D). All extending (advanced-only). Architecture untouched. Prose uses
// unicode superscripts (no raw ^ or _). Y10 audit: 3 worked examples + 4 commonMistakes + 4/5/10 +
// masteryPassMark 0.8. Concept-first: multiplication principle before factorial formulas.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Decide whether order matters first, then count.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about whether order matters, then reason.", explanation };
}

// ── 12A Counting and Factorial Notation (extending) ────────────────────────────────────
const factorialNotation: Partial<ExplicitLesson> = {
  description: "Use the multiplication (fundamental counting) principle and factorial notation to count outcomes.",
  learningIntention: "Count outcomes of sequential choices and evaluate factorials.",
  successCriteria: ["Apply the multiplication principle to sequential choices.", "Evaluate n! and simple factorial quotients.", "Know that 0! = 1.", "Recognise when the multiplication principle applies."],
  teaching: {
    paragraphs: [
      "Counting is about working out HOW MANY outcomes are possible without listing them all. The MULTIPLICATION (fundamental counting) PRINCIPLE is the key idea: if one choice can be made in m ways and a following choice in n ways, then together they can be made in m × n ways. It applies when choices are made IN SEQUENCE, one after another.",
      "For example, 3 shirts and 2 pairs of pants give 3 × 2 = 6 outfits — each shirt pairs with each pair of pants.",
      "When you arrange several distinct things, the choices shrink by one each time, and this is captured by a FACTORIAL: n! = n × (n − 1) × … × 1. So arranging 4 books is 4! = 4 × 3 × 2 × 1 = 24.",
      "By convention 0! = 1 (there is exactly one way to arrange nothing). Factorial quotients often cancel neatly: 6!/5! = 6, because the 5! cancels. Build the count from the principle — don't just reach for a formula.",
    ],
    latexBlocks: ["\\text{multiplication principle: } m \\times n", "n! = n \\times (n-1) \\times \\dots \\times 1", "0! = 1,\\quad \\tfrac{6!}{5!} = 6"],
  },
  workedExamples: [
    { title: "Multiplication principle", questionLatex: "\\text{3 shirts and 2 pants. How many outfits?}", steps: [{ explanation: "Each shirt with each pair of pants.", latex: "3 \\times 2 = 6" }], finalAnswerLatex: "6" },
    { title: "A factorial", questionLatex: "\\text{Evaluate } 4!.", steps: [{ explanation: "Multiply down to 1.", latex: "4 \\times 3 \\times 2 \\times 1 = 24" }], finalAnswerLatex: "24" },
    { title: "Arranging", questionLatex: "\\text{In how many orders can 3 books sit on a shelf?}", steps: [{ explanation: "Arrangements of 3 distinct items.", latex: "3! = 6" }], finalAnswerLatex: "6" },
  ],
  guidedPractice: [
    mcq("y10-cfn-g1", "The multiplication principle: m ways then n ways gives:", "A", ["m × n", "m + n", "m − n", "m ÷ n"], 3, "Sequential independent choices multiply."),
    ans("y10-cfn-g2", "A cafe has 3 mains and 4 desserts. How many main+dessert meals?", "3\\times 4", "12", 3, "3 × 4 = 12.", []),
    ans("y10-cfn-g3", "Evaluate 5!.", "5!", "120", 3, "5 × 4 × 3 × 2 × 1 = 120.", []),
    ans("y10-cfn-g4", "Evaluate 4!.", "4!", "24", 2, "4 × 3 × 2 × 1 = 24.", []),
  ],
  independentPractice: [
    ans("y10-cfn-i1", "How many outcomes for 2 × 3 × 4 sequential choices?", "2\\times3\\times4", "24", 3, "2 × 3 × 4 = 24.", []),
    ans("y10-cfn-i2", "Evaluate 3!.", "3!", "6", 2, "3 × 2 × 1 = 6.", []),
    mcq("y10-cfn-i3", "What is 0!?", "B", ["0", "1", "undefined", "10"], 3, "By convention, 0! = 1."),
    ans("y10-cfn-i4", "Evaluate 6!.", "6!", "720", 4, "6 × 5 × 4 × 3 × 2 × 1 = 720.", []),
    ans("y10-cfn-i5", "A meal has 2 entrees, 3 mains, 2 desserts. How many full meals?", "2\\times3\\times2", "12", 3, "2 × 3 × 2 = 12.", []),
  ],
  masteryQuiz: [
    ans("y10-cfn-m1", "How many outcomes for 4 ways then 5 ways?", "4\\times5", "20", 3, "4 × 5 = 20.", []),
    ans("y10-cfn-m2", "Evaluate 5!.", "5!", "120", 3, "5! = 120.", []),
    mcq("y10-cfn-m3", "n! means:", "C", ["n + (n−1) + … + 1", "n × n", "n × (n−1) × … × 1", "n ÷ (n−1)"], 3, "A factorial is the product from n down to 1."),
    ans("y10-cfn-m4", "How many outcomes for 3 × 3 sequential choices?", "3\\times3", "9", 3, "3 × 3 = 9.", []),
    ans("y10-cfn-m5", "Evaluate 6!/5!.", "6!/5!", "6", 4, "The 5! cancels, leaving 6.", []),
    ans("y10-cfn-m6", "Evaluate 2!.", "2!", "2", 2, "2 × 1 = 2.", []),
    ans("y10-cfn-m7", "4 shirts and 3 ties. How many shirt+tie combinations?", "4\\times3", "12", 3, "4 × 3 = 12.", []),
    mcq("y10-cfn-m8", "The multiplication principle applies when choices are made:", "A", ["in sequence (one after another)", "all at once with no order", "only if equal", "never"], 4, "It multiplies the ways of sequential, independent choices."),
    ans("y10-cfn-m9", "Evaluate 7!/6!.", "7!/6!", "7", 4, "The 6! cancels, leaving 7.", []),
    ans("y10-cfn-m10", "Evaluate 1!.", "1!", "1", 1, "1! = 1.", []),
  ],
  commonMistakes: [
    { mistake: "Adding the numbers of ways instead of multiplying.", fix: "Sequential independent choices multiply: m × n." },
    { mistake: "Thinking 0! = 0.", fix: "0! = 1 by convention." },
    { mistake: "Expanding factorials fully before cancelling.", fix: "Cancel common factorials first: 6!/5! = 6." },
    { mistake: "Applying the multiplication principle to overlapping choices.", fix: "It needs independent, sequential choices." },
  ],
  masteryPassMark: 0.8,
};

// ── 12B Arrangements (extending) — order matters ───────────────────────────────────────
const arrangements: Partial<ExplicitLesson> = {
  description: "Count arrangements where order matters: n distinct items in a row (n!) and r chosen in order from n.",
  learningIntention: "Recognise when order matters and count arrangements accordingly.",
  successCriteria: ["Identify language that signals order matters.", "Count n distinct items in a row as n!.", "Count r in order from n as n × (n−1) × …", "Distinguish arrangements from selections."],
  teaching: {
    paragraphs: [
      "An ARRANGEMENT is a count where ORDER MATTERS — 'arrange', 'in a row', 'in how many orders', 'rank', 'first/second/third' all signal it. Putting the same people in a different order counts as a different arrangement.",
      "Arranging n distinct items in a row uses the multiplication principle directly: n choices for the first place, n − 1 for the next, and so on — which is n!. So 4 people in a row is 4! = 24.",
      "If you arrange only r of the n items, you stop multiplying after r factors: arrange 2 from 5 is 5 × 4 = 20; arrange 3 from 5 is 5 × 4 × 3 = 60. (This is nPr = n!/(n − r)!.)",
      "The contrast to watch for: arrangements care about order, SELECTIONS do not. Whenever the order of the chosen items changes the outcome, you are counting arrangements.",
    ],
    latexBlocks: ["\\text{order matters} \\Rightarrow \\text{arrangement}", "n \\text{ in a row} = n!", "\\text{arrange } r \\text{ from } n = n \\times (n-1) \\times \\dots\\ (r \\text{ factors})"],
  },
  workedExamples: [
    { title: "All in a row", questionLatex: "\\text{In how many orders can 4 people stand in a row?}", steps: [{ explanation: "Arrangements of 4 distinct people.", latex: "4! = 24" }], finalAnswerLatex: "24" },
    { title: "Some in order", questionLatex: "\\text{Arrange 2 of 5 books on a shelf. How many ways?}", steps: [{ explanation: "5 choices then 4 choices.", latex: "5 \\times 4 = 20" }], finalAnswerLatex: "20" },
    { title: "Three in order", questionLatex: "\\text{Arrange 3 of 4 letters. How many ways?}", steps: [{ explanation: "4 × 3 × 2.", latex: "= 24" }], finalAnswerLatex: "24" },
  ],
  guidedPractice: [
    mcq("y10-arng-g1", "In an arrangement, order:", "A", ["matters", "does not matter", "is irrelevant", "must be alphabetical"], 3, "Arrangements count different orders as different."),
    ans("y10-arng-g2", "In how many orders can 3 people stand in a row?", "3!", "6", 3, "3! = 6.", []),
    ans("y10-arng-g3", "Arrange 2 of 4 books in order. How many ways?", "4\\times3", "12", 3, "4 × 3 = 12.", []),
    ans("y10-arng-g4", "In how many orders can 5 books sit on a shelf?", "5!", "120", 4, "5! = 120.", []),
  ],
  independentPractice: [
    ans("y10-arng-i1", "In how many orders can 4 people sit in a row?", "4!", "24", 3, "4! = 24.", []),
    ans("y10-arng-i2", "Arrange 2 of 6 in order. How many ways?", "6\\times5", "30", 3, "6 × 5 = 30.", []),
    mcq("y10-arng-i3", "The word 'arrange' usually signals:", "A", ["order matters", "order does not matter", "addition", "division"], 3, "'Arrange' means order matters."),
    ans("y10-arng-i4", "Arrange 3 of 5 in order. How many ways?", "5\\times4\\times3", "60", 4, "5 × 4 × 3 = 60.", []),
    ans("y10-arng-i5", "In how many orders can 3 medals be awarded to 3 people?", "3!", "6", 3, "3! = 6.", []),
  ],
  masteryQuiz: [
    ans("y10-arng-m1", "In how many orders can 5 people stand in a row?", "5!", "120", 4, "5! = 120.", []),
    ans("y10-arng-m2", "Arrange 2 of 5 in order. How many ways?", "5\\times4", "20", 3, "5 × 4 = 20.", []),
    mcq("y10-arng-m3", "A permutation is an:", "A", ["ordered arrangement", "unordered selection", "addition", "average"], 4, "A permutation is an ordered arrangement."),
    ans("y10-arng-m4", "Arrange 3 of 4 in order. How many ways?", "4\\times3\\times2", "24", 3, "4 × 3 × 2 = 24.", []),
    ans("y10-arng-m5", "In how many orders can 6 people line up?", "6!", "720", 4, "6! = 720.", []),
    ans("y10-arng-m6", "Arrange 2 of 7 in order. How many ways?", "7\\times6", "42", 3, "7 × 6 = 42.", []),
    mcq("y10-arng-m7", "'In how many orders' signals:", "A", ["arrangements", "selections", "the mean", "factorising"], 3, "Asking about order means arrangements."),
    ans("y10-arng-m8", "Arrange all 4 of 4 in order. How many ways?", "4!", "24", 3, "4! = 24.", []),
    ans("y10-arng-m9", "Arrange 3 of 6 in order. How many ways?", "6\\times5\\times4", "120", 4, "6 × 5 × 4 = 120.", []),
    ans("y10-arng-m10", "Arrange 2 of 8 in order. How many ways?", "8\\times7", "56", 3, "8 × 7 = 56.", []),
  ],
  commonMistakes: [
    { mistake: "Treating an ordered problem as unordered.", fix: "If order matters, it is an arrangement — count with n × (n−1) × …" },
    { mistake: "Multiplying too many or too few factors for r from n.", fix: "Use exactly r descending factors starting at n." },
    { mistake: "Confusing arrangements with selections.", fix: "Arrangements count order; selections do not." },
    { mistake: "Forgetting n in a row is n!.", fix: "All n distinct items in a row gives n! orders." },
  ],
  masteryPassMark: 0.8,
};

// ── 12C Selections (extending) — order does not matter ─────────────────────────────────
const selections: Partial<ExplicitLesson> = {
  description: "Count selections where order does not matter (combinations), and distinguish them from arrangements.",
  learningIntention: "Recognise when order is irrelevant and count selections accordingly.",
  successCriteria: ["Identify language that signals order does not matter.", "Count choosing r from n (combinations).", "Explain why selections divide out the orderings.", "Distinguish selections from arrangements."],
  teaching: {
    paragraphs: [
      "A SELECTION is a count where ORDER DOES NOT MATTER — 'choose', 'select', 'pick', 'a committee', 'a group' all signal it. Picking Anna and Ben is the same selection as picking Ben and Anna.",
      "Because order doesn't matter, a selection has FEWER outcomes than the matching arrangement: you take the arrangements and DIVIDE OUT the different orderings of the chosen items. Choosing 2 from 4 is the 4 × 3 = 12 arrangements divided by the 2! = 2 orderings, giving 6. (This is nCr = n!/(r!(n − r)!).)",
      "So choose 3 from 5 = (5 × 4 × 3)/(3 × 2 × 1) = 10. A handy check: choosing all n, or choosing none, gives exactly 1 way.",
      "The decision that drives everything is: does reordering the chosen items make a different outcome? If NO, it's a selection (combination); if yes, it's an arrangement. Selections are always ≤ the corresponding arrangements.",
    ],
    latexBlocks: ["\\text{order does not matter} \\Rightarrow \\text{selection}", "\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}", "\\text{selection} = \\frac{\\text{arrangement}}{r!}"],
  },
  workedExamples: [
    { title: "Choose 2 from 4", questionLatex: "\\text{How many ways to choose 2 people from 4?}", steps: [{ explanation: "Arrangements 4×3=12, divide by 2! orderings.", latex: "\\frac{12}{2} = 6" }], finalAnswerLatex: "6" },
    { title: "Choose 3 from 5", questionLatex: "\\text{How many ways to choose 3 from 5?}", steps: [{ explanation: "(5×4×3)/(3×2×1).", latex: "\\frac{60}{6} = 10" }], finalAnswerLatex: "10" },
    { title: "Handshakes", questionLatex: "\\text{How many handshakes among 4 people?}", steps: [{ explanation: "Choose 2 people, order irrelevant.", latex: "\\binom{4}{2} = 6" }], finalAnswerLatex: "6" },
  ],
  guidedPractice: [
    mcq("y10-seln-g1", "In a selection, order:", "B", ["matters", "does not matter", "must be increasing", "is reversed"], 3, "Selections treat different orders as the same."),
    ans("y10-seln-g2", "How many ways to choose 2 from 4?", "\\binom{4}{2}", "6", 3, "(4×3)/2! = 6.", []),
    ans("y10-seln-g3", "How many ways to choose 3 from 5?", "\\binom{5}{3}", "10", 4, "(5×4×3)/3! = 10.", []),
    mcq("y10-seln-g4", "The words 'choose' or 'select' usually signal:", "B", ["order matters", "order does not matter", "multiplication only", "a factorial of the total"], 3, "'Choose'/'select' means order does not matter."),
  ],
  independentPractice: [
    ans("y10-seln-i1", "How many ways to choose 2 from 5?", "\\binom{5}{2}", "10", 3, "(5×4)/2! = 10.", []),
    ans("y10-seln-i2", "How many ways to choose 2 from 6?", "\\binom{6}{2}", "15", 3, "(6×5)/2! = 15.", []),
    mcq("y10-seln-i3", "A combination is a:", "B", ["ordered list", "selection where order doesn't matter", "factorial", "sum"], 4, "A combination is an unordered selection."),
    ans("y10-seln-i4", "How many ways to choose 3 from 4?", "\\binom{4}{3}", "4", 3, "(4×3×2)/3! = 4.", []),
    ans("y10-seln-i5", "How many ways to choose all 4 from 4?", "\\binom{4}{4}", "1", 2, "There is exactly 1 way to choose them all.", []),
  ],
  masteryQuiz: [
    ans("y10-seln-m1", "How many ways to choose 2 from 4?", "\\binom{4}{2}", "6", 3, "(4×3)/2! = 6.", []),
    ans("y10-seln-m2", "How many ways to choose 3 from 6?", "\\binom{6}{3}", "20", 4, "(6×5×4)/3! = 20.", []),
    mcq("y10-seln-m3", "Choosing a committee with no special roles is a:", "B", ["arrangement", "selection", "permutation", "factorial"], 4, "No roles means order doesn't matter — a selection."),
    ans("y10-seln-m4", "How many ways to choose 2 from 7?", "\\binom{7}{2}", "21", 3, "(7×6)/2! = 21.", []),
    ans("y10-seln-m5", "How many ways to choose 1 from 5?", "\\binom{5}{1}", "5", 2, "Choosing 1 from 5 gives 5 ways.", []),
    mcq("y10-seln-m6", "Compared with selections, arrangements of the same items are:", "A", ["larger (order counts)", "smaller", "equal", "always zero"], 4, "Arrangements count orderings, so there are more of them."),
    ans("y10-seln-m7", "How many ways to choose all 5 from 5?", "\\binom{5}{5}", "1", 2, "Exactly 1 way to choose them all.", []),
    ans("y10-seln-m8", "How many ways to choose 2 from 8?", "\\binom{8}{2}", "28", 4, "(8×7)/2! = 28.", []),
    mcq("y10-seln-m9", "A combination divides the arrangement count by:", "C", ["n", "n!", "r! (the orderings of the chosen)", "(n−r)"], 5, "Dividing out the r! orderings turns arrangements into selections."),
    ans("y10-seln-m10", "How many ways to choose 3 from 7?", "\\binom{7}{3}", "35", 4, "(7×6×5)/3! = 35.", []),
  ],
  commonMistakes: [
    { mistake: "Counting order when it doesn't matter.", fix: "For selections, AB and BA are the same — divide out the orderings." },
    { mistake: "Using an arrangement count for a committee/group.", fix: "Groups with no roles are selections, not arrangements." },
    { mistake: "Forgetting to divide by r!.", fix: "nCr = nPr ÷ r!." },
    { mistake: "Thinking choosing all or none is more than one way.", fix: "Choosing all n, or none, is exactly 1 way." },
  ],
  masteryPassMark: 0.8,
};

// ── 12D Counting in Probability (extending) ────────────────────────────────────────────
const countingInProbability: Partial<ExplicitLesson> = {
  description: "Use counting techniques to find probabilities as favourable outcomes over total outcomes.",
  learningIntention: "Combine counting with probability and choose arrangements vs selections correctly.",
  successCriteria: ["Write probability as favourable ÷ total outcomes.", "Count the total outcomes with arrangements or selections.", "Decide whether order matters for the sample space.", "Avoid double-counting."],
  teaching: {
    paragraphs: [
      "Counting and probability fit together: for equally likely outcomes, the probability of an event is FAVOURABLE outcomes ÷ TOTAL outcomes — and you count BOTH numbers with the counting principles.",
      "The first decision is the same as before: does ORDER MATTER in the sample space? Count the total with arrangements if it does, selections if it doesn't — and count the favourable outcomes the SAME way so they're consistent.",
      "For example, choosing 2 people from 5 has C(5, 2) = 10 equally likely selections, so the probability of one particular pair is 1/10. Arranging 4 people in a row has 4! = 24 orders, so one particular order has probability 1/24.",
      "Watch for DOUBLE-COUNTING: counting the same outcome more than once makes the total too large and the probability wrong. Decide whether order matters first, count consistently, then interpret the answer in context.",
    ],
    latexBlocks: ["P(\\text{event}) = \\frac{\\text{favourable}}{\\text{total}}", "\\text{count total with arrangements or selections}", "\\text{consistency avoids double-counting}"],
  },
  workedExamples: [
    { title: "Probability via selections", questionLatex: "\\text{Choose 2 from 5. Probability of one particular pair?}", steps: [{ explanation: "Total selections = C(5,2) = 10.", latex: "P = \\tfrac{1}{10}" }], finalAnswerLatex: "1/10" },
    { title: "Probability via arrangements", questionLatex: "\\text{Arrange 4 people. Probability of one particular order?}", steps: [{ explanation: "Total orders = 4! = 24.", latex: "P = \\tfrac{1}{24}" }], finalAnswerLatex: "1/24" },
    { title: "Equally likely", questionLatex: "\\text{6 equally likely outcomes. Probability of one of them?}", steps: [{ explanation: "1 favourable of 6.", latex: "P = \\tfrac{1}{6}" }], finalAnswerLatex: "1/6" },
  ],
  guidedPractice: [
    mcq("y10-cip-g1", "Probability equals favourable divided by:", "A", ["total outcomes", "favourable outcomes", "the largest outcome", "the number of events"], 3, "P = favourable ÷ total."),
    ans("y10-cip-g2", "How many ways to choose 2 from 4 (total selections)?", "\\binom{4}{2}", "6", 3, "C(4,2) = 6.", []),
    ans("y10-cip-g3", "Of 6 equally likely outcomes, give the probability of one specific outcome.", "1/6", "1/6", 3, "1 favourable ÷ 6 total = 1/6.", ["1 / 6"]),
    mcq("y10-cip-g4", "Counting helps probability by:", "A", ["counting the outcomes", "removing randomness", "changing the event", "ignoring totals"], 3, "Counting gives the favourable and total outcome numbers."),
  ],
  independentPractice: [
    ans("y10-cip-i1", "Arrange 3 people in a row. How many total orders?", "3!", "6", 3, "3! = 6.", []),
    ans("y10-cip-i2", "Give the probability of one specific order of 3 people in a row.", "1/3!", "1/6", 4, "1 of 3! = 6 orders, so 1/6.", ["1 / 6"]),
    ans("y10-cip-i3", "How many ways to choose 2 from 5 (total selections)?", "\\binom{5}{2}", "10", 3, "C(5,2) = 10.", []),
    ans("y10-cip-i4", "Give the probability of one specific pair chosen from 5.", "1/\\binom{5}{2}", "1/10", 4, "1 of C(5,2) = 10, so 1/10.", ["1 / 10"]),
    mcq("y10-cip-i5", "Double-counting an outcome makes the count:", "A", ["too large", "too small", "exactly right", "negative"], 4, "Counting an outcome twice inflates the total."),
  ],
  masteryQuiz: [
    ans("y10-cip-m1", "How many ways to choose 2 from 6 (total selections)?", "\\binom{6}{2}", "15", 3, "C(6,2) = 15.", []),
    ans("y10-cip-m2", "Give the probability of one specific pair chosen from 6.", "1/\\binom{6}{2}", "1/15", 4, "1 of 15, so 1/15.", ["1 / 15"]),
    ans("y10-cip-m3", "Arrange 4 people in a row. How many total orders?", "4!", "24", 3, "4! = 24.", []),
    ans("y10-cip-m4", "Give the probability of one specific arrangement of 4 people.", "1/4!", "1/24", 4, "1 of 24, so 1/24.", ["1 / 24"]),
    mcq("y10-cip-m5", "When order matters in the sample space, count the total with:", "A", ["arrangements", "selections", "the mean", "the range"], 4, "Ordered sample spaces are counted with arrangements."),
    ans("y10-cip-m6", "How many ways to choose 3 from 5 (total selections)?", "\\binom{5}{3}", "10", 3, "C(5,3) = 10.", []),
    ans("y10-cip-m7", "Give the probability of one specific selection of 3 from 5.", "1/\\binom{5}{3}", "1/10", 4, "1 of 10, so 1/10.", ["1 / 10"]),
    mcq("y10-cip-m8", "When order does not matter, count the total with:", "B", ["arrangements", "selections", "factorials of the total", "addition"], 4, "Unordered sample spaces are counted with selections."),
    ans("y10-cip-m9", "Give the probability of one outcome from 8 equally likely outcomes.", "1/8", "1/8", 3, "1 of 8, so 1/8.", ["1 / 8"]),
    mcq("y10-cip-m10", "To avoid double-counting, decide first whether:", "A", ["order matters", "the numbers are even", "the total is prime", "the event is rare"], 5, "Deciding if order matters fixes how you count, preventing double-counting."),
  ],
  commonMistakes: [
    { mistake: "Counting favourable and total in different ways.", fix: "Count both with the same method (both ordered, or both unordered)." },
    { mistake: "Using arrangements when order is irrelevant (or vice versa).", fix: "Decide if order matters before counting the sample space." },
    { mistake: "Double-counting an outcome.", fix: "Make sure each outcome is counted exactly once." },
    { mistake: "Forgetting outcomes must be equally likely for favourable/total.", fix: "The favourable ÷ total rule needs equally likely outcomes." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "counting-factorial-notation": factorialNotation,
  "arrangements": arrangements,
  "selections": selections,
  "counting-in-probability": countingInProbability,
};

export function year10CountingWave9LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "counting-principles"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
