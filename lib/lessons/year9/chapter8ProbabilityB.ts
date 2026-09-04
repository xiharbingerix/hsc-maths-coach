// Year 9 — Chapter 8, probability sections, 10-lesson rework: tree-diagrams-multistage-events
// (core), dependent-and-independent-events (core), probability-simulations (core),
// conditional-probability (path), gambling-awareness (core). data-and-sampling (path) is
// untouched — out of scope for the probability rework (see docs/migrations/
// Y9-probability-rework-slug-map.md). Ported/adapted from the pre-restructure
// `makingPredictions.ts` and `probabilityB.ts` (both retired) plus this file's own prior content.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Multiply along branches; check whether the second stage is affected by the first.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the rule.", explanation };
}
const fr = (n: number, d: number) => { const g = (a: number, b: number): number => (b ? g(b, a % b) : a); const k = g(n, d); const sn = n / k, sd = d / k; return [`${sn}/${sd}`, `${sn} / ${sd}`, `${n}/${d}`, (sn / sd).toString()]; };

// ── tree-diagrams-multistage-events (core) — MA5-PRO-C-01 ─────────────────────────────
const treeDiagramsMultistage: Partial<ExplicitLesson> = {
  description: "Use tree diagrams to solve multistage chance-experiment problems, multiplying along paths and adding separate successful paths.",
  learningIntention: "Combine probabilities across the stages of a chance experiment using a tree diagram.",
  successCriteria: [
    "Document all feasible results for a multistage experiment.",
    "Multiply probabilities along one path of a tree diagram.",
    "Add separate successful paths.",
    "Link a tree diagram directly to probability values.",
  ],
  teaching: {
    paragraphs: [
      "A multistage experiment is a chance situation that unfolds in steps. A tree diagram documents every feasible result: each branch is one stage, and a full path from root to tip is one final outcome, such as heads then 4, or red then blue.",
      "For one exact path, multiply the branch probabilities. If half the outcomes survive stage one and one sixth of those survive stage two, then only 1/2 × 1/6 of the original space survives both conditions.",
      "For an event that can happen in several separate ways, find each successful path and add the path probabilities. Exactly one head in two tosses has two paths: HT and TH.",
      "The words 'and' and 'or' are useful signals: 'and' usually points to a single path and multiplication; 'or' between separate successful paths usually points to addition.",
      "Replacement keeps later branch probabilities unchanged (independent events, covered further in the next lesson). Without replacement changes the branch probabilities on later stages.",
      "The common error is to add along a path or multiply separate alternatives. Always ask: am I moving along one path, or combining different successful paths?",
    ],
    latexBlocks: ["P(A\\text{ then }B)=P(A)\\times P(B\\text{ after }A)", "P(\\text{path 1 or path 2})=P(\\text{path 1})+P(\\text{path 2})"],
  },
  workedExamples: [
    { title: "Coin then die", questionLatex: "\\text{Find }P(\\text{heads then rolling }6).", steps: [{ explanation: "Multiply along the single path.", latex: "P(H\\text{ then }6)=\\tfrac12\\times\\tfrac16" }], finalAnswerLatex: "\\tfrac{1}{12}" },
    {
      title: "Two spins",
      questionLatex: "\\text{A spinner has equal red and blue sectors. Find }P(\\text{red twice}).",
      steps: [{ explanation: "Each spin has red probability one half.", latex: "P(RR)=\\tfrac12\\times\\tfrac12" }],
      finalAnswerLatex: "\\tfrac14",
      probabilityTreeDiagram: {
        description: "Two-stage spinner tree. The highlighted red-red path shows the unchanged one-half branch probability multiplied twice.",
        rootLabel: "spinner",
        stages: ["first spin", "second spin"],
        branches: [
          { id: "R", label: "red", probability: "1/2", children: [{ id: "R", label: "red", probability: "1/2" }, { id: "B", label: "blue", probability: "1/2" }] },
          { id: "B", label: "blue", probability: "1/2", children: [{ id: "R", label: "red", probability: "1/2" }, { id: "B", label: "blue", probability: "1/2" }] },
        ],
        highlightedPaths: [["R", "R"]],
      },
    },
    {
      title: "Add two successful paths",
      questionLatex: "\\text{Two fair coins are tossed. Find }P(\\text{exactly one head}).",
      steps: [{ explanation: "The successful paths are HT and TH.", latex: "P(HT)=\\tfrac14,\\quad P(TH)=\\tfrac14" }, { explanation: "Add the separate paths.", latex: "P(\\text{exactly one H})=\\tfrac14+\\tfrac14" }],
      finalAnswerLatex: "\\tfrac12",
      probabilityTreeDiagram: {
        description: "Two-stage fair-coin tree. The highlighted heads-tails and tails-heads paths are the separate successful paths for exactly one head.",
        rootLabel: "start",
        stages: ["first toss", "second toss"],
        branches: [
          { id: "H", label: "heads", probability: "1/2", children: [{ id: "H", label: "heads", probability: "1/2" }, { id: "T", label: "tails", probability: "1/2" }] },
          { id: "T", label: "tails", probability: "1/2", children: [{ id: "H", label: "heads", probability: "1/2" }, { id: "T", label: "tails", probability: "1/2" }] },
        ],
        highlightedPaths: [["H", "T"], ["T", "H"]],
      },
    },
  ] as WorkedExample[],
  guidedPractice: [
    ans("y9-tdm-g1", "A fair coin is tossed and a fair die is rolled. Find the probability of tails then rolling a 2.", "", "1/12", 2, "Multiply the probabilities along the path: 1/2 × 1/6 = 1/12.", fr(1, 12)),
    ans("y9-tdm-g2", "A spinner has equal red and blue sectors. It is spun twice. Find the probability of blue twice.", "", "1/4", 2, "Multiply the two blue probabilities: 1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-tdm-g3", "A bag has 3 red and 2 blue counters. A counter is drawn, replaced, then another is drawn. Find the probability of red twice.", "", "9/25", 3, "Replacement keeps the probability of red at 3/5: 3/5 × 3/5 = 9/25.", fr(9, 25)),
    mcq("y9-tdm-g4", "Which operation combines the branch probabilities along one path of a tree diagram?", "B", ["Add", "Multiply", "Subtract", "Round"], 2, "Multiply probabilities along a path."),
  ],
  independentPractice: [
    ans("y9-tdm-i1", "A fair coin is tossed twice. Find the probability of two heads.", "", "1/4", 3, "1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-tdm-i2", "A spinner has 3 equal sectors: red, blue and green. It is spun twice. Find the probability of green then red.", "", "1/9", 3, "1/3 × 1/3 = 1/9.", fr(1, 9)),
    ans("y9-tdm-i3", "A bag has 4 yellow and 1 purple counter. A counter is drawn, replaced, then another is drawn. Find the probability of purple twice.", "", "1/25", 3, "1/5 × 1/5 = 1/25.", fr(1, 25)),
    mcq("y9-tdm-i4", "When should separate successful paths on a tree diagram be added?", "C", ["Before listing outcomes", "Only when an event is impossible", "When any one of the separate paths satisfies the event", "Whenever replacement occurs"], 3, "Add distinct paths that each produce success."),
    ans("y9-tdm-i5", "Two fair coins are tossed. Find the probability of one head and one tail in any order.", "P(HT)+P(TH)", "1/2", 3, "Add the two successful paths: 1/4 + 1/4 = 1/2.", fr(1, 2)),
  ],
  masteryQuiz: [
    ans("y9-tdm-m1", "A coin is tossed and a die is rolled. Find the probability of heads then rolling 3.", "", "1/12", 2, "1/2 × 1/6 = 1/12.", fr(1, 12)),
    ans("y9-tdm-m2", "A spinner has 4 equal sectors, one gold. It is spun twice. Find the probability of gold twice.", "", "1/16", 3, "1/4 × 1/4 = 1/16.", fr(1, 16)),
    mcq("y9-tdm-m3", "Which expression finds the probability of heads then tails for two fair coins?", "A", ["1/2 × 1/2", "1/2 + 1/2", "1 − 1/2", "2 × 1/2 + 1/2"], 2, "Multiply along the specified path."),
    ans("y9-tdm-m4", "A bag has 2 red and 3 blue counters. A counter is drawn, replaced, then another is drawn. Find the probability of blue twice.", "", "9/25", 3, "3/5 × 3/5 = 9/25.", fr(9, 25)),
    ans("y9-tdm-m5", "Two fair coins are tossed. Find the probability of at least one head.", "P(HH)+P(HT)+P(TH)", "3/4", 3, "Three of the four paths include at least one head.", fr(3, 4)),
    ans("y9-tdm-m6", "A fair die is rolled twice. Find the probability of rolling a 6 twice.", "", "1/36", 3, "1/6 × 1/6 = 1/36.", fr(1, 36)),
    ans("y9-tdm-m7", "A spinner has equal red and blue sectors and is spun twice. Find the probability of different colours.", "P(RB)+P(BR)", "1/2", 4, "Add the red-blue and blue-red paths: 1/4 + 1/4 = 1/2.", fr(1, 2)),
    ans("y9-tdm-m8", "A bag has 3 red and 1 blue counter. A counter is drawn, replaced, then another is drawn. Find the probability of exactly one blue.", "P(BR)+P(RB)", "3/8", 4, "Add the blue-red and red-blue paths: 1/4×3/4 + 3/4×1/4 = 3/8.", fr(3, 8)),
    ans("y9-tdm-m9", "A fair coin is tossed three times. Find the probability of three heads.", "", "1/8", 3, "Multiply one half three times.", fr(1, 8)),
    ans("y9-tdm-m10", "A fair coin is tossed twice and a fair die is rolled. Find the probability of exactly one head and an even die result.", "", "1/4", 4, "Exactly one head has probability 1/2 and an even die result has probability 1/2.", fr(1, 4)),
  ],
  masteryQuizPool: [
    ans("y9-tdm-p1", "A coin is tossed and a fair die is rolled. Find the probability of tails then rolling an even number.", "", "1/4", 3, "1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-tdm-p2", "A spinner with 3 equal colours is spun twice. Find the probability of red then blue.", "", "1/9", 3, "1/3 × 1/3 = 1/9.", fr(1, 9)),
    ans("y9-tdm-p3", "A fair die is rolled twice. Find the probability of rolling a 4 then a 5.", "", "1/36", 3, "1/6 × 1/6 = 1/36.", fr(1, 36)),
    ans("y9-tdm-p4", "Two fair coins are tossed. Find the probability of exactly one tail.", "", "1/2", 3, "HT and TH are favourable: 2/4 = 1/2.", fr(1, 2)),
    ans("y9-tdm-p5", "A spinner with 4 equal sectors is spun twice. Find the probability of the same colour twice.", "", "1/4", 4, "4 matching paths out of 16: 4/16 = 1/4.", [...fr(1, 4), "4/16"]),
    ans("y9-tdm-p6", "A fair coin is tossed three times. Find the probability of exactly one head.", "", "3/8", 4, "HTT, THT and TTH are favourable: 3/8.", fr(3, 8)),
    mcq("y9-tdm-p7", "For one specified path in a tree diagram, which operation combines the branch probabilities?", "B", ["Add", "Multiply", "Subtract from 1", "Average"], 3, "Multiply along the path."),
    mcq("y9-tdm-p8", "For exactly one head in two tosses, why are two path probabilities added?", "C", ["The tosses are unfair", "The paths happen at the same time", "HT and TH are separate successful paths", "The complement is impossible"], 3, "Add distinct successful paths."),
    ans("y9-tdm-p9", "A fair die is rolled and a coin is tossed. Find the probability of an odd number and heads.", "", "1/4", 3, "3/6 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-tdm-p10", "A spinner lands on blue with probability 2/5. It is spun twice. Find the probability of blue then not blue.", "", "6/25", 4, "2/5 × 3/5 = 6/25.", fr(6, 25)),
  ],
  multiPartPractice: [
    {
      id: "y9-tdm-mp1",
      prompt: "A game uses a fair coin and a fair six-sided die. A player wins a small prize for heads and an even number, and a major prize for heads and a 6.",
      latex: "\\text{Use path probabilities.}",
      answer: "1/4",
      acceptedAnswers: ["3/12"],
      hint: "The coin result and die result form a two-stage path.",
      explanation: "Multiply along each required path. The major-prize path is contained inside the small-prize condition.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the probability of winning a small prize.", marks: 2, answer: "1/4", acceptedAnswers: ["3/12", "0.25", "25%"], hint: "Heads has probability 1/2 and an even die result has probability 3/6.", explanation: "1/2 × 3/6 = 1/4.", working: ["P(H\\text{ and even})=\\tfrac12\\times\\tfrac36=\\tfrac14"] },
        { key: "b", label: "(b)", prompt: "Find the probability of winning a major prize.", marks: 1, answer: "1/12", acceptedAnswers: ["0.0833"], hint: "Major prize means heads and a 6.", explanation: "1/2 × 1/6 = 1/12.", working: ["P(H\\text{ and }6)=\\tfrac12\\times\\tfrac16=\\tfrac{1}{12}"] },
        { key: "c", label: "(c)", prompt: "Find the probability of winning a small prize but not a major prize.", marks: 2, answer: "1/6", acceptedAnswers: ["2/12", "0.1667"], hint: "Use heads with die results 2 or 4.", explanation: "Small but not major means heads and an even number other than 6, so 2 of 6 die results are favourable.", working: ["P=\\tfrac12\\times\\tfrac26=\\tfrac16"] },
      ],
    },
  ],
  commonMistakes: [
    { mistake: "Adding probabilities along a single path.", fix: "Multiply along a path; add only across separate paths." },
    { mistake: "Reusing the same denominator without replacement.", fix: "After a draw without replacement, totals shrink for the next stage." },
    { mistake: "Forgetting some paths in an 'or'.", fix: "Include every favourable path before adding." },
    { mistake: "Computing 'at least one' directly when the complement is easier.", fix: "Use 1 − P(none) for 'at least one' events." },
  ],
  masteryPassMark: 0.8,
};

