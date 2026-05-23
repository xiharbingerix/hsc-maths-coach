import type { DiagnosticScore } from "./diagnosticScoring";
import type { DiagnosticSubmission } from "./reportTypes";

function listLines(items: string[], fallback: string) {
  if (items.length === 0) {
    return [`- ${fallback}`];
  }

  return items.map((item) => `- ${item}`);
}

function diagnosticInterpretation(score: DiagnosticScore) {
  if (score.percentage >= 80) {
    return "This result suggests a solid overall base, with the next best step being targeted consolidation of the remaining likely mark leaks.";
  }

  if (score.percentage >= 60) {
    return "This result suggests the student has several useful foundations in place, but there are priority areas that should be addressed to make revision more efficient.";
  }

  if (score.attempted < Math.ceil(score.totalQuestions * 0.6)) {
    return "This result suggests the first priority is building confidence and fluency across the most accessible core skills, then gradually moving into exam-style questions.";
  }

  return "This result suggests there are some important likely mark leaks across the diagnostic. The next best step is to focus on the highest-impact priority areas before broad mixed revision.";
}

export function generateDiagnosticReportDraft(
  submission: DiagnosticSubmission,
  score: DiagnosticScore
) {
  const topPriority =
    score.priorities[0] ?? "the highest-priority weak area from the diagnostic";
  const relevantLessons =
    score.recommendedNextLessons.length > 0
      ? score.recommendedNextLessons.map(
          (lesson) => `- ${lesson.title}: ${lesson.reason} (${lesson.href})`
        )
      : [
          "- Start with the course unit that best matches the weakest listed section.",
          "- If no exact unit match is available yet, revise the weakest listed sections first and reattempt similar diagnostic-style questions.",
        ];

  return [
    "HSC Maths Advanced Diagnostic Report",
    "",
    "Student:",
    `- Student first name: ${submission.student_first_name || "Not provided"}`,
    `- Year level: ${submission.year_level ?? "Not provided"}`,
    `- Course: ${submission.course ?? "Not provided"}`,
    `- Target result: ${submission.target_result ?? "Not provided"}`,
    `- Next major assessment timing: ${
      submission.assessment_timing || "Not provided"
    }`,
    "",
    "Overall summary:",
    `- Overall score: ${score.correct}/${score.totalQuestions} (${score.percentage}%)`,
    `- Attempted questions: ${score.attempted}/${score.totalQuestions}`,
    `- Number marked "I don't know yet": ${score.idk}`,
    `- ${diagnosticInterpretation(score)}`,
    "",
    "Strengths:",
    ...listLines(
      score.strengths,
      "No clear strength area was identified from this diagnostic alone."
    ),
    "",
    "Priority areas:",
    ...listLines(
      score.priorities,
      "No single priority area stood out strongly from this diagnostic."
    ),
    "- These should be addressed first because they are likely to produce the highest improvement.",
    "",
    "High-confidence errors:",
    ...listLines(
      score.highConfidenceErrors,
      "No major high-confidence error pattern was detected."
    ),
    "- High-confidence errors are important because they may indicate misconceptions rather than simple uncertainty.",
    "",
    "Low-confidence correct answers:",
    ...listLines(
      score.lowConfidenceCorrectAnswers,
      "No clear low-confidence correct pattern was detected."
    ),
    "- Low-confidence correct answers may only need consolidation and practice.",
    "",
    "Recommended next lessons:",
    ...relevantLessons,
    "",
    "Suggested 30-day plan:",
    "Week 1:",
    `- Address the top priority weakness: ${topPriority}.`,
    "- Reattempt similar diagnostic-style questions.",
    "Week 2:",
    "- Work through the most relevant targeted lessons.",
    "- Complete guided and independent practice.",
    "Week 3:",
    "- Complete mastery quizzes for priority lessons.",
    "- Review high-confidence errors.",
    "Week 4:",
    "- Complete mixed practice.",
    "- Recheck weak areas before the next assessment.",
    "",
    "Notes:",
    "- This diagnostic is for learning support only.",
    "- It is not an official school result or a guarantee of future performance.",
  ].join("\n");
}
