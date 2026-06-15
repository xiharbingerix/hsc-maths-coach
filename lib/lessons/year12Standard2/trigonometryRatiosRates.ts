import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  practicalChoice,
  measurementAnswer as baseMeasurementAnswer,
} from "../questionHelpers";

function measurementFeedback(prompt: string, answer: string) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("back bearing")) {
    return `A back bearing is the return direction. Add 180° to the forward bearing if it is less than 180°, or subtract 180° if it is 180° or more. This gives ${answer}.`;
  }
  if (lowerPrompt.includes("bearing") && lowerPrompt.includes("angle at")) {
    return `Find the back bearing at the turning point first: add or subtract 180° from the arrival bearing. Subtract the departure bearing from that back bearing to find the interior angle. This gives ${answer}.`;
  }
  if (lowerPrompt.includes("bearing") && (lowerPrompt.includes("distance between") || lowerPrompt.includes("find the distance") || lowerPrompt.includes("find ac") || lowerPrompt.includes("find pq") || lowerPrompt.includes("find qr"))) {
    return `Use the included angle from the bearing difference, then apply the cosine rule with both distances and that angle. Take the square root of c squared to get ${answer}.`;
  }
  if (lowerPrompt.includes("utc") && (lowerPrompt.includes("what time") || lowerPrompt.includes("what utc"))) {
    return `Subtract the UTC offset from the local time to find UTC. This gives ${answer}.`;
  }
  if ((lowerPrompt.includes("hours ahead") || lowerPrompt.includes("how many hours")) && lowerPrompt.includes("time zone")) {
    return `The gap between two time zones equals the difference in their UTC offsets. Subtract the smaller offset from the larger to get ${answer}.`;
  }
  if (lowerPrompt.includes("what time") && (lowerPrompt.includes("sydney") || lowerPrompt.includes("london") || lowerPrompt.includes("tokyo") || lowerPrompt.includes("dubai") || lowerPrompt.includes("perth") || lowerPrompt.includes("brisbane") || lowerPrompt.includes("new york") || lowerPrompt.includes("los angeles"))) {
    return `Find the offset difference between the two cities and add or subtract as appropriate. A positive UTC offset is ahead; a negative offset is behind. This gives ${answer}.`;
  }
  if (lowerPrompt.includes("convert") && lowerPrompt.includes("radian")) {
    return `Multiply degrees by π/180 to get radians (or radians by 180/π to get degrees). Working through the conversion gives ${answer}.`;
  }
  if ((lowerPrompt.includes("rad mode") || lowerPrompt.includes("rad)")) && (lowerPrompt.includes("find") || lowerPrompt.includes("height") || lowerPrompt.includes("hypotenuse") || lowerPrompt.includes("opposite") || lowerPrompt.includes("side"))) {
    return `Set your calculator to RAD mode, then apply the appropriate trig ratio (sin, cos, or tan). Working through the calculation gives ${answer}.`;
  }
  if (lowerPrompt.includes("find sin b") || lowerPrompt.includes("calculate sin b")) {
    return `Rearrange the sine rule: sin B = b × sin A ÷ a. Substitute the given values and calculate to get ${answer}.`;
  }
  if (lowerPrompt.includes("using sin b") || (lowerPrompt.includes("find b1") && !lowerPrompt.includes("bearing"))) {
    return `Apply arcsin (sin⁻¹) on your calculator using the computed sin B value. The acute result is B₁ = ${answer}.`;
  }
  if (lowerPrompt.includes("find b2") || lowerPrompt.includes("given b1")) {
    return `The supplement of B₁ gives B₂ = 180° − B₁. Subtract to get ${answer}.`;
  }
  if (lowerPrompt.includes("side opposite")) {
    return `The sine rule works because the known side and angle form an opposite pair. Match that pair with the required side and its opposite angle, then rearrange to get ${answer}.`;
  }
  if (lowerPrompt.includes("third side")) {
    return `Two sides and the included angle point to the cosine rule. Substitute the three known measurements, then take the square root at the end to get ${answer}.`;
  }
  if (lowerPrompt.includes("area")) {
    return `For a triangle area question, use the two sides with the angle between them. Apply one half times side times side times sine of the included angle, then round at the end to get ${answer}.`;
  }
  if (lowerPrompt.includes("average speed")) {
    return `Average speed compares the whole distance with the whole travel time. Convert the time to hours first, then divide distance by time to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("flow rate") ||
    lowerPrompt.includes("fills 450") ||
    lowerPrompt.includes("delivers 720") ||
    lowerPrompt.includes("fills 600")
  ) {
    return `A flow rate tells you how much volume passes each minute. Divide the total volume by the number of minutes to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("fuel consumption") ||
    lowerPrompt.includes("fuel use")
  ) {
    return `Fuel consumption in litres per 100 kilometres rescales the trip to a 100 km comparison. Divide litres by kilometres, then multiply by 100 to get ${answer}.`;
  }
  if (lowerPrompt.includes("map scale")) {
    return `A map scale of 1:n means each map unit represents n of the same real-world units. Multiply first, then convert the resulting distance into kilometres to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("ratio") ||
    lowerPrompt.includes("shared") ||
    lowerPrompt.includes("drink mix")
  ) {
    return `A ratio splits the total into equal-sized parts. Add the ratio parts, find the value of one part, then take the required number of parts to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("convert") ||
    lowerPrompt.includes("how many millilitres")
  ) {
    return `Choose a conversion that matches the required unit before calculating. Scaling the given volume into the smaller unit gives ${answer}.`;
  }
  return `Match the calculation to the units and the practical context, then round only when the question asks. This gives ${answer}.`;
}

function measurementAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseMeasurementAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: measurementFeedback(prompt, answer),
  };
}

