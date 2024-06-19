<script setup lang="ts">
import type { goodsData } from '@/api/home/type'
import defultImg from '@/assets/logo.svg'
import { imgfilter } from '@/utils/imgfilter'

const props = defineProps<{
  goods: goodsData
}>()

// 接口给出的数据存在没有图片的情况，作错误处理
const dealErr = (event: any) => {
  event.target.src = defultImg
}
</script>

<template>
  <div class="itemBox">
    <div class="imgBox">
      <img :src="imgfilter(goods.goodsCoverImg)" class="goodsImg" @error="dealErr($event)" />
    </div>
    <div class="bottom">
      <span class="goodsName">{{ props.goods.goodsName }}</span>
      <span class="goodsIntro">{{ props.goods.goodsIntro }}</span>
      <!-- 功能预留位置 -->
      <div class="discount">
        <!-- <span>限量</span>
        <span>加价购</span> -->
      </div>
      <div class="price">
        <div class="newPrice">￥{{ props.goods.sellingPrice }}</div>
        <!-- <div class="oldPrice">￥999</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.itemBox {
  width: 48%;
  padding: 5px 0;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  .imgBox {
    width: 100%;
    display: flex;
    align-items: center;
    .goodsImg {
      width: 100%;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 5px;
    padding: 5px;
    .goodsName {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .goodsIntro {
      font-size: 11px;
      color: #a29595;
      margin-bottom: 7px;
    }
    .discount {
      &.active {
        margin-bottom: 10px;
      }
      span {
        padding: 1px 3px;
        border: 1px solid #27ba9b;
        border-radius: 4px;
        color: #27ba9b;
        font-size: 11px;
        margin-right: 5px;
      }
    }
    .price {
      display: flex;
      align-items: center;
      .newPrice {
        margin-right: 5px;
        font-size: 14px;
        font-weight: 600;
      }
      .oldPrice {
        font-size: 11ps;
        text-decoration: line-through;
        color: #a29595;
      }
    }
  }
}
</style>
