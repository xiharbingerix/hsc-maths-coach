import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 3. D6 (Level-6) challenge pools, 12 per section, for the number cluster:
// fractions (6 sections) and percentages (4). Registered course-scoped
// ("year-7-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the
// existing challenge flow (no new system). Auto-markable single-value answers (fractions accept a
// decimal equivalent; percentage answers accept the "n%" form). Exponents in prose are wrapped in
// $...$ (the latex field is not audit-scanned).

const pct = (n: string): string[] => [n + "%"];

// ── Fractions: types and equivalence ──────────────────────────────────────────────────────────
export const fractionsTypesEquivalenceChallenge: PracticeQuestion[] = [
  { id: "chal-y7-fte-1", prompt: "Simplify 18/24 to lowest terms.", latex: "\\tfrac{18}{24}", answer: "3/4", acceptedAnswers: ["0.75"], hint: "Divide by the HCF 6.", explanation: "18/24 = 3/4." },
  { id: "chal-y7-fte-2", prompt: "Simplify 36/48 to lowest terms.", latex: "\\tfrac{36}{48}", answer: "3/4", acceptedAnswers: ["0.75"], hint: "HCF is 12.", explanation: "36/48 = 3/4." },
  { id: "chal-y7-fte-3", prompt: "Find the missing numerator: 3/5 = n/20.", latex: "\\tfrac{3}{5}=\\tfrac{n}{20}", answer: "12", acceptedAnswers: [], hint: "20 = 5 × 4.", explanation: "3 × 4 = 12." },
  { id: "chal-y7-fte-4", prompt: "Simplify 45/60 to lowest terms.", latex: "\\tfrac{45}{60}", answer: "3/4", acceptedAnswers: ["0.75"], hint: "HCF is 15.", explanation: "45/60 = 3/4." },
  { id: "chal-y7-fte-5", prompt: "What fraction of 1 hour is 25 minutes? Give the simplest form.", latex: "\\tfrac{25}{60}", answer: "5/12", acceptedAnswers: [], hint: "25/60, then simplify.", explanation: "25/60 = 5/12." },
  { id: "chal-y7-fte-6", prompt: "Simplify 84/96 to lowest terms.", latex: "\\tfrac{84}{96}", answer: "7/8", acceptedAnswers: ["0.875"], hint: "HCF is 12.", explanation: "84/96 = 7/8." },
  { id: "chal-y7-fte-7", prompt: "Find x: 2/7 = 8/x.", latex: "\\tfrac{2}{7}=\\tfrac{8}{x}", answer: "28", acceptedAnswers: [], hint: "8 = 2 × 4.", explanation: "x = 7 × 4 = 28." },
  { id: "chal-y7-fte-8", prompt: "Simplify 27/72 to lowest terms.", latex: "\\tfrac{27}{72}", answer: "3/8", acceptedAnswers: ["0.375"], hint: "HCF is 9.", explanation: "27/72 = 3/8." },
  { id: "chal-y7-fte-9", prompt: "Express 3/4 with denominator 28. Give the numerator.", latex: "\\tfrac{3}{4}=\\tfrac{n}{28}", answer: "21", acceptedAnswers: [], hint: "28 = 4 × 7.", explanation: "3 × 7 = 21." },
  { id: "chal-y7-fte-10", prompt: "Simplify 100/250 to lowest terms.", latex: "\\tfrac{100}{250}", answer: "2/5", acceptedAnswers: ["0.4"], hint: "HCF is 50.", explanation: "100/250 = 2/5." },
  { id: "chal-y7-fte-11", prompt: "What fraction of $2 is 50c? Give the simplest form.", latex: "\\tfrac{50}{200}", answer: "1/4", acceptedAnswers: ["0.25"], hint: "$2 = 200c.", explanation: "50/200 = 1/4." },
  { id: "chal-y7-fte-12", prompt: "Simplify 16/64 to lowest terms.", latex: "\\tfrac{16}{64}", answer: "1/4", acceptedAnswers: ["0.25"], hint: "HCF is 16.", explanation: "16/64 = 1/4." },
];

