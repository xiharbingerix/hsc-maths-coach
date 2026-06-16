/**
 * Weekly progress digest email.
 *
 * Pure builder (subject + HTML + text) so it's testable and previewable without
 * sending. `hasActivity` lets the caller skip emailing students who did nothing
 * this week.
 */

export type DigestExamResult = {
  title: string;
  band: string;
  percentage: number;
};

export type DigestData = {
  studentName: string;
  siteUrl: string;
  streakCurrent: number;
  lessonsPassedThisWeek: number;
  examAttempts: DigestExamResult[];
  weakestTopic?: { title: string; href: string } | null;
  continueHref: string;
};

export function hasDigestActivity(data: DigestData): boolean {
  return (
    data.lessonsPassedThisWeek > 0 ||
    data.examAttempts.length > 0 ||
    data.streakCurrent > 0
  );
}

export function buildWeeklyDigest(data: DigestData): {
  subject: string;
  html: string;
  text: string;
} {
  const name = data.studentName.trim();
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const subject =
    data.streakCurrent > 0
      ? `Your week on Nova Maths — ${data.streakCurrent}-day streak`
      : "Your week on Nova Maths";

  const lessonsLine =
    data.lessonsPassedThisWeek > 0
      ? `You passed ${data.lessonsPassedThisWeek} mastery ${
          data.lessonsPassedThisWeek === 1 ? "quiz" : "quizzes"
        } this week.`
      : "No mastery quizzes passed this week — a great thing to pick up.";

  const streakLine =
    data.streakCurrent > 0
      ? `🔥 ${data.streakCurrent}-day study streak — keep it going.`
      : "Start a study streak this week — even 10 minutes a day adds up.";

  const examText = data.examAttempts
    .map((e) => `${e.title}: ${e.band} (${e.percentage}%)`)
    .join("; ");

  // ── Plain text ─────────────────────────────────────────────────────────────
  const textLines = [
    greeting,
    "",
    streakLine,
    lessonsLine,
    data.examAttempts.length > 0 ? `Practice exams: ${examText}` : "",
    data.weakestTopic
      ? `Focus next: ${data.weakestTopic.title} — ${data.siteUrl}${data.weakestTopic.href}`
      : "",
    "",
    `Continue: ${data.siteUrl}${data.continueHref}`,
    "",
    "— Nova Maths",
  ].filter(Boolean);
  const text = textLines.join("\n");

  // ── HTML ───────────────────────────────────────────────────────────────────
  const examHtml =
    data.examAttempts.length > 0
      ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#475569;"><strong>Practice exams:</strong> ${data.examAttempts
          .map(
            (e) =>
              `${escapeHtml(e.title)} — <strong>${escapeHtml(e.band)}</strong> (${e.percentage}%)`
          )
          .join("; ")}</p>`
      : "";

  const focusHtml = data.weakestTopic
    ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#475569;"><strong>Focus next:</strong> <a href="${data.siteUrl}${escapeAttr(
        data.weakestTopic.href
      )}" style="color:#0f172a;">${escapeHtml(data.weakestTopic.title)}</a></p>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:40px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Nova Maths · Your week</p>
          <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;line-height:1.2;color:#0f172a;">${escapeHtml(streakLine)}</h1>
          <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#475569;">${escapeHtml(greeting)}<br><br>${escapeHtml(lessonsLine)}</p>
          ${examHtml}
          ${focusHtml}
          <table cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
            <tr><td style="background:#0f172a;border-radius:10px;">
              <a href="${data.siteUrl}${escapeAttr(data.continueHref)}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Continue learning →</a>
            </td></tr>
          </table>
          <hr style="margin:32px 0;border:none;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">You're receiving this weekly summary because you have a Nova Maths account.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
