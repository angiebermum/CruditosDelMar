import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import formatPrice from '../utils/formatPrice.js'

function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <section className="page-section cart cart--empty" aria-labelledby="cart-title">
          <div className="content-width">
            <h1 id="cart-title">Tu carrito está vacío.</h1>
            <Link className="primary-action" to="/catalogo">Ver catálogo</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <section className="page-section cart" aria-labelledby="cart-title">
        <div className="content-width">
          <header className="cart__heading">
            <div>
              <p className="section-label">Tu selección</p>
              <h1 id="cart-title">Carrito</h1>
            </div>
            <div className="cart__heading-actions">
              <Link className="cart__continue-shopping" to="/catalogo">Seguir comprando</Link>
              <button className="cart__clear" type="button" onClick={clearCart}>Vaciar carrito</button>
            </div>
          </header>

          <div className="cart__layout">
            <ul className="cart__items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item__heading">
                    <div>
                      {item.type === 'promocion'
                        ? <p className="cart-item__promotion-label">Promoción</p>
                        : <p>{item.category}</p>}
                      <h2>{item.name}</h2>
                    </div>
                    <div className="cart-item__actions">
                      {item.type !== 'promocion' && (
                        <Link
                          className="cart-item__edit"
                          to={`/producto/${item.productId}?editar=${encodeURIComponent(item.id)}`}
                        >
                          Editar
                        </Link>
                      )}
                      <button
                        className="cart-item__remove"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {item.type === 'promocion' && (
                    <dl className="cart-item__details">
                      <div>
                        <dt>Incluye</dt>
                        <dd>{item.includedProducts}</dd>
                      </div>
                      {item.option && (
                        <div>
                          <dt>Opción</dt>
                          <dd>{item.option}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  {item.type !== 'promocion' && (item.presentation || item.option || item.variant || item.extras.length > 0 || item.observations) && (
                    <dl className="cart-item__details">
                      {item.presentation && (
                        <div>
                          <dt>Presentación</dt>
                          <dd>{item.presentation}</dd>
                        </div>
                      )}
                      {item.option && (
                        <div>
                          <dt>{item.optionLabel ?? 'Opción'}</dt>
                          <dd>{item.option}</dd>
                        </div>
                      )}
                      {item.variant && (
                        <div>
                          <dt>Variante</dt>
                          <dd>{item.variant.name} — {item.variant.presentation}</dd>
                        </div>
                      )}
                      {item.extras.length > 0 && (
                        <div>
                          <dt>Extras</dt>
                          <dd>
                            {item.extras.map((extra) => (
                              <span key={extra.id}>{extra.name} (+{formatPrice(extra.price)})</span>
                            ))}
                          </dd>
                        </div>
                      )}
                      {item.observations && (
                        <div>
                          <dt>Observaciones</dt>
                          <dd>{item.observations}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  <div className="cart-item__purchase">
                    <p><strong>{formatPrice(item.unitPrice)}</strong> c/u</p>
                    <div className="quantity-preview" aria-label={`Cantidad de ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        disabled={item.quantity === 1}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item__subtotal">
                      <span>Subtotal</span>
                      <strong>{formatPrice(item.subtotal)}</strong>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="cart-summary" aria-labelledby="cart-summary-title">
              <h2 id="cart-summary-title">Resumen</h2>
              <div>
                <span>Productos</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="cart-summary__total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <Link className="cart-summary__checkout" to="/pedido">Continuar con el pedido</Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CartPage
