import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppInfo from './AppInfo.tsx'
import AppProject from './AppProject.tsx'

const path = window.location.pathname.replace(/\/$/, '') // strip trailing slash

function pickRoot() {
  if (path === '' || path === '/') return <App />
  if (path === '/info') return <AppInfo />
  // Anything else is a project slug, e.g. /event-lifecycle-automation
  const slug = path.slice(1)
  return <AppProject slug={slug} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>{pickRoot()}</StrictMode>,
)
