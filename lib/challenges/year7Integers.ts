import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 0 pilot. D6 (Level-6) challenge pools, 12 per section, for the "integers"
// (Computation with Integers) unit. Registered course-scoped ("year-7-mathematics/<lesson>") in
// lib/challenges/index.ts and unlocked after mastery via the existing challenge flow (no new system).
// Auto-markable single-value answers. The seeder tags challenge questions as D6, so no per-item
// difficulty field is needed. Negative answers carry a unicode-minus accepted variant.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

export const integersNumberLineChallenge: PracticeQuestion[] = [
  { id: "chal-y7-inl-1", prompt: "How many integers lie strictly between -7 and 5?", latex: "-7 < x < 5", answer: "11", acceptedAnswers: [], hint: "Count -6 up to 4.", explanation: "The integers are -6,...,4 — that is 11 of them." },
  { id: "chal-y7-inl-2", prompt: "Find the distance on the number line between -13 and 8.", latex: "|8-(-13)|", answer: "21", acceptedAnswers: [], hint: "Distance is the gap, always positive.", explanation: "8 - (-13) = 21." },
  { id: "chal-y7-inl-3", prompt: "The temperature rose from -9 C to 6 C. By how many degrees did it rise?", latex: "6-(-9)", answer: "15", acceptedAnswers: [], hint: "Find the change top minus bottom.", explanation: "6 - (-9) = 15 degrees." },
  { id: "chal-y7-inl-4", prompt: "Find the integer exactly halfway between -18 and 4.", latex: "\\tfrac{-18+4}{2}", answer: "-7", acceptedAnswers: m("-7"), hint: "Average the two endpoints.", explanation: "(-18 + 4)/2 = -14/2 = -7." },
  { id: "chal-y7-inl-5", prompt: "How many integers x satisfy -4 ≤ x < 9?", latex: "-4\\le x<9", answer: "13", acceptedAnswers: [], hint: "Include -4 but not 9.", explanation: "-4 up to 8 inclusive is 13 integers." },
  { id: "chal-y7-inl-6", prompt: "A diver at -35 m ascends 12 m, then descends 8 m. Find the final depth (m).", latex: "-35+12-8", answer: "-31", acceptedAnswers: m("-31"), hint: "Up adds, down subtracts.", explanation: "-35 + 12 - 8 = -31." },
  { id: "chal-y7-inl-7", prompt: "Which is greater: -(-5) or -|-3|? Give the greater value.", latex: "-(-5),\\ -|-3|", answer: "5", acceptedAnswers: [], hint: "Simplify each first.", explanation: "-(-5) = 5 and -|-3| = -3, so 5 is greater." },
  { id: "chal-y7-inl-8", prompt: "The midpoint of -7 and k is 2. Find k.", latex: "\\tfrac{-7+k}{2}=2", answer: "11", acceptedAnswers: [], hint: "-7 + k = 4.", explanation: "-7 + k = 4, so k = 11." },
  { id: "chal-y7-inl-9", prompt: "How many integers x satisfy |x - (-2)| ≤ 4?", latex: "|x+2|\\le 4", answer: "9", acceptedAnswers: [], hint: "x is within 4 of -2.", explanation: "-6 ≤ x ≤ 2 gives 9 integers." },
  { id: "chal-y7-inl-10", prompt: "A lift starts at floor -2, goes up 7, down 11, then up 3. Find the final floor.", latex: "-2+7-11+3", answer: "-3", acceptedAnswers: m("-3"), hint: "Add the moves in order.", explanation: "-2 + 7 - 11 + 3 = -3." },
  { id: "chal-y7-inl-11", prompt: "The distance between a and -6 is 10, and a > 0. Find a.", latex: "|a-(-6)|=10", answer: "4", acceptedAnswers: [], hint: "a + 6 = 10 or a + 6 = -10.", explanation: "a + 6 = 10 gives a = 4 (the positive solution)." },
  { id: "chal-y7-inl-12", prompt: "P = -12 and Q = 18 on a number line. Find the point two-thirds of the way from P to Q.", latex: "P+\\tfrac{2}{3}(Q-P)", answer: "8", acceptedAnswers: [], hint: "The gap is 30.", explanation: "-12 + (2/3)(30) = -12 + 20 = 8." },
];

