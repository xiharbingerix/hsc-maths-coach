export type LessonDeliveryMode = "zoom" | "classroom";
export type StudentLevel = "level-1" | "level-2" | "level-3";

export const STUDENT_LEVEL_ORDER: StudentLevel[] = [
  "level-1",
  "level-2",
  "level-3",
];

export const DELIVERY_MODE_DETAILS: Record<
  LessonDeliveryMode,
  { label: string; description: string }
> = {
  zoom: {
    label: "Zoom tutoring",
    description: "One tutor and one student using screen share, chat and conversation.",
  },
  classroom: {
    label: "Classroom",
    description: "A teacher-led class with whole-class checks, pair talk and independent work.",
  },
};

export const STUDENT_LEVEL_DETAILS: Record<
  StudentLevel,
  { label: string; shortLabel: string; description: string }
> = {
  "level-1": {
    label: "Level 1 — needs extra scaffolding",
    shortLabel: "Level 1",
    description:
      "Meets the same outcomes with smaller steps, more support and a reduced core question set.",
  },
  "level-2": {
    label: "Level 2 — meets outcomes",
    shortLabel: "Level 2",
    description:
      "Works at the expected pace with normal modelling, guided practice and independent practice.",
  },
  "level-3": {
    label: "Level 3 — exceeds outcomes",
    shortLabel: "Level 3",
    description:
      "Moves quickly through the core skill, explains why it works and completes harder extensions.",
  },
};

/** Keep saved plans made before the Level 1–3 labels were introduced usable. */
export function normaliseStudentLevel(value: string | undefined): StudentLevel {
  if (value === "level-1" || value === "struggling") return "level-1";
  if (value === "level-3" || value === "extension") return "level-3";
  return "level-2";
}

/** Read both new multi-level values and legacy single-level saved plans. */
export function normaliseStudentLevels(
  value: unknown,
  fallback?: string,
): StudentLevel[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split("+")
      : [];
  const levels = new Set<StudentLevel>();

  for (const raw of rawValues) {
    if (typeof raw !== "string") continue;
    if (raw === "level-1" || raw === "struggling") levels.add("level-1");
    if (raw === "level-2" || raw === "on-track") levels.add("level-2");
    if (raw === "level-3" || raw === "extension") levels.add("level-3");
  }

  if (levels.size === 0) levels.add(normaliseStudentLevel(fallback));
  return STUDENT_LEVEL_ORDER.filter((level) => levels.has(level));
}

export function studentLevelKey(levels: StudentLevel[]): string {
  return normaliseStudentLevels(levels).join("+");
}

export function primaryStudentLevel(levels: StudentLevel[]): StudentLevel {
  const normalised = normaliseStudentLevels(levels);
  return normalised.includes("level-2") ? "level-2" : normalised[0];
}

export function normaliseDeliveryMode(
  value: string | undefined,
): LessonDeliveryMode {
  return value === "classroom" ? "classroom" : "zoom";
}
