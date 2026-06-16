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

export type CourseLessonSeed = {
  slug: string;
  title: string;
  description?: string;
  seedQuestions?: boolean;
  showInCourseNav?: boolean;
  stableSkillId?: string;
  legacySlugs?: string[];
  skillCheckpoints?: SkillCheckpointSeed[];
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
