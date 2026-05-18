import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'yk-cart'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = (product, size, quantity = 1) => {
    if (!size) return false
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && i.size === size
      )
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...prev,
        {
          cartItemId: `${product.id}-${size}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          sizes: product.sizes || ['S', 'M', 'L', 'XL'],
          size,
          quantity,
        },
      ]
    })
    return true
  }

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeItem(cartItemId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    )
  }

  const updateSize = (cartItemId, size) => {
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, size } : i))
    )
  }

  const removeItem = (cartItemId) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId))
  }

  const clearCart = () => setItems([])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const value = {
    items,
    itemCount,
    total,
    addItem,
    updateQuantity,
    updateSize,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
