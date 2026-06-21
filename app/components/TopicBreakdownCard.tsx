"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

/**
 * Polished "topic breakdown" panel — the app-style card with a header bar,
 * per-topic progress rows, an overall-readiness tile and a dark
 * recommended-next-lesson tile.
 *
 * Used both by the marketing DiagnosticResultPreview (static data) and by the
 * student dashboard's mastery section (real data), so the live product matches
 * the mockup shown on the home page. Topics that carry a `lessons` list become
 * expandable so students can drill into per-lesson mastery for that unit.
 */

export type BreakdownLesson = {
  name: string;
  /** Mastery percentage, or null when the student hasn't started the lesson. */
  score: number | null;
  href?: string;
};

export type BreakdownTopic = {
  name: string;
  score: number;
  lessons?: BreakdownLesson[];
};

type Tone = {
  bar: string;
  dot: string;
  badgeBg: string;
  badgeText: string;
  label: string;
};

export function toneFor(score: number): Tone {
  if (score >= 70) {
    return {
      bar: "bg-emerald-500",
      dot: "bg-emerald-500",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      label: "On track",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-amber-500",
      dot: "bg-amber-500",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
      label: "Needs work",
    };
  }
  return {
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    label: "Priority",
  };
}

function LessonRow({ lesson }: Readonly<{ lesson: BreakdownLesson }>) {
  const started = lesson.score != null;
  const tone = started ? toneFor(lesson.score as number) : null;

  const content = (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate text-sm text-slate-700">{lesson.name}</span>
      <div className="flex shrink-0 items-center gap-2">
        {started && tone ? (
          <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-slate-200 sm:block">
            <div
              className={`h-full rounded-full ${tone.bar}`}
              style={{ width: `${lesson.score}%` }}
            />
          </div>
        ) : null}
        <span
          className={`text-right text-xs font-semibold tabular-nums ${
            started ? "w-10 text-slate-700" : "w-20 text-slate-400"
          }`}
        >
          {started ? `${lesson.score}%` : "Not started"}
        </span>
      </div>
    </div>
  );

  if (lesson.href) {
    return (
      <Link
        href={lesson.href}
        className="-mx-2 block rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
      >
        {content}
      </Link>
    );
  }
  return <div className="px-0 py-1.5">{content}</div>;
}

function TopicRow({ topic }: Readonly<{ topic: BreakdownTopic }>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tone = toneFor(topic.score);
  const expandable = (topic.lessons?.length ?? 0) > 0;

  const header = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {expandable ? (
            <svg
              className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} />
          )}
          <span className="truncate text-sm font-medium text-slate-800">
            {topic.name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`hidden rounded-full px-2 py-0.5 text-xs font-semibold sm:inline ${tone.badgeBg} ${tone.badgeText}`}
          >
            {tone.label}
          </span>
          <span className="w-10 text-right text-sm font-bold tabular-nums text-slate-900">
            {topic.score}%
          </span>
        </div>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={`${topic.name} score`}
        aria-valuenow={topic.score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${tone.bar}`}
          style={{ width: `${topic.score}%` }}
        />
      </div>
    </>
  );

  if (!expandable) {
    return <div className="min-w-0">{header}</div>;
  }

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => setIsExpanded((open) => !open)}
        aria-expanded={isExpanded}
        className="block w-full text-left"
      >
        {header}
      </button>
      {isExpanded ? (
        <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white px-3 py-1">
          {topic.lessons?.map((lesson) => (
            <LessonRow key={lesson.name} lesson={lesson} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type TopicBreakdownCardProps = {
  /** Logo glyph shown in the header bar (e.g. "N"). */
  logo?: string;
  /** Header title, e.g. "HSC Advanced Diagnostic". */
  title: string;
  /** Header subtitle, e.g. "Your topic breakdown". */
  subtitle: string;
  /** Optional status pill on the right of the header, e.g. "Completed". */
  statusLabel?: string;
  topics: BreakdownTopic[];
  overallScore: number;
  overallLabel?: string;
  recommended?: {
    label?: string;
    title: string;
    description?: string;
    href?: string;
  } | null;
};

export function TopicBreakdownCard({
  logo = "N",
  title,
  subtitle,
  statusLabel,
  topics,
  overallScore,
  overallLabel = "Overall readiness",
  recommended,
}: Readonly<TopicBreakdownCardProps>) {
  const overallTone = toneFor(overallScore);

  const recommendedBody: ReactNode = recommended ? (
    <>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {recommended.label ?? "Recommended next lesson"}
      </p>
      <p className="mt-2 text-lg font-semibold leading-7">{recommended.title}</p>
      {recommended.description ? (
        <p className="mt-2 text-sm text-slate-400">{recommended.description}</p>
      ) : null}
    </>
  ) : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      {/* App-style header bar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            {logo}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        {statusLabel ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {statusLabel}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        {/* Topic breakdown */}
        <div className="space-y-5">
          {topics.map((topic) => (
            <TopicRow key={topic.name} topic={topic} />
          ))}
        </div>

        {/* Overall + recommendation */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {overallLabel}
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">
                {overallScore}%
              </span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${overallTone.bar}`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>

          {recommended ? (
            recommended.href ? (
              <Link
                href={recommended.href}
                className="block rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white transition hover:bg-slate-800"
              >
                {recommendedBody}
              </Link>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white">
                {recommendedBody}
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
