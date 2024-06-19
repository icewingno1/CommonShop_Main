<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import { computed, ref } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import { phoneRules, passwordRules } from '@/utils/rules'
import { useUserStore } from '@/stores/user'
import type { registerInputData } from '@/api/user/type'

const userStore = useUserStore()

// 表单元素
const registerData = ref<registerInputData>({
  loginName: '',
  password: ''
})
let enterPassword = ref<string>('')
let checked = ref<boolean>(false)
const wasCheck = computed(() => checked.value === true)

// 由于在外部不方便比较密码相同，所以单独在此设置规则
const enterPasswordRules = (value: string) => {
  if (value === registerData.value.password) {
    return true
  }
  return false
}

const onSubmit = async () => {
  if (!wasCheck.value) {
    showToast({
      message: '请先同意用户协议',
      position: 'bottom'
    })
    return
  }
  // 提交数据
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await userStore.register(registerData.value)
}

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
  <CommonHeader :showBack="true">注册</CommonHeader>
  <div class="register">
    <span class="tip">注册会储存您的个人信息</span>
    <van-form @submit="onSubmit" @failed="onFailed" class="resetForm" :show-error-message="false">
      <van-cell-group inset>
        <van-field
          v-model="registerData.loginName"
          name="loginName"
          placeholder="输入手机号"
          :rules="phoneRules"
          :border="false"
          class="resetField"
          clearable
        />
        <van-field
          v-model="registerData.password"
          type="password"
          name="password"
          placeholder="输入密码"
          clearable
          :rules="passwordRules"
          :border="false"
          class="resetField"
        />
        <van-field
          v-model="enterPassword"
          type="password"
          name="enterPassword"
          placeholder="请再次确认密码"
          clearable
          :rules="[{ validator: enterPasswordRules, message: '两次输入密码不一致' }]"
          :border="false"
          class="resetField"
        />
        <van-checkbox
          v-model="checked"
          icon-size="12px"
          class="resetCheckbox"
          checked-color="#1e80ff"
        >
          已阅读并同意
          <span>用户协议</span>
          以及
          <span>隐私政策</span>
        </van-checkbox>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" color="#1e80ff">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.register {
  margin-top: 44px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .tip {
    width: 300px;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #1e80ff;
  }
}

.resetForm {
  width: 90%;
}

.resetField {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 10%;
  --van-field-placeholder-text-color: #a29595;
  &:last-child {
    margin-bottom: 10px;
  }
}

.resetCheckbox {
  font-size: 12px;
  --van-checkbox-label-color: #a29595;
  span {
    color: #1e80ff;
  }
}
</style>
