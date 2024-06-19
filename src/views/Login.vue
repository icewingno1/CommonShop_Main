<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import { computed, ref } from 'vue'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { phoneRules, passwordRules } from '@/utils/rules'
import { useUserStore } from '@/stores/user'
import type { loginInputData } from '@/api/user/type'

const userStore = useUserStore()

let loginName = ref<string>('')
let password = ref<string>('')
let checked = ref<boolean>(false)
const wasCheck = computed(() => checked.value === true)

// 校验通过点击提交
const onSubmit = async () => {
  if (!wasCheck.value) {
    showToast({
      message: '请先同意用户协议',
      position: 'bottom'
    })
    return
  }
  // 处理后的数据放到新建的对象中
  const loginData = ref<loginInputData>({
    login_name: '',
    password: ''
  })
  loginData.value.login_name = loginName.value
  loginData.value.password = password.value

  // 提交数据
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await userStore.login(loginData.value)
  closeToast()
}

// 校验未通过点击提交
const onFailed = (errorInfo: any) => {
  if (!wasCheck.value) {
    showToast({
      message: '请先同意用户协议',
      position: 'bottom'
    })
    return
  }
  // 展示用户其他错误信息
  showToast({
    message: errorInfo.errors[errorInfo.errors.length - 1].message,
    position: 'bottom'
  })
}
</script>

<template>
  <CommonHeader :show-back="true">登录</CommonHeader>
  <div class="login">
    <img src="@/assets/logo.svg" alt="" class="logo" />
    <van-form @submit="onSubmit" @failed="onFailed" class="resetForm" :show-error-message="false">
      <van-cell-group inset>
        <van-field
          v-model="loginName"
          name="loginName"
          placeholder="输入手机号"
          :rules="phoneRules"
          :border="false"
          class="resetField"
          clearable
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          placeholder="输入密码"
          :rules="passwordRules"
          :border="false"
          class="resetField"
          clearable
        />
        <van-checkbox v-model="checked" icon-size="12px" class="resetCheckbox">
          已阅读并同意
          <span>《商城隐私政策》</span>
          <span>《商城用户协议》</span>
          、
          <span>《账号用户协议》</span>
        </van-checkbox>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" class="resetButton">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="ohterPage">
      <span @click="$router.push('/register')">注册</span>
      <i>|</i>
      <span>修改密码</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 44px;
  .logo {
    margin-top: 85px;
    margin-bottom: 30px;
    width: 80px;
    height: 80px;
  }
  .ohterPage {
    font-size: 11px;
    color: #a29595;
    span {
      margin: 0 15px;
    }
  }
}

.resetForm {
  width: 90%;
}

.resetField {
  width: 100%;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 20px;
  --van-field-placeholder-text-color: #a29595;
  &:last-child {
    margin-bottom: 10px;
  }
}

.resetButton {
  height: 38px;
}

.resetCheckbox {
  font-size: 12px;
  --van-checkbox-label-color: #a29595;
  span {
    color: #27ba9b;
  }
}
</style>
