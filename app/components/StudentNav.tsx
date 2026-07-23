import Link from "next/link";

export function StudentNav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-0.5 overflow-x-auto py-2 text-sm">
          <Link
            href="/dashboard"
            className="shrink-0 rounded-lg px-3 py-1.5 font-bold text-slate-900 hover:bg-slate-100"
          >
            Nova Maths
          </Link>
          <span className="shrink-0 select-none px-1 text-slate-300">|</span>
          <Link
            href="/dashboard"
            className="shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Dashboard
          </Link>
          <Link
            href="/course"
            className="shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="hidden sm:inline">My Course</span>
            <span className="sm:hidden">Course</span>
          </Link>
          <Link
            href="/diagnostic/select"
            className="shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Diagnostic
          </Link>
          <Link
            href="/dashboard/worksheets"
            className="shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Worksheets
          </Link>
          <Link
            href="/exam"
            className="shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Exams
          </Link>
          <Link
            href="/dashboard#account"
            className="ml-auto shrink-0 rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
