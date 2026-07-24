import { supabaseAdmin } from "./supabaseAdmin";
import { pickDiagramFields, type Choice } from "./lessons/diagramRegistry";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type DifficultyPreset =
  | "catch-up"
  | "standard"
  | "push-forward"
  | "harder"
  | "challenge"
  | "even-spread";
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
  choices: Choice[] | null;
  parts: unknown[] | null;
  answer: string;
  diagramData: Record<string, unknown> | null;
};

export type WorksheetSelectionMetadata = {
  totalCandidates: number;
  multipartCandidates: number;
  selectedMultipartCount: number;
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
  "catch-up": { 1: 3, 2: 4, 3: 2, 4: 1, 5: 0, 6: 0 },
  standard: { 1: 1, 2: 3, 3: 3, 4: 2, 5: 1, 6: 0 },
  "push-forward": { 1: 0, 2: 2, 3: 3, 4: 3, 5: 2, 6: 1 },
  // Skips Levels 1 & 2; weighted upward so 4 < 5 < 6 (most questions are the
  // hardest D6 challenge / multi-part / exam tier), with a little Level 3.
  harder: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4 },
  // Levels 4-6 only, split evenly; selection also spreads questions across
  // every selected subtopic (see orderForSubtopicCoverage) instead of the
  // usual random draw, so each subtopic is represented.
  challenge: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1 },
  // Every level equally weighted; selection spreads questions across the
  // selected topics so each topic is represented evenly.
  "even-spread": { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
};

// Presets whose selection should round-robin across a grouping column so
// every group (subtopic/topic) contributes questions evenly.
const COVERAGE_PRESETS: Partial<
  Record<DifficultyPreset, "subtopic_slug" | "topic_slug">
> = {
  challenge: "subtopic_slug",
  "even-spread": "topic_slug",
};

function hasQuestionParts(row: Pick<RawQuestionRow, "question_parts">) {
  return Array.isArray(row.question_parts) && row.question_parts.length > 0;
}

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

