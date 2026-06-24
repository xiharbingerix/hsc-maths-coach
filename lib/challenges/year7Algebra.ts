import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 2. D6 (Level-6) challenge pools, 12 per section, for the algebra cluster:
// indices (5), equations (4), algebraic-techniques (5) = 14 sections. Registered course-scoped
// ("year-7-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the
// existing challenge flow (no new system). Auto-markable single-value answers. The seeder tags
// challenge questions as D6, so no per-item difficulty field is needed. Exponents in prose are
// wrapped in $...$ (the latex field is not audit-scanned); negatives get a unicode-minus variant.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

// ── Indices: factors, multiples, HCF, LCM ─────────────────────────────────────────────────────
export const factorsMultiplesHcfLcmChallenge: PracticeQuestion[] = [
  { id: "chal-y7-fml-1", prompt: "Find the HCF of 84 and 126.", latex: "\\gcd(84,126)", answer: "42", acceptedAnswers: [], hint: "Use prime factors.", explanation: "84 = 2²·3·7, 126 = 2·3²·7 → HCF = 2·3·7 = 42." },
  { id: "chal-y7-fml-2", prompt: "Find the LCM of 12 and 18.", latex: "\\text{lcm}(12,18)", answer: "36", acceptedAnswers: [], hint: "Smallest common multiple.", explanation: "12 = 2²·3, 18 = 2·3² → LCM = 2²·3² = 36." },
  { id: "chal-y7-fml-3", prompt: "Find the LCM of 8, 12 and 18.", latex: "\\text{lcm}(8,12,18)", answer: "72", acceptedAnswers: [], hint: "Take the highest power of each prime.", explanation: "2³·3² = 72." },
  { id: "chal-y7-fml-4", prompt: "Two numbers have HCF 6 and LCM 72. One number is 24. Find the other.", latex: "\\text{HCF}\\cdot\\text{LCM}=ab", answer: "18", acceptedAnswers: [], hint: "Product of the numbers = HCF × LCM.", explanation: "6·72 = 432 = 24·x → x = 18." },
  { id: "chal-y7-fml-5", prompt: "Find the HCF of 90 and 144.", latex: "\\gcd(90,144)", answer: "18", acceptedAnswers: [], hint: "Prime factors.", explanation: "90 = 2·3²·5, 144 = 2⁴·3² → HCF = 2·3² = 18." },
  { id: "chal-y7-fml-6", prompt: "Two numbers have HCF 8 and LCM 240. Find their product.", latex: "ab=\\text{HCF}\\cdot\\text{LCM}", answer: "1920", acceptedAnswers: [], hint: "Product = HCF × LCM.", explanation: "8 × 240 = 1920." },
  { id: "chal-y7-fml-7", prompt: "Two bells ring every 15 and 18 minutes. They ring together now; after how many minutes do they next ring together?", latex: "\\text{lcm}(15,18)", answer: "90", acceptedAnswers: [], hint: "Find the LCM.", explanation: "LCM(15,18) = 90 minutes." },
  { id: "chal-y7-fml-8", prompt: "Find the smallest number divisible by 6, 9 and 15.", latex: "\\text{lcm}(6,9,15)", answer: "90", acceptedAnswers: [], hint: "That is the LCM.", explanation: "2·3²·5 = 90." },
  { id: "chal-y7-fml-9", prompt: "Find the HCF of 48, 72 and 120.", latex: "\\gcd(48,72,120)", answer: "24", acceptedAnswers: [], hint: "Lowest power of common primes.", explanation: "48 = 2⁴·3, 72 = 2³·3², 120 = 2³·3·5 → HCF = 2³·3 = 24." },
  { id: "chal-y7-fml-10", prompt: "Two numbers have product 600 and HCF 10. Find their LCM.", latex: "\\text{LCM}=ab/\\text{HCF}", answer: "60", acceptedAnswers: [], hint: "LCM = product ÷ HCF.", explanation: "600 ÷ 10 = 60." },
  { id: "chal-y7-fml-11", prompt: "Find the smallest n > 1 for which the LCM of 14 and n is 70.", latex: "\\text{lcm}(14,n)=70", answer: "5", acceptedAnswers: [], hint: "70 = 2·5·7; 14 = 2·7, so n must supply the 5.", explanation: "n = 5 gives LCM(14,5) = 70." },
  { id: "chal-y7-fml-12", prompt: "Find the largest number that divides both 96 and 144 exactly.", latex: "\\gcd(96,144)", answer: "48", acceptedAnswers: [], hint: "That is the HCF.", explanation: "96 = 2⁵·3, 144 = 2⁴·3² → HCF = 2⁴·3 = 48." },
];

