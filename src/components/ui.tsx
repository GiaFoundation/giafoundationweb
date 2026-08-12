import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "warm" | "forest";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    warm: "bg-paper-warm text-ink",
    forest: "bg-forest-700 text-paper",
  };

  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${
            invert ? "text-gold-400" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {lede ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-paper/80" : "text-muted"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-ink hover:bg-gold-400 focus-visible:outline-forest-700",
  secondary: "bg-forest-700 text-paper hover:bg-forest-600",
  ghost:
    "border border-current/25 text-current hover:border-current/60 hover:bg-current/5",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${buttonBase} ${buttonStyles[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Prose({
  paragraphs,
  className = "",
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={`space-y-5 text-lg leading-relaxed ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
