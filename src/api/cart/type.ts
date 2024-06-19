export interface resData {
  resultCode: number
  message: string
}

export interface cartData {
  cartItemId: string
  goodsCount: number
  goodsCoverImg: string
  goodsId: string
  goodsName: string
  sellingPrice: number
}

export interface cartResData extends resData {
  data: cartData[]
}
