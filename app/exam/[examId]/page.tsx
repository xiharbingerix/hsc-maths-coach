import { notFound } from "next/navigation";
import { getExamPaper, toClientExam } from "../../../lib/exams";
import { RequirePaid } from "../../course/RequirePaid";
import { ExamRunner } from "./ExamRunner";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const paper = getExamPaper(examId);
  if (!paper) notFound();

  return (
    <RequirePaid featureLabel="Full exam papers">
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <ExamRunner paper={toClientExam(paper)} />
        </div>
      </main>
    </RequirePaid>
  );
}
