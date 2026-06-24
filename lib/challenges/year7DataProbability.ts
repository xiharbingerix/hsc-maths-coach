import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 5 (final Y7). D6 (Level-6) challenge pools, 12 per section, for data (5 sections)
// and probability-and-chance (5). Registered course-scoped ("year-7-mathematics/<lesson>") in
// lib/challenges/index.ts; unlocked after mastery via the existing challenge flow (no new system).
// Auto-markable single-value answers (fractions accept a decimal variant). The seeder tags challenge
// questions as D6, so no per-item difficulty field is needed.

// ── Data: types and collection ────────────────────────────────────────────────────────────────
export const dataTypesCollectionChallenge: PracticeQuestion[] = [
  { id: "chal-y7-dtc-1", prompt: "Is 'number of pets owned' categorical or numerical? Answer C or N.", latex: "\\text{pets}", answer: "N", acceptedAnswers: ["numerical", "n"], hint: "Can you count it?", explanation: "A count is numerical." },
  { id: "chal-y7-dtc-2", prompt: "Is 'eye colour' categorical or numerical? Answer C or N.", latex: "\\text{eye colour}", answer: "C", acceptedAnswers: ["categorical", "c"], hint: "Is it a label or a number?", explanation: "Colour is a category." },
  { id: "chal-y7-dtc-3", prompt: "Is 'height in cm' discrete or continuous? Answer D or C.", latex: "\\text{height}", answer: "C", acceptedAnswers: ["continuous", "c"], hint: "Can it take any value in a range?", explanation: "Height is continuous." },
  { id: "chal-y7-dtc-4", prompt: "Is 'number of cars in a car park' discrete or continuous? Answer D or C.", latex: "\\text{cars}", answer: "D", acceptedAnswers: ["discrete", "d"], hint: "Whole numbers only?", explanation: "Counts are discrete." },
  { id: "chal-y7-dtc-5", prompt: "A survey asks every 10th person leaving a shop. Is this a census or a sample? Answer census or sample.", latex: "\\text{every 10th}", answer: "sample", acceptedAnswers: [], hint: "Is everyone included?", explanation: "Only some people are surveyed — a sample." },
  { id: "chal-y7-dtc-6", prompt: "A class of 30 students is surveyed about favourite sport. How many data values are collected?", latex: "30", answer: "30", acceptedAnswers: [], hint: "One value per student.", explanation: "30 values." },
  { id: "chal-y7-dtc-7", prompt: "Is 'shoe size' (e.g. 7, 8, 9) discrete or continuous? Answer D or C.", latex: "\\text{shoe size}", answer: "D", acceptedAnswers: ["discrete", "d"], hint: "Fixed steps.", explanation: "Shoe sizes are discrete." },
  { id: "chal-y7-dtc-8", prompt: "Is 'type of music preferred' categorical or numerical? Answer C or N.", latex: "\\text{music type}", answer: "C", acceptedAnswers: ["categorical", "c"], hint: "Label, not number.", explanation: "Categorical." },
  { id: "chal-y7-dtc-9", prompt: "To find the average height of all Year 7 students in NSW, surveying one school is what kind of study? Answer census or sample.", latex: "\\text{one school}", answer: "sample", acceptedAnswers: [], hint: "Not everyone is measured.", explanation: "A sample." },
  { id: "chal-y7-dtc-10", prompt: "Is 'time taken to run 100 m' discrete or continuous? Answer D or C.", latex: "\\text{time}", answer: "C", acceptedAnswers: ["continuous", "c"], hint: "Any value in a range.", explanation: "Time is continuous." },
  { id: "chal-y7-dtc-11", prompt: "A biased question pushes people toward one answer. Is 'Don't you agree our park is great?' biased or fair? Answer biased or fair.", latex: "\\text{question}", answer: "biased", acceptedAnswers: [], hint: "Does it lead the respondent?", explanation: "It leads the respondent — biased." },
  { id: "chal-y7-dtc-12", prompt: "Is 'mass in kg' categorical or numerical? Answer C or N.", latex: "\\text{mass}", answer: "N", acceptedAnswers: ["numerical", "n"], hint: "It is measured as a number.", explanation: "Numerical." },
];

