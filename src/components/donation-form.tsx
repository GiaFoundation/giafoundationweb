"use client";

import { useState } from "react";
import { donationAmounts } from "@/content/site";
import { Button } from "@/components/ui";

type Frequency = "one-time" | "monthly";

export function DonationForm() {
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = custom.trim() === "" ? amount : Number(custom);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!Number.isInteger(effectiveAmount) || effectiveAmount < 1) {
      setError("Please enter a whole dollar amount of $1 or more.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: effectiveAmount, frequency }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setPending(false);
        return;
      }

      // Hand off to Stripe's hosted checkout — card details never reach us.
      window.location.href = data.url;
    } catch {
      setError("We could not reach the donation service. Please try again.");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-paper p-7"
    >
      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Frequency
        </legend>
        <div className="mt-3 inline-flex rounded-full border border-ink/15 p-1">
          {(["one-time", "monthly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFrequency(option)}
              aria-pressed={frequency === option}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                frequency === option
                  ? "bg-forest-700 text-paper"
                  : "text-muted hover:text-ink"
              }`}
            >
              {option === "one-time" ? "One time" : "Monthly"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Amount
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {donationAmounts.map((value) => {
            const selected = custom.trim() === "" && amount === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustom("");
                }}
                aria-pressed={selected}
                className={`rounded-xl border px-4 py-3 text-lg font-semibold transition-colors ${
                  selected
                    ? "border-forest-700 bg-forest-50 text-forest-700"
                    : "border-ink/15 hover:border-ink/40"
                }`}
              >
                ${value}
              </button>
            );
          })}
        </div>

        <label className="mt-4 block">
          <span className="text-sm text-muted">Or another amount</span>
          <div className="mt-1.5 flex items-center rounded-xl border border-ink/15 px-4 focus-within:border-forest-700">
            <span aria-hidden className="text-lg text-muted">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              placeholder="Other"
              aria-label="Custom donation amount in US dollars"
              className="w-full bg-transparent px-2 py-3 text-lg outline-none"
            />
          </div>
        </label>
      </fieldset>

      {error ? (
        <p role="alert" className="mt-6 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="mt-8 w-full">
        {pending
          ? "Redirecting to secure checkout…"
          : frequency === "monthly"
            ? `Give $${Number.isFinite(effectiveAmount) ? effectiveAmount : 0} monthly`
            : `Donate $${Number.isFinite(effectiveAmount) ? effectiveAmount : 0}`}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Payments are processed securely by Stripe. Card details are entered on
        Stripe&apos;s page and are never stored by this website.
      </p>
    </form>
  );
}
