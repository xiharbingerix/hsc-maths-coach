import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { DIAGRAM_SPECS } from "./diagramRegistry";
import type {
  BarChartDiagram,
  BearingsDiagram,
  BoxPlotDiagram,
  CompositeSolidDiagram,
  CongruentTrianglesDiagram,
  DataTableDiagram,
  DotPlotDiagram,
  HistogramDiagram,
  LineAngleDiagram,
  NetworkDiagram,
  PlaneShapeDiagram,
  ScatterPlotDiagram,
  SectorDiagram,
  Solid3DDiagram,
  StemAndLeafDiagram,
  TriangleDiagram,
  TrianglePairDiagram,
} from "./types";

function hasVisual(item: object) {
  const fields = item as Record<string, unknown>;
  return DIAGRAM_SPECS.some((spec) => Boolean(fields[spec.field]));
}

function cleanMathText(value: string) {
  return value
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\(?:mathrm|operatorname)\{([^}]*)\}/g, "$1")
    .replace(/\\times/g, "×")
    .replace(/\$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function measurement(text: string, names: string[]) {
  const aliases = names.map((name) => name.replace(/\s+/g, "\\s+")).join("|");
  const match = text.match(
    new RegExp(
      `\\b(?:${aliases})\\b\\s*(?:of|is|=|measures?|has length)?\\s*(\\d+(?:\\.\\d+)?|[a-z])\\s*(mm|cm|m|km)?\\b`,
      "i"
    )
  );
  if (!match) return undefined;
  return `${match[1]}${match[2] ? ` ${match[2]}` : ""}`;
}

function degreeExpressions(text: string) {
  return [...text.matchAll(
    /(\(?\s*(?:(?:\d+\s*)?x(?:\s*[+-]\s*\d+)?|\d+(?:\.\d+)?)\s*\)?)\s*(?:°|\\circ)/gi
  )]
    .map((match) => `${match[1].replace(/[()\s]/g, "")}°`)
    .filter((value, index, values) => values.indexOf(value) === index);
}

function firstDegreeLabels(text: string) {
  return degreeExpressions(text).slice(0, 2);
}

function namedNumber(text: string, names: string[]) {
  const aliases = names.join("|");
  const match = text.match(new RegExp(`\\b(?:${aliases})\\b\\s*(?:=|is|of)?\\s*(-?\\d+(?:\\.\\d+)?)`, "i"));
  return match ? Number(match[1]) : undefined;
}

function boxPlotVisual(text: string): BoxPlotDiagram | null {
  if (!/\bbox(?:-and-whisker)? plots?\b|\bboxplots?\b/i.test(text)) return null;
  const makePlot = (source: string, label: string, fallbackMedian?: number, fallbackIqr?: number): BoxPlotDiagram["plots"][number] | null => {
    let min = namedNumber(source, ["min(?:imum)?"]);
    let q1 = namedNumber(source, ["q_?1", "first quartile"]);
    let median = namedNumber(source, ["median", "q_?2"]) ?? fallbackMedian;
    let q3 = namedNumber(source, ["q_?3", "third quartile"]);
    let max = namedNumber(source, ["max(?:imum)?"]);
    max ??= source.match(/\bmax(?:imum)?\b[^\d.;]{0,24}(-?\d+(?:\.\d+)?)/i)
      ? Number(source.match(/\bmax(?:imum)?\b[^\d.;]{0,24}(-?\d+(?:\.\d+)?)/i)![1])
      : undefined;
    const box = source.match(/\bbox\s+(?:from|spans?)\s*(-?\d+(?:\.\d+)?)\s+(?:to|–|—|-)\s*(-?\d+(?:\.\d+)?)/i);
    if (box) {
      q1 ??= Number(box[1]);
      q3 ??= Number(box[2]);
    }
    const iqr = namedNumber(source, ["iqr"]) ?? fallbackIqr;
    if (q1 !== undefined && q3 === undefined && iqr !== undefined) q3 = q1 + iqr;
    if (q3 !== undefined && q1 === undefined && iqr !== undefined) q1 = q3 - iqr;

    const skewRight = /\b(?:long(?:er)? right whisker|skewed? right|median (?:line )?(?:sitting |very )?(?:close|near) to q1)\b/i.test(source);
    const skewLeft = /\b(?:long(?:er)? left whisker|skewed? left|median (?:line )?(?:sitting |very )?(?:close|near) to q3)\b/i.test(source);
    const symmetric = /\b(?:symmetric|median (?:line )?(?:in|at) the centre|equal whiskers)\b/i.test(source);
    if ([q1, median, q3].every((value) => value === undefined) && (skewRight || skewLeft || symmetric)) {
      [min, q1, median, q3, max] = skewRight
        ? [0, 2, 3, 5, 10]
        : skewLeft
          ? [0, 5, 7, 8, 10]
          : [0, 2.5, 5, 7.5, 10];
    }
    if (q1 === undefined && min !== undefined && max !== undefined) q1 = min + (max - min) / 4;
    if (q3 === undefined && min !== undefined && max !== undefined) q3 = min + 3 * (max - min) / 4;
    if (median !== undefined && q1 !== undefined && q3 === undefined && symmetric) q3 = 2 * median - q1;
    if (median !== undefined && q3 !== undefined && q1 === undefined && symmetric) q1 = 2 * median - q3;
    if (median !== undefined && q1 === undefined && q3 === undefined) {
      const halfIqr = (iqr ?? 10) / 2;
      q1 = median - halfIqr;
      q3 = median + halfIqr;
    }
    if (q3 !== undefined && q1 === undefined && max !== undefined) q1 = q3 - Math.max(max - q3, 1) * 2;
    if (q1 === undefined || q3 === undefined) return null;
    median ??= skewRight ? q1 + (q3 - q1) / 3 : skewLeft ? q3 - (q3 - q1) / 3 : (q1 + q3) / 2;
    const spread = Math.max(q3 - q1, 1);
    min ??= skewLeft ? q1 - spread : q1 - spread / 2;
    max ??= skewRight ? q3 + spread : q3 + spread / 2;
    if (!(min <= q1 && q1 <= median && median <= q3 && q3 <= max)) return null;
    return { label, min, q1, median, q3, max };
  };

  let labelledSegments = [...text.matchAll(/\b(?:group|class|plot)\s+([A-Z])\b\s*:?\s*([\s\S]*?)(?=\b(?:group|class|plot)\s+[A-Z]\b|$)/gi)];
  if (labelledSegments.length < 2 && /\btwo delivery companies\b/i.test(text)) {
    labelledSegments = [...text.matchAll(/\b([AB])\s*:\s*([\s\S]*?)(?=\b[AB]\s*:|$)/g)];
  }
  const sharedMedian = /\b(?:share|same)\s+(?:a\s+)?median(?:\s+of)?\s*(\d+(?:\.\d+)?)/i.test(text)
    ? Number(text.match(/\b(?:share|same)\s+(?:a\s+)?median(?:\s+of)?\s*(\d+(?:\.\d+)?)/i)![1])
    : undefined;
  const sharedIqr = /\bboth have IQR\s*=\s*(\d+(?:\.\d+)?)/i.test(text)
    ? Number(text.match(/\bboth have IQR\s*=\s*(\d+(?:\.\d+)?)/i)![1])
    : undefined;
  const plots = labelledSegments.length >= 2
    ? labelledSegments.map((match) => makePlot(match[2], match[1].toUpperCase(), sharedMedian, sharedIqr)).filter((plot): plot is BoxPlotDiagram["plots"][number] => Boolean(plot))
    : [makePlot(text, "Data")].filter((plot): plot is BoxPlotDiagram["plots"][number] => Boolean(plot));
  if (plots.length === 0) return null;
  return {
    description: `${plots.length === 1 ? "Box plot" : "Side-by-side box plots"} showing ${plots.map((plot) => `${plot.label}: minimum ${plot.min}, first quartile ${plot.q1}, median ${plot.median}, third quartile ${plot.q3}, maximum ${plot.max}`).join("; ")}.`,
    plots,
    showValueLabels: true,
  };
}

function dataTableVisual(text: string): DataTableDiagram | null {
  if (!/\btable\b/i.test(text)) return null;
  const arrowPairs = [...text.matchAll(/\b([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)(?:\s+[A-Za-z]+)?\s*(?:→|->)\s*(?:[a-zA-Z]\s*=\s*)?\$?(-?\d+(?:\.\d+)?)/g)];
  if (arrowPairs.length >= 2) {
    const input = arrowPairs[0][1];
    return {
      description: `Value table pairing ${input}-values ${arrowPairs.map((match) => match[2]).join(", ")} with outputs ${arrowPairs.map((match) => match[3]).join(", ")}.`,
      columnHeaders: [input, ...arrowPairs.map((match) => match[2])],
      values: [["Output", ...arrowPairs.map((match) => match[3])]],
    };
  }
  const tuples = [...text.matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)];
  if (tuples.length >= 2) {
    return {
      description: `Value table containing coordinate pairs ${tuples.map((match) => `(${match[1]}, ${match[2]})`).join(", ")}.`,
      columnHeaders: ["x", ...tuples.map((match) => match[1])],
      values: [["y", ...tuples.map((match) => match[2])]],
    };
  }
  const yForX = text.match(/\by-values?\s+((?:-?\d+(?:\.\d+)?\s*,\s*)+-?\d+(?:\.\d+)?)\s+for\s+x\s*=\s*((?:-?\d+(?:\.\d+)?\s*,\s*)+-?\d+(?:\.\d+)?)/i);
  if (yForX) {
    const ys = yForX[1].match(/-?\d+(?:\.\d+)?/g) ?? [];
    const xs = yForX[2].match(/-?\d+(?:\.\d+)?/g) ?? [];
    if (xs.length === ys.length) {
      return {
        description: `Value table pairing x-values ${xs.join(", ")} with y-values ${ys.join(", ")}.`,
        columnHeaders: ["x", ...xs],
        values: [["y", ...ys]],
      };
    }
  }
  const frequencies = text.match(/\bfrequencies in a table are\s+((?:\d+(?:\.\d+)?\s*,\s*)+\d+(?:\.\d+)?)/i);
  if (frequencies) {
    const values = frequencies[1].match(/\d+(?:\.\d+)?/g) ?? [];
    return {
      description: `Frequency table with frequencies ${values.join(", ")}.`,
      columnHeaders: values.map((_, index) => `Category ${index + 1}`),
      values: [values],
    };
  }
  return null;
}

const numberWord: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
  seven: 7, eight: 8, nine: 9, ten: 10,
};

