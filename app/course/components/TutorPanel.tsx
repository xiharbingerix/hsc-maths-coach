"use client";

import { useState } from "react";
import { MathText } from "../../components/MathText";
import { supabase } from "../../../lib/supabaseClient";
import { clientTrackEvent } from "../../../lib/analytics/clientTrackEvent";
import type { PracticeQuestion } from "../../../lib/lessons/differentialCalculus";

type Mode = "rephrase" | "steps";

type TutorResult =
  | { mode: "rephrase"; explanation: string }
  | { mode: "steps"; steps: string[] };

const LABELS: Record<Mode, string> = {
  rephrase: "Give me a hint",
  steps: "How do I approach this?",
};

type Props = {
  question: PracticeQuestion;
  courseSlug?: string;
  topicSlug?: string;
  subtopicSlug?: string;
};

/**
 * Button-only AI help for a single practice question. No free-text input: each
 * button asks the server to re-present this question's existing worked solution
 * in a fixed shape. Results are cached per mode so re-clicking just toggles.
 * Silently hides itself if the feature is off or the user isn't signed in.
 */
export function TutorPanel({ question, courseSlug, topicSlug, subtopicSlug }: Props) {
  const [results, setResults] = useState<Partial<Record<Mode, TutorResult>>>({});
  const [open, setOpen] = useState<Mode | null>(null);
  const [loading, setLoading] = useState<Mode | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable || !question.explanation) return null;

  async function handleClick(mode: Mode) {
    if (results[mode]) {
      setOpen((current) => (current === mode ? null : mode));
      return;
    }
    setLoading(mode);

    // Fire analytics on the first real request (not toggle).
    clientTrackEvent("ai_help_requested", {
      course_slug: courseSlug ?? null,
      topic_slug: topicSlug ?? null,
      subtopic_slug: subtopicSlug ?? null,
      question_id: question.id,
      difficulty: question.difficulty ?? null,
      mode,
    });

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setUnavailable(true);
        return;
      }
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode,
          question: {
            prompt: question.prompt,
            latex: question.latex,
            answer: question.answer,
            explanation: question.explanation,
            hint: question.hint,
          },
        }),
      });
      // 503 = feature off, 401 = not signed in: hide the panel entirely.
      if (res.status === 503 || res.status === 401) {
        setUnavailable(true);
        return;
      }
      if (!res.ok) {
        return; // transient (429/502) — leave buttons, user can retry
      }
      const result = (await res.json()) as TutorResult;
      setResults((current) => ({ ...current, [mode]: result }));
      setOpen(mode);
    } catch {
      // network error — leave the buttons in place for a retry
    } finally {
      setLoading(null);
    }
  }

  const shown = open ? results[open] : undefined;

  return (
    <div className="mt-3 space-y-3 border-t border-slate-200 pt-3">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(LABELS) as Mode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => handleClick(mode)}
            disabled={loading !== null}
            className={`rounded-xl border px-3 py-1.5 text-sm font-semibold disabled:opacity-50 ${
              open === mode
                ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {loading === mode ? "Thinking…" : LABELS[mode]}
          </button>
        ))}
      </div>

      {shown && (
        <div className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-950">
          {shown.mode === "rephrase" ? (
            <p>
              <MathText text={shown.explanation} />
            </p>
          ) : (
            <ol className="list-decimal space-y-1 pl-5">
              {shown.steps.map((step, i) => (
                <li key={i}>
                  <MathText text={step} />
                </li>
              ))}
            </ol>
          )}
          <p className="mt-2 text-xs text-indigo-700/70">
            AI hint, grounded in this lesson — it won&rsquo;t give you the answer.
          </p>
        </div>
      )}
    </div>
  );
}
