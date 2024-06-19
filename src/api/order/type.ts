export interface resData {
  resultCode: number
  message: string
}

export interface createResData extends resData {
  data: string
}

export interface payReqData {
  order_id: string
  pay_type: string
}

export interface cartItemData {
  goodsCount: number
  goodsCoverImg: string
  goodsId: number
  goodsName: string
  sellingPrice: number
}

export interface orderListData {
  createTime: string
  newBeeMallOrderItemVOS: cartItemData[]
  orderId: number
  orderStatus: number
  orderStatusString: string
  payType: number
  totalPrice: number
}

export interface orderListResData extends resData {
  data: orderListData[]
}

export interface orderListReqData {
  order_status: string
}

export interface orderDetailResData extends resData {
  data: orderListData
}
