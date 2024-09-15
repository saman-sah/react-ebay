"use client"

import { BiLoader } from 'react-icons/bi'
import { useState, useEffect } from 'react'

import ProductComp from './Product'

import type { Product } from "../types"

export default function SimilarProducts() {

  const [products, setProducts] = useState<Product[]>([])

  const getSimilarProducts = async () => {
    try {
      const response = await fetch('/api/products/get-random')
      const result: Product[] = await response.json()
      if (result) {
        setProducts(result)
        return
      }
      setProducts([])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSimilarProducts()
  }, [])

  return (
    <>
      <div>
        <div className='border-b py-1 max-w-[1200px] mx-auto' />
        <div className='max-w-[1200px] mx-auto'>
          <div className='font-bold text-2xl py-2 mt-4'>
            Similar sponsored items
          </div>
          {
            products.length > 0
              ? <div className='grid grid-cols-5 gap-4'>
                {
                  products.map(product => (
                    <ProductComp key={product.id} product={product} />
                  ))
                }
              </div>
              : <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-4 font-semibold'>
                  <BiLoader
                    size={30}
                    className='text-blue-400 animate-spin'
                  />
                  Loading Products ...
                </div>
              </div>
          }
        </div>
      </div>
    </>
  )
}