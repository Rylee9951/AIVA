import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './pages/Home.jsx'
import Insights from './pages/Insights.jsx'
import Goals from './pages/Goals.jsx'
import Settings from './pages/Settings.jsx'
import './index.css'
import App from './App.jsx'

const clientId = "564668111473-6otqd47opbk0nhtrilitjkdftqtddoov.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/home' element={<Home />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>,
)
