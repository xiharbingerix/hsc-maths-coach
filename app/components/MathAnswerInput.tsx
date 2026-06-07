"use client";

import { useEffect, useMemo, useRef } from "react";
import katex from "katex";
import { parseStudentMath } from "../../lib/mathInput/parseStudentMath";

type MathAnswerInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  id?: string;
  className?: string;
  /** Show the toolbar of insertion helpers. Defaults to true. */
  showToolbar?: boolean;
};

type Preview =
  | { kind: "rendered"; html: string }
  | { kind: "fallback"; text: string }
  | null;

function buildPreview(raw: string): Preview {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const latex = parseStudentMath(trimmed);

  try {
    const html = katex.renderToString(latex, {
      throwOnError: true,
      displayMode: false,
      strict: false,
    });
    return { kind: "rendered", html };
  } catch {
    return { kind: "fallback", text: trimmed };
  }
}

/**
 * Splice `template` into `value` at [selStart, selEnd), replacing any
 * selection. Returns the new string and the absolute cursor position derived
 * from (selStart + cursorOffset).
 */
function spliceTemplate(
  value: string,
  selStart: number,
  selEnd: number,
  template: string,
  cursorOffset: number
): { newValue: string; cursorPos: number } {
  return {
    newValue: value.slice(0, selStart) + template + value.slice(selEnd),
    cursorPos: selStart + cursorOffset,
  };
}

const TOOLBAR_BTN =
  "rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium " +
  "text-slate-600 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus:outline-none focus:ring-1 focus:ring-slate-400";

/**
 * A text input that shows a live KaTeX preview and provides a toolbar for
 * inserting common math templates.
 *
 * Raw value contract: the value passed to onChange is always unmodified plain
 * text and is safe to pass directly to markTypedAnswer. Toolbar buttons insert
 * plain-text syntax (e.g. "()/()") — the parser converts it for preview only.
 */
export function MathAnswerInput({
  value,
  onChange,
  placeholder = "Type your answer",
  disabled = false,
  ariaLabel,
  id,
  className = "",
  showToolbar = true,
}: MathAnswerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Cursor position to restore after the next render triggered by a toolbar
  // button's onChange call. null during normal keystrokes (no-op in effect).
  const pendingCursorRef = useRef<number | null>(null);

  const preview = useMemo(() => buildPreview(value), [value]);

  // Apply pending cursor position after each commit. Runs on every render but
  // is a null-check no-op during normal typing.
  useEffect(() => {
    if (pendingCursorRef.current !== null && inputRef.current) {
      const pos = pendingCursorRef.current;
      pendingCursorRef.current = null;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(pos, pos);
    }
  });

  // --- Toolbar handlers ---

  function readSelection() {
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    return { start, end, selected: value.slice(start, end) };
  }

  function applyTemplate(template: string, cursorOffset: number) {
    const { start, end } = readSelection();
    const { newValue, cursorPos } = spliceTemplate(
      value, start, end, template, cursorOffset
    );
    onChange(newValue);
    pendingCursorRef.current = cursorPos;
  }

  function handleFraction() {
    const { start, end, selected } = readSelection();

    if (selected.length > 0) {
      // Wrap selected text as the numerator: (selected)/()
      // Cursor lands inside the denominator parentheses.
      //   "(selected)/()"
      //   0         sel.len+1 sel.len+2 sel.len+3 sel.len+4
      //   (  ...sel...  )  /  (  )
      //                              ^ cursor here = 1 + sel.len + 3
      const template = `(${selected})/()`;
      const { newValue, cursorPos } = spliceTemplate(
        value, start, end, template, 1 + selected.length + 3
      );
      onChange(newValue);
      pendingCursorRef.current = cursorPos;
    } else {
      // No selection: insert "()/()" and place cursor inside the numerator.
      //   ( ) / ( )
      //   0 1 2 3 4   → cursor at offset 1
      applyTemplate("()/()", 1);
    }
  }

  function handlePower() {
    const { start, end, selected } = readSelection();

    if (selected.length > 0) {
      // Use selection as the exponent: ^(selected), cursor after closing paren.
      const template = `^(${selected})`;
      const { newValue, cursorPos } = spliceTemplate(
        value, start, end, template, template.length
      );
      onChange(newValue);
      pendingCursorRef.current = cursorPos;
    } else {
      // Insert "^()" and place cursor inside the parens.
      //   ^  (  )
      //   0  1  2  → cursor at offset 2
      applyTemplate("^()", 2);
    }
  }

  function handleSqrt() {
    const { start, end, selected } = readSelection();

    if (selected.length > 0) {
      // Wrap selection: sqrt(selected), cursor after closing paren.
      const template = `sqrt(${selected})`;
      const { newValue, cursorPos } = spliceTemplate(
        value, start, end, template, template.length
      );
      onChange(newValue);
      pendingCursorRef.current = cursorPos;
    } else {
      // Insert "sqrt()" and place cursor inside the parens.
      //   s q r t (  )
      //   0 1 2 3 4  5  → cursor at offset 5
      applyTemplate("sqrt()", 5);
    }
  }

  function handleSymbol(text: string) {
    // Insert the symbol at cursor and place cursor immediately after it.
    applyTemplate(text, text.length);
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showToolbar && !disabled ? (
        <div
          role="toolbar"
          aria-label="Math input helpers"
          className="flex flex-wrap gap-1"
        >
          <button
            type="button"
            onClick={handleFraction}
            title="Insert fraction: (numerator)/(denominator)"
            aria-label="Insert fraction"
            className={TOOLBAR_BTN}
          >
            a/b
          </button>
          <button
            type="button"
            onClick={handlePower}
            title="Insert power: base^(exponent)"
            aria-label="Insert power"
            className={TOOLBAR_BTN}
          >
            x<sup>n</sup>
          </button>
          <button
            type="button"
            onClick={handleSqrt}
            title="Insert square root: sqrt(expression)"
            aria-label="Insert square root"
            className={TOOLBAR_BTN}
          >
            √
          </button>
          <button
            type="button"
            onClick={() => handleSymbol("pi")}
            title="Insert pi"
            aria-label="Insert pi"
            className={TOOLBAR_BTN}
          >
            π
          </button>
          <button
            type="button"
            onClick={() => handleSymbol("theta")}
            title="Insert theta"
            aria-label="Insert theta"
            className={TOOLBAR_BTN}
          >
            θ
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 font-mono text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {preview ? (
        <div className="flex min-h-[2.25rem] items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5">
          <span className="shrink-0 select-none text-xs font-semibold uppercase tracking-wide text-slate-400">
            Preview
          </span>
          {preview.kind === "rendered" ? (
            // KaTeX-generated HTML is safe; it contains no user-supplied markup.
            // eslint-disable-next-line react/no-danger
            <span
              className="overflow-x-auto text-sm text-slate-800"
              dangerouslySetInnerHTML={{ __html: preview.html }}
            />
          ) : (
            <span className="text-sm text-slate-600">{preview.text}</span>
          )}
        </div>
      ) : null}
    </div>
  );
}
