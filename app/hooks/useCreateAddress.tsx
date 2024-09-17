import type { AddressType } from '../types'
const useCreateAddress = async (details: AddressType): Promise<AddressType> => {

  let url: string = details.id ? 'update' : 'create'

  const response = await fetch(`/api/address/${url}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      id: details.id,
      city: details.city,
      country: details.country,
      zipcode: details.zipcode,
      name: details.name,
      address: details.address
    })
  })

  const data: AddressType = await response.json()

  return data

}

export default useCreateAddress