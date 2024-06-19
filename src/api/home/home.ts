import instance from '@/utils/request'
import { indexInfoResData } from '@/api/home/type'

enum API {
  INDEXINFO_URL = '/index-infos'
}

export const getIndexInfo = () => instance.get<any, indexInfoResData>(API.INDEXINFO_URL)
