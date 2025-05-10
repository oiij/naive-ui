<script setup lang='ts'>
import type { UseClipboardOptions } from '@vueuse/core'
import type { ButtonProps, TooltipProps } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { NButton, NTooltip } from 'naive-ui'
import { watch } from 'vue'

const { value, config, tooltipProps, buttonProps } = defineProps<{
  value?: string
  config?: UseClipboardOptions<string | undefined>
  tooltipProps?: TooltipProps
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'copied', v: typeof value): void
}>()
const { copied, copy } = useClipboard({
  source: value,
  ...config,
})
watch(copied, () => {
  if (copied.value) {
    emit('copied', value)
  }
})
function onClick(ev: MouseEvent) {
  ev.preventDefault()
  copy()
}
</script>

<template>
  <NTooltip v-bind="tooltipProps">
    <template #trigger>
      <span :style="{ cursor: 'pointer' }" @click="onClick">
        <slot>
          <NButton quaternary size="tiny" v-bind="buttonProps">
            <template #icon>
              <slot name="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Mage Icons by MageIcons - https://github.com/Mage-Icons/mage-icons/blob/main/License.txt --><path fill="#757575" d="M18.355 6.54h-1.94V4.69a2.69 2.69 0 0 0-1.646-2.484A2.7 2.7 0 0 0 13.745 2h-8.05a2.68 2.68 0 0 0-2.67 2.69v10.09a2.68 2.68 0 0 0 2.67 2.69h1.94v1.85a2.68 2.68 0 0 0 2.67 2.68h8a2.68 2.68 0 0 0 2.67-2.68V9.23a2.69 2.69 0 0 0-2.62-2.69M7.635 9.23v6.74h-1.94a1.18 1.18 0 0 1-1.17-1.19V4.69a1.18 1.18 0 0 1 1.17-1.19h8.05a1.18 1.18 0 0 1 1.17 1.19v1.85h-4.61a2.69 2.69 0 0 0-2.67 2.69" /></svg>
              </slot>
            </template>
          </NButton>
        </slot>
      </span>
    </template>
    <slot name="tooltip">
      {{ copied ? '复制成功' : '复制' }}
    </slot>
  </NTooltip>
</template>

<style scoped lang='less'>

</style>
