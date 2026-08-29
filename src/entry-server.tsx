/* Build-time entry. Not shipped to the browser: scripts/prerender.mjs imports this,
   renders every route to static HTML, and writes the files Vercel serves. */
import { renderToString } from "react-dom/server";
import { routeFor } from "./routes.tsx";
import { metaForPath } from "./seo";

export { allRoutes, SITE_URL } from "./seo";
export { metaForPath };

export function render(pathname: string): string {
  return renderToString(routeFor(pathname));
}
