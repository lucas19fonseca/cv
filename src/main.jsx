import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Filmes from './pages/Filmes.jsx'
import Avaliacao from './pages/Avaliacao.jsx'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
