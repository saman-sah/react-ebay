"use client"

import Link from "next/link"
import { CiDeliveryTruck } from 'react-icons/ci'
import MainLayout from "../layouts/MainLayout"

export default function Order() {
  const orders = [
    {
      id: 1,
      stripe_id: '123345345',
      name: 'Saman',
      address: 'Test',
      zipcode: 'Test',
      country: 'test',
      total: 'test',
      orderItems: [
        {
          id: 1,
          title: 'Brown Leather Bag',
          url: 'https://picsum.photos/id/7'
        },
        {
          id: 2,
          title: 'Brown Leather 222',
          url: 'https://picsum.photos/id/7'
        }
      ]
    }
  ]
  return (
    <>
      <MainLayout>
        <div
          id='OrderPage'
          className='mt-4 max-x-[1200px] mx-auto px-2 min-h-[50vh]'
        >
          <div className='bg-white w-full p-6 min-h-[150px]'>
            <div className='flex items-center text-xl'>
              <CiDeliveryTruck
                size={35}
                className='text-green-500'
              />
              <span className='pl-4'>Orders</span>
            </div>
            {
              orders.length > 0
                ? <div className='flex items-center justify-center'>
                  You have no Order history
                </div>
                : null
            }

            {
              orders.map(order => {
                <div className='text-sm pl-[50px]'>
                  <div className='border-b py-1'>
                    <div className='pt-2'>
                      <span className='font-bold mr-2'>Stripe ID:</span>
                      {order?.stripe_id}
                    </div>

                    <div className='pt-2'>
                      <span className='font-bold mr-2'>Deliuvery Address:</span>
                      {order?.name}, {order?.address}, {order?.zipcode}, {order?.city}, {order?.country}
                    </div>

                    <div className='pt-2'>
                      <span className='font-bold mr-2'>Total:</span>
                      {order?.total / 100}
                    </div>

                    <div className='flex items-center gap-4'>
                      {
                        order?.orderItems.map(item => (
                          <div
                            key={item.id}
                            className='flex items-center'
                          >
                            <Link
                              href='/'
                              className='py-1 hover:underline text-blue-500 font-bold'
                            >
                              <img
                                width='120'
                                src={item.url + '/120'}
                                className='rounded'
                              />
                              {item.title}
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </MainLayout>
    </>
  )
}