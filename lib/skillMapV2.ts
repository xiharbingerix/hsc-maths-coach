import { newCoursePathways } from "./newCourseCatalog";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
  SkillCheckpointSeed,
} from "./courseTypes";

export type SkillMapV2NodeType = "skill" | "checkpoint";

export type SkillMapV2Node = {
  stableId: string;
  type: SkillMapV2NodeType;
  courseSlug: string;
  topicSlug: string;
  subtopicSlug: string;
  title: string;
  label: string;
  legacySlugs: string[];
  parentStableId?: string;
};

function lessonLegacySlugs(lesson: CourseLessonSeed) {
  return lesson.legacySlugs?.length ? lesson.legacySlugs : [lesson.slug];
}

function checkpointLegacySlugs(
  checkpoint: SkillCheckpointSeed,
  lesson: CourseLessonSeed
) {
  return checkpoint.legacySlugs?.length
    ? checkpoint.legacySlugs
    : lessonLegacySlugs(lesson);
}

export function flattenSkillMapV2Nodes(
  courses: CoursePathwaySeed[] = newCoursePathways
): SkillMapV2Node[] {
  const nodes: SkillMapV2Node[] = [];

  for (const course of courses) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (lesson.stableSkillId) {
          nodes.push({
            stableId: lesson.stableSkillId,
            type: "skill",
            courseSlug: course.slug,
            topicSlug: unit.slug,
            subtopicSlug: lesson.slug,
            title: lesson.title,
            label: lesson.title,
            legacySlugs: lessonLegacySlugs(lesson),
          });
        }

        for (const checkpoint of lesson.skillCheckpoints ?? []) {
          nodes.push({
            stableId: checkpoint.stableCheckpointId,
            type: "checkpoint",
            courseSlug: course.slug,
            topicSlug: unit.slug,
            subtopicSlug: lesson.slug,
            title: lesson.title,
            label: checkpoint.label,
            legacySlugs: checkpointLegacySlugs(checkpoint, lesson),
            parentStableId: lesson.stableSkillId,
          });
        }
      }
    }
  }

  return nodes;
}
