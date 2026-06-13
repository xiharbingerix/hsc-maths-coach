import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getNewCourseUnitLessons,
  newCoursePathways,
} from "../lib/newCourseCatalog";
import { flattenSkillMapV2Nodes } from "../lib/skillMapV2";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../lib/lessons/differentialCalculus";
import type {
  CartesianGraph,
  NetworkDiagram,
  TriangleDiagram,
} from "../lib/lessons/types";
import * as year9Exports from "../lib/lessons/year9";
import * as year10Exports from "../lib/lessons/year10";

type AuditLevel = "FAIL" | "WARN";

type AuditIssue = {
  level: AuditLevel;
  rule: string;
  path: string;
  message: string;
};

type VisualFindingKind =
  | "visual required, no payload"
  | "visual helpful but not required"
  | "text table/data fully present";

type VisualStimulusFinding = {
  kind: VisualFindingKind;
  courseSlug: string;
  unitSlug: string;
  lessonSlug: string;
  path: string;
  excerpt: string;
};

type LessonRecord = {
  courseSlug: string;
  unitSlug: string;
  lesson: ExplicitLesson;
};

type QuestionRecord = {
  section: "guided" | "independent" | "mastery" | "multiPartPractice";
  question: PracticeQuestion;
};

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures: AuditIssue[] = [];
const warnings: AuditIssue[] = [];
const visualStimulusFindings: VisualStimulusFinding[] = [];

const placeholderPattern =
  /\bTODO\b|lorem ipsum|placeholder lesson|generated fallback|sample question/i;
const visualRequiredPattern =
  /\b(?:read|use|using|from|shown (?:in|on)|given (?:in|on)|according to)\s+(?:the\s+)?(?:graph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram)\b|\b(?:graph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram)\s+(?:below|above|shown)\b/i;
const visualHelpfulPattern =
  /\bgraph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram|trapezoidal rule|area between curves|circle theorem\b/i;
const tableDataPattern = /\btable|data set|data below|values below|following data|frequency table\b/i;

function addIssue(
  level: AuditLevel,
  rule: string,
  path: string,
  message: string
) {
  const issue = { level, rule, path, message };
  (level === "FAIL" ? failures : warnings).push(issue);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function questionRecords(lesson: ExplicitLesson): QuestionRecord[] {
  return [
    ...lesson.guidedPractice.map((question) => ({
      section: "guided" as const,
      question,
    })),
    ...lesson.independentPractice.map((question) => ({
      section: "independent" as const,
      question,
    })),
    ...lesson.masteryQuiz.map((question) => ({
      section: "mastery" as const,
      question,
    })),
    ...(lesson.multiPartPractice ?? []).map((question) => ({
      section: "multiPartPractice" as const,
      question,
    })),
  ];
}

function visualItems(lesson: ExplicitLesson) {
  return [...lesson.workedExamples, ...questionRecords(lesson).map(({ question }) => question)];
}

function hasItemVisualPayload(item: WorkedExample | PracticeQuestion) {
  return Boolean(
    item.diagram ||
      ("solutionDiagram" in item && item.solutionDiagram) ||
      item.triangleDiagram ||
      item.cartesianGraph ||
      item.unitCircleDiagram ||
      item.trigGraphDiagram ||
      item.argandDiagram ||
      item.vector3DDiagram ||
      item.trapezoidalRuleDiagram ||
      item.boxPlotDiagram ||
      item.normalDistributionDiagram ||
      item.probabilityTreeDiagram ||
      item.twoWayTableDiagram ||
      item.vennDiagram
  );
}

function hasVisualPayload(lesson: ExplicitLesson) {
  return visualItems(lesson).some((item) => hasItemVisualPayload(item));
}

function lessonPath(courseSlug: string, unitSlug: string, lessonSlug: string) {
  return `${courseSlug}/${unitSlug}/${lessonSlug}`;
}

function validatePoint(value: unknown, path: string) {
  if (!isRecord(value) || !isFiniteNumber(value.x) || !isFiniteNumber(value.y)) {
    addIssue("FAIL", "renderer-payload", path, "Point must contain finite numeric x and y coordinates.");
  }
}

function validateArgandPoint(value: unknown, path: string) {
  if (!isRecord(value) || !isFiniteNumber(value.re) || !isFiniteNumber(value.im)) {
    addIssue("FAIL", "argand-payload", path, "Argand point must contain finite numeric re and im coordinates.");
  }
}

function validateVector3DPoint(value: unknown, path: string) {
  if (
    !isRecord(value) ||
    !isFiniteNumber(value.x) ||
    !isFiniteNumber(value.y) ||
    !isFiniteNumber(value.z)
  ) {
    addIssue("FAIL", "vector-3d-payload", path, "3D point must contain finite numeric x, y and z coordinates.");
  }
}

function validateArgandDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "argand-payload", path, "Argand diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "argand-payload", path, "Argand diagram requires a description.");
  }

  for (const key of ["realMin", "realMax", "imaginaryMin", "imaginaryMax", "realStep", "imaginaryStep"]) {
    if (value[key] !== undefined && !isFiniteNumber(value[key])) {
      addIssue("FAIL", "argand-payload", path, `${key} must be a finite number when supplied.`);
    }
  }

  if (isFiniteNumber(value.realMin) && isFiniteNumber(value.realMax) && value.realMin >= value.realMax) {
    addIssue("FAIL", "argand-payload", path, "realMin must be less than realMax.");
  }

  if (isFiniteNumber(value.imaginaryMin) && isFiniteNumber(value.imaginaryMax) && value.imaginaryMin >= value.imaginaryMax) {
    addIssue("FAIL", "argand-payload", path, "imaginaryMin must be less than imaginaryMax.");
  }

  if (value.points !== undefined) {
    if (!Array.isArray(value.points)) {
      addIssue("FAIL", "argand-payload", path, "points must be an array when supplied.");
    } else {
      value.points.forEach((point, index) => validateArgandPoint(point, `${path}.points[${index}]`));
    }
  }

  if (value.vectorsFromOrigin !== undefined) {
    if (!Array.isArray(value.vectorsFromOrigin)) {
      addIssue("FAIL", "argand-payload", path, "vectorsFromOrigin must be an array when supplied.");
    } else {
      value.vectorsFromOrigin.forEach((vector, index) => {
        if (!isRecord(vector)) {
          addIssue("FAIL", "argand-payload", `${path}.vectorsFromOrigin[${index}]`, "Vector must be an object.");
          return;
        }
        validateArgandPoint(vector.to, `${path}.vectorsFromOrigin[${index}].to`);
      });
    }
  }

  if (value.segments !== undefined) {
    if (!Array.isArray(value.segments)) {
      addIssue("FAIL", "argand-payload", path, "segments must be an array when supplied.");
    } else {
      value.segments.forEach((segment, index) => {
        if (!isRecord(segment)) {
          addIssue("FAIL", "argand-payload", `${path}.segments[${index}]`, "Segment must be an object.");
          return;
        }
        validateArgandPoint(segment.from, `${path}.segments[${index}].from`);
        validateArgandPoint(segment.to, `${path}.segments[${index}].to`);
      });
    }
  }

  if (value.modulusCircles !== undefined) {
    if (!Array.isArray(value.modulusCircles)) {
      addIssue("FAIL", "argand-payload", path, "modulusCircles must be an array when supplied.");
    } else {
      value.modulusCircles.forEach((circle, index) => {
        if (!isRecord(circle) || !isFiniteNumber(circle.radius) || circle.radius <= 0) {
          addIssue("FAIL", "argand-payload", `${path}.modulusCircles[${index}]`, "Modulus circle requires a positive finite radius.");
        }
      });
    }
  }
}