// ── Fractions: comparing and ordering ─────────────────────────────────────────────────────────
export const comparingOrderingFractionsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-cof-1", prompt: "Which is larger, 3/5 or 5/8? Give the larger fraction.", latex: "\\tfrac35\\ ?\\ \\tfrac58", answer: "5/8", acceptedAnswers: ["0.625"], hint: "Compare as decimals.", explanation: "0.6 < 0.625, so 5/8." },
  { id: "chal-y7-cof-2", prompt: "Which is larger, 7/12 or 2/3? Give the larger fraction.", latex: "\\tfrac{7}{12}\\ ?\\ \\tfrac23", answer: "2/3", acceptedAnswers: [], hint: "Common denominator 12.", explanation: "8/12 > 7/12, so 2/3." },
  { id: "chal-y7-cof-3", prompt: "How many of these are greater than 1/2: 3/7, 5/9, 4/8, 2/5?", latex: ">\\tfrac12", answer: "1", acceptedAnswers: [], hint: "Compare each to 1/2.", explanation: "Only 5/9 > 1/2 (4/8 equals 1/2)." },
  { id: "chal-y7-cof-4", prompt: "Which is smaller, 4/9 or 5/11? Give the smaller fraction.", latex: "\\tfrac49\\ ?\\ \\tfrac{5}{11}", answer: "4/9", acceptedAnswers: [], hint: "Compare as decimals.", explanation: "0.444 < 0.4545, so 4/9." },
  { id: "chal-y7-cof-5", prompt: "Which is larger, 0.6 or 5/9? Give the larger value as written.", latex: "0.6\\ ?\\ \\tfrac59", answer: "0.6", acceptedAnswers: [], hint: "5/9 ≈ 0.556.", explanation: "0.6 > 0.556." },
  { id: "chal-y7-cof-6", prompt: "Order 1/2, 1/3, 1/4 and give the middle (median) fraction.", latex: "\\text{median}", answer: "1/3", acceptedAnswers: [], hint: "Larger denominator = smaller value.", explanation: "1/4 < 1/3 < 1/2, median 1/3." },
  { id: "chal-y7-cof-7", prompt: "Which is larger, 5/6 or 8/9? Give the larger fraction.", latex: "\\tfrac56\\ ?\\ \\tfrac89", answer: "8/9", acceptedAnswers: [], hint: "Common denominator 18.", explanation: "16/18 > 15/18, so 8/9." },
  { id: "chal-y7-cof-8", prompt: "How many fractions of the form n/6 lie strictly between 1/3 and 5/6?", latex: "\\tfrac13<\\tfrac n6<\\tfrac56", answer: "2", acceptedAnswers: [], hint: "1/3 = 2/6, 5/6 = 5/6.", explanation: "3/6 and 4/6 → 2 of them." },
  { id: "chal-y7-cof-9", prompt: "Which is closer to 1: 7/8 or 8/9? Give that fraction.", latex: "\\text{closer to }1", answer: "8/9", acceptedAnswers: [], hint: "Compare the gaps 1/8 and 1/9.", explanation: "8/9 is 1/9 away, closer than 7/8 (1/8 away)." },
  { id: "chal-y7-cof-10", prompt: "Which is larger, 11/20 or 0.6? Give the larger value as written.", latex: "\\tfrac{11}{20}\\ ?\\ 0.6", answer: "0.6", acceptedAnswers: [], hint: "11/20 = 0.55.", explanation: "0.6 > 0.55." },
  { id: "chal-y7-cof-11", prompt: "What fraction lies exactly halfway between 1/4 and 3/4?", latex: "\\text{midpoint}", answer: "1/2", acceptedAnswers: ["0.5"], hint: "Average them.", explanation: "(1/4 + 3/4)/2 = 1/2." },
  { id: "chal-y7-cof-12", prompt: "Which is larger, 2/3 or 7/10? Give the larger fraction.", latex: "\\tfrac23\\ ?\\ \\tfrac{7}{10}", answer: "7/10", acceptedAnswers: ["0.7"], hint: "Common denominator 30.", explanation: "21/30 > 20/30, so 7/10." },
];

