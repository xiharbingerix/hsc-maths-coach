// Year 9 Wave 9 — Chapter 8, probability sections (ADR-Y9-001): tree-diagrams (core),
// relative-frequencies (core), data-and-sampling (path). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Multiply along branches; experimental probability is frequency ÷ total.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the rule.", explanation };
}
const fr = (n: number, d: number) => { const g = (a: number, b: number): number => (b ? g(b, a % b) : a); const k = g(n, d); return [`${n / k}/${d / k}`, `${n / k} / ${d / k}`, `${n}/${d}`, (n / d).toString()]; };

// ── tree-diagrams (core) ───────────────────────────────────────────────────────────────
const treeDiagrams: Partial<ExplicitLesson> = {
  description: "Use tree diagrams for multi-step experiments, multiplying probabilities along branches.",
  learningIntention: "Find multi-step probabilities by multiplying along branches.",
  successCriteria: ["Multiply probabilities along a path.", "Find P of a two-step result.", "Handle independent events.", "Combine paths by adding."],
  teaching: {
    paragraphs: [
      "A TREE DIAGRAM shows the stages of a multi-step experiment. To find the probability of a particular PATH, MULTIPLY the probabilities ALONG the branches.",
      "For two coins, P(HH) = 1/2 × 1/2 = 1/4. P(H then T) = 1/2 × 1/2 = 1/4.",
      "For independent events, the branch probabilities don't change: P(both spinners land on A) with P = 1/3 each is 1/3 × 1/3 = 1/9.",
      "To combine several paths (an 'or'), ADD their probabilities.",
    ],
    latexBlocks: ["P(\\text{path}) = \\text{multiply along branches}", "P(HH) = \\tfrac12\\times\\tfrac12 = \\tfrac14"],
  },
  workedExamples: [
    { title: "Two heads", questionLatex: "P(HH) \\text{ with two coins?}", steps: [{ explanation: "1/2 × 1/2.", latex: "\\tfrac14" }], finalAnswerLatex: "\\tfrac14" },
    { title: "Head then tail", questionLatex: "P(HT)?", steps: [{ explanation: "1/2 × 1/2.", latex: "\\tfrac14" }], finalAnswerLatex: "\\tfrac14" },
    { title: "Both spinners A", questionLatex: "P(AA), \\ P=\\tfrac13 \\text{ each}?", steps: [{ explanation: "1/3 × 1/3.", latex: "\\tfrac19" }], finalAnswerLatex: "\\tfrac19" },
  ],
  guidedPractice: [
    ans("y9-td-g1", "Two coins: find P(both heads).", "P(HH)", "1/4", 2, "1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-td-g2", "Two coins: find P(tail then head).", "P(TH)", "1/4", 2, "1/4.", fr(1, 4)),
    ans("y9-td-g3", "Two spinners, P(A) = 1/3 each. Find P(both A).", "P(AA)", "1/9", 3, "1/3 × 1/3 = 1/9.", fr(1, 9)),
    mcq("y9-td-g4", "Along the branches of a tree diagram you:", "B", ["add", "multiply", "subtract", "divide"], 2, "Multiply along a path."),
  ],
  independentPractice: [
    ans("y9-td-i1", "Three coins: find P(three heads).", "P(HHH)", "1/8", 3, "(1/2)³ = 1/8.", fr(1, 8)),
    ans("y9-td-i2", "A bag with P(red) = 1/2, drawn twice with replacement. Find P(red, red).", "P(RR)", "1/4", 3, "1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-td-i3", "Coin then die: find P(head then 6).", "P(H,6)", "1/12", 3, "1/2 × 1/6 = 1/12.", fr(1, 12)),
    mcq("y9-td-i4", "Tree diagrams are best for:", "A", ["multi-step experiments", "single events", "averages", "ranges"], 2, "Multi-step experiments."),
    ans("y9-td-i5", "Two players win independently with P = 0.5 and 0.4. Find P(both win).", "", "0.2", 3, "0.5 × 0.4 = 0.2.", []),
  ],
  masteryQuiz: [
    ans("y9-td-m1", "Two coins: find P(both heads).", "P(HH)", "1/4", 2, "1/4.", fr(1, 4)),
    ans("y9-td-m2", "Three coins: find P(three heads).", "P(HHH)", "1/8", 3, "1/8.", fr(1, 8)),
    ans("y9-td-m3", "P(red) = 1/2 then P(blue) = 1/3. Find P(red then blue).", "", "1/6", 3, "1/2 × 1/3 = 1/6.", fr(1, 6)),
    mcq("y9-td-m4", "To find the probability of a single path, you:", "B", ["add the branches", "multiply the branches", "take the largest", "subtract"], 2, "Multiply."),
    ans("y9-td-m5", "Two dice: find P(both sixes).", "P(66)", "1/36", 3, "1/6 × 1/6 = 1/36.", fr(1, 36)),
    ans("y9-td-m6", "A team wins each game with P = 0.3. Find P(win twice in a row).", "", "0.09", 3, "0.3 × 0.3 = 0.09.", []),
    ans("y9-td-m7", "Two coins: find P(head then tail).", "P(HT)", "1/4", 2, "1/4.", fr(1, 4)),
    ans("y9-td-m8", "Three coins: find P(three tails).", "P(TTT)", "1/8", 3, "1/8.", fr(1, 8)),
    ans("y9-td-m9", "Independent events P = 0.5 and 0.6. Find P(both occur).", "", "0.3", 3, "0.5 × 0.6 = 0.3.", []),
    mcq("y9-td-m10", "To combine two separate paths ('or') you:", "A", ["add their probabilities", "multiply them", "subtract", "ignore one"], 3, "Add the path probabilities."),
  ],
  masteryQuizPool: [
    ans("y9-td-p1", "Two coins: find P(at least one head) using the complement.", "", "3/4", 5, "1 − 1/4 = 3/4.", fr(3, 4)),
    ans("y9-td-p2", "A bag: P(red) = 2/5 each draw (with replacement), drawn twice. Find P(red, red).", "", "4/25", 5, "2/5 × 2/5 = 4/25.", fr(4, 25)),
    ans("y9-td-p3", "Three coins: find P(exactly two heads).", "P(2H)", "3/8", 5, "HHT, HTH, THH → 3/8.", fr(3, 8)),
    ans("y9-td-p4", "Spinner P(win) = 0.2 twice. Find P(win both).", "", "0.04", 5, "0.2 × 0.2 = 0.04.", []),
    ans("y9-td-p5", "P(rain) = 0.3 each day. Find P(rain on both of two days).", "", "0.09", 5, "0.09.", []),
    ans("y9-td-p6", "Two dice: find P(neither is a six).", "", "25/36", 5, "5/6 × 5/6 = 25/36.", fr(25, 36)),
    ans("y9-td-p7", "Bag without replacement: 2 red of 5, draw 2. Find P(both red).", "", "1/10", 5, "2/5 × 1/4 = 2/20 = 1/10.", fr(1, 10)),
    ans("y9-td-p8", "P(pass) = 0.9 for two independent tests. Find P(pass both).", "", "0.81", 5, "0.81.", []),
    ans("y9-td-p9", "Two coins: find P(at least one tail).", "", "3/4", 5, "1 − 1/4 = 3/4.", fr(3, 4)),
    ans("y9-td-p10", "A light works with P = 0.95 each; two independent. Find P(both work).", "", "0.9025", 5, "0.95 × 0.95 = 0.9025.", []),
  ],
  commonMistakes: [
    { mistake: "Adding probabilities along a single path.", fix: "Multiply along a path; add only across separate paths." },
    { mistake: "Reusing the same denominator without replacement.", fix: "After a draw without replacement, totals shrink." },
    { mistake: "Forgetting some paths in an 'or'.", fix: "Include every favourable path." },
    { mistake: "Computing 'at least one' directly when complement is easier.", fix: "Use 1 − P(none)." },
  ],
  masteryPassMark: 0.8,
};

