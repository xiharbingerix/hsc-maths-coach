"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackPreviewHscLessonClicked,
  trackDiagnosticStarted,
} from "../../lib/analytics";

export function FreeLessonCTAButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/sample-hsc-lesson"
      onClick={() => trackPreviewHscLessonClicked("hsc-maths")}
      className={
        className ??
        "inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      }
    >
      {children}
    </Link>
  );
}

export function DiagnosticCTALink() {
  return (
    <Link
      href="/diagnostic/select"
      onClick={() => trackDiagnosticStarted("hsc-maths")}
      className="text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-2 hover:text-slate-900"
    >
      Start free diagnostic &rarr;
    </Link>
  );
}
