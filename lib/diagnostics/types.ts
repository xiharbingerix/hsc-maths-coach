import type { DiagramFields } from "../lessons/diagramRegistry";

// A diagnostic question may carry any diagram payload (rendered above the
// choices), reusing the same registry as lessons and worksheets.
export type DiagnosticQuestion = {
  id: string;
  unitSlug: string;
  prompt: string;
  latex?: string;
  choices: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
} & DiagramFields;

export type DiagnosticUnit = {
  slug: string;
  title: string;
  startHref: string;
};

export type DiagnosticData = {
  questions: DiagnosticQuestion[];
  units: DiagnosticUnit[];
  yearLevelTitle: string;
};
