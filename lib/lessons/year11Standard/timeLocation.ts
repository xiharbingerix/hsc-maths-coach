import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";
import { financeChoice, measurementAnswer, timeAnswer } from "../questionHelpers";
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
  if (course.slug !== "year-11-standard" || unit.slug !== "time-location") {
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
        timeAnswer("time-table-g1", "A train leaves at 08:42 and arrives at 10:17. How long is the trip?", "10{:}17-08{:}42", "1 h 35 min", ["1 hour 35 minutes", "1 hour and 35 minutes", "1h 35min", "1h35", "1h35min", "1 hr 35 min", "1:35", "95 min", "95 minutes"]),
        timeAnswer("time-table-g2", "A bus timetable shows departures at 7:15, 7:45 and 8:20. If Maya arrives at 7:32, how long does she wait for the next bus?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
        timeAnswer("time-table-g3", "A school rehearsal starts at 6:30 pm. Write your answer in 24-hour time, for example 18:30.", "6{:}30\\text{ pm}", "18:30", ["1830", "18.30"]),
        financeChoice("time-table-g4", "A ferry leaves at 23:40 and arrives at 00:25. What must be remembered?", "C", ["The trip is impossible", "The arrival is earlier on the same day", "The trip crosses midnight", "The time zone must always change"], "The arrival time is after midnight on the next day."),
      ],
      independentPractice: [
        timeAnswer("time-table-i1", "A bus leaves at 07:55 and arrives at 08:38. What is the travel time?", "08{:}38-07{:}55", "43 min", ["43 minutes", "43min"]),
        timeAnswer("time-table-i2", "A student arrives at the station at 15:18. The next trains leave at 15:05, 15:32 and 15:50. What is the waiting time?", "15{:}32-15{:}18", "14 min", ["14 minutes", "14min"]),
        timeAnswer("time-table-i3", "A part-time shift starts at 9:15 am. Write your answer in 24-hour time, for example 18:30.", "9{:}15\\text{ am}", "09:15", ["0915", "09.15"]),
        timeAnswer("time-table-i4", "A flight departs at 22:50 and lands at 01:20 the next day. How long is the flight?", "1\\text{ h }10\\text{ min}+1\\text{ h }20\\text{ min}", "2 h 30 min", ["2 hours 30 minutes", "2 hours and 30 minutes", "2h 30min", "2h30", "2h30min", "2 hr 30 min", "2:30", "150 min", "150 minutes"]),
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
        timeAnswer("time-table-m6", "A student arrives at 08:03. Buses depart at 07:58, 08:12 and 08:27. How long is the wait for the next bus?", "\\text{arrive}=08{:}03,\\quad \\text{next bus}=08{:}12", "9 min", ["9 minutes", "9min"]),
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
          "UTC offsets describe how far a location is ahead of or behind Coordinated Universal Time. UTC+10 is two hours ahead of UTC+8.",
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
          "A map scale links a distance on a map to a real distance. If 1 cm represents 2 km, then 4 cm represents 8 km.",
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
        measurementAnswer("location-grid-i3", "A real distance is 12 km. The map scale is 1 cm : 4 km. Find the map distance.", "12\\div4", "3 cm", ["3", "3cm"]),
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
        "Time and location exam questions often combine timetable reading, elapsed time, time zones, date changes, scales and grid references.",
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
      timeAnswer("time-exam-g1", "A service leaves at 07:45 and arrives at 08:32. What is the travel time?", "08{:}32-07{:}45", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-g2", "A passenger arrives at 07:32. Departures are 07:15, 07:45 and 08:20. How long is the wait for the next service?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
      timeAnswer("time-exam-g3", "Sydney is UTC+10 and Perth is UTC+8. If it is 18:30 in Sydney, what time is it in Perth?", "18{:}30-2\\text{ h}", "16:30", ["4:30 pm", "1630", "4.30 pm"]),
      measurementAnswer("time-exam-g4", "A map scale is 1 cm : 2 km. A route measures 6 cm on the map. Find the real distance.", "6\\times2", "12 km", ["12", "12km"]),
    ],
    independentPractice: [
      timeAnswer("time-exam-i1", "A train leaves at 06:55 and arrives at 08:10. What is the travel time?", "08{:}10-06{:}55", "1 h 15 min", ["1 hour 15 minutes", "1 hour and 15 minutes", "1h 15min", "1h15", "1h15min", "1 hr 15 min", "1:15", "75 min", "75 minutes"]),
      timeAnswer("time-exam-i2", "A bus passenger arrives at 15:22. Buses depart at 15:18, 15:36 and 15:55. How long is the wait?", "15{:}36-15{:}22", "14 min", ["14 minutes", "14min"]),
      timeAnswer("time-exam-i3", "A city at UTC+9 is compared with a city at UTC+5. If it is 20:00 at UTC+9, what time is it at UTC+5?", "20{:}00-4\\text{ h}", "16:00", ["4:00 pm", "1600", "4.00 pm"]),
      timeAnswer("time-exam-i4", "A flight departs at 23:30 Monday and lasts 2 hours. Ignoring time zones, what is the arrival time and day?", "23{:}30+2\\text{ h}", "01:30 Tuesday", ["1:30 am Tuesday", "01:30 Tue", "1.30 am Tuesday"]),
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
      timeAnswer("time-exam-m2", "A commuter arrives at 08:06. Services leave at 08:01, 08:18 and 08:40. How long is the wait?", "\\text{arrive}=08{:}06,\\quad \\text{next service}=08{:}18", "12 min", ["12 minutes", "12min"]),
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

