import Link from "next/link";
import { diagnosticData as y7Data } from "../../../lib/diagnostics/year-7-mathematics";
import { diagnosticData as y8Data } from "../../../lib/diagnostics/year-8-mathematics";
import { diagnosticData as y9AdvData } from "../../../lib/diagnostics/year-9-mathematics-advanced";
import { diagnosticData as y9CoreData } from "../../../lib/diagnostics/year-9-mathematics-core";
import { diagnosticData as y10AdvData } from "../../../lib/diagnostics/year-10-mathematics-advanced";
import { diagnosticData as y10CoreData } from "../../../lib/diagnostics/year-10-mathematics-core";
import { diagnosticData as y11StdData } from "../../../lib/diagnostics/year-11-standard";
import { diagnosticData as y11AdvData } from "../../../lib/diagnostics/year-11-advanced";
import { diagnosticData as y12AdvancedData } from "../../../lib/diagnostics/year-12-advanced";
import { diagnosticData as y12Std2Data } from "../../../lib/diagnostics/year-12-standard-2";
import { diagnosticData as y12Std1Data } from "../../../lib/diagnostics/year-12-standard-1";
import { diagnosticData as y12Ext1Data } from "../../../lib/diagnostics/year-12-extension-1";
import { diagnosticData as y11ExtData } from "../../../lib/diagnostics/year-11-extension";
import type { DiagnosticData } from "../../../lib/diagnostics/types";
import { DiagnosticQuizClient } from "./DiagnosticQuizClient";

const dataByYearLevel: Record<string, DiagnosticData> = {
  "year-7-mathematics": y7Data,
  "year-8-mathematics": y8Data,
  "year-9-mathematics-advanced": y9AdvData,
  "year-9-mathematics-core": y9CoreData,
  "year-10-mathematics-advanced": y10AdvData,
  "year-10-mathematics-core": y10CoreData,
  "year-11-standard": y11StdData,
  "year-11-advanced": y11AdvData,
  "year-11-extension": y11ExtData,
  "year-12-advanced": y12AdvancedData,
  "year-12-standard-2": y12Std2Data,
  "year-12-standard-1": y12Std1Data,
  "year-12-extension-1": y12Ext1Data,
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
