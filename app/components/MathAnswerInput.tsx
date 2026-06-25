"use client";

import { useEffect, useRef } from "react";

// React 19 web component JSX types for <math-field>
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.HTMLAttributes<HTMLElement> & {
        ref?: React.RefObject<HTMLElement | null>;
        "math-virtual-keyboard-policy"?: string;
        "smart-mode"?: string;
        "remove-extraneous-parentheses"?: string;
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
  /** Ignored — kept for API compatibility; MathLive renders its own toolbar/keyboard. */
  showToolbar?: boolean;
};

/**
 * A math answer input that renders inline LaTeX as you type, powered by MathLive.
 * Outputs the raw LaTeX string via onChange. The marking layer (normaliseText /
 * CAS) handles the LaTeX on the server side.
 *
 * MathLive is loaded dynamically (browser-only) so this component renders a
 * plain <input> until hydration is complete.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mathfieldRef = useRef<HTMLElement | null>(null);
  // Track whether MathLive has loaded so we can swap to the real field.
  const loadedRef = useRef(false);

  // Dynamically load MathLive and upgrade the placeholder <div> to a <math-field>.
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    import("mathlive").then(() => {
      const container = containerRef.current;
      if (!container) return;

      // Replace the SSR placeholder with a real math-field element.
      const mf = document.createElement("math-field") as HTMLElement & {
        value: string;
        readOnly: boolean;
      };

      mf.id = id ?? "";
      mf.setAttribute("aria-label", ariaLabel ?? placeholder);
      mf.setAttribute("math-virtual-keyboard-policy", "auto");
      // Remove extraneous parentheses MathLive sometimes adds for display
      mf.setAttribute("remove-extraneous-parentheses", "true");

      applyStyles(mf);
      applyDisabled(mf, disabled);

      // Set initial value before appending.
      if (value) mf.value = value;

      mf.addEventListener("input", () => {
        onChange(mf.value);
      });

      container.innerHTML = "";
      container.appendChild(mf);
      mathfieldRef.current = mf;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync disabled state after mount.
  useEffect(() => {
    const mf = mathfieldRef.current as (HTMLElement & { readOnly: boolean }) | null;
    if (!mf) return;
    applyDisabled(mf, disabled);
  }, [disabled]);

  // Sync value if parent resets it (e.g. advancing to the next question).
  useEffect(() => {
    const mf = mathfieldRef.current as (HTMLElement & { value: string }) | null;
    if (!mf) return;
    // Only push downward when the field itself did not just produce this value,
    // i.e. when the parent is explicitly resetting (empty string after "Next →").
    if (value === "" && mf.value !== "") {
      mf.value = "";
    }
  }, [value]);

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Container — holds the plain-text fallback until MathLive loads, then
          the MathLive web component. */}
      <div ref={containerRef}>
        {/* SSR / pre-hydration fallback: plain text input with identical sizing */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
      </div>
      <p className="text-xs text-slate-400">
        Type maths — it renders as you go. Use / for fractions, ^ for powers.
      </p>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const FIELD_CLASS =
  "w-full min-h-[2.5rem] rounded-xl border border-slate-300 px-3 py-2 " +
  "text-lg focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function applyStyles(el: HTMLElement) {
  el.className = FIELD_CLASS;
  // Override MathLive's default styling so it blends with the design system.
  el.style.fontFamily = "inherit";
  el.style.fontSize = "1.125rem";
}

function applyDisabled(el: HTMLElement & { readOnly?: boolean }, isDisabled: boolean) {
  if ("readOnly" in el) el.readOnly = isDisabled;
  if (isDisabled) {
    el.setAttribute("disabled", "");
  } else {
    el.removeAttribute("disabled");
  }
}
