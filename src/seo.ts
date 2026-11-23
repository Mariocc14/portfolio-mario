/* Per-route metadata for the prerendered HTML.
   Every page used to ship the same <title> and description, which is what a crawler saw
   for the whole site. This is the single source for both: the prerender writes it into
   the served HTML, and the components set the same document.title at runtime, so a
   client-side render and a crawler read the same thing. */
import { projects } from "./projects";
import { resources } from "./resources";
import { normalisePath } from "./routes";
import { HOME_TITLE, INFO_TITLE, RESOURCES_TITLE } from "./titles";

export const SITE_URL = "https://www.marioclv.com";
export const AUTHOR = "Mario Calvo";
export { HOME_TITLE };

const HOME_DESCRIPTION =
  "CRM & Lifecycle Marketing Consultant. Lifecycle journeys, marketing automation and multichannel CRM for marketplaces, ecommerce and subscription products.";

/** Meta descriptions get truncated in results anyway; cut on a word boundary, not mid-word. */
function clamp(text: string, max = 158): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "") + "…";
}

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  /** Absolute URL, or undefined when the page has no representative image. */
  image?: string;
  ogType: "website" | "article" | "profile";
  lang: string;
  /** JSON-LD objects to embed. Empty when there is nothing truthful to declare. */
  jsonLd: Record<string, unknown>[];
  /** Pages that should not be indexed (the not-found fallbacks). */
  noindex?: boolean;
};

const PERSON_ID = `${SITE_URL}/#person`;

/* One Person entity, referenced by @id from every other block, so search engines and
   AI assistants resolve the site, the case studies and the guides to the same author.
   Everything here is stated somewhere on the site itself: nothing is added that a
   visitor could not read. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/imagen_perfil/mario-avatar.png`,
  jobTitle: "CRM & Lifecycle Marketing Consultant",
  description:
    "CRM and lifecycle marketing consultant based in Spain. Designs and builds lifecycle journeys, marketing automation and multichannel CRM (email, push, in-app) in Salesforce Marketing Cloud and Braze, segmented with SQL.",
  email: "mailto:mariocalvocst@gmail.com",
  address: { "@type": "PostalAddress", addressCountry: "ES" },
  /* Each URL checked by hand: LinkedIn is linked from the site itself, Malt is the
     profile that ranks for the name (same person, CRM & lifecycle, Madrid), GitHub is
     the account the site's own repository lives under. */
  sameAs: [
    "https://www.linkedin.com/in/mariocalvocastillo/",
    "https://www.malt.com/profile/mariocalvocastillo1",
    "https://github.com/Mariocc14",
  ],
  knowsAbout: [
    "CRM",
    "Lifecycle marketing",
    "Marketing automation",
    "Email marketing",
    "Email deliverability",
    "Transactional email",
    "Push notifications",
    "In-app messaging",
    "Customer segmentation",
    "SQL",
    "Salesforce Marketing Cloud",
    "Journey Builder",
    "AMPscript",
    "Braze",
    "Iterable",
    "Odoo",
  ],
};

const authorRef = { "@type": "Person", "@id": PERSON_ID, name: AUTHOR, url: `${SITE_URL}/` };

export function metaForPath(pathname: string): PageMeta {
  const path = normalisePath(pathname);
  const canonical = `${SITE_URL}${path}`;

  if (path === "/") {
    return {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical,
      image: `${SITE_URL}/imagen_perfil/mario-avatar.png`,
      ogType: "website",
      lang: "en",
      jsonLd: [
        personLd,
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: AUTHOR,
          alternateName: HOME_TITLE,
          url: `${SITE_URL}/`,
          inLanguage: "en",
          publisher: { "@id": PERSON_ID },
        },
      ],
    };
  }

  if (path === "/info") {
    return {
      title: INFO_TITLE,
      description:
        "Background, how I work, and what I've built across CRM and lifecycle marketing — from Law to automation, via Fever, Freepik and Magnific.",
      canonical,
      image: `${SITE_URL}/imagen_perfil/mario-avatar.png`,
      ogType: "profile",
      lang: "en",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: canonical,
          name: INFO_TITLE,
          inLanguage: "en",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: personLd,
        },
      ],
    };
  }

  if (path === "/resources") {
    return {
      title: RESOURCES_TITLE,
      description:
        "Practical playbooks and guides on email deliverability, lifecycle automation and CRM × product integrations. Free to read, free to download.",
      canonical,
      ogType: "website",
      lang: "en",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Resources",
          url: canonical,
          inLanguage: "en",
          author: authorRef,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          hasPart: resources.map((r) => ({
            "@type": "Article",
            headline: r.title,
            url: `${SITE_URL}/resources/${r.slug}`,
          })),
        },
      ],
    };
  }

  if (path.startsWith("/resources/")) {
    const slug = path.slice("/resources/".length);
    const r = resources.find((x) => x.slug === slug);
    if (!r) return notFound(canonical, "Resource not found — Mario Calvo");
    return {
      title: `${r.title} — Mario Calvo`,
      description: clamp(r.subtitle),
      canonical,
      ogType: "article",
      lang: r.language,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: r.title,
          description: r.subtitle,
          inLanguage: r.language,
          url: canonical,
          author: authorRef,
          publisher: authorRef,
          ...(r.datePublished ? { datePublished: r.datePublished } : {}),
          ...(r.dateModified ? { dateModified: r.dateModified } : {}),
          articleSection: r.category,
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        },
        ...(r.faq?.length
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                url: canonical,
                inLanguage: r.language,
                mainEntity: r.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ]
          : []),
      ],
    };
  }

  const p = projects.find((x) => x.slug === path.slice(1));
  if (!p) return notFound(canonical, "Project not found — Mario Calvo");
  return {
    title: `${p.title} — Mario Calvo`,
    description: clamp(`${p.company}, ${p.year} — ${p.shortDesc}`),
    canonical,
    image: p.thumb ? `${SITE_URL}${p.thumb}` : undefined,
    ogType: "article",
    lang: "en",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        description: p.shortDesc,
        url: canonical,
        inLanguage: "en",
        ...(p.thumb ? { image: `${SITE_URL}${p.thumb}` } : {}),
        keywords: p.tools.join(", "),
        creator: authorRef,
        author: authorRef,
      },
    ],
  };
}

function notFound(canonical: string, title: string): PageMeta {
  return {
    title,
    description: "This page does not exist.",
    canonical,
    ogType: "website",
    lang: "en",
    jsonLd: [],
    noindex: true,
  };
}

/** Every path the prerender should emit, and the sitemap should list. */
export function allRoutes(): string[] {
  return [
    "/",
    "/info",
    "/resources",
    ...resources.map((r) => `/resources/${r.slug}`),
    // /bark is a static page served outside the SPA, so it is not prerendered here.
    ...projects.filter((p) => p.slug !== "bark").map((p) => `/${p.slug}`),
  ];
}

/** The date a page's content last changed, for the sitemap's <lastmod>. Only the guides
    carry a real one; for the rest the build date would be a guess, and a lastmod that
    changes on every deploy teaches search engines to ignore it. */
export function lastModifiedFor(pathname: string): string | undefined {
  const path = normalisePath(pathname);
  if (path.startsWith("/resources/")) {
    const r = resources.find((x) => `/resources/${x.slug}` === path);
    return r?.dateModified ?? r?.datePublished;
  }
  if (path === "/resources") {
    const dates = resources
      .map((r) => r.dateModified ?? r.datePublished)
      .filter((d): d is string => Boolean(d))
      .sort();
    return dates.at(-1);
  }
  return undefined;
}