function dotPlotVisual(text: string): DotPlotDiagram | null {
  if (!/\bdot plot\b/i.test(text)) return null;
  const counts = new Map<number, number>();
  const add = (value: number, count: number) => {
    if (Number.isFinite(value) && Number.isInteger(count) && count > 0) counts.set(value, count);
  };
  for (const match of text.matchAll(/(\d+(?:\.\d+)?)\s*\(\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s*dots?\s*\)/gi)) {
    add(Number(match[1]), Number(match[2]) || numberWord[match[2].toLowerCase()]);
  }
  for (const match of text.matchAll(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+dots?\s+at\s+(?:the value\s+)?(\d+(?:\.\d+)?)/gi)) {
    add(Number(match[2]), Number(match[1]) || numberWord[match[1].toLowerCase()]);
  }
  for (const match of text.matchAll(/(\d+(?:\.\d+)?)\s*\(\s*[×x]\s*(\d+)\s*\)/gi)) add(Number(match[1]), Number(match[2]));
  if (counts.size === 0) {
    const centres = [...text.matchAll(/\b(?:around|near)\s+(\d+(?:\.\d+)?)/gi)].map((match) => Number(match[1]));
    for (const centre of centres) {
      add(centre - 1, 2);
      add(centre, 4);
      add(centre + 1, 2);
    }
  }
  if (counts.size < 2) return null;
  const entries = [...counts].sort((a, b) => a[0] - b[0]);
  return {
    description: `Dot plot with ${entries.map(([value, count]) => `${count} dot${count === 1 ? "" : "s"} at ${value}`).join(", ")}.`,
    min: entries[0][0],
    max: entries.at(-1)![0],
    counts: entries.map(([value, count]) => ({ value, count })),
  };
}

function barChartVisual(text: string): BarChartDiagram | null {
  if (!/\b(?:bar|column) (?:graph|chart)\b/i.test(text)) return null;
  const stimulus = text.split(/\b(?:what|which|find|calculate|how many|is this)\b/i)[0];
  const bars: BarChartDiagram["bars"] = [];
  for (const match of stimulus.matchAll(/(?:^|[:,;])\s*([A-Za-z][A-Za-z' -]{0,24}?)\s+\$?(\d+(?:\.\d+)?)(?=\s*(?:[,;.]|$))/g)) {
    const label = match[1].trim().replace(/^(?:and|then)\s+/i, "");
    if (!/^(?:from|to|of|at|total)$/i.test(label)) bars.push({ label, value: Number(match[2]) });
  }
  if (bars.length < 2) return null;
  return {
    description: `Column graph with ${bars.map((bar) => `${bar.label} at ${bar.value}`).join(", ")}.`,
    bars,
    valueAxisLabel: "Value",
    categoryAxisLabel: "Category",
  };
}

function scatterPlotVisual(text: string): ScatterPlotDiagram | null {
  if (!/\b(?:scatter(?:plot)?|bivariate|correlation|line of best fit)\b/i.test(text)) return null;
  const points = [...text.matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)]
    .map((match) => ({ x: Number(match[1]), y: Number(match[2]) }));
  if (points.length < 3) return null;
  return {
    description: `Scatter plot of the ${points.length} coordinate pairs supplied in the question.`,
    points,
    xAxisLabel: "x",
    yAxisLabel: "y",
    lineOfBestFit: /line of best fit|regression/i.test(text) ? "auto" : undefined,
  };
}

function sectorVisual(text: string): SectorDiagram | null {
  if (!/\bsector\b|\barc length\b/i.test(text)) return null;
  const degreeMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:°|\\circ)/);
  const radianMatch = text.match(/(?:angle|theta|θ)\s*(?:of|=|is)?\s*(?:(\d+(?:\.\d+)?)\s*)?(?:π|\\pi)(?:\s*\/\s*(\d+(?:\.\d+)?))?/i);
  let angleDegrees = degreeMatch ? Number(degreeMatch[1]) : undefined;
  if (angleDegrees === undefined && radianMatch) angleDegrees = 180 * Number(radianMatch[1] ?? 1) / Number(radianMatch[2] ?? 1);
  const radius = measurement(text, ["radius"]);
  if (angleDegrees === undefined || angleDegrees <= 0 || angleDegrees > 360) return null;
  return {
    description: `Circle sector with central angle ${angleDegrees}°${radius ? ` and radius ${radius}` : ""}.`,
    angleDegrees,
    angleLabel: `${angleDegrees}°`,
    radiusLabel: radius,
    showFullCircle: true,
    color: "blue",
  };
}

function stemAndLeafVisual(text: string): StemAndLeafDiagram | null {
  if (!/\bstem-and-leaf\b|\bstem and leaf\b/i.test(text)) return null;
  const rows = [...text.matchAll(/\b(\d+)\s*\|\s*((?:\d+\s+)*\d+)(?=\s*(?:,\s*\d+\s*\||\.|$))/g)]
    .map((match) => ({
      stem: Number(match[1]),
      leaves: match[2].trim().split(/\s+/).map(Number),
    }));
  if (rows.length === 0) {
    const stems = [...text.matchAll(/\bstems?\s*\(?((?:\d+\s*,\s*)+\d+)\)?/gi)]
      .flatMap((match) => match[1].match(/\d+/g) ?? [])
      .map(Number);
    if (stems.length === 0) return null;
    for (const stem of stems) rows.push({ stem, leaves: stem === Math.min(...stems) ? [2] : [1, 3, 5, 7] });
  }
  return {
    description: `Stem-and-leaf plot with ${rows.map((row) => `stem ${row.stem} and leaves ${row.leaves.join(", ")}`).join("; ")}.`,
    rows,
    keyText: `${rows[0].stem} | ${rows[0].leaves[0]} = ${rows[0].stem}${rows[0].leaves[0]}`,
    rightLabel: "Data",
  };
}

function solidVisual(text: string): Solid3DDiagram | null {
  if (
    /\b(?:composite|joined|attached|stacked|stepped|hollow|hole|removed|frustum|hemisphere|net|L-shaped|trapezoidal|submerged|overflow)\b/i.test(text) ||
    /\bbox\s+A\b[\s\S]*\bbox\s+B\b/i.test(text)
  ) return null;

  let solid: Solid3DDiagram["solid"] | null = null;
  if (/\btriangular prism\b/i.test(text)) solid = "triangularPrism";
  else if (/\b(?:rectangular prism|cuboid)\b/i.test(text)) solid = "rectangularPrism";
  else if (/\bsquare(?:-based)? pyramid\b/i.test(text)) solid = "squarePyramid";
  else if (/\bcylinder\b/i.test(text)) solid = "cylinder";
  else if (/\bcone\b/i.test(text)) solid = "cone";
  else if (/\bsphere\b/i.test(text)) solid = "sphere";
  else if (/\bcube\b/i.test(text)) solid = "cube";
  else if (/\bprism\b/i.test(text)) solid = "triangularPrism";
  if (!solid) return null;

  const labels: NonNullable<Solid3DDiagram["labels"]> = {};
  const radius = measurement(text, ["radius"]);
  const diameter = measurement(text, ["diameter"]);
  const height = measurement(text, ["perpendicular height", "vertical height", "height"]);
  const length = measurement(text, ["prism length", "length"]);
  const width = measurement(text, ["width"]);
  const slant = measurement(text, ["slant height", "slant"]);
  const base = measurement(text, ["base edge", "base side", "base"]);
  const side = measurement(text, ["side length", "edge length", "side", "edge"]);
  const crossSectionArea = text.match(/\bcross-section(?:al)? area\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)\s*(cm²|m²|cm\^2|m\^2)?/i);
  const dimensions = text.match(
    /(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s*(?:×|x|by)\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s*(?:×|x|by)\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i
  );
  const triangleLegs = numberPairAfter(text, /\b(?:legs?|shorter sides?)\b/i);
  const triangleHypotenuse = measurement(text, ["hypotenuse"]);

  if (radius) labels.radius = radius;
  if (diameter) labels.diameter = `d = ${diameter}`;
  if (height) labels.height = height;
  if (length) labels.length = length;
  if (width) labels.width = width;
  if (slant) labels.slant = slant;
  if (base) labels.base = base;
  if (crossSectionArea) labels.base = `A = ${crossSectionArea[1]}${crossSectionArea[2] ? ` ${crossSectionArea[2]}` : ""}`;
  if (solid === "cube" && side) labels.length = side;
  if (solid === "rectangularPrism" && dimensions) {
    const unit = dimensions[2] ?? dimensions[4] ?? dimensions[6] ?? "";
    labels.length ??= `${dimensions[1]}${unit ? ` ${unit}` : ""}`;
    labels.width ??= `${dimensions[3]}${unit ? ` ${unit}` : ""}`;
    labels.height ??= `${dimensions[5]}${unit ? ` ${unit}` : ""}`;
  }
  if (solid === "triangularPrism" && triangleLegs) {
    labels.base ??= triangleLegs.firstLabel;
    labels.height ??= triangleLegs.secondLabel;
    if (triangleHypotenuse) labels.slant ??= triangleHypotenuse;
  }

  const names: Record<Solid3DDiagram["solid"], string> = {
    rectangularPrism: "rectangular prism",
    cube: "cube",
    cylinder: "cylinder",
    cone: "cone",
    squarePyramid: "square-based pyramid",
    triangularPrism: "triangular prism",
    sphere: "sphere",
  };
  const details = Object.entries(labels).map(([name, value]) => `${name} ${value}`).join(", ");
  return {
    solid,
    labels,
    color: "blue",
    description: `Schematic ${names[solid]}${details ? ` labelled with ${details}` : ""}.`,
  };
}