// ── dependent-and-independent-events (core) — MA5-PRO-C-01 ────────────────────────────
const dependentIndependentEvents: Partial<ExplicitLesson> = {
  description: "Distinguish independent events from dependent events, and calculate their combined probabilities.",
  learningIntention: "Clarify the distinction between independent and dependent events, and calculate probabilities for both.",
  successCriteria: [
    "Explain when the outcome of one event does not change the probability of another (independent).",
    "Explain when the outcome of one event does change the probability of another (dependent).",
    "Multiply unchanged probabilities for independent events.",
    "Multiply updated probabilities for dependent events (without replacement).",
  ],
  teaching: {
    paragraphs: [
      "Two events are INDEPENDENT when the outcome of the first does not change the probability of the second. Separate coin tosses, separate die rolls, and draws WITH REPLACEMENT are all independent — nothing about the situation changes between stages.",
      "Two events are DEPENDENT when the first outcome DOES change the probability of the second. The clearest Year 9 example is drawing WITHOUT REPLACEMENT: once an item leaves the bag, both the total and (sometimes) the favourable count are different for the next draw.",
      "For independent events, multiply the UNCHANGED probabilities: P(A and B) = P(A) × P(B). A bag with P(red) = 3/5, drawn WITH replacement twice, has P(RR) = 3/5 × 3/5 = 9/25.",
      "For dependent events, multiply along the path but UPDATE the second probability using what remains: a bag with 3 red and 2 blue counters, drawn WITHOUT replacement, has P(RR) = 3/5 × 2/4 = 3/10 — the second fraction changed because one red counter is already gone.",
      "The question to always ask is: does the first outcome change what's available for the second? 'With replacement' or separate trials (coins, dice, spinners) usually means independent; 'without replacement' or 'not returned' usually means dependent.",
      "Tree diagrams make the contrast visible: for independent events, every branch probability stays the same at every stage; for dependent events, the branch probabilities on the second stage change depending on which branch was taken first.",
    ],
    latexBlocks: ["P(A\\text{ and }B)=P(A)\\times P(B)\\quad\\text{(independent)}", "P(A\\text{ then }B)=P(A)\\times P(B\\mid A)\\quad\\text{(dependent)}"],
  },
  workedExamples: [
    { title: "Independent: coin and die", questionLatex: "\\text{Find }P(\\text{heads and an even die result}).", steps: [{ explanation: "The coin does not affect the die, so both probabilities stay at their original values.", latex: "P(H)=\\tfrac12,\\quad P(\\text{even})=\\tfrac12" }, { explanation: "Multiply the unchanged probabilities.", latex: "P=\\tfrac12\\times\\tfrac12" }], finalAnswerLatex: "\\tfrac14" },
    {
      title: "Dependent: two red counters",
      questionLatex: "\\text{A bag has 3 red and 2 blue counters. Two are drawn without replacement. Find }P(RR).",
      steps: [{ explanation: "The first red probability is three fifths.", latex: "P(R_1)=\\tfrac35" }, { explanation: "After one red is removed, 2 red remain among 4 counters.", latex: "P(R_2\\text{ after }R_1)=\\tfrac24" }, { explanation: "Multiply.", latex: "P(RR)=\\tfrac35\\times\\tfrac24" }],
      finalAnswerLatex: "\\tfrac{3}{10}",
      probabilityTreeDiagram: {
        description: "Two-stage counter tree without replacement. The highlighted red-red path changes from three fifths to two quarters after the first red counter is removed.",
        rootLabel: "bag",
        stages: ["first draw", "second draw"],
        branches: [
          { id: "R", label: "red", probability: "3/5", children: [{ id: "R", label: "red", probability: "2/4" }, { id: "B", label: "blue", probability: "2/4" }] },
          { id: "B", label: "blue", probability: "2/5", children: [{ id: "R", label: "red", probability: "3/4" }, { id: "B", label: "blue", probability: "1/4" }] },
        ],
        highlightedPaths: [["R", "R"]],
      },
    },
    {
      title: "Dependent: two different colours",
      questionLatex: "\\text{A bag has 2 red and 3 blue counters. Find }P(R\\text{ then }B)\\text{ without replacement}.",
      steps: [{ explanation: "Draw red first.", latex: "P(R)=\\tfrac25" }, { explanation: "All 3 blue counters remain among 4 counters.", latex: "P(B\\text{ after }R)=\\tfrac34" }, { explanation: "Multiply.", latex: "P(RB)=\\tfrac25\\times\\tfrac34" }],
      finalAnswerLatex: "\\tfrac{3}{10}",
      probabilityTreeDiagram: {
        description: "Two-stage counter tree without replacement. The highlighted red-blue path uses two fifths for red first and three quarters for blue after red is removed.",
        rootLabel: "bag",
        stages: ["first draw", "second draw"],
        branches: [
          { id: "R", label: "red", probability: "2/5", children: [{ id: "R", label: "red", probability: "1/4" }, { id: "B", label: "blue", probability: "3/4" }] },
          { id: "B", label: "blue", probability: "3/5", children: [{ id: "R", label: "red", probability: "2/4" }, { id: "B", label: "blue", probability: "2/4" }] },
        ],
        highlightedPaths: [["R", "B"]],
      },
    },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-diev-g1", "Which experiment describes independent events?", "A", ["Toss a coin twice", "Draw two counters without replacement", "Select two students without returning the first name", "Take two cards from a pack without replacement"], 2, "One coin toss does not change the next."),
    ans("y9-diev-g2", "A fair coin is tossed and a fair die is rolled. Find the probability of tails and a number above 4.", "", "1/6", 3, "The independent probabilities are 1/2 and 2/6: 1/2 × 2/6 = 1/6.", [...fr(1, 6), "2/12"]),
    ans("y9-diev-g3", "A bag has 4 red and 1 blue counter. Two are drawn without replacement. Find the probability of two red counters.", "", "3/5", 3, "3/4 remain red after the first: 4/5 × 3/4 = 3/5.", fr(3, 5)),
    mcq("y9-diev-g4", "What changes after a counter is drawn without replacement?", "D", ["Only the counter colour names", "Nothing", "Only the first probability", "The available counters and the total number remaining"], 2, "The second draw uses the updated bag."),
  ],
  independentPractice: [
    ans("y9-diev-i1", "A fair die is rolled twice. Find the probability of rolling an even number both times.", "", "1/4", 3, "Each roll is independent: 1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-diev-i2", "A bag has 3 red and 3 blue counters. Two are drawn without replacement. Find the probability of red twice.", "", "1/5", 4, "3/6 × 2/5 = 1/5.", fr(1, 5)),
    mcq("y9-diev-i3", "Which experiment contains dependent events?", "C", ["Toss a coin twice", "Roll a die and toss a coin", "Draw two cards without replacement", "Spin a spinner twice"], 2, "The first card removal changes the second draw."),
    ans("y9-diev-i4", "A spinner lands on yellow with probability 3/5. It is spun twice. Find the probability of yellow twice.", "", "9/25", 3, "Multiply the unchanged probabilities: 3/5 × 3/5 = 9/25.", fr(9, 25)),
    ans("y9-diev-i5", "A bag has 2 red and 2 blue counters. Two are drawn without replacement. Find the probability of red then blue.", "", "1/3", 4, "2/4 × 2/3 = 1/3.", [...fr(1, 3), "4/12"]),
  ],
  masteryQuiz: [
    ans("y9-diev-m1", "A coin is tossed twice. Find the probability of two heads.", "", "1/4", 2, "Multiply independent probabilities: 1/2 × 1/2 = 1/4.", fr(1, 4)),
    ans("y9-diev-m2", "A bag has 3 red and 2 blue counters. Two are drawn without replacement. Find the probability of red twice.", "", "3/10", 3, "Update the second probability after one red is removed: 3/5 × 2/4 = 3/10.", fr(3, 10)),
    mcq("y9-diev-m3", "Which phrase signals that two draws from a bag can be treated as independent?", "C", ["Without looking", "Without replacement", "With replacement", "With different colours"], 2, "Replacement restores the bag."),
    ans("y9-diev-m4", "A die is rolled twice. Find the probability of rolling a 1 twice.", "", "1/36", 3, "Independent: 1/6 × 1/6 = 1/36.", fr(1, 36)),
    ans("y9-diev-m5", "A bag has 2 black and 3 white counters. Find the probability of black then white, without replacement.", "", "3/10", 3, "2/5 × 3/4 = 3/10.", fr(3, 10)),
    mcq("y9-diev-m6", "A bag has 3 red and 2 blue counters. After drawing one red without replacement, what is the probability of red next?", "C", ["3/5", "3/4", "2/4", "2/5"], 3, "Two red counters remain among four counters."),
    ans("y9-diev-m7", "A spinner lands on blue with probability 1/4. It is spun twice. Find the probability of blue twice.", "", "1/16", 3, "Independent: 1/4 × 1/4 = 1/16.", fr(1, 16)),
    ans("y9-diev-m8", "Cards numbered 1, 2, 3 and 4 are used. Find the probability of drawing 1 then 2, without replacement.", "", "1/12", 4, "1/4 × 1/3 = 1/12.", fr(1, 12)),
    mcq("y9-diev-m9", "Which statement correctly distinguishes independent and dependent events?", "B", ["Independent events always have higher probability than dependent events", "For independent events, the outcome of the first event does not change the probability of the second; for dependent events it does", "Dependent events can never be modelled with a tree diagram", "Independent events only apply to coins"], 3, "This is the definition of independence."),
    ans("y9-diev-m10", "A bag has 3 red and 2 blue counters. Find the probability of red then blue WITHOUT replacement.", "", "3/10", 4, "3/5 × 2/4 = 3/10.", fr(3, 10)),
  ],
  masteryQuizPool: [
    ans("y9-diev-p1", "A fair coin is tossed three times. Find the probability of three heads.", "", "1/8", 3, "Independent: 1/2 × 1/2 × 1/2 = 1/8.", fr(1, 8)),
    ans("y9-diev-p2", "A bag has 2 red and 3 blue counters. Two are drawn without replacement. Find the probability of blue twice.", "", "3/10", 4, "3/5 × 2/4 = 3/10.", fr(3, 10)),
    ans("y9-diev-p3", "A die is rolled and a coin is tossed independently. Find the probability of a factor of 6 and heads.", "", "1/3", 3, "Factors of 6 are 1,2,3,6: 4/6 × 1/2 = 4/12 = 1/3.", [...fr(1, 3), "4/12"]),
    mcq("y9-diev-p4", "Replacement in a bag-draw experiment makes the two draws:", "B", ["dependent", "independent", "impossible", "certain"], 2, "Replacement restores the original probabilities for the second draw."),
    ans("y9-diev-p5", "Cards A, B, C and D are drawn without replacement. Find the probability of drawing A then B.", "", "1/12", 4, "1/4 × 1/3 = 1/12.", fr(1, 12)),
    ans("y9-diev-p6", "A spinner lands on red with probability 2/5. It is spun twice independently. Find the probability of red then not red.", "", "6/25", 4, "2/5 × 3/5 = 6/25.", fr(6, 25)),
    ans("y9-diev-p7", "A bag has 5 red and 3 blue counters. Two are drawn without replacement. Find the probability of different colours.", "P(RB)+P(BR)", "15/28", 5, "5/8×3/7 + 3/8×5/7 = 15/56 + 15/56 = 30/56 = 15/28.", ["30/56"]),
    mcq("y9-diev-p8", "Selecting a lottery ball and NOT returning it before selecting the next ball describes:", "B", ["independent events", "dependent events", "an impossible event", "a certain event"], 2, "Not returning the ball changes what remains for the next selection."),
    ans("y9-diev-p9", "A fair die is rolled twice. Find the probability that both rolls are odd.", "", "1/4", 3, "Independent: 3/6 × 3/6 = 9/36 = 1/4.", [...fr(1, 4), "9/36"]),
    ans("y9-diev-p10", "A bag has 4 green and 1 yellow counter. Two are drawn without replacement. Find the probability of yellow then green.", "", "1/5", 4, "1/5 × 4/4 = 1/5.", fr(1, 5)),
  ],
  commonMistakes: [
    { mistake: "Treating every two-stage experiment as independent.", fix: "Check whether the first outcome changes the second probability — 'without replacement' signals dependence." },
    { mistake: "Keeping the same denominator for the second draw after removing an item without replacement.", fix: "Without replacement always reduces the total by one for the next draw." },
    { mistake: "Assuming 'without replacement' always changes the favourable count too.", fix: "Only reduce the favourable count if the removed item matched the target type." },
    { mistake: "Multiplying P(A) × P(B) for dependent events as if they were independent.", fix: "For dependent events, use the UPDATED probability for the second stage, not the original." },
  ],
  masteryPassMark: 0.8,
};

