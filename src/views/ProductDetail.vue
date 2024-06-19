<script setup lang="ts">
import { addCartAPI } from '@/api/cart/catr'
import { getProDetailAPI } from '@/api/product/product'
import { goodsDetailData } from '@/api/product/type'
import CommonHeader from '@/components/CommonHeader.vue'
import CountBox from '@/components/CountBox.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { imgfilter } from '@/utils/imgfilter'
import { closeToast, showLoadingToast, showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()

const route = useRoute()
const count = ref<number>(1)
// 是否弹出
const showPopup = ref<boolean>(false)
// mode不同弹出框按钮的文字不同
const mode = ref<string>('addcart')
// 商品数据
const ProDetail = ref<goodsDetailData>()
// 得到商品数据
const getProDetail = async () => {
  const res = await getProDetailAPI(route.params.id as string)
  if (res.resultCode === 200) {
    ProDetail.value = res.data
  }
}

onMounted(async () => {
  await getProDetail()
})

const addCart = () => {
  showPopup.value = true
  mode.value = 'cart'
}

const buyNow = () => {
  showPopup.value = true
  mode.value = 'buyNow'
}

// 点击加入购物车或者立即购买
const goodsFn = async () => {
  if (mode.value === 'cart') {
    showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
    // 由于后端只给了改数字接口，所以前端需要对购物车进行判断
    const tempcount = ref<number>(1)
    tempcount.value = count.value
    const findItem = cartStore.cart?.data.find((item) => item.goodsId === ProDetail.value?.goodsId)
    if (findItem) {
      tempcount.value += findItem.goodsCount
    }
    const res = await addCartAPI(tempcount.value, ProDetail.value?.goodsId as string)
    if (res.resultCode === 200) {
      await cartStore.getCart()
      closeToast()
      showToast('添加购物车成功')
    }
  } else {
    console.log('去购买页')
  }
  showPopup.value = false
}

// 得到数据渲染购物车的右上角数字
const cartStore = useCartStore()
onMounted(async () => {
  if (!userStore.token) return

  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await cartStore.getCart()
  closeToast()
})
</script>

<template>
  <div class="productdetail">
    <CommonHeader :showBack="true">商品详情</CommonHeader>
    <div class="detail-content">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="image in ProDetail?.goodsCarouselList" :key="image" lazy-render>
          <img :src="imgfilter(image)" />
        </van-swipe-item>
      </van-swipe>
      <div class="detail-summary">
        <span class="price"
          >￥<i>{{ ProDetail?.sellingPrice }}</i></span
        >
        <span class="name">{{ ProDetail?.goodsName }}</span>
        <span class="intro">{{ ProDetail?.goodsIntro }}</span>
      </div>
      <div class="detail-intro" v-html="ProDetail?.goodsDetailContent"></div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="cartStore.cart?.data.length"
        @click="$router.push('/cart')"
      />
      <van-action-bar-button
        color="linear-gradient(to right, #6bd8d8, #27ba9b)"
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-action-bar-button
        color="linear-gradient(to right, #6bd8d8, #27ba9b)"
        type="danger"
        text="立即购买"
        @click="buyNow"
      />
    </van-action-bar>
  </div>

  <!-- 未登录情况 -->
  <!-- <div class="empty" v-else>
    <CommonHeader :showBack="true">商品详情</CommonHeader>
    <EmptyBox></EmptyBox>
  </div> -->

  <van-popup v-model:show="showPopup" closeable round position="bottom" class="popup">
    <div class="goods">
      <img :src="imgfilter(ProDetail?.goodsCoverImg as string)" />
      <div class="right">
        <span class="price">￥{{ ProDetail?.sellingPrice }}</span>
        <span class="name">{{ ProDetail?.goodsName }}</span>
      </div>
    </div>
    <div class="count">
      <span>选择数量</span>
      <CountBox v-model:count="count"></CountBox>
    </div>
    <van-button type="primary" block round class="buttonReset" @click="goodsFn">{{
      mode === 'cart' ? '加入购物车' : '立刻购买'
    }}</van-button>
  </van-popup>
</template>

<style scoped lang="scss">
.productdetail {
  margin-top: 44px;
  min-height: 100vh;
  background-color: #f6f6f6;
  .my-swipe {
    background-color: #fff;
    img {
      width: 100%;
    }
  }
  .detail-summary {
    display: flex;
    flex-direction: column;
    margin: 5px 7px;
    padding: 15px 10px;
    background-color: #fff;
    border-radius: 10px;
    .price {
      color: #27ba9b;
      margin-bottom: 5px;
      i {
        font-size: 18px;
        font-weight: 600;
      }
    }
    .name {
      font-size: 14px;
      margin-bottom: 7px;
    }
    .intro {
      font-size: 11px;
      color: #797979;
    }
  }
  .detail-intro {
    padding: 0 10px;
    margin-bottom: 50px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    :deep(img) {
      width: 100%;
    }
  }
}

.empty {
  margin-top: 44px;
}
.popup {
  height: 40%;
  padding: 20px;
  --van-popup-close-icon-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .goods {
    display: flex;
    img {
      width: 80px;
      margin-right: 10px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 10px 0;
      .price {
        font-size: 14px;
        color: #27ba9b;
      }
      .name {
        font-size: 11px;
        color: #797979;
      }
    }
  }
  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 10px;
  }
  .buttonReset {
    height: 40px;
  }
}
</style>
