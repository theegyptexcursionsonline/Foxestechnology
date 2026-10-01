/**
 * Guard: the placeholder WhatsApp number must never reach a visitor again.
 *
 * Every WhatsApp link on the site is built by lib/whatsapp.ts, which treats a missing,
 * malformed or placeholder number as "no WhatsApp" so pages fall back to the
 * request-access call to action. This scan fails the gate if any other file bakes in the
 * placeholder, reads the env var directly, or builds its own wa.me link.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const SCANNED_DIRS = ['app', 'components', 'lib'];

/** The single place allowed to know the placeholder and build WhatsApp links. */
const HELPER = 'lib/whatsapp.ts';
/**
 * The lead-notification email links the team to the *visitor's own* number they just
 * typed into the form — not to a Foxes contact number — so it may build that link itself.
 */
const LEAD_EMAIL_ROUTE = 'app/api/leads/route.ts';

function sourceFiles(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(rel);
    return /\.(tsx?|jsx?|mjs)$/.test(entry.name) ? [rel] : [];
  });
}

const files = SCANNED_DIRS.flatMap(sourceFiles).map((rel) => ({
  rel: rel.split(path.sep).join('/'),
  text: fs.readFileSync(path.join(ROOT, rel), 'utf8'),
}));

function offenders(pattern: RegExp, allowed: string[]) {
  return files
    .filter(({ rel, text }) => !allowed.includes(rel) && pattern.test(text))
    .map(({ rel, text }) => {
      const line = text.split('\n').findIndex((l) => pattern.test(l)) + 1;
      return `${rel}:${line}`;
    });
}

describe('WhatsApp placeholder guard', () => {
  it('scans the real source tree', () => {
    expect(files.length).toBeGreaterThan(50);
    expect(files.some((f) => f.rel === HELPER)).toBe(true);
  });

  it('no file outside the helper contains the placeholder number', () => {
    expect(offenders(/201000000000/, [HELPER])).toEqual([]);
  });

  it('no file outside the helper reads NEXT_PUBLIC_FOXES_WHATSAPP directly', () => {
    expect(offenders(/NEXT_PUBLIC_FOXES_WHATSAPP/, [HELPER])).toEqual([]);
  });

  it('no file outside the helper builds its own wa.me link', () => {
    expect(offenders(/wa\.me\//, [HELPER, LEAD_EMAIL_ROUTE])).toEqual([]);
  });
});
