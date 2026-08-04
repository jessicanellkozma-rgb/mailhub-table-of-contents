import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { TableOfContents } from "@/components/TableOfContents";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shipping Cost Guide for Ecommerce | Mailhub Blog" },
      {
        name: "description",
        content:
          "Compare USPS, UPS and FedEx rates, understand dimensional weight, and find the cheapest carrier for every package size.",
      },
      {
        property: "og:title",
        content: "Shipping Cost Guide for Ecommerce | Mailhub Blog",
      },
      {
        property: "og:description",
        content:
          "Compare USPS, UPS and FedEx rates, understand dimensional weight, and find the cheapest carrier for every package size.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

const sections = [
  {
    title: "Why shipping costs are unpredictable",
    body: [
      "Carrier pricing is not one number. It is a stack of base rates, zone multipliers, fuel surcharges and accessorial fees that each move on their own schedule.",
      "For a B2B seller shipping a few hundred parcels a week, that stack means the same box to the same zone can cost meaningfully different amounts across two consecutive months.",
    ],
  },
  {
    title: "USPS vs UPS vs FedEx: when each wins",
    body: [
      "USPS tends to win on lightweight parcels under one pound and on residential delivery in rural zones, where the last mile is already covered by an existing route.",
      "UPS and FedEx win on heavier freight, guaranteed transit windows and commercial addresses where negotiated tier discounts apply.",
    ],
  },
  {
    title: "How dimensional weight changes the math",
    body: [
      "Dimensional weight prices the space a package occupies rather than its mass. Divide length by width by height by the carrier divisor, then compare that number to actual weight.",
      "Whichever is higher becomes billable weight. For light, bulky goods this single rule is usually the largest line item on the invoice.",
    ],
  },
  {
    title: "The cheapest option by package size",
    body: [
      "Under 1 lb: USPS Ground Advantage is normally the floor. Between 1 and 5 lbs the answer depends heavily on zone and on your negotiated rate card.",
      "Above 10 lbs, regional carriers and UPS Ground usually separate from the pack, especially on commercial delivery.",
    ],
  },
  {
    title: "When to switch carriers",
    body: [
      "Switch when your mix changes, not when a rate changes. A shift in average package dimensions or destination zones affects total spend far more than an annual general rate increase.",
      "Review quarterly, model your actual shipment history against each rate card, and only then renegotiate.",
    ],
  },
];

function ArticlePage() {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Mailhub
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Shipping operations
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            What ecommerce shipping actually costs in 2026
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            A practical breakdown of carrier pricing, dimensional weight and the
            point at which switching carriers pays for itself.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)_260px]">
          <aside className="lg:col-start-1">
            <TableOfContents containerRef={bodyRef} />
          </aside>

          <article ref={bodyRef} className="max-w-2xl">
            {sections.map((section) => (
              <section key={section.title} className="mb-12">
                <h2 className="mb-4 text-2xl font-bold leading-snug">
                  {section.title}
                </h2>
                {section.body.map((p) => (
                  <p key={p} className="mb-4 text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 border border-border bg-secondary p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Mailhub
              </p>
              <p className="mt-2 text-sm font-bold">
                See your true cost per parcel
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Rate-shop every carrier from one dashboard.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
