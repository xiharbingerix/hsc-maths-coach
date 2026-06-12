import { supabaseAdmin } from "./supabaseAdmin";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type DifficultyPreset = "catch-up" | "standard" | "push-forward";
type DifficultyDist = Record<DifficultyLevel, number>;

export type WorksheetQuestionPreview = {
  id: string;
  sourceId: string | null;
  courseSlug: string;
  topicSlug: string;
  subtopicSlug: string;
  difficulty: number;
  prompt: string;
  latex: string | null;
  choices: { label: string; text: string }[] | null;
  parts: unknown[] | null;
  answer: string;
  diagramData: Record<string, unknown> | null;
};

type RawQuestionRow = {
  id: string;
  source_id: string | null;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  prompt: string;
  latex: string | null;
  choices: unknown;
  question_parts: unknown;
  answer: string;
  diagram_data: Record<string, unknown> | null;
};

export const WORKSHEET_PRESETS: Record<DifficultyPreset, DifficultyDist> = {
  "catch-up": { 1: 3, 2: 4, 3: 2, 4: 1, 5: 0 },
  standard: { 1: 1, 2: 3, 3: 3, 4: 2, 5: 1 },
  "push-forward": { 1: 0, 2: 2, 3: 3, 4: 3, 5: 2 },
};

export function isDifficultyPreset(value: unknown): value is DifficultyPreset {
  return typeof value === "string" && value in WORKSHEET_PRESETS;
}

export function scalePreset(
  preset: DifficultyDist,
  target: number
): Map<DifficultyLevel, number> {
  const total = (Object.values(preset) as number[]).reduce((s, v) => s + v, 0);
  if (total === 0) return new Map();

  const levels = (Object.keys(preset) as unknown as DifficultyLevel[]).map(
    (level) => {
      const exact = (preset[level] / total) * target;
      return {
        level,
        exact,
        floor: Math.floor(exact),
      };
    }
  );

  const floorSum = levels.reduce((s, l) => s + l.floor, 0);
  const remainder = target - floorSum;
  const sorted = [...levels].sort(
    (a, b) => b.exact - b.floor - (a.exact - a.floor)
  );

  sorted.slice(0, remainder).forEach((level) => {
    level.floor += 1;
  });

  return new Map(
    levels.filter((level) => level.floor > 0).map((level) => [level.level, level.floor])
  );
}

function normaliseChoices(
  value: unknown
): { label: string; text: string }[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  return value.map((item) => {
    const choice = item as Record<string, unknown>;
    return {
      label: String(choice.label ?? ""),
      text: String(choice.text ?? ""),
    };
  });
}

