import {
  richAnswer,
  richChoice,
  sequencePlot,
  type SequencesSeriesMasteryMap,
} from "./sequencesSeriesQualityHelpers";

export const sequencesSeriesQualityApplied: SequencesSeriesMasteryMap = {
  "geometric-series-limiting-sums": [
    richAnswer({
      id: "y11adv-seq-gseries-qm1",
      prompt: "Find the sum of the first six terms.",
      latex: "a=5,\\qquad r=2",
      answer: "315",
      acceptedAnswers: ["S_6=315"],
      hint: "Use the finite geometric sum; the numerator is $2^6-1$.",
      explanation:
        "$S_6=5(2^6-1)/(2-1)=5(64-1)=5(63)=315$. Direct addition of $5+10+20+40+80+160$ confirms the same finite total.",
      diagnosticIntent:
        "Checks accurate finite geometric summation without confusing it with a limiting sum.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-gseries-qm2",
      prompt: "Which condition is necessary and sufficient for a real infinite geometric series to converge?",
      latex: "a+ar+ar^2+\\cdots",
      answer: "B",
      choices: ["$r<1$", "$|r|<1$", "$|r|\\le1$", "$r>0$"],
      distractorMisconceptions: {
        A: "Includes ratios less than or equal to -1, whose terms do not tend to zero.",
        C: "Incorrectly includes both boundary ratios 1 and -1.",
        D: "Excludes valid alternating series with negative ratios of magnitude below one.",
      },
      hint: "Convergence requires the term magnitudes $|ar^n|$ to approach zero.",
      explanation:
        "An infinite geometric series converges exactly when successive term magnitudes shrink to zero, which requires $|r|<1$. Negative ratios within this range give convergent alternating series. At $r=1$ terms stay constant, and at $r=-1$ they alternate without shrinking.",
      diagnosticIntent:
        "Targets missing absolute values and mishandling of negative or boundary common ratios.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm3",
      prompt: "Find the limiting sum and explain why it exists.",
      latex: "18-6+2-\\frac{2}{3}+\\cdots",
      answer: "27/2",
      acceptedAnswers: ["13.5"],
      hint: "The common ratio is $-1/3$, whose magnitude is below one.",
      explanation:
        "The common ratio is $r=-1/3$, so $|r|<1$ and a limiting sum exists. Using $S_\\infty=a/(1-r)$ gives $18/[1-(-1/3)]=18/(4/3)=27/2=13.5$.",
      diagnosticIntent:
        "Checks convergence and exact evaluation for an alternating geometric series.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-gseries-qm4",
      prompt: "Which geometric series represents the recurring decimal $0.272727\\ldots$?",
      latex: "0.272727\\ldots",
      answer: "C",
      choices: [
        "$0.27+0.27+0.27+\\cdots$",
        "$27+0.27+0.0027+\\cdots$",
        "$0.27+0.0027+0.000027+\\cdots$",
        "$0.2+0.07+0.2+0.07+\\cdots$",
      ],
      distractorMisconceptions: {
        A: "Repeats equal terms instead of shifting the repeating block by two decimal places.",
        B: "Starts with the integer 27 rather than the decimal block 0.27.",
        D: "Alternates digits without assigning their decreasing place values.",
      },
      hint: "Each repeated two-digit block is one hundredth of the previous block.",
      explanation:
        "The first block contributes $0.27$, the next starts two places later and contributes $0.0027$, and each later block is multiplied by $0.01$. Thus C is a geometric series with $a=0.27$ and $r=0.01$.",
      diagnosticIntent:
        "Checks construction of a geometric model from place value rather than recall of a fraction rule.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-gseries-qm5",
      prompt:
        "A student applies $S_\\infty=a/(1-r)$ to a series with $r=-1.2$. Which diagnosis is correct?",
      latex: "r=-1.2",
      answer: "D",
      choices: [
        "the method is valid because $r<1$",
        "the method is valid because the signs alternate",
        "replace $r$ by $|r|$ in the formula",
        "the series diverges because $|r|>1$, so no limiting sum exists",
      ],
      distractorMisconceptions: {
        A: "Uses r<1 instead of the required absolute-value condition.",
        B: "Assumes alternating signs guarantee shrinking magnitudes.",
        C: "Changes the given series rather than checking its convergence.",
      },
      hint: "Before using the formula, test whether the term magnitudes tend to zero.",
      explanation:
        "Although the signs alternate, multiplying by $-1.2$ makes term magnitudes grow by a factor of $1.2$. Since $|r|=1.2>1$, the terms do not approach zero and the series cannot converge. The limiting-sum formula is therefore inapplicable, so D is correct.",
      diagnosticIntent:
        "Targets the false shortcut that any negative or numerically less-than-one ratio produces convergence.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm6",
      prompt:
        "A ball is dropped 10 m and rebounds to 60% of each previous height. Find its total vertical distance travelled.",
      latex: "h_0=10,\\qquad r=0.6",
      answer: "40 m",
      acceptedAnswers: ["40 metres"],
      hint: "Count the initial drop once, then every rebound height twice: once up and once down.",
      explanation:
        "The initial drop contributes $10$ m. Rebound heights form $6+3.6+\\cdots$ with limiting sum $6/(1-0.6)=15$ m. Each rebound height is travelled upward and downward, so the total distance is $10+2(15)=40$ m.",
      diagnosticIntent:
        "Checks construction of a geometric series from motion and correct double-counting of rebound legs.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm7",
      prompt:
        "Investigate the ratios for which the limiting sum lies strictly between $1/2$ and $2$.",
      latex: "1+r+r^2+\\cdots",
      answer: "-1<r<1/2",
      acceptedAnswers: ["r in (-1, 0.5)"],
      hint: "First impose $|r|<1$, then solve $1/2<1/(1-r)<2$ with a positive denominator.",
      explanation:
        "Convergence gives $-1<r<1$, so $1-r>0$. The inequality $1/(1-r)>1/2$ gives $r>-1$, while $1/(1-r)<2$ gives $r<1/2$. Combining these strict conditions yields $-1<r<1/2$.",
      diagnosticIntent:
        "Assesses a bounded parameter investigation combining convergence and rational inequalities.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm8",
      prompt:
        "Find the least number of terms needed so that the remaining tail is less than $0.01$.",
      latex: "12+6+3+\\cdots",
      answer: "12 terms",
      acceptedAnswers: ["n=12"],
      hint: "The tail after $n$ terms is $24(1/2)^n$; compare powers of two with 2400.",
      explanation:
        "The limiting sum is $24$, and the omitted tail after $n$ terms is $24(1/2)^n$. Requiring this below $0.01$ gives $2^n>2400$. Since $2^{11}=2048$ is too small but $2^{12}=4096$ is large enough, the least value is $n=12$.",
      diagnosticIntent:
        "Synthesises partial sums, tail error, an inequality, and a least-integer decision.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm9",
      prompt: "Convert the recurring decimal to a simplified fraction by constructing its geometric series.",
      latex: "0.123123123\\ldots",
      answer: "41/333",
      acceptedAnswers: ["123/999"],
      hint: "Use first term $123/1000$ and common ratio $1/1000$.",
      explanation:
        "The repeated blocks form a geometric series with $a=123/1000$ and $r=1/1000$. Its sum is $(123/1000)/(1-1/1000)=123/999$. Dividing numerator and denominator by $3$ gives the simplified fraction $41/333$.",
      diagnosticIntent:
        "Tests a place-value investigation and exact simplification of the resulting limiting sum.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-gseries-qm10",
      prompt:
        "A positive infinite geometric series has sum 30, while the series formed by squaring every term has sum 300. Find the first term and ratio.",
      latex: "\\frac{a}{1-r}=30,\\qquad \\frac{a^2}{1-r^2}=300",
      answer: "a=15, r=1/2",
      acceptedAnswers: ["first term 15, common ratio 0.5"],
      hint: "Use $a=30(1-r)$ in the squared-term series and cancel the common factor $1-r$.",
      explanation:
        "From the first sum, $a=30(1-r)$. Substitution into the squared-term sum gives $900(1-r)^2/[(1-r)(1+r)]=300$, so $3(1-r)=1+r$. Hence $r=1/2$ and $a=30(1/2)=15$. Both are positive and satisfy convergence.",
      diagnosticIntent:
        "Combines two related infinite series, algebraic cancellation, and validation of the recovered parameters.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "sequences-series-exam-practice": [
    richAnswer({
      id: "y11adv-seq-exam-qm1",
      prompt: "Classify the sequence and state its nth-term rule.",
      latex: "2,6,18,54,\\ldots",
      answer: "geometric with r=3; T_n=2(3)^(n-1)",
      acceptedAnswers: ["geometric, Tn=2*3^(n-1)"],
      hint: "Compare consecutive ratios and then use the geometric nth-term form.",
      explanation:
        "Each term is three times the previous term, so the sequence is geometric with first term $2$ and ratio $3$. Therefore its nth term is $2$ multiplied by $3$ to the power $n-1$. The increasing differences are not constant, so it is not arithmetic.",
      diagnosticIntent:
        "Checks classification and immediate construction of a formula rather than label recognition alone.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-exam-qm2",
      prompt:
        "A quantity begins at 500 and increases by 8% each year. Which model is appropriate?",
      latex: "T_1=500",
      answer: "C",
      choices: [
        "$T_n=500+0.08(n-1)$",
        "$T_n=500+40(n-1)$",
        "$T_n=500(1.08)^{n-1}$",
        "$T_n=1.08(500)^{n-1}$",
      ],
      distractorMisconceptions: {
        A: "Adds the percentage as a fixed decimal amount.",
        B: "Uses the first year's increase as a constant arithmetic difference.",
        D: "Swaps the initial value and growth factor in the geometric rule.",
      },
      hint: "A percentage increase multiplies the current amount by the same growth factor each year.",
      explanation:
        "An 8% annual increase multiplies the current value by $1.08$, so the data form a geometric sequence with $a=500$ and $r=1.08$. Thus the nth term is $500$ multiplied by $1.08$ to the power $n-1$, option C. A fixed addition of 40 would not preserve 8% growth after the first year.",
      diagnosticIntent:
        "Distinguishes multiplicative percentage growth from a tempting fixed-increase approximation.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm3",
      prompt:
        "An arithmetic sequence satisfies both conditions. Find its rule and its 30th term.",
      latex: "T_7=23,\\qquad S_{15}=390",
      answer: "T_n=3n+2; T_30=92",
      acceptedAnswers: ["a=5, d=3, T30=92"],
      hint: "Use $a+6d=23$ and substitute it into the 15-term sum equation.",
      explanation:
        "$T_7=a+6d=23$. Also $S_{15}=15[2a+14d]/2=390$, so $a+7d=26$. Subtracting gives $d=3$, then $a=5$. Hence $T_n=5+3(n-1)=3n+2$ and $T_{30}=92$.",
      diagnosticIntent:
        "Checks reconstruction from one term and one partial sum, then extrapolation.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-exam-qm4",
      prompt: "Which sigma expression represents $7+11+15+\\cdots+43$?",
      latex: "7+11+15+\\cdots+43",
      answer: "A",
      choices: [
        "$\\sum_{k=1}^{10}(4k+3)$",
        "$\\sum_{k=0}^{10}(4k+3)$",
        "$\\sum_{k=1}^{9}(7+4k)$",
        "$\\sum_{k=1}^{43}(4k+3)$",
      ],
      distractorMisconceptions: {
        B: "Includes an extra k=0 term and therefore eleven terms.",
        C: "Starts at 11 rather than 7 and has only nine terms.",
        D: "Uses the final term as the upper index instead of counting terms.",
      },
      hint: "The nth term is $4k+3$ when indexing begins at 1; determine how many terms reach 43.",
      explanation:
        "Solving $4k+3=43$ gives $k=10$, so the ten terms are generated by $4k+3$ for $k=1$ through $10$. Hence option A is exact. The other choices either add an extra term, omit the first term, or confuse value with term count.",
      diagnosticIntent:
        "Checks simultaneous control of summand, lower limit, and term count in sigma notation.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-seq-exam-qm5",
      prompt:
        "Two models share values 100 and 110 in years 1 and 2. Which comparison of their year-5 predictions is correct?",
      latex: "A_n=100+10(n-1),\\qquad G_n=100(1.1)^{n-1}",
      answer: "D",
      choices: [
        "both predict 140",
        "the arithmetic model predicts 146.41 and the geometric model 140",
        "both predict 146.41",
        "the arithmetic model predicts 140 and the geometric model 146.41",
      ],
      distractorMisconceptions: {
        A: "Assumes matching first two terms force all later terms to match.",
        B: "Swaps the fixed-addition and fixed-ratio predictions.",
        C: "Applies compound growth to both models.",
      },
      hint: "Advance each model three more steps using its own invariant: add 10 or multiply by 1.1.",
      explanation:
        "$A_5=100+4(10)=140$, while $G_5=100(1.1)^4=146.41$. The models agree initially but diverge because one adds a constant amount and the other compounds a constant percentage. Therefore D is correct.",
      diagnosticIntent:
        "Tests method comparison and the distinction between locally matching arithmetic and geometric models.",
      taskType: "analytical",
      difficulty: 4,
      cartesianGraph: sequencePlot(
        "Discrete arithmetic values 100, 110, 120, 130 and 140 shown for comparison with compounding growth",
        [
          { x: 1, y: 100 },
          { x: 2, y: 110 },
          { x: 3, y: 120 },
          { x: 4, y: 130 },
          { x: 5, y: 140 },
        ],
      ),
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm6",
      prompt:
        "A geometric sequence satisfies the two term conditions. Find its rule and $S_8$.",
      latex: "T_3=12,\\qquad T_6=96",
      answer: "a=3, r=2, S_8=765",
      acceptedAnswers: ["Tn=3*2^(n-1), S8=765"],
      hint: "Dividing the term conditions gives $r^3=8$; then use the finite sum formula.",
      explanation:
        "$T_6/T_3=r^3=96/12=8$, so $r=2$. Then $a(2^2)=12$ gives $a=3$. The finite sum is $S_8=3(2^8-1)/(2-1)=3(255)=765$.",
      diagnosticIntent:
        "Combines reverse term reconstruction with a later finite-series calculation.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm7",
      prompt:
        "Positive arithmetic and geometric sequences share first term $a$ and second term $b$. Compare their third terms and prove when they are equal.",
      latex: "A_3=2b-a,\\qquad G_3=\\frac{b^2}{a},\\qquad a,b>0",
      answer: "G_3-A_3=(b-a)^2/a>=0; equality iff a=b",
      acceptedAnswers: ["geometric third term is at least arithmetic; equal only when a=b"],
      hint: "Put the difference over the common positive denominator $a$ and factor the numerator.",
      explanation:
        "$G_3-A_3=b^2/a-(2b-a)=(b^2-2ab+a^2)/a=(b-a)^2/a$. Since $a>0$, this is nonnegative. Equality holds exactly when $b-a=0$, so the third terms match only for the constant case $a=b$.",
      diagnosticIntent:
        "Assesses an investigative comparison and proof using the invariants of both sequence types.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm8",
      prompt:
        "Plan A pays $100+20(n-1)$ dollars in week $n$; Plan B pays $100(1.1)^{n-1}$. Find the first week when Plan B's weekly payment exceeds Plan A's.",
      latex: "A_n=100+20(n-1),\\qquad B_n=100(1.1)^{n-1}",
      answer: "week 16",
      acceptedAnswers: ["n=16"],
      hint: "Check consecutive weeks around the crossover; the comparison reverses between weeks 15 and 16.",
      explanation:
        "At week 15, $A_{15}=380$ while $B_{15}=100(1.1)^{14}\\approx379.75$, so Plan B is still lower. At week 16, $A_{16}=400$ while $B_{16}=100(1.1)^{15}\\approx417.72$, so it is higher. Therefore the first crossover occurs in week 16.",
      diagnosticIntent:
        "Synthesises arithmetic and exponential models and requires a least-integer crossover decision.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm9",
      prompt:
        "Investigate the parameter values for which the infinite series converges, find its sum, and solve for the parameter when the sum is 4.",
      latex: "\\sum_{k=0}^{\\infty}\\left(\\frac{p-1}{2}\\right)^k",
      answer: "converges for -1<p<3; sum=2/(3-p); sum 4 when p=5/2",
      acceptedAnswers: ["-1<p<3, S=2/(3-p), p=2.5"],
      hint: "Apply $|r|<1$ to $r=(p-1)/2$, then use $S=1/(1-r)$.",
      explanation:
        "Convergence requires $|(p-1)/2|<1$, giving $-1<p<3$. Within this interval, the sum is $1/[1-(p-1)/2]=2/(3-p)$. Setting it equal to $4$ gives $2=12-4p$, hence $p=5/2$, which lies in the convergence interval.",
      diagnosticIntent:
        "Combines a parameter convergence interval, symbolic limiting sum, and validation of a solved parameter.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-seq-exam-qm10",
      prompt:
        "A positive increasing finite geometric sequence has first term 3, last term 96, and sum 189. Determine its ratio and term count. Then find the sum of the arithmetic sequence with the same first term, last term, and count.",
      latex: "a=3,\\qquad l=96,\\qquad S_n=189",
      answer: "geometric r=2 and n=6; corresponding arithmetic sum 297",
      acceptedAnswers: ["r=2, 6 terms, arithmetic total 297"],
      hint: "The geometric data are realised by powers linking 3 to 96; then use the endpoint form of the arithmetic sum.",
      explanation:
        "$96/3=32=2^5$, so the positive increasing ratio is $2$ and there are $n=6$ terms. The geometric sum is $3(2^6-1)=189$, confirming the data. An arithmetic sequence with the same six terms and endpoints has sum $6(3+96)/2=297$.",
      diagnosticIntent:
        "Synthesises geometric reconstruction with a controlled comparison to an arithmetic series sharing endpoint data.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
