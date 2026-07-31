import {
  richAnswer,
  richChoice,
  sequencePlot,
  type SequencesSeriesMasteryMap,
} from "./sequencesSeriesQualityHelpers";

export const sequencesSeriesQualityCore: SequencesSeriesMasteryMap = {
  "arithmetic-sequences": [
    richAnswer({
      id: "y11adv-seq-arith-qm1",
      prompt: "Find the 25th term and state the nth-term rule.",
      latex: "7,11,15,19,\\ldots",
      answer: "T_n=4n+3; T_25=103",
      acceptedAnswers: ["Tn=7+4(n-1), T25=103"],
      hint: "Identify the common difference, then substitute the first term into $T_n=a+(n-1)d$.",
      explanation:
        "The first term is $7$ and the common difference is $4$, so the nth term is $7+4(n-1)=4n+3$. Substituting $n=25$ gives $T_{25}=4(25)+3=103$. The simplified rule and the unsimplified arithmetic-sequence form are equivalent.",
      diagnosticIntent:
        "Checks fluency with both the general arithmetic rule and evaluation at a distant term.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-arith-qm2",
      prompt:
        "A student proposes $T_n=5n+8$ for the plotted sequence. Which diagnosis is correct?",
      latex: "8,13,18,23,\\ldots",
      answer: "C",
      choices: [
        "the rule is correct because its coefficient of $n$ is the common difference",
        "the common difference should be $8$",
        "the coefficient $5$ is correct, but the constant should be $3$ so that $T_1=8$",
        "the rule should be $8n+5$",
      ],
      distractorMisconceptions: {
        A: "Checks the difference but fails to test the first term.",
        B: "Confuses the first term with the common difference.",
        D: "Swaps the first term and difference in a linear rule.",
      },
      hint: "Any proposed nth-term rule must reproduce both the first term and the constant first difference.",
      explanation:
        "$5n+8$ has the correct first difference $5$ but gives $T_1=13$, not $8$. A linear rule with slope $5$ has form $5n+c$; imposing $5+c=8$ gives $c=3$. Therefore $T_n=5n+3$, and C identifies exactly what the student omitted.",
      diagnosticIntent:
        "Targets the common error of treating the common difference as sufficient to determine an nth-term rule.",
      taskType: "analytical",
      difficulty: 3,
      cartesianGraph: sequencePlot(
        "Discrete plot of arithmetic terms 8, 13, 18 and 23 at term numbers 1 to 4",
        [
          { x: 1, y: 8, label: "8" },
          { x: 2, y: 13, label: "13" },
          { x: 3, y: 18, label: "18" },
          { x: 4, y: 23, label: "23" },
        ],
      ),
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm3",
      prompt:
        "An arithmetic sequence satisfies the two term conditions. Find its rule and its 30th term.",
      latex: "T_4=14,\\qquad T_{11}=42",
      answer: "T_n=4n-2; T_30=118",
      acceptedAnswers: ["a=2, d=4, T30=118"],
      hint: "Subtract the two term equations to eliminate the first term, then back-substitute.",
      explanation:
        "The equations are $a+3d=14$ and $a+10d=42$. Subtraction gives $7d=28$, so $d=4$ and then $a=2$. Hence $T_n=2+4(n-1)=4n-2$, and $T_{30}=120-2=118$.",
      diagnosticIntent:
        "Checks reconstruction from nonconsecutive terms and transfer of the resulting rule to a new index.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-arith-qm4",
      prompt: "Which condition characterises an arithmetic sequence?",
      latex: "T_1,T_2,T_3,\\ldots",
      answer: "B",
      choices: [
        "the ratios $T_{n+1}/T_n$ are constant",
        "the first differences $T_{n+1}-T_n$ are constant",
        "the terms are all positive",
        "the second term is twice the first",
      ],
      distractorMisconceptions: {
        A: "Uses the defining condition for a geometric sequence.",
        C: "Treats a possible feature as a defining structural condition.",
        D: "Mistakes one special numerical relationship for a general definition.",
      },
      hint: "Arithmetic sequences change by addition of the same amount at every step.",
      explanation:
        "An arithmetic sequence is produced by adding a fixed common difference, so $T_{n+1}-T_n=d$ is constant. Constant ratios define geometric sequences instead. Positivity and doubling are neither necessary nor sufficient for arithmetic structure, so B is the only general condition.",
      diagnosticIntent:
        "Checks structural classification rather than recognition from one familiar example.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-arith-qm5",
      prompt:
        "For which value of $p$ are the three displayed expressions consecutive terms of an arithmetic sequence?",
      latex: "p+1,\\quad 3p-2,\\quad 8p-7",
      answer: "A",
      choices: ["$p=2/3$", "$p=1$", "$p=3/2$", "$p=2$"],
      distractorMisconceptions: {
        B: "Substitutes a convenient value without equating the two differences.",
        C: "Reverses the fraction produced when solving the linear equation.",
        D: "Equates the first and third terms rather than consecutive differences.",
      },
      hint: "For three arithmetic terms, twice the middle term equals the sum of the outer terms.",
      explanation:
        "Consecutive arithmetic terms satisfy $2(3p-2)=(p+1)+(8p-7)$. This gives $6p-4=9p-6$, hence $3p=2$ and $p=2/3$. Substitution confirms both consecutive differences are $-1/3$, so A is correct.",
      diagnosticIntent:
        "Tests algebraic use of the arithmetic mean condition rather than term-by-term guessing.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm6",
      prompt:
        "Rows in an auditorium form an arithmetic sequence. Row 12 has 47 seats and row 30 has 101 seats. Find the first-row and 50th-row seat counts.",
      latex: "T_{12}=47,\\qquad T_{30}=101",
      answer: "first row 14 seats; row 50 has 161 seats",
      acceptedAnswers: ["a=14, T50=161"],
      hint: "The 18 steps from row 12 to row 30 account for the entire increase of 54 seats.",
      explanation:
        "Subtracting the term equations gives $18d=101-47=54$, so $d=3$. Then $a+11(3)=47$ gives $a=14$. Extending the same pattern, $T_{50}=14+49(3)=161$. Both values are seat counts and therefore whole numbers in context.",
      diagnosticIntent:
        "Checks modelling from separated observations and correct interpretation of index gaps in a context.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm7",
      prompt:
        "Investigate the real values of $k$ for which the sequence is arithmetic, and state its common difference in that case.",
      latex: "T_n=(k-2)n^2+(3k+1)n+4",
      answer: "k=2; common difference 7",
      acceptedAnswers: ["k = 2 and d = 7"],
      hint: "A polynomial sequence is arithmetic exactly when its quadratic coefficient, or equivalently its second difference, is zero.",
      explanation:
        "An arithmetic nth-term rule must be linear in $n$. Therefore the quadratic coefficient $k-2$ must vanish, giving $k=2$. The rule then becomes $T_n=7n+4$, whose constant first difference is $7$. No other value removes the nonzero constant second difference.",
      diagnosticIntent:
        "Assesses a bounded parameter investigation using the link between degree and finite differences.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm8",
      prompt:
        "An increasing arithmetic sequence satisfies both constraints. Determine its first term and common difference.",
      latex: "T_3+T_8=31,\\qquad T_5T_6=238",
      answer: "a=2, d=3",
      acceptedAnswers: ["first term 2, common difference 3"],
      hint: "Use the sum condition to express $a$ in terms of $d$; the product then becomes a difference of squares.",
      explanation:
        "$T_3+T_8=2a+9d=31$, so $a=(31-9d)/2$. Then $T_5=(31-d)/2$ and $T_6=(31+d)/2$. Their product gives $(961-d^2)/4=238$, hence $d^2=9$. The sequence is increasing, so $d=3$, and then $a=2$.",
      diagnosticIntent:
        "Synthesises term formulas, simultaneous constraints, a difference of squares, and a contextual sign choice.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm9",
      prompt:
        "For integer $a$ and $d$, investigate exactly when every term of the arithmetic sequence is odd.",
      latex: "T_n=a+(n-1)d",
      answer: "a must be odd and d must be even",
      acceptedAnswers: ["a odd, d even"],
      hint: "The first term already determines the parity of $a$; then compare two consecutive terms.",
      explanation:
        "If every term is odd, then $T_1=a$ is odd. Also $d=T_2-T_1$ is the difference of two odd integers, so $d$ must be even. Conversely, when $a$ is odd and $d$ is even, every added multiple $(n-1)d$ is even, and odd plus even remains odd. These conditions are therefore necessary and sufficient.",
      diagnosticIntent:
        "Tests proof of a necessary-and-sufficient parity classification for an entire sequence.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-arith-qm10",
      prompt:
        "An arithmetic sequence has the given partial sum and term ratio. Determine its rule and its 50th term.",
      latex: "S_{20}=630,\\qquad T_5:T_{15}=1:3",
      answer: "T_n=3n; T_50=150",
      acceptedAnswers: ["a=3, d=3, T50=150"],
      hint: "Convert the ratio to $3(a+4d)=a+14d$, then combine it with the sum formula.",
      explanation:
        "The ratio gives $3(a+4d)=a+14d$, so $a=d$. Also $S_{20}=10(2a+19d)=630$. Substituting $a=d$ gives $210d=630$, hence $d=a=3$. Therefore $T_n=3+3(n-1)=3n$, and $T_{50}=150$.",
      diagnosticIntent:
        "Combines a partial sum with a ratio of nonconsecutive terms to reconstruct and extend a sequence.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "geometric-sequences": [
    richAnswer({
      id: "y11adv-seq-geo-qm1",
      prompt: "Find the sixth term and describe its sign.",
      latex: "a=3,\\qquad r=-2",
      answer: "T_6=-96, which is negative",
      acceptedAnswers: ["-96"],
      hint: "Use $T_n=ar^{n-1}$ and retain the sign of the odd power of the negative ratio.",
      explanation:
        "$T_6=3(-2)^5=3(-32)=-96$. Because the exponent $5$ is odd, the negative ratio contributes a negative sign. This also matches the alternating sign pattern $3,-6,12,-24,48,-96$.",
      diagnosticIntent:
        "Checks geometric-term fluency while explicitly diagnosing lost signs from negative ratios.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-geo-qm2",
      prompt: "Which property confirms that a nonzero sequence is geometric?",
      latex: "T_1,T_2,T_3,\\ldots",
      answer: "A",
      choices: [
        "$T_{n+1}/T_n$ is constant",
        "$T_{n+1}-T_n$ is constant",
        "the terms are increasing",
        "the second differences are constant",
      ],
      distractorMisconceptions: {
        B: "Uses the defining condition for an arithmetic sequence.",
        C: "Treats one possible behaviour as a structural definition.",
        D: "Uses the signature of a quadratic polynomial sequence.",
      },
      hint: "A geometric sequence is generated by multiplying each nonzero term by the same number.",
      explanation:
        "For a nonzero geometric sequence, each term is obtained by multiplying the previous term by the fixed ratio $r$, so $T_{n+1}/T_n=r$ is constant. Constant differences describe arithmetic sequences, and neither increase nor constant second differences defines geometric structure.",
      diagnosticIntent:
        "Checks structural classification and separates ratios from differences and superficial trends.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm3",
      prompt:
        "A geometric sequence satisfies the two term conditions. Find $a$, $r$, and $T_8$.",
      latex: "T_2=6,\\qquad T_5=162",
      answer: "a=2, r=3, T_8=4374",
      acceptedAnswers: ["first term 2, ratio 3, eighth term 4374"],
      hint: "Dividing $T_5$ by $T_2$ removes $a$ and leaves $r^3$.",
      explanation:
        "$T_5/T_2=r^3=162/6=27$, so the real ratio is $r=3$. Then $ar=6$ gives $a=2$. The eighth term is $T_8=2(3^7)=2(2187)=4374$.",
      diagnosticIntent:
        "Checks reconstruction from separated geometric terms and transfer to a later term.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-geo-qm4",
      prompt: "What sign pattern must occur when $a>0$ and $r<0$?",
      latex: "T_n=ar^{n-1}",
      answer: "D",
      choices: [
        "all terms are positive",
        "all terms are negative",
        "the signs are unpredictable",
        "the signs alternate positive, negative, positive, negative, and so on",
      ],
      distractorMisconceptions: {
        A: "Ignores the negative multiplier applied at each step.",
        B: "Applies the negative sign once rather than at every multiplication.",
        C: "Fails to use parity of successive powers of a negative ratio.",
      },
      hint: "Successive powers of a negative number alternate between positive and negative.",
      explanation:
        "The first term is positive because it uses $r^0=1$. Each multiplication by the negative ratio reverses the sign, so the second term is negative, the third positive, and so on. The magnitudes depend on $|r|$, but the alternating sign pattern is fixed.",
      diagnosticIntent:
        "Checks conceptual control of negative-ratio powers rather than calculator pattern recognition.",
      taskType: "procedural",
      difficulty: 3,
      cartesianGraph: sequencePlot(
        "Discrete plot of six geometric terms with alternating signs and increasing magnitudes",
        [
          { x: 1, y: 1 },
          { x: 2, y: -2 },
          { x: 3, y: 4 },
          { x: 4, y: -8 },
          { x: 5, y: 16 },
          { x: 6, y: -32 },
        ],
      ),
    }),
    richChoice({
      id: "y11adv-seq-geo-qm5",
      prompt:
        "For which positive value of $p$ are the three expressions consecutive geometric terms?",
      latex: "p,\\quad 6,\\quad 24",
      answer: "B",
      choices: ["$p=1$", "$p=3/2$", "$p=2$", "$p=4$"],
      distractorMisconceptions: {
        A: "Uses the ratio from 6 to 24 as the missing first term.",
        C: "Halves the middle term without enforcing equal ratios.",
        D: "Mistakes the common ratio for the first term.",
      },
      hint: "For three consecutive geometric terms, the square of the middle term equals the product of the outer terms.",
      explanation:
        "Consecutive geometric terms satisfy $6^2=p(24)$. Thus $36=24p$ and $p=3/2$. The ratios are then $6/(3/2)=4$ and $24/6=4$, confirming option B.",
      diagnosticIntent:
        "Tests algebraic use of the geometric mean condition and verification of a positive ratio.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm6",
      prompt:
        "A positive-ratio geometric decay has $T_3=200$ and $T_7=12.5$. Find its first term, ratio, and tenth term.",
      latex: "T_3=200,\\qquad T_7=12.5,\\qquad r>0",
      answer: "a=800, r=1/2, T_10=25/16",
      acceptedAnswers: ["a=800, r=0.5, T10=1.5625"],
      hint: "The four-step change from term 3 to term 7 gives $r^4=12.5/200$.",
      explanation:
        "$r^4=12.5/200=1/16$, and the positive-ratio condition gives $r=1/2$. Then $a(1/2)^2=200$, so $a=800$. Three more halvings from $T_7=12.5$ give $T_{10}=12.5/8=1.5625=25/16$.",
      diagnosticIntent:
        "Checks reverse modelling across an index gap and correct selection of a root from a contextual sign condition.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm7",
      prompt:
        "For $a\\ne0$, investigate when the geometric sequence is bounded and when it converges to a finite limit.",
      latex: "T_n=ar^{n-1}",
      answer:
        "bounded iff |r|<=1; convergent iff |r|<1 or r=1",
      acceptedAnswers: [
        "bounded for -1<=r<=1; converges for -1<r<1 and also r=1",
      ],
      hint: "Treat the boundary ratios $r=1$ and $r=-1$ separately from the cases $|r|<1$ and $|r|>1$.",
      explanation:
        "If $|r|<1$, the terms approach zero and are bounded. At $r=1$ the sequence is constantly $a$, so it converges; at $r=-1$ it alternates between $a$ and $-a$, so it is bounded but does not converge. When $|r|>1$, magnitudes grow without bound. Hence the stated conditions are exact.",
      diagnosticIntent:
        "Assesses a bounded case investigation that distinguishes boundedness from convergence at both endpoints.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm8",
      prompt:
        "Three positive increasing consecutive geometric terms have sum 14 and product 64. Find the terms.",
      latex: "x,\\ y,\\ z>0,\\qquad x+y+z=14,\\qquad xyz=64",
      answer: "2, 4, 8",
      acceptedAnswers: ["x=2, y=4, z=8"],
      hint: "For three geometric terms, the product equals the cube of the middle term.",
      explanation:
        "For consecutive geometric terms, $xz=y^2$, so $xyz=y^3=64$ and positivity gives $y=4$. Then $x+z=10$ and $xz=16$. The roots of $t^2-10t+16=0$ are $2$ and $8$. Increasing order gives the terms $2,4,8$.",
      diagnosticIntent:
        "Synthesises symmetric constraints, the geometric mean property, and ordering information.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm9",
      prompt:
        "Prove that any real sequence of at least three terms that is both arithmetic and geometric must be constant.",
      latex: "a,\\quad a+d,\\quad a+2d",
      answer: "the geometric condition forces d^2=0, so d=0 and the sequence is constant",
      acceptedAnswers: ["d=0, hence every term equals a"],
      hint: "Apply the geometric mean condition to three consecutive terms of the arithmetic representation.",
      explanation:
        "If the three arithmetic terms are also geometric, then $(a+d)^2=a(a+2d)$. Expanding gives $a^2+2ad+d^2=a^2+2ad$, so $d^2=0$ and therefore $d=0$. Every arithmetic term is then $a$, and a constant sequence is indeed geometric wherever its ratio is defined.",
      diagnosticIntent:
        "Tests proof by combining the defining invariants of two sequence classes rather than checking examples.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-geo-qm10",
      prompt:
        "A positive increasing geometric sequence has an even number of terms. Its odd-position terms sum to 42, its even-position terms sum to 84, and its last term is 64. Determine the sequence and its total.",
      latex: "T_1+T_3+\\cdots=42,\\qquad T_2+T_4+\\cdots=84,\\qquad T_n=64",
      answer: "2, 4, 8, 16, 32, 64; total 126",
      acceptedAnswers: ["a=2, r=2, n=6, S6=126"],
      hint: "For an even number of terms, the sum of the even-position terms is r times the sum of the odd-position terms.",
      explanation:
        "Pairing each odd-position term with the following even-position term shows $r=84/42=2$. Write $n=2m$. The odd-position sum gives $a(4^m-1)/3=42$, while the last term gives $a2^{2m-1}=64$, or $a4^m=128$. Hence $128-a=126$, so $a=2$, $4^m=64$, and $m=3$. Thus $n=6$, the sequence is $2,4,8,16,32,64$, and its total is $126$.",
      diagnosticIntent:
        "Synthesises grouped subseries, a ratio invariant, an unknown term count, and a final-term constraint.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "arithmetic-series-sigma-notation": [
    richAnswer({
      id: "y11adv-seq-aseries-qm1",
      prompt: "Find the sum of the first 20 terms.",
      latex: "a=8,\\qquad d=3",
      answer: "730",
      acceptedAnswers: ["S_20=730"],
      hint: "Substitute $a=8$, $d=3$, and $n=20$ into the arithmetic-series formula.",
      explanation:
        "$S_{20}=20[2(8)+19(3)]/2=10(16+57)=10(73)=730$. The 20th term is $65$, so the alternative form $20(8+65)/2$ gives the same result.",
      diagnosticIntent:
        "Checks accurate use of either equivalent arithmetic-series formula.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-aseries-qm2",
      prompt: "Which expansion matches the sigma notation?",
      latex: "\\sum_{k=2}^{5}(3k-1)",
      answer: "C",
      choices: [
        "$2+5+8+11$",
        "$5+8+11$",
        "$5+8+11+14$",
        "$6+9+12+15$",
      ],
      distractorMisconceptions: {
        A: "Starts the expression value at 2 rather than substituting k=2.",
        B: "Omits the inclusive upper endpoint k=5.",
        D: "Forgets the minus one in the summand.",
      },
      hint: "Substitute every integer value $k=2,3,4,5$, including both endpoints.",
      explanation:
        "At $k=2,3,4,5$, the expression $3k-1$ gives $5,8,11,14$. Sigma limits are inclusive, so all four terms appear. Therefore C is the correct expansion.",
      diagnosticIntent:
        "Targets lower-limit substitution, upper-limit inclusion, and faithful evaluation of the summand.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm3",
      prompt:
        "A theatre has 15 rows, starting with 22 seats and adding 4 seats per row. Find the total capacity.",
      latex: "a=22,\\qquad d=4,\\qquad n=15",
      answer: "750 seats",
      acceptedAnswers: ["750"],
      hint: "The final row has $22+14(4)$ seats; average the first and last row and multiply by 15.",
      explanation:
        "The last row has $22+14(4)=78$ seats. The total is the arithmetic-series sum $S_{15}=15(22+78)/2=15(50)=750$. The answer is a total number of seats, not the last-row count.",
      diagnosticIntent:
        "Checks translation from a row-growth context to an arithmetic series and distinguishes term from total.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-aseries-qm4",
      prompt: "Which statement correctly distinguishes a sequence from a series?",
      latex: "T_1,T_2,\\ldots,T_n\\qquad\\text{and}\\qquad T_1+T_2+\\cdots+T_n",
      answer: "B",
      choices: [
        "a sequence and a series are identical objects",
        "a sequence is an ordered list of terms; a series is a sum of terms",
        "a series must be infinite",
        "only geometric terms can form a series",
      ],
      distractorMisconceptions: {
        A: "Ignores the operation of addition that defines a series.",
        C: "Confuses the general idea of a series with an infinite series.",
        D: "Restricts series to one sequence family without justification.",
      },
      hint: "Look for the difference between commas separating terms and plus signs combining them.",
      explanation:
        "A sequence records an ordered list, while a series is formed by adding selected sequence terms. Series can be finite or infinite, and both arithmetic and geometric sequences can generate them. Thus B states the structural distinction.",
      diagnosticIntent:
        "Checks foundational vocabulary needed to select term versus sum formulas correctly.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-aseries-qm5",
      prompt:
        "A student sets $n=41$ when summing $5+9+13+\\cdots+41$. Which correction is required?",
      latex: "5+9+13+\\cdots+41",
      answer: "D",
      choices: [
        "41 is correct because it is the final term",
        "use $n=9$ because the common difference is 4",
        "use $n=11$ because there are 11 gaps",
        "solve $5+(n-1)4=41$, giving $n=10$ terms",
      ],
      distractorMisconceptions: {
        A: "Confuses the numerical last term with the number of terms.",
        B: "Combines unrelated values instead of solving the term equation.",
        C: "Miscounts the nine gaps between ten terms.",
      },
      hint: "The symbol $n$ counts terms; use the last-term equation to determine that count.",
      explanation:
        "The last term and number of terms are different quantities. Solving $41=5+4(n-1)$ gives $36=4(n-1)$, so $n-1=9$ and $n=10$. Therefore D corrects the modelling error before any sum formula is used.",
      diagnosticIntent:
        "Targets a high-frequency error in which the final term is substituted as the term count.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm6",
      prompt: "Find the positive integer $n$ for which the partial sum has the stated value.",
      latex: "a=5,\\qquad d=3,\\qquad S_n=185",
      answer: "n=10",
      acceptedAnswers: ["10 terms"],
      hint: "Substitution gives a quadratic equation $n(3n+7)=370$.",
      explanation:
        "$185=n[10+3(n-1)]/2=n(3n+7)/2$, so $3n^2+7n-370=0$. This factors as $(3n+37)(n-10)=0$. The term count must be a positive integer, hence $n=10$.",
      diagnosticIntent:
        "Checks reverse use of a sum formula, quadratic solving, and rejection of an invalid term count.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm7",
      prompt:
        "Investigate the sum of the first $n$ positive odd integers and establish a closed formula.",
      latex: "1+3+5+\\cdots+(2n-1)",
      answer: "the sum is n^2",
      acceptedAnswers: ["S_n=n^2"],
      hint: "Treat the odd numbers as an arithmetic series with first term 1, last term $2n-1$, and $n$ terms.",
      explanation:
        "The odd numbers form an arithmetic series with $a=1$, $l=2n-1$, and $n$ terms. Therefore $S_n=n[1+(2n-1)]/2=n(2n)/2=n^2$. This derivation proves the observed square-number pattern for every positive integer $n$.",
      diagnosticIntent:
        "Assesses a bounded pattern investigation that culminates in an algebraically justified generalisation.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm8",
      prompt:
        "An arithmetic sequence has two known partial sums. Determine $a$, $d$, and $T_{50}$.",
      latex: "S_{10}=200,\\qquad S_{20}=800",
      answer: "a=2, d=4, T_50=198",
      acceptedAnswers: ["first term 2, difference 4, fiftieth term 198"],
      hint: "Write one linear equation from each sum formula, then subtract them to eliminate $a$.",
      explanation:
        "$S_{10}=5(2a+9d)=200$ gives $2a+9d=40$. Also $S_{20}=10(2a+19d)=800$ gives $2a+19d=80$. Subtraction yields $10d=40$, so $d=4$ and $a=2$. Hence $T_{50}=2+49(4)=198$.",
      diagnosticIntent:
        "Synthesises two aggregate constraints to recover an underlying sequence and extrapolate it.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm9",
      prompt:
        "Prove the sigma identity for $n\\ge3$, then use it to solve the stated equation.",
      latex: "\\sum_{k=3}^{n}(2k-1)=n^2-4,\\qquad \\sum_{k=3}^{n}(2k-1)=221",
      answer: "identity proved; n=15",
      acceptedAnswers: ["n=15"],
      hint: "Subtract the first two odd numbers from the sum of the first $n$ odd numbers.",
      explanation:
        "The first $n$ odd numbers sum to $n^2$. Removing the terms for $k=1$ and $k=2$, namely $1+3=4$, gives $\\sum_{k=3}^{n}(2k-1)=n^2-4$. Setting this equal to $221$ gives $n^2=225$. Since $n\\ge3$, the valid solution is $n=15$.",
      diagnosticIntent:
        "Combines reindexing, a proven general identity, and domain-aware solution of a resulting equation.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-aseries-qm10",
      prompt:
        "The first 10 deposits total $700$ and the next 10 total $1700$. Deposits increase arithmetically. Find the first deposit, weekly increase, and 30th deposit.",
      latex: "S_{10}=700,\\qquad S_{20}-S_{10}=1700",
      answer: "first deposit 25; increase 10; 30th deposit 315",
      acceptedAnswers: ["a=25, d=10, T30=315"],
      hint: "Convert the second block total into $S_{20}=2400$, then solve the two sum equations.",
      explanation:
        "$S_{10}=5(2a+9d)=700$ gives $2a+9d=140$. The second block makes $S_{20}=2400$, so $10(2a+19d)=2400$ and $2a+19d=240$. Subtraction gives $d=10$, then $a=25$. The 30th deposit is $25+29(10)=315$.",
      diagnosticIntent:
        "Synthesises block totals, cumulative sums, sequence reconstruction, and a contextual future term.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