// ── Indices: primes and prime factorisation ───────────────────────────────────────────────────
export const primesPrimeFactorisationChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ppf-1", prompt: "Write 360 as a product of primes. Give the exponent (power) of 2.", latex: "360=2^a\\cdot3^b\\cdot5", answer: "3", acceptedAnswers: [], hint: "Keep dividing by 2.", explanation: "360 = 2³·3²·5, so the power of 2 is 3." },
  { id: "chal-y7-ppf-2", prompt: "How many factors does 36 have?", latex: "36=2^2\\cdot3^2", answer: "9", acceptedAnswers: [], hint: "Add 1 to each exponent and multiply.", explanation: "(2+1)(2+1) = 9 factors." },
  { id: "chal-y7-ppf-3", prompt: "Find the smallest prime factor of 221.", latex: "221", answer: "13", acceptedAnswers: [], hint: "Try primes in order.", explanation: "221 = 13·17, so the smallest prime factor is 13." },
  { id: "chal-y7-ppf-4", prompt: "Express 504 as a product of primes. Give the largest prime factor.", latex: "504", answer: "7", acceptedAnswers: [], hint: "Factor fully.", explanation: "504 = 2³·3²·7, so the largest prime is 7." },
  { id: "chal-y7-ppf-5", prompt: "How many factors does 100 have?", latex: "100=2^2\\cdot5^2", answer: "9", acceptedAnswers: [], hint: "Exponents +1, multiplied.", explanation: "(2+1)(2+1) = 9 factors." },
  { id: "chal-y7-ppf-6", prompt: "A number has prime factorisation $2^3\\cdot3\\cdot5^2$. Find the number.", latex: "2^3\\cdot3\\cdot5^2", answer: "600", acceptedAnswers: [], hint: "Multiply it out.", explanation: "8·3·25 = 600." },
  { id: "chal-y7-ppf-7", prompt: "How many factors does 72 have?", latex: "72=2^3\\cdot3^2", answer: "12", acceptedAnswers: [], hint: "Exponents +1, multiplied.", explanation: "(3+1)(2+1) = 12 factors." },
  { id: "chal-y7-ppf-8", prompt: "What is the smallest whole number with exactly 3 factors?", latex: "\\tau(n)=3", answer: "4", acceptedAnswers: [], hint: "A number has exactly 3 factors only if it is a prime squared.", explanation: "2² = 4 has factors 1, 2, 4." },
  { id: "chal-y7-ppf-9", prompt: "A number is $2^2\\cdot3\\cdot7$. How many distinct prime factors does it have?", latex: "2^2\\cdot3\\cdot7", answer: "3", acceptedAnswers: [], hint: "Count the different primes.", explanation: "The primes are 2, 3 and 7 → 3 distinct." },
  { id: "chal-y7-ppf-10", prompt: "Find the largest prime factor of 1001.", latex: "1001", answer: "13", acceptedAnswers: [], hint: "1001 = 7 × 11 × 13.", explanation: "Largest prime factor is 13." },
  { id: "chal-y7-ppf-11", prompt: "Solve for n: $2^n\\times3=96$.", latex: "2^n\\cdot3=96", answer: "5", acceptedAnswers: [], hint: "Divide by 3 first.", explanation: "96/3 = 32 = 2⁵, so n = 5." },
  { id: "chal-y7-ppf-12", prompt: "Find the product of the distinct prime factors of 30.", latex: "30", answer: "30", acceptedAnswers: [], hint: "30 = 2·3·5.", explanation: "2·3·5 = 30." },
];

// ── Indices: squares, cubes, index notation ───────────────────────────────────────────────────
export const squaresCubesIndexNotationChallenge: PracticeQuestion[] = [
  { id: "chal-y7-scn-1", prompt: "Evaluate $2^5$.", latex: "2^5", answer: "32", acceptedAnswers: [], hint: "Multiply 2 by itself five times.", explanation: "2⁵ = 32." },
  { id: "chal-y7-scn-2", prompt: "Evaluate $\\sqrt{144}+\\sqrt{81}$.", latex: "\\sqrt{144}+\\sqrt{81}", answer: "21", acceptedAnswers: [], hint: "Each root first.", explanation: "12 + 9 = 21." },
  { id: "chal-y7-scn-3", prompt: "Evaluate $3^3-2^4$.", latex: "3^3-2^4", answer: "11", acceptedAnswers: [], hint: "Cubes and fourth powers first.", explanation: "27 − 16 = 11." },
  { id: "chal-y7-scn-4", prompt: "Find $\\sqrt[3]{216}$.", latex: "\\sqrt[3]{216}", answer: "6", acceptedAnswers: [], hint: "What cubes to 216?", explanation: "6³ = 216." },
  { id: "chal-y7-scn-5", prompt: "Evaluate $5^2+12^2$.", latex: "5^2+12^2", answer: "169", acceptedAnswers: [], hint: "Square each, then add.", explanation: "25 + 144 = 169." },
  { id: "chal-y7-scn-6", prompt: "Evaluate $\\sqrt{64}\\times\\sqrt[3]{27}$.", latex: "\\sqrt{64}\\times\\sqrt[3]{27}", answer: "24", acceptedAnswers: [], hint: "Each root first.", explanation: "8 × 3 = 24." },
  { id: "chal-y7-scn-7", prompt: "Write 1 000 000 as a power of 10. Give the exponent.", latex: "10^n=1000000", answer: "6", acceptedAnswers: [], hint: "Count the zeros.", explanation: "10⁶ = 1 000 000, so the exponent is 6." },
  { id: "chal-y7-scn-8", prompt: "Evaluate $2^3\\times2^2$.", latex: "2^3\\times2^2", answer: "32", acceptedAnswers: [], hint: "Work each power, then multiply.", explanation: "8 × 4 = 32." },
  { id: "chal-y7-scn-9", prompt: "Find the positive n with $n^2=169$.", latex: "n^2=169", answer: "13", acceptedAnswers: [], hint: "Square root.", explanation: "13² = 169." },
  { id: "chal-y7-scn-10", prompt: "Evaluate $(\\sqrt{49})^3$.", latex: "(\\sqrt{49})^3", answer: "343", acceptedAnswers: [], hint: "Root first, then cube.", explanation: "7³ = 343." },
  { id: "chal-y7-scn-11", prompt: "Evaluate $10^2-3^2-1^2$.", latex: "10^2-3^2-1^2", answer: "90", acceptedAnswers: [], hint: "Square each first.", explanation: "100 − 9 − 1 = 90." },
  { id: "chal-y7-scn-12", prompt: "Solve for x: $2^x=64$.", latex: "2^x=64", answer: "6", acceptedAnswers: [], hint: "Express 64 as a power of 2.", explanation: "64 = 2⁶, so x = 6." },
];

