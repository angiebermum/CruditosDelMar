import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import SiteLayout from './components/SiteLayout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import PromotionsPage from './pages/PromotionsPage.jsx'

function ScrollToPageLocation() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView()
      })
      return
    }

    window.scrollTo({ top: 0 })
  }, [hash, pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToPageLocation />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/promociones" element={<PromotionsPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/ubicacion" element={<LocationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
