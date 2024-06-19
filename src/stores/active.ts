import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActiveStore = defineStore('active', () => {
  const active = ref<string[]>(['Home', 'Category', 'User'])

  // 因为在search页会有两种情况,一种是点返回,一种是点搜索,这两种都有可能返回prolist页面
  // 增加一个tempPath储存fullpath,简略判断是否是点返回的情况
  const tempPath = ref<string>('')

  const addActive = (page: string) => {
    // 防止加入多个相同页面
    if (active.value.find((item) => item === page)) {
      return
    }
    active.value.push(page)
  }

  const deleActive = (page: string) => {
    active.value = active.value.filter((item) => item !== page)
  }

  const savePath = (page: string) => {
    tempPath.value = page
  }

  const needNav = ref<string[]>(['/home', '/category', '/cart', '/user'])

  const setNeedNav = (data: string[]) => {
    needNav.value = data
  }

  return { addActive, deleActive, savePath, active, tempPath, needNav, setNeedNav }
})
