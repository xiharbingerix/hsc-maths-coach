import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Use the ratio, rate, or variation rule from this lesson carefully, then simplify.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key rule taught in this lesson before choosing.",
    explanation,
  };
}

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
>;

const ratiosAndRates: LessonContent = {
  description: "Simplify ratios, convert ratios to unit rates, divide a quantity in a given ratio, and compare rates using unit rates.",
  learningIntention: "Solve problems involving ratios and rates by simplifying, dividing quantities, and comparing unit rates.",
  successCriteria: [
    "Simplify a ratio by dividing both parts by the highest common factor.",
    "Calculate a unit rate by dividing the first quantity by the second.",
    "Divide a quantity in a given ratio by finding the total number of parts.",
    "Compare two rates by converting both to unit rates.",
  ],
  teaching: {
    paragraphs: [
      "A ratio compares two quantities of the same kind. The ratio 3:5 means for every 3 parts of one quantity there are 5 parts of the other. Simplify by dividing both parts by their HCF: 12:18 = 2:3.",
      "A rate compares two quantities of different kinds. Speed (km/h), price per litre ($/L), and heart rate (beats/min) are all rates. Find a unit rate by dividing the first quantity by the second: 240 km in 3 hours gives 80 km/h.",
      "To divide a quantity in a ratio a:b, find the total number of parts (a + b), then multiply the quantity by a/(a + b) and b/(a + b) respectively.",
      "To compare two rates (for example, which is better value), convert both to unit rates and compare. The lower unit price indicates the better value.",
    ],
    latexBlocks: [
      "\\text{ratio: }a:b=\\frac{a}{b}",
      "\\text{unit rate: }240\\text{ km}\\div3\\text{ h}=80\\text{ km/h}",
      "\\text{divide in }a:b\\text{ ratio: }\\frac{a}{a+b}\\times\\text{total},\\quad\\frac{b}{a+b}\\times\\text{total}",
    ],
  },
  workedExamples: [
    {
      title: "Simplify a ratio",
      questionLatex: "\\text{Simplify }24:36.",
      steps: [
        { explanation: "Find the HCF of 24 and 36.", latex: "\\text{HCF}(24,36)=12" },
        { explanation: "Divide both parts of the ratio by 12.", latex: "24\\div12=2,\\quad36\\div12=3" },
        { explanation: "Write the simplified ratio.", latex: "24:36=2:3" },
      ],
      finalAnswerLatex: "2:3",
    },
    {
      title: "Compare unit prices to find better value",
      questionLatex: "\\text{A 500 g bag costs }\\$3.50\\text{ and a 750 g bag costs }\\$4.80.\\text{ Which is better value?}",
      steps: [
        { explanation: "Find the unit price (per gram) of the 500 g bag.", latex: "\\frac{\\$3.50}{500}=\\$0.007\\text{ per gram}" },
        { explanation: "Find the unit price (per gram) of the 750 g bag.", latex: "\\frac{\\$4.80}{750}=\\$0.0064\\text{ per gram}" },
        { explanation: "Compare: \\$0.0064 < \\$0.007, so the 750 g bag is better value.", latex: "\\$0.0064<\\$0.007\\Rightarrow\\text{750 g bag is better value}" },
      ],
      finalAnswerLatex: "\\text{750 g bag is better value}",
    },
    {
      title: "Divide a quantity in a given ratio",
      questionLatex: "\\text{Divide }\\$480\\text{ in the ratio }3:5.",
      steps: [
        { explanation: "Find the total number of parts.", latex: "3+5=8\\text{ parts}" },
        { explanation: "Find the value of each part.", latex: "\\$480\\div8=\\$60\\text{ per part}" },
        { explanation: "Multiply each share by the value per part.", latex: "3\\times\\$60=\\$180,\\quad5\\times\\$60=\\$300" },
      ],
      finalAnswerLatex: "\\$180\\text{ and }\\$300",
    },
  ],
  guidedPractice: [
    choice(
      "vrt-rat-g1",
      "What is the HCF of 18 and 24?",
      "B",
      ["3", "6", "9", "12"],
      "The factors of 18 are 1, 2, 3, 6, 9, 18 and of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The highest common factor is 6.",
      "\\text{Find the HCF of 18 and 24.}"
    ),
    choice(
      "vrt-rat-g2",
      "Simplify the ratio 18:24.",
      "A",
      ["3:4", "6:8", "9:12", "2:3"],
      "HCF of 18 and 24 is 6. Dividing both parts by 6 gives 3:4.",
      "\\text{Simplify }18:24."
    ),
    answer(
      "vrt-rat-g3",
      "A car travels 360 km in 4 hours. What is the unit rate in km/h?",
      "\\text{Speed}=\\frac{360\\text{ km}}{4\\text{ h}}",
      "90",
      "360 ÷ 4 = 90 km/h.",
      ["90 km/h", "90km/h"]
    ),
    answer(
      "vrt-rat-g4",
      "Divide $120 in the ratio 1:3. What is the larger share in dollars?",
      "\\text{Divide }\\$120\\text{ in the ratio }1:3.",
      "90",
      "Total parts = 1 + 3 = 4. Each part = $120 ÷ 4 = $30. Larger share = 3 × $30 = $90.",
      ["$90", "90 dollars"]
    ),
  ],
  independentPractice: [
    answer(
      "vrt-rat-i1",
      "Simplify the ratio 30:45. Give your answer in the form a:b (for example, 2:3).",
      "\\text{Simplify }30:45.",
      "2:3",
      "HCF of 30 and 45 is 15. 30 ÷ 15 = 2 and 45 ÷ 15 = 3. Simplified ratio is 2:3."
    ),
    answer(
      "vrt-rat-i2",
      "A 2 L bottle of juice costs $3.60. Find the unit rate in $/L.",
      "\\text{Unit rate: }\\frac{\\$3.60}{2\\text{ L}}",
      "1.80",
      "$3.60 ÷ 2 = $1.80 per litre.",
      ["$1.80", "1.8", "$1.8", "1.80"]
    ),
    answer(
      "vrt-rat-i3",
      "Divide $200 in the ratio 3:7. What is the smaller share in dollars?",
      "\\text{Divide }\\$200\\text{ in the ratio }3:7.",
      "60",
      "Total parts = 10. Each part = $200 ÷ 10 = $20. Smaller share = 3 × $20 = $60.",
      ["$60"]
    ),
    answer(
      "vrt-rat-i4",
      "Simplify the ratio 56:42. Give your answer in the form a:b.",
      "\\text{Simplify }56:42.",
      "4:3",
      "HCF of 56 and 42 is 14. 56 ÷ 14 = 4 and 42 ÷ 14 = 3. Simplified ratio is 4:3."
    ),
    choice(
      "vrt-rat-i5",
      "A 400 g jar of peanut butter costs $4.00 and a 600 g jar costs $5.40. Which is better value?",
      "B",
      ["The 400 g jar", "The 600 g jar", "They are the same value", "Cannot be determined"],
      "Unit price of 400 g jar: $4.00 ÷ 400 = $0.010/g. Unit price of 600 g jar: $5.40 ÷ 600 = $0.009/g. The 600 g jar is cheaper per gram."
    ),
  ],
  commonMistakes: [
    { mistake: "Dividing only one part of the ratio when simplifying.", fix: "Always divide both parts of the ratio by the HCF." },
    { mistake: "Dividing the total by the ratio numbers directly instead of finding parts first.", fix: "Add the ratio numbers to get total parts, find the value of one part, then multiply each share." },
    { mistake: "Confusing a ratio (same units) with a rate (different units).", fix: "A ratio compares same-kind quantities; a rate compares different-kind quantities such as km and hours." },
    { mistake: "Comparing rates without converting to unit rates.", fix: "Always convert to the same unit (e.g., $/g) before comparing." },
  ],
  masteryQuiz: [
    answer(
      "vrt-rat-m1",
      "Simplify the ratio 48:60. Give your answer in the form a:b.",
      "\\text{Simplify }48:60.",
      "4:5",
      "HCF of 48 and 60 is 12. 48 ÷ 12 = 4 and 60 ÷ 12 = 5. Simplified ratio is 4:5."
    ),
    answer(
      "vrt-rat-m2",
      "A machine produces 360 items in 8 hours. What is the unit rate in items per hour?",
      "\\text{Unit rate: }\\frac{360\\text{ items}}{8\\text{ h}}",
      "45",
      "360 ÷ 8 = 45 items per hour.",
      ["45 items/h", "45 items per hour"]
    ),
    choice(
      "vrt-rat-m3",
      "Divide $560 in the ratio 3:4. What is the larger share?",
      "C",
      ["$210", "$240", "$320", "$350"],
      "Total parts = 7. Each part = $560 ÷ 7 = $80. Larger share = 4 × $80 = $320."
    ),
    answer(
      "vrt-rat-m4",
      "Divide $560 in the ratio 3:4. What is the smaller share in dollars?",
      "\\text{Divide }\\$560\\text{ in the ratio }3:4.",
      "240",
      "Total parts = 7. Each part = $560 ÷ 7 = $80. Smaller share = 3 × $80 = $240.",
      ["$240"]
    ),
    answer(
      "vrt-rat-m5",
      "Simplify the ratio 75:100. Give your answer in the form a:b.",
      "\\text{Simplify }75:100.",
      "3:4",
      "HCF of 75 and 100 is 25. 75 ÷ 25 = 3 and 100 ÷ 25 = 4. Simplified ratio is 3:4."
    ),
    choice(
      "vrt-rat-m6",
      "A 250 mL bottle costs $1.50 and a 400 mL bottle costs $2.20. Which is better value?",
      "B",
      ["The 250 mL bottle", "The 400 mL bottle", "They are the same value", "Cannot be determined"],
      "Unit price of 250 mL bottle: $1.50 ÷ 250 = $0.006/mL. Unit price of 400 mL bottle: $2.20 ÷ 400 = $0.0055/mL. The 400 mL bottle is cheaper per mL."
    ),
    answer(
      "vrt-rat-m7",
      "A cyclist completes 84 km in 3.5 hours. What is the average speed in km/h?",
      "\\text{Speed}=\\frac{84\\text{ km}}{3.5\\text{ h}}",
      "24",
      "84 ÷ 3.5 = 24 km/h.",
      ["24 km/h"]
    ),
    answer(
      "vrt-rat-m8",
      "Three friends share prize money of $900 in the ratio 2:3:4. What is the largest share in dollars?",
      "\\text{Divide }\\$900\\text{ in the ratio }2:3:4.",
      "400",
      "Total parts = 2 + 3 + 4 = 9. Each part = $900 ÷ 9 = $100. Largest share = 4 × $100 = $400.",
      ["$400"]
    ),
    answer(
      "vrt-rat-m9",
      "Simplify the ratio 1.2:1.8. Give your answer in the form a:b (whole numbers).",
      "\\text{Simplify }1.2:1.8.",
      "2:3",
      "Multiply both parts by 10 to get 12:18. HCF is 6. 12 ÷ 6 = 2 and 18 ÷ 6 = 3. Simplified ratio is 2:3."
    ),
    choice(
      "vrt-rat-m10",
      "A ratio is simplified to 5:7. The total quantity is 240. What is the larger share?",
      "D",
      ["100", "105", "120", "140"],
      "Total parts = 5 + 7 = 12. Each part = 240 ÷ 12 = 20. Larger share = 7 × 20 = 140.",
      "\\text{Divide 240 in the ratio }5:7."
    ),
  ],
};