// ── Indices: index laws (product, quotient, power) ────────────────────────────────────────────
export const indexLawsProductQuotientPowerChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ilp-1", prompt: "Simplify $2^4\\times2^3$ as a power of 2. Give the exponent.", latex: "2^4\\times2^3", answer: "7", acceptedAnswers: [], hint: "Add the indices.", explanation: "4 + 3 = 7." },
  { id: "chal-y7-ilp-2", prompt: "Simplify $(3^2)^3$ as a power of 3. Give the exponent.", latex: "(3^2)^3", answer: "6", acceptedAnswers: [], hint: "Multiply the indices.", explanation: "2 × 3 = 6." },
  { id: "chal-y7-ilp-3", prompt: "Simplify $5^7\\div5^4$ as a power of 5. Give the exponent.", latex: "5^7\\div5^4", answer: "3", acceptedAnswers: [], hint: "Subtract the indices.", explanation: "7 − 4 = 3." },
  { id: "chal-y7-ilp-4", prompt: "Evaluate $2^6\\div2^3$.", latex: "2^6\\div2^3", answer: "8", acceptedAnswers: [], hint: "Subtract indices, then evaluate.", explanation: "2³ = 8." },
  { id: "chal-y7-ilp-5", prompt: "Simplify $7^5\\times7^2\\div7^3$ as a power of 7. Give the exponent.", latex: "7^5\\times7^2\\div7^3", answer: "4", acceptedAnswers: [], hint: "Add then subtract indices.", explanation: "5 + 2 − 3 = 4." },
  { id: "chal-y7-ilp-6", prompt: "Evaluate $(2^3)^2$.", latex: "(2^3)^2", answer: "64", acceptedAnswers: [], hint: "Multiply indices, then evaluate.", explanation: "2⁶ = 64." },
  { id: "chal-y7-ilp-7", prompt: "Simplify $(a^5)^2\\div a^3$. Give the exponent of a.", latex: "(a^5)^2\\div a^3", answer: "7", acceptedAnswers: [], hint: "Power of a power, then subtract.", explanation: "10 − 3 = 7." },
  { id: "chal-y7-ilp-8", prompt: "Evaluate $3^4\\times3\\div3^2$.", latex: "3^4\\times3\\div3^2", answer: "27", acceptedAnswers: [], hint: "Indices: 4 + 1 − 2.", explanation: "3³ = 27." },
  { id: "chal-y7-ilp-9", prompt: "If $(2^2)^3=2^n$, find n.", latex: "(2^2)^3=2^n", answer: "6", acceptedAnswers: [], hint: "Multiply the indices.", explanation: "2 × 3 = 6." },
  { id: "chal-y7-ilp-10", prompt: "Simplify $10^8\\div10^5$ and give the result as a number.", latex: "10^8\\div10^5", answer: "1000", acceptedAnswers: [], hint: "10³.", explanation: "10³ = 1000." },
  { id: "chal-y7-ilp-11", prompt: "If $(x^n)^4=x^{20}$, find n.", latex: "(x^n)^4=x^{20}", answer: "5", acceptedAnswers: [], hint: "4n = 20.", explanation: "n = 5." },
  { id: "chal-y7-ilp-12", prompt: "Simplify $6^5\\times6^3\\div6^6$ as a power of 6. Give the exponent.", latex: "6^5\\times6^3\\div6^6", answer: "2", acceptedAnswers: [], hint: "5 + 3 − 6.", explanation: "2." },
];

// ── Indices: zero index and mixed indices ─────────────────────────────────────────────────────
export const zeroIndexMixedIndicesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-zmi-1", prompt: "Evaluate $7^0$.", latex: "7^0", answer: "1", acceptedAnswers: [], hint: "Any non-zero base to the power 0.", explanation: "7⁰ = 1." },
  { id: "chal-y7-zmi-2", prompt: "Evaluate $5^0+3^2$.", latex: "5^0+3^2", answer: "10", acceptedAnswers: [], hint: "Zero index first.", explanation: "1 + 9 = 10." },
  { id: "chal-y7-zmi-3", prompt: "Evaluate $2^3\\times2^0\\times2^2$.", latex: "2^3\\times2^0\\times2^2", answer: "32", acceptedAnswers: [], hint: "Add indices: 3 + 0 + 2.", explanation: "2⁵ = 32." },
  { id: "chal-y7-zmi-4", prompt: "Evaluate $(4^0+2^2)^2$.", latex: "(4^0+2^2)^2", answer: "25", acceptedAnswers: [], hint: "Bracket first.", explanation: "(1 + 4)² = 25." },
  { id: "chal-y7-zmi-5", prompt: "Evaluate $100^0+10^2$.", latex: "100^0+10^2", answer: "101", acceptedAnswers: [], hint: "Zero index = 1.", explanation: "1 + 100 = 101." },
  { id: "chal-y7-zmi-6", prompt: "Simplify $8^5\\times8^0\\div8^3$ and give the result as a number.", latex: "8^5\\times8^0\\div8^3", answer: "64", acceptedAnswers: [], hint: "Indices: 5 + 0 − 3.", explanation: "8² = 64." },
  { id: "chal-y7-zmi-7", prompt: "Evaluate $(3^2)^0+4$.", latex: "(3^2)^0+4", answer: "5", acceptedAnswers: [], hint: "Anything to the power 0 is 1.", explanation: "1 + 4 = 5." },
  { id: "chal-y7-zmi-8", prompt: "Evaluate $2^4\\div2^4$.", latex: "2^4\\div2^4", answer: "1", acceptedAnswers: [], hint: "Equal powers.", explanation: "2⁰ = 1." },
  { id: "chal-y7-zmi-9", prompt: "Evaluate $6^0\\times6^3$.", latex: "6^0\\times6^3", answer: "216", acceptedAnswers: [], hint: "0 + 3 = 3.", explanation: "6³ = 216." },
  { id: "chal-y7-zmi-10", prompt: "Evaluate $5^0+5^0+5^0$.", latex: "5^0+5^0+5^0", answer: "3", acceptedAnswers: [], hint: "Each term is 1.", explanation: "1 + 1 + 1 = 3." },
  { id: "chal-y7-zmi-11", prompt: "Evaluate $2^0+3^0+4^0$.", latex: "2^0+3^0+4^0", answer: "3", acceptedAnswers: [], hint: "Each is 1.", explanation: "1 + 1 + 1 = 3." },
  { id: "chal-y7-zmi-12", prompt: "Evaluate $9^0\\times(2^3-3)$.", latex: "9^0\\times(2^3-3)", answer: "5", acceptedAnswers: [], hint: "9⁰ = 1; bracket = 5.", explanation: "1 × (8 − 3) = 5." },
];

