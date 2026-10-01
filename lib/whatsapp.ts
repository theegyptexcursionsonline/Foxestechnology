/**
 * The one place that turns a configured WhatsApp number into a link.
 *
 * A missing, malformed or placeholder number means "no WhatsApp": callers get `null` and
 * must not render a WhatsApp button — the landing pages fall back to the request-access
 * call to action instead. Nothing else in the codebase may build a wa.me link for a Foxes
 * contact number or read NEXT_PUBLIC_FOXES_WHATSAPP; __tests__/guards/whatsapp-placeholder.test.ts
 * fails the quality gate if anything does.
 */

/** Numbers that only ever stood in for a real one, compared after formatting is stripped. */
const PLACEHOLDER_NUMBERS: ReadonlySet<string> = new Set(['201000000000']);

/** A full international (E.164) number has at most 15 digits; fewer than 8 cannot carry a country code. */
const MIN_DIGITS = 8;
const MAX_DIGITS = 15;

/**
 * Digits-only international number that wa.me can route, or null when the input is empty,
 * malformed, national-format (no country code) or a known placeholder.
 */
export function normalizeWhatsappNumber(raw: string | null | undefined): string | null {
  if (typeof raw !== 'string') return null;
  let digits = raw.replace(/\D/g, '');
  // "00" is the international dialling prefix: 00 20 … is the same number as +20 …
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) return null;
  // A leading 0 means a national-format number with no country code; wa.me cannot route it.
  if (digits.startsWith('0')) return null;
  if (PLACEHOLDER_NUMBERS.has(digits)) return null;
  return digits;
}

/** wa.me link with an optional prefilled message, or null when there is no real number. */
export function buildWhatsappHref(number: string | null | undefined, message: string): string | null {
  const digits = normalizeWhatsappNumber(number);
  if (!digits) return null;
  const text = message.trim();
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

/**
 * The Foxes sales WhatsApp number configured for this build, or null when none is set or the
 * configured value is not a real number. Read on the server; pass the result down as a prop.
 */
export function getFoxesWhatsappNumber(): string | null {
  return normalizeWhatsappNumber(process.env.NEXT_PUBLIC_FOXES_WHATSAPP);
}
