import type { PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { TwoWayTableDiagram, VennDiagram } from "../types";

type Visual = {
  prompt?: string;
  latex?: string;
  vennDiagram?: VennDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
};

const soccerVenn: VennDiagram = {
  description: "Venn diagram for 30 students: 11 play only soccer, 7 play both soccer and basketball, 8 play only basketball, and 4 play neither.",
  setALabel: "Soccer",
  setBLabel: "Basketball",
  aOnly: 11,
  intersection: 7,
  bOnly: 8,
  neither: 4,
  total: 30,
};

const musicVenn: VennDiagram = {
  description: "Venn diagram for 40 students: 8 like only music, 12 like both music and sport, 13 like only sport, and 7 like neither.",
  setALabel: "Music (A)",
  setBLabel: "Sport (B)",
  aOnly: 8,
  intersection: 12,
  bOnly: 13,
  neither: 7,
  total: 40,
};

const genericVenn: VennDiagram = {
  description: "Two overlapping sets A and B inside a universal set, showing the A-only, intersection, B-only and neither regions.",
  setALabel: "A",
  setBLabel: "B",
  aOnly: "A only",
  intersection: "A intersection B",
  bOnly: "B only",
  neither: "neither",
  showCounts: true,
};

function table(
  description: string,
  rowLabels: string[],
  columnLabels: string[],
  values: (number | string)[][],
  options: Partial<TwoWayTableDiagram> = {}
): TwoWayTableDiagram {
  return { description, rowLabels, columnLabels, values, ...options };
}

const yearTravelA = table(
  "Two-way table of travel method by year: Year 11 has 12 bus and 8 train students; Year 12 has 10 bus and 20 train students; 50 students in total.",
  ["Year 11", "Year 12"], ["Bus", "Train"], [[12, 8], [10, 20]],
  { rowTotals: [20, 30], columnTotals: [22, 28], grandTotal: 50 }
);

const yearTravelB = table(
  "Two-way table of travel method by year: Year 11 has 8 bus and 12 train students; Year 12 has 10 bus and 20 train students; 50 students in total.",
  ["Year 11", "Year 12"], ["Bus", "Train"], [[8, 12], [10, 20]],
  { rowTotals: [20, 30], columnTotals: [18, 32], grandTotal: 50 }
);

const visuals: Record<string, Visual> = {
  "prob-venn-g1": { prompt: "In the Venn diagram, which region represents A intersection B?", latex: "", vennDiagram: genericVenn },
  "prob-venn-g2": { prompt: "Use the Venn diagram to find how many students play only soccer.", latex: "", vennDiagram: soccerVenn },
  "prob-venn-g3": { prompt: "Use the Venn diagram to find how many students play neither sport.", latex: "", vennDiagram: soccerVenn },
  "prob-venn-g4": { prompt: "Use the Venn diagram to find the probability that a student plays both sports.", latex: "", vennDiagram: soccerVenn },
  "prob-venn-i1": { prompt: "In the Venn diagram, which regions together represent A union B?", latex: "", vennDiagram: genericVenn },
  "prob-venn-i2": {
    prompt: "Use the Venn diagram to find how many students play only basketball.", latex: "",
    vennDiagram: { ...soccerVenn, description: "Venn diagram with 15 basketball players in total, including 7 who also play soccer, so 8 are in the basketball-only region." },
  },
  "prob-venn-i3": { prompt: "In the Venn diagram, which regions represent the complement of A?", latex: "", vennDiagram: genericVenn },
  "prob-venn-i4": { prompt: "Use the Venn diagram to find the probability of soccer or basketball.", latex: "", vennDiagram: soccerVenn },
  "prob-venn-i5": { prompt: "Use the Venn diagram to find the probability of neither sport.", latex: "", vennDiagram: soccerVenn },
  "prob-venn-m1": { prompt: "Use the Venn diagram to explain why the intersection is subtracted in the union formula.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m2": { prompt: "Use the Venn diagram to find the number who like only music.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m3": { prompt: "Use the Venn diagram to find the number who like only sport.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m4": { prompt: "Use the Venn diagram to find the number who like neither music nor sport.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m5": { prompt: "Use the Venn diagram to find the probability of music or sport.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m6": { prompt: "Use the Venn diagram to find the probability of neither music nor sport.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m7": { prompt: "Which event is represented by the region outside both circles?", latex: "", vennDiagram: genericVenn },
  "prob-venn-m8": { prompt: "Use the Venn diagram to find the probability of A intersection B.", latex: "", vennDiagram: musicVenn },
  "prob-venn-m9": { prompt: "Use the Venn diagram to find how many students are in neither set.", latex: "", vennDiagram: { ...musicVenn, description: "Venn diagram for 50 students: 12 in A only, 8 in both A and B, 7 in B only, with the neither region to be determined.", aOnly: 12, intersection: 8, bOnly: 7, neither: "?", total: 50 } },
  "prob-venn-m10": { prompt: "Use the Venn diagram to interpret the complement A prime.", latex: "", vennDiagram: { ...genericVenn, total: 40, aOnly: "20 in A", intersection: "included in A", bOnly: "outside A", neither: "outside A" } },

  "prob-table-g1": { prompt: "Use the two-way table to find the total number of students.", latex: "", twoWayTableDiagram: yearTravelA },
  "prob-table-g2": { prompt: "Use the two-way table to find the probability of Year 11 and bus.", latex: "", twoWayTableDiagram: { ...yearTravelA, highlight: { kind: "cell", rowIndex: 0, columnIndex: 0, label: "Year 11 and bus" } } },
  "prob-table-g3": { prompt: "In the two-way table, what does the highlighted Year 12 and walk cell represent?", latex: "", twoWayTableDiagram: table("Generic two-way table with the Year 12 and Walk cell highlighted.", ["Year 11", "Year 12"], ["Bus", "Walk"], [["—", "—"], ["—", "?"]], { highlight: { kind: "cell", rowIndex: 1, columnIndex: 1, label: "Year 12 and walk" } }) },
  "prob-table-g4": { prompt: "Use the frequency table to find the probability of soccer or netball.", latex: "", twoWayTableDiagram: table("Frequency table for 40 students: 14 choose soccer, 10 choose netball and 16 choose another sport.", ["Students"], ["Soccer", "Netball", "Other"], [[14, 10, 16]], { grandTotal: 40 }) },
  "prob-table-i1": { prompt: "Use the frequency table to find how many people were surveyed.", latex: "", twoWayTableDiagram: table("Cafe preference frequencies: 18 prefer tea, 22 prefer coffee and 10 prefer juice.", ["People"], ["Tea", "Coffee", "Juice"], [[18, 22, 10]], { grandTotal: 50 }) },
  "prob-table-i2": { prompt: "Use the highlighted table cell to find the probability of Year 11 and netball.", latex: "", twoWayTableDiagram: table("Table of 80 students with 20 in the Year 11 and netball cell.", ["Year 11", "Other year"], ["Netball", "Other sport"], [[20, "—"], ["—", "—"]], { grandTotal: 80, highlight: { kind: "cell", rowIndex: 0, columnIndex: 0 } }) },
  "prob-table-i3": { prompt: "Which table total is used for the probability that a randomly selected student is senior?", latex: "", twoWayTableDiagram: table("Generic two-way table with junior and senior row totals.", ["Junior", "Senior"], ["Category 1", "Category 2"], [["—", "—"], ["—", "—"]], { rowTotals: ["junior total", "senior total"], grandTotal: "all students", highlight: { kind: "row-total", rowIndex: 1 } }) },
  "prob-table-i4": { prompt: "Use the frequency table to find the probability of swimming.", latex: "", twoWayTableDiagram: table("Club membership frequencies: 16 tennis, 24 swimming and 20 athletics members.", ["Members"], ["Tennis", "Swimming", "Athletics"], [[16, 24, 20]], { grandTotal: 60, highlight: { kind: "cell", rowIndex: 0, columnIndex: 1 } }) },
  "prob-table-i5": { prompt: "Use the frequency table to find the probability that a student does not use public transport.", latex: "", twoWayTableDiagram: table("Travel-method frequencies for 100 students: 35 use public transport and 65 do not.", ["Students"], ["Public transport", "Not public transport"], [[35, 65]], { grandTotal: 100 }) },
  "prob-table-m1": { prompt: "Use the two-way table to find the grand total.", latex: "", twoWayTableDiagram: yearTravelB },
  "prob-table-m2": { prompt: "Use the two-way table to find the probability of Year 12 and train.", latex: "", twoWayTableDiagram: { ...yearTravelB, highlight: { kind: "cell", rowIndex: 1, columnIndex: 1 } } },
  "prob-table-m3": { prompt: "Use the two-way table to find the Year 11 row total.", latex: "", twoWayTableDiagram: { ...yearTravelB, highlight: { kind: "row", rowIndex: 0 } } },
  "prob-table-m4": { prompt: "Use the frequency table to find the probability of biking to school.", latex: "", twoWayTableDiagram: table("Travel frequencies for 60 students: 15 bike and 45 use another method.", ["Students"], ["Bike", "Other"], [[15, 45]], { grandTotal: 60 }) },
  "prob-table-m5": { prompt: "Which event uses the highlighted female and part-time cell directly?", latex: "", twoWayTableDiagram: table("Generic employment table with the Female and Part-time cell highlighted.", ["Female", "Male"], ["Full-time", "Part-time"], [["—", "cell"], ["—", "—"]], { highlight: { kind: "cell", rowIndex: 0, columnIndex: 1 } }) },
  "prob-table-m6": { prompt: "Use the frequency table to find the probability that a customer does not pay by card.", latex: "", twoWayTableDiagram: table("Payment frequencies for 100 customers: 45 pay by card and 55 use another method.", ["Customers"], ["Card", "Not card"], [[45, 55]], { grandTotal: 100 }) },
  "prob-table-m7": { prompt: "Use the frequency table to find the probability of soccer or netball.", latex: "", twoWayTableDiagram: table("Sport choices for 60 students: 18 soccer, 12 netball and 30 basketball.", ["Students"], ["Soccer", "Netball", "Basketball"], [[18, 12, 30]], { grandTotal: 60 }) },
  "prob-table-m8": { prompt: "Which table entry should be used to count all Year 12 students?", latex: "", twoWayTableDiagram: table("Generic travel table with the Year 12 row total highlighted.", ["Year 11", "Year 12"], ["Bus", "Train"], [["—", "—"], ["—", "—"]], { rowTotals: ["Year 11 total", "Year 12 total"], grandTotal: "all students", highlight: { kind: "row-total", rowIndex: 1 } }) },
  "prob-table-m9": { prompt: "Use the two-way table to find the probability that an order is a wrap.", latex: "", twoWayTableDiagram: table("Canteen orders: Year 11 has 14 wraps and 16 salads; Year 12 has 10 wraps and 20 salads.", ["Year 11", "Year 12"], ["Wrap", "Salad"], [[14, 16], [10, 20]], { rowTotals: [30, 30], columnTotals: [24, 36], grandTotal: 60, highlight: { kind: "column", columnIndex: 0 } }) },
  "prob-table-m10": { prompt: "Which missing entry is needed to find the probability of Year 12 and bus?", latex: "", twoWayTableDiagram: table("Travel table for 100 students with bus column total 35, Year 12 row total 48, and the Year 12 bus cell unknown.", ["Year 11", "Year 12"], ["Bus", "Other"], [["—", "—"], ["?", "—"]], { rowTotals: [52, 48], columnTotals: [35, 65], grandTotal: 100, highlight: { kind: "cell", rowIndex: 1, columnIndex: 0 } }) },
};

export function addYear11ProbabilityVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = visuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

export function addYear11ProbabilityWorkedVisual(
  example: WorkedExample,
  index: number,
  slug: string
): WorkedExample {
  if (slug === "venn-diagrams") {
    return { ...example, vennDiagram: index < 2 ? soccerVenn : genericVenn };
  }
  if (slug === "two-way-tables-probability") {
    return { ...example, twoWayTableDiagram: index === 0 ? yearTravelA : yearTravelB };
  }
  if (slug === "conditional-probability") {
    return { ...example, twoWayTableDiagram: yearTravelA };
  }
  return example;
}
