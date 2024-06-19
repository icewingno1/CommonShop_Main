<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import type { addressData } from '@/api/address/type'
import { getAddressDetailAPI, getDefaultAddressAPI } from '@/api/address/address'
import { useAddressStore } from '@/stores/address'
import { useCartStore } from '@/stores/cart'
import { cartData } from '@/api/cart/type'
import { createOrderAPI } from '@/api/order/order'
import { closeToast, showLoadingToast } from 'vant'
import { imgfilter } from '@/utils/imgfilter'
const address = ref<addressData>()
const router = useRouter()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const selectItem = ref<cartData[]>([])

const selectAddress = () => {
  // 传query让页面显示check框
  router.push({ path: '/address/select', query: { type: 'order' } })
}

onMounted(async () => {
  // 先检查是否有pinia中是否有选中项，没有则代表不是跳转进来，返回
  if (cartStore.checked.length === 0) {
    router.go(-1)
  }
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  // 先检查是否有选中地址，有选中地址就获取选中的地址，否则获取默认地址
  if (addressStore.addressId) {
    const res = await getAddressDetailAPI(addressStore.addressId)
    if (res.data) {
      address.value = res.data
    }
  } else {
    // 获取默认地址
    const res = await getDefaultAddressAPI()
    if (res.data !== null) {
      address.value = res.data
    }
  }
  // 如果都没有则显示为空

  // 将cartStore里面的选中项目筛选出来作渲染
  selectItem.value = cartStore.findSelected() as cartData[]
  closeToast()
})

const totalCout = computed(() => {
  let sum = 0
  selectItem.value.forEach((item) => {
    sum += item.goodsCount
  })
  return sum
})

const totalPrice = computed(() => {
  let sum = 0
  selectItem.value.forEach((item) => {
    sum += item.goodsCount * item.sellingPrice
  })
  return sum
})

const hasAddress = computed(() => {
  if (address.value) {
    return false
  }
  return true
})

const goPay = async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await createOrderAPI(address.value?.addressId as number, cartStore.checked)
  if (res.resultCode === 200) {
    router.push({ path: '/pay', query: { order_id: res.data } })
  }
  closeToast()
}

onBeforeRouteLeave((to) => {
  // 如果不是从本页面跳转到地址切换页那么就把临时储存的数据全部清掉,防止用户再次进入此界面
  if (to.path !== '/address/select') {
    addressStore.clearAddressId()
    cartStore.clearChecked()
  }
})
</script>

<template>
  <div class="order">
    <CommonHeader :show-back="true">确认订单</CommonHeader>
    <div class="order-address" @click="selectAddress">
      <div class="default" v-if="address">
        <div class="address">
          <span>{{ address.provinceName }}{{ address.cityName }}{{ address.regionName }}</span>
          <i class="isDefault" v-if="address.defaultFlag">默认</i>
        </div>
        <div class="detail-address">{{ address.detailAddress }}</div>
        <div class="info">
          <span class="name">{{ address.userName }}</span>
          <span class="phone">{{ address.userPhone }}</span>
        </div>
      </div>
      <div class="haveNoDefault" v-else>请选择地址</div>
      <i class="iconfont icon-jinrujiantou"></i>
    </div>
    <div class="order-goods">
      <div class="goods" v-for="item in selectItem" :key="item.cartItemId">
        <div class="left">
          <img :src="imgfilter(item.goodsCoverImg)" alt="" />
        </div>
        <div class="right">
          <span class="goodsName">
            <span class="name">{{ item.goodsName }}/{{ item.cartItemId }}</span>
            <i class="count">x{{ item.goodsCount }}</i>
          </span>
          <span class="goodsPrice"><i>￥</i>{{ item.sellingPrice }}</span>
        </div>
      </div>
    </div>
    <div class="order-bottom">
      <div class="price">
        共{{ totalCout }}件，合计:￥<span>{{ totalPrice }}</span>
      </div>
      <van-button type="primary" round class="resetButton" @click="goPay" :disabled="hasAddress"
        >去付款</van-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .order-address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 5px 10px;
    padding: 10px 10px;
    height: 100px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    .default {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      .address {
        color: #232323;
        .isDefault {
          margin-left: 10px;
          background-color: #27ba9b;
          font-size: 10px;
          padding: 3px;
          color: #fff;
          border-radius: 5px;
        }
      }
      .detail-address {
        font-size: 14px;
        font-weight: 600;
      }
      .info {
        color: #232323;
        .name {
          margin-right: 5px;
        }
      }
    }
    .haveNoDefault {
      margin-left: 10px;
      font-style: italic;
      font-size: 16px;
      color: #7e7e7e;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;

      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: '';
    }
  }
  .order-goods {
    height: 450px;
    overflow: scroll;
    .goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      margin: 5px 0;
      height: 120px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      .left {
        img {
          height: 90px;
          width: 90px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 15px;
        padding: 10px 0;
        height: 100%;
        box-sizing: border-box;
        .goodsName {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 3px;
          .name {
            width: 220px;
          }
          i {
            flex: 1;
          }
        }
        .goodsPrice {
          font-size: 14px;
          margin-bottom: 8px;
          color: red;
          i {
            font-size: 10px;
          }
        }
      }
    }
  }
  .order-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    .price {
      font-size: 11px;
      span {
        font-size: 16px;
        color: #27ba9b;
      }
    }
    .resetButton {
      width: 120px;
      height: 38px;
      font-weight: 600;
    }
  }
}
</style>
