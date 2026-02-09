import fs from "fs";
import path from "path";

const MURO_DIR = path.join(process.cwd(), "public", "muro");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function getMuroImages(): string[] {
  if (!fs.existsSync(MURO_DIR)) return [];

  const files = fs
    .readdirSync(MURO_DIR)
    .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
    .sort();

  return files.map((f) => `/muro/${encodeURIComponent(f)}`);
}