// ── relative-frequencies (core) ────────────────────────────────────────────────────────
const relativeFrequencies: Partial<ExplicitLesson> = {
  description: "Estimate probabilities from experimental data using relative frequency, and find expected numbers.",
  learningIntention: "Use relative frequency to estimate probability and expected counts.",
  successCriteria: ["Find a relative frequency (freq ÷ total).", "Use it as an estimated probability.", "Find an expected number = P × n.", "Compare with theoretical probability."],
  teaching: {
    paragraphs: [
      "RELATIVE FREQUENCY (experimental probability) = frequency ÷ total trials. If a coin lands heads 30 times in 50 tosses, the relative frequency is 30/50 = 0.6.",
      "The more trials, the closer the relative frequency tends to the THEORETICAL probability.",
      "The EXPECTED number of times an event occurs = probability × number of trials. With P = 0.5 over 100 tosses, expect 50 heads.",
      "Use relative frequency to estimate probabilities when the theoretical value is unknown.",
    ],
    latexBlocks: ["\\text{rel. freq.} = \\tfrac{\\text{frequency}}{\\text{total}}", "\\text{expected} = P \\times n"],
  },
  workedExamples: [
    { title: "Relative frequency", questionLatex: "\\text{30 heads in 50. Rel. freq.?}", steps: [{ explanation: "30 ÷ 50.", latex: "0.6" }], finalAnswerLatex: "0.6" },
    { title: "Expected", questionLatex: "\\text{Expected heads in 100, } P=0.5?", steps: [{ explanation: "0.5 × 100.", latex: "50" }], finalAnswerLatex: "50" },
    { title: "Estimate", questionLatex: "\\text{15 sixes in 60. Estimate } P?", steps: [{ explanation: "15 ÷ 60.", latex: "0.25" }], finalAnswerLatex: "0.25" },
  ],
  guidedPractice: [
    ans("y9-rf-g1", "20 heads in 50 tosses. Find the relative frequency.", "", "0.4", 2, "20 ÷ 50 = 0.4.", ["2/5"]),
    ans("y9-rf-g2", "Expected sixes in 60 rolls, P = 1/6.", "", "10", 2, "60 ÷ 6 = 10.", []),
    ans("y9-rf-g3", "15 reds in 60 draws. Find the relative frequency.", "", "0.25", 2, "15 ÷ 60 = 0.25.", ["1/4"]),
    mcq("y9-rf-g4", "Experimental probability equals:", "A", ["frequency ÷ total", "total ÷ frequency", "frequency × total", "1 − frequency"], 2, "Frequency ÷ total."),
  ],
  independentPractice: [
    ans("y9-rf-i1", "45 heads in 90 tosses. Find the relative frequency.", "", "0.5", 2, "0.5.", ["1/2"]),
    ans("y9-rf-i2", "Expected heads in 200 tosses, P = 0.5.", "", "100", 2, "100.", []),
    ans("y9-rf-i3", "12 sixes in 40 rolls. Find the relative frequency.", "", "0.3", 2, "0.3.", ["3/10"]),
    ans("y9-rf-i4", "Expected number of 1/6 events in 120 trials.", "", "20", 3, "120 ÷ 6 = 20.", []),
    mcq("y9-rf-i5", "More trials make the relative frequency:", "C", ["drift away from", "stay random vs", "get closer to", "equal to 1 vs"], 3, "Closer to the theoretical probability."),
  ],
  masteryQuiz: [
    ans("y9-rf-m1", "30 heads in 50 tosses. Find the relative frequency.", "", "0.6", 2, "0.6.", ["3/5"]),
    ans("y9-rf-m2", "Expected sixes in 60 rolls, P = 1/6.", "", "10", 2, "10.", []),
    ans("y9-rf-m3", "18 reds in 60 draws. Find the relative frequency.", "", "0.3", 2, "0.3.", ["3/10"]),
    ans("y9-rf-m4", "Expected heads in 80 tosses, P = 0.5.", "", "40", 2, "40.", []),
    mcq("y9-rf-m5", "Relative frequency is also called:", "B", ["theoretical probability", "experimental probability", "the mean", "the range"], 2, "Experimental probability."),
    ans("y9-rf-m6", "25 wins in 100 games. Find the relative frequency.", "", "0.25", 2, "0.25.", ["1/4"]),
    ans("y9-rf-m7", "Expected number of 1/4 events in 200 trials.", "", "50", 2, "50.", []),
    ans("y9-rf-m8", "40 heads in 50 tosses. Find the relative frequency.", "", "0.8", 2, "0.8.", ["4/5"]),
    ans("y9-rf-m9", "Expected number of 0.3 events in 150 trials.", "", "45", 3, "45.", []),
    mcq("y9-rf-m10", "The expected number of occurrences is:", "A", ["probability × trials", "trials ÷ probability", "frequency − trials", "probability + trials"], 2, "P × n."),
  ],
  masteryQuizPool: [
    ans("y9-rf-p1", "A die rolled 300 times; expected number of 4s (P = 1/6).", "", "50", 5, "300 ÷ 6 = 50.", []),
    ans("y9-rf-p2", "A spinner landed on red 36 of 120 spins. Estimate P(red).", "", "0.3", 5, "36 ÷ 120 = 0.3.", ["3/10"]),
    ans("y9-rf-p3", "Expected number of heads in 500 tosses (P = 0.5).", "", "250", 5, "250.", []),
    ans("y9-rf-p4", "A factory: 6 faulty in 200. Estimate P(faulty), then expected faulty in 1000.", "expected", "30", 5, "P = 0.03; 0.03 × 1000 = 30.", []),
    ans("y9-rf-p5", "A coin gave 280 heads in 400. Estimate P(head).", "", "0.7", 5, "280 ÷ 400 = 0.7.", ["7/10"]),
    ans("y9-rf-p6", "Expected number of 1/5 events in 250 trials.", "", "50", 5, "50.", []),
    ans("y9-rf-p7", "A survey: 45 of 150 prefer tea. Estimate P(tea).", "", "0.3", 5, "0.3.", ["3/10"]),
    ans("y9-rf-p8", "Expected number of sixes in 240 rolls (P = 1/6).", "", "40", 5, "40.", []),
    ans("y9-rf-p9", "A drawing pin landed point-up 120 of 200 times. Estimate P(point-up).", "", "0.6", 5, "0.6.", ["3/5"]),
    ans("y9-rf-p10", "If P(win) ≈ 0.15, how many wins are expected in 400 games?", "", "60", 5, "0.15 × 400 = 60.", []),
  ],
  commonMistakes: [
    { mistake: "Dividing total by frequency.", fix: "Relative frequency = frequency ÷ total." },
    { mistake: "Confusing experimental with theoretical probability.", fix: "Experimental comes from data; theoretical from the model." },
    { mistake: "Forgetting to multiply by n for expected number.", fix: "Expected = P × n." },
    { mistake: "Expecting an exact match to theory.", fix: "Experimental values only approach theory with many trials." },
  ],
  masteryPassMark: 0.8,
};