function normaliseChoices(value: unknown): Choice[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  return value.map((item) => {
    const choice = item as Record<string, unknown>;
    return {
      label: String(choice.label ?? ""),
      text: String(choice.text ?? ""),
      ...pickDiagramFields(choice),
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

// Keep worksheet draws varied while ensuring an available multi-part question
// is considered before single-answer alternatives at the same difficulty.
function prioritiseMultiPartQuestion(rows: RawQuestionRow[]) {
  const ordered = shuffle(rows);
  const multipartIndex = ordered.findIndex(hasQuestionParts);
  if (multipartIndex <= 0) return ordered;

  const [multipart] = ordered.splice(multipartIndex, 1);
  ordered.unshift(multipart);
  return ordered;
}

// Orders candidate rows so groups (subtopics or topics) with the fewest
// questions already selected (across the whole worksheet) come first,
// round-robin. Rows are shuffled within each group so repeated generations
// still vary.
function orderForGroupCoverage(
  rows: RawQuestionRow[],
  groupKey: "subtopic_slug" | "topic_slug",
  selectedPerGroup: Map<string, number>
) {
  const groups = new Map<string, RawQuestionRow[]>();
  for (const row of shuffle(rows)) {
    const group = groups.get(row[groupKey]);
    if (group) {
      group.push(row);
    } else {
      groups.set(row[groupKey], [row]);
    }
  }

  const virtualCounts = new Map(selectedPerGroup);
  const cursors = [...groups.entries()].map(([slug, list]) => ({
    slug,
    list: prioritiseMultiPartQuestion(list),
    index: 0,
  }));
  const ordered: RawQuestionRow[] = [];

  while (ordered.length < rows.length) {
    let best: (typeof cursors)[number] | null = null;
    for (const cursor of cursors) {
      if (cursor.index >= cursor.list.length) continue;
      if (
        !best ||
        (virtualCounts.get(cursor.slug) ?? 0) < (virtualCounts.get(best.slug) ?? 0)
      ) {
        best = cursor;
      }
    }
    if (!best) break;
    ordered.push(best.list[best.index]);
    best.index += 1;
    virtualCounts.set(best.slug, (virtualCounts.get(best.slug) ?? 0) + 1);
  }

  return ordered;
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
  const result = await selectWorksheetQuestionsWithMetadata({
    courseSlug,
    topicSlugs,
    preset,
    totalQuestions,
    weakSubtopicSlugs,
    selectedSubtopicSlugs,
  });

  return result.questions;
}

export async function selectWorksheetQuestionsWithMetadata({
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
  let totalCandidates = 0;
  let multipartCandidates = 0;

  // Manual admin selection takes 100% of phase-1 slots;
  // adaptive weak subtopics take 65% (existing behaviour).
  const isManual = selectedSubtopicSlugs && selectedSubtopicSlugs.length > 0;
  const prioritySubtopics = isManual ? selectedSubtopicSlugs : weakSubtopicSlugs;
  const priorityFraction = isManual ? 1.0 : 0.65;

  // Coverage presets spread questions across every group (subtopic or topic)
  // in scope instead of drawing at random.
  const coverageKey = COVERAGE_PRESETS[preset];
  const selectedPerGroup = new Map<string, number>();
  const orderRows = (rows: RawQuestionRow[]) =>
    coverageKey
      ? orderForGroupCoverage(rows, coverageKey, selectedPerGroup)
      : prioritiseMultiPartQuestion(rows);
  const countSelection = (row: RawQuestionRow) => {
    if (!coverageKey) return;
    selectedPerGroup.set(
      row[coverageKey],
      (selectedPerGroup.get(row[coverageKey]) ?? 0) + 1
    );
  };

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

      const priorityRows = (priorityData ?? []) as RawQuestionRow[];
      totalCandidates += priorityRows.length;
      multipartCandidates += priorityRows.filter(hasQuestionParts).length;

      for (const row of orderRows(priorityRows)) {
        if (levelCount >= priorityTarget || selected.length >= totalQuestions) break;
        if (selectedIds.has(row.id)) continue;
        selected.push(toPreviewQuestion(row));
        selectedIds.add(row.id);
        countSelection(row);
        levelCount++;
      }
    }

    // Phase 2: fill remaining from all subtopics in the topic.
    // Skipped for manual subtopic selection — that is a hard filter, so a worksheet
    // scoped to specific lessons must never backfill from other lessons in the topic
    // (Phase 1 already pulls 100% from the selected subtopics).
    if (levelCount < needed && !isManual) {
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

      const rows = (data ?? []) as RawQuestionRow[];
      totalCandidates += rows.length;
      multipartCandidates += rows.filter(hasQuestionParts).length;

      for (const row of orderRows(rows)) {
        if (selected.length >= totalQuestions) break;
        if (selectedIds.has(row.id)) continue;
        selected.push(toPreviewQuestion(row));
        selectedIds.add(row.id);
        countSelection(row);
        levelCount++;
        if (levelCount >= needed) break;
      }
    }
  }

  return {
    questions: selected,
    metadata: {
      totalCandidates,
      multipartCandidates,
      selectedMultipartCount: selected.filter((question) => question.parts?.length).length,
    },
  };
}

export async function findReplacementQuestion({
  courseSlug,
  topicSlug,
  subtopicSlug,
  difficulty,
  excludeQuestionIds,
}: {
  courseSlug: string;
  topicSlug: string;
  subtopicSlug?: string;
  difficulty: number;
  excludeQuestionIds: string[];
}) {
  let query = supabaseAdmin
    .from("questions")
    .select(QUESTION_SELECT)
    .eq("course_slug", courseSlug)
    .eq("topic_slug", topicSlug)
    .eq("is_active", true);

  if (subtopicSlug?.trim()) {
    query = query.eq("subtopic_slug", subtopicSlug);
  }

  const { data, error } = await query;

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
