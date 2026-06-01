import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>

          <h1 className="text-3xl font-bold tracking-tight">Privacy Notice</h1>

          <p className="text-slate-600">
            This Privacy Notice explains how Nova Maths by Joshua Taylor
            collects, uses, stores, and protects information submitted through
            the Year 12 Mathematics Advanced
            diagnostic, enquiries, accounts, and online learning access.
          </p>

          <p className="text-sm text-slate-500">Last updated: May 2026</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Overview</h2>

          <p className="text-slate-700">
            Nova Maths is a diagnostic-led revision tool for maths
            learning. The current diagnostic is for Year 12 Mathematics
            Advanced and is designed to help identify a student&apos;s maths
            strengths, weak areas, and possible study priorities. Online
            learning may include additional Year 9 to Year 12 course pathways.
          </p>

          <p className="text-slate-700">
            The diagnostic is parent-led. We ask for a parent or guardian email
            address, and diagnostic reports are sent to the parent or guardian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            2. What information we collect
          </h2>

          <p className="text-slate-700">
            We collect only the information needed to review the diagnostic and
            prepare a personalised maths report.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Student first name</li>
            <li>Parent or guardian first name</li>
            <li>Parent or guardian email address</li>
            <li>Year level and maths course</li>
            <li>Topics studied so far</li>
            <li>Current topic, target result, and assessment timing</li>
            <li>Diagnostic answers</li>
            <li>Confidence ratings</li>
            <li>Optional written working</li>
            <li>Consent confirmation</li>
            <li>Submission time and basic technical records needed to operate the site</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            3. What we do not collect
          </h2>

          <p className="text-slate-700">
            To minimise the amount of personal information collected, the
            diagnostic does not ask for:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Student surname</li>
            <li>Student date of birth</li>
            <li>Student home address</li>
            <li>Student phone number</li>
            <li>Student email address</li>
            <li>School ID number</li>
            <li>Student photos</li>
            <li>Payment card details</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            4. Why we collect this information
          </h2>

          <p className="text-slate-700">
            We collect this information to:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>review the student&apos;s diagnostic responses</li>
            <li>identify maths strengths and weak areas</li>
            <li>prepare a personalised diagnostic report</li>
            <li>send the report to the parent or guardian</li>
            <li>provide follow-up and learning support where requested</li>
            <li>improve the quality of the diagnostic and reports</li>
            <li>respond to privacy, correction, or deletion requests</li>
          </ul>

          <p className="text-slate-700">
            We do not sell student or parent information. We do not use
            diagnostic submissions for unrelated advertising.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            5. Parent and guardian consent
          </h2>

          <p className="text-slate-700">
            By submitting the diagnostic, the person completing the form confirms
            that they are the student&apos;s parent or guardian, or that they have
            permission from the parent or guardian to submit the diagnostic.
          </p>

          <p className="text-slate-700">
            If we become aware that a diagnostic was submitted without appropriate
            parent or guardian permission, we may delete the submission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            6. How we use diagnostic responses
          </h2>

          <p className="text-slate-700">
            Diagnostic responses are used to assess topic strengths, weak areas,
            confidence, and possible causes of lost marks. Reports are intended
            for learning support only. They are not official school results,
            exam predictions, or guarantees of future performance.
          </p>

          <p className="text-slate-700">
            Reports are reviewed before being sent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            7. Use of scoring and report tools
          </h2>

          <p className="text-slate-700">
            Nova Maths uses rule-based scoring and report-drafting tools
            to help organise diagnostic results and recommended next steps.
          </p>

          <p className="text-slate-700">
            Reports are manually reviewed before being sent to families.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Third-party services</h2>

          <p className="text-slate-700">
            The service may use trusted third-party services to operate the
            diagnostic and online learning pages, including:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Supabase for database storage</li>
            <li>Vercel for website hosting</li>
            <li>Email tools to send reports or follow-up messages</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Storage and security</h2>

          <p className="text-slate-700">
            Diagnostic submissions are stored in a database with access controls.
            Public users can submit the diagnostic form but cannot read, update,
            or delete diagnostic submissions.
          </p>

          <p className="text-slate-700">
            Access to submissions is limited to authorised administrators who
            need access to review submissions, prepare reports, operate the
            service, or respond to privacy requests.
          </p>

          <p className="text-slate-700">
            We take reasonable steps to protect personal information from misuse,
            loss, unauthorised access, modification, or disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Data retention</h2>

          <p className="text-slate-700">
            We keep diagnostic submissions only as long as needed to prepare
            reports, support participating families, improve the diagnostic,
            and maintain basic business records.
          </p>

          <p className="text-slate-700">
            We aim to delete or de-identify raw diagnostic data within 12 months
            unless a parent or guardian asks us to keep it for continued support
            or we are required to keep it for legal, security, or administrative
            reasons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            11. Access, correction, and deletion requests
          </h2>

          <p className="text-slate-700">
            A parent or guardian may contact us to request access to, correction
            of, or deletion of a diagnostic submission.
          </p>

          <p className="text-slate-700">
            We may need to verify the request before making changes or deleting
            information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">12. Data breaches</h2>

          <p className="text-slate-700">
            If we become aware of a data breach involving personal information,
            we will assess the incident and take steps to contain it, reduce
            harm, and notify affected people or regulators where required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            13. Changes to this notice
          </h2>

          <p className="text-slate-700">
            We may update this Privacy Notice as the service develops,
            especially if we add new account, tutoring, written-work upload, or
            reporting features.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">14. Contact</h2>

          <p className="text-slate-700">
            For privacy questions, correction requests, or deletion requests,
            contact Joshua:
          </p>

          <p className="rounded-xl bg-slate-100 p-4 font-medium text-slate-800">
            joshua.a.taylor7@gmail.com
          </p>

        </section>

        <Link
          href="/"
          className="inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Back to homepage
        </Link>
      </article>
    </main>
  );
}
