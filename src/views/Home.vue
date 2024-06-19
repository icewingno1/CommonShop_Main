<script setup lang="ts">
import { onActivated, onDeactivated, onMounted, ref } from 'vue'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { categoryData, indexInfoData } from '@/api/home/type'
import { getIndexInfo } from '@/api/home/home'
import { isSingal } from '@/utils/math'
import GoodsItem from '@/components/GoodsItem.vue'

let indexInfo = ref<indexInfoData>()
const getInfo = async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await getIndexInfo()
  if (res.resultCode === 200) {
    indexInfo.value = res.data
  }
  closeToast()
}

// 进来先获取首页数据
onMounted(async () => {
  await getInfo()
})

// 头部滚动透明效果
let timer: any = null
let transparent = ref<number>(1)
const top = ref<number>(0)
const handleScroll = () => {
  if (timer !== null) {
    return
  }
  timer = setTimeout(() => {
    top.value = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
    if (top.value <= 150) {
      transparent.value = top.value / 150
    } else {
      transparent.value = 1
    }
    timer = null
  }, 50)
}

// 分类栏目数据
const category = ref<Array<categoryData>>([
  {
    name: '新蜂超市',
    imgUrl: '//s.weituibao.com/1583585285461/cs.png',
    categoryId: 100001
  },
  {
    name: '新蜂服饰',
    imgUrl: '//s.weituibao.com/1583585285468/fs.png',
    categoryId: 100003
  },
  {
    name: '全球购',
    imgUrl: '//s.weituibao.com/1583585285470/qq.png',
    categoryId: 100002
  },
  {
    name: '新蜂生鲜',
    imgUrl: '//s.weituibao.com/1583585285472/sx.png',
    categoryId: 100004
  },
  {
    name: '新蜂到家',
    imgUrl: '//s.weituibao.com/1583585285467/dj.png',
    categoryId: 100005
  },
  {
    name: '充值缴费',
    imgUrl: '//s.weituibao.com/1583585285465/cz.png',
    categoryId: 100006
  },
  {
    name: '9.9元拼',
    imgUrl: '//s.weituibao.com/1583585285469/pt.png',
    categoryId: 100007
  },
  {
    name: '领劵',
    imgUrl: '//s.weituibao.com/1583585285468/juan.png',
    categoryId: 100008
  },
  {
    name: '省钱',
    imgUrl: '//s.weituibao.com/1583585285471/sq.png',
    categoryId: 100009
  },
  {
    name: '全部',
    imgUrl: '//s.weituibao.com/1583585285470/qb.png',
    categoryId: 100010
  }
])
const categoryClick = () => {
  showToast('敬请期待')
}

// 通过activated达到储存页面scroll目的
onActivated(() => {
  document.documentElement.scrollTop = top.value
  // 先改变滚动位置再监听事件可以防止搜索框闪现
  window.addEventListener('scroll', handleScroll)
})

onDeactivated(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="home">
    <header class="homeHeader" :style="{ backgroundColor: `rgba(255,255,255, ${transparent})` }">
      <img src="@/assets/logo.svg" class="logo" />
      <span class="search" @click="$router.push('/search')">
        <span class="iconfont icon-sousuo"></span>
        <span class="recommend">搜索内容</span>
      </span>
      <i class="iconfont icon-gengduo"></i>
    </header>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="image in indexInfo?.carousels" :key="image.carouselUrl" lazy-render>
        <img :src="image.carouselUrl" />
      </van-swipe-item>
    </van-swipe>
    <!-- 展示商城特点 -->
    <p class="intruduce">
      <span><i class="iconfont icon-success"></i>官方商城</span>
      <span><i class="iconfont icon-success"></i>正品保障</span>
      <span><i class="iconfont icon-success"></i>售后无忧</span>
    </p>
    <!-- 分类模块 -->
    <div class="category-list">
      <div class="category-box">
        <div
          class="category-item"
          v-for="item in category"
          :key="item.categoryId"
          @click="categoryClick"
        >
          <img class="category-img" :src="item.imgUrl" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 商品模块 -->
    <div class="model-title"><span>新品上线</span></div>
    <div class="goods-list">
      <GoodsItem
        v-for="item in indexInfo?.newGoodses"
        :goods="item"
        :key="item.goodsId"
        @click="$router.push(`/goods/${item.goodsId}`)"
      ></GoodsItem>
      <div class="goods-empty" v-if="isSingal(indexInfo?.newGoodses.length as number)">
        <span>更多商品，敬请期待....</span>
      </div>
    </div>

    <div class="model-title"><span>热门好物</span></div>
    <div class="goods-list">
      <GoodsItem
        v-for="item in indexInfo?.hotGoodses"
        :goods="item"
        :key="item.goodsId"
        @click="$router.push(`/goods/${item.goodsId}`)"
      ></GoodsItem>
      <div class="goods-empty" v-if="isSingal(indexInfo?.hotGoodses.length as number)">
        <span>更多商品，敬请期待....</span>
      </div>
    </div>

    <div class="model-title"><span>推荐商品</span></div>
    <div class="goods-list">
      <GoodsItem
        v-for="item in indexInfo?.recommendGoodses"
        :goods="item"
        :key="item.goodsId"
        @click="$router.push(`/goods/${item.goodsId}`)"
      ></GoodsItem>
      <div class="goods-empty" v-if="isSingal(indexInfo?.recommendGoodses.length as number)">
        <span>更多商品，敬请期待....</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-bottom: 57px;
  .homeHeader {
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
    .search {
      height: 28px;
      width: 200px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      border-radius: 22px;
      background-color: #f7f7f7;
      color: #b4b4b4;
      .recommend {
        margin-left: 5px;
      }
    }
    .logo {
      height: 18px;
    }
  }

  .my-swipe {
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .intruduce {
    display: flex;
    justify-content: space-around;
    color: #a29595;
    span {
      display: flex;
      align-items: center;
    }
  }

  .category-list {
    width: 100%;
    padding: 5px 0;
    overflow: scroll;
    .category-box {
      width: 200%;
      display: flex;
      .category-item {
        display: flex;
        width: 10%;
        height: 70px;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .category-img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
    z-index: 0;
    // padding: 5px 0;
    background-color: #f5f5f5;
    .goods-empty {
      width: 48%;
      padding: 5px 0;
      border-radius: 10px;
      margin-bottom: 5px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: #a29595;
        font-size: 14px;
      }
    }
  }
}

// 以下为公用
.model-title {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px dotted #a29595;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 50;
}
</style>
