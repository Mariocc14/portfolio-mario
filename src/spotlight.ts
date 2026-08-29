import type { MouseEvent } from "react";

/* Cursor spotlight, shared by every card-like surface on the site.
   A surface opts in with the global `.spotlight` class (src/index.css) plus these
   handlers, which write the pointer position onto the element as --mx / --my.
   Only the hovered surface fires, so there is nothing to throttle. */
export function onSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

/** Spread onto any element carrying the `spotlight` class. */
export const spotlight = { onMouseMove: onSpotlightMove };
