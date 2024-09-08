"use client"

import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { useUser } from '../context/user'
import useIsLoading from '../hooks/useIsLoading'
import useUserAddress from '../hooks/useUserAddress'

import TextInput from "@/app/components/TextInput"
import MainLayout from "@/app/layouts/MainLayout"

export default function Address() {
  const router = useRouter()
  const { user } = useUser()

  const [city, setCity] = useState(null)
  const [name, setName] = useState(null)
  const [error, setError] = useState(null)
  const [country, setCountry] = useState(null)
  const [address, setAddress] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [addressId, setAddressId] = useState(null)
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(null)

  const showError = (type) => {
    if (Object.entries(error).length > 0 && error.type === type) {
      return error.message
    }
    return ''
  }

  const getAddress = async () => {
    if (user?.id ?? false) {
      useIsLoading = false
      return
    }

    const response = await useUserAddress()

    if (response) {
      setTheCurrentAddress(response)
      useIsLoading(false)
      return
    }
    useIsLoading(false)
  }

  useEffect(() => {
    useIsLoading(true)
    getAddress()
  }, [user])

  const setTheCurrentAddress = (result) => {
    setName(result.name)
    setCity(result.city)
    setAddressId(result.id)
    setZipcode(result.zipcode)
    setAddress(result.Address)
    setCountry(result.country)
  }

  const validate = () => {
    setError({})
    let isError = false

    if (!name) {
      setError({ type: 'name', message: 'A name is required' })
      isError = true
    } else if (!city) {
      setError({ type: 'name', message: 'A city is required' })
      isError = true
    } else if (!address) {
      setError({ type: 'name', message: 'An address is required' })
      isError = true
    } else if (!zipcode) {
      setError({ type: 'name', message: 'A zipcode is required' })
      isError = true
    } else if (!country) {
      setError({ type: 'name', message: 'A country is required' })
      isError = true
    }
    return isError
  }

  const submit = async (event) => {
    event.preventDefault();
    let isError = validate()

    if (isError) {
      toast.error(error.message, { autoClose: 3000 })
      return
    }

    try {
      setIsUpdatingAddress(true)

      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country
      })
      setTheCurrentAddress(response)
      setIsUpdatingAddress(false)

      toast.success('Address Updated!', { autoClose: 3000 })

      router.push('/checkout')
    } catch (error) {
      setIsUpdatingAddress(false)
      console.log(error);
    }
  }


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