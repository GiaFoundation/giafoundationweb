import type { Metadata } from "next";
import { testimonies } from "@/content/copy";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "First-person accounts from disabled individuals in the Congo, Rwanda, Kenya and the United States.",
};

export default function StoriesPage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            In their words
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Testimonies of disabled individuals in Africa
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            These accounts are published as they were told. Nothing here has
            been rewritten to make it easier to read.
          </p>
        </Container>
      </section>

      <Section>
        <div className="space-y-14">
          {testimonies.map((testimony, index) => (
            <article
              key={testimony.name}
              className="grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-[1fr_2.5fr] first:border-0 first:pt-0"
            >
              <header>
                <p className="font-serif text-2xl">{testimony.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {testimony.location}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gold-600">
                  Testimony {index + 1}
                </p>
              </header>
              <blockquote className="text-lg leading-relaxed">
                {testimony.body}
              </blockquote>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading
          title="Millions have not told their stories yet."
          lede="Rwigema Chrian asked us to wake the world up to them. Funding equipment, tuition and research is how we answer."
        />
        <div className="mt-8">
          <ButtonLink href="/donate">Donate</ButtonLink>
        </div>
      </Section>
    </>
  );
}
