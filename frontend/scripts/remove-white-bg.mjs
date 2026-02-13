/**
 * Removes white background from an image by making near-white pixels transparent.
 * Usage: node scripts/remove-white-bg.mjs [input] [output]
 * Default: public/chairmain_logo.png -> public/chairmain_logo_transparent.png
 */

import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const defaultInput = path.join(root, "public", "chairmain_logo.png");

const inputPath = process.argv[2] || defaultInput;
const outputPath = process.argv[3] || inputPath; // overwrite original by default

const WHITE_THRESHOLD = 248; // pixels with R,G,B all >= this become transparent

async function main() {
  if (!existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    process.exit(1);
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const len = data.length;

  for (let i = 0; i < len; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  const fs = await import("fs");
  const tempPath = outputPath + ".tmp.png";
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(tempPath);

  if (outputPath === inputPath) {
    const backup = inputPath.replace(/\.png$/, "_backup.png");
    fs.copyFileSync(inputPath, backup);
    fs.renameSync(tempPath, inputPath);
    console.log("Done. White background removed (original backed up to", path.basename(backup) + "):", path.basename(inputPath));
  } else {
    fs.renameSync(tempPath, outputPath);
    console.log("Done:", outputPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