const distanceTimeGraphs: LessonContent = {
  description: "Interpret distance-time graphs by identifying speed as gradient, rest periods as horizontal segments, and return journeys as decreasing distance.",
  learningIntention: "Analyse distance-time graphs to determine speed, identify rest periods, and interpret return journeys.",
  successCriteria: [
    "Identify that the gradient of a segment on a distance-time graph equals the speed.",
    "Explain that a horizontal segment means the object is stationary.",
    "Identify a return journey as a segment with decreasing distance.",
    "Calculate the speed for a given segment by dividing the change in distance by the change in time.",
  ],
  teaching: {
    paragraphs: [
      "A distance-time graph shows how distance from a starting point changes over time. The horizontal axis is time (for example, hours) and the vertical axis is distance (for example, kilometres).",
      "The gradient (steepness) of a segment gives the speed: speed = distance ÷ time = rise ÷ run on the graph. A steeper segment means a greater speed.",
      "A horizontal segment (zero gradient) means the object is stationary (speed = 0). A segment with decreasing distance means the object is returning towards the starting point.",
      "Read coordinates from key points — the start of a segment gives the starting distance and time, the end of the segment gives the ending distance and time. Subtract to find the change in distance and the change in time.",
    ],
    latexBlocks: [
      "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}=\\frac{\\Delta d}{\\Delta t}",
      "\\text{horizontal segment: speed}=0",
      "\\text{return journey: distance decreasing}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate speed for each stage of a journey",
      questionLatex: "\\text{A person walks 12 km in 2 h, rests for 1 h, then returns 12 km in 3 h. Find the speed for each stage.}",
      steps: [
        { explanation: "Stage 1: walking 12 km in 2 hours.", latex: "\\text{speed}=\\frac{12\\text{ km}}{2\\text{ h}}=6\\text{ km/h}" },
        { explanation: "Stage 2: resting — distance does not change.", latex: "\\text{speed}=\\frac{0\\text{ km}}{1\\text{ h}}=0\\text{ km/h}" },
        { explanation: "Stage 3: returning 12 km in 3 hours.", latex: "\\text{speed}=\\frac{12\\text{ km}}{3\\text{ h}}=4\\text{ km/h}" },
      ],
      finalAnswerLatex: "6\\text{ km/h},\\;0\\text{ km/h},\\;4\\text{ km/h}",
    },
    {
      title: "Compare speeds for outward and return journeys",
      questionLatex: "\\text{A cyclist travels 30 km in 1.5 h, then returns 30 km in 2 h. Compare the speeds.}",
      steps: [
        { explanation: "Outward speed.", latex: "\\text{speed}=\\frac{30\\text{ km}}{1.5\\text{ h}}=20\\text{ km/h}" },
        { explanation: "Return speed.", latex: "\\text{speed}=\\frac{30\\text{ km}}{2\\text{ h}}=15\\text{ km/h}" },
        { explanation: "Compare: the outward journey is faster.", latex: "20\\text{ km/h}>15\\text{ km/h}" },
      ],
      finalAnswerLatex: "\\text{Outward: }20\\text{ km/h};\\text{ Return: }15\\text{ km/h}",
    },
    {
      title: "Identify the fastest segment",
      questionLatex: "\\text{Segment A: from (0, 0) to (2, 16). Segment B: from (2, 16) to (5, 25). Which is faster?}",
      steps: [
        { explanation: "Calculate the speed for segment A.", latex: "\\text{speed}_A=\\frac{16-0}{2-0}=\\frac{16}{2}=8\\text{ km/h}" },
        { explanation: "Calculate the speed for segment B.", latex: "\\text{speed}_B=\\frac{25-16}{5-2}=\\frac{9}{3}=3\\text{ km/h}" },
        { explanation: "Compare: Segment A has a steeper gradient and greater speed.", latex: "8\\text{ km/h}>3\\text{ km/h}\\Rightarrow\\text{Segment A is faster}" },
      ],
      finalAnswerLatex: "\\text{Segment A is faster}",
    },
  ],
  guidedPractice: [
    choice(
      "vrt-dtg-g1",
      "On a distance-time graph, what does a horizontal segment represent?",
      "B",
      ["The object is moving at constant speed", "The object is stationary", "The object is returning to the start", "The object is accelerating"],
      "A horizontal segment has zero gradient, which means zero speed — the object is not moving."
    ),
    choice(
      "vrt-dtg-g2",
      "A segment on a distance-time graph goes from (0, 0) to (3, 12). What is the speed?",
      "C",
      ["3 km/h", "12 km/h", "4 km/h", "36 km/h"],
      "Speed = distance ÷ time = 12 ÷ 3 = 4 km/h.",
      "\\text{Segment from }(0,0)\\text{ to }(3,12)"
    ),
    answer(
      "vrt-dtg-g3",
      "A person travels 20 km in 4 hours. What is their speed in km/h?",
      "\\text{speed}=\\frac{20\\text{ km}}{4\\text{ h}}",
      "5",
      "20 ÷ 4 = 5 km/h.",
      ["5 km/h"]
    ),
    answer(
      "vrt-dtg-g4",
      "A journey has three stages. The person travels for 2 hours, rests for 1 hour, then travels for 3 hours. What is the total time elapsed in hours?",
      "\\text{Total time}=2+1+3",
      "6",
      "2 + 1 + 3 = 6 hours total.",
      ["6 hours", "6h"]
    ),
  ],
  independentPractice: [
    answer(
      "vrt-dtg-i1",
      "A cyclist travels from (1, 5) to (4, 29) on a distance-time graph (time in hours, distance in km). What is the speed in km/h?",
      "\\text{speed}=\\frac{29-5}{4-1}",
      "8",
      "Change in distance = 29 − 5 = 24 km. Change in time = 4 − 1 = 3 h. Speed = 24 ÷ 3 = 8 km/h.",
      ["8 km/h"]
    ),
    answer(
      "vrt-dtg-i2",
      "A person walks 15 km in 2.5 hours, then rests for 0.5 hours. How far are they from their starting point at the end of the rest?",
      "\\text{Distance during rest stays at }15\\text{ km}",
      "15",
      "During a rest (horizontal segment) the distance from the start does not change. They remain 15 km from the start.",
      ["15 km"]
    ),
    choice(
      "vrt-dtg-i3",
      "A distance-time graph has two segments: Segment P goes from (0, 0) to (2, 10) and Segment Q goes from (2, 10) to (5, 19). Which segment represents the greater speed?",
      "A",
      ["Segment P", "Segment Q", "They are equal", "Cannot be determined"],
      "Speed of P = 10 ÷ 2 = 5 km/h. Speed of Q = (19 − 10) ÷ (5 − 2) = 9 ÷ 3 = 3 km/h. Segment P is steeper and faster."
    ),
    answer(
      "vrt-dtg-i4",
      "A car leaves home and travels 60 km in 1.5 hours, then returns home in 2 hours. What is the speed of the return journey in km/h?",
      "\\text{Return speed}=\\frac{60\\text{ km}}{2\\text{ h}}",
      "30",
      "60 ÷ 2 = 30 km/h.",
      ["30 km/h"]
    ),
    answer(
      "vrt-dtg-i5",
      "On a distance-time graph, the outward journey takes 3 hours and covers 24 km. What is the outward speed in km/h?",
      "\\text{speed}=\\frac{24\\text{ km}}{3\\text{ h}}",
      "8",
      "24 ÷ 3 = 8 km/h.",
      ["8 km/h"]
    ),
  ],
  commonMistakes: [
    { mistake: "Reading the height of a point as the speed instead of calculating the gradient.", fix: "Speed is the gradient (rise ÷ run), not the y-coordinate." },
    { mistake: "Thinking a steeper downward slope means the object slows down.", fix: "A steeper slope (in either direction) means a greater speed. Decreasing distance means the object is returning." },
    { mistake: "Forgetting that a horizontal segment means speed is zero, not that the object has stopped permanently.", fix: "A horizontal segment means the object is stationary for that time interval only." },
    { mistake: "Subtracting time values in the wrong order or using total time instead of the segment's time interval.", fix: "Use the time and distance values at the start and end of the specific segment." },
  ],
  masteryQuiz: [
    choice(
      "vrt-dtg-m1",
      "On a distance-time graph, which segment represents the fastest speed?",
      "A",
      ["The steepest segment", "The longest segment", "The horizontal segment", "The segment closest to the origin"],
      "Speed equals the gradient. The steepest segment has the greatest gradient and therefore the greatest speed."
    ),
    answer(
      "vrt-dtg-m2",
      "A runner goes from (0, 0) to (0.5, 6) on a distance-time graph (time in hours, distance in km). What is the speed in km/h?",
      "\\text{speed}=\\frac{6}{0.5}",
      "12",
      "6 ÷ 0.5 = 12 km/h.",
      ["12 km/h"]
    ),
    choice(
      "vrt-dtg-m3",
      "A distance-time graph shows distance decreasing over time. What does this mean?",
      "B",
      ["The object is stationary", "The object is returning towards the starting point", "The object is speeding up", "The object has reached its destination"],
      "Decreasing distance means the object is getting closer to where it started — it is travelling back towards the starting point."
    ),
    answer(
      "vrt-dtg-m4",
      "A person walks 18 km in 3 hours, rests for 1 hour, then returns home in 4.5 hours. What is the speed during the return journey in km/h?",
      "\\text{Return speed}=\\frac{18\\text{ km}}{4.5\\text{ h}}",
      "4",
      "18 ÷ 4.5 = 4 km/h.",
      ["4 km/h"]
    ),
    answer(
      "vrt-dtg-m5",
      "A person walks 18 km in 3 hours, rests for 1 hour, then walks home. What is the total distance travelled in km?",
      "\\text{Total distance}=18+18",
      "36",
      "The person walks 18 km out and then 18 km back, for a total of 36 km.",
      ["36 km"]
    ),
    answer(
      "vrt-dtg-m6",
      "A segment on a distance-time graph goes from (2, 30) to (5, 30). How long does the object rest for in hours?",
      "\\Delta t=5-2",
      "3",
      "The distance stays constant from t = 2 to t = 5. The rest lasts 5 − 2 = 3 hours.",
      ["3 hours", "3h"]
    ),
    answer(
      "vrt-dtg-m7",
      "A car travels from (0, 0) to (3, 120) then from (3, 120) to (5, 160) on a distance-time graph (time in hours, distance in km). What is the speed in the second segment in km/h?",
      "\\text{speed}=\\frac{160-120}{5-3}",
      "20",
      "Change in distance = 160 − 120 = 40 km. Change in time = 5 − 3 = 2 h. Speed = 40 ÷ 2 = 20 km/h.",
      ["20 km/h"]
    ),
    answer(
      "vrt-dtg-m8",
      "Using the same graph: what is the speed in the first segment (from (0, 0) to (3, 120)) in km/h?",
      "\\text{speed}=\\frac{120}{3}",
      "40",
      "120 ÷ 3 = 40 km/h.",
      ["40 km/h"]
    ),
    choice(
      "vrt-dtg-m9",
      "A journey has segments with speeds 6 km/h, 0 km/h, and 9 km/h. In which order did the segments occur if the person left home, rested, then continued?",
      "A",
      ["6 km/h, then 0 km/h, then 9 km/h", "9 km/h, then 0 km/h, then 6 km/h", "0 km/h, then 6 km/h, then 9 km/h", "6 km/h, then 9 km/h, then 0 km/h"],
      "The person travels first (6 km/h), then rests (0 km/h), then continues (9 km/h). The rest comes between the two travel segments."
    ),
    answer(
      "vrt-dtg-m10",
      "A distance-time graph shows a segment from (1, 8) to (4, 8) followed by a segment from (4, 8) to (6, 0). How far from the start is the object at the end?",
      "\\text{Final distance}=0\\text{ km}",
      "0",
      "The final segment ends at distance 0, meaning the object has returned to the starting point.",
      ["0 km"]
    ),
  ],
};