// ── Fractions: adding and subtracting ─────────────────────────────────────────────────────────
export const addingSubtractingFractionsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-asf-1", prompt: "Evaluate 1/2 + 1/3.", latex: "\\tfrac12+\\tfrac13", answer: "5/6", acceptedAnswers: [], hint: "Common denominator 6.", explanation: "3/6 + 2/6 = 5/6." },
  { id: "chal-y7-asf-2", prompt: "Evaluate 3/4 − 1/6.", latex: "\\tfrac34-\\tfrac16", answer: "7/12", acceptedAnswers: [], hint: "Common denominator 12.", explanation: "9/12 − 2/12 = 7/12." },
  { id: "chal-y7-asf-3", prompt: "Evaluate 2/3 + 1/4.", latex: "\\tfrac23+\\tfrac14", answer: "11/12", acceptedAnswers: [], hint: "Common denominator 12.", explanation: "8/12 + 3/12 = 11/12." },
  { id: "chal-y7-asf-4", prompt: "Evaluate 5/6 − 1/2. Give the simplest form.", latex: "\\tfrac56-\\tfrac12", answer: "1/3", acceptedAnswers: [], hint: "Common denominator 6.", explanation: "5/6 − 3/6 = 2/6 = 1/3." },
  { id: "chal-y7-asf-5", prompt: "Evaluate 1/2 + 1/4 + 1/8.", latex: "\\tfrac12+\\tfrac14+\\tfrac18", answer: "7/8", acceptedAnswers: ["0.875"], hint: "Common denominator 8.", explanation: "4/8 + 2/8 + 1/8 = 7/8." },
  { id: "chal-y7-asf-6", prompt: "Evaluate 7/8 − 3/4.", latex: "\\tfrac78-\\tfrac34", answer: "1/8", acceptedAnswers: ["0.125"], hint: "Common denominator 8.", explanation: "7/8 − 6/8 = 1/8." },
  { id: "chal-y7-asf-7", prompt: "Evaluate 2/5 + 3/10.", latex: "\\tfrac25+\\tfrac{3}{10}", answer: "7/10", acceptedAnswers: ["0.7"], hint: "Common denominator 10.", explanation: "4/10 + 3/10 = 7/10." },
  { id: "chal-y7-asf-8", prompt: "Evaluate 1 − 3/7.", latex: "1-\\tfrac37", answer: "4/7", acceptedAnswers: [], hint: "1 = 7/7.", explanation: "7/7 − 3/7 = 4/7." },
  { id: "chal-y7-asf-9", prompt: "Evaluate 5/6 + 2/3. Give as an improper fraction.", latex: "\\tfrac56+\\tfrac23", answer: "3/2", acceptedAnswers: ["1.5", "1 1/2"], hint: "Common denominator 6.", explanation: "5/6 + 4/6 = 9/6 = 3/2." },
  { id: "chal-y7-asf-10", prompt: "Evaluate 11/12 − 1/3.", latex: "\\tfrac{11}{12}-\\tfrac13", answer: "7/12", acceptedAnswers: [], hint: "Common denominator 12.", explanation: "11/12 − 4/12 = 7/12." },
  { id: "chal-y7-asf-11", prompt: "Evaluate 1/3 + 1/6. Give the simplest form.", latex: "\\tfrac13+\\tfrac16", answer: "1/2", acceptedAnswers: ["0.5"], hint: "Common denominator 6.", explanation: "2/6 + 1/6 = 3/6 = 1/2." },
  { id: "chal-y7-asf-12", prompt: "Evaluate 2 1/2 − 3/4. Give as an improper fraction.", latex: "2\\tfrac12-\\tfrac34", answer: "7/4", acceptedAnswers: ["1.75", "1 3/4"], hint: "2½ = 10/4.", explanation: "10/4 − 3/4 = 7/4." },
];