// ── Data: frequency tables ────────────────────────────────────────────────────────────────────
export const frequencyTablesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-frt-1", prompt: "A frequency table has frequencies 4, 7, 5 and 9. How many data values were collected?", latex: "4+7+5+9", answer: "25", acceptedAnswers: [], hint: "Add the frequencies.", explanation: "4 + 7 + 5 + 9 = 25." },
  { id: "chal-y7-frt-2", prompt: "Scores 1, 2, 3 have frequencies 5, 8, 7. Find the total of all the scores (sum of value × frequency).", latex: "1(5)+2(3)... ", answer: "42", acceptedAnswers: [], hint: "1×5 + 2×8 + 3×7.", explanation: "5 + 16 + 21 = 42." },
  { id: "chal-y7-frt-3", prompt: "In a frequency table of 40 values, three classes have frequencies 12, 15 and 8. Find the fourth frequency.", latex: "40-12-15-8", answer: "5", acceptedAnswers: [], hint: "Total is 40.", explanation: "40 − 35 = 5." },
  { id: "chal-y7-frt-4", prompt: "A tally shows 'IIII IIII II' for a category. What frequency is that?", latex: "\\text{tally}", answer: "12", acceptedAnswers: [], hint: "Each group of 5 plus extras.", explanation: "5 + 5 + 2 = 12." },
  { id: "chal-y7-frt-5", prompt: "Values 0,1,2,3 have frequencies 6,10,9,5. Find the modal value (the most frequent value).", latex: "\\text{mode}", answer: "1", acceptedAnswers: [], hint: "Largest frequency.", explanation: "Frequency 10 occurs at value 1." },
  { id: "chal-y7-frt-6", prompt: "A frequency table of 50 values: a class has frequency 20. Find its relative frequency as a decimal.", latex: "20/50", answer: "0.4", acceptedAnswers: ["2/5"], hint: "Frequency ÷ total.", explanation: "20/50 = 0.4." },
  { id: "chal-y7-frt-7", prompt: "Scores 2,4,6 have frequencies 3,5,2. Find the mean (sum ÷ count).", latex: "\\tfrac{2(3)+4(5)+6(2)}{10}", answer: "3.8", acceptedAnswers: [], hint: "Total scores ÷ total frequency.", explanation: "(6 + 20 + 12)/10 = 38/10 = 3.8." },
  { id: "chal-y7-frt-8", prompt: "A frequency table has total 60. One class has relative frequency 0.25. Find its frequency.", latex: "0.25\\times60", answer: "15", acceptedAnswers: [], hint: "Relative frequency × total.", explanation: "0.25 × 60 = 15." },
  { id: "chal-y7-frt-9", prompt: "Values 10, 20, 30 have frequencies 2, 5, 3. Find the total of all values.", latex: "10(2)+20(5)+30(3)", answer: "210", acceptedAnswers: [], hint: "Value × frequency, summed.", explanation: "20 + 100 + 90 = 210." },
  { id: "chal-y7-frt-10", prompt: "In a table of 80 values, frequencies are 18, 22, x and 25. Find x.", latex: "80-18-22-25", answer: "15", acceptedAnswers: [], hint: "Total is 80.", explanation: "80 − 65 = 15." },
  { id: "chal-y7-frt-11", prompt: "Scores 1,2,3,4 have equal frequency and total 32 values. Find each frequency.", latex: "32/4", answer: "8", acceptedAnswers: [], hint: "Divide the total by 4.", explanation: "32/4 = 8." },
  { id: "chal-y7-frt-12", prompt: "A class has frequency 9 out of 36. Express its relative frequency as a percentage.", latex: "\\tfrac{9}{36}", answer: "25", acceptedAnswers: ["25%"], hint: "9/36 = 1/4.", explanation: "1/4 = 25%." },
];

