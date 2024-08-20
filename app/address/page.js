"use client"

import TextInput from "@/app/components/TextInput"
import MainLayout from "@/app/layouts/MainLayout"
import { Main } from "next/document"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Address() {
  return (
    <>
      <MainLayout>
        <div
          id='AddressPge'
          className='mt-4 max-w-[600px] mx-auto px-2'
        >
          <div className='mx-auto bg-white rounded-lg p-3'>
            <div className='text-xl text-bold mb-2'>
              Address Details
            </div>
            <form>
              <div className='mb-4'>
                <TextInput
                  placeholder='Name'
                  string={'Test'}
                  className='w-full'
                  error='This is an error'
                />
              </div>
              <button className='w-full mt-6 text-white text-lg font-semibold p-3 rounded bg-blue-600'>
                Update Address
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  )
}