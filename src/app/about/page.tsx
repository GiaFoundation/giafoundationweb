import type { Metadata } from "next";
import { patricksStory } from "@/content/copy";
import { site } from "@/content/site";
import {
  ButtonLink,
  Container,
  Prose,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${site.name}, told by founder ${patricksStory.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest-700 text-paper">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            About us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Patrick&apos;s story
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-paper/70">
            {patricksStory.name} · {patricksStory.role}
          </p>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl">
          <Prose paragraphs={patricksStory.paragraphs} />
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading
          title="This is The GIA Foundation"
          lede="We will gleam, stepping out of the shadow of stigma that we have been shrouded in for far too long."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/mission" variant="secondary">
            Our mission
          </ButtonLink>
          <ButtonLink href="/donate">Support the work</ButtonLink>
        </div>
      </Section>
    </>
  );
}
