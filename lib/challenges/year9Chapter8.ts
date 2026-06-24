// Year 9 Wave 9 — Chapter 8 (Probability & Single-Variable Data) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. Registered course-scoped in
// lib/challenges/index.ts (consolidating → Core; core → all 3; path → base + advanced;
// extending [grouping-data-into-classes] → Advanced only).

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several steps.", explanation };
}
const fr = (n: number, d: number) => { const g = (a: number, b: number): number => (b ? g(b, a % b) : a); const k = g(n, d); return [`${n / k}/${d / k}`, `${n / k} / ${d / k}`, `${n}/${d}`, (n / d).toString()]; };

// review-of-probability (consol)
export const reviewProbY9Challenge: PracticeQuestion[] = [
  q("y9c-rp-1", "A bag has 3 red, 2 blue, 5 green (10). Find P(red or blue).", "P(R or B)", "1/2", "5/10 = 1/2.", fr(1, 2)),
  q("y9c-rp-2", "Find P(not an even number) on a die.", "P(not even)", "1/2", "Odd 3/6 = 1/2.", fr(1, 2)),
  q("y9c-rp-3", "A bag has 12 marbles, 4 red. Find P(not red).", "P(not red)", "2/3", "8/12 = 2/3.", fr(2, 3)),
  q("y9c-rp-4", "Find P(a prime number) on a die.", "P(prime)", "1/2", "2,3,5 → 3/6 = 1/2.", fr(1, 2)),
  q("y9c-rp-5", "Cards 1–10: find P(a multiple of 3).", "P(mult 3)", "3/10", "3,6,9 → 3/10.", fr(3, 10)),
  q("y9c-rp-6", "If P(win) = 0.35, find P(not win).", "1-0.35", "0.65", "0.65.", []),
  q("y9c-rp-7", "A spinner has 8 equal sectors, 3 red. Find P(not red).", "P(not red)", "5/8", "5/8.", fr(5, 8)),
  q("y9c-rp-8", "Letters of 'BANANA': find P(an A).", "P(A)", "1/2", "3 of 6 → 1/2.", fr(1, 2)),
  q("y9c-rp-9", "Find P(at most 2) on a die.", "P(<=2)", "1/3", "1,2 → 2/6 = 1/3.", fr(1, 3)),
  q("y9c-rp-10", "30 students, 18 like maths. Find P(does not like maths).", "P(not)", "2/5", "12/30 = 2/5.", fr(2, 5)),
  q("y9c-rp-11", "A box has 5 red of 15. Find P(red).", "5/15", "1/3", "1/3.", fr(1, 3)),
  q("y9c-rp-12", "Find P(a 6 or a 1) on a die.", "P(6 or 1)", "1/3", "2/6 = 1/3.", fr(1, 3)),
];

// venn-diagrams-two-way-tables (path)
export const vennY9Challenge: PracticeQuestion[] = [
  q("y9c-vt-1", "30 students: 18 French, 12 German, 5 both. How many study neither?", "neither", "5", "Union 25; 30 − 25 = 5.", []),
  q("y9c-vt-2", "12 boys (8 play sport), 10 girls (6 play sport). How many play sport?", "8+6", "14", "14.", []),
  q("y9c-vt-3", "40 people: 25 cat, 18 dog, 10 both. How many own only a cat?", "25-10", "15", "15.", []),
  q("y9c-vt-4", "From the previous, how many own at least one pet?", "25+18-10", "33", "33.", []),
  q("y9c-vt-5", "50: 30 soccer, 20 tennis, 8 both. Find P(soccer only).", "(30-8)/50", "11/25", "22/50 = 11/25.", fr(22, 50)),
  q("y9c-vt-6", "24: 14 tea, 10 coffee, 6 both. How many like neither?", "neither", "6", "Union 18; 24 − 18 = 6.", []),
  q("y9c-vt-7", "A two-way table total 60; a row total 35 with one cell 20. Find the other cell in that row.", "35-20", "15", "15.", []),
  q("y9c-vt-8", "100: 60 books, 45 films, 30 both. How many do at least one?", "60+45-30", "75", "75.", []),
  q("y9c-vt-9", "From the previous (100 total), how many do neither?", "100-75", "25", "25.", []),
  q("y9c-vt-10", "20 students: 5 both clubs, 8 club A only, 4 club B only. How many in neither?", "20-17", "3", "20 − 17 = 3.", []),
  q("y9c-vt-11", "20 play soccer, 8 play both. How many play soccer only?", "20-8", "12", "12.", []),
  q("y9c-vt-12", "n(A) = 9, n(B) = 7, n(A ∩ B) = 4. Find n(A ∪ B).", "9+7-4", "12", "12.", []),
];