// ── Data: dot plots and stem-and-leaf ─────────────────────────────────────────────────────────
export const dotPlotsStemLeafChallenge: PracticeQuestion[] = [
  { id: "chal-y7-dps-1", prompt: "A dot plot has dots at 3(×2), 4(×5), 5(×3). Find the total number of data values.", latex: "2+5+3", answer: "10", acceptedAnswers: [], hint: "Count the dots.", explanation: "2 + 5 + 3 = 10." },
  { id: "chal-y7-dps-2", prompt: "For the dot plot 3(×2), 4(×5), 5(×3), find the mode.", latex: "\\text{mode}", answer: "4", acceptedAnswers: [], hint: "Most dots.", explanation: "4 has the most dots." },
  { id: "chal-y7-dps-3", prompt: "For data 3,3,4,4,4,4,4,5,5,5, find the range.", latex: "5-3", answer: "2", acceptedAnswers: [], hint: "Max − min.", explanation: "5 − 3 = 2." },
  { id: "chal-y7-dps-4", prompt: "A stem-and-leaf has stem 2 with leaves 1, 4, 7 and stem 3 with leaves 0, 5. How many data values are there?", latex: "3+2", answer: "5", acceptedAnswers: [], hint: "Count the leaves.", explanation: "3 + 2 = 5 values." },
  { id: "chal-y7-dps-5", prompt: "Stem 2 | 1 4 7 and stem 3 | 0 5. Find the smallest value.", latex: "\\text{min}", answer: "21", acceptedAnswers: [], hint: "Smallest stem, smallest leaf.", explanation: "Stem 2, leaf 1 → 21." },
  { id: "chal-y7-dps-6", prompt: "Stem 2 | 1 4 7 and stem 3 | 0 5. Find the largest value.", latex: "\\text{max}", answer: "35", acceptedAnswers: [], hint: "Largest stem, largest leaf.", explanation: "Stem 3, leaf 5 → 35." },
  { id: "chal-y7-dps-7", prompt: "Stem 2 | 1 4 7 and stem 3 | 0 5 (values 21,24,27,30,35). Find the median.", latex: "\\text{median}", answer: "27", acceptedAnswers: [], hint: "Middle of 5 values.", explanation: "The 3rd value is 27." },
  { id: "chal-y7-dps-8", prompt: "For data 21,24,27,30,35, find the range.", latex: "35-21", answer: "14", acceptedAnswers: [], hint: "Max − min.", explanation: "35 − 21 = 14." },
  { id: "chal-y7-dps-9", prompt: "A dot plot of 12 values has 4 dots at the value 6. What fraction are at 6? Give a decimal.", latex: "4/12", answer: "0.333", acceptedAnswers: ["1/3"], hint: "4/12 = 1/3.", explanation: "1/3 ≈ 0.333." },
  { id: "chal-y7-dps-10", prompt: "Data 5,6,6,7,7,7,8. Find the mode.", latex: "\\text{mode}", answer: "7", acceptedAnswers: [], hint: "Most frequent.", explanation: "7 appears three times." },
  { id: "chal-y7-dps-11", prompt: "Data 5,6,6,7,7,7,8 (7 values). Find the median.", latex: "\\text{median}", answer: "7", acceptedAnswers: [], hint: "The 4th value.", explanation: "Middle of 7 values is the 4th = 7." },
  { id: "chal-y7-dps-12", prompt: "A dot plot shows an outlier at 20 while all other dots are between 3 and 6. Is 20 an outlier? Answer yes or no.", latex: "\\text{outlier?}", answer: "yes", acceptedAnswers: ["y"], hint: "Is it far from the rest?", explanation: "20 is well separated — an outlier." },
];

// ── Data: column, bar and line graphs ─────────────────────────────────────────────────────────
export const columnBarLineGraphsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-cbl-1", prompt: "A column graph shows 12, 8, 15 and 5. Find the total.", latex: "12+8+15+5", answer: "40", acceptedAnswers: [], hint: "Add the column heights.", explanation: "40." },
  { id: "chal-y7-cbl-2", prompt: "Columns are 12, 8, 15 and 5. Find the difference between the tallest and shortest.", latex: "15-5", answer: "10", acceptedAnswers: [], hint: "Max − min.", explanation: "15 − 5 = 10." },
  { id: "chal-y7-cbl-3", prompt: "A line graph rises from 20 to 50 over 6 hours. Find the average rate of change per hour.", latex: "\\tfrac{50-20}{6}", answer: "5", acceptedAnswers: [], hint: "Change ÷ time.", explanation: "30/6 = 5 per hour." },
  { id: "chal-y7-cbl-4", prompt: "On a graph, 1 square = 4 units. A column is 7 squares tall. What value does it show?", latex: "7\\times4", answer: "28", acceptedAnswers: [], hint: "Squares × scale.", explanation: "7 × 4 = 28." },
  { id: "chal-y7-cbl-5", prompt: "A column graph of 4 categories totals 100. Three are 30, 25 and 20. Find the fourth.", latex: "100-30-25-20", answer: "25", acceptedAnswers: [], hint: "Total is 100.", explanation: "100 − 75 = 25." },
  { id: "chal-y7-cbl-6", prompt: "A line graph shows temperatures 10, 14, 18, 22. Find the constant increase each step.", latex: "14-10", answer: "4", acceptedAnswers: [], hint: "Difference between steps.", explanation: "Each step rises 4." },
  { id: "chal-y7-cbl-7", prompt: "If 1 cm represents 50 people, how many people does a 6 cm bar show?", latex: "6\\times50", answer: "300", acceptedAnswers: [], hint: "cm × scale.", explanation: "300." },
  { id: "chal-y7-cbl-8", prompt: "A graph shows sales of 8, 12, 10, 14, 16 over 5 days. Find the mean daily sales.", latex: "\\tfrac{8+12+10+14+16}{5}", answer: "12", acceptedAnswers: [], hint: "Sum ÷ 5.", explanation: "60/5 = 12." },
  { id: "chal-y7-cbl-9", prompt: "A line graph falls from 80 to 20 over 4 hours. Find the average fall per hour.", latex: "\\tfrac{80-20}{4}", answer: "15", acceptedAnswers: [], hint: "Change ÷ time.", explanation: "60/4 = 15 per hour." },
  { id: "chal-y7-cbl-10", prompt: "A column shows 36 but the scale was misread as 1 square = 2 when it is 1 square = 3. The true value is 36 × (3/2). Find it.", latex: "36\\times\\tfrac32", answer: "54", acceptedAnswers: [], hint: "Rescale by 3/2.", explanation: "36 × 1.5 = 54." },
  { id: "chal-y7-cbl-11", prompt: "Two columns are in the ratio 3:5 and the taller is 40. Find the shorter.", latex: "3:5,\\ \\text{taller}=40", answer: "24", acceptedAnswers: [], hint: "5 parts = 40.", explanation: "Each part 8; shorter = 3×8 = 24." },
  { id: "chal-y7-cbl-12", prompt: "A line graph passes through (0, 5) and (4, 25). Find its value at x = 2 (assume a straight line).", latex: "\\text{midpoint }y", answer: "15", acceptedAnswers: [], hint: "Halfway in x → halfway in y.", explanation: "Midpoint of 5 and 25 is 15." },
];