// ── Fractions: multiplying and dividing ───────────────────────────────────────────────────────
export const multiplyingDividingFractionsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-mdf-1", prompt: "Evaluate 2/3 × 3/4. Give the simplest form.", latex: "\\tfrac23\\times\\tfrac34", answer: "1/2", acceptedAnswers: ["0.5"], hint: "Multiply across, then simplify.", explanation: "6/12 = 1/2." },
  { id: "chal-y7-mdf-2", prompt: "Evaluate 3/5 ÷ 2/15. Give as an improper fraction.", latex: "\\tfrac35\\div\\tfrac{2}{15}", answer: "9/2", acceptedAnswers: ["4.5"], hint: "Multiply by the reciprocal.", explanation: "3/5 × 15/2 = 45/10 = 9/2." },
  { id: "chal-y7-mdf-3", prompt: "Evaluate 4/9 × 3/8. Give the simplest form.", latex: "\\tfrac49\\times\\tfrac38", answer: "1/6", acceptedAnswers: [], hint: "Cancel before multiplying.", explanation: "12/72 = 1/6." },
  { id: "chal-y7-mdf-4", prompt: "Evaluate 5/6 ÷ 5/12.", latex: "\\tfrac56\\div\\tfrac{5}{12}", answer: "2", acceptedAnswers: [], hint: "Multiply by the reciprocal.", explanation: "5/6 × 12/5 = 2." },
  { id: "chal-y7-mdf-5", prompt: "Find 2/3 of 18.", latex: "\\tfrac23\\times18", answer: "12", acceptedAnswers: [], hint: "Divide by 3, times 2.", explanation: "18/3 = 6; 6 × 2 = 12." },
  { id: "chal-y7-mdf-6", prompt: "Evaluate $(1/2)^2$. Give the simplest form.", latex: "(1/2)^2", answer: "1/4", acceptedAnswers: ["0.25"], hint: "Square top and bottom.", explanation: "1/4." },
  { id: "chal-y7-mdf-7", prompt: "Evaluate 3/4 ÷ 6. Give the simplest form.", latex: "\\tfrac34\\div6", answer: "1/8", acceptedAnswers: ["0.125"], hint: "Dividing by 6 = × 1/6.", explanation: "3/24 = 1/8." },
  { id: "chal-y7-mdf-8", prompt: "Evaluate 7/10 × 5. Give as an improper fraction.", latex: "\\tfrac{7}{10}\\times5", answer: "7/2", acceptedAnswers: ["3.5"], hint: "35/10, then simplify.", explanation: "35/10 = 7/2." },
  { id: "chal-y7-mdf-9", prompt: "Evaluate 3/8 × 4/9. Give the simplest form.", latex: "\\tfrac38\\times\\tfrac49", answer: "1/6", acceptedAnswers: [], hint: "Cancel first.", explanation: "12/72 = 1/6." },
  { id: "chal-y7-mdf-10", prompt: "Evaluate 5/8 ÷ 1/4. Give as an improper fraction.", latex: "\\tfrac58\\div\\tfrac14", answer: "5/2", acceptedAnswers: ["2.5"], hint: "× reciprocal of 1/4.", explanation: "5/8 × 4 = 20/8 = 5/2." },
  { id: "chal-y7-mdf-11", prompt: "Find 2/3 of 3/4 of 24.", latex: "\\tfrac23\\times\\tfrac34\\times24", answer: "12", acceptedAnswers: [], hint: "2/3 × 3/4 = 1/2.", explanation: "1/2 of 24 = 12." },
  { id: "chal-y7-mdf-12", prompt: "Evaluate $(2/3)^2\\times9$.", latex: "(2/3)^2\\times9", answer: "4", acceptedAnswers: [], hint: "(2/3)² = 4/9.", explanation: "4/9 × 9 = 4." },
];

