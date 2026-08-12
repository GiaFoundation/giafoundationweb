/**
 * Organization-wide facts and navigation.
 *
 * Contact details were carried over from the foundation's previous site.
 * Anything marked TODO still needs to be confirmed by the foundation before launch.
 */

export const site = {
  name: "The GIA Foundation",
  tagline: "Gleaming in Africa",
  shortName: "GIA Foundation",
  description:
    "The GIA Foundation works to end the stigma surrounding disability in Africa — funding education, mobility equipment, research, and advocacy for women with disabilities — while providing free immigration, employment, and resettlement services to immigrant and refugee families in the United States.",
  // TODO: replace once the nonprofit's own domain is purchased and connected.
  url: "https://giafoundationweb.vercel.app",
  contact: {
    email: "info@g-generations.org",
    cellPhone: "(716) 986-2779",
    officePhone: "(404) 468-5348",
    usOffice: {
      label: "Main Office — United States",
      lines: ["260 Village Broad St.", "Dacula, GA 30019"],
    },
    // TODO: the previous site listed an Africa office with no address. Confirm.
    africaOffice: {
      label: "Main Office — Africa",
      lines: [] as string[],
    },
  },
  legal: {
    // TODO: confirm the registered legal name, EIN, and 501(c)(3) determination date.
    status: "A charitable 501(c)(3) organization",
    ein: null as string | null,
  },
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/mission", label: "Our Mission" },
  { href: "/stories", label: "Stories" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Online giving stays switched off until the foundation has created and verified
 * its own Stripe account. See README.md → "Turning on donations".
 */
export const donationsEnabled =
  process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true";

export const donationAmounts = [10, 50, 100, 200] as const;
