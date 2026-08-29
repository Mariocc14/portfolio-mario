/* Route resolution, shared by the browser entry (main.tsx) and the build-time
   prerender (entry-server.tsx). Both must pick the same component for the same
   path or the prerendered HTML and the hydrated app disagree. */
import type { ReactElement } from "react";
import App from "./App.tsx";
import AppInfo from "./AppInfo.tsx";
import AppProject from "./AppProject.tsx";
import AppResources from "./AppResources.tsx";
import AppResource from "./AppResource.tsx";

/** Strip the trailing slash so "/info/" and "/info" resolve identically. */
export function normalisePath(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function routeFor(pathname: string): ReactElement {
  const path = normalisePath(pathname);
  if (path === "/") return <App />;
  if (path === "/info") return <AppInfo />;
  if (path === "/resources") return <AppResources />;
  if (path.startsWith("/resources/")) {
    return <AppResource slug={path.slice("/resources/".length)} />;
  }
  // Anything else is treated as a project slug, e.g. /event-lifecycle-automation
  return <AppProject slug={path.slice(1)} />;
}
