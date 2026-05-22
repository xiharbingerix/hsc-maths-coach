export const reportStatuses = [
  "not_started",
  "reviewing",
  "drafted",
  "sent",
  "follow_up_required",
] as const;

export type ReportStatus = (typeof reportStatuses)[number];

export type DiagnosticSubmission = {
  id: string;
  created_at: string;
  student_first_name: string;
  parent_first_name: string;
  parent_email: string;
  year_level: string | null;
  course: string | null;
  topics_studied: string[] | null;
  current_topic: string | null;
  target_result: string | null;
  assessment_timing: string | null;
  answers: Record<string, string> | null;
  confidence: Record<string, string> | null;
  working: Record<string, string> | null;
  consent_confirmed: boolean;
  report_status: ReportStatus | string | null;
  report_notes: string | null;
  follow_up_required: boolean | null;
  offer_selected: string | null;
  report_sent_at: string | null;
};
