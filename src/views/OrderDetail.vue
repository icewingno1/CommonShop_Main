<script setup lang="ts">
import { cancelOrderAPI, enterOrderAPI, getOrderDetailAPI } from '@/api/order/order'
import CommonHeader from '@/components/CommonHeader.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { orderListData } from '@/api/order/type'
import { closeToast, showConfirmDialog, showLoadingToast } from 'vant'
import { imgfilter } from '@/utils/imgfilter'

const router = useRouter()
const route = useRoute()
const order_id = ref<string>('')
const orderData = ref<orderListData>()

const goCancel = async () => {
  showConfirmDialog({
    message: '是否确定取消订单'
  }).then(async () => {
    showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
    const res = await cancelOrderAPI(order_id.value)
    if (res.resultCode === 200) {
      router.replace('/orderList')
    }
  })
}

const goEnter = async () => {
  showConfirmDialog({
    message: '是否确定收货'
  }).then(async () => {
    showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
    const res = await enterOrderAPI(order_id.value)
    if (res.resultCode === 200) {
      router.replace('/orderList')
    }
  })
}

const goPay = () => {
  router.push({ path: '/pay', query: { order_id: order_id.value } })
}

onMounted(async () => {
  if (route.query.order_id === undefined) router.go(-1)
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  order_id.value = route.query.order_id as string
  const res = await getOrderDetailAPI(order_id.value)
  if (res.resultCode === 200) {
    orderData.value = res.data
  }
  closeToast()
})
</script>

<template>
  <div class="orderdetail">
    <CommonHeader :show-back="true">订单详情</CommonHeader>
    <div class="order-goods">
      <div class="goods" v-for="item in orderData?.newBeeMallOrderItemVOS" :key="item.goodsId">
        <img :src="imgfilter(item.goodsCoverImg)" alt="" />
        <div class="goods-info">
          <div class="left">
            <div class="name">{{ item.goodsName }}</div>
          </div>
          <div class="right">
            <div class="price">
              ￥<span>{{ item.sellingPrice }}</span>
            </div>
            <div class="count">×{{ item.goodsCount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <ul>
        <li>
          <span class="key">下单时间</span><span class="value">{{ orderData?.createTime }}</span>
        </li>
        <li>
          <span class="key">订单状态</span
          ><span class="value">{{ orderData?.orderStatusString }}</span>
        </li>
        <li>
          <span class="key">总价格</span><span class="value">{{ orderData?.totalPrice }}</span>
        </li>
      </ul>
    </div>
    <div class="order-bottom" v-if="orderData?.orderStatus === 1 || orderData?.orderStatus === 0">
      <van-button
        type="primary"
        round
        class="resetButton"
        @click="goCancel"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        >取消订单</van-button
      >
      <van-button
        type="primary"
        round
        class="resetButton"
        @click="goEnter"
        v-if="orderData?.orderStatus === 1"
        color="linear-gradient(to left, #6bd8d8, #27ba9b)"
        >确认收货</van-button
      >
      <van-button
        type="primary"
        round
        class="resetButton"
        @click="goPay"
        v-if="orderData?.orderStatus === 0"
        color="linear-gradient(to left, #6bd8d8, #27ba9b)"
        >付款</van-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.orderdetail {
  margin-top: 44px;
  background-color: #f4f4f4;
  min-height: calc(100vh - 44px);
  .order-goods {
    padding-top: 10px;
    .goods {
      display: flex;
      padding: 10px 15px;
      background-color: #fff;
      border-bottom: 2px solid #f4f4f4;
      img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
    }
    .goods-info {
      display: flex;
      flex: 1;
      justify-content: space-between;
      .left {
        .name {
          font-size: 13px;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: end;
        .price {
          margin-bottom: 3px;
          font-size: 11px;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
  .order-info {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 10px 5px;
    background-color: #fff;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        margin-bottom: 5px;
        color: #9e9e9e;
        &:last-child {
          margin-bottom: 0;
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
    justify-content: end;
    padding: 10px;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    .resetButton {
      width: 120px;
      height: 38px;
      margin-left: 10px;
      font-weight: 600;
    }
  }
}
</style>
