/* Turns the SPA build into static HTML, one file per route.

   Why: the client build ships `<div id="root"></div>` on every URL, with one shared title
   and description. Google renders the JS eventually; the crawlers behind AI answers
   (GPTBot, PerplexityBot, ClaudeBot) do not run a React bundle at all, so without this
   the content does not exist as far as they are concerned.

   Runs after `vite build` and `vite build --ssr`. Reads dist/index.html as the shell,
   swaps in the rendered markup and the per-route head tags, and writes dist/<route>/index.html.
   Also emits robots.txt and sitemap.xml. */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { render, metaForPath, allRoutes, lastModifiedFor, SITE_URL } = await import(
  join(root, "dist-ssr", "entry-server.js")
);

const shell = await readFile(join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* JSON-LD sits inside a <script> tag, so the only character that can break out is "<".
   Escaping it as < keeps the JSON valid and the tag intact. */
const jsonLdScript = (blocks) =>
  blocks
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(
          /</g,
          "\\u003c"
        )}</script>`
    )
    .join("\n    ");

function headFor(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<meta property="og:type" content="${meta.ogType}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${esc(meta.canonical)}">`,
    `<meta property="og:site_name" content="Mario Calvo">`,
    `<meta property="og:locale" content="${meta.lang === "es" ? "es_ES" : "en_GB"}">`,
    `<meta name="twitter:card" content="${meta.image ? "summary_large_image" : "summary"}">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
  ];
  // A noindex page (the 404) has no URL of its own to declare as canonical.
  if (!meta.noindex) {
    tags.splice(2, 0, `<link rel="canonical" href="${esc(meta.canonical)}">`);
  }
  if (meta.image) {
    tags.push(`<meta property="og:image" content="${esc(meta.image)}">`);
    tags.push(`<meta name="twitter:image" content="${esc(meta.image)}">`);
  }
  if (meta.noindex) tags.push(`<meta name="robots" content="noindex">`);
  if (meta.jsonLd.length) tags.push(jsonLdScript(meta.jsonLd));
  return tags.join("\n    ");
}

function pageFor(path, override = {}) {
  const meta = { ...metaForPath(path), ...override };
  let html = shell;

  // Drop the shell's generic title and description; the per-route block replaces both.
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/, "");
  html = html.replace(/<meta\s+name="description"[\s\S]*?>\s*/, "");
  html = html.replace("</head>", `  ${headFor(meta)}\n  </head>`);

  // The page's own language, so a Spanish resource is not announced as English.
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);

  // data-path tells main.tsx which route this HTML was rendered for.
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-path="${esc(path)}">${render(path)}</div>`
  );
  return html;
}

const routes = allRoutes();
for (const path of routes) {
  const dir = path === "/" ? dist : join(dist, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), pageFor(path), "utf8");
}

/* 404.html: Vercel serves it, with a 404 status, for any path that matches no file and
   no rewrite. Before, a catch-all rewrite sent every unknown URL to the homepage with a
   200, so a typo or a dead link was an indexable copy of the home (a soft 404). It renders
   the app's not-found view and carries noindex. */
await writeFile(
  join(dist, "404.html"),
  pageFor("/404", { title: "Page not found — Mario Calvo", noindex: true }),
  "utf8"
);

/* /bark and /bark/es are static pages served from public/, outside the SPA, so they are
   listed here by hand. Each entry gets a <lastmod> only when the page knows a real date. */
const urls = [...routes, "/bark", "/bark/es"]
  .map((p) => {
    const lastmod = lastModifiedFor(p);
    return `  <url><loc>${SITE_URL}${p}</loc>${
      lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
    }</url>`;
  })
  .join("\n");

await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);

await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8"
);

console.log(
  `prerendered ${routes.length} routes + 404.html + sitemap.xml + robots.txt\n${routes
    .map((r) => `  ${r}`)
    .join("\n")}`
);
