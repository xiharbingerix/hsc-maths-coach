"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS: ReadonlyArray<{
  href: string;
  label: string;
  exact?: boolean;
}> = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/worksheets", label: "Worksheets" },
  { href: "/admin/questions", label: "Question bank" },
  { href: "/admin/lesson-maker", label: "Lesson maker" },
  { href: "/admin/diagnostics", label: "Diagnostics" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/tutoring", label: "Tutoring" },
  { href: "/admin/question-flags", label: "Flags" },
];

export function AdminNav() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center gap-3">
          <Link
            href="/admin"
            className="shrink-0 text-sm font-extrabold tracking-tight text-slate-950"
          >
            Nova Admin
          </Link>

          <nav
            aria-label="Admin navigation"
            className="min-w-0 flex-1 overflow-x-auto"
          >
            <div className="flex w-max items-center gap-1 px-1">
              {ADMIN_LINKS.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/admin/worksheets/new"
              className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              <span className="hidden sm:inline">+ New worksheet</span>
              <span className="sm:hidden">+ New</span>
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <span className="hidden md:inline">Log out</span>
                <span className="md:hidden">Exit</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
