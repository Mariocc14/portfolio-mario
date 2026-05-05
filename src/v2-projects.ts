// Project data for /v2 — used by both the list page and project detail pages.

export type PhaseArtifact = {
  channel: "email" | "push" | "whatsapp" | "in-app";
  title: string;
  body: string;
  meta?: string;
  cta?: string;
};

export type Phase = {
  num: string;
  title: string;
  desc: string;
  channels: string[];
  sample: { label: string; text: string };
  artifacts?: PhaseArtifact[];
};

export type ProjectDetail = {
  slug: string;
  num: string;
  title: string;
  company: string;
  year: string;
  shortDesc: string;
  longDesc: string;
  role: string;
  tools: string[];
  timeline: string;
  challenge: string;
  solution: string[];
  outcome: string[];
  thumb: string;
  thumbDark?: boolean;
  gallery: { src: string; alt: string; dark?: boolean }[];
  // Optional custom visual instead of the mockup row
  visualKind?: "lifecycle";
  phases?: Phase[];
};

const lifecyclePhases: Phase[] = [
  {
    num: "01",
    title: "Waitlist launch",
    desc:
      "Capture interest the moment the event is announced. The audience starts forming before tickets exist.",
    channels: ["Email", "In-app"],
    sample: {
      label: "Welcome",
      text: "Thanks for joining the waitlist. You'll be the first to know.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Welcome",
        title: "You're on the waitlist",
        body: "Thanks for joining. You'll be the first to know when tickets go live in your city.",
        cta: "Set reminders",
      },
      {
        channel: "in-app",
        meta: "In-app · Saved",
        title: "Saved to your list",
        body: "We'll send you a heads-up the moment this experience drops.",
        cta: "View list",
      },
    ],
  },
  {
    num: "02",
    title: "Pre-launch expectation",
    desc:
      "Build expectation in the days before tickets drop. Warm the audience so the launch lands hot.",
    channels: ["Email", "Push"],
    sample: {
      label: "Heads up",
      text: "Tickets drop tomorrow — your early access starts at 09:00.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Tomorrow",
        title: "Tickets drop in 24h",
        body: "Your waitlist priority means you get a 60-minute window before the rest.",
        cta: "Add to calendar",
      },
      {
        channel: "push",
        meta: "Fever · 1h ago",
        title: "Heads up — pre-sale opens at 09:00",
        body: "Set a reminder. You'll have a 60-minute jump on everyone else.",
      },
    ],
  },
  {
    num: "03",
    title: "Sales launch",
    desc:
      "Open the gates to the broader audience. Pre-warmed segments convert at higher rates than cold sends.",
    channels: ["Email", "Push", "WhatsApp"],
    sample: {
      label: "Tickets live",
      text: "Tickets are live for every city. Pick your night.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Live now",
        title: "Tickets are live",
        body: "Pick your night across every city. Pre-warmed seats, pre-saved dates.",
        cta: "Book now",
      },
      {
        channel: "push",
        meta: "Fever · Just now",
        title: "Tickets just dropped",
        body: "Your waitlist link is open for the next 60 minutes.",
      },
      {
        channel: "whatsapp",
        meta: "Fever · WhatsApp",
        title: "Hey 👋",
        body: "Tickets for Candlelight in Madrid just went live. Want me to send you the link?",
      },
    ],
  },
  {
    num: "04",
    title: "Open gates",
    desc:
      "Inventory opens to all markets and segments after waitlist and pre-sale phases run their course.",
    channels: ["Email", "In-app"],
    sample: {
      label: "Now public",
      text: "Doors are open — book yours before they close.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Now public",
        title: "Doors are open",
        body: "Tickets are now public for every city. Find your night before they close.",
        cta: "Browse dates",
      },
      {
        channel: "in-app",
        meta: "In-app · Featured",
        title: "Just opened — book yours",
        body: "Tickets for the most-saved experiences this week are live.",
        cta: "View all",
      },
    ],
  },
  {
    num: "05",
    title: "Date extension",
    desc:
      "When demand extends, new dates reactivate the existing audience with zero friction — one journey, repeatable.",
    channels: ["Email", "Push"],
    sample: {
      label: "Announcement",
      text: "More dates just added — pick your evening.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Just added",
        title: "More dates just added",
        body: "Pick your evening — three new shows just announced for Madrid.",
        cta: "See new dates",
      },
      {
        channel: "push",
        meta: "Fever · 9m ago",
        title: "✨ More dates just added",
        body: "Pick your evening — your saved city has 3 new shows.",
      },
    ],
  },
  {
    num: "06",
    title: "FOMO last days",
    desc:
      "Final-days messaging tuned to convert hesitant users — scarcity, social proof and a clear deadline.",
    channels: ["Email", "Push", "WhatsApp"],
    sample: {
      label: "Closing soon",
      text: "Only a handful of seats left — closing this Friday.",
    },
    artifacts: [
      {
        channel: "email",
        meta: "Fever · Closing Friday",
        title: "Closing this Friday",
        body: "Only a handful of seats left across all cities. Last call before the run ends.",
        cta: "Grab the last seats",
      },
      {
        channel: "push",
        meta: "Fever · 1h ago",
        title: "⏳ Closing soon — final seats",
        body: "Only 12 seats left in Madrid. Final 48h.",
      },
      {
        channel: "whatsapp",
        meta: "Fever · WhatsApp",
        title: "Last call",
        body: "Closing this Friday — only a handful of seats left in Madrid. Want yours?",
      },
    ],
  },
];

