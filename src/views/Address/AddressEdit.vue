<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import { closeToast, showLoadingToast } from 'vant'
import { onMounted, ref } from 'vue'
import { getLev1, getLev2, getLev3 } from '@/utils/tdist.ts'
import { useRoute, useRouter } from 'vue-router'
import {
  addAddressAPI,
  deleteAddressAPI,
  getAddressDetailAPI,
  updateAddressAPI
} from '@/api/address/address'
import type { AddressEditInfo } from 'vant'
const route = useRoute()
const router = useRouter()

// 地址
const areaList = ref({
  province_list: {},
  city_list: {},
  county_list: {}
})

// 由于更新地址需要用到原始的id，所以新定义一个类型
interface _AddressEditInfo extends AddressEditInfo {
  id: number
}
// 如果为编辑模式，将里面的数据渲染到页面上
const initialData = ref<_AddressEditInfo>()

onMounted(async () => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  // 先得到地址列表
  let _province_list: { [key: string]: any } = {}
  let _city_list: { [key: string]: any } = {}
  let _county_list: { [key: string]: any } = {}
  getLev1().forEach((p) => {
    _province_list[p.id] = p.text
    getLev2(p.id).forEach((c) => {
      _city_list[c.id] = c.text
      getLev3(c.id).forEach((q) => (_county_list[q.id] = q.text))
    })
  })
  areaList.value.province_list = _province_list
  areaList.value.city_list = _city_list
  areaList.value.county_list = _county_list

  // 然后判断是添加还是编辑，编辑则获得数据
  if (route.query.id) {
    const res = await getAddressDetailAPI(route.query.id as string)
    let _areaCode = ref<string>('')
    const province = getLev1()
    Object.entries(areaList.value.county_list).forEach(([id, text]) => {
      // 先找出当前对应的区
      if (text == res.data.regionName) {
        // 找到区对应的几个省份
        const provinceIndex = province.findIndex(
          (item) => item.id.substring(0, 2) == id.substring(0, 2)
        )
        // 找到区对应的几个市区

        const cityItem = Object.entries(areaList.value.city_list).filter(
          ([cityId]) => cityId.substring(0, 4) == id.substring(0, 4)
        )[0]
        // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
        if (
          province[provinceIndex].text == res.data.provinceName &&
          cityItem[1] == res.data.cityName
        ) {
          _areaCode.value = id
        }
      }
    })
    // 数据赋给原始数组
    initialData.value = {
      id: res.data.addressId,
      name: res.data.userName,
      tel: res.data.userPhone,
      province: res.data.provinceName,
      city: res.data.cityName,
      county: res.data.regionName,
      addressDetail: res.data.detailAddress,
      areaCode: _areaCode.value,
      isDefault: !!res.data.defaultFlag,
      country: ''
    }
    closeToast()
  }
})

const onSave = async (info: _AddressEditInfo) => {
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  if (route.query.id) {
    // 编辑模式，走update接口
    await updateAddressAPI({
      address_id: info.id,
      city_name: info.city,
      default_flag: info.isDefault ? 1 : 0,
      detail_address: info.addressDetail,
      province_name: info.province,
      region_name: info.county,
      user_name: info.name,
      user_phone: info.tel
    })
  } else {
    // 否则走add接口
    addAddressAPI({
      city_name: info.city,
      default_flag: info.isDefault ? 1 : 0,
      detail_address: info.addressDetail,
      province_name: info.province,
      region_name: info.county,
      user_name: info.name,
      user_phone: info.tel
    })
  }

  closeToast()
  router.go(-1)
}

const onDelete = async (info: _AddressEditInfo) => {
  // 如果删掉了默认
  showLoadingToast({ forbidClick: true, loadingType: 'spinner' })
  await deleteAddressAPI(info.id)
  closeToast()
  router.go(-1)
}
</script>

<template>
  <div class="addressEdit">
    <CommonHeader :show-back="true">{{ $route.query.id ? '编辑地址' : '添加地址' }}</CommonHeader>
    <van-address-edit
      :area-list="areaList"
      :address-info="initialData"
      :show-delete="!!$route.query.id"
      show-set-default
      :area-columns-placeholder="['省', '市', '区']"
      @save="onSave"
      @delete="onDelete"
      class="edit-content"
    />
  </div>
</template>

<style scoped lang="scss">
.addressEdit {
  .edit-content {
    margin-top: 44px;
  }
}
</style>
