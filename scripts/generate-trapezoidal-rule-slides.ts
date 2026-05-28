/**
 * Generates a PowerPoint slide deck for the Trapezoidal Rule lesson.
 * Production-quality recording deck.
 *
 * Run with:  npm run generate-slides
 * Output:    generated-slides/year-12-advanced/further-integral-calculus/trapezoidal-rule.pptx
 *
 * LaTeX conversion tests (expected outputs):
 *   latexToReadable('\\int_0^2 x^2\\,dx')                    → '∫₀² x² dx'
 *   latexToReadable('0\\le x\\le2')                          → '0≤ x≤2'
 *   latexToReadable('f\'\'(x)=2>0')                          → "f''(x)=2>0"
 *   latexToReadable('\\frac{b-a}{n}')                        → '(b-a)/(n)'
 *   latexToReadable('\\frac h2[y_0+2y_1+y_2]')              → 'h/2[y₀+2y₁+y₂]'
 *   latexToReadable('y_{n-1}')                               → 'yₙ₋₁'
 *   latexToReadable('\\int_a^b f(x)\\,dx')                   → '∫ₐᵇ f(x) dx'
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
  'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ',
  'g':'ᵍ','h':'ʰ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ',
  'o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ',
  'v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
};

function toSub(s: string): string { return s.split('').map(c => SUB[c] ?? c).join(''); }
function toSup(s: string): string { return s.split('').map(c => SUP[c] ?? c).join(''); }

function latexToReadable(s: string): string {
  let o = s;

  // Array table → compact rows
  o = o.replace(
    /\\begin\{array\}\{[^}]*\}([\s\S]*?)\\end\{array\}/g,
    (_, inner: string) => {
      const rows = inner.split(/\\\\/).map((r: string) => r.trim()).filter(Boolean);
      return rows
        .map((r: string) => r.split('&').map((c: string) => c.trim()).join('   '))
        .join('\n');
    },
  );

  // 1. Consume \left/\right (must come before \le/\ge checks)
  o = o.replace(/\\left\s*\[/g, '[').replace(/\\right\s*\]/g, ']');
  o = o.replace(/\\left\s*\(/g, '(').replace(/\\right\s*\)/g, ')');
  o = o.replace(/\\left\s*\\{/g, '{').replace(/\\right\s*\\}/g, '}');
  o = o.replace(/\\left\s*\|/g, '|').replace(/\\right\s*\|/g, '|');
  o = o.replace(/\\left\b/g, '').replace(/\\right\b/g, '');

  // 2. Pi and other letter-based symbols (before \leq/\le checks)
  o = o.replace(/\\pi\b/g, 'π');
  o = o.replace(/\\infty\b/g, '∞');

  // 3. Relation symbols
  // Process longer forms first (\leq before \le, \geq before \ge)
  o = o.replace(/\\approx\b/g, ' ≈ ');
  o = o.replace(/\\leq\b/g, '≤');
  // \le NOT followed by a letter (handles \le2, \le x, etc. but not \left, \leq)
  o = o.replace(/\\le(?![a-zA-Z])/g, '≤');
  o = o.replace(/\\geq\b/g, '≥');
  o = o.replace(/\\ge(?![a-zA-Z])/g, '≥');
  o = o.replace(/\\neq\b|\\ne\b/g, '≠');
  o = o.replace(/\\times\b/g, '×');
  o = o.replace(/\\div\b/g, '÷');
  o = o.replace(/\\pm\b/g, '±');
  o = o.replace(/\\cdot\b/g, '·');
  o = o.replace(/\\Rightarrow\b/g, ' ⇒ ');
  o = o.replace(/\\rightarrow\b/g, ' → ');
  o = o.replace(/\\implies\b/g, ' ⇒ ');

  // 4. Integrals with limits (most specific patterns first)
  // \int_{a}^{b}
  o = o.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g,
    (_, lo: string, hi: string) => `∫${toSub(lo.trim())}${toSup(hi.trim())}`);
  // \int_a^{b}
  o = o.replace(/\\int_([0-9A-Za-z])\^\{([^}]+)\}/g,
    (_, lo: string, hi: string) => `∫${toSub(lo)}${toSup(hi.trim())}`);
  // \int_{a}^b
  o = o.replace(/\\int_\{([^}]+)\}\^([0-9A-Za-z])/g,
    (_, lo: string, hi: string) => `∫${toSub(lo.trim())}${toSup(hi)}`);
  // \int_a^b
  o = o.replace(/\\int_([0-9A-Za-z])\^([0-9A-Za-z])/g,
    (_, lo: string, hi: string) => `∫${toSub(lo)}${toSup(hi)}`);
  // \int_{a} (lower limit only)
  o = o.replace(/\\int_\{([^}]+)\}/g,
    (_, lo: string) => `∫${toSub(lo.trim())}`);
  // \int_a (lower limit only)
  o = o.replace(/\\int_([0-9A-Za-z])/g,
    (_, lo: string) => `∫${toSub(lo)}`);
  // Bare \int
  o = o.replace(/\\int\b/g, '∫');

  // 5. Fractions: \frac{a}{b} → (a)/(b), two passes for nested
  for (let pass = 0; pass < 3; pass++) {
    o = o.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  }
  // Single-token \frac h2
  o = o.replace(/\\frac\s*([A-Za-z0-9])\s*([A-Za-z0-9])/g, '$1/$2');

  // 6. Ellipsis
  o = o.replace(/\\cdots\b/g, '⋯');
  o = o.replace(/\\ldots\b/g, '…');
  o = o.replace(/\\dots\b/g, '…');

  // 7. Text environments and named functions
  o = o.replace(/\\text\{([^}]+)\}/g, '$1');
  o = o.replace(/\\mathrm\{([^}]+)\}/g, '$1');
  o = o.replace(/\\mathbf\{([^}]+)\}/g, '$1');
  for (const fn of ['sin','cos','tan','ln','log','exp','lim','max','min']) {
    o = o.replace(new RegExp(`\\\\${fn}\\b`, 'g'), fn);
  }

  // 8. Spacing
  o = o.replace(/\\quad\b/g, '   ');
  o = o.replace(/\\qquad\b/g, '      ');
  o = o.replace(/\\,/g, ' ');
  o = o.replace(/\\;/g, ' ');
  o = o.replace(/\\!/g, '');
  o = o.replace(/\\\s/g, ' ');

  // 9. Subscripts and superscripts
  o = o.replace(/\_\{([^}]+)\}/g, (_, n: string) => toSub(n));
  o = o.replace(/\_([0-9A-Za-z])/g, (_, c: string) => toSub(c));
  o = o.replace(/\^\{([^}]+)\}/g, (_, n: string) => toSup(n));
  o = o.replace(/\^([0-9A-Za-z])/g, (_, c: string) => toSup(c));

  // 10. Strip remaining unknown commands then lone backslashes
  o = o.replace(/\\[a-zA-Z]+\b/g, '');
  o = o.replace(/\\/g, '');

  // 11. Tidy whitespace (preserve intentional newlines from array handler)
  o = o.split('\n').map(line => line.replace(/[ \t]{2,}/g, ' ').trim()).join('\n');

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
  subTxt: 'BDD9F2',
  footer: 'A8C8E8',
  // Diagram
  dAxis:  '9E9E9E',
  dCurve: '1B3A6B',
  dChord: 'C00000',
  dFillA: 'CCE5FF',
  dFillB: 'A8D4F5',
  dVert:  '4472C4',
} as const;

// ── Geometry (LAYOUT_WIDE = 13.333" × 7.5") ───────────────────────────────────
const SW  = 12192000 / 914400;   // 13.333"
const SH  = 6858000  / 914400;   // 7.5"
const HDR = 0.88;
const M   = 0.55;
const CT  = HDR + 0.22;           // 1.10"
const CW  = SW - 2 * M;
const CH  = SH - CT - 0.28;

// Two-column layout constants (text left / diagram right)
const LC_W  = CW * 0.52;         // left text column width
const DIAG_X = M + CW * 0.55;    // diagram bounding box x
const DIAG_W = CW * 0.43;        // diagram width
const DIAG_H = 3.6;               // diagram height
const DIAG_Y = CT + 0.06;         // diagram top

async function main(): Promise<void> {
  const lesson = trapezoidalRuleLesson;

  const pptx   = new PptxGenJS();
  pptx.layout  = 'LAYOUT_WIDE';
  pptx.author  = 'Nova Maths';
  pptx.title   = `${lesson.courseTitle} – ${lesson.title}`;
  pptx.subject = lesson.title;

  type S  = ReturnType<typeof pptx.addSlide>;
  const R  = pptx.ShapeType.rect;
  const RR = pptx.ShapeType.roundRect;
  const L  = pptx.ShapeType.line;

  // ── Shape helpers ────────────────────────────────────────────────────────────

  function hdr(s: S, title: string): void {
    s.addShape(R, { x: 0, y: 0, w: SW, h: HDR, fill: { color: C.navy }, line: { type: 'none' } });
    s.addText(title, { x: M, y: 0, w: CW, h: HDR, fontSize: 22, bold: true, color: C.white, valign: 'middle' });
  }

  function box(s: S, x: number, y: number, w: number, h: number, bg: string): void {
    s.addShape(R, { x, y, w, h, fill: { color: bg }, line: { type: 'none' } });
  }

  function rbox(s: S, x: number, y: number, w: number, h: number, bg: string): void {
    s.addShape(RR, { x, y, w, h, fill: { color: bg }, line: { type: 'none' }, rectRadius: 0.1 });
  }

  function fmlaBox(s: S, latex: string, x: number, y: number, w: number, h: number, fs = 14): void {
    const txt = latexToReadable(latex);
    rbox(s, x, y, w, h, C.lAmber);
    s.addText(txt, { x: x+0.16, y: y+0.08, w: w-0.32, h: h-0.16,
      fontFace: 'Cambria Math', fontSize: fs, color: C.body, valign: 'middle', wrap: true });
  }

  function ansBar(s: S, latex: string): void {
    const txt = latexToReadable(latex);
    box(s, M, SH - 0.76, CW, 0.52, C.navy);
    s.addText(`Answer:  ${txt}`, { x: M+0.20, y: SH-0.76+0.02, w: CW-0.40, h: 0.48,
      fontFace: 'Cambria Math', fontSize: 14, bold: true, color: C.white, valign: 'middle' });
  }

  // ── Diagram helpers ──────────────────────────────────────────────────────────

  // Draw a line segment from slide-coord (ax,ay) to (bx,by).
  function dline(s: S, ax: number, ay: number, bx: number, by: number,
      clr: string, wd: number = 1.5): void {
    if (Math.abs(ax-bx) < 0.001 && Math.abs(ay-by) < 0.001) return;
    const goRight = bx >= ax;
    const goDown  = by >= ay;
    const x = Math.min(ax, bx);
    const y = Math.min(ay, by);
    const w = Math.max(Math.abs(bx-ax), 0.01);
    const h = Math.max(Math.abs(by-ay), 0.01);
    s.addShape(L, {
      x, y, w, h,
      line: { color: clr, width: wd },
      fill: { type: 'none' },
      flipH: !goRight || undefined,
      flipV: !goDown  || undefined,
    });
  }

  /**
   * Draw a parabola-and-trapezoids diagram for y = x² on [0, 2].
   * bx,by,bw,bh: bounding box in slide inches.
   * nTraps: number of trapezoids (1 or 2).
   * opts.labels: show y₀=… labels
   * opts.gap: highlight chord-vs-curve gap and add "overestimate" label
   */
  function drawDiagram(
    s: S,
    bx: number, by: number, bw: number, bh: number,
    nTraps: number,
    opts: { labels?: boolean; gap?: boolean } = {}
  ): void {
    const XM = 2.0, YM = 4.5, pad = 0.18;
    const sc = (x: number) => bx + pad + (x / XM) * (bw - 2 * pad);
    const ss = (y: number) => by + bh - pad - (y / YM) * (bh - 2 * pad);

    // ── Trapezoid fills (staircase of thin columns to approximate trapezoid shape)
    const COLS = 10;
    for (let ti = 0; ti < nTraps; ti++) {
      const x0 = ti * XM / nTraps;
      const x1 = (ti + 1) * XM / nTraps;
      const y0 = x0 * x0;
      const y1 = x1 * x1;
      const fillClr = ti === 0 ? C.dFillA : C.dFillB;
      for (let c = 0; c < COLS; c++) {
        const t0 = c / COLS, t1 = (c + 1) / COLS, tm = (t0 + t1) / 2;
        const cx0 = x0 + t0 * (x1 - x0);
        const cx1 = x0 + t1 * (x1 - x0);
        const colH = y0 + tm * (y1 - y0);   // chord height at column midpoint
        const sliceX = sc(cx0);
        const sliceW = Math.max(sc(cx1) - sc(cx0) + 0.003, 0.002);
        const sliceY = ss(colH);
        const sliceH = Math.max(ss(0) - sliceY, 0.002);
        s.addShape(R, { x: sliceX, y: sliceY, w: sliceW, h: sliceH,
          fill: { color: fillClr }, line: { type: 'none' } });
      }
    }

    // ── X-axis
    s.addShape(R, { x: sc(-0.08), y: ss(0) - 0.004,
      w: sc(XM * 1.08) - sc(-0.08), h: 0.008,
      fill: { color: C.dAxis }, line: { type: 'none' } });
    // ── Y-axis
    s.addShape(R, { x: sc(0) - 0.004, y: ss(YM * 0.98),
      w: 0.008, h: ss(-0.15) - ss(YM * 0.98),
      fill: { color: C.dAxis }, line: { type: 'none' } });

    // ── Axis labels
    s.addText('x', { x: sc(XM * 1.08), y: ss(0) - 0.16, w: 0.25, h: 0.22,
      fontSize: 9, color: C.dAxis, fontFace: 'Cambria Math' });
    s.addText('y', { x: sc(0) + 0.05, y: ss(YM * 0.98), w: 0.22, h: 0.22,
      fontSize: 9, color: C.dAxis, fontFace: 'Cambria Math' });

    // ── True parabola y = x² (20 short line segments → smooth curve)
    const N = 20;
    for (let i = 0; i < N; i++) {
      const xi0 = i * XM / N;
      const xi1 = (i + 1) * XM / N;
      dline(s, sc(xi0), ss(xi0 * xi0), sc(xi1), ss(xi1 * xi1), C.dCurve, 2.0);
    }
    // Curve label
    s.addText('y = x²', { x: sc(XM * 0.78), y: ss(XM * XM * 0.78 * 0.78) - 0.28,
      w: 0.80, h: 0.24, fontSize: 9, color: C.dCurve, fontFace: 'Cambria Math' });

    // ── Chord lines (trapezoid tops — red)
    for (let ti = 0; ti < nTraps; ti++) {
      const x0 = ti * XM / nTraps;
      const x1 = (ti + 1) * XM / nTraps;
      dline(s, sc(x0), ss(x0 * x0), sc(x1), ss(x1 * x1), C.dChord, 2.5);
    }

    // ── Vertical division lines at each node
    for (let ti = 0; ti <= nTraps; ti++) {
      const xi = ti * XM / nTraps;
      const yi = xi * xi;
      s.addShape(R, { x: sc(xi) - 0.003, y: ss(yi), w: 0.006, h: ss(0) - ss(yi),
        fill: { color: C.dVert }, line: { type: 'none' } });
    }

    // ── Y-value labels at nodes
    if (opts.labels) {
      for (let ti = 0; ti <= nTraps; ti++) {
        const xi = ti * XM / nTraps;
        const yi = xi * xi;
        const label = `y${toSub(String(ti))} = ${yi}`;
        s.addText(label, {
          x: sc(xi) - 0.45, y: ss(yi) - 0.30,
          w: 0.90, h: 0.24,
          fontFace: 'Cambria Math', fontSize: 8.5, color: C.body, align: 'center',
        });
      }
    }

    // ── h = width label (first subinterval)
    {
      const x1val = XM / nTraps;
      const midSX = (sc(0) + sc(x1val)) / 2;
      s.addText(`h = ${x1val}`, {
        x: midSX - 0.4, y: ss(0) + 0.06, w: 0.80, h: 0.22,
        fontFace: 'Cambria Math', fontSize: 8.5, color: C.muted, align: 'center',
      });
    }

    // ── Gap annotation for concavity slide
    if (opts.gap) {
      // Show gap at midpoint of first trapezoid
      const x0 = 0, x1 = XM / nTraps;
      const midX = (x0 + x1) / 2;
      const curveY = midX * midX;
      const chordY = x0 * x0 + (midX - x0) / (x1 - x0) * (x1 * x1 - x0 * x0);
      // Vertical orange gap marker
      s.addShape(R, {
        x: sc(midX) + 0.04, y: ss(chordY),
        w: 0.06, h: Math.max(ss(curveY) - ss(chordY), 0.02),
        fill: { color: 'FF6B35' }, line: { type: 'none' },
      });
      s.addText('chord above\ncurve = over-\nestimate', {
        x: sc(midX) + 0.14, y: ss(chordY) - 0.06,
        w: 1.10, h: 0.50,
        fontSize: 8, color: C.dChord,
      });
    }
  }

  // ── Slide 1: Title (full navy) ───────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.addShape(R, { x: 0, y: 0, w: SW, h: SH, fill: { color: C.navy }, line: { type: 'none' } });

    s.addText(lesson.title, {
      x: M, y: 1.0, w: CW, h: 2.0,
      align: 'center', valign: 'middle', fontSize: 42, bold: true, color: C.white,
    });
    s.addText(`${lesson.courseTitle}  ·  ${lesson.moduleTitle}`, {
      x: M, y: 2.95, w: CW, h: 0.48,
      align: 'center', fontSize: 16, color: C.subTxt,
    });

    // Learning intention card
    const cX = 2.2, cY = 3.75, cW = SW - 4.4, cH = 2.1;
    s.addShape(RR, { x: cX, y: cY, w: cW, h: cH,
      fill: { color: C.lBlue }, line: { type: 'none' }, rectRadius: 0.1 });
    s.addText('Learning Intention', {
      x: cX + 0.3, y: cY + 0.18, w: cW - 0.6, h: 0.34,
      fontSize: 12, bold: true, color: C.navy,
    });
    s.addText(lesson.learningIntention, {
      x: cX + 0.3, y: cY + 0.52, w: cW - 0.6, h: cH - 0.68,
      fontSize: 13, color: C.body, valign: 'top', wrap: true,
    });

    s.addText('Nova Maths', {
      x: M, y: SH - 0.50, w: CW, h: 0.36,
      align: 'center', fontSize: 12, color: C.footer,
    });

    s.addNotes(
      `Welcome. Today: ${lesson.title}\n\n` +
      `Course: ${lesson.courseTitle} – ${lesson.moduleTitle}\n\n` +
      `Learning Intention: ${lesson.learningIntention}\n\n` +
      `Success Criteria:\n${lesson.successCriteria.map((c, i) => `${i+1}. ${c}`).join('\n')}`
    );
  }

  // ── Slide 2: Why This Method? ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'Why the Trapezoidal Rule?');

    const pts = [
      'Some functions have no simple antiderivative — exact integration is impossible.',
      'Sometimes we only have a table of measured values, not a formula.',
      'Idea: approximate the curve with straight chord segments over short strips.',
      'Each strip is a trapezoid — its area is easy to calculate.',
    ];

    pts.forEach((txt, i) => {
      const ry = CT + i * (CH / 4) + 0.04;
      const rh = (CH / 4) - 0.10;
      rbox(s, M, ry, LC_W, rh, i < 2 ? C.lBlue : C.lAmber);
      s.addText(`${i + 1}.  ${txt}`, {
        x: M + 0.18, y: ry + 0.05, w: LC_W - 0.36, h: rh - 0.10,
        fontSize: 12, color: C.body, valign: 'middle', wrap: true,
      });
    });

    // Diagram: 1 trapezoid — the intuition visual
    drawDiagram(s, DIAG_X, DIAG_Y, DIAG_W, DIAG_H, 1, { labels: true });

    s.addNotes(
      `This slide sets up the problem. Key talking points:\n` +
      `- The integral ∫₀¹ e^(-x²) dx has no antiderivative in closed form.\n` +
      `- Physics experiments give y-values at measured x-values — no formula.\n` +
      `- Trapezoid rule: divide interval, take y-values at division points, connect with straight lines.\n\n` +
      `Lesson Success Criteria:\n${lesson.successCriteria.map((c, i) => `${i+1}. ${c}`).join('\n')}\n\n` +
      `Reference: ${lesson.teaching.paragraphs[0]}`
    );
  }

  // ── Slide 3: The Formula ─────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'The Formula');

    const [hFx, mainFx] = lesson.teaching.latexBlocks;

    // h = (b-a)/n
    rbox(s, M, CT, CW, 0.58, C.lBlue);
    s.addText('Step 1  ·  Find the subinterval width', {
      x: M + 0.18, y: CT + 0.05, w: CW * 0.40, h: 0.48,
      fontSize: 11, bold: true, color: C.navy, valign: 'middle',
    });
    s.addText(latexToReadable(hFx), {
      x: M + CW * 0.42, y: CT + 0.06, w: CW * 0.55, h: 0.46,
      fontFace: 'Cambria Math', fontSize: 16, color: C.body, valign: 'middle',
    });

    // Main composite formula
    fmlaBox(s, mainFx, M, CT + 0.72, CW, 0.90, 15);

    // Annotated labels below the formula
    const annoY = CT + 1.74;
    rbox(s, M, annoY, CW * 0.47, 0.82, 'FFF3CD');
    s.addText('Endpoints  y₀ and yₙ', {
      x: M + 0.14, y: annoY + 0.06, w: CW * 0.47 - 0.28, h: 0.30,
      fontSize: 11, bold: true, color: '7D4E00',
    });
    s.addText('Appear once  ·  coefficient 1', {
      x: M + 0.14, y: annoY + 0.36, w: CW * 0.47 - 0.28, h: 0.36,
      fontSize: 11, color: '7D4E00', wrap: true,
    });

    rbox(s, M + CW * 0.50, annoY, CW * 0.47, 0.82, 'E8F5E9');
    s.addText('Interior values  y₁ … yₙ₋₁', {
      x: M + CW * 0.50 + 0.14, y: annoY + 0.06, w: CW * 0.47 - 0.28, h: 0.30,
      fontSize: 11, bold: true, color: '2E7D32',
    });
    s.addText('Appear twice  ·  coefficient 2', {
      x: M + CW * 0.50 + 0.14, y: annoY + 0.36, w: CW * 0.47 - 0.28, h: 0.36,
      fontSize: 11, color: '2E7D32', wrap: true,
    });

    // Practical reminder
    s.addText('The h/2 factor is outside the bracket — multiply last.', {
      x: M, y: annoY + 0.92, w: CW, h: 0.34,
      fontSize: 11, color: C.muted, wrap: true,
    });

    s.addNotes(
      `Walk through each part of the formula.\n\n` +
      `Teaching paragraphs:\n${lesson.teaching.paragraphs.map((p, i) => `${i+1}. ${p}`).join('\n')}\n\n` +
      `Formula blocks (raw LaTeX):\n${lesson.teaching.latexBlocks.join('\n')}`
    );
  }

  // ── Slide 4: Worked Example 1 – One Trapezoid ─────────────────────────────
  {
    const s = pptx.addSlide();
    const ex = lesson.workedExamples[0];
    hdr(s, 'Worked Example 1 – One Trapezoid');

    // Question
    rbox(s, M, CT, LC_W, 0.64, C.lBlue);
    s.addText(latexToReadable(ex.questionLatex), {
      x: M + 0.16, y: CT + 0.05, w: LC_W - 0.32, h: 0.54,
      fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle', wrap: true,
    });

    // Steps
    let sy = CT + 0.78;
    ex.steps.forEach((step, i) => {
      s.addText(`${i + 1}.  ${step.explanation}`, {
        x: M, y: sy, w: LC_W * 0.52, h: 0.42,
        fontSize: 12, color: C.body, wrap: true,
      });
      if (step.latex) {
        box(s, M + LC_W * 0.54, sy, LC_W * 0.44, 0.40, C.lAmber);
        s.addText(latexToReadable(step.latex), {
          x: M + LC_W * 0.54 + 0.12, y: sy + 0.03, w: LC_W * 0.44 - 0.24, h: 0.34,
          fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle',
        });
      }
      sy += 0.50;
    });

    // Diagram: 1 trapezoid with y-labels
    drawDiagram(s, DIAG_X, DIAG_Y, DIAG_W, DIAG_H, 1, { labels: true });

    ansBar(s, ex.finalAnswerLatex);

    s.addNotes(
      `Example 1: ${ex.title}\n\n` +
      `Question (LaTeX): ${ex.questionLatex}\n\n` +
      `Steps:\n${ex.steps.map((st, i) => `${i+1}. ${st.explanation}${st.latex ? '  →  ' + st.latex : ''}`).join('\n')}\n\n` +
      `Answer: ${ex.finalAnswerLatex}\n\n` +
      `Key point: exact integral = 8/3 ≈ 2.67. One trapezoid gives 4 — an overestimate because y = x² is concave up.`
    );
  }

  // ── Slide 5: Worked Example 2 – Two Trapezoids ────────────────────────────
  {
    const s = pptx.addSlide();
    const ex = lesson.workedExamples[1];
    hdr(s, 'Worked Example 2 – Two Trapezoids');

    rbox(s, M, CT, LC_W, 0.64, C.lBlue);
    s.addText(latexToReadable(ex.questionLatex), {
      x: M + 0.16, y: CT + 0.05, w: LC_W - 0.32, h: 0.54,
      fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle', wrap: true,
    });

    let sy = CT + 0.78;
    ex.steps.forEach((step, i) => {
      s.addText(`${i + 1}.  ${step.explanation}`, {
        x: M, y: sy, w: LC_W * 0.52, h: 0.42,
        fontSize: 12, color: C.body, wrap: true,
      });
      if (step.latex) {
        box(s, M + LC_W * 0.54, sy, LC_W * 0.44, 0.40, C.lAmber);
        s.addText(latexToReadable(step.latex), {
          x: M + LC_W * 0.54 + 0.12, y: sy + 0.03, w: LC_W * 0.44 - 0.24, h: 0.34,
          fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle',
        });
      }
      sy += 0.50;
    });

    // Comparison callout
    rbox(s, M, sy + 0.06, LC_W, 0.50, 'FFF3CD');
    s.addText('Two trapezoids → 3.0   vs   one trapezoid → 4.0   vs   exact → 2.67', {
      x: M + 0.16, y: sy + 0.12, w: LC_W - 0.32, h: 0.36,
      fontFace: 'Cambria Math', fontSize: 11, color: '7D4E00', valign: 'middle', wrap: true,
    });

    drawDiagram(s, DIAG_X, DIAG_Y, DIAG_W, DIAG_H, 2, { labels: true });

    ansBar(s, ex.finalAnswerLatex);

    s.addNotes(
      `Example 2: ${ex.title}\n\n` +
      `Question (LaTeX): ${ex.questionLatex}\n\n` +
      `Steps:\n${ex.steps.map((st, i) => `${i+1}. ${st.explanation}${st.latex ? '  →  ' + st.latex : ''}`).join('\n')}\n\n` +
      `Answer: ${ex.finalAnswerLatex}\n\n` +
      `Key point: more subintervals → closer to true value 8/3 ≈ 2.67.`
    );
  }

  // ── Slide 6: Worked Example 3 – Table of Values ───────────────────────────
  {
    const s = pptx.addSlide();
    const ex = lesson.workedExamples[2];
    hdr(s, 'Worked Example 3 – Table of Values');

    // Table rendered as column of cells
    const tableRows = latexToReadable(ex.questionLatex).split('\n');
    const tableW = CW * 0.60;
    const tableX = M + (CW - tableW) / 2;
    tableRows.forEach((row, i) => {
      const rowH = 0.48;
      box(s, tableX, CT + i * rowH, tableW, rowH, i === 0 ? C.navy : (i % 2 === 1 ? C.lBlue : 'F5F9FF'));
      s.addText(row, {
        x: tableX + 0.14, y: CT + i * rowH + 0.03, w: tableW - 0.28, h: rowH - 0.06,
        fontFace: 'Cambria Math', fontSize: 13,
        color: i === 0 ? C.white : C.body,
        valign: 'middle', align: 'center',
      });
    });

    const tableBottom = CT + tableRows.length * 0.48 + 0.16;

    // Steps across full width below table
    ex.steps.forEach((step, i) => {
      const stepY = tableBottom + i * 0.52;
      s.addText(`${i + 1}.  ${step.explanation}`, {
        x: M, y: stepY, w: CW * 0.52, h: 0.44,
        fontSize: 12, color: C.body, wrap: true,
      });
      if (step.latex) {
        box(s, M + CW * 0.54, stepY, CW * 0.43, 0.42, C.lAmber);
        s.addText(latexToReadable(step.latex), {
          x: M + CW * 0.54 + 0.12, y: stepY + 0.03, w: CW * 0.43 - 0.24, h: 0.36,
          fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle',
        });
      }
    });

    ansBar(s, ex.finalAnswerLatex);

    s.addNotes(
      `Example 3: ${ex.title}\n\n` +
      `Question (LaTeX): ${ex.questionLatex}\n\n` +
      `Table data: x = 0,1,2,3 | y = 2,5,6,8\n\n` +
      `Steps:\n${ex.steps.map((st, i) => `${i+1}. ${st.explanation}${st.latex ? '  →  ' + st.latex : ''}`).join('\n')}\n\n` +
      `Answer: ${ex.finalAnswerLatex}\n\n` +
      `Key: read h from the x-spacing (here h = 1). Apply formula: (1/2)(2 + 2×5 + 2×6 + 8) = 16.`
    );
  }

  // ── Slide 7: Concavity & Error Direction ─────────────────────────────────
  {
    const s = pptx.addSlide();
    const ex = lesson.workedExamples[3];
    hdr(s, 'Concavity & Error Direction');

    // Left column: rule cards
    const rules = [
      { icon: '▲', label: 'Concave up', sub: "f ″(x) > 0", verdict: 'Trapezoids sit ABOVE the curve → overestimate', bg: C.lRed, tc: C.redTxt },
      { icon: '▼', label: 'Concave down', sub: "f ″(x) < 0", verdict: 'Trapezoids sit BELOW the curve → underestimate', bg: C.lGreen, tc: C.grTxt },
    ];

    rules.forEach((r, i) => {
      const ry = CT + i * 2.20;
      rbox(s, M, ry, LC_W, 2.00, r.bg);
      s.addText(`${r.icon}  ${r.label}`, {
        x: M + 0.18, y: ry + 0.14, w: LC_W - 0.36, h: 0.40,
        fontSize: 16, bold: true, color: r.tc,
      });
      s.addText(r.sub, {
        x: M + 0.18, y: ry + 0.56, w: LC_W - 0.36, h: 0.32,
        fontFace: 'Cambria Math', fontSize: 13, color: r.tc,
      });
      s.addText(r.verdict, {
        x: M + 0.18, y: ry + 0.92, w: LC_W - 0.36, h: 0.72,
        fontSize: 12, color: C.body, wrap: true,
      });
    });

    // Diagram: 2 trapezoids + gap annotation (concave-up overestimate)
    drawDiagram(s, DIAG_X, DIAG_Y, DIAG_W, DIAG_H, 2, { gap: true });

    ansBar(s, ex.finalAnswerLatex);

    s.addNotes(
      `Example 4: ${ex.title}\n\n` +
      `Question (LaTeX): ${ex.questionLatex}\n\n` +
      `Steps:\n${ex.steps.map((st, i) => `${i+1}. ${st.explanation}${st.latex ? '  →  ' + st.latex : ''}`).join('\n')}\n\n` +
      `Answer: ${ex.finalAnswerLatex}\n\n` +
      `Memory trick: "Concave up = frowns up = trap over". Think of the chord being above a bowl shape.\n` +
      `For concave-down (like y = -x²), the chord dips below the curve, so the trapezoid area is less than the true area.`
    );
  }

  // ── Slides 8–9: Common Mistakes ──────────────────────────────────────────────
  [
    { title: 'Common Mistakes  (1 of 2)', items: lesson.commonMistakes.slice(0, 2) },
    { title: 'Common Mistakes  (2 of 2)', items: lesson.commonMistakes.slice(2) },
  ].forEach(({ title, items }) => {
    const s = pptx.addSlide();
    hdr(s, title);

    const rowH = (CH - 0.20) / items.length;

    items.forEach((m, i) => {
      const ry = CT + i * (rowH + 0.08);
      rbox(s, M, ry, CW * 0.47, rowH, C.lRed);
      rbox(s, M + CW * 0.50, ry, CW * 0.47, rowH, C.lGreen);

      s.addText(`✗  ${m.mistake}`, {
        x: M + 0.16, y: ry + 0.12, w: CW * 0.47 - 0.32, h: rowH - 0.24,
        fontSize: 13, color: C.redTxt, valign: 'middle', wrap: true,
      });
      s.addText(`✓  ${m.fix}`, {
        x: M + CW * 0.50 + 0.16, y: ry + 0.12, w: CW * 0.47 - 0.32, h: rowH - 0.24,
        fontSize: 13, color: C.grTxt, valign: 'middle', wrap: true,
      });
    });

    s.addNotes(
      `Pause here. Ask: "Which of these have you done before?"\n\n` +
      items.map(m => `MISTAKE: ${m.mistake}\nFIX: ${m.fix}`).join('\n\n') +
      `\n\nAll mistakes:\n${lesson.commonMistakes.map((m, i) => `${i+1}. ${m.mistake} → ${m.fix}`).join('\n')}`
    );
  });

  // ── Slide 10: Your Turn ───────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    const q = lesson.guidedPractice[0];
    hdr(s, 'Your Turn – Guided Practice');

    s.addText('Pause the video now and try this question. Resume when you have an answer.', {
      x: M, y: CT, w: CW, h: 0.36, fontSize: 12, color: C.muted,
    });

    rbox(s, M, CT + 0.44, CW, 0.76, C.lBlue);
    s.addText(q.prompt, {
      x: M + 0.18, y: CT + 0.44, w: CW * 0.52, h: 0.76,
      fontSize: 13, bold: true, color: C.body, valign: 'middle', wrap: true,
    });
    s.addText(latexToReadable(q.latex), {
      x: M + CW * 0.54, y: CT + 0.48, w: CW * 0.43, h: 0.68,
      fontFace: 'Cambria Math', fontSize: 13, color: C.body, valign: 'middle', wrap: true,
    });

    if (q.hint) {
      s.addText(`Hint:  ${q.hint}`, {
        x: M, y: CT + 1.30, w: CW, h: 0.38,
        fontSize: 11, color: C.muted, wrap: true,
      });
    }

    s.addText('Work it out here:', {
      x: M, y: CT + 1.80, w: 2.5, h: 0.30,
      fontSize: 11, bold: true, color: C.muted,
    });
    s.addShape(R, {
      x: M, y: CT + 2.14, w: CW, h: SH - (CT + 2.14) - 0.32,
      fill: { color: 'F9FAFB' }, line: { color: 'D1D5DB', width: 1 },
    });

    s.addNotes(
      `ANSWER: ${q.answer}\n\n` +
      `Question: ${q.prompt}\nLaTeX: ${q.latex}\nHint: ${q.hint ?? '–'}\n\n` +
      `All guided practice:\n${lesson.guidedPractice.map((gq, i) => `${i+1}. ${gq.prompt} (${gq.latex}) → ${gq.answer}`).join('\n')}`
    );
  }

  // ── Slide 11: Summary ─────────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    hdr(s, 'Summary');

    const pts = [
      'h = (b−a)/n  — the subinterval width',
      'Formula:  (h/2)[y₀ + 2y₁ + 2y₂ + ⋯ + 2yₙ₋₁ + yₙ]',
      'Endpoints y₀ and yₙ appear once.  Interior values appear twice.',
      'From a table: read h from the x-spacing, then apply the formula directly.',
      'Concave-up  →  chord above curve  →  overestimate.',
      'Concave-down  →  chord below curve  →  underestimate.',
      'More subintervals (smaller h) usually improves the approximation.',
    ];

    const bullets = pts.map(t => ({ text: t, options: { bullet: true, paraSpaceAfter: 5 } }));
    s.addText(bullets, {
      x: M + 0.14, y: CT + 0.10, w: CW - 0.28, h: CH,
      fontSize: 13, color: C.body, wrap: true,
    });

    s.addNotes(
      `Close by revisiting the learning intention:\n"${lesson.learningIntention}"\n\n` +
      `Key points:\n${pts.join('\n')}`
    );
  }

  // ── Write output ──────────────────────────────────────────────────────────────
  const outDir  = join(process.cwd(), 'generated-slides', 'year-12-advanced', 'further-integral-calculus');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'trapezoidal-rule.pptx');

  await pptx.writeFile({ fileName: outPath });

  console.log(`\n✓  Slides written to:\n   ${outPath}\n`);
  console.log('Deck: 11 slides');
  console.log('   1  Title');
  console.log('   2  Why the Trapezoidal Rule?  [visual: 1-trap diagram]');
  console.log('   3  The Formula');
  console.log('   4  Example 1 – One Trapezoid  [visual: 1-trap diagram]');
  console.log('   5  Example 2 – Two Trapezoids  [visual: 2-trap diagram]');
  console.log('   6  Example 3 – Table of Values');
  console.log('   7  Concavity & Error Direction  [visual: 2-trap + gap annotation]');
  console.log('   8  Common Mistakes (1 of 2)');
  console.log('   9  Common Mistakes (2 of 2)');
  console.log('  10  Your Turn');
  console.log('  11  Summary\n');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
