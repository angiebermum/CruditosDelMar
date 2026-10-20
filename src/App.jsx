import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import SiteLayout from './components/SiteLayout.jsx'
import CartProvider from './context/CartContext.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import PromotionDetailPage from './pages/PromotionDetailPage.jsx'
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
    <CartProvider>
      <BrowserRouter>
        <ScrollToPageLocation />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/promociones" element={<PromotionsPage />} />
            <Route path="/promocion/:id" element={<PromotionDetailPage />} />
            <Route path="/catalogo"element={<CatalogPage />} />
            <Route path="/producto/:id" element={<ProductDetailPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/pedido" element={<OrderPage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/ubicacion" element={<LocationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
