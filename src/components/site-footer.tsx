import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Container } from "@/components/ui";

export function SiteFooter() {
  const { contact } = site;

  return (
    <footer className="bg-forest-900 text-paper">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-semibold">{site.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.16em] text-gold-400">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
              {site.legal.status}. Every service we provide in the United States
              is offered free of charge.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-paper/60">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-400">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/donate" className="hover:text-gold-400">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-paper/60">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-paper/85">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-gold-400"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                Cell:{" "}
                <a
                  href={`tel:${contact.cellPhone.replace(/\D/g, "")}`}
                  className="hover:text-gold-400"
                >
                  {contact.cellPhone}
                </a>
              </li>
              <li>
                Office:{" "}
                <a
                  href={`tel:${contact.officePhone.replace(/\D/g, "")}`}
                  className="hover:text-gold-400"
                >
                  {contact.officePhone}
                </a>
              </li>
            </ul>
            <address className="mt-4 text-sm not-italic leading-relaxed text-paper/70">
              {contact.usOffice.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/15 pt-6 text-xs text-paper/55">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
