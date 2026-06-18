export type DiagnosticChoice = {
  label: string;
  text: string;
};

export type DiagnosticQuestionPart = {
  key: string;
  label: string;
  prompt: string;
  latex?: string;
  choices: DiagnosticChoice[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  assessedUnitSlug?: string;
};

export type DiagnosticQuestion = {
  id: string;
  unitSlug: string;
  prompt: string;
  latex?: string;
  choices?: DiagnosticChoice[];
  correctAnswer?: string;
  explanation: string;
  hint?: string;
  questionParts?: DiagnosticQuestionPart[];
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
