import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import products from '../data/products.js'
import formatPrice from '../utils/formatPrice.js'

function getInitialIndex(values, selectedValue, isMatch) {
  if (!values || !selectedValue) return 0

  const selectedIndex = values.findIndex((value) => isMatch(value, selectedValue))
  return selectedIndex >= 0 ? selectedIndex : 0
}

function ProductDetail({ product, editingItem }) {
  const navigate = useNavigate()
  const { addItem, updateItem } = useCart()
  const [selectedPresentationIndex, setSelectedPresentationIndex] = useState(() => (
    getInitialIndex(product.presentaciones, editingItem?.presentation, (
      presentation,
      selectedPresentation,
    ) => presentation.nombre === selectedPresentation)
  ))
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(() => (
    getInitialIndex(product.opciones, editingItem?.option, (option, selectedOption) => option === selectedOption)
  ))
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(() => (
    getInitialIndex(product.variantes, editingItem?.variant, (variant, selectedVariant) => (
      variant.nombre === selectedVariant.name && variant.presentacion === selectedVariant.presentation
    ))
  ))
  const [selectedExtraIds, setSelectedExtraIds] = useState(() => (
    editingItem?.extras.map((extra) => extra.id) ?? []
  ))
  const [observations, setObservations] = useState(editingItem?.observations ?? '')
  const [quantity, setQuantity] = useState(editingItem?.quantity ?? 1)
  const [wasAdded, setWasAdded] = useState(false)
  const isEditing = Boolean(editingItem)

  const selectedPresentation = product.presentaciones?.[selectedPresentationIndex] ?? null
  const selectedOption = product.opciones?.[selectedOptionIndex] ?? null
  const selectedVariant = product.variantes?.[selectedVariantIndex] ?? null
  const selectedExtras = product.extras.filter((extra) => selectedExtraIds.includes(extra.id))
  const basePrice = selectedVariant
    ? selectedVariant.precio
    : selectedPresentation
      ? selectedPresentation.precio
      : product.precio
  const totalExtras = selectedExtras.reduce((total, extra) => total + extra.precio, 0)
  const unitPrice = basePrice + totalExtras
  const subtotal = unitPrice * quantity
  const canAdd = (!product.presentaciones || selectedPresentation)
    && (!product.opciones || selectedOption)
    && (!product.variantes || selectedVariant)

  function toggleExtra(extraId) {
    setSelectedExtraIds((currentExtraIds) => (
      currentExtraIds.includes(extraId)
        ? currentExtraIds.filter((id) => id !== extraId)
        : [...currentExtraIds, extraId]
    ))
  }

  function handleAddToCart() {
    if (!canAdd) return

    const cartItem = {
      productId: product.id,
      name: product.nombre,
      category: product.categoria,
      quantity,
      basePrice,
      unitPrice,
      subtotal,
      presentation: selectedPresentation?.nombre ?? null,
      option: selectedOption,
      optionLabel: product.opciones ? (product.etiquetaOpciones ?? 'Opciones') : null,
      variant: selectedVariant
        ? { name: selectedVariant.nombre, presentation: selectedVariant.presentacion }
        : null,
      extras: selectedExtras.map((extra) => ({
        id: extra.id,
        name: extra.nombre,
        price: extra.precio,
      })),
      observations: observations.trim(),
    }

    const wasSuccessful = isEditing
      ? updateItem(editingItem.id, cartItem)
      : addItem(cartItem)

    if (!wasSuccessful) return

    if (isEditing) {
      navigate('/carrito')
      return
    }

    setWasAdded(true)
  }

  return (
    <main className="product-detail-page">
      <section className="page-section product-detail-view" aria-labelledby="product-detail-title">
        <div className="content-width">
          <Link className="product-detail-view__back" to={isEditing ? '/carrito' : '/catalogo'}>
            ← {isEditing ? 'Volver al carrito' : 'Volver al catálogo'}
          </Link>

          <div className="product-detail-view__layout">
            <div className="product-detail__image">
              {product.imagen && <img src={product.imagen} alt={product.nombre} />}
            </div>

            <div className="product-detail__content">
              <p className="section-label">{product.categoria}</p>
              <h1 id="product-detail-title">{product.nombre}</h1>

              {product.descripcion && (
                <p className="product-detail__description">{product.descripcion}</p>
              )}

              {product.opciones && (
                <fieldset className="product-choice">
                  <legend>{product.etiquetaOpciones ?? 'Opciones'}</legend>
                  <div className="product-choice__list">
                    {product.opciones.map((option, index) => (
                      <label className="product-choice__item" key={option}>
                        <input
                          type="radio"
                          name={`${product.id}-option`}
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

              {product.presentaciones && (
                <fieldset className="product-choice">
                  <legend>Presentación</legend>
                  <div className="product-choice__list">
                    {product.presentaciones.map((presentation, index) => (
                      <label className="product-choice__item" key={presentation.nombre}>
                        <input
                          type="radio"
                          name={`${product.id}-presentation`}
                          value={presentation.nombre}
                          checked={selectedPresentationIndex === index}
                          onChange={() => setSelectedPresentationIndex(index)}
                        />
                        <span>{presentation.nombre}</span>
                        <strong>{formatPrice(presentation.precio)}</strong>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {product.variantes && (
                <fieldset className="product-choice">
                  <legend>Variante</legend>
                  <div className="product-choice__list">
                    {product.variantes.map((variant, index) => (
                      <label className="product-choice__item" key={`${variant.nombre}-${variant.presentacion}`}>
                        <input
                          type="radio"
                          name={`${product.id}-variant`}
                          value={`${variant.nombre}-${variant.presentacion}`}
                          checked={selectedVariantIndex === index}
                          onChange={() => setSelectedVariantIndex(index)}
                        />
                        <span>{variant.nombre} — {variant.presentacion}</span>
                        <strong>{formatPrice(variant.precio)}</strong>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset className="product-choice">
                <legend>Extras</legend>
                {product.extras.length > 0 ? (
                  <div className="product-choice__list">
                    {product.extras.map((extra) => (
                      <label className="product-choice__item" key={extra.id}>
                        <input
                          type="checkbox"
                          value={extra.id}
                          checked={selectedExtraIds.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                        />
                        <span>{extra.nombre}</span>
                        <strong>+{formatPrice(extra.precio)}</strong>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="product-choice__empty">Sin extras disponibles por el momento.</p>
                )}
              </fieldset>

              <div className="product-observations">
                <label htmlFor={`${product.id}-observations`}>Observaciones</label>
                <textarea
                  id={`${product.id}-observations`}
                  value={observations}
                  placeholder="Ej. sin tomate, salsa aparte..."
                  onChange={(event) => setObservations(event.target.value)}
                />
              </div>

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
                {totalExtras > 0 && (
                  <>
                    <div>
                      <span>Precio base</span>
                      <strong>{formatPrice(basePrice)}</strong>
                    </div>
                    <div>
                      <span>Extras</span>
                      <strong>+{formatPrice(totalExtras)}</strong>
                    </div>
                  </>
                )}
                <div>
                  <span>Precio unitario</span>
                  <strong>{formatPrice(unitPrice)}</strong>
                </div>
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
              </div>

              <button
                className="add-to-cart-preview"
                type="button"
                disabled={!canAdd}
                onClick={handleAddToCart}
              >
                {isEditing ? 'Guardar cambios' : 'Agregar al carrito'}
              </button>

              {!isEditing && wasAdded && (
                <p className="product-added-message" role="status">
                  Producto agregado al carrito. <Link to="/carrito">Ver carrito</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { items } = useCart()
  const product = products.find((item) => item.id === id)
  const editingItemId = searchParams.get('editar')
  const editingItem = editingItemId
    ? items.find((item) => item.id === editingItemId)
    : null

  if (!product) {
    return (
      <main className="product-detail-page">
        <section className="page-section product-not-found" aria-labelledby="product-not-found-title">
          <div className="content-width">
            <h1 id="product-not-found-title">Producto no encontrado</h1>
            <Link className="primary-action" to="/catalogo">Volver al catálogo</Link>
          </div>
        </section>
      </main>
    )
  }

  if (editingItemId && (!editingItem || editingItem.productId !== product.id)) {
    return (
      <main className="product-detail-page">
        <section className="page-section product-not-found" aria-labelledby="cart-item-not-found-title">
          <div className="content-width">
            <h1 id="cart-item-not-found-title">Producto no encontrado en el carrito</h1>
            <Link className="primary-action" to="/carrito">Volver al carrito</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <ProductDetail
      product={product}
      editingItem={editingItem}
      key={`${product.id}-${editingItemId ?? 'new'}`}
    />
  )
}

export default ProductDetailPage
