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
  // For the detail page: transactional case shows 4 email mockups
  galleryKind?: "channels" | "transactional" | "none";
  transactionalEmails?: { src: string; label: string; subject: string }[];
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

const tourismPhases: Phase[] = [
  {
    num: "01",
    title: "Trip planning",
    desc:
      "Research and inspiration. The user is comparing destinations and dates — pre-event upsell opens.",
    channels: ["Email", "In-app"],
    sample: {
      label: "Discover",
      text: "Plan your weekend in Madrid — dates, neighborhoods, must-sees.",
    },
  },
  {
    num: "02",
    title: "Purchase",
    desc:
      "Booking moment — match origin to destination, lead time to inventory. Cross-sell shows in-cart.",
    channels: ["Email"],
    sample: {
      label: "Confirmation",
      text: "Your Madrid trip is booked. Want to add Candlelight while you're here?",
    },
  },
  {
    num: "03",
    title: "Travel",
    desc:
      "Journey to the city — pre-arrival comms with practical info and local activities offer.",
    channels: ["Email", "Push"],
    sample: {
      label: "Almost there",
      text: "Madrid in 24h. We've handpicked tonight's experiences for you.",
    },
  },
  {
    num: "04",
    title: "Event",
    desc:
      "The live experience — reminders, QR access, last-minute info. Loyalty path opens.",
    channels: ["Email", "Push"],
    sample: {
      label: "Tonight",
      text: "Your Candlelight experience starts at 19:30. Doors at 19:00.",
    },
  },
  {
    num: "05",
    title: "City stay",
    desc:
      "Extended visit — local activities, loyalty hooks and next-event teasers to extend the trip.",
    channels: ["Email"],
    sample: {
      label: "While you're here",
      text: "You've got 2 nights left. 3 experiences open in your area.",
    },
  },
  {
    num: "06",
    title: "Re-engage",
    desc:
      "Months later, bring the user back — fresh trips, saved cities and a reminder the door is still open.",
    channels: ["Email", "Push"],
    sample: {
      label: "Plan your next",
      text: "Your saved cities just dropped 12 new experiences. Time to pack again?",
    },
  },
];

const transactionalPhases: Phase[] = [
  {
    num: "01",
    title: "Abandoned cart",
    desc:
      "Users who dropped at checkout get pulled back with the right context — same event, same city, easier path.",
    channels: ["Email"],
    sample: {
      label: "Reminder",
      text: "Your next great experience awaits — Broadway Sings Taylor Swift.",
    },
  },
  {
    num: "02",
    title: "Purchase confirmation",
    desc:
      "The order lands. The receipt becomes the product surface — wallet, referrals, transfers and cross-sell, all inline.",
    channels: ["Email"],
    sample: {
      label: "Confirmation",
      text: "Your tickets for Candlelight: Tributo ai Queen are ready.",
    },
  },
  {
    num: "03",
    title: "Pre-event reminder",
    desc:
      "Hours before the show: ticket QR, time, address, last instructions. Calm, useful, no friction.",
    channels: ["Email", "Push"],
    sample: {
      label: "Tomorrow",
      text: "It's coming soon — Van Gogh: The Immersive Experience tomorrow at 5:00 PM.",
    },
  },
  {
    num: "04",
    title: "Post-event review",
    desc:
      "Hours after: rate the experience, share photos, surface what to book next. Loop the lifecycle back into the CRM.",
    channels: ["Email"],
    sample: {
      label: "Rate",
      text: "How was Candlelight: A Tribute to Coldplay? Tap to rate.",
    },
  },
];

