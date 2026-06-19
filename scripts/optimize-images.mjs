/**
 * Redimensionne les images lourdes avant déploiement IONOS.
 * Usage: node scripts/optimize-images.mjs
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const jobs = [
  { input: "logo.webp", output: "logo-64.webp", width: 64, height: 64 },
  { input: "images/towerdefend.webp", output: "images/towerdefend.webp", width: 640 },
  { input: "images/captureportfolio.webp", output: "images/captureportfolio.webp", width: 640 },
  { input: "images/efrei.webp", output: "images/efrei.webp", width: 230 },
  { input: "images/react.png", output: "images/react.png", width: 64 },
  { input: "images/nodejs.png", output: "images/nodejs.png", width: 64 },
  { input: "images/git.png", output: "images/git.png", width: 64 },
  { input: "images/csharp.png", output: "images/csharp.png", width: 64 },
  { input: "images/java.png", output: "images/java.png", width: 64 },
  { input: "images/noise2.png", output: "images/noise2.webp", width: 512 },
];

let hadError = false;

for (const job of jobs) {
  const inputPath = join(root, job.input);
  if (!existsSync(inputPath)) {
    console.warn(`skip (missing): ${job.input}`);
    hadError = true;
    continue;
  }

  const outputPath = join(root, job.output);
  const tempPath = outputPath + ".tmp";
  const pipeline = sharp(inputPath).rotate();
  if (job.height) {
    await pipeline.resize(job.width, job.height, { fit: "inside" }).webp({ quality: 82 }).toFile(tempPath);
  } else {
    await pipeline.resize(job.width, undefined, { withoutEnlargement: true }).webp({ quality: 82 }).toFile(tempPath);
  }
  const { renameSync, unlinkSync, existsSync: exists, copyFileSync } = await import("node:fs");
  try {
    if (exists(outputPath)) unlinkSync(outputPath);
    renameSync(tempPath, outputPath);
  } catch {
    try { copyFileSync(tempPath, outputPath); } catch (e) { console.error("Error copying file:", e); }
    try { unlinkSync(tempPath); } catch { /* ignore */ }
  }
  console.log(`optimized: ${job.output}`);
}

if (hadError) {
  console.warn("Some images were missing — run optimize-images after adding assets to public/");
}