function numberPairAfter(text: string, phrase: RegExp) {
  const match = text.match(
    new RegExp(`${phrase.source}[^\\d]{0,24}(\\d+(?:\\.\\d+)?)\\s*(mm|cm|m|km)?[^\\d]{0,18}(?:and|,|by|×|x)\\s*(\\d+(?:\\.\\d+)?)\\s*(mm|cm|m|km)?`, "i")
  );
  if (!match) return null;
  const unit1 = match[2] ?? match[4] ?? "";
  const unit2 = match[4] ?? match[2] ?? "";
  return {
    first: Number(match[1]),
    second: Number(match[3]),
    firstLabel: `${match[1]}${unit1 ? ` ${unit1}` : ""}`,
    secondLabel: `${match[3]}${unit2 ? ` ${unit2}` : ""}`,
  };
}

function triangleVisual(text: string): TriangleDiagram | null {
  const isRightTriangle = /\b(?:right triangle|right-angled triangle|right angled triangle|hypotenuse)\b/i.test(text);
  const isElevation = /\bangle of (?:elevation|depression)\b/i.test(text);
  const isSingleTriangle =
    /\btriangle\b/i.test(text) &&
    !/\bexterior angle\b/i.test(text) &&
    !/\b[a-c]\s*=\s*-?\d/.test(text) &&
    !/\b(?:two|pair of|congruent|similar)\s+triangles?\b/i.test(text) &&
    !/\btriangle\s+[A-Z]{3}\s*(?:≅|\\cong)\s*triangle\s+[A-Z]{3}\b/i.test(text);
  if (!isRightTriangle && !isElevation && !isSingleTriangle) return null;
  const candidateCheck =
    /\b(?:do|does)\b[^?.]*\bform a right-angled triangle\b|\b(?:student|person)\b[^.]*\b(?:right triangle|right-angled triangle)\b/i.test(text);
  const legs =
    numberPairAfter(text, /\b(?:legs?|shorter sides?)\b/i) ??
    numberPairAfter(text, /\bsides?\b/i) ??
    numberPairAfter(text, /\badds?\b/i);
  const claimedHypotenuse =
    /\b(?:student|person)\b[^.]*\b(?:says?|claims?|states?)\b[^.]*\bhypotenuse\b/i.test(text);
  const hypotenuse = claimedHypotenuse ? undefined : measurement(text, ["hypotenuse"]);
  const oneLeg = text.match(
    /\b(?:one|known|a)\s+(?:shorter side|leg)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i
  );
  const namedLegs = text.match(
    /\ba\s*=\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s*(?:,|and)\s*b\s*=\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i
  );
  const repeatedLeg = text.match(
    /\b(?:legs?|shorter sides?)\s+(?:of\s+)?(?:length\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\b/i
  );
  const sideTriple = text.match(
    /\b(?:sides?|triple)\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s*,\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i
  );
  const awayMatch = text.match(/\b(?:from\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s+away\b/i);
  const horizontalMatch = text.match(/\b(?:horizontal(?:ly)?(?: distance)?|distance)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i);
  const heightMatch = text.match(/\b(?:building|cliff|pole|tower|tree)\s+is\s+(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s+(?:high|tall)\b/i);
  const angles = firstDegreeLabels(text);
  const sideLabels: TriangleDiagram["sideLabels"] = {};
  if (legs) {
    sideLabels.AC = legs.firstLabel;
    sideLabels.BC = legs.secondLabel;
  }
  if (!legs && oneLeg) sideLabels.AC = `${oneLeg[1]}${oneLeg[2] ? ` ${oneLeg[2]}` : ""}`;
  if (!legs && !oneLeg && namedLegs) {
    const unit = namedLegs[2] ?? namedLegs[4] ?? "";
    sideLabels.AC = `${namedLegs[1]}${unit ? ` ${unit}` : ""}`;
    sideLabels.BC = `${namedLegs[3]}${unit ? ` ${unit}` : ""}`;
  }
  if (!legs && !oneLeg && repeatedLeg) {
    const label = `${repeatedLeg[1]}${repeatedLeg[2] ? ` ${repeatedLeg[2]}` : ""}`;
    sideLabels.AC = label;
    sideLabels.BC = label;
  }
  if (hypotenuse) sideLabels.AB = hypotenuse;
  if (sideTriple) {
    const unit = sideTriple[2] ?? sideTriple[4] ?? sideTriple[6] ?? "";
    sideLabels.AC = `${sideTriple[1]}${unit ? ` ${unit}` : ""}`;
    sideLabels.BC = `${sideTriple[3]}${unit ? ` ${unit}` : ""}`;
    sideLabels.AB = `${sideTriple[5]}${unit ? ` ${unit}` : ""}`;
  }
  const horizontal = awayMatch ?? horizontalMatch;
  if (horizontal) sideLabels.AB = `${horizontal[1]}${horizontal[2] ? ` ${horizontal[2]}` : ""}`;
  if (heightMatch) sideLabels.AC = `${heightMatch[1]}${heightMatch[2] ? ` ${heightMatch[2]}` : ""}`;
  if (!isRightTriangle && !isElevation) {
    const sideList = text.match(/\bsides?\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*,\s*(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(cm|m)?/i);
    if (sideList) {
      sideLabels.AB = `${sideList[1]}${sideList[4] ? ` ${sideList[4]}` : ""}`;
      sideLabels.AC = `${sideList[2]}${sideList[4] ? ` ${sideList[4]}` : ""}`;
      sideLabels.BC = `${sideList[3]}${sideList[4] ? ` ${sideList[4]}` : ""}`;
    }
    let angleLabels = [...text.matchAll(/(\(?\s*(?:(?:\d+\s*)?x(?:\s*[+-]\s*\d+)?|\d+(?:\.\d+)?)\s*\)?)\s*(?:°|\\circ)/gi)]
      .map((match) => `${match[1].replace(/\s+/g, "")}°`)
      .filter((value, index, values) => values.indexOf(value) === index)
      .slice(0, 3);
    if (angleLabels.length === 0) {
      const angleClause = text.match(/\bangles?\s+((?:\(?\s*(?:\d*x|x)(?:\s*[+-]\s*\d+)?\s*\)?\s*(?:,|and)\s*){2}\(?\s*(?:\d*x|x)(?:\s*[+-]\s*\d+)?\s*\)?)/i);
      angleLabels = angleClause
        ? (angleClause[1].match(/\(?\s*(?:\d*x|x)(?:\s*[+-]\s*\d+)?\s*\)?/gi) ?? []).map((value) => `${value.replace(/[()\s]/g, "")}°`)
        : [];
    }
    if (angleLabels.length === 0) {
      const ratio = text.match(/\bangles?[^.;]*?\bratio\s+(\d+)\s*:\s*(\d+)\s*:\s*(\d+)/i);
      if (ratio) angleLabels = [`${ratio[1]}x°`, `${ratio[2]}x°`, `${ratio[3]}x°`];
    }
    if (angleLabels.length === 0 && !sideList) return null;
    return {
      description: `Triangle${Object.keys(sideLabels).length ? ` with side labels ${Object.values(sideLabels).join(", ")}` : ""}${angleLabels.length ? ` and angle labels ${angleLabels.join(", ")}` : ""}.`,
      vertices: { A: { x: 1, y: 4 }, B: { x: 0, y: 0 }, C: { x: 6, y: 0 } },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels,
      angleLabels: angleLabels.length
        ? { A: angleLabels[0], B: angleLabels[1], C: angleLabels[2] }
        : undefined,
    };
  }
  const namedRightAngle = text.match(/\bright angle\s+(?:is\s+)?at\s+(?:vertex\s+)?([ABC])\b/i)?.[1].toUpperCase() as
    | "A"
    | "B"
    | "C"
    | undefined;
  const rightAngleAt = candidateCheck ? undefined : namedRightAngle ?? (isElevation ? "A" : "C");
  const vertices = rightAngleAt === "A"
    ? { A: { x: 0, y: 4 }, B: { x: 7, y: 4 }, C: { x: 0, y: 0 } }
    : rightAngleAt === "B"
      ? { A: { x: 0, y: 4 }, B: { x: 7, y: 4 }, C: { x: 7, y: 0 } }
      : { A: { x: 0, y: 0 }, B: { x: 7, y: 4 }, C: { x: 0, y: 4 } };
  return {
    description: `${candidateCheck ? "Triangle to be tested" : `${isElevation ? "Line-of-sight" : "Right-angled"} triangle`}${legs ? ` with supplied sides ${legs.firstLabel} and ${legs.secondLabel}` : ""}${horizontal ? ` with horizontal distance ${sideLabels.AB}` : ""}${heightMatch ? ` and vertical height ${sideLabels.AC}` : ""}${hypotenuse ? ` and hypotenuse ${hypotenuse}` : ""}${angles[0] ? `; the ground angle is ${angles[0]}` : ""}.`,
    vertices,
    vertexLabels: { A: "A", B: "B", C: "C" },
    sideLabels,
    angleLabels: angles[0] ? { B: angles[0] } : undefined,
    rightAngleAt,
  };
}

function trianglePairVisual(text: string): TrianglePairDiagram | null {
  const sideComparison = text.match(
    /\bsides?\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+and\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*,?\s+or\s+sides?\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+and\s+(\d+(?:\.\d+)?)\s*(cm|m)?/i
  );
  const scaledPair = text.match(
    /\b(?:sides?\s+are\s+)?(?:tripled|doubled|scaled)[^.;]*?\bfrom\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+and\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+to\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+and\s+(\d+(?:\.\d+)?)\s*(cm|m)?/i
  );
  const comparison = sideComparison ?? scaledPair;
  if (comparison) {
    const unit = comparison[5] ?? "";
    const make = (first: string, second: string): TriangleDiagram => ({
      description: `Right triangle with perpendicular sides ${first}${unit ? ` ${unit}` : ""} and ${second}${unit ? ` ${unit}` : ""}.`,
      vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 4 }, C: { x: 0, y: 4 } },
      sideLabels: {
        AC: `${first}${unit ? ` ${unit}` : ""}`,
        BC: `${second}${unit ? ` ${unit}` : ""}`,
        AB: "?",
      },
      rightAngleAt: "C",
    });
    return {
      description: `Two right triangles with perpendicular side pairs ${comparison[1]} and ${comparison[2]}, then ${comparison[3]} and ${comparison[4]}.`,
      left: make(comparison[1], comparison[2]),
      right: make(comparison[3], comparison[4]),
      leftCaption: sideComparison ? "First triangle" : "Before",
      rightCaption: sideComparison ? "Second triangle" : "After",
      relationLabel: "compare",
    };
  }
  const pair = text.match(/\b(?:bracket|sail)\s+([A-Z])[^.;]*?(?:sides|shorter sides)\s+(\d+(?:\.\d+)?)\s*(cm|m)?\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(cm|m)?(?:\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(cm|m)?)?[\s\S]*?\b(?:bracket|sail)\s+([A-Z])[^.;]*?(?:sides|shorter sides)\s+(\d+(?:\.\d+)?)\s*(cm|m)?\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(cm|m)?(?:\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(cm|m)?)?/i);
  if (!pair) return null;
  const make = (first: string, second: string, third: string | undefined, unit: string | undefined): TriangleDiagram => ({
    description: `Right-triangle candidate with labelled sides ${[first, second, third].filter(Boolean).join(", ")}${unit ? ` ${unit}` : ""}.`,
    vertices: { A: { x: 0, y: 4 }, B: { x: 0, y: 0 }, C: { x: 6, y: 0 } },
    sideLabels: { AB: `${first}${unit ? ` ${unit}` : ""}`, BC: `${second}${unit ? ` ${unit}` : ""}`, AC: third ? `${third}${unit ? ` ${unit}` : ""}` : undefined },
    rightAngleAt: "B",
  });
  return {
    description: `Two triangular items ${pair[1]} and ${pair[8]} shown side by side with their supplied side lengths.`,
    left: make(pair[2], pair[4], pair[6], pair[3] ?? pair[5] ?? pair[7]),
    right: make(pair[9], pair[11], pair[13], pair[10] ?? pair[12] ?? pair[14]),
    leftCaption: pair[1],
    rightCaption: pair[8],
    relationLabel: "compare",
  };
}

function histogramVisual(text: string): HistogramDiagram | null {
  if (!/\bhistogram\b/i.test(text)) return null;
  const clusters = [...text.matchAll(/\bbetween\s+(\d+(?:\.\d+)?)\s+and\s+(\d+(?:\.\d+)?)/gi)];
  if (clusters.length < 2) return null;
  const bins: HistogramDiagram["bins"] = [];
  for (const [index, cluster] of clusters.entries()) {
    const low = Number(cluster[1]);
    const high = Number(cluster[2]);
    if (index > 0) {
      const previousHigh = Number(clusters[index - 1][2]);
      if (low > previousHigh) bins.push({ label: `${previousHigh}–${low}`, frequency: 1 });
    }
    bins.push({ label: `${low}–${high}`, frequency: 6 });
  }
  return {
    description: `Bimodal histogram with high-frequency intervals ${clusters.map((match) => `${match[1]} to ${match[2]}`).join(" and ")} and very few values between them.`,
    bins,
    frequencyAxisLabel: "Frequency",
  };
}

function compositeSolidVisual(text: string): CompositeSolidDiagram | null {
  if (!/\b(?:composite|combined|joined|stacked|stepped|sits|placed on top|removed|hole|staircase|tiers?)\b/i.test(text)) return null;
  const dimensions = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:cm)?\s*(?:×|x|by)\s*(\d+(?:\.\d+)?)\s*(?:cm)?\s*(?:×|x|by)\s*(\d+(?:\.\d+)?)\s*(?:cm)?/gi)]
    .map((match) => ({ length: Number(match[1]), width: Number(match[2]), height: Number(match[3]) }));
  if (/\b(?:three|3)\s+(?:rectangular )?prisms|\bstaircase\b|\btiers?\b/i.test(text) && dimensions.length >= 3) {
    const joints = [...text.matchAll(/\bjoint[^=]*=\s*(\d+(?:\.\d+)?)\s*cm²/gi)].map((match) => Number(match[1]));
    return {
      description: `Three stacked rectangular prisms with dimensions ${dimensions.slice(0, 3).map((value) => `${value.length} by ${value.width} by ${value.height} centimetres`).join("; ")}.`,
      unit: "cm",
      kind: "threeStepRectangularPrisms",
      levels: [dimensions[0], dimensions[1], dimensions[2]],
      jointAreas: joints.length >= 2 ? [joints[0], joints[1]] : undefined,
    };
  }
  const cylinders = [...text.matchAll(/\b(?:radius|r)\s*(?:=|of|is)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?[^.;]*?\bheight\s*(?:=|of|is)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?/gi)]
    .map((match) => ({ radius: Number(match[1]), height: Number(match[2]) }));
  const hollowCylinder = text.match(
    /\bcylinder[^.;]*?\bradius\s*(?:=|of|is)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?[^.;]*?\bheight\s*(?:=|of|is)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?[^.;]*?\b(?:hole|cylinder)[^.;]*?\bradius\s*(?:=|of|is)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?/i
  );
  if (hollowCylinder) {
    return {
      description: `Hollow cylinder with outer radius ${hollowCylinder[1]}, inner radius ${hollowCylinder[3]} and length ${hollowCylinder[2]}.`,
      unit: "cm",
      kind: "hollowCylinder",
      outerRadius: Number(hollowCylinder[1]),
      innerRadius: Number(hollowCylinder[3]),
      length: Number(hollowCylinder[2]),
    };
  }
  if (/\b(?:two|2)\s+(?:closed )?cylinders\b/i.test(text) && cylinders.length >= 2) {
    return {
      description: `Two joined cylinders with radii ${cylinders[0].radius} and ${cylinders[1].radius} centimetres and heights ${cylinders[0].height} and ${cylinders[1].height} centimetres.`,
      unit: "cm",
      kind: "stackedCylinders",
      lower: cylinders[0],
      upper: cylinders[1],
    };
  }
  if (/\b(?:pipe|cylindrical hole|cylinder[^.;]*\bremoved)\b/i.test(text) && cylinders.length >= 2) {
    return {
      description: `Hollow cylinder with outer radius ${cylinders[0].radius}, inner radius ${cylinders[1].radius} and length ${cylinders[0].height}.`,
      unit: "cm",
      kind: "hollowCylinder",
      outerRadius: cylinders[0].radius,
      innerRadius: cylinders[1].radius,
      length: cylinders[0].height,
    };
  }
  if (dimensions.length >= 2 && /\b(?:hole|removed|cut out|void)\b/i.test(text)) {
    return {
      description: `Rectangular prism ${dimensions[0].length} by ${dimensions[0].width} by ${dimensions[0].height} with a ${dimensions[1].length} by ${dimensions[1].width} by ${dimensions[1].height} rectangular void.`,
      unit: "cm",
      kind: "rectangularPrismWithVoid",
      outer: dimensions[0],
      void: dimensions[1],
      voidStyle: /\bhole\b|\bthrough\b/i.test(text) ? "throughHole" : "cornerCutout",
    };
  }
  if (dimensions.length >= 2 && /\b(?:two|small|large|lower|upper|stepped|prism a|prism b)\b/i.test(text)) {
    return {
      description: `Two joined rectangular prisms with dimensions ${dimensions[0].length} by ${dimensions[0].width} by ${dimensions[0].height} centimetres and ${dimensions[1].length} by ${dimensions[1].width} by ${dimensions[1].height} centimetres.`,
      unit: "cm",
      kind: "stackedRectangularPrisms",
      lower: dimensions[0],
      upper: dimensions[1],
      placement: /\bcentred\b/i.test(text) ? "centred" : "end",
    };
  }
  const roof = text.match(/\btriangular prism[\s\S]*?\bcross-section[\s\S]*?\bbase\s*(\d+(?:\.\d+)?)\s*cm[\s\S]*?\bheight\s*(\d+(?:\.\d+)?)\s*cm[\s\S]*?\b(?:prism is|length)\s*(\d+(?:\.\d+)?)\s*cm/i);
  if (dimensions.length >= 1 && roof && /\b(?:on top|base with a triangular prism)\b/i.test(text)) {
    return {
      description: `Rectangular prism ${dimensions[0].length} by ${dimensions[0].width} by ${dimensions[0].height} centimetres with a triangular prism on top; its triangular cross-section has base ${roof[1]} and height ${roof[2]} centimetres and length ${roof[3]} centimetres.`,
      unit: "cm",
      kind: "triangularPrismOnRectangularPrism",
      base: dimensions[0],
      triangularPrism: { crossSectionArea: Number(roof[1]) * Number(roof[2]) / 2, length: Number(roof[3]) },
    };
  }
  const removed = text.match(/\b(\d+(?:\.\d+)?)\s+by\s+(\d+(?:\.\d+)?)\s+by\s+(\d+(?:\.\d+)?)\s+prism has a\s+(\d+(?:\.\d+)?)\s+by\s+(\d+(?:\.\d+)?)\s+by\s+(\d+(?:\.\d+)?)\s+piece removed/i);
  if (removed) {
    return {
      description: `Rectangular prism ${removed[1]} by ${removed[2]} by ${removed[3]} with a ${removed[4]} by ${removed[5]} by ${removed[6]} corner piece removed.`,
      unit: "cm",
      kind: "rectangularPrismWithVoid",
      outer: { length: Number(removed[1]), width: Number(removed[2]), height: Number(removed[3]) },
      void: { length: Number(removed[4]), width: Number(removed[5]), height: Number(removed[6]) },
      voidStyle: "cornerCutout",
    };
  }
  return null;
}

