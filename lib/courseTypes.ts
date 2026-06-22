export type NewCourseSlug =
  | "year-12-standard-2"
  | "year-12-standard-1"
  | "year-11-advanced"
  | "year-11-standard"
  | "year-11-extension"
  | "year-12-extension-1"
  | "year-12-extension-2"
  | "year-8-mathematics"
  | "year-9-mathematics"
  | "year-9-mathematics-core"
  | "year-9-mathematics-advanced"
  | "year-10-mathematics"
  | "year-10-mathematics-core"
  | "year-10-mathematics-advanced"
  | "year-7-mathematics";

export type CoursePathwayStatus = "available" | "in_progress" | "coming_soon" | "hidden";

export type SkillCheckpointSeed = {
  stableCheckpointId: string;
  label: string;
  legacySlugs?: string[];
};

// Year 10 Cambridge "10 & 10A" path tag (ADR-Y10-001). Declarative replacement for the
// hardcoded Core/Path slug blacklists: each Year 10 section is tagged with exactly one of these.
//   core          = Stage 5.2  (in Core, Base and Advanced)
//   path          = Stage 5.3  (in Base and Advanced; excluded from Core)
//   extending     = Stage 5.3§ (Advanced only)
//   consolidating = review     (Core only)
// The tag-driven pathway filters are locked in ADR-Y10-001 (gate G7) — see PATH_TAG_FILTERS.
export type PathTag = "core" | "path" | "extending" | "consolidating";

export type CourseLessonSeed = {
  slug: string;
  title: string;
  description?: string;
  seedQuestions?: boolean;
  showInCourseNav?: boolean;
  stableSkillId?: string;
  legacySlugs?: string[];
  skillCheckpoints?: SkillCheckpointSeed[];
  pathTag?: PathTag;
};

export type CourseUnitSeed = {
  slug: string;
  title: string;
  description: string;
  syllabusArea: string;
  focus: string;
  lessons: CourseLessonSeed[];
};

export type CoursePathwaySeed = {
  slug: NewCourseSlug;
  title: string;
  yearLevel: string;
  courseType: string;
  status: CoursePathwayStatus;
  description: string;
  positioning: string;
  units: CourseUnitSeed[];
};
