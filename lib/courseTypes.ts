export type NewCourseSlug =
  | "year-12-standard-2"
  | "year-11-advanced"
  | "year-11-standard"
  | "year-11-extension"
  | "year-12-extension-1"
  | "year-8-mathematics"
  | "year-9-mathematics"
  | "year-10-mathematics";

export type CoursePathwayStatus = "available" | "in_progress" | "coming_soon";

export type CourseLessonSeed = {
  slug: string;
  title: string;
  description?: string;
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
