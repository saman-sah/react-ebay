const useCreateAddress = async (details) => {

  let url = details.addressId ? 'update' : 'create'

  const response = await fetch(`/api/address/${url}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      addressId: details.addressId,
      city: details.city,
      country: details.country,
      zipcode: details.zipcode,
      name: details.name,
      address: details.address
    })
  })

  const data = await response.json()

  return data

}

export default useCreateAddress