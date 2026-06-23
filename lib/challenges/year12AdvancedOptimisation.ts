import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge set for the Year 12 Advanced "optimisation" lesson.
// Synoptic D6 items (modelling + calculus). Every answer SymPy-verified.
export const year12AdvancedOptimisationChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-opt-1",
    prompt:
      "A closed cylinder has a volume of 1000 cm³. Find the radius, to 2 decimal places, that minimises its total surface area.",
    latex: "V = 1000,\\quad S = 2\\pi r^2 + \\dfrac{2000}{r}",
    answer: "5.42",
    acceptedAnswers: ["5.4", "5.42 cm", "(500/pi)^(1/3)"],
    hint: "Use V = πr²h = 1000 to write h in terms of r, substitute into the surface area, then set S'(r) = 0.",
    explanation:
      "V = πr²h = 1000 gives h = 1000/(πr²). Then S = 2πr² + 2πrh = 2πr² + 2000/r. S'(r) = 4πr − 2000/r² = 0 ⟹ r³ = 500/π ⟹ r ≈ 5.42 cm (and S''(r) > 0, so it is a minimum).",
  },
  {
    id: "chal-y12a-opt-2",
    prompt:
      "A rectangle has its base on the x-axis and its two upper corners on the parabola y = 12 − x². Find the maximum possible area of the rectangle.",
    latex: "y = 12 - x^2",
    answer: "32",
    acceptedAnswers: ["32 units^2", "32 square units"],
    hint: "If a corner is at x, the rectangle has width 2x and height 12 − x². Maximise A(x) = 2x(12 − x²).",
    explanation:
      "A = 2x(12 − x²) = 24x − 2x³. A'(x) = 24 − 6x² = 0 ⟹ x = 2 (taking x > 0). Area = 2(2)(12 − 4) = 32 square units.",
  },
  {
    id: "chal-y12a-opt-3",
    prompt:
      "An open box is made from a 16 cm × 10 cm rectangular sheet by cutting a square of side x from each corner and folding up the sides. Find the maximum volume, in cm³.",
    latex: "V = x(16 - 2x)(10 - 2x)",
    answer: "144",
    acceptedAnswers: ["144 cm^3", "144 cm³"],
    hint: "Expand V(x), differentiate, solve V'(x) = 0, and reject any x outside 0 < x < 5.",
    explanation:
      "V = 160x − 52x² + 4x³. V'(x) = 160 − 104x + 12x² = 0 ⟹ 3x² − 26x + 40 = 0 ⟹ x = 2 (x = 20/3 is rejected as it exceeds 5). V(2) = 2(12)(6) = 144 cm³.",
  },
  {
    // D6 synoptic: volume constraint + weighted face costs + minimise (single answer).
    id: "chal-y12a-opt-4",
    prompt:
      "A closed box has a square base of side x cm and a volume of 128 cm³. The base and top cost 2 cents/cm²; the four sides cost 1 cent/cm². Find the value of x (cm) that minimises the total cost.",
    latex: "V = x^2 h = 128",
    answer: "4",
    acceptedAnswers: ["4 cm", "x=4"],
    hint: "Use the volume to write h in terms of x, build the weighted cost C(x), then solve C'(x) = 0.",
    explanation:
      "Volume x²h = 128 ⟹ h = 128/x². Cost = 2(base + top) + 1(sides) = 2(2x²) + (4xh) = 4x² + 512/x. C'(x) = 8x − 512/x² = 0 ⟹ x³ = 64 ⟹ x = 4 (C''(x) > 0, a minimum).",
  },
  {
    // D6 synoptic: open-top box, surface-area constraint → height, then maximise volume.
    // (Replaces an earlier cubic-profit/classify item that was closer to D4.)
    id: "chal-y12a-opt-5",
    prompt:
      "An open-top box has a square base of side x cm and a total surface area of 48 cm². Find the maximum possible volume of the box, in cm³.",
    latex: "x^2 + 4xh = 48",
    answer: "32",
    acceptedAnswers: ["32 cm^3", "32 cm³"],
    hint: "Use the surface-area constraint to write h in terms of x, substitute into V = x²h, then maximise.",
    explanation:
      "Surface area (base + 4 sides) = x² + 4xh = 48 ⟹ h = (48 − x²)/(4x). V = x²h = x(48 − x²)/4 = (48x − x³)/4. V'(x) = (48 − 3x²)/4 = 0 ⟹ x² = 16 ⟹ x = 4. Then h = (48 − 16)/16 = 2, so V = 16 × 2 = 32 cm³ (V'' < 0, a maximum).",
  },
  {
    // D6 synoptic: intercept-form line through a fixed point + minimise triangle area.
    id: "chal-y12a-opt-6",
    prompt:
      "A right-angled triangle has its right angle at the origin, one vertex on the positive x-axis and one on the positive y-axis, and its hypotenuse passes through the point (2, 4). Find the minimum possible area of the triangle.",
    latex: "\\frac{2}{a} + \\frac{4}{b} = 1",
    answer: "16",
    acceptedAnswers: ["16 units^2", "16 square units"],
    hint: "With intercepts a and b, the line is x/a + y/b = 1 through (2,4); write b in terms of a, then minimise the area ab/2.",
    explanation:
      "With x-intercept a and y-intercept b, the line x/a + y/b = 1 through (2, 4) gives 2/a + 4/b = 1, so b = 4a/(a − 2). Area = ½ab = 2a²/(a − 2). A'(a) = 2a(a − 4)/(a − 2)² = 0 ⟹ a = 4 (a > 2), so b = 8. Minimum area = ½(4)(8) = 16 square units.",
  },
  {
    // D6 synoptic: build a linear demand model from words + maximise revenue + interpret price.
    id: "chal-y12a-opt-7",
    prompt:
      "A theatre sells 400 tickets at $20 each. Market research shows that for every $1 increase in the ticket price, 10 fewer tickets are sold. Find the ticket price that maximises revenue.",
    latex: "R = (20 + x)(400 - 10x)",
    answer: "30",
    acceptedAnswers: ["$30", "30 dollars", "$30.00"],
    hint: "Let x be the number of $1 increases: price = 20 + x, tickets = 400 − 10x. Maximise R = (20 + x)(400 − 10x).",
    explanation:
      "Let the price be (20 + x) dollars after x increases of $1; tickets sold = 400 − 10x. R = (20 + x)(400 − 10x) = 8000 + 200x − 10x². R'(x) = 200 − 20x = 0 ⟹ x = 10 (R'' < 0, a maximum). Ticket price = 20 + 10 = $30.",
  },
];