// ── Fractions/decimals conversion ─────────────────────────────────────────────────────────────
export const fractionsDecimalsConversionChallenge: PracticeQuestion[] = [
  { id: "chal-y7-fdc-1", prompt: "Write 3/8 as a decimal.", latex: "\\tfrac38", answer: "0.375", acceptedAnswers: [], hint: "3 ÷ 8.", explanation: "3/8 = 0.375." },
  { id: "chal-y7-fdc-2", prompt: "Write 0.45 as a fraction in simplest form.", latex: "0.45", answer: "9/20", acceptedAnswers: [], hint: "45/100, then simplify.", explanation: "45/100 = 9/20." },
  { id: "chal-y7-fdc-3", prompt: "Write 7/20 as a decimal.", latex: "\\tfrac{7}{20}", answer: "0.35", acceptedAnswers: [], hint: "Make denominator 100.", explanation: "35/100 = 0.35." },
  { id: "chal-y7-fdc-4", prompt: "Write 0.125 as a fraction in simplest form.", latex: "0.125", answer: "1/8", acceptedAnswers: [], hint: "125/1000.", explanation: "125/1000 = 1/8." },
  { id: "chal-y7-fdc-5", prompt: "Write 5/8 as a decimal.", latex: "\\tfrac58", answer: "0.625", acceptedAnswers: [], hint: "5 ÷ 8.", explanation: "5/8 = 0.625." },
  { id: "chal-y7-fdc-6", prompt: "Write 0.6 as a fraction in simplest form.", latex: "0.6", answer: "3/5", acceptedAnswers: [], hint: "6/10.", explanation: "6/10 = 3/5." },
  { id: "chal-y7-fdc-7", prompt: "Write 9/25 as a decimal.", latex: "\\tfrac{9}{25}", answer: "0.36", acceptedAnswers: [], hint: "Make denominator 100.", explanation: "36/100 = 0.36." },
  { id: "chal-y7-fdc-8", prompt: "Write 0.04 as a fraction in simplest form.", latex: "0.04", answer: "1/25", acceptedAnswers: [], hint: "4/100.", explanation: "4/100 = 1/25." },
  { id: "chal-y7-fdc-9", prompt: "Write 11/40 as a decimal.", latex: "\\tfrac{11}{40}", answer: "0.275", acceptedAnswers: [], hint: "11 ÷ 40.", explanation: "11/40 = 0.275." },
  { id: "chal-y7-fdc-10", prompt: "Write 0.85 as a fraction in simplest form.", latex: "0.85", answer: "17/20", acceptedAnswers: [], hint: "85/100.", explanation: "85/100 = 17/20." },
  { id: "chal-y7-fdc-11", prompt: "Write 1/16 as a decimal.", latex: "\\tfrac{1}{16}", answer: "0.0625", acceptedAnswers: [], hint: "1 ÷ 16.", explanation: "1/16 = 0.0625." },
  { id: "chal-y7-fdc-12", prompt: "Write 2.75 as an improper fraction in simplest form.", latex: "2.75", answer: "11/4", acceptedAnswers: [], hint: "2.75 = 275/100.", explanation: "275/100 = 11/4." },
];

// ── Decimals operations ───────────────────────────────────────────────────────────────────────
export const decimalsOperationsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-dop-1", prompt: "Evaluate 0.6 × 0.4.", latex: "0.6\\times0.4", answer: "0.24", acceptedAnswers: [], hint: "6 × 4 = 24, then place the point.", explanation: "0.24." },
  { id: "chal-y7-dop-2", prompt: "Evaluate 1.2 + 0.85 + 3.", latex: "1.2+0.85+3", answer: "5.05", acceptedAnswers: [], hint: "Line up the points.", explanation: "5.05." },
  { id: "chal-y7-dop-3", prompt: "Evaluate 5 − 2.35.", latex: "5-2.35", answer: "2.65", acceptedAnswers: [], hint: "5.00 − 2.35.", explanation: "2.65." },
  { id: "chal-y7-dop-4", prompt: "Evaluate 0.75 ÷ 0.25.", latex: "0.75\\div0.25", answer: "3", acceptedAnswers: [], hint: "Same as 75 ÷ 25.", explanation: "3." },
  { id: "chal-y7-dop-5", prompt: "Evaluate 0.05 × 0.05.", latex: "0.05\\times0.05", answer: "0.0025", acceptedAnswers: [], hint: "5 × 5 = 25, four decimal places.", explanation: "0.0025." },
  { id: "chal-y7-dop-6", prompt: "Evaluate 3.6 ÷ 0.9.", latex: "3.6\\div0.9", answer: "4", acceptedAnswers: [], hint: "Same as 36 ÷ 9.", explanation: "4." },
  { id: "chal-y7-dop-7", prompt: "Evaluate 12.5 × 0.8.", latex: "12.5\\times0.8", answer: "10", acceptedAnswers: [], hint: "12.5 × 8 = 100.", explanation: "10." },
  { id: "chal-y7-dop-8", prompt: "Evaluate 2.5 + 1.75 − 0.5.", latex: "2.5+1.75-0.5", answer: "3.75", acceptedAnswers: [], hint: "Add then subtract.", explanation: "3.75." },
  { id: "chal-y7-dop-9", prompt: "Evaluate $0.2^3$.", latex: "0.2^3", answer: "0.008", acceptedAnswers: [], hint: "0.2 × 0.2 × 0.2.", explanation: "0.008." },
  { id: "chal-y7-dop-10", prompt: "Evaluate 7.2 ÷ 0.6.", latex: "7.2\\div0.6", answer: "12", acceptedAnswers: [], hint: "Same as 72 ÷ 6.", explanation: "12." },
  { id: "chal-y7-dop-11", prompt: "Evaluate 0.45 × 100.", latex: "0.45\\times100", answer: "45", acceptedAnswers: [], hint: "Shift two places.", explanation: "45." },
  { id: "chal-y7-dop-12", prompt: "Evaluate 9 − 0.99.", latex: "9-0.99", answer: "8.01", acceptedAnswers: [], hint: "9.00 − 0.99.", explanation: "8.01." },
];

