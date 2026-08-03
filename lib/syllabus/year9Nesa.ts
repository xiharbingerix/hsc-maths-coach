import syllabusJson from "./year9NesaSyllabus.json";

export type NesaContentPoint = {
  id: string;
  code: string;
  text: string;
  sourceHtml: string;
  including?: string;
  lastModified: string | null;
};

export type NesaContentGroup = {
  id: string;
  code: string;
  title: string;
  contentPoints: NesaContentPoint[];
};

export type NesaFocusArea = {
  id: string;
  code: string;
  title: string;
  classification: "core" | "path";
  outcome: {
    code: string;
    description: string;
    sourceHtml: string;
  };
  groups: NesaContentGroup[];
  sourceUrl: string;
  lastModified: string | null;
};

export type Year9NesaSyllabus = {
  syllabus: string;
  authority: string;
  stage: "Stage 5";
  stageYears: number[];
  structure: "Core–Paths";
  sourceUrl: string;
  importedAt: string;
  workingMathematically: { code: string; description: string };
  focusAreas: NesaFocusArea[];
};

export type LessonSyllabusScope = {
  syllabus: string;
  authority: string;
  stage: string;
  sourceUrl: string;
  workingMathematically: { code: string; description: string };
  outcomes: Array<{
    code: string;
    description: string;
    classification: "core" | "path";
    focusAreas: Array<{
      id: string;
      title: string;
      sourceUrl: string;
      contentGroups: Array<{
        title: string;
        contentPoints: Array<{ code: string; text: string; including?: string }>;
      }>;
    }>;
  }>;
};

export type PlannerNesaFocusArea = {
  id: string;
  title: string;
  classification: "core" | "path";
  outcome: { code: string; description: string };
  groups: Array<{
    id: string;
    title: string;
    contentPoints: Array<{
      code: string;
      text: string;
      including?: string;
    }>;
  }>;
  sourceUrl: string;
};

export type Year9PlannerSyllabusPayload = Pick<
  Year9NesaSyllabus,
  | "syllabus"
  | "authority"
  | "stage"
  | "structure"
  | "sourceUrl"
  | "importedAt"
  | "workingMathematically"
> & {
  focusAreas: PlannerNesaFocusArea[];
  unitFocusAreaIds: Record<string, string[]>;
};

export const year9NesaSyllabus = syllabusJson as Year9NesaSyllabus;

// NESA publishes a Stage 5 Core–Paths continuum, not separate Year 9/10
// syllabuses. These mappings expose the official focus areas that the app's
// current Year 9 sequence draws from; the NESA wording remains unchanged.
export const YEAR9_UNIT_FOCUS_AREA_IDS: Record<string, string[]> = {
  "computation-financial-maths": ["fa54356e3c", "facb3aa952", "fab73ea3dd"],
  "expressions-equations-inequalities": [
    "fa0f9951b1",
    "fa0e151fb2",
    "fab83522c4",
    "fa587a4c87",
  ],
  "pythagoras-trigonometry": ["fac59b13b0", "fad171c0a4"],
  "linear-relationships": ["fa7f703ea7", "fa528f5a54", "fab720e184"],
  "length-area-surface-area-volume": [
    "fad37504e5",
    "faa621ba82",
    "fab476201c",
    "fa7092943a",
  ],
  "indices-surds": ["fad97db224", "fa24d5bd5b", "fa8d9baa84"],
  "properties-geometrical-figures": [
    "fa6d9fa8bc",
    "fa222c8206",
    "fad76393f0",
  ],
  "quadratic-expressions-algebraic-techniques": ["fa0ac6000c", "fa7879a3d5"],
  "probability-data-analysis": [
    "fadd685070",
    "fa45bd1262",
    "fa0b12861f",
    "fac65551f8",
    "fa134ba697",
  ],
  "quadratic-equations-parabolas": [
    "fab83522c4",
    "fa587a4c87",
    "fafee6f5b1",
    "fa9dbfae94",
    "fa633cd425",
  ],
};