// ── Equations: one-step ───────────────────────────────────────────────────────────────────────
export const oneStepEquationsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ose-1", prompt: "Solve x + 17 = 5.", latex: "x+17=5", answer: "-12", acceptedAnswers: m("-12"), hint: "Subtract 17.", explanation: "x = 5 − 17 = -12." },
  { id: "chal-y7-ose-2", prompt: "Solve 4x = -36.", latex: "4x=-36", answer: "-9", acceptedAnswers: m("-9"), hint: "Divide by 4.", explanation: "x = -9." },
  { id: "chal-y7-ose-3", prompt: "Solve x - 9 = -2.", latex: "x-9=-2", answer: "7", acceptedAnswers: [], hint: "Add 9.", explanation: "x = -2 + 9 = 7." },
  { id: "chal-y7-ose-4", prompt: "Solve x/5 = -4.", latex: "\\tfrac{x}{5}=-4", answer: "-20", acceptedAnswers: m("-20"), hint: "Multiply by 5.", explanation: "x = -20." },
  { id: "chal-y7-ose-5", prompt: "Solve -3x = 21.", latex: "-3x=21", answer: "-7", acceptedAnswers: m("-7"), hint: "Divide by -3.", explanation: "x = -7." },
  { id: "chal-y7-ose-6", prompt: "Solve x + 2.5 = 6.", latex: "x+2.5=6", answer: "3.5", acceptedAnswers: [], hint: "Subtract 2.5.", explanation: "x = 3.5." },
  { id: "chal-y7-ose-7", prompt: "Solve -x = 8.", latex: "-x=8", answer: "-8", acceptedAnswers: m("-8"), hint: "Multiply by -1.", explanation: "x = -8." },
  { id: "chal-y7-ose-8", prompt: "Solve 7x = 0.", latex: "7x=0", answer: "0", acceptedAnswers: [], hint: "Divide by 7.", explanation: "x = 0." },
  { id: "chal-y7-ose-9", prompt: "Solve x/(-4) = 3.", latex: "\\tfrac{x}{-4}=3", answer: "-12", acceptedAnswers: m("-12"), hint: "Multiply by -4.", explanation: "x = -12." },
  { id: "chal-y7-ose-10", prompt: "Solve x - (-6) = 1.", latex: "x-(-6)=1", answer: "-5", acceptedAnswers: m("-5"), hint: "x + 6 = 1.", explanation: "x = 1 − 6 = -5." },
  { id: "chal-y7-ose-11", prompt: "Solve 12 = x + 19.", latex: "12=x+19", answer: "-7", acceptedAnswers: m("-7"), hint: "Subtract 19.", explanation: "x = 12 − 19 = -7." },
  { id: "chal-y7-ose-12", prompt: "Solve 2x = 7.", latex: "2x=7", answer: "3.5", acceptedAnswers: [], hint: "Divide by 2.", explanation: "x = 3.5." },
];

// ── Equations: two-step ───────────────────────────────────────────────────────────────────────
export const twoStepEquationsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-tse-1", prompt: "Solve 3x + 5 = 20.", latex: "3x+5=20", answer: "5", acceptedAnswers: [], hint: "Subtract 5, then divide by 3.", explanation: "3x = 15 → x = 5." },
  { id: "chal-y7-tse-2", prompt: "Solve 2x - 7 = -3.", latex: "2x-7=-3", answer: "2", acceptedAnswers: [], hint: "Add 7, then divide.", explanation: "2x = 4 → x = 2." },
  { id: "chal-y7-tse-3", prompt: "Solve 5 - 2x = 11.", latex: "5-2x=11", answer: "-3", acceptedAnswers: m("-3"), hint: "Subtract 5, then divide by -2.", explanation: "-2x = 6 → x = -3." },
  { id: "chal-y7-tse-4", prompt: "Solve x/3 + 4 = 10.", latex: "\\tfrac{x}{3}+4=10", answer: "18", acceptedAnswers: [], hint: "Subtract 4, then multiply by 3.", explanation: "x/3 = 6 → x = 18." },
  { id: "chal-y7-tse-5", prompt: "Solve 4x - 9 = -25.", latex: "4x-9=-25", answer: "-4", acceptedAnswers: m("-4"), hint: "Add 9, then divide.", explanation: "4x = -16 → x = -4." },
  { id: "chal-y7-tse-6", prompt: "Solve (x - 1)/2 = 6.", latex: "\\tfrac{x-1}{2}=6", answer: "13", acceptedAnswers: [], hint: "Multiply by 2, then add 1.", explanation: "x − 1 = 12 → x = 13." },
  { id: "chal-y7-tse-7", prompt: "Solve 7 = 3 - 2x.", latex: "7=3-2x", answer: "-2", acceptedAnswers: m("-2"), hint: "Subtract 3, then divide by -2.", explanation: "4 = -2x → x = -2." },
  { id: "chal-y7-tse-8", prompt: "Solve 6x + 11 = 11.", latex: "6x+11=11", answer: "0", acceptedAnswers: [], hint: "Subtract 11.", explanation: "6x = 0 → x = 0." },
  { id: "chal-y7-tse-9", prompt: "Solve x/2 - 5 = -8.", latex: "\\tfrac{x}{2}-5=-8", answer: "-6", acceptedAnswers: m("-6"), hint: "Add 5, then multiply by 2.", explanation: "x/2 = -3 → x = -6." },
  { id: "chal-y7-tse-10", prompt: "Solve 10 - 3x = 1.", latex: "10-3x=1", answer: "3", acceptedAnswers: [], hint: "Subtract 10, divide by -3.", explanation: "-3x = -9 → x = 3." },
  { id: "chal-y7-tse-11", prompt: "Solve 2x + 3 = -7.", latex: "2x+3=-7", answer: "-5", acceptedAnswers: m("-5"), hint: "Subtract 3, divide by 2.", explanation: "2x = -10 → x = -5." },
  { id: "chal-y7-tse-12", prompt: "Solve 9 = 2x - 5.", latex: "9=2x-5", answer: "7", acceptedAnswers: [], hint: "Add 5, divide by 2.", explanation: "2x = 14 → x = 7." },
];

