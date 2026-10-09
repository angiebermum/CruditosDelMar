import categories from '../data/categories.js'
import products from '../data/products.js'
import formatPrice from '../utils/formatPrice.js'
import getProductPrices from '../utils/getProductPrices.js'
import groupProducts from '../utils/groupProducts.js'

function getCategoryId(category) {
  return `menu-${category
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')}`
}

function getOptionLabel(product) {
  if (product.etiquetaOpciones) return product.etiquetaOpciones
  if (product.id === 'bebidas-chamoyadas') return 'Sabores'

  return 'Opciones'
}

function MenuPage() {
  return (
    <main className="menu-page">
      <section className="page-section menu" aria-labelledby="menu-title">
        <div className="content-width">
          <div className="menu__heading">
            <h2 id="menu-title">Menú</h2>
            <p>Consulta nuestros productos, opciones y precios.</p>
          </div>

          <nav className="menu__quick-nav" aria-label="Accesos rápidos a las categorías del menú">
            {categories.map((category) => (
              <a href={`#${getCategoryId(category)}`} key={category}>{category}</a>
            ))}
          </nav>

          <div className="menu__categories" aria-label="Menú por categorías">
            {categories.map((category) => {
              const categoryProducts = products.filter((product) => product.categoria === category)
              const categoryProductGroups = groupProducts(categoryProducts)

              return (
                <section className="menu-category" id={getCategoryId(category)} key={category}>
                  <h3>{category}</h3>
                  {categoryProducts.length > 0 ? (
                    <div className="menu-category__groups">
                      {categoryProductGroups.map((group) => (
                        <section className="menu-category__group" key={`${group.categoria}-${group.grupo}`}>
                          {group.grupo && !(
                            categoryProductGroups.length === 1 && group.grupo === category
                          ) && <h4 className="menu-category__group-title">{group.grupo}</h4>}
                          <div className="menu-category__items">
                            {group.products.map((product) => {
                              const productPrices = getProductPrices(product)

                              return (
                                <div className={`menu-item${product.variantes ? ' menu-item--variants' : ''}`} key={product.id}>
                                  <div className="menu-item__details">
                                    <span>{product.nombre}</span>
                                    {product.descripcion && <small>{product.descripcion}</small>}
                                    {product.opciones && (
                                      <small className="menu-item__options">
                                        <strong>{getOptionLabel(product)}:</strong>
                                        <span>{product.opciones.join(' · ')}</span>
                                      </small>
                                    )}
                                    {product.presentaciones && (
                                      <div className="menu-item__presentations">
                                        {productPrices.map((presentation) => (
                                          <span key={presentation.nombre}>
                                            {presentation.nombre} <strong>{formatPrice(presentation.precio)}</strong>
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    {product.variantes && (
                                      <div className="menu-item__variants">
                                        {product.variantes.map((variant) => (
                                          <div className="menu-item__variant" key={`${variant.nombre}-${variant.presentacion}`}>
                                            <span>{variant.nombre}</span>
                                            <small>{variant.presentacion}</small>
                                            <strong>{formatPrice(variant.precio)}</strong>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  {!product.presentaciones && !product.variantes && (
                                    <span className="menu-item__price">{formatPrice(productPrices[0].precio)}</span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <p className="menu-category__empty" hidden />
                  )}
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default MenuPage