// ── Data: choosing and interpreting displays ──────────────────────────────────────────────────
export const choosingInterpretingDisplaysChallenge: PracticeQuestion[] = [
  { id: "chal-y7-cid-1", prompt: "Which display best shows change over time: column, line or pie? Answer the word.", latex: "\\text{over time}", answer: "line", acceptedAnswers: [], hint: "Trends over time.", explanation: "A line graph shows change over time." },
  { id: "chal-y7-cid-2", prompt: "Which display best shows parts of a whole: line, pie or dot plot? Answer the word.", latex: "\\text{parts of a whole}", answer: "pie", acceptedAnswers: ["pie chart", "sector"], hint: "Proportions of a total.", explanation: "A pie (sector) graph shows parts of a whole." },
  { id: "chal-y7-cid-3", prompt: "A pie chart sector for 25% of the data is what angle (degrees)?", latex: "25\\%\\times360", answer: "90", acceptedAnswers: [], hint: "25% of 360°.", explanation: "0.25 × 360 = 90°." },
  { id: "chal-y7-cid-4", prompt: "A pie chart sector is 72°. What percentage of the data does it show?", latex: "\\tfrac{72}{360}", answer: "20", acceptedAnswers: ["20%"], hint: "72/360.", explanation: "72/360 = 20%." },
  { id: "chal-y7-cid-5", prompt: "In a pie chart of 200 people, a 90° sector represents how many people?", latex: "\\tfrac{90}{360}\\times200", answer: "50", acceptedAnswers: [], hint: "Sector fraction × total.", explanation: "(90/360) × 200 = 50." },
  { id: "chal-y7-cid-6", prompt: "A category is 40% of 360°. Find the sector angle (degrees).", latex: "40\\%\\times360", answer: "144", acceptedAnswers: [], hint: "0.4 × 360.", explanation: "144°." },
  { id: "chal-y7-cid-7", prompt: "Of the 360° in a pie chart, three sectors are 120°, 90° and 60°. Find the fourth sector (degrees).", latex: "360-120-90-60", answer: "90", acceptedAnswers: [], hint: "Sectors total 360°.", explanation: "360 − 270 = 90°." },
  { id: "chal-y7-cid-8", prompt: "A pie chart of 50 students has a sector of 36°. How many students is that?", latex: "\\tfrac{36}{360}\\times50", answer: "5", acceptedAnswers: [], hint: "36/360 = 1/10.", explanation: "1/10 of 50 = 5." },
  { id: "chal-y7-cid-9", prompt: "Numerical data with many values is best shown by a column graph or a histogram-style display? Answer column or histogram.", latex: "\\text{grouped numerical}", answer: "histogram", acceptedAnswers: [], hint: "Grouped numerical data.", explanation: "A histogram suits grouped numerical data." },
  { id: "chal-y7-cid-10", prompt: "A sector represents 1/8 of the data. Find its angle (degrees).", latex: "\\tfrac18\\times360", answer: "45", acceptedAnswers: [], hint: "360/8.", explanation: "45°." },
  { id: "chal-y7-cid-11", prompt: "Two pie-chart sectors are 30% and 45%. What percentage remains for the rest?", latex: "100-30-45", answer: "25", acceptedAnswers: ["25%"], hint: "Total is 100%.", explanation: "100 − 75 = 25%." },
  { id: "chal-y7-cid-12", prompt: "A 200-person pie chart has a 'walk' sector of 54°. How many walk?", latex: "\\tfrac{54}{360}\\times200", answer: "30", acceptedAnswers: [], hint: "54/360 × 200.", explanation: "(54/360) × 200 = 30." },
];