export const addingSubtractingIntegersChallenge: PracticeQuestion[] = [
  { id: "chal-y7-iasi-1", prompt: "Evaluate -15 + 23 - 8 - 11.", latex: "-15+23-8-11", answer: "-11", acceptedAnswers: m("-11"), hint: "Work left to right.", explanation: "-15 + 23 = 8; 8 - 8 = 0; 0 - 11 = -11." },
  { id: "chal-y7-iasi-2", prompt: "Evaluate -7 - (-12) - 9 + (-4).", latex: "-7-(-12)-9+(-4)", answer: "-8", acceptedAnswers: m("-8"), hint: "Subtracting a negative adds.", explanation: "-7 + 12 - 9 - 4 = -8." },
  { id: "chal-y7-iasi-3", prompt: "Find n if -13 + n = -5.", latex: "-13+n=-5", answer: "8", acceptedAnswers: [], hint: "n = -5 - (-13).", explanation: "n = -5 + 13 = 8." },
  { id: "chal-y7-iasi-4", prompt: "Evaluate (-6) - (-6) - (-6).", latex: "-6-(-6)-(-6)", answer: "6", acceptedAnswers: [], hint: "Two subtractions of a negative.", explanation: "-6 + 6 + 6 = 6." },
  { id: "chal-y7-iasi-5", prompt: "Evaluate -20 - (-35) + (-15).", latex: "-20-(-35)+(-15)", answer: "0", acceptedAnswers: [], hint: "Rewrite the double sign.", explanation: "-20 + 35 - 15 = 0." },
  { id: "chal-y7-iasi-6", prompt: "The sum of -18 and a number is -7. Find the number.", latex: "-18+x=-7", answer: "11", acceptedAnswers: [], hint: "x = -7 - (-18).", explanation: "x = -7 + 18 = 11." },
  { id: "chal-y7-iasi-7", prompt: "Evaluate -4 - 9 - (-20) - 7.", latex: "-4-9-(-20)-7", answer: "0", acceptedAnswers: [], hint: "Subtracting -20 adds 20.", explanation: "-4 - 9 + 20 - 7 = 0." },
  { id: "chal-y7-iasi-8", prompt: "A balance of -$45 receives a deposit, then a $30 withdrawal, ending at -$5. Find the deposit ($).", latex: "-45+d-30=-5", answer: "70", acceptedAnswers: [], hint: "Solve -45 + d - 30 = -5.", explanation: "d - 75 = -5, so d = 70." },
  { id: "chal-y7-iasi-9", prompt: "Evaluate 14 + (-25) - (-6) + (-10).", latex: "14+(-25)-(-6)+(-10)", answer: "-15", acceptedAnswers: m("-15"), hint: "Simplify each sign pair.", explanation: "14 - 25 + 6 - 10 = -15." },
  { id: "chal-y7-iasi-10", prompt: "Find x if x - (-17) = 4.", latex: "x-(-17)=4", answer: "-13", acceptedAnswers: m("-13"), hint: "x + 17 = 4.", explanation: "x = 4 - 17 = -13." },
  { id: "chal-y7-iasi-11", prompt: "Evaluate -100 - (-58) - (-12) - 30.", latex: "-100-(-58)-(-12)-30", answer: "-60", acceptedAnswers: m("-60"), hint: "Two subtractions of negatives add.", explanation: "-100 + 58 + 12 - 30 = -60." },
  { id: "chal-y7-iasi-12", prompt: "Two integers have a difference (first minus second) of 19. The second is -6. Find the first.", latex: "f-(-6)=19", answer: "13", acceptedAnswers: [], hint: "f + 6 = 19.", explanation: "f = 19 - 6 = 13." },
];

