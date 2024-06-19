export interface resData {
  resultCode: number
  message: string
}

export interface carousels {
  carouselUrl: string
  redirectUrl: string
}

export interface goodsData {
  goodsCoverImg: string
  goodsId: number
  goodsIntro: string
  goodsName: string
  sellingPrice: number
  tag: string
}

export interface indexInfoData {
  carousels: carousels[]
  hotGoodses: goodsData[]
  newGoodses: goodsData[]
  recommendGoodses: goodsData[]
}

export interface indexInfoResData extends resData {
  data: indexInfoData
}

export interface categoryData {
  name: string
  imgUrl: string
  categoryId: number
}