function validateVector3DDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "vector-3d-payload", path, "Vector3D diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "vector-3d-payload", path, "Vector3D diagram requires a description.");
  }

  if (value.axisLength !== undefined && (!isFiniteNumber(value.axisLength) || value.axisLength <= 0)) {
    addIssue("FAIL", "vector-3d-payload", path, "axisLength must be a positive finite number when supplied.");
  }

  if (value.points !== undefined) {
    if (!Array.isArray(value.points)) {
      addIssue("FAIL", "vector-3d-payload", path, "points must be an array when supplied.");
    } else {
      value.points.forEach((point, index) => validateVector3DPoint(point, `${path}.points[${index}]`));
    }
  }

  if (value.vectors !== undefined) {
    if (!Array.isArray(value.vectors)) {
      addIssue("FAIL", "vector-3d-payload", path, "vectors must be an array when supplied.");
    } else {
      value.vectors.forEach((vector, index) => {
        if (!isRecord(vector)) {
          addIssue("FAIL", "vector-3d-payload", `${path}.vectors[${index}]`, "Vector must be an object.");
          return;
        }
        if (vector.from !== undefined) validateVector3DPoint(vector.from, `${path}.vectors[${index}].from`);
        validateVector3DPoint(vector.to, `${path}.vectors[${index}].to`);
      });
    }
  }

  if (value.lines !== undefined) {
    if (!Array.isArray(value.lines)) {
      addIssue("FAIL", "vector-3d-payload", path, "lines must be an array when supplied.");
    } else {
      value.lines.forEach((line, index) => {
        if (!isRecord(line)) {
          addIssue("FAIL", "vector-3d-payload", `${path}.lines[${index}]`, "Line must be an object.");
          return;
        }
        validateVector3DPoint(line.point, `${path}.lines[${index}].point`);
        validateVector3DPoint(line.direction, `${path}.lines[${index}].direction`);
      });
    }
  }
}

function validateStringPoint(value: unknown, path: string) {
  if (!isRecord(value) || !isNonEmptyString(value.x) || !isNonEmptyString(value.y)) {
    addIssue("FAIL", "visual-payload", path, "Point must contain non-empty string x and y values.");
  }
}

function validateUnitCircleDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "unit-circle-payload", path, "Unit circle diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "unit-circle-payload", path, "Unit circle diagram requires a description.");
  }

  if (value.angleRadians !== undefined && !isNonEmptyString(value.angleRadians)) {
    addIssue("FAIL", "unit-circle-payload", path, "angleRadians must be a non-empty string when supplied.");
  }

  if (value.angleDegrees !== undefined && !isNonEmptyString(value.angleDegrees)) {
    addIssue("FAIL", "unit-circle-payload", path, "angleDegrees must be a non-empty string when supplied.");
  }

  if (
    value.quadrant !== undefined &&
    ![1, 2, 3, 4, "axis"].includes(value.quadrant as 1 | 2 | 3 | 4 | "axis")
  ) {
    addIssue("FAIL", "unit-circle-payload", path, "quadrant must be 1, 2, 3, 4 or axis.");
  }

  if (value.terminalPoint !== undefined) {
    validateStringPoint(value.terminalPoint, `${path}.terminalPoint`);
  }

  if (value.referenceAngle !== undefined && !isNonEmptyString(value.referenceAngle)) {
    addIssue("FAIL", "unit-circle-payload", path, "referenceAngle must be a non-empty string when supplied.");
  }

  if (value.showReferenceTriangle !== undefined && typeof value.showReferenceTriangle !== "boolean") {
    addIssue("FAIL", "unit-circle-payload", path, "showReferenceTriangle must be boolean when supplied.");
  }

  if (value.highlightRadius !== undefined && typeof value.highlightRadius !== "boolean") {
    addIssue("FAIL", "unit-circle-payload", path, "highlightRadius must be boolean when supplied.");
  }

  if (value.symmetryPoints !== undefined) {
    if (!Array.isArray(value.symmetryPoints)) {
      addIssue("FAIL", "unit-circle-payload", path, "symmetryPoints must be an array when supplied.");
    } else {
      value.symmetryPoints.forEach((point, index) =>
        validateStringPoint(point, `${path}.symmetryPoints[${index}]`)
      );
    }
  }

  if (
    value.notes !== undefined &&
    (!Array.isArray(value.notes) || value.notes.some((note) => !isNonEmptyString(note)))
  ) {
    addIssue("FAIL", "unit-circle-payload", path, "notes must be non-empty strings when supplied.");
  }
}

function validateTrigGraphDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "trig-graph-payload", path, "Trig graph diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "trig-graph-payload", path, "Trig graph diagram requires a description.");
  }

  if (!["sin", "cos", "tan"].includes(String(value.functionType))) {
    addIssue("FAIL", "trig-graph-payload", path, "functionType must be sin, cos or tan.");
  }

  for (const key of ["equationLabel", "xMin", "xMax"] as const) {
    if (value[key] !== undefined && !isNonEmptyString(value[key])) {
      addIssue("FAIL", "trig-graph-payload", path, `${key} must be a non-empty string when supplied.`);
    }
  }

  for (const key of ["yMin", "yMax"] as const) {
    if (value[key] !== undefined && !isFiniteNumber(value[key])) {
      addIssue("FAIL", "trig-graph-payload", path, `${key} must be a finite number when supplied.`);
    }
  }

  if (isFiniteNumber(value.yMin) && isFiniteNumber(value.yMax) && value.yMin >= value.yMax) {
    addIssue("FAIL", "trig-graph-payload", path, "yMin must be less than yMax.");
  }

  if (value.keyPoints !== undefined) {
    if (!Array.isArray(value.keyPoints)) {
      addIssue("FAIL", "trig-graph-payload", path, "keyPoints must be an array when supplied.");
    } else {
      value.keyPoints.forEach((point, index) =>
        validateStringPoint(point, `${path}.keyPoints[${index}]`)
      );
    }
  }

  for (const collection of ["asymptotes", "periodMarkers"] as const) {
    if (value[collection] !== undefined) {
      if (!Array.isArray(value[collection])) {
        addIssue("FAIL", "trig-graph-payload", path, `${collection} must be an array when supplied.`);
      } else {
        value[collection].forEach((marker, index) => {
          if (!isRecord(marker) || !isNonEmptyString(marker.x)) {
            addIssue("FAIL", "trig-graph-payload", `${path}.${collection}[${index}]`, "Marker requires non-empty string x.");
          }
        });
      }
    }
  }

  if (
    value.notes !== undefined &&
    (!Array.isArray(value.notes) || value.notes.some((note) => !isNonEmptyString(note)))
  ) {
    addIssue("FAIL", "trig-graph-payload", path, "notes must be non-empty strings when supplied.");
  }
}

function validateTriangleDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram requires a description.");
  }

  if (!isRecord(value.vertices)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram requires A, B and C vertices.");
    return;
  }

  for (const vertex of ["A", "B", "C"]) {
    validatePoint(value.vertices[vertex], `${path}.vertices.${vertex}`);
  }

  if (
    value.rightAngleAt !== undefined &&
    !["A", "B", "C"].includes(String(value.rightAngleAt))
  ) {
    addIssue("FAIL", "triangle-payload", path, "rightAngleAt must be A, B or C.");
  }

  if (value.highlightedSides !== undefined) {
    if (
      !Array.isArray(value.highlightedSides) ||
      value.highlightedSides.some((side) => !["AB", "BC", "AC"].includes(String(side)))
    ) {
      addIssue("FAIL", "triangle-payload", path, "highlightedSides may contain only AB, BC or AC.");
    }
  }
}

