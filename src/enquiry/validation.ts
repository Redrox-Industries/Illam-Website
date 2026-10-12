export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  location: string;
  spaceType: string;
  area: string;
  budget: string;
  message: string;
  turnstileToken: string;
}

const allowedFields = new Set([
  'name',
  'email',
  'phone',
  'location',
  'spaceType',
  'area',
  'budget',
  'message',
  'consent',
  'website',
  'turnstileToken',
]);

const spaceTypes = new Set([
  'residential',
  'commercial',
  'hospitality',
  'other',
]);

export function parseEnquiry(
  input: unknown,
):
  | { ok: true; data: Enquiry; honeypot: boolean }
  | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    return { ok: false, error: 'Invalid enquiry.' };
  const values = input as Record<string, unknown>;
  if (Object.keys(values).some((key) => !allowedFields.has(key)))
    return { ok: false, error: 'Unexpected enquiry field.' };
  if (
    Object.values(values).some(
      (value) => typeof value !== 'string' && typeof value !== 'boolean',
    )
  )
    return { ok: false, error: 'Invalid enquiry field.' };

  const field = (key: string) =>
    typeof values[key] === 'string' ? (values[key] as string).trim() : '';
  const compact = (key: string) => field(key).replace(/\s+/g, ' ');
  const data: Enquiry = {
    name: compact('name'),
    email: compact('email').toLowerCase(),
    phone: compact('phone'),
    location: compact('location'),
    spaceType: field('spaceType'),
    area: compact('area'),
    budget: compact('budget'),
    message: field('message'),
    turnstileToken: field('turnstileToken'),
  };

  if (data.name.length < 2 || data.name.length > 120)
    return { ok: false, error: 'Enter your name (2–120 characters).' };
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { ok: false, error: 'Enter a valid email address.' };
  if (
    data.phone.length > 32 ||
    (data.phone && !/^[+\d().\s-]+$/.test(data.phone))
  )
    return { ok: false, error: 'Enter a valid phone number.' };
  if (data.location.length > 160)
    return { ok: false, error: 'Project location is too long.' };
  if (!spaceTypes.has(data.spaceType))
    return { ok: false, error: 'Select a space type.' };
  if (data.area.length > 100 || data.budget.length > 100)
    return { ok: false, error: 'Area or budget is too long.' };
  if (data.message.length < 20 || data.message.length > 3000)
    return { ok: false, error: 'Enter a message (20–3000 characters).' };
  if (values.consent !== true)
    return { ok: false, error: 'Consent is required.' };
  if (typeof values.website === 'string' && values.website.length > 200)
    return { ok: false, error: 'Invalid enquiry field.' };
  if (!data.turnstileToken || data.turnstileToken.length > 2048)
    return { ok: false, error: 'Complete the verification challenge.' };
  return { ok: true, data, honeypot: Boolean(field('website')) };
}
