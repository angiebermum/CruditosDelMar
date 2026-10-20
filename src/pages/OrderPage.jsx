import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import business from '../data/business.js'
import buildWhatsAppMessage, { getWhatsAppUrl } from '../utils/buildWhatsAppMessage.js'
import formatPrice from '../utils/formatPrice.js'

const deliveryLabels = {
  pickup: 'Retiro en el local',
  express: 'Express',
}

const paymentLabels = {
  cash: 'Efectivo',
  card: 'Tarjeta',
}

const coordinationOptions = [
  {
    value: 'customer',
    label: 'Yo coordino mi servicio de express',
    help: 'Puedes solicitar el servicio de mensajería por tu cuenta. El costo del envío se paga directamente al mensajero y no está incluido en el total del pedido.',
  },
  {
    value: 'business',
    label: 'Deseo que Cruditos del Mar coordine el servicio de express',
    help: 'Cruditos del Mar coordinará un mensajero para realizar la entrega. El costo del envío no está incluido en el total del pedido y deberás pagarlo directamente al mensajero.',
  },
]

const orderDraftKey = 'cruditosDelMarOrderDraft'

const emptyOrderDraft = {
  name: '',
  phone: '',
  deliveryMethod: '',
  address: '',
  paymentMethod: '',
  expressCoordination: '',
}

function readOrderDraft() {
  try {
    const storedDraft = JSON.parse(window.sessionStorage.getItem(orderDraftKey))
    const hasValidFields = storedDraft
      && typeof storedDraft === 'object'
      && !Array.isArray(storedDraft)
      && typeof storedDraft.name === 'string'
      && typeof storedDraft.phone === 'string'
      && ['', 'pickup', 'express'].includes(storedDraft.deliveryMethod)
      && typeof storedDraft.address === 'string'
      && ['', 'cash', 'card'].includes(storedDraft.paymentMethod)
      && ['', 'customer', 'business'].includes(storedDraft.expressCoordination ?? '')

    return hasValidFields ? { ...emptyOrderDraft, ...storedDraft } : emptyOrderDraft
  } catch {
    return emptyOrderDraft
  }
}

function OrderItems({ items }) {
  return (
    <ul className="order-summary__items">
      {items.map((item) => (
        <li key={item.id}>
          <div className="order-summary__item-heading">
            <strong>{item.name}</strong>
            <span>× {item.quantity}</span>
          </div>
          {item.type === 'promocion' ? (
            <div className="order-summary__configuration">
              <span>Promoción</span>
              <span>Incluye: {item.includedProducts}</span>
              {item.option && <span>Opción: {item.option}</span>}
            </div>
          ) : (
            <div className="order-summary__configuration">
              {item.presentation && <span>Presentación: {item.presentation}</span>}
              {item.option && <span>{item.optionLabel ?? 'Opción'}: {item.option}</span>}
              {item.variant && <span>Variante: {item.variant.name} — {item.variant.presentation}</span>}
              {item.extras.map((extra) => (
                <span key={extra.id}>Extra: {extra.name} (+{formatPrice(extra.price)})</span>
              ))}
              {item.observations && <span>Observaciones: {item.observations}</span>}
            </div>
          )}
          <strong className="order-summary__subtotal">{formatPrice(item.subtotal)}</strong>
        </li>
      ))}
    </ul>
  )
}

function SinpeDetails() {
  return (
    <div className="order-sinpe">
      <p className="order-sinpe__title">Pago de los productos</p>
      <dl>
        <div>
          <dt>SINPE Móvil</dt>
          <dd>{business.sinpeNumero}</dd>
        </div>
        <div>
          <dt>A nombre de</dt>
          <dd>{business.sinpeReceptor}</dd>
        </div>
      </dl>
      <p className="order-sinpe__note">
        El costo del servicio de express no está incluido en el total del pedido y se paga directamente al mensajero.
      </p>
      <p className="order-sinpe__note">
        El comprobante se adjunta en WhatsApp. El pedido se prepara cuando {business.nombre} lo reciba y verifique.
      </p>
    </div>
  )
}

