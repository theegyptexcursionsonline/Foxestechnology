/**
 * The website's enquiry destination comes only from settings, and visitor text is made safe
 * before it reaches an e-mail. No provider is called here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { cleanLine, cleanUtm, leadRecipients, mailgunBase } from '@/lib/lead-delivery';

describe('leadRecipients', () => {
  it('reads the configured inboxes, trimmed and lower-cased', () => {
    expect(leadRecipients({ LEADS_NOTIFY_TO: ' Team@Foxes.example.test ' })).toEqual({ ok: true, to: ['team@foxes.example.test'] });
  });

  it('is off when nothing is configured — there is no address in the code', () => {
    expect(leadRecipients({})).toEqual({ ok: false, reason: 'recipient_not_configured' });
  });

  it.each(['not-an-address', 'a@b.example, ', 'a@b.example,c', 'Name <a@b.example>', Array(6).fill('a@b.example').join(',')])(
    'refuses the whole setting %s',
    (value) => {
      const result = leadRecipients({ LEADS_NOTIFY_TO: value });
      if (value === 'a@b.example, ') expect(result).toEqual({ ok: true, to: ['a@b.example'] });
      else expect(result.ok).toBe(false);
    },
  );

  it('refuses an inbox outside the allowed domains and accepts one inside', () => {
    const env = { LEADS_NOTIFY_ALLOWED_DOMAINS: 'foxes.example.test' };
    expect(leadRecipients({ ...env, LEADS_NOTIFY_TO: 'dev@outside.example' })).toEqual({ ok: false, reason: 'recipient_not_allowed' });
    expect(leadRecipients({ ...env, LEADS_NOTIFY_TO: 'sales@foxes.example.test' }).ok).toBe(true);
  });
});

describe('mailgunBase', () => {
  it('defaults to the provider and accepts its EU region or a local stand-in', () => {
    expect(mailgunBase({})).toBe('https://api.mailgun.net');
    expect(mailgunBase({ MAILGUN_API_BASE: 'https://api.eu.mailgun.net/' })).toBe('https://api.eu.mailgun.net');
    expect(mailgunBase({ MAILGUN_API_BASE: 'http://127.0.0.1:4010' })).toBe('http://127.0.0.1:4010');
  });

  it('refuses plain http to anything that is not this machine', () => {
    expect(mailgunBase({ MAILGUN_API_BASE: 'http://mail.example.test' })).toBeNull();
    expect(mailgunBase({ MAILGUN_API_BASE: 'not a url' })).toBeNull();
  });
});

describe('cleanLine / cleanUtm', () => {
  it('turns line breaks and control characters into single spaces and caps the length', () => {
    expect(cleanLine('a\r\nBcc: x y\u0000z', 100)).toBe('a Bcc: x y z');
    expect(cleanLine('x'.repeat(50), 10)).toBe('x'.repeat(10));
    expect(cleanLine(42, 10)).toBe('');
  });

  it('keeps only the campaign fields the pages send', () => {
    expect(cleanUtm({ utm_source: 'ad\n1', evil: 'x', referrer: 'https://r.example' })).toEqual({ utm_source: 'ad 1', referrer: 'https://r.example' });
    expect(cleanUtm(['x'])).toBeUndefined();
    expect(cleanUtm({ evil: 'x' })).toBeUndefined();
  });
});

describe('no outside mailbox in the site source', () => {
  // Every address written in the pages is a Foxes address or an obvious form placeholder.
  const PLACEHOLDER = /^(example\.com|company\.com|your[a-z]+\.com)$/;
  it('names only Foxes addresses, so no form can be pointed at an outside mailbox from the code', () => {
    const found = new Set<string>();
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(ts|tsx)$/.test(entry.name)) {
          for (const m of fs.readFileSync(full, 'utf8').matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)/g)) {
            const domain = m[1].toLowerCase();
            if (!/(^|\.)foxestechnology\.com$/.test(domain) && !PLACEHOLDER.test(domain)) found.add(`${full}: ${domain}`);
          }
        }
      }
    };
    for (const root of ['app', 'components', 'lib']) walk(path.join(process.cwd(), root));
    expect([...found]).toEqual([]);
  });
});