// ── Percentages: converting between fractions, decimals, percentages ──────────────────────────
export const convertingFractionsDecimalsPercentagesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-cfp-1", prompt: "Write 3/5 as a percentage.", latex: "\\tfrac35", answer: "60", acceptedAnswers: pct("60"), hint: "× 100%.", explanation: "3/5 = 60%." },
  { id: "chal-y7-cfp-2", prompt: "Write 0.07 as a percentage.", latex: "0.07", answer: "7", acceptedAnswers: pct("7"), hint: "× 100%.", explanation: "0.07 = 7%." },
  { id: "chal-y7-cfp-3", prompt: "Write 45% as a fraction in simplest form.", latex: "45\\%", answer: "9/20", acceptedAnswers: [], hint: "45/100.", explanation: "45/100 = 9/20." },
  { id: "chal-y7-cfp-4", prompt: "Write 7/8 as a percentage.", latex: "\\tfrac78", answer: "87.5", acceptedAnswers: pct("87.5"), hint: "7 ÷ 8 × 100.", explanation: "7/8 = 87.5%." },
  { id: "chal-y7-cfp-5", prompt: "Write 125% as a decimal.", latex: "125\\%", answer: "1.25", acceptedAnswers: [], hint: "÷ 100.", explanation: "125% = 1.25." },
  { id: "chal-y7-cfp-6", prompt: "Write 0.005 as a percentage.", latex: "0.005", answer: "0.5", acceptedAnswers: pct("0.5"), hint: "× 100%.", explanation: "0.005 = 0.5%." },
  { id: "chal-y7-cfp-7", prompt: "Write 3/20 as a percentage.", latex: "\\tfrac{3}{20}", answer: "15", acceptedAnswers: pct("15"), hint: "Make denominator 100.", explanation: "15/100 = 15%." },
  { id: "chal-y7-cfp-8", prompt: "Write 64% as a fraction in simplest form.", latex: "64\\%", answer: "16/25", acceptedAnswers: [], hint: "64/100.", explanation: "64/100 = 16/25." },
  { id: "chal-y7-cfp-9", prompt: "Write 1/3 as a percentage, correct to 1 decimal place.", latex: "\\tfrac13", answer: "33.3", acceptedAnswers: pct("33.3"), hint: "1 ÷ 3 × 100.", explanation: "1/3 ≈ 33.3%." },
  { id: "chal-y7-cfp-10", prompt: "Write 2.5 as a percentage.", latex: "2.5", answer: "250", acceptedAnswers: pct("250"), hint: "× 100%.", explanation: "2.5 = 250%." },
  { id: "chal-y7-cfp-11", prompt: "Write 0.6% as a decimal.", latex: "0.6\\%", answer: "0.006", acceptedAnswers: [], hint: "÷ 100.", explanation: "0.6% = 0.006." },
  { id: "chal-y7-cfp-12", prompt: "Write 9/25 as a percentage.", latex: "\\tfrac{9}{25}", answer: "36", acceptedAnswers: pct("36"), hint: "Make denominator 100.", explanation: "36/100 = 36%." },
];

