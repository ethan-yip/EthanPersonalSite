import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Faultlines from './pages/Faultlines.jsx'
import ByInvitationOnly from './pages/ByInvitationOnly.jsx'
import UltimateOutsideInsider from './pages/UltimateOutsideInsider.jsx'
import ScrollToTop from './ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/essays/faultlines" element={<Faultlines />} />
        <Route path="/essays/byinvitationonly" element={<ByInvitationOnly />} />
        <Route path="/essays/ultimateoutsideinsider" element={<UltimateOutsideInsider />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
