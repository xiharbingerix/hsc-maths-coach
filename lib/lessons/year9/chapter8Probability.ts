// Year 9 Wave 9 — Chapter 8 (Probability & Single-Variable Data), probability sections (ADR-Y9-001):
// review-of-probability (consol), venn-diagrams-two-way-tables (path), using-set-notation (path),
// arrays-two-step-experiments (core). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Count favourable outcomes over total, or read the diagram/table.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the probability/set idea.", explanation };
}
const fr = (n: number, d: number) => { const g = (a: number, b: number): number => (b ? g(b, a % b) : a); const k = g(n, d); const sn = n / k, sd = d / k; return [`${sn}/${sd}`, `${sn} / ${sd}`, `${n}/${d}`, (sn / sd).toString()]; };

// ── review-of-probability (consolidating) ─────────────────────────────────────────────
const reviewProbability: Partial<ExplicitLesson> = {
  description: "Find simple probabilities as favourable ÷ total, and use the complement.",
  learningIntention: "Calculate basic probabilities and complements.",
  successCriteria: ["Use P = favourable ÷ total.", "Know 0 ≤ P ≤ 1.", "Find the complement P(not A) = 1 − P(A).", "Simplify probability fractions."],
  teaching: {
    paragraphs: [
      "The PROBABILITY of an event is the number of FAVOURABLE outcomes ÷ the TOTAL number of equally likely outcomes. P(head) on a coin = 1/2; P(rolling a 3) on a die = 1/6.",
      "Every probability is between 0 (impossible) and 1 (certain), and all the probabilities of a sample space add to 1.",
      "The COMPLEMENT 'not A' has probability P(not A) = 1 − P(A). So P(not 3) on a die = 1 − 1/6 = 5/6.",
      "Always SIMPLIFY the fraction: 5/20 = 1/4.",
    ],
    latexBlocks: ["P = \\tfrac{\\text{favourable}}{\\text{total}}", "P(\\text{not }A) = 1 - P(A)"],
  },
  workedExamples: [
    { title: "Coin", questionLatex: "P(\\text{head})?", steps: [{ explanation: "1 of 2.", latex: "\\tfrac12" }], finalAnswerLatex: "\\tfrac12" },
    { title: "Die", questionLatex: "P(\\text{rolling a 3})?", steps: [{ explanation: "1 of 6.", latex: "\\tfrac16" }], finalAnswerLatex: "\\tfrac16" },
    { title: "Complement", questionLatex: "P(\\text{not 3}) \\text{ on a die}?", steps: [{ explanation: "1 − 1/6.", latex: "\\tfrac56" }], finalAnswerLatex: "\\tfrac56" },
  ],
  guidedPractice: [
    ans("y9-rp-g1", "A bag has 3 red of 7 marbles. Find P(red).", "3/7", "3/7", 2, "3 ÷ 7.", fr(3, 7)),
    ans("y9-rp-g2", "Find P(even number) on a die.", "P(even)", "1/2", 2, "3/6 = 1/2.", fr(1, 2)),
    ans("y9-rp-g3", "Find the probability of a certain event.", "P(certain)", "1", 2, "Certain → 1.", []),
    mcq("y9-rp-g4", "A probability is always between:", "C", ["−1 and 1", "0 and 100", "0 and 1", "1 and 10"], 2, "0 ≤ P ≤ 1."),
  ],
  independentPractice: [
    ans("y9-rp-i1", "A bag has 4 blue of 10. Find P(blue).", "4/10", "2/5", 2, "4/10 = 2/5.", fr(2, 5)),
    ans("y9-rp-i2", "Find P(odd number) on a die.", "P(odd)", "1/2", 2, "3/6 = 1/2.", fr(1, 2)),
    ans("y9-rp-i3", "Find the probability of an impossible event.", "P(impossible)", "0", 2, "0.", []),
    ans("y9-rp-i4", "If P(red) = 1/4, find P(not red).", "1-1/4", "3/4", 3, "1 − 1/4 = 3/4.", fr(3, 4)),
    mcq("y9-rp-i5", "The probabilities of all outcomes add to:", "B", ["0", "1", "100", "the number of outcomes"], 2, "They sum to 1."),
  ],
  masteryQuiz: [
    ans("y9-rp-m1", "Find P(tail) on a coin.", "P(tail)", "1/2", 2, "1/2.", fr(1, 2)),
    ans("y9-rp-m2", "Find P(rolling a 5) on a die.", "P(5)", "1/6", 2, "1/6.", fr(1, 6)),
    ans("y9-rp-m3", "A bag has 5 red of 20. Find P(red).", "5/20", "1/4", 2, "5/20 = 1/4.", fr(1, 4)),
    ans("y9-rp-m4", "If P(A) = 0.3, find P(not A).", "1-0.3", "0.7", 2, "1 − 0.3 = 0.7.", []),
    mcq("y9-rp-m5", "The sum of all probabilities in a sample space is:", "A", ["1", "0", "0.5", "the total outcomes"], 2, "1."),
    ans("y9-rp-m6", "Pick a letter from A, B, C, D, E. Find P(a vowel).", "P(vowel)", "2/5", 3, "A, E → 2/5.", fr(2, 5)),
    ans("y9-rp-m7", "Find P(rolling more than 4) on a die.", "P(>4)", "1/3", 3, "5, 6 → 2/6 = 1/3.", fr(1, 3)),
    ans("y9-rp-m8", "Find P(not 6) on a die.", "P(not 6)", "5/6", 2, "1 − 1/6 = 5/6.", fr(5, 6)),
    ans("y9-rp-m9", "A bag has 6 green of 24. Find P(green).", "6/24", "1/4", 2, "6/24 = 1/4.", fr(1, 4)),
    mcq("y9-rp-m10", "An event certain to happen has probability:", "C", ["0", "0.5", "1", "2"], 2, "1."),
  ],
  masteryQuizPool: [
    ans("y9-rp-p1", "A bag has 3 red, 2 blue and 5 green (10 total). Find P(red or blue).", "P(red or blue)", "1/2", 5, "5/10 = 1/2.", fr(1, 2)),
    ans("y9-rp-p2", "Find P(not an even number) on a die.", "P(not even)", "1/2", 5, "Odd: 3/6 = 1/2.", fr(1, 2)),
    ans("y9-rp-p3", "A bag has 12 marbles, 4 red. Find P(not red).", "P(not red)", "2/3", 5, "8/12 = 2/3.", fr(2, 3)),
    ans("y9-rp-p4", "A die: find P(a prime number).", "P(prime)", "1/2", 5, "2, 3, 5 → 3/6 = 1/2.", fr(1, 2)),
    ans("y9-rp-p5", "Cards 1–10: find P(a multiple of 3).", "P(mult 3)", "3/10", 5, "3, 6, 9 → 3/10.", fr(3, 10)),
    ans("y9-rp-p6", "If P(win) = 0.35, find P(not win).", "1-0.35", "0.65", 5, "1 − 0.35 = 0.65.", []),
    ans("y9-rp-p7", "A spinner has 8 equal sectors, 3 red. Find P(not red).", "P(not red)", "5/8", 5, "5/8.", fr(5, 8)),
    ans("y9-rp-p8", "Letters of 'BANANA': find P(an A).", "P(A)", "1/2", 5, "3 A's of 6 → 1/2.", fr(1, 2)),
    ans("y9-rp-p9", "A die: find P(at most 2).", "P(<=2)", "1/3", 5, "1, 2 → 2/6 = 1/3.", fr(1, 3)),
    ans("y9-rp-p10", "30 students: 18 like maths. Find P(does not like maths).", "P(not)", "2/5", 5, "12/30 = 2/5.", fr(2, 5)),
  ],
  commonMistakes: [
    { mistake: "Giving favourable ÷ favourable, not ÷ total.", fix: "Divide by the TOTAL outcomes." },
    { mistake: "Forgetting to simplify.", fix: "Reduce the fraction (5/20 = 1/4)." },
    { mistake: "Adding when finding the complement.", fix: "P(not A) = 1 − P(A)." },
    { mistake: "Giving a probability above 1.", fix: "Probabilities stay between 0 and 1." },
  ],
  masteryPassMark: 0.8,
};

