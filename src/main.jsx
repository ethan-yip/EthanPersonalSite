import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './ScrollToTop.jsx'

const Faultlines = lazy(() => import('./pages/Faultlines.jsx'))
const ByInvitationOnly = lazy(() => import('./pages/ByInvitationOnly.jsx'))
const UltimateOutsideInsider = lazy(() => import('./pages/UltimateOutsideInsider.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: '100dvh', background: 'var(--bg)' }} />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/essays/faultlines" element={<Faultlines />} />
          <Route path="/essays/byinvitationonly" element={<ByInvitationOnly />} />
          <Route path="/essays/ultimateoutsideinsider" element={<UltimateOutsideInsider />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
