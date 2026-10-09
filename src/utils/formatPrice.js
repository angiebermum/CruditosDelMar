function formatPrice(price) {
  const formattedPrice = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `₡${formattedPrice}`
}

export default formatPrice
