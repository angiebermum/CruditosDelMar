import { Link } from 'react-router-dom'
import banner from '../assets/banner-cruditos-del-mar.jpg'

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

          <img
            className="hero__banner"
            src={banner}
            alt="Cruditos del Mar. Del mar a tu paladar. Orgullosamente puriscaleños."
          />
        </div>
      </section>
    </main>
  )
}

export default HomePage
