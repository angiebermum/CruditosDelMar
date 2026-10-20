import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import categories from '../data/categories.js'
import products from '../data/products.js'
import formatPrice from '../utils/formatPrice.js'
import getProductPrices from '../utils/getProductPrices.js'
import groupProducts from '../utils/groupProducts.js'

const ALL_PRODUCTS = 'all'

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const productsSectionRef = useRef(null)

  const visibleProducts = selectedCategory === ALL_PRODUCTS
    ? products
    : products.filter((product) => product.categoria === selectedCategory)
  const productGroups = groupProducts(visibleProducts)

  useEffect(() => {
    if (!selectedCategory) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    productsSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [selectedCategory])

  return (
    <main className="catalog-page">
      <section className="page-section catalog" aria-labelledby="catalog-title">
        <div className="content-width">
          <div className="catalog-hero">
            <h2 id="catalog-title">Catálogo</h2>
            <p>Explora nuestros productos por categoría</p>
          </div>

          <div className="catalog__categories" aria-label="Navegación por categorías">
            <p className="catalog__category-title">Explora por categoría</p>
            <div className="category-track">
              {categories.map((category) => (
                <button
                  className={`category-placeholder${selectedCategory === category ? ' is-selected' : ''}`}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  key={category}
                >
                  <span className="category-placeholder__media" aria-hidden="true" />
                  <span className="category-placeholder__overlay" aria-hidden="true" />
                  <span className="category-placeholder__content">
                    <strong>{category}</strong>
                    <span>Ver productos →</span>
                  </span>
                </button>
              ))}
            </div>

            <button
              className={`catalog__view-all${selectedCategory === ALL_PRODUCTS ? ' is-selected' : ''}`}
              type="button"
              aria-pressed={selectedCategory === ALL_PRODUCTS}
              onClick={() => setSelectedCategory(ALL_PRODUCTS)}
            >
              Ver todos los productos
            </button>
          </div>

          {selectedCategory && (
            <section className="catalog__products" ref={productsSectionRef} aria-live="polite">
              <div className="catalog__products-heading">
                <h3>{selectedCategory === ALL_PRODUCTS ? 'Todos los productos' : selectedCategory}</h3>
              </div>

              {visibleProducts.length > 0 ? (
                <div className="catalog__product-groups">
                  {productGroups.map((group, groupIndex) => {
                    const showGroupTitle = group.grupo && !(
                        selectedCategory !== ALL_PRODUCTS
                        && productGroups.length === 1
                        && group.grupo === selectedCategory
                    )

                    return (
                      <section
                        className="catalog__product-group"
                        aria-labelledby={showGroupTitle ? `catalog-product-group-${groupIndex}` : undefined}
                        key={`${group.categoria}-${group.grupo}`}
                      >
                        {showGroupTitle && (
                          <h4 className="catalog__product-group-title" id={`catalog-product-group-${groupIndex}`}>
                            {group.grupo}
                          </h4>
                        )}
                        <div className="product-grid">
                          {group.products.map((product) => {
                            const productPrices = getProductPrices(product)
                            const lowestVariantPrice = product.variantes
                              ? Math.min(...product.variantes.map((variant) => variant.precio))
                              : null

                            return (
                              <article className="product-card" key={product.id}>
                                <div className="product-card__image" aria-hidden="true" />
                                <div className="product-card__content">
                                  <div>
                                    {selectedCategory === ALL_PRODUCTS && (
                                      <p className="product-card__eyebrow">{product.categoria}</p>
                                    )}
                                    <h4>{product.nombre}</h4>
                                  </div>
                                  {product.descripcion && (
                                    <p className="product-card__description">{product.descripcion}</p>
                                  )}
                                  {product.opciones && (
                                    <p className="product-card__description">
                                      {product.etiquetaOpciones ?? 'Opciones'}: {product.opciones.join(' · ')}
                                    </p>
                                  )}
                                  {product.variantes && (
                                    <p className="product-card__description">Varias opciones disponibles</p>
                                  )}
                                  <div className="product-card__meta">
                                    {product.variantes ? (
                                      <div className="product-card__price">
                                        <span>Desde</span>
                                        <strong>{formatPrice(lowestVariantPrice)}</strong>
                                      </div>
                                    ) : (
                                      productPrices.map((presentation) => (
                                        <div className="product-card__price" key={presentation.nombre ?? 'precio'}>
                                          {presentation.nombre && <span>{presentation.nombre}</span>}
                                          <strong>{formatPrice(presentation.precio)}</strong>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <Link className="product-card__action" to={`/producto/${product.id}`}>
                                    Ver producto
                                  </Link>
                                </div>
                              </article>
                            )
                          })}
                        </div>
                      </section>
                    )
                  })}
                </div>
              ) : (
                <div className="catalog__empty-state">
                  <p>Próximamente agregaremos productos a esta categoría.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

    </main>
  )
}

export default CatalogPage