// ── Equations: worded problems ────────────────────────────────────────────────────────────────
export const equationsWordedProblemsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ewp-1", prompt: "A number tripled, then increased by 4, is 19. Find the number.", latex: "3n+4=19", answer: "5", acceptedAnswers: [], hint: "3n + 4 = 19.", explanation: "3n = 15 → n = 5." },
  { id: "chal-y7-ewp-2", prompt: "Five less than twice a number is 11. Find the number.", latex: "2n-5=11", answer: "8", acceptedAnswers: [], hint: "2n − 5 = 11.", explanation: "2n = 16 → n = 8." },
  { id: "chal-y7-ewp-3", prompt: "The perimeter of a square is 36 cm. Find its side length (cm).", latex: "4s=36", answer: "9", acceptedAnswers: [], hint: "Divide by 4.", explanation: "s = 9 cm." },
  { id: "chal-y7-ewp-4", prompt: "Three consecutive integers sum to 48. Find the smallest.", latex: "3n+3=48", answer: "15", acceptedAnswers: [], hint: "n + (n+1) + (n+2) = 48.", explanation: "3n + 3 = 48 → n = 15." },
  { id: "chal-y7-ewp-5", prompt: "A number halved, then add 7, equals 12. Find the number.", latex: "\\tfrac{n}{2}+7=12", answer: "10", acceptedAnswers: [], hint: "n/2 = 5.", explanation: "n = 10." },
  { id: "chal-y7-ewp-6", prompt: "Sara is 4 years older than Tom and their ages sum to 30. Find Tom's age.", latex: "t+(t+4)=30", answer: "13", acceptedAnswers: [], hint: "2t + 4 = 30.", explanation: "2t = 26 → t = 13." },
  { id: "chal-y7-ewp-7", prompt: "A rectangle's length is 5 more than its width and its perimeter is 38 cm. Find the width (cm).", latex: "2(w+w+5)=38", answer: "7", acceptedAnswers: [], hint: "4w + 10 = 38.", explanation: "4w = 28 → w = 7 cm." },
  { id: "chal-y7-ewp-8", prompt: "Double a number minus 3 equals the number plus 4. Find the number.", latex: "2n-3=n+4", answer: "7", acceptedAnswers: [], hint: "Subtract n from both sides.", explanation: "n − 3 = 4 → n = 7." },
  { id: "chal-y7-ewp-9", prompt: "The sum of a number and 12 is three times the number. Find the number.", latex: "n+12=3n", answer: "6", acceptedAnswers: [], hint: "12 = 2n.", explanation: "n = 6." },
  { id: "chal-y7-ewp-10", prompt: "Four identical pens cost $5.00. Find the cost of one pen ($).", latex: "4p=5", answer: "1.25", acceptedAnswers: [], hint: "Divide by 4.", explanation: "5 ÷ 4 = $1.25." },
  { id: "chal-y7-ewp-11", prompt: "A taxi charges $3 plus $2 per km. A trip costs $17. Find the distance (km).", latex: "3+2d=17", answer: "7", acceptedAnswers: [], hint: "2d = 14.", explanation: "d = 7 km." },
  { id: "chal-y7-ewp-12", prompt: "Seven times a number, less 9, is 33. Find the number.", latex: "7n-9=33", answer: "6", acceptedAnswers: [], hint: "7n = 42.", explanation: "n = 6." },
];

// ── Equations: quadratic ax^2 = c ─────────────────────────────────────────────────────────────
export const quadraticAx2EqualsCChallenge: PracticeQuestion[] = [
  { id: "chal-y7-qax-1", prompt: "Solve $x^2=49$ (give the positive solution).", latex: "x^2=49", answer: "7", acceptedAnswers: [], hint: "Square root.", explanation: "x = 7 (positive root)." },
  { id: "chal-y7-qax-2", prompt: "Solve $2x^2=50$ (positive solution).", latex: "2x^2=50", answer: "5", acceptedAnswers: [], hint: "Divide by 2 first.", explanation: "x² = 25 → x = 5." },
  { id: "chal-y7-qax-3", prompt: "Solve $x^2=144$ (positive solution).", latex: "x^2=144", answer: "12", acceptedAnswers: [], hint: "Square root.", explanation: "x = 12." },
  { id: "chal-y7-qax-4", prompt: "Solve $3x^2=75$ (positive solution).", latex: "3x^2=75", answer: "5", acceptedAnswers: [], hint: "Divide by 3 first.", explanation: "x² = 25 → x = 5." },
  { id: "chal-y7-qax-5", prompt: "Solve $x^2-81=0$ (positive solution).", latex: "x^2-81=0", answer: "9", acceptedAnswers: [], hint: "x² = 81.", explanation: "x = 9." },
  { id: "chal-y7-qax-6", prompt: "Solve $5x^2=45$ (positive solution).", latex: "5x^2=45", answer: "3", acceptedAnswers: [], hint: "x² = 9.", explanation: "x = 3." },
  { id: "chal-y7-qax-7", prompt: "Solve $\\tfrac{x^2}{4}=9$ (positive solution).", latex: "\\tfrac{x^2}{4}=9", answer: "6", acceptedAnswers: [], hint: "x² = 36.", explanation: "x = 6." },
  { id: "chal-y7-qax-8", prompt: "Solve $4x^2=100$ (positive solution).", latex: "4x^2=100", answer: "5", acceptedAnswers: [], hint: "x² = 25.", explanation: "x = 5." },
  { id: "chal-y7-qax-9", prompt: "Solve $x^2=0$.", latex: "x^2=0", answer: "0", acceptedAnswers: [], hint: "Only one solution.", explanation: "x = 0." },
  { id: "chal-y7-qax-10", prompt: "Solve $2x^2-18=0$ (positive solution).", latex: "2x^2-18=0", answer: "3", acceptedAnswers: [], hint: "x² = 9.", explanation: "x = 3." },
  { id: "chal-y7-qax-11", prompt: "Solve $x^2=169$ (positive solution).", latex: "x^2=169", answer: "13", acceptedAnswers: [], hint: "Square root.", explanation: "x = 13." },
  { id: "chal-y7-qax-12", prompt: "A square has area 121 cm². Find its side length (cm).", latex: "s^2=121", answer: "11", acceptedAnswers: [], hint: "Side = √area.", explanation: "s = 11 cm." },
];

