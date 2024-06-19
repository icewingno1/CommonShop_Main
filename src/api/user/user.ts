import instance from '@/utils/request'
import type { resData, registerInputData, loginInputData, userInfoResData } from '@/api/user/type'

enum API {
  USER_URL = '/user/info',

  LOGIN_URL = '/user/login',

  LOGOUT_URL = '/user/logout',

  REGISTER_URL = '/user/register'
}

export const getUserInfo = () => instance.get<any, userInfoResData>(API.USER_URL)

export const updateUserInfo = () => instance.put(API.USER_URL)

export const userLogin = (loginInputData: loginInputData) =>
  instance.post<any, any>(API.LOGIN_URL, loginInputData)

export const userLogout = () => instance.post(API.LOGOUT_URL)

export const userRegister = (registerInputData: registerInputData) =>
  instance.post<any, resData>(API.REGISTER_URL, registerInputData)
