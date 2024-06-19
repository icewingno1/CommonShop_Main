<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const props = defineProps({
  showBack: { type: Boolean, default: false }
})
</script>

<template>
  <header class="commonHeader">
    <i class="iconfont icon-fanhui" @click="goBack" v-if="props.showBack"></i>
    <i class="empty" v-else></i>
    <span class="headerTitle"><slot>没有内容</slot></span>
    <i class="iconfont icon-gengduo"></i>
  </header>
</template>

<style lang="scss" scoped>
.commonHeader {
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
  // border-bottom: 1px solid #dcdcdc;
  background: #fff;
  .headerTitle {
    font-size: 14px;
  }
  .empty {
    width: 16px;
  }
}
</style>
