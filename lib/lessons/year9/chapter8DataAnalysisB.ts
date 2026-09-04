// Year 9 — Chapter 8 (Probability & Data Analysis), DATA rework, path lessons:
// data-collection, misleading-graphs, statistical-investigation.
// NESA Mathematics K-10 (2022): data-collection draws on Stage 4 MA4-DAT-C-02 (census,
// sample, bias — review) plus Stage 5 Data Analysis C / MA5-DAT-P-01 ("ethical and
// efficient methods for gathering and organising data"). misleading-graphs draws on Stage 4
// MA4-DAT-C-01 ("explain why a given graphical representation can lead to a
// misinterpretation of data") plus MA5-DAT-P-01 ("critically review surveys, polls and
// media reports for bias and/or misrepresentation... persuasive language"). statistical-
// investigation is MA5-DAT-P-01's plan/conduct focus area in full: aim, hypothesis, ethical
// and efficient data gathering, and a report with multiple data visualisations. Replaces
// the `data-and-sampling` lesson (see docs/migrations/Y9-data-rework-slug-map.md).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Think carefully about the method, data or claim described.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think carefully about the method, data or claim described.", explanation };
}

// ── data-collection (path) — Stage 4 review + MA5-DAT-P-01 ────────────────────────────
const dataCollection: Partial<ExplicitLesson> = {
  description: "Distinguish population from sample, identify sampling methods and bias, and collect data ethically and efficiently.",
  learningIntention: "Choose and evaluate methods for collecting data that are representative, ethical and efficient.",
  successCriteria: [
    "Distinguish a population from a sample, and know when a census is used.",
    "Identify and describe sampling methods (random, systematic, stratified) and why randomness helps reduce bias.",
    "Recognise sources of bias in data collection.",
    "Explain what makes data collection ethical and efficient.",
  ],
  teaching: {
    paragraphs: [
      "A POPULATION is the WHOLE group being studied; a SAMPLE is a PART of it chosen to represent the population. Studying every member of the population is a CENSUS — accurate, but often expensive, slow or impossible for large populations.",
      "A good sample should be REPRESENTATIVE of the population. RANDOM sampling (every member equally likely to be chosen) is the simplest way to reduce bias. SYSTEMATIC sampling selects every nth member from a list (e.g. every 10th name); STRATIFIED sampling divides the population into groups (strata) — such as year levels — and samples proportionally from each group, which is useful when the population has distinct subgroups.",
      "BIAS occurs when a sample does not fairly represent the population — for example, surveying only friends, using a leading question, or relying on a voluntary online poll where only strongly-opinionated people respond.",
      "Ethical data collection respects participants: get informed consent, keep responses confidential where appropriate, and ask fair, non-leading questions. Efficient data collection balances accuracy against the time, cost and effort of gathering it — which is why samples are usually preferred over a census for large populations.",
      "Sample sizes can be calculated directly: a '1-in-n' sample of a population divides the population by n; a percentage sample multiplies the population by that percentage; a stratified sample keeps each group's share of the sample proportional to its share of the population.",
    ],
    latexBlocks: ["\\text{sample} \\subset \\text{population}", "\\text{census} = \\text{whole population}"],
  },
  workedExamples: [
    { title: "Population vs sample", questionLatex: "\\text{A school has 800 students. A researcher surveys 50 randomly chosen students.}\\\\\\text{Identify the population and the sample.}", steps: [{ explanation: "The population is everyone the study is about; the sample is the part actually surveyed." }], finalAnswerLatex: "\\text{Population: all 800 students. Sample: the 50 students surveyed.}" },
    { title: "Choose a sampling method", questionLatex: "\\text{A school wants a sample that fairly represents each year group (7–12), which have}\\\\\\text{different sizes. Which method suits this best?}", steps: [{ explanation: "Sampling proportionally from each distinct subgroup (year group) is stratified sampling." }], finalAnswerLatex: "\\text{Stratified sampling — sample proportionally from each year group.}" },
    { title: "Sample size", questionLatex: "\\text{Find a 1-in-10 sample of 500 people.}", steps: [{ explanation: "Divide the population by 10.", latex: "500\\div10" }], finalAnswerLatex: "50" },
  ],
  guidedPractice: [
    mcq("y9-dcol-g1", "A population is:", "A", ["the whole group of interest", "a small part", "the average", "a random number"], 2, "The population is the entire group being studied."),
    mcq("y9-dcol-g2", "A sample is:", "B", ["the whole group", "a part of the population", "the largest value", "a probability"], 2, "A sample is a part of the population."),
    ans("y9-dcol-g3", "How many people are in a 1-in-10 sample of 500?", "", "50", 2, "500 ÷ 10 = 50."),
    mcq("y9-dcol-g4", "Selecting every 20th name from an alphabetical list of the population is an example of:", "C", ["random sampling", "stratified sampling", "systematic sampling", "a census"], 3, "Systematic sampling selects at a fixed, regular interval."),
  ],
  independentPractice: [
    mcq("y9-dcol-i1", "A census means surveying:", "A", ["the whole population", "a small sample", "only volunteers", "only adults"], 2, "A census covers the whole population."),
    ans("y9-dcol-i2", "How many people are in a 1-in-20 sample of 1000 people?", "", "50", 2, "1000 ÷ 20 = 50."),
    mcq("y9-dcol-i3", "A school has three times as many Year 7 students as Year 12 students. To fairly represent both year groups, which sampling method is most appropriate?", "B", ["Systematic sampling", "Stratified sampling", "Convenience sampling", "Voluntary response sampling"], 3, "Stratified sampling samples proportionally from each subgroup."),
    mcq("y9-dcol-i4", "Surveying only your friends about a school issue is likely to be:", "B", ["unbiased", "biased", "a census", "random"], 3, "Friends are not a representative cross-section of the population."),
    mcq("y9-dcol-i5", "Which of these is part of collecting data ethically?", "A", ["Getting informed consent from participants", "Using leading questions to get a desired answer", "Publishing individuals' private responses without consent", "Only surveying people who already agree with you"], 2, "Informed consent is a core ethical requirement."),
  ],
  masteryQuiz: [
    mcq("y9-dcol-m1", "The whole group being studied is the:", "A", ["population", "sample", "mean", "outlier"], 2, "The population is the entire group of interest."),
    mcq("y9-dcol-m2", "A part of the population chosen to study is a:", "B", ["census", "sample", "mode", "range"], 2, "A sample is a part of the population."),
    ans("y9-dcol-m3", "How many people are in a 1-in-10 sample of 800?", "", "80", 2, "800 ÷ 10 = 80."),
    mcq("y9-dcol-m4", "A census surveys:", "C", ["a sample", "volunteers", "the whole population", "every tenth person"], 2, "A census covers the whole population."),
    mcq("y9-dcol-m5", "Random sampling is used to:", "A", ["reduce bias", "increase bias", "save no time", "pick the mean"], 2, "Random sampling helps make a sample representative."),
    ans("y9-dcol-m6", "A 1-in-25 sample of 1000 is how many?", "", "40", 3, "1000 ÷ 25 = 40."),
    mcq("y9-dcol-m7", "Only surveying people leaving a gym about exercise habits is:", "B", ["representative", "biased", "a census", "impossible"], 3, "This group is not representative of the wider population."),
    ans("y9-dcol-m8", "A population of 400 is split into two strata of 250 and 150. A stratified sample of 40 keeps sample sizes proportional to each stratum's size. How many should come from the stratum of 150?", "", "15", 4, "150/400 × 40 = 15."),
    mcq("y9-dcol-m9", "Which is most likely to be unbiased?", "A", ["a random sample", "asking only friends", "asking only one class", "a self-selected online poll"], 3, "A random sample gives every member an equal chance of selection."),
    mcq("y9-dcol-m10", "Selecting every 5th customer who enters a shop is an example of:", "C", ["stratified sampling", "voluntary sampling", "systematic sampling", "a census"], 3, "Systematic sampling selects at a fixed, regular interval."),
  ],
  masteryQuizPool: [
    ans("y9-dcol-p1", "A school of 1200 takes a 1-in-15 sample. How many students?", "", "80", 5, "1200 ÷ 15 = 80."),
    ans("y9-dcol-p2", "A stratified sample takes 10% of each group: 200 boys and 150 girls. How many in total?", "", "35", 5, "0.10 × 350 = 35."),
    mcq("y9-dcol-p3", "A survey about TV habits done only during the day may miss workers, causing:", "B", ["no problem", "sampling bias", "a census", "a larger mean"], 5, "Excluding workers biases the sample."),
    ans("y9-dcol-p4", "A 1-in-50 sample of 5000 is how many?", "", "100", 5, "5000 ÷ 50 = 100."),
    ans("y9-dcol-p5", "A factory checks 2% of 4500 items. How many are checked?", "", "90", 5, "0.02 × 4500 = 90."),
    mcq("y9-dcol-p6", "When is a census preferred over a sample?", "A", ["when the population is small or accuracy is critical", "always", "never", "only for opinions"], 5, "A census suits small populations or when full accuracy matters."),
    ans("y9-dcol-p7", "Stratified sampling: 5% of 600 seniors and 5% of 800 juniors. Total sampled?", "", "70", 5, "0.05 × 1400 = 70."),
    ans("y9-dcol-p8", "A 1-in-8 sample of 2400 is how many?", "", "300", 5, "2400 ÷ 8 = 300."),
    mcq("y9-dcol-p9", "A self-selected online poll is often biased because:", "C", ["it is random", "everyone responds", "only motivated people respond", "it is a census"], 5, "Self-selection skews the sample toward motivated respondents."),
    mcq("y9-dcol-p10", "A researcher wants a sample that reflects age, gender AND suburb across a large city. Which method requires the most careful design?", "B", ["Simple random sampling", "Stratified sampling across multiple categories", "Asking whoever is nearby", "Surveying only one suburb"], 5, "Stratifying across several categories at once needs careful proportional design."),
  ],
  commonMistakes: [
    { mistake: "Confusing sample with population.", fix: "Sample is a part; population is the whole." },
    { mistake: "Thinking any sample is automatically unbiased.", fix: "Only a representative (often random, systematic or stratified) sample avoids bias — a convenient or voluntary sample often does not." },
    { mistake: "Assuming stratified sampling means sampling equally from each group regardless of group size.", fix: "Stratified sampling keeps sample sizes PROPORTIONAL to each group's size in the population." },
    { mistake: "Treating a census as always the best choice.", fix: "A census is thorough but often too costly, slow or impractical — a well-designed sample is usually more efficient." },
  ],
  masteryPassMark: 0.8,
};