const directVariation: LessonContent = {
  description: "Identify direct variation relationships (y = kx), find the constant of variation, and use the equation to solve problems.",
  learningIntention: "Recognise and use direct variation relationships by finding the constant of proportionality and writing the variation equation.",
  successCriteria: [
    "Identify a direct variation relationship from an equation, table, or graph.",
    "Find the constant of variation k by calculating y/x from a known pair of values.",
    "Write the direct variation equation y = kx.",
    "Use the equation to find unknown values.",
  ],
  teaching: {
    paragraphs: [
      "Two quantities are in direct variation if y = kx, where k is the constant of variation (also called the constant of proportionality). As x increases, y increases by the same factor.",
      "If y varies directly with x, the ratio y/x is always equal to k. Find k by substituting any known pair of values: k = y/x.",
      "Once k is known, write the equation y = kx and use it to find unknown values. If y = 4.5 when x = 3, then k = 1.5 and the equation is y = 1.5x.",
      "On a graph, direct variation is a straight line through the origin. A table showing direct variation has a constant ratio y/x across all entries.",
    ],
    latexBlocks: [
      "y=kx",
      "k=\\frac{y}{x}",
      "\\text{check: does the graph pass through }(0,0)?",
    ],
  },
  workedExamples: [
    {
      title: "Find k and the equation, then solve",
      questionLatex: "y\\text{ varies directly with }x.\\text{ When }x=4,\\,y=12.\\text{ Find }k,\\text{ the equation, and }y\\text{ when }x=7.",
      steps: [
        { explanation: "Find k by dividing y by x.", latex: "k=\\frac{y}{x}=\\frac{12}{4}=3" },
        { explanation: "Write the direct variation equation.", latex: "y=3x" },
        { explanation: "Substitute x = 7 to find y.", latex: "y=3\\times7=21" },
      ],
      finalAnswerLatex: "k=3,\\quad y=3x,\\quad y=21\\text{ when }x=7",
    },
    {
      title: "Write a variation equation for a real-world context",
      questionLatex: "\\text{A car uses 8 litres per 100 km. Write the variation equation for litres }L\\text{ used over }d\\text{ km. Find }L\\text{ for 350 km.}",
      steps: [
        { explanation: "Find k: the car uses 8 L per 100 km, so k = 8/100 = 0.08 L/km.", latex: "k=\\frac{8}{100}=0.08" },
        { explanation: "Write the equation.", latex: "L=0.08d" },
        { explanation: "Substitute d = 350.", latex: "L=0.08\\times350=28\\text{ litres}" },
      ],
      finalAnswerLatex: "L=0.08d;\\quad L=28\\text{ litres for 350 km}",
    },
    {
      title: "Check whether a table shows direct variation",
      questionLatex: "\\text{Does the table show direct variation? }x: 2,4,6,8\\quad y: 5,10,15,20",
      steps: [
        { explanation: "Calculate y/x for each pair.", latex: "\\frac{5}{2}=2.5,\\quad\\frac{10}{4}=2.5,\\quad\\frac{15}{6}=2.5,\\quad\\frac{20}{8}=2.5" },
        { explanation: "The ratio y/x is constant at 2.5 for every pair.", latex: "k=2.5\\text{ (constant)}" },
        { explanation: "Since y/x is constant, this is direct variation with k = 2.5.", latex: "y=2.5x" },
      ],
      finalAnswerLatex: "\\text{Yes, direct variation with }k=2.5",
    },
  ],
  guidedPractice: [
    choice(
      "vrt-dir-g1",
      "Which of the following equations represents direct variation?",
      "B",
      ["$y = 3x + 2$", "$y = 5x$", "$y = x^2$", "$y = \\dfrac{3}{x}$"],
      "Direct variation has the form y = kx. Only y = 5x passes through the origin with a constant ratio.",
      "\\text{Identify the direct variation equation.}"
    ),
    answer(
      "vrt-dir-g2",
      "y varies directly with x. When x = 3, y = 12. Find the constant of variation k.",
      "k=\\frac{y}{x}=\\frac{12}{3}",
      "4",
      "k = 12 ÷ 3 = 4.",
      ["k = 4"]
    ),
    answer(
      "vrt-dir-g3",
      "Using k = 4, write the direct variation equation. What is y when x = 6?",
      "y=4x,\\quad x=6",
      "24",
      "y = 4 × 6 = 24.",
      ["y = 24"]
    ),
    choice(
      "vrt-dir-g4",
      "A table has entries x: 1, 2, 3 and y: 4, 8, 12. Is this direct variation?",
      "A",
      ["Yes, because y/x = 4 for every pair", "No, because y increases by 4 each time", "Yes, because x increases by 1 each time", "No, because the values are not equal"],
      "y/x = 4/1 = 4, 8/2 = 4, 12/3 = 4. The ratio is constant, confirming direct variation with k = 4.",
      "\\text{x: 1, 2, 3}\\quad\\text{y: 4, 8, 12}"
    ),
  ],
  independentPractice: [
    answer(
      "vrt-dir-i1",
      "y varies directly with x. When x = 5, y = 35. Find the constant of variation k.",
      "k=\\frac{35}{5}",
      "7",
      "k = 35 ÷ 5 = 7.",
      ["k = 7"]
    ),
    answer(
      "vrt-dir-i2",
      "y varies directly with x, and k = 2.5. Find y when x = 8.",
      "y=2.5\\times8",
      "20",
      "y = 2.5 × 8 = 20."
    ),
    answer(
      "vrt-dir-i3",
      "y varies directly with x, and k = 6. Find x when y = 42.",
      "42=6x",
      "7",
      "x = 42 ÷ 6 = 7."
    ),
    choice(
      "vrt-dir-i4",
      "A graph of y against x is a straight line that does NOT pass through the origin. Does this represent direct variation?",
      "B",
      ["Yes, because it is a straight line", "No, because direct variation must pass through the origin", "Yes, because the gradient is constant", "No, because the gradient is not constant"],
      "Direct variation requires y = kx, which always passes through (0, 0). A line not through the origin has the form y = kx + c with c ≠ 0, which is not direct variation."
    ),
    answer(
      "vrt-dir-i5",
      "A table shows x: 3, 6, 9 and y: 7.5, 15, 22.5. Find the constant of variation k.",
      "k=\\frac{7.5}{3}",
      "2.5",
      "y/x = 7.5/3 = 2.5. Check: 15/6 = 2.5 and 22.5/9 = 2.5. So k = 2.5.",
      ["k = 2.5"]
    ),
  ],
  commonMistakes: [
    { mistake: "Confusing y = kx (direct variation) with y = kx + c (linear but not direct variation).", fix: "Direct variation must pass through the origin. If there is a non-zero y-intercept, it is not direct variation." },
    { mistake: "Finding k by dividing x by y instead of y by x.", fix: "The constant of variation is k = y/x, not x/y." },
    { mistake: "Using a single pair of values to 'check' for direct variation without testing the ratio across all pairs.", fix: "Check that y/x is the same constant for every pair of values in the table." },
    { mistake: "Thinking that if y increases as x increases, it must be direct variation.", fix: "Direct variation requires a constant ratio y/x = k, not just that both quantities increase together." },
  ],
  masteryQuiz: [
    answer(
      "vrt-dir-m1",
      "y varies directly with x. When x = 6, y = 42. Find k.",
      "k=\\frac{42}{6}",
      "7",
      "k = 42 ÷ 6 = 7.",
      ["k = 7"]
    ),
    answer(
      "vrt-dir-m2",
      "y varies directly with x, and k = 7. Find y when x = 11.",
      "y=7\\times11",
      "77",
      "y = 7 × 11 = 77."
    ),
    choice(
      "vrt-dir-m3",
      "A table has entries: x: 2, 4, 7 and y: 6, 12, 20. Is this direct variation?",
      "B",
      ["Yes, because y is always larger than x", "No, because y/x is not constant", "Yes, because y increases as x increases", "No, because x is not starting at 1"],
      "Check ratios: 6/2 = 3, 12/4 = 3, 20/7 ≈ 2.86. The ratio is not constant, so this is not direct variation.",
      "\\text{x: 2, 4, 7}\\quad\\text{y: 6, 12, 20}"
    ),
    answer(
      "vrt-dir-m4",
      "y varies directly with x. When x = 9, y = 63. Find x when y = 49.",
      "k=\\frac{63}{9}=7,\\quad 49=7x",
      "7",
      "k = 63 ÷ 9 = 7. Then x = 49 ÷ 7 = 7."
    ),
    answer(
      "vrt-dir-m5",
      "A spring stretches 12 cm when a 3 kg mass is attached. Assuming direct variation, how far will it stretch for a 7 kg mass? Answer in cm.",
      "k=\\frac{12}{3}=4,\\quad d=4\\times7",
      "28",
      "k = 12 ÷ 3 = 4 cm/kg. For 7 kg: d = 4 × 7 = 28 cm.",
      ["28 cm"]
    ),
    choice(
      "vrt-dir-m6",
      "Which of the following is a correct statement about direct variation?",
      "C",
      [
        "The ratio x/y is constant",
        "The graph is any straight line",
        "Doubling x also doubles y",
        "y/x increases as x increases",
      ],
      "In direct variation y = kx, if x doubles then y = k(2x) = 2kx = 2y, so y also doubles. The constant ratio is y/x = k, and the graph must pass through the origin."
    ),
    answer(
      "vrt-dir-m7",
      "y varies directly with x, and y = 8.4 when x = 3. Find y when x = 5.",
      "k=\\frac{8.4}{3}=2.8,\\quad y=2.8\\times5",
      "14",
      "k = 8.4 ÷ 3 = 2.8. y = 2.8 × 5 = 14."
    ),
    answer(
      "vrt-dir-m8",
      "A car uses fuel at a rate of 9 L per 100 km (direct variation). How many litres are needed for 450 km?",
      "k=0.09,\\quad L=0.09\\times450",
      "40.5",
      "k = 9/100 = 0.09 L/km. L = 0.09 × 450 = 40.5 litres.",
      ["40.5 litres", "40.5 L"]
    ),
    answer(
      "vrt-dir-m9",
      "y = kx and the graph passes through (5, 35). Write the equation for y in terms of x.",
      "k=\\frac{35}{5}=7,\\quad y=7x",
      "y=7x",
      "k = 35 ÷ 5 = 7. The equation is y = 7x.",
      ["y = 7x"]
    ),
    choice(
      "vrt-dir-m10",
      "The cost C of petrol varies directly with the number of litres L purchased. When L = 40, C = $68. What is the cost for 55 litres?",
      "D",
      ["$85.00", "$88.00", "$91.00", "$93.50"],
      "k = 68/40 = 1.70 per litre. C = 1.70 × 55 = $93.50.",
      "\\text{Find }C\\text{ when }L=55."
    ),
  ],
};

const lessons: Record<string, LessonContent> = {
  "ratios-and-rates": ratiosAndRates,
  "distance-time-graphs": distanceTimeGraphs,
  "direct-variation": directVariation,
};

export function year9VariationRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced"].includes(course.slug) ||
    unit.slug !== "variation-rates"
  ) {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
