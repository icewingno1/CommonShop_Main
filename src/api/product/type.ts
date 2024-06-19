export interface resData {
  resultCode: number
  message: string
}

export interface goodsListItem {
  goodsCoverImg: string
  goodsId: number
  goodsIntro: string
  goodsName: string
  sellingPrice: number
}

// export interface goodsListData {
//   currPage: number
//   list: goodsListItem[]
//   pageSize: number
//   totalCount: number
//   totalPage: number
// }

export interface goodsListResData extends resData {
  data: goodsListItem[]
}

export interface searchData {
  keyword: string
  goodsCategoryId: string
}

export interface goodsDetailData {
  goodsCarouselList: string[]
  goodsCoverImg: string
  goodsDetailContent: string
  goodsId: string
  goodsIntro: string
  goodsName: string
  originalPrice: number
  sellingPrice: number
  tag: string
}

export interface goodsDetailResData extends resData {
  data: goodsDetailData
}
