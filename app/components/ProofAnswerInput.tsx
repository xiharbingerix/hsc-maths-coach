"use client";

import { useRef } from "react";

type ProofAnswerInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  id?: string;
  className?: string;
};

const FIELD_CLASS =
  "w-full min-h-[14rem] rounded-xl border border-slate-300 px-3 py-3 " +
  "font-mono text-sm leading-relaxed text-slate-900 focus:border-slate-500 " +
  "focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50";

const INSERT_TOKENS = [
  { label: "Assume", text: "Assume " },
  { label: "Therefore", text: "Therefore " },
  { label: "Contradiction", text: "contradiction" },
  { label: "Base case", text: "Base case: " },
  { label: "Hypothesis", text: "Inductive hypothesis: " },
  { label: "Step", text: "Inductive step: " },
  { label: "Conclusion", text: "Conclusion: " },
  { label: "sqrt( )", text: "sqrt()" },
  { label: ">= ", text: ">=" },
  { label: "^", text: "^" },
] as const;

export function ProofAnswerInput({
  value,
  onChange,
  placeholder = "Write your proof here",
  disabled = false,
  ariaLabel,
  id,
  className = "",
}: ProofAnswerInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function insertText(snippet: string) {
    const field = textareaRef.current;
    if (!field || disabled) return;

    const start = field.selectionStart ?? value.length;
    const end = field.selectionEnd ?? value.length;
    const nextValue = value.slice(0, start) + snippet + value.slice(end);
    onChange(nextValue);

    queueMicrotask(() => {
      const target = textareaRef.current;
      if (!target) return;
      const cursor = start + snippet.length;
      target.focus();
      target.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel ?? placeholder}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        spellCheck={false}
        className={FIELD_CLASS}
      />
      <div className="flex flex-wrap gap-2">
        {INSERT_TOKENS.map((token) => (
          <button
            key={token.label}
            type="button"
            onClick={() => insertText(token.text)}
            disabled={disabled}
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {token.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Write in sentences and use plain-text maths such as `sqrt(2)`, `^`, and
        `&gt;=`.
      </p>
    </div>
  );
}
