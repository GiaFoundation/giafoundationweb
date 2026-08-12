import { NextResponse } from "next/server";
import {
  getStripe,
  MAX_DONATION_USD,
  MIN_DONATION_USD,
} from "@/lib/stripe";
import { site } from "@/content/site";

export const runtime = "nodejs";

type CheckoutBody = {
  amount?: unknown;
  frequency?: unknown;
};

/**
 * Creates a Stripe Checkout Session for a donation.
 *
 * The amount is validated here rather than trusted from the browser — the
 * client can send anything. Nothing about the donor is stored by this app; the
 * card details are collected by Stripe on Stripe's own page and never touch
 * this server.
 */
export async function POST(request: Request) {
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Online donations are not configured yet. Please contact us to give.",
      },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    return NextResponse.json(
      { error: "Please enter a whole dollar amount." },
      { status: 400 },
    );
  }

  if (amount < MIN_DONATION_USD || amount > MAX_DONATION_USD) {
    return NextResponse.json(
      {
        error: `Donations must be between $${MIN_DONATION_USD} and $${MAX_DONATION_USD.toLocaleString()}. For a larger gift, please contact us directly.`,
      },
      { status: 400 },
    );
  }

  const recurring = body.frequency === "monthly";

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    site.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: {
              name: recurring
                ? `Monthly donation to ${site.name}`
                : `Donation to ${site.name}`,
            },
            ...(recurring ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
      submit_type: recurring ? undefined : "donate",
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Log server-side; never leak Stripe internals to the browser.
    console.error("[checkout] failed to create session", error);
    return NextResponse.json(
      { error: "We could not start the donation. Please try again." },
      { status: 500 },
    );
  }
}
