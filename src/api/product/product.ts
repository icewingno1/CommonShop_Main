import instance from '@/utils/request'
import { goodsDetailResData, goodsListResData, searchData } from '@/api/product/type'

enum API {
  GOODSLIST_URL = '/goods/search',

  GOODSDETAIL_UTL = '/goods/detail/'
}

export const getProListAPI = (params: searchData) =>
  instance.get<any, goodsListResData>(API.GOODSLIST_URL, { params })

export const getProDetailAPI = (id: string) =>
  instance.get<any, goodsDetailResData>(API.GOODSDETAIL_UTL + `${id}`)
