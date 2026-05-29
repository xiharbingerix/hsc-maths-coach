/**
 * Replaces app/favicon.ico with the Nova Maths icon.
 * Produces a multi-resolution ICO (16 / 32 / 48 px) with PNG-compressed streams.
 *
 * Run: npx tsx scripts/generate-favicon.ts
 */
import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const ICON_SRC = join(process.cwd(), "public", "brand", "nova-maths-icon.png");
const OUT_ICO  = join(process.cwd(), "app", "favicon.ico");

async function buildIco(src: string, dst: string) {
  const sizes = [16, 32, 48];

  // Generate a PNG buffer at each target size
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(src)
        .resize(size, size, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .ensureAlpha()
        .png()
        .toBuffer()
    )
  );

  const HEADER_SIZE    = 6;
  const DIR_ENTRY_SIZE = 16;
  const imagesOffset   = HEADER_SIZE + sizes.length * DIR_ENTRY_SIZE;
  const totalBytes     = imagesOffset +
    pngBuffers.reduce((sum, b) => sum + b.length, 0);

  const ico = Buffer.alloc(totalBytes);

  // ── ICO file header (6 bytes) ──────────────────────────────────────────
  ico.writeUInt16LE(0, 0);             // reserved, must be 0
  ico.writeUInt16LE(1, 2);             // type: 1 = icon
  ico.writeUInt16LE(sizes.length, 4);  // number of images

  // ── Image directory entries + copy image data ──────────────────────────
  let imgCursor = imagesOffset;

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buf  = pngBuffers[i];
    const de   = HEADER_SIZE + i * DIR_ENTRY_SIZE;

    // Directory entry (16 bytes)
    ico.writeUInt8(size >= 256 ? 0 : size, de);      // bWidth  (0 means 256)
    ico.writeUInt8(size >= 256 ? 0 : size, de + 1);  // bHeight
    ico.writeUInt8(0, de + 2);                        // bColorCount (0 = no palette)
    ico.writeUInt8(0, de + 3);                        // bReserved
    ico.writeUInt16LE(1,  de + 4);                    // wPlanes
    ico.writeUInt16LE(32, de + 6);                    // wBitCount (32 bpp)
    ico.writeUInt32LE(buf.length, de + 8);            // dwBytesInRes
    ico.writeUInt32LE(imgCursor,  de + 12);           // dwImageOffset

    buf.copy(ico, imgCursor);
    imgCursor += buf.length;
  }

  writeFileSync(dst, ico);

  const kb = (totalBytes / 1024).toFixed(1);
  console.log(`✓ ${dst}`);
  console.log(`  ${sizes.join(" / ")} px  ·  ${kb} KB  ·  PNG-compressed streams`);
}

buildIco(ICON_SRC, OUT_ICO).catch(err => {
  console.error(err);
  process.exit(1);
});
