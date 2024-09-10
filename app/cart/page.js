"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useCart } from '../context/cart'

import CartItem from '../components/CartItem'
import MainLayout from "../layouts/MainLayout"
import ClientOnly from "../components/ClientOnly"
import useIsLoading from '../hooks/useIsLoading'
import SimilarProducts from "../components/SimilarProducts"

export default function Cart() {
  const cart = useCart()
  const router = useRouter()

  useEffect(() => {
    useIsLoading(true)
    cart.getCart()
    cart.cartTotal()
    useIsLoading(false)
  }, [cart])

  const goToCheckout = () => {
    if (!Cart.cartTotal()) {
      alert("You dont have any items in the cart")
      return
    }
    router.push('/checkout')
  }

  return (
    <>
      <MainLayout>
        <div className='max-w-[1200px] mx-auto min-h-[300px]'>
          <div className='text-2xl font-bold my-4'>
            Shopping Cart
          </div>
          <div className='relative flex items-baseline justify-between gap-2'>
            <ClientOnly>
              <div className='w-[65%]'>
                {
                  cart.getCart().map(product => (
                    <CartItem
                      key={product.id}
                      product={product}
                    />
                  ))
                }
              </div>
            </ClientOnly>
            <div
              id='GoToCheckout'
              className='md-w-[33%] absolute top-0 m-2 right-0'
            >
              <ClientOnly>
                <div className='bg-white p-4 border'>
                  <button
                    onClick={() => goToCheckout()}
                    className='flex items-center justify-between bg-blue-600 w-full text-white font-semibold p-3 rounded-full mt-4'>
                    Go to Checkout
                  </button>

                  <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                    <div>Items ({cart.getCart().length})</div>
                    <div>${(cart.cartTotal() / 100).toFixed(2)}</div>
                  </div>

                  <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                    <div>Shipping</div>
                    <div>Free</div>
                  </div>

                  <div className='border-b border-gray-300' />

                  <div className='flex items-center justify-between mt-4 mb-1 text-lg font-semibold'>
                    <div>Subtotal</div>
                    <div>${(cart.cartTotal() / 100).toFixed(2)}</div>
                  </div>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
        <SimilarProducts />
      </MainLayout>
    </>
  )
}