function OrderPage() {
  const { items, totalPrice } = useCart()
  const [initialDraft] = useState(readOrderDraft)
  const [name, setName] = useState(initialDraft.name)
  const [phone, setPhone] = useState(initialDraft.phone)
  const [deliveryMethod, setDeliveryMethod] = useState(initialDraft.deliveryMethod)
  const [paymentMethod, setPaymentMethod] = useState(initialDraft.paymentMethod)
  const [address, setAddress] = useState(initialDraft.address)
  const [expressCoordination, setExpressCoordination] = useState(initialDraft.expressCoordination)
  const [errors, setErrors] = useState({})
  const [isReviewing, setIsReviewing] = useState(false)

  useEffect(() => {
    const orderDraft = {
      name,
      phone,
      deliveryMethod,
      address,
      paymentMethod,
      expressCoordination,
    }

    try {
      window.sessionStorage.setItem(orderDraftKey, JSON.stringify(orderDraft))
    } catch {
      // El formulario sigue funcionando aunque sessionStorage no esté disponible.
    }
  }, [name, phone, deliveryMethod, address, paymentMethod, expressCoordination])

  if (items.length === 0) {
    return (
      <main className="order-page">
        <section className="page-section order order--empty" aria-labelledby="order-title">
          <div className="content-width">
            <h1 id="order-title">Tu carrito está vacío.</h1>
            <Link className="primary-action" to="/catalogo">Ver catálogo</Link>
          </div>
        </section>
      </main>
    )
  }

  const isExpress = deliveryMethod === 'express'
  const needsAddress = isExpress && expressCoordination === 'business'

  function validateOrder() {
    const nextErrors = {}

    if (!name.trim()) nextErrors.name = 'Ingresa tu nombre.'
    if (phone.replace(/\D/g, '').length < 8) nextErrors.phone = 'Ingresa un teléfono válido de al menos 8 dígitos.'
    if (!deliveryMethod) nextErrors.deliveryMethod = 'Selecciona cómo deseas recibir tu pedido.'
    if (deliveryMethod === 'pickup' && !paymentMethod) {
      nextErrors.paymentMethod = 'Selecciona una forma de pago.'
    }
    if (needsAddress && !address.trim()) {
      nextErrors.address = 'Ingresa la dirección de entrega.'
    }
    if (isExpress && !expressCoordination) {
      nextErrors.expressCoordination = 'Selecciona quién coordinará el servicio de express.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleReview(event) {
    event.preventDefault()
    if (validateOrder()) setIsReviewing(true)
  }

  const resolvedPaymentMethod = isExpress
    ? 'SINPE Móvil'
    : paymentLabels[paymentMethod]
  const coordinationLabel = coordinationOptions
    .find((option) => option.value === expressCoordination)?.label

  if (isReviewing) {
    const whatsAppUrl = getWhatsAppUrl(buildWhatsAppMessage({
      items,
      totalPrice,
      name,
      phone,
      deliveryMethod,
      address,
      paymentMethod,
      expressCoordination,
    }))

    return (
      <main className="order-page">
        <section className="page-section order" aria-labelledby="order-title">
          <div className="content-width">
            <header className="order__heading">
              <p className="section-label">Pedido listo para enviar</p>
              <h1 id="order-title">Revisa tu pedido</h1>
              <p>Verifica la información y envía tu pedido por WhatsApp.</p>
            </header>

            <div className="order-review">
              <div className="order-review__main">
                <section className="order-card" aria-labelledby="customer-review-title">
                  <h2 id="customer-review-title">Datos del pedido</h2>
                  <dl className="order-review__details">
                    <div><dt>Nombre</dt><dd>{name.trim()}</dd></div>
                    <div><dt>Teléfono</dt><dd>{phone.trim()}</dd></div>
                    <div><dt>Entrega</dt><dd>{deliveryLabels[deliveryMethod]}</dd></div>
                    {isExpress && <div><dt>Coordinación</dt><dd>{coordinationLabel}</dd></div>}
                    {needsAddress && <div><dt>Dirección</dt><dd>{address.trim()}</dd></div>}
                    <div><dt>Forma de pago</dt><dd>{resolvedPaymentMethod}</dd></div>
                    {isExpress && (
                      <>
                        <div><dt>SINPE</dt><dd>{business.sinpeNumero}</dd></div>
                        <div><dt>Receptor</dt><dd>{business.sinpeReceptor}</dd></div>
                        <div><dt>Comprobante</dt><dd>Debes adjuntarlo directamente en WhatsApp.</dd></div>
                      </>
                    )}
                  </dl>
                  {isExpress && (
                    <p className="order-notice">Costo del express no incluido en el total.</p>
                  )}
                  {!isExpress && (
                    <p className="order-notice">El pago se realiza directamente en el local al retirar el pedido.</p>
                  )}
                  <button className="order__secondary-action" type="button" onClick={() => setIsReviewing(false)}>
                    Editar datos
                  </button>
                </section>

                <section className="order-card order-send" aria-labelledby="send-order-title">
                  <h2 id="send-order-title">Enviar pedido</h2>
                  {isExpress ? (
                    <div className="order-send__receipt-note">
                      <strong>Adjunta tu comprobante en WhatsApp</strong>
                      <p>
                        Tu pedido se preparará únicamente después de que {business.nombre} reciba y verifique el comprobante de pago. Al abrir WhatsApp, adjunta el comprobante antes de enviar el pedido.
                      </p>
                    </div>
                  ) : (
                    <p>
                      WhatsApp se abrirá directamente en el chat de {business.nombre} con tu pedido ya escrito. Tu pedido se envía cuando presionas enviar en WhatsApp.
                    </p>
                  )}
                  <a
                    className="order__review-action order-send__action"
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isExpress ? 'Abrir WhatsApp y adjuntar comprobante' : 'Abrir WhatsApp de Cruditos'}
                  </a>
                </section>
              </div>

              <aside className="order-summary" aria-labelledby="review-summary-title">
                <h2 id="review-summary-title">Productos</h2>
                <OrderItems items={items} />
                <div className="order-summary__total">
                  <span>Total</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
                <Link className="order-summary__edit" to="/carrito">Editar carrito</Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="order-page">
      <section className="page-section order" aria-labelledby="order-title">
        <div className="content-width">
          <header className="order__heading">
            <p className="section-label">Datos del pedido</p>
            <h1 id="order-title">Completa tu información</h1>
          </header>

          <div className="order__layout">
            <form className="order-form order-card" noValidate onSubmit={handleReview}>
              <div className="order-field">
                <label htmlFor="customer-name">Nombre</label>
                <input
                  id="customer-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'customer-name-error' : undefined}
                  onChange={(event) => setName(event.target.value)}
                />
                {errors.name && <span className="order-field__error" id="customer-name-error">{errors.name}</span>}
              </div>

              <div className="order-field">
                <label htmlFor="customer-phone">Teléfono</label>
                <input
                  id="customer-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'customer-phone-error' : undefined}
                  onChange={(event) => setPhone(event.target.value)}
                />
                {errors.phone && <span className="order-field__error" id="customer-phone-error">{errors.phone}</span>}
              </div>

              <fieldset className="order-choice" aria-describedby={errors.deliveryMethod ? 'delivery-method-error' : undefined}>
                <legend>¿Cómo deseas recibir tu pedido?</legend>
                <label>
                  <input
                    type="radio"
                    name="delivery-method"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(event) => setDeliveryMethod(event.target.value)}
                  />
                  <span>Retiro en el local</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery-method"
                    value="express"
                    checked={isExpress}
                    onChange={(event) => setDeliveryMethod(event.target.value)}
                  />
                  <span>Express</span>
                </label>
                {errors.deliveryMethod && (
                  <span className="order-field__error" id="delivery-method-error">{errors.deliveryMethod}</span>
                )}
              </fieldset>

              {deliveryMethod === 'pickup' && (
                <fieldset className="order-choice" aria-describedby={errors.paymentMethod ? 'payment-method-error' : undefined}>
                  <legend>Forma de pago</legend>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    <span>Efectivo</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    <span>Tarjeta</span>
                  </label>
                  <p>El pago se realiza directamente en el local al retirar el pedido.</p>
                  {errors.paymentMethod && (
                    <span className="order-field__error" id="payment-method-error">{errors.paymentMethod}</span>
                  )}
                </fieldset>
              )}

              {isExpress && (
                <>
                  <fieldset
                    className="order-choice order-choice--detailed"
                    aria-describedby={errors.expressCoordination ? 'express-coordination-error' : undefined}
                  >
                    <legend>¿Quién coordinará el servicio de express?</legend>
                    {coordinationOptions.map((option) => (
                      <label key={option.value}>
                        <input
                          type="radio"
                          name="express-coordination"
                          value={option.value}
                          checked={expressCoordination === option.value}
                          onChange={(event) => setExpressCoordination(event.target.value)}
                        />
                        <span>
                          <strong>{option.label}</strong>
                          <small>{option.help}</small>
                        </span>
                      </label>
                    ))}
                    {errors.expressCoordination && (
                      <span className="order-field__error" id="express-coordination-error">{errors.expressCoordination}</span>
                    )}
                  </fieldset>

                  {needsAddress && (
                    <div className="order-field">
                      <label htmlFor="delivery-address">Dirección de entrega</label>
                      <textarea
                        id="delivery-address"
                        autoComplete="street-address"
                        value={address}
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={errors.address ? 'delivery-address-error' : undefined}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                      {errors.address && (
                        <span className="order-field__error" id="delivery-address-error">{errors.address}</span>
                      )}
                    </div>
                  )}

                  <SinpeDetails />
                </>
              )}

              <button className="order__review-action" type="submit">Revisar pedido</button>
            </form>

            <aside className="order-summary" aria-labelledby="order-summary-title">
              <h2 id="order-summary-title">Resumen del carrito</h2>
              <OrderItems items={items} />
              <div className="order-summary__total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <Link className="order-summary__edit" to="/carrito">Editar carrito</Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OrderPage
