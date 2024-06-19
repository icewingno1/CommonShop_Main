import instance from '@/utils/request'
import { cartResData } from '@/api/cart/type'

enum API {
  CART_URL = '/shop-cart'
}

export const addCartAPI = (goods_count: number, goods_id: string) =>
  instance.post<any, any>(API.CART_URL, { goods_count, goods_id })

// export const updateCartAPI = (goodsCount: number, cartItemId: string) =>
//   instance.put<any, any>(API.CART_URL, { goodsCount, cartItemId })

export const deleteCartAPI = (cartItemId: string) =>
  instance.delete<any, any>(API.CART_URL + `/${cartItemId}`)

export const getCartAPI = () => instance.get<any, cartResData>(API.CART_URL)