// ── venn-diagrams-two-way-tables (path) ────────────────────────────────────────────────
const vennTwoWay: Partial<ExplicitLesson> = {
  description: "Use Venn diagrams and two-way tables to find counts and probabilities.",
  learningIntention: "Read and compute from Venn diagrams and two-way tables.",
  successCriteria: ["Find 'A only' from a Venn diagram.", "Find the union count.", "Find 'neither'.", "Find a probability from the counts."],
  teaching: {
    paragraphs: [
      "A VENN DIAGRAM shows overlapping groups. If 12 students play soccer, 8 play tennis and 5 play BOTH, then 'soccer only' = 12 − 5 = 7.",
      "The UNION (either/both) = 12 + 8 − 5 = 15 (subtract the overlap so it isn't double-counted).",
      "If there are 20 students total, NEITHER = 20 − 15 = 5.",
      "A PROBABILITY is then the count ÷ total: P(both) = 5/20 = 1/4.",
    ],
    latexBlocks: ["n(A \\cup B) = n(A) + n(B) - n(A \\cap B)", "P = \\tfrac{\\text{count}}{\\text{total}}"],
  },
  workedExamples: [
    { title: "A only", questionLatex: "\\text{Soccer 12, both 5. Soccer only?}", steps: [{ explanation: "12 − 5.", latex: "7" }], finalAnswerLatex: "7" },
    { title: "Union", questionLatex: "\\text{12, 8, both 5. Union?}", steps: [{ explanation: "12 + 8 − 5.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Neither", questionLatex: "\\text{Total 20, union 15. Neither?}", steps: [{ explanation: "20 − 15.", latex: "5" }], finalAnswerLatex: "5" },
  ],
  guidedPractice: [
    ans("y9-vt-g1", "12 play soccer, 5 play both. How many play soccer only?", "12-5", "7", 2, "12 − 5 = 7.", []),
    ans("y9-vt-g2", "12 soccer, 8 tennis, 5 both. How many play at least one?", "12+8-5", "15", 3, "12 + 8 − 5 = 15.", []),
    ans("y9-vt-g3", "20 students, 15 play at least one sport. How many play neither?", "20-15", "5", 2, "20 − 15 = 5.", []),
    mcq("y9-vt-g4", "The overlap of a Venn diagram represents:", "C", ["only A", "only B", "both A and B", "neither"], 2, "The intersection (both)."),
  ],
  independentPractice: [
    ans("y9-vt-i1", "10 like apples, 4 like both apples and oranges. How many like apples only?", "10-4", "6", 2, "10 − 4 = 6.", []),
    ans("y9-vt-i2", "15 like apples, 12 like oranges, 7 both. How many like at least one?", "15+12-7", "20", 3, "15 + 12 − 7 = 20.", []),
    ans("y9-vt-i3", "25 people, 20 like at least one fruit. How many like neither?", "25-20", "5", 2, "25 − 20 = 5.", []),
    ans("y9-vt-i4", "From 20 people, 5 are in both groups. Find P(in both).", "5/20", "1/4", 3, "5/20 = 1/4.", fr(1, 4)),
    mcq("y9-vt-i5", "A two-way table organises data by:", "B", ["one variable", "two variables", "time only", "colour only"], 2, "Two categories at once."),
  ],
  masteryQuiz: [
    ans("y9-vt-m1", "14 play chess, 6 play both chess and go. How many play chess only?", "14-6", "8", 2, "14 − 6 = 8.", []),
    ans("y9-vt-m2", "14 chess, 10 go, 6 both. How many play at least one?", "14+10-6", "18", 3, "14 + 10 − 6 = 18.", []),
    ans("y9-vt-m3", "25 students, 18 play at least one game. How many play neither?", "25-18", "7", 2, "7.", []),
    ans("y9-vt-m4", "From 30 people, 6 are in both sets. Find P(in both).", "6/30", "1/5", 3, "6/30 = 1/5.", fr(1, 5)),
    mcq("y9-vt-m5", "n(A ∪ B) equals:", "A", ["n(A) + n(B) − n(A ∩ B)", "n(A) + n(B)", "n(A) − n(B)", "n(A) × n(B)"], 3, "Add and subtract the overlap."),
    ans("y9-vt-m6", "20 like tea, 8 like both tea and coffee. How many like tea only?", "20-8", "12", 2, "12.", []),
    ans("y9-vt-m7", "9 like maths, 7 like science, 4 both. How many like at least one?", "9+7-4", "12", 3, "12.", []),
    ans("y9-vt-m8", "40 people, 28 like at least one subject. How many like neither?", "40-28", "12", 2, "12.", []),
    ans("y9-vt-m9", "From 50 people, 10 are in both sets. Find P(in both).", "10/50", "1/5", 3, "1/5.", fr(1, 5)),
    mcq("y9-vt-m10", "In a Venn diagram, 'neither' is shown:", "D", ["in the overlap", "in circle A only", "in circle B only", "outside both circles"], 2, "Outside both circles."),
  ],
  masteryQuizPool: [
    ans("y9-vt-p1", "30 students: 18 study French, 12 study German, 5 both. How many study neither?", "30-(18+12-5)", "5", 5, "Union 25; 30 − 25 = 5.", []),
    ans("y9-vt-p2", "A two-way table: 12 boys, 8 of them play sport; 10 girls, 6 play sport. How many play sport?", "8+6", "14", 5, "8 + 6 = 14.", []),
    ans("y9-vt-p3", "40 people: 25 own a cat, 18 own a dog, 10 own both. How many own only a cat?", "25-10", "15", 5, "25 − 10 = 15.", []),
    ans("y9-vt-p4", "From the previous, how many own at least one pet?", "25+18-10", "33", 5, "25 + 18 − 10 = 33.", []),
    ans("y9-vt-p5", "50 students: 30 play soccer, 20 play tennis, 8 both. Find P(plays soccer only).", "(30-8)/50", "11/25", 5, "22/50 = 11/25.", fr(22, 50)),
    ans("y9-vt-p6", "24 people: 14 like tea, 10 like coffee, 6 both. How many like neither?", "24-(14+10-6)", "6", 5, "Union 18; 24 − 18 = 6.", []),
    ans("y9-vt-p7", "A two-way table totals 60; row totals 35 and 25; one cell is 20. Find the cell in the same row (35 − 20).", "35-20", "15", 5, "35 − 20 = 15.", []),
    ans("y9-vt-p8", "100 people: 60 read books, 45 watch films, 30 both. How many do at least one?", "60+45-30", "75", 5, "75.", []),
    ans("y9-vt-p9", "From the previous (100 total), how many do neither?", "100-75", "25", 5, "100 − 75 = 25.", []),
    ans("y9-vt-p10", "20 students, 5 in both clubs, 8 in club A only, 4 in club B only. How many in neither?", "20-(8+4+5)", "3", 5, "20 − 17 = 3.", []),
  ],
  commonMistakes: [
    { mistake: "Double-counting the overlap in the union.", fix: "Subtract n(A ∩ B) once." },
    { mistake: "Reading 'A only' as the whole circle.", fix: "Subtract the overlap to get A only." },
    { mistake: "Forgetting 'neither' (outside the circles).", fix: "Total − union = neither." },
    { mistake: "Using counts as probabilities.", fix: "Divide the count by the total." },
  ],
  masteryPassMark: 0.8,
};

// ── using-set-notation (path) ──────────────────────────────────────────────────────────
const usingSetNotation: Partial<ExplicitLesson> = {
  description: "Use set notation: union (∪), intersection (∩), complement and number of elements n(A).",
  learningIntention: "Read and apply basic set notation.",
  successCriteria: ["Find an intersection.", "Find a union.", "Count elements n(A).", "Find a complement within a universal set."],
  teaching: {
    paragraphs: [
      "A SET is a collection of elements, e.g. A = {1, 2, 3}. The INTERSECTION A ∩ B is the elements in BOTH sets; for A = {1,2,3}, B = {2,3,4}, A ∩ B = {2, 3}.",
      "The UNION A ∪ B is the elements in EITHER set (no repeats): A ∪ B = {1, 2, 3, 4}.",
      "n(A) is the NUMBER of elements in A; n({1,2,3}) = 3.",
      "The COMPLEMENT of A (within a universal set U) is everything in U not in A.",
    ],
    latexBlocks: ["A \\cap B = \\text{in both}", "A \\cup B = \\text{in either}", "n(A) = \\text{number of elements}"],
  },
  workedExamples: [
    { title: "Intersection", questionLatex: "A=\\{1,2,3\\}, B=\\{2,3,4\\}. \\ A\\cap B?", steps: [{ explanation: "In both.", latex: "\\{2,3\\}" }], finalAnswerLatex: "\\{2,3\\}" },
    { title: "Union", questionLatex: "A\\cup B?", steps: [{ explanation: "In either.", latex: "\\{1,2,3,4\\}" }], finalAnswerLatex: "\\{1,2,3,4\\}" },
    { title: "Count", questionLatex: "n(\\{1,2,3\\})?", steps: [{ explanation: "Three elements.", latex: "3" }], finalAnswerLatex: "3" },
  ],
  guidedPractice: [
    ans("y9-set-g1", "A = {1,2,3}, B = {3,4}. How many elements in A ∩ B?", "A∩B", "1", 2, "Only 3 → 1 element.", []),
    ans("y9-set-g2", "A = {1,2,3}, B = {3,4}. How many elements in A ∪ B?", "A∪B", "4", 2, "{1,2,3,4} → 4.", []),
    ans("y9-set-g3", "Find n({2, 4, 6}).", "n", "3", 2, "3 elements.", []),
    mcq("y9-set-g4", "The symbol ∩ means:", "B", ["union", "intersection", "complement", "subset"], 2, "Intersection (both)."),
  ],
  independentPractice: [
    ans("y9-set-i1", "A = {1,2,3,4}, B = {3,4,5}. How many in A ∩ B?", "A∩B", "2", 2, "{3,4} → 2.", []),
    ans("y9-set-i2", "A = {1,2,3,4}, B = {3,4,5}. How many in A ∪ B?", "A∪B", "5", 3, "{1,2,3,4,5} → 5.", []),
    mcq("y9-set-i3", "The symbol ∪ means:", "A", ["union", "intersection", "empty set", "complement"], 2, "Union (either)."),
    ans("y9-set-i4", "U = {1,2,3,4,5}, A = {1,2}. How many in the complement of A?", "compl A", "3", 3, "{3,4,5} → 3.", []),
    mcq("y9-set-i5", "n(A) means:", "C", ["the union", "the intersection", "the number of elements in A", "the complement"], 2, "The count of A."),
  ],
  masteryQuiz: [
    ans("y9-set-m1", "A = {2,4,6}, B = {4,6,8}. How many in A ∩ B?", "A∩B", "2", 2, "{4,6} → 2.", []),
    ans("y9-set-m2", "A = {2,4,6}, B = {4,6,8}. How many in A ∪ B?", "A∪B", "4", 3, "{2,4,6,8} → 4.", []),
    ans("y9-set-m3", "Find n({1,3,5,7,9}).", "n", "5", 2, "5.", []),
    mcq("y9-set-m4", "A ∩ B is the set of elements:", "B", ["in either set", "in both sets", "in neither", "in A only"], 2, "In both."),
    ans("y9-set-m5", "U = {1..6}, A = {2,4,6}. How many in the complement of A?", "compl", "3", 3, "{1,3,5} → 3.", []),
    ans("y9-set-m6", "A = {1,2,3}, B = {4,5}. How many in A ∩ B?", "A∩B", "0", 3, "No common elements → 0.", []),
    ans("y9-set-m7", "A = {1,2,3}, B = {4,5}. How many in A ∪ B?", "A∪B", "5", 2, "{1,2,3,4,5} → 5.", []),
    mcq("y9-set-m8", "A ∪ B is the set of elements:", "A", ["in either set", "in both sets", "in neither", "in A only"], 2, "In either."),
    ans("y9-set-m9", "Find n({10, 20, 30, 40}).", "n", "4", 2, "4.", []),
    mcq("y9-set-m10", "The complement of A contains everything:", "C", ["in A", "in A ∩ B", "in U but not in A", "in A ∪ B"], 3, "In U but not in A."),
  ],
  masteryQuizPool: [
    ans("y9-set-p1", "A = {1,2,3,4,5}, B = {2,4,6,8}. How many in A ∩ B?", "A∩B", "2", 5, "{2,4} → 2.", []),
    ans("y9-set-p2", "A = {1,2,3,4,5}, B = {2,4,6,8}. How many in A ∪ B?", "A∪B", "7", 5, "{1,2,3,4,5,6,8} → 7.", []),
    ans("y9-set-p3", "U = {1..10}, A = {2,4,6,8,10}. How many in the complement of A?", "compl", "5", 5, "{1,3,5,7,9} → 5.", []),
    ans("y9-set-p4", "A = {even numbers 1–10}. Find n(A).", "n(even)", "5", 5, "2,4,6,8,10 → 5.", []),
    ans("y9-set-p5", "A = {1,2,3}, B = {2,3,4}, C = {3,4,5}. How many in A ∩ B ∩ C?", "A∩B∩C", "1", 5, "Only 3 → 1.", []),
    ans("y9-set-p6", "A = {multiples of 3 up to 20}. Find n(A).", "n(mult 3)", "6", 5, "3,6,9,12,15,18 → 6.", []),
    ans("y9-set-p7", "n(A) = 8, n(B) = 6, n(A ∩ B) = 3. Find n(A ∪ B).", "n(A∪B)", "11", 5, "8 + 6 − 3 = 11.", []),
    ans("y9-set-p8", "U has 20 elements; n(A) = 12. Find n(complement of A).", "compl", "8", 5, "20 − 12 = 8.", []),
    ans("y9-set-p9", "A = {1,2,3,4}, B = {5,6,7}. How many in A ∩ B?", "A∩B", "0", 5, "Disjoint → 0.", []),
    ans("y9-set-p10", "n(A ∪ B) = 15, n(A) = 9, n(B) = 10. Find n(A ∩ B).", "n(A∩B)", "4", 5, "9 + 10 − 15 = 4.", []),
  ],
  commonMistakes: [
    { mistake: "Swapping ∪ and ∩.", fix: "∪ = union (either); ∩ = intersection (both)." },
    { mistake: "Repeating shared elements in a union.", fix: "List each element once." },
    { mistake: "Including A in its complement.", fix: "The complement excludes A's elements." },
    { mistake: "Miscounting n(A).", fix: "Count distinct elements only." },
  ],
  masteryPassMark: 0.8,
};

// ── arrays-two-step-experiments (core) ─────────────────────────────────────────────────
const arraysTwoStep: Partial<ExplicitLesson> = {
  description: "Use arrays (grids) to list the sample space of two-step experiments and find probabilities.",
  learningIntention: "Build a sample space with an array and compute probabilities.",
  successCriteria: ["Count outcomes in a two-step sample space.", "Find a probability from the array.", "Handle dice and coin combinations.", "Use the grid for sums."],
  teaching: {
    paragraphs: [
      "A two-step experiment's SAMPLE SPACE can be listed in an ARRAY (grid). Rolling two dice gives 6 × 6 = 36 equally likely outcomes.",
      "Read probabilities off the grid: P(sum = 7) on two dice = 6/36 = 1/6 (there are 6 ways).",
      "A coin and a die give 2 × 6 = 12 outcomes; two coins give 2 × 2 = 4 (HH, HT, TH, TT).",
      "Count the favourable cells, then divide by the total cells.",
    ],
    latexBlocks: ["\\text{two dice} = 6\\times6 = 36", "P(\\text{sum }7) = \\tfrac{6}{36} = \\tfrac16"],
  },
  workedExamples: [
    { title: "Total outcomes", questionLatex: "\\text{Two dice: how many outcomes?}", steps: [{ explanation: "6 × 6.", latex: "36" }], finalAnswerLatex: "36" },
    { title: "Sum of 7", questionLatex: "P(\\text{sum }7) \\text{ on two dice?}", steps: [{ explanation: "6 of 36.", latex: "\\tfrac16" }], finalAnswerLatex: "\\tfrac16" },
    { title: "Coin and die", questionLatex: "\\text{Coin and die: outcomes?}", steps: [{ explanation: "2 × 6.", latex: "12" }], finalAnswerLatex: "12" },
  ],
  guidedPractice: [
    ans("y9-ar2-g1", "How many outcomes when two coins are tossed?", "2x2", "4", 2, "2 × 2 = 4.", []),
    ans("y9-ar2-g2", "Find P(two heads) with two coins.", "P(HH)", "1/4", 2, "1 of 4.", fr(1, 4)),
    ans("y9-ar2-g3", "How many outcomes for a die and a coin?", "6x2", "12", 2, "6 × 2 = 12.", []),
    mcq("y9-ar2-g4", "A sample space is:", "C", ["the favourable outcomes", "the probability", "all possible outcomes", "the average"], 2, "All possible outcomes."),
  ],
  independentPractice: [
    ans("y9-ar2-i1", "How many outcomes for two dice?", "6x6", "36", 2, "36.", []),
    ans("y9-ar2-i2", "Find P(a double) on two dice.", "P(double)", "1/6", 3, "6/36 = 1/6.", fr(1, 6)),
    ans("y9-ar2-i3", "Find P(sum 12) on two dice.", "P(12)", "1/36", 3, "Only (6,6) → 1/36.", fr(1, 36)),
    ans("y9-ar2-i4", "How many outcomes for a 4-sector spinner and a coin?", "4x2", "8", 2, "4 × 2 = 8.", []),
    mcq("y9-ar2-i5", "An array (grid) is useful for showing:", "A", ["two-step sample spaces", "a single average", "the median", "a complement"], 2, "Two-step sample spaces."),
  ],
  masteryQuiz: [
    ans("y9-ar2-m1", "How many outcomes for two dice?", "6x6", "36", 2, "36.", []),
    ans("y9-ar2-m2", "Find P(sum 7) on two dice.", "P(7)", "1/6", 3, "6/36 = 1/6.", fr(1, 6)),
    ans("y9-ar2-m3", "Find P(two heads) with two coins.", "P(HH)", "1/4", 2, "1/4.", fr(1, 4)),
    ans("y9-ar2-m4", "Find P(sum 2) on two dice.", "P(2)", "1/36", 3, "Only (1,1) → 1/36.", fr(1, 36)),
    mcq("y9-ar2-m5", "Two dice have how many equally likely outcomes?", "C", ["12", "24", "36", "6"], 2, "36."),
    ans("y9-ar2-m6", "How many outcomes for a die and a coin?", "6x2", "12", 2, "12.", []),
    ans("y9-ar2-m7", "Find P(sum greater than 10) on two dice.", "P(>10)", "1/12", 4, "(5,6),(6,5),(6,6) → 3/36 = 1/12.", fr(1, 12)),
    ans("y9-ar2-m8", "Find P(at least one head) with two coins.", "P(>=1 head)", "3/4", 3, "3 of 4 → 3/4.", fr(3, 4)),
    ans("y9-ar2-m9", "Find P(sum 8) on two dice.", "P(8)", "5/36", 4, "5 ways → 5/36.", fr(5, 36)),
    mcq("y9-ar2-m10", "To find a probability from an array you:", "B", ["multiply all cells", "count favourable cells ÷ total cells", "add the rows", "use the median"], 2, "Favourable ÷ total."),
  ],
  masteryQuizPool: [
    ans("y9-ar2-p1", "Find P(sum is even) on two dice.", "P(even sum)", "1/2", 5, "18 of 36 → 1/2.", fr(1, 2)),
    ans("y9-ar2-p2", "Find P(sum 5) on two dice.", "P(5)", "1/9", 5, "4 ways → 4/36 = 1/9.", fr(1, 9)),
    ans("y9-ar2-p3", "Find P(product 12) on two dice.", "P(prod 12)", "1/9", 5, "(2,6),(6,2),(3,4),(4,3) → 4/36 = 1/9.", fr(1, 9)),
    ans("y9-ar2-p4", "Three coins: how many outcomes?", "2^3", "8", 5, "2 × 2 × 2 = 8.", []),
    ans("y9-ar2-p5", "Find P(exactly two heads) with three coins.", "P(2H)", "3/8", 5, "HHT, HTH, THH → 3/8.", fr(3, 8)),
    ans("y9-ar2-p6", "Find P(both numbers the same) on two 4-sided dice.", "P(same)", "1/4", 5, "4 of 16 → 1/4.", fr(1, 4)),
    ans("y9-ar2-p7", "Find P(sum at most 4) on two dice.", "P(<=4)", "1/6", 5, "(1,1),(1,2),(2,1),(1,3),(3,1),(2,2) = 6/36 = 1/6.", fr(1, 6)),
    ans("y9-ar2-p8", "Find P(a 6 on at least one of two dice).", "P(at least one 6)", "11/36", 5, "11 of 36.", fr(11, 36)),
    ans("y9-ar2-p9", "Find P(sum 9) on two dice.", "P(9)", "1/9", 5, "4 ways → 4/36 = 1/9.", fr(1, 9)),
    ans("y9-ar2-p10", "Spinner (1–3) and a die: how many outcomes?", "3x6", "18", 5, "3 × 6 = 18.", []),
  ],
  commonMistakes: [
    { mistake: "Miscounting the total outcomes.", fix: "Multiply the options at each step." },
    { mistake: "Counting a sum once when it has several ways.", fix: "Count every cell that gives that result." },
    { mistake: "Treating outcomes as not equally likely.", fix: "Each grid cell is equally likely here." },
    { mistake: "Forgetting order (e.g. HT vs TH).", fix: "List ordered outcomes in the array." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "review-of-probability": reviewProbability,
  "venn-diagrams-two-way-tables": vennTwoWay,
  "using-set-notation": usingSetNotation,
  "arrays-two-step-experiments": arraysTwoStep,
};

export function year9Chapter8ProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