function exteriorTriangleVisual(text: string): LineAngleDiagram | null {
  if (!/\bexterior angle\b/i.test(text) || !/\btriangle\b/i.test(text)) return null;
  const exterior = text.match(
    /\bexterior angle(?:\s+of\s+(?:a|the)\s+triangle)?\s*(?:is|=|of)?\s*(\(?\s*(?:(?:\d+\s*)?x(?:\s*[+-]\s*\d+)?|\d+(?:\.\d+)?)\s*\)?)\s*(?:°|\\circ)/i
  )?.[1];
  const namedB = text.match(/(?:∠|\\angle\s*)ABC\s*=\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i)?.[1];
  const namedA = text.match(/(?:∠|\\angle\s*)BAC\s*=\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i)?.[1];
  const nonAdjacent = text.match(/\b(?:non-adjacent|opposite) interior angle[^.;,]*?(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i)?.[1];
  const expressions = degreeExpressions(text);
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  const exteriorLabel = exterior ? `${exterior.replace(/[()\s]/g, "")}°` : undefined;
  const remaining = expressions.filter((label) => label !== exteriorLabel);
  const labelA = namedA ? `${namedA}°` : remaining[0];
  const labelB = namedB ? `${namedB}°` : nonAdjacent ? `${nonAdjacent}°` : remaining[1];
  if (labelA) angles.push({ vertex: "A", from: "B", to: "C", label: labelA });
  if (labelB) angles.push({ vertex: "B", from: "A", to: "C", label: labelB });
  if (exteriorLabel) angles.push({ vertex: "C", from: "A", to: "D", label: exteriorLabel, highlighted: true });
  return {
    description: `Triangle ABC with side BC extended to D to form an exterior angle at C${angles.length ? `; shown angle labels are ${angles.map((angle) => angle.label).join(", ")}` : ""}.`,
    points: [
      { id: "A", x: 2.5, y: 4, label: "A" },
      { id: "B", x: 0, y: 0, label: "B" },
      { id: "C", x: 5, y: 0, label: "C" },
      { id: "D", x: 8, y: 0, label: "D" },
    ],
    segments: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "B", to: "D" }],
    angles: angles.length ? angles : undefined,
    viewBox: "-1 -1 10 7",
  };
}

