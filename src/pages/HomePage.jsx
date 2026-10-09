import { Link } from 'react-router-dom'

const homeAccessItems = [
  { label: 'Menú', action: 'Ver menú', to: '/menu' },
  { label: 'Promociones', action: 'Ver promociones', to: '/promociones' },
  { label: 'Catálogo', action: 'Ver catálogo', to: '/catalogo' },
  { label: 'Quiénes somos', action: 'Ver página', to: '/quienes-somos' },
  { label: 'Ubicación', action: 'Ver ubicación', to: '/ubicacion' },
]

function HomePage() {
  return (
    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__content content-width">
          <div className="hero__copy">
            <p className="section-label">Cruditos del Mar</p>
            <h1 id="hero-title">Cruditos del Mar</h1>
            <div className="hero__actions">
              <Link className="primary-action" to="/catalogo">Ver productos</Link>
              <Link className="primary-action primary-action--secondary" to="/promociones">Ver promociones</Link>
            </div>
          </div>

          <div className="photo-placeholder hero__photo" aria-hidden="true" />
        </div>
      </section>

      <section className="home-navigation" aria-labelledby="home-navigation-title">
        <div className="content-width">
          <div className="home-navigation__heading">
            <p className="section-label">Navegación</p>
            <h2 id="home-navigation-title">Accesos</h2>
          </div>

          <div className="home-access-grid">
            {homeAccessItems.map((item) => (
              <Link className="home-access-card" to={item.to} key={item.to}>
                <span className="home-access-card__label">{item.label}</span>
                <span className="home-access-card__action">
                  {item.action}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
