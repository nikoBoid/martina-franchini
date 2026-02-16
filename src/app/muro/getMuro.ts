import fs from "fs";
import path from "path";

const MURO_DIR = path.join(process.cwd(), "public", "muro");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function getMuroImages(): string[] {
  if (!fs.existsSync(MURO_DIR)) return [];

  const files = fs
    .readdirSync(MURO_DIR)
    .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      // Ordina numericamente per numero nel nome del file
      const numA = parseInt(a.match(/\d+/)?.[0] || "999");
      const numB = parseInt(b.match(/\d+/)?.[0] || "999");
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  return files.map((f) => `/muro/${encodeURIComponent(f)}`);
}
