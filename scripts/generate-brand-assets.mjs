import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Keep the official artwork intact. Only resize and strip export metadata.
const path = (relative) => fileURLToPath(new URL(relative, import.meta.url));
const logo = path("../assets/brand/star-venture-capital-original.png");
const symbol = path("../assets/brand/star-symbol-original.png");
const publicDir = path("../public/");
const brandDir = path("../public/brand/");
await mkdir(brandDir, { recursive: true });

// Cover 200–280 CSS pixels at up to 3x pixel density without the full-size export.
for (const width of [280, 560, 840]) {
  await sharp(logo)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(`${brandDir}/star-venture-capital-${width}.png`);
}

const iconFiles = new Map([
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [48, "favicon-48x48.png"],
  [180, "apple-touch-icon.png"],
  [192, "android-chrome-192x192.png"],
  [512, "android-chrome-512x512.png"],
]);
const icons = new Map();
for (const [size, filename] of iconFiles) {
  const png = await sharp(symbol)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
  icons.set(size, png);
  await writeFile(`${publicDir}/${filename}`, png);
}

// ICO stores separate PNG entries, letting the browser choose an actual pixel size.
const sizes = [16, 32, 48];
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  const png = icons.get(size);
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
}
await writeFile(`${publicDir}/favicon.ico`, Buffer.concat([directory, ...sizes.map((size) => icons.get(size))]));
console.log("Generated responsive official logo assets and 16–512px icons.");
