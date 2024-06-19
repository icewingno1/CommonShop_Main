<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { useRouter } from 'vue-router'
import { useActiveStore } from './stores/active'

const router = useRouter()
const showNav = ref<boolean>(true)

// 通过pinia动态控制页面keepActive
const pageStore = useActiveStore()
router.beforeEach((to, from) => {
  // 利用前置守卫达到A->B，A页缓存，A->其他，A不缓存的目的
  if (to.path === '/search' && from.path === '/productlist') {
    pageStore.addActive('ProductList')
    pageStore.savePath(from.fullPath)
  } else if (to.path !== '/search' && from.path === '/productlist') {
    if (to.path === '/productlist' && from.path === '/productlist') {
      router.go(-1)
    }
    pageStore.deleActive('ProductList')
  } else if (to.path === '/productlist' && from.path === '/search') {
    // 分两种情况,点返回和点搜索
    // 点搜索的情况
    if (pageStore.tempPath !== to.fullPath) {
      pageStore.deleActive('ProductList')
    }
  }

  if (to.path === '/cart' && from.path.includes('/goods')) {
    pageStore.setNeedNav(['/home', '/category', '/user'])
  } else if (to.path === '/cart') {
    pageStore.setNeedNav(['/home', '/category', '/cart', '/user'])
  }

  if (pageStore.needNav.includes(to.fullPath)) {
    showNav.value = true
  } else {
    showNav.value = false
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="pageStore.active" :max="6">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
  <NavBar v-if="showNav"></NavBar>
</template>

<style scoped></style>
