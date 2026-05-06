import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppV2 from './AppV2.tsx'
import AppV2Info from './AppV2Info.tsx'
import AppV2Project from './AppV2Project.tsx'

const path = window.location.pathname.replace(/\/$/, '') // strip trailing slash

function pickRoot() {
  if (path === '/v2') return <AppV2 />
  if (path === '/v2/info') return <AppV2Info />
  if (path.startsWith('/v2/')) {
    const slug = path.slice('/v2/'.length)
    return <AppV2Project slug={slug} />
  }
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>{pickRoot()}</StrictMode>,
)
