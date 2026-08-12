import Image from "next/image";
import {
  hero,
  reality,
  pillars,
  patricksStory,
  testimonies,
  servicesIntro,
  getInvolved,
} from "@/content/copy";
import { gallery } from "@/content/gallery";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export default function HomePage() {
  const featured = testimonies[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-700 text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 font-serif text-xl leading-relaxed text-paper/90 sm:text-2xl">
              {hero.statement}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/donate">Donate</ButtonLink>
              <ButtonLink href="/mission" variant="ghost">
                See our mission
              </ButtonLink>
            </div>
          </div>

          <figure className="mt-16 border-l-2 border-gold-500 pl-5">
            <blockquote className="font-serif text-lg italic text-paper/85">
              “{hero.verse.text}”
            </blockquote>
            <figcaption className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-400">
              {hero.verse.reference}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Gallery — renders only once real photographs are added. */}
      {gallery.length > 0 ? (
        <Section tone="warm" className="py-12 sm:py-16">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((image) => (
              <li
                key={image.src}
                className="overflow-hidden rounded-xl bg-forest-50"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* The reality */}
      <Section>
        <SectionHeading
          eyebrow="The reality"
          title="A cycle rooted in misinformation and ignorance"
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {reality.map((item) => (
            <div key={item.question}>
              <h3 className="text-xl">{item.question}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/mission" variant="secondary">
            The barriers in full
          </ButtonLink>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Our call to action"
          title={pillars.subheading}
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.items.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-2xl border border-ink/10 bg-paper p-7"
            >
              <h3 className="text-xl">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{pillar.lede}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Founder */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-start">
          <div>
            <SectionHeading eyebrow="About us" title="Patrick's story" />
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted">
              {patricksStory.name} · {patricksStory.role}
            </p>
          </div>
          <div>
            <p className="font-serif text-xl leading-relaxed">
              {patricksStory.paragraphs[0]}
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              {patricksStory.paragraphs[1]}
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                Read the whole story
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured testimony */}
      <Section tone="forest">
        <SectionHeading
          eyebrow="In their words"
          title="Stories from disabled individuals in Africa"
          invert
        />
        <figure className="mt-10 max-w-3xl">
          <blockquote className="font-serif text-lg leading-relaxed text-paper/90">
            “{featured.body.slice(0, 420).trimEnd()}…”
          </blockquote>
          <figcaption className="mt-5 text-sm text-gold-400">
            {featured.name}
            <span className="block text-paper/60">{featured.location}</span>
          </figcaption>
        </figure>
        <div className="mt-10">
          <ButtonLink href="/stories">Read all five stories</ButtonLink>
        </div>
      </Section>

      {/* Services + get involved */}
      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="In the United States"
              title={servicesIntro.heading}
              lede={servicesIntro.lede}
            />
            <div className="mt-8">
              <ButtonLink href="/services" variant="secondary">
                See all services
              </ButtonLink>
            </div>
          </div>
          <div>
            <SectionHeading title={getInvolved.heading} lede={getInvolved.body} />
            <div className="mt-8">
              <ButtonLink href="/contact" variant="secondary">
                Volunteer with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
