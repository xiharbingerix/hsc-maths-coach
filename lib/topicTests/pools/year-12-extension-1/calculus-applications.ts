import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Further Applications of Calculus.
 *
 * Seven skill subtopics (D4 + D5) plus a D6 exam-practice band, auto-markable
 * per docs/QUESTION_AUTHORING_STANDARD.md. Symbolic answers (π forms, radicals)
 * are fine via the CAS marker; decimals are added to acceptedAnswers.
 *
 * Status: subtopic 1 "Related Rates of Change" — D4 + D5. Remaining subtopics to
 * follow. Not yet registered in index.ts (register once the topic is complete).
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/calculus-applications/${lesson}`;

// ── Subtopic 1: Related Rates of Change ──────────────────────────────────────
// D4: set up dQ/dt = (dQ/dx)(dx/dt) — forward rates, inverse rates (solve for an
// unknown rate), and implicit relations.
const relatedRatesD4: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-rr-d4-1",
    prompt:
      "A spherical balloon has volume V = (4/3)πr³. Its radius increases at 2 cm/s. Find dV/dt (in cm³/s) when r = 3.",
    latex: "V = \\tfrac{4}{3}\\pi r^3, \\quad \\tfrac{dr}{dt} = 2",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$72\\pi$" },
      { label: "B", text: "$36\\pi$" },
      { label: "C", text: "$24\\pi$" },
      { label: "D", text: "$12\\pi$" },
    ],
    answer: "A",
    explanation:
      "dV/dt = 4πr²·dr/dt = 4π(9)(2) = 72π cm³/s. B forgets to multiply by dr/dt = 2.",
  },
  {
    id: "y12e1-capp-rr-d4-2",
    prompt:
      "A circle's area is A = πr² and its radius grows at 3 cm/s. Find dA/dt (in cm²/s) when r = 4.",
    latex: "A = \\pi r^2, \\quad \\tfrac{dr}{dt} = 3",
    marks: 2,
    difficulty: 4,
    answer: "24pi",
    acceptedAnswers: ["24π", "75.40", "75.4"],
    explanation: "dA/dt = 2πr·dr/dt = 2π(4)(3) = 24π cm²/s.",
  },
  {
    id: "y12e1-capp-rr-d4-3",
    prompt:
      "A point moves along y = √x with dx/dt = 4. Find dy/dt at x = 4.",
    latex: "y = \\sqrt{x}, \\quad \\tfrac{dx}{dt} = 4",
    marks: 3,
    difficulty: 4,
    answer: "1",
    explanation: "dy/dt = (1/(2√x))·dx/dt = (1/4)(4) = 1.",
  },
  {
    id: "y12e1-capp-rr-d4-4",
    prompt:
      "Two quantities satisfy xy = 12. If dx/dt = 3, find dy/dt when x = 2.",
    latex: "xy = 12, \\quad \\tfrac{dx}{dt} = 3",
    marks: 3,
    difficulty: 4,
    answer: "-9",
    acceptedAnswers: ["−9"],
    explanation:
      "At x = 2, y = 6. Differentiating: x dy/dt + y dx/dt = 0, so dy/dt = −(y/x)dx/dt = −(6/2)(3) = −9.",
  },
  {
    id: "y12e1-capp-rr-d4-5",
    prompt:
      "A circle's area increases at 10 cm²/s. Find dr/dt (in cm/s) when r = 5.",
    latex: "A = \\pi r^2, \\quad \\tfrac{dA}{dt} = 10",
    marks: 3,
    difficulty: 4,
    answer: "1/pi",
    acceptedAnswers: ["1/π", "0.3183", "0.318"],
    explanation: "10 = 2πr·dr/dt = 2π(5)dr/dt = 10π dr/dt, so dr/dt = 1/π.",
  },
  {
    id: "y12e1-capp-rr-d4-6",
    prompt:
      "A 5 m ladder leans against a wall: x² + y² = 25. Its base slides out at dx/dt = 2 m/s. Find dy/dt when x = 3.",
    latex: "x^2 + y^2 = 25, \\quad \\tfrac{dx}{dt} = 2",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$-\\dfrac{3}{2}$" },
      { label: "B", text: "$\\dfrac{3}{2}$" },
      { label: "C", text: "$-\\dfrac{4}{3}$" },
      { label: "D", text: "$-\\dfrac{3}{4}$" },
    ],
    answer: "A",
    explanation:
      "At x = 3, y = 4. 2x dx/dt + 2y dy/dt = 0 gives dy/dt = −(x/y)dx/dt = −(3/4)(2) = −3/2. B drops the sign; C inverts the ratio.",
  },
  {
    id: "y12e1-capp-rr-d4-7",
    prompt:
      "A spherical balloon V = (4/3)πr³ is inflated so dV/dt = 100 cm³/s. Find dr/dt (in cm/s) when r = 5.",
    latex: "V = \\tfrac{4}{3}\\pi r^3, \\quad \\tfrac{dV}{dt} = 100",
    marks: 3,
    difficulty: 4,
    answer: "1/pi",
    acceptedAnswers: ["1/π", "0.3183", "0.318"],
    explanation: "100 = 4πr²·dr/dt = 4π(25)dr/dt = 100π dr/dt, so dr/dt = 1/π.",
  },
  {
    id: "y12e1-capp-rr-d4-8",
    prompt:
      "A sphere's surface area is S = 4πr² and its radius grows at 2 cm/s. Find dS/dt (in cm²/s) when r = 5.",
    latex: "S = 4\\pi r^2, \\quad \\tfrac{dr}{dt} = 2",
    marks: 2,
    difficulty: 4,
    answer: "80pi",
    acceptedAnswers: ["80π", "251.3", "251.33"],
    explanation: "dS/dt = 8πr·dr/dt = 8π(5)(2) = 80π cm²/s.",
  },
  {
    id: "y12e1-capp-rr-d4-9",
    prompt:
      "A spherical balloon V = (4/3)πr³ is inflated at 400π cm³/s. Find dr/dt (in cm/s) when r = 10.",
    latex: "V = \\tfrac{4}{3}\\pi r^3, \\quad \\tfrac{dV}{dt} = 400\\pi",
    marks: 3,
    difficulty: 4,
    answer: "1",
    explanation: "400π = 4πr²·dr/dt = 4π(100)dr/dt = 400π dr/dt, so dr/dt = 1.",
  },
  {
    id: "y12e1-capp-rr-d4-10",
    prompt:
      "A length satisfies z² = x² + 9. If dx/dt = 4, find dz/dt when x = 4.",
    latex: "z^2 = x^2 + 9, \\quad \\tfrac{dx}{dt} = 4",
    marks: 3,
    difficulty: 4,
    answer: "16/5",
    acceptedAnswers: ["3.2"],
    explanation:
      "At x = 4, z = 5. 2z dz/dt = 2x dx/dt gives dz/dt = (x/z)dx/dt = (4/5)(4) = 16/5.",
  },
];

// D5: multi-stage — eliminate a variable via similar triangles, find a dimension
// from a condition first, combine two rates, or chain through several quantities.
const relatedRatesD5: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-rr-d5-1",
    prompt:
      "Water fills an inverted cone whose radius always equals half its depth (r = h/2). Water enters at 4 m³/min. Find dh/dt (in m/min) when h = 2.",
    latex: "V = \\tfrac{1}{3}\\pi r^2 h, \\quad r = \\tfrac{h}{2}, \\quad \\tfrac{dV}{dt} = 4",
    marks: 4,
    difficulty: 5,
    answer: "4/pi",
    acceptedAnswers: ["4/π", "1.2732", "1.273"],
    explanation:
      "V = (1/3)π(h/2)²h = (π/12)h³, so dV/dh = (π/4)h². At h = 2, dV/dh = π, and dh/dt = (dV/dt)/π = 4/π.",
  },
  {
    id: "y12e1-capp-rr-d5-2",
    prompt:
      "A 2 m tall person walks away from a 6 m lamppost at 1.5 m/s. Find the rate (in m/s) at which the length of their shadow increases.",
    latex: "\\tfrac{6}{x + s} = \\tfrac{2}{s}, \\quad \\tfrac{dx}{dt} = 1.5",
    marks: 4,
    difficulty: 5,
    answer: "3/4",
    acceptedAnswers: ["0.75"],
    explanation:
      "Similar triangles: 6s = 2(x + s) gives 4s = 2x, so s = x/2. Then ds/dt = (1/2)(1.5) = 3/4 m/s.",
  },
  {
    id: "y12e1-capp-rr-d5-3",
    prompt:
      "A circle's radius grows at 2 cm/s. Find dA/dt (in cm²/s) at the instant the area is 16π cm².",
    latex: "A = \\pi r^2, \\quad \\tfrac{dr}{dt} = 2",
    marks: 4,
    difficulty: 5,
    answer: "16pi",
    acceptedAnswers: ["16π", "50.27", "50.265"],
    explanation:
      "Area 16π gives r = 4. dA/dt = 2πr·dr/dt = 2π(4)(2) = 16π cm²/s.",
  },
  {
    id: "y12e1-capp-rr-d5-4",
    prompt:
      "A 10 m ladder's base is pulled out at 1 m/s (x² + y² = 100). Find the rate of change (in m²/s) of the area of the triangle formed by the ladder, wall and floor when x = 6.",
    latex: "A = \\tfrac{1}{2}xy, \\quad x^2 + y^2 = 100, \\quad \\tfrac{dx}{dt} = 1",
    marks: 4,
    difficulty: 5,
    answer: "7/4",
    acceptedAnswers: ["1.75"],
    explanation:
      "At x = 6, y = 8 and dy/dt = −(x/y)(1) = −3/4. dA/dt = ½(y dx/dt + x dy/dt) = ½(8(1) + 6(−3/4)) = ½(3.5) = 7/4.",
  },
  {
    id: "y12e1-capp-rr-d5-5",
    prompt:
      "Sand falls into a cone whose height always equals its radius (h = r), V = (1/3)πr²h. It accumulates at 12 m³/s. Find dr/dt (in m/s) when r = 2.",
    latex: "V = \\tfrac{1}{3}\\pi r^3, \\quad \\tfrac{dV}{dt} = 12",
    marks: 4,
    difficulty: 5,
    answer: "3/pi",
    acceptedAnswers: ["3/π", "0.9549", "0.955"],
    explanation:
      "With h = r, V = (1/3)πr³ and dV/dr = πr². At r = 2, dV/dr = 4π, so dr/dt = 12/(4π) = 3/π.",
  },
  {
    id: "y12e1-capp-rr-d5-6",
    prompt:
      "Car A travels north at 60 km/h and car B east at 80 km/h, both leaving the same point at the same time. Find the rate (in km/h) at which the distance between them increases after 1 hour.",
    latex: "s^2 = a^2 + b^2",
    marks: 4,
    difficulty: 5,
    answer: "100",
    explanation:
      "After 1 h: a = 60, b = 80, s = 100. 2s ds/dt = 2a(da/dt) + 2b(db/dt) gives ds/dt = (60·60 + 80·80)/100 = 10000/100 = 100 km/h.",
  },
  {
    id: "y12e1-capp-rr-d5-7",
    prompt:
      "A spherical snowball melts so that its volume decreases at 4π cm³/s. Find the rate of change (in cm²/s) of its surface area when r = 2.",
    latex: "V = \\tfrac{4}{3}\\pi r^3, \\quad S = 4\\pi r^2, \\quad \\tfrac{dV}{dt} = -4\\pi",
    marks: 4,
    difficulty: 5,
    answer: "-4pi",
    acceptedAnswers: ["−4π", "-12.566", "-12.57"],
    explanation:
      "−4π = 4πr²·dr/dt = 16π dr/dt gives dr/dt = −1/4. Then dS/dt = 8πr·dr/dt = 8π(2)(−1/4) = −4π cm²/s.",
  },
  {
    id: "y12e1-capp-rr-d5-8",
    prompt:
      "A balloon rises vertically at 5 m/s. An observer stands 100 m from the launch point. Find dθ/dt (in rad/s) for the angle of elevation when the balloon is 100 m high.",
    latex: "\\tan\\theta = \\tfrac{h}{100}, \\quad \\tfrac{dh}{dt} = 5",
    marks: 4,
    difficulty: 5,
    answer: "1/40",
    acceptedAnswers: ["0.025"],
    explanation:
      "sec²θ·dθ/dt = (1/100)dh/dt. At h = 100, θ = π/4 and sec²θ = 2, so 2 dθ/dt = 5/100, giving dθ/dt = 1/40.",
  },
  {
    id: "y12e1-capp-rr-d5-9",
    prompt:
      "A particle moves along y = x² with dx/dt = 3. Find the rate of change of its distance from the origin when x = 1.",
    latex: "y = x^2, \\quad D = \\sqrt{x^2 + y^2}, \\quad \\tfrac{dx}{dt} = 3",
    marks: 4,
    difficulty: 5,
    answer: "9sqrt(2)/2",
    acceptedAnswers: ["9√2/2", "9/sqrt(2)", "6.364", "6.3640"],
    explanation:
      "D² = x² + x⁴, so 2D dD/dt = (2x + 4x³)dx/dt. At x = 1, D = √2 and (2 + 4)(3) = 18, so dD/dt = 18/(2√2) = 9√2/2.",
  },
  {
    id: "y12e1-capp-rr-d5-10",
    prompt:
      "A cube's edge length increases at 2 cm/s. Find dV/dt (in cm³/s) at the instant its surface area is 96 cm².",
    latex: "V = x^3, \\quad S = 6x^2, \\quad \\tfrac{dx}{dt} = 2",
    marks: 4,
    difficulty: 5,
    answer: "96",
    explanation:
      "Surface area 96 = 6x² gives x = 4. dV/dt = 3x²·dx/dt = 3(16)(2) = 96 cm³/s.",
  },
];

// ── Subtopic 2: Exponential Growth and Decay ─────────────────────────────────
// N = N₀e^{kt}. D4: find N, k, or t; doubling/half-life; the DE dN/dt = kN; and
// a ratio shortcut. Answers are exact (e, ln) with decimals as accepted forms.
const growthDecayD4: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-egd-d4-1",
    prompt: "For N = 100e^{0.05t}, find N when t = 10 (exact form).",
    latex: "N = 100 e^{0.05t}",
    marks: 2,
    difficulty: 4,
    answer: "100e^(0.5)",
    acceptedAnswers: ["100*e^(1/2)", "100e^0.5", "164.87", "164.9"],
    explanation: "N = 100e^{0.05×10} = 100e^{0.5} ≈ 164.9.",
  },
  {
    id: "y12e1-capp-egd-d4-2",
    prompt: "A quantity N = N₀e^{kt} doubles in 5 years. Find k.",
    latex: "N = N_0 e^{kt}",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{\\ln 2}{5}$" },
      { label: "B", text: "$\\dfrac{2}{5}$" },
      { label: "C", text: "$\\dfrac{5}{\\ln 2}$" },
      { label: "D", text: "$\\dfrac{\\ln 2}{2}$" },
    ],
    answer: "A",
    explanation: "2 = e^{5k} ⇒ 5k = ln 2 ⇒ k = (ln 2)/5.",
  },
  {
    id: "y12e1-capp-egd-d4-3",
    prompt:
      "A population satisfies dP/dt = 0.02P with P(0) = 500. Express P in terms of t.",
    latex: "\\tfrac{dP}{dt} = 0.02P, \\quad P(0) = 500",
    marks: 2,
    difficulty: 4,
    answer: "500e^(0.02t)",
    acceptedAnswers: ["500*e^(0.02t)", "500e^(t/50)"],
    explanation: "dP/dt = kP has solution P = P₀e^{kt}: P = 500e^{0.02t}.",
  },
  {
    id: "y12e1-capp-egd-d4-4",
    prompt: "For N = 500e^{-0.2t}, find N when t = 5 (exact form).",
    latex: "N = 500 e^{-0.2t}",
    marks: 2,
    difficulty: 4,
    answer: "500/e",
    acceptedAnswers: ["500e^(-1)", "183.94", "183.9"],
    explanation: "N = 500e^{-0.2×5} = 500e^{-1} = 500/e ≈ 183.9.",
  },
  {
    id: "y12e1-capp-egd-d4-5",
    prompt: "A culture grows from 200 to 800 in 6 hours under N = N₀e^{kt}. Find k.",
    latex: "200 \\to 800 \\text{ in } 6 \\text{ h}",
    marks: 3,
    difficulty: 4,
    answer: "ln(2)/3",
    acceptedAnswers: ["(ln 2)/3", "ln(4)/6", "0.2310", "0.231"],
    explanation: "800/200 = 4 = e^{6k} ⇒ 6k = ln 4 = 2 ln 2 ⇒ k = (ln 2)/3.",
  },
  {
    id: "y12e1-capp-egd-d4-6",
    prompt: "For A = 50e^{0.1t}, find the time t for A to reach 100.",
    latex: "A = 50 e^{0.1t}",
    marks: 3,
    difficulty: 4,
    answer: "10ln(2)",
    acceptedAnswers: ["10 ln 2", "6.931", "6.93"],
    explanation: "100 = 50e^{0.1t} ⇒ 2 = e^{0.1t} ⇒ t = (ln 2)/0.1 = 10 ln 2.",
  },
  {
    id: "y12e1-capp-egd-d4-7",
    prompt: "A radioactive mass M = 80e^{-0.05t} grams. Find M when t = 20 (exact form).",
    latex: "M = 80 e^{-0.05t}",
    marks: 2,
    difficulty: 4,
    answer: "80/e",
    acceptedAnswers: ["80e^(-1)", "29.43", "29.4"],
    explanation: "M = 80e^{-0.05×20} = 80e^{-1} = 80/e ≈ 29.4 g.",
  },
  {
    id: "y12e1-capp-egd-d4-8",
    prompt: "A quantity grows as N = N₀e^{0.04t}. Find the time for it to triple.",
    latex: "N = N_0 e^{0.04t}",
    marks: 3,
    difficulty: 4,
    answer: "25ln(3)",
    acceptedAnswers: ["25 ln 3", "27.47", "27.46"],
    explanation: "3 = e^{0.04t} ⇒ t = (ln 3)/0.04 = 25 ln 3.",
  },
  {
    id: "y12e1-capp-egd-d4-9",
    prompt: "A substance has a half-life of 10 years. Find its decay constant k in N = N₀e^{kt}.",
    latex: "N = N_0 e^{kt}",
    marks: 3,
    difficulty: 4,
    answer: "-ln(2)/10",
    acceptedAnswers: ["−ln(2)/10", "-(ln 2)/10", "-0.0693", "-0.069"],
    explanation: "1/2 = e^{10k} ⇒ 10k = ln(1/2) = −ln 2 ⇒ k = −(ln 2)/10.",
  },
  {
    id: "y12e1-capp-egd-d4-10",
    prompt:
      "A population N = N₀e^{kt} grows to 4 times its size in 2 hours. Find its size after 4 hours, as a multiple of N₀.",
    latex: "N = N_0 e^{kt}, \\quad N(2) = 4N_0",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$16 N_0$" },
      { label: "B", text: "$8 N_0$" },
      { label: "C", text: "$32 N_0$" },
      { label: "D", text: "$4 N_0$" },
    ],
    answer: "A",
    explanation:
      "e^{2k} = 4, so after 4 hours N = N₀e^{4k} = N₀(e^{2k})² = N₀(16) = 16N₀. B doubles again instead of squaring.",
  },
];

// D5: recover both parameters from two data points, convert between doubling /
// tripling / half-life, use a rate to find k, and compound decay.
const growthDecayD5: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-egd-d5-1",
    prompt:
      "For N = N₀e^{kt}, N(2) = 18 and N(5) = 486. Find N₀.",
    latex: "N(2) = 18, \\quad N(5) = 486",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "N(5)/N(2) = 27 = e^{3k}, so e^{k} = 3. Then N(2) = N₀e^{2k} = 9N₀ = 18, giving N₀ = 2.",
  },
  {
    id: "y12e1-capp-egd-d5-2",
    prompt:
      "A radioactive sample decays from 80 g to 5 g in 12 hours. Find its half-life, in hours.",
    latex: "80 \\to 5 \\text{ g in } 12 \\text{ h}",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation:
      "5/80 = 1/16 = 2⁻⁴ over 12 hours, i.e. four halvings in 12 hours, so the half-life is 12/4 = 3 hours.",
  },
  {
    id: "y12e1-capp-egd-d5-3",
    prompt:
      "A population doubles every 10 years. How long (in years) does it take to triple? Give the exact form.",
    latex: "\\text{doubles every } 10 \\text{ years}",
    marks: 4,
    difficulty: 5,
    answer: "10ln(3)/ln(2)",
    acceptedAnswers: ["10 ln3/ln2", "10ln(3)/ln(2)", "15.85", "15.849"],
    explanation:
      "k = (ln 2)/10. Tripling: 3 = e^{kt} ⇒ t = (ln 3)/k = 10 ln 3 / ln 2 ≈ 15.85 years.",
  },
  {
    id: "y12e1-capp-egd-d5-4",
    prompt:
      "For N = N₀e^{kt}, N(2) = 1500 and N(4) = 6000. Find N(6).",
    latex: "N(2) = 1500, \\quad N(4) = 6000",
    marks: 4,
    difficulty: 5,
    answer: "24000",
    explanation:
      "Over each 2-hour step the population multiplies by e^{2k} = 6000/1500 = 4. So N(6) = N(4)×4 = 6000×4 = 24000.",
  },
  {
    id: "y12e1-capp-egd-d5-5",
    prompt:
      "A population satisfies dN/dt = kN with N(0) = 200, and dN/dt = 40 when N = 200. Find N when t = 5, in exact form.",
    latex: "\\tfrac{dN}{dt} = kN, \\quad N(0) = 200",
    marks: 4,
    difficulty: 5,
    answer: "200e",
    acceptedAnswers: ["200*e", "543.66", "543.7"],
    explanation:
      "40 = k(200) ⇒ k = 0.2. Then N = 200e^{0.2t}, so N(5) = 200e^{1} = 200e ≈ 543.7.",
  },
  {
    id: "y12e1-capp-egd-d5-6",
    prompt:
      "A culture triples every 4 hours, starting at 500. Find the number present after 10 hours, in exact form.",
    latex: "\\text{triples every } 4 \\text{ hours}, \\quad N_0 = 500",
    marks: 4,
    difficulty: 5,
    answer: "500*3^(5/2)",
    acceptedAnswers: ["500·3^(2.5)", "500*3^2.5", "7794", "7794.2"],
    explanation:
      "N = 500·3^{t/4} = 500·3^{10/4} = 500·3^{5/2} ≈ 7794.",
  },
  {
    id: "y12e1-capp-egd-d5-7",
    prompt:
      "Carbon-14 has a half-life of 5730 years. A sample contains 25% of its original C-14. Find its age, in years.",
    latex: "\\text{half-life } 5730 \\text{ years}",
    marks: 4,
    difficulty: 5,
    answer: "11460",
    explanation:
      "25% = (1/2)², i.e. two half-lives, so the age is 2 × 5730 = 11460 years.",
  },
  {
    id: "y12e1-capp-egd-d5-8",
    prompt:
      "A population grows by 50% in 3 hours under N = N₀e^{kt}. Find the time to double, in exact form.",
    latex: "N(3) = 1.5 N_0",
    marks: 4,
    difficulty: 5,
    answer: "3ln(2)/ln(1.5)",
    acceptedAnswers: ["3 ln2/ln1.5", "3ln(2)/ln(3/2)", "5.13", "5.127"],
    explanation:
      "1.5 = e^{3k} ⇒ k = (ln 1.5)/3. Doubling: t = (ln 2)/k = 3 ln 2 / ln 1.5 ≈ 5.13 hours.",
  },
  {
    id: "y12e1-capp-egd-d5-9",
    prompt:
      "A quantity satisfies dN/dt = 0.1N with N(0) = 400. Find the rate of growth dN/dt when t = 10, in exact form.",
    latex: "\\tfrac{dN}{dt} = 0.1N, \\quad N(0) = 400",
    marks: 4,
    difficulty: 5,
    answer: "40e",
    acceptedAnswers: ["40*e", "108.7", "108.73"],
    explanation:
      "N = 400e^{0.1t}, so N(10) = 400e. Then dN/dt = 0.1N = 0.1(400e) = 40e ≈ 108.7.",
  },
  {
    id: "y12e1-capp-egd-d5-10",
    prompt:
      "A substance decays so that 1/3 of it remains after 4 hours. Find the fraction remaining after 8 hours.",
    latex: "\\text{1/3 remains after 4 hours}",
    marks: 4,
    difficulty: 5,
    answer: "1/9",
    acceptedAnswers: ["0.1111", "0.111"],
    explanation:
      "Each 4-hour interval multiplies the amount by 1/3, so after 8 hours the fraction is (1/3)² = 1/9.",
  },
];

// ── Subtopic 3: Simple Harmonic Motion ───────────────────────────────────────
// x = a cos(nt) etc., ẍ = −n²x, v² = n²(a² − x²). D4: max speed (an), max accel
// (an²), period, n² from the DE, evaluate at an instant, and the v² relation.
const shmD4: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-shm-d4-1",
    prompt: "A particle moves with x = 5cos(2t). Find its maximum speed.",
    latex: "x = 5\\cos(2t)",
    marks: 2,
    difficulty: 4,
    answer: "10",
    explanation: "Maximum speed = an = 5 × 2 = 10.",
  },
  {
    id: "y12e1-capp-shm-d4-2",
    prompt: "A particle moves with x = 5cos(2t). Find its period.",
    latex: "x = 5\\cos(2t)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\pi$" },
      { label: "B", text: "$2\\pi$" },
      { label: "C", text: "$4\\pi$" },
      { label: "D", text: "$\\dfrac{\\pi}{2}$" },
    ],
    answer: "A",
    explanation: "Period = 2π/n = 2π/2 = π. B forgets to divide by n.",
  },
  {
    id: "y12e1-capp-shm-d4-3",
    prompt: "A particle moves with x = 3sin(4t). Find its maximum speed.",
    latex: "x = 3\\sin(4t)",
    marks: 2,
    difficulty: 4,
    answer: "12",
    explanation: "Maximum speed = an = 3 × 4 = 12.",
  },
  {
    id: "y12e1-capp-shm-d4-4",
    prompt: "A particle moves with x = 3sin(4t). Find its maximum acceleration.",
    latex: "x = 3\\sin(4t)",
    marks: 3,
    difficulty: 4,
    answer: "48",
    explanation: "Maximum acceleration = an² = 3 × 4² = 48.",
  },
  {
    id: "y12e1-capp-shm-d4-5",
    prompt: "A particle moves with x = 4cos(3t). Find its velocity at t = 0.",
    latex: "x = 4\\cos(3t)",
    marks: 2,
    difficulty: 4,
    answer: "0",
    explanation: "v = −12 sin(3t), so v(0) = 0 (it starts at the extreme position).",
  },
  {
    id: "y12e1-capp-shm-d4-6",
    prompt:
      "A particle moves with x = 2cos(5t). It satisfies ẍ = −n²x. Find n².",
    latex: "x = 2\\cos(5t), \\quad \\ddot{x} = -n^2 x",
    marks: 2,
    difficulty: 4,
    answer: "25",
    explanation: "ẍ = −50cos(5t) = −25(2cos 5t) = −25x, so n² = 25.",
  },
  {
    id: "y12e1-capp-shm-d4-7",
    prompt: "A particle moves with x = 6sin(2t). Find its position at t = π/4.",
    latex: "x = 6\\sin(2t)",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "x(π/4) = 6 sin(π/2) = 6.",
  },
  {
    id: "y12e1-capp-shm-d4-8",
    prompt:
      "A particle in SHM has amplitude 5 and n = 2, with v² = n²(a² − x²). Find its speed when x = 3.",
    latex: "v^2 = n^2(a^2 - x^2), \\quad a = 5, \\; n = 2",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$8$" },
      { label: "B", text: "$16$" },
      { label: "C", text: "$4$" },
      { label: "D", text: "$10$" },
    ],
    answer: "A",
    explanation:
      "v = n√(a² − x²) = 2√(25 − 9) = 2(4) = 8. C forgets the factor n; D is the maximum speed na (only at x = 0).",
  },
  {
    id: "y12e1-capp-shm-d4-9",
    prompt: "A particle moves with x = 4cos(2t). Find its acceleration at t = 0.",
    latex: "x = 4\\cos(2t)",
    marks: 2,
    difficulty: 4,
    answer: "-16",
    acceptedAnswers: ["−16"],
    explanation: "ẍ = −16cos(2t), so ẍ(0) = −16.",
  },
  {
    id: "y12e1-capp-shm-d4-10",
    prompt: "A particle moves with x = 4cos(2t). Find its maximum acceleration.",
    latex: "x = 4\\cos(2t)",
    marks: 2,
    difficulty: 4,
    answer: "16",
    explanation: "Maximum acceleration = an² = 4 × 2² = 16.",
  },
];

// D5: recover amplitude / n from the v² relation or two conditions, combine
// cos + sin into one SHM, period → max speed, time-to-state, distance per period.
const shmD5: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-shm-d5-1",
    prompt:
      "A particle moves so that v² = 16(9 − x²). Find its amplitude.",
    latex: "v^2 = 16(9 - x^2)",
    marks: 3,
    difficulty: 5,
    answer: "3",
    explanation:
      "Comparing with v² = n²(a² − x²): a² = 9, so the amplitude is a = 3 (and n = 4).",
  },
  {
    id: "y12e1-capp-shm-d5-2",
    prompt:
      "A particle satisfies ẍ = −9x and has amplitude 4. Find its speed when x = 2.",
    latex: "\\ddot{x} = -9x, \\quad a = 4",
    marks: 4,
    difficulty: 5,
    answer: "6sqrt(3)",
    acceptedAnswers: ["6√3", "10.392", "10.39"],
    explanation:
      "ẍ = −n²x gives n = 3. v = n√(a² − x²) = 3√(16 − 4) = 3√12 = 6√3.",
  },
  {
    id: "y12e1-capp-shm-d5-3",
    prompt:
      "A particle in SHM has maximum speed 20 and amplitude 4. Find n.",
    latex: "v_{max} = na = 20, \\quad a = 4",
    marks: 3,
    difficulty: 5,
    answer: "5",
    explanation: "Maximum speed = na, so 20 = 4n and n = 5.",
  },
  {
    id: "y12e1-capp-shm-d5-4",
    prompt:
      "A particle moves with x = 5cos(2t). Find the first time t > 0 at which x = 2.5.",
    latex: "x = 5\\cos(2t)",
    marks: 4,
    difficulty: 5,
    answer: "pi/6",
    acceptedAnswers: ["π/6", "0.5236", "0.524"],
    explanation:
      "2.5 = 5cos(2t) ⇒ cos(2t) = 1/2 ⇒ 2t = π/3 ⇒ t = π/6.",
  },
  {
    id: "y12e1-capp-shm-d5-5",
    prompt:
      "A particle in SHM has period 4 seconds and amplitude 6. Find its maximum speed.",
    latex: "T = 4, \\quad a = 6",
    marks: 4,
    difficulty: 5,
    answer: "3pi",
    acceptedAnswers: ["3π", "9.42", "9.4248"],
    explanation:
      "n = 2π/T = π/2. Maximum speed = na = 6(π/2) = 3π.",
  },
  {
    id: "y12e1-capp-shm-d5-6",
    prompt:
      "A particle moves with x = 3cos(2t) + 4sin(2t). Written as x = R cos(2t − α), find R.",
    latex: "x = 3\\cos(2t) + 4\\sin(2t)",
    marks: 4,
    difficulty: 5,
    answer: "5",
    explanation: "R = √(3² + 4²) = √25 = 5 (the amplitude of the combined SHM).",
  },
  {
    id: "y12e1-capp-shm-d5-7",
    prompt:
      "A particle moves with x = 4cos(2t). Find the total distance it travels in one complete period.",
    latex: "x = 4\\cos(2t)",
    marks: 4,
    difficulty: 5,
    answer: "16",
    explanation:
      "In one period the particle goes a → −a → a, covering 4 amplitudes: 4 × 4 = 16.",
  },
  {
    id: "y12e1-capp-shm-d5-8",
    prompt:
      "A particle moves with x = 4cos(2t). Find the first time t > 0 at which its speed is a maximum.",
    latex: "x = 4\\cos(2t)",
    marks: 4,
    difficulty: 5,
    answer: "pi/4",
    acceptedAnswers: ["π/4", "0.7854", "0.785"],
    explanation:
      "Speed is greatest at the centre x = 0: 4cos(2t) = 0 ⇒ 2t = π/2 ⇒ t = π/4.",
  },
  {
    id: "y12e1-capp-shm-d5-9",
    prompt:
      "A particle satisfies ẍ = −n²x and has period π. Find n².",
    latex: "\\ddot{x} = -n^2 x, \\quad T = \\pi",
    marks: 3,
    difficulty: 5,
    answer: "4",
    explanation: "T = 2π/n = π ⇒ n = 2 ⇒ n² = 4.",
  },
  {
    id: "y12e1-capp-shm-d5-10",
    prompt:
      "A particle in SHM has speed 8 when x = 3 and speed 6 when x = 4. Find its amplitude.",
    latex: "v=8 \\text{ at } x=3, \\quad v=6 \\text{ at } x=4",
    marks: 4,
    difficulty: 5,
    answer: "5",
    explanation:
      "v² = n²(a² − x²): 64 = n²(a² − 9) and 36 = n²(a² − 16). Subtracting: 28 = 7n², so n² = 4. Then 64 = 4(a² − 9) gives a² = 25, a = 5.",
  },
];

// ── Subtopic 4: Areas Between Curves and Volumes of Revolution ───────────────
// D4: areas (under / between / enclosed) and volumes about the x-axis (π∫y² dx).
const volumesD4: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-vol-d4-1",
    prompt: "Find the area under y = x² from x = 0 to x = 3.",
    latex: "y = x^2, \\quad 0 \\le x \\le 3",
    marks: 2,
    difficulty: 4,
    answer: "9",
    explanation: "∫₀³ x² dx = [x³/3]₀³ = 9.",
  },
  {
    id: "y12e1-capp-vol-d4-2",
    prompt: "Find the area enclosed between y = x and y = x² from x = 0 to x = 1.",
    latex: "y = x, \\quad y = x^2",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{1}{6}$" },
      { label: "B", text: "$\\dfrac{1}{2}$" },
      { label: "C", text: "$\\dfrac{5}{6}$" },
      { label: "D", text: "$\\dfrac{1}{3}$" },
    ],
    answer: "A",
    explanation:
      "On [0, 1], x ≥ x². Area = ∫₀¹(x − x²) dx = 1/2 − 1/3 = 1/6. B and D integrate only one curve.",
  },
  {
    id: "y12e1-capp-vol-d4-3",
    prompt: "Find the area enclosed by y = 4 − x² and the x-axis.",
    latex: "y = 4 - x^2",
    marks: 3,
    difficulty: 4,
    answer: "32/3",
    acceptedAnswers: ["10.667", "10.6667"],
    explanation:
      "Roots x = ±2. ∫₋₂²(4 − x²) dx = [4x − x³/3]₋₂² = 16 − 16/3 = 32/3.",
  },
  {
    id: "y12e1-capp-vol-d4-4",
    prompt: "Find the area under y = eˣ from x = 0 to x = 1.",
    latex: "y = e^x, \\quad 0 \\le x \\le 1",
    marks: 2,
    difficulty: 4,
    answer: "e-1",
    acceptedAnswers: ["e - 1", "1.7183", "1.718"],
    explanation: "∫₀¹ eˣ dx = [eˣ]₀¹ = e − 1.",
  },
  {
    id: "y12e1-capp-vol-d4-5",
    prompt: "Find the area under y = x³ from x = 0 to x = 2.",
    latex: "y = x^3, \\quad 0 \\le x \\le 2",
    marks: 2,
    difficulty: 4,
    answer: "4",
    explanation: "∫₀² x³ dx = [x⁴/4]₀² = 16/4 = 4.",
  },
  {
    id: "y12e1-capp-vol-d4-6",
    prompt:
      "The region under y = x from x = 0 to x = 3 is rotated about the x-axis. Find the volume.",
    latex: "y = x, \\quad 0 \\le x \\le 3",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$9\\pi$" },
      { label: "B", text: "$9$" },
      { label: "C", text: "$27\\pi$" },
      { label: "D", text: "$3\\pi$" },
    ],
    answer: "A",
    explanation:
      "V = π∫₀³ x² dx = π[x³/3]₀³ = 9π. B forgets the π; C uses x instead of x².",
  },
  {
    id: "y12e1-capp-vol-d4-7",
    prompt:
      "The region under y = √x from x = 0 to x = 4 is rotated about the x-axis. Find the volume.",
    latex: "y = \\sqrt{x}, \\quad 0 \\le x \\le 4",
    marks: 2,
    difficulty: 4,
    answer: "8pi",
    acceptedAnswers: ["8π", "25.13", "25.133"],
    explanation: "V = π∫₀⁴ x dx = π[x²/2]₀⁴ = 8π.",
  },
  {
    id: "y12e1-capp-vol-d4-8",
    prompt:
      "The region under y = x² from x = 0 to x = 2 is rotated about the x-axis. Find the volume.",
    latex: "y = x^2, \\quad 0 \\le x \\le 2",
    marks: 3,
    difficulty: 4,
    answer: "32pi/5",
    acceptedAnswers: ["32π/5", "20.106", "20.11"],
    explanation: "V = π∫₀² x⁴ dx = π[x⁵/5]₀² = 32π/5.",
  },
  {
    id: "y12e1-capp-vol-d4-9",
    prompt:
      "The region under y = x + 1 from x = 0 to x = 2 is rotated about the x-axis. Find the volume.",
    latex: "y = x + 1, \\quad 0 \\le x \\le 2",
    marks: 3,
    difficulty: 4,
    answer: "26pi/3",
    acceptedAnswers: ["26π/3", "27.227", "27.23"],
    explanation: "V = π∫₀²(x + 1)² dx = π[(x + 1)³/3]₀² = π(27/3 − 1/3) = 26π/3.",
  },
  {
    id: "y12e1-capp-vol-d4-10",
    prompt:
      "The region under y = eˣ from x = 0 to x = 1 is rotated about the x-axis. Find the volume.",
    latex: "y = e^x, \\quad 0 \\le x \\le 1",
    marks: 3,
    difficulty: 4,
    answer: "pi(e^2-1)/2",
    acceptedAnswers: ["(e^2-1)pi/2", "π(e^2-1)/2", "10.036", "10.04"],
    explanation: "V = π∫₀¹ e^{2x} dx = π[(1/2)e^{2x}]₀¹ = π(e² − 1)/2.",
  },
];

// D5: find intersection limits first, rotate about the y-axis, washer volumes,
// and trig areas.
const volumesD5: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-vol-d5-1",
    prompt: "Find the area enclosed between y = x² and y = 2x.",
    latex: "y = x^2, \\quad y = 2x",
    marks: 4,
    difficulty: 5,
    answer: "4/3",
    acceptedAnswers: ["1.3333", "1.333"],
    explanation:
      "Intersections: x² = 2x ⇒ x = 0, 2. Area = ∫₀²(2x − x²) dx = [x² − x³/3]₀² = 4 − 8/3 = 4/3.",
  },
  {
    id: "y12e1-capp-vol-d5-2",
    prompt: "Find the area enclosed between y = x + 2 and y = x².",
    latex: "y = x + 2, \\quad y = x^2",
    marks: 4,
    difficulty: 5,
    answer: "9/2",
    acceptedAnswers: ["4.5"],
    explanation:
      "x² = x + 2 ⇒ x = −1, 2. Area = ∫₋₁²(x + 2 − x²) dx = [x²/2 + 2x − x³/3]₋₁² = 9/2.",
  },
  {
    id: "y12e1-capp-vol-d5-3",
    prompt:
      "The region bounded by y = x², the y-axis and y = 4 is rotated about the y-axis. Find the volume.",
    latex: "y = x^2, \\quad 0 \\le y \\le 4, \\text{ about the } y\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "8pi",
    acceptedAnswers: ["8π", "25.13", "25.133"],
    explanation:
      "About the y-axis: V = π∫₀⁴ x² dy = π∫₀⁴ y dy = π[y²/2]₀⁴ = 8π (since x² = y).",
  },
  {
    id: "y12e1-capp-vol-d5-4",
    prompt:
      "The region between y = x and y = x² (0 ≤ x ≤ 1) is rotated about the x-axis. Find the volume.",
    latex: "y = x, \\quad y = x^2, \\text{ about the } x\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "2pi/15",
    acceptedAnswers: ["2π/15", "0.4189", "0.419"],
    explanation:
      "Washer: V = π∫₀¹(x² − (x²)²) dx = π∫₀¹(x² − x⁴) dx = π(1/3 − 1/5) = 2π/15.",
  },
  {
    id: "y12e1-capp-vol-d5-5",
    prompt: "Find the area under y = sin x from x = 0 to x = π.",
    latex: "y = \\sin x, \\quad 0 \\le x \\le \\pi",
    marks: 3,
    difficulty: 5,
    answer: "2",
    explanation: "∫₀^π sin x dx = [−cos x]₀^π = 1 − (−1) = 2.",
  },
  {
    id: "y12e1-capp-vol-d5-6",
    prompt:
      "The region bounded by y = √x, the y-axis and y = 2 is rotated about the y-axis. Find the volume.",
    latex: "y = \\sqrt{x}, \\quad 0 \\le y \\le 2, \\text{ about the } y\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "32pi/5",
    acceptedAnswers: ["32π/5", "20.106", "20.11"],
    explanation:
      "x = y², so V = π∫₀² x² dy = π∫₀² y⁴ dy = π[y⁵/5]₀² = 32π/5.",
  },
  {
    id: "y12e1-capp-vol-d5-7",
    prompt: "Find the area under y = cos x from x = 0 to x = π/2.",
    latex: "y = \\cos x, \\quad 0 \\le x \\le \\tfrac{\\pi}{2}",
    marks: 3,
    difficulty: 5,
    answer: "1",
    explanation: "∫₀^{π/2} cos x dx = [sin x]₀^{π/2} = 1.",
  },
  {
    id: "y12e1-capp-vol-d5-8",
    prompt:
      "The region enclosed by y = 4 − x² and the x-axis is rotated about the x-axis. Find the volume.",
    latex: "y = 4 - x^2, \\text{ about the } x\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "512pi/15",
    acceptedAnswers: ["512π/15", "107.2", "107.23"],
    explanation:
      "V = π∫₋₂²(4 − x²)² dx = π∫₋₂²(16 − 8x² + x⁴) dx = π(512/15) = 512π/15.",
  },
  {
    id: "y12e1-capp-vol-d5-9",
    prompt: "Find the area enclosed between y = x² and y = 8 − x².",
    latex: "y = x^2, \\quad y = 8 - x^2",
    marks: 4,
    difficulty: 5,
    answer: "64/3",
    acceptedAnswers: ["21.333", "21.3333"],
    explanation:
      "x² = 8 − x² ⇒ x = ±2. Area = ∫₋₂²(8 − 2x²) dx = [8x − 2x³/3]₋₂² = 64/3.",
  },
  {
    id: "y12e1-capp-vol-d5-10",
    prompt:
      "The region between y = √x and y = x (0 ≤ x ≤ 1) is rotated about the x-axis. Find the volume.",
    latex: "y = \\sqrt{x}, \\quad y = x, \\text{ about the } x\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "pi/6",
    acceptedAnswers: ["π/6", "0.5236", "0.524"],
    explanation:
      "On [0, 1], √x ≥ x. Washer: V = π∫₀¹((√x)² − x²) dx = π∫₀¹(x − x²) dx = π/6.",
  },
];

// ── Subtopic 5: Multiplicity of Zeroes of Polynomial Functions ───────────────
// D4: read multiplicity/degree, touch-vs-cross (even/odd multiplicity), root
// counts and sums, evaluate, and f′ at a double root.
const polyZeroesD4: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-poly-d4-1",
    prompt: "For P(x) = (x − 2)³(x + 1), find the multiplicity of the root x = 2.",
    latex: "P(x) = (x - 2)^3 (x + 1)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$3$" },
      { label: "B", text: "$1$" },
      { label: "C", text: "$4$" },
      { label: "D", text: "$2$" },
    ],
    answer: "A",
    explanation:
      "The factor (x − 2)³ gives multiplicity 3. C counts the number of distinct factors instead.",
  },
  {
    id: "y12e1-capp-poly-d4-2",
    prompt: "Find the degree of P(x) = (x − 1)²(x + 3)⁴.",
    latex: "P(x) = (x - 1)^2 (x + 3)^4",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "Degree = sum of the multiplicities = 2 + 4 = 6.",
  },
  {
    id: "y12e1-capp-poly-d4-3",
    prompt:
      "For P(x) = (x − 2)²(x + 1), does the graph cross or touch the x-axis at x = 2? Answer 'cross' or 'touch'.",
    latex: "P(x) = (x - 2)^2 (x + 1)",
    marks: 2,
    difficulty: 4,
    answer: "touch",
    acceptedAnswers: ["touches", "it touches", "touches the x-axis", "touch the x-axis"],
    explanation: "Multiplicity 2 is even, so the graph touches the x-axis at x = 2 without crossing.",
  },
  {
    id: "y12e1-capp-poly-d4-4",
    prompt:
      "For P(x) = (x + 3)³, does the graph cross or touch the x-axis at x = −3? Answer 'cross' or 'touch'.",
    latex: "P(x) = (x + 3)^3",
    marks: 2,
    difficulty: 4,
    answer: "cross",
    acceptedAnswers: ["crosses", "it crosses", "crosses the x-axis", "cross the x-axis"],
    explanation: "Multiplicity 3 is odd, so the graph crosses the x-axis (with a flat inflection) at x = −3.",
  },
  {
    id: "y12e1-capp-poly-d4-5",
    prompt: "For P(x) = x²(x − 4), find the multiplicity of the root x = 0.",
    latex: "P(x) = x^2 (x - 4)",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "The factor x² gives multiplicity 2 at x = 0.",
  },
  {
    id: "y12e1-capp-poly-d4-6",
    prompt:
      "For P(x) = (x − 1)²(x − 5), find the x-value where the graph touches (but does not cross) the x-axis.",
    latex: "P(x) = (x - 1)^2 (x - 5)",
    marks: 2,
    difficulty: 4,
    answer: "1",
    explanation: "The even-multiplicity (double) root is x = 1, where the graph touches the axis.",
  },
  {
    id: "y12e1-capp-poly-d4-7",
    prompt:
      "How many distinct real x-intercepts does P(x) = (x − 2)(x + 2)(x − 5) have?",
    latex: "P(x) = (x - 2)(x + 2)(x - 5)",
    marks: 2,
    difficulty: 4,
    answer: "3",
    explanation: "Three distinct roots: x = 2, −2, 5.",
  },
  {
    id: "y12e1-capp-poly-d4-8",
    prompt:
      "Find the sum of the roots (counted with multiplicity) of P(x) = (x − 1)²(x + 4).",
    latex: "P(x) = (x - 1)^2 (x + 4)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$-2$" },
      { label: "B", text: "$-3$" },
      { label: "C", text: "$3$" },
      { label: "D", text: "$2$" },
    ],
    answer: "A",
    explanation:
      "Roots are 1, 1, −4, so the sum is −2. B forgets to count the double root twice (1 + (−4) = −3).",
  },
  {
    id: "y12e1-capp-poly-d4-9",
    prompt: "For P(x) = (x − 1)²(x + 2), find P(0).",
    latex: "P(x) = (x - 1)^2 (x + 2)",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "P(0) = (−1)²(2) = 1 × 2 = 2.",
  },
  {
    id: "y12e1-capp-poly-d4-10",
    prompt:
      "If (x − 3)² is a factor of a polynomial P(x), find the value of P′(3).",
    latex: "(x - 3)^2 \\mid P(x)",
    marks: 3,
    difficulty: 4,
    answer: "0",
    explanation:
      "A double root means both P(3) = 0 and P′(3) = 0 (the graph touches the axis there).",
  },
];

// D5: use repeated-root conditions (f = 0 and f′ = 0) to find a parameter,
// construct a factored polynomial and apply a condition, or use the
// discriminant/tangency condition.
const polyZeroesD5: TopicTestQuestion[] = [
  {
    id: "y12e1-capp-poly-d5-1",
    prompt:
      "P(x) = x³ + ax² + bx has a double root at x = 2 and a root at x = 0. Find a.",
    latex: "P(x) = x^3 + ax^2 + bx",
    marks: 4,
    difficulty: 5,
    answer: "-4",
    acceptedAnswers: ["−4"],
    explanation:
      "The roots are 0, 2, 2, so P(x) = x(x − 2)² = x³ − 4x² + 4x. Hence a = −4.",
  },
  {
    id: "y12e1-capp-poly-d5-2",
    prompt:
      "P(x) = x³ − 12x + k has a double root for some k > 0. Find k.",
    latex: "P(x) = x^3 - 12x + k",
    marks: 4,
    difficulty: 5,
    answer: "16",
    explanation:
      "A double root needs P = 0 and P′ = 0. P′ = 3x² − 12 = 0 ⇒ x = ±2. For k > 0 use x = 2: P(2) = 8 − 24 + k = 0 ⇒ k = 16.",
  },
  {
    id: "y12e1-capp-poly-d5-3",
    prompt:
      "Find the positive value of m for which x² + mx + 9 has a repeated root.",
    latex: "x^2 + mx + 9",
    marks: 3,
    difficulty: 5,
    answer: "6",
    explanation: "Repeated root ⇒ discriminant m² − 36 = 0 ⇒ m = 6 (taking m > 0).",
  },
  {
    id: "y12e1-capp-poly-d5-4",
    prompt: "P(x) = (x − 1)²(x − k) and P(3) = 8. Find k.",
    latex: "P(x) = (x - 1)^2 (x - k), \\quad P(3) = 8",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation: "P(3) = (2)²(3 − k) = 4(3 − k) = 8 ⇒ 3 − k = 2 ⇒ k = 1.",
  },
  {
    id: "y12e1-capp-poly-d5-5",
    prompt:
      "P(x) = x³ + ax + b has a double root at x = 1. Find a.",
    latex: "P(x) = x^3 + ax + b",
    marks: 4,
    difficulty: 5,
    answer: "-3",
    acceptedAnswers: ["−3"],
    explanation:
      "Double root ⇒ P′(1) = 0. P′ = 3x² + a, so 3 + a = 0 and a = −3.",
  },
  {
    id: "y12e1-capp-poly-d5-6",
    prompt:
      "P(x) = x³ + px² + qx + r has a triple root at x = 2. Find p.",
    latex: "P(x) = x^3 + px^2 + qx + r",
    marks: 3,
    difficulty: 5,
    answer: "-6",
    acceptedAnswers: ["−6"],
    explanation: "A triple root gives P(x) = (x − 2)³ = x³ − 6x² + 12x − 8, so p = −6.",
  },
  {
    id: "y12e1-capp-poly-d5-7",
    prompt:
      "P(x) = x⁴ − 2x² + k has a double root at x = 1. Find k.",
    latex: "P(x) = x^4 - 2x^2 + k",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "P′ = 4x³ − 4x = 4x(x² − 1), so P′(1) = 0 already. Then P(1) = 1 − 2 + k = 0 ⇒ k = 1.",
  },
  {
    id: "y12e1-capp-poly-d5-8",
    prompt:
      "Find the value of c for which the line y = 4x + c is tangent to the parabola y = x².",
    latex: "y = 4x + c, \\quad y = x^2",
    marks: 4,
    difficulty: 5,
    answer: "-4",
    acceptedAnswers: ["−4"],
    explanation:
      "Tangency ⇒ x² = 4x + c has a double root, so x² − 4x − c = 0 has discriminant 16 + 4c = 0, giving c = −4.",
  },
  {
    id: "y12e1-capp-poly-d5-9",
    prompt:
      "P(x) = x³ − 3x + k has a repeated root for some k > 0. Find k.",
    latex: "P(x) = x^3 - 3x + k",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "P′ = 3x² − 3 = 0 ⇒ x = ±1. A repeated root needs P = 0 there: P(1) = k − 2 = 0 gives k = 2 (a double root at x = 1), while x = −1 would need k = −2. For k > 0, k = 2.",
  },
  {
    id: "y12e1-capp-poly-d5-10",
    prompt:
      "P(x) = (x + 2)²(x − a) has a y-intercept of 12. Find a.",
    latex: "P(x) = (x + 2)^2 (x - a), \\quad P(0) = 12",
    marks: 4,
    difficulty: 5,
    answer: "-3",
    acceptedAnswers: ["−3"],
    explanation: "P(0) = (2)²(−a) = −4a = 12 ⇒ a = −3.",
  },
];

export const calculusApplicationsPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "calculus-applications",
  topicTitle: "Further Applications of Calculus",
  subtopics: [
    {
      subtopicSlug: "related-rates-of-change",
      subtopicTitle: "Related Rates of Change",
      remediationHref: href("related-rates-of-change"),
      d4: relatedRatesD4,
      d5: relatedRatesD5,
    },
    {
      subtopicSlug: "newtons-law-cooling-growth-decay",
      subtopicTitle: "Exponential Growth and Decay",
      remediationHref: href("newtons-law-cooling-growth-decay"),
      d4: growthDecayD4,
      d5: growthDecayD5,
    },
    {
      subtopicSlug: "simple-harmonic-motion-intro",
      subtopicTitle: "Simple Harmonic Motion",
      remediationHref: href("simple-harmonic-motion-intro"),
      d4: shmD4,
      d5: shmD5,
    },
    {
      subtopicSlug: "calculus-applications-volumes",
      subtopicTitle: "Areas Between Curves and Volumes of Revolution",
      remediationHref: href("calculus-applications-volumes"),
      d4: volumesD4,
      d5: volumesD5,
    },
    {
      subtopicSlug: "calculus-applications-polynomial-zeroes",
      subtopicTitle: "Multiplicity of Zeroes of Polynomial Functions",
      remediationHref: href("calculus-applications-polynomial-zeroes"),
      d4: polyZeroesD4,
      d5: polyZeroesD5,
    },
    {
      subtopicSlug: "calculus-applications-newton-cooling",
      subtopicTitle: "Newton's Law of Cooling and Limited Growth",
      remediationHref: href("calculus-applications-newton-cooling"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "calculus-applications-slope-fields",
      subtopicTitle: "Slope Fields and Solution Curves",
      remediationHref: href("calculus-applications-slope-fields"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "calculus-applications-exam-practice",
      subtopicTitle: "Calculus Applications Exam Practice",
      remediationHref: href("calculus-applications-exam-practice"),
      d4: [],
      d5: [],
      d6: [],
    },
  ],
};
