// Year 10 restructure — Wave 7 (Single Variable & Bivariate Statistics). Authors all remaining
// hidden stubs in Unit 9 (single-variable-bivariate-statistics): collecting-misusing-data (9A),
// review-data-displays (9B), two-way-tables-stats (9C), summary-statistics (9D),
// time-series-data (9G), linear-regression-technology (9J, extending).
// Architecture untouched. Prose uses unicode superscripts (no raw ^ or _). Statistics pedagogy
// = interpretation before calculation, correlation != causation, sampling bias, variability,
// trend vs noise, prediction reliability, interpolation vs extrapolation.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Interpret what the data means first, then calculate.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about what the statistic or display actually tells you.", explanation };
}

// ── 9A Collecting and Misusing Data (path) ─────────────────────────────────────────────
const collectingData: Partial<ExplicitLesson> = {
  description: "Understand populations and samples, sampling methods, and how data and graphs can be misused or biased.",
  learningIntention: "Judge how data is collected and recognise bias before trusting any statistic.",
  successCriteria: ["Distinguish a census (whole population) from a sample.", "Identify random, systematic and stratified sampling.", "Recognise sources of sampling bias.", "Spot misleading graphs and questions."],
  teaching: {
    paragraphs: [
      "Before you calculate anything, ask HOW the data was collected — a statistic from a bad sample is worse than no statistic. The POPULATION is the whole group of interest; a SAMPLE is a part of it. Studying everyone is a CENSUS; studying a part is sampling, used when a census is impractical (too large or costly).",
      "A good sample is REPRESENTATIVE — it looks like the population. RANDOM sampling gives every member an equal chance; SYSTEMATIC takes every k-th member; STRATIFIED draws proportionally from subgroups (e.g. each year level).",
      "BIAS is anything that makes a sample unrepresentative. Surveying only gym members about exercise, asking leading questions, or using a voluntary online poll (which over-represents strong opinions) all bias the result.",
      "Data can also be misused in DISPLAYS: a truncated or broken vertical axis exaggerates small differences, and 3D effects distort proportions. Interpretation comes first — understand the source and the picture before trusting the numbers.",
    ],
    latexBlocks: ["\\text{census} = \\text{whole population};\\ \\text{sample} = \\text{a part}", "\\text{good sample} \\Rightarrow \\text{representative, unbiased}", "\\text{biased sample} \\Rightarrow \\text{misleading conclusions}"],
  },
  workedExamples: [
    { title: "Spotting bias", questionLatex: "\\text{A survey on exercise asks only gym members. Is it biased?}", steps: [{ explanation: "Gym members exercise more than average.", latex: "\\text{Not representative} \\Rightarrow \\text{biased}" }], finalAnswerLatex: "\\text{Yes, biased}" },
    { title: "Census vs sample", questionLatex: "\\text{Surveying every student in a school is a:}", steps: [{ explanation: "The whole population is studied.", latex: "\\text{census}" }], finalAnswerLatex: "\\text{census}" },
    { title: "Sampling method", questionLatex: "\\text{Selecting 10\\% from each year group is which method?}", steps: [{ explanation: "Proportional from subgroups.", latex: "\\text{stratified}" }], finalAnswerLatex: "\\text{stratified}" },
  ],
  guidedPractice: [
    mcq("y10-cmd-g1", "A census surveys the:", "A", ["whole population", "a small sample", "only volunteers", "the easiest group"], 2, "A census collects data from every member of the population."),
    mcq("y10-cmd-g2", "Asking only gym-goers about exercise habits gives a:", "B", ["representative sample", "biased sample", "census", "random sample"], 2, "Gym-goers are not typical of the whole population, so the sample is biased."),
    mcq("y10-cmd-g3", "A good sample should be:", "C", ["as small as possible", "made of volunteers", "representative of the population", "taken from friends"], 2, "A representative sample reflects the population."),
    mcq("y10-cmd-g4", "Choosing every 10th person on a list is:", "A", ["systematic sampling", "stratified sampling", "a census", "convenience sampling"], 2, "Taking every k-th member is systematic sampling."),
  ],
  independentPractice: [
    mcq("y10-cmd-i1", "A part of the population that is actually studied is a:", "B", ["census", "sample", "population", "variable"], 2, "A sample is the subset of the population that is examined."),
    mcq("y10-cmd-i2", "In random sampling, every member has:", "A", ["an equal chance of selection", "no chance of selection", "a chance based on age", "a guaranteed place"], 3, "Random sampling gives each member an equal chance."),
    mcq("y10-cmd-i3", "Stratified sampling draws:", "C", ["only from the largest group", "everyone in the population", "proportionally from subgroups", "the first people available"], 3, "Stratified sampling samples each subgroup in proportion."),
    mcq("y10-cmd-i4", "A leading or loaded survey question causes:", "B", ["a larger sample", "bias", "a census", "randomness"], 3, "Leading questions push answers in one direction, biasing results."),
    mcq("y10-cmd-i5", "Surveying only weekday shoppers about a store under-represents:", "A", ["weekend customers", "the staff", "the suppliers", "no one"], 3, "Weekend customers are missed, so the sample is unrepresentative."),
  ],
  masteryQuiz: [
    mcq("y10-cmd-m1", "The entire group of interest is the:", "B", ["sample", "population", "stratum", "variable"], 2, "The population is the whole group being studied."),
    mcq("y10-cmd-m2", "Bias makes a sample:", "A", ["unrepresentative", "larger", "random", "a census"], 2, "Bias means the sample does not reflect the population."),
    mcq("y10-cmd-m3", "A voluntary online poll tends to over-represent:", "C", ["everyone equally", "younger people only", "people with strong opinions", "the population"], 3, "Those who feel strongly are more likely to respond voluntarily."),
    mcq("y10-cmd-m4", "A census is impractical when the population is:", "A", ["very large", "very small", "well known", "homogeneous"], 2, "Surveying everyone is costly and slow for large populations."),
    mcq("y10-cmd-m5", "Selecting names randomly from a hat is:", "B", ["systematic sampling", "random sampling", "stratified sampling", "a census"], 2, "Each name has an equal chance — random sampling."),
    mcq("y10-cmd-m6", "A fair sample should avoid:", "C", ["being large", "being numeric", "bias", "randomness"], 2, "A fair sample is unbiased."),
    mcq("y10-cmd-m7", "Surveying only your friends is a:", "A", ["convenience (biased) sample", "stratified sample", "random sample", "census"], 3, "Friends are easy to reach but not representative — convenience sampling."),
    mcq("y10-cmd-m8", "Dividing students into year groups then sampling each is:", "B", ["systematic", "stratified", "convenience", "a census"], 3, "Sampling proportionally from defined subgroups is stratified."),
    mcq("y10-cmd-m9", "A graph with a truncated (broken) vertical axis can:", "A", ["exaggerate differences", "remove all bias", "make a sample bigger", "fix bad data"], 3, "Cutting the axis makes small differences look large."),
    mcq("y10-cmd-m10", "Before computing statistics, the first step is to:", "C", ["pick the prettiest graph", "round the numbers", "understand how the data was collected", "find the mean"], 2, "Trustworthy conclusions start with how the data was gathered."),
  ],
  commonMistakes: [
    { mistake: "Trusting a statistic without checking the sample.", fix: "Ask how the data was collected and whether the sample is representative." },
    { mistake: "Confusing a census with a sample.", fix: "A census is everyone; a sample is a part." },
    { mistake: "Assuming a big sample cannot be biased.", fix: "A large but unrepresentative sample is still biased." },
    { mistake: "Ignoring axis tricks in graphs.", fix: "Check the scale — a truncated axis exaggerates differences." },
  ],
  masteryPassMark: 0.8,
};

