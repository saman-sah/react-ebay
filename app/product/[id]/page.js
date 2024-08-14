"use client"

import MainLayout from "@/app/layouts/MainLayout"

export default function Product({ params }) {

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
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}