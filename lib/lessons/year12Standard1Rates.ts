// Year 12 Standard 1 — Unit 1 "Rates" — Wave 1 authored sections.
//
// Net-new sections authored to the Question Authoring Standard v2 + Feynman Teaching Standard:
//   1B Unitary Method      (rates-unitary-method)
//   1D Speed as a Rate     (rates-speed)
//   1E Distance–Time Graphs(rates-distance-time-graphs)
//   1F Fuel Consumption    (rates-fuel-consumption)
//   1G Heart Rate          (rates-heart-rate)
//   1H Blood Pressure      (rates-blood-pressure)
//
// Sections 1A (ratios-rates-unit-conversions) and 1C (rates-practical-problems) keep their
// existing overrides in year12Standard1.ts. Difficulty is AUTHORED as intrinsic cognitive
// demand (P3): routine evaluation/substitution = D1–D2; a genuine decision/inference = D3+.
// Question IDs are unprefixed; `y12s1-` is auto-added by prefixLessonQuestionIds.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "rates";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// ── 1B Unitary Method ────────────────────────────────────────────────────────────────
export function year12Standard1RatesUnitaryMethodLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-unitary-method"
  ) {
    return null;
  }
  return {
    description:
      "Use the unitary method to find the value of one unit and scale to any quantity, including best-buy comparisons.",
    learningIntention:
      "Find the value of one unit first, then scale to the quantity you need, and use this to compare options.",
    successCriteria: [
      "Find the value of one unit by dividing the total by the number of units.",
      "Scale a unit value up or down by multiplying by the number of units required.",
      "Compare two packs by finding the cost of the same single unit for each.",
      "Decide which option is better value and justify it with the unit cost.",
    ],
    teaching: {
      paragraphs: [
        "The whole trick of the unitary method is hiding in its name: get down to ONE unit first. If 4 apples cost $3.00, you cannot easily compare or scale that — but once you know one apple costs $0.75, you can find the cost of any number of apples by multiplying. Divide to reach one, then multiply to reach many.",
        "Think of 'one unit' as a stepping stone. Big number → ÷ to get one → × to get the new big number. Going to one is always a division; going out from one is always a multiplication. If you ever find yourself multiplying to get to one unit, you have the operation backwards.",
        "Best-buy questions are just two unitary calculations side by side. You cannot compare a 500 g pack with an 800 g pack directly, because the sizes differ. Bring them to a common single unit — cost per 100 g, or per gram — and now the smaller number wins. The bigger pack is not automatically cheaper; only the unit cost tells you.",
        "A common trap is comparing total prices ('the big bag costs more, so it is worse value'). Value is about price per unit, not the price on the shelf. Always reduce to the same single unit before you judge.",
      ],
      latexBlocks: [
        "\\text{value of one unit} = \\frac{\\text{total value}}{\\text{number of units}}",
        "\\text{new amount} = \\text{value of one unit} \\times \\text{units required}",
        "\\text{unit cost} = \\frac{\\text{price}}{\\text{size}}\\quad(\\text{smaller unit cost} = \\text{better buy})",
      ],
    },
    workedExamples: [
      {
        title: "Find one unit, then scale up",
        questionLatex: "\\text{5 identical pens cost }\\$6.50.\\text{ Find the cost of 8 pens.}",
        steps: [
          { explanation: "Divide to reach one pen.", latex: "\\frac{6.50}{5} = \\$1.30\\text{ per pen}" },
          { explanation: "Multiply the unit cost by the number of pens needed.", latex: "1.30 \\times 8 = \\$10.40" },
        ],
        finalAnswerLatex: "\\$10.40",
      },
      {
        title: "Best buy — compare on a common unit",
        questionLatex: "\\text{Pack A: 500 g for }\\$3.50.\\text{ Pack B: 800 g for }\\$5.20.\\text{ Which is better value?}",
        steps: [
          { explanation: "Bring each to cost per 100 g.", latex: "A: \\frac{3.50}{5} = \\$0.70,\\quad B: \\frac{5.20}{8} = \\$0.65" },
          { explanation: "The smaller cost per 100 g is the better buy.", latex: "0.65 < 0.70 \\Rightarrow \\text{Pack B}" },
        ],
        finalAnswerLatex: "\\text{Pack B (}\\$0.65\\text{ per 100 g)}",
      },
    ],
    guidedPractice: [
      mcq(
        "rum-g1",
        "In the unitary method, what do you always find first?",
        "B",
        ["The total cost", "The value of one unit", "The largest quantity", "The ratio of the two amounts"],
        1,
        "The method is named after the single unit.",
        "The unitary method finds the value of ONE unit first (by dividing), then multiplies to scale to any quantity."
      ),
      ans(
        "rum-g2",
        "4 identical apples cost $3.00. Find the cost of one apple.",
        "",
        "0.75",
        1,
        "Divide the total cost by the number of apples.",
        "Cost of one apple = 3.00 ÷ 4 = $0.75.",
        ["$0.75", "0.75 dollars"]
      ),
      ans(
        "rum-g3",
        "One apple costs $0.75. Find the cost of 7 apples.",
        "",
        "5.25",
        2,
        "Multiply the unit cost by the number of apples.",
        "Cost = 0.75 × 7 = $5.25.",
        ["$5.25"]
      ),
      ans(
        "rum-g4",
        "A 250 g block of cheese costs $4.00. Find the cost per 100 g.",
        "",
        "1.60",
        2,
        "Find the cost of 1 g first, then multiply by 100.",
        "Cost per gram = 4.00 ÷ 250 = $0.016, so per 100 g = 0.016 × 100 = $1.60.",
        ["$1.60"]
      ),
    ],
    independentPractice: [
      ans(
        "rum-i1",
        "6 litres of paint cover 84 m². How many m² does 1 litre cover?",
        "",
        "14",
        2,
        "Divide the area by the number of litres.",
        "Coverage per litre = 84 ÷ 6 = 14 m².",
        ["14 m^2", "14m2"]
      ),
      ans(
        "rum-i2",
        "A typist types 180 words in 4 minutes at a steady rate. How many words in 10 minutes?",
        "",
        "450",
        2,
        "Find words per minute, then scale to 10 minutes.",
        "Rate = 180 ÷ 4 = 45 words/min, so in 10 min: 45 × 10 = 450 words."
      ),
      mcq(
        "rum-i3",
        "Which is the better buy: 500 g for $3.50 or 800 g for $5.20?",
        "B",
        [
          "500 g, because it costs less in total",
          "800 g, because it is $0.65 per 100 g vs $0.70",
          "800 g, because the pack is bigger",
          "They are equal value",
        ],
        3,
        "Compare cost per 100 g, not the shelf price.",
        "500 g: 3.50 ÷ 5 = $0.70/100 g. 800 g: 5.20 ÷ 8 = $0.65/100 g. The 800 g pack is cheaper per 100 g, so it is the better buy — for the right reason (unit cost, not pack size)."
      ),
      ans(
        "rum-i4",
        "15 litres of fuel cost $52.50. At the same price, find the cost of 40 litres.",
        "",
        "140",
        3,
        "Find the price per litre first.",
        "Price per litre = 52.50 ÷ 15 = $3.50. Cost of 40 L = 3.50 × 40 = $140.",
        ["$140"]
      ),
      ans(
        "rum-i5",
        "A recipe for 4 serves uses 600 g of flour. How much flour is needed for 7 serves?",
        "",
        "1050",
        3,
        "Find the flour per serve, then scale to 7 serves.",
        "Per serve = 600 ÷ 4 = 150 g. For 7 serves: 150 × 7 = 1050 g.",
        ["1050 g", "1.05 kg"]
      ),
    ],
    masteryQuiz: [
      ans(
        "rum-m1",
        "9 identical tiles cover 1.44 m². Find the area covered by 1 tile, in m².",
        "",
        "0.16",
        2,
        "Divide the area by the number of tiles.",
        "Area per tile = 1.44 ÷ 9 = 0.16 m².",
        ["0.16 m^2"]
      ),
      ans(
        "rum-m2",
        "A car uses 35 litres of fuel to travel 420 km. How many km per litre?",
        "",
        "12",
        2,
        "Divide distance by litres.",
        "km per litre = 420 ÷ 35 = 12 km/L."
      ),
      mcq(
        "rum-m3",
        "To find the cost of 6 oranges when 10 oranges cost $4.50, the correct unitary setup is:",
        "C",
        ["$4.50 \\times 6", "$4.50 \\times 10 \\div 6", "$4.50 \\div 10 \\times 6", "$4.50 \\div 6 \\times 10"],
        3,
        "Divide to reach one orange, then multiply by 6.",
        "Find one orange (÷10), then scale to 6 (×6): 4.50 ÷ 10 × 6 = $2.70. Option D reaches the wrong count; A and B do not find a single unit."
      ),
      ans(
        "rum-m4",
        "8 metres of rope cost $14.00. Find the cost of 5 metres.",
        "",
        "8.75",
        2,
        "Cost per metre first, then ×5.",
        "Per metre = 14.00 ÷ 8 = $1.75. Cost of 5 m = 1.75 × 5 = $8.75.",
        ["$8.75"]
      ),
      ans(
        "rum-m5",
        "Brand X: 1.5 kg for $7.50. Brand Y: 2 kg for $9.60. How much cheaper per kg is the better brand, in dollars?",
        "",
        "0.20",
        4,
        "Find each cost per kg, then subtract the smaller from the larger.",
        "X: 7.50 ÷ 1.5 = $5.00/kg. Y: 9.60 ÷ 2 = $4.80/kg. Y is cheaper by 5.00 − 4.80 = $0.20 per kg.",
        ["$0.20", "20c", "0.2"]
      ),
      mcq(
        "rum-m6",
        "A 1 kg bag costs $6.00 and a 2.5 kg bag costs $13.75. A shopper needs 5 kg and may mix bag sizes. What is the cheapest total cost?",
        "B",
        ["$30.00 using five 1 kg bags", "$27.50 using two 2.5 kg bags", "$28.00", "$31.75 using a mix"],
        4,
        "Compare cost per kg, then buy the cheaper unit for the whole amount.",
        "1 kg bag = $6.00/kg; 2.5 kg bag = 13.75 ÷ 2.5 = $5.50/kg, which is cheaper. 5 kg as two 2.5 kg bags = 2 × 13.75 = $27.50, beating five 1 kg bags ($30.00)."
      ),
      ans(
        "rum-m7",
        "A printer prints 12 pages in 30 seconds. How many pages does it print in 5 minutes?",
        "",
        "120",
        3,
        "Convert 5 minutes to seconds, find pages per second, then scale.",
        "5 min = 300 s. Rate = 12 ÷ 30 = 0.4 pages/s. In 300 s: 0.4 × 300 = 120 pages."
      ),
      mcq(
        "rum-m8",
        "12 workers' wages for one day total $2160. To find one worker's daily wage a student multiplies 2160 × 12. What is wrong?",
        "A",
        [
          "To reach one unit you must divide, not multiply: 2160 ÷ 12 = $180",
          "Nothing — 2160 × 12 is correct",
          "They should add 12 to 2160",
          "They should find 2160 ÷ 2",
        ],
        3,
        "Going TO one unit is always a division.",
        "The unitary method divides to reach one unit: 2160 ÷ 12 = $180 per worker. Multiplying by 12 gives the wages of 144 workers, not one."
      ),
      ans(
        "rum-m9",
        "Three pumps together deliver 1800 L of water in 40 minutes. Find the litres delivered by all three pumps in 1 minute.",
        "",
        "45",
        3,
        "Divide the total litres by the total minutes.",
        "Combined rate = 1800 ÷ 40 = 45 L/min for all three pumps together."
      ),
      ans(
        "rum-m10",
        "Eggs cost $5.40 per dozen. A café budgets $36 for eggs. How many whole dozens can it buy?",
        "",
        "6",
        4,
        "Divide the budget by the cost of one dozen, then round DOWN to whole dozens.",
        "36 ÷ 5.40 = 6.67 dozen. Only whole dozens can be bought, so round down to 6 dozen (costing $32.40, within budget)."
      ),
    ],
    commonMistakes: [
      { mistake: "Multiplying to reach one unit instead of dividing.", fix: "Going TO one unit is always a division; going OUT from one unit is a multiplication." },
      { mistake: "Judging value by the shelf price instead of the unit cost.", fix: "Reduce both options to the same single unit (e.g. per 100 g) and compare those." },
      { mistake: "Assuming the bigger pack is always cheaper.", fix: "Only the cost per unit decides — sometimes the smaller pack wins." },
      { mistake: "Forgetting to convert to consistent units before scaling.", fix: "Convert minutes/seconds or g/kg first, then apply the unit rate." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 1D Speed as a Rate ───────────────────────────────────────────────────────────────
export function year12Standard1RatesSpeedLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-speed"
  ) {
    return null;
  }
  return {
    description:
      "Treat speed as a rate of distance per unit time: calculate speed, distance and time, and convert between km/h and m/s.",
    learningIntention:
      "Use speed = distance ÷ time and its rearrangements, and convert between km/h and m/s.",
    successCriteria: [
      "Calculate average speed as distance divided by time.",
      "Rearrange the relationship to find distance or time.",
      "Convert a speed between km/h and m/s.",
      "Interpret average speed over a journey with more than one phase.",
    ],
    teaching: {
      paragraphs: [
        "Speed is just a rate: how much distance happens for each unit of time. 'A car does 90 km in 1.5 hours' is the same idea as 'apples cost $0.75 each' — distance per hour instead of dollars per apple. Speed = distance ÷ time. That single relationship gives you all three quantities, because you can rearrange it.",
        "Picture a triangle with distance on top, speed and time underneath. Cover the quantity you want: cover distance and you see speed × time; cover time and you see distance ÷ speed. You never memorise three formulas — you rearrange one.",
        "Average speed is total distance ÷ total time for the WHOLE trip, including rests. A common error is to average the two speeds of a two-part trip; that only works if equal time is spent at each speed. Safer: add up all the distance, add up all the time, then divide.",
        "Converting km/h to m/s: 1 km = 1000 m and 1 h = 3600 s, so multiply by 1000/3600 = divide by 3.6. To go back from m/s to km/h, multiply by 3.6. Always sanity-check: 36 km/h should be 10 m/s, not 100 m/s.",
      ],
      latexBlocks: [
        "\\text{speed} = \\frac{\\text{distance}}{\\text{time}}",
        "\\text{distance} = \\text{speed} \\times \\text{time},\\quad \\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
        "\\text{km/h} \\xrightarrow{\\;\\div 3.6\\;} \\text{m/s},\\qquad \\text{m/s} \\xrightarrow{\\;\\times 3.6\\;} \\text{km/h}",
      ],
    },
    workedExamples: [
      {
        title: "Average speed of a journey",
        questionLatex: "\\text{A cyclist rides 45 km in 2.5 hours. Find the average speed in km/h.}",
        steps: [
          { explanation: "Average speed is total distance over total time.", latex: "\\text{speed} = \\frac{45}{2.5} = 18\\text{ km/h}" },
        ],
        finalAnswerLatex: "18\\text{ km/h}",
      },
      {
        title: "Convert km/h to m/s",
        questionLatex: "\\text{Convert 72 km/h to m/s.}",
        steps: [
          { explanation: "Divide by 3.6 to change km/h into m/s.", latex: "\\frac{72}{3.6} = 20\\text{ m/s}" },
        ],
        finalAnswerLatex: "20\\text{ m/s}",
      },
    ],
    guidedPractice: [
      mcq(
        "spd-g1",
        "Which formula gives average speed?",
        "B",
        ["distance × time", "distance ÷ time", "time ÷ distance", "distance + time"],
        1,
        "Speed is a rate of distance per unit of time.",
        "Average speed = distance ÷ time (how much distance per unit of time)."
      ),
      ans(
        "spd-g2",
        "A car travels 150 km in 2 hours. Find the average speed in km/h.",
        "",
        "75",
        2,
        "Divide distance by time.",
        "Average speed = 150 ÷ 2 = 75 km/h."
      ),
      ans(
        "spd-g3",
        "A train travels at 80 km/h for 3 hours. How far does it travel, in km?",
        "",
        "240",
        2,
        "distance = speed × time.",
        "Distance = 80 × 3 = 240 km."
      ),
      ans(
        "spd-g4",
        "Convert 36 km/h to m/s.",
        "",
        "10",
        2,
        "Divide by 3.6 to go from km/h to m/s.",
        "36 ÷ 3.6 = 10 m/s."
      ),
    ],
    independentPractice: [
      ans(
        "spd-i1",
        "A runner covers 12 km in 50 minutes. Find the time to run 18 km at the same pace, in minutes.",
        "",
        "75",
        3,
        "Find minutes per km, then scale to 18 km.",
        "Pace = 50 ÷ 12 = 4.1667 min/km. For 18 km: 4.1667 × 18 = 75 minutes."
      ),
      ans(
        "spd-i2",
        "A plane flies 1800 km at 600 km/h. Find the flight time in hours.",
        "",
        "3",
        2,
        "time = distance ÷ speed.",
        "Time = 1800 ÷ 600 = 3 hours."
      ),
      ans(
        "spd-i3",
        "Convert 25 m/s to km/h.",
        "",
        "90",
        2,
        "Multiply by 3.6 to go from m/s to km/h.",
        "25 × 3.6 = 90 km/h."
      ),
      mcq(
        "spd-i4",
        "A car does 60 km in the first hour and 120 km in the next 2 hours. What is its average speed for the whole trip?",
        "C",
        ["90 km/h, by averaging 60 and 60", "75 km/h", "60 km/h, total distance ÷ total time", "180 km/h"],
        3,
        "Use total distance ÷ total time, not the average of two speeds.",
        "Total distance = 60 + 120 = 180 km; total time = 1 + 2 = 3 h. Average speed = 180 ÷ 3 = 60 km/h. Averaging the two hourly speeds would be wrong because the times differ."
      ),
      ans(
        "spd-i5",
        "A bus leaves at 9:00 am and arrives at 11:30 am having travelled 175 km. Find its average speed in km/h.",
        "",
        "70",
        3,
        "Find the travel time in hours first.",
        "Time = 9:00 to 11:30 = 2.5 hours. Average speed = 175 ÷ 2.5 = 70 km/h."
      ),
    ],
    masteryQuiz: [
      ans(
        "spd-m1",
        "A walker covers 6 km in 1.5 hours. Find the average speed in km/h.",
        "",
        "4",
        2,
        "distance ÷ time.",
        "Average speed = 6 ÷ 1.5 = 4 km/h."
      ),
      ans(
        "spd-m2",
        "A motorbike travels at 90 km/h. How far does it go in 40 minutes, in km?",
        "",
        "60",
        3,
        "Convert 40 minutes to hours first.",
        "40 min = 40/60 = 2/3 h. Distance = 90 × 2/3 = 60 km."
      ),
      ans(
        "spd-m3",
        "Convert 54 km/h to m/s.",
        "",
        "15",
        2,
        "Divide by 3.6.",
        "54 ÷ 3.6 = 15 m/s."
      ),
      mcq(
        "spd-m4",
        "Which speed is the fastest?",
        "C",
        ["50 km/h", "10 m/s (= 36 km/h)", "15 m/s (= 54 km/h)", "0.8 km/min (= 48 km/h)"],
        3,
        "Convert all speeds to the same unit, e.g. km/h.",
        "Converting to km/h: 50; 10 m/s = 36; 15 m/s = 54; 0.8 km/min = 48 km/h. The fastest is 15 m/s = 54 km/h."
      ),
      ans(
        "spd-m5",
        "A car covers 240 km. The first 120 km takes 1.5 h and the next 120 km takes 2 h. Find the average speed for the whole trip, in km/h (to 2 decimal places).",
        "",
        "68.57",
        4,
        "Total distance ÷ total time for the whole journey.",
        "Total distance = 240 km; total time = 1.5 + 2 = 3.5 h. Average speed = 240 ÷ 3.5 = 68.57 km/h (2 d.p.).",
        ["68.6", "68.57 km/h"]
      ),
      ans(
        "spd-m6",
        "A train must cover 300 km in 4 hours. What constant speed is required, in km/h?",
        "",
        "75",
        2,
        "speed = distance ÷ time.",
        "Required speed = 300 ÷ 4 = 75 km/h."
      ),
      mcq(
        "spd-m7",
        "A student converts 90 km/h to m/s by multiplying by 3.6, getting 324 m/s. What went wrong?",
        "A",
        [
          "km/h → m/s divides by 3.6, giving 25 m/s; 324 m/s is impossibly fast",
          "Nothing — 324 m/s is correct",
          "They should multiply by 1000",
          "They should divide by 60",
        ],
        3,
        "Check direction: m/s numbers are smaller than km/h numbers.",
        "To go km/h → m/s you DIVIDE by 3.6: 90 ÷ 3.6 = 25 m/s. Multiplying gives 324 m/s (over 1000 km/h), which is clearly unreasonable."
      ),
      ans(
        "spd-m8",
        "A cyclist rides for 20 minutes at 24 km/h. How far do they travel, in km?",
        "",
        "8",
        3,
        "Convert 20 minutes to hours, then distance = speed × time.",
        "20 min = 1/3 h. Distance = 24 × 1/3 = 8 km."
      ),
      ans(
        "spd-m9",
        "A car leaves at 1:45 pm and arrives at 3:15 pm, covering 105 km. Find the average speed in km/h.",
        "",
        "70",
        3,
        "Find the travel time in hours first.",
        "Time = 1:45 to 3:15 = 1.5 h. Average speed = 105 ÷ 1.5 = 70 km/h."
      ),
      mcq(
        "spd-m10",
        "Usain runs 100 m in 10 s; a car travels 90 km/h. Who is faster, and why?",
        "B",
        [
          "The runner, because 100 is bigger than 90",
          "The car: 90 km/h = 25 m/s vs the runner's 10 m/s",
          "Equal speed",
          "Cannot compare different units",
        ],
        4,
        "Convert both to the same unit (m/s).",
        "Runner: 100 ÷ 10 = 10 m/s. Car: 90 ÷ 3.6 = 25 m/s. The car is faster — comparing the raw numbers 100 and 90 is meaningless because the units differ."
      ),
    ],
    commonMistakes: [
      { mistake: "Averaging two speeds when the times spent at each differ.", fix: "Use total distance ÷ total time for the whole journey." },
      { mistake: "Converting km/h to m/s the wrong way.", fix: "km/h → m/s divides by 3.6; m/s → km/h multiplies by 3.6. Sanity-check the size." },
      { mistake: "Mixing minutes and hours in distance = speed × time.", fix: "Convert the time to hours when the speed is in km/h." },
      { mistake: "Comparing raw speed numbers in different units.", fix: "Convert all speeds to one unit before comparing." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 1E Distance–Time Graphs ──────────────────────────────────────────────────────────
export function year12Standard1RatesDistanceTimeGraphsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-distance-time-graphs"
  ) {
    return null;
  }
  // Reusable distance–time journey graph (out 60 km in 1 h, rest 0.5 h, return in 1.5 h).
  const journeyGraph = (description: string) => ({
    description,
    xMin: 0,
    xMax: 3,
    yMin: 0,
    yMax: 70,
    xStep: 0.5,
    yStep: 10,
    showGrid: true,
    xAxisLabel: "Time (h)",
    yAxisLabel: "Distance from home (km)",
    lineSegments: [
      { from: { x: 0, y: 0 }, to: { x: 1, y: 60 }, label: "out" },
      { from: { x: 1, y: 60 }, to: { x: 1.5, y: 60 }, label: "rest" },
      { from: { x: 1.5, y: 60 }, to: { x: 3, y: 0 }, label: "return" },
    ],
  });
  const dtgGraph = journeyGraph(
    "Distance–time graph of a journey: a line rising from (0 h, 0 km) to (1 h, 60 km), flat (rest) from 1 h to 1.5 h at 60 km, then falling to (3 h, 0 km)."
  );
  return {
    description:
      "Read and interpret distance–time graphs: speed as the gradient, flat sections as rest, and average speed over a whole journey.",
    learningIntention:
      "Interpret distance–time graphs, reading speed from the steepness and identifying rests and return trips.",
    successCriteria: [
      "Read distance and time values directly from a distance–time graph.",
      "Find the speed of a section from its gradient (steepness).",
      "Identify a horizontal section as a rest (zero speed).",
      "Calculate the average speed over a whole journey from the graph.",
    ],
    teaching: {
      paragraphs: [
        "A distance–time graph turns a journey into a picture: time runs along the bottom, distance from the start goes up the side. The key insight is that STEEPNESS = SPEED. A steep line means a lot of distance covered in a little time (fast); a gentle line means slow; a flat line means no distance is changing — the object is stationary.",
        "To read a speed off the graph, pick a section and find its gradient: rise ÷ run = change in distance ÷ change in time. That gradient IS the speed for that part of the trip. Because speed is the gradient, a straight section means constant speed.",
        "A horizontal segment is a rest: time passes but distance does not change, so the speed is zero. A line coming back DOWN to the axis means the object is returning toward the start — the distance from home is decreasing.",
        "For the average speed of the whole trip, do not average the gradients of the sections. Use total distance travelled ÷ total time. On an out-and-back trip the total distance travelled is the distance out PLUS the distance back, even though the graph returns to zero.",
      ],
      latexBlocks: [
        "\\text{speed of a section} = \\text{gradient} = \\frac{\\text{change in distance}}{\\text{change in time}}",
        "\\text{flat line} \\Rightarrow \\text{speed} = 0\\ (\\text{rest})",
        "\\text{average speed} = \\frac{\\text{total distance travelled}}{\\text{total time}}",
      ],
    },
    workedExamples: [
      {
        title: "Speed from the gradient of a section",
        questionLatex: "\\text{A graph rises from 0 km to 60 km over the first 1 hour. Find the speed of this section.}",
        steps: [
          { explanation: "Speed is the gradient: change in distance ÷ change in time.", latex: "\\frac{60 - 0}{1 - 0} = 60\\text{ km/h}" },
        ],
        finalAnswerLatex: "60\\text{ km/h}",
        cartesianGraph: journeyGraph("Distance–time graph: a line rising from (0, 0) to (1 h, 60 km), flat from 1 h to 1.5 h at 60 km, then falling to (3 h, 0 km)."),
      },
      {
        title: "Average speed of an out-and-back trip",
        questionLatex: "\\text{Out 60 km then back 60 km, total time 3 hours. Find the average speed.}",
        steps: [
          { explanation: "Total distance travelled is out plus back.", latex: "60 + 60 = 120\\text{ km}" },
          { explanation: "Average speed = total distance ÷ total time.", latex: "\\frac{120}{3} = 40\\text{ km/h}" },
        ],
        finalAnswerLatex: "40\\text{ km/h}",
      },
    ],
    guidedPractice: [
      mcq(
        "dtg-g1",
        "On a distance–time graph, what does a steeper line mean?",
        "B",
        ["A slower speed", "A faster speed", "A longer rest", "A return trip"],
        1,
        "Steepness is gradient, and gradient is speed.",
        "Steeper = more distance in less time = faster speed. The gradient of the line is the speed."
      ),
      ans(
        "dtg-g2",
        "Using the graph, what is the traveller's speed during the flat (horizontal) section, in km/h?",
        "",
        "0",
        1,
        "Flat means distance is not changing.",
        "During the flat section the distance from home does not change, so the speed is 0 km/h — the traveller is at rest.",
        ["0 km/h", "zero"],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-g3",
        "Using the graph, find the speed during the first hour (0 to 60 km in 1 h), in km/h.",
        "",
        "60",
        2,
        "Gradient = change in distance ÷ change in time.",
        "Speed = (60 − 0) ÷ (1 − 0) = 60 km/h.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-g4",
        "Using the graph, for how long is the traveller at rest, in hours?",
        "",
        "0.5",
        2,
        "Find the length of the flat section on the time axis.",
        "The flat section runs from 1 h to 1.5 h, so the rest lasts 0.5 hours.",
        ["0.5 h", "30 min"],
        { cartesianGraph: dtgGraph }
      ),
    ],
    independentPractice: [
      ans(
        "dtg-i1",
        "Using the graph, find the speed on the return journey (60 km back to 0 over 1.5 h), in km/h.",
        "",
        "40",
        3,
        "Gradient of the returning section = distance ÷ time.",
        "Return covers 60 km in 3 − 1.5 = 1.5 h, so speed = 60 ÷ 1.5 = 40 km/h.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-i2",
        "Using the graph, find the speed of the fastest section of the journey, in km/h.",
        "",
        "60",
        3,
        "Compare the steepness of the moving sections; the steepest is fastest.",
        "The outward section is steepest at 60 km/h, faster than the return (40 km/h) and the rest (0 km/h), so the fastest speed is 60 km/h.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-i3",
        "Using the graph, find the total distance travelled over the whole journey, in km.",
        "",
        "120",
        3,
        "Add the distance out and the distance back.",
        "Out 60 km plus back 60 km = 120 km travelled, even though the graph returns to 0.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-i4",
        "Using the graph, find the average speed for the whole 3-hour journey, in km/h.",
        "",
        "40",
        3,
        "Average speed = total distance travelled ÷ total time.",
        "Total distance = 120 km; total time = 3 h. Average speed = 120 ÷ 3 = 40 km/h (not the average of 60 and 40).",
        [],
        { cartesianGraph: dtgGraph }
      ),
      mcq(
        "dtg-i5",
        "A line on a distance–time graph slopes DOWN toward the time axis. What does this show?",
        "B",
        ["Speeding up away from home", "Moving back toward the start", "Resting", "Travelling at constant high speed away"],
        2,
        "Distance from home is decreasing.",
        "A downward slope means the distance from the start is decreasing — the object is returning toward home."
      ),
    ],
    masteryQuiz: [
      ans(
        "dtg-m1",
        "A distance–time graph rises from 0 to 30 km in 0.5 h. Find the speed in km/h.",
        "",
        "60",
        2,
        "Gradient = distance ÷ time.",
        "Speed = 30 ÷ 0.5 = 60 km/h."
      ),
      mcq(
        "dtg-m2",
        "On a distance–time graph, a horizontal segment represents:",
        "C",
        ["Maximum speed", "A return trip", "Being stationary", "Constant acceleration"],
        2,
        "No change in distance over time.",
        "A horizontal line means distance does not change while time passes — the object is stationary (speed 0)."
      ),
      ans(
        "dtg-m3",
        "Using the graph, find the speed of the first section (0 to 60 km in 1 h), in km/h.",
        "",
        "60",
        2,
        "Gradient of the first section.",
        "Speed = 60 ÷ 1 = 60 km/h.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-m4",
        "Using the graph, how far from home is the traveller at time 1.25 h, in km?",
        "",
        "60",
        3,
        "At 1.25 h the traveller is in the flat (rest) section.",
        "Between 1 h and 1.5 h the graph is flat at 60 km, so at 1.25 h the distance from home is 60 km.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      mcq(
        "dtg-m5",
        "Using the graph, which statement about the return journey is correct?",
        "B",
        [
          "It is faster than the outward journey",
          "It is slower than the outward journey (40 vs 60 km/h)",
          "It is a rest",
          "It has the same speed as the outward journey",
        ],
        3,
        "Compare the two gradients.",
        "Outward = 60 km/h, return = 40 km/h, so the return is slower (its line is less steep).",
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-m6",
        "A journey covers 40 km out in 0.5 h, rests 1 h, then returns 40 km in 1 h. Find the average speed for the whole trip, in km/h.",
        "",
        "32",
        4,
        "Total distance travelled ÷ total time, including the rest.",
        "Total distance = 40 + 40 = 80 km; total time = 0.5 + 1 + 1 = 2.5 h. Average speed = 80 ÷ 2.5 = 32 km/h."
      ),
      mcq(
        "dtg-m7",
        "Two cyclists are shown on one distance–time graph. They are at the same distance at time t. On the graph this is where:",
        "C",
        ["Both lines are flat", "Both lines are steepest", "The two lines cross (intersect)", "The lines are parallel"],
        3,
        "Same distance at the same time = same point.",
        "Two travellers are at the same place at the same time exactly where their lines intersect on the graph."
      ),
      ans(
        "dtg-m8",
        "A graph shows 0 to 50 km in 1 h, then flat from 1 h to 2 h. Find the average speed over the first 2 hours, in km/h.",
        "",
        "25",
        3,
        "Total distance ÷ total time over the 2 hours.",
        "Distance after 2 h = 50 km (it rested in the 2nd hour); average speed = 50 ÷ 2 = 25 km/h."
      ),
      ans(
        "dtg-m9",
        "A student claims the average speed of the out-and-back trip is (60 + 40) ÷ 2 = 50 km/h. Using total distance ÷ total time, find the correct average speed, in km/h.",
        "",
        "40",
        4,
        "Average speed = total distance ÷ total time, not the mean of the two section speeds.",
        "Total distance = 60 + 60 = 120 km; total time = 3 h; average = 120 ÷ 3 = 40 km/h. Averaging 60 and 40 is wrong because more time is spent on the slower return.",
        [],
        { cartesianGraph: dtgGraph }
      ),
      ans(
        "dtg-m10",
        "On a distance–time graph, section P rises 80 km in 2 h and section Q rises 80 km in 1 h. How many times faster is Q than P?",
        "",
        "2",
        3,
        "Find each speed, then divide.",
        "P = 80 ÷ 2 = 40 km/h; Q = 80 ÷ 1 = 80 km/h. Q is 80 ÷ 40 = 2 times faster (its line is twice as steep).",
        ["2 times", "twice"]
      ),
    ],
    commonMistakes: [
      { mistake: "Reading a flat section as 'stopped travelling' = fastest.", fix: "Flat means zero speed — the object is at rest, not moving." },
      { mistake: "Averaging the section gradients to get average speed.", fix: "Use total distance travelled ÷ total time for the whole journey." },
      { mistake: "Forgetting the return distance counts toward total distance.", fix: "Out-and-back travels out + back, even though the graph ends at 0." },
      { mistake: "Confusing a downward slope with speeding up.", fix: "A downward slope means returning toward the start (distance decreasing)." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 1F Fuel Consumption Rate ─────────────────────────────────────────────────────────
export function year12Standard1RatesFuelConsumptionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-fuel-consumption"
  ) {
    return null;
  }
  return {
    description:
      "Use fuel consumption rates in L/100 km to find fuel used, trip cost, and to compare vehicles.",
    learningIntention:
      "Apply a fuel consumption rate in litres per 100 km to find fuel used and the cost of a trip.",
    successCriteria: [
      "Find the fuel used for a trip from a rate in L/100 km.",
      "Find the cost of the fuel for a trip given a price per litre.",
      "Work backwards from fuel used to find a distance or a consumption rate.",
      "Compare two vehicles by fuel used or running cost over the same distance.",
    ],
    teaching: {
      paragraphs: [
        "Fuel consumption is a rate, but with an unusual 'per': litres per 100 kilometres, not per 1 km. A rate of 8 L/100 km means every 100 km of driving burns 8 litres. So the fuel for a trip is the rate scaled by how many lots of 100 km you drive: fuel = rate ÷ 100 × distance.",
        "Two steps turn a trip into a dollar cost. First find the litres: (rate ÷ 100) × distance. Then multiply litres by the price per litre to get the cost. Keep them separate so a mistake in one step does not hide in the other.",
        "Lower L/100 km means MORE efficient — the car sips less fuel for the same distance. This is the opposite of speed, where bigger is 'more'. When comparing cars, the smaller consumption number is the cheaper, greener choice over the same distance.",
        "You can run the formula backwards. Given the litres used and the distance, the rate is litres ÷ distance × 100. Given a tank size and a rate, the range is how far the tank lasts: (tank ÷ rate) × 100 km.",
      ],
      latexBlocks: [
        "\\text{fuel (L)} = \\frac{\\text{rate (L/100 km)}}{100} \\times \\text{distance (km)}",
        "\\text{fuel cost} = \\text{fuel (L)} \\times \\text{price per litre}",
        "\\text{rate (L/100 km)} = \\frac{\\text{fuel used (L)}}{\\text{distance (km)}} \\times 100",
      ],
    },
    workedExamples: [
      {
        title: "Fuel and cost of a trip",
        questionLatex: "\\text{A car uses 8 L/100 km. Find the fuel and cost for 250 km at }\\$2.00\\text{/L.}",
        steps: [
          { explanation: "Fuel used = (rate ÷ 100) × distance.", latex: "\\frac{8}{100} \\times 250 = 20\\text{ L}" },
          { explanation: "Cost = litres × price per litre.", latex: "20 \\times 2.00 = \\$40.00" },
        ],
        finalAnswerLatex: "20\\text{ L},\\ \\$40.00",
      },
      {
        title: "Work backwards to the consumption rate",
        questionLatex: "\\text{A car uses 45 L over 500 km. Find its consumption rate in L/100 km.}",
        steps: [
          { explanation: "Rate = fuel ÷ distance × 100.", latex: "\\frac{45}{500} \\times 100 = 9\\text{ L/100 km}" },
        ],
        finalAnswerLatex: "9\\text{ L/100 km}",
      },
    ],
    guidedPractice: [
      mcq(
        "fcr-g1",
        "A fuel consumption of '8 L/100 km' means:",
        "B",
        ["8 litres for every 1 km", "8 litres for every 100 km", "100 litres for every 8 km", "8 km for every litre"],
        1,
        "Read the units literally.",
        "8 L/100 km means 8 litres of fuel are used for every 100 km driven."
      ),
      ans(
        "fcr-g2",
        "A car uses 10 L/100 km. How much fuel does it use for 100 km, in litres?",
        "",
        "10",
        1,
        "The rate already tells you the fuel per 100 km.",
        "At 10 L/100 km, exactly 10 litres are used for 100 km."
      ),
      ans(
        "fcr-g3",
        "A car uses 8 L/100 km. How much fuel for 300 km, in litres?",
        "",
        "24",
        2,
        "fuel = (rate ÷ 100) × distance.",
        "Fuel = 8 ÷ 100 × 300 = 24 L."
      ),
      ans(
        "fcr-g4",
        "20 litres of fuel cost how much at $1.90 per litre, in dollars?",
        "",
        "38",
        2,
        "cost = litres × price per litre.",
        "Cost = 20 × 1.90 = $38.00.",
        ["$38", "38.00"]
      ),
    ],
    independentPractice: [
      ans(
        "fcr-i1",
        "A car uses 7 L/100 km. Find the fuel used on a 450 km trip, in litres.",
        "",
        "31.5",
        2,
        "fuel = (rate ÷ 100) × distance.",
        "Fuel = 7 ÷ 100 × 450 = 31.5 L."
      ),
      ans(
        "fcr-i2",
        "A car uses 9 L/100 km. Find the cost of a 600 km trip when fuel is $2.10/L, in dollars.",
        "",
        "113.40",
        3,
        "Find litres first, then multiply by the price.",
        "Fuel = 9 ÷ 100 × 600 = 54 L. Cost = 54 × 2.10 = $113.40.",
        ["$113.40"]
      ),
      ans(
        "fcr-i3",
        "A car uses 60 L over 750 km. Find its consumption rate in L/100 km.",
        "",
        "8",
        3,
        "rate = fuel ÷ distance × 100.",
        "Rate = 60 ÷ 750 × 100 = 8 L/100 km."
      ),
      mcq(
        "fcr-i4",
        "Car A uses 6 L/100 km and Car B uses 9 L/100 km. Over the same trip, which is cheaper to run and why?",
        "A",
        [
          "Car A, because a lower L/100 km uses less fuel for the same distance",
          "Car B, because a higher number means more powerful and efficient",
          "They cost the same",
          "Car B, because it has the bigger rate",
        ],
        3,
        "Lower L/100 km = more efficient.",
        "A lower consumption rate means fewer litres for the same distance, so Car A (6 L/100 km) is cheaper to run. A bigger rate is worse, not better."
      ),
      ans(
        "fcr-i5",
        "A 60 L tank is full and the car uses 10 L/100 km. How far can it travel on a full tank, in km?",
        "",
        "600",
        3,
        "How many lots of 100 km does the tank cover?",
        "60 L ÷ 10 L per 100 km = 6 lots of 100 km = 600 km of range."
      ),
    ],
    masteryQuiz: [
      mcq(
        "fcr-m1",
        "A car uses 8 L/100 km. How much fuel does a 200 km trip use?",
        "B",
        ["1600 L", "16 L", "8 L", "1.6 L"],
        2,
        "fuel = (rate ÷ 100) × distance.",
        "Fuel = 8 ÷ 100 × 200 = 16 L. The 1600 L distractor forgets to divide the rate by 100; 8 L ignores that the trip is 200 km, not 100."
      ),
      ans(
        "fcr-m2",
        "Fuel costs $2.05/L. Find the cost of 40 litres, in dollars.",
        "",
        "82",
        2,
        "cost = litres × price.",
        "Cost = 40 × 2.05 = $82.00.",
        ["$82", "82.00"]
      ),
      ans(
        "fcr-m3",
        "A car uses 11 L/100 km. Find the fuel for a 250 km trip, in litres.",
        "",
        "27.5",
        2,
        "fuel = (rate ÷ 100) × distance.",
        "Fuel = 11 ÷ 100 × 250 = 27.5 L."
      ),
      ans(
        "fcr-m4",
        "A car uses 7.5 L/100 km. Find the cost of a 400 km trip at $1.80/L, in dollars.",
        "",
        "54",
        3,
        "Litres first, then × price.",
        "Fuel = 7.5 ÷ 100 × 400 = 30 L. Cost = 30 × 1.80 = $54.00.",
        ["$54", "54.00"]
      ),
      ans(
        "fcr-m5",
        "A car uses 54 L over 600 km. Find its consumption rate in L/100 km.",
        "",
        "9",
        3,
        "rate = fuel ÷ distance × 100.",
        "Rate = 54 ÷ 600 × 100 = 9 L/100 km."
      ),
      mcq(
        "fcr-m6",
        "Which car is the most fuel-efficient?",
        "C",
        ["12 L/100 km", "9.5 L/100 km", "6.8 L/100 km", "10 L/100 km"],
        2,
        "Most efficient = smallest L/100 km.",
        "The most efficient car uses the fewest litres per 100 km, so 6.8 L/100 km is the best."
      ),
      ans(
        "fcr-m7",
        "A 50 L tank is full and the car uses 8 L/100 km. Find the range on a full tank, in km.",
        "",
        "625",
        3,
        "Range = (tank ÷ rate) × 100.",
        "50 ÷ 8 = 6.25 lots of 100 km = 625 km of range."
      ),
      mcq(
        "fcr-m8",
        "Car A: 6 L/100 km, fuel $2.00/L. Car B: 8 L/100 km, fuel $1.50/L. Over 300 km, which is cheaper to fuel?",
        "D",
        [
          "Car A — it always wins because it is more efficient",
          "Car A — $36 vs Car B's $42",
          "Car B — $30 vs Car A's $36",
          "They cost the same at $36",
        ],
        4,
        "Compute each cost: litres × price.",
        "Car A: (6 ÷ 100 × 300) × 2.00 = 18 × 2.00 = $36. Car B: (8 ÷ 100 × 300) × 1.50 = 24 × 1.50 = $36. They cost the same ($36) — efficiency alone does not decide once the fuel prices differ."
      ),
      ans(
        "fcr-m9",
        "A trip of 480 km uses 36 L. At $1.95/L, find the fuel cost, in dollars.",
        "",
        "70.20",
        2,
        "cost = litres × price.",
        "Cost = 36 × 1.95 = $70.20.",
        ["$70.20"]
      ),
      ans(
        "fcr-m10",
        "A car uses 9 L/100 km and the tank holds 54 L. Starting full, after driving 400 km, how many litres remain in the tank?",
        "",
        "18",
        4,
        "Find the fuel used over 400 km, then subtract from the tank.",
        "Fuel used = 9 ÷ 100 × 400 = 36 L. Remaining = 54 − 36 = 18 L."
      ),
    ],
    commonMistakes: [
      { mistake: "Treating the rate as litres per 1 km instead of per 100 km.", fix: "Divide the rate by 100 before multiplying by the distance." },
      { mistake: "Thinking a bigger L/100 km is 'better/more powerful'.", fix: "Lower L/100 km is more efficient — fewer litres for the same distance." },
      { mistake: "Skipping straight to cost without finding litres first.", fix: "Find litres, then multiply by price per litre as a separate step." },
      { mistake: "Comparing cars on efficiency alone when fuel prices differ.", fix: "Compute each running cost (litres × price); the cheaper rate can lose if its fuel costs more." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 1G Heart Rate ────────────────────────────────────────────────────────────────────
export function year12Standard1RatesHeartRateLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-heart-rate"
  ) {
    return null;
  }
  return {
    description:
      "Work with heart rate in beats per minute: count-to-rate conversions, beats over time, maximum heart rate and target training zones.",
    learningIntention:
      "Use heart rate as a rate in beats per minute, including estimating it from a short count and finding target zones.",
    successCriteria: [
      "Convert a count of beats over a few seconds into beats per minute.",
      "Find the number of beats over a given time from a heart rate.",
      "Estimate maximum heart rate as 220 minus age.",
      "Find a target training zone as a percentage of maximum heart rate.",
    ],
    teaching: {
      paragraphs: [
        "Heart rate is a rate measured in beats per minute (bpm). Nurses rarely count for a whole minute — they count for 15 seconds and scale up. Since 15 seconds is a quarter of a minute, multiply a 15-second count by 4; a 10-second count by 6; a 30-second count by 2. It is the unitary method wearing a stethoscope.",
        "Once you know the bpm, the number of beats over any time is just rate × time, with the time in minutes: beats = bpm × minutes. Keep the time in minutes to match 'per minute'.",
        "A standard estimate of maximum heart rate is 220 − age (in years). It is only an estimate, but it anchors training zones. A 'target zone' is a percentage band of that maximum — e.g. 50%–70% for moderate exercise — found by taking those percentages of the maximum.",
        "Watch the order of operations in zone questions: find the maximum first (220 − age), THEN take the percentage. Taking the percentage of the age, or of 220 alone, is the usual slip.",
      ],
      latexBlocks: [
        "\\text{bpm} = \\text{beats counted} \\times \\frac{60}{\\text{seconds counted}}",
        "\\text{beats} = \\text{bpm} \\times \\text{minutes}",
        "\\text{max HR} \\approx 220 - \\text{age},\\quad \\text{target} = \\text{percentage} \\times \\text{max HR}",
      ],
    },
    workedExamples: [
      {
        title: "Estimate bpm from a 15-second count",
        questionLatex: "\\text{A nurse counts 18 beats in 15 seconds. Find the heart rate in bpm.}",
        steps: [
          { explanation: "15 seconds is a quarter of a minute, so multiply by 4.", latex: "18 \\times 4 = 72\\text{ bpm}" },
        ],
        finalAnswerLatex: "72\\text{ bpm}",
      },
      {
        title: "Target zone from maximum heart rate",
        questionLatex: "\\text{For a 40-year-old, find 70\\% of the estimated maximum heart rate.}",
        steps: [
          { explanation: "Estimate the maximum heart rate first.", latex: "220 - 40 = 180\\text{ bpm}" },
          { explanation: "Then take 70% of the maximum.", latex: "0.70 \\times 180 = 126\\text{ bpm}" },
        ],
        finalAnswerLatex: "126\\text{ bpm}",
      },
    ],
    guidedPractice: [
      mcq(
        "hrt-g1",
        "To convert beats counted in 15 seconds to beats per minute, you:",
        "B",
        ["Divide by 4", "Multiply by 4", "Multiply by 15", "Add 45"],
        1,
        "15 seconds is one quarter of a minute.",
        "There are four 15-second intervals in a minute, so multiply a 15-second count by 4 to get bpm."
      ),
      ans(
        "hrt-g2",
        "A person's heart beats 20 times in 15 seconds. Find the heart rate in bpm.",
        "",
        "80",
        2,
        "Multiply the 15-second count by 4.",
        "Heart rate = 20 × 4 = 80 bpm."
      ),
      ans(
        "hrt-g3",
        "A heart beats at 72 bpm. How many beats occur in 5 minutes?",
        "",
        "360",
        2,
        "beats = bpm × minutes.",
        "Beats = 72 × 5 = 360 beats."
      ),
      ans(
        "hrt-g4",
        "Estimate the maximum heart rate of a 30-year-old, in bpm.",
        "",
        "190",
        1,
        "Max HR ≈ 220 − age.",
        "Maximum heart rate ≈ 220 − 30 = 190 bpm."
      ),
    ],
    independentPractice: [
      ans(
        "hrt-i1",
        "A person's heart beats 12 times in 10 seconds. Find the heart rate in bpm.",
        "",
        "72",
        2,
        "10 seconds is one sixth of a minute, so multiply by 6.",
        "Heart rate = 12 × 6 = 72 bpm."
      ),
      ans(
        "hrt-i2",
        "An athlete's heart rate is 150 bpm during a 12-minute run. How many beats in total during the run?",
        "",
        "1800",
        2,
        "beats = bpm × minutes.",
        "Beats = 150 × 12 = 1800 beats."
      ),
      ans(
        "hrt-i3",
        "For a 50-year-old, find 60% of the estimated maximum heart rate, in bpm.",
        "",
        "102",
        3,
        "Find the maximum (220 − age) first, then take 60%.",
        "Max HR = 220 − 50 = 170 bpm. Target = 0.60 × 170 = 102 bpm."
      ),
      mcq(
        "hrt-i4",
        "To find 70% of the max heart rate for a 20-year-old, a student computes 0.70 × 20 = 14. What is the error?",
        "A",
        [
          "Take the percentage of the maximum (220 − 20 = 200), not of the age: 0.70 × 200 = 140 bpm",
          "Nothing — 14 bpm is correct",
          "They should add 20 to 220",
          "They should multiply 20 by 220",
        ],
        3,
        "Find the maximum heart rate first.",
        "Max HR = 220 − 20 = 200 bpm. Target = 0.70 × 200 = 140 bpm. The student took 70% of the age (20) instead of the maximum."
      ),
      ans(
        "hrt-i5",
        "A resting heart rate is 64 bpm. Over an 8-hour sleep, how many beats occur? (Give your answer in beats.)",
        "",
        "30720",
        3,
        "Convert 8 hours to minutes, then beats = bpm × minutes.",
        "8 hours = 480 minutes. Beats = 64 × 480 = 30720 beats.",
        ["30,720", "30 720"]
      ),
    ],
    masteryQuiz: [
      mcq(
        "hrt-m1",
        "A heart beats 19 times in 15 seconds. What is the heart rate in bpm?",
        "C",
        ["19 bpm", "23 bpm", "76 bpm", "4.75 bpm"],
        2,
        "15 seconds is a quarter of a minute, so multiply by 4.",
        "Heart rate = 19 × 4 = 76 bpm. The 23 distractor adds 4 instead of multiplying; 4.75 divides by 4 instead."
      ),
      ans(
        "hrt-m2",
        "A heart rate is 68 bpm. How many beats in 15 minutes?",
        "",
        "1020",
        2,
        "beats = bpm × minutes.",
        "Beats = 68 × 15 = 1020 beats."
      ),
      ans(
        "hrt-m3",
        "Estimate the maximum heart rate of a 45-year-old, in bpm.",
        "",
        "175",
        1,
        "Max HR ≈ 220 − age.",
        "Max HR ≈ 220 − 45 = 175 bpm."
      ),
      ans(
        "hrt-m4",
        "A person counts 33 beats in 30 seconds. Find the heart rate in bpm.",
        "",
        "66",
        2,
        "30 seconds is half a minute, so multiply by 2.",
        "Heart rate = 33 × 2 = 66 bpm."
      ),
      ans(
        "hrt-m5",
        "For a 35-year-old, find 80% of the estimated maximum heart rate, in bpm.",
        "",
        "148",
        3,
        "Find the maximum first, then take 80%.",
        "Max HR = 220 − 35 = 185 bpm. Target = 0.80 × 185 = 148 bpm."
      ),
      mcq(
        "hrt-m6",
        "A 25-year-old wants the 50%–70% moderate zone. What is the zone in bpm?",
        "B",
        ["110–137 bpm", "97.5–136.5 bpm", "50–70 bpm", "12.5–17.5 bpm"],
        4,
        "Max HR = 220 − 25, then take 50% and 70%.",
        "Max HR = 220 − 25 = 195 bpm. 50% = 97.5; 70% = 136.5. The zone is 97.5–136.5 bpm."
      ),
      ans(
        "hrt-m7",
        "An athlete's heart beats 25 times in 10 seconds during a sprint. Find the rate in bpm.",
        "",
        "150",
        2,
        "10 seconds → multiply by 6.",
        "Heart rate = 25 × 6 = 150 bpm."
      ),
      ans(
        "hrt-m8",
        "A heart rate is 80 bpm. Over a 90-minute match, how many beats occur?",
        "",
        "7200",
        2,
        "beats = bpm × minutes.",
        "Beats = 80 × 90 = 7200 beats."
      ),
      mcq(
        "hrt-m9",
        "Two people have the same 15-second count of 20 beats, but one counted for 15 s and the other thought it was 20 s. The one who actually counted over 20 s has a TRUE rate of:",
        "C",
        ["80 bpm", "20 bpm", "60 bpm", "100 bpm"],
        4,
        "True rate = beats × (60 ÷ seconds actually counted).",
        "If 20 beats were really counted over 20 seconds, the rate = 20 × (60 ÷ 20) = 20 × 3 = 60 bpm (not 80 bpm, which assumes a 15-second count)."
      ),
      ans(
        "hrt-m10",
        "For a 60-year-old, the recommended upper training limit is 85% of maximum heart rate. Find this limit, in bpm.",
        "",
        "136",
        3,
        "Max HR = 220 − 60, then take 85%.",
        "Max HR = 220 − 60 = 160 bpm. Upper limit = 0.85 × 160 = 136 bpm."
      ),
    ],
    commonMistakes: [
      { mistake: "Taking the percentage of the age (or of 220) instead of the maximum.", fix: "Find max HR = 220 − age first, then take the percentage of that." },
      { mistake: "Using the wrong multiplier for the count interval.", fix: "Multiply by 60 ÷ (seconds counted): ×4 for 15 s, ×6 for 10 s, ×2 for 30 s." },
      { mistake: "Mixing hours and minutes in beats = bpm × time.", fix: "Convert the time to minutes to match 'beats per minute'." },
      { mistake: "Treating 220 − age as an exact value.", fix: "It is an estimate of maximum heart rate, used to set approximate zones." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 1H Blood Pressure ────────────────────────────────────────────────────────────────
export function year12Standard1RatesBloodPressureLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "rates-blood-pressure"
  ) {
    return null;
  }
  return {
    description:
      "Interpret blood pressure readings: systolic over diastolic, pulse pressure, classifying readings, and reading values from a monitor chart.",
    learningIntention:
      "Read and interpret blood pressure as systolic/diastolic in mmHg, including pulse pressure and category classification.",
    successCriteria: [
      "Identify the systolic and diastolic values in a blood pressure reading.",
      "Calculate the pulse pressure (systolic − diastolic).",
      "Classify a reading as low, normal or high against given thresholds.",
      "Compare two readings and interpret a change.",
    ],
    teaching: {
      paragraphs: [
        "Blood pressure is written as two numbers, systolic 'over' diastolic, in millimetres of mercury (mmHg) — for example 120/80. It is not a fraction: the top number (systolic) is the pressure when the heart beats and pushes blood out; the bottom number (diastolic) is the pressure when the heart rests between beats. The top number is always the larger of the two.",
        "A useful single measure is the PULSE PRESSURE: systolic − diastolic. For 120/80 that is 120 − 80 = 40 mmHg. It is just the gap between the two readings, and a widening or narrowing gap can be clinically meaningful.",
        "Classifying a reading means comparing BOTH numbers against thresholds. A reading is in a higher category if EITHER number crosses into it — for example, with a 'normal' upper limit of 120/80, a reading of 135/78 is elevated because the systolic 135 exceeds 120, even though the diastolic is fine. Always check both.",
        "When comparing two readings over time, compare the systolic with the systolic and the diastolic with the diastolic; a drop in both is generally an improvement toward a target. Never compare the systolic of one to the diastolic of another.",
      ],
      latexBlocks: [
        "\\text{reading} = \\frac{\\text{systolic}}{\\text{diastolic}}\\ \\text{mmHg}\\quad(\\text{systolic} > \\text{diastolic})",
        "\\text{pulse pressure} = \\text{systolic} - \\text{diastolic}",
        "\\text{compare each number against its threshold to classify}",
      ],
    },
    workedExamples: [
      {
        title: "Pulse pressure from a reading",
        questionLatex: "\\text{A reading is 135/85 mmHg. Find the pulse pressure.}",
        steps: [
          { explanation: "Pulse pressure = systolic − diastolic.", latex: "135 - 85 = 50\\text{ mmHg}" },
        ],
        finalAnswerLatex: "50\\text{ mmHg}",
      },
      {
        title: "Classify a reading against thresholds",
        questionLatex: "\\text{Normal is below 120/80. Classify 145/78 mmHg.}",
        steps: [
          { explanation: "Check each number. Systolic 145 is above 120; diastolic 78 is below 80.", latex: "145 > 120 \\Rightarrow \\text{high systolic}" },
          { explanation: "If either number is above its threshold, the reading is not normal.", latex: "\\text{classified as high (elevated)}" },
        ],
        finalAnswerLatex: "\\text{High (systolic above 120)}",
      },
    ],
    guidedPractice: [
      mcq(
        "bp-g1",
        "In a blood pressure reading of 120/80, what does the 120 represent?",
        "B",
        ["The resting (diastolic) pressure", "The systolic pressure when the heart beats", "The pulse pressure", "The heart rate"],
        1,
        "The top number is the pressure when the heart beats.",
        "120 is the systolic pressure — the pressure when the heart contracts and pushes blood out. The bottom number (80) is the diastolic (resting) pressure."
      ),
      ans(
        "bp-g2",
        "Find the pulse pressure of a 120/80 mmHg reading, in mmHg.",
        "",
        "40",
        2,
        "Pulse pressure = systolic − diastolic.",
        "Pulse pressure = 120 − 80 = 40 mmHg."
      ),
      ans(
        "bp-g3",
        "In a blood pressure reading, which value is always the larger — the systolic or the diastolic?",
        "",
        "systolic",
        1,
        "Pressure is highest when the heart beats.",
        "The systolic (top) number is always larger — it is the pressure during the heartbeat, higher than the resting diastolic pressure.",
        ["the systolic", "systolic pressure"]
      ),
      ans(
        "bp-g4",
        "A reading is 150/90 mmHg. Find the pulse pressure, in mmHg.",
        "",
        "60",
        2,
        "systolic − diastolic.",
        "Pulse pressure = 150 − 90 = 60 mmHg."
      ),
    ],
    independentPractice: [
      ans(
        "bp-i1",
        "Normal blood pressure is below 120/80 mmHg. Is a reading of 118/76 mmHg normal? Answer yes or no.",
        "",
        "yes",
        2,
        "Check both numbers against their thresholds.",
        "118 < 120 and 76 < 80, so both numbers are below the thresholds — the reading is normal (yes).",
        ["Yes"]
      ),
      ans(
        "bp-i2",
        "Normal is below 120/80 mmHg. Classify 135/78 mmHg as normal or elevated.",
        "",
        "elevated",
        3,
        "A reading is elevated if EITHER number crosses the threshold.",
        "Diastolic 78 is fine, but systolic 135 exceeds 120, so the reading is elevated — you must check both numbers, not just one.",
        ["high"]
      ),
      ans(
        "bp-i3",
        "A patient's reading falls from 150/95 to 132/85 mmHg. By how much did the systolic pressure fall, in mmHg?",
        "",
        "18",
        2,
        "Compare systolic with systolic.",
        "Systolic fall = 150 − 132 = 18 mmHg."
      ),
      ans(
        "bp-i4",
        "Two readings are 140/90 and 125/82 mmHg. Find the difference in their pulse pressures, in mmHg.",
        "",
        "7",
        3,
        "Find each pulse pressure, then subtract.",
        "Pulse pressures: 140 − 90 = 50 and 125 − 82 = 43. Difference = 50 − 43 = 7 mmHg."
      ),
      mcq(
        "bp-i5",
        "A student compares two readings by subtracting the systolic of one (140) from the diastolic of the other (85). Why is this wrong?",
        "A",
        [
          "Systolic must be compared with systolic and diastolic with diastolic",
          "Nothing — it gives the pulse pressure",
          "They should add the four numbers",
          "They should multiply the readings",
        ],
        3,
        "Compare like with like.",
        "Comparing the systolic of one reading with the diastolic of another is meaningless — they measure different things. Compare systolic↔systolic and diastolic↔diastolic."
      ),
    ],
    masteryQuiz: [
      ans(
        "bp-m1",
        "Find the pulse pressure of a 128/84 mmHg reading, in mmHg.",
        "",
        "44",
        2,
        "systolic − diastolic.",
        "Pulse pressure = 128 − 84 = 44 mmHg."
      ),
      ans(
        "bp-m2",
        "In a blood pressure reading of 110/70 mmHg, what is the diastolic pressure, in mmHg?",
        "",
        "70",
        1,
        "The diastolic is the bottom (resting) number.",
        "The diastolic (resting) pressure is the bottom number, 70 mmHg.",
        ["70 mmHg"]
      ),
      ans(
        "bp-m3",
        "Normal is below 120/80 mmHg. Classify 116/82 mmHg as normal or elevated.",
        "",
        "elevated",
        3,
        "Check both numbers.",
        "Systolic 116 is fine, but diastolic 82 exceeds 80, so the reading is elevated (on the diastolic). Either number crossing the threshold makes it not normal.",
        ["high"]
      ),
      ans(
        "bp-m4",
        "A reading is 162/96 mmHg. Find the pulse pressure, in mmHg.",
        "",
        "66",
        2,
        "systolic − diastolic.",
        "Pulse pressure = 162 − 96 = 66 mmHg."
      ),
      ans(
        "bp-m5",
        "A patient's systolic falls from 158 to 134 mmHg after treatment. Find the fall, in mmHg.",
        "",
        "24",
        2,
        "Compare systolic with systolic.",
        "Fall = 158 − 134 = 24 mmHg."
      ),
      mcq(
        "bp-m6",
        "Which of these readings has the largest pulse pressure?",
        "C",
        ["120/80 (40)", "135/95 (40)", "150/85 (65)", "128/90 (38)"],
        3,
        "Pulse pressure = systolic − diastolic for each.",
        "Pulse pressures: 120/80 → 40; 135/95 → 40; 150/85 → 65; 128/90 → 38. The largest is 150/85 with 65 mmHg."
      ),
      ans(
        "bp-m7",
        "A reading changes from 140/88 to 126/80 mmHg. Find the fall in diastolic pressure, in mmHg.",
        "",
        "8",
        2,
        "Compare diastolic with diastolic.",
        "Diastolic fall = 88 − 80 = 8 mmHg."
      ),
      mcq(
        "bp-m8",
        "Normal is below 120/80. A reading of 122/79 mmHg is classified as:",
        "B",
        ["Normal — the diastolic is fine", "Elevated — the systolic 122 exceeds 120", "Low", "Cannot tell without the heart rate"],
        3,
        "Either number over threshold = not normal.",
        "Diastolic 79 is fine but systolic 122 exceeds 120, so it is elevated. Heart rate is not part of a blood pressure classification."
      ),
      ans(
        "bp-m9",
        "Two readings are 144/92 and 120/76 mmHg. Find the difference in their pulse pressures, in mmHg.",
        "",
        "8",
        3,
        "Find each pulse pressure, then subtract.",
        "Pulse pressures: 144 − 92 = 52 and 120 − 76 = 44. Difference = 52 − 44 = 8 mmHg."
      ),
      mcq(
        "bp-m10",
        "A reading of 138/92 mmHg is checked against a normal limit of 120/80. Which statement is correct?",
        "D",
        [
          "Normal, because the average of 138 and 92 is acceptable",
          "Normal, because only the systolic matters",
          "Elevated on the systolic only",
          "Elevated, because BOTH the systolic (138 > 120) and diastolic (92 > 80) exceed the limits",
        ],
        4,
        "Compare each number to its own threshold.",
        "Systolic 138 > 120 AND diastolic 92 > 80, so both exceed the limits — the reading is elevated on both. Averaging the two numbers is not how blood pressure is classified."
      ),
    ],
    commonMistakes: [
      { mistake: "Treating the reading as a fraction or averaging the two numbers.", fix: "Systolic and diastolic are separate pressures; classify each against its own threshold." },
      { mistake: "Classifying on one number only.", fix: "A reading is elevated if EITHER the systolic or diastolic crosses its threshold." },
      { mistake: "Comparing systolic of one reading to diastolic of another.", fix: "Compare systolic↔systolic and diastolic↔diastolic." },
      { mistake: "Mixing up which number is systolic.", fix: "The larger, top number is systolic (heart beating); the smaller, bottom number is diastolic (resting)." },
    ],
    masteryPassMark: 0.8,
  };
}
