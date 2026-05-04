import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppV2 from './AppV2.tsx'

const path = window.location.pathname
const isV2 = path === '/v2' || path.startsWith('/v2/')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isV2 ? <AppV2 /> : <App />}
  </StrictMode>,
)
