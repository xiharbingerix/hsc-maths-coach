"use client";

import { useState } from "react";
import { MathAnswerInput } from "../components/MathAnswerInput";

export function MathInputDemoClient() {
  const [value, setValue] = useState("");

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Try it yourself</h2>
      <p className="text-sm text-slate-600">
        Use the toolbar buttons or type directly. Toolbar buttons insert
        plain-text syntax — the preview converts it with KaTeX. The raw string
        shown below is what answer marking receives, unmodified.
      </p>
      <p className="text-xs text-slate-500">
        Tip: select text in the input then click a toolbar button to wrap the
        selection — e.g. select <code className="font-mono">x^2</code> then
        click{" "}
        <strong>a/b</strong> to make it the numerator.
      </p>
      <MathAnswerInput
        value={value}
        onChange={setValue}
        placeholder="e.g. 1/2, x^2+3x, sqrt(5), pi/3, sin(x)"
        ariaLabel="Math answer input demo"
      />
      {value ? (
        <p className="text-xs text-slate-400">
          Raw string sent to marking:{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-600">
            {value}
          </code>
        </p>
      ) : null}
    </section>
  );
}
