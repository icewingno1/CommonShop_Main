import { getCartAPI } from '@/api/cart/catr'
import { cartResData } from '@/api/cart/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<cartResData>()
  // 空车
  const cartTemp = ref<cartResData>()
  const count = ref<number>(0)

  const getCart = async () => {
    const res = await getCartAPI()
    if (res.resultCode === 200) {
      cart.value = res
      count.value = cart.value.data.length
    }
  }

  const resetCart = () => {
    cart.value = cartTemp.value
  }

  const upDateCartLocal = (count: number, id: string) => {
    const res = cart.value?.data.find((item) => item.cartItemId === id)
    if (res) {
      res.goodsCount = count
    }
  }

  const checked = ref<string[]>([])

  const setChecked = (checked1: string[]) => {
    checked.value = checked1
  }

  const clearChecked = () => {
    checked.value = []
  }

  const findSelected = () => {
    return cart.value?.data.filter((item) => checked.value.includes(item.cartItemId))
  }
  return {
    cart,
    count,
    getCart,
    upDateCartLocal,
    checked,
    setChecked,
    findSelected,
    clearChecked,
    resetCart
  }
})
