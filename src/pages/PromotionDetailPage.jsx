import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import promotions from '../data/promotions.js'
import formatPrice from '../utils/formatPrice.js'

function getIncludedProducts(offer) {
  return offer.nombre.replace(/^Incluye:\s*/, '')
}

function PromotionDetail({ promotion }) {
  const { addItem } = useCart()
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wasAdded, setWasAdded] = useState(false)

  const selectedOffer = promotion.productos[selectedOfferIndex]
  const selectedOption = selectedOffer.opciones?.[selectedOptionIndex] ?? null
  const unitPrice = selectedOffer.precio
  const subtotal = unitPrice * quantity
  const hasSeveralOffers = promotion.productos.length > 1

  function handleOfferChange(index) {
    setSelectedOfferIndex(index)
    setSelectedOptionIndex(0)
    setWasAdded(false)
  }

  function handleAddToCart() {
    const wasSuccessful = addItem({
      type: 'promocion',
      promotionId: promotion.id,
      name: promotion.titulo,
      includedProducts: getIncludedProducts(selectedOffer),
      option: selectedOption,
      quantity,
      unitPrice,
      subtotal,
    })

    if (wasSuccessful) setWasAdded(true)
  }

  return (
    <main className="product-detail-page">
      <section className="page-section product-detail-view" aria-labelledby="promotion-detail-title">
        <div className="content-width">
          <Link className="product-detail-view__back" to="/promociones">← Volver a promociones</Link>

          <div className="product-detail-view__layout">
            <div className="product-detail__image promotion-detail__visual">
              {promotion.imagen
                ? <img src={promotion.imagen} alt={promotion.titulo} />
                : <span className="promotion-detail__badge">Promoción</span>}
            </div>

            <div className="product-detail__content">
              <p className="section-label">{promotion.disponibilidadTexto}</p>
              <h1 id="promotion-detail-title">{promotion.titulo}</h1>

              {hasSeveralOffers ? (
                <fieldset className="product-choice">
                  <legend>Elige tu promoción</legend>
                  <div className="product-choice__list">
                    {promotion.productos.map((offer, index) => (
                      <label className="product-choice__item" key={offer.nombre}>
                        <input
                          type="radio"
                          name={`${promotion.id}-offer`}
                          value={offer.nombre}
                          checked={selectedOfferIndex === index}
                          onChange={() => handleOfferChange(index)}
                        />
                        <span>{getIncludedProducts(offer)}</span>
                        <strong>{formatPrice(offer.precio)}</strong>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <div className="promotion-detail__includes">
                  <h2>Incluye</h2>
                  <p>{getIncludedProducts(selectedOffer)}</p>
                </div>
              )}

              {selectedOffer.opciones && (
                <fieldset className="product-choice">
                  <legend>Opciones</legend>
                  <div className="product-choice__list">
                    {selectedOffer.opciones.map((option, index) => (
                      <label className="product-choice__item" key={option}>
                        <input
                          type="radio"
                          name={`${promotion.id}-option`}
                          value={option}
                          checked={selectedOptionIndex === index}
                          onChange={() => setSelectedOptionIndex(index)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="product-option">
                <h2>Cantidad</h2>
                <div className="quantity-preview" aria-label="Seleccionar cantidad">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    disabled={quantity === 1}
                    onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
                  >
                    −
                  </button>
                  <span aria-live="polite">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail-view__totals" aria-live="polite">
                <div>
                  <span>Precio</span>
                  <strong>{formatPrice(unitPrice)}</strong>
                </div>
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
              </div>

              <button className="add-to-cart-preview" type="button" onClick={handleAddToCart}>
                Agregar al carrito
              </button>

              {wasAdded && (
                <p className="product-added-message" role="status">
                  Promoción agregada al carrito. <Link to="/carrito">Ver carrito</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PromotionDetailPage() {
  const { id } = useParams()
  const promotion = promotions.find((item) => item.id === id && item.activo)

  if (!promotion) {
    return (
      <main className="product-detail-page">
        <section className="page-section product-not-found" aria-labelledby="promotion-not-found-title">
          <div className="content-width">
            <h1 id="promotion-not-found-title">Promoción no encontrada</h1>
            <Link className="primary-action" to="/promociones">Volver a promociones</Link>
          </div>
        </section>
      </main>
    )
  }

  return <PromotionDetail promotion={promotion} key={promotion.id} />
}

export default PromotionDetailPage
