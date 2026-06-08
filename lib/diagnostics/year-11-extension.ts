import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 11 Mathematics Extension",

  units: [
    {
      slug: "permutations-combinations",
      title: "Permutations and Combinations",
      startHref: "/course/year-11-extension/permutations-combinations",
    },
    {
      slug: "binomial-theorem",
      title: "The Binomial Theorem",
      startHref: "/course/year-11-extension/binomial-theorem",
    },
  ],

  questions: [
    // ── Permutations and Combinations (10 questions) ──────────────────────────

    {
      id: "y11ext-pc1",
      unitSlug: "permutations-combinations",
      prompt:
        "A meal has $4$ choices of main and $3$ choices of dessert. How many different meal combinations are possible?",
      latex: "4 \\times 3",
      choices: [
        { label: "A", text: "$12$" },
        { label: "B", text: "$7$" },
        { label: "C", text: "$24$" },
        { label: "D", text: "$6$" },
      ],
      correctAnswer: "A",
      explanation:
        "The two stages are independent, so multiply the number of choices: $4 \\times 3 = 12$.",
    },
    {
      id: "y11ext-pc2",
      unitSlug: "permutations-combinations",
      prompt: "Evaluate $5!$.",
      latex: "5!",
      choices: [
        { label: "A", text: "$25$" },
        { label: "B", text: "$60$" },
        { label: "C", text: "$120$" },
        { label: "D", text: "$720$" },
      ],
      correctAnswer: "C",
      explanation:
        "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.",
    },
    {
      id: "y11ext-pc3",
      unitSlug: "permutations-combinations",
      prompt:
        "How many ways can a president and vice-president be chosen from $9$ students? (The two roles are different.)",
      latex: "P(9, 2)",
      choices: [
        { label: "A", text: "$36$" },
        { label: "B", text: "$72$" },
        { label: "C", text: "$81$" },
        { label: "D", text: "$18$" },
      ],
      correctAnswer: "B",
      explanation:
        "The roles are different so order matters: $P(9,2) = 9 \\times 8 = 72$.",
    },
    {
      id: "y11ext-pc4",
      unitSlug: "permutations-combinations",
      prompt: "Evaluate $P(7, 3)$.",
      latex: "P(7,3) = \\dfrac{7!}{(7-3)!}",
      choices: [
        { label: "A", text: "$35$" },
        { label: "B", text: "$105$" },
        { label: "C", text: "$210$" },
        { label: "D", text: "$42$" },
      ],
      correctAnswer: "C",
      explanation:
        "$P(7,3) = 7 \\times 6 \\times 5 = 210$.",
    },
    {
      id: "y11ext-pc5",
      unitSlug: "permutations-combinations",
      prompt:
        "A teacher selects $3$ students from a class of $12$ to attend a workshop. No roles are assigned. Which expression gives the number of ways?",
      choices: [
        { label: "A", text: "$P(12, 3)$" },
        { label: "B", text: "$C(12, 3)$" },
        { label: "C", text: "$12^3$" },
        { label: "D", text: "$3!$" },
      ],
      correctAnswer: "B",
      explanation:
        "There are no roles — only a group is selected — so order does not matter: use $C(12,3)$.",
    },
    {
      id: "y11ext-pc6",
      unitSlug: "permutations-combinations",
      prompt: "Evaluate $C(8, 3)$.",
      latex: "C(8,3) = \\dfrac{8!}{3!\\,5!}",
      choices: [
        { label: "A", text: "$56$" },
        { label: "B", text: "$336$" },
        { label: "C", text: "$24$" },
        { label: "D", text: "$168$" },
      ],
      correctAnswer: "A",
      explanation:
        "$C(8,3) = \\dfrac{8 \\times 7 \\times 6}{3!} = \\dfrac{336}{6} = 56$.",
    },
    {
      id: "y11ext-pc7",
      unitSlug: "permutations-combinations",
      prompt:
        "$P(5,2) = 20$ and $C(5,2) = 10$. Why is $C(5,2)$ smaller?",
      choices: [
        { label: "A", text: "Combinations allow repetition; permutations do not." },
        { label: "B", text: "Combinations ignore the order of the selected items, so each group is counted once instead of $2!$ times." },
        { label: "C", text: "Combinations use a different formula that gives fewer items." },
        { label: "D", text: "Permutations allow repetition; combinations do not." },
      ],
      correctAnswer: "B",
      explanation:
        "$C(5,2) = P(5,2) \\div 2!$ because the two chosen items can be swapped in $2!$ ways — swapping does not create a new combination.",
    },
    {
      id: "y11ext-pc8",
      unitSlug: "permutations-combinations",
      prompt:
        "$5$ people stand in a row. Alex and Bea must stand next to each other. How many arrangements are possible?",
      choices: [
        { label: "A", text: "$24$" },
        { label: "B", text: "$48$" },
        { label: "C", text: "$60$" },
        { label: "D", text: "$120$" },
      ],
      correctAnswer: "B",
      explanation:
        "Treat Alex and Bea as one block: arrange $4$ objects in $4! = 24$ ways, then swap the pair in $2! = 2$ ways. Total: $24 \\times 2 = 48$.",
    },
    {
      id: "y11ext-pc9",
      unitSlug: "permutations-combinations",
      prompt:
        "How many distinct arrangements are there of the letters in the word LEVEL?",
      latex: "\\dfrac{5!}{2!\\,2!}",
      choices: [
        { label: "A", text: "$60$" },
        { label: "B", text: "$120$" },
        { label: "C", text: "$30$" },
        { label: "D", text: "$20$" },
      ],
      correctAnswer: "C",
      explanation:
        "LEVEL has 5 letters with L repeated twice and E repeated twice: $\\dfrac{5!}{2!\\,2!} = \\dfrac{120}{4} = 30$.",
    },
    {
      id: "y11ext-pc10",
      unitSlug: "permutations-combinations",
      prompt:
        "How many ways can $5$ distinct people be seated around a circular table?",
      latex: "(n-1)!",
      choices: [
        { label: "A", text: "$120$" },
        { label: "B", text: "$60$" },
        { label: "C", text: "$24$" },
        { label: "D", text: "$5$" },
      ],
      correctAnswer: "C",
      explanation:
        "For circular arrangements, fix one person to remove equivalent rotations: $(5-1)! = 4! = 24$.",
    },

    // ── The Binomial Theorem (10 questions) ───────────────────────────────────

    {
      id: "y11ext-bt1",
      unitSlug: "binomial-theorem",
      prompt: "Row $4$ of Pascal's triangle (starting with row $0 = 1$) is:",
      choices: [
        { label: "A", text: "$1,\\ 3,\\ 3,\\ 1$" },
        { label: "B", text: "$1,\\ 4,\\ 6,\\ 4,\\ 1$" },
        { label: "C", text: "$1,\\ 4,\\ 4,\\ 1$" },
        { label: "D", text: "$1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1$" },
      ],
      correctAnswer: "B",
      explanation:
        "Row 4 has 5 entries: $1,\\ 4,\\ 6,\\ 4,\\ 1$. These are $\\binom{4}{0}, \\binom{4}{1}, \\ldots, \\binom{4}{4}$.",
    },
    {
      id: "y11ext-bt2",
      unitSlug: "binomial-theorem",
      prompt: "What is the sum of all entries in row $5$ of Pascal's triangle?",
      latex: "\\sum_{r=0}^{5}\\binom{5}{r}",
      choices: [
        { label: "A", text: "$16$" },
        { label: "B", text: "$25$" },
        { label: "C", text: "$32$" },
        { label: "D", text: "$64$" },
      ],
      correctAnswer: "C",
      explanation:
        "The sum of row $n$ equals $2^n$. For row 5: $2^5 = 32$.",
    },
    {
      id: "y11ext-bt3",
      unitSlug: "binomial-theorem",
      prompt:
        "In the expansion of $(x + 1)^4$, what is the coefficient of $x^2$?",
      latex: "(x+1)^4",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$8$" },
        { label: "D", text: "$12$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\binom{4}{2} = 6$. The $x^2$ term is $\\binom{4}{2}x^2(1)^2 = 6x^2$.",
    },
    {
      id: "y11ext-bt4",
      unitSlug: "binomial-theorem",
      prompt:
        "Find the coefficient of $x^3$ in the expansion of $(x + 2)^5$.",
      latex: "T_{r+1} = \\binom{5}{r}x^{5-r}\\,2^r",
      choices: [
        { label: "A", text: "$10$" },
        { label: "B", text: "$20$" },
        { label: "C", text: "$40$" },
        { label: "D", text: "$80$" },
      ],
      correctAnswer: "C",
      explanation:
        "For $x^3$: $5 - r = 3 \\Rightarrow r = 2$. Coefficient $= \\binom{5}{2} \\times 2^2 = 10 \\times 4 = 40$.",
    },
    {
      id: "y11ext-bt5",
      unitSlug: "binomial-theorem",
      prompt:
        "The general term of $(a + b)^n$ is $T_{r+1} = \\binom{n}{r}a^{n-r}b^r$. In $(x + 3)^6$, which value of $r$ gives the $x^4$ term?",
      latex: "T_{r+1} = \\binom{6}{r}x^{6-r}\\,3^r",
      choices: [
        { label: "A", text: "$r = 4$" },
        { label: "B", text: "$r = 2$" },
        { label: "C", text: "$r = 3$" },
        { label: "D", text: "$r = 6$" },
      ],
      correctAnswer: "B",
      explanation:
        "The power of $x$ is $6 - r$. Setting $6 - r = 4$ gives $r = 2$.",
    },
    {
      id: "y11ext-bt6",
      unitSlug: "binomial-theorem",
      prompt:
        "Find the coefficient of $x^2$ in the expansion of $(x + 3)^5$.",
      latex: "T_{r+1} = \\binom{5}{r}x^{5-r}\\,3^r",
      choices: [
        { label: "A", text: "$90$" },
        { label: "B", text: "$135$" },
        { label: "C", text: "$270$" },
        { label: "D", text: "$30$" },
      ],
      correctAnswer: "C",
      explanation:
        "$5 - r = 2 \\Rightarrow r = 3$. Coefficient $= \\binom{5}{3} \\times 3^3 = 10 \\times 27 = 270$.",
    },
    {
      id: "y11ext-bt7",
      unitSlug: "binomial-theorem",
      prompt:
        "Using symmetry of binomial coefficients, $\\binom{9}{7}$ equals:",
      latex: "\\binom{n}{r} = \\binom{n}{n-r}",
      choices: [
        { label: "A", text: "$\\binom{9}{3}$" },
        { label: "B", text: "$\\binom{9}{5}$" },
        { label: "C", text: "$\\binom{9}{2}$" },
        { label: "D", text: "$\\binom{8}{6}$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\binom{9}{7} = \\binom{9}{9-7} = \\binom{9}{2}$. Both equal $36$.",
    },
    {
      id: "y11ext-bt8",
      unitSlug: "binomial-theorem",
      prompt:
        "Pascal's identity states $\\binom{n}{r} + \\binom{n}{r+1} = \\binom{n+1}{r+1}$. Evaluate $\\binom{7}{3} + \\binom{7}{4}$.",
      latex: "\\binom{7}{3} + \\binom{7}{4} = \\binom{8}{4}",
      choices: [
        { label: "A", text: "$35$" },
        { label: "B", text: "$56$" },
        { label: "C", text: "$70$" },
        { label: "D", text: "$84$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\binom{7}{3} + \\binom{7}{4} = \\binom{8}{4} = \\dfrac{8!}{4!\\,4!} = 70$.",
    },
    {
      id: "y11ext-bt9",
      unitSlug: "binomial-theorem",
      prompt:
        "Find the sum of all coefficients in the expansion of $(x + 2)^4$ by substituting $x = 1$.",
      latex: "(1 + 2)^4",
      choices: [
        { label: "A", text: "$16$" },
        { label: "B", text: "$24$" },
        { label: "C", text: "$81$" },
        { label: "D", text: "$256$" },
      ],
      correctAnswer: "C",
      explanation:
        "Substitute $x = 1$: $(1 + 2)^4 = 3^4 = 81$.",
    },
    {
      id: "y11ext-bt10",
      unitSlug: "binomial-theorem",
      prompt:
        "In the expansion of $(2 - x)^5$, what is the coefficient of $x^3$?",
      latex: "T_{r+1} = \\binom{5}{r}\\,2^{5-r}\\,(-x)^r",
      choices: [
        { label: "A", text: "$40$" },
        { label: "B", text: "$-40$" },
        { label: "C", text: "$80$" },
        { label: "D", text: "$-80$" },
      ],
      correctAnswer: "B",
      explanation:
        "For $x^3$: $r = 3$. Term $= \\binom{5}{3}\\,2^{5-3}\\,(-x)^3 = 10 \\times 4 \\times (-1) \\times x^3 = -40x^3$. The coefficient is $-40$.",
    },
  ],
};