// ── Percentages: percentage of a quantity ─────────────────────────────────────────────────────
export const percentageOfQuantityChallenge: PracticeQuestion[] = [
  { id: "chal-y7-poq-1", prompt: "Find 15% of 80.", latex: "15\\%\\times80", answer: "12", acceptedAnswers: [], hint: "0.15 × 80.", explanation: "12." },
  { id: "chal-y7-poq-2", prompt: "Find 30% of 250.", latex: "30\\%\\times250", answer: "75", acceptedAnswers: [], hint: "0.3 × 250.", explanation: "75." },
  { id: "chal-y7-poq-3", prompt: "Find 12.5% of 64.", latex: "12.5\\%\\times64", answer: "8", acceptedAnswers: [], hint: "12.5% = 1/8.", explanation: "64/8 = 8." },
  { id: "chal-y7-poq-4", prompt: "Find 8% of 150.", latex: "8\\%\\times150", answer: "12", acceptedAnswers: [], hint: "0.08 × 150.", explanation: "12." },
  { id: "chal-y7-poq-5", prompt: "20% of a number is 14. Find the number.", latex: "0.2n=14", answer: "70", acceptedAnswers: [], hint: "Divide by 0.2.", explanation: "14 / 0.2 = 70." },
  { id: "chal-y7-poq-6", prompt: "Find 75% of 36.", latex: "75\\%\\times36", answer: "27", acceptedAnswers: [], hint: "3/4 of 36.", explanation: "27." },
  { id: "chal-y7-poq-7", prompt: "Find 150% of 60.", latex: "150\\%\\times60", answer: "90", acceptedAnswers: [], hint: "1.5 × 60.", explanation: "90." },
  { id: "chal-y7-poq-8", prompt: "Find 5% of 5% of 4000.", latex: "5\\%(5\\%\\times4000)", answer: "10", acceptedAnswers: [], hint: "Work outwards.", explanation: "5% of 4000 = 200; 5% of 200 = 10." },
  { id: "chal-y7-poq-9", prompt: "35% of a number is 70. Find the number.", latex: "0.35n=70", answer: "200", acceptedAnswers: [], hint: "Divide by 0.35.", explanation: "70 / 0.35 = 200." },
  { id: "chal-y7-poq-10", prompt: "Find 2.5% of 800.", latex: "2.5\\%\\times800", answer: "20", acceptedAnswers: [], hint: "0.025 × 800.", explanation: "20." },
  { id: "chal-y7-poq-11", prompt: "Find 60% of 45.", latex: "60\\%\\times45", answer: "27", acceptedAnswers: [], hint: "0.6 × 45.", explanation: "27." },
  { id: "chal-y7-poq-12", prompt: "40% of 60 equals what percentage of 40?", latex: "40\\%\\times60=x\\%\\times40", answer: "60", acceptedAnswers: pct("60"), hint: "Find the value first.", explanation: "40% of 60 = 24; 24 is 60% of 40." },
];

// ── Percentages: increase and decrease ────────────────────────────────────────────────────────
export const percentageIncreaseDecreaseChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pid-1", prompt: "Increase 80 by 25%.", latex: "80\\times1.25", answer: "100", acceptedAnswers: [], hint: "× 1.25.", explanation: "100." },
  { id: "chal-y7-pid-2", prompt: "Decrease 200 by 15%.", latex: "200\\times0.85", answer: "170", acceptedAnswers: [], hint: "× 0.85.", explanation: "170." },
  { id: "chal-y7-pid-3", prompt: "A $60 item rises 10%. Find the new price ($).", latex: "60\\times1.1", answer: "66", acceptedAnswers: [], hint: "× 1.1.", explanation: "$66." },
  { id: "chal-y7-pid-4", prompt: "An $80 item is discounted 25%. Find the sale price ($).", latex: "80\\times0.75", answer: "60", acceptedAnswers: [], hint: "× 0.75.", explanation: "$60." },
  { id: "chal-y7-pid-5", prompt: "Increase 150 by 40%.", latex: "150\\times1.4", answer: "210", acceptedAnswers: [], hint: "× 1.4.", explanation: "210." },
  { id: "chal-y7-pid-6", prompt: "A price drops from 50 to 40. Find the percentage decrease (%).", latex: "\\tfrac{10}{50}", answer: "20", acceptedAnswers: pct("20"), hint: "Decrease ÷ original.", explanation: "10/50 = 20%." },
  { id: "chal-y7-pid-7", prompt: "A salary rises from 200 to 250. Find the percentage increase (%).", latex: "\\tfrac{50}{200}", answer: "25", acceptedAnswers: pct("25"), hint: "Increase ÷ original.", explanation: "50/200 = 25%." },
  { id: "chal-y7-pid-8", prompt: "Decrease 90 by 30%.", latex: "90\\times0.7", answer: "63", acceptedAnswers: [], hint: "× 0.7.", explanation: "63." },
  { id: "chal-y7-pid-9", prompt: "A $120 jacket increases 5%. Find the new price ($).", latex: "120\\times1.05", answer: "126", acceptedAnswers: [], hint: "× 1.05.", explanation: "$126." },
  { id: "chal-y7-pid-10", prompt: "Increase 40 by 12.5%.", latex: "40\\times1.125", answer: "45", acceptedAnswers: [], hint: "12.5% of 40 = 5.", explanation: "45." },
  { id: "chal-y7-pid-11", prompt: "A population falls from 800 to 720. Find the percentage decrease (%).", latex: "\\tfrac{80}{800}", answer: "10", acceptedAnswers: pct("10"), hint: "80 ÷ 800.", explanation: "10%." },
  { id: "chal-y7-pid-12", prompt: "A $250 TV is reduced 20%, then $10 more is taken off. Find the final price ($).", latex: "250\\times0.8-10", answer: "190", acceptedAnswers: [], hint: "Apply 20% first.", explanation: "200 − 10 = $190." },
];

