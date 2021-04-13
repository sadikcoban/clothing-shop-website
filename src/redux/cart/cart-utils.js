export const addItemToCart = (cartItems, newItem) => {
  const existingCartItem = cartItems.find((item) => item.id === newItem.id)

  if (existingCartItem) {
    return cartItems.map((i) =>
      i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
    )
  }

  return [...cartItems, { ...newItem, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, item) => {
  const existingItem = cartItems.find((i) => i.id === item.id)

  if (existingItem.quantity === 1) {
    return cartItems.filter((i) => i.id !== item.id)
  }

  return cartItems.map((i) =>
    i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
  )
}
