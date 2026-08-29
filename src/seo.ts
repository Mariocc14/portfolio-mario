/* Per-route metadata for the prerendered HTML.
   Every page used to ship the same <title> and description, which is what a crawler saw
   for the whole site. This is the single source for both: the prerender writes it into
   the served HTML, and the components set the same document.title at runtime, so a
   client-side render and a crawler read the same thing. */
import { projects } from "./projects";
import { resources } from "./resources";
import { normalisePath } from "./routes";

export const SITE_URL = "https://www.marioclv.com";
export const AUTHOR = "Mario Calvo";
export const HOME_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

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

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  url: SITE_URL,
  image: `${SITE_URL}/imagen_perfil/mario-avatar.png`,
  jobTitle: "CRM & Lifecycle Marketing Consultant",
  email: "mailto:mariocalvocst@gmail.com",
  sameAs: ["https://www.linkedin.com/in/mariocalvocastillo/"],
  knowsAbout: [
    "CRM",
    "Lifecycle marketing",
    "Marketing automation",
    "Email deliverability",
    "Salesforce Marketing Cloud",
    "Iterable",
  ],
};

export function metaForPath(pathname: string): PageMeta {
  const path = normalisePath(pathname);
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

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
          name: HOME_TITLE,
          url: SITE_URL,
        },
      ],
    };
  }

  if (path === "/info") {
    return {
      title: "Info — Mario Calvo",
      description:
        "Background, how I work, and what I've built across CRM and lifecycle marketing — from Law to automation, via Fever, Freepik and Magnific.",
      canonical,
      image: `${SITE_URL}/imagen_perfil/mario-avatar.png`,
      ogType: "profile",
      lang: "en",
      jsonLd: [personLd],
    };
  }

  if (path === "/resources") {
    return {
      title: "Resources — Mario Calvo",
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
          author: { "@type": "Person", name: AUTHOR },
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
          author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
          publisher: { "@type": "Person", name: AUTHOR, url: SITE_URL },
          ...(r.datePublished ? { datePublished: r.datePublished } : {}),
          ...(r.dateModified ? { dateModified: r.dateModified } : {}),
          articleSection: r.category,
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        },
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
        creator: { "@type": "Person", name: AUTHOR, url: SITE_URL },
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
