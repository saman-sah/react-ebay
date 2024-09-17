"use client"

import moment from "moment"

import Link from "next/link"
import { toast } from "react-toastify"
import { CiDeliveryTruck } from 'react-icons/ci'
import { useState, useEffect } from "react"

import { useUser } from "../context/user"
import MainLayout from "../layouts/MainLayout"
import useIsLoading from "../hooks/useIsLoading"
import type { Order as OrderType, OrderItem, UserContextType } from "../types"

export default function Order() {
  const { user } = useUser()
  const [orders, setOrders] = useState<OrderType[]>()

  const getOrders = async (): Promise<void> => {
    try {
      if (!user && !user.id) return
      const response = await fetch('/api/orders')
      const result: OrderType[] = await response.json()
      setOrders(result)
      useIsLoading(false)
    } catch (error) {
      toast.error('Something went wrong!', { autoClose: 3000 })
      useIsLoading(false)
    }
  }

  useEffect(() => {
    useIsLoading(true)
    getOrders()
  }, [user])

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
              orders && orders?.length > 0
                ? <div className='flex items-center justify-center'>
                  You have no Order history
                </div>
                : null
            }

            {
              orders && orders?.length > 0
                ? orders.map(order => (
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

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Order Created:</span>
                        {moment(order?.created_at).calendar()}
                      </div>

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Delivery Time:</span>
                        {moment(order?.created_at).add(3, 'days').calendar()}
                      </div>


                      <div className='flex items-center gap-4'>
                        {
                          order?.orderItem.map((item: OrderItem) => (
                            <div
                              key={item.id}
                              className='flex items-center'
                            >
                              <Link
                                href={`/product/${item.product_id}`}
                                className='py-1 hover:underline text-blue-500 font-bold'
                              >
                                <img
                                  width='120'
                                  src={item.product.url + '/120'}
                                  className='rounded'
                                />
                                {item.product.title}
                              </Link>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))

                : (
                  <div className='flex items-center justify-center'>
                    You have no Order history
                  </div>
                )
            }
            {
              orders && orders.length > 0
                ? orders.map((order: OrderType) => (
                  <div key={order.id} className='text-sm pl-[50px]'>
                    <div className='border-b py-1'>
                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Stripe ID:</span>
                        {order?.stripe_id}
                      </div>

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Delivery Address:</span>
                        {order?.name}, {order?.address}, {order?.zipcode}, {order?.city}, {order?.country}
                      </div>

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Total:</span>
                        {order?.total / 100}
                      </div>

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Order Created:</span>
                        {moment(order?.created_at).calendar()}
                      </div>

                      <div className='pt-2'>
                        <span className='font-bold mr-2'>Delivery Time:</span>
                        {moment(order?.created_at).add(3, 'days').calendar()}
                      </div>

                      <div className='flex items-center gap-4'>
                        {order?.orderItem.map(item => (
                          <div key={item.id} className='flex items-center'>
                            <Link
                              href={`/product/${item.product_id}`}
                              className='py-1 hover:underline text-blue-500 font-bold'
                            >
                              <img
                                width='120'
                                src={item.product.url + '/120'}
                                className='rounded'
                              />
                              {item.product.title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
                : (
                  <div className='flex items-center justify-center'>
                    You have no Order history
                  </div>
                )
            }

          </div>
        </div>
      </MainLayout>
    </>
  )
}