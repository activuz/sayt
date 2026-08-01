// Script to compress images in public/ folder to WebP format
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");

async function compressImage(inputName, outputName, maxWidth) {
  const inputPath = path.join(publicDir, inputName);
  const outputPath = path.join(publicDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.log(`[SKIP] ${inputName} not found`);
    return;
  }

  const metadata = await sharp(inputPath).metadata();
  console.log(`[INPUT] ${inputName}: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024).toFixed(0)}KB`);

  await sharp(inputPath)
    .resize(maxWidth, null, { withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(outputPath);

  const outSize = fs.statSync(outputPath).size;
  console.log(`[OUTPUT] ${outputName}: ${(outSize / 1024).toFixed(0)}KB`);
}

async function compressJpg(inputName, outputName, maxWidth) {
  const inputPath = path.join(publicDir, inputName);
  const outputPath = path.join(publicDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.log(`[SKIP] ${inputName} not found`);
    return;
  }

  const metadata = await sharp(inputPath).metadata();
  console.log(`[INPUT] ${inputName}: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024).toFixed(0)}KB`);

  await sharp(inputPath)
    .resize(maxWidth, null, { withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(outputPath);

  const outSize = fs.statSync(outputPath).size;
  console.log(`[OUTPUT] ${outputName}: ${(outSize / 1024).toFixed(0)}KB`);
}

(async () => {
  try {
    await compressImage("image2.png", "image2.webp", 1200);
    await compressImage("image3.png", "image3.webp", 1200);
    await compressJpg("images.jpg", "images.webp", 400);
    console.log("\nDone! All images compressed to WebP.");
  } catch (err) {
    console.error("Error:", err);
  }
})();
