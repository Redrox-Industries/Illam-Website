import type { APIRoute } from 'astro';
import { parseEnquiry } from '../../enquiry/validation';

export const prerender = false;

const json = (message: string, status: number) =>
  Response.json(
    { message },
    {
      status,
      headers: { 'Cache-Control': 'no-store' },
    },
  );

async function readLimitedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Empty body');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_384) {
      await reader.cancel();
      throw new Error('Body too large');
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

export const POST: APIRoute = async ({ request }) => {
  if (process.env.ENQUIRY_ENABLED !== 'true')
    return json('Enquiries are not available yet.', 503);
  const { TURNSTILE_SECRET_KEY, RESEND_API_KEY, RESEND_FROM, ENQUIRY_TO } =
    process.env;
  if (!TURNSTILE_SECRET_KEY || !RESEND_API_KEY || !RESEND_FROM || !ENQUIRY_TO)
    return json('Enquiries are not available yet.', 503);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json('Send a JSON enquiry.', 415);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return json('Invalid request origin.', 403);

  let input: unknown;
  try {
    input = await readLimitedJson(request);
  } catch {
    return json('Invalid or oversized enquiry.', 400);
  }
  const parsed = parseEnquiry(input);
  if (!parsed.ok) return json(parsed.error, 400);
  if (parsed.honeypot) return json('Enquiry received.', 200);

  try {
    const verification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: parsed.data.turnstileToken,
        }),
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (
      !verification.ok ||
      !((await verification.json()) as { success?: boolean }).success
    )
      return json('Verification failed. Please try again.', 403);
  } catch {
    return json('Verification is unavailable. Please try again.', 502);
  }

  const { name, email, phone, location, spaceType, area, budget, message } =
    parsed.data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Project location: ${location || 'Not provided'}`,
    `Space type: ${spaceType}`,
    `Approximate area: ${area || 'Not provided'}`,
    `Estimated budget: ${budget || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [ENQUIRY_TO],
        reply_to: email,
        subject: `New interior enquiry — ${name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!sent.ok)
      return json('Message delivery failed. Please try again.', 502);
    return json('Enquiry sent. Thank you.', 200);
  } catch {
    return json('Message delivery failed. Please try again.', 502);
  }
};