// ── Probability: language and scale ───────────────────────────────────────────────────────────
export const probabilityLanguageScaleChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pls-1", prompt: "An event is certain. What is its probability (as a number)?", latex: "P(\\text{certain})", answer: "1", acceptedAnswers: [], hint: "Certain = sure to happen.", explanation: "Certainty is probability 1." },
  { id: "chal-y7-pls-2", prompt: "An event is impossible. What is its probability?", latex: "P(\\text{impossible})", answer: "0", acceptedAnswers: [], hint: "Cannot happen.", explanation: "Probability 0." },
  { id: "chal-y7-pls-3", prompt: "The probability of rain is 0.7. Find the probability it does NOT rain.", latex: "1-0.7", answer: "0.3", acceptedAnswers: ["3/10"], hint: "Complement = 1 − P.", explanation: "1 − 0.7 = 0.3." },
  { id: "chal-y7-pls-4", prompt: "A probability is given as 3/5. Write it as a decimal.", latex: "\\tfrac35", answer: "0.6", acceptedAnswers: [], hint: "3 ÷ 5.", explanation: "0.6." },
  { id: "chal-y7-pls-5", prompt: "A probability is given as 40%. Write it as a fraction in simplest form.", latex: "40\\%", answer: "2/5", acceptedAnswers: ["0.4"], hint: "40/100.", explanation: "40/100 = 2/5." },
  { id: "chal-y7-pls-6", prompt: "If P(event) = 0.85, find P(not event).", latex: "1-0.85", answer: "0.15", acceptedAnswers: ["3/20"], hint: "Complement.", explanation: "1 − 0.85 = 0.15." },
  { id: "chal-y7-pls-7", prompt: "A spinner is twice as likely to land red as blue, with only those two colours. Find P(red) as a fraction.", latex: "P(\\text{red})", answer: "2/3", acceptedAnswers: [], hint: "Red:blue = 2:1.", explanation: "2 of 3 parts → 2/3." },
  { id: "chal-y7-pls-8", prompt: "Order these by likelihood and give the most likely value: P = 0.2, 0.55, 0.9. Give the largest.", latex: "\\max", answer: "0.9", acceptedAnswers: [], hint: "Largest probability.", explanation: "0.9 is most likely." },
  { id: "chal-y7-pls-9", prompt: "P(A) = 1/4. Find P(not A) as a fraction.", latex: "1-\\tfrac14", answer: "3/4", acceptedAnswers: ["0.75"], hint: "Complement.", explanation: "1 − 1/4 = 3/4." },
  { id: "chal-y7-pls-10", prompt: "A probability of 1/2 is described as what word: likely, even chance, or unlikely? Answer the phrase.", latex: "P=\\tfrac12", answer: "even chance", acceptedAnswers: ["even"], hint: "Halfway.", explanation: "1/2 is an even chance." },
  { id: "chal-y7-pls-11", prompt: "Three events have P = 0.3, 0.3 and x, and exactly one must occur. Find x.", latex: "0.3+0.3+x=1", answer: "0.4", acceptedAnswers: ["2/5"], hint: "Probabilities sum to 1.", explanation: "x = 1 − 0.6 = 0.4." },
  { id: "chal-y7-pls-12", prompt: "Write the probability 0.25 as a fraction in simplest form.", latex: "0.25", answer: "1/4", acceptedAnswers: [], hint: "25/100.", explanation: "1/4." },
];

