// Shared, framework-free helpers for the SVG plot/diagram renderers.

/** Tick values in [min, max] aligned to multiples of `step`. */
export function ticksBetween(min: number, max: number, step: number): number[] {
  if (step <= 0 || max <= min) return [];
  const first = Math.ceil(min / step) * step;
  const out: number[] = [];
  for (let v = first; v <= max + step / 1000; v += step) {
    out.push(Number(v.toFixed(10)));
  }
  return out;
}

/** Compact tick formatting: integers as-is, otherwise ≤2 decimals. */
export function formatTick(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

/**
 * Tick values [0, step, …, ≥ max] for a value axis, plus the axis maximum
 * (last tick). `step` defaults to roughly five intervals.
 */
export function axisTicks(max: number, step?: number): { ticks: number[]; axisMax: number } {
  const safeMax = max > 0 ? max : 1;
  const s = step && step > 0 ? step : Math.max(1, Math.ceil(safeMax / 5));
  const ticks: number[] = [];
  for (let v = 0; v <= safeMax + s / 1000; v += s) ticks.push(Number(v.toFixed(10)));
  if (ticks[ticks.length - 1] < safeMax) ticks.push(ticks[ticks.length - 1] + s);
  return { ticks, axisMax: ticks[ticks.length - 1] };
}

const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "-": "⁻", "+": "⁺", n: "ⁿ", x: "ˣ", i: "ⁱ",
};

function toSuperscript(group: string): string {
  return [...group].map((ch) => SUPERSCRIPT[ch] ?? ch).join("");
}

/**
 * Lightweight, print-safe typesetting for plain-text SVG labels: caret
 * exponents become Unicode superscripts (`x^2` → `x²`, `x^{-1}` → `x⁻¹`) and a
 * small set of unambiguous tokens are replaced (`pi`→π, `theta`→θ, `sqrt`→√,
 * `<=`→≤, `>=`→≥, `!=`→≠, `+-`→±, `->`→→). Conservative by design so it never
 * mangles ordinary labels.
 */
export function mathLabel(input: string): string {
  if (!input) return input;
  return input
    .replace(/\^\{([^}]+)\}/g, (_, g: string) => toSuperscript(g))
    .replace(/\^(-?\d+|[xni])/g, (_, g: string) => toSuperscript(g))
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠")
    .replace(/\+-/g, "±")
    .replace(/->/g, "→")
    .replace(/\bpi\b/g, "π")
    .replace(/\btheta\b/g, "θ")
    .replace(/\bsqrt\b/g, "√");
}