function validateCartesianGraph(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "cartesian-payload", path, "Cartesian graph must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "cartesian-payload", path, "Cartesian graph requires a description.");
  }

  for (const key of ["xMin", "xMax", "yMin", "yMax", "xStep", "yStep"]) {
    if (value[key] !== undefined && !isFiniteNumber(value[key])) {
      addIssue("FAIL", "cartesian-payload", path, `${key} must be a finite number when supplied.`);
    }
  }

  if (isFiniteNumber(value.xStep) && value.xStep <= 0) {
    addIssue("FAIL", "cartesian-payload", path, "xStep must be greater than zero.");
  }

  if (isFiniteNumber(value.yStep) && value.yStep <= 0) {
    addIssue("FAIL", "cartesian-payload", path, "yStep must be greater than zero.");
  }

  if (isFiniteNumber(value.xMin) && isFiniteNumber(value.xMax) && value.xMin >= value.xMax) {
    addIssue("FAIL", "cartesian-payload", path, "xMin must be less than xMax.");
  }

  if (isFiniteNumber(value.yMin) && isFiniteNumber(value.yMax) && value.yMin >= value.yMax) {
    addIssue("FAIL", "cartesian-payload", path, "yMin must be less than yMax.");
  }

  for (const [collection, values] of [
    ["points", value.points],
    ["lineSegments", value.lineSegments],
    ["lines", value.lines],
    ["parabolas", value.parabolas],
    ["circles", value.circles],
    ["sinusoidals", value.sinusoidals],
    ["shadedRegions", value.shadedRegions],
  ] as const) {
    if (values !== undefined && !Array.isArray(values)) {
      addIssue("FAIL", "cartesian-payload", path, `${collection} must be an array when supplied.`);
    }
  }

  if (Array.isArray(value.points)) {
    value.points.forEach((point, index) => validatePoint(point, `${path}.points[${index}]`));
  }

  if (Array.isArray(value.lineSegments)) {
    value.lineSegments.forEach((segment, index) => {
      if (!isRecord(segment)) {
        addIssue("FAIL", "cartesian-payload", `${path}.lineSegments[${index}]`, "Line segment must be an object.");
        return;
      }
      validatePoint(segment.from, `${path}.lineSegments[${index}].from`);
      validatePoint(segment.to, `${path}.lineSegments[${index}].to`);
    });
  }

  if (Array.isArray(value.lines)) {
    value.lines.forEach((line, index) => {
      if (
        !isRecord(line) ||
        line.kind !== "linear" ||
        !isFiniteNumber(line.m) ||
        !isFiniteNumber(line.b)
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.lines[${index}]`, "Linear line requires kind, finite m and finite b.");
      }
    });
  }

  if (Array.isArray(value.parabolas)) {
    value.parabolas.forEach((parabola, index) => {
      if (
        !isRecord(parabola) ||
        parabola.kind !== "quadratic" ||
        !isFiniteNumber(parabola.a) ||
        !isFiniteNumber(parabola.b) ||
        !isFiniteNumber(parabola.c) ||
        parabola.a === 0
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.parabolas[${index}]`, "Quadratic parabola requires kind, finite a, b and c, with a non-zero.");
      }
    });
  }

  if (Array.isArray(value.circles)) {
    value.circles.forEach((circle, index) => {
      if (
        !isRecord(circle) ||
        !isFiniteNumber(circle.h) ||
        !isFiniteNumber(circle.k) ||
        !isFiniteNumber(circle.r) ||
        circle.r <= 0
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.circles[${index}]`, "Circle requires finite h, k and a positive radius.");
      }
    });
  }

  if (Array.isArray(value.sinusoidals)) {
    value.sinusoidals.forEach((curve, index) => {
      const curvePath = `${path}.sinusoidals[${index}]`;
      if (
        !isRecord(curve) ||
        !["sin", "cos", "tan"].includes(String(curve.kind)) ||
        !isFiniteNumber(curve.a) ||
        !isFiniteNumber(curve.b) ||
        !isFiniteNumber(curve.c) ||
        !isFiniteNumber(curve.d) ||
        curve.b === 0
      ) {
        addIssue("FAIL", "cartesian-payload", curvePath, "Sinusoidal curve requires kind sin, cos or tan and finite a, b, c and d, with b non-zero.");
        return;
      }

      if (
        (curve.xMin !== undefined && !isFiniteNumber(curve.xMin)) ||
        (curve.xMax !== undefined && !isFiniteNumber(curve.xMax)) ||
        (isFiniteNumber(curve.xMin) && isFiniteNumber(curve.xMax) && curve.xMin >= curve.xMax)
      ) {
        addIssue("FAIL", "cartesian-payload", curvePath, "Sinusoidal xMin and xMax must be finite with xMin < xMax when supplied.");
      }
    });
  }

  if (Array.isArray(value.shadedRegions)) {
    const validateFunction = (fn: unknown, functionPath: string) => {
      if (!isRecord(fn)) {
        addIssue("FAIL", "cartesian-payload", functionPath, "Shaded region function must be an object.");
        return;
      }

      if (fn.functionType === "line") {
        if (!isRecord(fn.line) || !isFiniteNumber(fn.line.m) || !isFiniteNumber(fn.line.b)) {
          addIssue("FAIL", "cartesian-payload", functionPath, "Line function requires finite m and b.");
        }
        return;
      }

      if (fn.functionType === "quadratic") {
        if (
          !isRecord(fn.quadratic) ||
          !isFiniteNumber(fn.quadratic.a) ||
          !isFiniteNumber(fn.quadratic.b) ||
          !isFiniteNumber(fn.quadratic.c)
        ) {
          addIssue("FAIL", "cartesian-payload", functionPath, "Quadratic function requires finite a, b and c.");
        }
        return;
      }

      addIssue("FAIL", "cartesian-payload", functionPath, "Shaded region functionType must be line or quadratic.");
    };

    value.shadedRegions.forEach((region, index) => {
      const regionPath = `${path}.shadedRegions[${index}]`;
      if (!isRecord(region)) {
        addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region must be an object.");
        return;
      }

      if (!isFiniteNumber(region.xMin) || !isFiniteNumber(region.xMax) || region.xMin >= region.xMax) {
        addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region requires finite xMin < xMax.");
      }

      if (
        region.color !== undefined &&
        !["blue", "green", "red", "amber"].includes(String(region.color))
      ) {
        addIssue("FAIL", "cartesian-payload", regionPath, `Shaded region color "${String(region.color)}" must be blue, green, red, or amber.`);
      }

      if (region.kind === "under-function") {
        if (region.baseline !== undefined && !isFiniteNumber(region.baseline)) {
          addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region baseline must be finite when supplied.");
        }
        validateFunction(region, regionPath);
        return;
      }

      if (region.kind === "between-functions") {
        validateFunction(region.top, `${regionPath}.top`);
        validateFunction(region.bottom, `${regionPath}.bottom`);
        return;
      }

      addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region kind must be under-function or between-functions.");
    });
  }
}

function validateNetworkDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "network-payload", path, "Network diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "network-payload", path, "Network diagram requires a description.");
  }

  if (!Array.isArray(value.vertices) || value.vertices.length === 0) {
    addIssue("FAIL", "network-payload", path, "Network diagram requires at least one vertex.");
    return;
  }

  if (!Array.isArray(value.edges)) {
    addIssue("FAIL", "network-payload", path, "Network diagram edges must be an array.");
    return;
  }

  const vertexIds = new Set<string>();
  value.vertices.forEach((vertex, index) => {
    const vertexPath = `${path}.vertices[${index}]`;
    if (
      !isRecord(vertex) ||
      !isNonEmptyString(vertex.id) ||
      !isNonEmptyString(vertex.label) ||
      !isFiniteNumber(vertex.x) ||
      !isFiniteNumber(vertex.y)
    ) {
      addIssue("FAIL", "network-payload", vertexPath, "Vertex requires id, label and finite x and y coordinates.");
      return;
    }

    if (vertexIds.has(vertex.id)) {
      addIssue("FAIL", "network-payload", vertexPath, `Duplicate network vertex id "${vertex.id}".`);
    }
    vertexIds.add(vertex.id);
  });

  value.edges.forEach((edge, index) => {
    const edgePath = `${path}.edges[${index}]`;
    if (!isRecord(edge) || !isNonEmptyString(edge.from) || !isNonEmptyString(edge.to)) {
      addIssue("FAIL", "network-payload", edgePath, "Edge requires from and to vertex ids.");
      return;
    }
    if (!vertexIds.has(edge.from) || !vertexIds.has(edge.to)) {
      addIssue("FAIL", "network-payload", edgePath, "Edge references a vertex id that does not exist.");
    }
  });

  if (Array.isArray(value.highlightedVertices)) {
    value.highlightedVertices.forEach((vertex) => {
      if (!vertexIds.has(String(vertex))) {
        addIssue("FAIL", "network-payload", path, `Highlighted vertex "${String(vertex)}" does not exist.`);
      }
    });
  }

  if (Array.isArray(value.highlightedEdges)) {
    value.highlightedEdges.forEach((edge, index) => {
      if (
        !Array.isArray(edge) ||
        edge.length !== 2 ||
        !vertexIds.has(String(edge[0])) ||
        !vertexIds.has(String(edge[1]))
      ) {
        addIssue("FAIL", "network-payload", `${path}.highlightedEdges[${index}]`, "Highlighted edge must reference two existing vertices.");
      }
    });
  }
}

function validateTrapezoidalRuleDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires a description.");
  }

  if (!Array.isArray(value.xValues) || !Array.isArray(value.yValues)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires xValues and yValues arrays.");
    return;
  }

  const xValues = value.xValues;
  const yValues = value.yValues;

  if (xValues.length !== yValues.length) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "xValues and yValues must have matching lengths.");
  }

  if (xValues.length < 2) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires at least two points.");
  }

  if (xValues.some((xValue) => !isFiniteNumber(xValue))) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Every x-value must be finite.");
  }

  if (yValues.some((yValue) => !isFiniteNumber(yValue))) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Every y-value must be finite.");
  }

  if (
    xValues.some(
      (xValue, index) =>
        index > 0 &&
        isFiniteNumber(xValue) &&
        isFiniteNumber(xValues[index - 1]) &&
        xValue <= xValues[index - 1]
    )
  ) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "xValues must strictly increase.");
  }
}

function validateBoxPlotDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "box-plot-payload", path, "Box plot diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "box-plot-payload", path, "Box plot diagram requires a description.");
  }

  if (!Array.isArray(value.plots) || value.plots.length === 0) {
    addIssue("FAIL", "box-plot-payload", path, "Box plot diagram requires at least one plot.");
    return;
  }

  if (
    (value.xMin !== undefined && !isFiniteNumber(value.xMin)) ||
    (value.xMax !== undefined && !isFiniteNumber(value.xMax)) ||
    (isFiniteNumber(value.xMin) && isFiniteNumber(value.xMax) && value.xMin >= value.xMax)
  ) {
    addIssue("FAIL", "box-plot-payload", path, "Box plot xMin and xMax must be finite with xMin < xMax when supplied.");
  }

  value.plots.forEach((plot, index) => {
    const plotPath = `${path}.plots[${index}]`;
    if (!isRecord(plot)) {
      addIssue("FAIL", "box-plot-payload", plotPath, "Box plot must be an object.");
      return;
    }

    if (!isNonEmptyString(plot.label)) {
      addIssue("FAIL", "box-plot-payload", plotPath, "Box plot label must be non-empty.");
    }

    const { min, q1, median, q3, max, lowerWhisker, upperWhisker } = plot;
    const resolvedLowerWhisker = lowerWhisker ?? min;
    const resolvedUpperWhisker = upperWhisker ?? max;
    if (
      (min !== undefined && !isFiniteNumber(min)) ||
      (max !== undefined && !isFiniteNumber(max)) ||
      (lowerWhisker !== undefined && !isFiniteNumber(lowerWhisker)) ||
      (upperWhisker !== undefined && !isFiniteNumber(upperWhisker)) ||
      ![resolvedLowerWhisker, q1, median, q3, resolvedUpperWhisker].every(isFiniteNumber)
    ) {
      addIssue("FAIL", "box-plot-payload", plotPath, "Box plot requires finite q1, median and q3 values plus lower and upper whisker endpoints. Endpoints resolve from lowerWhisker ?? min and upperWhisker ?? max.");
      return;
    }

    if (
      !(
        isFiniteNumber(resolvedLowerWhisker) &&
        isFiniteNumber(q1) &&
        isFiniteNumber(median) &&
        isFiniteNumber(q3) &&
        isFiniteNumber(resolvedUpperWhisker) &&
        resolvedLowerWhisker <= q1 &&
        q1 <= median &&
        median <= q3 &&
        q3 <= resolvedUpperWhisker
      )
    ) {
      addIssue("FAIL", "box-plot-payload", plotPath, "Box plot values must satisfy lower whisker <= q1 <= median <= q3 <= upper whisker.");
    }

    if (plot.outliers !== undefined && (!Array.isArray(plot.outliers) || plot.outliers.some((outlier) => !isFiniteNumber(outlier)))) {
      addIssue("FAIL", "box-plot-payload", plotPath, "Box plot outliers must be an array of finite numbers when supplied.");
      return;
    }

    if (
      Array.isArray(plot.outliers) &&
      isFiniteNumber(resolvedLowerWhisker) &&
      isFiniteNumber(resolvedUpperWhisker)
    ) {
      plot.outliers.forEach((outlier, outlierIndex) => {
        if (
          isFiniteNumber(outlier) &&
          outlier >= resolvedLowerWhisker &&
          outlier <= resolvedUpperWhisker
        ) {
          addIssue("WARN", "box-plot-outlier-inside-whiskers", `${plotPath}.outliers[${outlierIndex}]`, "Outlier lies inside the resolved whisker range.");
        }
      });
    }
  });
}

function validateNormalDistributionDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution diagram requires a description.");
  }

  if (!isFiniteNumber(value.mean)) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution mean must be finite.");
  }

  if (!isFiniteNumber(value.standardDeviation) || value.standardDeviation <= 0) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution standardDeviation must be a positive finite number.");
  }

  if (
    (value.xMin !== undefined && !isFiniteNumber(value.xMin)) ||
    (value.xMax !== undefined && !isFiniteNumber(value.xMax)) ||
    (isFiniteNumber(value.xMin) && isFiniteNumber(value.xMax) && value.xMin >= value.xMax)
  ) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution xMin and xMax must be finite with xMin < xMax when supplied.");
  }

  if (value.shadedBands !== undefined && !Array.isArray(value.shadedBands)) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution shadedBands must be an array when supplied.");
  }

  if (Array.isArray(value.shadedBands)) {
    const seenWidths = new Set<number>();
    value.shadedBands.forEach((band, index) => {
      const bandPath = `${path}.shadedBands[${index}]`;
      if (
        !isRecord(band) ||
        ![1, 2, 3].includes(Number(band.standardDeviations)) ||
        (band.color !== undefined && !["blue", "green", "amber"].includes(String(band.color)))
      ) {
        addIssue("FAIL", "normal-distribution-payload", bandPath, "Shaded band requires standardDeviations 1, 2 or 3 and optional color blue, green or amber.");
        return;
      }
      if (seenWidths.has(Number(band.standardDeviations))) {
        addIssue("FAIL", "normal-distribution-payload", bandPath, "Shaded band standard-deviation widths must be unique.");
      }
      seenWidths.add(Number(band.standardDeviations));
    });
  }

  if (value.markers !== undefined && !Array.isArray(value.markers)) {
    addIssue("FAIL", "normal-distribution-payload", path, "Normal distribution markers must be an array when supplied.");
  }

  if (Array.isArray(value.markers)) {
    value.markers.forEach((marker, index) => {
      const markerPath = `${path}.markers[${index}]`;
      if (
        !isRecord(marker) ||
        !isFiniteNumber(marker.value) ||
        (marker.zScore !== undefined && !isFiniteNumber(marker.zScore))
      ) {
        addIssue("FAIL", "normal-distribution-payload", markerPath, "Marker requires a finite value and optional finite zScore.");
      }
    });
  }
}

function validateVennDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "venn-diagram-payload", path, "Venn diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "venn-diagram-payload", path, "Venn diagram requires a description.");
  }

  if (!isNonEmptyString(value.setALabel) || !isNonEmptyString(value.setBLabel)) {
    addIssue("FAIL", "venn-diagram-payload", path, "Venn diagram requires non-empty set A and set B labels.");
  }

  const regionNames = ["aOnly", "intersection", "bOnly", "neither", "total"] as const;
  regionNames.forEach((regionName) => {
    const regionValue = value[regionName];
    if (
      regionValue !== undefined &&
      !(isFiniteNumber(regionValue) || isNonEmptyString(regionValue))
    ) {
      addIssue("FAIL", "venn-diagram-payload", `${path}.${regionName}`, "Venn diagram region values must be finite numbers or non-empty strings.");
    }
  });

  const { aOnly, intersection, bOnly, neither, total } = value;
  if (
    isFiniteNumber(aOnly) &&
    isFiniteNumber(intersection) &&
    isFiniteNumber(bOnly) &&
    isFiniteNumber(neither) &&
    isFiniteNumber(total) &&
    total < aOnly + intersection + bOnly + neither
  ) {
    addIssue("FAIL", "venn-diagram-payload", `${path}.total`, "Numeric Venn diagram total must be at least the sum of the numeric regions.");
  }
}

function isTableValue(value: unknown) {
  return isFiniteNumber(value) || isNonEmptyString(value);
}

function validateTwoWayTableDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "two-way-table-payload", path, "Two-way table diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "two-way-table-payload", path, "Two-way table diagram requires a description.");
  }

  if (
    !Array.isArray(value.rowLabels) ||
    value.rowLabels.length === 0 ||
    value.rowLabels.some((label) => !isNonEmptyString(label))
  ) {
    addIssue("FAIL", "two-way-table-payload", path, "Two-way table diagram requires a non-empty rowLabels array.");
  }

  if (
    !Array.isArray(value.columnLabels) ||
    value.columnLabels.length === 0 ||
    value.columnLabels.some((label) => !isNonEmptyString(label))
  ) {
    addIssue("FAIL", "two-way-table-payload", path, "Two-way table diagram requires a non-empty columnLabels array.");
  }

  if (!Array.isArray(value.values)) {
    addIssue("FAIL", "two-way-table-payload", path, "Two-way table diagram requires a rectangular values array.");
    return;
  }

  const rowCount = Array.isArray(value.rowLabels) ? value.rowLabels.length : 0;
  const columnCount = Array.isArray(value.columnLabels) ? value.columnLabels.length : 0;
  if (
    value.values.length !== rowCount ||
    value.values.some(
      (row) =>
        !Array.isArray(row) ||
        row.length !== columnCount ||
        row.some((cell) => !isTableValue(cell))
    )
  ) {
    addIssue("FAIL", "two-way-table-payload", `${path}.values`, "Values must be a rectangular rowLabels by columnLabels array of finite numbers or non-empty strings.");
  }

  if (
    value.rowTotals !== undefined &&
    (!Array.isArray(value.rowTotals) ||
      value.rowTotals.length !== rowCount ||
      value.rowTotals.some((total) => !isTableValue(total)))
  ) {
    addIssue("FAIL", "two-way-table-payload", `${path}.rowTotals`, "rowTotals must match rowLabels and contain finite numbers or non-empty strings.");
  }

  if (
    value.columnTotals !== undefined &&
    (!Array.isArray(value.columnTotals) ||
      value.columnTotals.length !== columnCount ||
      value.columnTotals.some((total) => !isTableValue(total)))
  ) {
    addIssue("FAIL", "two-way-table-payload", `${path}.columnTotals`, "columnTotals must match columnLabels and contain finite numbers or non-empty strings.");
  }

  if (value.grandTotal !== undefined && !isTableValue(value.grandTotal)) {
    addIssue("FAIL", "two-way-table-payload", `${path}.grandTotal`, "grandTotal must be a finite number or non-empty string.");
  }

  if (value.highlight === undefined) return;
  if (!isRecord(value.highlight)) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight`, "highlight must be an object.");
    return;
  }

  const { kind, rowIndex, columnIndex } = value.highlight;
  const validKinds = ["cell", "row", "column", "row-total", "column-total", "grand-total"];
  if (!validKinds.includes(String(kind))) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight.kind`, "highlight kind is invalid.");
    return;
  }

  const hasValidRowIndex = Number.isInteger(rowIndex) && Number(rowIndex) >= 0 && Number(rowIndex) < rowCount;
  const hasValidColumnIndex = Number.isInteger(columnIndex) && Number(columnIndex) >= 0 && Number(columnIndex) < columnCount;
  if ((kind === "cell" || kind === "row" || kind === "row-total") && !hasValidRowIndex) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight.rowIndex`, "highlight requires a valid rowIndex.");
  }
  if ((kind === "cell" || kind === "column" || kind === "column-total") && !hasValidColumnIndex) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight.columnIndex`, "highlight requires a valid columnIndex.");
  }
  if (kind === "row-total" && !Array.isArray(value.rowTotals)) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight`, "row-total highlight requires rowTotals.");
  }
  if (kind === "column-total" && !Array.isArray(value.columnTotals)) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight`, "column-total highlight requires columnTotals.");
  }
  if (kind === "grand-total" && value.grandTotal === undefined) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight`, "grand-total highlight requires grandTotal.");
  }
  if (value.highlight.label !== undefined && !isNonEmptyString(value.highlight.label)) {
    addIssue("FAIL", "two-way-table-payload", `${path}.highlight.label`, "highlight label must be non-empty when supplied.");
  }
}

function validateProbabilityTreeDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "probability-tree-payload", path, "Probability tree diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "probability-tree-payload", path, "Probability tree diagram requires a description.");
  }

  if (value.rootLabel !== undefined && !isNonEmptyString(value.rootLabel)) {
    addIssue("FAIL", "probability-tree-payload", `${path}.rootLabel`, "rootLabel must be non-empty when supplied.");
  }

  if (
    value.stages !== undefined &&
    (!Array.isArray(value.stages) || value.stages.some((stage) => !isNonEmptyString(stage)))
  ) {
    addIssue("FAIL", "probability-tree-payload", `${path}.stages`, "stages must be an array of non-empty strings when supplied.");
  }

  if (!Array.isArray(value.branches) || value.branches.length === 0) {
    addIssue("FAIL", "probability-tree-payload", `${path}.branches`, "Probability tree diagram requires a non-empty branches array.");
    return;
  }

  let maximumDepth = 0;
  function validateBranches(branches: unknown[], branchPath: string, depth: number) {
    maximumDepth = Math.max(maximumDepth, depth);
    const siblingIds = new Set<string>();
    branches.forEach((branch, index) => {
      const currentPath = `${branchPath}[${index}]`;
      if (!isRecord(branch)) {
        addIssue("FAIL", "probability-tree-payload", currentPath, "Probability tree branch must be an object.");
        return;
      }
      if (!isNonEmptyString(branch.id)) {
        addIssue("FAIL", "probability-tree-payload", `${currentPath}.id`, "Probability tree branch requires a non-empty id.");
      } else if (siblingIds.has(branch.id)) {
        addIssue("FAIL", "probability-tree-payload", `${currentPath}.id`, "Probability tree branch ids must be unique among siblings.");
      } else {
        siblingIds.add(branch.id);
      }
      if (!isNonEmptyString(branch.label)) {
        addIssue("FAIL", "probability-tree-payload", `${currentPath}.label`, "Probability tree branch requires a non-empty label.");
      }
      if (branch.probability !== undefined && !isNonEmptyString(branch.probability)) {
        addIssue("FAIL", "probability-tree-payload", `${currentPath}.probability`, "Probability tree branch probability must be a non-empty string when supplied.");
      }
      if (branch.children !== undefined) {
        if (!Array.isArray(branch.children) || branch.children.length === 0) {
          addIssue("FAIL", "probability-tree-payload", `${currentPath}.children`, "Probability tree branch children must be a non-empty array when supplied.");
        } else {
          validateBranches(branch.children, `${currentPath}.children`, depth + 1);
        }
      }
    });
  }
  validateBranches(value.branches, `${path}.branches`, 1);

  if (maximumDepth > 4) {
    addIssue("FAIL", "probability-tree-payload", path, "Probability tree depth must not exceed 4 stages.");
  }

  if (value.highlightedPaths === undefined) return;
  if (!Array.isArray(value.highlightedPaths)) {
    addIssue("FAIL", "probability-tree-payload", `${path}.highlightedPaths`, "highlightedPaths must be an array when supplied.");
    return;
  }

  function pathExists(branches: unknown[], highlightedPath: unknown[]): boolean {
    if (highlightedPath.length === 0) return false;
    const [nextId, ...remainingIds] = highlightedPath;
    if (!isNonEmptyString(nextId)) return false;
    const matchingBranch = branches.find(
      (branch) => isRecord(branch) && branch.id === nextId
    );
    if (!matchingBranch || !isRecord(matchingBranch)) return false;
    if (remainingIds.length === 0) return true;
    return Array.isArray(matchingBranch.children) &&
      pathExists(matchingBranch.children, remainingIds);
  }

  value.highlightedPaths.forEach((highlightedPath, index) => {
    if (
      !Array.isArray(highlightedPath) ||
      !pathExists(value.branches as unknown[], highlightedPath)
    ) {
      addIssue("FAIL", "probability-tree-payload", `${path}.highlightedPaths[${index}]`, "Highlighted probability-tree path must reference a valid non-empty branch-id path.");
    }
  });
}

