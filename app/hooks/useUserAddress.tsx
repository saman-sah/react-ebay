import { AddressType } from "../types"

const useUserAddress = async (): Promise<AddressType | null> => {
  let address: AddressType | null = null
  let response = await fetch('api/address/get')

  if (response) {
    address = await response.json()
  }

  return address
}

export default useUserAddress