// ── 9B Review of Data Displays (path) ──────────────────────────────────────────────────
const dataDisplays: Partial<ExplicitLesson> = {
  description: "Choose and read appropriate data displays for categorical and numerical data, and spot misleading graphs.",
  learningIntention: "Match data to the right display and read shape, centre and spread from it.",
  successCriteria: ["Choose a display suited to categorical vs numerical data.", "Read mode, frequency and proportion from a display.", "Describe distribution shape (symmetric, skewed).", "Recognise misleading displays."],
  teaching: {
    paragraphs: [
      "A display should match the DATA TYPE. CATEGORICAL data (colours, sports) suits bar/column graphs or pie charts (proportions of a whole). NUMERICAL data suits dot plots (small sets), stem-and-leaf plots (keep the actual values), and histograms (continuous data — bars touch because there are no gaps between values).",
      "Reading a display is about MEANING, not just extraction: the tallest bar or most dots is the MODE; the overall picture shows SHAPE — where data clusters and how it spreads.",
      "SHAPE matters: a symmetric distribution has mean ≈ median; a right-skewed one has a tail towards higher values (and the mean is pulled up). Comparing two groups is easy with a back-to-back stem-and-leaf plot.",
      "Displays can mislead: a broken vertical axis exaggerates differences and a 3D 'exploded' pie distorts proportions. Always check the axes and scale before drawing a conclusion.",
    ],
    latexBlocks: ["\\text{categorical} \\to \\text{bar/pie};\\ \\text{numerical} \\to \\text{histogram/stem-leaf}", "\\text{symmetric} \\Rightarrow \\text{mean} \\approx \\text{median}", "\\sum \\text{relative frequencies} = 1"],
  },
  workedExamples: [
    { title: "Categorical display", questionLatex: "\\text{Which display suits favourite-colour data?}", steps: [{ explanation: "Categories, not numbers.", latex: "\\text{bar/column or pie}" }], finalAnswerLatex: "\\text{bar graph}" },
    { title: "Numerical display", questionLatex: "\\text{Which display suits continuous height data?}", steps: [{ explanation: "Continuous numerical — bars touch.", latex: "\\text{histogram}" }], finalAnswerLatex: "\\text{histogram}" },
    { title: "Keeping values", questionLatex: "\\text{Which display keeps the individual data values?}", steps: [{ explanation: "Each leaf is a real value.", latex: "\\text{stem-and-leaf}" }], finalAnswerLatex: "\\text{stem-and-leaf}" },
  ],
  guidedPractice: [
    mcq("y10-rdd-g1", "Categorical data is best shown with a:", "A", ["bar/column graph", "histogram", "scatter plot", "number line only"], 2, "Categories suit bar/column graphs."),
    mcq("y10-rdd-g2", "A histogram is used for:", "B", ["categorical data", "numerical (continuous) data", "two-variable data", "ranked names"], 2, "Histograms display continuous numerical data."),
    mcq("y10-rdd-g3", "A stem-and-leaf plot keeps:", "C", ["only totals", "only the mean", "the individual data values", "categories"], 3, "Each leaf preserves an actual data value."),
    mcq("y10-rdd-g4", "A pie chart shows:", "A", ["proportions of a whole", "change over time", "correlation", "individual values"], 2, "Pie charts show each category's share of the total."),
  ],
  independentPractice: [
    mcq("y10-rdd-i1", "The mode on a dot plot is the value with the:", "A", ["most dots", "fewest dots", "highest number", "middle position"], 2, "The most frequent value (tallest stack of dots) is the mode."),
    mcq("y10-rdd-i2", "A histogram's bars touch because the data is:", "B", ["categorical", "continuous", "ranked", "random"], 3, "Continuous data has no gaps between intervals, so bars touch."),
    mcq("y10-rdd-i3", "Comparing two groups' distributions is easiest with a:", "C", ["pie chart", "single dot", "back-to-back stem-and-leaf plot", "table of means"], 3, "A back-to-back stem-and-leaf shows both distributions together."),
    mcq("y10-rdd-i4", "A misleading graph often has a:", "A", ["non-zero / broken axis", "clear title", "consistent scale", "labelled axes"], 3, "Breaking the axis exaggerates differences."),
    mcq("y10-rdd-i5", "A column graph's tallest bar shows the:", "B", ["smallest category", "most frequent category", "median", "outlier"], 2, "Height represents frequency, so the tallest bar is the most frequent."),
  ],
  masteryQuiz: [
    mcq("y10-rdd-m1", "Favourite colours (categories) suit a:", "A", ["bar graph", "histogram", "scatter plot", "time series"], 2, "Categorical data → bar graph."),
    mcq("y10-rdd-m2", "Heights of students (continuous) suit a:", "B", ["pie chart", "histogram", "two-way table", "stem only"], 2, "Continuous numerical data → histogram."),
    mcq("y10-rdd-m3", "A frequency table records:", "C", ["only the mean", "the range", "how often each value occurs", "the correlation"], 2, "Frequency = how many times each value appears."),
    mcq("y10-rdd-m4", "The shape of a distribution shows:", "A", ["where data clusters and spreads", "the sample size only", "the survey question", "the axis labels"], 3, "Shape reveals clustering and spread."),
    mcq("y10-rdd-m5", "A right-skewed display has a tail towards:", "B", ["lower values", "higher values", "both ends", "the centre"], 3, "Right (positive) skew has a tail to the high end."),
    mcq("y10-rdd-m6", "A symmetric distribution has mean approximately equal to the:", "A", ["median", "range", "mode count", "sample size"], 3, "In a symmetric distribution mean ≈ median."),
    mcq("y10-rdd-m7", "A 3D exploded pie chart can:", "C", ["improve accuracy", "remove bias", "distort the proportions", "add data"], 3, "3D effects visually distort the true proportions."),
    mcq("y10-rdd-m8", "Dot plots are best for:", "A", ["small data sets", "millions of values", "two categorical variables", "continuous curves"], 2, "Dot plots work well for small data sets."),
    mcq("y10-rdd-m9", "The total of all relative frequencies is:", "B", ["0", "1 (100%)", "the mean", "the range"], 2, "Relative frequencies sum to 1 (100%)."),
    mcq("y10-rdd-m10", "Before reading any graph, you should check the:", "C", ["colour scheme", "author", "axes and scale", "font"], 2, "Axes and scale determine what the graph really says."),
  ],
  commonMistakes: [
    { mistake: "Using a histogram for categorical data.", fix: "Use bar/pie for categories; histograms are for continuous numerical data." },
    { mistake: "Just reading values without describing shape/spread.", fix: "Interpret centre, spread and shape, not only individual heights." },
    { mistake: "Trusting a graph without checking the axis.", fix: "A broken/zoomed axis exaggerates differences." },
    { mistake: "Confusing left and right skew.", fix: "The skew direction is where the tail points (towards extreme values)." },
  ],
  masteryPassMark: 0.8,
};

