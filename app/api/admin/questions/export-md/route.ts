import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../../../lib/adminSession";
import { normaliseMultiFilter } from "../../../../../lib/questionExportFilters";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

type Choice = { label: string; text: string; [key: string]: unknown };

type QuestionRow = {
  id: string;
  source_id: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  question_type: string;
  prompt: string;
  latex: string | null;
  choices: Choice[] | null;
  answer: string;
  accepted_answers: string[];
  hint: string | null;
  explanation: string;
  syllabus_ref: string | null;
  question_parts: unknown | null;
};

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const DIFF_LABEL: Record<number, string> = {
  1: "D1 – Easy",
  2: "D2",
  3: "D3 – Medium",
  4: "D4",
  5: "D5 – Hard",
  6: "D6 – Exam/Synoptic",
};

function toMd(questions: QuestionRow[], filters: Record<string, string>): string {
  const lines: string[] = [];
  const now = new Date().toLocaleDateString("en-AU", {
    timeZone: "Australia/Sydney",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  lines.push(`# Question Export`);
  lines.push(``);

  const filterParts: string[] = [];
  if (filters.course) filterParts.push(`Course: ${prettify(filters.course)}`);
  if (filters.topic) filterParts.push(`Topic: ${prettify(filters.topic)}`);
  if (filters.subtopic) filterParts.push(`Subtopic: ${prettify(filters.subtopic)}`);
  if (filters.diff) filterParts.push(`Difficulty: ${filters.diff}`);
  if (filters.q) filterParts.push(`Search: "${filters.q}"`);
  if (filterParts.length) {
    lines.push(`**Filters:** ${filterParts.join(" · ")}  `);
  }
  lines.push(`**Generated:** ${now}  `);
  lines.push(`**Questions:** ${questions.length}  `);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const isMcq = q.question_type === "conceptual" && q.choices && q.choices.length > 0;
    const diffLabel = DIFF_LABEL[q.difficulty] ?? `D${q.difficulty}`;
    const typeLabel = isMcq ? "MCQ" : "Short answer";

    lines.push(`## Q${i + 1}`);
    lines.push(``);

    // Metadata table
    lines.push(`| Field | Value |`);
    lines.push(`|-------|-------|`);
    lines.push(`| ID | \`${q.source_id}\` |`);
    lines.push(`| Difficulty | ${diffLabel} |`);
    lines.push(`| Type | ${typeLabel} |`);
    lines.push(`| Course | ${prettify(q.course_slug)} |`);
    lines.push(`| Topic | ${prettify(q.topic_slug)} |`);
    lines.push(`| Subtopic | ${prettify(q.subtopic_slug)} |`);
    if (q.syllabus_ref) {
      lines.push(`| Syllabus ref | ${q.syllabus_ref} |`);
    }
    lines.push(``);

    // Prompt
    lines.push(`### Question`);
    lines.push(``);
    lines.push(q.prompt);
    lines.push(``);

    // LaTeX block
    if (q.latex) {
      lines.push(`$$`);
      lines.push(q.latex);
      lines.push(`$$`);
      lines.push(``);
    }

    // MCQ choices
    if (isMcq && q.choices) {
      lines.push(`### Choices`);
      lines.push(``);
      for (const choice of q.choices) {
        const isCorrect = choice.label === q.answer;
        lines.push(`**${choice.label}.** ${choice.text}${isCorrect ? " ✓" : ""}`);
        lines.push(``);
      }
    }

    // Answer
    lines.push(`### Answer`);
    lines.push(``);
    lines.push(`**${q.answer}**`);
    if (q.accepted_answers.length > 0) {
      lines.push(``);
      lines.push(`*Also accepted:* ${q.accepted_answers.join(", ")}`);
    }
    lines.push(``);

    // Hint
    if (q.hint) {
      lines.push(`### Hint`);
      lines.push(``);
      lines.push(`> ${q.hint}`);
      lines.push(``);
    }

    // Explanation
    lines.push(`### Explanation`);
    lines.push(``);
    lines.push(q.explanation);
    lines.push(``);
    lines.push(`---`);
    lines.push(``);
  }

  return lines.join("\n");
}

export async function GET(request: NextRequest) {
  await requireAdmin();

  const sp = request.nextUrl.searchParams;
  const filterCourse = sp.get("course") ?? "";
  const filterTopics = normaliseMultiFilter(sp.getAll("topic"));
  const filterSubtopics = normaliseMultiFilter(sp.getAll("subtopic"));
  const filterDiffs = (sp.get("diff") ?? "")
    .split(",")
    .map(Number)
    .filter((n) => n >= 1 && n <= 6);
  const filterQ = sp.get("q")?.trim().toLowerCase() ?? "";
  const activeOnly = sp.get("active") !== "0";

  const pageSize = 1000;
  let questions: QuestionRow[] = [];

  for (let from = 0; ; from += pageSize) {
    let query = supabaseAdmin
      .from("questions")
      .select(
        "id, source_id, course_slug, topic_slug, subtopic_slug, difficulty, question_type, prompt, latex, choices, answer, accepted_answers, hint, explanation, syllabus_ref, question_parts"
      )
      .order("course_slug")
      .order("topic_slug")
      .order("subtopic_slug")
      .order("difficulty")
      .order("source_id")
      .range(from, from + pageSize - 1);

    if (activeOnly) query = query.eq("is_active", true);
    if (filterCourse) query = query.eq("course_slug", filterCourse);
    if (filterTopics.length > 0) query = query.in("topic_slug", filterTopics);
    if (filterSubtopics.length > 0) query = query.in("subtopic_slug", filterSubtopics);
    if (filterDiffs.length > 0) query = query.in("difficulty", filterDiffs);

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const page = (data as QuestionRow[] | null) ?? [];
    questions.push(...page);
    if (page.length < pageSize) break;
  }

  if (filterQ) {
    questions = questions.filter(
      (q) =>
        q.source_id.toLowerCase().includes(filterQ) ||
        q.prompt.toLowerCase().includes(filterQ)
    );
  }

  const filters: Record<string, string> = {};
  if (filterCourse) filters.course = filterCourse;
  if (filterTopics.length > 0) filters.topic = filterTopics.map(prettify).join(", ");
  if (filterSubtopics.length > 0) {
    filters.subtopic = filterSubtopics.map(prettify).join(", ");
  }
  if (filterDiffs.length > 0) filters.diff = filterDiffs.map((d) => `D${d}`).join(", ");
  if (filterQ) filters.q = filterQ;

  const md = toMd(questions, filters);

  const slugPart = filterCourse || filterSubtopics[0] || filterTopics[0] || "all";
  const filename = `questions-${slugPart}-${new Date().toISOString().slice(0, 10)}.md`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
