<script setup lang="ts">
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const inputRef = ref<any>(null)
const searchData = ref<string>('')
const historySearch = ref<string[]>([])
onMounted(() => {
  inputRef.value.focus()
  historySearch.value = JSON.parse(localStorage.getItem('searchData') as string) || []
})

// 点击搜索
const goSearch = () => {
  if (searchData.value === '') {
    showToast('输入内容不可为空')
    return
  }
  historySearch.value.push(searchData.value)
  localStorage.setItem('searchData', JSON.stringify(historySearch.value))
  router.replace({ path: '/productlist', query: { keyword: searchData.value } })
}
</script>

<template>
  <div class="search">
    <header class="searchHeader">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <span class="searchContent" @click="$router.push('/search')">
        <span class="iconfont icon-sousuo"></span>
        <span class="text">
          <input type="text" placeholder="请输入搜索的商品" ref="inputRef" v-model="searchData" />
        </span>
      </span>
      <span @click="goSearch">搜索</span>
    </header>
    <div class="historySearch" v-if="historySearch.length !== 0">
      <div class="title">
        <span>最近搜索</span>
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="bottom">
        <span
          v-for="item in historySearch"
          :key="item"
          @click="$router.replace({ path: '/productlist', query: { keyword: item } })"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  margin-top: 44px;
  .searchHeader {
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
        input {
          width: 100%;
          color: #000;
          background-color: #f7f7f7;
        }
      }
    }
  }
  .historySearch {
    width: 100%;
    padding: 10px;
    // background-color: #b4b4b4;
    box-sizing: border-box;
    .title {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
    }
    .bottom {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;
      span {
        margin: 5px;
        padding: 3px 6px;
        border: 1px solid #27ba9b;
        border-radius: 12px;
      }
    }
  }
}
</style>