// ── Probability: simple probability ───────────────────────────────────────────────────────────
export const simpleProbabilityChallenge: PracticeQuestion[] = [
  { id: "chal-y7-spr-1", prompt: "A fair die is rolled. Find P(rolling a number greater than 4) as a fraction.", latex: "P(>4)", answer: "1/3", acceptedAnswers: [], hint: "Favourable: 5, 6.", explanation: "2/6 = 1/3." },
  { id: "chal-y7-spr-2", prompt: "A bag has 5 red and 3 blue balls. Find P(red) as a fraction.", latex: "\\tfrac{5}{8}", answer: "5/8", acceptedAnswers: ["0.625"], hint: "Red ÷ total.", explanation: "5/8." },
  { id: "chal-y7-spr-3", prompt: "A card is drawn from 52. Find P(a heart) as a fraction.", latex: "\\tfrac{13}{52}", answer: "1/4", acceptedAnswers: ["0.25"], hint: "13 hearts.", explanation: "13/52 = 1/4." },
  { id: "chal-y7-spr-4", prompt: "A die is rolled. Find P(even number) as a fraction.", latex: "P(\\text{even})", answer: "1/2", acceptedAnswers: ["0.5"], hint: "2, 4, 6.", explanation: "3/6 = 1/2." },
  { id: "chal-y7-spr-5", prompt: "A bag has 4 red, 6 green, 10 yellow. Find P(green) as a fraction.", latex: "\\tfrac{6}{20}", answer: "3/10", acceptedAnswers: ["0.3"], hint: "6 of 20.", explanation: "6/20 = 3/10." },
  { id: "chal-y7-spr-6", prompt: "A spinner has 8 equal sectors, 3 of them winning. Find P(win) as a fraction.", latex: "\\tfrac38", answer: "3/8", acceptedAnswers: ["0.375"], hint: "3 of 8.", explanation: "3/8." },
  { id: "chal-y7-spr-7", prompt: "From letters of MATHS, one is chosen. Find P(a vowel) as a fraction.", latex: "\\tfrac15", answer: "1/5", acceptedAnswers: ["0.2"], hint: "Only A is a vowel.", explanation: "1/5." },
  { id: "chal-y7-spr-8", prompt: "A die is rolled. Find P(a factor of 6) as a fraction.", latex: "P(\\text{factor of }6)", answer: "2/3", acceptedAnswers: [], hint: "Factors of 6 on a die: 1,2,3,6.", explanation: "4/6 = 2/3." },
  { id: "chal-y7-spr-9", prompt: "A bag has 12 balls; P(red) = 1/3. How many red balls are there?", latex: "\\tfrac13\\times12", answer: "4", acceptedAnswers: [], hint: "1/3 of 12.", explanation: "4 red balls." },
  { id: "chal-y7-spr-10", prompt: "A jar has 7 white and some black marbles; P(white) = 7/10. How many black marbles?", latex: "10-7", answer: "3", acceptedAnswers: [], hint: "Total is 10.", explanation: "10 − 7 = 3 black." },
  { id: "chal-y7-spr-11", prompt: "Two dice are rolled. Find P(both show 6) as a fraction.", latex: "\\tfrac16\\times\\tfrac16", answer: "1/36", acceptedAnswers: [], hint: "Multiply the two probabilities.", explanation: "1/6 × 1/6 = 1/36." },
  { id: "chal-y7-spr-12", prompt: "A die is rolled. Find P(a prime number) as a fraction.", latex: "P(\\text{prime})", answer: "1/2", acceptedAnswers: ["0.5"], hint: "Primes on a die: 2, 3, 5.", explanation: "3/6 = 1/2." },
];

