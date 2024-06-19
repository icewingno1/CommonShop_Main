<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import { onMounted, ref } from 'vue'
import { closeToast, showLoadingToast, type AddressListAddress } from 'vant'
import { getAddressAPI } from '@/api/address/address'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/address'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const addressStore = useAddressStore()
const cartStore = useCartStore()

const chosenAddressId = ref()
const addressList = ref<AddressListAddress[]>([])
onMounted(async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  const res = await getAddressAPI()
  if (res.resultCode === 200) {
    addressList.value = res.data.map((item) => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        // 数字转化为boolean
        isDefault: !!item.defaultFlag
      }
    })
    // 如过store里有ID优先选中store里的ID，否则选择默认
    if (addressStore.addressId) {
      chosenAddressId.value = Number(addressStore.addressId)
    } else {
      chosenAddressId.value = addressList.value.find((item) => item.isDefault === true)?.id
    }
  }
  closeToast()
})

const onAdd = () => {
  router.push({ path: '/address/edit' })
}

const onEdit = (item: AddressListAddress) => {
  router.push({ path: '/address/edit', query: { id: item.id } })
}

const onSelect = (item: AddressListAddress) => {
  // 由于VANT提供类型是Numeric，所以要先转成字符串
  addressStore.setAddressId(item.id.toString())
}

onBeforeRouteLeave((to) => {
  // 考虑到有用户从该页面直接输网址跳到另一个页面也会导致order页出bug，所以在此处页增加了判断
  if (to.path === '/address/edit') {
    return
  } else if (to.path === '/order') {
    return
  } else {
    addressStore.clearAddressId()
    cartStore.clearChecked()
  }
})
</script>

<template>
  <div class="addressselect">
    <CommonHeader :show-back="true">地址列表</CommonHeader>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      class="select-content"
      :switchable="$route.query.type !== undefined"
    />
  </div>
</template>

<style scoped lang="scss">
.addressselect {
  .select-content {
    margin-top: 44px;
  }
}
</style>
