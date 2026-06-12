"use client";

import { useState } from "react";
import { MathText } from "../../components/MathText";
import { clientTrackEvent } from "../../../lib/analytics/clientTrackEvent";
import { buildHintLadder } from "../../../lib/hintLadder";
import type { PracticeQuestion } from "../../../lib/lessons/differentialCalculus";

type Props = {
  question: PracticeQuestion;
  courseSlug?: string;
  unitSlug?: string;
  lessonSlug: string;
  section: "guided-practice" | "independent-practice";
};

export function HintLadder({
  question,
  courseSlug,
  unitSlug,
  lessonSlug,
  section,
}: Props) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [awaitingFinalConfirm, setAwaitingFinalConfirm] = useState(false);

  const levels = buildHintLadder(question);

  if (levels.length === 0) return null;

  const nextLevel = levels[revealedCount];
  const allRevealed = revealedCount >= levels.length;

  function revealNext() {
    if (!nextLevel) return;

    if (nextLevel.isFinalReveal && !awaitingFinalConfirm) {
      setAwaitingFinalConfirm(true);
      return;
    }

    const newCount = revealedCount + 1;
    setRevealedCount(newCount);
    setAwaitingFinalConfirm(false);

    // hint_requested fires exactly once — on first level reveal
    if (revealedCount === 0) {
      clientTrackEvent("hint_requested", {
        course_slug: courseSlug ?? null,
        unit_slug: unitSlug ?? null,
        lesson_slug: lessonSlug,
        question_id: question.id,
        section,
      });
    }

    clientTrackEvent("hint_level_viewed", {
      course_slug: courseSlug ?? null,
      unit_slug: unitSlug ?? null,
      lesson_slug: lessonSlug,
      question_id: question.id,
      hint_level: newCount,
      section,
    });
  }

  return (
    <div className="space-y-3">
      {levels.slice(0, revealedCount).map((level, i) => (
        <div
          key={i}
          className={`rounded-xl p-3 text-sm ${
            level.isFinalReveal
              ? "bg-slate-50 text-slate-700"
              : "bg-blue-50 text-blue-900"
          }`}
        >
          <p
            className={`mb-1 text-xs font-semibold uppercase tracking-wide ${
              level.isFinalReveal ? "text-slate-500" : "text-blue-700"
            }`}
          >
            {level.label}
          </p>
          <MathText text={level.text} />
        </div>
      ))}

      {awaitingFinalConfirm && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <p className="font-medium">
            This will show the complete worked solution including the answer.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={revealNext}
              className="rounded-xl bg-amber-700 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-800"
            >
              Show worked solution
            </button>
            <button
              type="button"
              onClick={() => setAwaitingFinalConfirm(false)}
              className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
            >
              Try again first
            </button>
          </div>
        </div>
      )}

      {!allRevealed && !awaitingFinalConfirm && (
        <button
          type="button"
          onClick={revealNext}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          {revealedCount === 0 ? "I'm stuck" : "Next hint →"}
        </button>
      )}
    </div>
  );
}