function congruentTrianglesVisual(text: string): CongruentTrianglesDiagram | null {
  if (!/\b(?:congruent triangles?|two (?:right(?:-angled)? )?triangles?|triangle\s+[A-Z]{3}\s+is congruent to triangle\s+[A-Z]{3}|corresponding angles? and .*corresponding sides?)\b/i.test(text)) return null;
  if (/\b(?:NOT a valid congruence test|AAA proves)\b/i.test(text)) return null;
  const isRight = /\bright(?:-angled)? triangles?\b/i.test(text);
  const leftLabels = text.match(/\btriangle\s+([A-Z])([A-Z])([A-Z])\b/i)?.slice(1, 4) ?? ["A", "B", "C"];
  const rightLabels = text.match(/(?:≅|\\cong)\s*(?:triangle\s+)?([A-Z])([A-Z])([A-Z])\b/i)?.slice(1, 4) ?? ["D", "E", "F"];
  const baseTriangle = (
    labels: string[],
    sideLabels?: TriangleDiagram["sideLabels"]
  ): TriangleDiagram => ({
    description: `Triangle ${labels.join("")}${isRight ? " with a right angle" : ""}.`,
    vertices: { A: { x: 1, y: 4 }, B: { x: 0, y: 0 }, C: { x: 6, y: 0 } },
    vertexLabels: { A: labels[0], B: labels[1], C: labels[2] },
    sideLabels,
    sideTicks: { AB: 1, BC: 2, AC: 3 },
    rightAngleAt: isRight ? "B" : undefined,
  });
  const namedSide = text.match(/\b([A-Z])([A-Z])\s*=\s*(\d+(?:\.\d+)?)/);
  const leftSideLabels: TriangleDiagram["sideLabels"] = {};
  if (namedSide) {
    const pair = `${namedSide[1]}${namedSide[2]}`;
    const localPairs: Array<[string, keyof NonNullable<TriangleDiagram["sideLabels"]>]> = [
      [`${leftLabels[0]}${leftLabels[1]}`, "AB"],
      [`${leftLabels[1]}${leftLabels[2]}`, "BC"],
      [`${leftLabels[0]}${leftLabels[2]}`, "AC"],
    ];
    const target = localPairs.find(([letters]) => letters === pair || [...letters].reverse().join("") === pair)?.[1];
    if (target) leftSideLabels[target] = namedSide[3];
  }
  return {
    description: `Two congruent triangles ${leftLabels.join("")} and ${rightLabels.join("")}, with matching side marks showing the correspondence.`,
    left: baseTriangle(leftLabels, leftSideLabels),
    right: baseTriangle(rightLabels),
    leftCaption: `△${leftLabels.join("")}`,
    rightCaption: `△${rightLabels.join("")}`,
  };
}

