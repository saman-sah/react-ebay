"use client"

import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import { useState, useEffect, FormEvent } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { useUser } from '../context/user'
import useIsLoading from '../hooks/useIsLoading'
import useUserAddress from '../hooks/useUserAddress'
import useCreateAddress from "../hooks/useCreateAddress"

import TextInput from "../components/TextInput"
import MainLayout from "../layouts/MainLayout"
import ClientOnly from "../components/ClientOnly"

import { AddressType, Error } from "../types"

export default function Address() {
  const router = useRouter()
  const { user } = useUser()

  const [city, setCity] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [zipcode, setZipcode] = useState<string | null>(null)
  const [id, setAddressId] = useState<number | null>(null)
  const [isUpdatingAddress, setIsUpdatingAddress] = useState<boolean>(false)

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error.type === type) {
      return error.message
    }
    return ''
  }

  const getAddress = async () => {
    if (user?.id ?? false) {
      useIsLoading(false)
      return
    }

    const response: AddressType | null = await useUserAddress()

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

  const setTheCurrentAddress = (result: AddressType) => {
    setName(result.name)
    setCity(result.city)
    setAddressId(result.id)
    setZipcode(result.zipcode)
    setAddress(result.address)
    setCountry(result.country)
  }

  const validate = () => {
    setError(null)
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

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    let isError = validate()

    if (isError) {
      toast.error(error?.message, { autoClose: 3000 })
      return
    }

    try {
      setIsUpdatingAddress(true)

      const response = await useCreateAddress({
        id,
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
            <form onSubmit={submit}>
              <div className='mb-4'>
                <ClientOnly>
                  <TextInput
                    className='w-full'
                    string={name}
                    onUpdate={setName}
                    placeholder='Name'
                    error={showError('name')}
                  />
                </ClientOnly>
              </div>
              <div className='mb-4'>
                <ClientOnly>
                  <TextInput
                    className='w-full'
                    string={address}
                    onUpdate={setAddress}
                    placeholder='Address'
                    error={showError('address')}
                  />
                </ClientOnly>
              </div>
              <div className='mb-4'>
                <ClientOnly>
                  <TextInput
                    className='w-full'
                    string={zipcode}
                    onUpdate={setZipcode}
                    placeholder='Zipcode'
                    error={showError('zipcode')}
                  />
                </ClientOnly>
              </div>
              <div className='mb-4'>
                <ClientOnly>
                  <TextInput
                    className='w-full'
                    string={city}
                    onUpdate={setCity}
                    placeholder='City'
                    error={showError('city')}
                  />
                </ClientOnly>
              </div>
              <div className='mb-4'>
                <ClientOnly>
                  <TextInput
                    className='w-full'
                    string={country}
                    onUpdate={setCountry}
                    placeholder='Country'
                    error={showError('country')}
                  />
                </ClientOnly>
              </div>
              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`
                  ${isUpdatingAddress ? 'bg-blue-800' : 'bg-blue-600'}
                  w-full mt-6 text-white text-lg font-semibold p-3 rounded
                `}
              >
                {
                  !isUpdatingAddress
                    ? <div>Update Address</div>
                    : <div className="flex items-center justify-between gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Please Wait...
                    </div>
                }
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  )
}