// ── Percentages: applications ─────────────────────────────────────────────────────────────────
export const percentageApplicationsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pap-1", prompt: "A shirt costs $40 plus 10% GST. Find the total ($).", latex: "40\\times1.1", answer: "44", acceptedAnswers: [], hint: "Add 10%.", explanation: "$44." },
  { id: "chal-y7-pap-2", prompt: "A $500 bike is discounted 20%. How much is saved ($)?", latex: "20\\%\\times500", answer: "100", acceptedAnswers: [], hint: "Find 20% of 500.", explanation: "$100." },
  { id: "chal-y7-pap-3", prompt: "30% of a class of 40 walk to school. How many students is that?", latex: "30\\%\\times40", answer: "12", acceptedAnswers: [], hint: "0.3 × 40.", explanation: "12 students." },
  { id: "chal-y7-pap-4", prompt: "A test is out of 25 marks. A student scores 80%. How many marks?", latex: "80\\%\\times25", answer: "20", acceptedAnswers: [], hint: "0.8 × 25.", explanation: "20 marks." },
  { id: "chal-y7-pap-5", prompt: "A $1500 laptop loses 20% of its value in a year. Find its value after one year ($).", latex: "1500\\times0.8", answer: "1200", acceptedAnswers: [], hint: "× 0.8.", explanation: "$1200." },
  { id: "chal-y7-pap-6", prompt: "A meal costs $60 and a 15% tip is added. Find the total ($).", latex: "60\\times1.15", answer: "69", acceptedAnswers: [], hint: "Add 15%.", explanation: "$69." },
  { id: "chal-y7-pap-7", prompt: "60% of 200 voters chose yes. How many chose no?", latex: "40\\%\\times200", answer: "80", acceptedAnswers: [], hint: "No = 40%.", explanation: "40% of 200 = 80." },
  { id: "chal-y7-pap-8", prompt: "A $80 jacket is 25% off, then a further 10% off the sale price. Find the final price ($).", latex: "80\\times0.75\\times0.9", answer: "54", acceptedAnswers: [], hint: "Apply discounts in turn.", explanation: "60 × 0.9 = $54." },
  { id: "chal-y7-pap-9", prompt: "A $90 phone bill increases 10%, then a $9 discount is applied. Find the final amount ($).", latex: "90\\times1.1-9", answer: "90", acceptedAnswers: [], hint: "Increase first.", explanation: "99 − 9 = $90." },
  { id: "chal-y7-pap-10", prompt: "Sales tax is 8%. The tax on an item is $4. Find the item's pre-tax price ($).", latex: "0.08p=4", answer: "50", acceptedAnswers: [], hint: "Divide by 0.08.", explanation: "4 / 0.08 = $50." },
  { id: "chal-y7-pap-11", prompt: "A $200 deposit is 25% of a price. Find the full price ($).", latex: "0.25p=200", answer: "800", acceptedAnswers: [], hint: "Divide by 0.25.", explanation: "200 / 0.25 = $800." },
  { id: "chal-y7-pap-12", prompt: "A population of 1000 grows 10%, then grows 10% again. Find the final population.", latex: "1000\\times1.1\\times1.1", answer: "1210", acceptedAnswers: [], hint: "Apply 10% twice.", explanation: "1100 × 1.1 = 1210." },
];
