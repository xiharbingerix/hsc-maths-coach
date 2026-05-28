/**
 * Generates a PowerPoint slide deck for the Trapezoidal Rule lesson.
 *
 * Run with:
 *   npm run generate-slides
 *
 * Output:
 *   generated-slides/year-12-advanced/further-integral-calculus/trapezoidal-rule.pptx
 *
 * Formula display: LaTeX strings are converted to Unicode math text via
 * latexToReadable(). Raw LaTeX is preserved in speaker notes.
 * Full image-rendered math is a future enhancement.
 */

import PptxGenJS from 'pptxgenjs';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { trapezoidalRuleLesson } from '../lib/lessons/furtherIntegralCalculus';

// ── LaTeX → Unicode converter ──────────────────────────────────────────────────

const SUB: Record<string, string> = {
  '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄',
  '5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
  'n':'ₙ','a':'ₐ','e':'ₑ','i':'ᵢ','o':'ₒ','r':'ᵣ','u':'ᵤ','v':'ᵥ','x':'ₓ',
  '+':'₊','-':'₋','=':'₌','(':'₍',')':'₎',
};
const SUP: Record<string, string> = {
  '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴',
  '5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  '+':'⁺','-':'⁻','n':'ⁿ','i':'ⁱ',
};

function toSub(s: string): string { return s.split('').map(c => SUB[c] ?? c).join(''); }
function toSup(s: string): string { return s.split('').map(c => SUP[c] ?? c).join(''); }

/**
 * Converts a LaTeX math string to human-readable Unicode text.
 * Handles the patterns found in this lesson. Raw LaTeX is kept in speaker notes.
 */
function latexToReadable(s: string): string {
  let o = s;

  // \begin{array}…\end{array} → compact table rows
  o = o.replace(
    /\\begin\{array\}\{[^}]*\}([\s\S]*?)\\end\{array\}/g,
    (_, inner: string) => {
      const rows = inner.split(/\\\\/).map((r: string) => r.trim()).filter(Boolean);
      return rows
        .map((r: string) => r.split('&').map((c: string) => c.trim()).join('   '))
        .join('\n');
    },
  );

  // ── Symbol substitutions first — must happen before frac/int so that
  //    e.g. \approx\frac h2 doesn't collapse to \approxh/2 (word-boundary bug)

  // Relations and operators
  o = o.replace(/\\approx\b/g, ' ≈ ');
  o = o.replace(/\\geq\b|\\ge\b/g, '≥');
  o = o.replace(/\\leq\b|\\le\b/g, '≤');
  o = o.replace(/\\neq\b|\\ne\b/g, '≠');
  o = o.replace(/\\times\b/g, '×');
  o = o.replace(/\\div\b/g, '÷');
  o = o.replace(/\\pm\b/g, '±');

  // Delimiters
  o = o.replace(/\\left\s*\[/g, '[').replace(/\\right\s*\]/g, ']');
  o = o.replace(/\\left\s*\(/g, '(').replace(/\\right\s*\)/g, ')');
  o = o.replace(/\\left\s*\\{/g, '{').replace(/\\right\s*\\}/g, '}');

  // \frac{a}{b} → (a/b)
  // Repeat twice to handle one level of nesting
  for (let pass = 0; pass < 2; pass++) {
    o = o.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  }
  // \frac h2 or \frac12 (single-token arguments, no braces)
  o = o.replace(/\\frac\s*([A-Za-z0-9])\s*([A-Za-z0-9])/g, '$1/$2');

  // \int_a^b → ∫  (limits are implied by context)
  o = o.replace(/\\int_[A-Za-z0-9]+\^[A-Za-z0-9]+/g, '∫');
  o = o.replace(/\\int\b/g, '∫');

  // Ellipsis
  o = o.replace(/\\cdots\b/g, '⋯');
  o = o.replace(/\\ldots\b/g, '…');

  // Text environments
  o = o.replace(/\\text\{([^}]+)\}/g, '$1');
  o = o.replace(/\\mathrm\{([^}]+)\}/g, '$1');

  // Spacing commands
  o = o.replace(/\\quad\b/g, '   ');
  o = o.replace(/\\qquad\b/g, '      ');
  o = o.replace(/\\,/g, ' '); // thin space
  o = o.replace(/\\;/g, ' ');
  o = o.replace(/\\!/g, '');
  o = o.replace(/\\\s/g, ' ');    // backslash-space

  // Subscripts: _{…} before _x so braced form wins
  o = o.replace(/\_\{([^}]+)\}/g, (_, n: string) => toSub(n));
  o = o.replace(/\_([0-9A-Za-z])/g, (_, c: string) => toSub(c));

  // Superscripts: ^{…} before ^x
  o = o.replace(/\^\{([^}]+)\}/g, (_, n: string) => toSup(n));
  o = o.replace(/\^([0-9])/g, (_, c: string) => toSup(c));

  // Strip remaining unknown commands (e.g. \displaystyle)
  o = o.replace(/\\[a-zA-Z]+\b/g, '');
  // Strip lone backslashes
  o = o.replace(/\\/g, '');

  // Tidy whitespace (but preserve intentional newlines from the array handler)
  o = o.split('\n').map(line => line.replace(/[ \t]+/g, ' ').trim()).join('\n');

  return o.trim();
}

