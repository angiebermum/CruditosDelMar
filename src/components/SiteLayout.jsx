import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo-cruditos-del-mar.jpg'

const navigationItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Menú', to: '/menu' },
  { label: 'Promociones', to: '/promociones' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Quiénes somos', to: '/quienes-somos' },
  { label: 'Ubicación', to: '/ubicacion' },
]

function SiteLayout() {
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

          <span className="cart-preview" role="img" aria-label="Carrito">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
              <circle cx="9.5" cy="19.5" r="1" />
              <circle cx="17.5" cy="19.5" r="1" />
            </svg>
          </span>
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
          <nav className="footer-nav" aria-label="Navegación del pie de página">
            {navigationItems
              .filter((item) => item.label !== 'Promociones')
              .map((item) => (
                <Link to={item.to} key={item.label}>{item.label}</Link>
              ))}
          </nav>
          <span className="site-footer__placeholder">Instagram · Facebook</span>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
