import fs from "fs";
import path from "path";

const MURO_DIR = path.join(process.cwd(), "public", "muro");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export type MuroOpera = {
  slug: string;
  name: string;
  didascalia: string;
  cover: string;
  images: string[];
};

export function getMuroOpere(): MuroOpera[] {
  if (!fs.existsSync(MURO_DIR)) return [];

  const entries = fs.readdirSync(MURO_DIR, { withFileTypes: true });
  const subdirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return subdirs
    .map((slug) => {
      const dir = path.join(MURO_DIR, slug);
      const didFilePath = path.join(dir, "did.txt");
      const files = fs
        .readdirSync(dir)
        .filter((file) => IMG_EXT.includes(path.extname(file).toLowerCase()))
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || "999");
          const numB = parseInt(b.match(/\d+/)?.[0] || "999");
          if (numA !== numB) return numA - numB;
          return a.localeCompare(b);
        });

      const encodedSlug = encodeURIComponent(slug);
      const cover = files[0];
      const images = files.map(
        (file) => `/muro/${encodedSlug}/${encodeURIComponent(file)}`
      );
      const didascalia = fs.existsSync(didFilePath)
        ? fs.readFileSync(didFilePath, "utf8").trim()
        : "";

      return {
        slug,
        name: slug,
        didascalia,
        cover: cover ? `/muro/${encodedSlug}/${encodeURIComponent(cover)}` : "",
        images,
      };
    })
    .filter((opera) => opera.cover && opera.images.length > 0);
}
