export type DiagnosticQuestion = {
  id: string;
  unitSlug: string;
  prompt: string;
  latex?: string;
  choices: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
};

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
