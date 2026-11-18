import { NextRequest, NextResponse } from 'next/server';
import { CATEGORY_PATTERN, cleanLine, cleanUtm, escapeHtml, sendLeadMail } from '@/lib/lead-delivery';

export const runtime = 'nodejs';

const RATE_LIMIT_MAX = 6;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const submissions = new Map<string, number[]>();

interface MagnetPayload {
  email: string;
  category: string;
  magnet: string;
  locale: 'en' | 'ar';
  source?: string;
  utm?: Record<string, string>;
  honeypot?: string;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function validate(body: unknown): { ok: true; data: MagnetPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'invalid_payload' };
  const b = body as Record<string, unknown>;

  if (typeof b.honeypot === 'string' && b.honeypot.trim().length > 0) {
    return { ok: false, error: 'bot_detected' };
  }

  if (typeof b.email !== 'string') return { ok: false, error: 'missing_email' };
  const email = b.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid_email' };
  if (email.length > 254) return { ok: false, error: 'email_too_long' };

  const category = cleanLine(b.category, 80);
  if (!category) return { ok: false, error: 'missing_category' };
  if (!CATEGORY_PATTERN.test(category)) return { ok: false, error: 'invalid_category' };

  const magnet = cleanLine(b.magnet, 80) || 'lead-magnet';
  const locale: 'en' | 'ar' = b.locale === 'ar' ? 'ar' : 'en';

  return {
    ok: true,
    data: {
      email,
      category,
      magnet,
      locale,
      source: cleanLine(b.source, 300) || undefined,
      utm: cleanUtm(b.utm),
    },
  };
}

async function notify(payload: MagnetPayload) {
  const utmLines = payload.utm
    ? Object.entries(payload.utm)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join('\n')
    : '  (none)';

  const text = [
    `New lead-magnet signup — ${payload.category}`,
    '',
    `Email:    ${payload.email}`,
    `Magnet:   ${payload.magnet}`,
    `Category: ${payload.category}`,
    `Locale:   ${payload.locale}`,
    `Source:   ${payload.source ?? '(none)'}`,
    '',
    'UTM:',
    utmLines,
  ].join('\n');

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; padding: 24px; background: #f8fafc; border-radius: 12px;">
      <h2 style="color: #dc2626; margin: 0 0 12px;">Lead-magnet signup · ${escapeHtml(payload.category)}</h2>
      <p style="margin: 4px 0; color: #334155;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin: 4px 0; color: #334155;"><strong>Magnet:</strong> ${escapeHtml(payload.magnet)}</p>
      <p style="margin: 4px 0; color: #334155;"><strong>Locale:</strong> ${escapeHtml(payload.locale)}</p>
      <p style="margin: 4px 0; color: #334155;"><strong>Source:</strong> ${escapeHtml(payload.source ?? '—')}</p>
      <p style="margin: 12px 0 0; color: #64748b; font-size: 13px;">Tag: lead-magnet:${escapeHtml(payload.category)}</p>
    </div>
  `;

  return sendLeadMail({
    fromName: 'Foxes Lead Magnets',
    subject: `Lead magnet · ${payload.category} · ${payload.email}`,
    text,
    html,
    replyTo: payload.email,
    tag: `lead-magnet:${payload.category}`,
  });
}

async function forwardToBackend(payload: MagnetPayload): Promise<{ forwarded: boolean }> {
  const url = process.env.LEADS_BACKEND_URL;
  if (!url) return { forwarded: false };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEADS_BACKEND_TOKEN
          ? { Authorization: `Bearer ${process.env.LEADS_BACKEND_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        email: payload.email,
        locale: payload.locale,
        category: `lead-magnet:${payload.category}`,
        magnet: payload.magnet,
        source: payload.source ?? 'foxestechnology.com',
      }),
    });
    return { forwarded: res.ok };
  } catch {
    return { forwarded: false };
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const [mail, backend] = await Promise.all([notify(result.data), forwardToBackend(result.data)]);

  if (!mail.sent && !backend.forwarded) {
    console.error('[leads/magnet] all delivery channels failed', mail.reason);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
  if (!mail.sent) console.warn('[leads/magnet] mailgun failed', mail.reason);

  return NextResponse.json({ ok: true });
}
