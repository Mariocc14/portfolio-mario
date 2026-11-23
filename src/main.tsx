import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { routeFor, normalisePath } from './routes.tsx'
import './posthog.ts'

const container = document.getElementById('root')!
const tree = <StrictMode>{routeFor(window.location.pathname)}</StrictMode>

/* The build prerenders every known route and stamps which one it rendered. When the
   served HTML is this page, hydrate it; when it is not — an unknown URL gets 404.html,
   prerendered for "/404" — render from scratch instead, which avoids a hydration
   mismatch on a page that was never prerendered for this path. */
const prerendered = container.dataset.path
if (prerendered && normalisePath(prerendered) === normalisePath(window.location.pathname)) {
  hydrateRoot(container, tree)
} else {
  container.innerHTML = ''
  createRoot(container).render(tree)
}