export function year12Standard2TrigRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  const isStandard2 = course.slug === "year-12-standard-2";
  const isStandard1 = course.slug === "year-12-standard-1";

  if ((!isStandard2 && !isStandard1) || unit.slug !== "trigonometry-ratios-rates") {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (isStandard1 && lesson.slug !== "ratios-rates-unit-conversions") {
    return null;
  }

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
          triangleDiagram: {
            description:
              "Triangle with sides AC 48 metres, BC 62 metres, included angle C 37 degrees, and unknown side AB labelled c.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "AB = c",
              AC: "48 m",
              BC: "62 m",
            },
            angleLabels: {
              C: "37°",
            },
          },
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
            {
              explanation:
                "Here, the unknown side is opposite the included angle, so the cosine rule matches the diagram.",
            },
          ],
          finalAnswerLatex: "\\text{Use the cosine rule.}",
        },
        {
          title: "Use cosine rule for a distance",
          questionLatex:
            "a=48,\\quad b=62,\\quad C=37^\\circ",
          triangleDiagram: {
            description:
              "Triangle with sides AC 48 metres, BC 62 metres, included angle C 37 degrees, and unknown side AB labelled c.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "AB = c",
              AC: "48 m",
              BC: "62 m",
            },
            angleLabels: {
              C: "37°",
            },
            highlightedSides: ["AB"],
          },
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
          triangleDiagram: {
            description:
              "Triangle with side BC 80 metres opposite angle A 35 degrees, and unknown side AC labelled b opposite angle B 50 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "80 m",
              AC: "b",
            },
            angleLabels: {
              A: "35°",
              B: "50°",
            },
            highlightedSides: ["BC", "AC"],
          },
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
        {
          ...practicalChoice("y12s2-trv-g1", "A triangular park has two known sides and the included angle. Which rule is most appropriate for the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent only", "Ratio sharing"], "Two sides and the included angle match the cosine rule."),
          triangleDiagram: {
            description:
              "Triangle with two known sides meeting at the included angle and the third side labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "known side",
              BC: "known side",
            },
            angleLabels: {
              C: "included angle",
            },
          },
        },
        {
          ...practicalChoice("y12s2-trv-g2", "A drone problem gives one side with its opposite angle and asks for another side. Which rule is most appropriate?", "A", ["Sine rule", "Cosine rule", "Speed formula", "Unit conversion"], "A matching side-angle pair points to the sine rule."),
          triangleDiagram: {
            description:
              "Triangle showing a known side opposite a known angle and another side labelled x opposite another angle.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "known side",
              AC: "x",
            },
            angleLabels: {
              A: "known angle",
              B: "given angle",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-trv-g3", "A triangular field has sides 30 m and 40 m with included angle 60 degrees. Use the cosine rule to find the third side to 1 decimal place.", "c^2=a^2+b^2-2ab\\cos C", "36.1 m", ["36.1", "36.1m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 30 metres and BC 40 metres, included angle C 60 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "30 m",
              BC: "40 m",
            },
            angleLabels: {
              C: "60°",
            },
          },
        },
        practicalChoice("y12s2-trv-g4", "A student uses right-angle trigonometry in a triangle with angles 42, 58 and 80 degrees. What is the issue?", "C", ["The answer must be in kilometres", "The triangle is impossible", "There is no right angle", "The ratio must be simplified"], "Right-angle trigonometry needs a 90-degree angle."),
      ],
      independentPractice: [
        {
          ...practicalChoice("y12s2-trv-i1", "A boat survey gives side 120 m opposite 42 degrees and asks for a side opposite 58 degrees. Which rule should be used?", "A", ["Sine rule", "Cosine rule", "Pythagoras only", "Fuel consumption"], "A known opposite side-angle pair is available."),
          triangleDiagram: {
            description:
              "Triangle with side BC 120 metres opposite angle A 42 degrees, and side AC labelled x opposite angle B 58 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "120 m",
              AC: "x",
            },
            angleLabels: {
              A: "42°",
              B: "58°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-trv-i2", "A triangular paddock has sides 55 m and 70 m with included angle 40 degrees. Find the third side to 1 decimal place.", "\\text{Given: }a=55,\\quad b=70,\\quad C=40^\\circ", "45.0 m", ["45", "45.0", "45 m", "45.0m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 55 metres and BC 70 metres, included angle C 40 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "55 m",
              BC: "70 m",
            },
            angleLabels: {
              C: "40°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-trv-i3", "A tower guide rope forms a triangle where 90 m is opposite 35 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\text{Given: }A=35^\\circ,\\quad B=48^\\circ,\\quad a=90", "116.6 m", ["116.6", "116.6m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 90 metres opposite angle A 35 degrees, and side AC labelled x opposite angle B 48 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "90 m",
              AC: "x",
            },
            angleLabels: {
              A: "35°",
              B: "48°",
            },
          },
        },
        practicalChoice("y12s2-trv-i4", "In a triangle, the largest angle should be opposite:", "D", ["The shortest side", "The first side listed", "The included angle only", "The longest side"], "The largest side is opposite the largest angle."),
        practicalChoice("y12s2-trv-i5", "A non-right-angled triangle has all three sides known and an angle is required. Which rule is most appropriate?", "B", ["Sine rule first", "Cosine rule", "Speed formula", "Area formula only"], "Cosine rule can find an angle from three sides."),
      ],
      commonMistakes: [
        { mistake: "Using right-angled trigonometry when there is no right angle.", fix: "Check for a 90-degree angle before using SOH-CAH-TOA." },
        { mistake: "Choosing sine rule without a matching side-angle pair.", fix: "Use sine rule only when an opposite side-angle pair is known." },
        { mistake: "Missing that the known angle is included between two sides.", fix: "Use cosine rule for two sides and the included angle." },
        { mistake: "Accepting an unreasonable side length.", fix: "Check that the largest side is opposite the largest angle and units make sense." },
      ],
      masteryQuiz: [
        practicalChoice("y12s2-trv-m1", "A triangle has sides 48 m and 62 m with included angle 37 degrees. Which rule finds the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent", "Average speed"], "Two sides and included angle use cosine rule."),
        practicalChoice("y12s2-trv-m2", "A known side is paired with its opposite angle, and another side is required. Use:", "A", ["Sine rule", "Cosine rule", "Area formula", "Scale factor"], "This is a sine rule setup."),
        {
          ...measurementAnswer("y12s2-trv-m3", "A triangular park has sides 20 m and 25 m with included angle 60 degrees. Find the third side to 1 decimal place.", "a=20\\text{ m},\\quad b=25\\text{ m},\\quad C=60°", "22.9 m", ["22.9", "22.9m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 20 metres and BC 25 metres, included angle C 60 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "20 m",
              BC: "25 m",
            },
            angleLabels: {
              C: "60°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-trv-m4", "A survey triangle has side 70 m opposite 40 degrees. Find the side opposite 55 degrees to 1 decimal place.", "a=70\\text{ m},\\quad A=40°,\\quad B=55°", "89.2 m", ["89.2", "89.2m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 70 metres opposite angle A 40 degrees, and side AC labelled x opposite angle B 55 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "70 m",
              AC: "x",
            },
            angleLabels: {
              A: "40°",
              B: "55°",
            },
          },
        },
        practicalChoice("y12s2-trv-m5", "A triangle has angles 50, 60 and 70 degrees. Right-angled trigonometry is:", "C", ["Appropriate because there are angles", "Always exact", "Not appropriate because there is no 90-degree angle", "The same as ratio sharing"], "There is no right angle."),
        practicalChoice("y12s2-trv-m6", "A cosine-rule side question needs:", "D", ["A frequency table", "A matching side-angle pair only", "A speed and time", "Two sides and the included angle"], "Cosine rule fits two sides and included angle."),
        {
          ...measurementAnswer("y12s2-trv-m7", "A drone triangle has 100 m opposite 30 degrees. Find the side opposite 45 degrees to 1 decimal place.", "a=100\\text{ m},\\quad A=30°,\\quad B=45°", "141.4 m", ["141.4", "141.4m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 100 metres opposite angle A 30 degrees, and side AC labelled x opposite angle B 45 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "100 m",
              AC: "x",
            },
            angleLabels: {
              A: "30°",
              B: "45°",
            },
          },
        },
        practicalChoice("y12s2-trv-m8", "A side answer of -12 m in a triangle distance problem is:", "A", ["Unreasonable", "Always correct", "A bearing", "A ratio"], "Distances cannot be negative."),
        practicalChoice("y12s2-trv-m9", "A triangle has all three sides known and an angle is required. Use:", "B", ["Sine rule only", "Cosine rule", "Flow rate", "Map scale"], "Cosine rule can find an angle from three sides."),
        practicalChoice("y12s2-trv-m10", "Before choosing a trig rule, first identify:", "C", ["The student's name", "The calculator brand", "Known sides and angles", "The currency"], "Rule choice depends on the given sides and angles."),
      ],
    };
  }

  if (lesson.slug === "elevation-depression-applications") {
    return {
      ...base,
      description:
        "Identify angles of elevation and depression, draw labelled right-angled triangles, and apply SOH CAH TOA to find heights and horizontal distances in practical problems.",
      learningIntention:
        "Use angles of elevation and depression with right-angled trigonometry to solve practical height and distance problems.",
      successCriteria: [
        "Distinguish between angle of elevation (looking up from horizontal) and angle of depression (looking down from horizontal).",
        "Draw and label a right-angled triangle from a worded problem involving elevation or depression.",
        "Apply tan, sin, or cos to find unknown heights and horizontal distances.",
        "Solve multi-step problems that involve both a height and a straight-line distance.",
      ],
      teaching: {
        paragraphs: [
          "The angle of elevation is the angle measured upward from the horizontal to the line of sight when looking at an object above. The angle of depression is measured downward from the horizontal when looking at an object below. Both angles are always measured from the horizontal, never from the vertical.",
          "A key fact: the angle of elevation from point A to point B equals the angle of depression from point B to point A. These are equal alternate angles formed by parallel horizontal lines cut by the same line of sight.",
          "To solve these problems, draw a right-angled triangle. Mark the given angle, the known side, and the unknown side. Then identify the correct trig ratio: tan = opp/adj is most common when the right angle is at the base, since you typically know a horizontal distance (adjacent) and want a height (opposite), or vice versa.",
          "In multi-step problems you may need to find both the height and the straight-line distance (hypotenuse). Once you have the height from tan, use sin or cos (or Pythagoras) to find the hypotenuse.",
        ],
        latexBlocks: [
          "\\tan(\\theta) = \\dfrac{\\text{height}}{\\text{horizontal distance}}",
          "\\text{height} = \\text{horizontal distance} \\times \\tan(\\theta)",
          "\\text{horizontal distance} = \\dfrac{\\text{height}}{\\tan(\\theta)}",
          "\\text{Angle of elevation from A to B} = \\text{Angle of depression from B to A}",
        ],
      },
      workedExamples: [
        {
          title: "Angle of elevation: find the height",
          questionLatex:
            "\\text{From a point 40 m from the base of a building, the angle of elevation to the top is }32°\\text{. Find the height of the building.}",
          triangleDiagram: {
            description:
              "Right-angled triangle. Observer A at bottom-left, base of building B at bottom-right (right angle), top of building C at top-right. Horizontal AB = 40 m, height BC = h. Angle of elevation at A = 32°.",
            vertices: { A: { x: 60, y: 240 }, B: { x: 380, y: 240 }, C: { x: 380, y: 60 } },
            rightAngleAt: "B",
            angleLabels: { A: "32°" },
            sideLabels: { AB: "40 m", BC: "h = ?" },
          },
          steps: [
            {
              explanation: "Identify the ratio: opposite (height) over adjacent (horizontal). Use tan.",
              latex: "\\tan(32°) = \\dfrac{h}{40}",
            },
            {
              explanation: "Multiply both sides by 40.",
              latex: "h = 40 \\times \\tan(32°) \\approx 40 \\times 0.6249 \\approx 25.0\\text{ m}",
            },
          ],
          finalAnswerLatex: "h \\approx 25.0\\text{ m}",
        },
        {
          title: "Angle of depression: find the horizontal distance",
          questionLatex:
            "\\text{From the top of a 60 m cliff, a boat is observed at an angle of depression of }18°\\text{. Find the horizontal distance from the base of the cliff to the boat.}",
          triangleDiagram: {
            description:
              "Right-angled triangle. Top of cliff D at top-left, base of cliff E at bottom-left (right angle), boat F at bottom-right. Height DE = 60 m, horizontal EF = d. Angle at F = 18° (angle of elevation from F to D = angle of depression from D to F).",
            vertices: { D: { x: 60, y: 40 }, E: { x: 60, y: 240 }, F: { x: 380, y: 240 } },
            rightAngleAt: "E",
            angleLabels: { F: "18°" },
            sideLabels: { DE: "60 m", EF: "d = ?" },
          },
          steps: [
            {
              explanation: "Angle of depression from cliff top = angle of elevation from boat = 18°. In the right triangle, angle at F = 18°. Opposite = DE = 60 m, adjacent = EF = d.",
              latex: "\\tan(18°) = \\dfrac{60}{d}",
            },
            {
              explanation: "Rearrange to find d.",
              latex:
                "d = \\dfrac{60}{\\tan(18°)} \\approx \\dfrac{60}{0.3249} \\approx 184.7\\text{ m}",
            },
          ],
          finalAnswerLatex: "d \\approx 184.7\\text{ m}",
        },
        {
          title: "Multi-step: height and straight-line distance",
          questionLatex:
            "\\text{A drone is observed from point A at an angle of elevation of }48°\\text{. Point A is 80 m horizontally from the point directly below the drone. Find (a) the height of the drone and (b) the straight-line distance from A to the drone.}",
          triangleDiagram: {
            description:
              "Right-angled triangle. Observer A at bottom-left, point B directly below drone at bottom-right (right angle), drone D at top-right. Horizontal AB = 80 m, height BD = h, hypotenuse AD = distance. Angle of elevation at A = 48°.",
            vertices: { A: { x: 60, y: 240 }, B: { x: 380, y: 240 }, D: { x: 380, y: 40 } },
            rightAngleAt: "B",
            angleLabels: { A: "48°" },
            sideLabels: { AB: "80 m", BD: "h = ?", AD: "dist = ?" },
          },
          steps: [
            {
              explanation: "(a) Use tan to find the height.",
              latex:
                "h = 80 \\times \\tan(48°) \\approx 80 \\times 1.1106 \\approx 88.8\\text{ m}",
            },
            {
              explanation: "(b) Use cos to find the straight-line distance AD.",
              latex:
                "\\cos(48°) = \\dfrac{80}{AD} \\implies AD = \\dfrac{80}{\\cos(48°)} \\approx \\dfrac{80}{0.6691} \\approx 119.6\\text{ m}",
            },
          ],
          finalAnswerLatex:
            "\\text{(a) }h \\approx 88.8\\text{ m};\\quad\\text{(b) }AD \\approx 119.6\\text{ m}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-eld-g1",
          "The angle of elevation is measured:",
          "B",
          [
            "Downward from the vertical",
            "Upward from the horizontal to a line of sight above",
            "From the top of an object to the ground",
            "Between two horizontal lines",
          ],
          "Angle of elevation = angle measured upward from horizontal to a line of sight to an object above you."
        ),
        practicalChoice(
          "y12s2-eld-g2",
          "From 30 m away, the angle of elevation to the top of a tree is 35°. Which equation finds the height h?",
          "C",
          [
            "h = 30 ÷ sin(35°)",
            "h = 30 × cos(35°)",
            "h = 30 × tan(35°)",
            "h = 30 ÷ tan(35°)",
          ],
          "tan(35°) = h/30, so h = 30 × tan(35°)."
        ),
        practicalChoice(
          "y12s2-eld-g3",
          "From 60 m away, the angle of elevation to a flagpole top is 52°. Height ≈ ?",
          "C",
          ["38.4 m", "49.3 m", "76.8 m", "93.6 m"],
          "h = 60 × tan(52°) ≈ 60 × 1.2799 ≈ 76.8 m."
        ),
        measurementAnswer(
          "y12s2-eld-g4",
          "A person stands 25 m from a tree. The angle of elevation to the top is 38°. Find the height of the tree to 2 decimal places.",
          "h = 25 \\times \\tan(38°)",
          "19.53 m",
          ["19.53", "19.53 m"]
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-eld-i1",
          "From 45 m away, the angle of elevation to a tower top is 40°. Height ≈ ?",
          "B",
          ["28.9 m", "37.8 m", "52.2 m", "69.6 m"],
          "h = 45 × tan(40°) ≈ 45 × 0.8391 ≈ 37.8 m."
        ),
        measurementAnswer(
          "y12s2-eld-i2",
          "From the top of an 80 m cliff, the angle of depression to a boat is 22°. Find the horizontal distance to 1 decimal place.",
          "d = \\dfrac{80}{\\tan(22°)}",
          "198.0 m",
          ["198.0", "198", "198.0 m"]
        ),
        practicalChoice(
          "y12s2-eld-i3",
          "The angle of depression from a 40 m tower to a point 55 m away (horizontal) is approximately:",
          "B",
          ["55.0°", "36.0°", "49.1°", "26.9°"],
          "arctan(40/55) ≈ arctan(0.7273) ≈ 36.0°."
        ),
        measurementAnswer(
          "y12s2-eld-i4",
          "A drone is observed from 100 m away at an elevation angle of 35°. Find the height of the drone to 2 decimal places.",
          "h = 100 \\times \\tan(35°)",
          "70.02 m",
          ["70.02", "70.02 m", "70.0 m"]
        ),
        practicalChoice(
          "y12s2-eld-i5",
          "The angle of elevation from a boat to the top of a cliff equals the angle of depression from the cliff top to the boat because:",
          "C",
          [
            "They are vertically opposite angles",
            "The cliff is always at 45°",
            "They are equal alternate angles with parallel horizontal lines",
            "All triangles are right-angled",
          ],
          "The two horizontal lines (at the observer and at the cliff top) are parallel, making the elevation and depression angles alternate angles — and therefore equal."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Measuring the angle from the vertical instead of the horizontal.",
          fix: "Elevation and depression angles are always from the horizontal. If the problem says 32° elevation, the angle in your right triangle at the base is 32°, not (90° − 32°) = 58°.",
        },
        {
          mistake: "Setting up tan = height/horizontal when the unknown is in the denominator, then not rearranging.",
          fix: "If tan(θ) = 60/d, rearrange to d = 60/tan(θ) before calculating. Don't multiply 60 × tan(θ) — that gives the wrong quantity.",
        },
        {
          mistake: "Confusing which side is opposite and which is adjacent.",
          fix: "The opposite side is always across from the angle. For elevation/depression: the height (vertical side) is opposite the angle at the observer's position; the horizontal distance is adjacent.",
        },
        {
          mistake: "Using the wrong trig ratio for the straight-line (hypotenuse) distance.",
          fix: "Once you have the height h and horizontal d, the hypotenuse = d ÷ cos(θ) or h ÷ sin(θ) — or use Pythagoras: √(d² + h²). All three give the same result.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-eld-m1",
          "From 30 m away, elevation 45° to a tree top. Height = ?",
          "C",
          ["15.0 m", "21.2 m", "30.0 m", "42.4 m"],
          "tan(45°) = 1, so h = 30 × 1 = 30 m."
        ),
        measurementAnswer(
          "y12s2-eld-m2",
          "From 50 m away, angle of elevation 28°. Height of tower to 2 decimal places?",
          "h = 50 \\times \\tan(28°)",
          "26.60 m",
          ["26.60", "26.60 m", "26.6 m"]
        ),
        practicalChoice(
          "y12s2-eld-m3",
          "From a 70 m cliff, angle of depression to a boat is 15°. Horizontal distance ≈ ?",
          "C",
          ["18.7 m", "72.5 m", "261.2 m", "373.2 m"],
          "d = 70/tan(15°) ≈ 70/0.2679 ≈ 261.2 m."
        ),
        measurementAnswer(
          "y12s2-eld-m4",
          "From 100 m away, angle of elevation 62°. Height to 2 decimal places?",
          "h = 100 \\times \\tan(62°)",
          "188.07 m",
          ["188.07", "188.07 m"]
        ),
        practicalChoice(
          "y12s2-eld-m5",
          "From the top of a 45 m cliff, angle of depression to a car is 20°. Horizontal distance ≈ ?",
          "C",
          ["16.4 m", "41.0 m", "123.6 m", "131.9 m"],
          "d = 45/tan(20°) ≈ 45/0.3640 ≈ 123.6 m."
        ),
        measurementAnswer(
          "y12s2-eld-m6",
          "From 120 m away, angle of elevation 31° to a tower. Height to 2 decimal places?",
          "h = 120 \\times \\tan(31°)",
          "72.15 m",
          ["72.15", "72.15 m"]
        ),
        practicalChoice(
          "y12s2-eld-m7",
          "Observer is 60 m from the base of a tower. Elevation angle = 40°. Straight-line distance from observer to top of tower ≈ ?",
          "B",
          ["38.6 m", "78.3 m", "92.6 m", "50.4 m"],
          "d = 60/cos(40°) ≈ 60/0.766 ≈ 78.3 m."
        ),
        measurementAnswer(
          "y12s2-eld-m8",
          "From the top of an 85 m cliff, the angle of depression to a marker is 32°. Find the horizontal distance to 2 decimal places.",
          "d = \\dfrac{85}{\\tan(32°)}",
          "136.02 m",
          ["136.02", "136.02 m"]
        ),
        practicalChoice(
          "y12s2-eld-m9",
          "From 25 m away, elevation 55° to a flagpole. Height ≈ ?",
          "C",
          ["14.3 m", "17.7 m", "35.7 m", "43.3 m"],
          "h = 25 × tan(55°) ≈ 25 × 1.4281 ≈ 35.7 m."
        ),
        practicalChoice(
          "y12s2-eld-m10",
          "If someone observes an object at 35° angle of depression, the angle of elevation from the object back to the observer is:",
          "B",
          ["55°", "35°", "90°", "145°"],
          "Angles of elevation and depression between two points are always equal (alternate angles with parallel horizontals)."
        ),
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
          triangleDiagram: {
            description:
              "Triangle with base BC 80 metres, angle A 35 degrees, angle B 50 degrees, and unknown side AC labelled x.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "80 m",
              AC: "x",
            },
            angleLabels: {
              A: "35°",
              B: "50°",
            },
          },
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
          triangleDiagram: {
            description:
              "Triangle with two track sides AC 48 metres and BC 62 metres meeting at angle C 37 degrees, with unknown distance AB labelled c.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "AB = c",
              AC: "48 m",
              BC: "62 m",
            },
            angleLabels: {
              C: "37°",
            },
            highlightedSides: ["AB"],
          },
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
          triangleDiagram: {
            description:
              "Triangle with known sides AB 48 metres and AC 62 metres and included angle A 37 degrees for an area calculation.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "48 m",
              AC: "62 m",
            },
            angleLabels: {
              A: "37°",
            },
            highlightedSides: ["AB", "AC"],
          },
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
        {
          ...measurementAnswer("y12s2-sca-g1", "A navigation triangle has side 60 m opposite 32 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}", "84.1 m", ["84.1", "84.1m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 60 metres opposite angle A 32 degrees, and side AC labelled x opposite angle B 48 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "60 m",
              AC: "x",
            },
            angleLabels: {
              A: "32°",
              B: "48°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-sca-g2", "A triangular park has sides 48 m and 62 m with included angle 37 degrees. Find its area to the nearest square metre.", "A=\\frac{1}{2}ab\\sin C", "895 m^2", ["895", "895m^2", "895 m2"]),
          triangleDiagram: {
            description:
              "Triangle with sides AB 48 metres and AC 62 metres and included angle A 37 degrees for an area calculation.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "48 m",
              AC: "62 m",
            },
            angleLabels: {
              A: "37°",
            },
          },
        },
        {
          ...practicalChoice("y12s2-sca-g3", "A triangle has three side lengths and an angle is required. Which formula is most appropriate?", "B", ["Sine rule", "Cosine rule", "Area formula only", "Speed formula"], "Cosine rule can find angles from three sides."),
          triangleDiagram: {
            description:
              "Triangle with all three sides labelled as known and one angle marked as x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "known side",
              AC: "known side",
              BC: "known side",
            },
            angleLabels: {
              C: "x",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-sca-g4", "A field has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "c^2=a^2+b^2-2ab\\cos C", "43.6 m", ["43.6", "43.6m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 35 metres and BC 50 metres, included angle C 60 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "35 m",
              BC: "50 m",
            },
            angleLabels: {
              C: "60°",
            },
          },
        },
      ],
      independentPractice: [
        {
          ...measurementAnswer("y12s2-sca-i1", "A drone triangle has side 120 m opposite 42 degrees. Find the side opposite 58 degrees to 1 decimal place.", "\\text{Given: }A=42^\\circ,\\quad B=58^\\circ,\\quad a=120", "152.1 m", ["152.1", "152.1m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 120 metres opposite angle A 42 degrees, and side AC labelled x opposite angle B 58 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "120 m",
              AC: "x",
            },
            angleLabels: {
              A: "42°",
              B: "58°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-sca-i2", "A triangular lot has sides 80 m and 95 m with included angle 52 degrees. Find the third side to 1 decimal place.", "\\text{Given: }a=80,\\quad b=95,\\quad C=52^\\circ", "75.8 m", ["75.8", "75.8m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 80 metres and BC 95 metres, included angle C 52 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "80 m",
              BC: "95 m",
            },
            angleLabels: {
              C: "52°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-sca-i3", "A triangular park has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "\\text{Given: two sides and the included angle}", "634 m^2", ["634", "634m^2", "634 m2"]),
          triangleDiagram: {
            description:
              "Triangle with sides AB 30 metres and AC 45 metres and included angle A 70 degrees for an area calculation.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "30 m",
              AC: "45 m",
            },
            angleLabels: {
              A: "70°",
            },
          },
        },
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
        {
          ...measurementAnswer("y12s2-sca-m2", "A triangular field has sides 25 m and 40 m with included angle 50 degrees. Find the third side to 1 decimal place.", "a=25\\text{ m},\\quad b=40\\text{ m},\\quad C=50°", "31.2 m", ["31.2", "31.2m"]),
          triangleDiagram: {
            description:
              "Triangle with sides AC 25 metres and BC 40 metres, included angle C 50 degrees, and third side AB labelled x.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "x",
              AC: "25 m",
              BC: "40 m",
            },
            angleLabels: {
              C: "50°",
            },
          },
        },
        {
          ...measurementAnswer("y12s2-sca-m3", "A triangular garden has sides 20 m and 30 m with included angle 60 degrees. Find the area to the nearest square metre.", "a=20\\text{ m},\\quad b=30\\text{ m},\\quad C=60°", "260 m^2", ["260", "260m^2", "260 m2"]),
          triangleDiagram: {
            description:
              "Triangle with sides AB 20 metres and AC 30 metres and included angle A 60 degrees for an area calculation.",
            vertices: {
              A: { x: 80, y: 220 },
              B: { x: 320, y: 220 },
              C: { x: 135, y: 70 },
            },
            sideLabels: {
              AB: "20 m",
              AC: "30 m",
            },
            angleLabels: {
              A: "60°",
            },
          },
        },
        practicalChoice("y12s2-sca-m4", "The sine rule is most useful when:", "A", ["A matching side-angle pair is known", "Only a speed is known", "Only area is required", "No angles are known"], "Sine rule relies on opposite side-angle pairs."),
        practicalChoice("y12s2-sca-m5", "The cosine rule is most useful for a side when:", "C", ["There is a frequency table", "Only ratios are known", "Two sides and the included angle are known", "The triangle is a box plot"], "Cosine rule fits SAS information."),
        measurementAnswer("y12s2-sca-m6", "A park triangle has sides 50 m and 70 m with included angle 40 degrees. Find its area to the nearest square metre.", "a=50\\text{ m},\\quad b=70\\text{ m},\\quad C=40°", "1125 m^2", ["1125", "1,125", "1125m^2", "1125 m2"]),
        {
          ...measurementAnswer("y12s2-sca-m7", "A rescue boat triangle has side 90 m opposite 35 degrees. Find the side opposite 55 degrees to 1 decimal place.", "a=90\\text{ m},\\quad A=35°,\\quad B=55°", "128.5 m", ["128.5", "128.5m"]),
          triangleDiagram: {
            description:
              "Triangle with side BC 90 metres opposite angle A 35 degrees, and side AC labelled x opposite angle B 55 degrees.",
            vertices: {
              A: { x: 190, y: 70 },
              B: { x: 70, y: 220 },
              C: { x: 330, y: 220 },
            },
            sideLabels: {
              BC: "90 m",
              AC: "x",
            },
            angleLabels: {
              A: "35°",
              B: "55°",
            },
          },
        },
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
        measurementAnswer("y12s2-rate-g1", "A prize of 240 dollars is shared in the ratio 3:5. What is the larger share?", "\\text{Given: total }=240,\\quad \\text{ratio}=3{:}5", "$150", ["150", "150.00", "$150.00"]),
        measurementAnswer("y12s2-rate-g2", "A car travels 168 km in 2 h 20 min. Find the average speed in km/h.", "\\text{Given: }d=168\\text{ km},\\quad t=2\\text{ h }20\\text{ min}", "72 km/h", ["72", "72km/h", "72 kmh"]),
        measurementAnswer("y12s2-rate-g3", "A pump fills 450 L in 15 min. Find the flow rate in L/min.", "\\text{flow rate}=\\frac{\\text{volume}}{\\text{time}}", "30 L/min", ["30", "30L/min", "30 L per min"]),
        practicalChoice("y12s2-rate-g4", "A map scale is 1:25000. A map distance of 4 cm represents:", "B", ["100 m", "1 km", "10 km", "25 km"], "4 cm times 25000 is 100000 cm, which is 1 km."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-rate-i1", "A drink mix uses cordial and water in the ratio 1:4. If 750 mL is made, how much water is used?", "\\text{Given: total }=750\\text{ mL},\\quad \\text{ratio}=1{:}4", "600 mL", ["600", "600mL", "600 ml"]),
        measurementAnswer("y12s2-rate-i2", "A bus travels 90 km in 1 h 30 min. Find its average speed in km/h.", "\\text{Given: }d=90\\text{ km},\\quad t=1\\text{ h }30\\text{ min}", "60 km/h", ["60", "60km/h", "60 kmh"]),
        measurementAnswer("y12s2-rate-i3", "A car uses 36 L of fuel for 480 km. Find the fuel consumption in L/100 km.", "\\text{Given: }36\\text{ L over }480\\text{ km}", "7.5 L/100 km", ["7.5", "7.50", "7.5L/100km"]),
        measurementAnswer("y12s2-rate-i4", "A tap fills 2.4 kL in 40 min. Convert 2.4 kL to litres.", "1\\text{ kL}=1000\\text{ L}", "2400 L", ["2400", "2,400", "2400L", "2400 litres"]),
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

  if (lesson.slug === "energy-consumption-watts-kilowatts") {
    return {
      ...base,
      description:
        "Convert between watts and kilowatts, calculate energy used in kilowatt-hours, and find the cost of running household appliances using an electricity tariff.",
      learningIntention:
        "Apply the relationships between watts, kilowatts, kilowatt-hours and electricity cost to analyse household energy consumption.",
      successCriteria: [
        "Convert power between watts (W) and kilowatts (kW) by dividing or multiplying by 1000.",
        "Calculate energy consumed in kilowatt-hours using Energy (kWh) = Power (kW) × Time (h).",
        "Find the cost of running an appliance using Cost = Power (kW) × Time (h) × Tariff ($/kWh).",
        "Compare the energy cost of different appliances over a day or month.",
      ],
      teaching: {
        paragraphs: [
          "Power measures the rate at which an appliance uses energy. It is measured in watts (W) or kilowatts (kW). Since 1 kW = 1000 W, convert by dividing watts by 1000 to get kilowatts. For example, a 2400 W oven is a 2.4 kW oven.",
          "Energy is power × time. When power is in kilowatts and time is in hours, the result is in kilowatt-hours (kWh). Electricity bills are based on kWh consumed. For example, running a 2.4 kW oven for 2.5 hours uses 2.4 × 2.5 = 6 kWh of energy.",
          "Electricity costs money at a rate called the tariff, measured in dollars per kilowatt-hour ($/kWh). To find the cost: Cost ($) = Power (kW) × Time (h) × Tariff ($/kWh). Equivalently, Cost = kWh used × tariff.",
          "To find the monthly cost of an appliance, calculate the daily energy use first, then multiply by the number of days. Always convert power to kW and time to hours before calculating.",
        ],
        latexBlocks: [
          "1\\text{ kW} = 1000\\text{ W}\\qquad \\text{Power (kW)} = \\dfrac{\\text{Power (W)}}{1000}",
          "\\text{Energy (kWh)} = \\text{Power (kW)} \\times \\text{Time (h)}",
          "\\text{Cost (\\$)} = \\text{Power (kW)} \\times \\text{Time (h)} \\times \\text{Tariff (\\$/kWh)}",
        ],
      },
      workedExamples: [
        {
          title: "Convert watts to kilowatts and calculate kWh",
          questionLatex:
            "\\text{A 2400 W electric oven is used for 2.5 hours. (a) Convert 2400 W to kilowatts. (b) Find the energy consumed in kWh.}",
          steps: [
            {
              explanation: "Divide watts by 1000 to get kilowatts.",
              latex: "\\text{Power} = \\dfrac{2400}{1000} = 2.4\\text{ kW}",
            },
            {
              explanation: "Energy = Power (kW) × Time (h).",
              latex: "E = 2.4\\text{ kW} \\times 2.5\\text{ h} = 6\\text{ kWh}",
            },
          ],
          finalAnswerLatex: "2.4\\text{ kW};\\quad E = 6\\text{ kWh}",
        },
        {
          title: "Calculate the cost of running an appliance",
          questionLatex:
            "\\text{The oven from Example 1 uses 6 kWh. The electricity tariff is }\\$0.30\\text{ per kWh. Find the cost of using the oven.}",
          steps: [
            {
              explanation: "Cost = kWh × tariff.",
              latex: "\\text{Cost} = 6\\text{ kWh} \\times \\$0.30/\\text{kWh}",
            },
            {
              explanation: "Multiply.",
              latex: "\\text{Cost} = \\$1.80",
            },
          ],
          finalAnswerLatex: "\\text{Cost} = \\$1.80",
        },
        {
          title: "Compare monthly energy costs of two appliances",
          questionLatex:
            "\\text{A 1500 W heater runs 4 h/day and a 100 W TV runs 5 h/day. Tariff is }\\$0.28\\text{/kWh. Find the monthly cost of each over 30 days and the total.}",
          steps: [
            {
              explanation: "Heater: convert W to kW, then find monthly kWh.",
              latex:
                "1.5\\text{ kW} \\times 4\\text{ h} \\times 30\\text{ days} = 180\\text{ kWh}",
            },
            {
              explanation: "TV: convert W to kW, find monthly kWh.",
              latex:
                "0.1\\text{ kW} \\times 5\\text{ h} \\times 30\\text{ days} = 15\\text{ kWh}",
            },
            {
              explanation: "Find each cost and total.",
              latex:
                "\\text{Heater: }180\\times0.28=\\$50.40\\quad\\text{TV: }15\\times0.28=\\$4.20\\quad\\text{Total: }\\$54.60",
            },
          ],
          finalAnswerLatex:
            "\\text{Heater: }\\$50.40,\\quad\\text{TV: }\\$4.20,\\quad\\text{Total: }\\$54.60",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-eco-g1",
          "2500 W is equal to how many kilowatts?",
          "C",
          ["0.25 kW", "25 kW", "2.5 kW", "250 kW"],
          "Divide by 1000: 2500 ÷ 1000 = 2.5 kW."
        ),
        practicalChoice(
          "y12s2-eco-g2",
          "A 3 kW air conditioner runs for 4 hours. How many kWh of energy does it use?",
          "C",
          ["3 kWh", "7 kWh", "12 kWh", "43.2 kWh"],
          "Energy = 3 kW × 4 h = 12 kWh."
        ),
        practicalChoice(
          "y12s2-eco-g3",
          "An appliance uses 5 kWh of energy. The tariff is $0.30/kWh. What is the cost?",
          "B",
          ["$0.30", "$1.50", "$5.30", "$15.00"],
          "Cost = 5 × $0.30 = $1.50."
        ),
        practicalChoice(
          "y12s2-eco-g4",
          "A 1500 W heater runs for 2 hours. How many kWh does it use?",
          "B",
          ["1.5 kWh", "3 kWh", "30 kWh", "1500 kWh"],
          "1500 W = 1.5 kW. Energy = 1.5 × 2 = 3 kWh."
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-eco-i1",
          "Convert 750 W to kilowatts.",
          "A",
          ["0.75 kW", "7.5 kW", "75 kW", "750 kW"],
          "750 ÷ 1000 = 0.75 kW."
        ),
        measurementAnswer(
          "y12s2-eco-i2",
          "A 1800 W iron is used for 1.5 hours. Find the energy consumed in kWh.",
          "1800\\text{ W} = 1.8\\text{ kW}\\quad E = 1.8 \\times 1.5",
          "2.7 kWh",
          ["2.7", "2.7 kWh"]
        ),
        practicalChoice(
          "y12s2-eco-i3",
          "An appliance uses 10 kWh. Electricity costs $0.28/kWh. Find the cost.",
          "C",
          ["$0.28", "$1.28", "$2.80", "$28.00"],
          "Cost = 10 × $0.28 = $2.80."
        ),
        measurementAnswer(
          "y12s2-eco-i4",
          "A 2 kW appliance runs for 3 hours. The tariff is $0.30/kWh. Find the total cost.",
          "\\text{Cost} = 2 \\times 3 \\times 0.30",
          "$1.80",
          ["1.80", "$1.80", "1.8"]
        ),
        practicalChoice(
          "y12s2-eco-i5",
          "A 100 W light bulb is left on for 10 hours. How many kWh does it use?",
          "B",
          ["0.1 kWh", "1 kWh", "10 kWh", "100 kWh"],
          "0.1 kW × 10 h = 1 kWh."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using watts instead of kilowatts in the energy or cost formula.",
          fix: "Always convert to kW first: divide watts by 1000. The formula is Power (kW) × Time (h) × Tariff ($/kWh). Using 2400 W instead of 2.4 kW gives an answer 1000 times too large.",
        },
        {
          mistake: "Confusing power (kW) with energy (kWh).",
          fix: "Power (kW) is the rate of energy use — it doesn't change with time. Energy (kWh) = Power × Time. A 2 kW appliance always draws 2 kW; after 3 hours it has used 6 kWh of energy.",
        },
        {
          mistake: "Using minutes instead of hours for time.",
          fix: "The kWh formula requires time in hours. Convert minutes to hours by dividing by 60. For example, 90 minutes = 1.5 hours.",
        },
        {
          mistake: "Multiplying the tariff by watts rather than kWh.",
          fix: "The tariff is in $/kWh. Multiply it by the energy consumed in kWh: Cost = kWh × tariff. The kWh figure already accounts for both the power and the time.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-eco-m1",
          "3000 W is equal to:",
          "B",
          ["0.3 kW", "3 kW", "30 kW", "300 kW"],
          "3000 ÷ 1000 = 3 kW."
        ),
        measurementAnswer(
          "y12s2-eco-m2",
          "A 2.5 kW appliance runs for 4 hours. Find the energy consumed in kWh.",
          "E = 2.5 \\times 4",
          "10 kWh",
          ["10", "10 kWh"]
        ),
        practicalChoice(
          "y12s2-eco-m3",
          "An appliance uses 8 kWh. The tariff is $0.25/kWh. Cost = ?",
          "C",
          ["$0.25", "$0.80", "$2.00", "$8.25"],
          "Cost = 8 × $0.25 = $2.00."
        ),
        measurementAnswer(
          "y12s2-eco-m4",
          "A 800 W heater runs for 2.5 hours. Find the kWh consumed.",
          "0.8\\text{ kW} \\times 2.5\\text{ h}",
          "2 kWh",
          ["2", "2 kWh", "2.0"]
        ),
        practicalChoice(
          "y12s2-eco-m5",
          "A 1200 W hair dryer is used for 30 minutes. Tariff = $0.30/kWh. Cost = ?",
          "C",
          ["$0.36", "$5.40", "$0.18", "$1.80"],
          "1.2 kW × 0.5 h × $0.30 = $0.18."
        ),
        measurementAnswer(
          "y12s2-eco-m6",
          "A 500 W lamp runs 3 hours/day for 30 days. Tariff is $0.28/kWh. Find the monthly cost.",
          "0.5 \\times 3 \\times 30 = 45\\text{ kWh};\\quad 45 \\times 0.28",
          "$12.60",
          ["12.60", "$12.60", "12.6"]
        ),
        practicalChoice(
          "y12s2-eco-m7",
          "Which uses more energy: a 2000 W appliance for 2 hours, or a 500 W appliance for 8 hours?",
          "C",
          ["The 2000 W appliance", "The 500 W appliance", "They use the same energy", "Cannot tell without the tariff"],
          "2000 W × 2 h = 4000 Wh = 4 kWh. 500 W × 8 h = 4000 Wh = 4 kWh. Same energy."
        ),
        measurementAnswer(
          "y12s2-eco-m8",
          "A 600 W fridge runs 18 hours per day. How many kWh does it consume in one day?",
          "0.6\\text{ kW} \\times 18\\text{ h}",
          "10.8 kWh",
          ["10.8", "10.8 kWh"]
        ),
        practicalChoice(
          "y12s2-eco-m9",
          "A 0.6 kW fridge runs 20 hours at $0.30/kWh. Daily cost = ?",
          "C",
          ["$0.60", "$1.80", "$3.60", "$6.00"],
          "0.6 × 20 × 0.30 = $3.60."
        ),
        practicalChoice(
          "y12s2-eco-m10",
          "A household uses 350 kWh in a month. Tariff is $0.28/kWh. Monthly electricity bill = ?",
          "D",
          ["$35.00", "$68.60", "$87.50", "$98.00"],
          "Cost = 350 × $0.28 = $98.00."
        ),
      ],
    };
  }

  if (lesson.slug === "scale-drawings-site-plans") {
    return {
      ...base,
      description:
        "Interpret scale drawings and site plans, calculate actual dimensions from scaled measurements, and find perimeter and area from architectural plans.",
      learningIntention:
        "Use a scale ratio to convert between plan measurements and real dimensions, then calculate perimeter and area from scaled plans.",
      successCriteria: [
        "Interpret a scale ratio (e.g., 1:100) and explain what it means.",
        "Convert a plan measurement to an actual length by multiplying by the scale factor.",
        "Convert an actual length to a plan measurement by dividing by the scale factor.",
        "Calculate the perimeter and area of a room or land parcel from its scaled plan dimensions.",
      ],
      teaching: {
        paragraphs: [
          "A scale drawing represents a real object at a reduced (or enlarged) size. The scale ratio compares plan distance to actual distance. A scale of 1:100 means 1 cm on the plan equals 100 cm (1 m) in reality. A scale of 1:200 means 1 cm on the plan equals 200 cm (2 m) in reality.",
          "To find the actual length from a plan measurement: actual length = plan measurement × scale factor. For example, on a 1:50 plan, a wall that measures 6 cm is 6 × 50 = 300 cm = 3 m long in real life.",
          "To find a plan measurement from an actual length: plan measurement = actual length ÷ scale factor. If a room is 4.5 m long and the scale is 1:100, the room appears as 4.5 m ÷ 100 = 0.045 m = 4.5 cm on the plan.",
          "Once you have the actual dimensions, calculate perimeter and area using the standard formulas. For a rectangle: perimeter = 2(l + w), area = l × w. Remember to convert all measurements to the same unit before calculating.",
        ],
        latexBlocks: [
          "\\text{Actual length} = \\text{plan measurement} \\times \\text{scale factor}",
          "\\text{Plan measurement} = \\dfrac{\\text{actual length}}{\\text{scale factor}}",
          "\\text{Perimeter} = 2(l + w),\\quad \\text{Area} = l \\times w",
        ],
      },
      workedExamples: [
        {
          title: "Read actual dimensions from a scale plan",
          questionLatex:
            "\\text{A room on a 1:100 plan measures 4.5 cm × 3.2 cm. Find the actual dimensions of the room in metres.}",
          steps: [
            {
              explanation: "Scale 1:100 means 1 cm on plan = 100 cm = 1 m actual.",
              latex: "\\text{Scale factor} = 100",
            },
            {
              explanation: "Multiply each plan dimension by 100 to get actual dimensions in cm, then convert to m.",
              latex:
                "\\text{Length} = 4.5 \\times 100 = 450\\text{ cm} = 4.5\\text{ m}\\quad\\text{Width} = 3.2 \\times 100 = 320\\text{ cm} = 3.2\\text{ m}",
            },
          ],
          finalAnswerLatex:
            "\\text{Actual dimensions: }4.5\\text{ m} \\times 3.2\\text{ m}",
        },
        {
          title: "Find perimeter from a site plan",
          questionLatex:
            "\\text{A rectangular block of land on a 1:200 plan measures 5.5 cm × 8 cm. Find the actual perimeter of the block.}",
          steps: [
            {
              explanation: "Find actual dimensions: multiply plan measurements by 200.",
              latex:
                "\\text{Length} = 5.5 \\times 200 = 1100\\text{ cm} = 11\\text{ m}\\quad\\text{Width} = 8 \\times 200 = 1600\\text{ cm} = 16\\text{ m}",
            },
            {
              explanation: "Calculate perimeter.",
              latex:
                "P = 2(11 + 16) = 2 \\times 27 = 54\\text{ m}",
            },
          ],
          finalAnswerLatex: "P = 54\\text{ m}",
        },
        {
          title: "Compare floor areas from a 1:50 plan",
          questionLatex:
            "\\text{On a 1:50 plan: living room measures 6 cm × 8 cm, bedroom measures 4 cm × 5.5 cm. Find the actual floor area of each room and the combined area.}",
          steps: [
            {
              explanation: "Living room actual dimensions: multiply by 50.",
              latex:
                "6 \\times 50 = 300\\text{ cm} = 3\\text{ m},\\quad 8 \\times 50 = 400\\text{ cm} = 4\\text{ m}\\quad\\Rightarrow\\text{Area} = 3 \\times 4 = 12\\text{ m}^2",
            },
            {
              explanation: "Bedroom actual dimensions.",
              latex:
                "4 \\times 50 = 200\\text{ cm} = 2\\text{ m},\\quad 5.5 \\times 50 = 275\\text{ cm} = 2.75\\text{ m}\\quad\\Rightarrow\\text{Area} = 2 \\times 2.75 = 5.5\\text{ m}^2",
            },
            {
              explanation: "Combined area.",
              latex: "12 + 5.5 = 17.5\\text{ m}^2",
            },
          ],
          finalAnswerLatex:
            "\\text{Living room: }12\\text{ m}^2;\\quad\\text{Bedroom: }5.5\\text{ m}^2;\\quad\\text{Total: }17.5\\text{ m}^2",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-sdp-g1",
          "A scale of 1:100 means:",
          "B",
          [
            "1 m on the plan = 100 m in reality",
            "1 cm on the plan = 100 cm in reality",
            "100 cm on the plan = 1 m in reality",
            "The plan is 100 times larger than reality",
          ],
          "1:100 means every 1 cm on the plan represents 100 cm (= 1 m) in real life."
        ),
        measurementAnswer(
          "y12s2-sdp-g2",
          "A wall measures 4.5 cm on a 1:100 plan. What is the actual length of the wall in metres?",
          "\\text{Actual} = 4.5 \\times 100 = 450\\text{ cm}",
          "4.5 m",
          ["4.5", "4.5 m", "4.50 m"]
        ),
        practicalChoice(
          "y12s2-sdp-g3",
          "A room is 5 m long. On a 1:50 plan, how long will it appear?",
          "B",
          ["5 cm", "10 cm", "25 cm", "50 cm"],
          "Plan length = 500 cm ÷ 50 = 10 cm."
        ),
        measurementAnswer(
          "y12s2-sdp-g4",
          "A rectangular room on a 1:100 plan measures 3.8 cm × 5.2 cm. Find the actual area of the room in m².",
          "\\text{Actual: }3.8\\text{ m} \\times 5.2\\text{ m}",
          "19.76 m²",
          ["19.76", "19.76 m²", "19.76 m2"]
        ),
      ],
      independentPractice: [
        measurementAnswer(
          "y12s2-sdp-i1",
          "A corridor measures 7.5 cm on a 1:100 plan. Find the actual length in metres.",
          "\\text{Actual} = 7.5 \\times 100 = 750\\text{ cm}",
          "7.5 m",
          ["7.5", "7.5 m"]
        ),
        practicalChoice(
          "y12s2-sdp-i2",
          "A block of land on a 1:500 plan is 4 cm × 6 cm. What is the actual perimeter?",
          "C",
          ["50 m", "80 m", "100 m", "200 m"],
          "Actual: 20 m × 30 m. Perimeter = 2(20+30) = 100 m."
        ),
        measurementAnswer(
          "y12s2-sdp-i3",
          "On a 1:200 plan, a garden measures 3 cm × 4.5 cm. Find the actual area in m².",
          "\\text{Actual: }6\\text{ m} \\times 9\\text{ m}",
          "54 m²",
          ["54", "54 m²", "54 m2"]
        ),
        practicalChoice(
          "y12s2-sdp-i4",
          "A house wall is 8.4 m long. On a 1:100 plan, how many centimetres does this appear as?",
          "B",
          ["0.84 cm", "8.4 cm", "84 cm", "840 cm"],
          "Plan length = 840 cm ÷ 100 = 8.4 cm."
        ),
        measurementAnswer(
          "y12s2-sdp-i5",
          "A 1:50 plan shows a room that is 6 cm × 4 cm. Find the actual floor area in m².",
          "\\text{Actual: }3\\text{ m} \\times 2\\text{ m}",
          "6 m²",
          ["6", "6 m²", "6.0"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Multiplying the scale factor by the wrong unit.",
          fix: "If plan measurements are in centimetres and the scale is 1:100, the actual length is in centimetres (then convert to metres). 4.5 cm × 100 = 450 cm = 4.5 m — not 4.5 × 100 metres.",
        },
        {
          mistake: "Dividing instead of multiplying to find actual length (or vice versa).",
          fix: "Actual length = plan measurement × scale factor (bigger). Plan measurement = actual length ÷ scale factor (smaller). The plan is always smaller than reality for typical architectural scales.",
        },
        {
          mistake: "Finding area by squaring only one dimension instead of multiplying length × width.",
          fix: "Area = length × width. Both dimensions must be converted to actual size first. Do not calculate area from the plan measurements and then scale — the scaling error compounds.",
        },
        {
          mistake: "Confusing perimeter and area units.",
          fix: "Perimeter is in linear units (m). Area is in square units (m²). If the room is 3 m × 4 m, the perimeter is 2(3+4) = 14 m and the area is 12 m² — not 12 m.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-sdp-m1",
          "A scale of 1:200 means 1 cm on the plan equals how many metres in reality?",
          "B",
          ["0.2 m", "2 m", "20 m", "200 m"],
          "1 cm × 200 = 200 cm = 2 m."
        ),
        measurementAnswer(
          "y12s2-sdp-m2",
          "A wall measures 6.5 cm on a 1:200 plan. Actual length in metres?",
          "6.5 \\times 200 = 1300\\text{ cm}",
          "13 m",
          ["13", "13 m", "13.0 m"]
        ),
        practicalChoice(
          "y12s2-sdp-m3",
          "A room is 6 m × 4.5 m. On a 1:50 plan, what are the plan dimensions?",
          "C",
          ["6 cm × 4.5 cm", "3 cm × 2.25 cm", "12 cm × 9 cm", "60 cm × 45 cm"],
          "600 ÷ 50 = 12 cm and 450 ÷ 50 = 9 cm."
        ),
        measurementAnswer(
          "y12s2-sdp-m4",
          "A rectangular land parcel on a 1:500 plan is 3.2 cm × 5 cm. Find the actual perimeter in metres.",
          "\\text{Actual: }16\\text{ m} \\times 25\\text{ m}\\quad P=2(16+25)",
          "82 m",
          ["82", "82 m"]
        ),
        practicalChoice(
          "y12s2-sdp-m5",
          "A 1:100 plan shows a room 4 cm × 3.5 cm. Floor area = ?",
          "C",
          ["14 m²", "1.4 m²", "14 m", "140 m²"],
          "Actual: 4 m × 3.5 m = 14 m²."
        ),
        measurementAnswer(
          "y12s2-sdp-m6",
          "A bedroom is 3.6 m wide. On a 1:100 plan, how many centimetres wide does it appear?",
          "360\\text{ cm} \\div 100",
          "3.6 cm",
          ["3.6", "3.6 cm"]
        ),
        practicalChoice(
          "y12s2-sdp-m7",
          "A kitchen on a 1:50 plan is 5 cm × 6 cm. Actual area?",
          "D",
          ["30 m²", "75 m²", "1500 m²", "7.5 m²"],
          "Actual: 2.5 m × 3 m = 7.5 m²."
        ),
        measurementAnswer(
          "y12s2-sdp-m8",
          "On a 1:200 plan, two rooms measure 4 cm × 3 cm and 3.5 cm × 2.5 cm. Find the total actual floor area in m².",
          "\\text{Room 1: }8\\times6=48\\text{ m}^2\\quad\\text{Room 2: }7\\times5=35\\text{ m}^2",
          "83 m²",
          ["83", "83 m²"]
        ),
        practicalChoice(
          "y12s2-sdp-m9",
          "On a 1:100 plan, a room appears 5.5 cm × 4.2 cm. Perimeter of the actual room?",
          "B",
          ["9.7 m", "19.4 m", "23.1 m²", "55 m"],
          "Actual: 5.5 m × 4.2 m. Perimeter = 2(5.5+4.2) = 2 × 9.7 = 19.4 m."
        ),
        practicalChoice(
          "y12s2-sdp-m10",
          "A backyard on a 1:100 plan is 12 cm long. A fence runs along the entire length on one side. Actual fence length?",
          "C",
          ["1.2 m", "120 cm", "12 m", "120 m"],
          "12 cm × 100 = 1200 cm = 12 m."
        ),
      ],
    };
  }

  if (lesson.slug === "rainfall-volume-calculations") {
    return {
      ...base,
      description:
        "Apply V = Ah to calculate water collected from rainfall over a catchment area, and convert between units of depth (mm, cm, m) and volume (m³, litres, kL).",
      learningIntention:
        "Use the formula V = Ah to find the volume of water collected from rainfall and solve practical water-storage problems.",
      successCriteria: [
        "State the formula V = Ah and identify A as area and h as rainfall depth.",
        "Convert rainfall depth between millimetres, centimetres, and metres.",
        "Calculate volume of water collected in m³ and convert to litres or kilolitres.",
        "Solve practical problems involving tank capacity and overflow.",
      ],
      teaching: {
        paragraphs: [
          "When rain falls on a flat surface (roof, paddock, dam catchment), all the water from that surface is collected. The volume collected is V = Ah, where A is the horizontal catchment area in m² and h is the depth of rainfall in metres.",
          "Rainfall depth is usually reported in millimetres. Always convert to metres before using V = Ah: divide mm by 1000. For example, 25 mm of rain = 0.025 m.",
          "Volume from V = Ah is in cubic metres (m³). Convert to litres using 1 m³ = 1000 litres, and to kilolitres using 1 kL = 1000 L = 1 m³.",
          "Practical questions may involve a tank that overflows. If the tank has capacity C litres and volume collected is V litres, then overflow occurs when V > C. The amount stored is min(V, C).",
        ],
        latexBlocks: [
          "V = A \\times h\\quad(\\text{A in m}^2,\\; h\\text{ in m},\\; V\\text{ in m}^3)",
          "1\\text{ mm} = 0.001\\text{ m}\\quad 1\\text{ m}^3 = 1000\\text{ L} = 1\\text{ kL}",
          "\\text{Volume collected (L)} = A\\text{ (m}^2\\text{)} \\times h\\text{ (mm)} \\times 1",
        ],
      },
      workedExamples: [
        {
          title: "Calculate volume collected from a roof",
          questionLatex:
            "\\text{A roof has a horizontal area of 120 m}^2\\text{. Rainfall is 35 mm. Find the volume of water collected in litres.}",
          steps: [
            {
              explanation: "Convert rainfall depth to metres.",
              latex: "h = 35\\text{ mm} = 0.035\\text{ m}",
            },
            {
              explanation: "Apply V = Ah.",
              latex: "V = 120 \\times 0.035 = 4.2\\text{ m}^3",
            },
            {
              explanation: "Convert to litres.",
              latex: "V = 4.2 \\times 1000 = 4200\\text{ L}",
            },
          ],
          finalAnswerLatex: "V = 4200\\text{ L}",
        },
        {
          title: "Find the catchment area required",
          questionLatex:
            "\\text{A water tank needs 3000 L from a single 20 mm rainfall event. What catchment area is required?}",
          steps: [
            {
              explanation: "Convert target volume to m³ and rainfall to m.",
              latex: "V = 3000\\text{ L} = 3\\text{ m}^3,\\quad h = 20\\text{ mm} = 0.020\\text{ m}",
            },
            {
              explanation: "Rearrange V = Ah to find A.",
              latex: "A = \\dfrac{V}{h} = \\dfrac{3}{0.020} = 150\\text{ m}^2",
            },
          ],
          finalAnswerLatex: "A = 150\\text{ m}^2",
        },
        {
          title: "Determine tank overflow",
          questionLatex:
            "\\text{A paddock of 800 m}^2\\text{ receives 60 mm of rain. The collection tank holds 40 kL. How much water is collected, and does the tank overflow?}",
          steps: [
            {
              explanation: "Find volume collected.",
              latex:
                "V = 800 \\times 0.060 = 48\\text{ m}^3 = 48\\text{ kL}",
            },
            {
              explanation: "Compare with tank capacity.",
              latex:
                "48\\text{ kL} > 40\\text{ kL}\\implies\\text{Tank overflows.}\\quad\\text{Overflow} = 48 - 40 = 8\\text{ kL}",
            },
          ],
          finalAnswerLatex:
            "48\\text{ kL collected; tank overflows by }8\\text{ kL}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-rvc-g1",
          "A roof area of 80 m² collects water from 25 mm of rain. Volume collected = ?",
          "C",
          ["200 L", "1000 L", "2000 L", "8000 L"],
          "V = 80 × 0.025 = 2 m³ = 2000 L."
        ),
        measurementAnswer(
          "y12s2-rvc-g2",
          "Convert 45 mm of rainfall to metres.",
          "45 \\div 1000",
          "0.045 m",
          ["0.045", "0.045 m"]
        ),
        practicalChoice(
          "y12s2-rvc-g3",
          "V = Ah gives volume in m³ when A is in m² and h is in metres. To convert this to litres, multiply by:",
          "C",
          ["10", "100", "1000", "10000"],
          "1 m³ = 1000 litres."
        ),
        measurementAnswer(
          "y12s2-rvc-g4",
          "A roof of area 150 m² receives 30 mm of rainfall. Find the volume in litres.",
          "V = 150 \\times 0.030 = 4.5\\text{ m}^3",
          "4500 L",
          ["4500", "4500 L", "4500 litres"]
        ),
      ],
      independentPractice: [
        measurementAnswer(
          "y12s2-rvc-i1",
          "A catchment area of 200 m² receives 18 mm of rain. Find the volume collected in litres.",
          "V = 200 \\times 0.018",
          "3600 L",
          ["3600", "3600 L"]
        ),
        practicalChoice(
          "y12s2-rvc-i2",
          "A tank needs to collect 6000 L from a 30 mm event. What catchment area is required?",
          "C",
          ["50 m²", "150 m²", "200 m²", "600 m²"],
          "A = V/h = 6 m³ ÷ 0.030 = 200 m²."
        ),
        measurementAnswer(
          "y12s2-rvc-i3",
          "A roof of 90 m² collects water from 50 mm of rainfall. Find the volume in kL.",
          "V = 90 \\times 0.050 = 4.5\\text{ m}^3",
          "4.5 kL",
          ["4.5", "4.5 kL"]
        ),
        practicalChoice(
          "y12s2-rvc-i4",
          "A paddock of 500 m² receives 80 mm of rain. The tank holds 35 kL. Does it overflow?",
          "B",
          ["No — 40 kL collected, which is less than 35 kL", "Yes — 40 kL collected exceeds the 35 kL tank", "No — the tank holds exactly 40 kL", "Cannot tell without the tank dimensions"],
          "V = 500 × 0.080 = 40 m³ = 40 kL. Tank capacity = 35 kL. 40 > 35, so it overflows."
        ),
        measurementAnswer(
          "y12s2-rvc-i5",
          "Rainfall is 12 mm over a 600 m² catchment. How many kL of water is collected?",
          "V = 600 \\times 0.012 = 7.2\\text{ m}^3",
          "7.2 kL",
          ["7.2", "7.2 kL"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using rainfall depth in millimetres directly in V = Ah without converting to metres.",
          fix: "Always divide mm by 1000 to get metres before applying V = Ah. Using 25 instead of 0.025 gives an answer 1000 times too large.",
        },
        {
          mistake: "Confusing m³ and litres.",
          fix: "1 m³ = 1000 L = 1 kL. After finding V in m³, multiply by 1000 to get litres. Do not leave the answer in m³ if the question asks for litres.",
        },
        {
          mistake: "Using the roof's sloped surface area instead of its horizontal catchment area.",
          fix: "Rainfall is measured vertically. The catchment area A is always the horizontal projection of the roof — the area seen from directly above.",
        },
        {
          mistake: "Forgetting to check tank overflow by comparing volume collected with tank capacity.",
          fix: "If the volume collected exceeds tank capacity, the tank overflows. Always compare V_collected with V_tank and report overflow = V_collected − V_tank.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-rvc-m1",
          "V = Ah gives the volume of water collected when A is in m² and h is in metres. The unit of V is:",
          "B",
          ["m²", "m³", "litres", "mm"],
          "m² × m = m³."
        ),
        measurementAnswer(
          "y12s2-rvc-m2",
          "A 100 m² roof collects water from 40 mm of rain. Volume in litres?",
          "V = 100 \\times 0.040 = 4\\text{ m}^3",
          "4000 L",
          ["4000", "4000 L"]
        ),
        practicalChoice(
          "y12s2-rvc-m3",
          "What catchment area is needed to collect 5000 L from a 25 mm rainfall?",
          "C",
          ["50 m²", "125 m²", "200 m²", "500 m²"],
          "A = 5 m³ ÷ 0.025 = 200 m²."
        ),
        measurementAnswer(
          "y12s2-rvc-m4",
          "A farm dam has a catchment area of 1500 m². Rainfall is 22 mm. Volume collected in kL?",
          "V = 1500 \\times 0.022",
          "33 kL",
          ["33", "33 kL"]
        ),
        practicalChoice(
          "y12s2-rvc-m5",
          "A 250 m² catchment collects water from 48 mm of rainfall. Volume collected ≈ ?",
          "C",
          ["1200 L", "8333 L", "12000 L", "120000 L"],
          "V = 250 × 0.048 = 12 m³ = 12000 L."
        ),
        measurementAnswer(
          "y12s2-rvc-m6",
          "A roof of 180 m² catches 55 mm of rain. The tank capacity is 8 kL. How much water overflows?",
          "V = 180 \\times 0.055 = 9.9\\text{ kL}\\quad\\text{Overflow} = 9.9 - 8",
          "1.9 kL",
          ["1.9", "1.9 kL"]
        ),
        practicalChoice(
          "y12s2-rvc-m7",
          "1 kL equals:",
          "C",
          ["1 L", "100 L", "1000 L", "10000 L"],
          "kL = kilolitre. 1 kL = 1000 L = 1 m³."
        ),
        measurementAnswer(
          "y12s2-rvc-m8",
          "A carpark of 3000 m² receives 15 mm of rain. Volume of runoff in m³?",
          "V = 3000 \\times 0.015",
          "45 m³",
          ["45", "45 m³"]
        ),
        practicalChoice(
          "y12s2-rvc-m9",
          "A roof collects 7.2 kL of water. Rainfall was 60 mm. What is the catchment area?",
          "B",
          ["43.2 m²", "120 m²", "432 m²", "720 m²"],
          "A = 7.2 m³ ÷ 0.060 = 120 m²."
        ),
        practicalChoice(
          "y12s2-rvc-m10",
          "Two tanks each hold 10 kL. A 400 m² catchment receives 60 mm of rain. Combined, can both tanks be filled?",
          "B",
          ["No — only 24 kL is collected, which fills both 10 kL tanks with 4 kL overflow", "Yes — 24 kL collected fills both 10 kL tanks with 4 kL overflow", "No — only 24 L is collected", "Yes — 2400 L fills both tanks"],
          "V = 400 × 0.060 = 24 m³ = 24 kL. Two tanks = 20 kL total. 24 kL > 20 kL, so yes, both fill and 4 kL overflows."
        ),
      ],
    };
  }

  if (lesson.slug === "bearings-navigation-problems") {
    return {
      ...base,
      description:
        "Read and write true bearings, calculate back bearings, find interior angles from bearing information, and apply the cosine rule to solve practical navigation problems.",
      learningIntention:
        "Use true bearings to describe directions and solve distance problems in navigation and surveying contexts.",
      successCriteria: [
        "Read and write a true bearing using three-figure notation.",
        "Identify the four cardinal bearings: N = 000°, E = 090°, S = 180°, W = 270°.",
        "Calculate a back bearing by adding or subtracting 180°.",
        "Find the interior angle at a turning point from two bearings.",
        "Apply the cosine rule to find distances in bearing problems.",
      ],
      teaching: {
        paragraphs: [
          "A true bearing describes a direction as an angle measured clockwise from True North. It is always written with three digits, so north is 000°, east is 090°, south is 180°, and west is 270°.",
          "If you travel from A to B on a bearing of 060°, then from B looking back towards A, the direction is called the back bearing. To find it, add 180° to the forward bearing if the forward bearing is less than 180°, or subtract 180° if it is 180° or more.",
          "Many bearing problems involve two ships leaving a port or a journey with a turn. The key step is finding the angle inside the triangle at the relevant vertex. At the port, the included angle equals the difference between the two bearings. At a turning point B, use the back bearing minus the leaving bearing.",
          "Once the interior angle is known, apply the cosine rule with the two known distances: c² = a² + b² − 2ab cos C. If the angle happens to be 90°, Pythagoras is quicker.",
        ],
        latexBlocks: [
          "\\text{back bearing} = \\text{forward bearing} \\pm 180°",
          "\\text{included angle at port} = \\text{larger bearing} - \\text{smaller bearing}",
          "\\text{angle at turn} = \\text{back bearing to previous point} - \\text{bearing to next point}",
          "c^2 = a^2 + b^2 - 2ab\\cos C",
        ],
      },
      workedExamples: [
        {
          title: "Read bearings and find a back bearing",
          questionLatex:
            "\\text{A ship sails from port on bearing }050°.\\text{ Find the back bearing from the destination to port.}",
          steps: [
            {
              explanation:
                "The forward bearing is 050°, which is less than 180°, so add 180°.",
              latex: "050° + 180° = 230°",
            },
          ],
          finalAnswerLatex: "\\text{Back bearing} = 230°",
        },
        {
          title: "Find the included angle at the starting port",
          questionLatex:
            "\\text{Two ships leave port on bearings }040°\\text{ and }100°.\\text{ Find the angle between their paths.}",
          steps: [
            {
              explanation:
                "Both bearings are measured from the same point, so the angle between the two paths is the difference.",
              latex: "100° - 040° = 60°",
            },
          ],
          finalAnswerLatex: "\\text{Included angle} = 60°",
        },
        {
          title: "Use cosine rule after finding the interior angle",
          questionLatex:
            "\\text{Ship A sails bearing }040°\\text{ for }150\\text{ km.}\\\\\\text{Ship B sails bearing }100°\\text{ for }120\\text{ km.}\\\\\\text{Find the distance between them.}",
          steps: [
            {
              explanation: "The included angle at the port is the bearing difference.",
              latex: "100° - 040° = 60°",
            },
            {
              explanation:
                "Apply the cosine rule with both distances and the included angle.",
              latex: "d^2 = 150^2 + 120^2 - 2(150)(120)\\cos60°",
            },
            {
              explanation: "Evaluate and take the square root.",
              latex: "d^2 = 22500 + 14400 - 18000 = 18900 \\implies d \\approx 137.5\\text{ km}",
            },
          ],
          finalAnswerLatex: "137.5\\text{ km}",
        },
        {
          title: "Find the interior angle at a turning point",
          questionLatex:
            "\\text{From A, travel bearing }060°\\text{ to B. From B, travel bearing }120°\\text{ to C.}\\\\\\text{Find the interior angle at B.}",
          steps: [
            {
              explanation:
                "Find the back bearing from B looking towards A. The arrival bearing at B was 060°, so add 180°.",
              latex: "060° + 180° = 240°\\text{ (back bearing to A)}",
            },
            {
              explanation:
                "The leaving bearing from B is 120°. The interior angle is the back bearing minus the leaving bearing.",
              latex: "240° - 120° = 120°",
            },
          ],
          finalAnswerLatex: "\\text{Angle at B} = 120°",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-bear-g1",
          "A true bearing of 090° represents which direction?",
          "B",
          ["North", "East", "South", "West"],
          "Bearings are measured clockwise from True North. 000° is north, 090° is exactly east, 180° is south, and 270° is west."
        ),
        measurementAnswer(
          "y12s2-bear-g2",
          "A ship sails from port on a bearing of 035°. Find the back bearing from the destination back to port.",
          "\\text{back bearing} = 035° + 180°",
          "215",
          ["215°", "215 degrees"]
        ),
        measurementAnswer(
          "y12s2-bear-g3",
          "Two ships leave port. Ship A sails on bearing 040° and Ship B sails on bearing 100°. What is the angle between their courses at the port?",
          "\\text{included angle} = 100° - 040°",
          "60",
          ["60°", "60 degrees"]
        ),
        measurementAnswer(
          "y12s2-bear-g4",
          "Two ships leave port. Ship A sails bearing 040° for 150 km and Ship B sails bearing 100° for 120 km. Find the distance between them to 1 decimal place.",
          "d^2 = 150^2 + 120^2 - 2(150)(120)\\cos60°",
          "137.5",
          ["137.5 km", "137.5km"]
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-bear-i1",
          "A hiker walks on bearing 125°. What is the return bearing from the destination back to the start?",
          "B",
          ["055°", "305°", "235°", "315°"],
          "The forward bearing is 125°, which is less than 180°. Back bearing = 125° + 180° = 305°."
        ),
        measurementAnswer(
          "y12s2-bear-i2",
          "From town A, a road on bearing 070° runs for 50 km to B. From B, a road on bearing 160° runs for 40 km to C. Find the interior angle at B.",
          "\\text{back bearing to A} = 070° + 180° = 250°,\\quad \\text{angle at B} = 250° - 160°",
          "90",
          ["90°", "90 degrees"]
        ),
        measurementAnswer(
          "y12s2-bear-i3",
          "Using the same triangle (AB = 50 km, BC = 40 km, angle at B = 90°), find AC to 1 decimal place.",
          "AC^2 = 50^2 + 40^2",
          "64.0",
          ["64", "64.0 km", "64.0km"]
        ),
        practicalChoice(
          "y12s2-bear-i4",
          "When two ships leave from the same port on different bearings, the included angle at the port equals:",
          "C",
          ["The sum of the bearings", "Half the larger bearing", "The difference between the two bearings", "The back bearing of the larger"],
          "Subtracting the smaller bearing from the larger gives the angle between the two paths at the port."
        ),
        measurementAnswer(
          "y12s2-bear-i5",
          "Two ships leave port. Ship P sails bearing 020° for 60 km. Ship Q sails bearing 080° for 80 km. Find the distance PQ to 1 decimal place.",
          "d^2 = 60^2 + 80^2 - 2(60)(80)\\cos60°",
          "72.1",
          ["72.1 km", "72.1km"]
        ),
      ],
      commonMistakes: [
        { mistake: "Writing bearings with fewer than three digits.", fix: "Always use three digits: write 050° not 50°, and 090° not 90°." },
        { mistake: "Adding 180° when the forward bearing is already more than 180°.", fix: "If the forward bearing ≥ 180°, subtract 180° to get the back bearing." },
        { mistake: "Using the bearing angle directly as the interior triangle angle.", fix: "At a turning point, the interior angle is the back bearing minus the leaving bearing, not the raw bearing value." },
        { mistake: "Forgetting to take the square root after using the cosine rule.", fix: "The cosine rule gives c squared. Always take the square root to find the side length." },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-bear-m1",
          "A true bearing is measured:",
          "B",
          ["Anticlockwise from south", "Clockwise from true north", "From east only", "As a compass letter direction"],
          "True bearings are always measured clockwise from true north and written with three digits."
        ),
        measurementAnswer(
          "y12s2-bear-m2",
          "A bearing of 270° corresponds to which cardinal direction? Write the direction name.",
          "270°",
          "West",
          ["west", "W"]
        ),
        measurementAnswer(
          "y12s2-bear-m3",
          "A vessel sails on bearing 150° to an island. Find the back bearing from the island to the departure point.",
          "\\text{back bearing} = 150° + 180°",
          "330",
          ["330°", "330 degrees"]
        ),
        practicalChoice(
          "y12s2-bear-m4",
          "A person walks on bearing 305° to a cave. What is the back bearing from the cave to the start?",
          "A",
          ["125°", "135°", "115°", "215°"],
          "The forward bearing 305° is greater than 180°, so subtract 180°: 305° − 180° = 125°."
        ),
        measurementAnswer(
          "y12s2-bear-m5",
          "Two ships leave port. Ship A sails bearing 050° for 120 km. Ship B sails bearing 080° for 90 km. What is the included angle at the port between their paths?",
          "\\text{angle} = 080° - 050°",
          "30",
          ["30°", "30 degrees"]
        ),
        measurementAnswer(
          "y12s2-bear-m6",
          "Using the ship setup (120 km on bearing 050°, 90 km on bearing 080°, included angle 30°), find the distance between the ships to 1 decimal place.",
          "d^2 = 120^2 + 90^2 - 2(120)(90)\\cos30°",
          "61.6",
          ["61.6 km", "61.6km"]
        ),
        measurementAnswer(
          "y12s2-bear-m7",
          "From A, travel bearing 060° for 80 km to B. From B, travel bearing 120° for 100 km to C. Find the interior angle at B.",
          "\\text{back bearing to A} = 060° + 180° = 240°,\\quad \\text{angle at B} = 240° - 120°",
          "120",
          ["120°", "120 degrees"]
        ),
        measurementAnswer(
          "y12s2-bear-m8",
          "Using the triangle (AB = 80 km, BC = 100 km, angle at B = 120°), find AC to 1 decimal place.",
          "AC^2 = 80^2 + 100^2 - 2(80)(100)\\cos120°",
          "156.2",
          ["156.2 km", "156.2km"]
        ),
        practicalChoice(
          "y12s2-bear-m9",
          "In a bearing journey problem with two sides and an included angle at the turning point, which formula finds the third side?",
          "C",
          ["Sine rule using a known opposite pair", "Right-angle Pythagoras only", "Cosine rule — two sides and included angle", "Ratio sharing"],
          "Bearing journey problems typically give two distances and an interior angle, which is the cosine rule setup."
        ),
        measurementAnswer(
          "y12s2-bear-m10",
          "From A, travel bearing 150° for 200 km to B. From B, travel bearing 240° for 150 km to C. Find AC.",
          "\\text{back bearing to A} = 150° + 180° = 330°,\\quad \\text{angle at B} = 330° - 240° = 90°,\\quad AC^2 = 200^2 + 150^2",
          "250",
          ["250 km", "250km"]
        ),
      ],
    };
  }

  if (lesson.slug === "time-zones-conversions") {
    return {
      ...base,
      description:
        "Convert times between Australian and international time zones using UTC offsets, handle midnight crossings and day changes, and understand the International Date Line.",
      learningIntention:
        "Use UTC offsets to convert times between cities and interpret time zone differences in practical contexts.",
      successCriteria: [
        "Explain what UTC is and what a UTC offset represents.",
        "Convert a local time to UTC and then to another city's local time.",
        "Calculate the hour difference between two time zones from their offsets.",
        "Handle midnight crossings that cause a day change.",
        "Describe what happens to the calendar date when crossing the International Date Line.",
      ],
      teaching: {
        paragraphs: [
          "UTC (Coordinated Universal Time) is the global reference for time. Every other time zone is described as UTC plus or minus a number of hours. Cities east of Greenwich are ahead of UTC (positive offset); cities west are behind (negative offset).",
          "Australia spans several time zones. Sydney and Melbourne use AEST (UTC+10) in winter or AEDT (UTC+11) during daylight saving. Perth uses AWST (UTC+8). Adelaide uses ACST (UTC+9:30). To find the time difference between two Australian cities, subtract the smaller offset from the larger.",
          "To find the time in another city, first convert to UTC by subtracting your offset from your local time. Then add the destination offset. Alternatively, add or subtract the offset difference directly.",
          "When a calculation crosses midnight, the day changes. Adding hours past midnight moves the date forward; subtracting hours before midnight moves the date backward. The International Date Line near 180° longitude is where the calendar day changes: crossing it heading east (towards the Americas) sets the date back one day; crossing heading west (towards Asia-Pacific) adds one day.",
        ],
        latexBlocks: [
          "\\text{UTC time} = \\text{local time} - \\text{UTC offset}",
          "\\text{destination time} = \\text{UTC time} + \\text{destination offset}",
          "\\text{hour difference} = \\text{destination offset} - \\text{source offset}",
          "\\text{Australian offsets: AEST = UTC+10,}\\quad\\text{AWST = UTC+8,}\\quad\\text{ACST = UTC+9:30}",
        ],
      },
      workedExamples: [
        {
          title: "Convert between two cities using UTC",
          questionLatex:
            "\\text{It is 3:00 pm in London (UTC+0). What time is it in Sydney (AEST, UTC+10)?}",
          steps: [
            {
              explanation:
                "Sydney is 10 hours ahead of London (10 − 0 = 10).",
            },
            {
              explanation: "Add 10 hours to the London time.",
              latex: "3{:}00\\text{ pm} + 10\\text{ h} = 1{:}00\\text{ am (next day)}",
            },
          ],
          finalAnswerLatex: "1{:}00\\text{ am (next day)}",
        },
        {
          title: "Convert using UTC as an intermediate step",
          questionLatex:
            "\\text{It is 8:00 am Tuesday in Tokyo (UTC+9). What time and day is it in New York (UTC−5)?}",
          steps: [
            {
              explanation: "Convert Tokyo time to UTC by subtracting Tokyo's offset.",
              latex: "8{:}00\\text{ am} - 9\\text{ h} = 11{:}00\\text{ pm Monday UTC}",
            },
            {
              explanation: "Apply New York's offset to find local time.",
              latex: "11{:}00\\text{ pm} - 5\\text{ h} = 6{:}00\\text{ pm Monday}",
            },
          ],
          finalAnswerLatex: "6{:}00\\text{ pm Monday}",
        },
        {
          title: "Flight arrival time across time zones",
          questionLatex:
            "\\text{A flight leaves Sydney (UTC+10) at 2:00 pm Monday and takes 9 hours.}\\\\\\text{What is the local arrival time in Dubai (UTC+4)?}",
          steps: [
            {
              explanation: "Convert Sydney departure to UTC.",
              latex: "2{:}00\\text{ pm} - 10\\text{ h} = 4{:}00\\text{ am Monday UTC}",
            },
            {
              explanation: "Add the 9-hour flight time to get arrival in UTC.",
              latex: "4{:}00\\text{ am} + 9\\text{ h} = 1{:}00\\text{ pm Monday UTC}",
            },
            {
              explanation: "Apply Dubai's offset.",
              latex: "1{:}00\\text{ pm} + 4\\text{ h} = 5{:}00\\text{ pm Monday}",
            },
          ],
          finalAnswerLatex: "5{:}00\\text{ pm Monday}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-tz-g1",
          "Sydney (AEST, UTC+10) compared to London (UTC+0): Sydney is how many hours ahead?",
          "B",
          ["5 hours ahead", "10 hours ahead", "10 hours behind", "15 hours ahead"],
          "The offset difference is 10 − 0 = 10. Being east of Greenwich, Sydney is 10 hours ahead."
        ),
        measurementAnswer(
          "y12s2-tz-g2",
          "It is 6:00 am in London (UTC+0). What time is it in Sydney (AEST, UTC+10)? Write the answer in the form H:MM am/pm.",
          "6{:}00\\text{ am} + 10\\text{ h}",
          "4:00 pm",
          ["4pm", "4:00pm", "16:00"]
        ),
        practicalChoice(
          "y12s2-tz-g3",
          "When it is noon in Sydney (UTC+10), what time is it in Dubai (UTC+4)?",
          "B",
          ["4:00 am", "6:00 am", "8:00 pm", "4:00 pm"],
          "Sydney is 10 − 4 = 6 hours ahead of Dubai. Noon − 6 hours = 6:00 am in Dubai."
        ),
        practicalChoice(
          "y12s2-tz-g4",
          "A flight leaves Sydney (UTC+10) at 11:00 pm Monday and takes 8 hours to reach Tokyo (UTC+9). What is the local Tokyo arrival time and day?",
          "B",
          ["7:00 am Tuesday", "6:00 am Tuesday", "5:00 am Tuesday", "6:00 am Monday"],
          "Sydney 11 pm = 1 pm Monday UTC. Add 8 hours: 9 pm Monday UTC. Add Tokyo offset of 9 hours: 6:00 am Tuesday."
        ),
      ],
      independentPractice: [
        measurementAnswer(
          "y12s2-tz-i1",
          "What UTC time corresponds to 3:00 pm in Sydney (AEST, UTC+10)? Write the answer in the form H:MM am.",
          "3{:}00\\text{ pm} - 10\\text{ h}",
          "5:00 am",
          ["5am", "5:00am", "05:00"]
        ),
        practicalChoice(
          "y12s2-tz-i2",
          "It is 10:00 am on Tuesday in New York (UTC−5). What time and day is it in Sydney (UTC+10)?",
          "B",
          ["1:00 am Tuesday", "1:00 am Wednesday", "7:00 pm Monday", "3:00 pm Tuesday"],
          "Sydney is 10 − (−5) = 15 hours ahead. 10:00 am + 15 hours = 1:00 am Wednesday."
        ),
        measurementAnswer(
          "y12s2-tz-i3",
          "How many hours ahead is Sydney (UTC+10) compared to Perth (AWST, UTC+8)?",
          "10 - 8",
          "2",
          ["2 hours"]
        ),
        measurementAnswer(
          "y12s2-tz-i4",
          "It is 4:00 pm in Perth (UTC+8). What time is it in Sydney (UTC+10)? Write the answer in the form H:MM pm.",
          "4{:}00\\text{ pm} + 2\\text{ h}",
          "6:00 pm",
          ["6pm", "6:00pm", "18:00"]
        ),
        practicalChoice(
          "y12s2-tz-i5",
          "The International Date Line runs near which longitude?",
          "D",
          ["0° (the Greenwich meridian)", "45° East", "90° West", "180°"],
          "The International Date Line runs near 180° longitude in the Pacific Ocean. Crossing it east subtracts a day; crossing it west adds a day."
        ),
      ],
      commonMistakes: [
        { mistake: "Adding the UTC offset instead of subtracting it to find UTC.", fix: "UTC = local time − offset. Always subtract the local offset when converting to UTC." },
        { mistake: "Mixing up ahead and behind when the offset is negative.", fix: "A negative UTC offset (e.g. UTC−5) means that city is behind UTC, not ahead." },
        { mistake: "Ignoring the day change when calculation crosses midnight.", fix: "If adding hours goes past midnight, the day increases by one. If subtracting hours goes before midnight, the day decreases by one." },
        { mistake: "Confusing the direction of the date change at the International Date Line.", fix: "Heading east across the IDL goes back a day; heading west adds a day." },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-tz-m1",
          "UTC+10 means a time zone is:",
          "B",
          ["10 hours behind UTC", "10 hours ahead of UTC", "10 minutes ahead of UTC", "The same time as UTC"],
          "A positive offset means the zone is ahead of UTC by that many hours."
        ),
        measurementAnswer(
          "y12s2-tz-m2",
          "It is 9:00 am in London (UTC+0). What time is it in Sydney (AEST, UTC+10)? Write the answer in the form H:MM pm.",
          "9{:}00\\text{ am} + 10\\text{ h}",
          "7:00 pm",
          ["7pm", "7:00pm", "19:00"]
        ),
        measurementAnswer(
          "y12s2-tz-m3",
          "How many hours ahead is Sydney (UTC+10) compared to New York (UTC−5)?",
          "10 - (-5)",
          "15",
          ["15 hours"]
        ),
        practicalChoice(
          "y12s2-tz-m4",
          "It is 11:00 pm Sunday in Sydney (UTC+10). What time and day is it in London (UTC+0)?",
          "B",
          ["9:00 am Monday", "1:00 pm Sunday", "9:00 am Sunday", "1:00 pm Monday"],
          "London is 10 hours behind Sydney: 11:00 pm − 10 hours = 1:00 pm Sunday."
        ),
        measurementAnswer(
          "y12s2-tz-m5",
          "It is 10:00 am in London (UTC+0). What time is it in Brisbane (AEST, UTC+10)? Write the answer in the form H:MM pm.",
          "10{:}00\\text{ am} + 10\\text{ h}",
          "8:00 pm",
          ["8pm", "8:00pm", "20:00"]
        ),
        practicalChoice(
          "y12s2-tz-m6",
          "Perth (UTC+8) compared to Sydney (UTC+10): Perth is:",
          "C",
          ["8 hours behind Sydney", "18 hours ahead of Sydney", "2 hours behind Sydney", "2 hours ahead of Sydney"],
          "Offset difference = 10 − 8 = 2. Perth has the smaller offset, so it is 2 hours behind Sydney."
        ),
        practicalChoice(
          "y12s2-tz-m7",
          "A flight departs Sydney (UTC+10) at 6:00 pm Friday and takes 22 hours to reach London (UTC+0). What is the local London arrival time and day?",
          "B",
          ["4:00 am Saturday", "6:00 am Saturday", "4:00 pm Friday", "4:00 am Sunday"],
          "Sydney 6 pm = 8 am Friday UTC. Add 22 hours: 6 am Saturday UTC. London is UTC+0, so arrival is 6:00 am Saturday."
        ),
        measurementAnswer(
          "y12s2-tz-m8",
          "It is 3:00 pm in Tokyo (UTC+9). What time is it in Sydney (AEST, UTC+10)? Write the answer in the form H:MM pm.",
          "3{:}00\\text{ pm} + 1\\text{ h}",
          "4:00 pm",
          ["4pm", "4:00pm", "16:00"]
        ),
        practicalChoice(
          "y12s2-tz-m9",
          "When a plane crosses the International Date Line heading east from Japan to the USA, the calendar date:",
          "B",
          ["Increases by one day", "Decreases by one day", "Stays the same", "Changes by two days"],
          "Crossing the IDL heading east moves the calendar back one day. You arrive on the previous calendar date."
        ),
        measurementAnswer(
          "y12s2-tz-m10",
          "It is 3:00 pm in London (UTC+0). What time is it in New York (UTC−5)? Write the answer in the form H:MM am.",
          "3{:}00\\text{ pm} - 5\\text{ h}",
          "10:00 am",
          ["10am", "10:00am"]
        ),
      ],
    };
  }

  if (lesson.slug === "trigonometry-revision") {
    return {
      ...base,
      description:
        "Activate Year 11 right-triangle skills: label hypotenuse, opposite and adjacent sides relative to a given angle, apply Pythagoras' theorem, and use SOH CAH TOA to find unknown sides and angles.",
      learningIntention:
        "Recall and apply the Year 11 right-triangle toolkit — Pythagoras and SOH CAH TOA — so the Year 12 trig work on radians, non-right-angled triangles and bearings builds on a solid base.",
      successCriteria: [
        "Label the hypotenuse, opposite and adjacent sides of a right triangle relative to a named angle.",
        "Apply Pythagoras' theorem to find an unknown side.",
        "Use sin θ, cos θ and tan θ to find an unknown side in a right triangle.",
        "Use inverse trig (sin⁻¹, cos⁻¹, tan⁻¹) to find an unknown angle in a right triangle.",
      ],
      teaching: {
        paragraphs: [
          "In a right triangle, the hypotenuse is always the longest side — opposite the right angle. Opposite and adjacent are named relative to the angle you are working with (θ). The side across from θ is opposite; the side next to θ (that is not the hypotenuse) is adjacent.",
          "SOH CAH TOA is the memory aid for the three basic trig ratios: sin θ = Opposite ÷ Hypotenuse, cos θ = Adjacent ÷ Hypotenuse, tan θ = Opposite ÷ Adjacent. To choose which one to use, decide which two of the three sides (opposite, adjacent, hypotenuse) are involved in the question.",
          "To find a missing side: identify the ratio involving the known side and the unknown, substitute the angle, and solve with a calculator. For example, if the opposite side is unknown and the hypotenuse is 12 m and θ = 35°: sin 35° = opp ÷ 12, so opp = 12 sin 35° ≈ 6.88 m.",
          "To find a missing angle: take the ratio (opp ÷ hyp, adj ÷ hyp, or opp ÷ adj) and apply the inverse function. sin⁻¹(0.6) = 36.87° (to 2 decimal places). Always check your calculator is in DEGREE mode for these problems.",
          "Pythagoras' theorem: a² + b² = c², where c is the hypotenuse. Use it when you have two sides and need the third, and no angle (other than 90°) is involved.",
        ],
        latexBlocks: [
          "\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}},\\quad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}},\\quad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}",
          "a^2 + b^2 = c^2\\quad(c = \\text{hypotenuse})",
          "\\text{Unknown side: } \\text{side} = \\text{Hyp} \\times \\sin\\theta\\text{ (or }\\cos\\theta\\text{ or }\\tan\\theta\\text{ as appropriate)}",
          "\\text{Unknown angle: } \\theta = \\sin^{-1}\\!\\left(\\frac{\\text{Opp}}{\\text{Hyp}}\\right)\\text{ etc.}",
        ],
      },
      workedExamples: [
        {
          title: "Find an unknown side using SOH CAH TOA",
          questionLatex:
            "\\text{A right triangle has hypotenuse 15 m and angle }\\theta = 42^\\circ. Find the side opposite }\\theta.",
          steps: [
            {
              explanation: "Opposite and hypotenuse are involved → use sin θ.",
              latex: "\\sin 42^\\circ = \\frac{\\text{opp}}{15}",
            },
            {
              explanation: "Solve for opp.",
              latex: "\\text{opp} = 15 \\times \\sin 42^\\circ \\approx 15 \\times 0.6691 \\approx 10.04\\text{ m}",
            },
          ],
          finalAnswerLatex: "\\text{opp} \\approx 10.04\\text{ m}",
          triangleDiagram: {
            vertices: {
              A: { x: 0, y: 0, label: "A" },
              B: { x: 4, y: 0, label: "B" },
              C: { x: 4, y: 3.6, label: "C" },
            },
            rightAngleAt: "B",
            angleLabels: { A: "42°" },
            sideLabels: {
              AB: "",
              BC: "opp",
              AC: "15 m",
            },
          },
        },
        {
          title: "Find an unknown angle using inverse trig",
          questionLatex:
            "\\text{A ladder 5.8 m long leans against a wall. The base is 2.1 m from the wall. Find the angle the ladder makes with the ground.}",
          steps: [
            {
              explanation: "The ground (adjacent) = 2.1 m, ladder (hypotenuse) = 5.8 m → use cos θ.",
              latex: "\\cos\\theta = \\frac{2.1}{5.8}",
            },
            {
              explanation: "Apply cos⁻¹.",
              latex: "\\theta = \\cos^{-1}\\!\\left(\\frac{2.1}{5.8}\\right) \\approx 68.8^\\circ",
            },
          ],
          finalAnswerLatex: "\\theta \\approx 68.8^\\circ",
          triangleDiagram: {
            vertices: {
              A: { x: 0, y: 0, label: "A" },
              B: { x: 3, y: 0, label: "B" },
              C: { x: 3, y: 4.5, label: "C" },
            },
            rightAngleAt: "B",
            angleLabels: { A: "θ" },
            sideLabels: {
              AB: "2.1 m",
              BC: "wall",
              AC: "5.8 m",
            },
          },
        },
        {
          title: "Find an unknown side using Pythagoras",
          questionLatex:
            "\\text{A right triangle has legs 6 cm and 8 cm. Find the hypotenuse.}",
          steps: [
            {
              explanation: "Apply Pythagoras: c² = a² + b².",
              latex: "c^2 = 6^2 + 8^2 = 36 + 64 = 100",
            },
            {
              explanation: "Take the square root.",
              latex: "c = \\sqrt{100} = 10\\text{ cm}",
            },
          ],
          finalAnswerLatex: "c = 10\\text{ cm}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-rtv-g1",
          "In a right triangle with angle θ, the side across from θ is called the:",
          "B",
          ["Adjacent", "Opposite", "Hypotenuse", "Base"],
          "The side across from (opposite) the named angle θ is called the opposite side."
        ),
        measurementAnswer(
          "y12s2-rtv-g2",
          "A right triangle has hypotenuse 10 m and angle 30°. Find the opposite side (to 2 d.p.).",
          "\\text{opp} = 10 \\times \\sin 30^\\circ",
          "5.00 m",
          ["5", "5.0", "5.00"]
        ),
        measurementAnswer(
          "y12s2-rtv-g3",
          "A right triangle has adjacent 8 cm and hypotenuse 10 cm. Find angle θ (to 1 d.p.).",
          "\\theta = \\cos^{-1}\\!\\left(\\frac{8}{10}\\right)",
          "36.9°",
          ["36.87°", "36.87", "36.9"]
        ),
        measurementAnswer(
          "y12s2-rtv-g4",
          "A right triangle has legs 5 m and 12 m. Find the hypotenuse.",
          "c = \\sqrt{5^2 + 12^2} = \\sqrt{169}",
          "13 m",
          ["13"]
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-rtv-i1",
          "To find the adjacent side when the hypotenuse and angle θ are known, use:",
          "B",
          ["sin θ × hyp", "cos θ × hyp", "tan θ × hyp", "hyp ÷ sin θ"],
          "cos θ = adj ÷ hyp, so adj = cos θ × hyp."
        ),
        measurementAnswer(
          "y12s2-rtv-i2",
          "Right triangle: angle = 55°, hypotenuse = 20 m. Find the opposite side (to 2 d.p.).",
          "\\text{opp} = 20 \\times \\sin 55^\\circ",
          "16.38 m",
          ["16.38", "16.4 m", "16.4"]
        ),
        measurementAnswer(
          "y12s2-rtv-i3",
          "Right triangle: opposite = 7 m, adjacent = 7 m. Find angle θ (to 1 d.p.).",
          "\\theta = \\tan^{-1}\\!\\left(\\frac{7}{7}\\right) = \\tan^{-1}(1)",
          "45.0°",
          ["45°", "45"]
        ),
        measurementAnswer(
          "y12s2-rtv-i4",
          "A right triangle has hypotenuse 13 cm and one leg 5 cm. Find the other leg.",
          "b = \\sqrt{13^2 - 5^2} = \\sqrt{144}",
          "12 cm",
          ["12"]
        ),
        practicalChoice(
          "y12s2-rtv-i5",
          "A roof has a horizontal run of 6 m and rises 2.5 m. Which ratio gives the roof angle?",
          "C",
          ["sin θ = 2.5 ÷ 6", "cos θ = 2.5 ÷ 6", "tan θ = 2.5 ÷ 6", "tan θ = 6 ÷ 2.5"],
          "tan θ = opposite ÷ adjacent = rise ÷ run = 2.5 ÷ 6."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using sin θ when opposite and adjacent are involved (no hypotenuse).",
          fix: "If neither side is the hypotenuse, use tan θ = opp ÷ adj. Only use sin and cos when the hypotenuse is one of the two sides in the question.",
        },
        {
          mistake: "Labelling 'opposite' and 'adjacent' relative to the right angle, not the named angle θ.",
          fix: "Opposite and adjacent are always defined relative to the angle you are working with (θ), not the right angle. The right angle tells you which side is the hypotenuse.",
        },
        {
          mistake: "Finding the angle with sin⁻¹(opp ÷ hyp) but the calculator is in RADIAN mode.",
          fix: "For all right-triangle angle problems in Standard 2, the answer is in degrees. Set your calculator to DEGREE mode before using sin⁻¹, cos⁻¹, or tan⁻¹.",
        },
        {
          mistake: "Adding 3² + 4² = 7 (adding the squares incorrectly) instead of 9 + 16 = 25.",
          fix: "Square each leg separately first, then add. 3² = 9 and 4² = 16, so 3² + 4² = 25, and c = √25 = 5. Never add the bases before squaring.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-rtv-m1",
          "The hypotenuse in a right triangle is:",
          "C",
          ["Always the shortest side", "Always opposite the largest acute angle", "Always opposite the right angle", "Adjacent to the largest angle"],
          "The hypotenuse is the longest side and is always opposite the 90° angle."
        ),
        measurementAnswer(
          "y12s2-rtv-m2",
          "Right triangle: hypotenuse = 25 m, angle = 37°. Find the adjacent side (to 2 d.p.).",
          "\\text{adj} = 25 \\times \\cos 37^\\circ",
          "19.97 m",
          ["19.97", "19.98 m", "19.98"]
        ),
        measurementAnswer(
          "y12s2-rtv-m3",
          "Right triangle: adjacent = 9 m, angle = 40°. Find the opposite side (to 2 d.p.).",
          "\\text{opp} = 9 \\times \\tan 40^\\circ",
          "7.55 m",
          ["7.55", "7.6 m"]
        ),
        measurementAnswer(
          "y12s2-rtv-m4",
          "Right triangle: opposite = 5 m, hypotenuse = 13 m. Find angle θ (to 1 d.p.).",
          "\\theta = \\sin^{-1}\\!\\left(\\frac{5}{13}\\right)",
          "22.6°",
          ["22.62°", "22.62"]
        ),
        measurementAnswer(
          "y12s2-rtv-m5",
          "A right triangle has legs 9 cm and 40 cm. Find the hypotenuse.",
          "c = \\sqrt{9^2 + 40^2} = \\sqrt{81 + 1600} = \\sqrt{1681}",
          "41 cm",
          ["41"]
        ),
        practicalChoice(
          "y12s2-rtv-m6",
          "Right triangle: opposite = 6, hypotenuse = 10. Angle θ =",
          "B",
          ["30°", "36.87°", "53.13°", "45°"],
          "sin⁻¹(6 ÷ 10) = sin⁻¹(0.6) ≈ 36.87°."
        ),
        measurementAnswer(
          "y12s2-rtv-m7",
          "Right triangle: angle = 60°, adjacent = 5 m. Find the opposite side (to 2 d.p.).",
          "\\text{opp} = 5 \\times \\tan 60^\\circ",
          "8.66 m",
          ["8.66"]
        ),
        practicalChoice(
          "y12s2-rtv-m8",
          "A triangle has sides 7, 24, and 25. Is it a right triangle?",
          "A",
          ["Yes, because 7² + 24² = 25²", "No, because 7 + 24 ≠ 25", "Yes, because all sides are whole numbers", "No, because none are equal"],
          "49 + 576 = 625 = 25². Pythagoras holds, so it is a right triangle."
        ),
        measurementAnswer(
          "y12s2-rtv-m9",
          "Right triangle: opposite = 12 m, adjacent = 5 m. Find angle θ (to 1 d.p.).",
          "\\theta = \\tan^{-1}\\!\\left(\\frac{12}{5}\\right)",
          "67.4°",
          ["67.38°", "67.4"]
        ),
        practicalChoice(
          "y12s2-rtv-m10",
          "A right triangle has hyp = 17 m and opp = 8 m. The adjacent side is:",
          "C",
          ["9 m", "12 m", "15 m", "25 m"],
          "adj = √(17² − 8²) = √(289 − 64) = √225 = 15 m."
        ),
      ],
    };
  }

  if (lesson.slug === "right-angled-trig-radians") {
    return {
      ...base,
      description:
        "Convert between degrees and radians, apply SOH CAH TOA using radian angles, and solve practical right-triangle problems in both units.",
      learningIntention:
        "Use radian measure with right-angled trigonometry: convert between degrees and radians and apply SOH CAH TOA to find sides and angles with the calculator in RAD mode.",
      successCriteria: [
        "Convert angles between degrees and radians using π rad = 180°.",
        "Recognise common radian values: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°.",
        "Set a scientific calculator to RAD mode and evaluate trig ratios of radian angles.",
        "Apply SOH CAH TOA to find unknown sides in right-angled triangles when angles are given in radians.",
        "Find an unknown angle in radians using inverse trig functions.",
      ],
      teaching: {
        paragraphs: [
          "Angles can be measured in degrees or radians. A full turn is 360° in degrees and 2π radians. The conversion is exact: π radians equals 180 degrees. To convert from degrees to radians, multiply by π/180. To convert from radians to degrees, multiply by 180/π.",
          "Common radian values are worth recognising: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°, π = 180°. These appear frequently in exam questions. Decimals such as 0.5236 (π/6) and 1.0472 (π/3) are their approximate equivalents.",
          "When an angle is given in radians, switch your calculator to RAD mode before evaluating any trig ratio. In DEG mode the calculator interprets the number as degrees, producing a completely wrong answer.",
          "SOH CAH TOA still applies for right-angled triangles regardless of whether the angle is in degrees or radians. Identify opposite, adjacent, and hypotenuse, then apply sin = opp/hyp, cos = adj/hyp, or tan = opp/adj. Use the inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) in RAD mode to find an unknown angle — the result will be in radians.",
        ],
        latexBlocks: [
          "\\theta_{\\text{rad}} = \\theta_{\\deg} \\times \\dfrac{\\pi}{180}, \\qquad \\theta_{\\deg} = \\theta_{\\text{rad}} \\times \\dfrac{180}{\\pi}",
          "\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}},\\quad \\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}},\\quad \\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}",
          "\\frac{\\pi}{6}=30^\\circ,\\quad\\frac{\\pi}{4}=45^\\circ,\\quad\\frac{\\pi}{3}=60^\\circ,\\quad\\frac{\\pi}{2}=90^\\circ",
        ],
      },
      workedExamples: [
        {
          title: "Convert between degrees and radians",
          questionLatex:
            "\\text{(a) Convert }60^\\circ\\text{ to radians. (b) Convert }\\frac{\\pi}{4}\\text{ radians to degrees.}",
          steps: [
            {
              explanation: "Multiply degrees by π/180 to get radians.",
              latex:
                "60 \\times \\dfrac{\\pi}{180} = \\dfrac{60\\pi}{180} = \\dfrac{\\pi}{3} \\approx 1.0472\\text{ rad}",
            },
            {
              explanation: "Multiply radians by 180/π to get degrees.",
              latex:
                "\\dfrac{\\pi}{4} \\times \\dfrac{180}{\\pi} = \\dfrac{180}{4} = 45^\\circ",
            },
          ],
          finalAnswerLatex:
            "60^\\circ = \\dfrac{\\pi}{3}\\text{ rad};\\quad \\dfrac{\\pi}{4}\\text{ rad} = 45^\\circ",
        },
        {
          title: "Find an unknown side using radians",
          questionLatex:
            "\\text{A right-angled triangle has hypotenuse 10 m and angle }\\theta = \\frac{\\pi}{3}\\text{ rad. Find the side opposite to }\\theta.",
          triangleDiagram: {
            description:
              "Right-angled triangle: angle θ = π/3 at vertex A (top left), right angle at C (bottom left), vertex B at bottom right. Hypotenuse AB = 10 m, opposite side BC = ?",
            vertices: { A: { x: 80, y: 40 }, C: { x: 80, y: 230 }, B: { x: 330, y: 230 } },
            rightAngleAt: "C",
            angleLabels: { A: "π/3" },
            sideLabels: { AB: "10 m", BC: "opp = ?" },
          },
          steps: [
            {
              explanation: "Identify the ratio: sin = opp / hyp.",
              latex: "\\sin\\!\\left(\\tfrac{\\pi}{3}\\right) = \\dfrac{\\text{opp}}{10}",
            },
            {
              explanation: "Use RAD mode: sin(π/3) = √3/2 ≈ 0.8660.",
              latex: "\\text{opp} = 10 \\times 0.8660 \\approx 8.66\\text{ m}",
            },
          ],
          finalAnswerLatex: "\\text{opp} \\approx 8.66\\text{ m}",
        },
        {
          title: "Apply tan in RAD mode to find a height",
          questionLatex:
            "\\text{A ramp makes an angle of 0.3 rad with the horizontal. The horizontal distance is 8 m. Find the height of the ramp.}",
          triangleDiagram: {
            description:
              "Right-angled triangle: angle 0.3 rad at vertex A (bottom left), right angle at B (bottom right), vertex C at top right. Adjacent AB = 8 m (horizontal), opposite BC = h (height of ramp).",
            vertices: { A: { x: 60, y: 240 }, B: { x: 360, y: 240 }, C: { x: 360, y: 60 } },
            rightAngleAt: "B",
            angleLabels: { A: "0.3 rad" },
            sideLabels: { AB: "8 m", BC: "h = ?" },
          },
          steps: [
            {
              explanation: "Identify opposite (height) and adjacent (horizontal). Use tan.",
              latex: "\\tan(0.3) = \\dfrac{h}{8}",
            },
            {
              explanation: "In RAD mode, tan(0.3) ≈ 0.3093.",
              latex: "h = 8 \\times 0.3093 \\approx 2.47\\text{ m}",
            },
          ],
          finalAnswerLatex: "h \\approx 2.47\\text{ m}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-rad-g1",
          "180° converted to radians equals:",
          "B",
          ["π/2", "π", "2π", "π/4"],
          "π rad = 180°, so 180° = π rad."
        ),
        practicalChoice(
          "y12s2-rad-g2",
          "Convert 60° to radians.",
          "C",
          ["π/6", "π/4", "π/3", "π/2"],
          "60 × π/180 = π/3."
        ),
        practicalChoice(
          "y12s2-rad-g3",
          "A right triangle has hypotenuse 10 m and angle θ = π/3. The side opposite θ is approximately:",
          "B",
          ["5.00 m", "8.66 m", "10.00 m", "17.32 m"],
          "opp = 10 × sin(π/3) = 10 × √3/2 ≈ 8.66 m."
        ),
        practicalChoice(
          "y12s2-rad-g4",
          "Convert π/4 radians to degrees.",
          "B",
          ["30°", "45°", "60°", "90°"],
          "π/4 × 180/π = 45°."
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-rad-i1",
          "Convert 1.2 rad to degrees (to 1 decimal place).",
          "C",
          ["45.0°", "60.0°", "68.8°", "75.0°"],
          "1.2 × 180/π ≈ 68.8°."
        ),
        measurementAnswer(
          "y12s2-rad-i2",
          "In a right-angled triangle, angle θ = 0.8 rad and the adjacent side is 5 m. Find the opposite side to 2 decimal places.",
          "\\tan(0.8) = \\dfrac{\\text{opp}}{5}\\quad(\\text{RAD mode})",
          "5.15 m",
          ["5.15", "5.15m", "5.15 m"]
        ),
        practicalChoice(
          "y12s2-rad-i3",
          "A ladder of length 6 m makes an angle of π/3 rad with the ground. How high up the wall does it reach?",
          "B",
          ["3.00 m", "5.20 m", "6.93 m", "10.39 m"],
          "height = 6 × sin(π/3) = 6 × √3/2 ≈ 5.20 m."
        ),
        measurementAnswer(
          "y12s2-rad-i4",
          "Convert 135° to radians (to 2 decimal places).",
          "135 \\times \\dfrac{\\pi}{180}",
          "2.36 rad",
          ["2.36", "2.36 rad", "2.36 radians"]
        ),
        practicalChoice(
          "y12s2-rad-i5",
          "When angles are given in radians, the correct calculator setting is:",
          "B",
          ["DEG mode", "RAD mode", "GRAD mode", "It makes no difference"],
          "RAD mode tells the calculator that the angle is in radians, not degrees."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using DEG mode when the angle is in radians.",
          fix: "Switch your calculator to RAD mode. In DEG mode, sin(π/3) ≈ sin(1.047) interpreted as degrees gives the wrong answer.",
        },
        {
          mistake: "Converting radians to degrees before entering into the calculator.",
          fix: "No conversion is needed if the calculator is already in RAD mode. Enter the radian value directly.",
        },
        {
          mistake: "Mixing up opposite and adjacent when writing the ratio.",
          fix: "Always label the triangle first (H = hypotenuse, O = opposite the given angle, A = adjacent), then choose SOH, CAH, or TOA to match the known and unknown sides.",
        },
        {
          mistake: "Writing π/3 ≈ 60 when the question expects radians.",
          fix: "π/3 ≈ 1.0472 radians. Only convert to degrees (60°) if the question or context requires degrees. Keep the answer in radians unless told otherwise.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-rad-m1",
          "π/2 radians equals:",
          "C",
          ["45°", "60°", "90°", "180°"],
          "π/2 × 180/π = 90°."
        ),
        measurementAnswer(
          "y12s2-rad-m2",
          "Convert 30° to radians (to 4 decimal places).",
          "30 \\times \\dfrac{\\pi}{180} = \\dfrac{\\pi}{6}",
          "0.5236 rad",
          ["0.5236", "0.5236 rad", "0.524"]
        ),
        practicalChoice(
          "y12s2-rad-m3",
          "A right triangle has hypotenuse 12 m and angle θ = π/4 rad. The adjacent side is approximately:",
          "B",
          ["6.00 m", "8.49 m", "12.00 m", "16.97 m"],
          "adj = 12 × cos(π/4) = 12 × √2/2 ≈ 8.49 m."
        ),
        measurementAnswer(
          "y12s2-rad-m4",
          "A ramp makes an angle of 0.3 rad with the horizontal over a horizontal distance of 8 m. Find the height to 2 decimal places.",
          "h = 8 \\times \\tan(0.3)\\quad(\\text{RAD mode})",
          "2.47 m",
          ["2.47", "2.47 m", "2.47m"]
        ),
        practicalChoice(
          "y12s2-rad-m5",
          "A right triangle has hypotenuse 15 m and angle θ = 1.1 rad. The side opposite θ is approximately:",
          "B",
          ["10.24 m", "13.37 m", "15.00 m", "16.84 m"],
          "opp = 15 × sin(1.1) ≈ 15 × 0.8912 ≈ 13.37 m."
        ),
        measurementAnswer(
          "y12s2-rad-m6",
          "Convert 2.5 radians to degrees (to 1 decimal place).",
          "2.5 \\times \\dfrac{180}{\\pi}",
          "143.2°",
          ["143.2", "143.2 degrees", "143.2°"]
        ),
        practicalChoice(
          "y12s2-rad-m7",
          "A right triangle has angle A = π/6. The hypotenuse is 20 m. The side adjacent to A is approximately:",
          "B",
          ["10.00 m", "17.32 m", "20.00 m", "34.64 m"],
          "adj = 20 × cos(π/6) = 20 × √3/2 ≈ 17.32 m."
        ),
        measurementAnswer(
          "y12s2-rad-m8",
          "In a right-angled triangle, the opposite side is 7.5 m and angle θ = 1.0 rad. Find the hypotenuse to 2 decimal places.",
          "\\sin(1.0) = \\dfrac{7.5}{h} \\implies h = \\dfrac{7.5}{\\sin(1.0)}",
          "8.91 m",
          ["8.91", "8.91 m", "8.91m"]
        ),
        practicalChoice(
          "y12s2-rad-m9",
          "Using RAD mode, sin(π/6) equals:",
          "C",
          ["0.8660", "0.5774", "0.5", "1"],
          "sin(π/6) = sin(30°) = 0.5."
        ),
        practicalChoice(
          "y12s2-rad-m10",
          "A right triangle has angle 0.6 rad and the opposite side is 4 m. Which equation finds the hypotenuse h?",
          "B",
          [
            "h = 4 × sin(0.6)",
            "h = 4 ÷ sin(0.6)",
            "h = 4 × tan(0.6)",
            "h = 4 × cos(0.6)",
          ],
          "sin(0.6) = 4/h → h = 4 ÷ sin(0.6)."
        ),
      ],
    };
  }

  if (lesson.slug === "ambiguous-case-sine-rule") {
    return {
      ...base,
      description:
        "Recognise when SSA information produces one or two valid triangles, apply B₂ = 180° − B₁, and test validity by checking A + B < 180°.",
      learningIntention:
        "Apply the ambiguous case of the sine rule to determine the number of valid triangles and find both possible angles when two solutions exist.",
      successCriteria: [
        "Explain why SSA information can lead to two possible triangles.",
        "Calculate sin B = b sin A / a and find both possible angles B₁ and B₂.",
        "Test whether B₂ is valid by checking A + B₂ < 180°.",
        "State the number of valid triangles and find the remaining angles for each.",
      ],
      teaching: {
        paragraphs: [
          "The sine rule finds a missing angle when you know one complete side-angle pair. But sin θ = sin(180° − θ), so the same sine value belongs to two different angles. The calculator returns only the acute one (B₁), and you must always check whether the obtuse supplement B₂ = 180° − B₁ also fits the triangle.",
          "This situation arises specifically when you are given two sides and a non-included angle (SSA). Picture a compass arm of length b swinging from the endpoint of side a — it can land in two places, forming two possible triangles.",
          "To decide how many triangles exist: compute sin B = b sin A / a. If the result exceeds 1, no triangle is possible. Otherwise find B₁ = arcsin(sin B) and B₂ = 180° − B₁, then test each by checking whether A plus that angle stays below 180°.",
          "Do not reject B₂ simply because it is obtuse. An obtuse angle is valid in a triangle provided the total angle sum remains under 180°. The correct test is always A + B₂ < 180°.",
        ],
        latexBlocks: [
          "\\sin B = \\dfrac{b\\sin A}{a}",
          "B_1 = \\arcsin\\!\\left(\\dfrac{b\\sin A}{a}\\right),\\quad B_2 = 180° - B_1",
          "B_2\\text{ is valid only if }A + B_2 < 180°",
        ],
      },
      workedExamples: [
        {
          title: "Two triangles possible",
          questionLatex:
            "\\text{Find all possible values of angle }B\\text{ given }a=7,\\;b=9,\\;A=45°.",
          steps: [
            {
              explanation: "Apply the sine rule to find sin B.",
              latex:
                "\\sin B = \\dfrac{9\\sin 45°}{7} = \\dfrac{9\\times 0.7071}{7} \\approx 0.9091",
            },
            {
              explanation: "Find the acute angle B₁.",
              latex: "B_1 = \\arcsin(0.9091) \\approx 65.4°",
            },
            {
              explanation: "Find the supplement B₂ and test both.",
              latex:
                "B_2 = 180° - 65.4° = 114.6°,\\quad A+B_1 = 110.4° < 180°\\;\\checkmark,\\quad A+B_2 = 159.6° < 180°\\;\\checkmark",
            },
          ],
          finalAnswerLatex:
            "\\text{Two triangles: }B\\approx 65.4°\\text{ or }B\\approx 114.6°.",
        },
        {
          title: "One triangle only (B₂ rejected)",
          questionLatex:
            "\\text{Find all possible values of angle }B\\text{ given }a=12,\\;b=7,\\;A=65°.",
          steps: [
            {
              explanation: "Apply the sine rule.",
              latex:
                "\\sin B = \\dfrac{7\\sin 65°}{12} \\approx 0.5287",
            },
            {
              explanation: "Find B₁ and B₂.",
              latex:
                "B_1 \\approx 31.9°,\\quad B_2 = 180° - 31.9° = 148.1°",
            },
            {
              explanation: "Test B₂: angle sum exceeds 180°, so reject.",
              latex:
                "A + B_2 = 65° + 148.1° = 213.1° > 180°\\;\\times",
            },
          ],
          finalAnswerLatex: "\\text{One triangle only: }B\\approx 31.9°.",
        },
        {
          title: "Find angle C for each valid triangle",
          questionLatex:
            "\\text{For }a=7,\\;b=9,\\;A=45°\\text{ with }B_1=65.4°,\\;B_2=114.6°,\\text{ find }C\\text{ for each triangle.}",
          steps: [
            {
              explanation: "Triangle 1: subtract A and B₁ from 180°.",
              latex: "C_1 = 180° - 45° - 65.4° = 69.6°",
            },
            {
              explanation: "Triangle 2: subtract A and B₂ from 180°.",
              latex: "C_2 = 180° - 45° - 114.6° = 20.4°",
            },
          ],
          finalAnswerLatex:
            "C_1 \\approx 69.6°,\\quad C_2 \\approx 20.4°",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y12s2-amb-g1",
          "The ambiguous case of the sine rule arises for which set of given information?",
          "C",
          [
            "All three sides known (SSS)",
            "Two sides and the included angle (SAS)",
            "Two sides and a non-included angle (SSA)",
            "All three angles known (AAA)",
          ],
          "SSA — the angle is not between the two known sides — can produce two possible triangles because sin θ = sin(180° − θ)."
        ),
        practicalChoice(
          "y12s2-amb-g2",
          "In the ambiguous case, B₁ = 65.4°. What is B₂?",
          "B",
          [
            "90° − 65.4° = 24.6°",
            "180° − 65.4° = 114.6°",
            "2 × 65.4° = 130.8°",
            "360° − 65.4° = 294.6°",
          ],
          "The supplement is found by subtracting B₁ from 180°."
        ),
        practicalChoice(
          "y12s2-amb-g3",
          "For a = 7, b = 9, A = 45°, B₂ = 114.6°. Is B₂ valid for this triangle?",
          "C",
          [
            "No, because B₂ is obtuse",
            "No, because B₂ > B₁",
            "Yes, because A + B₂ = 45° + 114.6° = 159.6° < 180°",
            "Yes, because a < b",
          ],
          "The test is A + B₂ < 180°. Here 159.6° < 180°, so B₂ is valid."
        ),
        practicalChoice(
          "y12s2-amb-g4",
          "For a = 12, b = 7, A = 65°, B₁ = 31.9° and B₂ = 148.1°. How many valid triangles exist?",
          "B",
          [
            "0 — sin B > 1 so no triangle exists",
            "1 — B₂ is rejected because 65° + 148.1° > 180°",
            "2 — both B₁ and B₂ are valid",
            "3 — one for each subset of sides",
          ],
          "A + B₂ = 213.1° > 180°, so B₂ is rejected and only one triangle exists."
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y12s2-amb-i1",
          "For a = 10, b = 8, A = 35°, sin B = 0.4589, B₁ = 27.3° and B₂ = 152.7°. Is B₂ valid?",
          "A",
          [
            "No, because 35° + 152.7° = 187.7° > 180°",
            "Yes, because sin(B₂) = sin(B₁)",
            "Yes, because B₂ is the supplement",
            "No, because B₂ > 90°",
          ],
          "A + B₂ = 187.7° > 180°, so B₂ is rejected and only one triangle exists."
        ),
        measurementAnswer(
          "y12s2-amb-i2",
          "For a = 10, b = 8, A = 35°, sin B = 0.4589. Find B1 to 1 decimal place.",
          "B_1 = \\arcsin(0.4589)",
          "27.3°",
          ["27.3", "27.3 degrees"]
        ),
        practicalChoice(
          "y12s2-amb-i3",
          "For a = 5, b = 9, A = 25°, sin B = 0.7607, B₁ = 49.5° and B₂ = 130.5°. How many valid triangles exist?",
          "C",
          [
            "0 — no triangle possible",
            "1 — only B₁ is valid",
            "2 — both B₁ and B₂ are valid",
            "4 — one for each combination of sides",
          ],
          "A + B₁ = 74.5° < 180° and A + B₂ = 155.5° < 180°, so both are valid — two triangles."
        ),
        measurementAnswer(
          "y12s2-amb-i4",
          "For a = 5, b = 9, A = 25°, find B1 to 1 decimal place. (sin B = 0.7607)",
          "B_1 = \\arcsin(0.7607)",
          "49.5°",
          ["49.5", "49.5 degrees"]
        ),
        practicalChoice(
          "y12s2-amb-i5",
          "An SSA triangle uses which rule to find the missing angle?",
          "C",
          [
            "Pythagoras theorem",
            "Cosine rule (a² = b² + c² − 2bc cos A)",
            "Sine rule (sin A / a = sin B / b)",
            "Area formula (½ab sin C)",
          ],
          "The sine rule links each side to its opposite angle, making it the tool for SSA triangles."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Forgetting to check B₂ after finding B₁.",
          fix: "Always compute B₂ = 180° − B₁ and test A + B₂ < 180° before concluding there is only one solution.",
        },
        {
          mistake: "Rejecting B₂ because it is obtuse.",
          fix: "An obtuse B₂ is valid when A + B₂ < 180°. The size of B₂ alone is not the test.",
        },
        {
          mistake: "Using the cosine rule for an SSA setup.",
          fix: "SSA uses the sine rule. Cosine rule applies for SAS (two sides, included angle) or SSS (all three sides).",
        },
        {
          mistake: "Not checking whether sin B > 1 before taking arcsin.",
          fix: "If sin B > 1, no triangle is possible. Check this first.",
        },
      ],
      masteryQuiz: [
        practicalChoice(
          "y12s2-amb-m1",
          "The ambiguous case exists because:",
          "B",
          [
            "Cosine is equal for two different angles",
            "sin θ = sin(180° − θ), so two angles share the same sine",
            "SSA always creates a right angle",
            "The cosine rule has two solutions",
          ],
          "sin(65.4°) = sin(114.6°), so the sine rule cannot distinguish between them without a validity test."
        ),
        practicalChoice(
          "y12s2-amb-m2",
          "B₂ = 180° − B₁ is rejected when:",
          "B",
          [
            "B₁ is acute",
            "A + B₂ ≥ 180°",
            "B₂ > B₁",
            "sin B < 1",
          ],
          "If A + B₂ ≥ 180°, the angle sum would exceed 180° and B₂ is impossible."
        ),
        measurementAnswer(
          "y12s2-amb-m3",
          "For a triangle with a = 7, b = 9, A = 45°, calculate sin B to 4 decimal places.",
          "\\sin B = \\dfrac{9\\sin 45°}{7}",
          "0.9091",
          ["0.909", "0.9090", "0.90909"]
        ),
        measurementAnswer(
          "y12s2-amb-m4",
          "Using sin B = 0.9091, find B1 to 1 decimal place.",
          "B_1 = \\arcsin(0.9091)",
          "65.4°",
          ["65.4", "65.4 degrees"]
        ),
        measurementAnswer(
          "y12s2-amb-m5",
          "Given B1 = 65.4°, find B2.",
          "B_2 = 180° - B_1",
          "114.6°",
          ["114.6", "114.6 degrees"]
        ),
        practicalChoice(
          "y12s2-amb-m6",
          "For a = 7, b = 9, A = 45°, B₁ = 65.4° and B₂ = 114.6°. How many triangles are possible?",
          "C",
          [
            "0 — no valid triangle",
            "1 — only B₁ is valid",
            "2 — both B₁ and B₂ are valid",
            "4 — one for each arrangement of sides",
          ],
          "A + B₁ = 110.4° < 180° and A + B₂ = 159.6° < 180°, so both are valid."
        ),
        measurementAnswer(
          "y12s2-amb-m7",
          "For a triangle with a = 12, b = 7, A = 65°, calculate sin B to 4 decimal places.",
          "\\sin B = \\dfrac{7\\sin 65°}{12}",
          "0.5287",
          ["0.529", "0.5286", "0.5288"]
        ),
        measurementAnswer(
          "y12s2-amb-m8",
          "Using sin B = 0.5287, find B1 to 1 decimal place.",
          "B_1 = \\arcsin(0.5287)",
          "31.9°",
          ["31.9", "31.9 degrees"]
        ),
        practicalChoice(
          "y12s2-amb-m9",
          "For a = 12, b = 7, A = 65°, B₂ = 148.1°. Is B₂ valid?",
          "B",
          [
            "Yes, because sin(148.1°) = sin(31.9°)",
            "No, because 65° + 148.1° = 213.1° > 180°",
            "Yes, because B₂ is always the correct angle",
            "No, because B₂ > 90°",
          ],
          "A + B₂ = 213.1° > 180°, so B₂ would make the angles exceed a straight line."
        ),
        practicalChoice(
          "y12s2-amb-m10",
          "Rearranging the sine rule sinA/a = sinB/b to find angle B gives:",
          "C",
          [
            "B = arccos(b sin A / a)",
            "B = arctan(b sin A / a)",
            "B = arcsin(b sin A / a)",
            "B = sin A × b × a",
          ],
          "Rearranging: sin B = b sin A / a, so B = arcsin(b sin A / a)."
        ),
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
        triangleDiagram: {
          description:
            "Triangle with two known sides meeting at an included angle, and the opposite side labelled x.",
          vertices: {
            A: { x: 80, y: 220 },
            B: { x: 320, y: 220 },
            C: { x: 135, y: 70 },
          },
          sideLabels: {
            AB: "known side",
            AC: "known side",
            BC: "x",
          },
          angleLabels: {
            A: "included angle",
          },
          highlightedSides: ["AB", "AC", "BC"],
        },
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
      {
        ...practicalChoice("y12s2-rate-exam-g1", "A drone is observed from two points and a matching side-angle pair is known. Which rule is most likely?", "A", ["Sine rule", "Cosine rule only", "Speed formula", "Fuel rate"], "A matching side-angle pair suggests sine rule."),
        triangleDiagram: {
          description:
            "Triangle showing one known side opposite a known angle and another side labelled x opposite another angle.",
          vertices: {
            A: { x: 190, y: 70 },
            B: { x: 70, y: 220 },
            C: { x: 330, y: 220 },
          },
          sideLabels: {
            BC: "known side",
            AC: "x",
          },
          angleLabels: {
            A: "known angle",
            B: "given angle",
          },
        },
      },
      {
        ...measurementAnswer("y12s2-rate-exam-g2", "A field has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "A=\\frac{1}{2}ab\\sin C", "634 m^2", ["634", "634m^2", "634 m2"]),
        triangleDiagram: {
          description:
            "Triangle with sides AB 30 metres and AC 45 metres and included angle A 70 degrees for an area calculation.",
          vertices: {
            A: { x: 80, y: 220 },
            B: { x: 320, y: 220 },
            C: { x: 135, y: 70 },
          },
          sideLabels: {
            AB: "30 m",
            AC: "45 m",
          },
          angleLabels: {
            A: "70°",
          },
        },
      },
      measurementAnswer("y12s2-rate-exam-g3", "A car travels 120 km in 1 h 30 min. Find average speed.", "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}", "80 km/h", ["80", "80km/h", "80 kmh"]),
      measurementAnswer("y12s2-rate-exam-g4", "A 300 dollar cost is shared in the ratio 2:3. Find the smaller share.", "\\text{Given: total }=300,\\quad \\text{ratio}=2{:}3", "$120", ["120", "120.00", "$120.00"]),
    ],
    independentPractice: [
      {
        ...measurementAnswer("y12s2-rate-exam-i1", "A triangular park has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\text{Given: }a=35,\\quad b=50,\\quad C=60^\\circ", "43.6 m", ["43.6", "43.6m"]),
        triangleDiagram: {
          description:
            "Triangle with sides AC 35 metres and BC 50 metres, included angle C 60 degrees, and third side AB labelled x.",
          vertices: {
            A: { x: 80, y: 220 },
            B: { x: 320, y: 220 },
            C: { x: 135, y: 70 },
          },
          sideLabels: {
            AB: "x",
            AC: "35 m",
            BC: "50 m",
          },
          angleLabels: {
            C: "60°",
          },
        },
      },
      {
        ...measurementAnswer("y12s2-rate-exam-i2", "A boat triangle has side 80 m opposite 35 degrees. Find the side opposite 50 degrees to 1 decimal place.", "\\text{Given: }A=35^\\circ,\\quad B=50^\\circ,\\quad a=80", "106.8 m", ["106.8", "106.8m"]),
        triangleDiagram: {
          description:
            "Triangle with side BC 80 metres opposite angle A 35 degrees, and side AC labelled x opposite angle B 50 degrees.",
          vertices: {
            A: { x: 190, y: 70 },
            B: { x: 70, y: 220 },
            C: { x: 330, y: 220 },
          },
          sideLabels: {
            BC: "80 m",
            AC: "x",
          },
          angleLabels: {
            A: "35°",
            B: "50°",
          },
        },
      },
      measurementAnswer("y12s2-rate-exam-i3", "A ute uses 32 L of fuel for 400 km. Find fuel consumption in L/100 km.", "\\text{Given: }32\\text{ L over }400\\text{ km}", "8 L/100 km", ["8", "8.0", "8L/100km"]),
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

