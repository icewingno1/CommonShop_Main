import instance from '@/utils/request'
import { categoryResData } from '@/api/category/type'

enum API {
  CATEGORY_URL = '/categories'
}

export const getCategoryApi = () => instance.get<any, categoryResData>(API.CATEGORY_URL)
