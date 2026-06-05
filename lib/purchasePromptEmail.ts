import { getResend } from "./resend";

type PurchasePromptEmailParams = {
  toEmail: string;
  studentName?: string | null;
  siteUrl?: string;
};

export async function sendPurchasePromptEmail({
  toEmail,
  studentName,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novamaths.com.au",
}: PurchasePromptEmailParams) {
  await getResend().emails.send({
    from: "Nova Maths <hello@novamaths.com.au>",
    to: toEmail,
    subject: "Your Nova Maths account is ready - start learning today",
    html: buildPurchasePromptEmail({
      studentName: studentName ?? "",
      siteUrl,
    }),
  });
}

export function buildPurchasePromptEmail({
  studentName,
  siteUrl,
}: {
  studentName: string;
  siteUrl: string;
}) {
  const greeting = studentName ? `Hi ${studentName},` : "Hi there,";
  const checkoutUrl = `${siteUrl}/checkout?offer=online-learning`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:40px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Nova Maths</p>
          <h1 style="margin:12px 0 0;font-size:26px;font-weight:700;line-height:1.2;color:#0f172a;">Your account is ready.</h1>
          <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#475569;">
            ${greeting}<br><br>
            Your Nova Maths account is set up and the online learning lessons are waiting for you.
            Subscribe now to unlock your full course pathway - structured lessons, guided practice, and mastery quizzes aligned to the NSW syllabus.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
            <tr>
              <td style="background:#0f172a;border-radius:10px;">
                <a href="${checkoutUrl}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                  Subscribe - $19/month
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:13px;color:#94a3b8;">Cancel any time &middot; Secure Stripe checkout &middot; Access activates instantly after payment.</p>
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
