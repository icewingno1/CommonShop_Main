<script setup lang="ts">
import { getProListAPI } from '@/api/product/product'
import { goodsListItem, searchData } from '@/api/product/type'
import { onMounted, ref } from 'vue'
import { closeToast, showLoadingToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import EmptyBox from '@/components/EmptyBox.vue'
import { useUserStore } from '@/stores/user'
import CommonHeader from '@/components/CommonHeader.vue'
import { imgfilter } from '@/utils/imgfilter'
const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

const goBack = () => {
  router.back()
}

const orderBy = ref<string>('')
// 请求数据
const reqData = ref<searchData>({
  keyword: '',
  goodsCategoryId: ''
})
// 需要渲染的商品数组
const goodsList = ref<goodsListItem[]>([])
// 请求方法
const getProList = async () => {
  const res = await getProListAPI(reqData.value)
  goodsList.value = res.data
}

// 切换TAB栏
const onClickTab = async () => {
  // 数组置空
  goodsList.value = []
  await getProList()
}

onMounted(async () => {
  // 因为没有设置缓存，每次进去都会重新获得数据
  if (route.query.categoryId) {
    reqData.value.goodsCategoryId = route.query.categoryId as string
  } else {
    reqData.value.keyword = route.query.keyword as string
  }
  // 此处展示toast是防止onload频繁出现
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await getProList()
  closeToast()
})
</script>

<template>
  <div class="productlist" v-if="userStore.token">
    <header class="product-header">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <span class="searchContent" @click="$router.push('/search')">
        <span class="iconfont icon-sousuo"></span>
        <span class="text"> 这是用户搜索内容 </span>
      </span>
    </header>
    <van-tabs
      v-model:active="orderBy"
      :duration="0"
      line-width="0"
      title-active-color="#27ba9b"
      class="resetTabs"
      @click-tab="onClickTab"
    >
      <van-tab title="综合" name=""></van-tab>
      <van-tab title="新品" name="new"></van-tab>
      <van-tab title="价格" name="price"></van-tab>
    </van-tabs>

    <div class="product-content">
      <div
        class="product-item"
        v-for="item in goodsList"
        :key="item.goodsId"
        @click="$router.push(`/goods/${item.goodsId}`)"
      >
        <div class="left">
          <img :src="imgfilter(item.goodsCoverImg)" alt="" />
        </div>
        <div class="right">
          <span class="goodsName">{{ item.goodsName }}</span>
          <span class="goodsIntro">{{ item.goodsIntro }}</span>
          <span class="goodsPrice"><i>￥</i>{{ item.sellingPrice }}</span>
          <div class="other">{{ item.goodsId }}条评价<i></i>99.8%满意度</div>
        </div>
      </div>
    </div>
  </div>

  <div class="empty" v-else>
    <CommonHeader :showBack="true">商品详情</CommonHeader>
    <EmptyBox></EmptyBox>
  </div>
</template>

<style scoped lang="scss">
.productlist {
  margin-top: 44px;
  .product-header {
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
    background-color: #fff;
    .searchContent {
      flex: 1;
      height: 28px;
      padding: 0 5px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      border-radius: 22px;
      background-color: #f7f7f7;
      color: #b4b4b4;
      .text {
        margin-left: 5px;
        width: 100%;
      }
    }
  }
  .resetTabs {
    height: 30px;
    --van-tabs-line-height: 30px;
  }
  .product-content {
    padding: 1px 0;
    background-color: #f4f4f4;
    .product-item {
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
        img {
          height: 100px;
          width: 100px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        padding: 10px 0;
        height: 100%;
        box-sizing: border-box;
        .goodsName {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .goodsIntro {
          margin-bottom: 15px;
          font-size: 10px;
          color: #797979;
          i {
            margin: 0 5px;
          }
        }
        .goodsPrice {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          i {
            font-size: 10px;
          }
        }
        .other {
          font-size: 10px;
          color: #797979;
          i {
            margin: 0 3px;
          }
        }
      }
    }
  }
}
.empty {
  margin-top: 44px;
}
</style>