// ── Algebraic techniques: notation & substitution into expressions ────────────────────────────
export const algebraicNotationChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ant-1", prompt: "Write '5 less than twice n' as an expression and evaluate it at n = 10.", latex: "2n-5,\\ n=10", answer: "15", acceptedAnswers: [], hint: "2n − 5.", explanation: "2(10) − 5 = 15." },
  { id: "chal-y7-ant-2", prompt: "Evaluate 3a + 2b for a = 4, b = -3.", latex: "3a+2b", answer: "6", acceptedAnswers: [], hint: "Substitute carefully.", explanation: "12 + (-6) = 6." },
  { id: "chal-y7-ant-3", prompt: "Evaluate a² - b for a = 5, b = 7.", latex: "a^2-b", answer: "18", acceptedAnswers: [], hint: "Square a first.", explanation: "25 − 7 = 18." },
  { id: "chal-y7-ant-4", prompt: "Evaluate 2(x + 3) for x = -5.", latex: "2(x+3)", answer: "-4", acceptedAnswers: m("-4"), hint: "Bracket first.", explanation: "2(-2) = -4." },
  { id: "chal-y7-ant-5", prompt: "n books cost $7 each plus $4 postage. Find the total cost for n = 6 ($).", latex: "7n+4", answer: "46", acceptedAnswers: [], hint: "7n + 4.", explanation: "42 + 4 = $46." },
  { id: "chal-y7-ant-6", prompt: "Evaluate (a + b)² for a = 3, b = -1.", latex: "(a+b)^2", answer: "4", acceptedAnswers: [], hint: "Add first, then square.", explanation: "(2)² = 4." },
  { id: "chal-y7-ant-7", prompt: "Evaluate 5x - x² for x = 3.", latex: "5x-x^2", answer: "6", acceptedAnswers: [], hint: "15 − 9.", explanation: "15 − 9 = 6." },
  { id: "chal-y7-ant-8", prompt: "Evaluate ab - c for a = 2, b = -4, c = -5.", latex: "ab-c", answer: "-3", acceptedAnswers: m("-3"), hint: "ab first.", explanation: "-8 − (-5) = -3." },
  { id: "chal-y7-ant-9", prompt: "Evaluate 4 + 3n for n = -2.", latex: "4+3n", answer: "-2", acceptedAnswers: m("-2"), hint: "3n first.", explanation: "4 + (-6) = -2." },
  { id: "chal-y7-ant-10", prompt: "Half of a number increased by 9: evaluate at the number = 14.", latex: "\\tfrac{n}{2}+9", answer: "16", acceptedAnswers: [], hint: "7 + 9.", explanation: "7 + 9 = 16." },
  { id: "chal-y7-ant-11", prompt: "Evaluate a/b + b for a = 12, b = 3.", latex: "\\tfrac{a}{b}+b", answer: "7", acceptedAnswers: [], hint: "Divide first.", explanation: "4 + 3 = 7." },
  { id: "chal-y7-ant-12", prompt: "Evaluate 2a² for a = -3.", latex: "2a^2", answer: "18", acceptedAnswers: [], hint: "Square before doubling.", explanation: "2(9) = 18." },
];

// ── Algebraic techniques: collecting like terms ───────────────────────────────────────────────
export const collectingLikeTermsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-clt-1", prompt: "Simplify 5x + 3x - 2x. Give the coefficient of x.", latex: "5x+3x-2x", answer: "6", acceptedAnswers: [], hint: "5 + 3 − 2.", explanation: "6x, coefficient 6." },
  { id: "chal-y7-clt-2", prompt: "Simplify 7a - 2b + 3a + 5b. Give the coefficient of a.", latex: "7a-2b+3a+5b", answer: "10", acceptedAnswers: [], hint: "Combine the a terms.", explanation: "10a + 3b, coefficient of a is 10." },
  { id: "chal-y7-clt-3", prompt: "Simplify 4x + 9 - x - 5, then evaluate at x = 2.", latex: "4x+9-x-5", answer: "10", acceptedAnswers: [], hint: "3x + 4.", explanation: "3(2) + 4 = 10." },
  { id: "chal-y7-clt-4", prompt: "Simplify 6m - 8m. Give the coefficient of m.", latex: "6m-8m", answer: "-2", acceptedAnswers: m("-2"), hint: "6 − 8.", explanation: "-2m, coefficient -2." },
  { id: "chal-y7-clt-5", prompt: "Simplify 3x² + 2x - x² + x. Give the coefficient of x².", latex: "3x^2+2x-x^2+x", answer: "2", acceptedAnswers: [], hint: "Combine the x² terms.", explanation: "2x² + 3x, coefficient of x² is 2." },
  { id: "chal-y7-clt-6", prompt: "Simplify 5a + 3 - 2a - 8. Give the constant term.", latex: "5a+3-2a-8", answer: "-5", acceptedAnswers: m("-5"), hint: "Combine the numbers.", explanation: "3a − 5, constant -5." },
  { id: "chal-y7-clt-7", prompt: "Simplify 2x + 3y - 5x + y. Give the coefficient of x.", latex: "2x+3y-5x+y", answer: "-3", acceptedAnswers: m("-3"), hint: "2 − 5.", explanation: "-3x + 4y, coefficient of x is -3." },
  { id: "chal-y7-clt-8", prompt: "Simplify 10p - 4p + p. Give the coefficient of p.", latex: "10p-4p+p", answer: "7", acceptedAnswers: [], hint: "10 − 4 + 1.", explanation: "7p, coefficient 7." },
  { id: "chal-y7-clt-9", prompt: "Simplify 4ab + 2ab - ab. Give the coefficient of ab.", latex: "4ab+2ab-ab", answer: "5", acceptedAnswers: [], hint: "4 + 2 − 1.", explanation: "5ab, coefficient 5." },
  { id: "chal-y7-clt-10", prompt: "Simplify 8 - 3x + 5x - 2, then evaluate at x = 4.", latex: "8-3x+5x-2", answer: "14", acceptedAnswers: [], hint: "2x + 6.", explanation: "2(4) + 6 = 14." },
  { id: "chal-y7-clt-11", prompt: "Simplify -2y + 7y - 4y. Give the coefficient of y.", latex: "-2y+7y-4y", answer: "1", acceptedAnswers: [], hint: "-2 + 7 − 4.", explanation: "1y, coefficient 1." },
  { id: "chal-y7-clt-12", prompt: "Simplify 3a + 2a² + 5a - a². Give the coefficient of a.", latex: "3a+2a^2+5a-a^2", answer: "8", acceptedAnswers: [], hint: "Combine the a terms.", explanation: "a² + 8a, coefficient of a is 8." },
];

