<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import EmptyBox from '@/components/EmptyBox.vue'
import { useUserStore } from '@/stores/user'
import { showConfirmDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 登出
const logout = () => {
  showConfirmDialog({
    message: '是否确定退出登录'
  }).then(async () => {
    // on confirm
    await userStore.clearInfo()
    router.push('/')
    showToast('已退出登录')
  })
}
</script>

<template>
  <div class="user" v-if="userStore.token">
    <CommonHeader>我的</CommonHeader>
    <div class="user-content">
      <div class="user-info">
        <img src="@/assets/avatar.webp" alt="" class="avatar" />
        <div class="right">
          <div class="name">
            <span class="nickname">{{ userStore.userInfo.nickName }}</span>
            <span class="loginname">({{ userStore.userInfo.loginName }})</span>
          </div>
          <div class="intro">{{ userStore.userInfo.introduceSign }}</div>
        </div>
      </div>
    </div>
    <div class="user-list">
      <ul>
        <li @click="$router.push('/address')">
          我的地址<i class="iconfont icon-jinrujiantou"></i>
        </li>
        <li @click="$router.push('/orderList')">
          订单管理<i class="iconfont icon-jinrujiantou"></i>
        </li>
        <li @click="logout">退出登录<i class="iconfont icon-jinrujiantou"></i></li>
      </ul>
    </div>
  </div>
  <!-- 未登录情况 -->
  <EmptyBox v-else></EmptyBox>
</template>

<style scoped lang="scss">
.user {
  margin-top: 44px;
  .user-content {
    padding: 0 10px;
    .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      height: 102px;
      padding: 8px;
      box-sizing: border-box;
      background: linear-gradient(to right, #20cda7, #27ba9b);
      border-radius: 10px;
      img {
        height: 85px;
        width: 85px;
        margin-right: 5px;
        border-radius: 50px;
        border: 1px solid #707070;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        color: #fff;
        .nickname {
          font-size: 16px;
          font-weight: 600;
          margin-right: 5px;
        }
        .intro {
          font-size: 14px;
        }
      }
    }
  }
  .user-list {
    margin-top: 20px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 45px;
        font-size: 14px;
        color: #707070;
      }
    }
  }
}
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
