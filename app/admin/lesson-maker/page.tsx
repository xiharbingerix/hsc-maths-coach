import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { newCoursePathways } from "../../../lib/newCourseCatalog";
import { listSavedPlansAction, type SavedPlanSummary } from "./actions";
import { LessonMakerClient } from "./LessonMakerClient";

export const metadata: Metadata = {
  title: "Lesson Maker | Nova Maths Admin",
};

export type { SavedPlanSummary };

export type CatalogCourse = {
  slug: string;
  title: string;
  units: {
    slug: string;
    title: string;
    lessons: { slug: string; title: string }[];
  }[];
};

export default async function LessonMakerPage() {
  await requireAdmin();

  // Strip lesson content — only slugs + titles needed for selectors
  const catalog: CatalogCourse[] = newCoursePathways.map((c) => ({
    slug: c.slug,
    title: c.title,
    units: c.units.map((u) => ({
      slug: u.slug,
      title: u.title,
      lessons: u.lessons.map((l) => ({ slug: l.slug, title: l.title })),
    })),
  }));

  const savedResult = await listSavedPlansAction();
  const initialSavedPlans: SavedPlanSummary[] =
    "plans" in savedResult ? savedResult.plans : [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between gap-4 print:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Lesson Maker
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              AI-authored one-on-one Zoom teaching plans built from your course
              content. The first generation per topic is written by Claude and
              saved as that topic&apos;s default — later requests are free.
            </p>
          </div>
          <Link
            href="/admin"
            className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            ← Admin
          </Link>
        </header>

        <LessonMakerClient catalog={catalog} initialSavedPlans={initialSavedPlans} />
      </div>
    </main>
  );
}
