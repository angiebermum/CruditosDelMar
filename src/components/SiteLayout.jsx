import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo-cruditos-del-mar.jpg'
import { useCart } from '../context/useCart.js'

const navigationItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Menú', to: '/menu' },
  { label: 'Promociones', to: '/promociones' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Quiénes somos', to: '/quienes-somos' },
  { label: 'Ubicación', to: '/ubicacion' },
]

function SiteLayout() {
  const { totalItems } = useCart()

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__content">
          <Link className="brand" to="/" aria-label="Cruditos del Mar, inicio">
            <span className="brand__logo-space" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="brand__name">Cruditos del Mar</span>
          </Link>

          <nav className="site-nav" aria-label="Navegación principal">
            {navigationItems.map((item) => (
              <Link to={item.to} key={item.label}>{item.label}</Link>
            ))}
          </nav>

          <Link
            className="cart-preview"
            to="/carrito"
            aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} productos` : ''}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
              <circle cx="9.5" cy="19.5" r="1" />
              <circle cx="17.5" cy="19.5" r="1" />
            </svg>
            {totalItems > 0 && <span className="cart-preview__badge">{totalItems}</span>}
          </Link>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="site-footer__content content-width">
          <div className="brand brand--footer" aria-label="Cruditos del Mar">
            <span className="brand__logo-space" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="brand__name">Cruditos del Mar</span>
          </div>
          <div className="site-footer__social">
            <p>Síguenos en nuestras redes</p>
            <div className="site-footer__social-links">
              <a
                href="https://www.instagram.com/cruditosdelmar?dlrf=MTcwdzFwbnEyMnRrbQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1FuiYU4XKE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
          <div className="site-footer__info">
            <p className="site-footer__slogan">Del mar a tu paladar</p>
            <p>Santiago de Puriscal, San José</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
