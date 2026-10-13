import { afterEach, describe, expect, it } from 'vitest';
import { POST } from '../src/pages/api/enquiries';

const originalFlag = process.env.ENQUIRY_ENABLED;
const originalSiteUrl = process.env.PUBLIC_SITE_URL;

afterEach(() => {
  if (originalFlag === undefined) delete process.env.ENQUIRY_ENABLED;
  else process.env.ENQUIRY_ENABLED = originalFlag;
  if (originalSiteUrl === undefined) delete process.env.PUBLIC_SITE_URL;
  else process.env.PUBLIC_SITE_URL = originalSiteUrl;
});

describe('POST /api/enquiries', () => {
  it('rejects submissions while delivery is disabled', async () => {
    delete process.env.ENQUIRY_ENABLED;
    const response = await POST({
      request: new Request(
        'https://redrox-interior-preview.netlify.app/api/enquiries',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        },
      ),
    } as Parameters<typeof POST>[0]);

    expect(response.status).toBe(503);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('rejects missing or cross-site origins before reading input', async () => {
    process.env.ENQUIRY_ENABLED = 'true';
    process.env.PUBLIC_SITE_URL = 'https://redrox-interior-preview.netlify.app';
    process.env.TURNSTILE_SECRET_KEY = 'test';
    process.env.RESEND_API_KEY = 'test';
    process.env.RESEND_FROM = 'test@example.com';
    process.env.ENQUIRY_TO = 'owner@example.com';

    for (const origin of [undefined, 'https://attacker.example']) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      if (origin) headers.set('Origin', origin);
      const response = await POST({
        request: new Request(
          'https://redrox-interior-preview.netlify.app/api/enquiries',
          { method: 'POST', headers, body: '{}' },
        ),
      } as Parameters<typeof POST>[0]);

      expect(response.status).toBe(403);
    }
  });

  it('rejects declared oversized bodies without parsing them', async () => {
    process.env.ENQUIRY_ENABLED = 'true';
    process.env.PUBLIC_SITE_URL = 'https://redrox-interior-preview.netlify.app';
    process.env.TURNSTILE_SECRET_KEY = 'test';
    process.env.RESEND_API_KEY = 'test';
    process.env.RESEND_FROM = 'test@example.com';
    process.env.ENQUIRY_TO = 'owner@example.com';
    const response = await POST({
      request: new Request(
        'https://redrox-interior-preview.netlify.app/api/enquiries',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://redrox-interior-preview.netlify.app',
            'Content-Length': '16385',
          },
          body: '{}',
        },
      ),
    } as Parameters<typeof POST>[0]);

    expect(response.status).toBe(413);
  });
});
