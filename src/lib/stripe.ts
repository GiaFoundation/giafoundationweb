import Stripe from "stripe";

/**
 * Server-side Stripe client.
 *
 * Returns null when no secret key is configured, so the app builds and runs
 * with no Stripe account at all. Callers must handle null rather than assume a
 * client exists — that is what keeps local development and preview deploys
 * working before the foundation has finished onboarding.
 *
 * STRIPE_SECRET_KEY is server-only. It must never be prefixed NEXT_PUBLIC_.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  if (!cached) {
    cached = new Stripe(key);
  }

  return cached;
}

export const MIN_DONATION_USD = 1;
export const MAX_DONATION_USD = 25_000;