// ── 9C Two-Way Tables (path) ───────────────────────────────────────────────────────────
// Context table used throughout: survey of 100 students.
//                 Own a pet   No pet   Total
//   Play sport        40        20       60
//   No sport          10        30       40
//   Total             50        50      100
const twoWayTables: Partial<ExplicitLesson> = {
  description: "Read counts, totals and relative frequencies from two-way tables and use them to explore association.",
  learningIntention: "Extract and interpret information from a two-way table of categorical data.",
  successCriteria: ["Read cell counts and marginal (row/column) totals.", "Compute relative frequencies as count ÷ total.", "Find conditional counts within a row or column.", "Use the table to discuss association."],
  teaching: {
    paragraphs: [
      "A TWO-WAY TABLE organises two categorical variables at once — one across the rows, one across the columns — so you can see how they relate. The inner cells are COUNTS; the row and column totals are the MARGINAL totals; the bottom-right is the grand total.",
      "Use this survey of 100 students throughout: 40 play sport AND own a pet, 20 play sport with no pet, 10 don't play sport but own a pet, 30 do neither. So the sport row totals 60, the no-sport row 40; the pet column 50, the no-pet column 50.",
      "A RELATIVE FREQUENCY is a count divided by a total — it turns counts into proportions. The relative frequency of 'sport and pet' is 40 ÷ 100 = 0.4. CONDITIONAL questions stay inside one row or column: 'of the 60 who play sport, how many own a pet?' is 40.",
      "Reading these proportions is how you explore ASSOCIATION: do pet owners play sport more than non-owners? Compare within-group proportions, not raw counts. Interpretation, not just arithmetic, is the point.",
    ],
    latexBlocks: ["\\text{marginal total} = \\text{row or column total}", "\\text{relative frequency} = \\frac{\\text{count}}{\\text{total}}", "\\text{conditional: within one row or column}"],
  },
  workedExamples: [
    { title: "A marginal total", questionLatex: "\\text{From the table, how many students play sport? (40 with a pet, 20 without)}", steps: [{ explanation: "Add the sport row.", latex: "40 + 20 = 60" }], finalAnswerLatex: "60" },
    { title: "Relative frequency", questionLatex: "\\text{Find the relative frequency of 'sport and pet' (count 40 of 100).}", steps: [{ explanation: "Count ÷ grand total.", latex: "\\frac{40}{100} = 0.4" }], finalAnswerLatex: "0.4" },
    { title: "Column total", questionLatex: "\\text{How many own a pet? (40 play sport, 10 do not)}", steps: [{ explanation: "Add the pet column.", latex: "40 + 10 = 50" }], finalAnswerLatex: "50" },
  ],
  guidedPractice: [
    ans("y10-twt-g1", "From the survey, how many students play sport? (40 own a pet, 20 do not)", "40+20", "60", 2, "Sport row: 40 + 20 = 60.", []),
    ans("y10-twt-g2", "How many students own a pet? (40 play sport, 10 do not)", "40+10", "50", 2, "Pet column: 40 + 10 = 50.", []),
    ans("y10-twt-g3", "How many do neither play sport nor own a pet?", "\\text{no sport, no pet}", "30", 2, "That cell is given as 30.", []),
    mcq("y10-twt-g4", "Row and column totals in a two-way table are called:", "B", ["cell counts", "marginal totals", "relative frequencies", "conditionals"], 2, "The totals around the edges are the marginal totals."),
  ],
  independentPractice: [
    ans("y10-twt-i1", "How many play sport but own no pet?", "\\text{sport, no pet}", "20", 2, "That cell is 20.", []),
    ans("y10-twt-i2", "Find the relative frequency of owning a pet (50 of 100).", "50/100", "0.5", 2, "50 ÷ 100 = 0.5.", ["50%", "1/2"]),
    ans("y10-twt-i3", "How many students do NOT play sport? (10 with a pet, 30 without)", "10+30", "40", 2, "No-sport row: 10 + 30 = 40.", []),
    ans("y10-twt-i4", "Of the 60 who play sport, how many own a pet?", "\\text{within sport row}", "40", 3, "Within the sport row, 40 own a pet (a conditional count).", []),
    mcq("y10-twt-i5", "A two-way table displays:", "C", ["one numerical variable", "a time series", "two categorical variables", "a single proportion"], 2, "It cross-tabulates two categorical variables."),
  ],
  masteryQuiz: [
    ans("y10-twt-m1", "What is the total number of students surveyed?", "\\text{grand total}", "100", 1, "The grand total is 100.", []),
    ans("y10-twt-m2", "How many students own a pet and play sport?", "\\text{sport and pet}", "40", 1, "That cell is 40.", []),
    ans("y10-twt-m3", "Find the relative frequency of doing neither (30 of 100).", "30/100", "0.3", 2, "30 ÷ 100 = 0.3.", ["30%"]),
    ans("y10-twt-m4", "How many students own no pet? (20 play sport, 30 do not)", "20+30", "50", 2, "No-pet column: 20 + 30 = 50.", []),
    mcq("y10-twt-m5", "Dividing a cell by the grand total gives a:", "B", ["marginal total", "relative frequency", "conditional count", "mean"], 2, "Count ÷ grand total = relative frequency."),
    ans("y10-twt-m6", "Of the 50 pet owners, how many play sport?", "\\text{within pet column}", "40", 3, "Within the pet column, 40 play sport.", []),
    ans("y10-twt-m7", "How many do not play sport but own a pet?", "\\text{no sport, pet}", "10", 2, "That cell is 10.", []),
    mcq("y10-twt-m8", "Two-way tables help identify:", "C", ["a single mean", "the range", "association between two variables", "a time trend"], 3, "Comparing proportions reveals association between the variables."),
    ans("y10-twt-m9", "What percentage of students play sport? (60 of 100)", "60/100", "60", 2, "60 ÷ 100 = 60%.", ["60%"]),
    ans("y10-twt-m10", "Find the relative frequency of 'sport and no pet' (20 of 100).", "20/100", "0.2", 2, "20 ÷ 100 = 0.2.", ["20%"]),
  ],
  commonMistakes: [
    { mistake: "Confusing a cell count with a marginal total.", fix: "Cells are inside; marginal totals are the row/column sums." },
    { mistake: "Dividing by the wrong total for a relative frequency.", fix: "Use the grand total for overall, the row/column total for conditional." },
    { mistake: "Comparing raw counts instead of proportions for association.", fix: "Compare within-group proportions to judge association." },
    { mistake: "Forgetting the totals must reconcile.", fix: "Row totals and column totals both add to the grand total." },
  ],
  masteryPassMark: 0.8,
};

