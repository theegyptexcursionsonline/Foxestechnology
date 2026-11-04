/**
 * Guard: link previews (WhatsApp, social) must show a real image.
 *
 * Live on 4 Nov 2026 every page's og:image pointed at http://localhost:3000/… because
 * the root layout set no metadataBase, and most pages named /og-image.png, a file that
 * did not exist. Sharing /request-access on WhatsApp showed no picture.
 * This scan fails the gate if the base goes missing, or if any page names a preview
 * image that is not in public/, is not 1200×630, or is too heavy for WhatsApp.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PUBLIC = path.join(ROOT, 'public');
// WhatsApp drops preview images much above ~300 KB.
const MAX_PREVIEW_BYTES = 300 * 1024;

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : /\.(tsx?|jsx?)$/.test(entry.name) ? [full] : [];
  });
}

/** Every image path named inside an openGraph or twitter metadata block. */
function previewImages(source: string): string[] {
  const found = new Set<string>();
  for (const block of source.match(/(openGraph|twitter)\s*:\s*\{[\s\S]*?\n\s{2}\}/g) ?? []) {
    for (const m of block.matchAll(/(?:url\s*:\s*|images\s*:\s*\[\s*)'([^']+\.(?:png|jpe?g|webp))'/g)) found.add(m[1]);
  }
  return [...found];
}

function pngSize(file: string): { width: number; height: number } {
  const buf = fs.readFileSync(file);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const pages = walk(path.join(ROOT, 'app'));
const named = pages.flatMap((file) => previewImages(fs.readFileSync(file, 'utf8')).map((image) => ({ file: path.relative(ROOT, file), image })));

describe('link preview images', () => {
  it('the root layout sets the live site as the metadata base, never localhost', () => {
    const layout = fs.readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
    expect(layout).toMatch(/metadataBase:\s*new URL\(SITE_URL\)/);
    expect(layout).toMatch(/const SITE_URL = 'https:\/\/foxestechnology\.com'/);
  });

  it('finds the preview images the pages name (scan is not silently empty)', () => {
    expect(named.length).toBeGreaterThan(10);
  });

  it('no page names a localhost or http preview address', () => {
    const bad = named.filter(({ image }) => /localhost|^http:/.test(image));
    expect(bad).toEqual([]);
  });

  it('every named preview image exists in public/', () => {
    const missing = named.filter(({ image }) => image.startsWith('/') && !fs.existsSync(path.join(PUBLIC, image)));
    expect(missing).toEqual([]);
  });

  it('every preview image is 1200×630 and light enough for WhatsApp', () => {
    const images = [...new Set(named.map(({ image }) => image).filter((image) => image.startsWith('/') && image.endsWith('.png')))];
    for (const image of images) {
      const file = path.join(PUBLIC, image);
      expect(pngSize(file), image).toEqual({ width: 1200, height: 630 });
      expect(fs.statSync(file).size, image).toBeLessThanOrEqual(MAX_PREVIEW_BYTES);
    }
  });
});
