import { afterEach, describe, expect, it } from 'vitest';
import { POST } from '../src/pages/api/enquiries';

const originalFlag = process.env.ENQUIRY_ENABLED;

afterEach(() => {
  if (originalFlag === undefined) delete process.env.ENQUIRY_ENABLED;
  else process.env.ENQUIRY_ENABLED = originalFlag;
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
});