// ── 9D Summary Statistics (path) ───────────────────────────────────────────────────────
const summaryStatistics: Partial<ExplicitLesson> = {
  description: "Calculate and interpret mean, median, mode and range, and choose the best measure for the data.",
  learningIntention: "Compute centre and spread measures and decide which best describes the data.",
  successCriteria: ["Calculate mean, median, mode and range.", "Order data before finding the median.", "Explain the effect of an outlier on the mean.", "Choose median vs mean for skewed data."],
  teaching: {
    paragraphs: [
      "Summary statistics condense a data set into a few meaningful numbers — but choosing the RIGHT one matters more than the arithmetic. The MEAN is the balance point (add the values, divide by how many). The MEDIAN is the middle value when the data is ORDERED. The MODE is the most frequent value. The RANGE (largest − smallest) measures SPREAD.",
      "For an even number of values, the median is the average of the two middle ones: for 2, 4, 6, 8 it is (4 + 6)/2 = 5.",
      "OUTLIERS reveal why the choice matters: one extreme value drags the MEAN towards it but barely moves the MEDIAN. For 2, 2, 2, 10 the mean is 4 but the median is 2 — the median better represents the typical value.",
      "So for SKEWED data or data with outliers, the median is usually the better centre; for symmetric data the mean is fine. A data set may have no mode, or more than one. Interpret what each measure tells you before reporting it.",
    ],
    latexBlocks: ["\\text{mean} = \\frac{\\text{sum}}{\\text{count}};\\ \\text{median} = \\text{middle (ordered)}", "\\text{range} = \\text{max} - \\text{min}", "\\text{outlier pulls the mean, not the median}"],
  },
  workedExamples: [
    { title: "Mean", questionLatex: "\\text{Find the mean of } 2,4,6,8,10.", steps: [{ explanation: "Sum ÷ count.", latex: "\\frac{30}{5} = 6" }], finalAnswerLatex: "6" },
    { title: "Median (even count)", questionLatex: "\\text{Find the median of } 2,4,6,8.", steps: [{ explanation: "Average the two middle values.", latex: "\\frac{4+6}{2} = 5" }], finalAnswerLatex: "5" },
    { title: "Outlier effect", questionLatex: "\\text{Compare mean and median of } 2,2,2,10.", steps: [{ explanation: "Mean is pulled up by 10.", latex: "\\text{mean} = 4,\\ \\text{median} = 2" }], finalAnswerLatex: "\\text{median better}" },
  ],
  guidedPractice: [
    ans("y10-sst-g1", "Find the mean of 4, 6, 8.", "4,6,8", "6", 2, "(4 + 6 + 8)/3 = 18/3 = 6.", []),
    ans("y10-sst-g2", "Find the median of 1, 3, 5, 7, 9.", "1,3,5,7,9", "5", 2, "The middle value is 5.", []),
    ans("y10-sst-g3", "Find the mode of 2, 2, 3, 4.", "2,2,3,4", "2", 1, "2 appears most often.", []),
    ans("y10-sst-g4", "Find the range of 3, 7, 10.", "3,7,10", "7", 2, "10 − 3 = 7.", []),
  ],
  independentPractice: [
    ans("y10-sst-i1", "Find the mean of 10, 20, 30, 40.", "10,20,30,40", "25", 2, "(10 + 20 + 30 + 40)/4 = 100/4 = 25.", []),
    ans("y10-sst-i2", "Find the median of 2, 4, 6, 8.", "2,4,6,8", "5", 3, "Average the two middle values: (4 + 6)/2 = 5.", []),
    ans("y10-sst-i3", "Find the mode of 5, 5, 6, 7, 7, 7.", "5,5,6,7,7,7", "7", 2, "7 appears three times — the most.", []),
    ans("y10-sst-i4", "Find the range of 12, 4, 9, 20.", "12,4,9,20", "16", 2, "20 − 4 = 16.", []),
    mcq("y10-sst-i5", "The measure most affected by an outlier is the:", "A", ["mean", "median", "mode", "range minimum"], 3, "The mean is pulled towards an extreme value; the median resists it."),
  ],
  masteryQuiz: [
    ans("y10-sst-m1", "Find the mean of 3, 5, 7.", "3,5,7", "5", 2, "(3 + 5 + 7)/3 = 5.", []),
    ans("y10-sst-m2", "Find the median of 8, 2, 6, 4.", "8,2,6,4", "5", 3, "Ordered: 2, 4, 6, 8; median (4 + 6)/2 = 5.", []),
    ans("y10-sst-m3", "Find the mode of 1, 1, 2, 3.", "1,1,2,3", "1", 1, "1 appears most often.", []),
    ans("y10-sst-m4", "Find the range of 5, 15.", "5,15", "10", 1, "15 − 5 = 10.", []),
    mcq("y10-sst-m5", "For skewed data with outliers, the better measure of centre is the:", "B", ["mean", "median", "range", "mode"], 3, "The median resists outliers, so it better represents skewed data."),
    ans("y10-sst-m6", "Find the mean of 2, 2, 2, 10.", "2,2,2,10", "4", 3, "(2 + 2 + 2 + 10)/4 = 16/4 = 4 — pulled up by the outlier.", []),
    ans("y10-sst-m7", "Find the median of 5, 9, 1, 7, 3.", "5,9,1,7,3", "5", 3, "Ordered: 1, 3, 5, 7, 9; median is 5.", []),
    mcq("y10-sst-m8", "The range measures:", "C", ["the centre", "the most common value", "the spread", "the median"], 2, "Range = max − min, a measure of spread."),
    ans("y10-sst-m9", "Find the mean of 0, 10.", "0,10", "5", 1, "(0 + 10)/2 = 5.", []),
    mcq("y10-sst-m10", "A data set can have:", "A", ["no mode or more than one mode", "exactly one mode always", "no mean", "no range"], 2, "Modes can be absent or multiple, unlike the mean."),
  ],
  commonMistakes: [
    { mistake: "Finding the median without ordering the data.", fix: "Always sort the values first, then take the middle." },
    { mistake: "Taking only one middle value when the count is even.", fix: "Average the two middle values." },
    { mistake: "Reporting the mean when an outlier distorts it.", fix: "Use the median for skewed data or data with outliers." },
    { mistake: "Confusing range (spread) with a centre measure.", fix: "Range = max − min measures spread, not centre." },
  ],
  masteryPassMark: 0.8,
};

