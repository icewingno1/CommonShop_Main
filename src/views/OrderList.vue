<script setup lang="ts">
import { getOrderAPI } from '@/api/order/order'
import { orderListData, orderListReqData } from '@/api/order/type'
import CommonHeader from '@/components/CommonHeader.vue'
import { imgfilter } from '@/utils/imgfilter'
import { closeToast, showLoadingToast } from 'vant'
import { onMounted, ref } from 'vue'

const reqData = ref<orderListReqData>({
  order_status: ''
})

const orderList = ref<orderListData[]>([])

const getList = async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await getOrderAPI(reqData.value)
  console.log(res.data)
  if (res.resultCode === 200) {
    orderList.value = res.data
  }
  closeToast()
}

const onClickTab = async (obj: any) => {
  // 防止多次请求
  if (reqData.value.order_status === obj.name) return
  // 获取tab上的name作为参数
  reqData.value.order_status = obj.name
  await getList()
}

onMounted(async () => {
  await getList()
})
</script>

<template>
  <div class="orderlist">
    <CommonHeader :show-back="true">订单列表</CommonHeader>
    <van-tabs
      :color="'#27ba9b'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      @click-tab="onClickTab"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="已支付" name="1"></van-tab>
      <van-tab title="已取消" name="-1"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <div class="orderlist-content">
      <div
        class="goods"
        v-for="item in orderList"
        :key="item.orderId"
        @click="$router.push({ path: '/orderdetail', query: { order_id: item.orderId } })"
      >
        <div class="goods-header">
          <span class="time">订单时间：{{ item.createTime }}</span>
          <span class="status">{{ item.orderStatusString }}</span>
        </div>
        <div class="goods-content">
          <div class="left">
            <img :src="imgfilter(item.newBeeMallOrderItemVOS[0].goodsCoverImg)" alt="" />
          </div>
          <div class="right">
            <span class="goodsName">
              <span class="name">{{ item.newBeeMallOrderItemVOS[0].goodsName }}...</span>
            </span>
            <span class="goodsPrice">
              <span class="price"><i>￥</i>{{ item.totalPrice }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.orderlist {
  margin-top: 44px;
  background-color: #f4f4f4;
  .orderlist-content {
    height: 575px;
    padding: 5px 8px;
    overflow: scroll;
    .goods {
      display: flex;
      flex-direction: column;
      .goods-header {
        display: flex;
        justify-content: space-between;
        padding: 3px 10px;
        font-size: 13px;
        background-color: #fff;
      }
      .goods-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        margin-bottom: 6px;
        height: 120px;
        background-color: #fff;
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
          height: 100%;
          box-sizing: border-box;
          .goodsName {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 3px;
          }
          .goodsPrice {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            .price {
              font-size: 14px;
              margin-bottom: 8px;
              i {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
