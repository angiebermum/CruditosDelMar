import { useState } from 'react'
import './App.css'
import logo from './assets/logo-cruditos-del-mar.jpg'

function App() {
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__content">
          <a className="brand" href="#inicio" aria-label="Cruditos del Mar, inicio">
            <span className="brand__logo-space" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="brand__name">Cruditos del Mar</span>
          </a>

          <nav className="site-nav" aria-label="Navegación principal">
            <a href="#inicio">Inicio</a>
            <a href="#menu">Menú</a>
            <a href="#promociones">Promociones</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#quienes-somos">Quiénes somos</a>
            <a href="#ubicacion">Ubicación</a>
          </nav>

          <span className="cart-preview" role="img" aria-label="Carrito, elemento visual">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
              <circle cx="9.5" cy="19.5" r="1" />
              <circle cx="17.5" cy="19.5" r="1" />
            </svg>
          </span>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__content content-width">
            <div className="hero__copy">
              <p className="section-label">Cruditos del Mar</p>
              <h1 id="hero-title">Cruditos del Mar</h1>
              <a className="primary-action" href="#catalogo">Ver productos</a>
            </div>

            <div className="photo-placeholder hero__photo" role="img" aria-label="Espacio temporal para fotografía">
              <span>Fotografía por definir</span>
            </div>
          </div>
        </section>

        <section className="page-section promotions" id="promociones" aria-labelledby="promotions-title">
          <div className="content-width">
            <div className="section-heading">
              <p className="section-label">Contenido temporal</p>
              <h2 id="promotions-title">Promociones</h2>
            </div>

            <div className="promotion-track">
              {[1, 2, 3].map((item) => (
                <article className="promotion-placeholder" key={item}>
                  <span>Promoción por definir</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section menu" id="menu" aria-labelledby="menu-title">
          <div className="content-width">
            <div className="section-heading menu__heading">
              <p className="section-label">Contenido temporal</p>
              <h2 id="menu-title">Menú</h2>
            </div>

            <div className="menu__categories" aria-label="Estructura temporal del menú por categorías">
              {[1, 2].map((category) => (
                <article className="menu-category" key={category}>
                  <h3>Categoría por definir</h3>
                  <div className="menu-category__items">
                    {[1, 2, 3].map((product) => (
                      <div className="menu-item" key={product}>
                        <div className="menu-item__details">
                          <span>Nombre por definir</span>
                          <small>Presentación por definir</small>
                        </div>
                        <span className="menu-item__price">Precio por definir</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section catalog" id="catalogo" aria-labelledby="catalog-title">
          <div className="content-width">
            <div className="section-heading section-heading--line">
              <div>
                <p className="section-label">Espacio preparado</p>
                <h2 id="catalog-title">Catálogo</h2>
              </div>
              <span aria-hidden="true" />
            </div>

            <div className="catalog__categories" aria-label="Navegación temporal por categorías">
              <p className="catalog__category-title">Comprar por categoría</p>
              <div className="category-track">
                {[1, 2, 3, 4].map((item) => (
                  <div className="category-placeholder" key={item}>
                    <span className="category-placeholder__media" aria-hidden="true" />
                    <span>Categoría por definir</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__products-heading">
              <p className="section-label">Contenido temporal</p>
              <h3>Productos</h3>
            </div>

            <div className="product-grid" aria-label="Representación temporal de productos">
              {[1, 2, 3, 4, 5, 6].map((product) => (
                <article className="product-card" key={product}>
                  <div className="product-card__image" role="img" aria-label="Fotografía del producto por definir">
                    <span>Fotografía por definir</span>
                  </div>
                  <div className="product-card__content">
                    <div>
                      <p className="product-card__eyebrow">Producto temporal</p>
                      <h4>Nombre por definir</h4>
                    </div>
                    <p className="product-card__description">Descripción por definir.</p>
                    <div className="product-card__meta">
                      <span>Presentación por definir</span>
                      <strong>Precio por definir</strong>
                    </div>
                    <button className="product-card__action" type="button" onClick={() => setIsProductDetailOpen(true)}>
                      Ver producto
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {isProductDetailOpen && (
          <div className="product-detail-backdrop" role="presentation">
            <section className="product-detail" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
              <button
                className="product-detail__close"
                type="button"
                aria-label="Cerrar detalle del producto"
                onClick={() => setIsProductDetailOpen(false)}
              >
                ×
              </button>

              <div className="product-detail__image" role="img" aria-label="Fotografía del producto por definir">
                <span>Fotografía por definir</span>
              </div>

              <div className="product-detail__content">
                <p className="section-label">Contenido temporal</p>
                <h2 id="product-detail-title">Nombre por definir</h2>
                <p className="product-detail__description">Descripción por definir.</p>

                <div className="product-detail__summary">
                  <span>Presentación por definir</span>
                  <strong>Precio por definir</strong>
                </div>

                <div className="product-option">
                  <h3>Presentación o tamaño</h3>
                  <div className="option-pills">
                    <span>Opción por definir</span>
                    <span>Opción por definir</span>
                  </div>
                </div>

                <div className="product-option">
                  <h3>Cantidad</h3>
                  <div className="quantity-preview" aria-label="Control visual de cantidad">
                    <button type="button" disabled aria-label="Disminuir cantidad">−</button>
                    <span>1</span>
                    <button type="button" disabled aria-label="Aumentar cantidad">+</button>
                  </div>
                </div>

                <div className="product-option">
                  <h3>Personalización</h3>
                  <div className="customization-preview">
                    <label>
                      <input type="checkbox" disabled />
                      <span>Extra por definir</span>
                    </label>
                    <label>
                      <input type="checkbox" disabled />
                      <span>Ingrediente por excluir</span>
                    </label>
                  </div>
                </div>

                <button className="add-to-cart-preview" type="button" disabled>
                  Agregar al carrito
                </button>
              </div>
            </section>
          </div>
        )}

        <section className="page-section about" id="quienes-somos" aria-labelledby="about-title">
          <div className="about__content content-width">
            <div className="about__visual">
              <div className="about__logo-frame">
                <img className="about__logo" src={logo} alt="Logo oficial de Cruditos del Mar" />
              </div>
            </div>

            <div className="about__copy">
              <p className="section-label">Contenido pendiente</p>
              <h2 id="about-title">Quiénes somos</h2>
              <div className="text-placeholder" aria-label="Texto por definir">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="page-section location" id="ubicacion" aria-labelledby="location-title">
          <div className="content-width location__layout">
            <div className="section-heading location__heading">
              <p className="section-label">Información pendiente</p>
              <h2 id="location-title">Ubicación</h2>
              <div className="location__details">
                <span>Dirección por definir</span>
                <span className="secondary-action" aria-disabled="true">Cómo llegar</span>
              </div>
            </div>

            <div className="map-placeholder" role="img" aria-label="Espacio temporal para el mapa">
              <span>Mapa por incorporar</span>
            </div>
          </div>
        </section>

        <section className="follow" aria-labelledby="follow-title">
          <div className="follow__content content-width">
            <div>
              <p className="section-label">Enlaces pendientes</p>
              <h2 id="follow-title">Síguenos</h2>
            </div>
            <div className="social-placeholders" aria-label="Redes sociales por enlazar">
              <span className="social-placeholder">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle className="social-placeholder__dot" cx="17.5" cy="6.7" r="1" />
                </svg>
                Instagram
              </span>
              <span className="social-placeholder">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.7-.1-1.5-.2-2.3-.2-2.3 0-4 1.4-4 4.1V10H9v3h2.7v8" />
                </svg>
                Facebook
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__content content-width">
          <div className="brand brand--footer" aria-label="Cruditos del Mar">
            <span className="brand__logo-space" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="brand__name">Cruditos del Mar</span>
          </div>
          <nav className="footer-nav" aria-label="Navegación del pie de página">
            <a href="#inicio">Inicio</a>
            <a href="#menu">Menú</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#quienes-somos">Quiénes somos</a>
            <a href="#ubicacion">Ubicación</a>
          </nav>
          <span className="site-footer__placeholder">Instagram · Facebook</span>
        </div>
      </footer>
    </div>
  )
}

export default App