// ── 9G Time Series Data (path) ─────────────────────────────────────────────────────────
const timeSeries: Partial<ExplicitLesson> = {
  description: "Read time-series data and separate long-term trend from seasonal patterns and random noise.",
  learningIntention: "Interpret time-series plots and distinguish trend, seasonality and noise.",
  successCriteria: ["Recognise time on the horizontal axis.", "Identify a long-term trend.", "Identify a repeating seasonal pattern.", "Separate genuine change from random noise."],
  teaching: {
    paragraphs: [
      "A TIME SERIES plots a quantity against TIME (time always on the horizontal axis). The point is to see how something behaves over time — and to separate three different things hiding in the same graph.",
      "The TREND is the long-term direction: overall rising, falling or flat. A trend line (or smoothing) helps you see it through the wobble. SEASONALITY is a pattern that REPEATS on a regular cycle — ice-cream sales peaking every summer, retail spiking each December.",
      "NOISE (random variation) is the short-term, irregular up-and-down that carries no lasting meaning. The key skill is not over-reacting to noise: a single unusual spike is probably noise or an outlier, NOT a change in the trend.",
      "Judging real change means looking past the noise to the trend. And predicting far beyond the observed time range is unreliable — the pattern may not continue (extrapolation). Interpretation first: is what you see trend, season, or just noise?",
    ],
    latexBlocks: ["\\text{trend} = \\text{long-term direction}", "\\text{seasonal} = \\text{regular repeating cycle}", "\\text{noise} = \\text{short-term random variation}"],
  },
  workedExamples: [
    { title: "Identifying trend", questionLatex: "\\text{Values rise steadily across several years. This is a:}", steps: [{ explanation: "Long-term upward direction.", latex: "\\text{trend}" }], finalAnswerLatex: "\\text{trend}" },
    { title: "Identifying seasonality", questionLatex: "\\text{Ice-cream sales peak every summer. This is:}", steps: [{ explanation: "A regular repeating cycle.", latex: "\\text{seasonal}" }], finalAnswerLatex: "\\text{seasonal}" },
    { title: "Identifying noise", questionLatex: "\\text{One unusual one-off spike is most likely:}", steps: [{ explanation: "Short-term, irregular.", latex: "\\text{noise / an outlier}" }], finalAnswerLatex: "\\text{noise}" },
  ],
  guidedPractice: [
    mcq("y10-tsd-g1", "A time series plots data against:", "A", ["time", "category", "another variable", "frequency"], 2, "Time is the horizontal axis in a time series."),
    mcq("y10-tsd-g2", "A long-term upward direction in the data is a:", "B", ["season", "trend", "outlier", "noise"], 2, "Overall sustained direction is the trend."),
    mcq("y10-tsd-g3", "A pattern that repeats every year is:", "C", ["a trend", "noise", "seasonal", "an outlier"], 2, "Regular yearly repetition is seasonality."),
    mcq("y10-tsd-g4", "Small irregular ups and downs are:", "B", ["the trend", "noise (random variation)", "seasonal", "the mean"], 3, "Irregular short-term wobble is noise."),
  ],
  independentPractice: [
    mcq("y10-tsd-i1", "A trend line helps you see the:", "A", ["overall direction", "single highest point", "exact next value", "category totals"], 2, "A trend line reveals the long-term direction through the noise."),
    mcq("y10-tsd-i2", "Ice-cream sales peaking each summer is a:", "B", ["trend", "seasonal effect", "random spike", "outlier"], 2, "A regular yearly peak is seasonal."),
    mcq("y10-tsd-i3", "Distinguishing trend from noise matters because:", "C", ["noise is always larger", "trend is random", "noise is not a real long-term change", "they are identical"], 4, "Noise carries no lasting meaning; only the trend reflects genuine change."),
    mcq("y10-tsd-i4", "A downward trend means values are:", "A", ["decreasing over time", "increasing over time", "constant", "repeating"], 2, "A falling trend means values decline over time."),
    mcq("y10-tsd-i5", "A single unusual spike is most likely:", "B", ["a new trend", "noise / an outlier", "a season", "the mean"], 3, "A one-off spike is usually noise, not a trend change."),
  ],
  masteryQuiz: [
    mcq("y10-tsd-m1", "In a time series, time goes on the:", "A", ["horizontal axis", "vertical axis", "legend", "title"], 2, "Time is plotted horizontally."),
    mcq("y10-tsd-m2", "Smoothing a series helps reveal the:", "B", ["noise", "trend", "outliers", "axis labels"], 3, "Smoothing averages out noise to show the trend."),
    mcq("y10-tsd-m3", "Quarterly sales repeating the same yearly shape is:", "C", ["a trend", "noise", "seasonal", "an outlier"], 2, "A regular repeating cycle is seasonal."),
    mcq("y10-tsd-m4", "Random short-term variation is called:", "B", ["trend", "noise", "seasonality", "the median"], 2, "Irregular short-term variation is noise."),
    mcq("y10-tsd-m5", "Predicting far beyond the observed time range is:", "A", ["unreliable (extrapolation)", "always accurate", "interpolation", "smoothing"], 4, "Extrapolating far ahead is unreliable — the pattern may not hold."),
    mcq("y10-tsd-m6", "A flat trend line means:", "C", ["rapid growth", "rapid decline", "little long-term change", "strong seasonality"], 2, "A flat trend shows little long-term change."),
    mcq("y10-tsd-m7", "The trend is the:", "A", ["long-term movement", "single peak", "random wobble", "yearly cycle"], 2, "Trend = long-term movement of the series."),
    mcq("y10-tsd-m8", "Reacting strongly to one noisy data point is:", "B", ["good practice", "over-interpreting noise", "finding the trend", "seasonal analysis"], 3, "One noisy point should not drive conclusions."),
    mcq("y10-tsd-m9", "Seasonal effects are:", "A", ["regular and repeating", "one-off", "always increasing", "random"], 2, "Seasonality is a regular, repeating cycle."),
    mcq("y10-tsd-m10", "To judge real change you must separate the trend from:", "C", ["the axis", "the title", "noise", "the units"], 3, "Genuine change is the trend, seen by removing noise."),
  ],
  commonMistakes: [
    { mistake: "Treating a noisy spike as a new trend.", fix: "A one-off spike is usually noise; the trend is the long-term direction." },
    { mistake: "Confusing seasonality with trend.", fix: "Seasonality repeats on a cycle; trend is the overall direction." },
    { mistake: "Extrapolating far beyond the data.", fix: "Predictions far past the observed range are unreliable." },
    { mistake: "Plotting time on the vertical axis.", fix: "Time always goes on the horizontal axis." },
  ],
  masteryPassMark: 0.8,
};

