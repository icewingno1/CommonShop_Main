import instance from '@/utils/request'
import type {
  addAddressInfo,
  updaData,
  addressDetailResData,
  addressResData
} from '@/api/address/type'

enum API {
  ADDRESS_URL = '/address',

  DEFAULTADDRESS_URL = '/address/default'
}

export const getAddressAPI = () => instance.get<any, addressResData>(API.ADDRESS_URL)

export const addAddressAPI = (data: addAddressInfo) =>
  instance.post<any, any>(API.ADDRESS_URL, data)

export const updateAddressAPI = (data: updaData) => instance.put<any, any>(API.ADDRESS_URL, data)

export const getAddressDetailAPI = (addressId: string) =>
  instance.get<any, addressDetailResData>(API.ADDRESS_URL + `/${addressId}`)

export const deleteAddressAPI = (addressId: number) =>
  instance.delete<any, any>(API.ADDRESS_URL + `/${addressId}`)

export const getDefaultAddressAPI = () =>
  instance.get<any, addressDetailResData>(API.DEFAULTADDRESS_URL)
