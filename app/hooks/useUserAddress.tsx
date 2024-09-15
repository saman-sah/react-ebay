import { AddressType } from "../types"

const useUserAddress = async (): Promise<AddressType | null> => {
  let address: AddressType | null = null
  let response = await fetch('api/address/get')

  if (response) {
    let data = await response.json()
    if (data) address = data as AddressType
  }

  return address
}

export default useUserAddress