export interface resData {
  resultCode: number
  message: string
}

export interface secondLevelData {
  categoryId: number
  categoryLevel: number
  categoryName: string
  categoryImg: string
  parentId: number
}

export interface categoryData {
  categoryId: number
  categoryLevel: number
  categoryName: string
  secondLevelCategoryVOS: secondLevelData[]
}

export interface categoryResData extends resData {
  data: categoryData[]
}
