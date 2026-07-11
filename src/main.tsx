import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import AppInfo from './AppInfo.tsx'
import AppProject from './AppProject.tsx'
import AppResources from './AppResources.tsx'
import AppResource from './AppResource.tsx'

const path = window.location.pathname.replace(/\/$/, '') // strip trailing slash

function pickRoot() {
  if (path === '' || path === '/') return <App />
  if (path === '/info') return <AppInfo />
  if (path === '/resources') return <AppResources />
  if (path.startsWith('/resources/')) {
    const slug = path.slice('/resources/'.length)
    return <AppResource slug={slug} />
  }
  // Anything else is a project slug, e.g. /event-lifecycle-automation
  const slug = path.slice(1)
  return <AppProject slug={slug} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pickRoot()}
    <Analytics />
  </StrictMode>,
)