// ── 9J Linear Regression with Technology (extending) ───────────────────────────────────
const linearRegression: Partial<ExplicitLesson> = {
  description: "Interpret a line of best fit and correlation, distinguish interpolation from extrapolation, and avoid the correlation-causation trap.",
  learningIntention: "Use a regression line and correlation to make and judge predictions.",
  successCriteria: ["Interpret the correlation coefficient r (sign and strength).", "Use a line of best fit to predict y from x.", "Distinguish interpolation from extrapolation and judge reliability.", "Explain that correlation does not imply causation."],
  teaching: {
    paragraphs: [
      "When two numerical variables are related, a LINE OF BEST FIT (regression line) summarises the relationship and lets you predict y from x. Technology finds the line that minimises the scatter of points around it.",
      "The CORRELATION COEFFICIENT r measures the linear relationship and ranges from −1 to +1. The SIGN gives direction (positive: y rises with x; negative: y falls as x rises) and the SIZE gives strength: r near ±1 is strong, r near 0 is weak/none.",
      "Predictions are only as good as where you make them. INTERPOLATION (predicting WITHIN the observed range) is reliable; EXTRAPOLATION (predicting BEYOND the range) is risky because the pattern may not continue. The safest predictions sit near the centre of the data.",
      "Most importantly, CORRELATION IS NOT CAUSATION. Ice-cream sales and drownings both rise in summer and are strongly correlated, but neither causes the other — a lurking (confounding) variable, hot weather, drives both. A strong r never proves cause.",
    ],
    latexBlocks: ["-1 \\le r \\le 1\\ (\\text{sign} = \\text{direction},\\ |r| = \\text{strength})", "\\text{interpolation: within range (reliable)}", "\\text{correlation} \\ne \\text{causation}"],
  },
  workedExamples: [
    { title: "Reading r", questionLatex: "\\text{What does } r = +0.95 \\text{ indicate?}", steps: [{ explanation: "Positive sign, magnitude near 1.", latex: "\\text{strong positive correlation}" }], finalAnswerLatex: "\\text{strong positive}" },
    { title: "Interpolate vs extrapolate", questionLatex: "\\text{Predicting beyond the data range is called:}", steps: [{ explanation: "Outside the observed range.", latex: "\\text{extrapolation (unreliable)}" }], finalAnswerLatex: "\\text{extrapolation}" },
    { title: "Correlation not causation", questionLatex: "\\text{Ice-cream sales and drownings both rise in summer. Does one cause the other?}", steps: [{ explanation: "A lurking variable (hot weather) drives both.", latex: "\\text{No — correlation} \\ne \\text{causation}" }], finalAnswerLatex: "\\text{No}" },
  ],
  guidedPractice: [
    mcq("y10-lrt-g1", "An r value close to +1 indicates:", "A", ["strong positive correlation", "strong negative correlation", "no correlation", "causation"], 4, "Near +1 means a strong positive linear relationship."),
    mcq("y10-lrt-g2", "An r value close to 0 indicates:", "C", ["strong positive", "strong negative", "little or no linear correlation", "perfect correlation"], 4, "r near 0 means little linear relationship."),
    mcq("y10-lrt-g3", "Predicting within the observed data range is:", "A", ["interpolation", "extrapolation", "causation", "sampling"], 4, "Interpolation predicts inside the range of the data."),
    mcq("y10-lrt-g4", "Predicting outside the observed data range is:", "B", ["interpolation", "extrapolation", "correlation", "a census"], 4, "Extrapolation predicts beyond the observed range."),
  ],
  independentPractice: [
    mcq("y10-lrt-i1", "An r value of −0.9 indicates:", "B", ["strong positive correlation", "strong negative correlation", "no correlation", "a causal link"], 4, "Negative sign, magnitude near 1 — strong negative correlation."),
    mcq("y10-lrt-i2", "Extrapolation is risky because:", "A", ["the pattern may not continue", "the data is categorical", "r is always 0", "the mean changes"], 5, "Beyond the data, the relationship may break down."),
    mcq("y10-lrt-i3", "A strong correlation between two variables:", "C", ["proves one causes the other", "means they are unrelated", "does not prove one causes the other", "means r = 0"], 5, "Correlation alone never establishes causation."),
    mcq("y10-lrt-i4", "A regression line is used to:", "A", ["predict y from x", "count categories", "find the mode", "remove outliers"], 4, "The line of best fit predicts the response from the explanatory variable."),
    mcq("y10-lrt-i5", "The most reliable predictions are made:", "B", ["far beyond the data", "near the centre of the data (interpolation)", "where there is no data", "only at the maximum x"], 5, "Interpolation near the data's centre is most reliable."),
  ],
  masteryQuiz: [
    mcq("y10-lrt-m1", "The correlation coefficient r ranges from:", "A", ["−1 to +1", "0 to 1", "0 to 100", "−100 to 100"], 4, "r always lies between −1 and +1."),
    mcq("y10-lrt-m2", "r = +0.95 means:", "B", ["weak positive", "strong positive", "strong negative", "no correlation"], 4, "Close to +1 is strong positive."),
    mcq("y10-lrt-m3", "r = −0.1 means:", "C", ["strong negative", "strong positive", "very weak / no correlation", "perfect"], 4, "Magnitude near 0 means almost no linear correlation."),
    mcq("y10-lrt-m4", "Ice-cream sales and drownings both rising in summer is an example of:", "A", ["correlation without causation", "causation", "no correlation", "extrapolation"], 5, "They correlate, but neither causes the other."),
    mcq("y10-lrt-m5", "A lurking (confounding) variable can:", "B", ["remove correlation", "create a misleading correlation", "prove causation", "make r exactly 1"], 5, "A hidden third variable can drive an apparent correlation."),
    mcq("y10-lrt-m6", "Interpolation predicts:", "A", ["within the data range", "beyond the data range", "the correlation", "the mode"], 4, "Interpolation stays inside the observed range."),
    mcq("y10-lrt-m7", "Extrapolation predicts:", "B", ["within the data range", "beyond the data range", "the median", "the sample size"], 4, "Extrapolation goes outside the observed range."),
    mcq("y10-lrt-m8", "The line of best fit minimises:", "C", ["the correlation", "the sample size", "the scatter of points around it", "the number of points"], 5, "Regression minimises the spread of points about the line."),
    mcq("y10-lrt-m9", "A negative gradient on the regression line means:", "A", ["as x increases, y decreases", "as x increases, y increases", "no relationship", "r = +1"], 4, "A negative slope means y falls as x rises."),
    mcq("y10-lrt-m10", "The safest use of a regression line is:", "B", ["extrapolation far ahead", "interpolation within the observed range", "proving causation", "ignoring r"], 5, "Interpolation within the data is the most reliable use."),
  ],
  commonMistakes: [
    { mistake: "Reading a strong correlation as proof of causation.", fix: "Correlation never proves causation; look for lurking variables." },
    { mistake: "Trusting extrapolated predictions.", fix: "Predictions beyond the data range are unreliable." },
    { mistake: "Ignoring the sign of r.", fix: "The sign of r gives the direction of the relationship." },
    { mistake: "Thinking r near 0 means a curved relationship is absent.", fix: "r measures only LINEAR association; r ≈ 0 can still hide a non-linear pattern." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "collecting-misusing-data": collectingData,
  "review-data-displays": dataDisplays,
  "two-way-tables-stats": twoWayTables,
  "summary-statistics": summaryStatistics,
  "time-series-data": timeSeries,
  "linear-regression-technology": linearRegression,
};

export function year10StatisticsWave7LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "single-variable-bivariate-statistics"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
