# NaiveUI Composables

Features:

- Bundle with [tsup](https://github.com/egoist/tsup)
- Test with [vitest](https://vitest.dev)

## Usage

```bash
pnpm add @oiij/naive-ui
```

```ts
import { useNaiveForm, useNaiveTheme } from '@oiij/naive-ui'
const { theme, themeOverrides, locale, dateLocale, color, setColor, } = useNaiveTheme()
const { formRef, formProps, formValue, rules, validate, resetValidation, resetForm, reset, clear, } = useNaiveForm({
  value: {
    foo: ''
  },
  rules: {
    foo: {
      required: true
    }
  }
})
```

## License

MIT