export const multiplyingDividingIntegersChallenge: PracticeQuestion[] = [
  { id: "chal-y7-imdi-1", prompt: "Evaluate (-3) × (-4) × (-2).", latex: "(-3)(-4)(-2)", answer: "-24", acceptedAnswers: m("-24"), hint: "Three negatives give a negative.", explanation: "12 × (-2) = -24." },
  { id: "chal-y7-imdi-2", prompt: "Evaluate $(-2)^4$.", latex: "(-2)^4", answer: "16", acceptedAnswers: [], hint: "Even power of a negative.", explanation: "(-2)(-2)(-2)(-2) = 16." },
  { id: "chal-y7-imdi-3", prompt: "Evaluate $(-2)^5$.", latex: "(-2)^5", answer: "-32", acceptedAnswers: m("-32"), hint: "Odd power of a negative.", explanation: "$(-2)^5 = -32$." },
  { id: "chal-y7-imdi-4", prompt: "Evaluate (-72) ÷ (-8) ÷ (-3).", latex: "-72\\div-8\\div-3", answer: "-3", acceptedAnswers: m("-3"), hint: "Work left to right.", explanation: "(-72)/(-8) = 9; 9/(-3) = -3." },
  { id: "chal-y7-imdi-5", prompt: "Evaluate (-5) × 6 ÷ (-3).", latex: "-5\\times6\\div-3", answer: "10", acceptedAnswers: [], hint: "Left to right.", explanation: "-30 / (-3) = 10." },
  { id: "chal-y7-imdi-6", prompt: "Find n if (-4) × n = 52.", latex: "-4n=52", answer: "-13", acceptedAnswers: m("-13"), hint: "n = 52 / (-4).", explanation: "n = -13." },
  { id: "chal-y7-imdi-7", prompt: "Evaluate $(-1)^{99}$.", latex: "(-1)^{99}", answer: "-1", acceptedAnswers: m("-1"), hint: "Odd power.", explanation: "An odd power of -1 is -1." },
  { id: "chal-y7-imdi-8", prompt: "Evaluate $(-3)^2$ × (-2).", latex: "(-3)^2\\times(-2)", answer: "-18", acceptedAnswers: m("-18"), hint: "Square first.", explanation: "9 × (-2) = -18." },
  { id: "chal-y7-imdi-9", prompt: "Evaluate (-120) ÷ 4 × (-2).", latex: "-120\\div4\\times-2", answer: "60", acceptedAnswers: [], hint: "Left to right.", explanation: "-30 × (-2) = 60." },
  { id: "chal-y7-imdi-10", prompt: "Find x if x ÷ (-7) = -9.", latex: "x\\div-7=-9", answer: "63", acceptedAnswers: [], hint: "x = -9 × -7.", explanation: "x = 63." },
  { id: "chal-y7-imdi-11", prompt: "The product of three integers is -60. Two of them are -5 and 4. Find the third.", latex: "-5\\times4\\times t=-60", answer: "3", acceptedAnswers: [], hint: "-20t = -60.", explanation: "-20t = -60, so t = 3." },
  { id: "chal-y7-imdi-12", prompt: "Evaluate $(-2)^3$ × $(-3)^2$.", latex: "(-2)^3\\times(-3)^2", answer: "-72", acceptedAnswers: m("-72"), hint: "Evaluate each power first.", explanation: "(-8) × 9 = -72." },
];

export const orderOfOperationsIntegersChallenge: PracticeQuestion[] = [
  { id: "chal-y7-iooi-1", prompt: "Evaluate -3 + 4 × (-5).", latex: "-3+4\\times(-5)", answer: "-23", acceptedAnswers: m("-23"), hint: "Multiply before adding.", explanation: "-3 + (-20) = -23." },
  { id: "chal-y7-iooi-2", prompt: "Evaluate $(-2)^3$ + 6 ÷ (-3).", latex: "(-2)^3+6\\div(-3)", answer: "-10", acceptedAnswers: m("-10"), hint: "Power, then divide, then add.", explanation: "-8 + (-2) = -10." },
  { id: "chal-y7-iooi-3", prompt: "Evaluate 12 - (-4) × 3.", latex: "12-(-4)\\times3", answer: "24", acceptedAnswers: [], hint: "Multiply first.", explanation: "12 - (-12) = 24." },
  { id: "chal-y7-iooi-4", prompt: "Evaluate (-6 + 2) × (-3) - 5.", latex: "(-6+2)\\times(-3)-5", answer: "7", acceptedAnswers: [], hint: "Brackets first.", explanation: "(-4)(-3) - 5 = 12 - 5 = 7." },
  { id: "chal-y7-iooi-5", prompt: "Evaluate -20 ÷ (-4) + (-3) × 2.", latex: "-20\\div(-4)+(-3)\\times2", answer: "-1", acceptedAnswers: m("-1"), hint: "Divide and multiply first.", explanation: "5 + (-6) = -1." },
  { id: "chal-y7-iooi-6", prompt: "Evaluate 5 - 2 × (3 - (-4)).", latex: "5-2\\times(3-(-4))", answer: "-9", acceptedAnswers: m("-9"), hint: "Inside the bracket first.", explanation: "5 - 2 × 7 = 5 - 14 = -9." },
  { id: "chal-y7-iooi-7", prompt: "Evaluate $(-3)^2$ - 4 × $(-2)^2$.", latex: "(-3)^2-4\\times(-2)^2", answer: "-7", acceptedAnswers: m("-7"), hint: "Powers first, then multiply.", explanation: "9 - 4 × 4 = 9 - 16 = -7." },
  { id: "chal-y7-iooi-8", prompt: "Evaluate $-(-5 + 3)^2$.", latex: "-(-5+3)^2", answer: "-4", acceptedAnswers: m("-4"), hint: "Bracket, then square, then negate.", explanation: "$-(-2)^2 = -(4) = -4$." },
  { id: "chal-y7-iooi-9", prompt: "Evaluate 18 ÷ (-3 + 1) - 7.", latex: "18\\div(-3+1)-7", answer: "-16", acceptedAnswers: m("-16"), hint: "Bracket first.", explanation: "18 / (-2) - 7 = -9 - 7 = -16." },
  { id: "chal-y7-iooi-10", prompt: "Evaluate $(-4)^2$ ÷ (-2) - (-3).", latex: "(-4)^2\\div(-2)-(-3)", answer: "-5", acceptedAnswers: m("-5"), hint: "Power, divide, then subtract a negative.", explanation: "16 / (-2) + 3 = -8 + 3 = -5." },
  { id: "chal-y7-iooi-11", prompt: "Evaluate 100 - (-5) × $(-2)^3$ ÷ 4.", latex: "100-(-5)\\times(-2)^3\\div4", answer: "90", acceptedAnswers: [], hint: "Power first, then × and ÷ left to right.", explanation: "$(-2)^3 = -8$; (-5)(-8) = 40; 40/4 = 10; 100 - 10 = 90." },
  { id: "chal-y7-iooi-12", prompt: "Evaluate -2 × [3 - (-4 + 1)].", latex: "-2\\times[3-(-4+1)]", answer: "-12", acceptedAnswers: m("-12"), hint: "Innermost bracket first.", explanation: "-4 + 1 = -3; 3 - (-3) = 6; -2 × 6 = -12." },
];

