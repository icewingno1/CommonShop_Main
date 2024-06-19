export interface resData {
  resultCode: number
  message: string
}

// 用户信息
export interface userInfoData {
  introduceSign: string
  loginName: string
  nickName: string
}

// 用户信息response
export interface userInfoResData extends resData {
  data: userInfoData
}

export interface registerInputData {
  loginName: string
  password: string
}

export interface loginInputData {
  login_name: string
  password: string
}
