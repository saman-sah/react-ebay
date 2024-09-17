"use client"


import { toast } from "react-toastify"
import { useState, useEffect } from 'react'

import { useCart } from "../../context/cart"
import MainLayout from "../../layouts/MainLayout"
import useIsLoading from "../../hooks/useIsLoading"
import SimilarProducts from '../../components/SimilarProducts'

import { ContextParams, Product as ProductType, CartContextType } from '../../types'

export default function Product({ params }: ContextParams) {

  const cart: CartContextType = useCart()
  const [product, setProduct] = useState<ProductType>()

  const getProduct = async (): Promise<void> => {
    useIsLoading(true)
    setProduct(undefined)

    const response = await fetch(`/api/product/${params.id}`)
    const result: ProductType = await response.json()
    setProduct(result)
    cart.isItemAddedToCart(result)
    useIsLoading(false)
  }

  useEffect(() => {
    getProduct()
  }, [])


  return (
    <>
      <MainLayout>
        <div className='max-w-[1200] mx-auto'>
          <div className='flex px-4 py-10'>
            {
              product?.url
                ? <img className='w-[40%] rounded-lg' src={product?.url + '/200'} />
                : <div className='w-[40%]'></div>
            }
            <div className='px-4 w-full'>
              <div className='font-bold text-xl'>{product?.title}</div>
              <div className='text-sm text-gray-700 pt-2'>Brand New - Full Warranty</div>
              <div className='border-b py-1' />
              <div className='pt-3 pb-2'>
                <div className='flex items-center'>
                  Condition: <span className='font-bold text-[17px] ml-2'>New</span>
                </div>
              </div>
              <div className='border-b py-1' />
              <div className='pt-3'>
                <div className='w-full flex items-center justify-between'>
                  <div className='flex items-center'>
                    Price:
                    {
                      product?.price
                        ? <div className='font-bold text-[20px] ml-2'>
                          GBP {(product?.price / 100).toFixed(2)}
                        </div>
                        : null
                    }
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!product) {
                      toast.error('Product not loaded', { autoClose: 3000 })
                      return
                    }
                    if (cart.isItemAdded) {
                      cart.removeFromCart(product)
                      toast.info('Removed from cart', { autoClose: 3000 })
                    } else {
                      cart.addToCart(product)
                      toast.info('Added to cart', { autoClose: 3000 })
                    }
                  }}
                  className={
                    `
                      bg-[#3498c9] text-white py-2 px-20 rounded-full cursor-pointer
                      ${cart.isItemAdded ? 'bg-[#e9a321 hover:bg-[#bf851a]' : 'bg-[#3498C9] hover:bg-[#0054A0]'}
                    `
                  }
                >
                  {cart.isItemAdded ? 'Remove From Cart' : 'Add to Cart'}
                </button>
                <div className='border-b py-1' />
                <div className='pt-3'>
                  <div className='font-semibold pb-1'>
                    Description
                  </div>
                  <div className='text-sm'>
                    {product?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimilarProducts />
      </MainLayout>
    </>
  )
}