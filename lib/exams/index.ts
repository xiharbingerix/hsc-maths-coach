import type { ExamPaper } from "./types";
import { year12AdvancedPaper1 } from "./year12AdvancedPaper1";

export * from "./types";

const PAPERS: ExamPaper[] = [year12AdvancedPaper1];

export type ExamSummary = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  description: string;
  timeLimitMins: number;
  totalMarks: number;
  questionCount: number;
};

export function listExamPapers(): ExamSummary[] {
  return PAPERS.map((p) => ({
    id: p.id,
    courseSlug: p.courseSlug,
    courseTitle: p.courseTitle,
    title: p.title,
    description: p.description,
    timeLimitMins: p.timeLimitMins,
    totalMarks: p.totalMarks,
    questionCount: p.sections.reduce((n, s) => n + s.questions.length, 0),
  }));
}

export function getExamPaper(id: string): ExamPaper | null {
  return PAPERS.find((p) => p.id === id) ?? null;
}

// ── Client-safe view (no answers/explanations) ───────────────────────────────
// What the browser receives while sitting the exam. Answers, accepted answers
// and explanations are stripped — they stay server-side until submission.

export type ClientExamPart = {
  key: string;
  label: string;
  prompt: string;
  latex?: string;
  marks: number;
};

export type ClientExamQuestion = {
  id: string;
  prompt: string;
  latex?: string;
  marks: number;
  difficulty: number;
  choices?: { label: string; text: string }[];
  parts?: ClientExamPart[];
};

export type ClientExamPaper = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  description: string;
  timeLimitMins: number;
  totalMarks: number;
  sections: {
    title: string;
    instructions?: string;
    questions: ClientExamQuestion[];
  }[];
};

export function toClientExam(paper: ExamPaper): ClientExamPaper {
  return {
    id: paper.id,
    courseSlug: paper.courseSlug,
    courseTitle: paper.courseTitle,
    title: paper.title,
    description: paper.description,
    timeLimitMins: paper.timeLimitMins,
    totalMarks: paper.totalMarks,
    sections: paper.sections.map((s) => ({
      title: s.title,
      instructions: s.instructions,
      questions: s.questions.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        latex: q.latex,
        marks: q.marks,
        difficulty: q.difficulty,
        choices: q.choices,
        parts: q.parts?.map((p) => ({
          key: p.key,
          label: p.label,
          prompt: p.prompt,
          latex: p.latex,
          marks: p.marks,
        })),
      })),
    })),
  };
}
