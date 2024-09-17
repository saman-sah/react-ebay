"use client"

import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

import MainLayout from "../layouts/MainLayout"
import CheckoutItem from '../components/CheckoutItem'
import useIsLoading from "../hooks/useIsLoading"

import type { Product } from '../types'

export default function Checkout() {
  const [products, setProducts] = useState<Product[]>([])

  const getOrderedProducts = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/products`)
      const result: Product[] = await response.json()

      setProducts(result)
    } catch (error) {
      toast.error('Something went wrong!', { autoClose: 3000 })
    } finally {
      useIsLoading(false)
    }
  }

  useEffect(() => {
    useIsLoading(true)
    getOrderedProducts()
  }, [])

  return (
    <>
      <MainLayout>
        <div
          id='CheckoutPage'
          className='mt-4 max-w-[1100px] mx-auto'
        >
          <div className='text-2xl font-bold mt-4 mb-4'>
            Checkout
          </div>
          <div className='relative flex items-baseline gap-4 justify-between mx-auto w-full'>
            <div className='w-[65%]'>
              <div className='bg-white rounded-lg p-4 border'>
                <div className='text-xl font-semibold mb-2'>
                  Shipping Address
                </div>
                <div className='text-sm mt-2'>
                  <ul>
                    <li>Name: test</li>
                    <li>Address: test</li>
                    <li>Zipcode: test</li>
                    <li>City: test</li>
                    <li>Country: test</li>
                  </ul>
                </div>
              </div>
              <div
                id='Items'
                className='bg-white rounded-lg mt-4'
              >
                {
                  products.map(prod => (
                    <CheckoutItem
                      key={prod.id}
                      product={prod}
                    />
                  ))
                }
              </div>
            </div>
            <div
              id='Placeholder'
              className='relative -top-[6px] w-[35%] border rounded-lg'
            >
              <div className='p-4'>
                <div className='flex items-baseline justify-between text-sm mb-1'>
                  <div>Items (3)</div>
                  <div>12.99</div>
                </div>
                <div className='flex items-center justify-between mb-4 text-sm'>
                  <div>Shipping:</div>
                  <div>Free</div>
                </div>
                <div className='border-t' />
                <div className='flex items-center justify-between my-4'>
                  <div className='font-semibold'> Order total </div>
                  <div className='font-semibold'> 12.99 </div>
                </div>
                <form>
                  <div
                    id='card-element'
                    className='border border-gray-500 rounded-sm'
                  />
                  <p
                    id='card-error'
                    role='alert'
                    className='text-red-700 text-center font-semibold relative top-2'
                  />
                  <button
                    type='submit'
                    className='mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full'
                  >
                    Conirm and Payment
                  </button>
                </form>
              </div>
              <div className='flex items-center p-4 justify-center gap-2 border-t'>
                <img
                  width={50}
                  src='/images/logo.svg'
                />
                <div className='font-light mb-2 mt-2'>
                  MONEY BACK GUARANTEE
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}