// ── misleading-graphs (path) — Stage 4 review + MA5-DAT-P-01 ──────────────────────────
const misleadingGraphs: Partial<ExplicitLesson> = {
  description: "Identify techniques that make graphs misleading, and critically evaluate surveys, polls and media reports for bias or misrepresentation.",
  learningIntention: "Critically evaluate graphs, surveys and media claims for misrepresentation.",
  successCriteria: [
    "Identify common techniques that make a graph misleading (truncated axis, inconsistent scale, 3D distortion, cherry-picked data range).",
    "Explain how a misleading graph can create a false impression of the data.",
    "Critically evaluate a graph, survey or media claim for bias or misrepresentation.",
    "Use the actual underlying data to check whether a graph or claim is accurate.",
  ],
  teaching: {
    paragraphs: [
      "A graph can be technically accurate but still MISLEADING if it's designed, deliberately or carelessly, to exaggerate or downplay a pattern. Common techniques include a TRUNCATED (broken) vertical axis that doesn't start at zero, making small differences look huge; an INCONSISTENT SCALE where equal-looking gaps represent unequal amounts; and 3D or decorative effects that distort how big each bar or slice looks.",
      "Cherry-picking a narrow DATA RANGE — showing only a short time period, or excluding inconvenient data points — can make a trend look stronger, weaker, or entirely different from the full picture.",
      "The same underlying numbers can be shown honestly or dishonestly. Comparing a graph to the ACTUAL DATA (a table of the real values) is the best way to check whether a graph fairly represents it.",
      "Surveys, polls and media reports can also mislead without a single misleading graph: a small or biased sample, a leading question, or persuasive language ('a staggering rise!') can shape a reader's impression well beyond what the data actually supports.",
      "When examining a claim built on data, ask: Does the axis start at zero? Is the scale consistent? Is the full, relevant range of data shown? Was the sample size and method fair? Is the language reporting the finding, or persuading you to feel a certain way about it?",
    ],
    latexBlocks: ["\\text{percentage change}=\\dfrac{\\text{new}-\\text{old}}{\\text{old}}\\times100\\%"],
  },
  workedExamples: [
    { title: "Spot a truncated axis", questionLatex: "\\text{A bar chart's y-axis starts at \\$95{,}000 instead of \\$0, and a \\$2{,}000 rise (from \\$98{,}000}\\\\\\text{to \\$100{,}000) fills most of the chart's height. Why is this misleading?}", steps: [{ explanation: "The real rise is small relative to the total value.", latex: "\\dfrac{2000}{98000}\\times100\\%\\approx2\\%" }], finalAnswerLatex: "\\text{Starting the axis away from zero exaggerates a small (about 2\\%) rise into what looks like a huge jump.}" },
    { title: "Compare a claim to the real data", questionLatex: "\\text{A headline claims 'sales tripled', but actual sales rose from 100 to 150. Check the claim.}", steps: [{ explanation: "Find the real percentage change.", latex: "\\dfrac{150-100}{100}\\times100\\%=50\\%" }], finalAnswerLatex: "\\text{Sales rose by 50\\%, not tripled (which would mean} \\times3\\text{) — the claim exaggerates the data.}" },
    { title: "Critique a survey claim", questionLatex: "\\text{A company surveys 20 of its most loyal customers and reports}\\\\\\text{'95\\% of customers love our product!' What is misleading here?}", steps: [{ explanation: "The sample is small and deliberately chosen from loyal customers, not a representative group." }], finalAnswerLatex: "\\text{The sample (20 loyal customers) is small and biased, so 95\\% can't be generalised to all customers.}" },
  ],
  guidedPractice: [
    mcq("y9-mgraph-g1", "A bar chart's vertical axis starts at 80 instead of 0. What effect does this have?", "B", ["It makes the chart perfectly accurate", "It exaggerates the visual difference between bars", "It has no effect on how the chart looks", "It always makes the chart clearer"], 2, "Starting above zero exaggerates visual differences."),
    mcq("y9-mgraph-g2", "Which of these is a technique that can make a graph misleading?", "D", ["Labelling both axes clearly", "Starting the vertical axis at zero", "Using a consistent scale", "Showing only a short, cherry-picked time period that suits the desired conclusion"], 2, "Cherry-picking a narrow range can distort the impression given."),
    mcq("y9-mgraph-g3", "A company reports 'a staggering 90% approval rating' from a poll of 10 hand-picked employees. What's the main issue?", "C", ["The percentage cannot be calculated from 10 people", "90% is an impossible result", "The sample is too small and not randomly chosen to represent all employees", "Percentages cannot describe approval"], 3, "A small, hand-picked sample is not representative."),
    { ...mcq("y9-mgraph-g4", "The table shows actual profit. A headline claims 'profits have doubled!' Is this accurate?", "A", ["No — profit rose by about 1%, nowhere near doubling", "Yes, exactly accurate", "Yes, because $200,000 is a big number", "Cannot be determined"], 3, "The real change is about 1%, far from doubling."), dataTableDiagram: { description: "Actual company profit: Year 1 = $198,000, Year 2 = $200,000.", columnHeaders: ["Year 1", "Year 2"], rowHeaders: ["Profit"], values: [["$198,000", "$200,000"]] } },
  ],
  independentPractice: [
    mcq("y9-mgraph-i1", "Why can a 3D pie chart be misleading?", "B", ["It always shows the wrong total", "The 3D perspective can distort how large each slice appears compared to the others", "3D charts cannot display percentages", "It hides the axis labels"], 2, "3D perspective distorts apparent slice size."),
    mcq("y9-mgraph-i2", "A graph uses an inconsistent scale, where equal gaps on the axis represent different amounts. What problem does this cause?", "A", ["Readers can misjudge how values compare to each other", "The graph becomes impossible to draw", "The data values change", "It only affects pie charts"], 3, "An inconsistent scale distorts visual comparisons."),
    { ...ans("y9-mgraph-i3", "The table shows actual attendance. A graph's truncated axis makes it look like attendance nearly tripled. Find the actual percentage increase from Monday to Tuesday, to the nearest whole per cent.", "", "4", 4, "Increase = 2 on 48 ≈ 4.2%, which rounds to 4%.", ["4%"]), dataTableDiagram: { description: "Actual attendance: Monday = 48, Tuesday = 50.", columnHeaders: ["Monday", "Tuesday"], rowHeaders: ["Attendance"], values: [[48, 50]] } },
    mcq("y9-mgraph-i4", "A survey asks: 'Don't you agree this excellent new policy should be introduced?' What is the problem with this question?", "C", ["It is too short", "It cannot be answered", "It is a leading question that pushes people toward agreeing", "It only allows numeric answers"], 3, "This is a leading question."),
    mcq("y9-mgraph-i5", "Which is the best way to check whether a graph fairly represents its data?", "A", ["Compare the graph to a table of the actual values", "Assume all graphs are accurate", "Only look at the colours used", "Ignore the axis labels"], 2, "Comparing to the actual data reveals distortion."),
  ],
  masteryQuiz: [
    mcq("y9-mgraph-m1", "A truncated (broken) vertical axis typically:", "B", ["makes differences between bars look smaller than they are", "makes differences between bars look larger than they are", "has no visual effect", "only appears on line graphs"], 2, "Truncating the axis exaggerates visual differences."),
    mcq("y9-mgraph-m2", "Which feature should a fair, non-misleading graph normally have?", "A", ["A vertical axis starting at zero, with a consistent scale", "A vertical axis that starts wherever makes the trend look most dramatic", "No axis labels", "A narrow, cherry-picked data range"], 2, "Fair graphs use a zero-based, consistent scale."),
    { ...ans("y9-mgraph-m3", "The table shows actual website visits. A chart's exaggerated axis makes this look like a huge jump. Find the actual percentage increase.", "", "5", 4, "Increase = 20 on 400 = 5%.", ["5%"]), dataTableDiagram: { description: "Actual website visits: Week 1 = 400, Week 2 = 420.", columnHeaders: ["Week 1", "Week 2"], rowHeaders: ["Visits"], values: [[400, 420]] } },
    mcq("y9-mgraph-m4", "A news report shows only the last 3 days of a 3-month sales decline, making sales look like they're rising. This is an example of:", "C", ["a fair graph", "a stratified sample", "cherry-picking a narrow, misleading data range", "systematic sampling"], 3, "Showing only a favourable slice of the data misrepresents the overall trend."),
    mcq("y9-mgraph-m5", "A poll of 15 self-selected online voters claims to represent a city of 500,000 people. What is the main weakness?", "B", ["The sample size and self-selection method make it unrepresentative", "15 is exactly the right sample size", "Online polls are always accurate", "The city population is irrelevant"], 3, "A tiny, self-selected sample cannot represent the whole city."),
    mcq("y9-mgraph-m6", "Persuasive language such as 'a shocking rise' in a data report is a concern because:", "A", ["it can shape a reader's impression beyond what the data actually shows", "it always makes a claim false", "numbers cannot be described in words", "it is required for all reports"], 3, "Persuasive language can bias impressions beyond the actual data."),
    mcq("y9-mgraph-m7", "Which method best exposes a misleading graph?", "D", ["Trusting the headline", "Ignoring the axis", "Assuming bigger charts are more honest", "Comparing the chart to the real, underlying data values"], 2, "Comparing to the real data is the most reliable check."),
    { ...mcq("y9-mgraph-m8", "The table shows the products' real ratings. A bar chart with a truncated axis makes Product B look about twice as good as Product A. Is this a fair representation?", "B", ["Yes, because B's rating is higher", "No — the truncated axis exaggerates a small, genuine difference into a much larger-looking one", "Yes, because bar charts are always accurate", "No, because the ratings must be equal"], 4, "The truncated axis exaggerates a small real difference."), dataTableDiagram: { description: "Real product ratings: Product A = 4.1/5, Product B = 4.3/5.", columnHeaders: ["Product A", "Product B"], rowHeaders: ["Rating"], values: [["4.1/5", "4.3/5"]] } },
    mcq("y9-mgraph-m9", "A survey's leading question is a problem because:", "C", ["it takes too long to answer", "it can only be used once", "it pushes respondents toward a particular answer, biasing the results", "it always produces exactly 50% agreement"], 3, "Leading questions bias responses."),
    mcq("y9-mgraph-m10", "Which of the following is the clearest sign a graph might be misleading?", "A", ["The axis does not start at zero without a clear reason, exaggerating the visual difference", "The axis is clearly labelled", "The scale is consistent throughout", "The full relevant data range is shown"], 3, "An unexplained non-zero axis is a classic red flag."),
  ],
  masteryQuizPool: [
    mcq("y9-mgraph-p1", "A graph's y-axis jumps from 0 to 90 in one unlabelled gap, then evenly after that. This is an example of:", "B", ["a fair scale", "an inconsistent/misleading scale", "a stratified sample", "a census"], 4, "An unlabelled, inconsistent jump distorts the visual comparison."),
    { ...ans("y9-mgraph-p2", "The table shows actual rainfall. A graph's exaggerated axis makes it look like rainfall doubled. Find the actual percentage increase.", "", "5", 4, "Increase = 2 on 40 = 5%.", ["5%"]), dataTableDiagram: { description: "Actual rainfall: March = 40mm, April = 42mm.", columnHeaders: ["March", "April"], rowHeaders: ["Rainfall (mm)"], values: [[40, 42]] } },
    mcq("y9-mgraph-p3", "Why might a company prefer a truncated axis for its profit chart?", "A", ["To make a small profit increase look much larger and more impressive", "To make the chart more accurate", "To save space only", "Truncated axes have no visual effect"], 3, "A truncated axis can exaggerate a modest increase."),
    mcq("y9-mgraph-p4", "A '9 out of 10 people prefer our product' claim came from asking 10 employees. What's wrong?", "C", ["10 is too small a sample and employees are not representative customers", "Nothing, the maths is correct", "9/10 cannot be expressed as a percentage", "The claim must be true because it's a fraction"], 3, "Employees are not a representative sample of customers."),
    mcq("y9-mgraph-p5", "Cropping a graph to show only the months where sales rose, hiding the months where they fell, is:", "B", ["a fair and complete representation", "a misleading, cherry-picked data range", "a stratified sample", "a systematic sample"], 3, "Hiding unfavourable data misrepresents the trend."),
    mcq("y9-mgraph-p6", "A pie chart drawn in 3D can mislead because:", "A", ["the tilted perspective makes slices in the front appear larger than slices of the same size at the back", "pie charts cannot show percentages", "3D charts always add up to more than 100%", "it removes the need for labels"], 3, "3D perspective distorts apparent slice size."),
    { ...mcq("y9-mgraph-p7", "The table shows real exam pass rates. A truncated-axis chart makes School B look dramatically better. What is the actual difference?", "B", ["30 percentage points", "3 percentage points", "50 percentage points", "0 percentage points"], 3, "85 − 82 = 3 percentage points."), dataTableDiagram: { description: "Real exam pass rates: School A = 82%, School B = 85%.", columnHeaders: ["School A", "School B"], rowHeaders: ["Pass rate"], values: [["82%", "85%"]] } },
    mcq("y9-mgraph-p8", "Which question is least likely to be leading?", "D", ["Don't you think this policy is a disaster?", "Wouldn't you agree our product is the best?", "Isn't this the greatest movie ever made?", "How would you rate this product, from poor to excellent?"], 3, "This question is neutral and does not push toward an answer."),
    mcq("y9-mgraph-p9", "A report says 'a staggering increase' without giving the actual numbers. What should a careful reader do?", "A", ["Look for the actual data and calculate the real percentage change themselves", "Accept the claim immediately", "Assume the increase is exactly 100%", "Ignore the report entirely without checking anything"], 3, "Checking the real numbers is the careful response."),
    mcq("y9-mgraph-p10", "What is the best defence against being misled by a graph or statistic?", "C", ["Trusting bold headlines", "Avoiding all graphs entirely", "Checking the axis, scale, data range, sample and language critically", "Only reading the title of the report"], 2, "Critical checking of these features is the best defence."),
  ],
  commonMistakes: [
    { mistake: "Assuming every graph fairly represents its data just because it looks professional.", fix: "Check the axis (does it start at 0?), scale, and data range before trusting the visual impression." },
    { mistake: "Judging a claim by its headline language instead of the actual numbers.", fix: "Calculate the real percentage or amount from the underlying data before accepting a persuasive claim." },
    { mistake: "Assuming a large-sounding sample (like '1000 people') is automatically unbiased.", fix: "Check HOW the sample was chosen, not just its size — a large but self-selected or leading-question sample can still be biased." },
    { mistake: "Treating 3D or decorative chart effects as neutral styling choices.", fix: "3D and similar effects can visually distort how big a bar or slice appears relative to the others — treat them as a red flag." },
  ],
  masteryPassMark: 0.8,
};

