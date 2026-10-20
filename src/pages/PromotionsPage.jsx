import { Link } from 'react-router-dom'
import promotions from '../data/promotions.js'
import formatPrice from '../utils/formatPrice.js'

const activePromotions = promotions
  .filter((promotion) => promotion.activo)

const promotionSections = [
  {
    id: 'martes',
    titulo: 'Martes',
    descripcion: 'Promociones disponibles los martes',
    dias: ['Martes'],
    acceso: 'Martes',
  },
  {
    id: 'miercoles',
    titulo: 'Miércoles',
    descripcion: 'Promociones disponibles los miércoles',
    dias: ['Miércoles'],
    acceso: 'Miércoles',
  },
  {
    id: 'jueves',
    titulo: 'Jueves',
    descripcion: 'Promociones disponibles los jueves',
    dias: ['Jueves'],
    acceso: 'Jueves',
  },
  {
    id: 'viernes',
    titulo: 'Viernes',
    descripcion: 'Promociones disponibles los viernes',
    dias: ['Viernes'],
    acceso: 'Viernes',
  },
  {
    id: 'viernes-sabado',
    titulo: 'Viernes y sábado',
    descripcion: 'Promociones disponibles viernes y sábado',
    dias: ['Viernes', 'Sábado'],
    acceso: 'Viernes y sábado',
  },
  {
    id: 'semana',
    titulo: 'Promociones de la semana',
    descripcion: 'Ofertas sin un día específico',
    dias: [],
    acceso: 'De la semana',
  },
]

function getPromotionsBySection(section) {
  return activePromotions
    .filter((promotion) => (
      section.dias.length === 0
        ? promotion.diasDisponibles.length === 0
        : promotion.diasDisponibles.length === section.dias.length
          && section.dias.every((day) => promotion.diasDisponibles.includes(day))
    ))
    .sort((first, second) => first.orden - second.orden)
}

function getPromotionDisplayTitle(title) {
  return title
    .replace(/^(?:Promo de )?(?:Martes|Miércoles|Jueves|Viernes)(?: de Promo)? - /, '')
    .replace(/^Viernes y Sábados /, '')
    .replace(/^Promo de /, '')
}

function shouldShowAvailability(promotion, section) {
  return section.dias.length === 0
    || promotion.diasDisponibles.length !== section.dias.length
    || !section.dias.every((day) => promotion.diasDisponibles.includes(day))
}

function PromotionsPage() {
  return (
    <main className="promotions-page">
      <section className="page-section promotions" aria-labelledby="promotions-title">
        <div className="content-width">
          <div className="promotions__intro">
            <h2 id="promotions-title">Promociones</h2>
            <div className="promotions__intro-details">
              <p>Descubre las promociones disponibles. Algunas ofertas cambian según el día.</p>
              <span className="promotions__closed">Lunes cerrado</span>
            </div>
          </div>

          <nav className="promotions__quick-nav" aria-label="Accesos rápidos por día">
            {promotionSections.map((section) => (
              <a href={`#promotions-${section.id}`} key={section.id}>{section.acceso}</a>
            ))}
          </nav>

          <div className="promotions__days">
            {promotionSections.map((section) => {
              const sectionPromotions = getPromotionsBySection(section)

              if (sectionPromotions.length === 0) return null

              return (
                <section
                  className={`promotion-day promotion-day--${section.id}`}
                  id={`promotions-${section.id}`}
                  aria-labelledby={`promotions-${section.id}-title`}
                  key={section.id}
                >
                  <div className="promotion-day__heading">
                    <h3 id={`promotions-${section.id}-title`}>{section.titulo}</h3>
                    <p>{section.descripcion}</p>
                  </div>

                  <div className="promotion-grid">
                    {sectionPromotions.map((promotion) => (
                      <article
                        className={`promotion-card${promotion.productos.length > 4 ? ' promotion-card--wide' : ''}`}
                        key={promotion.id}
                      >
                        {promotion.imagen && (
                          <div className="promotion-card__visual">
                            <img src={promotion.imagen} alt={`Promoción ${getPromotionDisplayTitle(promotion.titulo)}`} />
                          </div>
                        )}
                        <div className="promotion-card__content">
                          <div className="promotion-card__heading">
                            {shouldShowAvailability(promotion, section) && (
                              <span className="promotion-card__availability">{promotion.disponibilidadTexto}</span>
                            )}
                            <h4>{getPromotionDisplayTitle(promotion.titulo)}</h4>
                          </div>

                          <div className="promotion-card__offers">
                            {promotion.productos.map((product) => (
                              <div className="promotion-offer" key={product.nombre}>
                                <div className="promotion-offer__details">
                                  <strong>{product.nombre}</strong>
                                  {product.opciones && (
                                    <p>Opciones: {product.opciones.join(' · ')}</p>
                                  )}
                                </div>
                                <strong className="promotion-offer__price">{formatPrice(product.precio)}</strong>
                              </div>
                            ))}
                          </div>

                          <Link className="promotion-card__action" to={`/promocion/${promotion.id}`}>
                            Ver promoción
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PromotionsPage