// ── Probability: two-step chance experiments ──────────────────────────────────────────────────
export const twoStepChanceExperimentsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-tsc-1", prompt: "Two coins are tossed. Find P(two heads) as a fraction.", latex: "\\tfrac12\\times\\tfrac12", answer: "1/4", acceptedAnswers: ["0.25"], hint: "HH out of 4 outcomes.", explanation: "1/4." },
  { id: "chal-y7-tsc-2", prompt: "Two coins are tossed. Find P(exactly one head) as a fraction.", latex: "P(\\text{one H})", answer: "1/2", acceptedAnswers: ["0.5"], hint: "HT and TH out of 4.", explanation: "2/4 = 1/2." },
  { id: "chal-y7-tsc-3", prompt: "How many outcomes when a coin is tossed and a die is rolled?", latex: "2\\times6", answer: "12", acceptedAnswers: [], hint: "Multiply the counts.", explanation: "2 × 6 = 12." },
  { id: "chal-y7-tsc-4", prompt: "A coin and a die: find P(heads and a 6) as a fraction.", latex: "\\tfrac12\\times\\tfrac16", answer: "1/12", acceptedAnswers: [], hint: "Multiply the probabilities.", explanation: "1/2 × 1/6 = 1/12." },
  { id: "chal-y7-tsc-5", prompt: "Two dice are rolled. How many outcomes in total?", latex: "6\\times6", answer: "36", acceptedAnswers: [], hint: "6 × 6.", explanation: "36." },
  { id: "chal-y7-tsc-6", prompt: "Two dice are rolled. Find P(sum equals 7) as a fraction.", latex: "\\tfrac{6}{36}", answer: "1/6", acceptedAnswers: [], hint: "6 ways to make 7.", explanation: "6/36 = 1/6." },
  { id: "chal-y7-tsc-7", prompt: "Two dice are rolled. Find P(sum equals 12) as a fraction.", latex: "\\tfrac{1}{36}", answer: "1/36", acceptedAnswers: [], hint: "Only 6 and 6.", explanation: "1/36." },
  { id: "chal-y7-tsc-8", prompt: "Three coins are tossed. How many outcomes?", latex: "2^3", answer: "8", acceptedAnswers: [], hint: "2 × 2 × 2.", explanation: "8 outcomes." },
  { id: "chal-y7-tsc-9", prompt: "Three coins are tossed. Find P(three tails) as a fraction.", latex: "\\tfrac18", answer: "1/8", acceptedAnswers: ["0.125"], hint: "1 of 8 outcomes.", explanation: "1/8." },
  { id: "chal-y7-tsc-10", prompt: "Two dice are rolled. Find P(a double, i.e. both the same) as a fraction.", latex: "\\tfrac{6}{36}", answer: "1/6", acceptedAnswers: [], hint: "6 doubles out of 36.", explanation: "6/36 = 1/6." },
  { id: "chal-y7-tsc-11", prompt: "A bag has 3 red, 2 blue. Two are drawn WITH replacement. Find P(both red) as a fraction.", latex: "\\tfrac35\\times\\tfrac35", answer: "9/25", acceptedAnswers: ["0.36"], hint: "Same probability each draw.", explanation: "3/5 × 3/5 = 9/25." },
  { id: "chal-y7-tsc-12", prompt: "Spinner A (1,2,3) and spinner B (1,2). How many outcome pairs are there?", latex: "3\\times2", answer: "6", acceptedAnswers: [], hint: "3 × 2.", explanation: "6 outcomes." },
];

// ── Probability: relative frequency ───────────────────────────────────────────────────────────
export const relativeFrequencyChallenge: PracticeQuestion[] = [
  { id: "chal-y7-rfq-1", prompt: "A coin lands heads 27 times in 60 tosses. Find the relative frequency of heads as a decimal.", latex: "\\tfrac{27}{60}", answer: "0.45", acceptedAnswers: ["9/20"], hint: "Heads ÷ tosses.", explanation: "27/60 = 0.45." },
  { id: "chal-y7-rfq-2", prompt: "A spinner lands on red 18 of 50 spins. Estimate P(red) as a decimal.", latex: "\\tfrac{18}{50}", answer: "0.36", acceptedAnswers: ["9/25"], hint: "18 ÷ 50.", explanation: "0.36." },
  { id: "chal-y7-rfq-3", prompt: "If P(win) ≈ 0.2 from data, estimate the number of wins in 200 trials.", latex: "0.2\\times200", answer: "40", acceptedAnswers: [], hint: "Probability × trials.", explanation: "40 wins." },
  { id: "chal-y7-rfq-4", prompt: "A die shows a 6 on 24 of 120 rolls. Find the relative frequency as a fraction.", latex: "\\tfrac{24}{120}", answer: "1/5", acceptedAnswers: ["0.2"], hint: "24/120.", explanation: "1/5." },
  { id: "chal-y7-rfq-5", prompt: "A drawing pin lands 'up' 35 of 50 times. Estimate P(up) as a decimal.", latex: "\\tfrac{35}{50}", answer: "0.7", acceptedAnswers: ["7/10"], hint: "35 ÷ 50.", explanation: "0.7." },
  { id: "chal-y7-rfq-6", prompt: "From 400 trials with P ≈ 0.15, estimate the number of successes.", latex: "0.15\\times400", answer: "60", acceptedAnswers: [], hint: "0.15 × 400.", explanation: "60." },
  { id: "chal-y7-rfq-7", prompt: "A bag test: 12 of 80 draws were green. Estimate the number of green in a bag of 20 with the same proportion.", latex: "\\tfrac{12}{80}\\times20", answer: "3", acceptedAnswers: [], hint: "Proportion × 20.", explanation: "0.15 × 20 = 3." },
  { id: "chal-y7-rfq-8", prompt: "A coin lands tails 90 of 150 tosses. Find the relative frequency of tails as a decimal.", latex: "\\tfrac{90}{150}", answer: "0.6", acceptedAnswers: ["3/5"], hint: "90 ÷ 150.", explanation: "0.6." },
  { id: "chal-y7-rfq-9", prompt: "Experimental P(red) = 0.25 over 60 trials. How many reds were observed?", latex: "0.25\\times60", answer: "15", acceptedAnswers: [], hint: "0.25 × 60.", explanation: "15." },
  { id: "chal-y7-rfq-10", prompt: "After 200 spins, blue came up 50 times. Estimate P(blue) as a fraction in simplest form.", latex: "\\tfrac{50}{200}", answer: "1/4", acceptedAnswers: ["0.25"], hint: "50/200.", explanation: "1/4." },
  { id: "chal-y7-rfq-11", prompt: "A factory finds 6 faulty in 300 items. Estimate faulty items in a batch of 2500.", latex: "\\tfrac{6}{300}\\times2500", answer: "50", acceptedAnswers: [], hint: "Rate 0.02 × 2500.", explanation: "0.02 × 2500 = 50." },
  { id: "chal-y7-rfq-12", prompt: "A trial gives relative frequency 0.45 for an event over 80 trials. How many times did it occur?", latex: "0.45\\times80", answer: "36", acceptedAnswers: [], hint: "0.45 × 80.", explanation: "36." },
];

