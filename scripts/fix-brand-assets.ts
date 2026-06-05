/**
 * Trims excess white padding from brand assets and creates
 * app/icon.png + app/apple-icon.png for the Next.js App Router favicon.
 *
 * Run: npx tsx scripts/fix-brand-assets.ts
 */
import sharp from "sharp";
import { join } from "path";

const BRAND = join(process.cwd(), "public", "brand");
const APP   = join(process.cwd(), "app");

async function trimAndPad(src: string, dst: string, padPx: number) {
  // Read to buffer first so src === dst is safe
  const raw     = await sharp(src).png().toBuffer();
  const trimmed = await sharp(raw).trim().toBuffer();
  const { width: tw = 0, height: th = 0 } = await sharp(trimmed).metadata();

  await sharp(trimmed)
    .extend({
      top: padPx, bottom: padPx, left: padPx, right: padPx,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toFile(dst);

  const { width: fw = 0, height: fh = 0 } = await sharp(dst).metadata();
  console.log(`  content ${tw}×${th}  +${padPx}px pad  →  ${fw}×${fh}`);
}

async function squareResize(src: string, dst: string, size: number) {
  await sharp(src)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  console.log(`  ${dst}  (${size}×${size})`);
}

async function main() {
  console.log("Fixing brand assets…\n");

  // ── Horizontal logo ────────────────────────────────────────────────────
  console.log("nova-maths-logo.png");
  await trimAndPad(
    join(BRAND, "nova-maths-logo.png"),
    join(BRAND, "nova-maths-logo.png"),
    16,
  );

  // ── Square icon  ───────────────────────────────────────────────────────
  // Also normalises: Nova-maths-icon.png → nova-maths-icon.png (case fix)
  console.log("\nnova-maths-icon.png");
  await trimAndPad(
    join(BRAND, "Nova-maths-icon.png"),
    join(BRAND, "nova-maths-icon.png"),
    40,   // more padding so the mark breathes at small (favicon) sizes
  );

  // ── App Router icon files ──────────────────────────────────────────────
  console.log("\nApp Router icon files");
  await squareResize(join(BRAND, "nova-maths-icon.png"), join(APP, "icon.png"),       512);
  await squareResize(join(BRAND, "nova-maths-icon.png"), join(APP, "apple-icon.png"), 180);

  console.log("\nDone.");
}

main().catch(err => { console.error(err); process.exit(1); });
