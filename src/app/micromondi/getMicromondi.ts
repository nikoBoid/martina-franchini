import fs from "fs";
import path from "path";

const SCULTURE_DIR = path.join(process.cwd(), "public", "sculture");
const IMG_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export type Micromondo = {
  slug: string;
  name: string;
  cover: string;
  images: string[];
};

export function getMicromondi(): Micromondo[] {
  if (!fs.existsSync(SCULTURE_DIR)) return [];

  const entries = fs.readdirSync(SCULTURE_DIR, { withFileTypes: true });
  const subdirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => {
      // Estrai il numero iniziale se presente
      const numA = parseInt(a.match(/^\d+/)?.[0] || "999");
      const numB = parseInt(b.match(/^\d+/)?.[0] || "999");
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  return subdirs
    .map((slug) => {
      const dir = path.join(SCULTURE_DIR, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) =>
          IMG_EXT.includes(path.extname(f).toLowerCase())
        )
        .sort();

      const cover = files[0];
      const encodedSlug = encodeURIComponent(slug);
      const images = files.map(
        (f) => `/sculture/${encodedSlug}/${encodeURIComponent(f)}`
      );

      return {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        cover: cover
          ? `/sculture/${encodedSlug}/${encodeURIComponent(cover)}`
          : "",
        images,
      };
    })
    .filter((m) => m.cover && m.images.length > 0);
}
