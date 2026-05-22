"use client";

import type { FormEvent } from "react";

type GenerateReportDraftButtonProps = {
  action: (formData: FormData) => void | Promise<void>;
  hasExistingNotes: boolean;
  submissionId: string;
};

export function GenerateReportDraftButton({
  action,
  hasExistingNotes,
  submissionId,
}: GenerateReportDraftButtonProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (
      hasExistingNotes &&
      !window.confirm("This will replace the existing report notes. Continue?")
    ) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-2">
      <input type="hidden" name="submission_id" value={submissionId} />
      <button
        type="submit"
        className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        Generate report draft
      </button>
      <p className="text-xs leading-5 text-slate-500">
        Creates a rule-based draft from the diagnostic scoring summary. Review
        before sending.
      </p>
    </form>
  );
}