// ── data-and-sampling (path) ───────────────────────────────────────────────────────────
const dataAndSampling: Partial<ExplicitLesson> = {
  description: "Distinguish population and sample, recognise sampling methods and sources of bias.",
  learningIntention: "Understand sampling and choose appropriate, unbiased samples.",
  successCriteria: ["Distinguish population and sample.", "Know a census surveys the whole population.", "Recognise that random sampling reduces bias.", "Compute simple sample sizes."],
  teaching: {
    paragraphs: [
      "A POPULATION is the WHOLE group of interest; a SAMPLE is a PART of it chosen to study. Surveying the whole population is a CENSUS.",
      "A good sample is REPRESENTATIVE. RANDOM sampling (everyone equally likely to be chosen) helps reduce BIAS.",
      "BIAS occurs when the sample doesn't fairly represent the population — e.g. only surveying friends.",
      "Sample sizes can be computed: a 1-in-10 sample of 500 people is 50.",
    ],
    latexBlocks: ["\\text{sample} \\subset \\text{population}", "\\text{census} = \\text{whole population}"],
  },
  workedExamples: [
    { title: "Population", questionLatex: "\\text{What is a population?}", steps: [{ explanation: "The whole group.", latex: "\\text{whole group}" }], finalAnswerLatex: "\\text{whole group}" },
    { title: "Census", questionLatex: "\\text{A census surveys...}", steps: [{ explanation: "Everyone.", latex: "\\text{whole population}" }], finalAnswerLatex: "\\text{whole population}" },
    { title: "Sample size", questionLatex: "\\text{1-in-10 of 500 people?}", steps: [{ explanation: "500 ÷ 10.", latex: "50" }], finalAnswerLatex: "50" },
  ],
  guidedPractice: [
    mcq("y9-ds-g1", "A population is:", "A", ["the whole group of interest", "a small part", "the average", "a random number"], 2, "The whole group."),
    mcq("y9-ds-g2", "A sample is:", "B", ["the whole group", "a part of the population", "the largest value", "a probability"], 2, "A part of the population."),
    ans("y9-ds-g3", "How many in a 1-in-10 sample of 500 people?", "", "50", 2, "500 ÷ 10 = 50.", []),
    mcq("y9-ds-g4", "Random sampling helps to:", "C", ["increase bias", "survey everyone", "reduce bias", "raise the mean"], 2, "Reduce bias."),
  ],
  independentPractice: [
    mcq("y9-ds-i1", "A census means surveying:", "A", ["the whole population", "a small sample", "only volunteers", "only adults"], 2, "The whole population."),
    ans("y9-ds-i2", "How many in a 1-in-20 sample of 1000 people?", "", "50", 2, "50.", []),
    mcq("y9-ds-i3", "Surveying only your friends about a school issue is likely to be:", "B", ["unbiased", "biased", "a census", "random"], 3, "Biased — not representative."),
    ans("y9-ds-i4", "A 1-in-5 sample of 200 students is how many?", "", "40", 2, "40.", []),
    mcq("y9-ds-i5", "A representative sample should reflect the:", "C", ["researcher's opinion", "smallest group", "whole population", "largest value"], 2, "The whole population."),
  ],
  masteryQuiz: [
    mcq("y9-ds-m1", "The whole group being studied is the:", "A", ["population", "sample", "mean", "outlier"], 2, "Population."),
    mcq("y9-ds-m2", "A part of the population chosen to study is a:", "B", ["census", "sample", "mode", "range"], 2, "Sample."),
    ans("y9-ds-m3", "How many in a 1-in-10 sample of 800?", "", "80", 2, "80.", []),
    mcq("y9-ds-m4", "A census surveys:", "C", ["a sample", "volunteers", "the whole population", "every tenth person"], 2, "The whole population."),
    mcq("y9-ds-m5", "Random sampling is used to:", "A", ["reduce bias", "increase bias", "save no time", "pick the mean"], 2, "Reduce bias."),
    ans("y9-ds-m6", "A 1-in-25 sample of 1000 is how many?", "", "40", 3, "40.", []),
    mcq("y9-ds-m7", "Only surveying people leaving a gym about exercise habits is:", "B", ["representative", "biased", "a census", "impossible"], 3, "Biased."),
    ans("y9-ds-m8", "A 1-in-4 sample of 240 is how many?", "", "60", 2, "60.", []),
    mcq("y9-ds-m9", "Which is most likely to be unbiased?", "A", ["a random sample", "asking only friends", "asking only one class", "a self-selected online poll"], 3, "A random sample."),
    mcq("y9-ds-m10", "A sample should be large enough and:", "C", ["convenient only", "from one group", "representative", "all volunteers"], 2, "Representative."),
  ],
  masteryQuizPool: [
    ans("y9-ds-p1", "A school of 1200 takes a 1-in-15 sample. How many students?", "", "80", 5, "1200 ÷ 15 = 80.", []),
    ans("y9-ds-p2", "A stratified sample takes 10% of each group: 200 boys and 150 girls. How many in total?", "", "35", 5, "0.10 × 350 = 35.", []),
    mcq("y9-ds-p3", "A survey about TV habits done only during the day may miss workers, causing:", "B", ["no problem", "sampling bias", "a census", "a larger mean"], 5, "Sampling bias."),
    ans("y9-ds-p4", "A 1-in-50 sample of 5000 is how many?", "", "100", 5, "100.", []),
    ans("y9-ds-p5", "A factory checks 2% of 4500 items. How many are checked?", "", "90", 5, "0.02 × 4500 = 90.", []),
    mcq("y9-ds-p6", "When is a census preferred over a sample?", "A", ["when the population is small or accuracy is critical", "always", "never", "only for opinions"], 5, "Small population / critical accuracy."),
    ans("y9-ds-p7", "Stratified sampling: 5% of 600 seniors and 5% of 800 juniors. Total sampled?", "", "70", 5, "0.05 × 1400 = 70.", []),
    ans("y9-ds-p8", "A 1-in-8 sample of 2400 is how many?", "", "300", 5, "300.", []),
    mcq("y9-ds-p9", "A self-selected online poll is often biased because:", "C", ["it is random", "everyone responds", "only motivated people respond", "it is a census"], 5, "Only motivated people respond."),
    ans("y9-ds-p10", "A town of 30000 surveys 1 in 100. How many people?", "", "300", 5, "300.", []),
  ],
  commonMistakes: [
    { mistake: "Confusing sample with population.", fix: "Sample is a part; population is the whole." },
    { mistake: "Thinking any sample is unbiased.", fix: "Only representative (often random) samples avoid bias." },
    { mistake: "Calling a sample a census.", fix: "A census covers everyone." },
    { mistake: "Miscomputing a fractional sample.", fix: "Divide the population by the sampling ratio." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "tree-diagrams": treeDiagrams,
  "relative-frequencies": relativeFrequencies,
  "data-and-sampling": dataAndSampling,
};

export function year9Chapter8ProbabilityBLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