// ── Algebraic techniques: expanding brackets ──────────────────────────────────────────────────
export const expandingBracketsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-exb-1", prompt: "Expand 3(x + 4) and evaluate at x = 2.", latex: "3(x+4)", answer: "18", acceptedAnswers: [], hint: "3x + 12.", explanation: "3(2) + 12 = 18." },
  { id: "chal-y7-exb-2", prompt: "Expand 2(3x - 5). Give the coefficient of x.", latex: "2(3x-5)", answer: "6", acceptedAnswers: [], hint: "Multiply 2 × 3.", explanation: "6x − 10, coefficient 6." },
  { id: "chal-y7-exb-3", prompt: "Expand -4(x - 2). Give the constant term.", latex: "-4(x-2)", answer: "8", acceptedAnswers: [], hint: "-4 × -2.", explanation: "-4x + 8, constant 8." },
  { id: "chal-y7-exb-4", prompt: "Expand x(x + 5). Give the coefficient of x.", latex: "x(x+5)", answer: "5", acceptedAnswers: [], hint: "x·x + 5·x.", explanation: "x² + 5x, coefficient of x is 5." },
  { id: "chal-y7-exb-5", prompt: "Expand and simplify 2(x + 3) + 3(x - 1). Give the coefficient of x.", latex: "2(x+3)+3(x-1)", answer: "5", acceptedAnswers: [], hint: "2x + 3x.", explanation: "5x + 3, coefficient 5." },
  { id: "chal-y7-exb-6", prompt: "Expand and simplify 4(x + 2) - 2(x - 3), then evaluate at x = 0.", latex: "4(x+2)-2(x-3)", answer: "14", acceptedAnswers: [], hint: "2x + 14.", explanation: "At x = 0: 14." },
  { id: "chal-y7-exb-7", prompt: "Expand 5(2x - 3). Give the constant term.", latex: "5(2x-3)", answer: "-15", acceptedAnswers: m("-15"), hint: "5 × -3.", explanation: "10x − 15, constant -15." },
  { id: "chal-y7-exb-8", prompt: "Expand -(x - 7). Give the constant term.", latex: "-(x-7)", answer: "7", acceptedAnswers: [], hint: "Distribute the minus.", explanation: "-x + 7, constant 7." },
  { id: "chal-y7-exb-9", prompt: "Expand and simplify 3(2x + 1) + 4, then evaluate at x = 2.", latex: "3(2x+1)+4", answer: "19", acceptedAnswers: [], hint: "6x + 7.", explanation: "6(2) + 7 = 19." },
  { id: "chal-y7-exb-10", prompt: "Expand 2x(3x - 4). Give the coefficient of x².", latex: "2x(3x-4)", answer: "6", acceptedAnswers: [], hint: "2x · 3x.", explanation: "6x² − 8x, coefficient of x² is 6." },
  { id: "chal-y7-exb-11", prompt: "Expand and simplify 3(x + 5) - (x + 2). Give the coefficient of x.", latex: "3(x+5)-(x+2)", answer: "2", acceptedAnswers: [], hint: "3x − x.", explanation: "2x + 13, coefficient 2." },
  { id: "chal-y7-exb-12", prompt: "Expand and simplify 6(x - 1) - 2(2x - 5), then evaluate at x = 1.", latex: "6(x-1)-2(2x-5)", answer: "6", acceptedAnswers: [], hint: "2x + 4.", explanation: "2(1) + 4 = 6." },
];