function trapezoidVisual(text: string): PlaneShapeDiagram | null {
  if (!/\b(?:trapezoid|trapezium)\b/i.test(text)) return null;
  const sides = numberPairAfter(text, /\bparallel sides?\b/i);
  const baseAngle = text.match(/\bbase angles?\s*(?:of|=|are)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && !baseAngle) return null;
  const height = measurement(text, ["perpendicular height", "height"]);
  const h = height ? Number.parseFloat(height) : sides ? Math.max(2, Math.min(sides.first, sides.second) / 2) : 3;
  const bottom = sides ? Math.max(sides.first, sides.second) : 8;
  const top = sides ? Math.min(sides.first, sides.second) : 5;
  const bottomLabel = sides ? (sides.first >= sides.second ? sides.firstLabel : sides.secondLabel) : undefined;
  const topLabel = sides ? (sides.first >= sides.second ? sides.secondLabel : sides.firstLabel) : undefined;
  const inset = Math.max(0.5, (bottom - top) / 2);
  return {
    description: `Trapezium${sides ? ` with parallel sides ${sides.firstLabel} and ${sides.secondLabel}` : ""}${baseAngle ? ` with equal base angles ${baseAngle[1]}°` : ""}${height ? ` and perpendicular height ${height}` : ""}.`,
    vertices: [
      { x: 0, y: 0, label: "A", rightAngle: Boolean(height), angleLabel: baseAngle ? `${baseAngle[1]}°` : undefined },
      { x: bottom, y: 0, label: "B", angleLabel: baseAngle ? `${baseAngle[1]}°` : undefined },
      { x: inset + top, y: h, label: "C" },
      { x: inset, y: h, label: "D", rightAngle: Boolean(height) },
    ],
    edges: [
      { label: bottomLabel, arrows: 1 },
      {},
      { label: topLabel, arrows: 1 },
      height ? { label: height } : {},
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function rhombusVisual(text: string): LineAngleDiagram | PlaneShapeDiagram | null {
  if (!/\brhombus\b/i.test(text)) return null;
  const diagonals = numberPairAfter(text, /\bdiagonals?\b/i);
  const side = measurement(text, ["sides of length", "side length", "each side", "side"]);
  if (diagonals) {
    return {
      description: `Rhombus with perpendicular diagonals ${diagonals.firstLabel} and ${diagonals.secondLabel}.`,
      points: [
        { id: "A", x: 0, y: diagonals.second / 2, label: "A" },
        { id: "B", x: diagonals.first / 2, y: 0, label: "B" },
        { id: "C", x: 0, y: -diagonals.second / 2, label: "C" },
        { id: "D", x: -diagonals.first / 2, y: 0, label: "D" },
        { id: "O", x: 0, y: 0, label: "O" },
      ],
      segments: [
        { from: "A", to: "B", ticks: 1 }, { from: "B", to: "C", ticks: 1 },
        { from: "C", to: "D", ticks: 1 }, { from: "D", to: "A", ticks: 1 },
        { from: "A", to: "C", label: diagonals.secondLabel },
        { from: "B", to: "D", label: diagonals.firstLabel },
      ],
      angles: [{ vertex: "O", from: "A", to: "B", rightAngle: true }],
    };
  }
  if (/\bdiagonal/i.test(text)) {
    const expressions = degreeExpressions(text);
    const showsBoth =
      /\bdiagonals\b|\bintersect\b|\bperpendicular\b|\bangle\s+AOB\b|\bother diagonal\b/i.test(text);
    const diagonalFromA = /\bdiagonal\s+(?:AC|from A)\b|\bbisects?\b/i.test(text);
    const segments: LineAngleDiagram["segments"] = [
      { from: "A", to: "B", ticks: 1 },
      { from: "B", to: "C", ticks: 1 },
      { from: "C", to: "D", ticks: 1 },
      { from: "D", to: "A", ticks: 1 },
    ];
    if (showsBoth || diagonalFromA) segments.push({ from: "A", to: "C" });
    if (showsBoth) segments.push({ from: "B", to: "D" });
    const angles: NonNullable<LineAngleDiagram["angles"]> = [];
    const equalParts = text.match(
      /\b(?:two equal parts? of|half-angle is|parts? of)\s*(\(?\s*(?:(?:\d+\s*)?x(?:\s*[+-]\s*\d+)?|\d+(?:\.\d+)?)\s*\)?)\s*(?:°|\\circ)/i
    );
    const eachParts = text.match(
      /\b(\d+(?:\.\d+)?)\s*(?:°|\\circ)\s+each\b/i
    );
    const halfLabel = equalParts
      ? `${equalParts[1].replace(/[()\s]/g, "")}°`
      : eachParts
        ? `${eachParts[1]}°`
        : undefined;
    if (halfLabel) {
      angles.push({ vertex: "A", from: "D", to: "O", label: halfLabel, marks: 1 });
      angles.push({ vertex: "A", from: "O", to: "B", label: halfLabel, marks: 1 });
      const fullVertexAngle = text.match(
        /\bfull vertex angle\s+(?:is|=)\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i
      )?.[1];
      if (fullVertexAngle) {
        angles.push({
          vertex: "A",
          from: "D",
          to: "B",
          label: `${fullVertexAngle}°`,
          radius: 42,
        });
      }
    } else if (expressions[0] && /\bmakes?\b[^.]*\bangle with a side\b/i.test(text)) {
      angles.push({ vertex: "A", from: "O", to: "B", label: expressions[0] });
    } else if (expressions[0] && /\bbisects?\b/i.test(text)) {
      angles.push({ vertex: "A", from: "D", to: "B", label: expressions.at(-1) });
    }
    if (showsBoth) {
      angles.push({ vertex: "O", from: "A", to: "B", rightAngle: true });
    }
    return {
      description: `Rhombus ABCD${showsBoth ? " with diagonals AC and BD intersecting at O" : " with diagonal AC bisecting angle A"}${expressions.length ? `; supplied angle labels ${expressions.join(", ")}` : ""}.`,
      points: [
        { id: "A", x: 0, y: 3, label: "A" },
        { id: "B", x: 5, y: 0, label: "B" },
        { id: "C", x: 0, y: -3, label: "C" },
        { id: "D", x: -5, y: 0, label: "D" },
        { id: "O", x: 0, y: 0, label: "O" },
      ],
      segments,
      angles: angles.length ? angles : undefined,
    };
  }
  const degrees = [...text.matchAll(/(?:\(|\b)(\d+(?:\.\d+)?)\s*(?:°|\\circ)/g)].map((match) => `${match[1]}°`);
  return {
    description: `Rhombus with four equal sides${side ? ` of length ${side}` : ""}${degrees[0] ? ` and one angle ${degrees[0]}` : ""}.`,
    vertices: [
      { x: 0, y: 3, label: "A", angleLabel: degrees[0] },
      { x: 5, y: 0, label: "B" },
      { x: 0, y: -3, label: "C" },
      { x: -5, y: 0, label: "D" },
    ],
    edges: [
      { label: side, ticks: 1 }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 },
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function quadrilateralVisual(text: string): PlaneShapeDiagram | null {
  if (!/\bquadrilateral\b/i.test(text)) return null;
  const stimulus = text.split(/\b(?:find|calculate|what|which)\b/i)[0];
  const tokens = degreeExpressions(stimulus).slice(0, 4);
  const ratio = text.match(/ratio\s+(\d+)\s*:\s*(\d+)\s*:\s*(\d+)\s*:\s*(\d+)/i);
  const labels = ratio
    ? ratio.slice(1, 5).map((value) => `${value === "1" ? "x" : `${value}x`}°`)
    : tokens.length === 3 ? [...tokens, "?"] : tokens;
  return {
    description: `Quadrilateral${labels.length ? ` with consecutive interior-angle labels ${labels.join(", ")}` : " illustrating its four interior angles"}.`,
    vertices: [
      { x: 0, y: 0, label: "A", angleLabel: labels[0] },
      { x: 7, y: 0.5, label: "B", angleLabel: labels[1] },
      { x: 5.5, y: 5, label: "C", angleLabel: labels[2] },
      { x: 0.5, y: 4, label: "D", angleLabel: labels[3] },
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function regularPolygonVisual(text: string): PlaneShapeDiagram | null {
  if (!/\b(?:regular )?polygon\b/i.test(text)) return null;
  // Inferring the polygon from its angle would draw the very side count the
  // student is being asked to determine, so keep those formula questions text-only.
  if (/\b(?:how many sides|number of sides|find (?:the )?(?:number of )?sides)\b/i.test(text)) return null;
  let sides: number | undefined;
  const explicit = text.match(/\b(\d+)\s*(?:-| )sided\s+polygon\b|\bpolygon\s+has\s+(\d+)\s+(?:equal\s+)?sides\b/i);
  if (explicit) sides = Number(explicit[1] ?? explicit[2]);
  const exterior = text.match(/\bexterior angle(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && exterior) sides = 360 / Number(exterior[1]);
  const interior = text.match(/\binterior angle(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && interior) sides = 360 / (180 - Number(interior[1]));
  const sum = text.match(/\binterior angle sum(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && sum) sides = Number(sum[1]) / 180 + 2;
  if (!sides || !Number.isInteger(sides) || sides < 3 || sides > 30) return null;
  const side = measurement(text, ["sides of length", "side length", "each side", "side"]);
  const radius = 5;
  const angleLabel = interior ? `${interior[1]}°` : undefined;
  const angleDescription = interior
    ? ` and interior angle ${interior[1]}°`
    : exterior
      ? ` with exterior angle ${exterior[1]}° given in the question`
      : "";
  return {
    description: `Regular ${sides}-sided polygon${side ? ` with side length ${side}` : ""}${angleDescription}.`,
    vertices: Array.from({ length: sides }, (_, index) => {
      const angle = Math.PI / 2 + (2 * Math.PI * index) / sides;
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), angleLabel: index === 0 ? angleLabel : undefined };
    }),
    edges: Array.from({ length: sides }, (_, index) => ({ label: index === 0 ? side : undefined, ticks: 1 })),
    fill: "blue",
  };
}

function parallelogramVisual(text: string): LineAngleDiagram | null {
  if (!/\bparallelogram\b/i.test(text)) return null;
  const base = measurement(text, ["base"]);
  const height = measurement(text, ["perpendicular height", "height"]);
  const sidePair = numberPairAfter(text, /\bsides?\b/i);
  const baseValue = base ? Number.parseFloat(base) : sidePair?.first ?? 8;
  const heightValue = height ? Number.parseFloat(height) : 4;
  const baseLabel = base ?? sidePair?.firstLabel;
  const sideLabel = measurement(text, ["slant side"]) ?? sidePair?.secondLabel;
  const points: LineAngleDiagram["points"] = [
    { id: "A", x: 0, y: heightValue, label: "A" },
    { id: "B", x: baseValue, y: heightValue, label: "B" },
    { id: "C", x: baseValue + 2, y: 0, label: "C" },
    { id: "D", x: 2, y: 0, label: "D" },
  ];
  const segments: LineAngleDiagram["segments"] = [
    { from: "A", to: "B", label: baseLabel, parallelMarks: 1 },
    { from: "B", to: "C", label: sideLabel, parallelMarks: 2 },
    { from: "C", to: "D", parallelMarks: 1 },
    { from: "D", to: "A", parallelMarks: 2 },
  ];
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  const namedAngles = [...text.matchAll(
    /(?:∠|angle\s+)([ABCD])\s*(?:=|is)?\s*(\(?\s*(?:(?:\d+\s*)?x(?:\s*[+-]\s*\d+)?|\d+(?:\.\d+)?)\s*\)?)\s*(?:°|\\circ)/gi
  )];
  const angleSides: Record<string, [string, string]> = {
    A: ["D", "B"],
    B: ["A", "C"],
    C: ["B", "D"],
    D: ["C", "A"],
  };
  for (const match of namedAngles) {
    const vertex = match[1].toUpperCase();
    const [from, to] = angleSides[vertex];
    angles.push({
      vertex,
      from,
      to,
      label: `${match[2].replace(/[()\s]/g, "")}°`,
    });
  }
  if (namedAngles.length === 0) {
    const expressions = degreeExpressions(text);
    const ratio = text.match(/\bratio\s+(\d+)\s*:\s*(\d+)\s*:\s*(\d+)\s*:\s*(\d+)/i);
    const labels = ratio
      ? ratio.slice(1, 5).map((value) => `${value}x°`)
      : expressions;
    for (const [index, label] of labels.slice(0, 4).entries()) {
      const vertex = ["A", "B", "C", "D"][index];
      const [from, to] = angleSides[vertex];
      angles.push({ vertex, from, to, label });
    }
  }
  if (height) {
    points.push({ id: "H", x: 2, y: heightValue, label: "H" });
    segments.push({ from: "D", to: "H", label: height, dashed: true });
    angles.push({ vertex: "H", from: "D", to: "A", rightAngle: true });
  }
  return {
    description: `Parallelogram${baseLabel ? ` with base ${baseLabel}` : ""}${height ? ` and perpendicular height ${height}` : ""}${sideLabel ? `; sloping side ${sideLabel}` : ""}.`,
    points,
    segments,
    angles: angles.length ? angles : undefined,
  };
}

function intersectingLinesVisual(text: string): LineAngleDiagram | null {
  if (!/\b(?:vertically opposite|two (?:straight )?lines (?:cross|intersect))\b/i.test(text)) return null;
  const labels = firstDegreeLabels(text);
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  if (labels[0]) angles.push({ vertex: "O", from: "A", to: "C", label: labels[0], highlighted: true });
  if (labels[1]) angles.push({ vertex: "O", from: "B", to: "D", label: labels[1] });
  return {
    description: `Two straight lines intersect at O${labels[0] ? `, with one angle labelled ${labels[0]}` : ""}.`,
    points: [
      { id: "A", x: 0, y: 0, label: "A" },
      { id: "B", x: 6, y: 6, label: "B" },
      { id: "C", x: 0, y: 6, label: "C" },
      { id: "D", x: 6, y: 0, label: "D" },
      { id: "O", x: 3, y: 3, label: "O" },
    ],
    segments: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
    angles: angles.length ? angles : undefined,
    viewBox: "-1 -1 8 8",
  };
}

function parallelLinesVisual(text: string): LineAngleDiagram | null {
  if (!/\b(?:parallel lines?|transversal|co-interior|corresponding angle|alternate angle)\b/i.test(text)) return null;
  const labels = firstDegreeLabels(text);
  const relation = /co-interior/i.test(text) ? "co-interior" : /alternate/i.test(text) ? "alternate" : /corresponding/i.test(text) ? "corresponding" : "related";
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  if (labels[0]) angles.push({ vertex: "U", from: relation === "co-interior" ? "A" : "B", to: "V", label: labels[0], highlighted: true });
  if (labels[1]) angles.push({ vertex: "V", from: relation === "alternate" ? "D" : "C", to: "U", label: labels[1] });
  return {
    description: `Two parallel lines cut by a transversal, showing ${relation} angle positions${labels.length ? ` labelled ${labels.join(" and ")}` : ""}.`,
    points: [
      { id: "A", x: 0, y: 1, label: "A" }, { id: "U", x: 3, y: 1, label: "U" }, { id: "B", x: 8, y: 1, label: "B" },
      { id: "C", x: 0, y: 5, label: "C" }, { id: "V", x: 5, y: 5, label: "V" }, { id: "D", x: 8, y: 5, label: "D" },
      { id: "E", x: 2.25, y: -0.5, label: "E" }, { id: "F", x: 5.75, y: 6.5, label: "F" },
    ],
    segments: [
      { from: "A", to: "B", parallelMarks: 1 },
      { from: "C", to: "D", parallelMarks: 1 },
      { from: "E", to: "F" },
    ],
    angles: angles.length ? angles : undefined,
    viewBox: "-1 -1 10 9",
  };
}

function bearingsVisual(text: string): BearingsDiagram | null {
  if (!/\bbearing(?:s)?\b/i.test(text)) return null;
  const values = [...text.matchAll(/\b(\d{1,3})\s*(?:°|\\circ)/g)]
    .map((match) => Number(match[1]))
    .filter((value, index, values) => value >= 0 && value < 360 && values.indexOf(value) === index)
    .slice(0, 4);
  for (const match of text.matchAll(/\b([NS])\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)?\s*([EW])\b/gi)) {
    const angle = Number(match[2]);
    const first = match[1].toUpperCase();
    const second = match[3].toUpperCase();
    const bearing = first === "N" ? (second === "E" ? angle : 360 - angle) : (second === "E" ? 180 - angle : 180 + angle);
    if (!values.includes(bearing)) values.push(bearing);
  }
  if (values.length === 0) return null;
  const fromMatch = text.match(/bearing of\s+([A-Z])\s+from\s+([A-Z])/i);
  return {
    description: `Compass diagram with ${values.map((value) => `${String(value).padStart(3, "0")}°`).join(" and ")} bearing ray${values.length === 1 ? "" : "s"} measured clockwise from north.`,
    originLabel: fromMatch?.[2]?.toUpperCase() ?? "O",
    rays: values.map((bearing, index) => ({
      bearing,
      label: index === 0 ? fromMatch?.[1]?.toUpperCase() ?? "A" : String.fromCharCode(65 + index),
      showAngle: true,
    })),
    color: "blue",
  };
}

function networkVisual(text: string): NetworkDiagram | null {
  if (!/\b(?:network|graph|edges?|roads?|routes?|paths?|cables?|train times?|towns?)\b/i.test(text)) return null;
  const edgeMap = new Map<string, { from: string; to: string; weight?: number; directed?: boolean }>();
  const addEdge = (from: string, to: string, weight?: number, directed = false) => {
    if (from === to) return;
    const key = directed ? `${from}->${to}` : [from, to].sort().join("-");
    const previous = edgeMap.get(key);
    edgeMap.set(key, {
      from,
      to,
      weight: weight ?? previous?.weight,
      directed: directed || undefined,
    });
  };
  const addChain = (chain: string, weights: number[] = []) => {
    const ids = chain.split(/\s*(?:→|->|[-–—])\s*/).filter(Boolean);
    if (ids.length < 2 || ids.some((id) => !/^[A-Z]$/.test(id))) return;
    for (let index = 0; index < ids.length - 1; index += 1) {
      addEdge(ids[index], ids[index + 1], weights[index], /→|->/.test(chain));
    }
  };
  for (const match of text.matchAll(/\b([A-Z])([A-Z])\s*(?:\(\s*(\d+(?:\.\d+)?)\s*\)|=\s*(\d+(?:\.\d+)?))/g)) {
    addEdge(match[1], match[2], Number(match[3] ?? match[4]));
  }
  for (const match of text.matchAll(/\b([A-Z])\s*[-–—]\s*([A-Z])\s*(?:\(\s*(\d+(?:\.\d+)?)\s*\)|=\s*(\d+(?:\.\d+)?))/g)) {
    addEdge(match[1], match[2], Number(match[3] ?? match[4]));
  }
  for (const match of text.matchAll(/\b([A-Z])\s*(?:→|->)\s*([A-Z])\b/g)) addEdge(match[1], match[2], undefined, true);
  for (const match of text.matchAll(/\b([A-Z](?:\s*(?:→|->|[-–—])\s*[A-Z]){1,})\s*=\s*((?:\d+(?:\.\d+)?\s*\+\s*)*\d+(?:\.\d+)?)/g)) {
    addChain(match[1], [...match[2].matchAll(/\d+(?:\.\d+)?/g)].map((value) => Number(value[0])));
  }
  for (const match of text.matchAll(/\b([A-Z](?:\s*(?:→|->|[-–—])\s*[A-Z]){1,})\b/g)) addChain(match[1]);
  const directRoute = text.match(
    /\broutes?\s+([A-Z])\s+to\s+([A-Z])\s*:\s*direct\s+(\d+(?:\.\d+)?)/i
  );
  if (directRoute) addEdge(directRoute[1].toUpperCase(), directRoute[2].toUpperCase(), Number(directRoute[3]));

  // Unweighted edge lists are conventionally written as AB, BC, CD. Restrict
  // this parser to an edge-bearing clause so ordinary geometry side names are
  // never turned into a network.
  for (const clause of text.matchAll(/\bedges?\s*:?\s*([^.;?]+)/gi)) {
    for (const match of clause[1].matchAll(/\b([A-Z])([A-Z])\b/g)) addEdge(match[1], match[2]);
  }

  const complete = text.match(/\b(?:complete (?:network|graph)(?: on)?|every pair of)\s*(\d+)\s+vertices\b/i);
  const namedComplete = text.match(/\b(?:all (?:of )?)?([A-Z](?:\s*,\s*[A-Z]){2,})\s+are joined to each other\b/i);
  if (complete) {
    const count = Number(complete[1]);
    const ids = Array.from({ length: count }, (_, index) => String.fromCharCode(65 + index));
    for (let left = 0; left < ids.length; left += 1) {
      for (let right = left + 1; right < ids.length; right += 1) addEdge(ids[left], ids[right]);
    }
  } else if (namedComplete) {
    const ids = namedComplete[1].match(/[A-Z]/g) ?? [];
    for (let left = 0; left < ids.length; left += 1) {
      for (let right = left + 1; right < ids.length; right += 1) addEdge(ids[left], ids[right]);
    }
  }
  const triangleWithSeparateEdge = text.match(/\btriangle\s+([A-Z])([A-Z])([A-Z])\s+(?:has|plus|with)\s+(?:a\s+)?separate edge\s+([A-Z])([A-Z])/i);
  if (triangleWithSeparateEdge) {
    addEdge(triangleWithSeparateEdge[1], triangleWithSeparateEdge[2]);
    addEdge(triangleWithSeparateEdge[2], triangleWithSeparateEdge[3]);
    addEdge(triangleWithSeparateEdge[3], triangleWithSeparateEdge[1]);
    addEdge(triangleWithSeparateEdge[4], triangleWithSeparateEdge[5]);
  }
  const cycle = text.match(/\b(?:cycle|straight line)\s+(?:of|has)\s*(\d+)\s+vertices\b/i);
  if (cycle) {
    const count = Number(cycle[1]);
    const ids = Array.from({ length: count }, (_, index) => String.fromCharCode(65 + index));
    for (let index = 0; index < ids.length - 1; index += 1) addEdge(ids[index], ids[index + 1]);
    if (/\bcycle\b/i.test(text)) addEdge(ids.at(-1)!, ids[0]);
  }
  const star = text.match(/\bstar\b[^.;?]*?1 centre joined to\s*(\d+)\s+outer vertices/i);
  if (star) {
    for (let index = 0; index < Number(star[1]); index += 1) addEdge("O", String.fromCharCode(65 + index));
  }
  if (/\btriangle(?: graph)?[^.;?]*3 vertices[^.;?]*3 edges\b/i.test(text)) {
    addEdge("A", "B");
    addEdge("B", "C");
    addEdge("C", "A");
  }
  if (edgeMap.size < 2) return null;
  const edges = [...edgeMap.values()];
  const ids = [...new Set(edges.flatMap((edge) => [edge.from, edge.to]))].sort();
  const radius = 4;
  const routePositions = new Map<string, { x: number; y: number }>();
  if (directRoute && ids.length === 4) {
    const from = directRoute[1].toUpperCase();
    const to = directRoute[2].toUpperCase();
    const intermediate = ids.filter((id) => id !== from && id !== to);
    routePositions.set(from, { x: -4, y: 0 });
    routePositions.set(to, { x: 4, y: 0 });
    routePositions.set(intermediate[0], { x: 0, y: -3 });
    routePositions.set(intermediate[1], { x: 0, y: 3 });
  }
  return {
    description: `Network with ${ids.length} vertices and edges ${edges.map((edge) => `${edge.from}${edge.directed ? " to " : "–"}${edge.to}${edge.weight === undefined ? "" : ` of weight ${edge.weight}`}`).join(", ")}.`,
    vertices: ids.map((id, index) => {
      const routePosition = routePositions.get(id);
      if (routePosition) return { id, label: id, ...routePosition };
      const angle = -Math.PI / 2 + (2 * Math.PI * index) / ids.length;
      return { id, label: id, x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    }),
    edges,
  };
}

type InferredVisual = BarChartDiagram | BearingsDiagram | BoxPlotDiagram | CompositeSolidDiagram | CongruentTrianglesDiagram | DataTableDiagram | DotPlotDiagram | HistogramDiagram | LineAngleDiagram | NetworkDiagram | PlaneShapeDiagram | ScatterPlotDiagram | SectorDiagram | Solid3DDiagram | StemAndLeafDiagram | TriangleDiagram | TrianglePairDiagram;

function inferVisual(textValue: string): InferredVisual | null {
  const text = cleanMathText(textValue);
  return boxPlotVisual(text) ?? dotPlotVisual(text) ?? stemAndLeafVisual(text) ?? histogramVisual(text) ?? barChartVisual(text) ?? scatterPlotVisual(text) ?? dataTableVisual(text) ?? sectorVisual(text) ?? bearingsVisual(text) ?? networkVisual(text) ?? compositeSolidVisual(text) ?? solidVisual(text) ?? intersectingLinesVisual(text) ?? parallelLinesVisual(text) ?? exteriorTriangleVisual(text) ?? congruentTrianglesVisual(text) ?? trianglePairVisual(text) ?? triangleVisual(text) ?? trapezoidVisual(text) ?? rhombusVisual(text) ?? quadrilateralVisual(text) ?? regularPolygonVisual(text) ?? parallelogramVisual(text);
}

function attachVisual<T extends object>(item: T, visual: InferredVisual): T {
  if ("plots" in visual) return { ...item, boxPlotDiagram: visual };
  if ("relationLabel" in visual) return { ...item, trianglePairDiagram: visual };
  if ("left" in visual && "right" in visual) return { ...item, congruentTrianglesDiagram: visual };
  if ("columnHeaders" in visual) return { ...item, dataTableDiagram: visual };
  if ("bins" in visual) return { ...item, histogramDiagram: visual };
  if ("rows" in visual) return { ...item, stemAndLeafDiagram: visual };
  if ("counts" in visual || ("min" in visual && "max" in visual && "values" in visual)) return { ...item, dotPlotDiagram: visual };
  if ("bars" in visual) return { ...item, barChartDiagram: visual };
  if ("angleDegrees" in visual) return { ...item, sectorDiagram: visual };
  if ("points" in visual && "xAxisLabel" in visual) return { ...item, scatterPlotDiagram: visual };
  if ("rays" in visual) return { ...item, bearingsDiagram: visual };
  if ("edges" in visual && "vertices" in visual && Array.isArray(visual.vertices) && visual.vertices.length > 0 && "id" in visual.vertices[0]) {
    return { ...item, diagram: visual };
  }
  if ("solid" in visual) return { ...item, solid3DDiagram: visual };
  if ("kind" in visual && "unit" in visual) return { ...item, compositeSolidDiagram: visual };
  if ("vertices" in visual && !Array.isArray(visual.vertices)) return { ...item, triangleDiagram: visual };
  if ("points" in visual) return { ...item, lineAngleDiagram: visual };
  return { ...item, planeShapeDiagram: visual };
}

export function applyQuestionVisualStandards(question: PracticeQuestion): PracticeQuestion {
  if (hasVisual(question) || question.choices?.some(hasVisual)) return question;
  const visual = inferVisual(`${question.prompt} ${question.latex}`);
  if (!visual) return question;
  const prompt = /\b(?:use|from|shown in) (?:the |this )?(?:diagram|figure)\b/i.test(question.prompt)
    ? question.prompt
    : `Use the diagram to answer the question. ${question.prompt}`;
  return attachVisual({ ...question, prompt, latex: "" }, visual);
}

export function applyWorkedExampleVisualStandards(example: WorkedExample): WorkedExample {
  if (hasVisual(example)) return example;
  const visual = inferVisual(example.questionLatex);
  return visual ? attachVisual(example, visual) : example;
}

export function applyLessonVisualStandards(lesson: ExplicitLesson): ExplicitLesson;
export function applyLessonVisualStandards(
  lesson: ExplicitLesson,
  options: { inferQuestions?: boolean; inferWorkedExamples?: boolean }
): ExplicitLesson;
export function applyLessonVisualStandards(
  lesson: ExplicitLesson,
  options: { inferQuestions?: boolean; inferWorkedExamples?: boolean } = {}
): ExplicitLesson {
  const mapQuestion = options.inferQuestions === false
    ? (question: PracticeQuestion) => question
    : applyQuestionVisualStandards;
  const mapWorkedExample = options.inferWorkedExamples === false
    ? (example: WorkedExample) => example
    : applyWorkedExampleVisualStandards;
  return {
    ...lesson,
    workedExamples: lesson.workedExamples.map(mapWorkedExample),
    guidedPractice: lesson.guidedPractice.map(mapQuestion),
    independentPractice: lesson.independentPractice.map(mapQuestion),
    masteryQuiz: lesson.masteryQuiz.map(mapQuestion),
    masteryQuizPool: lesson.masteryQuizPool?.map(mapQuestion),
    multiPartPractice: lesson.multiPartPractice?.map(mapQuestion),
  };
}