function validateVisualPayloads(lesson: ExplicitLesson, basePath: string) {
  visualItems(lesson).forEach((item, index) => {
    const path = `${basePath}.visualItem[${index}]`;
    if (item.triangleDiagram) validateTriangleDiagram(item.triangleDiagram, `${path}.triangleDiagram`);
    if (item.cartesianGraph) validateCartesianGraph(item.cartesianGraph, `${path}.cartesianGraph`);
    if (item.unitCircleDiagram) validateUnitCircleDiagram(item.unitCircleDiagram, `${path}.unitCircleDiagram`);
    if (item.trigGraphDiagram) validateTrigGraphDiagram(item.trigGraphDiagram, `${path}.trigGraphDiagram`);
    if (item.argandDiagram) validateArgandDiagram(item.argandDiagram, `${path}.argandDiagram`);
    if (item.vector3DDiagram) validateVector3DDiagram(item.vector3DDiagram, `${path}.vector3DDiagram`);
    if (item.trapezoidalRuleDiagram) {
      validateTrapezoidalRuleDiagram(item.trapezoidalRuleDiagram, `${path}.trapezoidalRuleDiagram`);
    }
    if (item.boxPlotDiagram) validateBoxPlotDiagram(item.boxPlotDiagram, `${path}.boxPlotDiagram`);
    if (item.normalDistributionDiagram) {
      validateNormalDistributionDiagram(item.normalDistributionDiagram, `${path}.normalDistributionDiagram`);
    }
    if (item.probabilityTreeDiagram) {
      validateProbabilityTreeDiagram(item.probabilityTreeDiagram, `${path}.probabilityTreeDiagram`);
    }
    if (item.twoWayTableDiagram) {
      validateTwoWayTableDiagram(item.twoWayTableDiagram, `${path}.twoWayTableDiagram`);
    }
    if (item.vennDiagram) validateVennDiagram(item.vennDiagram, `${path}.vennDiagram`);
    if (item.diagram) validateNetworkDiagram(item.diagram, `${path}.diagram`);
    if ("solutionDiagram" in item && item.solutionDiagram) {
      validateNetworkDiagram(item.solutionDiagram, `${path}.solutionDiagram`);
    }
  });
}