export const projects: ProjectDetail[] = [
  {
    slug: "event-lifecycle-automation",
    num: "01",
    title: "Event Lifecycle: design, build & automation at scale",
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
    slug: "transactional-comms-redesign",
    num: "02",
    title: "Transactional Comms: design, build & Product Integration",
    company: "Transactional · Product × CRM",
    year: "'24",
    shortDesc:
      "End-to-end redesign of the four highest-traffic transactional emails — purchase confirmation, abandoned cart, pre-event reminder and post-event review — turning each into a product surface.",
    longDesc:
      "A full overhaul of the post-purchase lifecycle: every transactional touch-point — confirmation, recovery, reminder and review — was rebuilt as a product surface. Bookings can be edited, tickets transferred, referrals shared, and the next experience teased before the user ever leaves the inbox.",
    role: "CRM × Product · Lifecycle integration",
    tools: ["SFMC", "AMPscript", "Apple Wallet APIs", "SQL", "Figma"],
    timeline: "6 months",
    challenge:
      "Transactional emails were underutilized and misaligned with product capabilities and revenue opportunities — no personalization, no brand, no cross-sell. Each email was a dead end instead of a doorway back into the product.",
    solution: [
      "Abandoned cart — context-aware recovery with the same event in their city",
      "Purchase confirmation — wallet, referral, ticket transfer and cross-sell inline",
      "Pre-event reminder — QR ticket, time, address and last instructions",
      "Post-event review — rate, share photos, surface what to book next",
    ],
    outcome: [
      "Repeat purchase lift across the post-purchase journey",
      "Stronger product × CRM alignment",
      "New revenue surfaces in previously \"functional\" emails",
    ],
    thumb: "/work-samples/08-purchase-candlelight.png",
    visualKind: "lifecycle",
    phases: transactionalPhases,
    galleryKind: "transactional",
    transactionalEmails: [
      {
        src: "/work-samples/15-abandoned-cart.png",
        label: "Abandoned cart",
        subject: "Fever · Your next great experience awaits",
      },
      {
        src: "/work-samples/08-purchase-candlelight.png",
        label: "Purchase confirmation",
        subject: "Candlelight · Tickets confirmed",
      },
      {
        src: "/work-samples/16-reminder-qr.png",
        label: "Pre-event reminder",
        subject: "Van Gogh · It's coming soon",
      },
      {
        src: "/work-samples/17-reviews-candlelight.png",
        label: "Post-event review",
        subject: "Candlelight · Rate your experience",
      },
    ],
    gallery: [
      { src: "/work-samples/15-abandoned-cart.png", alt: "Abandoned cart recovery" },
      { src: "/work-samples/08-purchase-candlelight.png", alt: "Candlelight purchase confirmation" },
      { src: "/work-samples/16-reminder-qr.png", alt: "Van Gogh pre-event reminder with QR" },
      { src: "/work-samples/17-reviews-candlelight.png", alt: "Candlelight post-event review" },
    ],
  },
  {
    slug: "tourism-lifecycle",
    num: "03",
    title: "New Business Vertical (Tourism): Lifecycle design & build",
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
    visualKind: "lifecycle",
    phases: tourismPhases,
    galleryKind: "none",
    gallery: [],
  },
  {
    slug: "content-cards",
    num: "04",
    title: "In-product Notifications: multi-channel strategy",
    company: "In-product · Notifications",
    year: "'25",
    shortDesc:
      "An always-on owned channel inside the app, the product and the web — content cards, in-app messages and in-product nudges in multiple sizes, all driven by the same CRM segmentation as email.",
    longDesc:
      "Email reach plateaued for time-sensitive launches. The app, the product and the web had captive audiences but no CRM-driven surfaces to activate them in real time. Solution: a notification system across in-app cards, in-product messages and web prompts of multiple sizes, all sharing audiences and triggers with the email program.",
    role: "CRM × Product · In-product activation",
    tools: ["Braze", "SDK integration", "SQL", "SFMC", "Figma"],
    timeline: "Ongoing — multiple surfaces",
    challenge:
      "Email reach plateaued for time-sensitive launches. The app, the product and the web had captive audiences but no CRM-driven surfaces to activate them in real time.",
    solution: [
      "Content Cards delivered through the app + web SDK",
      "Multiple in-product sizes — small banner, medium card, full takeover",
      "Shared segmentation logic with email (SQL + SFMC)",
      "Editorial calendar synced across email, push, in-app and web",
    ],
    outcome: [
      "New always-on owned channel",
      "Higher reach on launch announcements",
      "Multiple in-product surfaces for any launch context",
    ],
    thumb: "/magnific/notifications-panel.png",
    thumbDark: true,
    gallery: [
      { src: "/magnific/notifications-panel.png", alt: "Magnific notification panel — full feed", dark: true },
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
