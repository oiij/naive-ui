# UseNaiveForm

## Demo

<demo vue="./demos/use-naive-form.vue" title="UseNaiveForm" />

## Types

```ts
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
```
