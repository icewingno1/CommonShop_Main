<script setup lang="ts">
const count = defineModel<number>('count', { required: true })

const handleAdd = () => {
  if (count.value >= 99) {
    return
  }
  count.value += 1
}

const handleSub = () => {
  if (count.value <= 1) {
    return
  }
  count.value -= 1
}

const handleChange = (e: any) => {
  // 转数字处理 (1) 数字 (2) NaN
  const num = +e.target.value
  // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
  if (isNaN(num) || num < 1 || num > 99) {
    e.target.value = count.value
    return
  }
  count.value = num
}
</script>

<template>
  <div class="count-box">
    <div @click="handleSub" class="minus">-</div>
    <input :value="count" @change="handleChange" class="inp" type="text" />
    <div @click="handleAdd" class="add">+</div>
  </div>
</template>

<style scoped lang="scss">
.count-box {
  display: flex;
  align-items: center;
  .add,
  .minus {
    width: 25px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    outline: none;
    border: none;
    font-size: 14px;
  }
  .inp {
    width: 30px;
    height: 20px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
