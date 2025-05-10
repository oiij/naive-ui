<script setup lang='ts'>
import { NSearchInput } from '@oiij/naive-ui~components' // ~ 改为 /
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div>
    <NSearchInput v-model:value="value" />
    <span>搜索结果：{{ value }}</span>
  </div>
</template>

<style scoped lang='less'>

</style>