// ── Probability: expected outcomes ────────────────────────────────────────────────────────────
export const expectedOutcomesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-exo-1", prompt: "A die is rolled 60 times. How many 3s are expected?", latex: "\\tfrac16\\times60", answer: "10", acceptedAnswers: [], hint: "P × trials.", explanation: "1/6 × 60 = 10." },
  { id: "chal-y7-exo-2", prompt: "A coin is tossed 80 times. How many heads are expected?", latex: "\\tfrac12\\times80", answer: "40", acceptedAnswers: [], hint: "1/2 × 80.", explanation: "40." },
  { id: "chal-y7-exo-3", prompt: "A spinner has P(win) = 1/4. In 100 spins, how many wins are expected?", latex: "\\tfrac14\\times100", answer: "25", acceptedAnswers: [], hint: "1/4 × 100.", explanation: "25." },
  { id: "chal-y7-exo-4", prompt: "A bag has P(red) = 3/10. In 200 draws (with replacement), how many reds expected?", latex: "\\tfrac{3}{10}\\times200", answer: "60", acceptedAnswers: [], hint: "0.3 × 200.", explanation: "60." },
  { id: "chal-y7-exo-5", prompt: "A die is rolled 120 times. How many even numbers are expected?", latex: "\\tfrac12\\times120", answer: "60", acceptedAnswers: [], hint: "P(even) = 1/2.", explanation: "60." },
  { id: "chal-y7-exo-6", prompt: "P(faulty) = 0.05. In 400 items, how many faulty are expected?", latex: "0.05\\times400", answer: "20", acceptedAnswers: [], hint: "0.05 × 400.", explanation: "20." },
  { id: "chal-y7-exo-7", prompt: "A spinner lands on blue with P = 2/5. In 75 spins, how many blues are expected?", latex: "\\tfrac25\\times75", answer: "30", acceptedAnswers: [], hint: "2/5 × 75.", explanation: "30." },
  { id: "chal-y7-exo-8", prompt: "If 12 sixes are expected from rolling a die, how many rolls were there?", latex: "12\\div\\tfrac16", answer: "72", acceptedAnswers: [], hint: "Expected = P × n → n = expected ÷ P.", explanation: "12 ÷ (1/6) = 72." },
  { id: "chal-y7-exo-9", prompt: "A coin is tossed 50 times. How many tails are expected?", latex: "\\tfrac12\\times50", answer: "25", acceptedAnswers: [], hint: "1/2 × 50.", explanation: "25." },
  { id: "chal-y7-exo-10", prompt: "P(prize) = 1/8. From 240 tickets, how many prizes are expected?", latex: "\\tfrac18\\times240", answer: "30", acceptedAnswers: [], hint: "240 ÷ 8.", explanation: "30." },
  { id: "chal-y7-exo-11", prompt: "A die is rolled 90 times. How many numbers greater than 4 are expected?", latex: "\\tfrac13\\times90", answer: "30", acceptedAnswers: [], hint: "P(>4) = 2/6 = 1/3.", explanation: "1/3 × 90 = 30." },
  { id: "chal-y7-exo-12", prompt: "If 45 heads are expected from a fair coin, how many tosses were there?", latex: "45\\div\\tfrac12", answer: "90", acceptedAnswers: [], hint: "n = expected ÷ P.", explanation: "45 ÷ (1/2) = 90." },
];
