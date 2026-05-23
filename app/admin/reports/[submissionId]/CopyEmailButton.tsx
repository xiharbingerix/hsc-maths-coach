"use client";

import { useState } from "react";

export function CopyEmailButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmailText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copyEmailText}
      className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      {copied ? "Copied" : "Copy email text"}
    </button>
  );
}