// using-set-notation (path)
export const setNotationY9Challenge: PracticeQuestion[] = [
  q("y9c-set-1", "A = {1,2,3,4,5}, B = {2,4,6,8}. How many in A ∩ B?", "A∩B", "2", "{2,4} → 2.", []),
  q("y9c-set-2", "A = {1,2,3,4,5}, B = {2,4,6,8}. How many in A ∪ B?", "A∪B", "7", "{1,2,3,4,5,6,8} → 7.", []),
  q("y9c-set-3", "U = {1..10}, A = {2,4,6,8,10}. How many in the complement of A?", "compl", "5", "{1,3,5,7,9} → 5.", []),
  q("y9c-set-4", "A = {even numbers 1–10}. Find n(A).", "n(even)", "5", "5.", []),
  q("y9c-set-5", "A = {1,2,3}, B = {2,3,4}, C = {3,4,5}. How many in A ∩ B ∩ C?", "A∩B∩C", "1", "Only 3.", []),
  q("y9c-set-6", "A = {multiples of 3 up to 20}. Find n(A).", "n", "6", "3,6,9,12,15,18 → 6.", []),
  q("y9c-set-7", "n(A) = 8, n(B) = 6, n(A ∩ B) = 3. Find n(A ∪ B).", "n(A∪B)", "11", "8 + 6 − 3 = 11.", []),
  q("y9c-set-8", "U has 20 elements; n(A) = 12. Find n(complement of A).", "compl", "8", "20 − 12 = 8.", []),
  q("y9c-set-9", "A = {1,2,3,4}, B = {5,6,7}. How many in A ∩ B?", "A∩B", "0", "Disjoint → 0.", []),
  q("y9c-set-10", "n(A ∪ B) = 15, n(A) = 9, n(B) = 10. Find n(A ∩ B).", "n(A∩B)", "4", "9 + 10 − 15 = 4.", []),
  q("y9c-set-11", "A = {1,2,3}, B = {3,4,5}. How many in A ∩ B?", "A∩B", "1", "Only 3.", []),
  q("y9c-set-12", "n(A) = 10, complement is in U = {25 elements}. Find n(complement).", "compl", "15", "25 − 10 = 15.", []),
];

// arrays-two-step-experiments (core)
export const arraysY9Challenge: PracticeQuestion[] = [
  q("y9c-ar2-1", "Find P(sum is even) on two dice.", "P(even sum)", "1/2", "18/36 = 1/2.", fr(1, 2)),
  q("y9c-ar2-2", "Find P(sum 5) on two dice.", "P(5)", "1/9", "4/36 = 1/9.", fr(1, 9)),
  q("y9c-ar2-3", "Find P(product 12) on two dice.", "P(prod 12)", "1/9", "4/36 = 1/9.", fr(1, 9)),
  q("y9c-ar2-4", "Three coins: how many outcomes?", "2^3", "8", "8.", []),
  q("y9c-ar2-5", "Find P(exactly two heads) with three coins.", "P(2H)", "3/8", "3/8.", fr(3, 8)),
  q("y9c-ar2-6", "Two 4-sided dice: find P(both numbers the same).", "P(same)", "1/4", "4/16 = 1/4.", fr(1, 4)),
  q("y9c-ar2-7", "Find P(sum at most 4) on two dice.", "P(<=4)", "1/6", "6/36 = 1/6.", fr(1, 6)),
  q("y9c-ar2-8", "Find P(at least one 6) on two dice.", "P(>=1 six)", "11/36", "11/36.", fr(11, 36)),
  q("y9c-ar2-9", "Find P(sum 9) on two dice.", "P(9)", "1/9", "4/36 = 1/9.", fr(1, 9)),
  q("y9c-ar2-10", "A 3-sector spinner and a die: how many outcomes?", "3x6", "18", "18.", []),
  q("y9c-ar2-11", "Find P(sum 6) on two dice.", "P(6)", "5/36", "5/36.", fr(5, 36)),
  q("y9c-ar2-12", "Find P(both numbers odd) on two dice.", "P(both odd)", "1/4", "9/36 = 1/4.", fr(1, 4)),
];

