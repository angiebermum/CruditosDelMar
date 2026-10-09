import { useEffect, useRef, useState } from 'react'
import categories from '../data/categories.js'
import products from '../data/products.js'
import formatPrice from '../utils/formatPrice.js'
import getProductPrices from '../utils/getProductPrices.js'
import groupProducts from '../utils/groupProducts.js'

const ALL_PRODUCTS = 'all'

function CatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
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
                                  <button className="product-card__action" type="button" onClick={() => setSelectedProduct(product)}>
                                    Ver producto
                                  </button>
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

      {selectedProduct && (
        <div className="product-detail-backdrop" role="presentation">
          <section className="product-detail" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
            <button
              className="product-detail__close"
              type="button"
              aria-label="Cerrar detalle del producto"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className="product-detail__image" aria-hidden="true" />

            <div className="product-detail__content">
              <p className="section-label">{selectedProduct.categoria}</p>
              <h2 id="product-detail-title">{selectedProduct.nombre}</h2>
              {selectedProduct.descripcion && (
                <p className="product-detail__description">{selectedProduct.descripcion}</p>
              )}
              {selectedProduct.opciones && (
                <p className="product-detail__description">
                  {selectedProduct.etiquetaOpciones ?? 'Opciones'}: {selectedProduct.opciones.join(' · ')}
                </p>
              )}

              {selectedProduct.variantes ? (
                <div className="product-detail__summary product-detail__summary--presentations">
                  <span>Variantes</span>
                  <div className="product-detail__presentation-list">
                    {selectedProduct.variantes.map((variant) => (
                      <div className="product-detail__presentation" key={`${variant.nombre}-${variant.presentacion}`}>
                        <span>{variant.nombre} · {variant.presentacion}</span>
                        <strong>{formatPrice(variant.precio)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ) : selectedProduct.presentaciones ? (
                <div className="product-detail__summary product-detail__summary--presentations">
                  <span>Presentaciones</span>
                  <div className="product-detail__presentation-list">
                    {getProductPrices(selectedProduct).map((presentation) => (
                      <div className="product-detail__presentation" key={presentation.nombre}>
                        <span>{presentation.nombre}</span>
                        <strong>{formatPrice(presentation.precio)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="product-detail__summary">
                  <span>Precio</span>
                  <strong>{formatPrice(selectedProduct.precio)}</strong>
                </div>
              )}

              {!selectedProduct.presentaciones && !selectedProduct.variantes && (
                <div className="product-option" hidden>
                  <h3>Presentación o tamaño</h3>
                  <div className="option-pills" />
                </div>
              )}

              <div className="product-option">
                <h3>Cantidad</h3>
                <div className="quantity-preview" aria-label="Control visual de cantidad">
                  <button type="button" disabled aria-label="Disminuir cantidad">−</button>
                  <span>1</span>
                  <button type="button" disabled aria-label="Aumentar cantidad">+</button>
                </div>
              </div>

              <div className="product-option" hidden>
                <h3>Personalización</h3>
                <div className="customization-preview" />
              </div>

              <button className="add-to-cart-preview" type="button" disabled>
                Agregar al carrito
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default CatalogPage
