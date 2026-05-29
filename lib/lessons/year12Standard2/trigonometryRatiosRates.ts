import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson } from "../differentialCalculus";
import { practicalChoice, measurementAnswer } from "../questionHelpers";
export function year12Standard2TrigRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "trigonometry-ratios-rates"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "non-right-angled-trigonometry") {
    return {
      ...base,
      description:
        "Choose sine rule or cosine rule for practical non-right-angled triangle problems in surveying and navigation contexts.",
      learningIntention:
        "Identify non-right-angled triangle information and choose an appropriate trigonometric rule.",
      successCriteria: [
        "Recognise when a triangle is not right-angled.",
        "Choose cosine rule when two sides and the included angle are known.",
        "Choose sine rule when a matching side-angle pair is known.",
        "Check whether side and angle answers are reasonable in context.",
      ],
      teaching: {
        paragraphs: [
          "Many Standard 2 measurement problems involve triangles that are not right-angled. These can come from surveying land, locating a drone, finding distances between towns, or measuring a triangular park.",
          "Right-angled trigonometry is only suitable when the triangle has a 90-degree angle. If there is no right angle, first decide whether the sine rule or cosine rule matches the information given.",
          "Use the cosine rule when two sides and the included angle are known, or when all three sides are known and an angle is required.",
          "Use the sine rule when you have a matching side-angle pair and need another side or angle.",
          "A measurement answer should be checked for reasonableness. A side length cannot be negative, and the largest side should be opposite the largest angle.",
        ],
        latexBlocks: [
          "\\text{cosine rule: }c^2=a^2+b^2-2ab\\cos C",
          "\\text{sine rule: }\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
          "\\text{included angle}=\\text{angle between the two known sides}",
        ],
      },
      workedExamples: [
        {
          title: "Select the correct rule for a surveying triangle",
          questionLatex:
            "\\text{A triangular field has sides }48\\text{ m and }62\\text{ m with included angle }37^\\circ.",
          steps: [
            {
              explanation:
                "The angle is between the two known sides, and the required side is opposite the included angle.",
            },
            {
              explanation:
                "This matches the cosine rule.",
              latex: "c^2=a^2+b^2-2ab\\cos C",
            },
          ],
          finalAnswerLatex: "\\text{Use the cosine rule.}",
        },
        {
          title: "Use cosine rule for a distance",
          questionLatex:
            "a=48,\\quad b=62,\\quad C=37^\\circ",
          steps: [
            {
              explanation:
                "Substitute the two sides and included angle into the cosine rule.",
              latex: "c^2=48^2+62^2-2(48)(62)\\cos37^\\circ",
            },
            {
              explanation: "Take the square root and round to one decimal place.",
              latex: "c=37.3\\text{ m}",
            },
          ],
          finalAnswerLatex: "37.3\\text{ m}",
        },
        {
          title: "Use sine rule when a matching pair is known",
          questionLatex:
            "\\text{In a navigation triangle, }a=80\\text{ m is opposite }35^\\circ.\\text{ Find }b\\text{ opposite }50^\\circ.",
          steps: [
            {
              explanation:
                "A matching side-angle pair is known, so the sine rule is appropriate.",
              latex: "\\frac{b}{\\sin50^\\circ}=\\frac{80}{\\sin35^\\circ}",
            },
            {
              explanation:
                "Solve for b and round to one decimal place.",
              latex: "b=\\frac{80\\sin50^\\circ}{\\sin35^\\circ}=106.8\\text{ m}",
            },
          ],
          finalAnswerLatex: "106.8\\text{ m}",
        },
      ],
      guidedPractice: [
        practicalChoice("y12s2-trig-g1", "A triangular park has two known sides and the included angle. Which rule is most appropriate for the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent only", "Ratio sharing"], "Two sides and the included angle match the cosine rule."),
        practicalChoice("y12s2-trig-g2", "A drone problem gives one side with its opposite angle and asks for another side. Which rule is most appropriate?", "A", ["Sine rule", "Cosine rule", "Speed formula", "Unit conversion"], "A matching side-angle pair points to the sine rule."),
        measurementAnswer("y12s2-trig-g3", "A triangular field has sides 30 m and 40 m with included angle 60 degrees. Use the cosine rule to find the third side to 1 decimal place.", "\\sqrt{30^2+40^2-2(30)(40)\\cos60^\\circ}", "36.1 m", ["36.1", "36.1m"]),
        practicalChoice("y12s2-trig-g4", "A student uses right-angle trigonometry in a triangle with angles 42, 58 and 80 degrees. What is the issue?", "C", ["The answer must be in kilometres", "The triangle is impossible", "There is no right angle", "The ratio must be simplified"], "Right-angle trigonometry needs a 90-degree angle."),
      ],
      independentPractice: [
        practicalChoice("y12s2-trig-i1", "A boat survey gives side 120 m opposite 42 degrees and asks for a side opposite 58 degrees. Which rule should be used?", "A", ["Sine rule", "Cosine rule", "Pythagoras only", "Fuel consumption"], "A known opposite side-angle pair is available."),
        measurementAnswer("y12s2-trig-i2", "A triangular paddock has sides 55 m and 70 m with included angle 40 degrees. Find the third side to 1 decimal place.", "\\sqrt{55^2+70^2-2(55)(70)\\cos40^\\circ}", "45.0 m", ["45", "45.0", "45 m", "45.0m"]),
        measurementAnswer("y12s2-trig-i3", "A tower guide rope forms a triangle where 90 m is opposite 35 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{90\\sin48^\\circ}{\\sin35^\\circ}", "116.6 m", ["116.6", "116.6m"]),
        practicalChoice("y12s2-trig-i4", "In a triangle, the largest angle should be opposite:", "D", ["The shortest side", "The first side listed", "The included angle only", "The longest side"], "The largest side is opposite the largest angle."),
        practicalChoice("y12s2-trig-i5", "A non-right-angled triangle has all three sides known and an angle is required. Which rule is most appropriate?", "B", ["Sine rule first", "Cosine rule", "Speed formula", "Area formula only"], "Cosine rule can find an angle from three sides."),
      ],
      commonMistakes: [
        { mistake: "Using right-angled trigonometry when there is no right angle.", fix: "Check for a 90-degree angle before using SOH-CAH-TOA." },
        { mistake: "Choosing sine rule without a matching side-angle pair.", fix: "Use sine rule only when an opposite side-angle pair is known." },
        { mistake: "Missing that the known angle is included between two sides.", fix: "Use cosine rule for two sides and the included angle." },
        { mistake: "Accepting an unreasonable side length.", fix: "Check that the largest side is opposite the largest angle and units make sense." },
      ],
      masteryQuiz: [
        practicalChoice("y12s2-trig-m1", "A triangle has sides 48 m and 62 m with included angle 37 degrees. Which rule finds the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent", "Average speed"], "Two sides and included angle use cosine rule."),
        practicalChoice("y12s2-trig-m2", "A known side is paired with its opposite angle, and another side is required. Use:", "A", ["Sine rule", "Cosine rule", "Area formula", "Scale factor"], "This is a sine rule setup."),
        measurementAnswer("y12s2-trig-m3", "A triangular park has sides 20 m and 25 m with included angle 60 degrees. Find the third side to 1 decimal place.", "a=20\\text{ m},\\quad b=25\\text{ m},\\quad C=60°", "22.9 m", ["22.9", "22.9m"]),
        measurementAnswer("y12s2-trig-m4", "A survey triangle has side 70 m opposite 40 degrees. Find the side opposite 55 degrees to 1 decimal place.", "a=70\\text{ m},\\quad A=40°,\\quad B=55°", "89.2 m", ["89.2", "89.2m"]),
        practicalChoice("y12s2-trig-m5", "A triangle has angles 50, 60 and 70 degrees. Right-angled trigonometry is:", "C", ["Appropriate because there are angles", "Always exact", "Not appropriate because there is no 90-degree angle", "The same as ratio sharing"], "There is no right angle."),
        practicalChoice("y12s2-trig-m6", "A cosine-rule side question needs:", "D", ["A frequency table", "A matching side-angle pair only", "A speed and time", "Two sides and the included angle"], "Cosine rule fits two sides and included angle."),
        measurementAnswer("y12s2-trig-m7", "A drone triangle has 100 m opposite 30 degrees. Find the side opposite 45 degrees to 1 decimal place.", "a=100\\text{ m},\\quad A=30°,\\quad B=45°", "141.4 m", ["141.4", "141.4m"]),
        practicalChoice("y12s2-trig-m8", "A side answer of -12 m in a triangle distance problem is:", "A", ["Unreasonable", "Always correct", "A bearing", "A ratio"], "Distances cannot be negative."),
        practicalChoice("y12s2-trig-m9", "A triangle has all three sides known and an angle is required. Use:", "B", ["Sine rule only", "Cosine rule", "Flow rate", "Map scale"], "Cosine rule can find an angle from three sides."),
        practicalChoice("y12s2-trig-m10", "Before choosing a trig rule, first identify:", "C", ["The student's name", "The calculator brand", "Known sides and angles", "The currency"], "Rule choice depends on the given sides and angles."),
      ],
    };
  }

  if (lesson.slug === "sine-rule-cosine-rule-area-triangle") {
    return {
      ...base,
      description:
        "Apply sine rule, cosine rule, and the triangular area formula to practical distance and land-area problems.",
      learningIntention:
        "Calculate practical side lengths, angles, and triangular areas using non-right-angled trigonometry.",
      successCriteria: [
        "Use sine rule for side and angle calculations when a matching pair is known.",
        "Use cosine rule for side and angle calculations in appropriate triangles.",
        "Use the triangular area formula when two sides and the included angle are known.",
        "Round and report answers with sensible units.",
      ],
      teaching: {
        paragraphs: [
          "The sine rule, cosine rule, and area formula are the main tools for non-right-angled triangle problems. The correct formula depends on what information is given.",
          "The sine rule is useful when a side and its opposite angle are known. It can find another side or another angle.",
          "The cosine rule is useful for finding a side from two sides and the included angle, or finding an angle from three sides.",
          "The triangular area formula finds the area when two sides and the included angle are known. This is common in land, park, field, and survey contexts.",
        ],
        latexBlocks: [
          "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
          "c^2=a^2+b^2-2ab\\cos C",
          "A=\\frac{1}{2}ab\\sin C",
        ],
      },
      workedExamples: [
        {
          title: "Use sine rule in a distance context",
          questionLatex:
            "\\text{A boat is }80\\text{ m from point A, opposite }35^\\circ.\\text{ Find the side opposite }50^\\circ.",
          steps: [
            {
              explanation: "Set up the sine rule using the known matching pair.",
              latex: "\\frac{x}{\\sin50^\\circ}=\\frac{80}{\\sin35^\\circ}",
            },
            {
              explanation: "Solve for x.",
              latex: "x=106.8\\text{ m}",
            },
          ],
          finalAnswerLatex: "106.8\\text{ m}",
        },
        {
          title: "Use cosine rule in a distance context",
          questionLatex:
            "\\text{Two tracks of }48\\text{ m and }62\\text{ m meet at }37^\\circ.",
          steps: [
            {
              explanation:
                "The unknown distance between the track ends is opposite the included angle.",
              latex: "c^2=48^2+62^2-2(48)(62)\\cos37^\\circ",
            },
            {
              explanation: "Take the square root.",
              latex: "c=37.3\\text{ m}",
            },
          ],
          finalAnswerLatex: "37.3\\text{ m}",
        },
        {
          title: "Find the area of a triangular park",
          questionLatex:
            "\\text{A park has sides }48\\text{ m and }62\\text{ m with included angle }37^\\circ.",
          steps: [
            {
              explanation:
                "Use the area formula for two sides and the included angle.",
              latex: "A=\\frac{1}{2}(48)(62)\\sin37^\\circ",
            },
            {
              explanation: "Calculate and round to the nearest square metre.",
              latex: "A=895\\text{ m}^2",
            },
          ],
          finalAnswerLatex: "895\\text{ m}^2",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-sca-g1", "A navigation triangle has side 60 m opposite 32 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{60\\sin48^\\circ}{\\sin32^\\circ}", "84.1 m", ["84.1", "84.1m"]),
        measurementAnswer("y12s2-sca-g2", "A triangular park has sides 48 m and 62 m with included angle 37 degrees. Find its area to the nearest square metre.", "\\frac12(48)(62)\\sin37^\\circ", "895 m^2", ["895", "895m^2", "895 m2"]),
        practicalChoice("y12s2-sca-g3", "A triangle has three side lengths and an angle is required. Which formula is most appropriate?", "B", ["Sine rule", "Cosine rule", "Area formula only", "Speed formula"], "Cosine rule can find angles from three sides."),
        measurementAnswer("y12s2-sca-g4", "A field has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\sqrt{35^2+50^2-2(35)(50)\\cos60^\\circ}", "43.6 m", ["43.6", "43.6m"]),
      ],
      independentPractice: [
        measurementAnswer("y12s2-sca-i1", "A drone triangle has side 120 m opposite 42 degrees. Find the side opposite 58 degrees to 1 decimal place.", "\\frac{120\\sin58^\\circ}{\\sin42^\\circ}", "152.1 m", ["152.1", "152.1m"]),
        measurementAnswer("y12s2-sca-i2", "A triangular lot has sides 80 m and 95 m with included angle 52 degrees. Find the third side to 1 decimal place.", "\\sqrt{80^2+95^2-2(80)(95)\\cos52^\\circ}", "75.8 m", ["75.8", "75.8m"]),
        measurementAnswer("y12s2-sca-i3", "A triangular park has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "\\frac12(30)(45)\\sin70^\\circ", "634 m^2", ["634", "634m^2", "634 m2"]),
        practicalChoice("y12s2-sca-i4", "Which information is needed for A = 1/2 ab sin C?", "A", ["Two sides and the included angle", "Only one side", "Speed and time", "A ratio and total only"], "The area formula uses two sides and their included angle."),
        practicalChoice("y12s2-sca-i5", "A student rounds every trig value to 1 decimal place before finishing. What is the risk?", "D", ["No risk", "The triangle disappears", "It proves causation", "The final answer may be less accurate"], "Rounding too early can affect the final answer."),
      ],
      commonMistakes: [
        { mistake: "Using the wrong angle in the area formula.", fix: "Use the included angle between the two known sides." },
        { mistake: "Using cosine rule when a matching sine-rule pair is simpler.", fix: "Look for a known side and its opposite angle." },
        { mistake: "Forgetting square root after finding c squared.", fix: "Take the square root to get the side length." },
        { mistake: "Leaving out units.", fix: "Use metres for length and square metres for area." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-sca-m1", "A triangle has side 40 m opposite 30 degrees. Find the side opposite 45 degrees to 1 decimal place.", "a=40\\text{ m},\\quad A=30°,\\quad B=45°", "56.6 m", ["56.6", "56.6m"]),
        measurementAnswer("y12s2-sca-m2", "A triangular field has sides 25 m and 40 m with included angle 50 degrees. Find the third side to 1 decimal place.", "a=25\\text{ m},\\quad b=40\\text{ m},\\quad C=50°", "31.2 m", ["31.2", "31.2m"]),
        measurementAnswer("y12s2-sca-m3", "A triangular garden has sides 20 m and 30 m with included angle 60 degrees. Find the area to the nearest square metre.", "a=20\\text{ m},\\quad b=30\\text{ m},\\quad C=60°", "260 m^2", ["260", "260m^2", "260 m2"]),
        practicalChoice("y12s2-sca-m4", "The sine rule is most useful when:", "A", ["A matching side-angle pair is known", "Only a speed is known", "Only area is required", "No angles are known"], "Sine rule relies on opposite side-angle pairs."),
        practicalChoice("y12s2-sca-m5", "The cosine rule is most useful for a side when:", "C", ["There is a frequency table", "Only ratios are known", "Two sides and the included angle are known", "The triangle is a box plot"], "Cosine rule fits SAS information."),
        measurementAnswer("y12s2-sca-m6", "A park triangle has sides 50 m and 70 m with included angle 40 degrees. Find its area to the nearest square metre.", "a=50\\text{ m},\\quad b=70\\text{ m},\\quad C=40°", "1125 m^2", ["1125", "1,125", "1125m^2", "1125 m2"]),
        measurementAnswer("y12s2-sca-m7", "A rescue boat triangle has side 90 m opposite 35 degrees. Find the side opposite 55 degrees to 1 decimal place.", "a=90\\text{ m},\\quad A=35°,\\quad B=55°", "128.5 m", ["128.5", "128.5m"]),
        measurementAnswer("y12s2-sca-m8", "A triangular sign has sides 1.2 m and 1.5 m with included angle 45 degrees. Find its area to 2 decimal places.", "a=1.2\\text{ m},\\quad b=1.5\\text{ m},\\quad C=45°", "0.64 m^2", ["0.64", "0.64m^2", "0.64 m2"]),
        practicalChoice("y12s2-sca-m9", "If a side is found using c^2 = 144, the side length is:", "B", ["144", "12", "72", "-144"], "Take the square root of c squared."),
        practicalChoice("y12s2-sca-m10", "An area answer for a triangular field should use:", "D", ["metres only", "kilometres per hour", "degrees", "square metres"], "Area is measured in square units."),
      ],
    };
  }

  if (lesson.slug === "ratios-rates-unit-conversions") {
    return {
      ...base,
      description:
        "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
      learningIntention:
        "Solve practical ratio, rate, and unit conversion questions using clear units and sensible methods.",
      successCriteria: [
        "Simplify and use ratios in practical sharing problems.",
        "Calculate average speed using consistent time units.",
        "Convert units in rates such as km/h, L/min, L per 100 km, and map scale.",
        "Interpret practical rates and choose reasonable answers.",
      ],
      teaching: {
        paragraphs: [
          "A ratio compares quantities of the same kind. In a sharing problem, add the parts in the ratio, find the value of one part, then multiply by the required number of parts.",
          "A rate compares different units, such as kilometres per hour, litres per minute, dollars per kilogram, or litres per 100 kilometres.",
          "Speed is a rate. Before calculating speed, convert time into hours if the answer must be in km/h.",
          "Unit conversions are part of many rate questions. Minutes to hours, metres to kilometres, litres to millilitres, and map scale conversions all need careful units.",
        ],
        latexBlocks: [
          "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}",
          "\\text{one part}=\\frac{\\text{total}}{\\text{sum of ratio parts}}",
          "\\text{fuel use per }100\\text{ km}=\\frac{\\text{litres}}{\\text{distance}}\\times100",
        ],
      },
      workedExamples: [
        {
          title: "Share an amount in a ratio",
          questionLatex:
            "\\text{A prize of }\\$240\\text{ is shared in the ratio }3:5.",
          steps: [
            {
              explanation: "Add the parts in the ratio.",
              latex: "3+5=8",
            },
            {
              explanation: "Find one part and then each share.",
              latex: "240\\div8=30,\\quad 3\\times30=90,\\quad 5\\times30=150",
            },
          ],
          finalAnswerLatex: "\\$90\\text{ and }\\$150",
        },
        {
          title: "Calculate average speed with time conversion",
          questionLatex:
            "\\text{A car travels }168\\text{ km in }2\\text{ h }20\\text{ min.}",
          steps: [
            {
              explanation: "Convert 20 minutes to one third of an hour.",
              latex: "2\\text{ h }20\\text{ min}=2+\\frac{20}{60}=2.333\\ldots\\text{ h}",
            },
            {
              explanation: "Divide distance by time.",
              latex: "168\\div2.333\\ldots=72",
            },
          ],
          finalAnswerLatex: "72\\text{ km/h}",
        },
        {
          title: "Convert and compare a practical rate",
          questionLatex:
            "\\text{A pump fills }450\\text{ L in }15\\text{ min.}",
          steps: [
            {
              explanation: "Divide litres by minutes.",
              latex: "450\\div15=30",
            },
          ],
          finalAnswerLatex: "30\\text{ L/min}",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-rate-g1", "A prize of 240 dollars is shared in the ratio 3:5. What is the larger share?", "240\\div8\\times5", "$150", ["150", "150.00", "$150.00"]),
        measurementAnswer("y12s2-rate-g2", "A car travels 168 km in 2 h 20 min. Find the average speed in km/h.", "168\\div\\left(2+\\dfrac{20}{60}\\right)", "72 km/h", ["72", "72km/h", "72 kmh"]),
        measurementAnswer("y12s2-rate-g3", "A pump fills 450 L in 15 min. Find the flow rate in L/min.", "450\\div15", "30 L/min", ["30", "30L/min", "30 L per min"]),
        practicalChoice("y12s2-rate-g4", "A map scale is 1:25000. A map distance of 4 cm represents:", "B", ["100 m", "1 km", "10 km", "25 km"], "4 cm times 25000 is 100000 cm, which is 1 km."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-rate-i1", "A drink mix uses cordial and water in the ratio 1:4. If 750 mL is made, how much water is used?", "750\\div5\\times4", "600 mL", ["600", "600mL", "600 ml"]),
        measurementAnswer("y12s2-rate-i2", "A bus travels 90 km in 1 h 30 min. Find its average speed in km/h.", "90\\div1.5", "60 km/h", ["60", "60km/h", "60 kmh"]),
        measurementAnswer("y12s2-rate-i3", "A car uses 36 L of fuel for 480 km. Find the fuel consumption in L/100 km.", "36\\div480\\times100", "7.5 L/100 km", ["7.5", "7.50", "7.5L/100km"]),
        measurementAnswer("y12s2-rate-i4", "A tap fills 2.4 kL in 40 min. Convert 2.4 kL to litres.", "2.4\\times1000", "2400 L", ["2400", "2,400", "2400L", "2400 litres"]),
        practicalChoice("y12s2-rate-i5", "Which is a rate rather than a ratio?", "C", ["3:5 cordial to water", "2 red tiles to 7 blue tiles", "72 km/h", "4 parts paint to 1 part thinner"], "km/h compares distance with time."),
      ],
      commonMistakes: [
        { mistake: "Not converting minutes to hours before finding km/h.", fix: "Convert time to hours when the answer is in kilometres per hour." },
        { mistake: "Using the inverse ratio.", fix: "Check which part of the ratio the question asks for." },
        { mistake: "Confusing ratios and rates.", fix: "Ratios compare same-type quantities; rates compare different units." },
        { mistake: "Forgetting to convert units in scale and flow questions.", fix: "Write the units beside each calculation step." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-rate-m1", "A 360 dollar cost is shared in the ratio 2:3. Find the larger share.", "\\text{total}=\\$360,\\quad \\text{ratio}=2{:}3", "$216", ["216", "216.00", "$216.00"]),
        measurementAnswer("y12s2-rate-m2", "A car travels 150 km in 2 h 30 min. Find its average speed.", "d=150\\text{ km},\\quad t=2.5\\text{ h}", "60 km/h", ["60", "60km/h", "60 kmh"]),
        measurementAnswer("y12s2-rate-m3", "A hose delivers 720 L in 24 min. Find the flow rate.", "V=720\\text{ L},\\quad t=24\\text{ min}", "30 L/min", ["30", "30L/min", "30 L per min"]),
        measurementAnswer("y12s2-rate-m4", "A vehicle uses 45 L to travel 600 km. Find fuel use in L/100 km.", "V=45\\text{ L},\\quad d=600\\text{ km}", "7.5 L/100 km", ["7.5", "7.50", "7.5L/100km"]),
        measurementAnswer("y12s2-rate-m5", "A map scale is 1:50000. A 3 cm map distance represents how many kilometres?", "\\text{scale}=1{:}50000,\\quad \\text{map distance}=3\\text{ cm}", "1.5 km", ["1.5", "1.50", "1.5km"]),
        practicalChoice("y12s2-rate-m6", "A student calculates speed using 2 h 30 min as 2.30 h. What is the mistake?", "A", ["30 min is 0.5 h, not 0.30 h", "Speed cannot use time", "Distance must be in metres only", "The ratio must be 2:30"], "Thirty minutes is half an hour."),
        practicalChoice("y12s2-rate-m7", "A ratio 4:1 for paint to thinner means:", "C", ["4 parts thinner to 1 part paint", "4 litres per hour", "4 parts paint to 1 part thinner", "4 kilometres in 1 minute"], "Order matters in a ratio."),
        measurementAnswer("y12s2-rate-m8", "A 2.5 L bottle contains how many millilitres?", "V=2.5\\text{ L}", "2500 mL", ["2500", "2,500", "2500mL", "2500 ml"]),
        measurementAnswer("y12s2-rate-m9", "A cyclist travels 42 km in 1 h 45 min. Find average speed in km/h.", "d=42\\text{ km},\\quad t=1.75\\text{ h}", "24 km/h", ["24", "24km/h", "24 kmh"]),
        practicalChoice("y12s2-rate-m10", "Which comparison is most reasonable for fuel efficiency?", "D", ["Total litres only", "Colour of the car", "Distance only", "Litres per 100 km"], "Fuel efficiency compares fuel used with distance."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style measurement questions involving non-right-angled trigonometry, ratios, rates, scale, speed, and unit conversion.",
    learningIntention:
      "Apply non-right-angled trigonometry, ratios, rates, and unit conversions to practical exam-style problems.",
    successCriteria: [
      "Select sine rule, cosine rule, or area formula from the information given.",
      "Calculate side lengths, triangular areas, rates, speeds, ratio shares, and converted units.",
      "Use sensible rounding and units.",
      "Recognise common errors in rule selection and rate conversion.",
    ],
    teaching: {
      paragraphs: [
        "Mixed Standard 2 measurement questions often combine choosing a method with a short calculation. Begin by identifying whether the question is about a triangle, a ratio, a rate, a scale, or a conversion.",
        "For non-right-angled triangles, use sine rule when there is a matching side-angle pair, cosine rule for two sides and included angle, and the triangular area formula for area.",
        "For rates, make the units consistent before dividing. For example, convert minutes to hours before finding speed in km/h.",
        "For ratio sharing, add the ratio parts, find one part, and multiply by the part requested. Keep track of order and units.",
      ],
      latexBlocks: [
        "\\frac{a}{\\sin A}=\\frac{b}{\\sin B},\\quad c^2=a^2+b^2-2ab\\cos C",
        "A=\\frac{1}{2}ab\\sin C",
        "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct triangle formula",
        questionLatex:
          "\\text{A triangular park has two known sides and the included angle.}",
        steps: [
          {
            explanation:
              "Two sides and the included angle match the cosine rule for a third side.",
          },
        ],
        finalAnswerLatex: "\\text{Use cosine rule.}",
      },
      {
        title: "Calculate speed from a timetable-style context",
        questionLatex:
          "\\text{A car travels }168\\text{ km in }2\\text{ h }20\\text{ min.}",
        steps: [
          {
            explanation: "Convert the time to hours.",
            latex: "2\\text{ h }20\\text{ min}=2+\\dfrac{20}{60}=2.333\\ldots\\text{ h}",
          },
          {
            explanation: "Divide distance by time.",
            latex: "168\\div2.333\\ldots=72",
          },
        ],
        finalAnswerLatex: "72\\text{ km/h}",
      },
      {
        title: "Ratio share in context",
        questionLatex:
          "\\text{A }\\$360\\text{ repair cost is shared in the ratio }2:3.",
        steps: [
          {
            explanation: "There are 5 parts altogether.",
            latex: "2+3=5",
          },
          {
            explanation: "The larger share is 3 parts.",
            latex: "360\\div5\\times3=216",
          },
        ],
        finalAnswerLatex: "\\$216",
      },
    ],
    guidedPractice: [
      practicalChoice("y12s2-rate-exam-g1", "A drone is observed from two points and a matching side-angle pair is known. Which rule is most likely?", "A", ["Sine rule", "Cosine rule only", "Speed formula", "Fuel rate"], "A matching side-angle pair suggests sine rule."),
      measurementAnswer("y12s2-rate-exam-g2", "A field has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "\\frac12(30)(45)\\sin70^\\circ", "634 m^2", ["634", "634m^2", "634 m2"]),
      measurementAnswer("y12s2-rate-exam-g3", "A car travels 120 km in 1 h 30 min. Find average speed.", "120\\div1.5", "80 km/h", ["80", "80km/h", "80 kmh"]),
      measurementAnswer("y12s2-rate-exam-g4", "A 300 dollar cost is shared in the ratio 2:3. Find the smaller share.", "300\\div5\\times2", "$120", ["120", "120.00", "$120.00"]),
    ],
    independentPractice: [
      measurementAnswer("y12s2-rate-exam-i1", "A triangular park has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\sqrt{35^2+50^2-2(35)(50)\\cos60^\\circ}", "43.6 m", ["43.6", "43.6m"]),
      measurementAnswer("y12s2-rate-exam-i2", "A boat triangle has side 80 m opposite 35 degrees. Find the side opposite 50 degrees to 1 decimal place.", "\\frac{80\\sin50^\\circ}{\\sin35^\\circ}", "106.8 m", ["106.8", "106.8m"]),
      measurementAnswer("y12s2-rate-exam-i3", "A ute uses 32 L of fuel for 400 km. Find fuel consumption in L/100 km.", "32\\div400\\times100", "8 L/100 km", ["8", "8.0", "8L/100km"]),
      practicalChoice("y12s2-rate-exam-i4", "A map scale is 1:25000 and the map distance is 4 cm. Which real distance is correct?", "B", ["100 m", "1 km", "10 km", "25 km"], "4 cm at 1:25000 is 100000 cm, or 1 km."),
      practicalChoice("y12s2-rate-exam-i5", "A speed answer of 168 km/h for 168 km in 2 h 20 min is unreasonable because:", "C", ["The distance is too small", "No units are used", "The time was treated as 1 hour", "The car travelled backwards"], "The time is more than 2 hours, so speed must be less than 84 km/h."),
    ],
    commonMistakes: [
      { mistake: "Using sine rule when cosine rule is required.", fix: "Check whether two sides and the included angle are given." },
      { mistake: "Forgetting to convert minutes to hours.", fix: "Convert time units before calculating km/h." },
      { mistake: "Using the wrong part of a ratio.", fix: "Match the requested share to the correct ratio part." },
      { mistake: "Dropping units from final answers.", fix: "Include units such as m, m^2, km/h, L/min, or mL." },
    ],
    masteryQuiz: [
      practicalChoice("y12s2-rate-exam-m1", "A triangle has two sides and the included angle. To find the third side, use:", "B", ["Sine rule", "Cosine rule", "Speed formula", "Ratio sharing"], "This is a cosine-rule setup."),
      measurementAnswer("y12s2-rate-exam-m2", "A side 60 m is opposite 32 degrees. Find the side opposite 48 degrees to 1 decimal place.", "a=60\\text{ m},\\quad A=32°,\\quad B=48°", "84.1 m", ["84.1", "84.1m"]),
      measurementAnswer("y12s2-rate-exam-m3", "A triangular field has sides 20 m and 30 m with included angle 60 degrees. Find the area to the nearest square metre.", "a=20\\text{ m},\\quad b=30\\text{ m},\\quad C=60°", "260 m^2", ["260", "260m^2", "260 m2"]),
      measurementAnswer("y12s2-rate-exam-m4", "A bus travels 180 km in 3 h. Find average speed.", "d=180\\text{ km},\\quad t=3\\text{ h}", "60 km/h", ["60", "60km/h", "60 kmh"]),
      measurementAnswer("y12s2-rate-exam-m5", "A 240 dollar cost is shared in the ratio 3:5. Find the smaller share.", "\\text{total}=\\$240,\\quad \\text{ratio}=3{:}5", "$90", ["90", "90.00", "$90.00"]),
      measurementAnswer("y12s2-rate-exam-m6", "A tap fills 600 L in 20 min. Find the flow rate.", "V=600\\text{ L},\\quad t=20\\text{ min}", "30 L/min", ["30", "30L/min", "30 L per min"]),
      measurementAnswer("y12s2-rate-exam-m7", "A map scale is 1:50000. A map distance of 2 cm represents how many kilometres?", "\\text{scale}=1{:}50000,\\quad \\text{map distance}=2\\text{ cm}", "1 km", ["1", "1.0", "1km"]),
      practicalChoice("y12s2-rate-exam-m8", "A student uses 2.20 h for 2 h 20 min. The issue is:", "A", ["20 min is one third of an hour, not 0.20 h", "Speed cannot be calculated", "Distance must be in metres", "The angle is included"], "20 minutes is 20/60 hours."),
      practicalChoice("y12s2-rate-exam-m9", "A ratio compares:", "C", ["Only time and distance", "Only angles", "Quantities in parts", "Only litres per minute"], "Ratios compare quantities in parts."),
      practicalChoice("y12s2-rate-exam-m10", "Which answer unit is appropriate for triangular field area?", "D", ["m", "km/h", "L/min", "m^2"], "Area uses square units."),
    ],
  };
}

