/**
 * Generates public/brand/nova-maths-og.png (1200×630) for Open Graph metadata.
 * Run with: npx tsx scripts/generate-og-image.ts
 */

import sharp from "sharp";
import { existsSync } from "fs";
import { join } from "path";

const W = 1200;
const H = 630;

const LOGO = join(process.cwd(), "public", "brand", "nova-maths-logo.png");
const OUT  = join(process.cwd(), "public", "brand", "nova-maths-og.png");

// ─── SVG base layer ──────────────────────────────────────────────────────────
// Light-blue header zone (y 0-208) + white content zone (y 208-630).
// Top 12px and bottom 12px accent bars.
// Text-only — logo is composited separately as a raster to avoid SVG font issues.

function baseSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bottomBar" gradientUnits="userSpaceOnUse"
                    x1="0" y1="0" x2="${W}" y2="0">
      <stop offset="0%"   stop-color="#0f172a"/>
      <stop offset="50%"  stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>

  <!-- Header zone (light blue, for logo) -->
  <rect x="0"   y="0"   width="${W}" height="208" fill="#eff6ff"/>

  <!-- Content zone (white, for text) -->
  <rect x="0"   y="208" width="${W}" height="${H - 208}" fill="#ffffff"/>

  <!-- Top accent bar -->
  <rect x="0"   y="0"   width="${W}" height="12"  fill="#1d4ed8"/>

  <!-- Zone separator -->
  <line x1="0"  y1="208" x2="${W}"  y2="208" stroke="#dbeafe" stroke-width="1"/>

  <!-- Headline 1 -->
  <text x="${W / 2}" y="302"
    text-anchor="middle"
    font-family="Arial,'Helvetica Neue',Helvetica,sans-serif"
    font-size="52" font-weight="700" fill="#0f172a">Structured online maths lessons</text>

  <!-- Headline 2 -->
  <text x="${W / 2}" y="368"
    text-anchor="middle"
    font-family="Arial,'Helvetica Neue',Helvetica,sans-serif"
    font-size="42" font-weight="600" fill="#1d4ed8">for NSW Years 9-12</text>

  <!-- Divider pill -->
  <rect x="${W / 2 - 28}" y="420" width="56" height="3" rx="1.5" fill="#dbeafe"/>

  <!-- URL -->
  <text x="${W / 2}" y="470"
    text-anchor="middle"
    font-family="Arial,'Helvetica Neue',Helvetica,sans-serif"
    font-size="22" fill="#94a3b8">novamaths.com.au</text>

  <!-- Bottom gradient bar -->
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="url(#bottomBar)"/>
</svg>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  process.stdout.write("Generating OG image…\n");

  // 1. Render SVG base to PNG buffer
  let buffer = await sharp(Buffer.from(baseSvg())).png().toBuffer();

  // 2. Composite the logo into the header zone, if the file exists
  if (existsSync(LOGO)) {
    // Fit the logo within a 420×130 box (preserving aspect ratio)
    const logoResized = await sharp(LOGO)
      .resize({ width: 420, height: 130, fit: "inside" })
      .png()
      .toBuffer();

    const { width: lw = 420, height: lh = 130 } =
      await sharp(logoResized).metadata();

    // Centre horizontally; centre vertically inside the 196px usable header zone
    const left = Math.round((W - lw) / 2);
    const top  = 12 + Math.round((196 - lh) / 2);

    process.stdout.write(`  Logo: ${lw}×${lh} at (${left}, ${top})\n`);

    buffer = await sharp(buffer)
      .composite([{ input: logoResized, top, left }])
      .png()
      .toBuffer();
  } else {
    process.stdout.write(`  Logo not found at ${LOGO} — skipping.\n`);
  }

  // 3. Write with high compression
  await sharp(buffer).png({ compressionLevel: 9 }).toFile(OUT);

  const { size } = await import("fs").then((m) => m.promises.stat(OUT));
  process.stdout.write(`✓ ${OUT}  (${Math.round(size / 1024)} KB)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
