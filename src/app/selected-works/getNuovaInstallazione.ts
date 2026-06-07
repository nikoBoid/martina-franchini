import fs from "fs";
import path from "path";

const INSTALLAZIONE_DIR = path.join(process.cwd(), "public", "nuova installazione");
const PUBLIC_PREFIX = "nuova installazione";
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export type NuovaInstallazione = {
  name: string;
  didascalia: string;
  cover: string;
  images: string[];
};

function parseDidFile(content: string): { name: string; didascalia: string } {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { name: "", didascalia: "" };
  }

  if (lines.length === 1) {
    return { name: "", didascalia: lines[0] };
  }

  return {
    name: lines[0],
    didascalia: lines.slice(1).join("\n"),
  };
}

export function getNuovaInstallazione(): NuovaInstallazione | null {
  if (!fs.existsSync(INSTALLAZIONE_DIR)) return null;

  const didFilePath = path.join(INSTALLAZIONE_DIR, "did.txt");
  const files = fs
    .readdirSync(INSTALLAZIONE_DIR)
    .filter((file) => IMG_EXT.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "999");
      const numB = parseInt(b.match(/\d+/)?.[0] || "999");
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  const cover = files[0];
  if (!cover || files.length === 0) return null;

  const encodedPrefix = encodeURIComponent(PUBLIC_PREFIX);
  const images = files.map(
    (file) => `/${encodedPrefix}/${encodeURIComponent(file)}`
  );

  const { name, didascalia } = fs.existsSync(didFilePath)
    ? parseDidFile(fs.readFileSync(didFilePath, "utf8"))
    : { name: "", didascalia: "" };

  return {
    name,
    didascalia,
    cover: images[0],
    images,
  };
}
