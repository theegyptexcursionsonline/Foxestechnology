import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildWhatsappHref, getFoxesWhatsappNumber, normalizeWhatsappNumber } from '@/lib/whatsapp';

describe('normalizeWhatsappNumber', () => {
  it.each([
    ['+20 122 345 6789', '201223456789'],
    ['201223456789', '201223456789'],
    ['(+20) 122-345-6789', '201223456789'],
    ['0020 122 345 6789', '201223456789'],
    ['+971 50 123 4567', '971501234567'],
  ])('accepts the real international number %s', (raw, digits) => {
    expect(normalizeWhatsappNumber(raw)).toBe(digits);
  });

  it.each([
    ['the placeholder with a plus', '+201000000000'],
    ['the placeholder as shown in forms', '+20 100 000 0000'],
    ['the placeholder as bare digits', '201000000000'],
    ['the placeholder behind the 00 dialling prefix', '00201000000000'],
    ['an empty string', ''],
    ['whitespace', '   '],
    ['text with no digits', 'not-a-number'],
    ['a number too short to carry a country code', '+20 123'],
    ['a number longer than E.164 allows', '+20 1234 5678 9012 345'],
    ['a national-format number with no country code', '01223456789'],
  ])('treats %s as "no WhatsApp"', (_label, raw) => {
    expect(normalizeWhatsappNumber(raw)).toBeNull();
  });

  it('treats a missing value as "no WhatsApp"', () => {
    expect(normalizeWhatsappNumber(undefined)).toBeNull();
    expect(normalizeWhatsappNumber(null)).toBeNull();
  });
});

describe('buildWhatsappHref', () => {
  it('links to wa.me with the digits and the encoded message', () => {
    const message = "Hi, I'm interested in Foxes & AI Search?";
    expect(buildWhatsappHref('+20 122 345 6789', message)).toBe(
      `https://wa.me/201223456789?text=${encodeURIComponent(message)}`,
    );
  });

  it('encodes Arabic messages', () => {
    const message = 'مرحبًا، أنا مهتم بأداة البحث الذكية من Foxes لموقعي.';
    const href = buildWhatsappHref('+201223456789', message);
    expect(href).toBe(`https://wa.me/201223456789?text=${encodeURIComponent(message)}`);
    expect(decodeURIComponent(new URL(href!).searchParams.get('text')!)).toBe(message);
  });

  it('omits the message parameter when there is no message', () => {
    expect(buildWhatsappHref('+201223456789', '   ')).toBe('https://wa.me/201223456789');
  });

  it('returns null instead of a link for the placeholder or a missing number', () => {
    expect(buildWhatsappHref('+201000000000', 'Hi')).toBeNull();
    expect(buildWhatsappHref('+20 100 000 0000', 'Hi')).toBeNull();
    expect(buildWhatsappHref('', 'Hi')).toBeNull();
    expect(buildWhatsappHref(null, 'Hi')).toBeNull();
    expect(buildWhatsappHref(undefined, 'Hi')).toBeNull();
  });
});

describe('getFoxesWhatsappNumber', () => {
  const KEY = 'NEXT_PUBLIC_FOXES_WHATSAPP';
  let original: string | undefined;

  beforeEach(() => {
    original = process.env[KEY];
  });
  afterEach(() => {
    if (original === undefined) delete process.env[KEY];
    else process.env[KEY] = original;
  });

  it('is null when the variable is not set', () => {
    delete process.env[KEY];
    expect(getFoxesWhatsappNumber()).toBeNull();
  });

  it('is null when the variable is empty', () => {
    process.env[KEY] = '';
    expect(getFoxesWhatsappNumber()).toBeNull();
  });

  it('is null for the placeholder value the site was deployed with', () => {
    process.env[KEY] = '+201000000000';
    expect(getFoxesWhatsappNumber()).toBeNull();
  });

  it('returns the digits of a real number', () => {
    process.env[KEY] = '+20 122 345 6789';
    expect(getFoxesWhatsappNumber()).toBe('201223456789');
  });
});
