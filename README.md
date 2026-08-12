# The GIA Foundation — Website

Website for The GIA Foundation (Gleaming in Africa): a 501(c)(3) organization
working to end the stigma surrounding disability in Africa, and providing free
immigration, employment, housing, language and case management services to
immigrant and refugee families in the United States.

This repository is owned by the **GiaFoundation** GitHub organization. It is
intended to outlive any individual developer — see [Handing off](#handing-off).

---

## Stack

| Concern     | Choice                        | Why                                                        |
| ----------- | ----------------------------- | ---------------------------------------------------------- |
| Framework   | Next.js 16 (App Router)       | Static-first, free to host, large hiring pool               |
| Language    | TypeScript                    | Catches content/shape mistakes at build time                |
| Styling     | Tailwind CSS v4               | No separate design system to maintain                       |
| Hosting     | Vercel (free Hobby tier)      | Zero-config for Next.js, preview deploy per branch          |
| Payments    | Stripe Checkout               | Card data never touches our servers                         |
| Database    | **None**                      | Nothing on this site needs one yet — see below              |

### Why there is no database

Every page is content the foundation wrote. Adding Postgres would mean another
account to own, another bill to watch, and another thing to hand over. When a
real need appears — storing volunteer signups, say — add it then, and prefer a
free tier under a foundation-owned account.

---

## Running it locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/GiaFoundation/giafoundationweb.git
cd giafoundationweb
npm install
cp .env.example .env.local   # optional; the site runs fine without it
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build   # production build; run before pushing anything significant
npm run lint    # ESLint
```

---

## Where the content lives

Text is separated from layout so it can be edited without touching components.

| File                        | Contents                                                             |
| --------------------------- | -------------------------------------------------------------------- |
| `src/content/site.ts`       | Organization name, contact details, navigation, donation amounts      |
| `src/content/copy.ts`       | All page copy: the mission, the barriers, Patrick's story, testimonies |
| `src/content/gallery.ts`    | Home page photo gallery (empty by default)                            |

**Patrick's story and the five testimonies are first-person accounts.** They are
published as told. Do not paraphrase or shorten them — if the wording changes,
it should change because the person who told it asked for the change.

### Adding photos

1. Put image files in `public/gallery/`.
2. Add an entry to `src/content/gallery.ts` with the path, dimensions, and real
   alt text describing what is in the photo.

The gallery section does not render while that list is empty, so the home page
never shows empty frames. Alt text is not optional on a site about disability
and dignity — screen reader users are part of this audience.

---

## Environment variables

See `.env.example` for the full annotated list. Summary:

| Variable                        | Scope       | Notes                                                     |
| ------------------------------- | ----------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public      | Base URL used for Stripe redirect targets                  |
| `NEXT_PUBLIC_DONATIONS_ENABLED` | Public      | `"true"` shows the donation form; anything else hides it   |
| `STRIPE_SECRET_KEY`             | **Server**  | Never prefix with `NEXT_PUBLIC_`. Use `sk_test_` in dev    |
| `STRIPE_WEBHOOK_SECRET`         | **Server**  | Needed once a webhook endpoint is added                    |

Rules that are not negotiable:

- Secrets go in Vercel's environment variable settings, never in the repository.
- Test keys in development and preview; live keys only in production.
- If a key is ever pasted into a commit, chat, or screenshot, **rotate it** —
  deleting the message does not un-leak it.

---

## Deployment

Vercel builds every push:

- Push to any branch → preview deployment at a unique URL.
- Merge to `main` → production deployment.

The Vercel project should live in a foundation-owned Vercel team, connected to
this repository. Nothing needs to be paid for: the Hobby tier covers a site of
this size.

The domain does not need to exist before launch — the site runs on its
`*.vercel.app` URL until the foundation purchases a domain, at which point the
domain is pointed at the existing deployment.

---

## Turning on donations

Online giving is **off** by default. The donate page shows contact details
instead of a payment form, so nothing is broken while setup is in progress.

To switch it on:

1. The foundation creates a Stripe account under its own email — not a
   developer's. Stripe's nonprofit processing rate requires the 501(c)(3)
   determination letter and an EIN.
2. Add `STRIPE_SECRET_KEY` in Vercel (test key on preview, live key on
   production only).
3. Set `NEXT_PUBLIC_DONATIONS_ENABLED=true`.
4. Test the full flow with Stripe's test card `4242 4242 4242 4242` before
   putting a live key anywhere.

### If donations ever need to be recorded

`/donate/thank-you` confirms a payment by asking Stripe about the session
directly — it does not trust the redirect, because anyone can type that URL.
That is fine for reassuring a donor.

It is **not** good enough for recording a donation. Landing on a page is not
proof of payment: donors close tabs, lose signal, and pay from a different
device. Any record of a gift must come from a verified Stripe webhook
(`checkout.session.completed`, signature checked with `STRIPE_WEBHOOK_SECRET`),
handled idempotently so a retried webhook does not double-count.

Never store card numbers, CVVs, or payment credentials. Stripe holds those.

---

## Adding the contact form

There is deliberately no contact form yet. A form needs somewhere to send mail,
and a form that silently drops messages is worse than no form — people assume
they were heard when they were not.

When ready: add a transactional email provider on a free tier under a
foundation-owned account (Resend's free tier is a reasonable fit), post to a
Next.js route handler, validate server-side, and add basic spam protection.
Until then the contact page lists phone, email and address directly.

---

## Accounts and ownership

Every account this site depends on should belong to the foundation, with
developers added as collaborators:

| Service            | Owner                            | Status                        |
| ------------------ | -------------------------------- | ----------------------------- |
| GitHub org + repo  | GiaFoundation                    | Done                          |
| Vercel project     | Foundation-owned Vercel team     | To do                         |
| Domain + DNS       | Foundation                       | To do                         |
| Stripe             | Foundation                       | To do                         |
| Email              | Foundation-controlled address    | Temporary Gmail in use        |

The account that controls these can redirect donation money. It needs a strong
unique password and two-factor authentication before anything financial is
connected to it.

---

## Handing off

A future developer should be able to take over with nothing but this repository
and the account list above. To keep that true:

- Document any new service in this README as it is added.
- Keep `.env.example` current — it is the list of everything the site needs.
- Do not create infrastructure only one person can access.
