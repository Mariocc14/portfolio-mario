// Downloadable resources — content for /resources index + /resources/<slug>.
// Add a new entry to the `resources` array and it shows up automatically.

export type ResourceBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attr?: string };

export type Resource = {
  slug: string;
  title: string;
  subtitle: string;
  language: "es" | "en";
  category: string;
  /** Omitted when the article has no downloadable companion; the download UI hides. */
  format?: "PDF" | "Notion";
  readingTime: string;
  body: ResourceBlock[];
  /** ISO dates for Article structured data. Freshness is a real citation signal. */
  datePublished?: string;
  dateModified?: string;
  /** Path or URL the user lands on after the lead form is submitted. */
  downloadHref?: string;
  /** Filename suggested when the browser saves it (PDF only). */
  downloadFilename?: string;
};

export const resources: Resource[] = [
  {
    slug: "domain-warm-up",
    title: "How to warm up a sending domain properly",
    subtitle:
      "Why it matters, what to do in the first four weeks, and the mistakes that cost you months to undo.",
    language: "en",
    category: "Email Deliverability",
    format: "PDF",
    readingTime: "4 min",
    datePublished: "2026-06-16",
    dateModified: "2026-08-29",
    // The PDF itself is still the original Spanish file.
    downloadHref: "/resources/warm-up-de-dominio.pdf",
    downloadFilename: "domain-warm-up-mario-calvo.pdf",
    body: [
      {
        type: "p",
        text:
          "When you start sending from a new domain, the mailbox providers — Gmail, Outlook, Yahoo — have never heard of you. They have no way of knowing whether you are a legitimate sender or a spammer. Without a proper warm-up your campaigns land in spam, your sender reputation sinks, and worse, your transactional mail starts getting blocked too: order confirmations, password resets, reminders.",
      },
      {
        type: "p",
        text:
          "A warm-up is the process of building that reputation gradually. It is not optional. It is the difference between years of good deliverability and months spent digging yourself out.",
      },
      { type: "h2", text: "Why it matters" },
      {
        type: "ul",
        items: [
          "Sender reputation. Mailbox providers keep a score per domain and per IP. It climbs slowly on good behaviour and drops fast on bad. Once you land on a blocklist like Spamhaus, getting off it takes weeks and structural changes, not an apology.",
          "Engagement is the primary signal. Gmail watches what share of your mail gets opened, replied to or marked as spam in the first few minutes. If your first send of 5,000 emails only gets a 5% open rate, the algorithm reads that as spam.",
          "It protects your transactional mail. If marketing and transactional share a domain with no separation, a reputation hit on marketing drags transactional down with it. That means unconfirmed orders, password resets that never arrive, and a direct support cost.",
        ],
      },
      { type: "h2", text: "The four-week framework" },
      {
        type: "p",
        text:
          "The standard progression for a new domain. Scale the volumes to your list size — what matters is the rate of growth, not the absolute numbers.",
      },
      {
        type: "ul",
        items: [
          "Week 1 — 50 to 200 sends a day, to your most engaged segment only (anyone who interacted in the last 30 days). Targets: open rate above 40%, bounces under 1%, spam complaints under 0.05%.",
          "Week 2 — 500 to 2,000 sends a day. Add a second engagement tier (active in the last 60 days). Keep content quality high.",
          "Week 3 — 5,000 to 10,000 sends a day. Start mixing in lukewarm segments. Check Google Postmaster Tools daily.",
          "Week 4 — Full volume. Watch bounces, spam complaints, open rate and domain reputation. If anything moves, step the volume back down.",
        ],
      },
      { type: "h2", text: "Signals to watch" },
      {
        type: "ul",
        items: [
          "Bounce rate under 2%",
          "Spam complaints under 0.1%",
          "Open rate above 20% throughout the warm-up",
          "Google Postmaster Tools reputation at Medium or High, never Low",
          "Inbox placement above 85% (GlockApps or a similar seed test)",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Starting at full volume. This is mistake number one. It kills a domain in 48 hours.",
          "Sending to an old list without cleaning it. If you have not sent in six months, verify it first (Kickbox, NeverBounce). Every hard bounce damages reputation.",
          "SPF, DKIM and DMARC not set up correctly. Without them, mailbox providers treat you as suspicious by default.",
          "Mixing transactional and marketing on the same subdomain. Split them: mail.yourdomain.com for marketing, notifications.yourdomain.com for transactional.",
          "Ignoring Postmaster Tools. It is free and it is Google's own data. Skip it and you are flying blind.",
        ],
      },
      {
        type: "quote",
        text:
          "A warm-up done right is four weeks of patience. Done wrong it is months of recovery, plus the revenue lost to blocked transactional mail.",
      },
    ],
  },
  {
    slug: "bulk-sender-requirements",
    title: "The bulk sender rules, and what breaks first when you miss them",
    subtitle:
      "Gmail and Outlook now enforce authentication and complaint thresholds on anyone sending at volume. The exact requirements, the real numbers, and the order things fail in.",
    language: "en",
    category: "Email Deliverability",
    readingTime: "6 min",
    datePublished: "2026-08-29",
    dateModified: "2026-08-29",
    body: [
      {
        type: "p",
        text:
          "For years, sending requirements were guidance. They are now enforcement. If you send at volume to Gmail or Outlook and your authentication is incomplete, your mail does not land in spam — it gets refused at the door, and your recipients never know it existed.",
      },
      {
        type: "p",
        text:
          "The frustrating part is that almost none of this is about your content. It is DNS records and headers, most of it a half-day of work, and it is the difference between a programme that delivers and one that quietly stops.",
      },
      { type: "h2", text: "Whether this applies to you" },
      {
        type: "ul",
        items: [
          "Google: since 1 February 2024, senders of more than 5,000 messages a day to Gmail personal accounts have to meet its bulk sender requirements.",
          "Microsoft: a high-volume sender is one sending 5,000 or more messages a day to Microsoft consumer services, counted per domain in the 5322.From address.",
          "The threshold is a floor, not a switch you can drop back below. Treat it as permanent once you cross it, and assume every provider trends this way.",
        ],
      },
      {
        type: "p",
        text:
          "Note what is being counted: messages per day, to personal inboxes, per sending domain. A B2B programme sending to company mailboxes may be under the line today and over it the moment a campaign goes out to a consumer list.",
      },
      { type: "h2", text: "What is actually required" },
      {
        type: "ul",
        items: [
          "SPF and DKIM on the sending domain, both passing. Not one of the two — both.",
          "A published DMARC record. The policy can be p=none; you do not have to quarantine or reject to be compliant, you have to have the record.",
          "Alignment: the domain in the visible From: header must align with either the SPF domain or the DKIM domain. This is the requirement most people fail while believing they pass, because SPF and DKIM can both be green on a domain that is not the one recipients see.",
          "One-click unsubscribe on marketing and subscribed messages — the List-Unsubscribe-Post: List-Unsubscribe=One-Click header alongside a List-Unsubscribe header. Transactional mail is out of scope.",
          "TLS on transmission.",
          "Valid forward and reverse DNS, meaning a PTR record for your sending IPs.",
        ],
      },
      { type: "h2", text: "The numbers that decide it" },
      {
        type: "p",
        text:
          "Google publishes one hard figure: keep the spam rate reported in Postmaster Tools below 0.30%, and never reach it. That is the ceiling, not the target.",
      },
      {
        type: "p",
        text:
          "Run the programme at 0.10%. The gap between the two is your margin for a bad segment, a bought list somebody imported, or a subject line that misfires. Sitting at 0.25% is not compliance with room to spare — it is one campaign away from enforcement, on a metric that reports with a lag.",
      },
      { type: "h2", text: "What failure actually looks like" },
      {
        type: "p",
        text:
          "Microsoft is the clearest example of the shift, because it published the escalation. From 5 May 2025, non-compliant high-volume mail was routed to the Junk folder — a grace period, in effect. It now rejects outright, with a specific bounce:",
      },
      {
        type: "quote",
        text:
          "550 5.7.515 Access denied, sending domain [domain] does not meet the required authentication level.",
      },
      {
        type: "p",
        text:
          "That is the important change. A spam-foldered message still exists and can still be found. A rejected message never arrived, and nothing in your ESP dashboard will look like a content problem — you will see a bounce rate climbing on one provider while everything else looks healthy.",
      },
      { type: "h2", text: "The order things break in" },
      {
        type: "p",
        text:
          "Requirements get published as flat lists, which is not how they fail. In practice it goes like this:",
      },
      {
        type: "ol",
        items: [
          "One provider starts refusing. Usually Outlook first, because its enforcement is the bluntest. Your overall metrics barely move, because that provider is a slice of the list.",
          "Your bounce rate rises on that slice, and reputation damage follows the bounces rather than causing them.",
          "Transactional mail goes with it, if it shares the domain. This is the expensive part: password resets and order confirmations do not get retried by the customer, they get raised as support tickets.",
          "By the time the aggregate numbers look bad enough to investigate, you are recovering reputation rather than protecting it — and that is measured in weeks.",
        ],
      },
      { type: "h2", text: "What to do this week" },
      {
        type: "ul",
        items: [
          "Check alignment, not just authentication. Send yourself a message and confirm the From: domain matches the SPF or DKIM domain. This is where most failures hide.",
          "Publish DMARC at p=none if you have nothing. It is compliant, it is safe, and it starts the reporting you will need before you can ever tighten it.",
          "Open Google Postmaster Tools and look at your actual spam rate. It is free and it is the provider's own number, not your ESP's estimate.",
          "Separate transactional from marketing at the subdomain level, so a marketing reputation problem cannot take your receipts down with it.",
        ],
      },
      {
        type: "quote",
        text:
          "None of this improves a single campaign. All of it decides whether the campaigns you already have arrive at all.",
      },
    ],
  },
  {
    slug: "pre-send-qa-checklist",
    title: "The pre-send QA checklist",
    subtitle:
      "The checks worth running before a campaign goes out — with a bias toward the failures that never show up in a preview.",
    language: "en",
    category: "Lifecycle Operations",
    readingTime: "5 min",
    datePublished: "2026-08-29",
    dateModified: "2026-08-29",
    body: [
      {
        type: "p",
        text:
          "Most pre-send checklists check what is easy to see: typos, the subject line, whether the images load. Those are worth checking and they are almost never what goes wrong.",
      },
      {
        type: "p",
        text:
          "The failures that cost you are the ones that only happen to a subset of the audience — the segment with no first name, the locale nobody proofread, the recipient whose trial ended yesterday. A preview renders one version of the email, usually with your own tidy test profile, and tells you nothing about the other few thousand.",
      },
      {
        type: "p",
        text:
          "This is the list I automated after writing it out enough times. It is ordered by how expensive the failure is, not by how easy the check is.",
      },
      { type: "h2", text: "Copy at the boundaries" },
      {
        type: "ul",
        items: [
          "No unreplaced placeholders anywhere in the final render — the ones that survive are the ones inside conditional blocks nobody triggered.",
          "Every merge field has a fallback, and the fallback reads as a sentence. \"Hi ,\" is the classic, and a stray space before a comma is its fingerprint.",
          "Read every dynamic line with the value at zero. \"You have 0 days left\" is grammatically fine and commercially awful. Either suppress that audience or give the string a zero case.",
          "Read it again with the value absent, which is a different case from zero and usually a different bug.",
        ],
      },
      { type: "h2", text: "Personalisation" },
      {
        type: "ul",
        items: [
          "Render once against a deliberately empty profile — no name, no history, no attributes. This single test catches more than every other check on this list.",
          "Any conditional that switches on a value needs a defined branch for values you did not anticipate, not just the ones you listed.",
          "Confirm that data arriving from a feed or external source is present before the email depends on it, and that the email is still coherent when it is not.",
        ],
      },
      { type: "h2", text: "Localisation" },
      {
        type: "ul",
        items: [
          "Every string exists in every locale you are sending to. A missing translation usually renders as a blank, not as an error.",
          "Every link exists in every locale. Localised copy pointing at an English landing page is a silent conversion leak.",
          "Avoid branching on language inside template logic. Once you have more than a couple of locales it becomes unreviewable, and the platforms have a locale feature precisely so you do not have to.",
        ],
      },
      { type: "h2", text: "Links" },
      {
        type: "ul",
        items: [
          "No placeholder URLs. Not one. A link nobody replaced ships more often than anyone admits.",
          "Every URL has a scheme. A missing https:// resolves relative to the ESP's domain and 404s.",
          "Tracking parameters on every link, or on none of them deliberately. Half-tagged campaigns produce attribution you will argue about for a quarter.",
        ],
      },
      { type: "h2", text: "Rendering" },
      {
        type: "ul",
        items: [
          "Alt text on every image — this is an accessibility requirement and it is also what a third of your audience sees first, because images are blocked by default in several clients.",
          "Explicit width on every image. Without it, Outlook renders the image at its natural size and takes the layout with it.",
          "The content width the template was designed for, actually applied. A 600px design that ships at full bleed looks broken on desktop.",
          "At least one media query, or a layout that genuinely does not need one.",
          "Email-safe CSS only. Whatever your builder allows, the client is the one that decides.",
        ],
      },
      { type: "h2", text: "The one people skip" },
      {
        type: "p",
        text:
          "Check the email against the design that was approved, not against the last version you looked at. Templates drift: a field gets added during build, a block gets duplicated for a test and never removed. Nobody catches it because everyone reviewing the send has been looking at it for a week.",
      },
      { type: "h2", text: "Automate the boring half" },
      {
        type: "p",
        text:
          "Roughly two thirds of this list is mechanical — placeholders, missing translations, link schemes, alt text, image widths, tracking parameters. A script checks those in under a second, every time, without getting tired at 6pm on the day of a launch.",
      },
      {
        type: "p",
        text:
          "What is left is the part that needs judgement: does the zero case read acceptably, is this the right audience, does the fallback sound like a person wrote it. That is where the review time should go, and it is the part a checklist can only prompt, never replace.",
      },
      {
        type: "quote",
        text:
          "A preview shows you one version of the email. Your audience receives all of them.",
      },
    ],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
