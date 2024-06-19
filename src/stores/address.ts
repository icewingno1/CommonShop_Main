import { defineStore } from 'pinia'
import { ref } from 'vue'

// 由于地址ID需要从地址页面传回到订单页面，所以开一个pinia
// 只会在AddressSelect.vue中更新ID
export const useAddressStore = defineStore('address', () => {
  const addressId = ref<string>('')

  const setAddressId = (data: string) => {
    addressId.value = data
  }

  const clearAddressId = () => {
    addressId.value = ''
  }
  return { addressId, setAddressId, clearAddressId }
})