// ── Palette ────────────────────────────────────────────────────────────────────
const C = {
  navy:   '1B3A6B',
  white:  'FFFFFF',
  body:   '1A1A1A',
  muted:  '555555',
  lBlue:  'EBF4FF',
  lAmber: 'FFF8E1',
  lRed:   'FEF2F2',
  lGreen: 'F0FDF4',
  redTxt: '991B1B',
  grTxt:  '166534',
} as const;

// ── Geometry (inches) – LAYOUT_WIDE = 10" × 5.625" ────────────────────────────
const SW  = 10;
const SH  = 5.625;
const HDR = 0.72;           // header bar height
const M   = 0.42;           // horizontal margin
const CT  = HDR + 0.20;     // content area top
const CW  = SW - 2 * M;     // content area width
const CH  = SH - CT - 0.22; // content area height

async function main(): Promise<void> {
  const lesson = trapezoidalRuleLesson;

  const pptx = new PptxGenJS();
  pptx.layout  = 'LAYOUT_WIDE';
  pptx.author  = 'HSC Maths Coach';
  pptx.title   = `${lesson.courseTitle} – ${lesson.title}`;
  pptx.subject = lesson.title;

  type S = ReturnType<typeof pptx.addSlide>;
  const R = pptx.ShapeType.rect;

  /** Navy header bar with white title text. */
  function hdr(s: S, title: string): void {
    s.addShape(R, { x: 0, y: 0, w: SW, h: HDR, fill: { color: C.navy }, line: { type: 'none' } });
    s.addText(title, { x: M, y: 0, w: CW, h: HDR, fontSize: 18, bold: true, color: C.white, valign: 'middle' });
  }

  /** Filled rectangle — coloured background behind a text block. */
  function box(s: S, x: number, y: number, w: number, h: number, bg: string): void {
    s.addShape(R, { x, y, w, h, fill: { color: bg }, line: { type: 'none' } });
  }

  /**
   * Formula box: amber background + readable Unicode math.
   * fontSize defaults to 13 (larger now that text is readable Unicode, not raw LaTeX).
   */
  function fmlaBox(
    s: S,
    latex: string,
    x: number, y: number, w: number, h: number,
    opts: { fontSize?: number } = {},
  ): void {
    const readable = latexToReadable(latex);
    const fs = opts.fontSize ?? 13;
    box(s, x, y, w, h, C.lAmber);
    s.addText(readable, {
      x: x + 0.12, y: y + 0.06, w: w - 0.24, h: h - 0.12,
      fontFace: 'Cambria Math', fontSize: fs, color: C.body, valign: 'middle', wrap: true,
    });
  }

  // ── Slide 1: Title ────────────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.addShape(R, { x: 0, y: 0, w: SW, h: SH * 0.58, fill: { color: C.navy }, line: { type: 'none' } });
    s.addText(lesson.title, {
      x: M, y: 0.5, w: CW, h: 1.7,
      align: 'center', fontSize: 34, bold: true, color: C.white,
    });
    s.addText(`${lesson.courseTitle}  ·  ${lesson.moduleTitle}`, {
      x: M, y: 2.2, w: CW, h: 0.45,
      align: 'center', fontSize: 13, color: 'BDD9F2',
    });
    s.addText(lesson.description, {
      x: 1.5, y: 3.45, w: SW - 3, h: 0.95,
      align: 'center', fontSize: 11, color: C.muted, italic: true, wrap: true,
    });
    s.addNotes(
      `Welcome. Today we're looking at ${lesson.title}.\n\n` +
      `Course: ${lesson.courseTitle} – ${lesson.moduleTitle}\n\n` +
      `Overview: ${lesson.description}`
    );
  }

  // ── Slide 2: Learning Intention & Success Criteria ────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'Learning Intention & Success Criteria');

    box(s, M, CT, CW, 0.7, C.lBlue);
    s.addText(lesson.learningIntention, {
      x: M + 0.14, y: CT + 0.04, w: CW - 0.28, h: 0.62,
      fontSize: 12, color: C.body, valign: 'middle', italic: true, wrap: true,
    });

    s.addText('By the end of this lesson you will be able to:', {
      x: M, y: CT + 0.82, w: CW, h: 0.3,
      fontSize: 10.5, bold: true, color: C.navy,
    });

    const bullets = lesson.successCriteria.map(c => ({
      text: c,
      options: { bullet: true, paraSpaceAfter: 2 },
    }));
    s.addText(bullets, {
      x: M + 0.1, y: CT + 1.16, w: CW - 0.2, h: CH - 1.16,
      fontSize: 10.5, color: C.body, wrap: true,
    });

    s.addNotes(
      `Read the learning intention aloud, then walk through each success criterion briefly.\n\n` +
      `Learning Intention:\n"${lesson.learningIntention}"\n\n` +
      `Success Criteria:\n${lesson.successCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
    );
  }

  // ── Slide 3: Key Formula ──────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'The Trapezoidal Rule – Key Formula');

    // Two most important teaching paragraphs (p0 and p2 are the clearest)
    const [p0, , p2] = lesson.teaching.paragraphs;
    const [hFx, mainFx, subFx] = lesson.teaching.latexBlocks;

    s.addText(p0, { x: M, y: CT,        w: CW, h: 0.38, fontSize: 11, color: C.body, wrap: true });
    s.addText(p2, { x: M, y: CT + 0.40, w: CW, h: 0.38, fontSize: 11, color: C.muted, italic: true, wrap: true });

    // Main composite formula — larger box, 13pt readable Unicode
    fmlaBox(s, mainFx, M, CT + 0.90, CW, 0.72, { fontSize: 13 });

    // h= and one-subinterval shorthand side by side
    const r2y = CT + 1.74;
    fmlaBox(s, hFx,   M,              r2y, CW * 0.47, 0.52);
    fmlaBox(s, subFx, M + CW * 0.50,  r2y, CW * 0.47, 0.52);

    s.addNotes(
      `Walk through the formula step by step.\n\n` +
      `Key points:\n` +
      lesson.teaching.paragraphs.map((p, i) => `${i + 1}. ${p}`).join('\n') +
      `\n\nFormula blocks (raw LaTeX for reference):\n` +
      lesson.teaching.latexBlocks.join('\n')
    );
  }

  // ── Slides 4–7: All Four Worked Examples ─────────────────────────────────────
  const exampleLabels = [
    'One Trapezoid',
    'Two Trapezoids',
    'Table of Values',
    'Concavity Interpretation',
  ];

  lesson.workedExamples.forEach((ex, ei) => {
    const s = pptx.addSlide();
    hdr(s, `Worked Example ${ei + 1}: ${exampleLabels[ei]}`);

    // Question box — use latexToReadable so table data shows as readable rows
    const qReadable = latexToReadable(ex.questionLatex);
    const qLines    = qReadable.split('\n').length;
    const qBoxH     = qLines > 1 ? 0.72 : 0.54;

    box(s, M, CT, CW, qBoxH, C.lBlue);
    s.addText(qReadable, {
      x: M + 0.14, y: CT + 0.04, w: CW - 0.28, h: qBoxH - 0.08,
      fontFace: 'Cambria Math', fontSize: 12, color: C.body, valign: 'middle', wrap: true,
    });

    // Steps — explanation on left, readable math on right
    let sy = CT + qBoxH + 0.12;
    ex.steps.forEach((step, i) => {
      s.addText(`${i + 1}.  ${step.explanation}`, {
        x: M, y: sy, w: CW * 0.54, h: 0.38,
        fontSize: 11, color: C.body, wrap: true,
      });
      if (step.latex) {
        const stepReadable = latexToReadable(step.latex);
        box(s, M + CW * 0.57, sy, CW * 0.41, 0.36, C.lAmber);
        s.addText(stepReadable, {
          x: M + CW * 0.57 + 0.10, y: sy + 0.03, w: CW * 0.41 - 0.20, h: 0.30,
          fontFace: 'Cambria Math', fontSize: 12, color: C.body, valign: 'middle',
        });
      }
      sy += 0.44;
    });

    // Answer bar
    const ansReadable = latexToReadable(ex.finalAnswerLatex);
    box(s, M, SH - 0.64, CW, 0.44, C.navy);
    s.addText(`Answer:  ${ansReadable}`, {
      x: M + 0.16, y: SH - 0.64 + 0.02, w: CW - 0.32, h: 0.40,
      fontFace: 'Cambria Math', fontSize: 13, bold: true, color: C.white, valign: 'middle',
    });

    s.addNotes(
      `Example ${ei + 1}: ${ex.title}\n\n` +
      `Say the question aloud before revealing each step.\n\n` +
      `Question (LaTeX): ${ex.questionLatex}\n\n` +
      `Steps:\n${ex.steps.map((st, i) =>
        `${i + 1}. ${st.explanation}${st.latex ? '  →  ' + st.latex : ''}`
      ).join('\n')}\n\n` +
      `Answer: ${ex.finalAnswerLatex}`
    );
  });

  // ── Slides 8–9: Common Mistakes (all 4, split across 2 slides) ───────────────
  const mistakeSlides = [
    { title: 'Common Mistakes (1 of 2)', items: lesson.commonMistakes.slice(0, 2) },
    { title: 'Common Mistakes (2 of 2)', items: lesson.commonMistakes.slice(2) },
  ];

  mistakeSlides.forEach(({ title, items }) => {
    const s    = pptx.addSlide();
    hdr(s, title);

    const rowH = (CH - 0.20) / items.length;

    items.forEach((m, i) => {
      const ry = CT + i * (rowH + 0.07);
      box(s, M,             ry, CW * 0.47, rowH, C.lRed);
      box(s, M + CW * 0.50, ry, CW * 0.47, rowH, C.lGreen);
      s.addText(`✗  ${m.mistake}`, {
        x: M + 0.10, y: ry + 0.07, w: CW * 0.47 - 0.20, h: rowH - 0.14,
        fontSize: 11, color: C.redTxt, valign: 'middle', wrap: true,
      });
      s.addText(`✓  ${m.fix}`, {
        x: M + CW * 0.50 + 0.10, y: ry + 0.07, w: CW * 0.47 - 0.20, h: rowH - 0.14,
        fontSize: 11, color: C.grTxt, valign: 'middle', wrap: true,
      });
    });

    s.addNotes(
      `Pause here and ask students which mistakes they've made before.\n\n` +
      `This slide:\n` +
      items.map((m, i) => `MISTAKE: ${m.mistake}\nFIX: ${m.fix}`).join('\n\n') +
      `\n\nAll mistakes for reference:\n` +
      lesson.commonMistakes.map((m, i) => `${i + 1}. ${m.mistake} → ${m.fix}`).join('\n')
    );
  });

  // ── Slide 10: Guided Practice ─────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    const q = lesson.guidedPractice[0];
    hdr(s, 'Your Turn – Guided Practice');

    s.addText('Pause the video and try this question. Write your working below.', {
      x: M, y: CT, w: CW, h: 0.30,
      fontSize: 10.5, color: C.muted, italic: true,
    });

    box(s, M, CT + 0.36, CW, 0.62, C.lBlue);
    s.addText(q.prompt, {
      x: M + 0.14, y: CT + 0.36, w: CW * 0.50, h: 0.62,
      fontSize: 12, bold: true, color: C.body, valign: 'middle', wrap: true,
    });
    s.addText(latexToReadable(q.latex), {
      x: M + CW * 0.52, y: CT + 0.40, w: CW * 0.44, h: 0.54,
      fontFace: 'Cambria Math', fontSize: 12, color: C.body, valign: 'middle', wrap: true,
    });

    if (q.hint) {
      s.addText(`Hint: ${q.hint}`, {
        x: M, y: CT + 1.08, w: CW, h: 0.34,
        fontSize: 10, color: C.muted, italic: true, wrap: true,
      });
    }

    s.addText('My working:', {
      x: M, y: CT + 1.52, w: 2, h: 0.28,
      fontSize: 10, bold: true, color: C.muted,
    });
    s.addShape(R, {
      x: M, y: CT + 1.82, w: CW, h: SH - (CT + 1.82) - 0.22,
      fill: { color: 'F9FAFB' }, line: { color: 'D1D5DB', pt: 1 },
    });

    s.addNotes(
      `Tell students: "Pause the video now and try this yourself."\n` +
      `Resume after giving them time.\n\n` +
      `Question: ${q.prompt}\n` +
      `LaTeX: ${q.latex}\n` +
      `Answer: ${q.answer}\n` +
      `Hint: ${q.hint ?? '–'}\n\n` +
      `All guided practice (for reference):\n` +
      lesson.guidedPractice
        .map((gq, i) => `${i + 1}. ${gq.prompt} (${gq.latex}) → ${gq.answer}`)
        .join('\n')
    );
  }

  // ── Slide 11: Summary ─────────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'Summary');

    s.addText('Key ideas from this lesson:', {
      x: M, y: CT, w: CW, h: 0.30,
      fontSize: 11.5, bold: true, color: C.navy,
    });

    const pts = [
      'Divide [a, b] into n equal subintervals of width  h = (b−a)/n.',
      'Formula:  (h/2)[y₀ + 2y₁ + 2y₂ + ⋯ + 2yₙ₋₁ + yₙ]',
      'Endpoints y₀ and yₙ — coefficient 1.  Interior values — coefficient 2.',
      'From a table of values: read h from the x-spacing, then apply the formula.',
      'Concave-up curve → trapezoids lie above → overestimate.',
      'Concave-down curve → trapezoids lie below → underestimate.',
      'More subintervals (smaller h) → closer approximation.',
    ];

    const bullets = pts.map(t => ({
      text: t,
      options: { bullet: true, paraSpaceAfter: 4 },
    }));
    s.addText(bullets, {
      x: M + 0.10, y: CT + 0.38, w: CW - 0.20, h: CH - 0.38,
      fontSize: 11, color: C.body, wrap: true,
    });

    s.addNotes(
      `Read through the summary with students.\n` +
      `Revisit the learning intention: "${lesson.learningIntention}"\n\n` +
      `Key points:\n${pts.join('\n')}`
    );
  }

  // ── Write output ───────────────────────────────────────────────────────────────
  const outDir  = join(process.cwd(), 'generated-slides', 'year-12-advanced', 'further-integral-calculus');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'trapezoidal-rule.pptx');

  await pptx.writeFile({ fileName: outPath });

  console.log(`\n✓  Slides written to:\n   ${outPath}\n`);
  console.log('Deck: 11 slides');
  console.log('   1  Title');
  console.log('   2  Learning Intention & Success Criteria');
  console.log('   3  Key Formula');
  console.log('   4  Worked Example 1 – One Trapezoid');
  console.log('   5  Worked Example 2 – Two Trapezoids');
  console.log('   6  Worked Example 3 – Table of Values');
  console.log('   7  Worked Example 4 – Concavity Interpretation');
  console.log('   8  Common Mistakes (1 of 2)');
  console.log('   9  Common Mistakes (2 of 2)');
  console.log('  10  Your Turn – Guided Practice');
  console.log('  11  Summary\n');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
