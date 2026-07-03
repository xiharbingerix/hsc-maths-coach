import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import {
  financeChoice,
  measurementAnswer as baseMeasurementAnswer,
  timeAnswer as baseTimeAnswer,
} from "../questionHelpers";

function timeLocationFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (context.includes("24-hour") || context.includes("24 hour")) {
    return `The question wants 24-hour time, so the key idea is whether the time is before or after midday. For pm times, add 12 to the hour unless it is already 12 pm, then write the result as ${answer}.`;
  }

  if (context.includes("wait") || context.includes("waiting")) {
    return `Waiting time starts when the person arrives and ends at the next suitable departure, not at the final destination. Choose the first departure after the arrival time, then count the gap to get ${answer}.`;
  }

  if (
    context.includes("travel time") ||
    context.includes("trip duration") ||
    context.includes("how long") ||
    context.includes("duration")
  ) {
    if (
      context.includes("midnight") ||
      context.includes("next day") ||
      context.includes("23:") ||
      context.includes("00:")
    ) {
      return `When the trip crosses midnight, count to midnight first and then add the time after midnight. That keeps the elapsed time positive and gives ${answer}.`;
    }

    return `Elapsed time is the difference between the start and finish times. Count forward in hours and minutes, rather than treating minutes like decimals, to get ${answer}.`;
  }

  if (context.includes("utc") || context.includes("time zone") || context.includes("offset")) {
    if (context.includes("date") || context.includes("international date line")) {
      return `Time-zone questions can change the date as well as the clock time. Apply the offset first, then check whether the new time has crossed midnight to get ${answer}.`;
    }

    return `A time-zone offset tells you how far a place is ahead of or behind the reference time. Compare the offsets, then add or subtract the difference carefully to get ${answer}.`;
  }

  if (
    context.includes("international date line") ||
    context.includes("next day") ||
    context.includes("monday") ||
    context.includes("tuesday")
  ) {
    return `The day label matters whenever a time change crosses midnight or the International Date Line. Track the clock adjustment and the date change together to get ${answer}.`;
  }

  if (context.includes("scale")) {
    if (context.includes("map distance") || context.includes("real distance")) {
      return `A map scale is a conversion rule between the drawing and the real world. Decide which direction you are converting, then multiply or divide by the scale factor to get ${answer}.`;
    }

    return `Use the scale as the link between the measured distance and the actual distance. Keep the units attached so the final value is ${answer}.`;
  }

  if (context.includes("grid") || context.includes("row") || context.includes("column")) {
    return `For a grid reference, the order matters: locate the row and column exactly as the question describes. Reading one place across or down gives the wrong cell, so the correct location is ${answer}.`;
  }

  if (
    context.includes("coordinate") ||
    context.includes("north") ||
    context.includes("south") ||
    context.includes("east") ||
    context.includes("west")
  ) {
    return `Location questions are about direction and distance, not just arithmetic. Track east/west changes separately from north/south changes to arrive at ${answer}.`;
  }

  if (context.includes("back bearing") || (context.includes("bearing") && (context.includes("return") || context.includes("back")))) {
    return `To find the back bearing, add 180° if the bearing is 180° or less, or subtract 180° if the bearing is greater than 180°. The back bearing is ${answer}.`;
  }
  if (context.includes("bearing") || context.includes("true north") || context.includes("clockwise from north")) {
    return `True bearings are measured clockwise from north using three digits: N=000°, NE=045°, E=090°, SE=135°, S=180°, SW=225°, W=270°, NW=315°. The answer is ${answer}.`;
  }
  if (context.includes("latitude") || context.includes("longitude") || context.includes("gps") || context.includes("prime meridian") || context.includes("equator") || context.includes("hemisphere")) {
    if (context.includes("111") || (context.includes("distance") && context.includes("degree"))) {
      return `Each degree of latitude represents approximately 111 km of north-south distance. Multiply the difference in latitude by 111 to get ${answer}.`;
    }
    if (context.includes("utc") || context.includes("15°") || context.includes("15 degrees") || context.includes("offset")) {
      return `Each 15° of longitude corresponds to 1 hour of UTC offset (360° ÷ 24 h = 15°/h). Divide the longitude by 15 to get the UTC offset: ${answer}.`;
    }
    return `Latitude measures north-south position (equator = 0°, poles = 90°). Longitude measures east-west position (prime meridian = 0°, range ±180°). Read the N/S and E/W labels to determine the hemisphere: ${answer}.`;
  }
  if (context.includes("average speed") || (context.includes("speed") && context.includes("km/h"))) {
    if (context.includes("two") || context.includes("total") || context.includes("leg") || context.includes("then")) {
      return `For average speed over multiple legs, use total distance ÷ total time. Never average the speeds of individual legs. Here that gives ${answer}.`;
    }
    return `Use D = S × T and match units: if speed is in km/h, distance must be in km and time in hours. Convert minutes to decimal hours by dividing by 60. The answer is ${answer}.`;
  }
  if (context.includes("speed") || context.includes("distance")) {
    return `Speed, distance and time questions use matching units. Choose the quantity being asked for, then use the relationship between distance, speed and time to get ${answer}.`;
  }

  return `First decide whether the question is asking for a clock time, an elapsed time, a time-zone conversion, or a location result. Using the right interpretation leads to ${answer}.`;
}

function timeAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseTimeAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: timeLocationFeedback(prompt, latex, answer),
  };
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
    explanation: timeLocationFeedback(prompt, latex, answer),
  };
}
function timeLocationWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "time-calculations-timetables") {
    return [
      {
        title: "Trip duration from a timetable",
        questionLatex: "\\text{A train leaves at 08:42 and arrives at 10:17.}",
        steps: [
          { explanation: "Count from 08:42 to 09:42 as 1 hour." },
          { explanation: "Count from 09:42 to 10:17 as 35 minutes.", latex: "1\\text{ h }35\\text{ min}" },
        ],
        finalAnswerLatex: "1\\text{ h }35\\text{ min}",
      },
      {
        title: "Waiting for the next bus",
        questionLatex:
          "\\begin{array}{c|c}\\text{Service A}&07{:}15\\\\\\text{Service B}&07{:}45\\\\\\text{Service C}&08{:}20\\end{array}\\quad\\text{Maya arrives at }07{:}32.",
        steps: [
          { explanation: "The next departure after 07:32 is 07:45." },
          { explanation: "Find the waiting time.", latex: "07{:}45-07{:}32=13\\text{ min}" },
        ],
        finalAnswerLatex: "13\\text{ min}",
      },
      {
        title: "Converting time formats",
        questionLatex: "\\text{A rehearsal starts at }6{:}30\\text{ pm. Write this in 24-hour time.}",
        steps: [
          { explanation: "For pm times after midday, add 12 to the hour unless it is 12 pm." },
          { explanation: "6:30 pm becomes 18:30." },
        ],
        finalAnswerLatex: "18{:}30",
      },
    ];
  }

  if (slug === "time-zones-utc-international-date-line") {
    return [
      {
        title: "Sydney to Perth using UTC offsets",
        questionLatex: "\\text{Sydney is UTC+10 and Perth is UTC+8. Sydney time is }18{:}30.",
        steps: [
          { explanation: "Perth is 2 hours behind Sydney." },
          { explanation: "Subtract 2 hours from Sydney time.", latex: "18{:}30-2\\text{ h}=16{:}30" },
        ],
        finalAnswerLatex: "16{:}30\\text{ or }4{:}30\\text{ pm}",
      },
      {
        title: "International UTC offset",
        questionLatex: "\\text{London is UTC+0 and Singapore is UTC+8. London time is }09{:}15.",
        steps: [
          { explanation: "Singapore is 8 hours ahead of London." },
          { explanation: "Add 8 hours.", latex: "09{:}15+8\\text{ h}=17{:}15" },
        ],
        finalAnswerLatex: "17{:}15\\text{ or }5{:}15\\text{ pm}",
      },
      {
        title: "Crossing the International Date Line",
        questionLatex:
          "\\text{A flight leaves Fiji late Tuesday and crosses east over the International Date Line.}",
        steps: [
          { explanation: "Crossing east over the International Date Line usually moves the calendar date back one day." },
          { explanation: "Check both the time difference and the date change before writing the arrival date." },
        ],
        finalAnswerLatex: "\\text{The date may become Monday or earlier Tuesday depending on flight time.}",
      },
    ];
  }

  if (slug === "map-scales-grid-references-location") {
    return [
      {
        title: "Using a grid reference",
        questionLatex:
          "\\begin{array}{c|ccc} &1&2&3\\\\ A&\\text{Park}&\\text{Pool}&\\text{Oval}\\\\ B&\\text{Shop}&\\text{Library}&\\text{School}\\\\ C&\\text{Station}&\\text{Clinic}&\\text{Cafe}\\end{array}",
        steps: [
          { explanation: "Read the row letter first, then the column number.", latex: "B2" },
          { explanation: "The entry at row B and column 2 is the Library." },
        ],
        finalAnswerLatex: "\\text{Library is at }B2",
      },
      {
        title: "Map scale distance",
        questionLatex:
          "\\text{Scale }1\\text{ cm}:2\\text{ km. The map distance is }4.5\\text{ cm.}",
        steps: [
          { explanation: "Each centimetre represents 2 kilometres.", latex: "1\\text{ cm}=2\\text{ km}" },
          { explanation: "Multiply the map distance by the scale distance.", latex: "4.5\\times2=9" },
        ],
        finalAnswerLatex: "9\\text{ km}",
      },
      {
        title: "Compass direction from coordinates",
        questionLatex:
          "\\text{Town A is at }(2,3)\\text{ and Town B is at }(2,7).",
        steps: [
          { explanation: "The x-coordinate stays the same, so the movement is vertical." },
          { explanation: "The y-coordinate increases from 3 to 7, so B is north of A." },
        ],
        finalAnswerLatex: "\\text{B is north of A.}",
      },
    ];
  }

  if (slug === "compass-bearings-navigation") {
    return [
      {
        title: "True bearing of NE",
        questionLatex: "\\text{What is the true bearing of north-east (NE)?}",
        steps: [
          { explanation: "True bearings are measured clockwise from north using three digits." },
          { explanation: "North-east is exactly halfway between north (000°) and east (090°).", latex: "\\frac{000^\\circ+090^\\circ}{2}=045^\\circ" },
        ],
        finalAnswerLatex: "045^\\circ",
      },
      {
        title: "Back bearing of 060°",
        questionLatex: "\\text{A ship sails on bearing }060^\\circ.\\text{ Find the back bearing.}",
        steps: [
          { explanation: "The bearing is 060° which is ≤ 180°, so add 180°.", latex: "060^\\circ+180^\\circ=240^\\circ" },
        ],
        finalAnswerLatex: "240^\\circ",
      },
      {
        title: "Back bearing of 300°",
        questionLatex: "\\text{A vessel sails on bearing }300^\\circ.\\text{ Find the back bearing.}",
        steps: [
          { explanation: "The bearing is 300° which is > 180°, so subtract 180°.", latex: "300^\\circ-180^\\circ=120^\\circ" },
        ],
        finalAnswerLatex: "120^\\circ",
      },
    ];
  }

  if (slug === "speed-distance-time") {
    return [
      {
        title: "Finding distance",
        questionLatex: "\\text{A car travels at }80\\text{ km/h for }3\\text{ hours. Find the distance.}",
        steps: [
          { explanation: "Write the formula.", latex: "D=S\\times T" },
          { explanation: "Substitute values.", latex: "D=80\\times 3=240\\text{ km}" },
        ],
        finalAnswerLatex: "240\\text{ km}",
      },
      {
        title: "Finding time",
        questionLatex: "\\text{A car travels }300\\text{ km at }60\\text{ km/h. Find the time.}",
        steps: [
          { explanation: "Rearrange for time.", latex: "T=\\frac{D}{S}" },
          { explanation: "Substitute values.", latex: "T=\\frac{300}{60}=5\\text{ h}" },
        ],
        finalAnswerLatex: "5\\text{ h}",
      },
      {
        title: "Average speed over multiple legs",
        questionLatex: "\\text{A driver travels }120\\text{ km in }2\\text{ h then }60\\text{ km in }1\\text{ h.}",
        steps: [
          { explanation: "Find total distance and total time.", latex: "\\text{total D}=120+60=180\\text{ km},\\quad \\text{total T}=2+1=3\\text{ h}" },
          { explanation: "Average speed = total D ÷ total T.", latex: "S=\\frac{180}{3}=60\\text{ km/h}" },
        ],
        finalAnswerLatex: "60\\text{ km/h}",
      },
    ];
  }

  if (slug === "latitude-longitude-global-location") {
    return [
      {
        title: "Reading GPS coordinates",
        questionLatex: "\\text{A city has GPS coordinates }(33.9^\\circ\\text{S},\\;151.2^\\circ\\text{E}).\\text{ Identify the hemispheres.}",
        steps: [
          { explanation: "The latitude is 33.9°S — the S label means southern hemisphere." },
          { explanation: "The longitude is 151.2°E — the E label means eastern hemisphere." },
        ],
        finalAnswerLatex: "\\text{Southern hemisphere, Eastern hemisphere}",
      },
      {
        title: "North-south distance from latitude change",
        questionLatex: "\\text{Two cities are }4^\\circ\\text{ of latitude apart. Estimate the distance. Use }1^\\circ\\approx 111\\text{ km.}",
        steps: [
          { explanation: "Each degree of latitude ≈ 111 km.", latex: "1^\\circ\\approx 111\\text{ km}" },
          { explanation: "Multiply by the degree difference.", latex: "4\\times 111=444\\text{ km}" },
        ],
        finalAnswerLatex: "444\\text{ km}",
      },
      {
        title: "Longitude to UTC offset",
        questionLatex: "\\text{A location is at longitude }150^\\circ\\text{E. Find the UTC offset. (Use }15^\\circ=1\\text{ hour.)}",
        steps: [
          { explanation: "360° ÷ 24 h = 15° per hour.", latex: "\\text{UTC offset}=\\frac{150}{15}=10" },
          { explanation: "East longitudes are positive offsets.", latex: "\\text{UTC+10}" },
        ],
        finalAnswerLatex: "\\text{UTC+10}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed timetable question`,
      questionLatex:
        "\\begin{array}{c|c|c}\\text{Service}&\\text{Departure}&\\text{Arrival}\\\\\\text{A}&07{:}15&08{:}05\\\\\\text{B}&07{:}45&08{:}32\\\\\\text{C}&08{:}20&09{:}12\\end{array}",
      steps: [
        { explanation: "Read departure and arrival times from the same service row." },
        { explanation: "Subtract departure time from arrival time to find travel time." },
      ],
      finalAnswerLatex: "\\text{Use the selected service row.}",
    },
    {
      title: `${title}: mixed time zone question`,
      questionLatex: "\\text{A city at UTC+12 is compared with a city at UTC-8.}",
      steps: [
        { explanation: "Find the difference between the UTC offsets.", latex: "12-(-8)=20\\text{ h}" },
        { explanation: "Large differences may create a date change." },
      ],
      finalAnswerLatex: "\\text{20 hours apart, with possible date change.}",
    },
  ];
}



