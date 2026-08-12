import type { Metadata } from "next";
import { donateIntro, pillars } from "@/content/copy";
import { donationsEnabled, site } from "@/content/site";
import { DonationForm } from "@/components/donation-form";
import { Container, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Donate",
  description: donateIntro.body,
};

const equipmentCosts =
  pillars.items.find((pillar) => "costs" in pillar)?.costs ?? [];

export default function DonatePage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            Donate
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            {donateIntro.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            {donateIntro.body}
          </p>
        </Container>
      </section>

      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            {donationsEnabled ? (
              <DonationForm />
            ) : (
              <div className="rounded-2xl border border-ink/10 bg-paper p-7">
                <h2 className="text-2xl">Online giving is opening soon</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  We are finishing the setup of our online donation system. In
                  the meantime, please contact us directly and we will make sure
                  your gift reaches the people it is meant for.
                </p>
                <dl className="mt-6 space-y-3 text-lg">
                  <div>
                    <dt className="text-sm uppercase tracking-[0.14em] text-muted">
                      Email
                    </dt>
                    <dd>
                      <a
                        className="break-all text-forest-600 underline underline-offset-4"
                        href={`mailto:${site.contact.email}?subject=Donation%20to%20The%20GIA%20Foundation`}
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm uppercase tracking-[0.14em] text-muted">
                      Phone
                    </dt>
                    <dd>
                      <a
                        className="text-forest-600 underline underline-offset-4"
                        href={`tel:${site.contact.officePhone.replace(/\D/g, "")}`}
                      >
                        {site.contact.officePhone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          <aside>
            <SectionHeading title="What your gift buys" />
            <dl className="mt-6 space-y-3">
              {equipmentCosts.map((cost) => (
                <div
                  key={cost.item}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
                >
                  <dt>{cost.item}</dt>
                  <dd className="shrink-0 font-semibold text-forest-600">
                    {cost.cost}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Donations also go toward tuition for children with disabilities,
              teacher training in inclusive education, and the research needed
              to change how disability is understood.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.name} is {site.legal.status.toLowerCase()}.
              {site.legal.ein ? ` EIN ${site.legal.ein}.` : ""}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
