import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { site } from "@/content/site";
import { ButtonLink, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

/**
 * Confirms the donation server-side rather than trusting the redirect. Landing
 * on this URL proves nothing — anyone can type it. The gift is only treated as
 * received when Stripe itself reports the session as paid.
 *
 * Note: this page is for the donor's reassurance only. Anything the foundation
 * needs to *record* about a donation must come from a verified Stripe webhook,
 * never from this redirect. See README.md → "Turning on donations".
 */
export default async function ThankYouPage({
  searchParams,
}: PageProps<"/donate/thank-you">) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : null;

  let confirmed = false;

  const stripe = getStripe();
  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      confirmed =
        session.payment_status === "paid" ||
        session.payment_status === "no_payment_required";
    } catch {
      confirmed = false;
    }
  }

  return (
    <Section className="min-h-[60vh]">
      <Container className="max-w-2xl text-center">
        {confirmed ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Donation received
            </p>
            <h1 className="mt-4 text-4xl leading-tight">Thank you.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Your receipt is on its way by email from Stripe. Your gift goes
              toward tuition, mobility equipment, and the research that changes
              how disability is understood.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl leading-tight">
              We could not confirm this donation
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              If you completed a payment, it may still be processing — your
              emailed receipt from Stripe is the authoritative record. If you
              have any doubt, contact us at{" "}
              <a
                className="text-forest-600 underline underline-offset-4"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>{" "}
              and we will check.
            </p>
          </>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
          <Link
            href="/stories"
            className="inline-flex items-center px-4 py-3 text-sm font-semibold text-forest-600 underline underline-offset-4"
          >
            Read the stories your gift supports
          </Link>
        </div>
      </Container>
    </Section>
  );
}