// ── statistical-investigation (path) — MA5-DAT-P-01 ────────────────────────────────────
const statisticalInvestigation: Partial<ExplicitLesson> = {
  description: "Plan a statistical inquiry: write an aim and hypothesis, collect data ethically and efficiently, choose a suitable display, and report a well-supported conclusion.",
  learningIntention: "Plan, conduct and report a statistical investigation into a question of interest.",
  successCriteria: [
    "Write a clear aim and testable hypothesis for a question of interest.",
    "Choose an appropriate, ethical and efficient method to gather and organise data for an investigation.",
    "Choose a suitable graph or display to visualise a given type of data within a report.",
    "Evaluate whether an investigation's report provides a clear, well-supported conclusion.",
  ],
  teaching: {
    paragraphs: [
      "A STATISTICAL INVESTIGATION follows a clear process: start with a QUESTION of interest, turn it into an AIM (what you're trying to find out) and a HYPOTHESIS (a testable prediction about what you expect to find, based on your question).",
      "Next, PLAN how to gather data: decide what to measure, who or what to sample (and how, to avoid bias), and collect the data ethically and efficiently — no more data than needed, with fair methods and, where relevant, participants' informed consent.",
      "ORGANISE the data (in a table, spreadsheet or frequency table) before choosing how to VISUALISE it. The type of graph should suit the type of data — for example, a scatter plot for bivariate numerical data, a column graph for comparing categories, or a line graph for change over time.",
      "A good REPORT presents multiple visualisations that provide genuine insight, states a clear conclusion linking back to the original aim and hypothesis, and honestly notes any limitations — such as sample size, possible bias, or the reliability of any predictions made.",
    ],
    latexBlocks: ["\\text{question}\\to\\text{aim and hypothesis}\\to\\text{collect data}\\to\\text{visualise}\\to\\text{conclude}"],
  },
  workedExamples: [
    { title: "Write an aim and hypothesis", questionLatex: "\\text{A student wonders whether students who walk to school arrive more on time than those}\\\\\\text{who are driven. Write a suitable aim and hypothesis.}", steps: [{ explanation: "The aim states what's being investigated; the hypothesis makes a specific, testable prediction." }], finalAnswerLatex: "\\text{Aim: investigate whether travel method is associated with arrival punctuality.}\\\\\\text{Hypothesis: students who walk are more likely to arrive on time than those who are driven.}" },
    { title: "Choose a data-collection method", questionLatex: "\\text{The investigation above needs data from a large school of 1000 students. What}\\\\\\text{data-collection approach would be ethical and efficient?}", steps: [{ explanation: "A full census of 1000 students is inefficient; a well-chosen sample is preferable." }], finalAnswerLatex: "\\text{A random or stratified sample (e.g. proportional across year groups), not a full census.}" },
    { title: "Choose a visualisation", questionLatex: "\\text{The investigation records each student's travel time (minutes) and arrival punctuality}\\\\\\text{(minutes early/late) — two numerical variables. Which display best shows a relationship?}", steps: [{ explanation: "Two numerical variables recorded per subject is bivariate data." }], finalAnswerLatex: "\\text{A scatter plot, since it displays bivariate numerical data and reveals any association.}" },
  ],
  guidedPractice: [
    mcq("y9-sinv-g1", "Which of these is a well-written, testable hypothesis?", "C", ["I wonder about school data", "Students who study more hours will tend to score higher on tests", "Data is interesting", "Students like different subjects"], 2, "This makes a specific, testable prediction."),
    mcq("y9-sinv-g2", "A survey needs responses from a school of 2000 students. Which approach is most efficient while still being representative?", "B", ["A full census of all 2000 students", "A stratified random sample across year groups", "Only surveying the researcher's own class", "Surveying whoever replies first online"], 3, "A stratified sample balances representativeness and efficiency."),
    mcq("y9-sinv-g3", "An investigation collects each person's favourite music genre (a category). Which display suits this data best?", "A", ["A column graph", "A scatter plot", "A line of best fit", "A line graph of change over time"], 2, "Categorical data suits a column graph."),
    mcq("y9-sinv-g4", "A good statistical report should:", "D", ["hide any data that doesn't support the hypothesis", "avoid stating a clear conclusion", "use as few visualisations as possible", "state a clear conclusion linked to the original aim, and note any limitations"], 2, "A good report is honest, clear and linked back to the aim."),
  ],
  independentPractice: [
    mcq("y9-sinv-i1", "Which question of interest could form the basis of a good statistical investigation?", "B", ["What is my favourite colour?", "Is there an association between hours of sleep and reaction time in Year 9 students?", "What day is it today?", "How many letters are in the word 'statistics'?"], 2, "This is a genuine, investigable question about a relationship."),
    mcq("y9-sinv-i2", "An investigation collects temperature readings once a day for a year. Which display best shows change over the year?", "C", ["A pie chart", "A scatter plot", "A line graph", "A stem-and-leaf plot"], 2, "A line graph best shows change over time."),
    mcq("y9-sinv-i3", "A researcher wants to compare average screen time between Year 7 and Year 12 students, who make up very different-sized year groups. Which sampling approach is most appropriate?", "A", ["Stratified sampling, proportional to each year group's size", "Surveying only Year 7", "Surveying only Year 12", "A leading-question survey"], 3, "Stratified sampling suits differently-sized subgroups."),
    mcq("y9-sinv-i4", "Which of these best reflects ethical data collection practice in an investigation?", "B", ["Publishing individual participants' names and answers without permission", "Getting informed consent and keeping individual responses confidential", "Only including data that supports the hypothesis", "Guessing missing data values"], 2, "Informed consent and confidentiality are core ethical practices."),
    mcq("y9-sinv-i5", "A report concludes 'more study definitely causes higher marks' based only on an observed association in a scatter plot. What is the issue?", "C", ["The scatter plot cannot show any trend", "This is an appropriate, fully-justified conclusion", "An observed association alone does not prove causation — the report overstates its finding", "Scatter plots cannot be used in reports"], 4, "Association alone does not establish causation."),
  ],
  masteryQuiz: [
    mcq("y9-sinv-m1", "The FIRST step in a statistical investigation is usually to:", "A", ["form a clear question of interest and turn it into an aim/hypothesis", "draw a graph", "calculate the mean", "publish the report"], 2, "Investigations begin with a clear question, aim and hypothesis."),
    mcq("y9-sinv-m2", "Which is a testable hypothesis (rather than just a question)?", "B", ["Do plants grow better with more sunlight?", "Plants given more sunlight will grow taller than plants given less sunlight", "Plants are interesting", "Sunlight exists"], 2, "This makes a specific, testable prediction."),
    mcq("y9-sinv-m3", "An investigation studies each employee's years of experience and their salary — two numerical variables. Which display suits this best?", "C", ["A sector graph", "A column graph", "A scatter plot", "A stem-and-leaf plot alone"], 2, "Bivariate numerical data suits a scatter plot."),
    mcq("y9-sinv-m4", "Which is an example of an ethical concern in data collection?", "D", ["Choosing a random sample", "Labelling axes clearly", "Using a large sample size", "Collecting personal data without participants' consent"], 3, "Collecting data without consent raises ethical concerns."),
    mcq("y9-sinv-m5", "A good report about an investigation should include:", "A", ["a conclusion that clearly links back to the original aim and hypothesis", "only the data that supports the researcher's opinion", "as many decorative graph effects as possible", "no mention of the method used"], 2, "A good report links its conclusion to the original aim."),
    mcq("y9-sinv-m6", "Which sampling method suits a population made up of clearly different subgroups (e.g. year levels)?", "B", ["Convenience sampling", "Stratified sampling", "Voluntary response sampling", "No sampling — always use a census"], 3, "Stratified sampling suits distinct subgroups."),
    mcq("y9-sinv-m7", "A student investigating 'does more sleep improve concentration' surveys only their five closest friends. What is the main weakness?", "C", ["Sleep cannot be measured", "The sample is too small and not representative of a wider population", "Concentration cannot be measured", "Nothing — five is always enough"], 3, "A small, non-random friend group is not representative."),
    mcq("y9-sinv-m8", "Which of these is an appropriately cautious conclusion for an investigation based on a scatter plot association?", "A", ["The data suggests an association between the variables, but does not prove one causes the other", "The data proves one variable definitely causes the other", "No conclusion can ever be drawn from a scatter plot", "The investigation should be abandoned"], 4, "This conclusion is appropriately cautious about causation."),
    mcq("y9-sinv-m9", "'Organising' collected data before visualising it typically means:", "B", ["deleting inconvenient values", "recording it clearly, e.g. in a table or frequency table, so it is ready to graph", "publishing it immediately without checking it", "skipping straight to a conclusion"], 2, "Organising data means preparing it clearly before graphing."),
    mcq("y9-sinv-m10", "A limitation worth noting in a statistical investigation report might be:", "C", ["The report used too many colours", "The graphs were too small", "The sample size was small, so results may not generalise to the wider population", "The investigation had a clear aim"], 3, "A small sample size is a genuine limitation to disclose."),
  ],
  masteryQuizPool: [
    mcq("y9-sinv-p1", "Which is the best next step after collecting raw survey data?", "A", ["Organise it (e.g. in a table) before choosing how to display it", "Immediately publish a conclusion", "Delete the data", "Skip straight to a hypothesis"], 3, "Organising data comes before visualising it."),
    mcq("y9-sinv-p2", "An investigation into 'favourite sport by year group' should compare categories across groups. Which display suits this best?", "B", ["A scatter plot", "A column graph (e.g. grouped or side-by-side)", "A line of best fit", "A single line graph"], 3, "Comparing categories across groups suits a column graph."),
    mcq("y9-sinv-p3", "Which hypothesis is most clearly testable?", "C", ["Music is good", "Some people like loud music", "Students who listen to music while studying will report lower recall on a memory test than those who study in silence", "Studying is important"], 3, "This makes a specific, testable prediction."),
    mcq("y9-sinv-p4", "A researcher only reports the three data points that support their hypothesis, hiding the rest. This is:", "B", ["good, efficient reporting", "a serious ethical problem — selectively hiding data misrepresents the findings", "required practice", "irrelevant to the investigation's quality"], 4, "Selectively hiding data is a serious ethical problem."),
    mcq("y9-sinv-p5", "Which best describes 'efficient' data collection?", "A", ["Gathering enough good-quality data to answer the question, without wasting excessive time or resources", "Collecting as much data as physically possible regardless of relevance", "Always choosing a full census", "Skipping data collection and guessing"], 3, "Efficiency balances sufficiency against cost and effort."),
    mcq("y9-sinv-p6", "An investigation's aim is 'to find out if there is an association between hours of screen time and hours of sleep.' Which hypothesis best matches this aim?", "D", ["Sleep is important for health", "Screens are bad", "Students like using screens", "Students with more screen time will tend to report fewer hours of sleep"], 3, "This is a specific, testable prediction matching the aim."),
    mcq("y9-sinv-p7", "Why should a report state its investigation's limitations honestly?", "B", ["It makes the report longer", "It helps readers judge how much to trust the findings and conclusions", "It is legally required for all school work", "It replaces the need for any data"], 3, "Honest limitations help readers judge trustworthiness."),
    ans("y9-sinv-p8", "A stratified sample of 60 is drawn from a school with 3 year groups in the ratio 2:3:1. How many should come from the group with ratio 3?", "", "30", 5, "Total ratio parts = 2+3+1 = 6; the group with ratio 3 is 3/6 of the sample: 3/6 × 60 = 30."),
    mcq("y9-sinv-p9", "Which best distinguishes an aim from a hypothesis?", "A", ["The aim states what you're investigating; the hypothesis is a specific, testable prediction about the result", "They are exactly the same thing", "The hypothesis always comes before the aim", "An aim can never mention data"], 4, "An aim states the investigation's purpose; a hypothesis predicts the result."),
    mcq("y9-sinv-p10", "A good statistical investigation report typically ends with:", "C", ["no conclusion, to avoid bias", "a conclusion unrelated to the original question", "a conclusion that answers the original question, supported by the data and any limitations", "only a list of raw numbers"], 2, "A good report concludes by answering the original question."),
  ],
  commonMistakes: [
    { mistake: "Writing a vague aim or question instead of a specific, testable hypothesis.", fix: "A hypothesis should make a clear, specific prediction that the data can support or not support." },
    { mistake: "Choosing a data-collection method that's convenient but biased (e.g. friends only, a voluntary online poll).", fix: "Choose a method (random or stratified sampling) that fairly represents the population being studied." },
    { mistake: "Selecting a graph type that doesn't match the data (e.g. a pie chart for two numerical variables).", fix: "Match the display to the data: scatter plots for bivariate numerical data, column graphs for categories, line graphs for change over time." },
    { mistake: "Overstating a conclusion — claiming proof of causation from an observed association.", fix: "State conclusions cautiously: an association supports but does not prove a causal claim, and note any limitations." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "data-collection": dataCollection,
  "misleading-graphs": misleadingGraphs,
  "statistical-investigation": statisticalInvestigation,
};

export function year9Chapter8DataAnalysisBLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
