import type { APIRoute } from 'astro';
import { parseEnquiry } from '../../enquiry/validation';

export const prerender = false;

const MAX_BODY_BYTES = 16_384;

class BodyTooLargeError extends Error {}

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
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new BodyTooLargeError('Body too large');
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
  const {
    PUBLIC_SITE_URL,
    TURNSTILE_SECRET_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    ENQUIRY_TO,
  } = process.env;
  if (
    !PUBLIC_SITE_URL ||
    !TURNSTILE_SECRET_KEY ||
    !RESEND_API_KEY ||
    !RESEND_FROM ||
    !ENQUIRY_TO
  )
    return json('Enquiries are not available yet.', 503);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json('Send a JSON enquiry.', 415);
  const origin = request.headers.get('origin');
  let siteUrl: URL;
  try {
    siteUrl = new URL(PUBLIC_SITE_URL);
  } catch {
    return json('Enquiries are not available yet.', 503);
  }
  if (!origin || origin !== siteUrl.origin)
    return json('Invalid request origin.', 403);

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES)
    return json('Enquiry is too large.', 413);

  let input: unknown;
  try {
    input = await readLimitedJson(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError)
      return json('Enquiry is too large.', 413);
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
    const result = (await verification.json()) as {
      success?: boolean;
      hostname?: string;
    };
    if (
      !verification.ok ||
      !result.success ||
      result.hostname !== siteUrl.hostname
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