export const integersProblemSolvingChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ips-1", prompt: "At 6 am it was -4 C and the temperature rose 2 C each hour until noon. Find the temperature at noon (C).", latex: "-4+2\\times6", answer: "8", acceptedAnswers: [], hint: "Six hours of +2.", explanation: "-4 + 2 × 6 = -4 + 12 = 8." },
  { id: "chal-y7-ips-2", prompt: "A submarine at -180 m rises to -60 m in 3 equal stages. Find the rise per stage (m).", latex: "\\tfrac{-60-(-180)}{3}", answer: "40", acceptedAnswers: [], hint: "Total rise over 3.", explanation: "Rise = 120 m; 120/3 = 40 m." },
  { id: "chal-y7-ips-3", prompt: "A quiz gives +5 per correct and -2 per wrong. With 8 correct and 5 wrong, find the score.", latex: "8(5)+5(-2)", answer: "30", acceptedAnswers: [], hint: "Add the two totals.", explanation: "40 + (-10) = 30." },
  { id: "chal-y7-ips-4", prompt: "Find the sum of the readings -3, -7, 4, -2, 8.", latex: "-3-7+4-2+8", answer: "0", acceptedAnswers: [], hint: "Pair positives and negatives.", explanation: "(-3 -7 -2) + (4 + 8) = -12 + 12 = 0." },
  { id: "chal-y7-ips-5", prompt: "The mean of -6, k and 9 is 1. Find k.", latex: "\\tfrac{-6+k+9}{3}=1", answer: "0", acceptedAnswers: [], hint: "The three values sum to 3.", explanation: "-6 + k + 9 = 3, so k = 0." },
  { id: "chal-y7-ips-6", prompt: "From floor 0 a lift repeats 'down 2 then up 5' four times. Find the final floor.", latex: "4\\times(-2+5)", answer: "12", acceptedAnswers: [], hint: "Each cycle is +3.", explanation: "Each cycle: -2 + 5 = +3; ×4 = 12." },
  { id: "chal-y7-ips-7", prompt: "A debt of $120 is shared equally among 4 friends. Find each person's balance change ($).", latex: "\\tfrac{-120}{4}", answer: "-30", acceptedAnswers: m("-30"), hint: "A debt is negative.", explanation: "-120 / 4 = -30." },
  { id: "chal-y7-ips-8", prompt: "Starting at -5 C, the temperature changes -2 then +5 alternately for 6 hours (starting with -2). Find the final temperature (C).", latex: "-5+3\\times3", answer: "4", acceptedAnswers: [], hint: "Each -2,+5 pair is +3; there are 3 pairs.", explanation: "Three pairs give +9; -5 + 9 = 4." },
  { id: "chal-y7-ips-9", prompt: "In a game you lose 15 points three times and gain 20 points twice. Find the net change.", latex: "3(-15)+2(20)", answer: "-5", acceptedAnswers: m("-5"), hint: "Total the losses and gains.", explanation: "-45 + 40 = -5." },
  { id: "chal-y7-ips-10", prompt: "A water level drops 3 cm/day for 12 days, then rises 8 cm/day for 4 days. Find the net change (cm).", latex: "12(-3)+4(8)", answer: "-4", acceptedAnswers: m("-4"), hint: "Drops are negative.", explanation: "-36 + 32 = -4." },
  { id: "chal-y7-ips-11", prompt: "Two integers have product -48 and sum 2. Find the larger integer.", latex: "ab=-48,\\ a+b=2", answer: "8", acceptedAnswers: [], hint: "Try factor pairs of -48.", explanation: "8 and -6: product -48, sum 2; the larger is 8." },
  { id: "chal-y7-ips-12", prompt: "Three consecutive integers sum to -18. Find the smallest.", latex: "n+(n+1)+(n+2)=-18", answer: "-7", acceptedAnswers: m("-7"), hint: "3n + 3 = -18.", explanation: "3n + 3 = -18, so n = -7." },
];