// ── probability-simulations (core) — MA5-PRO-C-01 ──────────────────────────────────────
const probabilitySimulations: Partial<ExplicitLesson> = {
  description: "Design and interpret probability simulations, using relative frequency to estimate probabilities and forecast expected numbers.",
  learningIntention: "Interpret simulations as estimates of probability and use them to forecast future results.",
  successCriteria: [
    "Design or run a simulation to estimate the probability of an event.",
    "Calculate relative frequency (experimental probability) = successes ÷ trials.",
    "Calculate an expected number of occurrences = probability × number of trials, and use it to forecast.",
    "Critically assess a simulation's reliability, including the effect of the number of trials.",
  ],
  teaching: {
    paragraphs: [
      "A simulation is a repeated random model of a situation. It is useful when exact counting is difficult, or when we want to test whether a theoretical prediction seems reasonable.",
      "Relative frequency is the experimental version of probability: successes divided by trials. If 48 of 80 trials succeed, the simulation estimates the success probability as 48/80 = 0.6.",
      "Simulation results vary because random trials do not distribute themselves perfectly in small samples. Ten tosses of a fair coin might not give exactly five heads, even though the theoretical probability of heads is 1/2.",
      "Larger simulations are usually more reliable because random variation has more chances to balance out. This does not make the estimate exact; it makes the estimate less jumpy.",
      "The simulation tool must match the real situation. A random integer from 1 to 7 can model days of the week because the seven outcomes are equally likely; a coin cannot model seven equally likely outcomes without extra rules.",
      "Once you have an estimated probability (from theory or from a simulation), you can forecast an expected number of future occurrences: expected number = probability × number of trials. If a simulated game wins with relative frequency 0.6, then over 200 future games you would expect about 0.6 × 200 = 120 wins — a forecast, not a guarantee.",
    ],
    latexBlocks: ["\\text{relative frequency}=\\frac{\\text{number of successes}}{\\text{number of trials}}", "\\text{expected number}=P\\times n"],
  },
  workedExamples: [
    { title: "Estimate from results", questionLatex: "\\text{A simulation records 48 successes in 80 trials. Estimate the probability of success.}", steps: [{ explanation: "Divide successes by trials.", latex: "\\text{relative frequency}=\\tfrac{48}{80}" }], finalAnswerLatex: "0.6" },
    { title: "Compare reliability", questionLatex: "\\text{One simulation uses 20 trials and another uses 500 trials. Which usually gives a more reliable estimate?}", steps: [{ explanation: "Larger samples tend to reduce the effect of random variation.", latex: "500>20" }], finalAnswerLatex: "\\text{The 500-trial simulation}" },
    { title: "Forecast future occurrences", questionLatex: "\\text{A simulation records 48 successes in 80 trials. Predict the number of successes in 300 future trials.}", steps: [{ explanation: "The relative frequency is 0.6.", latex: "\\tfrac{48}{80}=0.6" }, { explanation: "Multiply by the number of future trials.", latex: "0.6\\times300" }], finalAnswerLatex: "180" },
  ],
  guidedPractice: [
    ans("y9-psim-g1", "A simulation records 30 successes in 50 trials. Estimate the probability of success.", "", "3/5", 2, "30 ÷ 50 = 3/5.", fr(3, 5)),
    mcq("y9-psim-g2", "Which estimate is usually more reliable?", "C", ["An estimate from 5 trials", "An estimate from 20 trials", "An estimate from 500 trials", "All trial counts are equally reliable"], 2, "A larger trial count usually gives a more reliable estimate."),
    mcq("y9-psim-g3", "Which tool can model a fair six-sided die?", "A", ["A random integer from 1 to 6", "A coin toss", "A spinner with 5 equal sectors", "A random integer from 1 to 4"], 2, "A fair die has six equally likely outcomes."),
    ans("y9-psim-g4", "A simulation estimates P(success) = 0.4. Find the expected number of successes in 150 future trials.", "", "60", 3, "Expected number = probability × trials = 0.4 × 150 = 60.", []),
  ],
  independentPractice: [
    ans("y9-psim-i1", "A simulation records 72 rainy days in 120 trials. Estimate the probability of rain.", "", "3/5", 3, "72 ÷ 120 = 3/5.", fr(3, 5)),
    mcq("y9-psim-i2", "Why might two simulations of the same event give different results?", "B", ["The event changes its exact probability every time", "Random variation affects the results", "Relative frequency cannot be calculated", "A simulation must always be exact"], 3, "Random trials naturally vary."),
    mcq("y9-psim-i3", "Which model suits a spinner with four equal coloured sectors?", "D", ["A random integer from 1 to 3", "A coin toss only", "A random integer from 1 to 10", "A random integer from 1 to 4"], 2, "Use four equally likely values."),
    ans("y9-psim-i4", "A simulated game is won 35 times in 50 trials. Estimate the probability of winning.", "", "7/10", 3, "35 ÷ 50 = 7/10.", fr(7, 10)),
    ans("y9-psim-i5", "A die-rolling simulation estimates P(rolling a 6) = 1/6 from many trials. Predict the number of sixes in 240 future rolls.", "", "40", 3, "Expected number = 1/6 × 240 = 40.", []),
  ],
  masteryQuiz: [
    ans("y9-psim-m1", "A simulation records 40 successes in 100 trials. Estimate the probability of success.", "", "2/5", 2, "40 ÷ 100 = 2/5.", fr(2, 5)),
    ans("y9-psim-m2", "A simulation records 75 wins in 100 trials. Estimate the probability of winning.", "", "3/4", 2, "75 ÷ 100 = 3/4.", fr(3, 4)),
    mcq("y9-psim-m3", "Which trial count usually gives the most reliable estimate?", "D", ["10", "25", "100", "1000"], 2, "The largest trial count usually gives the most reliable estimate."),
    mcq("y9-psim-m4", "Which statement about simulations is correct?", "B", ["Every simulation gives the exact probability", "Results can vary because trials are random", "Fewer trials are always more reliable", "Relative frequency is successes plus trials"], 2, "Random variation causes results to vary."),
    ans("y9-psim-m5", "A simulated event occurs 84 times in 120 trials. Estimate its probability.", "", "7/10", 3, "Simplify 84/120 to 7/10.", fr(7, 10)),
    mcq("y9-psim-m6", "Which tool best models selecting one month of the year at random?", "C", ["A coin toss", "A random integer from 1 to 6", "A random integer from 1 to 12", "A random integer from 1 to 100"], 2, "There are 12 months."),
    ans("y9-psim-m7", "A simulation gives 126 successes in 180 trials. Estimate the probability of success.", "", "7/10", 3, "Simplify 126/180 to 7/10.", fr(7, 10)),
    mcq("y9-psim-m8", "Simulation A gives 9 successes in 10 trials. Simulation B gives 760 successes in 1000 trials. Which is the stronger estimate for prediction?", "B", ["Simulation A because 0.9 is larger", "Simulation B because it uses many more trials", "Simulation A because it is shorter", "They are equally reliable"], 3, "A larger number of trials generally gives a more reliable estimate."),
    ans("y9-psim-m9", "A fair coin is expected to land heads with probability 1/2. A simulation gives 230 heads in 500 tosses. Find the simulated relative frequency.", "", "0.46", 3, "230 ÷ 500 = 0.46.", ["46%", "23/50"]),
    ans("y9-psim-m10", "A basketball player's simulated free-throw success rate is 0.75. Predict the number of successful free throws in 40 attempts.", "", "30", 3, "Expected number = 0.75 × 40 = 30.", []),
  ],
  masteryQuizPool: [
    ans("y9-psim-p1", "A simulation records 54 successes in 90 trials. Estimate the probability of success.", "", "3/5", 3, "54 ÷ 90 = 3/5.", fr(3, 5)),
    ans("y9-psim-p2", "A spinner simulation records blue 21 times in 60 spins. Estimate the probability of blue.", "", "7/20", 3, "21 ÷ 60 = 7/20.", fr(7, 20)),
    mcq("y9-psim-p3", "A larger number of trials in a simulation mainly:", "B", ["guarantees the exact theoretical probability", "tends to make the relative frequency closer to the theoretical probability", "has no effect on reliability", "always doubles the estimate"], 4, "Larger samples reduce (but do not eliminate) random variation."),
    ans("y9-psim-p4", "A weather simulation predicts rain with probability 0.35. Predict the number of rainy days in a 200-day period.", "", "70", 4, "0.35 × 200 = 70.", []),
    ans("y9-psim-p5", "A simulation records 96 wins in 160 games. Estimate the probability of winning.", "", "3/5", 3, "96 ÷ 160 = 3/5.", fr(3, 5)),
    ans("y9-psim-p6", "Using a win probability of 0.6 from a simulation, predict the number of wins in 45 future games.", "", "27", 4, "0.6 × 45 = 27.", []),
    mcq("y9-psim-p7", "Which best describes 'relative frequency'?", "A", ["Successes divided by trials, used as an experimental estimate of probability", "The theoretical probability only", "The total number of trials", "The difference between successes and trials"], 3, "Relative frequency is the experimental estimate."),
    ans("y9-psim-p8", "A machine simulation records 18 faulty items in 300 trials. Estimate the probability an item is faulty.", "", "3/50", 4, "18 ÷ 300 = 3/50.", fr(3, 50)),
    ans("y9-psim-p9", "Using the faulty-item probability of 3/50, predict the number of faulty items in a batch of 5000.", "", "300", 4, "3/50 × 5000 = 300.", []),
    mcq("y9-psim-p10", "A simulation of 10 trials gives 8 successes (0.8), while a simulation of 2000 trials gives 1204 successes (0.602). If the true probability is 0.6, which estimate is closer, and why?", "B", ["The 10-trial estimate, because 0.8 is a bigger number", "The 2000-trial estimate, because larger samples usually reduce random variation and get closer to the true probability", "Both are equally accurate", "Neither estimate is related to the true probability"], 4, "Larger samples usually give more reliable estimates."),
  ],
  multiPartPractice: [
    {
      id: "y9-psim-mp1",
      prompt: "A computer simulation of a school fundraiser records a profit in 168 out of 240 trials.",
      latex: "\\text{Use relative frequency to make a cautious prediction.}",
      answer: "7/10",
      acceptedAnswers: ["0.7", "70%"],
      hint: "Relative frequency is successes divided by trials.",
      explanation: "The simulation estimate is 168/240 = 7/10. Use that proportion for predictions, while remembering it is not a guarantee.",
      parts: [
        { key: "a", label: "(a)", prompt: "Estimate the probability of making a profit.", marks: 1, answer: "7/10", acceptedAnswers: ["168/240", "0.7", "70%"], hint: "Divide profit trials by total trials.", explanation: "168/240 = 7/10.", working: ["\\text{relative frequency}=\\tfrac{168}{240}=\\tfrac{7}{10}"] },
        { key: "b", label: "(b)", prompt: "Using this estimate, predict the number of profit outcomes in 500 future trials.", marks: 2, answer: "350", hint: "Multiply 500 by the estimated probability.", explanation: "500 × 7/10 = 350 profit outcomes.", working: ["500\\times\\tfrac{7}{10}=350"] },
        { key: "c", label: "(c)", prompt: "A second simulation has 690 profit outcomes in 1000 trials. Which estimate should be used for prediction: first or second?", marks: 2, answer: "second", acceptedAnswers: ["Second", "simulation 2", "2"], hint: "Compare the number of trials, not just the percentage.", explanation: "The second simulation uses many more trials, so it is usually the more reliable estimate for prediction.", working: ["1000>240"] },
      ],
    },
  ],
  commonMistakes: [
    { mistake: "Dividing trials by successes instead of successes by trials.", fix: "Relative frequency = successes ÷ trials." },
    { mistake: "Assuming a small simulation must match the exact theoretical probability.", fix: "Random variation is often noticeable in small samples." },
    { mistake: "Calling a larger simulation perfectly accurate.", fix: "Larger trial counts are usually more reliable, but the result is still an estimate." },
    { mistake: "Forgetting to multiply by the number of trials when forecasting an expected number.", fix: "Expected number = probability × number of future trials, not just the probability." },
  ],
  masteryPassMark: 0.8,
};

