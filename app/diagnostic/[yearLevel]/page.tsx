import Link from "next/link";
import { diagnosticData as y12AdvancedData } from "../../../lib/diagnostics/year-12-advanced";
import type { DiagnosticData } from "../../../lib/diagnostics/types";
import { DiagnosticQuizClient } from "./DiagnosticQuizClient";

const dataByYearLevel: Record<string, DiagnosticData> = {
  "year-12-advanced": y12AdvancedData,
};

export default async function DiagnosticYearLevelPage({
  params,
}: {
  params: Promise<{ yearLevel: string }>;
}) {
  const { yearLevel } = await params;
  const data = dataByYearLevel[yearLevel];

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-xl space-y-5 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Diagnostic not available yet</h1>
          <p className="text-slate-600">
            The automated diagnostic for{" "}
            <span className="font-medium">{yearLevel.replace(/-/g, " ")}</span> is
            coming soon. Year 12 Advanced is available now.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/diagnostic/year-12-advanced"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Year 12 Advanced diagnostic
            </Link>
            <Link
              href="/diagnostic/select"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Choose a different year
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <DiagnosticQuizClient
      yearLevel={yearLevel}
      yearLevelTitle={data.yearLevelTitle}
      questions={data.questions}
      units={data.units}
    />
  );
}
