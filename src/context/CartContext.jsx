import { useEffect, useState } from 'react'
import { CartContext } from './useCart.js'

const STORAGE_KEY = 'cruditosDelMarCart'

function isOptionalString(value) {
  return value === null || typeof value === 'string'
}

function isValidExtra(extra) {
  return extra
    && typeof extra.id === 'string'
    && typeof extra.name === 'string'
    && Number.isFinite(extra.price)
    && extra.price >= 0
}

function isValidCartItem(item) {
  return item
    && typeof item.productId === 'string'
    && typeof item.name === 'string'
    && typeof item.category === 'string'
    && Number.isInteger(item.quantity)
    && item.quantity >= 1
    && Number.isFinite(item.basePrice)
    && item.basePrice >= 0
    && Number.isFinite(item.unitPrice)
    && item.unitPrice >= 0
    && Number.isFinite(item.subtotal)
    && item.subtotal === item.unitPrice * item.quantity
    && isOptionalString(item.presentation)
    && isOptionalString(item.option)
    && isOptionalString(item.optionLabel)
    && (item.variant === null || (
      typeof item.variant?.name === 'string'
      && typeof item.variant?.presentation === 'string'
    ))
    && Array.isArray(item.extras)
    && item.extras.every(isValidExtra)
    && typeof item.observations === 'string'
}

function isValidPromotionItem(item) {
  return item
    && item.type === 'promocion'
    && typeof item.promotionId === 'string'
    && typeof item.name === 'string'
    && typeof item.includedProducts === 'string'
    && isOptionalString(item.option)
    && Number.isInteger(item.quantity)
    && item.quantity >= 1
    && Number.isFinite(item.unitPrice)
    && item.unitPrice >= 0
    && Number.isFinite(item.subtotal)
    && item.subtotal === item.unitPrice * item.quantity
}

function isValidStoredItem(item) {
  return typeof item?.id === 'string' && (isValidCartItem(item) || isValidPromotionItem(item))
}

function readStoredCart() {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY)
    if (!storedCart) return []

    const parsedCart = JSON.parse(storedCart)
    return Array.isArray(parsedCart) && parsedCart.every(isValidStoredItem) ? parsedCart : []
  } catch {
    return []
  }
}

function getConfigurationKey(item) {
  if (item.type === 'promocion') {
    return JSON.stringify({
      type: item.type,
      promotionId: item.promotionId,
      includedProducts: item.includedProducts,
      option: item.option,
    })
  }

  return JSON.stringify({
    productId: item.productId,
    presentation: item.presentation,
    option: item.option,
    variant: item.variant,
    extras: item.extras.map((extra) => extra.id).sort(),
    observations: item.observations,
  })
}

function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // The cart remains usable in memory when storage is unavailable.
    }
  }, [items])

  function addItem(item) {
    if (!isValidCartItem(item) && !isValidPromotionItem(item)) return false

    const id = getConfigurationKey(item)

    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.id === id)

      if (existingItem) {
        return currentItems.map((currentItem) => {
          if (currentItem.id !== id) return currentItem

          const quantity = currentItem.quantity + item.quantity
          return {
            ...currentItem,
            quantity,
            subtotal: currentItem.unitPrice * quantity,
          }
        })
      }

      return [...currentItems, {
        ...item,
        id,
        subtotal: item.unitPrice * item.quantity,
      }]
    })

    return true
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  function updateItem(id, item) {
    if (!items.some((currentItem) => currentItem.id === id) || !isValidCartItem(item)) return false

    const nextId = getConfigurationKey(item)

    setItems((currentItems) => {
      const remainingItems = currentItems.filter((currentItem) => currentItem.id !== id)
      const equivalentItem = remainingItems.find((currentItem) => currentItem.id === nextId)

      if (equivalentItem) {
        return remainingItems.map((currentItem) => {
          if (currentItem.id !== nextId) return currentItem

          const quantity = currentItem.quantity + item.quantity
          return {
            ...currentItem,
            quantity,
            subtotal: currentItem.unitPrice * quantity,
          }
        })
      }

      return currentItems.map((currentItem) => (
        currentItem.id === id
          ? { ...item, id: nextId, subtotal: item.unitPrice * item.quantity }
          : currentItem
      ))
    })

    return true
  }

  function updateQuantity(id, nextQuantity) {
    if (!Number.isInteger(nextQuantity) || nextQuantity < 1) return

    setItems((currentItems) => currentItems.map((item) => (
      item.id === id
        ? { ...item, quantity: nextQuantity, subtotal: item.unitPrice * nextQuantity }
        : item
    )))
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.subtotal, 0)
  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
