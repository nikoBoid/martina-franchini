import fs from "fs";
import path from "path";

const CUMULI_DIR = path.join(process.cwd(), "public", "cumuli");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function getCumuliImages(): string[] {
  if (!fs.existsSync(CUMULI_DIR)) return [];

  const files = fs
    .readdirSync(CUMULI_DIR)
    .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
    .sort();

  return files.map((f) => `/cumuli/${encodeURIComponent(f)}`);
}
