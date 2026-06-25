import { getResend } from "./resend";

const COURSE_LABELS: Record<string, string> = {
  "year-11-standard": "Year 11 Standard Maths",
  "year-11-advanced": "Year 11 Advanced Maths",
  "year-11-extension": "Year 11 Extension 1 Maths",
  "year-12-standard-1": "Year 12 Standard 1 Maths",
  "year-12-standard-2": "Year 12 Standard 2 Maths",
  "year-12-advanced": "Year 12 Advanced Maths",
  "year-12-extension-1": "Year 12 Extension 1 Maths",
  "year-12-extension-2": "Year 12 Extension 2 Maths",
};

type WelcomeEmailParams = {
  toEmail: string;
  studentName?: string | null;
  courseSlug?: string | null;
  siteUrl?: string;
};

export async function sendWelcomeEmail({
  toEmail,
  studentName,
  courseSlug,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novamaths.com.au",
}: WelcomeEmailParams) {
  await getResend().emails.send({
    from: "Nova Maths <hello@novamaths.com.au>",
    to: toEmail,
    subject: "Your first Nova Maths lesson is waiting",
    html: buildWelcomeEmail({ studentName: studentName ?? "", courseSlug: courseSlug ?? null, siteUrl }),
  });
}

export function buildWelcomeEmail({
  studentName,
  courseSlug,
  siteUrl,
}: {
  studentName: string;
  courseSlug: string | null;
  siteUrl: string;
}) {
  const greeting = studentName ? `Hi ${studentName},` : "Hi there,";
  const courseName = courseSlug ? COURSE_LABELS[courseSlug] : null;
  const lessonUrl = `${siteUrl}/dashboard`;

  const courseBlurb = courseName
    ? `Your first lesson for <strong>${courseName}</strong> is ready. We've chosen it based on the topic you said you find most challenging.`
    : `Your first lesson is ready, chosen based on the topic you said you find most challenging.`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:40px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Nova Maths</p>
          <h1 style="margin:12px 0 0;font-size:26px;font-weight:700;line-height:1.2;color:#0f172a;">Your first lesson is waiting.</h1>
          <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#475569;">
            ${greeting}<br><br>
            ${courseBlurb}<br><br>
            Take 10 minutes now to work through it and complete the mastery quiz. That one quiz is how Nova Maths learns what you know so it can recommend the right next lesson.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
            <tr>
              <td style="background:#0f172a;border-radius:10px;">
                <a href="${lessonUrl}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                  Finish my first mastery lesson
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:13px;color:#94a3b8;">
            It takes about 10 minutes &middot; No subscription needed to start
          </p>
          <hr style="margin:32px 0;border:none;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">
            You're receiving this because you created a Nova Maths account.
            If you didn't sign up, you can ignore this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
