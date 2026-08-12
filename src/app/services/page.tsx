import type { Metadata } from "next";
import {
  getInvolved,
  populationsServed,
  services,
  servicesIntro,
} from "@/content/copy";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Free immigration, employment, housing, language and case management services for immigrant and refugee families in the United States.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            Free of charge
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            {servicesIntro.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            {servicesIntro.lede}
          </p>
        </Container>
      </section>

      <Section>
        <ol className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="rounded-2xl border border-ink/10 bg-paper-warm p-7"
            >
              <span className="font-serif text-sm text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 text-xl">{service.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {service.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading title="Populations served" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {populationsServed.map((population) => (
                <li
                  key={population}
                  className="rounded-full border border-forest-500/25 bg-paper px-4 py-2 text-sm"
                >
                  {population}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              title={getInvolved.heading}
              lede={getInvolved.body}
            />
            <div className="mt-8">
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
