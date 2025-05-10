import type { ValidateError } from 'async-validator'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type { Reactive, Ref } from 'vue'
import { reactive, ref, toValue } from 'vue'

type JSONValue = string | number | boolean | null | { [x: string]: JSONValue } | JSONValue[]
function clearObjectValues<T extends JSONValue>(obj: T): T {
  // 处理数组类型
  if (Array.isArray(obj)) {
    obj.length = 0 // 清空数组
    return obj
  }

  // 处理普通对象
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = clearObjectValues(obj[key])
      }
    }
    return obj
  }

  // 处理基本数据类型（直接返回对应空值）
  if (typeof obj === 'string')
    return '' as T
  if (typeof obj === 'number')
    return 0 as T
  if (typeof obj === 'boolean')
    return false as T
  // 其他类型（如 null、undefined、Symbol）保持不变
  return obj
}
type ExtendsType = Record<string, unknown>
export type NaiveFormRules<T extends ExtendsType> = Partial<Record<keyof T, FormRules | FormItemRule | FormItemRule[]>> | undefined
export interface NaiveFormOptions<T extends ExtendsType> {
  value?: T
  rules?: NaiveFormRules<T>
}
export interface NaiveFormReturns<T extends ExtendsType> {
  formRef: Ref<FormInst | undefined>
  formValue: Ref<T>
  rules: NaiveFormRules<T>
  formProps: {
    ref: Ref<FormInst | undefined>
    model: Reactive<T>
    rules: NaiveFormRules<T>
  }
  validate: () => Promise<{
    warnings: ValidateError[][] | undefined
  }> | undefined
  resetValidation: () => void
  resetForm: () => void
  clear: () => void
  reset: () => void
}
export function useNaiveForm<T extends ExtendsType>(options?: NaiveFormOptions<T>): NaiveFormReturns<T> {
  const { value, rules } = options ?? {}
  const formValue = ref<T>(structuredClone(value) as T)
  const formRules = rules

  const formRef = ref<FormInst>()
  const formProps = {
    ref: formRef,
    model: reactive<T>(toValue(formValue)),
    rules: formRules,
  }
  function validate() {
    return formRef.value?.validate()
  }
  function resetValidation() {
    formRef.value?.restoreValidation()
  }
  function clear() {
    clearObjectValues(formValue.value)
  }
  function resetForm() {
    clear()
    Object.assign(formValue.value, structuredClone(value))
  }
  function reset() {
    resetValidation()
    resetForm()
  }

  return {
    formRef,
    formValue: formValue as Ref<T>,
    rules: formRules,
    formProps,
    validate,
    resetValidation,
    resetForm,
    reset,
    clear,
  }
}
