<script setup lang="ts"></script>

<template>
  <div class="empty-content">
    <van-empty class="empty" description="您还未登录，请先登录">
      <van-button round type="primary" class="resetButton" @click="$router.push('/login')"
        >登录</van-button
      >
    </van-empty>
  </div>
</template>

<style scoped>
.empty-content {
  .empty {
    --van-empty-padding: 150px 50px;
  }
  .resetButton {
    width: 150px;
    height: 38px;
  }
}
</style>