export const projects: ProjectDetail[] = [
  {
    slug: "event-lifecycle-automation",
    num: "01",
    title: "Event Lifecycle Design & Automation at Scale",
    company: "Lifecycle Design · SFMC",
    year: "'23",
    shortDesc:
      "Event communication was fragmented and dependent on manual execution. Built a six-phase lifecycle — waitlist, pre-launch, launch, open gates, date extension and FOMO — fully automated in SFMC.",
    longDesc:
      "Later fully automated in Salesforce Marketing Cloud with dynamic templates and reusable journey structures adapting to city, event and engagement.",
    role: "CRM Lead · Lifecycle strategy & delivery",
    tools: ["SFMC", "Journey Builder", "AMPscript", "SQL", "Looker"],
    timeline: "Ongoing — multiple launches",
    challenge:
      "Event communication was fragmented and heavily dependent on manual execution. Scalability across cities was limited and consistency suffered, especially during high-demand launches.",
    solution: [
      "Waitlist acquisition and audience building",
      "Pre-launch expectation campaigns",
      "Launch communications and \"open gates\" activation",
      "Date extensions and FOMO-driven re-engagement",
    ],
    outcome: [
      "~60% faster campaign setup",
      "Global rollout across cities and verticals",
      "Consistent UX across every launch",
    ],
    thumb: "/work-samples/01-event-cabaret.png",
    thumbDark: true,
    visualKind: "lifecycle",
    phases: lifecyclePhases,
    gallery: [
      { src: "/work-samples/01-event-cabaret.png", alt: "Cabaret event email", dark: true },
      { src: "/work-samples/02-event-neon.png", alt: "Neon event email", dark: true },
      { src: "/work-samples/03-event-jury.png", alt: "Jury event launch", dark: true },
      { src: "/work-samples/04-event-wcib.png", alt: "WCIB event email", dark: true },
      { src: "/work-samples/05-event-ditd.png", alt: "DITD event email", dark: true },
    ],
  },
  {
    slug: "lifecycle-automation",
    num: "02",
    title: "Lifecycle Automation System",
    company: "Fever",
    year: "'23",
    shortDesc:
      "Reusable SFMC journeys, AMPscript dynamic content and SQL-driven audiences — cutting ~50% of manual campaign work.",
    longDesc:
      "An end-to-end automation system that took Fever's lifecycle program from a calendar of one-off campaigns to a portfolio of versioned, reusable journeys. The shift unlocked faster launches, deeper personalization and a CRM team that finally had time to optimize.",
    role: "CRM Specialist · Lifecycle architect",
    tools: ["Salesforce Marketing Cloud", "Journey Builder", "Automation Studio", "AMPscript", "SQL", "Content Builder"],
    timeline: "12 months",
    challenge:
      "Manual campaign execution became unsustainable as the number of events and markets grew. Scaling without multiplying operational complexity was the brief.",
    solution: [
      "Reusable journeys designed and versioned in SFMC",
      "Dynamic content powered by AMPscript at render time",
      "Audience segmentation via SQL + Automation Studio",
      "Modular campaign structures adaptable across markets",
    ],
    outcome: [
      "~50% reduction in manual campaign setup time",
      "Faster expansion across new markets",
      "More personalization per send, less ops overhead",
    ],
    thumb: "/work-samples/06-onboarding-email.png",
    gallery: [
      { src: "/work-samples/06-onboarding-email.png", alt: "Onboarding email — dynamic content per market" },
      { src: "/work-samples/12-newsletter-movies.png", alt: "Automated cinema newsletter", dark: true },
      { src: "/work-samples/10-churn-winback.png", alt: "Churn re-engagement flow" },
    ],
  },
  {
    slug: "purchase-confirmation",
    num: "03",
    title: "Purchase Confirmation Redesign",
    company: "Fever",
    year: "'24",
    shortDesc:
      "Transactional emails turned into product surfaces — flexible booking, Apple Wallet, referrals and cross-sell entry points.",
    longDesc:
      "A redesign of the highest-traffic emails in Fever's lifecycle. Every confirmation became a product surface — bookings could be edited, tickets transferred, friends invited, and the next experience teased before the user ever left their inbox.",
    role: "CRM × Product · Lifecycle integration",
    tools: ["SFMC", "AMPscript", "Apple Wallet APIs", "SQL", "Figma"],
    timeline: "4 months",
    challenge:
      "Transactional emails were underutilized and misaligned with product capabilities and revenue opportunities — no personalization, no brand, no cross-sell.",
    solution: [
      "Flexible booking (date / time changes) embedded in the email",
      "Ticket transfers and Apple Wallet integration",
      "Referral programs wired into the confirmation flow",
      "Cross-sell and repeat-purchase entry points contextual to the event type",
    ],
    outcome: [
      "Repeat purchase lift",
      "Stronger product × CRM alignment",
      "New revenue surface in a previously \"functional\" email",
    ],
    thumb: "/work-samples/08-purchase-candlelight.png",
    gallery: [
      { src: "/work-samples/08-purchase-candlelight.png", alt: "Candlelight purchase confirmation" },
      { src: "/work-samples/14-giftcard.png", alt: "Gift card confirmation redesign" },
      { src: "/work-samples/09-reminder-qr.png", alt: "Event reminder with QR ticket" },
    ],
  },
  {
    slug: "tourism-lifecycle",
    num: "04",
    title: "Tourism Lifecycle Strategy",
    company: "Fever",
    year: "'24",
    shortDesc:
      "Lifecycle built from scratch for a new tourism vertical. Pre-trip, in-trip and post-trip stages with re-purchase moments along the way.",
    longDesc:
      "A new tourism vertical at Fever needed a lifecycle program from zero. The strategy mapped travel behavior, booking lead time and origin-vs-destination dynamics into a journey with five stages and re-purchase opportunities at every transition.",
    role: "Lifecycle Strategist",
    tools: ["SFMC", "Journey Builder", "SQL", "Looker", "Figma"],
    timeline: "3 months",
    challenge:
      "A new tourism vertical launch required a lifecycle strategy built from scratch — adapted to travel behavior, booking lead time and origin-vs-destination dynamics.",
    solution: [
      "Pre-trip, in-trip and post-trip lifecycle stages",
      "Digital benchmarking of competitors plus on-site research",
      "Campaigns optimized per stage, timing and messaging",
      "Re-purchase opportunities surfaced between every stage transition",
    ],
    outcome: [
      "New vertical launched on schedule",
      "Repeat + cross-sell opportunities surfaced across the journey",
      "Lifecycle playbook reusable for future verticals",
    ],
    thumb: "/work-samples/13-reactivation-bridgerton.png",
    thumbDark: true,
    gallery: [
      { src: "/work-samples/13-reactivation-bridgerton.png", alt: "Reactivation — Candlelight Bridgerton", dark: true },
      { src: "/work-samples/09-reminder-qr.png", alt: "Pre-trip reminder" },
      { src: "/work-samples/08-purchase-candlelight.png", alt: "Purchase confirmation — tourism" },
    ],
  },
  {
    slug: "content-cards",
    num: "05",
    title: "In-app Content Cards",
    company: "Magnific",
    year: "'25",
    shortDesc:
      "Always-on owned channel inside the app via Braze SDK. Same SQL + SFMC segmentation as email, modular templates, editorial calendar synced.",
    longDesc:
      "Email reach plateaued for time-sensitive launches. The app had a captive audience but no CRM-driven surface to activate it in real time. Solution: Braze Content Cards delivered through the app SDK, sharing every audience and trigger with the email program.",
    role: "CRM × Product · In-app activation",
    tools: ["Braze", "SDK integration", "SQL", "SFMC", "Figma"],
    timeline: "2 months",
    challenge:
      "Email reach plateaued for time-sensitive launches. The app had a captive audience but no CRM-driven surface to activate it in real time.",
    solution: [
      "Braze Content Cards delivered through the app SDK",
      "Shared segmentation logic with email (SQL + SFMC)",
      "Modular templates: image · headline · body · deep-link",
      "Editorial calendar synced across email, push and in-app",
    ],
    outcome: [
      "New always-on owned channel",
      "Higher reach on launch announcements",
      "Cross-vertical promotion at zero send cost",
    ],
    thumb: "/magnific/notifications-panel.png",
    thumbDark: true,
    gallery: [
      { src: "/magnific/notifications-panel.png", alt: "Notification panel — full feed", dark: true },
      { src: "/magnific/freepik-magnific.png", alt: "Freepik is now Magnific" },
      { src: "/magnific/kling-3-4k.png", alt: "Kling 3.0 4K announcement" },
      { src: "/magnific/gpt-2.png", alt: "GPT 2 announcement" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNeighbours(slug: string): { prev?: ProjectDetail; next?: ProjectDetail } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
