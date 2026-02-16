import fs from "fs";
import path from "path";

const CUMULI_DIR = path.join(process.cwd(), "public", "cumuli");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function getCumuliImages(): string[] {
  if (!fs.existsSync(CUMULI_DIR)) return [];

  const files = fs
    .readdirSync(CUMULI_DIR)
    .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      // Ordina numericamente per numero nel nome del file
      const numA = parseInt(a.match(/\d+/)?.[0] || "999");
      const numB = parseInt(b.match(/\d+/)?.[0] || "999");
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  return files.map((f) => `/cumuli/${encodeURIComponent(f)}`);
}