function placeholderText(lesson: ExplicitLesson) {
  return JSON.stringify({
    description: lesson.description,
    learningIntention: lesson.learningIntention,
    successCriteria: lesson.successCriteria,
    teaching: lesson.teaching,
    workedExamples: lesson.workedExamples,
    guidedPractice: lesson.guidedPractice,
    independentPractice: lesson.independentPractice,
    commonMistakes: lesson.commonMistakes,
    masteryQuiz: lesson.masteryQuiz,
    multiPartPractice: lesson.multiPartPractice,
  });
}

function looksLikeGeneratedFallback(lesson: ExplicitLesson) {
  return (
    lesson.workedExamples.length === 2 &&
    lesson.teaching.paragraphs.some((paragraph) =>
      paragraph.includes("The aim is to recognise the structure of the question before doing any calculation.")
    )
  );
}

function promptRevealsAnswer(question: PracticeQuestion): boolean {
  const answer = question.answer?.trim() ?? "";
  const numeric = Number(answer.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(numeric) || Math.abs(numeric) < 10) return false;
  const escaped = String(Math.abs(numeric)).replace(/\./g, "\\.");
  const prompt = question.prompt ?? "";
  return new RegExp(`(?<![\\d.])${escaped}(?![\\d])`, "g").test(prompt);
}

function latexContainsWorkingSteps(latex: string): boolean {
  if (/=\s*-?\d+(?:[.,]\d+)?\s*=/.test(latex)) return true;
  if (/\\(?:Rightarrow|implies|therefore|Longrightarrow)/.test(latex)) return true;
  return false;
}

function feedbackOnlyRestatesAnswer(question: PracticeQuestion) {
  const explanation = question.explanation?.trim() ?? "";
  const normalised = explanation.toLowerCase().replace(/[.\s]+$/g, "");
  const answer = question.answer.toLowerCase().replace(/[.\s]+$/g, "");
  return (
    /^the answer is\b/i.test(explanation) ||
    /^correct answer\b/i.test(explanation) ||
    normalised === answer ||
    normalised === `answer: ${answer}` ||
    normalised === `correct answer: ${answer}`
  );
}

