# Mailhub Table of contents 

Build a single reusable React component called TableOfContents for Mailhub, a B2B ecommerce shipping software platform. Used only on the Blog article template, sits as the sticky left sidebar in the three-column desktop layout (left sidebar TOC, center article content, right sidebar CTA widget).

BRAND CONTEXT (Mailhub brand guide):

- Egyptian Blue #38369A (primary)

- Cornflower Blue #768FEC (accent)

- Carbon Black #282520 (text)

- White Smoke #F4F4F2 (backgrounds)

Structured, dependable, quietly confident, never decorative.

SEAN'S WIREFRAME SPEC:

Label: "On this page." Fully automated, parses H2s on page load, generates numbered anchor links with smooth scroll. Active item highlighted with indigo left border. Zero CMS maintenance. Sticky on desktop scroll. On mobile, collapses to an accordion above the body.

CORE FUNCTIONALITY (this is different from other components, it's not driven by content props, it's driven by the actual page DOM):

1. On mount, scan the article's body content area for all H2 elements

2. Generate a numbered list of anchor links from each H2's text content, linking to that H2's id (auto-generate an id/slug from the heading text if one doesn't already exist)

3. Implement smooth-scroll behavior when a TOC item is clicked, scrolls to the corresponding H2

4. Track scroll position and highlight whichever TOC item corresponds to the H2 currently in view (active state), using an IntersectionObserver or scroll-position comparison, not a hardcoded active index

5. This needs zero manual maintenance, if an article has 4 H2s or 7 H2s, the component adapts automatically, don't hardcode a fixed number of items

REAL COPY TO TEST WITH (since this is auto-generated, build a test article body with these H2s to verify the component works):

H2 1: "Why shipping costs are unpredictable"

H2 2: "USPS vs UPS vs FedEx: when each wins"

H2 3: "How dimensional weight changes the math"

H2 4: "The cheapest option by package size"

H2 5: "When to switch carriers"

TYPOGRAPHY (exact classes from brand guide):

- Label ("On this page"): Mulish Regular, micro/overline class (11px), uppercase, muted

- TOC item text: Mulish Regular, text-sm class (14px)

- Active item: same size, but Carbon Black #282520 (or Egyptian Blue) and bold weight, versus muted gray for inactive items

STRUCTURE:

1. Small label "On this page" at top

2. Numbered list of anchor links, one per H2, each with a left border indicator

3. Active item: solid Cornflower Blue #768FEC left border (per Sean's "indigo left border" spec), text becomes darker/bolder

4. Inactive items: no border or a very subtle neutral border, muted text

STICKY BEHAVIOR:

- Desktop: sticky positioned, stays visible in the left sidebar as the user scrolls through the article, standard CSS position: sticky with an appropriate top offset

- Mobile: this sidebar doesn't exist as a sidebar, per Sean's spec it collapses into an accordion that sits above the article body, collapsed by default, user can tap to expand and see the same numbered list, tapping a link still smooth-scrolls and then can auto-collapse

PROPS / REUSABILITY:

This component should accept a ref or selector to the article body content area, so it can scan that specific container's H2s rather than the whole page (in case other H2s exist elsewhere on the page, like the FAQ component's questions, which should NOT appear in the TOC). Also accept a `label` prop (default "On this page") in case a variant page ever wants different wording.

WHAT TO AVOID:

No gradients, shadows, or decorative effects. Don't hardcode the TOC items, list length and content must come from the live DOM scan, this is a functional/automated component, not a static content component like most of what we've built today. Don't skip the active-state scroll tracking, that's the actual functional payoff of this component per Sean's spec.

Build this with a test article using the 5 H2s above so I can confirm the auto-generation, smooth scroll, and active-state highlighting all work correctly before we move to the sticky CTA widget component next to it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8017ebd1-97c7-4121-a93e-ef92d9fcc59e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
