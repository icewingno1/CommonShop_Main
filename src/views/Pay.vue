<script setup lang="ts">
import { cancelOrderAPI, payAPI } from '@/api/order/order'
import { payReqData } from '@/api/order/type'
import CommonHeader from '@/components/CommonHeader.vue'
import { showConfirmDialog, showLoadingToast, showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const payData = ref<payReqData>({
  order_id: '',
  pay_type: ''
})

const changeType = (type: string) => {
  payData.value.pay_type = type
}

const cancelPay = () => {
  showConfirmDialog({
    message: '是否确定取消订单'
  }).then(async () => {
    showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
    const res = await cancelOrderAPI(payData.value.order_id)
    if (res.resultCode === 200) {
      router.replace('/orderList')
    }
  })
}

const enterPay = async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await payAPI(payData.value)
  if (res.resultCode === 200) {
    await showToast('支付成功')
    router.push('/')
  }
}

onMounted(() => {
  // 检测查询参数里面是否有orderNo，没有则返回上一个页面
  if (route.query.order_id) {
    payData.value.order_id = route.query.order_id as string
  } else {
    router.go(-1)
  }
})
</script>

<template>
  <div class="pay">
    <CommonHeader :show-back="true">请选择支付方式</CommonHeader>
    <div class="method">
      <div
        class="box box1"
        @click="changeType('2')"
        :class="payData.pay_type === '2' ? 'active' : ''"
      >
        <i class="iconfont icon-weixin"></i>
      </div>
      <div
        class="box box2"
        @click="changeType('1')"
        :class="payData.pay_type === '1' ? 'active' : ''"
      >
        <i class="iconfont icon-zhifubao"></i>
      </div>
    </div>
    <div class="pay-bottom">
      <div class="price">合计:￥<span>100</span></div>
      <van-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        round
        class="resetButton"
        @click="cancelPay"
      >
        取消订单
      </van-button>
      <van-button
        type="primary"
        color="linear-gradient(to left, #6bd8d8, #27ba9b)"
        round
        class="resetButton"
        @click="enterPay"
        :disabled="payData.pay_type === ''"
      >
        付款
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay {
  margin-top: 44px;
  .method {
    width: 100%;
    display: flex;
    padding-top: 15px;
    .box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 15px;
      height: 157px;
      border: 2px solid #707070;
      border-radius: 10px;
      i {
        font-size: 55px;
      }
    }
    .box1 {
      &.active {
        border-color: #1aad19;
        i {
          color: #1aad19;
        }
      }
    }
    .box2 {
      &.active {
        border-color: #1778ff;
        i {
          color: #1778ff;
        }
      }
    }
  }
  .pay-bottom {
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
      margin-right: 32px;
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
