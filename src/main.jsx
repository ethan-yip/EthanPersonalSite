import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// Legacy homepage + essay pages, preserved under /classic.
const LegacyApp = lazy(() => import('./legacy/LegacyApp.jsx'))
const Faultlines = lazy(() => import('./pages/Faultlines.jsx'))
const ByInvitationOnly = lazy(() => import('./pages/ByInvitationOnly.jsx'))
const UltimateOutsideInsider = lazy(() => import('./pages/UltimateOutsideInsider.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: '100dvh', background: 'var(--bg-deep)' }} />}>
        <Routes>
          {/* New OS desktop */}
          <Route path="/" element={<App />} />

          {/* Classic site */}
          <Route path="/classic" element={<LegacyApp />} />

          {/* Legacy essay pages — aliased at both /classic/essays/* and
              /essays/* so the old site's hardcoded internal links resolve. */}
          <Route path="/classic/essays/faultlines" element={<Faultlines />} />
          <Route path="/classic/essays/byinvitationonly" element={<ByInvitationOnly />} />
          <Route path="/classic/essays/ultimateoutsideinsider" element={<UltimateOutsideInsider />} />
          <Route path="/essays/faultlines" element={<Faultlines />} />
          <Route path="/essays/byinvitationonly" element={<ByInvitationOnly />} />
          <Route path="/essays/ultimateoutsideinsider" element={<UltimateOutsideInsider />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
