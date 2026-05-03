import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const submissions = new Map<string, number[]>();

interface LeadPayload {
  name: string;
  business: string;
  whatsapp: string;
  monthlyBookings: string;
  category: string;
  locale: 'en' | 'ar';
  source?: string;
  utm?: Record<string, string>;
  honeypot?: string;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
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

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid payload' };
  const b = body as Record<string, unknown>;

  if (typeof b.honeypot === 'string' && b.honeypot.trim().length > 0) {
    return { ok: false, error: 'Bot detected' };
  }

  const required = ['name', 'business', 'whatsapp', 'monthlyBookings', 'category'] as const;
  for (const key of required) {
    if (typeof b[key] !== 'string' || (b[key] as string).trim().length === 0) {
      return { ok: false, error: `Missing field: ${key}` };
    }
  }

  const name = (b.name as string).trim();
  const business = (b.business as string).trim();
  const whatsapp = (b.whatsapp as string).trim();
  const monthlyBookings = (b.monthlyBookings as string).trim();
  const category = (b.category as string).trim();

  if (name.length < 2 || name.length > 120) return { ok: false, error: 'Invalid name' };
  if (business.length < 2 || business.length > 200) return { ok: false, error: 'Invalid business name' };
  if (!/^[+\d\s\-()]{7,25}$/.test(whatsapp)) return { ok: false, error: 'Invalid WhatsApp number' };

  const locale: 'en' | 'ar' = b.locale === 'ar' ? 'ar' : 'en';

  return {
    ok: true,
    data: {
      name,
      business,
      whatsapp,
      monthlyBookings,
      category,
      locale,
      source: typeof b.source === 'string' ? b.source : undefined,
      utm: typeof b.utm === 'object' && b.utm !== null ? (b.utm as Record<string, string>) : undefined,
    },
  };
}

async function sendMailgunNotification(lead: LeadPayload): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const to = process.env.LEADS_NOTIFY_TO ?? 'sales@foxestechnology.com';
  const from = process.env.LEADS_NOTIFY_FROM ?? `Foxes Leads <leads@${domain ?? 'hello.foxestechnology.com'}>`;

  if (!apiKey || !domain) {
    return { sent: false, reason: 'Mailgun env not configured' };
  }

  const utmLines = lead.utm
    ? Object.entries(lead.utm)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join('\n')
    : '  (none)';

  const text = [
    `New lead from foxestechnology.com — ${lead.category}`,
    '',
    `Name:             ${lead.name}`,
    `Business:         ${lead.business}`,
    `WhatsApp:         ${lead.whatsapp}`,
    `Monthly bookings: ${lead.monthlyBookings}`,
    `Category:         ${lead.category}`,
    `Locale:           ${lead.locale}`,
    `Source page:      ${lead.source ?? '(none)'}`,
    '',
    'UTM:',
    utmLines,
    '',
    `Open WhatsApp: https://wa.me/${lead.whatsapp.replace(/[^\d]/g, '')}`,
  ].join('\n');

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; padding: 24px; background: #f8fafc; border-radius: 12px;">
      <h2 style="color: #dc2626; margin: 0 0 16px;">New lead — ${escapeHtml(lead.category)}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #64748b;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Business</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.business)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">WhatsApp</td><td style="padding: 8px 0; font-weight: 600;"><a href="https://wa.me/${lead.whatsapp.replace(/[^\d]/g, '')}" style="color: #dc2626;">${escapeHtml(lead.whatsapp)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Monthly bookings</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.monthlyBookings)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Locale</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.locale)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Source page</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(lead.source ?? '—')}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #64748b; font-size: 13px;">SLA: WhatsApp the operator within 1 hour.</p>
    </div>
  `;

  const formData = new URLSearchParams();
  formData.append('from', from);
  formData.append('to', to);
  formData.append('subject', `New lead · ${lead.business} · ${lead.category}`);
  formData.append('text', text);
  formData.append('html', html);
  formData.append('h:Reply-To', `lead-${Date.now()}@${domain}`);

  const auth = Buffer.from(`api:${apiKey}`).toString('base64');
  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!res.ok) {
    const reason = await res.text().catch(() => 'unknown');
    return { sent: false, reason: `Mailgun ${res.status}: ${reason.slice(0, 200)}` };
  }
  return { sent: true };
}

async function forwardToBackend(lead: LeadPayload): Promise<{ forwarded: boolean; reason?: string }> {
  const url = process.env.LEADS_BACKEND_URL;
  if (!url) return { forwarded: false, reason: 'Backend URL not configured' };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEADS_BACKEND_TOKEN
          ? { Authorization: `Bearer ${process.env.LEADS_BACKEND_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      const reason = await res.text().catch(() => 'unknown');
      return { forwarded: false, reason: `Backend ${res.status}: ${reason.slice(0, 200)}` };
    }
    return { forwarded: true };
  } catch (err) {
    return { forwarded: false, reason: err instanceof Error ? err.message : 'unknown' };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

  const [mail, backend] = await Promise.all([
    sendMailgunNotification(result.data),
    forwardToBackend(result.data),
  ]);

  if (!mail.sent && !backend.forwarded) {
    console.error('[leads] both delivery channels failed', { mail, backend });
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  if (!mail.sent) console.warn('[leads] mailgun failed', mail.reason);
  if (!backend.forwarded) console.warn('[leads] backend forward skipped', backend.reason);

  return NextResponse.json({ ok: true });
}
