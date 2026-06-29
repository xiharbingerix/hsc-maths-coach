"use client";

import { InlineMath } from "react-katex";

import { tokenizeMathText } from "../../lib/mathText";

export function MathText({ text }: { text: string }) {
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
}