// tree-diagrams (core)
export const treeY9Challenge: PracticeQuestion[] = [
  q("y9c-td-1", "Two coins: find P(at least one head).", "1-P(TT)", "3/4", "1 − 1/4 = 3/4.", fr(3, 4)),
  q("y9c-td-2", "P(red) = 2/5 each draw (with replacement), drawn twice. Find P(red, red).", "(2/5)^2", "4/25", "4/25.", fr(4, 25)),
  q("y9c-td-3", "Three coins: find P(exactly two heads).", "P(2H)", "3/8", "3/8.", fr(3, 8)),
  q("y9c-td-4", "P(win) = 0.2 twice. Find P(win both).", "0.2^2", "0.04", "0.04.", []),
  q("y9c-td-5", "P(rain) = 0.3 each day. Find P(rain on both days).", "0.3^2", "0.09", "0.09.", []),
  q("y9c-td-6", "Two dice: find P(neither is a six).", "(5/6)^2", "25/36", "25/36.", fr(25, 36)),
  q("y9c-td-7", "Without replacement: 2 red of 5, draw 2. Find P(both red).", "2/5 x 1/4", "1/10", "2/5 × 1/4 = 1/10.", fr(1, 10)),
  q("y9c-td-8", "P(pass) = 0.9 for two independent tests. Find P(pass both).", "0.9^2", "0.81", "0.81.", []),
  q("y9c-td-9", "Two coins: find P(at least one tail).", "1-P(HH)", "3/4", "3/4.", fr(3, 4)),
  q("y9c-td-10", "A light works with P = 0.95 each; two independent. Find P(both work).", "0.95^2", "0.9025", "0.9025.", []),
  q("y9c-td-11", "Three coins: find P(three heads).", "P(HHH)", "1/8", "1/8.", fr(1, 8)),
  q("y9c-td-12", "P(red) = 1/2 then P(blue) = 1/3. Find P(red then blue).", "1/2x1/3", "1/6", "1/6.", fr(1, 6)),
];

// relative-frequencies (core)
export const relFreqY9Challenge: PracticeQuestion[] = [
  q("y9c-rf-1", "A die rolled 300 times; expected number of 4s (P = 1/6).", "1/6x300", "50", "300 ÷ 6 = 50.", []),
  q("y9c-rf-2", "A spinner landed red 36 of 120 spins. Estimate P(red).", "36/120", "0.3", "0.3.", ["3/10"]),
  q("y9c-rf-3", "Expected number of heads in 500 tosses (P = 0.5).", "0.5x500", "250", "250.", []),
  q("y9c-rf-4", "6 faulty in 200. Estimate P, then expected faulty in 1000.", "expected", "30", "P = 0.03; 0.03 × 1000 = 30.", []),
  q("y9c-rf-5", "A coin gave 280 heads in 400. Estimate P(head).", "280/400", "0.7", "0.7.", ["7/10"]),
  q("y9c-rf-6", "Expected number of 1/5 events in 250 trials.", "1/5x250", "50", "50.", []),
  q("y9c-rf-7", "A survey: 45 of 150 prefer tea. Estimate P(tea).", "45/150", "0.3", "0.3.", ["3/10"]),
  q("y9c-rf-8", "Expected number of sixes in 240 rolls (P = 1/6).", "1/6x240", "40", "40.", []),
  q("y9c-rf-9", "A drawing pin landed point-up 120 of 200. Estimate P(point-up).", "120/200", "0.6", "0.6.", ["3/5"]),
  q("y9c-rf-10", "If P(win) ≈ 0.15, expected wins in 400 games?", "0.15x400", "60", "60.", []),
  q("y9c-rf-11", "35 heads in 50 tosses. Find the relative frequency.", "35/50", "0.7", "0.7.", ["7/10"]),
  q("y9c-rf-12", "Expected number of 0.4 events in 200 trials.", "0.4x200", "80", "80.", []),
];