export function year11StandardTimeLocationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "working-with-time") {
    return null;
  }

  const base = {
    workedExamples: timeLocationWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "time-calculations-timetables") {
    return {
      ...base,
      description:
        "Read timetables, convert time formats, and calculate elapsed, waiting and travel times.",
      learningIntention:
        "Use 12-hour and 24-hour time, elapsed time and timetables in practical travel contexts.",
      successCriteria: [
        "Convert between 12-hour and 24-hour time in context.",
        "Calculate elapsed time between departure and arrival.",
        "Read a timetable to find a waiting time.",
        "Handle simple time calculations that cross midnight.",
      ],
      teaching: {
        paragraphs: [
          "Timetables organise departure and arrival times. Read along the same row or service before calculating.",
          "Elapsed time is the amount of time between two times. It is often easier to count to the next hour, then to the finish time.",
          "Waiting time is the time from when a person arrives at the station or stop until the next suitable service departs.",
          "For 24-hour time, pm times are usually written by adding 12 to the hour. Midnight crossings need careful date awareness.",
        ],
        latexBlocks: [
          "6{:}30\\text{ pm}=18{:}30",
          "\\text{elapsed time}=\\text{finish time}-\\text{start time}",
        ],
      },
      guidedPractice: [
        timeAnswer("time-table-g1", "A train leaves at 08:42 and arrives at 10:17. How long is the trip?", "", "1 h 35 min", ["1 hour 35 minutes", "1 hour and 35 minutes", "1h 35min", "1h35", "1h35min", "1 hr 35 min", "1:35", "95 min", "95 minutes"]),
        timeAnswer("time-table-g2", "A bus timetable shows departures at 7:15, 7:45 and 8:20. If Maya arrives at 7:32, how long does she wait for the next bus?", "", "13 min", ["13 minutes", "13min"]),
        timeAnswer("time-table-g3", "A school rehearsal starts at 6:30 pm. Write your answer in 24-hour time, for example 18:30.", "6{:}30\\text{ pm}", "18:30", ["1830", "18.30"]),
        financeChoice("time-table-g4", "A ferry leaves at 23:40 and arrives at 00:25. What must be remembered?", "C", ["The trip is impossible", "The arrival is earlier on the same day", "The trip crosses midnight", "The time zone must always change"], "The arrival time is after midnight on the next day."),
      ],
      independentPractice: [
        timeAnswer("time-table-i1", "A bus leaves at 07:55 and arrives at 08:38. What is the travel time?", "", "43 min", ["43 minutes", "43min"]),
        timeAnswer("time-table-i2", "A student arrives at the station at 15:18. The next trains leave at 15:05, 15:32 and 15:50. What is the waiting time?", "", "14 min", ["14 minutes", "14min"]),
        timeAnswer("time-table-i3", "A part-time shift starts at 9:15 am. Write your answer in 24-hour time, for example 18:30.", "9{:}15\\text{ am}", "09:15", ["0915", "09.15"]),
        timeAnswer("time-table-i4", "A flight departs at 22:50 and lands at 01:20 the next day. How long is the flight?", "", "2 h 30 min", ["2 hours 30 minutes", "2 hours and 30 minutes", "2h 30min", "2h30", "2h30min", "2 hr 30 min", "2:30", "150 min", "150 minutes"]),
        financeChoice("time-table-i5", "When using a timetable, the safest first step is to:", "A", ["Use times from the same service row", "Use the latest arrival only", "Ignore am and pm", "Subtract the smaller number from the larger number"], "Timetable calculations must use the correct row."),
      ],
      commonMistakes: [
        { mistake: "Subtracting 08:42 from 10:17 as a decimal, getting 1.75 and reading it as 1 hour 75 minutes.", fix: "Work in hours and minutes: count 1 hour from 08:42 to 09:42, then 35 more minutes to 10:17." },
        { mistake: "Writing 6:30 pm as 6:30 in 24-hour time.", fix: "For pm times after noon, add 12 to the hour: 6:30 pm is 18:30." },
        { mistake: "Reading one service's departure and a different service's arrival to calculate travel time.", fix: "Always use the departure and arrival times from the same timetable row." },
        { mistake: "Calculating a trip from 23:15 to 00:05 and getting a negative or nonsense result.", fix: "Count from 23:15 to midnight (45 min), then add the remaining 5 minutes: total 50 min." },
      ],
      masteryQuiz: [
        timeAnswer("time-table-m1", "A train leaves Central at 09:28 and reaches Parramatta at 10:06. What is the travel time?", "\\text{depart}=09{:}28,\\quad \\text{arrive}=10{:}06", "38 min", ["38 minutes", "38min"]),
        timeAnswer("time-table-m2", "A ferry leaves at 11:45 am. Write your answer in 24-hour time, for example 18:30.", "11{:}45\\text{ am}", "11:45", ["1145", "11.45"]),
        timeAnswer("time-table-m3", "A cinema session starts at 7:05 pm. Write your answer in 24-hour time, for example 18:30.", "7{:}05\\text{ pm}", "19:05", ["1905", "19.05"]),
        timeAnswer("time-table-m4", "A bus leaves at 16:40 and arrives at 17:25. How long is the trip?", "\\text{depart}=16{:}40,\\quad \\text{arrive}=17{:}25", "45 min", ["45 minutes", "45min"]),
        financeChoice("time-table-m5", "A school bell time of 14:50 is:", "B", ["2:50 am", "2:50 pm", "4:50 pm", "12:50 pm"], "14:50 is 2:50 pm."),
        timeAnswer("time-table-m6", "A student arrives at 08:03. Buses depart at 07:58, 08:12 and 08:27. How long is the wait for the next bus?", "", "9 min", ["9 minutes", "9min"]),
        timeAnswer("time-table-m7", "A coach leaves at 23:15 and arrives at 00:05 the next day. What is the travel time?", "\\text{depart}=23{:}15,\\quad \\text{arrive}=00{:}05", "50 min", ["50 minutes", "50min"]),
        financeChoice("time-table-m8", "A trip from 10:20 to 12:05 is best counted as:", "D", ["205 minutes", "1 hour only", "20 minutes", "1 hour 45 minutes"], "10:20 to 11:20 is 1 hour, then 45 minutes."),
        timeAnswer("time-table-m9", "A work shift runs from 13:30 to 17:00. How long is the shift?", "\\text{start}=13{:}30,\\quad \\text{end}=17{:}00", "3 h 30 min", ["3 hours 30 minutes", "3 hours and 30 minutes", "3h 30min", "3h30", "3h30min", "3 hr 30 min", "3:30", "210 min", "210 minutes"]),
        financeChoice("time-table-m10", "If a timetable has departures at 06:30, 07:00 and 07:20, and a student arrives at 06:45, the next service is:", "C", ["06:30", "06:45", "07:00", "07:20"], "The next departure after 06:45 is 07:00."),
      ],
    };
  }

  if (lesson.slug === "time-zones-utc-international-date-line") {
    return {
      ...base,
      description:
        "Use UTC offsets, Australian and international time zones, daylight saving and date changes.",
      learningIntention:
        "Convert between local times using UTC offsets and recognise when dates may change.",
      successCriteria: [
        "Compare local times using UTC offsets.",
        "Convert between Australian time zones in practical contexts.",
        "Account for daylight saving when the question includes it.",
        "Recognise date changes when crossing midnight or the International Date Line.",
      ],
      teaching: {
        paragraphs: [
          "UTC offsets describe how far a location is ahead of or behind Coordinated Universal Time: places east of Greenwich are ahead (a positive offset), places west are behind. UTC+10 is two hours ahead of UTC+8.",
          "To convert between time zones, find the difference between the offsets, then add or subtract that difference from the starting local time.",
          "Daylight saving can change a location's offset for part of the year. Use the offset stated in the question.",
          "The International Date Line can change the calendar date. Crossing it east generally moves the date back one day; crossing it west generally moves the date forward one day.",
        ],
        latexBlocks: [
          "\\text{time difference}=\\text{destination UTC offset}-\\text{starting UTC offset}",
          "\\text{local destination time}=\\text{starting time}+\\text{time difference}",
        ],
      },
      guidedPractice: [
        timeAnswer("time-zone-g1", "Sydney is UTC+10 and Perth is UTC+8. If it is 6:30 pm in Sydney, what time is it in Perth?", "\\text{Sydney (UTC+10)}=18{:}30,\\quad \\text{Perth (UTC+8)}", "4:30 pm", ["16:30", "1630", "4.30 pm"]),
        timeAnswer("time-zone-g2", "London is UTC+0 and Singapore is UTC+8. If it is 09:15 in London, what time is it in Singapore?", "\\text{London (UTC+0)}=09{:}15,\\quad \\text{Singapore (UTC+8)}", "17:15", ["5:15 pm", "1715", "5.15 pm"]),
        financeChoice("time-zone-g3", "A city at UTC+11 compared with a city at UTC+10 is:", "A", ["1 hour ahead", "1 hour behind", "11 hours behind", "21 hours ahead"], "UTC+11 is one hour ahead of UTC+10."),
        financeChoice("time-zone-g4", "A flight crosses the International Date Line travelling east. The date will usually:", "B", ["Move forward one day", "Move back one day", "Never change", "Always become Sunday"], "Travelling east across the Date Line usually moves the date back."),
      ],
      independentPractice: [
        timeAnswer("time-zone-i1", "Brisbane is UTC+10 and Adelaide is UTC+9:30. If it is 14:00 in Brisbane, what time is it in Adelaide?", "\\text{Brisbane (UTC+10)}=14{:}00,\\quad \\text{Adelaide (UTC+9:30)}", "13:30", ["1:30 pm", "1330", "1.30 pm"]),
        timeAnswer("time-zone-i2", "Tokyo is UTC+9 and Perth is UTC+8. If it is 20:45 in Tokyo, what time is it in Perth?", "\\text{Tokyo (UTC+9)}=20{:}45,\\quad \\text{Perth (UTC+8)}", "19:45", ["7:45 pm", "1945", "7.45 pm"]),
        financeChoice("time-zone-i3", "If daylight saving changes Sydney from UTC+10 to UTC+11, Sydney becomes:", "C", ["1 hour earlier", "unchanged", "1 hour later compared with UTC", "10 hours behind UTC"], "UTC+11 is one hour further ahead than UTC+10."),
        timeAnswer("time-zone-i4", "A city at UTC-5 calls a city at UTC+1. If it is 08:00 at UTC-5, what time is it at UTC+1?", "\\text{UTC-5}=08{:}00,\\quad \\text{dest UTC+1}", "14:00", ["2:00 pm", "1400", "2.00 pm"]),
        financeChoice("time-zone-i5", "A flight leaves late at night and arrives after crossing several time zones. The most important extra check is:", "D", ["Only the plane colour", "Only the ticket price", "Only the airline name", "Whether the date changes"], "Long trips and time zones may change the date."),
      ],
      commonMistakes: [
        { mistake: "Converting from Sydney (UTC+10) to Perth (UTC+8) by adding 2 hours instead of subtracting.", fix: "Perth has a lower UTC offset, so it is behind Sydney. Subtract the difference." },
        { mistake: "Using a 1-hour difference between Darwin (UTC+9:30) and Brisbane (UTC+10).", fix: "The difference is only 30 minutes. Always check for half-hour offsets in Australian time zones." },
        { mistake: "Ignoring daylight saving when the question changes Sydney's offset to UTC+11.", fix: "Use the UTC offset given in the question, not the standard offset from memory." },
        { mistake: "Getting 25:15 when converting 23:15 UTC+10 to UTC+12 and not recognising the date change.", fix: "Any result past 24:00 means the next calendar day: 25:15 becomes 01:15 Tuesday." },
      ],
      masteryQuiz: [
        timeAnswer("time-zone-m1", "Sydney is UTC+10 and Perth is UTC+8. If it is 21:10 in Sydney, what time is it in Perth?", "\\text{Sydney (UTC+10)}=21{:}10,\\quad \\text{Perth}=\\text{UTC+8}", "19:10", ["7:10 pm", "1910", "7.10 pm"]),
        timeAnswer("time-zone-m2", "Auckland is UTC+12 and Sydney is UTC+10. If it is 08:00 in Sydney, what time is it in Auckland?", "\\text{Sydney (UTC+10)}=08{:}00,\\quad \\text{Auckland}=\\text{UTC+12}", "10:00", ["10:00 am", "1000", "10.00 am"]),
        financeChoice("time-zone-m3", "Perth at UTC+8 is compared with Sydney at UTC+10. Perth is:", "B", ["2 hours ahead", "2 hours behind", "18 hours ahead", "The same time"], "UTC+8 is two hours behind UTC+10."),
        timeAnswer("time-zone-m4", "New York is UTC-5 and London is UTC+0. If it is 13:30 in New York, what time is it in London?", "\\text{NY (UTC-5)}=13{:}30,\\quad \\text{London}=\\text{UTC+0}", "18:30", ["6:30 pm", "1830", "6.30 pm"]),
        financeChoice("time-zone-m5", "Crossing the International Date Line west usually means:", "C", ["Move back one day", "No date change ever", "Move forward one day", "Subtract 12 hours only"], "West across the Date Line usually moves the date forward."),
        timeAnswer("time-zone-m6", "Darwin is UTC+9:30 and Perth is UTC+8. If it is 12:00 in Darwin, what time is it in Perth?", "\\text{Darwin (UTC+9{:}30)}=12{:}00,\\quad \\text{Perth}=\\text{UTC+8}", "10:30", ["10:30 am", "1030", "10.30 am"]),
        financeChoice("time-zone-m7", "If a converted time changes from 23:30 to 01:30, the arrival is:", "D", ["Earlier the same morning", "Always two days earlier", "No date change", "On the next day"], "Moving past midnight changes to the next day."),
        timeAnswer("time-zone-m8", "A city at UTC+2 calls a city at UTC-4. If it is 16:00 at UTC+2, what time is it at UTC-4?", "\\text{UTC+2}=16{:}00", "10:00", ["10:00 am", "1000", "10.00 am"]),
        financeChoice("time-zone-m9", "The safest way to handle daylight saving in a question is to:", "A", ["Use the UTC offsets stated in the question", "Always ignore it", "Always subtract 24 hours", "Use Sydney time for every city"], "Use the offsets provided."),
        timeAnswer("time-zone-m10", "If it is 23:15 Monday in a UTC+10 city, what time is it in a UTC+12 city?", "\\text{UTC+10}=23{:}15\\text{ Mon},\\quad \\text{dest}=\\text{UTC+12}", "01:15 Tuesday", ["1:15 am Tuesday", "01:15 Tue", "1.15 am Tuesday"]),
      ],
    };
  }

  if (lesson.slug === "map-scales-grid-references-location") {
    return {
      ...base,
      description:
        "Use text grids, coordinates, map scales and simple compass directions to describe location without drawing maps.",
      learningIntention:
        "Interpret location information using grid references, coordinate descriptions, map scales and simple compass directions.",
      successCriteria: [
        "Read a text grid using row and column references.",
        "Identify a place from a grid reference or coordinate pair.",
        "Use a map scale to calculate a real distance.",
        "Convert a real distance back to a map distance using a scale.",
        "Choose a simple compass direction from coordinate movement.",
        "Recognise when a location question should be answered with a place, coordinate, distance or direction.",
      ],
      teaching: {
        paragraphs: [
          "Location questions can be answered without a drawn map when the information is given as a text grid, coordinate pair, edge list, table or written description.",
          "For grid references in this lesson, read the row letter first and then the column number, such as B3.",
          "A map scale links a distance on a map to the real distance: the map has shrunk reality by a fixed factor, so multiply a map distance by the scale value to get back to real size. If 1 cm represents 2 km, then 4 cm represents 8 km.",
          "Coordinates describe position using ordered pairs. A change in the first coordinate is east or west, and a change in the second coordinate is north or south when the axes are described that way.",
          "Compass directions and bearings can be ambiguous if the diagram is missing, so digital questions use text descriptions or multiple choice for direction interpretation.",
        ],
        latexBlocks: [
          "\\text{grid reference: row letter then column number}",
          "\\text{real distance}=\\text{map distance}\\times\\text{scale value}",
          "(x,y)\\rightarrow x\\text{ changes east/west},\\quad y\\text{ changes north/south}",
        ],
      },
      workedExamples: timeLocationWorkedExamples(lesson.slug, lesson.title),
      guidedPractice: [
        measurementAnswer("location-grid-g1", "In the text grid, what is at B2?", "\\begin{array}{c|ccc} &1&2&3\\\\ A&\\text{Park}&\\text{Pool}&\\text{Oval}\\\\ B&\\text{Shop}&\\text{Library}&\\text{School}\\end{array}", "Library", ["library"]),
        measurementAnswer("location-grid-g2", "A map scale is 1 cm : 3 km. A road measures 5 cm on the map. Find the real distance.", "1\\text{ cm}:3\\text{ km},\\quad 5\\text{ cm}", "15 km", ["15", "15km"]),
        financeChoice("location-grid-g3", "Point B is directly above point A on a north-up coordinate grid. Which direction is B from A?", "A", ["North", "South", "East", "West"], "On a north-up grid, directly above means north."),
        measurementAnswer("location-grid-g4", "A town is at row C, column 4. Write the grid reference.", "\\text{row }C,\\quad \\text{column }4", "C4", ["c4", "C 4", "c 4"]),
      ],
      independentPractice: [
        measurementAnswer("location-grid-i1", "In the text grid, what is at A3?", "\\begin{array}{c|ccc} &1&2&3\\\\ A&\\text{Museum}&\\text{Oval}&\\text{Station}\\\\ B&\\text{Cafe}&\\text{Library}&\\text{Clinic}\\end{array}", "Station", ["station"]),
        measurementAnswer("location-grid-i2", "A map scale is 1 cm : 500 m. A path measures 6 cm on the map. Find the real distance in metres.", "1\\text{ cm}:500\\text{ m},\\quad 6\\text{ cm}", "3000 m", ["3000", "3,000", "3000m", "3 km", "3km"]),
        measurementAnswer("location-grid-i3", "A real distance is 12 km. The map scale is 1 cm : 4 km. Find the map distance.", "", "3 cm", ["3", "3cm"]),
        financeChoice("location-grid-i4", "Point P is at (2, 5) and point Q is at (6, 5). On an east-right grid, Q is in which direction from P?", "C", ["North", "South", "East", "West"], "The x-coordinate increases while y stays the same, so Q is east of P."),
        financeChoice("location-grid-i5", "Why are bearings usually best as multiple choice in this digital lesson?", "B", ["They always have no answer", "A text-only diagram can be ambiguous", "They are not part of location", "They require dollars"], "Without a drawn map, direction questions need clear text or answer choices."),
      ],
      commonMistakes: [
        { mistake: "Writing the grid reference as column then row, such as 2B instead of B2.", fix: "This lesson reads row letter first, then column number: row B, column 2 is B2." },
        { mistake: "Giving the map distance as the real distance without multiplying by the scale.", fix: "Real distance = map distance × scale value: 4.5 cm on a 1 cm : 2 km map represents 9 km." },
        { mistake: "Giving the real distance in centimetres instead of kilometres when asked for the actual length.", fix: "Check whether the answer should be in map units (cm) or real-world units (km or m)." },
        { mistake: "Saying B is east of A when A is at (2, 3) and B is at (2, 7).", fix: "The x-coordinates are the same; only y increases. On a north-up grid, increasing y means north." },
      ],
      masteryQuiz: [
        measurementAnswer("location-grid-m1", "In the text grid, what is at B3?", "\\begin{array}{c|ccc} &1&2&3\\\\ A&\\text{Park}&\\text{Pool}&\\text{Oval}\\\\ B&\\text{Shop}&\\text{Library}&\\text{School}\\\\ C&\\text{Station}&\\text{Clinic}&\\text{Cafe}\\end{array}", "School", ["school"]),
        measurementAnswer("location-grid-m2", "Write the grid reference for the Clinic in the displayed grid.", "\\begin{array}{c|ccc} &1&2&3\\\\ A&\\text{Park}&\\text{Pool}&\\text{Oval}\\\\ B&\\text{Shop}&\\text{Library}&\\text{School}\\\\ C&\\text{Station}&\\text{Clinic}&\\text{Cafe}\\end{array}", "C2", ["c2", "C 2", "c 2"]),
        measurementAnswer("location-grid-m3", "A map scale is 1 cm : 2 km. A walking track measures 7 cm on the map. Find the real distance.", "1\\text{ cm}:2\\text{ km},\\quad 7\\text{ cm}", "14 km", ["14", "14km"]),
        measurementAnswer("location-grid-m4", "A real distance is 20 km. The map scale is 1 cm : 5 km. Find the map distance.", "\\text{real distance}=20\\text{ km},\\quad 1\\text{ cm}:5\\text{ km}", "4 cm", ["4", "4cm"]),
        financeChoice("location-grid-m5", "Point A is at (3, 2) and point B is at (3, 6). On a north-up coordinate grid, B is:", "A", ["North of A", "South of A", "East of A", "West of A"], "The y-coordinate increases while x stays the same."),
        financeChoice("location-grid-m6", "Point A is at (7, 4) and point B is at (2, 4). On an east-right coordinate grid, B is:", "D", ["North of A", "South of A", "East of A", "West of A"], "The x-coordinate decreases while y stays the same."),
        measurementAnswer("location-grid-m7", "A map distance is 3.5 cm and the scale is 1 cm : 4 km. Find the real distance.", "\\text{map distance}=3.5\\text{ cm},\\quad 1\\text{ cm}:4\\text{ km}", "14 km", ["14", "14km"]),
        financeChoice("location-grid-m8", "A grid reference B4 means:", "B", ["Column B then row 4", "Row B then column 4", "Bearing 4 degrees", "4 km from B"], "This lesson uses row letter then column number."),
        {
          id: "location-grid-m9",
          prompt:
            "Two towns are 4.6 cm apart on a map with scale 1:100000. Find the actual distance in kilometres.",
          latex: "\\text{map distance}=4.6\\text{ cm},\\quad \\text{scale }1:100000",
          answer: "4.6 km",
          acceptedAnswers: [
            "4.6",
            "4.6 km",
            "4.6km",
            "4.6 kilometres",
            "4.6 kilometers",
          ],
          hint: "Convert the scale distance represented by 1 cm into kilometres.",
          explanation:
            "At scale 1:100000, 1 cm represents 100000 cm, which is 1 km. So 4.6 cm represents 4.6 km.",
        },
        {
          id: "location-grid-m10",
          prompt:
            "A park is 2.5 km wide. On a map with scale 1:25000, how wide is it in centimetres?",
          latex: "\\text{actual width}=2.5\\text{ km},\\quad \\text{scale }1:25000",
          answer: "10 cm",
          acceptedAnswers: [
            "10",
            "10 cm",
            "10cm",
            "10 centimetres",
            "10 centimeters",
          ],
          hint: "Convert the real distance to centimetres, then divide by the scale factor.",
          explanation:
            "2.5 km is 250000 cm. On a 1:25000 map, map distance is $250000\\div25000=10$ cm.",
        },
      ],
    };
  }

  if (lesson.slug === "compass-bearings-navigation") {
    return {
      ...base,
      description:
        "Read true bearings using three-digit notation measured clockwise from north, identify key compass points as bearings, and calculate back bearings.",
      learningIntention:
        "Interpret true bearings, identify compass points as 3-digit bearings, and find back bearings.",
      successCriteria: [
        "State true bearings for the 8 main compass points (N, NE, E, SE, S, SW, W, NW).",
        "Interpret a given bearing as a compass direction.",
        "Calculate the back bearing by adding or subtracting 180°.",
        "Apply the correct rule: add 180° when bearing ≤ 180°, subtract 180° when bearing > 180°.",
      ],
      teaching: {
        paragraphs: [
          "True bearings are measured clockwise from north and always written with three digits, e.g. 045°, not 45°. North itself is 000°.",
          "Key compass points as bearings: N=000°, NE=045°, E=090°, SE=135°, S=180°, SW=225°, W=270°, NW=315°.",
          "A back bearing is the reverse direction — the bearing you would travel to return to your starting point.",
          "Back bearing rule: if the bearing is 180° or less, add 180°. If the bearing is greater than 180°, subtract 180°. The result stays between 000° and 360°.",
        ],
        latexBlocks: [
          "\\text{N}=000^\\circ,\\;\\text{NE}=045^\\circ,\\;\\text{E}=090^\\circ,\\;\\text{SE}=135^\\circ,\\;\\text{S}=180^\\circ,\\;\\text{SW}=225^\\circ,\\;\\text{W}=270^\\circ,\\;\\text{NW}=315^\\circ",
          "\\text{back bearing}=\\text{bearing}+180^\\circ \\quad(\\text{if bearing}\\le 180^\\circ)",
          "\\text{back bearing}=\\text{bearing}-180^\\circ \\quad(\\text{if bearing}>180^\\circ)",
        ],
      },
      guidedPractice: [
        financeChoice("time-bear-g1", "True bearings are always measured:", "B", [
          "Anti-clockwise from south using two digits",
          "Clockwise from north using three digits",
          "From east using four digits",
          "From the nearest compass point",
        ], "True bearings are always clockwise from north, written with three digits."),
        financeChoice("time-bear-g2", "The true bearing of east is:", "C", [
          "000°",
          "045°",
          "090°",
          "270°",
        ], "East is 90° clockwise from north: 090°."),
        measurementAnswer("time-bear-g3", "A ship sails on a bearing of 060°. Find the back bearing.", "", "240°", ["240", "240 degrees"]),
        financeChoice("time-bear-g4", "Which bearing represents south-west (SW)?", "D", [
          "045°",
          "135°",
          "180°",
          "225°",
        ], "SW is 225° — halfway between S (180°) and W (270°)."),
      ],
      independentPractice: [
        measurementAnswer("time-bear-i1", "Find the back bearing of 125°.", "", "305°", ["305", "305 degrees"]),
        measurementAnswer("time-bear-i2", "Find the back bearing of 250°.", "", "070°", ["70", "070", "70 degrees", "070 degrees"]),
        financeChoice("time-bear-i3", "A vessel travels on bearing 270°. In which direction is it heading?", "C", [
          "North",
          "South",
          "West",
          "East",
        ], "270° is due west."),
        measurementAnswer("time-bear-i4", "Find the back bearing of 300°.", "", "120°", ["120", "120 degrees"]),
        financeChoice("time-bear-i5", "A walker travels due north then turns to travel due east. Their final position relative to the start is:", "B", [
          "Due north",
          "North-east",
          "Due east",
          "South-east",
        ], "North then east places the walker north-east of the start."),
      ],
      commonMistakes: [
        { mistake: "Writing a bearing as 45° instead of 045°.", fix: "True bearings always use three digits: 045°, 090°, 000°. Pad single or double-digit angles with leading zeros." },
        { mistake: "Adding 180° to a bearing greater than 180° and getting a result over 360°.", fix: "If the bearing is already more than 180°, subtract 180° instead of adding it." },
        { mistake: "Confusing NE (045°) with SE (135°).", fix: "Work clockwise from north: after NE (045°) comes E (090°), then SE (135°)." },
        { mistake: "Using the back bearing rule backwards — subtracting when the bearing is less than 180°.", fix: "Add 180° for bearings ≤ 180°; subtract 180° for bearings > 180°. Check: the result must be between 000° and 360°." },
      ],
      masteryQuiz: [
        financeChoice("time-bear-m1", "How many digits are always used in a true bearing?", "B", [
          "Two",
          "Three",
          "Four",
          "It varies",
        ], "True bearings are always three digits: 000° to 360°."),
        measurementAnswer("time-bear-m2", "Find the back bearing of 045°.", "", "225°", ["225", "225 degrees"]),
        measurementAnswer("time-bear-m3", "Find the back bearing of 315°.", "", "135°", ["135", "135 degrees"]),
        financeChoice("time-bear-m4", "A bearing of 135° represents which compass direction?", "C", [
          "North-east",
          "South-west",
          "South-east",
          "North-west",
        ], "135° is SE — halfway between S (180°) and E (090°), measuring clockwise from N."),
        measurementAnswer("time-bear-m5", "Find the back bearing of 090°.", "", "270°", ["270", "270 degrees"]),
        financeChoice("time-bear-m6", "Which rule gives the correct back bearing for a bearing of 200°?", "A", [
          "200 − 180 = 020°",
          "200 + 180 = 380° = 020°",
          "200 ÷ 2 = 100°",
          "360 − 200 = 160°",
        ], "200° > 180°, so subtract 180°: 200 − 180 = 020°."),
        measurementAnswer("time-bear-m7", "Find the back bearing of 225°.", "", "045°", ["45", "045", "45 degrees", "045 degrees"]),
        financeChoice("time-bear-m8", "A vessel departs on bearing 270°. Its back bearing is:", "B", [
          "180°",
          "090°",
          "000°",
          "360°",
        ], "270° > 180°, so back bearing = 270 − 180 = 090°."),
        measurementAnswer("time-bear-m9", "Find the back bearing of 180°.", "", "000°", ["0", "000", "360", "0 degrees", "000 degrees"]),
        financeChoice("time-bear-m10", "A navigator sees a lighthouse on a bearing of 000°. The bearing from the lighthouse back to the navigator is:", "C", [
          "000°",
          "090°",
          "180°",
          "270°",
        ], "Back bearing of 000°: add 180° → 180°."),
      ],
    };
  }

  if (lesson.slug === "speed-distance-time") {
    return {
      ...base,
      description:
        "Apply D = S × T to find distance, speed or time, convert between minutes and decimal hours, and calculate average speed for multi-leg journeys.",
      learningIntention:
        "Use D = S × T to solve practical travel problems, and calculate average speed for journeys with multiple legs.",
      successCriteria: [
        "Apply D = S × T to find distance, speed or time.",
        "Convert minutes to decimal hours before substituting into the formula.",
        "Find average speed for multi-leg journeys using total distance ÷ total time.",
        "Interpret answers in appropriate units and check reasonableness.",
      ],
      teaching: {
        paragraphs: [
          "The DST triangle relates distance, speed and time: D = S × T. Cover the unknown with your thumb — the remaining two quantities show the calculation needed.",
          "Units must match. If speed is in km/h, distance must be in km and time in hours. Convert minutes to hours by dividing by 60: 30 min = 0.5 h, 15 min = 0.25 h, 45 min = 0.75 h.",
          "For multi-leg journeys, find total distance and total time separately before dividing to get average speed. Averaging individual speeds gives the wrong answer unless all legs take the same time.",
          "Convert a decimal time back to hours and minutes if needed: 2.5 h = 2 h 30 min, 1.25 h = 1 h 15 min.",
        ],
        latexBlocks: [
          "D=S\\times T \\qquad S=\\frac{D}{T} \\qquad T=\\frac{D}{S}",
          "\\text{average speed}=\\frac{\\text{total distance}}{\\text{total time}}",
          "30\\text{ min}=0.5\\text{ h},\\quad 15\\text{ min}=0.25\\text{ h},\\quad 45\\text{ min}=0.75\\text{ h}",
        ],
      },
      guidedPractice: [
        financeChoice("time-sdt-g1", "The formula for distance is:", "A", [
          "D = S × T",
          "D = S ÷ T",
          "D = T ÷ S",
          "D = S + T",
        ], "Distance = Speed × Time."),
        measurementAnswer("time-sdt-g2", "A car travels at 80 km/h for 3 hours. Find the distance.", "", "240 km", ["240", "240km"]),
        measurementAnswer("time-sdt-g3", "A car travels 300 km at 60 km/h. Find the time taken.", "", "5 h", ["5", "5h", "5 hours"]),
        financeChoice("time-sdt-g4", "15 minutes expressed as a fraction of an hour is:", "B", [
          "0.15 h",
          "0.25 h",
          "0.5 h",
          "1.5 h",
        ], "15 ÷ 60 = 0.25 h."),
      ],
      independentPractice: [
        measurementAnswer("time-sdt-i1", "A runner travels 12 km in 2 hours. Find the average speed.", "", "6 km/h", ["6", "6km/h", "6 km/h"]),
        measurementAnswer("time-sdt-i2", "A cyclist rides at 24 km/h for 2.5 hours. Find the distance.", "", "60 km", ["60", "60km"]),
        measurementAnswer("time-sdt-i3", "A train travels 180 km at 72 km/h. Find the time taken.", "", "2.5 h", ["2.5", "2h 30min", "2 h 30 min", "2 hours 30 minutes"]),
        financeChoice("time-sdt-i4", "A driver travels 120 km in 2 h then 60 km in 1 h. The average speed for the whole journey is:", "B", [
          "90 km/h",
          "60 km/h",
          "70 km/h",
          "80 km/h",
        ], "Total D = 180 km, total T = 3 h. Average speed = 180 ÷ 3 = 60 km/h."),
        measurementAnswer("time-sdt-i5", "A bus travels 150 km in 2 h 30 min (= 2.5 h). Find the average speed.", "", "60 km/h", ["60", "60km/h", "60 km/h"]),
      ],
      commonMistakes: [
        { mistake: "Using minutes directly in the formula without converting to hours.", fix: "The formula uses hours for time when speed is in km/h. Convert minutes to hours by dividing by 60: 30 min = 0.5 h." },
        { mistake: "Finding average speed by averaging 80 km/h and 60 km/h to get 70 km/h.", fix: "Always use total distance ÷ total time. Different legs can take different amounts of time, so simple speed averages give the wrong answer." },
        { mistake: "Dividing S by D to find T, or D by T to find S.", fix: "Use the DST triangle: cover the unknown. T = D ÷ S; S = D ÷ T; D = S × T." },
        { mistake: "Giving a time answer as 2.5 when the question asks for hours and minutes.", fix: "Convert 2.5 h to 2 h 30 min when the question asks for the format hours and minutes." },
      ],
      masteryQuiz: [
        financeChoice("time-sdt-m1", "Speed = ?", "C", [
          "Distance × Time",
          "Time ÷ Distance",
          "Distance ÷ Time",
          "Distance + Time",
        ], "Speed = Distance ÷ Time."),
        measurementAnswer("time-sdt-m2", "A plane flies at 900 km/h for 4 hours. Find the distance.", "", "3600 km", ["3600", "3,600", "3600km"]),
        measurementAnswer("time-sdt-m3", "A jogger runs 9 km in 1.5 hours. Find the average speed.", "", "6 km/h", ["6", "6km/h", "6 km/h"]),
        measurementAnswer("time-sdt-m4", "A bus travels at 60 km/h. How long does it take to travel 90 km?", "", "1.5 h", ["1.5", "1h 30min", "1 h 30 min", "1 hour 30 minutes"]),
        financeChoice("time-sdt-m5", "A driver travels 120 km in 2 h, then 60 km in 1 h. The average speed is:", "B", [
          "90 km/h",
          "60 km/h",
          "50 km/h",
          "80 km/h",
        ], "Total D = 180 km, total T = 3 h. Average = 180 ÷ 3 = 60 km/h."),
        measurementAnswer("time-sdt-m6", "A cyclist travels at 18 km/h for 45 minutes (= 0.75 h). Find the distance.", "", "13.5 km", ["13.5", "13.5km"]),
        measurementAnswer("time-sdt-m7", "A truck covers 240 km in 4 hours. Find the average speed.", "", "60 km/h", ["60", "60km/h", "60 km/h"]),
        financeChoice("time-sdt-m8", "A train takes 2 h 30 min (= 2.5 h) to travel 200 km. Its average speed is:", "A", [
          "80 km/h",
          "60 km/h",
          "100 km/h",
          "50 km/h",
        ], "S = 200 ÷ 2.5 = 80 km/h."),
        measurementAnswer("time-sdt-m9", "A car travels at 100 km/h. How long does it take to travel 250 km?", "", "2.5 h", ["2.5", "2h 30min", "2 h 30 min", "2 hours 30 minutes"]),
        financeChoice("time-sdt-m10", "Why can average speed not be found by averaging the speeds of each leg?", "B", [
          "Speeds are always the same",
          "Each leg may have a different duration, so speeds must be weighted by time",
          "Distance is irrelevant",
          "You can only use total time",
        ], "Average speed = total distance ÷ total time. Individual speeds need not be averaged."),
      ],
    };
  }

  if (lesson.slug === "latitude-longitude-global-location") {
    return {
      ...base,
      description:
        "Read GPS coordinates as (latitude, longitude), identify hemispheres, estimate north-south distances using 111 km per degree, and connect longitude to UTC offsets.",
      learningIntention:
        "Interpret latitude and longitude coordinates, identify hemispheres, and use the 111 km per degree rule for north-south distances.",
      successCriteria: [
        "Identify latitude as north-south position (equator = 0°) and longitude as east-west position (prime meridian = 0°).",
        "Read GPS coordinates in (latitude, longitude) format and identify the hemisphere.",
        "Estimate north-south distance by multiplying the degree difference in latitude by 111 km.",
        "Connect longitude to UTC offsets using the rule 15° of longitude = 1 hour.",
      ],
      teaching: {
        paragraphs: [
          "Latitude lines (parallels) run east-west and measure north-south position. The equator is 0°. Latitudes range from 90°S to 90°N. Australia lies roughly between 10°S and 44°S.",
          "Longitude lines (meridians) run north-south and measure east-west position. The prime meridian is 0° (through Greenwich, UK). Longitudes range from 180°W to 180°E.",
          "GPS coordinates are written as (latitude, longitude). A location at (33.9°S, 151.2°E) is in the southern hemisphere (S label) and eastern hemisphere (E label).",
          "Each degree of latitude represents approximately 111 km of north-south distance. Time zones connect to longitude: Earth rotates 360° in 24 hours = 15° per hour, so every 15° of longitude adds or subtracts 1 hour from UTC.",
        ],
        latexBlocks: [
          "\\text{equator}=0^\\circ\\text{ latitude}\\qquad\\text{prime meridian}=0^\\circ\\text{ longitude}",
          "\\text{north-south distance}\\approx\\Delta\\text{latitude}\\times 111\\text{ km}",
          "\\frac{360^\\circ}{24\\text{ h}}=15^\\circ/\\text{h}\\qquad\\text{UTC offset}=\\frac{\\text{longitude (°E)}}{15}",
        ],
      },
      guidedPractice: [
        financeChoice("time-latlong-g1", "The equator has a latitude of:", "B", [
          "90°",
          "0°",
          "180°",
          "45°",
        ], "The equator is at 0° latitude."),
        financeChoice("time-latlong-g2", "GPS coordinates are written as:", "A", [
          "(latitude, longitude)",
          "(longitude, latitude)",
          "(east, north)",
          "(bearing, distance)",
        ], "GPS coordinates are always (latitude, longitude)."),
        financeChoice("time-latlong-g3", "A location at (34°S, 151°E) is in which hemispheres?", "C", [
          "Northern and western",
          "Northern and eastern",
          "Southern and eastern",
          "Southern and western",
        ], "S = southern hemisphere; E = eastern hemisphere."),
        measurementAnswer("time-latlong-g4", "Two cities are 4° of latitude apart. Estimate the north-south distance. (Use 1° ≈ 111 km.)", "", "444 km", ["444", "444km"]),
      ],
      independentPractice: [
        financeChoice("time-latlong-i1", "The prime meridian has a longitude of:", "A", [
          "0°",
          "90°E",
          "180°",
          "45°W",
        ], "The prime meridian is at 0° longitude."),
        measurementAnswer("time-latlong-i2", "Two places are 10° of latitude apart. Estimate the north-south distance. (Use 1° ≈ 111 km.)", "", "1110 km", ["1110", "1110km", "1,110"]),
        financeChoice("time-latlong-i3", "A location at longitude 75°W is in which hemisphere?", "B", [
          "Eastern hemisphere",
          "Western hemisphere",
          "Northern hemisphere",
          "Southern hemisphere",
        ], "W labels indicate the western hemisphere."),
        measurementAnswer("time-latlong-i4", "A location is at longitude 150°E. Using 15° = 1 hour, find the UTC offset.", "", "UTC+10", ["+10", "10", "UTC +10"]),
        financeChoice("time-latlong-i5", "Which statement about latitude is correct?", "C", [
          "Latitude measures east-west position",
          "The prime meridian is a latitude line",
          "Latitude lines run parallel to the equator and measure north-south position",
          "Latitude is measured from the South Pole",
        ], "Latitude measures north-south position; lines of latitude are parallel to the equator."),
      ],
      commonMistakes: [
        { mistake: "Confusing latitude (north-south) and longitude (east-west).", fix: "Latitude = flat/horizontal lines like the equator (measure north-south). Longitude = vertical meridian lines (measure east-west)." },
        { mistake: "Writing GPS coordinates as (longitude, latitude) instead of (latitude, longitude).", fix: "GPS format is always (latitude, longitude): north-south first, then east-west." },
        { mistake: "Dividing by 111 instead of multiplying when finding north-south distance.", fix: "Distance = degrees of latitude × 111 km. Multiply: 4° of latitude = 4 × 111 = 444 km." },
        { mistake: "Using 15° per hour but multiplying instead of dividing.", fix: "UTC offset = longitude ÷ 15. At 150°E: 150 ÷ 15 = UTC+10." },
      ],
      masteryQuiz: [
        financeChoice("time-latlong-m1", "Which correctly describes longitude?", "B", [
          "Longitude measures north-south position from 90°S to 90°N",
          "Longitude measures east-west position from 180°W to 180°E",
          "Longitude is the same as latitude",
          "Longitude starts at the equator",
        ], "Longitude is east-west, ranging from 180°W to 180°E."),
        measurementAnswer("time-latlong-m2", "Two cities have latitudes 20°S and 25°S. Find the north-south distance. (Use 1° ≈ 111 km.)", "", "555 km", ["555", "555km"]),
        financeChoice("time-latlong-m3", "Sydney is at approximately (33.9°S, 151.2°E). Which is true?", "A", [
          "Sydney is in the southern and eastern hemispheres",
          "Sydney is in the northern and eastern hemispheres",
          "Sydney is in the southern and western hemispheres",
          "Sydney is on the prime meridian",
        ], "33.9°S → southern; 151.2°E → eastern."),
        measurementAnswer("time-latlong-m4", "A location is at longitude 120°E. Find the UTC offset. (Use 15° = 1 hour.)", "", "UTC+8", ["+8", "8", "UTC +8"]),
        financeChoice("time-latlong-m5", "Latitude ranges from:", "C", [
          "0° to 360°",
          "0° to 180°",
          "90°S to 90°N",
          "180°W to 180°E",
        ], "Latitude runs from 90°S (South Pole) to 90°N (North Pole)."),
        measurementAnswer("time-latlong-m6", "Two cities have latitudes 0° and 3°N. Estimate the distance between them. (Use 1° ≈ 111 km.)", "", "333 km", ["333", "333km"]),
        financeChoice("time-latlong-m7", "GPS coordinates (40°N, 74°W) describe a location that is:", "B", [
          "Southern and eastern hemispheres",
          "Northern and western hemispheres",
          "Southern and western hemispheres",
          "Northern and eastern hemispheres",
        ], "N → northern; W → western."),
        measurementAnswer("time-latlong-m8", "A location is at longitude 75°W. Find the UTC offset. (Use 15° = 1 hour; W longitudes give negative offsets.)", "", "UTC-5", ["-5", "−5", "UTC -5"]),
        financeChoice("time-latlong-m9", "The International Date Line is located at approximately:", "D", [
          "0° longitude",
          "90°E longitude",
          "90°W longitude",
          "180° longitude",
        ], "The International Date Line runs roughly along 180° longitude."),
        financeChoice("time-latlong-m10", "A plane travels from latitude 10°N to latitude 20°N along the same meridian. Using 1° ≈ 111 km, how far does it travel?", "B", [
          "222 km",
          "1110 km",
          "555 km",
          "2220 km",
        ], "20 − 10 = 10°. Distance = 10 × 111 = 1110 km."),
      ],
    };
  }

  if (lesson.slug === "time-location-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed time and location questions using timetables, UTC offsets, date changes, grid references, map scales and coordinate descriptions.",
    learningIntention:
      "Apply timetable, time-zone, map scale and grid-reference skills to mixed practical exam-style contexts.",
    successCriteria: [
      "Interpret timetable information accurately.",
      "Calculate elapsed and waiting times.",
      "Convert between time zones using UTC offsets.",
      "Recognise date changes in travel scenarios.",
      "Use map scales, grid references and coordinates to interpret location.",
    ],
    teaching: {
      paragraphs: [
        "Time and location exam questions mix timetables, elapsed time, time zones, date changes and scales, so first pin down exactly what is asked — a duration, a departure or arrival time, a waiting time, or a local time somewhere else — because each needs a different calculation.",
        "Start by identifying whether the question is asking for a duration, a departure or arrival time, a waiting time, or a local time in another place.",
        "Use the timetable row or UTC offsets carefully. A small direction error can change the answer by several hours.",
        "Check reasonableness: a bus wait should match the next departure, a converted time may need a new date if it crosses midnight, and a map distance should match the stated scale.",
      ],
      latexBlocks: [
        "\\text{elapsed time}=\\text{arrival time}-\\text{departure time}",
        "\\text{time difference}=\\text{destination offset}-\\text{starting offset}",
        "\\text{real distance}=\\text{map distance}\\times\\text{scale value}",
      ],
    },
    guidedPractice: [
      timeAnswer("time-exam-g1", "A service leaves at 07:45 and arrives at 08:32. What is the travel time?", "", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-g2", "A passenger arrives at 07:32. Departures are 07:15, 07:45 and 08:20. How long is the wait for the next service?", "", "13 min", ["13 minutes", "13min"]),
      timeAnswer("time-exam-g3", "Sydney is UTC+10 and Perth is UTC+8. If it is 18:30 in Sydney, what time is it in Perth?", "", "16:30", ["4:30 pm", "1630", "4.30 pm"]),
      measurementAnswer("time-exam-g4", "A map scale is 1 cm : 2 km. A route measures 6 cm on the map. Find the real distance.", "", "12 km", ["12", "12km"]),
    ],
    independentPractice: [
      timeAnswer("time-exam-i1", "A train leaves at 06:55 and arrives at 08:10. What is the travel time?", "", "1 h 15 min", ["1 hour 15 minutes", "1 hour and 15 minutes", "1h 15min", "1h15", "1h15min", "1 hr 15 min", "1:15", "75 min", "75 minutes"]),
      timeAnswer("time-exam-i2", "A bus passenger arrives at 15:22. Buses depart at 15:18, 15:36 and 15:55. How long is the wait?", "", "14 min", ["14 minutes", "14min"]),
      timeAnswer("time-exam-i3", "A city at UTC+9 is compared with a city at UTC+5. If it is 20:00 at UTC+9, what time is it at UTC+5?", "", "16:00", ["4:00 pm", "1600", "4.00 pm"]),
      timeAnswer("time-exam-i4", "A flight departs at 23:30 Monday and lasts 2 hours. Ignoring time zones, what is the arrival time and day?", "", "01:30 Tuesday", ["1:30 am Tuesday", "01:30 Tue", "1.30 am Tuesday"]),
      financeChoice("time-exam-i5", "Point P is at (4, 1) and point Q is at (4, 5). On a north-up coordinate grid, Q is:", "A", ["North of P", "South of P", "East of P", "West of P"], "The y-coordinate increases while x stays the same."),
    ],
    commonMistakes: [
      { mistake: "Using one service's departure with a different service's arrival to calculate travel time.", fix: "Read departure and arrival from the same service row every time." },
      { mistake: "Answering a 'how long is the trip?' question with a clock time such as 08:32.", fix: "A duration is a length of time (47 min); an arrival is a clock reading (08:32). Check what the question asks." },
      { mistake: "Subtracting when converting from Perth (UTC+8) to Melbourne (UTC+10).", fix: "Melbourne has a higher offset, so it is ahead of Perth. Add the difference." },
      { mistake: "Reporting an arrival time of 25:15 without recognising it as a date change.", fix: "Any converted time past 24:00 rolls to the next calendar day: 25:15 becomes 01:15 the next day." },
    ],
    masteryQuiz: [
      timeAnswer("time-exam-m1", "Service B departs at 07:45 and arrives at 08:32. What is the trip duration?", "\\text{depart}=07{:}45,\\quad \\text{arrive}=08{:}32", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-m2", "A commuter arrives at 08:06. Services leave at 08:01, 08:18 and 08:40. How long is the wait?", "", "12 min", ["12 minutes", "12min"]),
      timeAnswer("time-exam-m3", "A school event starts at 5:45 pm. Write your answer in 24-hour time, for example 18:30.", "5{:}45\\text{ pm}", "17:45", ["1745", "17.45"]),
      timeAnswer("time-exam-m4", "A ferry leaves at 22:35 and arrives at 23:20. What is the travel time?", "\\text{depart}=22{:}35,\\quad \\text{arrive}=23{:}20", "45 min", ["45 minutes", "45min"]),
      timeAnswer("time-exam-m5", "Melbourne is UTC+10 and Perth is UTC+8. If it is 09:30 in Perth, what time is it in Melbourne?", "\\text{Perth (UTC+8)}=09{:}30,\\quad \\text{Melbourne}=\\text{UTC+10}", "11:30", ["11:30 am", "1130", "11.30 am"]),
      financeChoice("time-exam-m6", "A trip crosses the International Date Line. Which detail is most important?", "D", ["The seat number", "The ticket colour", "The meal choice", "The direction of crossing"], "Direction affects whether the date moves forward or back."),
      timeAnswer("time-exam-m7", "A city at UTC-3 is compared with UTC+2. If it is 10:00 at UTC-3, what time is it at UTC+2?", "\\text{UTC-3}=10{:}00", "15:00", ["3:00 pm", "1500", "3.00 pm"]),
      measurementAnswer("time-exam-m8", "In the grid, what is at A2?", "\\begin{array}{c|cc} &1&2\\\\ A&\\text{Park}&\\text{Station}\\\\ B&\\text{Shop}&\\text{Clinic}\\end{array}", "Station", ["station"]),
      timeAnswer("time-exam-m9", "A flight leaves at 21:20 and lasts 4 h 10 min. Ignoring time zones, what is the arrival time?", "\\text{depart}=21{:}20,\\quad \\text{duration}=4\\text{ h }10\\text{ min}", "01:30", ["1:30 am", "0130", "1.30 am"]),
      financeChoice("time-exam-m10", "If Sydney is observing daylight saving as UTC+11 and Perth is UTC+8, Sydney is:", "A", ["3 hours ahead", "2 hours ahead", "3 hours behind", "The same time"], "UTC+11 is 3 hours ahead of UTC+8."),
    ],
    };
  }

  if (lesson.slug === "time-location-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 time skills: convert between 12-hour and 24-hour time, calculate elapsed time, read timetables, and convert between time units — foundations for Year 11 time-zone and scheduling work.",
      learningIntention:
        "Recall and apply Year 10 time-reading and calculation skills so that Year 11 UTC offsets, timetable, and travel-planning work builds on secure foundations.",
      successCriteria: [
        "Convert between 12-hour (am/pm) and 24-hour time.",
        "Calculate elapsed time between two given times, including crossing midnight.",
        "Read a timetable to find departure, arrival, and travel duration.",
        "Convert between seconds, minutes, hours, and days.",
      ],
      teaching: {
        paragraphs: [
          "24-hour time (also called military time) runs from 0000 (midnight) to 2359. For times from 1:00 pm onward, add 12 to the hour: 3:45 pm → 1545. For am times (except 12 am = 0000), keep the hour as is and pad with a leading zero if needed: 9:20 am → 0920.",
          "To convert from 24-hour to 12-hour time: if the hours digits are 13 or more, subtract 12 and write pm. If the hours digits are 12, write 12 pm. If the hours are 00, write 12 am. Otherwise, it is an am time (keep the hours).",
          "Elapsed time is the duration between a start time and an end time. The simplest method is to count up: from the start time, add minutes to reach the next whole hour, then add hours, then add remaining minutes. For times crossing midnight, treat midnight as 2400 (or 0000 the next day) and calculate accordingly.",
          "Time unit conversions: 60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day, 7 days = 1 week. To convert to smaller units multiply; to larger units divide.",
        ],
        latexBlocks: [
          "\\text{pm} \\to \\text{24-hr: add 12 to hour}\\qquad \\text{am} \\to \\text{24-hr: keep hour (use 0000 for midnight)}",
          "\\text{Elapsed time: count up from start to end, or subtract start from end}",
          "60\\text{ s}=1\\text{ min},\\quad 60\\text{ min}=1\\text{ h},\\quad 24\\text{ h}=1\\text{ day}",
        ],
      },
      workedExamples: [
        {
          title: "Converting 12-hour to 24-hour time",
          questionLatex: "\\text{Convert 2:45 pm to 24-hour time.}",
          steps: [
            {
              explanation: "It is a pm time, so add 12 to the hours: 2 + 12 = 14.",
              latex: "2:45\\text{ pm} \\to 1445",
            },
          ],
          finalAnswerLatex: "1445",
        },
        {
          title: "Elapsed time",
          questionLatex: "\\text{A bus departs at 09:35 and arrives at 13:10. How long is the journey?}",
          steps: [
            {
              explanation: "Count up from 09:35 to 13:10.",
              latex: "09:35 \\xrightarrow{+25\\text{ min}} 10:00 \\xrightarrow{+3\\text{ h}} 13:00 \\xrightarrow{+10\\text{ min}} 13:10",
            },
            {
              explanation: "Total elapsed time: 3 hours 35 minutes.",
              latex: "3\\text{ h }35\\text{ min}",
            },
          ],
          finalAnswerLatex: "3\\text{ h }35\\text{ min}",
        },
        {
          title: "Time unit conversion",
          questionLatex: "\\text{Convert 3.5 hours to minutes.}",
          steps: [
            {
              explanation: "Multiply by 60 (60 minutes per hour).",
              latex: "3.5 \\times 60 = 210 \\text{ minutes}",
            },
          ],
          finalAnswerLatex: "210 \\text{ minutes}",
        },
      ],
      guidedPractice: [
        timeAnswer(
          "y11s-tlr-g1",
          "Convert 7:20 am to 24-hour time.",
          "",
          "0720",
          ["07:20", "7:20", "07 20"]
        ),
        timeAnswer(
          "y11s-tlr-g2",
          "Convert 1435 to 12-hour time.",
          "",
          "2:35 pm",
          ["2:35pm", "02:35 pm", "2:35 PM"]
        ),
        timeAnswer(
          "y11s-tlr-g3",
          "A train departs at 08:15 and arrives at 11:45. How long is the journey?",
          "",
          "3 h 30 min",
          ["3:30", "3 hours 30 minutes", "3h30min"]
        ),
        financeChoice(
          "y11s-tlr-g4",
          "How many minutes are in 2.5 hours?",
          "C",
          ["125 min", "120 min", "150 min", "100 min"],
          "2.5 × 60 = 150 minutes."
        ),
      ],
      independentPractice: [
        timeAnswer(
          "y11s-tlr-i1",
          "Convert 11:55 pm to 24-hour time.",
          "",
          "2355",
          ["23:55", "23 55"]
        ),
        timeAnswer(
          "y11s-tlr-i2",
          "Convert 0845 to 12-hour time.",
          "",
          "8:45 am",
          ["8:45am", "08:45 am", "8:45 AM"]
        ),
        timeAnswer(
          "y11s-tlr-i3",
          "A flight departs at 22:50 and arrives at 01:30 the next day. How long is the flight?",
          "",
          "2 h 40 min",
          ["2:40", "2 hours 40 minutes", "2h40min"]
        ),
        timeAnswer(
          "y11s-tlr-i4",
          "Convert 4 hours 20 minutes to minutes.",
          "",
          "260 minutes",
          ["260", "260 min"]
        ),
        financeChoice(
          "y11s-tlr-i5",
          "A timetable shows a bus departs at 0735 and the journey takes 55 minutes. The arrival time is:",
          "B",
          ["0820", "0830", "0825", "0800"],
          "0735 + 25 min = 0800, then + 30 min = 0830."
        ),
      ],
      commonMistakes: [
        {
          mistake: "For 12 pm, subtracting 12 instead of keeping 1200.",
          fix: "12 noon is 1200 in 24-hour time. 12 pm → 1200 (do not subtract 12). 12 am (midnight) → 0000.",
        },
        {
          mistake: "When adding pm conversion, adding 12 to 12 pm to get 2400.",
          fix: "12 pm is already 1200 in 24-hour time — do not add 12 again. Only add 12 to hours from 1 pm to 11 pm.",
        },
        {
          mistake: "Subtracting start time from end time when crossing midnight and getting a negative result.",
          fix: "For overnight journeys, count up: from departure to midnight (0000 or 2400), then from midnight to arrival. Add the two parts.",
        },
        {
          mistake: "Converting hours to minutes by multiplying by 100 instead of 60.",
          fix: "There are 60 minutes in one hour, not 100. To convert hours to minutes, multiply by 60: 2.5 hours = 2.5 × 60 = 150 minutes.",
        },
      ],
      masteryQuiz: [
        timeAnswer("y11s-tlr-m1", "Convert 5:30 pm to 24-hour time.", "", "1730", ["17:30", "17 30"]),
        timeAnswer("y11s-tlr-m2", "Convert 1620 to 12-hour time.", "", "4:20 pm", ["4:20pm", "4:20 PM"]),
        timeAnswer("y11s-tlr-m3", "A movie starts at 14:25 and lasts 1 h 45 min. When does it end?", "", "16:10", ["1610", "4:10 pm"]),
        financeChoice("y11s-tlr-m4", "12 midnight in 24-hour time is:", "D", ["1200", "2400 always", "1259", "0000"], "Midnight is written as 0000 (start of the day) in standard 24-hour notation."),
        timeAnswer("y11s-tlr-m5", "How many seconds are in 3 minutes?", "", "180 seconds", ["180", "180s", "180 s"]),
        timeAnswer("y11s-tlr-m6", "A bus departs at 10:45 and the journey is 2 h 25 min. What is the arrival time?", "", "13:10", ["1310", "1:10 pm"]),
        financeChoice("y11s-tlr-m7", "Convert 180 minutes to hours.", "B", ["1.5 h", "3 h", "2 h", "18 h"], "180 ÷ 60 = 3 hours."),
        timeAnswer("y11s-tlr-m8", "Convert 11:15 am to 24-hour time.", "", "1115", ["11:15", "11 15"]),
        timeAnswer("y11s-tlr-m9", "A trip departs at 23:30 and arrives at 02:00 the next day. How long is the trip?", "", "2 h 30 min", ["2:30", "2 hours 30 minutes", "2h30min"]),
        financeChoice("y11s-tlr-m10", "A train timetable uses 24-hour time. A departure of 0800 is:", "A", ["8:00 am", "8:00 pm", "6:00 pm", "Midnight"], "0800 is before noon and the hours are 08, so it is 8:00 am."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

