"use client";

import { memo } from "react";
import { InlineMath } from "react-katex";

import { tokenizeMathText } from "../../lib/mathText";

// Memoised: KaTeX parsing is expensive and `text` is a plain string, so
// re-renders of a parent with unchanged text skip re-rendering entirely.
export const MathText = memo(function MathText({ text }: { text: string }) {
  return (
    <>
      {tokenizeMathText(text).map((segment, i) =>
        segment.type === "math" ? (
          <InlineMath key={i} math={segment.value} />
        ) : (
          <span key={i}>{segment.value}</span>
        )
      )}
    </>
  );
});
