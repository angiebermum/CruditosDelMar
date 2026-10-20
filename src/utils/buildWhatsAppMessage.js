import business from '../data/business.js'
import formatPrice from './formatPrice.js'

function getOptionLabel(optionLabel) {
  return (optionLabel ?? 'Opción').replace(/ a elegir$/, '')
}

function getPromotionName(name) {
  return name
    .replace(/^(?:Promo de )?(?:Martes|Miércoles|Jueves|Viernes)(?: de Promo)? - /, '')
    .replace(/^Viernes y Sábados /, '')
    .replace(/^Promo de /, '')
}

function getItemLines(item) {
  if (item.type === 'promocion') {
    return [
      `*${item.quantity} x Promo ${getPromotionName(item.name)}*`,
      'Incluye:',
      ...item.includedProducts.split(' + ').map((product) => `- ${product}`),
      item.option && `Opción: ${item.option}`,
    ].filter(Boolean)
  }

  return [
    `*${item.quantity} x ${item.name}*`,
    item.presentation && `Presentación: ${item.presentation}`,
    item.variant && `Variante: ${item.variant.name} ${item.variant.presentation}`,
    item.option && `${getOptionLabel(item.optionLabel)}: ${item.option}`,
    item.extras.length > 0 && `Extras: ${item.extras.map((extra) => extra.name).join(', ')}`,
    item.observations && `Obs.: ${item.observations}`,
  ].filter(Boolean)
}

function buildWhatsAppMessage({
  items,
  totalPrice,
  name,
  phone,
  deliveryMethod,
  address,
  paymentMethod,
  expressCoordination,
}) {
  const lines = [
    `Hola, ${business.nombre}.`,
    '',
    '*PEDIDO*',
    '',
    ...items.flatMap((item) => [...getItemLines(item), '']),
    `*TOTAL: ${formatPrice(totalPrice)}*`,
    '',
    '*CLIENTE*',
    `${name.trim()} - ${phone.trim()}`,
    '',
    '*ENTREGA*',
  ]

  if (deliveryMethod === 'express') {
    if (expressCoordination === 'business') {
      lines.push('Express - Cruditos coordina', `Dirección: ${address.trim()}`)
    } else {
      lines.push('Express - cliente coordina')
    }

    lines.push(
      '',
      '*PAGO*',
      'SINPE - comprobante requerido',
      '',
      'Pedido pendiente de preparación hasta recibir el comprobante.',
    )
  } else {
    lines.push(
      'Retiro en el local',
      '',
      '*PAGO*',
      paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo',
    )
  }

  return lines.join('\n')
}

export function getWhatsAppUrl(message) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}

export default buildWhatsAppMessage