const YEAR9_COURSE_SLUGS = new Set([
  "year-9-mathematics",
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
]);

export function isYear9CourseSlug(courseSlug: string): boolean {
  return YEAR9_COURSE_SLUGS.has(courseSlug);
}

export function createYear9PlannerSyllabusPayload(): Year9PlannerSyllabusPayload {
  const relevantIds = new Set(Object.values(YEAR9_UNIT_FOCUS_AREA_IDS).flat());
  return {
    syllabus: year9NesaSyllabus.syllabus,
    authority: year9NesaSyllabus.authority,
    stage: year9NesaSyllabus.stage,
    structure: year9NesaSyllabus.structure,
    sourceUrl: year9NesaSyllabus.sourceUrl,
    importedAt: year9NesaSyllabus.importedAt,
    workingMathematically: year9NesaSyllabus.workingMathematically,
    focusAreas: year9NesaSyllabus.focusAreas
      .filter((focus) => relevantIds.has(focus.id))
      .map((focus) => ({
        id: focus.id,
        title: focus.title,
        classification: focus.classification,
        outcome: {
          code: focus.outcome.code,
          description: focus.outcome.description,
        },
        groups: focus.groups.map((group) => ({
          id: group.id,
          title: group.title,
          contentPoints: group.contentPoints.map((point) => ({
            code: point.code,
            text: point.text,
            ...(point.including ? { including: point.including } : {}),
          })),
        })),
        sourceUrl: focus.sourceUrl,
      })),
    unitFocusAreaIds: YEAR9_UNIT_FOCUS_AREA_IDS,
  };
}

export function buildYear9SyllabusScope(
  courseSlug: string,
  unitSlug: string,
  selectedContentPointCodes: string[],
): LessonSyllabusScope | undefined {
  if (!isYear9CourseSlug(courseSlug) || selectedContentPointCodes.length === 0) {
    return undefined;
  }

  const allowedFocusIds = new Set(YEAR9_UNIT_FOCUS_AREA_IDS[unitSlug] ?? []);
  const selectedCodes = new Set(selectedContentPointCodes);
  const focusAreas = year9NesaSyllabus.focusAreas.filter((focus) =>
    allowedFocusIds.has(focus.id),
  );
  const allowedCodes = new Set(
    focusAreas.flatMap((focus) =>
      focus.groups.flatMap((group) =>
        group.contentPoints.map((point) => point.code),
      ),
    ),
  );
  if ([...selectedCodes].some((code) => !allowedCodes.has(code))) {
    return undefined;
  }
  const outcomeMap = new Map<string, LessonSyllabusScope["outcomes"][number]>();

  for (const focus of focusAreas) {
    const contentGroups = focus.groups
      .map((group) => ({
        title: group.title,
        contentPoints: group.contentPoints
          .filter((point) => selectedCodes.has(point.code))
          .map((point) => ({
            code: point.code,
            text: point.text,
            ...(point.including ? { including: point.including } : {}),
          })),
      }))
      .filter((group) => group.contentPoints.length > 0);
    if (contentGroups.length === 0) continue;

    const existing = outcomeMap.get(focus.outcome.code);
    const mappedFocus = {
      id: focus.id,
      title: focus.title,
      sourceUrl: focus.sourceUrl,
      contentGroups,
    };
    if (existing) {
      existing.focusAreas.push(mappedFocus);
    } else {
      outcomeMap.set(focus.outcome.code, {
        code: focus.outcome.code,
        description: focus.outcome.description,
        classification: focus.classification,
        focusAreas: [mappedFocus],
      });
    }
  }

  const outcomes = [...outcomeMap.values()];
  if (outcomes.length === 0) return undefined;
  return {
    syllabus: year9NesaSyllabus.syllabus,
    authority: year9NesaSyllabus.authority,
    stage: year9NesaSyllabus.stage,
    sourceUrl: year9NesaSyllabus.sourceUrl,
    workingMathematically: year9NesaSyllabus.workingMathematically,
    outcomes,
  };
}
