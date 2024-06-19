import { defineStore } from 'pinia'
import { userLogin, userRegister, getUserInfo } from '@/api/user/user'
import { loginInputData, registerInputData, userInfoData } from '@/api/user/type'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const token = ref<string>('')

    const userInfo = ref<userInfoData>({
      introduceSign: '',
      loginName: '',
      nickName: ''
    })

    const login = async (data: loginInputData) => {
      const res = await userLogin(data)
      if (res.resultCode === 200) {
        token.value = res.data
        // 通过token得到个人信息
        await getInfo()
        showToast('登录成功')
        router.go(-1)
      }
    }

    const register = async (data: registerInputData) => {
      const res = await userRegister(data)
      // 如果错误在router里有拦截
      if (res.resultCode === 200) {
        showToast('注册成功')
        router.go(-1)
      }
    }

    const getInfo = async () => {
      const res = await getUserInfo()
      userInfo.value = res.data
    }

    const clearInfo = () => {
      token.value = ''
      userInfo.value = { introduceSign: '', loginName: '', nickName: '' }
    }
    return { login, register, getInfo, userInfo, token, clearInfo }
  },
  {
    persist: true
  }
)
