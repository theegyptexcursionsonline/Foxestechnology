/**
 * Where the website's enquiries are delivered: "Ask for a demo" (POST /api/leads) and every
 * e-mail-only sign-up — "Notify me", its pop-ups and the footer sign-up (POST /api/leads/magnet).
 *
 * The recipient comes only from the site's settings (LEADS_NOTIFY_TO). There is deliberately no
 * address written in the code: a missing or malformed setting means the e-mail channel is off and
 * the route answers with an error unless another channel recorded the enquiry, so a visitor is
 * never told "received" for a message that went nowhere. LEADS_NOTIFY_ALLOWED_DOMAINS, when set,
 * refuses any recipient outside those domains, so the destination cannot quietly drift to an
 * outside mailbox.
 */

/** The settings this module reads; process.env in the routes, a plain object in tests. */
export type Env = Readonly<Record<string, string | undefined>>;

const EMAIL_PATTERN = /^[^\s@,<>"]+@[^\s@,<>"]+\.[^\s@,<>"]+$/;
const MAX_RECIPIENTS = 5;
const DEFAULT_MAILGUN_BASE = 'https://api.mailgun.net';

export type RecipientConfig =
  | { ok: true; to: string[] }
  | { ok: false; reason: 'recipient_not_configured' | 'recipient_invalid' | 'recipient_not_allowed' };

/** Reads and checks LEADS_NOTIFY_TO. Fails closed: one bad entry turns the whole channel off. */
export function leadRecipients(env: Env = process.env): RecipientConfig {
  const raw = (env.LEADS_NOTIFY_TO ?? '').trim();
  if (!raw) return { ok: false, reason: 'recipient_not_configured' };
  const to = raw.split(',').map((part) => part.trim().toLowerCase()).filter(Boolean);
  if (to.length === 0 || to.length > MAX_RECIPIENTS || to.some((addr) => !EMAIL_PATTERN.test(addr) || addr.length > 254)) {
    return { ok: false, reason: 'recipient_invalid' };
  }
  const allowed = (env.LEADS_NOTIFY_ALLOWED_DOMAINS ?? '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length && to.some((addr) => !allowed.includes(addr.split('@')[1]))) {
    return { ok: false, reason: 'recipient_not_allowed' };
  }
  return { ok: true, to };
}

/** Mailgun API base: the US default, the EU region, or a local stand-in for a local run. */
export function mailgunBase(env: Env = process.env): string | null {
  const raw = (env.MAILGUN_API_BASE ?? '').trim().replace(/\/+$/, '');
  if (!raw) return DEFAULT_MAILGUN_BASE;
  try {
    const url = new URL(raw);
    const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (url.protocol === 'https:' || (url.protocol === 'http:' && local)) return raw;
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * One line of visitor text: control characters (including line breaks, which could otherwise
 * reach an e-mail subject) become spaces, runs of spaces collapse, and the result is capped.
 */
export function cleanLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

// Control characters, including line and paragraph separators.
const CONTROL_CHARS = new RegExp('[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]', 'g');

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer'] as const;

/** Keeps only the campaign fields the pages send, each a short single line. */
export function cleanUtm(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const source = value as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = cleanLine(source[key], 300);
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Page / list names: lower-case words joined by hyphens or colons. */
export const CATEGORY_PATTERN = /^[a-z0-9][a-z0-9:-]{0,59}$/;

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface LeadMail {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  tag?: string;
  /** Display name for the sender when LEADS_NOTIFY_FROM is not set. */
  fromName: string;
}

export type MailResult = { sent: true; to: string[] } | { sent: false; reason: string };

/** Sends the team notice through Mailgun to the configured recipients only. */
export async function sendLeadMail(mail: LeadMail, env: Env = process.env): Promise<MailResult> {
  const apiKey = env.MAILGUN_API_KEY;
  const domain = env.MAILGUN_DOMAIN;
  if (!apiKey || !domain) return { sent: false, reason: 'mailgun_not_configured' };

  const recipients = leadRecipients(env);
  if (!recipients.ok) return { sent: false, reason: recipients.reason };

  const base = mailgunBase(env);
  if (!base) return { sent: false, reason: 'mailgun_base_invalid' };

  const from = cleanLine(env.LEADS_NOTIFY_FROM, 200) || `${mail.fromName} <leads@${domain}>`;

  const form = new URLSearchParams();
  form.append('from', from);
  for (const addr of recipients.to) form.append('to', addr);
  form.append('subject', cleanLine(mail.subject, 200));
  form.append('text', mail.text);
  form.append('html', mail.html);
  if (mail.replyTo) form.append('h:Reply-To', cleanLine(mail.replyTo, 254));
  if (mail.tag) form.append('o:tag', cleanLine(mail.tag, 120));

  const auth = Buffer.from(`api:${apiKey}`).toString('base64');
  try {
    const res = await fetch(`${base}/v3/${domain}/messages`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const reason = await res.text().catch(() => 'unknown');
      return { sent: false, reason: `mailgun_${res.status}: ${reason.slice(0, 200)}` };
    }
    return { sent: true, to: recipients.to };
  } catch (err) {
    return { sent: false, reason: `mailgun_unreachable: ${err instanceof Error ? err.message : 'unknown'}` };
  }
}
