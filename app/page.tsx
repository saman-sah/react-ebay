"use client"

import { useState, useEffect } from 'react'

import Product from './components/Product'
import MainLayout from './layouts/MainLayout'
import useIsLoading from './hooks/useIsLoading'
import CarouselComp from './components/CarouselComp'

export default function Home() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    useIsLoading(true)
    const response = await fetch('/api/products')
    const result = await response.json()

    setProducts(result)
    useIsLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <MainLayout>
      <CarouselComp />

      <div className='max-w-[1200] mx-auto'>
        <div className='text-2xl font-bold mt-4 mb-6 px-4'>Products</div>
        <div className='grid grid-cols-5 gap-4'>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
