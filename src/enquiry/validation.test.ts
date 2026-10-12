import { describe, expect, it } from 'vitest';
import { parseEnquiry } from './validation';

const validEnquiry = {
  name: '  Ada Lovelace  ',
  email: '  ADA@example.com  ',
  phone: '',
  location: '',
  spaceType: 'residential',
  area: '',
  budget: '',
  message: 'I would like to discuss a home renovation.',
  consent: true,
  website: '',
  turnstileToken: 'verified-token',
};

describe('parseEnquiry', () => {
  it('normalizes a complete enquiry', () => {
    expect(parseEnquiry(validEnquiry)).toMatchObject({
      ok: true,
      honeypot: false,
      data: { name: 'Ada Lovelace', email: 'ada@example.com' },
    });
  });

  it('requires consent and verification', () => {
    expect(parseEnquiry({ ...validEnquiry, consent: false }).ok).toBe(false);
    expect(parseEnquiry({ ...validEnquiry, turnstileToken: '' }).ok).toBe(
      false,
    );
  });

  it('rejects unexpected fields and oversized messages', () => {
    expect(parseEnquiry({ ...validEnquiry, role: 'admin' }).ok).toBe(false);
    expect(
      parseEnquiry({ ...validEnquiry, message: 'x'.repeat(3001) }).ok,
    ).toBe(false);
  });

  it('marks a filled honeypot without accepting extra fields', () => {
    expect(parseEnquiry({ ...validEnquiry, website: 'spam' })).toMatchObject({
      ok: true,
      honeypot: true,
    });
  });
});
