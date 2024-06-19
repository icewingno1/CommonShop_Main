export interface resData {
  resultCode: number
  message: string
}

// 添加时要传入的数据
export interface addAddressInfo {
  city_name: string
  default_flag: number
  detail_address: string
  province_name: string
  region_name: string
  user_name: string
  user_phone: string
}

// 获取所有地址/某个地址详细信息
export interface addressData {
  addressId: number
  cityName: string
  defaultFlag: number
  detailAddress: string
  provinceName: string
  regionName: string
  userName: string
  userPhone: string
}

export interface updaData {
  address_id: number
  city_name: string
  default_flag: number
  detail_address: string
  province_name: string
  region_name: string
  user_name: string
  user_phone: string
}

export interface addressResData extends resData {
  data: addressData[]
}

export interface addressDetailResData extends resData {
  data: addressData
}