function questionStimulusText(question: PracticeQuestion) {
  return [
    question.prompt,
    question.latex,
    ...(question.choices?.map((choice) => choice.text) ?? []),
    ...(question.parts?.flatMap((part) => [part.prompt, part.latex]) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

const freeTextPartPromptPattern =
  /\b(?:prove|show\s+that|justify|explain|why|describe|discuss)\b/i;
const sentenceLikeAnswerPattern = /\s{2,}|(?<!\d)\.(?!\d)|[!?]|\b(?:because|therefore|hence|since)\b/i;

function looksAutoMarkableAnswer(answer: string) {
  const trimmed = answer.trim();
  if (!trimmed) return false;
  if (trimmed.length > 80) return false;
  if (sentenceLikeAnswerPattern.test(trimmed)) return false;
  return true;
}

function acceptedVariantsRecommended(answer: string) {
  return /[(),\s]|−|\\frac|\/|-/.test(answer) && !/^-?\d+(?:\.\d+)?$/.test(answer.trim());
}

function validateMultiPartQuestion(question: PracticeQuestion, questionPath: string) {
  if (!isNonEmptyString(question.id)) {
    addIssue("FAIL", "multipart-question-shape", questionPath, "Multi-part question requires an id.");
  }

  if (!isNonEmptyString(question.prompt)) {
    addIssue("FAIL", "multipart-question-shape", questionPath, "Multi-part question requires a prompt.");
  }

  if (question.choices?.length) {
    addIssue("FAIL", "multipart-question-shape", questionPath, "Multi-part questions must not use MCQ choices.");
  }

  if (!Array.isArray(question.parts) || question.parts.length === 0) {
    addIssue("FAIL", "multipart-question-shape", questionPath, "Multi-part question requires a non-empty parts array.");
    return;
  }

  const seenKeys = new Set<string>();
  question.parts.forEach((part, index) => {
    const partPath = `${questionPath}.parts[${index}]`;

    for (const field of ["key", "label", "prompt", "answer", "explanation"] as const) {
      if (!isNonEmptyString(part[field])) {
        addIssue("FAIL", "multipart-part-shape", partPath, `Part requires non-empty ${field}.`);
      }
    }

    if (isNonEmptyString(part.key)) {
      if (seenKeys.has(part.key)) {
        addIssue("FAIL", "multipart-part-shape", partPath, `Duplicate part key "${part.key}".`);
      }
      seenKeys.add(part.key);
    }

    if (!isFiniteNumber(part.marks) || part.marks <= 0) {
      addIssue("FAIL", "multipart-part-shape", partPath, "Part marks must be a positive number.");
    }

    if (isNonEmptyString(part.prompt) && freeTextPartPromptPattern.test(part.prompt)) {
      addIssue(
        "FAIL",
        "multipart-free-text",
        partPath,
        "Part prompt appears to require proof/free-text marking; MVP multi-part parts must be exact, numeric, coordinate, or simple algebraic answers."
      );
    }

    if (isNonEmptyString(part.answer) && !looksAutoMarkableAnswer(part.answer)) {
      addIssue(
        "FAIL",
        "multipart-free-text",
        partPath,
        `Part answer "${part.answer}" does not look safely auto-markable.`
      );
    }

    const variants = part.acceptedAnswers ?? [];
    if (variants.some((answer) => !isNonEmptyString(answer))) {
      addIssue("FAIL", "multipart-part-shape", partPath, "acceptedAnswers entries must be non-empty strings.");
    }

    if (isNonEmptyString(part.answer) && acceptedVariantsRecommended(part.answer) && variants.length === 0) {
      addIssue(
        "WARN",
        "multipart-accepted-answer-variants",
        partPath,
        "Part answer has formatting-sensitive notation; add acceptedAnswers variants if students may type it differently."
      );
    }
  });
}

function compactExcerpt(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 180);
}

function hasSelfContainedTableData(text: string) {
  const numericTokens = text.match(/-?\d+(?:\.\d+)?/g) ?? [];
  return (
    tableDataPattern.test(text) &&
    numericTokens.length >= 3 &&
    /[,;:|]|\n|\brow\b|\bcolumn\b|\bfrequency\b/i.test(text)
  );
}

function classifyQuestionVisualStimulus(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
  section: QuestionRecord["section"],
  question: PracticeQuestion
) {
  const text = questionStimulusText(question);
  if (!text.trim() || hasItemVisualPayload(question)) return;

  const path = `${lessonPath(courseSlug, unitSlug, lessonSlug)}/${section}/${question.id}`;
  if (hasSelfContainedTableData(text)) {
    visualStimulusFindings.push({
      kind: "text table/data fully present",
      courseSlug,
      unitSlug,
      lessonSlug,
      path,
      excerpt: compactExcerpt(text),
    });
    return;
  }

  if (visualRequiredPattern.test(text)) {
    visualStimulusFindings.push({
      kind: "visual required, no payload",
      courseSlug,
      unitSlug,
      lessonSlug,
      path,
      excerpt: compactExcerpt(text),
    });
    addIssue(
      "WARN",
      "visual-required-no-payload",
      path,
      "Question stimulus asks students to use/read a visual, but this question has no visual payload."
    );
    return;
  }

  if (visualHelpfulPattern.test(text)) {
    visualStimulusFindings.push({
      kind: "visual helpful but not required",
      courseSlug,
      unitSlug,
      lessonSlug,
      path,
      excerpt: compactExcerpt(text),
    });
  }
}

function validateIndexExports(year: "year9" | "year10") {
  const directory = join(workspaceRoot, "lib", "lessons", year);
  const indexPath = join(directory, "index.ts");
  const runtimeExports = year === "year9" ? year9Exports : year10Exports;

  if (!existsSync(indexPath)) {
    addIssue("FAIL", "missing-index", `lib/lessons/${year}/index.ts`, "Missing lesson index file.");
    return;
  }

  const source = readFileSync(indexPath, "utf8");
  const exportMatches = [
    ...source.matchAll(/export\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*["']\.\/([^"']+)["']/g),
  ];
  const exportedModules = new Set(exportMatches.map((match) => match[2]));

  for (const [, exportName, moduleName] of exportMatches) {
    const modulePath = join(directory, `${moduleName}.ts`);
    if (!existsSync(modulePath)) {
      addIssue("FAIL", "missing-export-file", `lib/lessons/${year}/index.ts`, `Export "${exportName}" points to missing file "./${moduleName}.ts".`);
    }

    if (typeof runtimeExports[exportName as keyof typeof runtimeExports] !== "function") {
      addIssue("FAIL", "missing-runtime-export", `lib/lessons/${year}/index.ts`, `Export "${exportName}" is not a callable lesson override.`);
    }
  }

  for (const filename of readdirSync(directory)) {
    if (extname(filename) !== ".ts" || filename === "index.ts") continue;
    const moduleName = basename(filename, ".ts");
    if (!exportedModules.has(moduleName)) {
      addIssue("FAIL", "unexported-lesson-file", `lib/lessons/${year}/${filename}`, "Lesson override file is not exported from index.ts.");
    }
  }
}

function validateLesson(
  courseSlug: string,
  unitSlug: string,
  lesson: ExplicitLesson
) {
  const path = lessonPath(courseSlug, unitSlug, lesson.slug);
  const isStrictYear = courseSlug === "year-9-mathematics" || courseSlug === "year-10-mathematics";

  if (lesson.id !== lesson.slug) {
    addIssue("FAIL", "lesson-id-slug", path, `Lesson id "${lesson.id}" must match slug "${lesson.slug}".`);
  }

  if (looksLikeGeneratedFallback(lesson)) {
    addIssue("FAIL", "missing-explicit-lesson", path, "Catalogue lesson seed resolved to generated fallback content instead of an explicit lesson override.");
  }

  if (isStrictYear) {
    const counts = {
      workedExamples: lesson.workedExamples.length,
      guidedPractice: lesson.guidedPractice.length,
      independentPractice: lesson.independentPractice.length,
      commonMistakes: lesson.commonMistakes.length,
      masteryQuiz: lesson.masteryQuiz.length,
    };
    const expected = {
      workedExamples: 3,
      guidedPractice: 4,
      independentPractice: 5,
      commonMistakes: 4,
      masteryQuiz: 10,
    };

    for (const key of Object.keys(expected) as Array<keyof typeof expected>) {
      if (counts[key] !== expected[key]) {
        addIssue("FAIL", "lesson-structure", path, `${key} has ${counts[key]} items; expected ${expected[key]}.`);
      }
    }

    if (lesson.masteryPassMark !== 0.8) {
      addIssue("FAIL", "mastery-pass-mark", path, `masteryPassMark is ${lesson.masteryPassMark}; expected 0.8.`);
    }
  }

  if (placeholderPattern.test(placeholderText(lesson))) {
    addIssue("FAIL", "placeholder-content", path, "Active teaching, practice or mastery content contains a forbidden placeholder string.");
  }

  validateVisualPayloads(lesson, path);

  const questions = questionRecords(lesson);
  for (const { section, question } of questions) {
    const questionPath = `${path}/${section}/${question.id}`;
    classifyQuestionVisualStimulus(courseSlug, unitSlug, lesson.slug, section, question);

    if (section === "multiPartPractice" || question.parts?.length) {
      validateMultiPartQuestion(question, questionPath);
      continue;
    }

    if (question.choices) {
      const labels = question.choices.map((choice) => choice.label);
      if (!labels.includes(question.answer)) {
        addIssue("FAIL", "invalid-mc-answer", questionPath, `Answer "${question.answer}" is not one of the visible choice labels: ${labels.join(", ")}.`);
      }
    } else {
      const distinctVariants = new Set(
        (question.acceptedAnswers ?? [])
          .map((answer) => answer.trim())
          .filter((answer) => answer.length > 0 && answer !== question.answer.trim())
      );
      if (distinctVariants.size === 0) {
        addIssue("WARN", "typed-answer-no-variants", questionPath, "Typed answer has no acceptedAnswers variant beyond the canonical answer.");
      }
    }

    if (feedbackOnlyRestatesAnswer(question)) {
      addIssue("WARN", "generic-feedback", questionPath, "Feedback only restates the answer.");
    }

    if (!question.choices && promptRevealsAnswer(question)) {
      addIssue(
        "WARN",
        "prompt-reveals-answer",
        questionPath,
        `Prompt may state the answer directly (answer "${question.answer}" appears as a standalone number in the prompt).`
      );
    }

    if (question.latex && latexContainsWorkingSteps(question.latex)) {
      addIssue(
        "WARN",
        "latex-working-steps",
        questionPath,
        "latex field appears to contain multi-step working (= X = Y chain or step arrows). Move worked steps to the explanation."
      );
    }
  }

  if (!hasVisualPayload(lesson)) {
    addIssue("WARN", "no-visual-payload", path, "Lesson has no visual payload.");
  }
}

function printIssueList(title: string, issues: AuditIssue[]) {
  console.log(`\n${title}`);
  if (issues.length === 0) {
    console.log("  None");
    return;
  }

  for (const issue of issues) {
    console.log(`  [${issue.level}] ${issue.rule} :: ${issue.path}`);
    console.log(`    ${issue.message}`);
  }
}

function countByRule(issues: AuditIssue[]) {
  const counts = new Map<string, number>();
  for (const issue of issues) counts.set(issue.rule, (counts.get(issue.rule) ?? 0) + 1);
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function printWarningSummary() {
  console.log("\nWARNING SUMMARY");
  if (warnings.length === 0) {
    console.log("  None");
    return;
  }

  for (const [rule, count] of countByRule(warnings)) {
    console.log(`  ${rule}: ${count}`);
  }
}

function printCourseUnitWarningBreakdown(records: LessonRecord[]) {
  console.log("\nCOURSE / UNIT WARNING BREAKDOWN");
  for (const course of newCoursePathways) {
    console.log(`  ${course.slug}`);
    for (const unit of course.units) {
      if (unit.lessons.length === 0) continue;
      const prefix = `${course.slug}/${unit.slug}/`;
      const unitWarnings = warnings.filter((issue) => issue.path.startsWith(prefix));
      console.log(`    ${unit.slug}: ${unitWarnings.length} warning(s)`);
      for (const record of records.filter(
        (item) => item.courseSlug === course.slug && item.unitSlug === unit.slug
      )) {
        const lessonWarnings = warnings.filter((issue) =>
          issue.path.startsWith(`${prefix}${record.lesson.slug}`)
        );
        console.log(`      ${record.lesson.slug}: ${lessonWarnings.length}`);
      }
    }
  }
}

function countVisualFindingsByKind() {
  const counts = new Map<VisualFindingKind, number>();
  for (const finding of visualStimulusFindings) {
    counts.set(finding.kind, (counts.get(finding.kind) ?? 0) + 1);
  }

  return [
    "visual required, no payload",
    "visual helpful but not required",
    "text table/data fully present",
  ].map((kind) => [kind, counts.get(kind as VisualFindingKind) ?? 0] as const);
}

function printVisualStimulusReport() {
  console.log("\nVISUAL STIMULUS AUDIT");
  console.log("  Fields inspected: prompt, latex, and choice text only.");
  console.log("  Fields ignored: hint, explanation, teaching paragraphs, helper feedback, and generic feedback strings.");
  console.log("  Distinctions:");
  for (const [kind, count] of countVisualFindingsByKind()) {
    console.log(`    ${kind}: ${count}`);
  }

  const grouped = new Map<string, Record<VisualFindingKind, number>>();
  for (const finding of visualStimulusFindings) {
    const key = `${finding.courseSlug}/${finding.unitSlug}`;
    const counts =
      grouped.get(key) ??
      {
        "visual required, no payload": 0,
        "visual helpful but not required": 0,
        "text table/data fully present": 0,
      };
    counts[finding.kind] += 1;
    grouped.set(key, counts);
  }

  console.log("  Category counts by course/unit:");
  if (grouped.size === 0) {
    console.log("    None");
  } else {
    for (const [key, counts] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      console.log(
        `    ${key}: required=${counts["visual required, no payload"]}, helpful=${counts["visual helpful but not required"]}, text-data=${counts["text table/data fully present"]}`
      );
    }
  }

  const allRequired = visualStimulusFindings.filter(
    (finding) => finding.kind === "visual required, no payload"
  );

  console.log("  All visual-required-no-payload findings by lesson:");
  if (allRequired.length === 0) {
    console.log("    None");
  } else {
    const byLesson = new Map<string, VisualStimulusFinding[]>();
    for (const finding of allRequired) {
      const lessonKey = `${finding.courseSlug}/${finding.unitSlug}/${finding.lessonSlug}`;
      const bucket = byLesson.get(lessonKey) ?? [];
      bucket.push(finding);
      byLesson.set(lessonKey, bucket);
    }
    for (const [lessonKey, findings] of [...byLesson.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      console.log(`    ${lessonKey} (${findings.length}):`);
      for (const finding of findings) {
        const qId = finding.path.split("/").pop() ?? finding.path;
        console.log(`      ${qId}: ${finding.excerpt.slice(0, 120)}`);
      }
    }
  }
}

function audit() {
  validateIndexExports("year9");
  validateIndexExports("year10");

  const records: LessonRecord[] = [];
  const lessonIds = new Map<string, string[]>();
  const lessonSlugs = new Map<string, string[]>();
  const questionIds = new Map<string, string[]>();
  const stableSkillMapIds = new Map<string, string[]>();

  for (const course of newCoursePathways) {
    for (const unit of course.units) {
      for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
        const path = lessonPath(course.slug, unit.slug, lesson.slug);
        records.push({ courseSlug: course.slug, unitSlug: unit.slug, lesson });
        const lessonIdScope = `${course.slug}/${unit.slug}/${lesson.id}`;
        const lessonSlugScope = `${course.slug}/${unit.slug}/${lesson.slug}`;
        lessonIds.set(lessonIdScope, [...(lessonIds.get(lessonIdScope) ?? []), path]);
        lessonSlugs.set(lessonSlugScope, [...(lessonSlugs.get(lessonSlugScope) ?? []), path]);

        for (const { question } of questionRecords(lesson)) {
          questionIds.set(question.id, [...(questionIds.get(question.id) ?? []), path]);
        }

        validateLesson(course.slug, unit.slug, lesson);
      }
    }
  }

  for (const [idScope, paths] of lessonIds) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-lesson-id", paths.join(", "), `Duplicate route-scoped lesson id "${idScope}".`);
  }

  for (const [slugScope, paths] of lessonSlugs) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-lesson-slug", paths.join(", "), `Duplicate route-scoped lesson slug "${slugScope}".`);
  }

  for (const [id, paths] of questionIds) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-question-id", paths.join(", "), `Duplicate question id "${id}".`);
  }

  for (const node of flattenSkillMapV2Nodes()) {
    const path = `${node.courseSlug}/${node.topicSlug}/${node.subtopicSlug}/${node.type}`;
    stableSkillMapIds.set(node.stableId, [
      ...(stableSkillMapIds.get(node.stableId) ?? []),
      path,
    ]);
  }

  for (const [stableId, paths] of stableSkillMapIds) {
    if (paths.length > 1) {
      addIssue(
        "FAIL",
        "duplicate-skill-map-stable-id",
        paths.join(", "),
        `Duplicate Skill Map v2 stable ID "${stableId}".`
      );
    }
  }

  const rendererSource = readFileSync(
    join(workspaceRoot, "app", "course", "LessonRenderer.tsx"),
    "utf8"
  );
  const videoStageDisabled = /export const WATCH_STAGE_ENABLED\s*=\s*false/.test(rendererSource);
  if (videoStageDisabled) {
    for (const record of records) {
      if (/placeholder/i.test(record.lesson.video.title) || /placeholder/i.test(record.lesson.video.url)) {
        addIssue(
          "WARN",
          "dormant-video-placeholder",
          lessonPath(record.courseSlug, record.unitSlug, record.lesson.slug),
          "Video placeholder is dormant while WATCH_STAGE_ENABLED is false."
        );
      }
    }
  }

  console.log("NOVA MATHS LESSON QA AUDIT");
  console.log(`Audited ${records.length} catalogue lesson(s) across ${newCoursePathways.length} course pathway(s).`);
  printIssueList("FAIL-LEVEL ISSUES", failures);
  printWarningSummary();
  printVisualStimulusReport();
  printCourseUnitWarningBreakdown(records);

  console.log(`\nFINAL RESULT: ${failures.length > 0 ? "FAIL" : "PASS"}`);
  console.log(`  Failures: ${failures.length}`);
  console.log(`  Warnings: ${warnings.length}`);

  if (failures.length > 0) process.exitCode = 1;
}

audit();
