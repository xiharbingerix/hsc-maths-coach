"use client";

import { useEffect, useRef, useState } from "react";

// React 19 first-class custom element support — declare <math-field> for JSX.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.HTMLAttributes<HTMLElement> & {
        ref?: React.RefObject<HTMLElement | null>;
        "math-virtual-keyboard-policy"?: string;
      };
    }
  }
}

type MathAnswerInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  id?: string;
  className?: string;
  /** Ignored — kept for API compatibility; MathLive ships its own keyboard. */
  showToolbar?: boolean;
};

const FIELD_CLASS =
  "w-full min-h-[2.75rem] rounded-xl border border-slate-300 px-3 py-2 " +
  "text-lg focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/**
 * A math answer input that renders inline LaTeX as the student types, powered
 * by MathLive (Symbolab-style). MathLive is loaded dynamically after
 * hydration; a plain <input> is shown until it's ready so SSR works cleanly.
 *
 * The onChange value is the raw LaTeX string from MathLive. answerMarking.ts
 * normalises common LaTeX patterns (\\frac, \\sqrt, x^{n}, Greek letters …)
 * before comparison, so existing question answers work unchanged.
 */
export function MathAnswerInput({
  value,
  onChange,
  placeholder = "Type your answer",
  disabled = false,
  ariaLabel,
  id,
  className = "",
}: MathAnswerInputProps) {
  const [mathLiveReady, setMathLiveReady] = useState(false);
  const mathfieldRef = useRef<HTMLElement | null>(null);

  // Load MathLive lazily on the student's first interaction with this field.
  // The 824 KB bundle would visibly freeze the page if imported on mount.
  const loadStartedRef = useRef(false);

  function handleFirstInteraction() {
    if (loadStartedRef.current) return;
    loadStartedRef.current = true;
    import("mathlive").then(() => setMathLiveReady(true));
  }

  // When MathLive finishes loading and the <math-field> swaps in, carry over
  // any text the student typed into the fallback during the load and restore
  // focus, so the swap is seamless (no lost keystrokes, no second click).
  const handedOffRef = useRef(false);
  useEffect(() => {
    if (!mathLiveReady) return;
    const mf = mathfieldRef.current as (HTMLElement & {
      value: string;
      focus: () => void;
    }) | null;
    if (!mf || handedOffRef.current) return;
    handedOffRef.current = true;
    if (value && mf.value !== value) mf.value = value;
    mf.focus();
  }, [mathLiveReady, value]);

  // Sync readOnly and value onto the math-field imperatively when they change.
  useEffect(() => {
    const mf = mathfieldRef.current as (HTMLElement & {
      value: string;
      readOnly: boolean;
    }) | null;
    if (!mf) return;
    mf.readOnly = disabled;
    // Only push a reset downward (e.g. "Next question →" clears the field).
    if (value === "" && mf.value !== "") mf.value = "";
  }, [disabled, value, mathLiveReady]);

  return (
    <div className={`space-y-1 ${className}`}>
      {mathLiveReady ? (
        <math-field
          ref={mathfieldRef}
          id={id}
          aria-label={ariaLabel ?? placeholder}
          math-virtual-keyboard-policy="auto"
          className={FIELD_CLASS}
          style={{ fontFamily: "inherit" }}
          onInput={(e) => {
            const mf = e.currentTarget as HTMLElement & { value: string };
            onChange(mf.value);
          }}
        />
      ) : (
        // Plain-text fallback shown until MathLive loads on first focus.
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFirstInteraction}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel ?? placeholder}
          id={id}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className={FIELD_CLASS}
        />
      )}
      <p className="text-xs text-slate-400">
        Type maths — it renders as you go. Use / for fractions, ^ for powers.
      </p>
    </div>
  );
}
