function groupProducts(products) {
  const groups = new Map()

  products.forEach((product) => {
    const key = `${product.categoria}:${product.grupo ?? ''}`

    if (!groups.has(key)) {
      groups.set(key, {
        categoria: product.categoria,
        grupo: product.grupo ?? null,
        products: [],
      })
    }

    groups.get(key).products.push(product)
  })

  return Array.from(groups.values(), (group) => ({
    ...group,
    products: [...group.products].sort((first, second) => (first.orden ?? 0) - (second.orden ?? 0)),
  }))
}

export default groupProducts
