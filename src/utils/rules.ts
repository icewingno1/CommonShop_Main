export const phoneRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^((\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号' }
]

export const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{2,10}$/, message: '密码为2-6个字符' }
]
