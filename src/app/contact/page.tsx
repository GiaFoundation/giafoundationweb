import type { Metadata } from "next";
import { getInvolved } from "@/content/copy";
import { site } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} by phone, email, or at our office in Dacula, Georgia.`,
};

const { contact } = site;

/**
 * No contact form yet — a form needs a transactional email provider under the
 * foundation's own account, and a form that silently drops messages is worse
 * than no form. See README.md → "Adding the contact form".
 */
export default function ContactPage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            We would like to hear from you
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            Whether you need our services, want to volunteer, or want to know
            more about the work we do in Africa — reach out.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-paper-warm p-7">
            <h2 className="text-xl">Call us</h2>
            <dl className="mt-4 space-y-3 text-lg">
              <div>
                <dt className="text-sm uppercase tracking-[0.14em] text-muted">
                  Cell
                </dt>
                <dd>
                  <a
                    className="text-forest-600 underline-offset-4 hover:underline"
                    href={`tel:${contact.cellPhone.replace(/\D/g, "")}`}
                  >
                    {contact.cellPhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.14em] text-muted">
                  Office
                </dt>
                <dd>
                  <a
                    className="text-forest-600 underline-offset-4 hover:underline"
                    href={`tel:${contact.officePhone.replace(/\D/g, "")}`}
                  >
                    {contact.officePhone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper-warm p-7">
            <h2 className="text-xl">Email us</h2>
            <p className="mt-4 text-lg">
              <a
                className="break-all text-forest-600 underline-offset-4 hover:underline"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tell us which service you need and the language you are most
              comfortable in. We work in English, French, Swahili, Kinyarwanda,
              Kirundi and Kinyamulenge.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper-warm p-7">
            <h2 className="text-xl">Visit us</h2>
            <address className="mt-4 not-italic leading-relaxed">
              <span className="block text-sm uppercase tracking-[0.14em] text-muted">
                {contact.usOffice.label}
              </span>
              {contact.usOffice.lines.map((line) => (
                <span key={line} className="block text-lg">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading title={getInvolved.heading} lede={getInvolved.body} />
        <p className="mt-6 text-lg">
          Email{" "}
          <a
            className="text-forest-600 underline underline-offset-4"
            href={`mailto:${contact.email}?subject=Volunteering%20with%20The%20GIA%20Foundation`}
          >
            {contact.email}
          </a>{" "}
          and tell us what you would like to help with.
        </p>
      </Section>
    </>
  );
}
