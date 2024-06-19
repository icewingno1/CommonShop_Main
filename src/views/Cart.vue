<script setup lang="ts">
import { addCartAPI, deleteCartAPI } from '@/api/cart/catr'
import EmptyBox from '@/components/EmptyBox.vue'
import { useActiveStore } from '@/stores/active'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { imgfilter } from '@/utils/imgfilter'
import { closeToast, showLoadingToast, showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const pageStore = useActiveStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()

onMounted(async () => {
  cartStore.resetCart()
  if (!userStore.token) {
    // 如果未登录
    return
  }
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await cartStore.getCart()
  closeToast()
})

const checkboxGroup = ref()
// 实际上选中的项，要传去生成订单页面的项
const checked = ref<string[]>([])
// 临时储存当前选中状态，用户点击右上角完成后恢复checked状态
const tempChecked = ref<string[]>([])
// 全选按钮
const isCheckAll = computed(() => checked.value.length === cartStore.cart?.data.length)
const toggleAll = () => {
  if (isCheckAll.value) {
    checked.value = []
  } else {
    checked.value = cartStore.cart?.data.map((item) => item.cartItemId) as string[]
  }
}

const isEdit = ref<boolean>(false)
const edit = () => {
  // 如果点击编辑时不是编辑模式，则临时储存选中项
  if (!isEdit.value) {
    tempChecked.value = checked.value
    checked.value = []
  } else {
    // 否则将临时项目赋值回当前页面选中项
    checked.value = tempChecked.value
  }
  // 相互切换
  isEdit.value = !isEdit.value
}

const totalMoney = computed(() => {
  let sum = 0
  let _list = cartStore.cart?.data.filter((item) => checked.value.includes(item.cartItemId))
  _list?.forEach((item) => {
    sum += item.goodsCount * item.sellingPrice
  })
  return sum
})

const handleDelete = async () => {
  if (checked.value.length === 0) {
    return
  }
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  for (let i = 0; i < checked.value.length; i++) {
    await deleteCartAPI(checked.value[i])
  }
  // 因为axios对象中返回了一个promise，所以错误了是不会执行这句的
  await cartStore.getCart()
  isEdit.value = false
  checked.value = []
  showToast('删除成功')
}

const handleChange = async (type: string, goods_id: string, count: number, cartID: string) => {
  let newCount = ref<number>(0)
  if (type === 'minus') {
    if (count <= 1) return
    newCount.value = count - 1
  } else {
    // 由于接口设置了每个最大数量都是5，所以这里写一个固定值
    // if (count >= 5) return
    newCount.value = count + 1
  }

  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await addCartAPI(newCount.value, goods_id)
  if (res.resultCode === 200) {
    cartStore.upDateCartLocal(newCount.value, cartID)
    closeToast()
  }
}

const handelePay = async () => {
  cartStore.setChecked(checked.value)
  router.push('/order')
}
</script>

<template>
  <EmptyBox v-if="!userStore.token"></EmptyBox>
  <div class="emptyCart" v-else-if="cartStore.cart?.data.length === 0">
    <van-empty class="empty" description="购物车为空" />
  </div>
  <div class="cart" v-else>
    <header class="cart-header">
      <i class="empty" v-if="pageStore.needNav.includes('/cart')"></i>
      <i class="iconfont icon-fanhui" @click="$router.go(-1)" v-else></i>
      <span class="headerTitle">购物车</span>
      <span @click="edit">{{ isEdit ? '完成' : '编辑' }}</span>
    </header>
    <div class="cart-content">
      <van-checkbox-group v-model="checked" ref="checkboxGroup">
        <div class="cart-item" v-for="item in cartStore.cart?.data" :key="item.cartItemId">
          <div class="left">
            <van-checkbox :name="item.cartItemId" class="resetCheckBox"></van-checkbox>
            <img :src="imgfilter(item.goodsCoverImg)" alt="" />
          </div>
          <div class="right">
            <span class="goodsName">{{ item.goodsName }} / {{ item.cartItemId }}</span>
            <div class="bottom">
              <span class="goodsPrice"><i>￥</i>{{ item.sellingPrice }}</span>
              <!-- 步进器占位 -->
              <div class="count-box">
                <div
                  @click="handleChange('minus', item.goodsId, item.goodsCount, item.cartItemId)"
                  class="minus"
                >
                  -
                </div>
                <span class="inp">{{ item.goodsCount }}</span>
                <div
                  @click="handleChange('add', item.goodsId, item.goodsCount, item.cartItemId)"
                  class="add"
                >
                  +
                </div>
              </div>
              <!-- 步进器占位 -->
            </div>
          </div>
        </div>
      </van-checkbox-group>
      <van-submit-bar
        :price="totalMoney * 100"
        class="resetSubmitBar"
        v-if="cartStore.count !== 0"
        :class="pageStore.needNav.includes('/cart') ? '' : 'noNav'"
      >
        <van-checkbox v-model="isCheckAll" @click="toggleAll">全选</van-checkbox>
        <template #button>
          <van-button
            type="primary"
            color="linear-gradient(to right, #6bd8d8, #27ba9b)"
            class="submitBtn"
            round
            @click="handelePay"
            v-if="!isEdit"
            :disabled="checked.length === 0"
            >结算</van-button
          >
          <van-button
            type="primary"
            color="linear-gradient(to right, #6bd8d8, #27ba9b)"
            class="submitBtn"
            round
            @click="handleDelete"
            :disabled="checked.length === 0"
            v-else
            >删除</van-button
          >
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.emptyCart {
  .empty {
    --van-empty-padding: 150px 50px;
  }
}
.cart {
  margin-top: 44px;
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    height: 44px;
    width: 100%;
    padding: 0 13px;
    box-sizing: border-box;
    background: #fff;
    .headerTitle {
      font-size: 14px;
    }
    .empty {
      width: 16px;
    }
  }
  .cart-content {
    padding: 1px 0;
    margin-bottom: 111px;
    background-color: #f4f4f4;
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      margin: 5px 0;
      height: 130px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      .left {
        display: flex;
        .resetCheckBox {
          --van-checkbox-size: 15px;
        }
        img {
          height: 100px;
          width: 100px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15px;
        padding: 15px 0;
        height: 100%;
        box-sizing: border-box;
        .goodsName {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .goodsPrice {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            i {
              font-size: 10px;
            }
          }
          .count-box {
            display: flex;
            align-items: center;
            .add,
            .minus {
              width: 25px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              outline: none;
              border: none;
              font-size: 14px;
            }
            .inp {
              width: 30px;
              height: 20px;
              outline: none;
              border: none;
              margin: 0 5px;
              background-color: #efefef;
              text-align: center;
              line-height: 20px;
            }
          }
        }
      }
    }
    .resetSubmitBar {
      bottom: 55px;
      .submitBtn {
        width: 125px;
        height: 40px;
      }
      &.noNav {
        bottom: 0;
      }
    }
  }
}
</style>