// ── conditional-probability (path) — MA5-PRO-P-01 ──────────────────────────────────────
const conditionalProbabilityLesson: Partial<ExplicitLesson> = {
  description: "Apply the formal conditional probability formula P(A|B) = P(A∩B)/P(B), and use precise language for mutually exclusive, inclusive-or, exclusive-or, at-least and at-most events.",
  learningIntention: "Understand and apply P(A|B) = P(A∩B)/P(B), and interpret conditional and compound-event language precisely.",
  successCriteria: [
    "State and apply the formula P(A|B) = P(A∩B) / P(B).",
    "Interpret P(A|B) as restricting the sample space to outcomes where B has occurred.",
    "Determine independence by checking whether P(A|B) = P(A).",
    "Distinguish mutually exclusive from non-mutually-exclusive events, and inclusive or from exclusive or.",
    "Interpret 'at least' and 'at most' language correctly.",
  ],
  teaching: {
    paragraphs: [
      "P(A|B) reads 'the probability of A given B'. It restricts the sample space to only those outcomes where B has occurred, then asks what fraction of those outcomes also belong to A. The formula is P(A|B) = P(A∩B) / P(B).",
      "Think of P(A|B) as zooming in on B. Once we know B occurred, the rest of the sample space is irrelevant. Within B, we count how many outcomes also satisfy A: P(A|B) = n(A and B) / n(B). This is why P(A|B) and P(B|A) are usually different — they zoom in on different events.",
      "If P(A|B) = P(A), then knowing B occurred gives no information about A — the events are independent. If these are not equal, the events are dependent.",
      "The multiplication rule rearranges the formula: P(A∩B) = P(A|B) × P(B). For sequential experiments (drawing without replacement), the second draw is conditional on the first.",
      "Some probability language restricts or combines events in specific ways. Two events are MUTUALLY EXCLUSIVE when they cannot both happen: P(A∩B) = 0, so the addition rule simplifies to P(A∪B) = P(A) + P(B). Non-mutually-exclusive events overlap, so the full addition rule P(A∪B) = P(A) + P(B) − P(A∩B) is needed.",
      "'A or B' usually means INCLUSIVE OR — A, or B, or both — exactly P(A∪B). EXCLUSIVE OR means A or B but NOT both: P(A xor B) = P(A) + P(B) − 2P(A∩B), because the overlap must be removed completely rather than just once. Phrases like 'AT LEAST one' and 'AT MOST one' also restrict which outcomes count — always identify precisely which outcomes are included before calculating.",
    ],
    latexBlocks: [
      "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
      "P(A\\cap B)=P(A\\mid B)\\times P(B)",
      "\\text{independent: }P(A\\mid B)=P(A)",
      "P(A\\text{ xor }B)=P(A)+P(B)-2P(A\\cap B)",
    ],
  },
  workedExamples: [
    {
      title: "Apply the conditional probability formula",
      questionLatex: "\\text{P(A) = 0.4, P(B) = 0.5, P(A}\\cap\\text{B) = 0.2.}\\\\\\text{Find P(A|B). Are A and B independent?}",
      steps: [
        { explanation: "Apply the formula P(A|B) = P(A∩B) / P(B).", latex: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{0.2}{0.5}=0.4" },
        { explanation: "Compare P(A|B) with P(A). If they are equal, A and B are independent.", latex: "P(A\\mid B)=0.4=P(A)\\Rightarrow\\text{independent}" },
      ],
      finalAnswerLatex: "P(A\\mid B)=0.4.\\;\\text{Since }P(A\\mid B)=P(A)\\text{, A and B are independent.}",
    },
    {
      title: "Find P(A|B) from a Venn diagram",
      questionLatex: "\\text{A Venn diagram of 30 people shows: A only = 8, B only = 10, A}\\cap\\text{B = 7, neither = 5.}\\\\\\text{Find P(A|B).}",
      vennDiagram: { description: "Venn diagram of 30 people. A only = 8, intersection = 7, B only = 10, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 8, intersection: 7, bOnly: 10, neither: 5, total: 30, showCounts: true },
      steps: [
        { explanation: "n(B) = B only + A∩B = 10 + 7 = 17. This is the new sample space.", latex: "n(B)=17" },
        { explanation: "n(A∩B) = 7.", latex: "P(A\\mid B)=\\frac{n(A\\cap B)}{n(B)}=\\frac{7}{17}" },
      ],
      finalAnswerLatex: "P(A\\mid B)=\\dfrac{7}{17}",
    },
    {
      title: "Compare 'at least one' and 'at most one'",
      questionLatex: "\\text{Three fair coins are tossed. Find P(at least one head) and P(at most one head).}",
      steps: [
        { explanation: "P(no heads) = 1/8, so 'at least one head' is its complement.", latex: "P(\\text{at least one head})=1-\\tfrac18=\\tfrac78" },
        { explanation: "'At most one head' means 0 or 1 heads: P(0)=1/8, P(1)=3/8.", latex: "P(\\text{at most one head})=\\tfrac18+\\tfrac38=\\tfrac12" },
      ],
      finalAnswerLatex: "P(\\text{at least one head})=\\dfrac78,\\quad P(\\text{at most one head})=\\dfrac12",
    },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-cndp-g1", "Which formula correctly defines conditional probability?", "A", ["P(A|B) = P(A∩B) / P(B)", "P(A|B) = P(A) × P(B)", "P(A|B) = P(A) + P(B)", "P(A|B) = P(A) / P(B) with no intersection"], 2, "The conditional probability formula divides the joint probability by P(B)."),
    ans("y9-cndp-g2", "P(A∩B) = 0.12 and P(B) = 0.4. Find P(A|B).", "P(A\\mid B)", "0.3", 3, "0.12 / 0.4 = 0.3.", [".3", "3/10"]),
    mcq("y9-cndp-g3", "A die is rolled. A = rolling an even number, B = rolling a 5. Are A and B mutually exclusive?", "A", ["Yes — no outcome is both even and 5", "No — 5 is even", "Yes — because P(A) > P(B)", "Cannot be determined"], 3, "A∩B = ∅ since 5 is not even."),
    ans("y9-cndp-g4", "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.1. Find P(A xor B) — A or B but not both.", "P(A)+P(B)-2P(A\\cap B)", "0.5", 4, "0.4 + 0.3 − 2(0.1) = 0.7 − 0.2 = 0.5.", [".5"]),
  ],
  independentPractice: [
    ans("y9-cndp-i1", "P(A∩B) = 0.15 and P(B) = 0.25. Find P(A|B).", "P(A\\mid B)", "0.6", 3, "0.15 / 0.25 = 0.6.", [".6", "3/5"]),
    { ...ans("y9-cndp-i2", "The Venn diagram below shows 40 people: A only = 10, B only = 15, A∩B = 5, neither = 10. Find P(B|A) as a fraction in simplest form.", "P(B\\mid A)=\\dfrac{n(A\\cap B)}{n(A)}", "1/3", 4, "n(A) = 15, so P(B|A) = 5/15 = 1/3.", ["5/15"]), vennDiagram: { description: "Venn diagram of 40 people. A only = 10, A∩B = 5, B only = 15, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 10, intersection: 5, bOnly: 15, neither: 10, total: 40, showCounts: true } },
    ans("y9-cndp-i3", "A bag has 4 green and 6 yellow marbles (10 total). A green marble is drawn and not replaced. Find P(green on 2nd draw | green on 1st draw).", "P(G_2\\mid G_1)", "1/3", 4, "9 remain: 3 green and 6 yellow. 3/9 = 1/3.", ["3/9"]),
    ans("y9-cndp-i4", "P(A) = 0.5, P(B) = 0.6, P(A∩B) = 0.3. Find P(A|B).", "P(A\\mid B)", "0.5", 3, "0.3 / 0.6 = 0.5. Since P(A|B) = P(A) = 0.5, A and B are independent.", [".5", "1/2"]),
    mcq("y9-cndp-i5", "P(A|B) = 0.4 and P(A) = 0.6. Which statement is correct?", "B", ["A and B are independent because both probabilities are less than 1", "A and B are dependent because P(A|B) ≠ P(A)", "A and B are mutually exclusive", "P(B|A) = 0.4"], 3, "P(A|B) ≠ P(A) means the events are dependent."),
  ],
  masteryQuiz: [
    ans("y9-cndp-m1", "P(A∩B) = 0.18 and P(B) = 0.45. Find P(A|B) as a decimal.", "P(A\\mid B)", "0.4", 3, "0.18 / 0.45 = 0.4.", [".4", "2/5"]),
    { ...ans("y9-cndp-m2", "The Venn diagram below shows 30 people: A only = 8, B only = 10, A∩B = 7, neither = 5. Find P(A|B).", "", "7/17", 4, "n(B) = 17. P(A|B) = 7/17.", []), vennDiagram: { description: "Venn diagram of 30 people. A only = 8, A∩B = 7, B only = 10, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 8, intersection: 7, bOnly: 10, neither: 5, total: 30, showCounts: true } },
    mcq("y9-cndp-m3", "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Are A and B independent?", "A", ["Yes, because P(A|B) = P(A∩B)/P(B) = 0.4 = P(A)", "No, because P(A∩B) ≠ 0", "No, because P(A) ≠ P(B)", "Yes, because P(A) + P(B) = 0.9"], 4, "P(A|B) = 0.2/0.5 = 0.4 = P(A)."),
    ans("y9-cndp-m4", "P(A|B) = 0.7 and P(B) = 0.4. Find P(A∩B).", "P(A\\cap B)=P(A\\mid B)\\times P(B)", "0.28", 3, "0.7 × 0.4 = 0.28.", [".28"]),
    ans("y9-cndp-m5", "A bag has 5 red and 3 blue marbles. One is drawn (red) and not replaced. Find P(red on 2nd | red on 1st).", "", "4/7", 4, "7 remain: 4 red, 3 blue. 4/7.", []),
    mcq("y9-cndp-m6", "Two events with P(A∩B) = 0 are described as:", "A", ["mutually exclusive", "independent", "conditional", "exhaustive"], 2, "Mutually exclusive events cannot both occur."),
    mcq("y9-cndp-m7", "'A or B, but not both' describes:", "B", ["inclusive or", "exclusive or", "conditional probability", "mutually exclusive events"], 3, "Exclusive or excludes the case where both occur."),
    ans("y9-cndp-m8", "P(A∩B) = 3/20 and P(A) = 3/5. Find P(B|A) as a fraction in simplest form.", "P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}", "1/4", 4, "(3/20) ÷ (3/5) = 15/60 = 1/4.", ["15/60"]),
    ans("y9-cndp-m9", "Two fair coins are tossed. Find P(at least one head).", "1-P(TT)", "3/4", 3, "1 − 1/4 = 3/4.", fr(3, 4)),
    mcq("y9-cndp-m10", "Two events A and B have P(A) = 0.6, P(B) = 0.5, and P(A∩B) = 0.3. Find P(A|B).", "C", ["0.5", "0.18", "0.6", "0.3"], 4, "P(A|B) = 0.3/0.5 = 0.6. Since P(A|B) = P(A), A and B are also independent."),
  ],
  masteryQuizPool: [
    ans("y9-cndp-p1", "P(A∩B) = 0.21, P(B) = 0.35. Find P(A|B).", "", "0.6", 3, "0.21 / 0.35 = 0.6.", [".6"]),
    ans("y9-cndp-p2", "P(A|B) = 0.5, P(B) = 0.8. Find P(A∩B).", "", "0.4", 3, "0.5 × 0.8 = 0.4.", [".4"]),
    mcq("y9-cndp-p3", "P(A) = 0.4 and P(A|B) = 0.4. What can we conclude?", "C", ["A and B are mutually exclusive", "A and B are dependent", "A and B are independent", "P(B) = 0"], 3, "P(A|B) = P(A) means independence."),
    ans("y9-cndp-p4", "A bag has 6 red and 4 blue marbles. One is drawn (red) and not replaced. Find P(red on 2nd | red on 1st).", "", "5/9", 4, "9 remain: 5 red, 4 blue. 5/9.", []),
    ans("y9-cndp-p5", "Two fair coins are tossed. Find P(at least one head).", "", "3/4", 3, "1 − 1/4 = 3/4.", fr(3, 4)),
    ans("y9-cndp-p6", "Three fair coins are tossed. Find P(at most one head).", "", "1/2", 4, "P(0 heads) + P(1 head) = 1/8 + 3/8 = 1/2.", fr(1, 2)),
    mcq("y9-cndp-p7", "'A or B, but not both' describes:", "B", ["inclusive or", "exclusive or", "conditional probability", "mutually exclusive events"], 3, "Exclusive or excludes both occurring."),
    ans("y9-cndp-p8", "P(A) = 0.5, P(B) = 0.3, P(A∩B) = 0.1. Find P(A xor B) — A or B but not both.", "", "0.6", 4, "0.5 + 0.3 − 2(0.1) = 0.6.", [".6"]),
    mcq("y9-cndp-p9", "Two events with P(A∩B) = 0 are described as:", "A", ["mutually exclusive", "independent", "conditional", "exhaustive"], 2, "Mutually exclusive events cannot both occur."),
    { ...ans("y9-cndp-p10", "The Venn diagram below shows 45 people: A only = 12, B only = 18, A∩B = 9, neither = 6. Find P(A|B).", "", "1/3", 4, "n(B) = 27. P(A|B) = 9/27 = 1/3.", ["9/27"]), vennDiagram: { description: "Venn diagram of 45 people. A only = 12, A∩B = 9, B only = 18, neither = 6.", setALabel: "A", setBLabel: "B", aOnly: 12, intersection: 9, bOnly: 18, neither: 6, total: 45, showCounts: true } },
  ],
  commonMistakes: [
    { mistake: "Confusing P(A|B) with P(B|A): assuming they are equal.", fix: "P(A|B) and P(B|A) are generally different. P(A|B) zooms into B; P(B|A) zooms into A." },
    { mistake: "Using the grand total instead of n(B) in the denominator when computing P(A|B).", fix: "The denominator of P(A|B) is P(B) (or n(B)), not the grand total." },
    { mistake: "Confusing 'mutually exclusive' with 'independent'.", fix: "Mutually exclusive means P(A∩B) = 0 — they cannot both occur. Independent means P(A|B) = P(A) — they do not influence each other." },
    { mistake: "Subtracting the overlap only once when finding 'exclusive or'.", fix: "Exclusive or removes the overlap completely: P(A xor B) = P(A) + P(B) − 2P(A∩B), not just P(A∪B)." },
  ],
  masteryPassMark: 0.8,
};

// ── gambling-awareness (core) — applied extension of MA5-PRO-C-01 / MA4-PRO-C-01 ──────
// No dedicated NESA content dot point exists for gambling; this lesson applies expected
// value, long-run relative frequency and the law of large numbers (already taught in this
// unit) to poker machines and loot boxes as a critical-numeracy capstone.
const gamblingAwareness: Partial<ExplicitLesson> = {
  description: "Apply expected value and long-run probability to critically examine poker machines and loot boxes.",
  learningIntention: "Use expected value and the law of large numbers to explain why games of chance such as poker machines and loot boxes are structured to profit the operator over time.",
  successCriteria: [
    "Calculate an expected value (or expected loss) for a simple game using probabilities and payouts.",
    "Explain why a negative expected value guarantees the operator profits in the long run (the 'house edge').",
    "Explain why long-run relative frequency converges to the theoretical prediction (law of large numbers) as trials increase.",
    "Critically evaluate the probability structure of poker machines and loot boxes.",
  ],
  teaching: {
    paragraphs: [
      "Every legal poker machine and loot box is built on the same mathematics used throughout this unit: theoretical probability. The difference is that the numbers are deliberately set up so that, over many trials, the operator profits and the player loses on average — even though almost every individual player hopes to win.",
      "EXPECTED VALUE combines every possible outcome with its probability and its payout: multiply each outcome's value by its probability, then add the results. A fair coin-flip game paying $2 for heads and $0 for tails has expected value E = 0.5×2 + 0.5×0 = $1 — exactly what you'd need to pay to break even.",
      "Poker machines are programmed with a fixed RETURN TO PLAYER (RTP), typically 85–92% in Australia. If the RTP is 88%, the expected value of every dollar bet is $0.88 — an expected loss of 12 cents per dollar. This loss is small on any single spin, which is exactly why it feels harmless, but it compounds over hundreds of spins in a session.",
      "This is the LAW OF LARGE NUMBERS at work: the more trials (spins, tosses, hands), the closer the actual relative frequency of winning gets to the theoretical probability, and the more certainly the small expected loss on every dollar accumulates into a real loss overall. The house does not need to win every spin — it only needs the probabilities on its side and enough spins.",
      "Poker machines also use VARIABLE RATIO REINFORCEMENT: wins arrive after an unpredictable number of losses, the same reward pattern that strongly encourages repeated play.",
      "LOOT BOXES in video games use the same probability structure: a randomised prize with a published (or hidden) probability, paid for with real money, where rare high-value items have deliberately tiny probabilities. Several countries now regulate loot boxes as a form of gambling for exactly this reason — the mathematics is identical to a poker machine, even without a cash payout.",
    ],
    latexBlocks: [
      "E(X)=\\sum P(\\text{outcome})\\times\\text{value of outcome}",
      "\\text{expected loss per \\$1}=1-\\text{RTP}",
      "\\text{as trials}\\to\\infty,\\ \\text{relative frequency}\\to\\text{theoretical probability}",
    ],
  },
  workedExamples: [
    {
      title: "Expected value of a simple game",
      questionLatex: "\\text{A game costs \\$5 to play. You win \\$20 with probability }\\tfrac{1}{10}\\text{, otherwise nothing.}\\\\\\text{Find the expected value, and decide whether the game favours the player.}",
      dataTableDiagram: {
        description: "Payout table for the game: winning ($20) has probability 1/10; losing ($0) has probability 9/10.",
        columnHeaders: ["Outcome", "Probability", "Payout"],
        values: [
          ["Win", "1/10", "$20"],
          ["Lose", "9/10", "$0"],
        ],
      },
      steps: [{ explanation: "Multiply each outcome's value by its probability and add.", latex: "E(X)=\\tfrac{1}{10}\\times20+\\tfrac{9}{10}\\times0" }, { explanation: "Compare with the $5 cost.", latex: "E(X)=2 < 5" }],
      finalAnswerLatex: "\\text{Expected value \\$2; expected loss \\$3 per game — the game favours the operator.}",
    },
    { title: "Poker machine return to player", questionLatex: "\\text{A poker machine has an RTP of 90\\%. Find the expected loss for every \\$200 fed into the machine.}", steps: [{ explanation: "Expected loss per $1 = 1 − RTP.", latex: "1-0.90=0.10" }, { explanation: "Multiply by the total bet.", latex: "200\\times0.10" }], finalAnswerLatex: "\\$20" },
    { title: "Long-run certainty from the law of large numbers", questionLatex: "\\text{A poker machine has RTP 88\\% (expected loss 12 cents per \\$1). Estimate the expected loss}\\\\\\text{after betting \\$50 total, and explain why this estimate becomes more reliable over a longer session.}", steps: [{ explanation: "Multiply the total bet by the expected loss per dollar.", latex: "50\\times0.12=6" }, { explanation: "More spins mean the observed loss converges toward this theoretical prediction (law of large numbers) — the same idea used to judge simulation reliability.", latex: "\\text{more trials}\\Rightarrow\\text{closer to prediction}" }], finalAnswerLatex: "\\$6\\text{ expected loss, and the estimate becomes more reliable as the session gets longer.}" },
  ] as WorkedExample[],
  guidedPractice: [
    ans("y9-gamb-g1", "A game costs $2 to play. You win $10 with probability 1/5, otherwise nothing. Find the expected value of the payout.", "E(X)=\\tfrac15\\times10", "2", 3, "E(X) = 1/5 × 10 + 4/5 × 0 = 2.", ["$2", "2.00"]),
    ans("y9-gamb-g2", "A poker machine has an RTP of 85%. Find the expected loss for every $1 bet, as a decimal.", "1-0.85", "0.15", 2, "Expected loss = 1 − RTP = 1 − 0.85 = 0.15, i.e. 15 cents per dollar.", ["0.15"]),
    mcq("y9-gamb-g3", "Why does a poker machine's operator profit in the long run even though any single spin could pay out generously?", "B", ["Because every spin is guaranteed to lose", "Because the RTP is below 100%, so the expected value is negative for the player over many spins", "Because the machine only pays out once per day", "Because probability does not apply to poker machines"], 3, "A negative expected value per spin compounds over many spins, by the law of large numbers."),
    ans("y9-gamb-g4", "A poker machine has an RTP of 92%. Find the expected loss for every $100 bet.", "100\\times(1-0.92)", "8", 3, "Expected loss per $1 is 0.08, so for $100: 100 × 0.08 = $8.", ["$8", "8.00"]),
  ],
  independentPractice: [
    ans("y9-gamb-i1", "A game costs $3 to play. You win $15 with probability 1/6, otherwise nothing. Find the expected value of the payout.", "", "2.5", 3, "E(X) = 1/6 × 15 = 2.5.", ["$2.50", "5/2"]),
    mcq("y9-gamb-i2", "Compared to the expected value of $2.50 found above, is this a fair game if it costs $3 to play?", "B", ["Yes, because the top prize is large", "No, because the expected value ($2.50) is less than the cost to play ($3)", "Yes, because probability guarantees a win eventually", "Cannot be determined"], 3, "The expected value is below the cost, so the game favours the operator."),
    ans("y9-gamb-i3", "A poker machine has an RTP of 87%. Find the expected loss for every $250 bet across a session.", "", "32.5", 4, "Expected loss per $1 = 1 − 0.87 = 0.13. For $250: 250 × 0.13 = 32.5.", ["$32.50"]),
    mcq("y9-gamb-i4", "A loot box has a 2% chance of a 'rare' item worth about $50 in trades, and otherwise gives an item worth about $1. The loot box costs $5. Which statement is best supported by expected value?", "B", ["The loot box is clearly worth buying because rare items are valuable", "E(X) = 0.02×50 + 0.98×1 ≈ 1.98, which is less than the $5 cost, so it has a negative expected value for the buyer", "Loot boxes always have positive expected value", "Expected value cannot be applied to loot boxes"], 4, "E(X) = 1 + 0.98 = 1.98, well below the $5 cost."),
    ans("y9-gamb-i5", "A game has expected value $4 and costs $6 to play. Find the expected loss per play.", "", "2", 3, "Expected loss = cost − expected value = 6 − 4 = 2.", ["$2", "2.00"]),
  ],
  masteryQuiz: [
    ans("y9-gamb-m1", "A game costs $1 to play. You win $8 with probability 1/10, otherwise nothing. Find the expected value of the payout.", "", "0.8", 3, "1/10 × 8 = 0.8.", [".8"]),
    mcq("y9-gamb-m2", "What does a poker machine's 'Return to Player' (RTP) of 88% mean?", "C", ["The player wins 88% of the time", "The machine returns 88% of its profits to charity", "On average, 88 cents is returned for every $1 bet, over many spins", "The machine has an 88% chance of paying the jackpot"], 2, "RTP is a long-run average return per dollar bet."),
    ans("y9-gamb-m3", "A poker machine has an RTP of 91%. Find the expected loss per $1 bet.", "", "0.09", 2, "1 − 0.91 = 0.09.", []),
    ans("y9-gamb-m4", "Using an RTP of 91%, find the expected loss on a $300 bet across a session.", "", "27", 3, "300 × 0.09 = 27.", []),
    mcq("y9-gamb-m5", "Why is the 'law of large numbers' relevant to gambling losses?", "B", ["It guarantees a player will eventually win big", "It means the actual proportion lost gets closer to the expected (theoretical) loss the more spins are played", "It means the odds improve after a losing streak", "It only applies to dice, not poker machines"], 3, "More trials make the observed loss converge toward the theoretical prediction."),
    ans("y9-gamb-m6", "A loot box costs $4. It gives a common item worth $0.50 with probability 0.95, and a rare item worth $40 with probability 0.05. Find the expected value.", "", "2.475", 4, "E(X) = 0.95×0.5 + 0.05×40 = 0.475 + 2 = 2.475.", ["2.48", "$2.475"]),
    mcq("y9-gamb-m7", "Based on the previous question (expected value ≈ $2.48, cost $4), what can be concluded?", "B", ["The loot box is a fair trade", "On average, buyers lose about $1.53 per loot box, since the expected value is well below the $4 cost", "Loot boxes always return more than they cost", "The rare item's probability makes the loot box worthwhile"], 4, "$4 − $2.48 ≈ $1.53 expected loss per loot box."),
    ans("y9-gamb-m8", "A game has an expected value of $3.20 and costs $5 to play. Find the expected loss per play.", "", "1.8", 3, "5 − 3.2 = 1.8.", []),
    mcq("y9-gamb-m9", "'Variable ratio reinforcement' describes a reward pattern where:", "A", ["Wins happen after an unpredictable number of attempts, which strongly encourages repeated play", "Wins happen at fixed, predictable intervals", "Every attempt wins the same small amount", "Losses only occur on the first attempt"], 3, "Unpredictable reward timing is strongly reinforcing."),
    mcq("y9-gamb-m10", "Which statement best explains why loot boxes are compared to poker machines mathematically?", "C", ["Both always have a positive expected value for the buyer/player", "Neither involves probability", "Both involve paying money for a randomised outcome with a probability distribution that favours the operator/seller", "Loot boxes have no real-world cost"], 3, "Both are randomised-payout systems with a built-in expected loss for the buyer."),
  ],
  masteryQuizPool: [
    ans("y9-gamb-p1", "A poker machine has RTP 89%. Find the expected loss per $1 bet.", "", "0.11", 2, "1 − 0.89 = 0.11.", []),
    ans("y9-gamb-p2", "Using RTP 89%, find the expected loss on a $150 bet.", "", "16.5", 3, "150 × 0.11 = 16.5.", []),
    ans("y9-gamb-p3", "A game costs $10. It pays $100 with probability 1/20, otherwise nothing. Find the expected value.", "", "5", 3, "1/20 × 100 = 5.", []),
    mcq("y9-gamb-p4", "In the previous question (E(X) = $5, cost $10), is the game favourable to the player?", "B", ["Yes", "No — the expected value is half the cost, so the player loses $5 on average per play", "It is exactly fair", "Cannot be determined"], 3, "The expected value is well below the cost."),
    ans("y9-gamb-p5", "A loot box costs $6, pays a $60 item with probability 0.03 and a $1 item otherwise. Find the expected value.", "", "2.77", 4, "0.03×60 + 0.97×1 = 1.8 + 0.97 = 2.77.", []),
    mcq("y9-gamb-p6", "Why do casinos and poker machine operators not need to win every single spin to guarantee profit?", "B", ["They don't actually need probability to profit", "A small negative expected value per spin, repeated over many spins, becomes an almost certain loss for players collectively (law of large numbers)", "Every player eventually wins the same amount", "RTP applies only to the first 10 spins"], 4, "The law of large numbers makes the total outcome predictable over many trials."),
    ans("y9-gamb-p7", "A game has expected value $7.50 and costs $9. Find the expected loss per play.", "", "1.5", 3, "9 − 7.5 = 1.5.", []),
    mcq("y9-gamb-p8", "A friend says 'I've lost the last 8 spins, so I'm due for a win.' What is the mathematical error?", "A", ["Each spin is an independent event; the machine has no memory of past spins, so the probability of winning does not change", "They are correct — probability guarantees the next spin wins", "Independent events must alternate between wins and losses", "RTP increases after a losing streak"], 4, "This is the gambler's fallacy — independent trials have no memory."),
    ans("y9-gamb-p9", "A poker machine has RTP 93%. Find the expected loss on a $500 bet.", "", "35", 3, "500 × 0.07 = 35.", []),
    mcq("y9-gamb-p10", "What is the key mathematical similarity between a loot box and a poker machine?", "A", ["Both pay money for a randomised outcome governed by a probability distribution with a built-in expected loss for the buyer", "Loot boxes have no probabilities", "Poker machines don't use RTP", "Both are risk-free"], 3, "Both share the same expected-value structure."),
  ],
  commonMistakes: [
    { mistake: "Believing a machine is 'due' for a win after a losing streak (the gambler's fallacy).", fix: "Each spin/loot box is typically independent — past results don't change future probabilities." },
    { mistake: "Confusing RTP with the chance of winning on any one spin.", fix: "RTP is a long-run AVERAGE return per dollar, not the probability of winning a specific spin." },
    { mistake: "Thinking a small expected loss per dollar is harmless.", fix: "Expected loss compounds with every dollar bet — the law of large numbers makes the total loss increasingly predictable over a session." },
    { mistake: "Assuming expected value guarantees the outcome of any single play.", fix: "Expected value is a long-run average; any individual outcome can differ substantially from it." },
  ],
  masteryPassMark: 0.8,
};

// ── data-and-sampling (path) — untouched, out of scope for this rework ────────────────
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
  "tree-diagrams-multistage-events": treeDiagramsMultistage,
  "dependent-and-independent-events": dependentIndependentEvents,
  "probability-simulations": probabilitySimulations,
  "conditional-probability": conditionalProbabilityLesson,
  "gambling-awareness": gamblingAwareness,
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
