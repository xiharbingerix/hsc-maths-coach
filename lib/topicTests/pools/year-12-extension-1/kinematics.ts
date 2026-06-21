import type { TopicTestPool } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Kinematics. (Pilot, see
 * docs/TOPIC_TEST_DIAGNOSTIC_PLAN.md.)
 *
 * CONTENT TODO (Phase 1 content slice): author 10 D4 + 10 D5 per subtopic.
 * Every item must be auto-markable (numeric / coordinate / MCQ / simple
 * algebra) — kinematics is fully numeric, so this is achievable. No
 * "prove/justify/explain". Verify every answer before authoring, follow
 * docs/QUESTION_AUTHORING_STANDARD.md, and map each MCQ distractor to a
 * specific misconception. Not yet registered in lib/topicTests/index.ts.
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/kinematics/${lesson}`;

export const kinematicsPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "kinematics",
  topicTitle: "Kinematics",
  subtopics: [
    {
      subtopicSlug: "kinematics-velocity-acceleration",
      subtopicTitle: "Velocity and Acceleration from Displacement",
      remediationHref: href("kinematics-velocity-acceleration"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "kinematics-displacement-from-velocity",
      subtopicTitle: "Displacement from Velocity by Integration",
      remediationHref: href("kinematics-displacement-from-velocity"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "kinematics-motion-analysis",
      subtopicTitle: "Analysing Motion: Direction Changes and Total Distance",
      remediationHref: href("kinematics-motion-analysis"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "kinematics-exam-practice",
      subtopicTitle: "Kinematics Exam Practice",
      remediationHref: href("kinematics-exam-practice"),
      d4: [],
      d5: [],
    },
  ],
};
