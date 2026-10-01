/**
 * Email sign-ups on the marketing site: the coming-soon priority list ("Notify me" and its
 * exit pop-up) and the footer newsletter.
 *
 * They go to the same lead endpoint as the landing-page guides, which e-mails our team the
 * address (and forwards it to the CRM when that is configured). A sign-up only counts once
 * the endpoint confirms it, so no form ever says "you're on the list" or "subscribed" for an
 * address that was not recorded.
 */
export type EmailSignupResult = 'ok' | 'rate_limited' | 'error';

export const PRIORITY_LIST_CATEGORY = 'coming-soon';
export const PRIORITY_LIST_MAGNET = 'Priority list';
export const NEWSLETTER_CATEGORY = 'newsletter';
export const NEWSLETTER_MAGNET = 'Footer newsletter';

export async function submitEmailSignup(
  email: string,
  { category, magnet, source }: { category: string; magnet: string; source?: string },
): Promise<EmailSignupResult> {
  try {
    const res = await fetch('/api/leads/magnet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), category, magnet, locale: 'en', source, honeypot: '' }),
    });
    if (res.status === 429) return 'rate_limited';
    if (!res.ok) return 'error';
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return data?.ok ? 'ok' : 'error';
  } catch {
    return 'error';
  }
}

export function joinPriorityList(email: string, source?: string): Promise<EmailSignupResult> {
  return submitEmailSignup(email, { category: PRIORITY_LIST_CATEGORY, magnet: PRIORITY_LIST_MAGNET, source });
}

export function joinNewsletter(email: string, source?: string): Promise<EmailSignupResult> {
  return submitEmailSignup(email, { category: NEWSLETTER_CATEGORY, magnet: NEWSLETTER_MAGNET, source });
}

export const PRIORITY_LIST_MESSAGES = {
  success: 'You’re on the list. We’ll email you when access opens.',
  rate_limited: 'Too many attempts. Please wait a moment and try again.',
  error: 'Something went wrong. Please try again in a moment.',
} as const;
