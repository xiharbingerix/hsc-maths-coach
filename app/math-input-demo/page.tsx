import type { Metadata } from "next";
import katex from "katex";
import { parseStudentMath } from "../../lib/mathInput/parseStudentMath";
import { MathInputDemoClient } from "./MathInputDemoClient";

export const metadata: Metadata = {
  title: "Math Input Demo | Nova Maths",
  robots: { index: false },
};

type ExampleRow = {
  label: string;
  input: string;
};

const EXAMPLES: ExampleRow[] = [
  // Fractions
  { label: "Simple fraction",          input: "1/2" },
  { label: "Negative fraction",        input: "-3/4" },
  { label: "Variable fraction",        input: "x/2" },
  { label: "Algebraic fraction",       input: "(x+1)/(x-1)" },
  { label: "Expression over number",   input: "(2x+3)/5" },
  // Greek + fractions
  { label: "Pi fraction",              input: "pi/3" },
  { label: "Theta expression",         input: "2*theta" },
  // Square roots
  { label: "Square root of integer",   input: "sqrt(5)" },
  { label: "Square root of expression",input: "sqrt(x+1)" },
  // Exponents
  { label: "Simple exponent",          input: "x^2" },
  { label: "Multi-digit exponent",     input: "x^10" },
  { label: "Exponent with expression", input: "x^(n+1)" },
  { label: "Polynomial",               input: "x^2+3x-1" },
  // Trig
  { label: "Sine",                     input: "sin(x)" },
  { label: "Cosine",                   input: "cos(x)" },
  { label: "Tangent with Greek",       input: "tan(theta)" },
  { label: "Log",                      input: "ln(x)" },
  // Equations and coordinates
  { label: "Equation",                 input: "x=3" },
  { label: "Coordinate",               input: "(3,4)" },
  // Degrees
  { label: "Degrees symbol",           input: "90°" },
  { label: "Degrees word",             input: "45 degrees" },
  // Combinations
  { label: "Sqrt over integer",        input: "(sqrt(5))/3" },
  { label: "Trig over integer",        input: "sin(x)/2" },
  // Plain numbers / pass-through
  { label: "Plain number",             input: "42" },
  { label: "Negative number",          input: "-7" },
  { label: "Decimal",                  input: "3.14" },
  { label: "Money (fallback)",         input: "$30" },
];

type RenderedExample = ExampleRow & {
  latex: string;
  html: string | null;
};

function renderExample(row: ExampleRow): RenderedExample {
  const latex = parseStudentMath(row.input);
  try {
    const html = katex.renderToString(latex, {
      throwOnError: true,
      displayMode: false,
      strict: false,
    });
    return { ...row, latex, html };
  } catch {
    return { ...row, latex, html: null };
  }
}

export default function MathInputDemoPage() {
  const rows = EXAMPLES.map(renderExample);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Component preview · not visible to students
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Math Answer Input — Demo
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Students type natural text. A preview renders live below the input using
            KaTeX. The raw string is unchanged and passed directly to answer
            marking — this component does not affect marking logic.
          </p>
        </header>

        <MathInputDemoClient />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Supported patterns
          </h2>
          <p className="text-sm text-slate-600">
            Server-rendered examples showing raw input → intermediate LaTeX → rendered output.
            Rows with no rendered output fall back to plain text in the component.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 text-left">Pattern</th>
                  <th className="px-4 py-3 text-left">Student types</th>
                  <th className="px-4 py-3 text-left">→ LaTeX</th>
                  <th className="px-4 py-3 text-left">Preview</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.input}
                    className={`border-b border-slate-100 last:border-0 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-slate-600">{row.label}</td>
                    <td className="px-4 py-2.5">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">
                        {row.input}
                      </code>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-xs text-blue-700">
                        {row.latex}
                      </code>
                    </td>
                    <td className="px-4 py-2.5">
                      {row.html ? (
                        // KaTeX-generated HTML is safe — no user input is included.
                        // eslint-disable-next-line react/no-danger
                        <span dangerouslySetInnerHTML={{ __html: row.html }} />
                      ) : (
                        <span className="text-slate-400 italic">
                          fallback: {row.input}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Known limitations</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-amber-800">
            <li>
              <code className="font-mono">x^2/3</code> is ambiguous — use{" "}
              <code className="font-mono">(x^2)/3</code> or{" "}
              <code className="font-mono">x^(2/3)</code> for a clear fraction.
            </li>
            <li>
              <code className="font-mono">2pi/3</code> does not become{" "}
              <code className="font-mono">\frac{"{2\\pi}"}{"{3}"}</code> — write{" "}
              <code className="font-mono">(2pi)/3</code> instead.
            </li>
            <li>
              Nested fractions (<code className="font-mono">a/b/c</code>) are
              not transformed.
            </li>
            <li>
              Dollar amounts like <code className="font-mono">$30</code> show as
              plain text — answer marking handles them correctly.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
