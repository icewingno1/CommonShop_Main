import instance from '@/utils/request'
import {
  createResData,
  orderDetailResData,
  orderListReqData,
  orderListResData,
  payReqData,
  resData
} from '@/api/order/type'

enum API {
  ORDER_URL = '/order',

  CREATEORDER_URL = '/saveOrder',

  PAY_URL = '/paySuccess'
}

export const getOrderAPI = (params: orderListReqData) =>
  instance.get<any, orderListResData>(API.ORDER_URL, { params })

export const getOrderDetailAPI = (order_id: string) =>
  instance.get<any, orderDetailResData>(API.ORDER_URL + `/${order_id}`)

export const cancelOrderAPI = (orderNo: string) =>
  instance.put<any, any>(API.ORDER_URL + `/${orderNo}/cancel`)

export const enterOrderAPI = (orderNo: string) =>
  instance.put<any, any>(API.ORDER_URL + `/${orderNo}/finish`)

export const createOrderAPI = (address_id: number, cartItemIds: string[]) =>
  instance.post<any, createResData>(API.CREATEORDER_URL, { address_id, cartItemIds })

// 微信TYPE为2，支付宝为1
export const payAPI = (params: payReqData) => instance.get<any, resData>(API.PAY_URL, { params })
