<script setup lang="ts">
import { getCategoryApi } from '@/api/category/category'
import { categoryData, secondLevelData } from '@/api/category/type'
import { closeToast, showLoadingToast } from 'vant'
import { onMounted, ref } from 'vue'
import { imgfilter } from '@/utils/imgfilter'

const category = ref<categoryData[]>([])
const seccondCategory = ref<secondLevelData[]>([])
// 得到总体分组数据
const getCategory = async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await getCategoryApi()
  if (res.resultCode === 200) {
    category.value = res.data
  }
  closeToast()
}

onMounted(async () => {
  await getCategory()
})

// 控制左边分类的样式
const isActive = ref<number>()
const toggleCategory = (id: number) => {
  // 更改样式
  isActive.value = id
  // 传入二级ID，找到对应三级分类，赋值，然后渲染
  seccondCategory.value = category.value.find((item) => item.categoryId === id)
    ?.secondLevelCategoryVOS as secondLevelData[]
}
</script>

<template>
  <div class="category">
    <header class="categoryHeader">
      <span class="search" @click="$router.push('/search')">
        <span class="iconfont icon-sousuo"></span>
        <span class="recommend">搜索内容</span>
      </span>
      <i class="iconfont icon-gengduo"></i>
    </header>
    <div class="categoryBox">
      <div class="left">
        <ul class="primaryList">
          <li
            v-for="item in category"
            :key="item.categoryId"
            @click="toggleCategory(item.categoryId)"
          >
            <span :class="item.categoryId === isActive ? 'active' : ''">
              {{ item.categoryName }}
            </span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div
          class="categoryItem"
          v-for="item in seccondCategory"
          :key="item.categoryId"
          @click="$router.push({ path: '/productlist', query: { categoryId: item.categoryId } })"
        >
          <img :src="imgfilter(item.categoryImg)" alt="" />
          <span>{{ item.categoryName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  background-color: #fff;
  margin-top: 44px;
  .categoryHeader {
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
      flex: 1;
      height: 28px;
      margin-right: 30px;
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
  }
  .categoryBox {
    display: flex;
    height: calc(100vh - 44px - 57px);
    overflow: auto;
    .left {
      flex: 1;
      height: 100%;
      overflow: auto;
      .primaryList {
        li {
          padding: 20px 0;
          span {
            width: 100%;
            padding-left: 10px;
            border-left: 5px solid #fff;
            font-size: 13px;
            color: #636363;
            &.active {
              border-left: 5px solid #27ba9b;
              font-weight: 500;
              color: #000;
            }
          }
        }
      }
    }
    .right {
      flex: 3;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      height: 100%;
      padding-top: 10px;
      overflow: auto;
      .categoryItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 33.3%;
        height: 80px;
        margin-bottom: 20px;
        img {
          width: 60px;
          height: 60px;
        }
        span {
          font-size: 13px;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