// data-and-sampling (path)
export const samplingY9Challenge: PracticeQuestion[] = [
  q("y9c-ds-1", "A school of 1200 takes a 1-in-15 sample. How many students?", "1200/15", "80", "80.", []),
  q("y9c-ds-2", "A stratified sample takes 10% of 200 boys and 150 girls. How many in total?", "10% of 350", "35", "0.10 × 350 = 35.", []),
  q("y9c-ds-3", "A survey done only during the day may miss workers, causing what?", "bias", "sampling bias", "Sampling bias.", ["bias"]),
  q("y9c-ds-4", "A 1-in-50 sample of 5000 is how many?", "5000/50", "100", "100.", []),
  q("y9c-ds-5", "A factory checks 2% of 4500 items. How many checked?", "2% of 4500", "90", "90.", []),
  q("y9c-ds-6", "When is a census preferred over a sample? (small population / accuracy critical, or always?)", "census", "small population", "When the population is small or accuracy is critical.", ["accuracy critical", "small"]),
  q("y9c-ds-7", "Stratified: 5% of 600 seniors and 5% of 800 juniors. Total sampled?", "5% of 1400", "70", "70.", []),
  q("y9c-ds-8", "A 1-in-8 sample of 2400 is how many?", "2400/8", "300", "300.", []),
  q("y9c-ds-9", "A self-selected online poll is often biased because who responds?", "self-selected", "only motivated people", "Only motivated people respond.", ["motivated"]),
  q("y9c-ds-10", "A town of 30000 surveys 1 in 100. How many people?", "30000/100", "300", "300.", []),
  q("y9c-ds-11", "A 1-in-20 sample of 1000 is how many?", "1000/20", "50", "50.", []),
  q("y9c-ds-12", "A 4% sample of 1200 is how many?", "4% of 1200", "48", "0.04 × 1200 = 48.", []),
];

// mean-median-mode (consol)
export const meanMedianY9Challenge: PracticeQuestion[] = [
  q("y9c-mmm-1", "The mean of 4 numbers is 10. Find their total.", "mean 10", "40", "10 × 4 = 40.", []),
  q("y9c-mmm-2", "Numbers 5, 8 and x have mean 7. Find x.", "mean 7", "8", "Sum 21; x = 8.", []),
  q("y9c-mmm-3", "Find the median of 12, 7, 9, 15, 11.", "median", "11", "Ordered 7,9,11,12,15 → 11.", []),
  q("y9c-mmm-4", "Find the mean of 3, 7, 7, 9, 14.", "mean", "8", "40 ÷ 5 = 8.", []),
  q("y9c-mmm-5", "Find the mode of 4, 4, 5, 6, 6, 6, 9.", "mode", "6", "6 occurs three times.", []),
  q("y9c-mmm-6", "The mean of 5 numbers is 12; four total 50. Find the fifth.", "fifth", "10", "60 − 50 = 10.", []),
  q("y9c-mmm-7", "Find the median of 20, 35, 15, 40, 25, 30.", "median 6", "27.5", "Ordered → (25+30)/2 = 27.5.", []),
  q("y9c-mmm-8", "Add 100 to 2, 4, 6. Find the new mean.", "outlier", "28", "112/4 = 28.", []),
  q("y9c-mmm-9", "Find the range of 14, 9, 22, 7, 18.", "range", "15", "22 − 7 = 15.", []),
  q("y9c-mmm-10", "Six numbers have mean 9; five total 48. Find the sixth.", "sixth", "6", "54 − 48 = 6.", []),
  q("y9c-mmm-11", "Find the mean of 2, 4, 6, 8.", "mean", "5", "20 ÷ 4 = 5.", []),
  q("y9c-mmm-12", "Find the mode of 1, 2, 2, 2, 3.", "mode", "2", "2 occurs most.", []),
];

