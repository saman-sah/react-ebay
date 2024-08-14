"use client"
import MainLayout from './layouts/MainLayout'
import Product from './components/Product'
import CarouselComp from '@/app/components/CarouselComp'

export default function Home() {
  const products = [
    {
      id: 1,
      title: 'Brown Leather Bag',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
      url: 'https://picsum.photos/id/7',
      price: 2500
    },
    {
      id: 2,
      title: 'School Book',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
      url: 'https://picsum.photos/id/7',
      price: 2500
    }
  ]
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
