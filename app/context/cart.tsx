"use client"

import { useRouter } from "next/navigation"
import { createContext, useState, useContext } from "react"

import Product from "../components/Product"
import { Product as ProductType, CartContextType, ReactNodeProps } from "../types"


const Context = createContext<CartContextType | null>(null)

const Provider = ({ children }: ReactNodeProps) => {
  const router = useRouter()

  const [isItemAdded, setIsItemAdded] = useState<boolean>(false)

  const getCart = (): ProductType[] => {
    let cart: ProductType[] = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }
    return cart
  }

  const addToCart = (product: ProductType): void => {
    let cart: ProductType[] = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    isItemAddedToCart(product)
    router.refresh()
  }

  const removeFromCart = (product: ProductType): void => {
    let cart = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }
    cart = cart.filter((item: ProductType) => item.id !== product.id)
    localStorage.setItem('cart', JSON.stringify(cart))
    isItemAddedToCart(product)
    router.refresh()
  }

  const isItemAddedToCart = (product: ProductType): void => {
    let cart = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }

    cart = cart.filter((item: ProductType) => item.id === product.id)

    if (cart.length > 0) {
      setIsItemAdded(true)
      return
    }

    setIsItemAdded(false)
  }

  const cartCount = (): number => {
    let cart: ProductType[] = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }

    return cart.length
  }

  const cartTotal = (): number => {
    let total = 0
    let cart: ProductType[] = []
    if (typeof localStorage !== 'undefined') {
      cart = JSON.parse(localStorage.getItem('cart') as string) || []
    }

    for (const item in cart) {
      total += cart[item].price
    }

    return total
  }

  const clearCart = (): void => {
    localStorage.removeItem('cart')
    router.refresh()
  }

  const exposed = {
    getCart,
    cartCount,
    addToCart,
    cartTotal,
    clearCart,
    isItemAdded,
    removeFromCart,
    isItemAddedToCart
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>

}

export const useCart = (): CartContextType => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useCart must be used within a Provider")
  }
  return context
}

export default Provider
