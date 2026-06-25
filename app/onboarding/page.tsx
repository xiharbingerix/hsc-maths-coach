"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { newCoursePathways } from "../../lib/newCourseCatalog";
import { courseUnits } from "../../lib/courseUnits";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

const HSC_COURSES = [
  { slug: "year-11-standard", label: "Year 11 Standard", year: 11 },
  { slug: "year-11-advanced", label: "Year 11 Advanced", year: 11 },
  { slug: "year-11-extension", label: "Year 11 Extension 1", year: 11 },
  { slug: "year-12-standard-1", label: "Year 12 Standard 1", year: 12 },
  { slug: "year-12-standard-2", label: "Year 12 Standard 2", year: 12 },
  { slug: "year-12-advanced", label: "Year 12 Advanced", year: 12 },
  { slug: "year-12-extension-1", label: "Year 12 Extension 1", year: 12 },
  { slug: "year-12-extension-2", label: "Year 12 Extension 2", year: 12 },
] as const;

type CourseSlug = (typeof HSC_COURSES)[number]["slug"];

type TopicOption = {
  slug: string;
  title: string;
  href: string;
};

function getTopicsForCourse(slug: CourseSlug): TopicOption[] {
  if (slug === "year-12-advanced") {
    return courseUnits.map((u) => ({
      slug: u.href.split("/").pop() ?? u.title,
      title: u.title,
      href: u.href,
    }));
  }
  const pathway = newCoursePathways.find((p) => p.slug === slug);
  if (!pathway) return [];
  return pathway.units.map((u) => ({
    slug: u.slug,
    title: u.title,
    href: `/course/${slug}/${u.slug}/${u.lessons[0]?.slug ?? ""}`,
  }));
}

function getFirstLessonHref(slug: CourseSlug, topicHref: string): string {
  if (slug === "year-12-advanced") return topicHref;
  return topicHref;
}

export default function OnboardingPage() {
  const router = useRouter();
  const checkedRef = useRef(false);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCourse, setSelectedCourse] = useState<CourseSlug | null>(null);
  const [saving, setSaving] = useState(false);
  const [yearFilter, setYearFilter] = useState<11 | 12>(12);

  // Redirect users who already completed onboarding
  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("selected_course_slug")
        .eq("id", user.id)
        .maybeSingle();
      const existing = (profile as { selected_course_slug?: string | null } | null)
        ?.selected_course_slug;
      if (existing) {
        router.replace("/dashboard");
      }
    });
  }, []);

  const topics = selectedCourse ? getTopicsForCourse(selectedCourse) : [];

  async function handleCourseSelect(slug: CourseSlug) {
    setSelectedCourse(slug);
    const hasTopics = getTopicsForCourse(slug).length > 0;
    if (hasTopics) {
      setStep(2);
    } else {
      await finish(slug, null);
    }
  }

  async function handleTopicSelect(topic: TopicOption) {
    if (!selectedCourse) return;
    await finish(selectedCourse, topic);
  }

  async function finish(slug: CourseSlug, topic: TopicOption | null) {
    setSaving(true);
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (user) {
      await supabase
        .from("profiles")
        .upsert({ id: user.id, selected_course_slug: slug }, { onConflict: "id" });
    }

    clientTrackEvent("onboarding_completed", {
      course_slug: slug,
      topic_slug: topic?.slug ?? null,
    });

    const href = topic
      ? getFirstLessonHref(slug, topic.href)
      : `/course/${slug}`;

    router.push(href);
  }

  const visibleCourses = HSC_COURSES.filter((c) => c.year === yearFilter);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Nova Maths
        </p>

        {step === 1 && (
          <>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              Which course are you studying?
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              We will personalise your first lesson from here.
            </p>

            <div className="mt-6 flex gap-2">
              {([12, 11] as const).map((y) => (
                <button
                  key={y}
                  onClick={() => setYearFilter(y)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    yearFilter === y
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Year {y}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleCourses.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => handleCourseSelect(c.slug)}
                  disabled={saving}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50"
                >
                  {c.label}
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              Not doing HSC?{" "}
              <a href="/course" className="underline hover:text-slate-600">
                Browse all courses
              </a>
            </p>
          </>
        )}

        {step === 2 && selectedCourse && (
          <>
            <button
              onClick={() => setStep(1)}
              className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
            >
              <span aria-hidden>&#8592;</span> Back
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              Where do you feel weakest?
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Pick the topic you want to work on first.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => handleTopicSelect(t)}
                  disabled={saving}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50"
                >
                  {t.title}
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              Not sure?{" "}
              <button
                onClick={() => selectedCourse && finish(selectedCourse, null)}
                className="underline hover:text-slate-600"
                disabled={saving}
              >
                Skip and start from the beginning
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
