import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";
import { financeChoice, timeAnswer } from "../questionHelpers";
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
        timeAnswer("time-table-g1", "A train leaves at 08:42 and arrives at 10:17. How long is the trip?", "10{:}17-08{:}42", "1 h 35 min", ["1 hour 35 minutes", "95 min", "95 minutes", "1h35min"]),
        timeAnswer("time-table-g2", "A bus timetable shows departures at 7:15, 7:45 and 8:20. If Maya arrives at 7:32, how long does she wait for the next bus?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
        timeAnswer("time-table-g3", "A school rehearsal starts at 6:30 pm. Write the start time in 24-hour time.", "6{:}30\\text{ pm}", "18:30", ["1830", "6:30 pm", "6.30 pm"]),
        financeChoice("time-table-g4", "A ferry leaves at 23:40 and arrives at 00:25. What must be remembered?", "C", ["The trip is impossible", "The arrival is earlier on the same day", "The trip crosses midnight", "The time zone must always change"], "The arrival time is after midnight on the next day."),
      ],
      independentPractice: [
        timeAnswer("time-table-i1", "A bus leaves at 07:55 and arrives at 08:38. What is the travel time?", "08{:}38-07{:}55", "43 min", ["43 minutes", "43min"]),
        timeAnswer("time-table-i2", "A student arrives at the station at 15:18. The next trains leave at 15:05, 15:32 and 15:50. What is the waiting time?", "15{:}32-15{:}18", "14 min", ["14 minutes", "14min"]),
        timeAnswer("time-table-i3", "A part-time shift starts at 9:15 am. Write this in 24-hour time.", "9{:}15\\text{ am}", "09:15", ["9:15", "0915", "9.15 am"]),
        timeAnswer("time-table-i4", "A flight departs at 22:50 and lands at 01:20 the next day. How long is the flight?", "1\\text{ h }10\\text{ min}+1\\text{ h }20\\text{ min}", "2 h 30 min", ["2 hours 30 minutes", "150 min", "150 minutes", "2h30min"]),
        financeChoice("time-table-i5", "When using a timetable, the safest first step is to:", "A", ["Use times from the same service row", "Use the latest arrival only", "Ignore am and pm", "Subtract the smaller number from the larger number"], "Timetable calculations must use the correct row."),
      ],
      commonMistakes: [
        { mistake: "Subtracting times as ordinary decimals.", fix: "Use hours and minutes, not base-10 decimal subtraction." },
        { mistake: "Ignoring am and pm.", fix: "Convert to 24-hour time when it helps." },
        { mistake: "Using the wrong timetable row.", fix: "Read departure and arrival from the same service." },
        { mistake: "Forgetting midnight crossings.", fix: "When arrival is after 00:00, check whether the date has changed." },
      ],
      masteryQuiz: [
        timeAnswer("time-table-m1", "A train leaves Central at 09:28 and reaches Parramatta at 10:06. What is the travel time?", "\\text{depart}=09{:}28,\\quad \\text{arrive}=10{:}06", "38 min", ["38 minutes", "38min"]),
        timeAnswer("time-table-m2", "A ferry leaves at 11:45 am. Write this in 24-hour time.", "11{:}45\\text{ am}", "11:45", ["1145", "11.45 am"]),
        timeAnswer("time-table-m3", "A cinema session starts at 7:05 pm. Write this in 24-hour time.", "7{:}05\\text{ pm}", "19:05", ["1905", "7:05 pm", "7.05 pm"]),
        timeAnswer("time-table-m4", "A bus leaves at 16:40 and arrives at 17:25. How long is the trip?", "\\text{depart}=16{:}40,\\quad \\text{arrive}=17{:}25", "45 min", ["45 minutes", "45min"]),
        financeChoice("time-table-m5", "A school bell time of 14:50 is:", "B", ["2:50 am", "2:50 pm", "4:50 pm", "12:50 pm"], "14:50 is 2:50 pm."),
        timeAnswer("time-table-m6", "A student arrives at 08:03. Buses depart at 07:58, 08:12 and 08:27. How long is the wait for the next bus?", "\\text{arrive}=08{:}03,\\quad \\text{next bus}=08{:}12", "9 min", ["9 minutes", "9min"]),
        timeAnswer("time-table-m7", "A coach leaves at 23:15 and arrives at 00:05 the next day. What is the travel time?", "\\text{depart}=23{:}15,\\quad \\text{arrive}=00{:}05", "50 min", ["50 minutes", "50min"]),
        financeChoice("time-table-m8", "A trip from 10:20 to 12:05 is best counted as:", "D", ["205 minutes", "1 hour only", "20 minutes", "1 hour 45 minutes"], "10:20 to 11:20 is 1 hour, then 45 minutes."),
        timeAnswer("time-table-m9", "A work shift runs from 13:30 to 17:00. How long is the shift?", "\\text{start}=13{:}30,\\quad \\text{end}=17{:}00", "3 h 30 min", ["3 hours 30 minutes", "210 min", "210 minutes", "3h30min"]),
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
        timeAnswer("time-zone-g1", "Sydney is UTC+10 and Perth is UTC+8. If it is 6:30 pm in Sydney, what time is it in Perth?", "18{:}30-2\\text{ h}", "4:30 pm", ["16:30", "1630", "4.30 pm"]),
        timeAnswer("time-zone-g2", "London is UTC+0 and Singapore is UTC+8. If it is 09:15 in London, what time is it in Singapore?", "09{:}15+8\\text{ h}", "17:15", ["5:15 pm", "1715", "5.15 pm"]),
        financeChoice("time-zone-g3", "A city at UTC+11 compared with a city at UTC+10 is:", "A", ["1 hour ahead", "1 hour behind", "11 hours behind", "21 hours ahead"], "UTC+11 is one hour ahead of UTC+10."),
        financeChoice("time-zone-g4", "A flight crosses the International Date Line travelling east. The date will usually:", "B", ["Move forward one day", "Move back one day", "Never change", "Always become Sunday"], "Travelling east across the Date Line usually moves the date back."),
      ],
      independentPractice: [
        timeAnswer("time-zone-i1", "Brisbane is UTC+10 and Adelaide is UTC+9:30. If it is 14:00 in Brisbane, what time is it in Adelaide?", "14{:}00-0{:}30", "13:30", ["1:30 pm", "1330", "1.30 pm"]),
        timeAnswer("time-zone-i2", "Tokyo is UTC+9 and Perth is UTC+8. If it is 20:45 in Tokyo, what time is it in Perth?", "20{:}45-1\\text{ h}", "19:45", ["7:45 pm", "1945", "7.45 pm"]),
        financeChoice("time-zone-i3", "If daylight saving changes Sydney from UTC+10 to UTC+11, Sydney becomes:", "C", ["1 hour earlier", "unchanged", "1 hour later compared with UTC", "10 hours behind UTC"], "UTC+11 is one hour further ahead than UTC+10."),
        timeAnswer("time-zone-i4", "A city at UTC-5 calls a city at UTC+1. If it is 08:00 at UTC-5, what time is it at UTC+1?", "08{:}00+6\\text{ h}", "14:00", ["2:00 pm", "1400", "2.00 pm"]),
        financeChoice("time-zone-i5", "A flight leaves late at night and arrives after crossing several time zones. The most important extra check is:", "D", ["Only the plane colour", "Only the ticket price", "Only the airline name", "Whether the date changes"], "Long trips and time zones may change the date."),
      ],
      commonMistakes: [
        { mistake: "Adding when the destination is behind.", fix: "Compare the UTC offsets before choosing add or subtract." },
        { mistake: "Ignoring half-hour time zones.", fix: "Some Australian time zones differ by 30 minutes." },
        { mistake: "Forgetting daylight saving when stated.", fix: "Use the UTC offset given in the question." },
        { mistake: "Missing the date change at midnight or the International Date Line.", fix: "Check whether the converted time crosses a day boundary." },
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

  return {
    ...base,
    description:
      "Practise mixed time questions using timetables, elapsed time, UTC offsets, time zones and date changes.",
    learningIntention:
      "Apply timetable and time-zone skills to mixed practical exam-style contexts.",
    successCriteria: [
      "Interpret timetable information accurately.",
      "Calculate elapsed and waiting times.",
      "Convert between time zones using UTC offsets.",
      "Recognise date changes in travel scenarios.",
    ],
    teaching: {
      paragraphs: [
        "Time and location exam questions often combine timetable reading, elapsed time, time zones and date changes.",
        "Start by identifying whether the question is asking for a duration, a departure or arrival time, a waiting time, or a local time in another place.",
        "Use the timetable row or UTC offsets carefully. A small direction error can change the answer by several hours.",
        "Check reasonableness: a bus wait should match the next departure, and a converted time may need a new date if it crosses midnight.",
      ],
      latexBlocks: [
        "\\text{elapsed time}=\\text{arrival time}-\\text{departure time}",
        "\\text{time difference}=\\text{destination offset}-\\text{starting offset}",
      ],
    },
    guidedPractice: [
      timeAnswer("time-exam-g1", "A service leaves at 07:45 and arrives at 08:32. What is the travel time?", "08{:}32-07{:}45", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-g2", "A passenger arrives at 07:32. Departures are 07:15, 07:45 and 08:20. How long is the wait for the next service?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
      timeAnswer("time-exam-g3", "Sydney is UTC+10 and Perth is UTC+8. If it is 18:30 in Sydney, what time is it in Perth?", "18{:}30-2\\text{ h}", "16:30", ["4:30 pm", "1630", "4.30 pm"]),
      financeChoice("time-exam-g4", "A flight arrives at 00:20 after leaving at 22:50. What must be included?", "C", ["A daylight saving rule always", "No duration", "The next-day date change", "A ferry timetable"], "00:20 is after midnight."),
    ],
    independentPractice: [
      timeAnswer("time-exam-i1", "A train leaves at 06:55 and arrives at 08:10. What is the travel time?", "08{:}10-06{:}55", "1 h 15 min", ["1 hour 15 minutes", "75 min", "75 minutes", "1h15min"]),
      timeAnswer("time-exam-i2", "A bus passenger arrives at 15:22. Buses depart at 15:18, 15:36 and 15:55. How long is the wait?", "15{:}36-15{:}22", "14 min", ["14 minutes", "14min"]),
      timeAnswer("time-exam-i3", "A city at UTC+9 is compared with a city at UTC+5. If it is 20:00 at UTC+9, what time is it at UTC+5?", "20{:}00-4\\text{ h}", "16:00", ["4:00 pm", "1600", "4.00 pm"]),
      timeAnswer("time-exam-i4", "A flight departs at 23:30 Monday and lasts 2 hours. Ignoring time zones, what is the arrival time and day?", "23{:}30+2\\text{ h}", "01:30 Tuesday", ["1:30 am Tuesday", "01:30 Tue", "1.30 am Tuesday"]),
      financeChoice("time-exam-i5", "Which answer is reasonable for a train trip from 09:50 to 10:20?", "A", ["30 minutes", "70 minutes", "3 hours", "30 hours"], "09:50 to 10:20 is 30 minutes."),
    ],
    commonMistakes: [
      { mistake: "Using the wrong timetable row.", fix: "Use departure and arrival from the same service." },
      { mistake: "Confusing duration with arrival time.", fix: "Check whether the answer should be a length of time or a clock time." },
      { mistake: "Reversing time zone offsets.", fix: "Find whether the destination is ahead or behind." },
      { mistake: "Forgetting date changes.", fix: "Check midnight and the International Date Line." },
    ],
    masteryQuiz: [
      timeAnswer("time-exam-m1", "Service B departs at 07:45 and arrives at 08:32. What is the trip duration?", "\\text{depart}=07{:}45,\\quad \\text{arrive}=08{:}32", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-m2", "A commuter arrives at 08:06. Services leave at 08:01, 08:18 and 08:40. How long is the wait?", "\\text{arrive}=08{:}06,\\quad \\text{next service}=08{:}18", "12 min", ["12 minutes", "12min"]),
      timeAnswer("time-exam-m3", "A school event starts at 5:45 pm. Write this in 24-hour time.", "5{:}45\\text{ pm}", "17:45", ["1745", "5:45 pm", "5.45 pm"]),
      timeAnswer("time-exam-m4", "A ferry leaves at 22:35 and arrives at 23:20. What is the travel time?", "\\text{depart}=22{:}35,\\quad \\text{arrive}=23{:}20", "45 min", ["45 minutes", "45min"]),
      timeAnswer("time-exam-m5", "Melbourne is UTC+10 and Perth is UTC+8. If it is 09:30 in Perth, what time is it in Melbourne?", "\\text{Perth (UTC+8)}=09{:}30,\\quad \\text{Melbourne}=\\text{UTC+10}", "11:30", ["11:30 am", "1130", "11.30 am"]),
      financeChoice("time-exam-m6", "A trip crosses the International Date Line. Which detail is most important?", "D", ["The seat number", "The ticket colour", "The meal choice", "The direction of crossing"], "Direction affects whether the date moves forward or back."),
      timeAnswer("time-exam-m7", "A city at UTC-3 is compared with UTC+2. If it is 10:00 at UTC-3, what time is it at UTC+2?", "\\text{UTC-3}=10{:}00", "15:00", ["3:00 pm", "1500", "3.00 pm"]),
      financeChoice("time-exam-m8", "Which mistake gives a bad timetable answer?", "B", ["Checking am/pm", "Subtracting minutes as decimals", "Using the same service row", "Checking midnight"], "Time uses 60 minutes per hour, not decimal place value."),
      timeAnswer("time-exam-m9", "A flight leaves at 21:20 and lasts 4 h 10 min. Ignoring time zones, what is the arrival time?", "\\text{depart}=21{:}20,\\quad \\text{duration}=4\\text{ h }10\\text{ min}", "01:30", ["1:30 am", "0130", "1.30 am"]),
      financeChoice("time-exam-m10", "If Sydney is observing daylight saving as UTC+11 and Perth is UTC+8, Sydney is:", "A", ["3 hours ahead", "2 hours ahead", "3 hours behind", "The same time"], "UTC+11 is 3 hours ahead of UTC+8."),
    ],
  };
}