// stem-and-leaf-plots (consol)
export const stemLeafY9Challenge: PracticeQuestion[] = [
  q("y9c-sl-1", "Values 12, 15, 18, 20, 23, 31. Find the median.", "median 6", "19", "(18 + 20)/2 = 19.", []),
  q("y9c-sl-2", "Values 14, 16, 16, 19, 21, 25. Find the mode.", "mode", "16", "16 repeats.", []),
  q("y9c-sl-3", "Values 22, 24, 27, 31, 35. Find the range.", "range", "13", "35 − 22 = 13.", []),
  q("y9c-sl-4", "Values 5, 7, 7, 8, 10, 12, 12. Find the median.", "median 7", "8", "4th value = 8.", []),
  q("y9c-sl-5", "Rows 4|1 1 4 and 5|0 — how many data values?", "count", "4", "Four leaves → 4.", []),
  q("y9c-sl-6", "Values 30, 32, 35, 35, 41. Find the mean.", "mean", "34.6", "173 ÷ 5 = 34.6.", []),
  q("y9c-sl-7", "Values 18, 20, 22, 24, 26, 28, 30. Find the median.", "median 7", "24", "Middle (4th) = 24.", []),
  q("y9c-sl-8", "Rows 0|9 and 1|3 — find the smallest value.", "smallest", "9", "0|9 = 9.", []),
  q("y9c-sl-9", "Values 51, 53, 53, 57, 60, 62. Find the range.", "range", "11", "62 − 51 = 11.", []),
  q("y9c-sl-10", "Values 10, 10, 12, 14, 14, 14, 18. Find the mode.", "mode", "14", "14 occurs three times.", []),
  q("y9c-sl-11", "Values 12, 14, 16. Find the median.", "median 3", "14", "Middle = 14.", []),
  q("y9c-sl-12", "Rows 2|0 and 3|5 — find the range.", "range", "15", "35 − 20 = 15.", []),
];

// grouping-data-into-classes (extending → Advanced only)
export const groupingY9Challenge: PracticeQuestion[] = [
  q("y9c-gd-1", "Classes 0–10 (f 2, mid 5), 10–20 (f 3, mid 15). Estimate the mean.", "est mean", "11", "(10 + 45)/5 = 11.", []),
  q("y9c-gd-2", "Classes 0–20 (f 4, mid 10), 20–40 (f 6, mid 30). Estimate the mean.", "est mean", "22", "(40 + 180)/10 = 22.", []),
  q("y9c-gd-3", "Frequencies 5, 8, 4, 3. Find the total frequency.", "total", "20", "20.", []),
  q("y9c-gd-4", "Classes 1–5 (f 2, mid 3), 6–10 (f 2, mid 8). Estimate the mean.", "est mean", "5.5", "(6 + 16)/4 = 5.5.", []),
  q("y9c-gd-5", "The modal class is 20–30 with f 12. Find its midpoint.", "modal mid", "25", "25.", []),
  q("y9c-gd-6", "Classes 0–10 (f 3, mid 5), 10–20 (f 5, mid 15), 20–30 (f 2, mid 25). Estimate the mean.", "est mean", "14", "(15 + 75 + 50)/10 = 14.", []),
  q("y9c-gd-7", "Find the midpoint of the class 45–55.", "45-55", "50", "50.", []),
  q("y9c-gd-8", "Classes 10–20 (f 1, mid 15), 20–30 (f 4, mid 25). Estimate the mean.", "est mean", "23", "(15 + 100)/5 = 23.", []),
  q("y9c-gd-9", "Frequencies 6, 6, 6, 2. Find the total frequency.", "total", "20", "20.", []),
  q("y9c-gd-10", "Classes 0–4 (f 2, mid 2), 4–8 (f 3, mid 6). Estimate the mean.", "est mean", "4.4", "(4 + 18)/5 = 4.4.", []),
  q("y9c-gd-11", "Find the midpoint of the class 100–200.", "100-200", "150", "150.", []),
  q("y9c-gd-12", "Frequencies 3, 9, 5 for classes 0–10, 10–20, 20–30. Find the modal-class midpoint.", "modal", "15", "Modal class 10–20 → 15.", []),
];

