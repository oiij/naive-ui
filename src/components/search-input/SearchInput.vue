<script setup lang='ts'>
import type { ButtonProps, InputProps } from 'naive-ui'
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { debounce } from 'radash'
import { ref, watch } from 'vue'

const { value, autoTrigger = true, searchButton = true, inputProps, buttonProps } = defineProps<{
  value?: string
  autoTrigger?: boolean | number
  searchButton?: boolean
  inputProps?: InputProps
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'update:value', v: typeof value): void
}>()
const _value = ref(value)
watch(() => value, (v) => {
  _value.value = v
})
const debounceEmit = debounce({ delay: typeof autoTrigger === 'number' ? autoTrigger : 500 }, () => {
  emit('update:value', _value.value)
})
watch(_value, () => {
  if (autoTrigger)
    debounceEmit()
})
function handleClick() {
  emit('update:value', _value.value)
}
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter')
    handleClick()
}
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="_value" placeholder="搜索" v-bind="inputProps" @keydown="handleKeyDown">
      <template #prefix>
        <slot name="icon">
          <i class="i-mage-search" />
        </slot>
      </template>
    </NInput>
    <slot name="button">
      <NButton v-if="searchButton" v-bind="buttonProps" @click="handleClick">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Mage Icons by MageIcons - https://github.com/Mage-Icons/mage-icons/blob/main/License.txt --><path fill="none" stroke="#757575" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.783 18.828a8.05 8.05 0 0 0 7.439-4.955a8.03 8.03 0 0 0-1.737-8.765a8.045 8.045 0 0 0-13.735 5.68c0 2.131.846 4.174 2.352 5.681a8.05 8.05 0 0 0 5.68 2.359m5.706-2.337l4.762 4.759" /></svg>
        </template>
      </NButton>
    </slot>
  </NInputGroup>
</template>

<style scoped lang='less'>

</style>
