import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { financeChoice, measurementAnswer as baseMeasurementAnswer } from "../questionHelpers";
import {
  addTrapezoidalLandQuestionVisual,
  addTrapezoidalLandWorkedVisual,
} from "./trapezoidalLandVisuals";

function applicationsMeasurementFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (context.includes("percentage error")) {
    return `Percentage error compares the absolute error with the actual value, so the actual value belongs in the denominator. Find the error first, then convert to a percentage to get ${answer}.`;
  }
  if (context.includes("absolute error")) {
    return `Absolute error is the size of the difference between measured and actual values, so ignore direction and subtract the two measurements. That difference is ${answer}.`;
  }
  if (context.includes("lower limit") || context.includes("upper limit") || context.includes("limit of accuracy")) {
    return `A rounded measurement can be half a measuring unit either side of the reported value. Use the lower or upper boundary requested, keeping the unit attached: ${answer}.`;
  }
  if (context.includes("convert")) {
    if (context.includes("litres") || context.includes("l}")) {
      return `This is a capacity conversion: 1 cubic metre equals 1000 litres. Multiply the cubic metres by 1000 and keep the litre unit to get ${answer}.`;
    }
    if (context.includes("centimetres") || context.includes("cm")) {
      return `Converting metres to centimetres uses the length scale factor 100. Multiply the metre value by 100, not by an area or volume factor, to get ${answer}.`;
    }
    if (context.includes("grams") || context.includes("\\text{ g}") || context.includes(" kg")) {
      return `Mass conversions use groups of 1000: kilograms to grams multiply by 1000, and tonnes to kilograms also multiply by 1000. The converted mass is ${answer}.`;
    }
    return `Use the conversion factor named in the question, then keep the requested unit with the number. That gives ${answer}.`;
  }
  // Specific rate/ratio/scale topics must be tested BEFORE the generic area
  // and volume checks, because their prompts routinely contain the words
  // "area" or "volume" (e.g. "people living in an area", "volume ... find the
  // density"). Checking the broad terms first produced the wrong explanation.
  if (context.includes("scale") || context.includes("1:") || context.includes("model car") || context.includes("map") || context.includes("drawing length") || context.includes("real length")) {
    if (context.includes("area") && (context.includes("real area") || context.includes("plan area") || context.includes("drawing area"))) {
      return `Areas scale by the square of the scale factor. If scale is 1:n, then real area = drawing area × n². For this question that gives ${answer}.`;
    }
    if (context.includes("drawing") || context.includes("plan")) {
      if (context.includes("real") || context.includes("actual") || context.includes("what is the real")) {
        return `To find the real length, multiply the drawing length by the scale factor n (from scale 1:n). That gives ${answer}.`;
      }
      return `To find the drawing length, divide the real length by the scale factor n (from scale 1:n). That gives ${answer}.`;
    }
    return `Use the scale 1:n by multiplying drawing lengths by n to get real lengths, or dividing real lengths by n to get drawing lengths. The answer is ${answer}.`;
  }
  if (context.includes("population density") || context.includes("people per") || context.includes("people/km") || context.includes("people in")) {
    return `Population density = number of people ÷ area in km². Divide and keep the unit "people/km²" to get ${answer}.`;
  }
  if (context.includes("concentration") || context.includes("g/l") || context.includes("mg/l") || context.includes("dissolved")) {
    return `Concentration = mass ÷ volume. Convert the volume to litres first if needed, then divide mass (g or mg) by volume (L) to get ${answer}.`;
  }
  if (context.includes("density") || context.includes("d=m") || context.includes("d = m") || context.includes("g/cm") || context.includes("kg/m")) {
    if (context.includes("find its volume") || context.includes("find the volume") || context.includes("v = m")) {
      return `Rearrange D = M/V to find volume: V = M/D. Divide mass by density to get ${answer}.`;
    }
    if (context.includes("find the mass") || context.includes("find its mass") || context.includes("m = d")) {
      return `Rearrange D = M/V to find mass: M = D × V. Multiply density by volume to get ${answer}.`;
    }
    return `Density is mass divided by volume: D = M/V. Divide mass by volume and keep the unit (g/cm³ or kg/m³) to get ${answer}.`;
  }
  if (context.includes("l/100") || context.includes("litres per 100") || context.includes("fuel")) {
    return `Fuel consumption uses L per 100 km. Fuel used = (distance ÷ 100) × rate. For the rate: rate = (fuel ÷ distance) × 100. Here that gives ${answer}.`;
  }
  if (context.includes("area")) {
    if (context.includes("surface area")) {
      return `Surface area is the outside covering of the object, so use square units and count the outside faces, not the space inside. This gives ${answer}.`;
    }
    return `Area is for a flat surface such as flooring, paint or a sign. Multiply the two relevant lengths and write square units to get ${answer}.`;
  }
  if (context.includes("volume") || context.includes("capacity") || context.includes("tank") || context.includes("container")) {
    return `Volume measures three-dimensional space, so use length, width and height when they are given. If the question asks for capacity, convert cubic metres to litres; here the result is ${answer}.`;
  }
  if (context.includes("kwh") || context.includes("per kwh")) {
    return `Electricity cost uses energy used times the rate per kWh. Multiply those two values and keep the answer in cents or dollars as requested: ${answer}.`;
  }
  if (context.includes("kj") || context.includes("energy")) {
    return `Energy labels are usually per serve or per item. Multiply the energy amount by the number of serves/items to get the total energy: ${answer}.`;
  }
  // Use a word-boundary test for "ha"/"hectare" so the bare substring " ha"
  // can no longer match ordinary words such as "has".
  if (/\bhectares?\b/.test(context) || /\bha\b/.test(context) || context.includes("composite") || context.includes("l-shape") || context.includes("paddock") || context.includes("cut-out") || context.includes("irregular")) {
    if (/\bhectares?\b/.test(context) || /\bha\b/.test(context)) {
      return `Convert between m² and hectares using 1 ha = 10,000 m². To go from m² to ha, divide by 10,000; to go from ha to m², multiply by 10,000. The answer is ${answer}.`;
    }
    return `Split the composite shape into standard rectangles or triangles, find each area separately, then add or subtract as required. That gives ${answer}.`;
  }
  if (context.includes("mass")) {
    return `Use the mass unit that fits the context, then apply the conversion factor if needed. The practical mass is ${answer}.`;
  }

  return `First decide what is being measured: length, area, volume, capacity, mass, energy or cost. Choosing the matching measurement method gives ${answer}.`;
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
    explanation: applicationsMeasurementFeedback(prompt, latex, answer),
  };
}

function measurementWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "units-accuracy-measurement-error") {
    return [
      {
        title: "Converting units in context",
        questionLatex:
          "\\text{A garden bed is }4.2\\text{ m long. Border strip is sold in centimetres.}",
        steps: [
          { explanation: "Convert metres to centimetres by multiplying by 100.", latex: "1\\text{ m}=100\\text{ cm}" },
          { explanation: "Convert the garden length.", latex: "4.2\\times 100=420" },
        ],
        finalAnswerLatex: "420\\text{ cm}",
      },
      {
        title: "Limits of accuracy",
        questionLatex:
          "\\text{A reported length is }18.4\\text{ cm to the nearest millimetre.}",
        steps: [
          { explanation: "Nearest millimetre means nearest 0.1 cm, so half the unit is 0.05 cm." },
          { explanation: "Subtract and add 0.05 cm.", latex: "18.35\\le L<18.45" },
        ],
        finalAnswerLatex: "18.35\\text{ cm}\\le L<18.45\\text{ cm}",
      },
      {
        title: "Percentage error",
        questionLatex:
          "\\text{A scale reads }51\\text{ kg for a bag with actual mass }50\\text{ kg.}",
        steps: [
          { explanation: "Find the absolute error.", latex: "|51-50|=1" },
          { explanation: "Divide by the actual value and multiply by 100.", latex: "\\frac{1}{50}\\times 100=2\\%" },
        ],
        finalAnswerLatex: "2\\%",
      },
    ];
  }

  if (slug === "area-surface-area-volume") {
    return [
      {
        title: "Flooring area",
        questionLatex:
          "\\text{A bedroom is }4.8\\text{ m by }3.2\\text{ m.}",
        steps: [
          { explanation: "Flooring uses area.", latex: "A=l\\times w" },
          { explanation: "Multiply length by width.", latex: "4.8\\times 3.2=15.36" },
        ],
        finalAnswerLatex: "15.36\\text{ m}^2",
      },
      {
        title: "Tank volume and capacity",
        questionLatex:
          "\\text{A rectangular tank is }1.2\\text{ m by }0.5\\text{ m by }0.4\\text{ m.}",
        steps: [
          { explanation: "Volume of a rectangular prism is length times width times height.", latex: "V=1.2\\times 0.5\\times 0.4=0.24\\text{ m}^3" },
          { explanation: "One cubic metre is 1000 litres.", latex: "0.24\\times 1000=240" },
        ],
        finalAnswerLatex: "240\\text{ L}",
      },
      {
        title: "Material for a box",
        questionLatex:
          "\\text{A cube storage box has side length }0.5\\text{ m. Find its surface area.}",
        steps: [
          { explanation: "A cube has 6 equal square faces.", latex: "SA=6s^2" },
          { explanation: "Substitute the side length.", latex: "6(0.5)^2=1.5" },
        ],
        finalAnswerLatex: "1.5\\text{ m}^2",
      },
    ];
  }

  if (slug === "energy-mass-practical-measurement") {
    return [
      {
        title: "Mass conversion for ingredients",
        questionLatex:
          "\\text{A recipe uses }1.75\\text{ kg of flour. Find this in grams.}",
        steps: [
          { explanation: "One kilogram is 1000 grams.", latex: "1\\text{ kg}=1000\\text{ g}" },
          { explanation: "Multiply by 1000.", latex: "1.75\\times 1000=1750" },
        ],
        finalAnswerLatex: "1750\\text{ g}",
      },
      {
        title: "Energy label calculation",
        questionLatex:
          "\\text{A snack has }620\\text{ kJ per serve. A student eats }3\\text{ serves.}",
        steps: [
          { explanation: "Multiply the energy per serve by the number of serves." },
          { explanation: "Calculate total energy.", latex: "620\\times 3=1860" },
        ],
        finalAnswerLatex: "1860\\text{ kJ}",
      },
      {
        title: "Electricity use and cost",
        questionLatex:
          "\\text{A heater uses }1.8\\text{ kWh. Electricity costs }30\\text{ cents per kWh.}",
        steps: [
          { explanation: "Multiply kWh by the cost per kWh.", latex: "1.8\\times 30=54" },
          { explanation: "The result is in cents." },
        ],
        finalAnswerLatex: "54\\text{ cents}",
      },
    ];
  }

  if (slug === "composite-shapes-land-measurement") {
    return [
      {
        title: "Area of an L-shaped floor plan",
        questionLatex:
          "\\text{An L-shaped room has outer dimensions }8\\text{ m}\\times 5\\text{ m. A rectangular corner }3\\text{ m}\\times 2\\text{ m is cut away. Find the floor area.}",
        steps: [
          { explanation: "Find the area of the outer rectangle.", latex: "8\\times 5=40\\text{ m}^2" },
          { explanation: "Find the area of the cut-away corner.", latex: "3\\times 2=6\\text{ m}^2" },
          { explanation: "Subtract the corner from the outer rectangle.", latex: "40-6=34\\text{ m}^2" },
        ],
        finalAnswerLatex: "34\\text{ m}^2",
      },
      {
        title: "Converting between m² and hectares",
        questionLatex:
          "\\text{A paddock has area }35{,}000\\text{ m}^2.\\text{ Convert this to hectares.}",
        steps: [
          { explanation: "Recall the conversion factor.", latex: "1\\text{ ha}=10{,}000\\text{ m}^2" },
          { explanation: "Divide by 10,000.", latex: "35{,}000\\div 10{,}000=3.5\\text{ ha}" },
        ],
        finalAnswerLatex: "3.5\\text{ ha}",
      },
      {
        title: "Perimeter of a rectangular paddock for fencing",
        questionLatex:
          "\\text{A paddock is }45\\text{ m}\\times 30\\text{ m.\\;What length of fencing is needed?}",
        steps: [
          { explanation: "Fencing covers the perimeter of the paddock.", latex: "P=2(l+w)=2(45+30)" },
          { explanation: "Calculate.", latex: "2\\times 75=150\\text{ m}" },
        ],
        finalAnswerLatex: "150\\text{ m}",
      },
    ];
  }

  if (slug === "density-concentration-practical-rates") {
    return [
      {
        title: "Finding density from mass and volume",
        questionLatex:
          "\\text{A metal block has mass }600\\text{ g and volume }200\\text{ cm}^3.\\text{ Find its density.}",
        steps: [
          { explanation: "Write the density formula.", latex: "D=\\frac{M}{V}" },
          { explanation: "Substitute values.", latex: "D=\\frac{600}{200}=3\\text{ g/cm}^3" },
        ],
        finalAnswerLatex: "3\\text{ g/cm}^3",
      },
      {
        title: "Fuel consumption over a journey",
        questionLatex:
          "\\text{A car uses fuel at }7.5\\text{ L/100 km.\\;How much fuel is used over }450\\text{ km?}",
        steps: [
          { explanation: "Fuel used = (distance ÷ 100) × rate.", latex: "\\text{fuel}=\\frac{450}{100}\\times 7.5" },
          { explanation: "Calculate.", latex: "4.5\\times 7.5=33.75\\text{ L}" },
        ],
        finalAnswerLatex: "33.75\\text{ L}",
      },
      {
        title: "Population density",
        questionLatex:
          "\\text{A suburb has }12{,}000\\text{ people living in an area of }4\\text{ km}^2.\\text{ Find the population density.}",
        steps: [
          { explanation: "Population density = people ÷ area.", latex: "\\text{density}=\\frac{12{,}000}{4}" },
          { explanation: "Calculate.", latex: "=3{,}000\\text{ people/km}^2" },
        ],
        finalAnswerLatex: "3{,}000\\text{ people/km}^2",
      },
    ];
  }

  if (slug === "scale-drawings-models") {
    return [
      {
        title: "Finding real length from a scale plan",
        questionLatex:
          "\\text{A building plan uses scale }1{:}100.\\text{ A wall measures }4.5\\text{ cm on the plan. Find its real length.}",
        steps: [
          { explanation: "Real length = drawing length × scale factor.", latex: "\\text{real}=4.5\\times 100=450\\text{ cm}" },
          { explanation: "Convert to metres.", latex: "450\\div 100=4.5\\text{ m}" },
        ],
        finalAnswerLatex: "4.5\\text{ m}",
      },
      {
        title: "Finding drawing length from real length",
        questionLatex:
          "\\text{A room is }6\\text{ m long.\\;The scale is }1{:}50.\\text{ What is the length on the plan?}",
        steps: [
          { explanation: "Convert real length to centimetres.", latex: "6\\text{ m}=600\\text{ cm}" },
          { explanation: "Drawing length = real length ÷ scale factor.", latex: "600\\div 50=12\\text{ cm}" },
        ],
        finalAnswerLatex: "12\\text{ cm}",
      },
      {
        title: "Map distance using scale",
        questionLatex:
          "\\text{A map uses scale }1{:}25{,}000.\\text{ Two points are }8\\text{ cm apart on the map.\\;Find the real distance.}",
        steps: [
          { explanation: "Real distance = map distance × scale factor.", latex: "8\\times 25{,}000=200{,}000\\text{ cm}" },
          { explanation: "Convert to km.", latex: "200{,}000\\div 100{,}000=2\\text{ km}" },
        ],
        finalAnswerLatex: "2\\text{ km}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed room measurement`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Room length}&4.8\\text{ m}\\\\\\text{Room width}&3.2\\text{ m}\\\\\\text{Paint coverage}&12\\text{ m}^2\\text{/L}\\end{array}",
      steps: [
        { explanation: "Find the floor or wall area depending on the question." },
        { explanation: "Keep units attached so the final answer makes sense." },
      ],
      finalAnswerLatex: "\\text{Use area, capacity or error method as required.}",
    },
    {
      title: `${title}: mixed electricity context`,
      questionLatex:
        "\\text{An appliance uses }2.5\\text{ kWh at }28\\text{ cents per kWh.}",
      steps: [
        { explanation: "Multiply energy used by the cost per kWh.", latex: "2.5\\times 28=70" },
        { explanation: "Interpret the answer in cents." },
      ],
      finalAnswerLatex: "70\\text{ cents}",
    },
  ];
}



export function year11StandardApplicationsMeasurementLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "applications-of-measurement"
  ) {
    return null;
  }

  const base = {
    workedExamples: measurementWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "units-accuracy-measurement-error") {
    return {
      ...base,
      description:
        "Convert practical measurements, choose units, and use accuracy, absolute error and percentage error.",
      learningIntention:
        "Use metric units, limits of accuracy and measurement error in practical contexts.",
      successCriteria: [
        "Convert between common metric units in context.",
        "Choose appropriate units for length, area, volume, capacity and mass.",
        "Find limits of accuracy for a rounded measurement.",
        "Calculate absolute error and percentage error in simple contexts.",
      ],
      teaching: {
        paragraphs: [
          "Measurements are always connected to units. Length, area, volume, capacity and mass each use different units.",
          "Common conversions include metres to centimetres, square metres to square centimetres, cubic metres to litres, kilograms to grams, and tonnes to kilograms.",
          "A reported measurement has a possible range. If a value is rounded to the nearest unit, the true value is within half a unit either side.",
          "Absolute error is the size of the difference between a measured value and an actual value. Percentage error compares that error with the actual value.",
        ],
        latexBlocks: [
          "1\\text{ m}=100\\text{ cm},\\quad 1\\text{ kg}=1000\\text{ g},\\quad 1\\text{ m}^3=1000\\text{ L}",
          "\\text{percentage error}=\\frac{\\text{absolute error}}{\\text{actual value}}\\times 100\\%",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-unit-g1", "A garden bed is 4.2 m long. A border strip is sold in centimetres. What length in centimetres is needed for one long side?", "\\text{length}=4.2\\text{ m}", "420 cm", ["420", "420cm"]),
        measurementAnswer("measure-unit-g2", "A reported shelf length is 86 cm to the nearest centimetre. What is the lower limit of accuracy?", "\\text{measured length}=86\\text{ cm},\\quad \\text{nearest cm}", "85.5 cm", ["85.5", "85.5cm"]),
        measurementAnswer("measure-unit-g3", "A bag labelled 5 kg actually has mass 4.9 kg. What is the absolute error?", "\\text{labelled mass}=5\\text{ kg},\\quad \\text{actual mass}=4.9\\text{ kg}", "0.1 kg", ["0.1", "0.1kg", "100 g", "100g"]),
        financeChoice("measure-unit-g4", "Which unit is most appropriate for the capacity of a water bottle?", "B", ["Square metres", "Litres", "Kilograms per hour", "Kilowatts"], "Bottle capacity is usually measured in litres or millilitres."),
      ],
      independentPractice: [
        measurementAnswer("measure-unit-i1", "A room is 3.6 m wide. Carpet edging is ordered in centimetres. Convert the width to centimetres.", "\\text{width}=3.6\\text{ m}", "360 cm", ["360", "360cm"]),
        measurementAnswer("measure-unit-i2", "A reported mass is 2.4 kg to the nearest 0.1 kg. What is the upper limit of accuracy?", "\\text{reported mass}=2.4\\text{ kg},\\quad \\text{nearest }0.1\\text{ kg}", "2.45 kg", ["2.45", "2.45kg"]),
        measurementAnswer("measure-unit-i3", "A delivery box has actual mass 20 kg but a scale reads 21 kg. What is the percentage error?", "\\text{actual mass}=20\\text{ kg},\\quad \\text{measured mass}=21\\text{ kg}", "5%", ["5", "5 percent", "5percent"]),
        financeChoice("measure-unit-i4", "Which conversion is needed to change 0.75 tonnes to kilograms?", "A", ["Multiply by 1000", "Divide by 1000", "Multiply by 100", "Square the value"], "One tonne is 1000 kg."),
        measurementAnswer("measure-unit-i5", "A container holds 0.35 m^3 of water. Convert this capacity to litres.", "\\text{volume}=0.35\\text{ m}^3", "350 L", ["350", "350L", "350 l", "350 litres"]),
      ],
      commonMistakes: [
        { mistake: "Converting 2 m² to cm² by multiplying by 100 instead of 10000.", fix: "Area conversions square the length factor: 1 m = 100 cm, so 1 m² = 100² = 10000 cm²." },
        { mistake: "Giving a measurement answer without a unit, such as 420 instead of 420 cm.", fix: "Include the unit every time: the context says whether the answer should be in cm, kg, litres, or another unit." },
        { mistake: "Using the full rounding unit instead of half for limits of accuracy.", fix: "Half the rounding unit is used on each side: for nearest 0.1 cm, limits are ± 0.05 cm." },
        { mistake: "Dividing the absolute error by the measured value instead of the actual value.", fix: "When the actual value is given, use it in the denominator for percentage error." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-unit-m1", "A desk is 1.25 m long. Convert this length to centimetres for a cutting list.", "\\text{length}=1.25\\text{ m}", "125 cm", ["125", "125cm"]),
        measurementAnswer("measure-unit-m2", "A reported length is 18.4 cm to the nearest millimetre. What is the lower limit of accuracy?", "\\text{reported}=18.4\\text{ cm},\\quad \\text{rounded to nearest mm}", "18.35 cm", ["18.35", "18.35cm"]),
        measurementAnswer("measure-unit-m3", "A reported length is 18.4 cm to the nearest millimetre. What is the upper limit of accuracy?", "\\text{reported}=18.4\\text{ cm},\\quad \\text{rounded to nearest mm}", "18.45 cm", ["18.45", "18.45cm"]),
        measurementAnswer("measure-unit-m4", "A scale reads 51 kg for a bag with actual mass 50 kg. What is the percentage error?", "\\text{measured}=51\\text{ kg},\\quad \\text{actual}=50\\text{ kg}", "2%", ["2", "2 percent", "2percent"]),
        financeChoice("measure-unit-m5", "Which unit is most suitable for floor area?", "C", ["Centimetres", "Litres", "Square metres", "Kilograms"], "Floor area is measured in square units."),
        measurementAnswer("measure-unit-m6", "A small tank contains 1.8 m^3 of water. Convert this to litres.", "\\text{volume}=1.8\\text{ m}^3", "1800 L", ["1800", "1,800", "1800L", "1800 l", "1800 litres"]),
        financeChoice("measure-unit-m7", "A percentage error question should compare error with:", "A", ["The actual value", "The rounded unit only", "The largest unit", "The label colour"], "Percentage error uses actual value in the denominator when available."),
        measurementAnswer("measure-unit-m8", "A recipe uses 0.65 kg of rice. Convert this to grams.", "\\text{mass}=0.65\\text{ kg}", "650 g", ["650", "650g"]),
        {
          id: "measure-unit-m9",
          prompt:
            "A fence post is measured as 2.4 m with an absolute error of 0.05 m. Eight equal posts are placed end to end. Find the largest possible total length.",
          latex:
            "\\text{measured length}=2.4\\text{ m},\\quad \\text{absolute error}=0.05\\text{ m},\\quad \\text{posts}=8",
          answer: "19.6 m",
          acceptedAnswers: [
            "19.6",
            "19.6 m",
            "19.6m",
            "19.6 metres",
            "19.6 meters",
          ],
          hint: "Use the largest possible length for each post, then multiply by the number of posts.",
          explanation:
            "The largest possible length of one post is $2.4+0.05=2.45$ m. For 8 posts, the total length is $8\\times2.45=19.6$ m.",
        },
        {
          id: "measure-unit-m10",
          prompt:
            "A digital scale reads to the nearest 10 g. What is the maximum absolute error for a reading on this scale?",
          latex: "\\text{scale reads to the nearest }10\\text{ g}",
          answer: "5 g",
          acceptedAnswers: ["5", "5 g", "5g", "5 grams"],
          hint: "The maximum rounding error is half of the measuring interval.",
          explanation:
            "A measurement to the nearest 10 g can be up to half of 10 g away from the true value, so the maximum absolute error is 5 g.",
        },
      ],
    };
  }

  if (lesson.slug === "area-surface-area-volume") {
    return {
      ...base,
      description:
        "Use perimeter, area, surface area, volume and capacity for rooms, materials, containers and tanks.",
      learningIntention:
        "Calculate practical area, surface area, volume and capacity using appropriate units.",
      successCriteria: [
        "Calculate area for flooring, painting or materials.",
        "Calculate composite area in simple contexts.",
        "Calculate volume and convert capacity to litres.",
        "Choose between area, surface area and volume methods.",
      ],
      teaching: {
        paragraphs: [
          "Area measures how much flat surface a shape covers, counted in unit squares (cm², m²) — used for flooring, walls, gardens and paint coverage.",
          "Surface area is the total area of the outside faces of an object, such as material needed to cover a box.",
          "Volume measures how much space a solid fills, counted in unit cubes (cm³, m³) — picture stacking unit cubes until it is full. Capacity is how much a container holds, often measured in litres.",
          "Check units before calculating. For capacity, 1 cubic metre equals 1000 litres.",
        ],
        latexBlocks: [
          "A_{\\text{rectangle}}=lw",
          "V_{\\text{prism}}=lwh",
          "1\\text{ m}^3=1000\\text{ L}",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-area-g1", "A bedroom floor is 4.8 m long and 3.2 m wide. What area of flooring is needed?", "l=4.8\\text{ m},\\quad w=3.2\\text{ m}", "15.36 m^2", ["15.36", "15.36m^2", "15.36 m2"]),
        measurementAnswer("measure-area-g2", "A rectangular planter box is 1.2 m by 0.5 m by 0.4 m. What is its volume in cubic metres?", "l=1.2\\text{ m},\\quad w=0.5\\text{ m},\\quad h=0.4\\text{ m}", "0.24 m^3", ["0.24", "0.24m^3", "0.24 m3"]),
        measurementAnswer("measure-area-g3", "The planter box volume is 0.24 m^3. Convert this to litres.", "V=0.24\\text{ m}^3", "240 L", ["240", "240L", "240 l", "240 litres"]),
        financeChoice("measure-area-g4", "Painting the outside of a box is mainly a:", "B", ["Volume problem", "Surface area problem", "Mass problem", "Percentage error problem"], "Painting outside faces uses surface area."),
      ],
      independentPractice: [
        measurementAnswer("measure-area-i1", "A rectangular garden bed is 5.5 m long and 1.8 m wide. What is its area?", "l=5.5\\text{ m},\\quad w=1.8\\text{ m}", "9.9 m^2", ["9.9", "9.90", "9.9m^2", "9.9 m2"]),
        measurementAnswer("measure-area-i2", "A wall is 3 m high and 4.2 m wide. What area is painted?", "h=3\\text{ m},\\quad w=4.2\\text{ m}", "12.6 m^2", ["12.6", "12.60", "12.6m^2", "12.6 m2"]),
        measurementAnswer("measure-area-i3", "A storage box is 0.8 m by 0.5 m by 0.3 m. Find its volume.", "l=0.8\\text{ m},\\quad w=0.5\\text{ m},\\quad h=0.3\\text{ m}", "0.12 m^3", ["0.12", "0.12m^3", "0.12 m3"]),
        measurementAnswer("measure-area-i4", "A tank holds 0.12 m^3. Convert this to litres.", "V=0.12\\text{ m}^3", "120 L", ["120", "120L", "120 l", "120 litres"]),
        financeChoice("measure-area-i5", "Which mistake is most likely when converting square metres to square centimetres?", "D", ["Using square units", "Checking the context", "Multiplying by the area", "Multiplying by 100 instead of 10000"], "Area conversions square the length conversion factor."),
      ],
      commonMistakes: [
        { mistake: "Using perimeter when area is needed for flooring.", fix: "Flooring and painting flat surfaces use area (l × w), not the sum of sides." },
        { mistake: "Multiplying length, width, and height to find the floor area of a room.", fix: "Floor area uses only two dimensions: area = l × w. Volume uses all three." },
        { mistake: "Forgetting to convert cubic metres to litres.", fix: "Multiply volume in cubic metres by 1000 to get litres: 0.24 m³ = 240 L." },
        { mistake: "Confusing surface area and volume.", fix: "Surface area covers the outside faces (for wrapping or painting); volume fills the inside space." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-area-m1", "A rug is 2.4 m by 1.5 m. What floor area does it cover?", "l=2.4\\text{ m},\\quad w=1.5\\text{ m}", "3.6 m^2", ["3.6", "3.60", "3.6m^2", "3.6 m2"]),
        measurementAnswer("measure-area-m2", "A room is 6 m by 3.5 m. What area of flooring is needed?", "l=6\\text{ m},\\quad w=3.5\\text{ m}", "21 m^2", ["21", "21.0", "21m^2", "21 m2"]),
        measurementAnswer("measure-area-m3", "A box is 1 m by 0.4 m by 0.5 m. What is its volume?", "l=1\\text{ m},\\quad w=0.4\\text{ m},\\quad h=0.5\\text{ m}", "0.2 m^3", ["0.2", "0.20", "0.2m^3", "0.2 m3"]),
        measurementAnswer("measure-area-m4", "A container has volume 0.2 m^3. What is its capacity in litres?", "V=0.2\\text{ m}^3", "200 L", ["200", "200L", "200 l", "200 litres"]),
        financeChoice("measure-area-m5", "Carpet for a room should be ordered using:", "A", ["Area", "Volume", "Mass", "Percentage error"], "Carpet covers floor area."),
        measurementAnswer("measure-area-m6", "A cube has side length 0.5 m. Find its surface area.", "\\text{side}=0.5\\text{ m}", "1.5 m^2", ["1.5", "1.50", "1.5m^2", "1.5 m2"]),
        financeChoice("measure-area-m7", "Water filling a tank is a:", "C", ["Perimeter context", "Surface area context only", "Volume or capacity context", "Mass-only context"], "Filling a tank uses volume/capacity."),
        measurementAnswer("measure-area-m8", "A rectangular sign is 80 cm by 50 cm. What is its area in square centimetres?", "l=80\\text{ cm},\\quad w=50\\text{ cm}", "4000 cm^2", ["4000", "4,000", "4000cm^2", "4000 cm2"]),
        measurementAnswer("measure-area-m9", "A composite path has two rectangles: 4 m by 2 m and 3 m by 1 m. What is the total area?", "\\text{rect 1: }4\\times 2\\text{ m},\\quad \\text{rect 2: }3\\times 1\\text{ m}", "11 m^2", ["11", "11m^2", "11 m2"]),
        financeChoice("measure-area-m10", "A material estimate for wrapping a box should use:", "B", ["Only volume", "Surface area", "Only capacity", "Percentage error"], "Wrapping uses outside surface area."),
      ],
    };
  }

  if (lesson.slug === "energy-mass-practical-measurement") {
    return {
      ...base,
      description:
        "Use mass, food energy labels, kilojoules, electricity use in kWh, and practical reasonableness checks.",
      learningIntention:
        "Interpret mass, energy and electricity measurements in everyday contexts.",
      successCriteria: [
        "Convert between grams, kilograms and tonnes.",
        "Use energy labels to calculate total kilojoules.",
        "Calculate electricity usage or cost using kWh.",
        "Compare practical quantities and check reasonableness.",
      ],
      teaching: {
        paragraphs: [
          "Mass is commonly measured in grams, kilograms and tonnes. Choose the unit that fits the context.",
          "Food energy labels give kilojoules per serve, which is a rate, so total energy is that rate multiplied by the number of serves eaten — just as electricity cost is the rate per kWh times the kWh used.",
          "Electricity usage is often measured in kilowatt-hours, written kWh. Cost can be found by multiplying kWh by the cost per kWh.",
          "Reasonableness matters: a snack may be measured in grams, while a delivery truck load may be measured in tonnes.",
        ],
        latexBlocks: [
          "1\\text{ kg}=1000\\text{ g},\\quad 1\\text{ t}=1000\\text{ kg}",
          "\\text{electricity cost}=\\text{kWh used}\\times\\text{cost per kWh}",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-energy-g1", "A recipe uses 1.75 kg of flour. Convert this to grams.", "\\text{mass}=1.75\\text{ kg}", "1750 g", ["1750", "1,750", "1750g"]),
        measurementAnswer("measure-energy-g2", "A snack label shows 620 kJ per serve. A student eats 3 serves. What total energy is consumed?", "\\text{energy per serve}=620\\text{ kJ},\\quad \\text{serves}=3", "1860 kJ", ["1860", "1,860", "1860kJ", "1860 kJ"]),
        measurementAnswer("measure-energy-g3", "A heater uses 1.8 kWh and electricity costs 30 cents per kWh. What is the cost in cents?", "\\text{usage}=1.8\\text{ kWh},\\quad \\text{rate}=30\\text{ c/kWh}", "54 cents", ["54", "54c", "54 cents"]),
        financeChoice("measure-energy-g4", "Which unit is most suitable for the mass of a car?", "D", ["Millilitres", "Square metres", "Kilojoules", "Tonnes"], "A car mass is commonly measured in tonnes."),
      ],
      independentPractice: [
        measurementAnswer("measure-energy-i1", "A lunchbox contains 0.85 kg of fruit. Convert this to grams.", "\\text{mass}=0.85\\text{ kg}", "850 g", ["850", "850g"]),
        measurementAnswer("measure-energy-i2", "A cereal label lists 410 kJ per serve. Two serves are eaten. What is the total energy?", "\\text{energy per serve}=410\\text{ kJ},\\quad \\text{serves}=2", "820 kJ", ["820", "820kJ", "820 kJ"]),
        measurementAnswer("measure-energy-i3", "A dryer uses 2.5 kWh. Electricity costs 28 cents per kWh. What is the cost in cents?", "\\text{usage}=2.5\\text{ kWh},\\quad \\text{rate}=28\\text{ c/kWh}", "70 cents", ["70", "70c", "70 cents"]),
        measurementAnswer("measure-energy-i4", "A load of gravel has mass 2.4 tonnes. Convert this to kilograms.", "\\text{mass}=2.4\\text{ t}", "2400 kg", ["2400", "2,400", "2400kg"]),
        financeChoice("measure-energy-i5", "Which answer is most reasonable for the mass of a packet of rice?", "B", ["5 tonnes", "1 kg", "900 kWh", "20 square metres"], "Rice packets are commonly measured in kilograms."),
      ],
      commonMistakes: [
        { mistake: "Treating kilojoules as a measure of mass.", fix: "Kilojoules measure energy. Mass is measured in grams, kilograms, or tonnes." },
        { mistake: "Giving 620 kJ as the total when a student eats 3 serves of a 620 kJ snack.", fix: "Multiply energy per serve by the number of serves: 620 × 3 = 1860 kJ." },
        { mistake: "Giving the power rating in kW as the cost instead of calculating kWh × cost per kWh.", fix: "Multiply the energy used in kWh by the cost per kWh to get the cent or dollar amount." },
        { mistake: "Choosing tonnes for a packet of pasta or grams for a truckload of gravel.", fix: "Small food items use grams or kilograms; large loads such as gravel or sand use tonnes." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-energy-m1", "A packet contains 2.25 kg of potatoes. Convert this to grams.", "\\text{mass}=2.25\\text{ kg}", "2250 g", ["2250", "2,250", "2250g"]),
        measurementAnswer("measure-energy-m2", "A drink label lists 350 kJ per bottle. What energy is in 4 bottles?", "\\text{energy per bottle}=350\\text{ kJ},\\quad \\text{bottles}=4", "1400 kJ", ["1400", "1,400", "1400kJ", "1400 kJ"]),
        measurementAnswer("measure-energy-m3", "An air conditioner uses 3.2 kWh. Electricity costs 25 cents per kWh. What is the cost in cents?", "\\text{usage}=3.2\\text{ kWh},\\quad \\text{rate}=25\\text{ c/kWh}", "80 cents", ["80", "80c", "80 cents"]),
        financeChoice("measure-energy-m4", "A food label showing kJ is measuring:", "A", ["Energy", "Surface area", "Length", "Capacity"], "kJ measures energy."),
        measurementAnswer("measure-energy-m5", "A delivery has mass 0.75 tonnes. Convert this to kilograms.", "\\text{mass}=0.75\\text{ t}", "750 kg", ["750", "750kg"]),
        measurementAnswer("measure-energy-m6", "A snack has 510 kJ per serve and there are 5 serves. Find total energy.", "\\text{energy per serve}=510\\text{ kJ},\\quad \\text{serves}=5", "2550 kJ", ["2550", "2,550", "2550kJ", "2550 kJ"]),
        financeChoice("measure-energy-m7", "Which unit is most suitable for a phone battery energy discussion?", "C", ["Tonnes", "Square metres", "Kilowatt-hours or watt-hours", "Centimetres"], "Electrical energy is measured with watt-hours or kilowatt-hours."),
        measurementAnswer("measure-energy-m8", "A washing machine uses 1.4 kWh at 32 cents per kWh. What is the cost in cents?", "\\text{usage}=1.4\\text{ kWh},\\quad \\text{rate}=32\\text{ c/kWh}", "44.8 cents", ["44.8", "44.80", "44.8c", "44.8 cents"]),
        financeChoice("measure-energy-m9", "A result of 300 tonnes for a school lunch sandwich is:", "D", ["Reasonable", "A capacity", "An area", "Not reasonable"], "A sandwich mass would be in grams, not tonnes."),
        measurementAnswer("measure-energy-m10", "A recipe uses 250 g of pasta for each person. How many grams are needed for 6 people?", "\\text{pasta per person}=250\\text{ g},\\quad \\text{people}=6", "1500 g", ["1500", "1,500", "1500g"]),
      ],
    };
  }

  if (lesson.slug === "composite-shapes-land-measurement") {
    return {
      ...base,
      description:
        "Find areas of L-shapes and other composite figures by splitting into rectangles and triangles, and convert between square metres and hectares for land measurement.",
      learningIntention:
        "Calculate areas of composite shapes involving rectangles and triangles, and convert between m² and ha.",
      successCriteria: [
        "Split composite shapes into rectangles or triangles and find each part's area.",
        "Add or subtract areas to find the total for L-shapes and similar figures.",
        "Convert between square metres and hectares using 1 ha = 10,000 m².",
        "Find the perimeter of composite figures for fencing problems.",
      ],
      teaching: {
        paragraphs: [
          "A composite shape is made by joining or removing standard shapes such as rectangles and triangles. Split the shape into parts, find each area, then add or subtract as needed.",
          "For an L-shaped region, two approaches work: treat it as a large rectangle minus the cut-out corner, or split it into two separate rectangles and add them.",
          "Land area in Australia is commonly measured in hectares. One hectare equals 10,000 square metres. To convert from m² to ha, divide by 10,000.",
          "Perimeter is used for fencing and border strips. Count only the outer edges of the composite shape — not any interior dividing lines.",
        ],
        latexBlocks: [
          "A_{\\text{composite}} = A_1 + A_2 \\;(\\text{or}\\; A_1 - A_{\\text{cut-out}})",
          "1\\text{ ha} = 10{,}000\\text{ m}^2 \\qquad 1\\text{ km}^2 = 100\\text{ ha}",
        ],
      },
      guidedPractice: [
        financeChoice("measure-comp-g1", "The area of an L-shaped region is best found by:", "B", [
          "Measuring around the outside only",
          "Splitting into rectangles or subtracting a corner from the outer rectangle",
          "Multiplying all side lengths together",
          "Using the triangle area formula",
        ], "Split into standard shapes or subtract the cut-out corner from the full rectangle."),
        measurementAnswer("measure-comp-g2", "An L-shaped room has outer dimensions 8 m × 5 m. A rectangular corner 3 m × 2 m is cut away. Find the floor area.", "", "34 m^2", ["34", "34m^2", "34 m2", "34 m²"]),
        financeChoice("measure-comp-g3", "1 hectare equals:", "C", [
          "100 m²",
          "1000 m²",
          "10,000 m²",
          "100,000 m²",
        ], "1 ha = 10,000 m²."),
        measurementAnswer("measure-comp-g4", "A paddock has area 24,000 m². Convert this to hectares.", "", "2.4 ha", ["2.4", "2.4ha", "2.4 ha"]),
      ],
      independentPractice: [
        measurementAnswer("measure-comp-i1", "A composite shape is made of two rectangles joined together: 10 m × 6 m and 5 m × 4 m. Find the total area.", "", "80 m^2", ["80", "80m^2", "80 m2", "80 m²"]),
        measurementAnswer("measure-comp-i2", "A triangular garden bed has base 6 m and height 4 m. Find its area.", "", "12 m^2", ["12", "12m^2", "12 m2", "12 m²"]),
        measurementAnswer("measure-comp-i3", "A farm has area 35,000 m². Convert this to hectares.", "", "3.5 ha", ["3.5", "3.5ha", "3.5 ha"]),
        financeChoice("measure-comp-i4", "A rectangular paddock is 45 m × 30 m. What length of fencing is needed?", "C", [
          "1350 m",
          "135 m",
          "150 m",
          "75 m",
        ], "Perimeter = 2(45 + 30) = 2 × 75 = 150 m."),
        measurementAnswer("measure-comp-i5", "An L-shaped garden is made by joining rectangle A (12 m × 3 m) and rectangle B (5 m × 2 m). Find the total area.", "", "46 m^2", ["46", "46m^2", "46 m2", "46 m²"]),
      ],
      commonMistakes: [
        { mistake: "Counting an interior line as part of the perimeter.", fix: "Trace only the outer boundary of the composite shape. A line dividing two sections of the shape is not part of the perimeter." },
        { mistake: "Dividing by 100 instead of 10,000 when converting m² to ha.", fix: "1 ha = 10,000 m², not 100 m². Divide the m² value by 10,000 to get hectares." },
        { mistake: "Forgetting to subtract the cut-out in an L-shape.", fix: "If a corner has been removed from a rectangle, start with the outer rectangle area and subtract the missing piece." },
        { mistake: "Adding the cut-out area instead of subtracting it.", fix: "Identify whether each piece is added (included in the shape) or removed (cut out). Remove means subtract." },
      ],
      masteryQuiz: [
        financeChoice("measure-comp-m1", "To find the area of an L-shape with a cut-out corner, you should:", "B", [
          "Add all four side lengths",
          "Find the outer rectangle area then subtract the cut-out area",
          "Multiply the two longest sides",
          "Use the circle formula",
        ], "Large rectangle minus the cut-out corner gives the composite area."),
        measurementAnswer("measure-comp-m2", "An L-shaped floor plan has outer dimensions 7 m × 4 m with a 2 m × 2 m corner cut away. Find the area.", "", "24 m^2", ["24", "24m^2", "24 m2", "24 m²"]),
        measurementAnswer("measure-comp-m3", "A composite shape has two rectangles: 9 m × 5 m and 4 m × 3 m. Find the total area.", "", "57 m^2", ["57", "57m^2", "57 m2", "57 m²"]),
        measurementAnswer("measure-comp-m4", "Convert 4.8 ha to m².", "", "48000 m^2", ["48000", "48,000", "48000m^2", "48000 m2", "48,000 m²"]),
        financeChoice("measure-comp-m5", "1 km² equals how many hectares?", "B", [
          "10 ha",
          "100 ha",
          "1000 ha",
          "10,000 ha",
        ], "1 km² = 1,000,000 m². Divide by 10,000 to get 100 ha."),
        measurementAnswer("measure-comp-m6", "A rectangular paddock is 45 m × 30 m. What length of fencing is needed for the perimeter?", "", "150 m", ["150", "150m"]),
        measurementAnswer("measure-comp-m7", "A block of land has area 60,000 m². Convert this to hectares.", "", "6 ha", ["6", "6ha", "6 ha"]),
        measurementAnswer("measure-comp-m8", "A composite shape has a rectangle 5 m × 3 m with a triangle attached (base 5 m, height 2 m). Find the total area.", "", "20 m^2", ["20", "20m^2", "20 m2", "20 m²"]),
        measurementAnswer("measure-comp-m9", "Convert 3 ha to m².", "", "30000 m^2", ["30000", "30,000", "30000m^2", "30000 m2", "30,000 m²"]),
        financeChoice("measure-comp-m10", "The best method to find the area of an irregular L-shaped paddock is:", "B", [
          "Measure the perimeter only",
          "Split into standard rectangles and triangles and add the areas",
          "Count the number of corners",
          "Multiply length by width and divide by 2",
        ], "Composite areas are found by splitting into standard shapes and adding (or subtracting) each part."),
      ],
    };
  }

  if (lesson.slug === "density-concentration-practical-rates") {
    return {
      ...base,
      description:
        "Apply D = M/V for density, calculate fuel consumption in L/100 km, population density in people per km², and concentration in g/L.",
      learningIntention:
        "Apply density D = M/V and practical rate formulas including fuel consumption, population density and concentration.",
      successCriteria: [
        "Use D = M/V to find density, mass or volume.",
        "Calculate fuel used from distance and consumption rate.",
        "Find population density in people per km².",
        "Calculate concentration in g/L from mass and volume.",
      ],
      teaching: {
        paragraphs: [
          "Density measures how much mass occupies a given volume. A high-density material like iron has more mass per cm³ than a low-density material like foam. The formula is D = M/V.",
          "Rearrange the formula triangle: M = D × V (to find mass) and V = M/D (to find volume). Always include the unit: g/cm³ or kg/m³.",
          "Fuel consumption measures litres used per 100 km. Fuel used (L) = (distance ÷ 100) × rate. To find the rate from a trip: rate = (fuel used ÷ distance) × 100.",
          "Population density and concentration follow the same rate-per-unit pattern. Population density = people ÷ km². Concentration = mass (g) ÷ volume (L).",
        ],
        latexBlocks: [
          "D=\\frac{M}{V}\\qquad M=D\\times V\\qquad V=\\frac{M}{D}",
          "\\text{fuel used (L)}=\\frac{\\text{distance (km)}}{100}\\times\\text{rate (L/100 km)}",
          "\\text{population density}=\\frac{\\text{people}}{\\text{area (km}^2)}\\qquad\\text{concentration}=\\frac{\\text{mass (g)}}{\\text{volume (L)}}",
        ],
      },
      guidedPractice: [
        financeChoice("measure-dens-g1", "The formula for density is:", "B", [
          "D = V × M",
          "D = M/V",
          "D = M + V",
          "D = V/M",
        ], "Density = mass divided by volume: D = M/V."),
        measurementAnswer("measure-dens-g2", "A metal sample has mass 600 g and volume 200 cm³. Find the density.", "", "3 g/cm^3", ["3", "3g/cm3", "3 g/cm3", "3 g/cm³"]),
        measurementAnswer("measure-dens-g3", "A material has density 2.5 g/cm³ and volume 400 cm³. Find the mass.", "", "1000 g", ["1000", "1000g", "1 kg", "1000 g"]),
        financeChoice("measure-dens-g4", "A car uses fuel at 7.5 L/100 km. How much fuel is used over 200 km?", "C", [
          "7.5 L",
          "75 L",
          "15 L",
          "150 L",
        ], "Fuel = (200 ÷ 100) × 7.5 = 2 × 7.5 = 15 L."),
      ],
      independentPractice: [
        measurementAnswer("measure-dens-i1", "A material has density 8 g/cm³ and mass 480 g. Find its volume.", "", "60 cm^3", ["60", "60cm3", "60 cm3", "60 cm³"]),
        measurementAnswer("measure-dens-i2", "A suburb has 12,000 people living in an area of 4 km². Find the population density.", "", "3000 people/km^2", ["3000", "3,000", "3000 per km2", "3000 people/km2", "3000 people per km²"]),
        measurementAnswer("measure-dens-i3", "A car uses 45 L of fuel over 600 km. Find the fuel consumption rate in L/100 km.", "", "7.5 L/100 km", ["7.5", "7.5 L/100km", "7.5 L/100 km"]),
        financeChoice("measure-dens-i4", "A solution has 2 g dissolved in 250 mL. Find the concentration in g/L.", "A", [
          "8 g/L",
          "0.5 g/L",
          "2 g/L",
          "4 g/L",
        ], "250 mL = 0.25 L. Concentration = 2 ÷ 0.25 = 8 g/L."),
        measurementAnswer("measure-dens-i5", "A vehicle travels 300 km in 4 hours. What is its average speed in km/h?", "", "75 km/h", ["75", "75km/h", "75 km/h"]),
      ],
      commonMistakes: [
        { mistake: "Dividing volume by mass instead of mass by volume.", fix: "Density = M/V: the mass is on top of the fraction. Think: a small iron block is heavier than foam of the same size — density = how much mass per unit volume." },
        { mistake: "Multiplying distance directly by the fuel rate instead of dividing by 100 first.", fix: "The rate is per 100 km. Divide the distance by 100 first to get the number of 100-km intervals, then multiply by the rate." },
        { mistake: "Forgetting to convert mL to L before finding concentration.", fix: "Concentration is in g/L. Convert mL to L by dividing by 1000 (e.g. 250 mL = 0.25 L) before dividing mass by volume." },
        { mistake: "Thinking a higher L/100 km rate is better for fuel efficiency.", fix: "Higher L/100 km means more fuel used per 100 km — that is less efficient. A lower number means the car travels farther on the same fuel." },
      ],
      masteryQuiz: [
        financeChoice("measure-dens-m1", "If density is 3 g/cm³ and volume is 150 cm³, what is the mass?", "C", [
          "50 g",
          "0.02 g",
          "450 g",
          "153 g",
        ], "M = D × V = 3 × 150 = 450 g."),
        measurementAnswer("measure-dens-m2", "A rock has mass 450 g and volume 150 cm³. Find the density.", "", "3 g/cm^3", ["3", "3g/cm3", "3 g/cm3", "3 g/cm³"]),
        measurementAnswer("measure-dens-m3", "A piece of steel has density 7.8 g/cm³ and volume 200 cm³. Find the mass.", "", "1560 g", ["1560", "1560g", "1,560 g", "1560 g"]),
        measurementAnswer("measure-dens-m4", "A substance has density 3 g/cm³ and mass 900 g. Find its volume.", "", "300 cm^3", ["300", "300cm3", "300 cm3", "300 cm³"]),
        financeChoice("measure-dens-m5", "Which unit is used for density?", "B", [
          "cm³ per gram",
          "g/cm³ or kg/m³",
          "g/L",
          "km/h",
        ], "Density units combine mass and volume: g/cm³ (grams per cubic centimetre) or kg/m³ (kilograms per cubic metre)."),
        measurementAnswer("measure-dens-m6", "A car uses fuel at 7.5 L/100 km. How much fuel is needed for a 450 km journey?", "", "33.75 L", ["33.75", "33.75L", "33.75 L"]),
        measurementAnswer("measure-dens-m7", "A city has 24,000 people living in an area of 6 km². Find the population density.", "", "4000 people/km^2", ["4000", "4,000", "4000 per km2", "4000 people/km2", "4000 people per km²"]),
        measurementAnswer("measure-dens-m8", "A solution has 5 g dissolved in 2 L. Find the concentration in g/L.", "", "2.5 g/L", ["2.5", "2.5 g/L", "2.5g/L"]),
        financeChoice("measure-dens-m9", "Car A uses 8.0 L/100 km. Car B uses 6.5 L/100 km. Which is more fuel-efficient?", "B", [
          "Car A, because it has a higher number",
          "Car B, because it uses less fuel per 100 km",
          "They are equally efficient",
          "Car A, because more L means more power",
        ], "Lower L/100 km means less fuel used for the same distance — Car B is more fuel-efficient."),
        measurementAnswer("measure-dens-m10", "A material has mass 250 g and volume 50 cm³. Find the density.", "", "5 g/cm^3", ["5", "5g/cm3", "5 g/cm3", "5 g/cm³"]),
      ],
    };
  }

  if (lesson.slug === "scale-drawings-models") {
    return {
      ...base,
      description:
        "Interpret scale 1:n to find real lengths from drawings and drawing lengths from real measurements, and apply the squared scale factor for areas.",
      learningIntention:
        "Use a scale factor to convert between drawing lengths and real lengths, and apply the squared scale factor for area problems.",
      successCriteria: [
        "Multiply drawing length by the scale factor to find the real length.",
        "Divide real length by the scale factor to find the drawing length.",
        "Convert cm to m or km when working with building plans or maps.",
        "Multiply drawing area by n² to find real area.",
      ],
      teaching: {
        paragraphs: [
          "A scale drawing represents a real object with all lengths in the same proportion. A scale of 1:100 means every 1 cm on the drawing represents 100 cm (1 m) in reality.",
          "To find a real length, multiply the drawing length by the scale factor n. To find a drawing length, divide the real length by n. Convert units (cm → m or km) at the end if needed.",
          "Areas scale by the square of the scale factor. If the scale is 1:100, then 1 cm² on the drawing represents 100² = 10,000 cm² (= 1 m²) in reality.",
          "Building plans commonly use scales of 1:50 or 1:100. Maps use larger scale factors like 1:25,000 or 1:50,000, so remember to convert cm to m or km in the answer.",
        ],
        latexBlocks: [
          "\\text{real length} = \\text{drawing length} \\times n",
          "\\text{drawing length} = \\text{real length} \\div n",
          "\\text{real area} = \\text{drawing area} \\times n^2",
        ],
      },
      guidedPractice: [
        financeChoice("measure-scale-g1", "A scale of 1:100 means:", "A", [
          "Every 1 cm on the drawing represents 100 cm in reality",
          "The drawing is 100 times larger than reality",
          "Every 100 cm on the drawing represents 1 cm in reality",
          "The area is divided by 100",
        ], "Scale 1:n means 1 drawing unit represents n real units."),
        measurementAnswer("measure-scale-g2", "A building plan uses scale 1:100. A wall is 4.5 cm on the plan. What is the real length in cm?", "", "450 cm", ["450", "450cm"]),
        measurementAnswer("measure-scale-g3", "A room is 6 m long (= 600 cm). The plan uses scale 1:50. What is the length on the plan in cm?", "", "12 cm", ["12", "12cm"]),
        financeChoice("measure-scale-g4", "A map has scale 1:25,000. Two points are 8 cm apart. What is the real distance?", "B", [
          "200 m",
          "2 km",
          "20 km",
          "200 km",
        ], "8 × 25,000 = 200,000 cm = 2,000 m = 2 km."),
      ],
      independentPractice: [
        measurementAnswer("measure-scale-i1", "A scale drawing uses 1:200. A wall on the drawing is 3.5 cm. What is the real length in m?", "", "7 m", ["7", "7m"]),
        measurementAnswer("measure-scale-i2", "A model car uses scale 1:20. The real car is 4 m long (= 400 cm). How long is the model in cm?", "", "20 cm", ["20", "20cm"]),
        financeChoice("measure-scale-i3", "A plan uses scale 1:100. A room on the plan has area 6 cm². What is the real area?", "B", [
          "600 cm²",
          "6 m²",
          "60 m²",
          "600 m²",
        ], "Real area = 6 × 100² = 6 × 10,000 = 60,000 cm² = 6 m²."),
        measurementAnswer("measure-scale-i4", "A scale drawing uses 1:500. A line on the drawing is 2.4 cm. What is the real length in m?", "", "12 m", ["12", "12m"]),
        measurementAnswer("measure-scale-i5", "A room is 3.5 m long (= 350 cm). The plan uses 1:100. What is the length on the plan in cm?", "", "3.5 cm", ["3.5", "3.5cm"]),
      ],
      commonMistakes: [
        { mistake: "Dividing when finding real length instead of multiplying.", fix: "Real lengths are larger than drawing lengths (for normal scale drawings). Multiply drawing length × n to get the real length." },
        { mistake: "Forgetting to convert cm to m or km after calculating real lengths.", fix: "If the drawing is in cm and the scale gives cm, divide by 100 for m or by 100,000 for km." },
        { mistake: "Squaring the scale factor for a length problem.", fix: "The squared factor applies only to areas. For a single length, multiply (or divide) by n — not n²." },
        { mistake: "Omitting the unit in the answer.", fix: "Always write the unit (cm, m, or km) so the answer is clear and unambiguous." },
      ],
      masteryQuiz: [
        financeChoice("measure-scale-m1", "In a scale of 1:n, n represents:", "A", [
          "How many real units correspond to 1 unit on the drawing",
          "How many drawing units fit into 1 real unit",
          "The total area of the plan",
          "The number of pages in the plan",
        ], "1:n means 1 drawing unit equals n real units."),
        measurementAnswer("measure-scale-m2", "Scale 1:50. A wall on the plan is 8 cm. What is the real length in m?", "", "4 m", ["4", "4m"]),
        measurementAnswer("measure-scale-m3", "Scale 1:100. A corridor is 12 m long (= 1200 cm). What is the length on the plan in cm?", "", "12 cm", ["12", "12cm"]),
        financeChoice("measure-scale-m4", "To find the drawing length from the real length:", "C", [
          "Multiply the real length by n",
          "Multiply the real length by n²",
          "Divide the real length by n",
          "Add n to the real length",
        ], "Drawing length = real length ÷ n."),
        measurementAnswer("measure-scale-m5", "A map uses scale 1:50,000. Two landmarks are 3 cm apart. What is the real distance in km?", "", "1.5 km", ["1.5", "1.5km"]),
        measurementAnswer("measure-scale-m6", "A model uses scale 1:25. A real object is 75 cm long. What is the model length in cm?", "", "3 cm", ["3", "3cm"]),
        financeChoice("measure-scale-m7", "Why do areas scale by n² in a scale drawing?", "B", [
          "Because n is always a large number",
          "Because area has two length dimensions and each scales by n",
          "Because area is measured in square centimetres",
          "Because the drawing paper stretches",
        ], "Area = length × width. Both dimensions scale by n, so area scales by n × n = n²."),
        measurementAnswer("measure-scale-m8", "Scale 1:100. A room on the plan is 4 cm × 3 cm. What is the real area in m²?", "", "12 m^2", ["12", "12m^2", "12 m2", "12 m²"]),
        measurementAnswer("measure-scale-m9", "Scale 1:200. A line on the drawing is 5.5 cm. What is the real length in m?", "", "11 m", ["11", "11m"]),
        financeChoice("measure-scale-m10", "A lounge room has real area 24 m². The plan uses scale 1:100. What is the area on the plan?", "A", [
          "24 cm²",
          "240 cm²",
          "2400 cm²",
          "2.4 cm²",
        ], "24 m² = 240,000 cm². Divide by 100² = 10,000. Plan area = 240,000 ÷ 10,000 = 24 cm²."),
      ],
    };
  }

  if (lesson.slug === "applications-measurement-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed measurement questions involving units, accuracy, error, area, volume, capacity, energy, mass and electricity use.",
    learningIntention:
      "Apply measurement skills to mixed practical exam-style contexts.",
    successCriteria: [
      "Choose appropriate units and conversions.",
      "Use limits of accuracy and percentage error.",
      "Calculate area, surface area, volume and capacity in context.",
      "Interpret mass, energy labels and electricity usage.",
    ],
    teaching: {
      paragraphs: [
        "Measurement exam questions combine unit choice, conversion, accuracy and practical calculation, so first decide what quantity is being measured — length, area, volume, capacity, mass or energy — because that choice fixes both the formula and the units.",
        "Start by identifying what is being measured: length, area, volume, capacity, mass, energy or electricity use.",
        "Use the context to decide the method. Flooring needs area, tanks need volume or capacity, and energy bills use kWh.",
        "Check reasonableness at the end. A unit or conversion error can make an answer much too large or too small.",
      ],
      latexBlocks: [
        "\\text{percentage error}=\\frac{\\text{absolute error}}{\\text{actual value}}\\times 100\\%",
        "1\\text{ m}^3=1000\\text{ L}",
        "\\text{electricity cost}=\\text{kWh}\\times\\text{cost per kWh}",
      ],
    },
    guidedPractice: [
      measurementAnswer("measure-exam-g1", "A hallway is 2.8 m long. Skirting is ordered in centimetres. Convert the length to centimetres.", "\\text{length}=2.8\\text{ m}", "280 cm", ["280", "280cm"]),
      measurementAnswer("measure-exam-g2", "A reported length is 12.0 cm to the nearest millimetre. What is the lower limit of accuracy?", "\\text{reported length}=12.0\\text{ cm},\\quad \\text{nearest mm}", "11.95 cm", ["11.95", "11.95cm"]),
      measurementAnswer("measure-exam-g3", "A water tub is 0.45 m^3. Convert this capacity to litres.", "V=0.45\\text{ m}^3", "450 L", ["450", "450L", "450 l", "450 litres"]),
      financeChoice("measure-exam-g4", "Which method is needed to estimate carpet for a bedroom?", "A", ["Calculate floor area", "Calculate tank volume", "Calculate percentage error only", "Use kilojoules"], "Carpet covers floor area."),
    ],
    independentPractice: [
      measurementAnswer("measure-exam-i1", "A reported mass is 4.6 kg and the actual mass is 4.5 kg. What is the absolute error?", "\\text{reported mass}=4.6\\text{ kg},\\quad \\text{actual mass}=4.5\\text{ kg}", "0.1 kg", ["0.1", "0.1kg", "100 g", "100g"]),
      measurementAnswer("measure-exam-i2", "A patio is 3.5 m by 2.4 m. What is its area?", "l=3.5\\text{ m},\\quad w=2.4\\text{ m}", "8.4 m^2", ["8.4", "8.40", "8.4m^2", "8.4 m2"]),
      measurementAnswer("measure-exam-i3", "A food label says 480 kJ per serve. A student eats 2 serves. What energy is consumed?", "\\text{energy per serve}=480\\text{ kJ},\\quad \\text{serves}=2", "960 kJ", ["960", "960kJ", "960 kJ"]),
      measurementAnswer("measure-exam-i4", "A fan uses 0.6 kWh at 35 cents per kWh. What is the cost in cents?", "\\text{usage}=0.6\\text{ kWh},\\quad \\text{rate}=35\\text{ c/kWh}", "21 cents", ["21", "21c", "21 cents"]),
      financeChoice("measure-exam-i5", "Which result is most reasonable for the capacity of a household bucket?", "B", ["12 square metres", "12 litres", "12 tonnes", "12 kilojoules"], "Buckets are commonly measured in litres."),
    ],
    commonMistakes: [
      { mistake: "Calculating perimeter of a floor for a carpet question, or volume instead of area for a painting question.", fix: "Identify the measurement type first: carpets need area, tanks need volume, paint covers surface area." },
      { mistake: "For a measurement of 25 cm rounded to the nearest centimetre, writing limits of 24 and 26.", fix: "Use half the rounding unit on each side: 25 ± 0.5 cm gives limits of 24.5 and 25.5." },
      { mistake: "Confusing area and volume.", fix: "Area is a flat measure in m² or cm²; volume fills three-dimensional space in m³ or cm³." },
      { mistake: "Writing the number without a unit in a practical measurement answer.", fix: "Include the unit every time: 280 cm, 8.4 m², 960 kJ, or 21 cents as appropriate." },
    ],
    masteryQuiz: [
      measurementAnswer("measure-exam-m1", "A garden edge is 6.4 m long. Convert this to centimetres for an order form.", "\\text{length}=6.4\\text{ m}", "640 cm", ["640", "640cm"]),
      measurementAnswer("measure-exam-m2", "A reported length is 25 cm to the nearest centimetre. What is the upper limit of accuracy?", "\\text{reported}=25\\text{ cm},\\quad \\text{rounded to nearest cm}", "25.5 cm", ["25.5", "25.5cm"]),
      measurementAnswer("measure-exam-m3", "A measured mass is 10.5 kg and the actual mass is 10 kg. What is the percentage error?", "\\text{measured}=10.5\\text{ kg},\\quad \\text{actual}=10\\text{ kg}", "5%", ["5", "5 percent", "5percent"]),
      measurementAnswer("measure-exam-m4", "A kitchen floor is 4 m by 3 m. What area of flooring is needed?", "l=4\\text{ m},\\quad w=3\\text{ m}", "12 m^2", ["12", "12m^2", "12 m2"]),
      measurementAnswer("measure-exam-m5", "A tank volume is 0.75 m^3. Convert this to litres.", "V=0.75\\text{ m}^3", "750 L", ["750", "750L", "750 l", "750 litres"]),
      measurementAnswer("measure-exam-m6", "A recipe uses 1.2 kg of sugar. Convert this to grams.", "\\text{mass}=1.2\\text{ kg}", "1200 g", ["1200", "1,200", "1200g"]),
      measurementAnswer("measure-exam-m7", "A snack has 390 kJ per serve. Find the energy for 3 serves.", "\\text{energy per serve}=390\\text{ kJ},\\quad \\text{serves}=3", "1170 kJ", ["1170", "1,170", "1170kJ", "1170 kJ"]),
      measurementAnswer("measure-exam-m8", "A heater uses 2.2 kWh at 30 cents per kWh. What is the cost in cents?", "\\text{usage}=2.2\\text{ kWh},\\quad \\text{rate}=30\\text{ c/kWh}", "66 cents", ["66", "66c", "66 cents"]),
      financeChoice("measure-exam-m9", "A paint question asking how much wall is covered needs:", "C", ["Mass", "Capacity", "Area", "Kilowatt-hours"], "Paint coverage uses area."),
      financeChoice("measure-exam-m10", "A result should be checked for reasonableness because:", "A", ["Wrong conversions can make answers too large or too small", "Units never matter", "All rounded values are exact", "Area and volume are identical"], "Reasonableness catches unit and method errors."),
    ],
    };
  }

  if (lesson.slug === "trapezoidal-rule-land-area") {
    return {
      ...base,
      description:
        "Apply the Trapezoidal Rule to estimate the area of an irregular shape using a series of equally spaced parallel offsets, with practical applications to land measurement and surveying.",
      learningIntention:
        "Use the Trapezoidal Rule to estimate areas bounded by irregular curves or uneven boundaries, as used in land surveying.",
      successCriteria: [
        "State the Trapezoidal Rule formula and identify each term: h (interval width), d_f and d_l (first and last offsets), and remaining offsets.",
        "Apply the single-strip Trapezoidal Rule to find the area between two parallel boundaries.",
        "Apply the multi-strip Trapezoidal Rule with equally spaced offsets to estimate an irregular area.",
        "Interpret the formula result in context, including appropriate units (m², ha).",
      ],
      teaching: {
        paragraphs: [
          "When a boundary is irregular (not a straight line or simple curve), standard area formulas cannot be applied directly. Surveyors use offsets — perpendicular measurements from a straight baseline to the irregular boundary — to approximate the area. The Trapezoidal Rule treats each strip between two adjacent offsets as a trapezium.",
          "For a single strip (two offsets), the area of a trapezium is: A = ½ × (d_f + d_l) × h, where d_f is the first offset, d_l is the last offset, and h is the horizontal distance between them.",
          "For multiple equally spaced strips, the Trapezoidal Rule combines all strips: $A ≈ h/2 × (d_f + d_l + 2(d_2 + d_3 + \\dots + d_{n-1}))$. Here $h$ is the common interval between offsets, $d_f$ is the first offset, $d_l$ is the last offset, and all offsets in between are added together and doubled.",
          "Units: if offsets and intervals are in metres, the area is in m². Convert to hectares where necessary: 1 hectare = 10,000 m². Always state the unit with the final answer.",
        ],
        latexBlocks: [
          "\\text{Single strip: }A = \\tfrac{1}{2}(d_f + d_l) \\times h",
          "\\text{Multi-strip: }A \\approx \\frac{h}{2}\\bigl(d_f + d_l + 2(d_2 + d_3 + \\cdots + d_{n-1})\\bigr)",
          "1\\text{ hectare} = 10\\,000\\text{ m}^2",
        ],
      },
      workedExamples: ([
        {
          title: "Single-strip Trapezoidal Rule",
          questionLatex:
            "\\text{Two offsets are 12 m and 18 m. The interval is 20 m. Find the area of the strip.}",
          steps: [
            {
              explanation: "Use the single-strip formula.",
              latex: "A = \\tfrac{1}{2}(d_f + d_l) \\times h = \\tfrac{1}{2}(12 + 18) \\times 20",
            },
            {
              explanation: "Calculate.",
              latex: "A = \\tfrac{1}{2} \\times 30 \\times 20 = 300 \\text{ m}^2",
            },
          ],
          finalAnswerLatex: "300 \\text{ m}^2",
        },
        {
          title: "Multi-strip Trapezoidal Rule (3 intervals, 4 offsets)",
          questionLatex:
            "\\text{Offsets: 0, 8, 12, 6 m at equal intervals of 10 m. Estimate the area.}",
          steps: [
            {
              explanation: "Identify: d_f = 0, d_l = 6, middle offsets = 8 + 12 = 20, h = 10.",
              latex: "A \\approx \\frac{10}{2}(0 + 6 + 2 \\times 20)",
            },
            {
              explanation: "Simplify inside the brackets.",
              latex: "A \\approx 5 \\times (6 + 40) = 5 \\times 46",
            },
            {
              explanation: "Calculate.",
              latex: "A \\approx 230 \\text{ m}^2",
            },
          ],
          finalAnswerLatex: "230 \\text{ m}^2",
        },
        {
          title: "Multi-strip with unit conversion to hectares",
          questionLatex:
            "\\text{Offsets: 0, 20, 30, 25, 0 m at 40 m intervals. Find the area in hectares.}",
          steps: [
            {
              explanation: "Apply the multi-strip formula: d_f = 0, d_l = 0, middle = 20+30+25 = 75, h = 40.",
              latex: "A \\approx \\frac{40}{2}(0 + 0 + 2 \\times 75) = 20 \\times 150",
            },
            {
              explanation: "Area in m².",
              latex: "A = 3\\,000 \\text{ m}^2",
            },
            {
              explanation: "Convert to hectares.",
              latex: "3\\,000 \\div 10\\,000 = 0.3 \\text{ ha}",
            },
          ],
          finalAnswerLatex: "0.3 \\text{ ha}",
        },
      ] as WorkedExample[]).map(addTrapezoidalLandWorkedVisual),
      guidedPractice: [
        measurementAnswer(
          "y11s-tra-g1",
          "Two offsets are 6 m and 10 m. The interval is 15 m. Use the single-strip formula to find the area.",
          "",
          "120 m²",
          ["120", "120m2", "120 m2"]
        ),
        measurementAnswer(
          "y11s-tra-g2",
          "Offsets: 0, 14, 0 m at 8 m intervals. Estimate the area using the Trapezoidal Rule.",
          "",
          "112 m²",
          ["112", "112m2", "112 m2"]
        ),
        financeChoice(
          "y11s-tra-g3",
          "In the multi-strip Trapezoidal Rule, the first and last offsets are:",
          "A",
          ["Added once", "Doubled", "Ignored", "Averaged with middle offsets"],
          "The formula adds d_f and d_l once; only the middle offsets are doubled."
        ),
        measurementAnswer(
          "y11s-tra-g4",
          "An area of 45,000 m² is how many hectares?",
          "",
          "4.5 ha",
          ["4.5", "4.5 hectares"]
        ),
      ].map(addTrapezoidalLandQuestionVisual),
      independentPractice: [
        measurementAnswer(
          "y11s-tra-i1",
          "Offsets: 5 m and 9 m at a 20 m interval. Find the area of the single strip.",
          "",
          "140 m²",
          ["140", "140m2"]
        ),
        measurementAnswer(
          "y11s-tra-i2",
          "Offsets: 0, 10, 16, 10, 0 m at 12 m intervals (4 strips). Estimate the area.",
          "",
          "432 m²",
          ["432", "432m2"]
        ),
        measurementAnswer(
          "y11s-tra-i3",
          "Offsets: 8, 12, 10 m at 15 m intervals (2 strips). Estimate the area.",
          "",
          "315 m²",
          ["315", "315m2"]
        ),
        financeChoice(
          "y11s-tra-i4",
          "The Trapezoidal Rule gives an estimate (not exact) because it:",
          "C",
          ["Uses the wrong formula", "Ignores all middle offsets", "Approximates a curved boundary with straight edges", "Only works for triangles"],
          "Replacing a curved boundary with straight (trapezium) edges introduces a small error."
        ),
        measurementAnswer(
          "y11s-tra-i5",
          "An irregular block has area 28,000 m². Convert to hectares.",
          "",
          "2.8 ha",
          ["2.8", "2.8 hectares"]
        ),
      ].map(addTrapezoidalLandQuestionVisual),
      commonMistakes: [
        {
          mistake: "Doubling the first and last offsets in the multi-strip formula.",
          fix: "Only the middle offsets (between the first and last) are doubled. The first offset d_f and last offset d_l are added once: A ≈ h/2 × (d_f + d_l + 2 × middle offsets).",
        },
        {
          mistake: "Using h as the number of strips rather than the interval width between offsets.",
          fix: "h is the horizontal distance between consecutive offsets (e.g. every 10 m), not the number of strips or the total distance.",
        },
        {
          mistake: "Forgetting to include the first or last offset in the sum.",
          fix: "All offsets contribute to the formula. Write them out in order and check that d_f and d_l are included exactly once.",
        },
        {
          mistake: "Leaving the answer in m² when the question asks for hectares.",
          fix: "Convert: divide by 10,000 to go from m² to ha. Always check the unit required in the question.",
        },
      ],
      masteryQuiz: [
        measurementAnswer("y11s-tra-m1", "Offsets 4 m and 16 m at 10 m interval. Single-strip area?", "", "100 m²", ["100", "100m2"]),
        measurementAnswer("y11s-tra-m2", "Offsets: 0, 18, 0 m at 6 m intervals. Estimate the area.", "", "108 m²", ["108", "108m2"]),
        financeChoice("y11s-tra-m3", "The multi-strip Trapezoidal Rule requires:", "B", ["Only the first and last offsets", "Equally spaced offsets", "An even number of strips only", "Offsets in centimetres only"], "The formula assumes equal spacing h between offsets."),
        measurementAnswer("y11s-tra-m4", "Offsets: 2, 8, 14, 8, 2 m at 5 m intervals. Estimate the area.", "", "160 m²", ["160", "160m2"]),
        measurementAnswer("y11s-tra-m5", "Convert 7,500 m² to hectares.", "", "0.75 ha", ["0.75", "0.75 hectares"]),
        financeChoice("y11s-tra-m6", "Offsets 0, 5, 10, 5, 0 m — how many strips are there?", "C", ["2", "3", "4", "5"], "4 offsets create 3 intervals, so there are 3 strips — but with 5 offsets, there are 4 strips."),
        measurementAnswer("y11s-tra-m7", "Offsets: 0, 6, 12, 6, 0 m at 10 m intervals. Estimate the area.", "", "240 m²", ["240", "240m2"]),
        financeChoice("y11s-tra-m8", "The Trapezoidal Rule is used because:", "A", ["Standard formulas cannot handle irregular boundaries", "It always gives the exact area", "It only applies to triangles", "It requires no measurements"], "Standard formulas require regular shapes; the Trapezoidal Rule handles irregular ones."),
        measurementAnswer("y11s-tra-m9", "Offsets: 10, 20, 10 m at 30 m intervals. Estimate the area.", "", "900 m²", ["900", "900m2"]),
        financeChoice("y11s-tra-m10", "If 1 ha = 10,000 m², then 3.5 ha equals:", "B", ["3,500 m²", "35,000 m²", "350 m²", "350,000 m²"], "3.5 × 10,000 = 35,000 m²."),
      ].map(addTrapezoidalLandQuestionVisual),
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "applications-measurement-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 measurement skills: convert between metric units, calculate areas of common shapes, find volumes of prisms, and choose appropriate units — essential prior knowledge for Year 11 measurement work.",
      learningIntention:
        "Recall and apply Year 10 metric conversion, area, and volume skills so that Year 11 measurement and estimation work builds on secure foundations.",
      successCriteria: [
        "Convert between metric units of length, area, mass, and capacity using appropriate scale factors.",
        "Calculate the area of rectangles, triangles, and circles.",
        "Calculate the volume of rectangular prisms and cylinders.",
        "Choose appropriate metric units and check the reasonableness of measurement answers.",
      ],
      teaching: {
        paragraphs: [
          "Metric conversions use powers of 10. For length: 10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km. For mass: 1,000 g = 1 kg, 1,000 kg = 1 t. For capacity: 1,000 mL = 1 L, 1,000 L = 1 kL. To convert to a smaller unit, multiply; to a larger unit, divide.",
          "Common area formulas: Rectangle: A = lw. Triangle: A = ½bh (b = base, h = perpendicular height). Circle: A = πr². Units for area are always squared (cm², m², km²). For area conversions: 1 m² = 10,000 cm²; 1 km² = 1,000,000 m².",
          "Volume measures the space inside a 3D solid. For a prism (including rectangular prisms and cylinders): V = Area of base × height. Rectangular prism: V = lwh. Cylinder: V = πr²h. Units are cubed (cm³, m³). Capacity link: 1 cm³ = 1 mL, so 1,000 cm³ = 1 L.",
          "A reasonableness check uses context: a swimming pool holds thousands of litres (not millilitres), a bedroom door is about 2 m tall (not 2 km), and a brick weighs about 2 kg (not 2 g). Always attach the correct unit and verify the size makes sense.",
        ],
        latexBlocks: [
          "\\text{Rectangle: }A=lw\\qquad \\text{Triangle: }A=\\tfrac{1}{2}bh\\qquad \\text{Circle: }A=\\pi r^2",
          "\\text{Rect prism: }V=lwh\\qquad \\text{Cylinder: }V=\\pi r^2 h",
          "1\\text{ m}^2=10\\,000\\text{ cm}^2\\qquad 1\\text{ cm}^3=1\\text{ mL}\\qquad 1000\\text{ cm}^3=1\\text{ L}",
        ],
      },
      workedExamples: [
        {
          title: "Area of a triangle",
          questionLatex: "\\text{Find the area of a triangle with base 12 cm and height 7 cm.}",
          steps: [
            {
              explanation: "Use A = ½bh.",
              latex: "A = \\tfrac{1}{2} \\times 12 \\times 7",
            },
            {
              explanation: "Calculate.",
              latex: "A = 42 \\text{ cm}^2",
            },
          ],
          finalAnswerLatex: "42 \\text{ cm}^2",
        },
        {
          title: "Volume of a cylinder",
          questionLatex: "\\text{Find the volume of a cylinder with radius 5 cm and height 10 cm. Give your answer to 1 decimal place.}",
          steps: [
            {
              explanation: "Use V = πr²h.",
              latex: "V = \\pi \\times 5^2 \\times 10 = \\pi \\times 25 \\times 10",
            },
            {
              explanation: "Calculate.",
              latex: "V \\approx 785.4 \\text{ cm}^3",
            },
          ],
          finalAnswerLatex: "785.4 \\text{ cm}^3",
        },
        {
          title: "Unit conversion (area)",
          questionLatex: "\\text{Convert 3.5 m² to cm².}",
          steps: [
            {
              explanation: "1 m² = 10,000 cm², so multiply by 10,000.",
              latex: "3.5 \\times 10\\,000 = 35\\,000 \\text{ cm}^2",
            },
          ],
          finalAnswerLatex: "35\\,000 \\text{ cm}^2",
        },
      ],
      guidedPractice: [
        measurementAnswer(
          "y11s-amr-g1",
          "Convert 4.2 km to metres.",
          "",
          "4200 m",
          ["4200", "4,200", "4200m"]
        ),
        measurementAnswer(
          "y11s-amr-g2",
          "Find the area of a rectangle with length 8 m and width 5 m.",
          "",
          "40 m²",
          ["40", "40m2"]
        ),
        measurementAnswer(
          "y11s-amr-g3",
          "Find the area of a circle with radius 6 cm. Round to 1 decimal place.",
          "",
          "113.1 cm²",
          ["113.1", "113.1cm2"]
        ),
        financeChoice(
          "y11s-amr-g4",
          "A rectangular prism is 4 m long, 3 m wide, 2 m high. Its volume is:",
          "B",
          ["9 m³", "24 m³", "18 m³", "12 m³"],
          "V = 4 × 3 × 2 = 24 m³."
        ),
      ],
      independentPractice: [
        measurementAnswer(
          "y11s-amr-i1",
          "Convert 3,500 g to kilograms.",
          "",
          "3.5 kg",
          ["3.5", "3.5kg"]
        ),
        measurementAnswer(
          "y11s-amr-i2",
          "Find the area of a triangle with base 14 cm and perpendicular height 9 cm.",
          "",
          "63 cm²",
          ["63", "63cm2"]
        ),
        measurementAnswer(
          "y11s-amr-i3",
          "Find the volume of a rectangular prism 5 m × 3 m × 2 m.",
          "",
          "30 m³",
          ["30", "30m3"]
        ),
        measurementAnswer(
          "y11s-amr-i4",
          "Convert 2.4 m² to cm².",
          "",
          "24000 cm²",
          ["24000", "24,000", "24000cm2"]
        ),
        financeChoice(
          "y11s-amr-i5",
          "A cylinder with r = 3 cm and h = 8 cm has a volume closest to:",
          "C",
          ["75 cm³", "150 cm³", "226 cm³", "452 cm³"],
          "V = π × 3² × 8 = π × 72 ≈ 226.2 cm³."
        ),
      ],
      commonMistakes: [
        {
          mistake: "For area conversions, using the length scale factor (e.g. ×100 for m→cm) instead of the area scale factor (×10,000).",
          fix: "Area conversions square the length factor: 1 m = 100 cm, so 1 m² = 100² = 10,000 cm². Multiply by 10,000, not 100.",
        },
        {
          mistake: "Using diameter instead of radius in area or volume formulas.",
          fix: "The formulas A = πr² and V = πr²h use radius (half the diameter). If given diameter, halve it before substituting.",
        },
        {
          mistake: "Using base × height for triangle area without the ½ factor.",
          fix: "A triangle is half a rectangle with the same base and height: A = ½ × base × height. Always include the ½.",
        },
        {
          mistake: "Forgetting to cube the unit when stating volume (e.g. writing cm instead of cm³).",
          fix: "Volume is a three-dimensional measure, so its unit is always cubed: cm³, m³, etc. Area uses squared units (cm², m²).",
        },
      ],
      masteryQuiz: [
        measurementAnswer("y11s-amr-m1", "Convert 8.5 km to metres.", "", "8500 m", ["8500", "8,500"]),
        measurementAnswer("y11s-amr-m2", "Find the area of a rectangle 9 m by 6 m.", "", "54 m²", ["54", "54m2"]),
        measurementAnswer("y11s-amr-m3", "Find the area of a triangle with base 10 cm and height 8 cm.", "", "40 cm²", ["40", "40cm2"]),
        measurementAnswer("y11s-amr-m4", "Find the area of a circle with radius 4 m. Round to 1 decimal place.", "", "50.3 m²", ["50.3", "50.3m2"]),
        measurementAnswer("y11s-amr-m5", "Find the volume of a rectangular prism 6 cm × 4 cm × 3 cm.", "", "72 cm³", ["72", "72cm3"]),
        financeChoice("y11s-amr-m6", "1 m² equals:", "C", ["100 cm²", "1,000 cm²", "10,000 cm²", "1,000,000 cm²"], "1 m = 100 cm, so 1 m² = 100² = 10,000 cm²."),
        measurementAnswer("y11s-amr-m7", "Convert 5,200 mL to litres.", "", "5.2 L", ["5.2", "5.2L"]),
        measurementAnswer("y11s-amr-m8", "A cylinder has r = 2 m and h = 5 m. Find its volume to 1 decimal place.", "", "62.8 m³", ["62.8", "62.8m3"]),
        financeChoice("y11s-amr-m9", "The appropriate unit for the volume of a swimming pool is:", "B", ["cm²", "kL or m³", "km²", "g"], "Swimming pools hold thousands of litres, best expressed in kL or m³."),
        financeChoice("y11s-amr-m10", "1 cm³ is equal to:", "A", ["1 mL", "1 L", "10 mL", "100 mL"], "1 cm³ = 1 mL is the link between volume and capacity."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

