"use client"

import MainLayout from "../layouts/MainLayout"
import SimilarProducts from "../components/SimilarProducts"
import CartItem from '../components/CartItem'

export default function Cart() {
  const product = {
    id: 1,
    title: 'Brown Leather Bag',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
    url: 'https://picsum.photos/id/7',
    price: 2500
  }
  return (
    <>
      <MainLayout>
        <div className='max-w-[1200px] mx-auto min-h-[300px]'>
          <div className='text-2xl font-bold my-4'>
            Shopping Cart
          </div>
          <div className='relative flex items-baseline justify-between gap-2'>
            <div className='w-[65%]'>
              <CartItem
                key={product.id}
                product={product}
              />
            </div>
            <div
              id='GoToCheckout'
              className='md-w-[33%] absolute top-0 m-2 right-0'
            >
              <div className='bg-white p-4 border'>
                <button className='flex items-center justify-between bg-blue-600 w-full text-white font-semibold p-3 rounded-full mt-4'>
                  Go to Checkout
                </button>

                <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                  <div>Items (3)</div>
                  <div>12.99</div>
                </div>

                <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                  <div>Shipping</div>
                  <div>Free</div>
                </div>

                <div className='border-b border-gray-300' />

                <div className='flex items-center justify-between mt-4 mb-1 text-lg font-semibold'>
                  <div>Subtotal</div>
                  <div>12.99</div>
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