function toPreviewQuestion(row: RawQuestionRow): WorksheetQuestionPreview {
  return {
    id: row.id,
    sourceId: row.source_id,
    courseSlug: row.course_slug,
    topicSlug: row.topic_slug,
    subtopicSlug: row.subtopic_slug,
    difficulty: row.difficulty,
    prompt: row.prompt,
    latex: row.latex,
    choices: normaliseChoices(row.choices),
    parts: Array.isArray(row.question_parts) ? row.question_parts : null,
    answer: row.answer,
    diagramData: row.diagram_data ?? null,
  };
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

const QUESTION_SELECT =
  "id, source_id, course_slug, topic_slug, subtopic_slug, difficulty, prompt, latex, choices, question_parts, answer, diagram_data";

export async function selectWorksheetQuestions({
  courseSlug,
  topicSlugs,
  preset,
  totalQuestions,
  weakSubtopicSlugs = [],
  selectedSubtopicSlugs,
}: {
  courseSlug: string;
  topicSlugs: string[];
  preset: DifficultyPreset;
  totalQuestions: number;
  weakSubtopicSlugs?: string[];
  selectedSubtopicSlugs?: string[];
}) {
  const distribution = scalePreset(WORKSHEET_PRESETS[preset], totalQuestions);
  const selected: WorksheetQuestionPreview[] = [];
  const selectedIds = new Set<string>();

  // Manual admin selection takes 100% of phase-1 slots;
  // adaptive weak subtopics take 65% (existing behaviour).
  const isManual = selectedSubtopicSlugs && selectedSubtopicSlugs.length > 0;
  const prioritySubtopics = isManual ? selectedSubtopicSlugs : weakSubtopicSlugs;
  const priorityFraction = isManual ? 1.0 : 0.65;

  for (const [level, needed] of distribution) {
    if (needed === 0) continue;
    let levelCount = 0;

    // Phase 1: prioritise selected/weak subtopics
    if (prioritySubtopics.length > 0) {
      const priorityTarget = Math.ceil(needed * priorityFraction);
      const { data: priorityData, error: priorityError } = await supabaseAdmin
        .from("questions")
        .select(QUESTION_SELECT)
        .eq("course_slug", courseSlug)
        .in("topic_slug", topicSlugs)
        .in("subtopic_slug", prioritySubtopics)
        .eq("difficulty", level)
        .eq("is_active", true);

      if (priorityError) {
        throw new Error(`Could not query questions: ${priorityError.message}`);
      }

      for (const row of shuffle((priorityData ?? []) as RawQuestionRow[])) {
        if (levelCount >= priorityTarget || selected.length >= totalQuestions) break;
        if (selectedIds.has(row.id)) continue;
        selected.push(toPreviewQuestion(row));
        selectedIds.add(row.id);
        levelCount++;
      }
    }

    // Phase 2: fill remaining from all subtopics in the topic
    if (levelCount < needed) {
      const { data, error } = await supabaseAdmin
        .from("questions")
        .select(QUESTION_SELECT)
        .eq("course_slug", courseSlug)
        .in("topic_slug", topicSlugs)
        .eq("difficulty", level)
        .eq("is_active", true);

      if (error) {
        throw new Error(`Could not query questions: ${error.message}`);
      }

      for (const row of shuffle((data ?? []) as RawQuestionRow[])) {
        if (selected.length >= totalQuestions) break;
        if (selectedIds.has(row.id)) continue;
        selected.push(toPreviewQuestion(row));
        selectedIds.add(row.id);
        levelCount++;
        if (levelCount >= needed) break;
      }
    }
  }

  return selected;
}

export async function findReplacementQuestion({
  courseSlug,
  topicSlug,
  difficulty,
  excludeQuestionIds,
}: {
  courseSlug: string;
  topicSlug: string;
  difficulty: number;
  excludeQuestionIds: string[];
}) {
  const { data, error } = await supabaseAdmin
    .from("questions")
    .select(QUESTION_SELECT)
    .eq("course_slug", courseSlug)
    .eq("topic_slug", topicSlug)
    .eq("is_active", true);

  if (error) {
    throw new Error(`Could not query replacement questions: ${error.message}`);
  }

  const excluded = new Set(excludeQuestionIds);
  const candidates = ((data ?? []) as RawQuestionRow[]).filter(
    (row) => !excluded.has(row.id)
  );

  if (candidates.length === 0) {
    return null;
  }

  const nearestDistance = Math.min(
    ...candidates.map((row) => Math.abs(row.difficulty - difficulty))
  );
  const nearest = candidates.filter(
    (row) => Math.abs(row.difficulty - difficulty) === nearestDistance
  );

  return toPreviewQuestion(shuffle(nearest)[0]);
}

export async function loadApprovedWorksheetQuestions(questionIds: string[]) {
  if (questionIds.length === 0) return [];

  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("id")
    .eq("is_active", true)
    .in("id", questionIds);

  if (error) {
    throw new Error(`Could not validate approved questions: ${error.message}`);
  }

  const found = new Set(((data ?? []) as { id: string }[]).map((row) => row.id));
  return questionIds.filter((id) => found.has(id));
}