// ── Algebraic techniques: factorising common factors ──────────────────────────────────────────
export const factorisingCommonFactorsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-fcf-1", prompt: "Factorise 6x + 9. Give the common factor taken out.", latex: "6x+9", answer: "3", acceptedAnswers: [], hint: "HCF of 6 and 9.", explanation: "3(2x + 3), common factor 3." },
  { id: "chal-y7-fcf-2", prompt: "Factorise 12a - 8. Give the common factor taken out.", latex: "12a-8", answer: "4", acceptedAnswers: [], hint: "HCF of 12 and 8.", explanation: "4(3a − 2), common factor 4." },
  { id: "chal-y7-fcf-3", prompt: "Factorise x² + 5x as x(x + k). Find k.", latex: "x^2+5x=x(x+k)", answer: "5", acceptedAnswers: [], hint: "Take out x.", explanation: "x(x + 5), so k = 5." },
  { id: "chal-y7-fcf-4", prompt: "Find the highest common factor of 15xy and 10x.", latex: "\\gcd(15xy,10x)", answer: "5x", acceptedAnswers: [], hint: "Numbers and the common letter.", explanation: "HCF = 5x." },
  { id: "chal-y7-fcf-5", prompt: "Factorise 8x + 12. Give the common factor taken out.", latex: "8x+12", answer: "4", acceptedAnswers: [], hint: "HCF of 8 and 12.", explanation: "4(2x + 3), common factor 4." },
  { id: "chal-y7-fcf-6", prompt: "Find the highest common factor of 14a² and 21a.", latex: "\\gcd(14a^2,21a)", answer: "7a", acceptedAnswers: [], hint: "Number HCF and lowest power of a.", explanation: "HCF = 7a." },
  { id: "chal-y7-fcf-7", prompt: "Find the highest common factor of 18m and 24.", latex: "\\gcd(18m,24)", answer: "6", acceptedAnswers: [], hint: "Only the numbers share a factor.", explanation: "HCF of 18 and 24 is 6." },
  { id: "chal-y7-fcf-8", prompt: "Factorise 9x - 27. Give the common factor taken out.", latex: "9x-27", answer: "9", acceptedAnswers: [], hint: "HCF of 9 and 27.", explanation: "9(x − 3), common factor 9." },
  { id: "chal-y7-fcf-9", prompt: "Find the highest common factor of 4x² and 6x.", latex: "\\gcd(4x^2,6x)", answer: "2x", acceptedAnswers: [], hint: "Number HCF and lowest power of x.", explanation: "HCF = 2x." },
  { id: "chal-y7-fcf-10", prompt: "Factorise 20 - 16x. Give the common factor taken out.", latex: "20-16x", answer: "4", acceptedAnswers: [], hint: "HCF of 20 and 16.", explanation: "4(5 − 4x), common factor 4." },
  { id: "chal-y7-fcf-11", prompt: "Factorise 3a + 3b + 3c. Give the common factor taken out.", latex: "3a+3b+3c", answer: "3", acceptedAnswers: [], hint: "Every term has a 3.", explanation: "3(a + b + c), common factor 3." },
  { id: "chal-y7-fcf-12", prompt: "Find the highest common factor of 12x² and 18x.", latex: "\\gcd(12x^2,18x)", answer: "6x", acceptedAnswers: [], hint: "Number HCF and lowest power of x.", explanation: "HCF = 6x." },
];

// ── Algebraic techniques: substitution into formulas ──────────────────────────────────────────
export const substitutionChallenge: PracticeQuestion[] = [
  { id: "chal-y7-sub-1", prompt: "If v = u + at, find v when u = 5, a = 3, t = 4.", latex: "v=u+at", answer: "17", acceptedAnswers: [], hint: "at first.", explanation: "5 + 12 = 17." },
  { id: "chal-y7-sub-2", prompt: "If A = ½bh, find A when b = 8, h = 5.", latex: "A=\\tfrac12 bh", answer: "20", acceptedAnswers: [], hint: "Half of bh.", explanation: "½(8)(5) = 20." },
  { id: "chal-y7-sub-3", prompt: "If P = 2(l + w), find P when l = 9, w = 4.", latex: "P=2(l+w)", answer: "26", acceptedAnswers: [], hint: "Bracket first.", explanation: "2(13) = 26." },
  { id: "chal-y7-sub-4", prompt: "If s = ut + ½at², find s when u = 0, a = 10, t = 3.", latex: "s=ut+\\tfrac12 at^2", answer: "45", acceptedAnswers: [], hint: "Second term only.", explanation: "0 + ½(10)(9) = 45." },
  { id: "chal-y7-sub-5", prompt: "If E = mc², find E when m = 2, c = 3.", latex: "E=mc^2", answer: "18", acceptedAnswers: [], hint: "Square c first.", explanation: "2(9) = 18." },
  { id: "chal-y7-sub-6", prompt: "If y = 3x² - 2x, find y when x = 4.", latex: "y=3x^2-2x", answer: "40", acceptedAnswers: [], hint: "48 − 8.", explanation: "3(16) − 8 = 40." },
  { id: "chal-y7-sub-7", prompt: "If F = (9/5)C + 32, find F when C = 20.", latex: "F=\\tfrac{9}{5}C+32", answer: "68", acceptedAnswers: [], hint: "36 + 32.", explanation: "(9/5)(20) + 32 = 68." },
  { id: "chal-y7-sub-8", prompt: "If a = (v - u)/t, find a when v = 20, u = 4, t = 8.", latex: "a=\\tfrac{v-u}{t}", answer: "2", acceptedAnswers: [], hint: "Numerator first.", explanation: "16/8 = 2." },
  { id: "chal-y7-sub-9", prompt: "If T = a + (n - 1)d, find T when a = 3, n = 5, d = 4.", latex: "T=a+(n-1)d", answer: "19", acceptedAnswers: [], hint: "(n − 1)d first.", explanation: "3 + 16 = 19." },
  { id: "chal-y7-sub-10", prompt: "If V = lwh, find V when l = 2, w = 3, h = 5.", latex: "V=lwh", answer: "30", acceptedAnswers: [], hint: "Multiply all three.", explanation: "2·3·5 = 30." },
  { id: "chal-y7-sub-11", prompt: "If y = mx + c, find y when m = -2, x = 3, c = 7.", latex: "y=mx+c", answer: "1", acceptedAnswers: [], hint: "mx first.", explanation: "-6 + 7 = 1." },
  { id: "chal-y7-sub-12", prompt: "If A = P(1 + rn), find A when P = 100, r = 0.1, n = 3.", latex: "A=P(1+rn)", answer: "130", acceptedAnswers: [], hint: "Bracket first.", explanation: "100(1.3) = 130." },
];