// range-interquartile-range (core)
export const iqrY9Challenge: PracticeQuestion[] = [
  q("y9c-iqr-1", "For 2, 4, 6, 8, 10, 12, 14, 16 find the IQR.", "IQR 8", "8", "Q1 = 5, Q3 = 13 → 8.", []),
  q("y9c-iqr-2", "For 1, 3, 5, 7, 9, 11 find the IQR.", "IQR 6", "6", "Q1 = 3, Q3 = 9 → 6.", []),
  q("y9c-iqr-3", "For 5, 10, 15, 20, 25 find Q1.", "Q1", "7.5", "Lower half 5,10 → 7.5.", []),
  q("y9c-iqr-4", "For 10, 20, 30, 40, 50, 60, 70 find the IQR.", "IQR 7", "40", "Q1 = 20, Q3 = 60 → 40.", []),
  q("y9c-iqr-5", "For 3, 6, 9, 12 find the IQR.", "IQR 4", "6", "Q1 = 4.5, Q3 = 10.5 → 6.", []),
  q("y9c-iqr-6", "Find the range of 14, 9, 22, 7, 18.", "range", "15", "22 − 7 = 15.", []),
  q("y9c-iqr-7", "For 2, 5, 7, 8, 11, 13, 18, 21 find Q3.", "Q3", "15.5", "Upper half 11,13,18,21 → (13+18)/2 = 15.5.", []),
  q("y9c-iqr-8", "For 4, 8, 12, 16, 20 find the IQR.", "IQR", "12", "Q1 = 6, Q3 = 18 → 12.", []),
  q("y9c-iqr-9", "A data set has Q1 = 22 and Q3 = 47. Find the IQR.", "Q1=22,Q3=47", "25", "25.", []),
  q("y9c-iqr-10", "Find the range of 1, 1, 2, 3, 5, 8, 13.", "range", "12", "13 − 1 = 12.", []),
  q("y9c-iqr-11", "A data set has Q1 = 30 and Q3 = 55. Find the IQR.", "Q1=30,Q3=55", "25", "25.", []),
  q("y9c-iqr-12", "Find the range of 0, 50, 100.", "range", "100", "100 − 0 = 100.", []),
];

// box-plots (core)
export const boxPlotY9Challenge: PracticeQuestion[] = [
  q("y9c-bp-1", "Box plot: min 4, Q1 9, median 14, Q3 21, max 30. Find the IQR.", "iqr", "12", "21 − 9 = 12.", []),
  q("y9c-bp-2", "From the same plot, find the range.", "range", "26", "30 − 4 = 26.", []),
  q("y9c-bp-3", "Five-number summary 2, 6, 9, 14, 20. Find the IQR.", "iqr", "8", "14 − 6 = 8.", []),
  q("y9c-bp-4", "From 2, 6, 9, 14, 20, find the range.", "range", "18", "20 − 2 = 18.", []),
  q("y9c-bp-5", "A box plot has IQR 15 and Q1 10. Find Q3.", "Q3", "25", "10 + 15 = 25.", []),
  q("y9c-bp-6", "A box plot has range 40 and min 12. Find the max.", "max", "52", "12 + 40 = 52.", []),
  q("y9c-bp-7", "Five-number summary 10, 18, 25, 34, 50. Find the IQR.", "iqr", "16", "34 − 18 = 16.", []),
  q("y9c-bp-8", "An outlier is below Q1 − 1.5×IQR. If Q1 = 10 and IQR = 8, find that boundary.", "outlier bound", "-2", "10 − 12 = −2.", ["−2"]),
  q("y9c-bp-9", "Two box plots: A has IQR 10, B has IQR 5. Which is more spread in the middle? (A/B)", "compare", "A", "Larger IQR → A.", []),
  q("y9c-bp-10", "Five-number summary 5, 9, 13, 17, 21. Find the IQR.", "iqr", "8", "17 − 9 = 8.", []),
  q("y9c-bp-11", "A box plot has min 3 and max 28. Find the range.", "range", "25", "28 − 3 = 25.", []),
  q("y9c-bp-12", "A box plot has Q1 12 and Q3 40. Find the IQR.", "iqr", "28", "40 − 12 = 28.", []),
];
