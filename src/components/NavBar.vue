<script setup lang="ts"></script>

<template>
  <div class="navBar">
    <div class="navList">
      <router-link class="navItem" to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link class="navItem" to="/category">
        <i class="iconfont icon-mulu"></i>
        <span>分类</span>
      </router-link>
      <router-link class="navItem" to="/cart">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </router-link>
      <router-link class="navItem" to="/user">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navBar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 hsla(0, 6%, 80%, 0.6);
  background-color: #fff;
  .navList {
    display: flex;
    .navItem {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 57px;
      &.router-link-active {
        color: #27ba9b;
      }
      i {
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
