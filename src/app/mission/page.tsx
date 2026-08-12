import type { Metadata } from "next";
import { barriers, pillars, reality } from "@/content/copy";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "The barriers facing individuals with disabilities in Africa, and the four commitments The GIA Foundation makes in response.",
};

export default function MissionPage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            Our mission
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Change the stereotype. Provide the resources. Fund the research.
          </h1>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          {reality.map((item) => (
            <div key={item.question}>
              <h2 className="text-2xl">{item.question}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading
          eyebrow={barriers.heading}
          title={barriers.subheading}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {barriers.columns.map((column) => (
            <article
              key={column.title}
              className="flex flex-col rounded-2xl border border-ink/10 bg-paper p-6"
            >
              <h3 className="text-lg">{column.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {column.lede}
              </p>
              <ul className="mt-5 space-y-3 border-t border-ink/10 pt-5 text-sm leading-relaxed text-muted">
                {column.points.map((point, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={pillars.heading} title={pillars.subheading} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pillars.items.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-ink/10 bg-paper-warm p-7"
            >
              <h3 className="text-xl">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/80">{pillar.lede}</p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                {pillar.points.map((point, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {"costs" in pillar && pillar.costs ? (
                <div className="mt-6 rounded-xl bg-paper p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    What equipment costs
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    {pillar.costs.map((cost) => (
                      <div
                        key={cost.item}
                        className="flex items-baseline justify-between gap-4 border-b border-ink/5 pb-2 last:border-0 last:pb-0"
                      >
                        <dt>{cost.item}</dt>
                        <dd className="shrink-0 font-semibold text-forest-600">
                          {cost.cost}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section tone="forest">
        <SectionHeading
          title="A wheelchair costs less than most people spend on a weekend."
          lede="Your donation goes directly toward tuition, mobility equipment, and the research that changes how disability is understood."
          invert
        />
        <div className="mt-8">
          <ButtonLink href="/donate">Donate</ButtonLink>
        </div>
      </Section>
    </>
  );
}
