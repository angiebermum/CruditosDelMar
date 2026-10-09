function getProductPrices(product) {
  return product.presentaciones ?? [{ nombre: null, precio: product.precio }]
}

export default getProductPrices
