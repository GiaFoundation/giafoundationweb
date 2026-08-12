"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, site } from "@/content/site";
import { Container } from "@/components/ui";

/**
 * Placeholder mark — replace with the foundation's logo when one is supplied.
 * Keeping it inline (rather than an image) means there is no asset to swap in
 * two places and nothing to load before the header paints.
 */
function Mark() {
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-700"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 2.5 13.9 9l6.6 1.6-5.4 4 .7 6.7-5.8-3.4-5.8 3.4.7-6.7-5.4-4L6.1 9z"
          className="fill-gold-400"
        />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Closing on tap (rather than in an effect keyed to the pathname) keeps the
  // panel from lingering over a new page without triggering a cascading render.
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Mark />
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold">
                {site.name}
              </span>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-forest-50 text-forest-700"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/donate"
              className="ml-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-400"
            >
              Donate
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-md p-2 lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-ink/10 bg-paper lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-paper-warm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-gold-500 px-5 py-3 text-center text-base font-semibold text-ink"
            >
              Donate
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
