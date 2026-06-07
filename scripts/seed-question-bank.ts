import { createClient } from "@supabase/supabase-js";
import type { PracticeQuestion } from "../lib/lessons/differentialCalculus";

type QuestionRow = {
  source_id: string;
  topic_slug: string;
  subtopic_slug: string;
  year_level: string;
  course_slug: string;
  difficulty: number;
  question_type: string;
  prompt: string;
  latex: string | null;
  choices: { label: string; text: string }[] | null;
  answer: string;
  accepted_answers: string[];
  hint: string | null;
  explanation: string;
  syllabus_ref: string | null;
  transfer_from_topics: string[];
  is_active: boolean;
};

type QuestionMappingContext = {
  topicSlug: string;
  subtopicSlug: string;
  yearLevel: string;
  courseSlug: string;
  syllabusRef?: string;
  transferFromTopics?: string[];
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function normaliseChoices(question: PracticeQuestion) {
  if (!question.choices?.length) {
    return null;
  }

  return question.choices.map((choice) => ({
    label: choice.label,
    text: choice.text,
  }));
}

export function inferDifficulty(question: PracticeQuestion) {
  const prompt = `${question.prompt} ${question.latex}`.toLowerCase();

  if (prompt.includes("exam") || prompt.includes("prove") || prompt.includes("projection")) {
    return 4;
  }

  if (
    prompt.includes("differentiate") ||
    prompt.includes("mastery") ||
    prompt.includes("angle") ||
    prompt.includes("compound")
  ) {
    return 3;
  }

  if (question.choices?.length) {
    return 2;
  }

  return 1;
}

export function mapPracticeQuestionToQuestionRow(
  question: PracticeQuestion,
  context: QuestionMappingContext
): QuestionRow {
  return {
    source_id: question.id,
    topic_slug: context.topicSlug,
    subtopic_slug: context.subtopicSlug,
    year_level: context.yearLevel,
    course_slug: context.courseSlug,
    difficulty: inferDifficulty(question),
    question_type: question.choices?.length ? "multiple_choice" : "procedural",
    prompt: question.prompt,
    latex: question.latex || null,
    choices: normaliseChoices(question),
    answer: question.answer,
    accepted_answers: question.acceptedAnswers ?? [],
    hint: question.hint ?? null,
    explanation: question.explanation ?? "Review the worked method and compare each step with the expected answer.",
    syllabus_ref: context.syllabusRef ?? null,
    transfer_from_topics: context.transferFromTopics ?? [],
    is_active: true,
  };
}

const SAMPLE_QUESTIONS: Array<{
  context: QuestionMappingContext;
  question: PracticeQuestion;
}> = [
  {
    context: {
      topicSlug: "algebra",
      subtopicSlug: "linear-equations",
      yearLevel: "Year 7",
      courseSlug: "free-year-7-algebra",
    },
    question: {
      id: "sample-y7-equations-1",
      prompt: "Solve the equation.",
      latex: "x+5=12",
      answer: "7",
      acceptedAnswers: ["x=7", "x = 7"],
      hint: "Undo +5 by subtracting 5 from both sides.",
      explanation: "The equation is balanced. Subtract 5 from both sides to isolate x, giving x = 7.",
    },
  },
  {
    context: {
      topicSlug: "vectors",
      subtopicSlug: "magnitude",
      yearLevel: "Year 12",
      courseSlug: "year-12-extension-1",
    },
    question: {
      id: "sample-y12e1-vectors-1",
      prompt: "Find the magnitude of the vector.",
      latex: "\\mathbf{a}=\\begin{pmatrix}3\\\\4\\end{pmatrix}",
      answer: "5",
      acceptedAnswers: ["|a|=5", "|\\mathbf{a}|=5"],
      hint: "Use Pythagoras on the two components.",
      explanation: "The components form a right triangle, so the magnitude is sqrt(3^2 + 4^2) = 5.",
    },
  },
  {
    context: {
      topicSlug: "probability",
      subtopicSlug: "complement",
      yearLevel: "Year 9",
      courseSlug: "year-9-mathematics",
    },
    question: {
      id: "sample-y9-probability-1",
      prompt: "If P(rain) = 0.3, what is P(no rain)?",
      latex: "P(\\text{rain})=0.3",
      answer: "0.7",
      acceptedAnswers: ["7/10", "70%"],
      hint: "Use the complement: 1 - P(rain).",
      explanation: "No rain is the complement of rain, so P(no rain) = 1 - 0.3 = 0.7.",
    },
  },
  {
    context: {
      topicSlug: "calculus",
      subtopicSlug: "inverse-trig-derivatives",
      yearLevel: "Year 12",
      courseSlug: "year-12-extension-1",
    },
    question: {
      id: "sample-y12e1-inverse-trig-1",
      prompt: "Which derivative is correct?",
      latex: "\\frac{d}{dx}\\arctan x",
      choices: [
        { label: "A", text: "$1/(1+x^2)$" },
        { label: "B", text: "$1/\\sqrt{1-x^2}$" },
        { label: "C", text: "$-1/\\sqrt{1-x^2}$" },
        { label: "D", text: "$\\sec^2x$" },
      ],
      answer: "A",
      hint: "Recall the standard inverse tangent derivative.",
      explanation: "The derivative of arctan x is 1/(1+x^2).",
    },
  },
];

async function main() {
  const supabaseUrl = requiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const rows = SAMPLE_QUESTIONS.map(({ question, context }) =>
    mapPracticeQuestionToQuestionRow(question, context)
  );

  const { data, error } = await supabase
    .from("questions")
    .upsert(rows, { onConflict: "source_id" })
    .select("id,source_id");

  if (error) {
    throw new Error(`Could not seed question bank: ${error.message}`);
  }

  console.log(`Question bank seed complete. Upserted ${data?.length ?? 0} question(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
