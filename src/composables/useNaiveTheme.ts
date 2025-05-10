import type { GlobalThemeOverrides, NDateLocale } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'
import { colord } from 'colord'
import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  zhCN,
} from 'naive-ui'
import { computed, ref } from 'vue'

interface Color {
  primary: string
  info: string
  success: string
  warning: string
  error: string
}
function getStatusColor(color = '#ff461f') {
  return {
    color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  }
}
const naiveLocaleMap: {
  [key: string]: {
    name: string
    dateLocale: NDateLocale
    locale: typeof zhCN
  }
} = {
  'zh-CN': {
    name: '简体中文',
    dateLocale: dateZhCN,
    locale: zhCN,
  },
  'en-US': {
    name: 'English',
    dateLocale: dateEnUS,
    locale: enUS,
  },
}
export interface NaiveThemeReturns {
  theme: ComputedRef<typeof darkTheme | undefined>
  themeOverrides: ComputedRef<GlobalThemeOverrides>
  locale: ComputedRef<typeof zhCN | typeof enUS>
  dateLocale: ComputedRef<NDateLocale>
  color: Ref<Color>
  setColor: (v: Color) => void
}
export function useNaiveTheme<T extends 'zh-CN' | 'en-US'>(darkMode?: ComputedRef<boolean> | Ref<boolean>, language?: ComputedRef<T> | Ref<T>, globalThemeOverrides?: GlobalThemeOverrides): NaiveThemeReturns {
  const { common, Dialog, ...extra } = globalThemeOverrides || {}
  const color = ref<Color>({
    primary: '#64748B',
    info: '#06b6d4',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#f43f5e',
  })
  function setColor(v: Color) {
    color.value = v
  }
  const theme = computed(() => {
    return darkMode?.value ? darkTheme : undefined
  })
  const themeOverrides: ComputedRef<GlobalThemeOverrides> = computed(() => {
    const primary = getStatusColor(color.value.primary)
    const info = getStatusColor(color.value.info)
    const success = getStatusColor(color.value.success)
    const warning = getStatusColor(color.value.warning)
    const error = getStatusColor(color.value.error)
    return {
      common: {
        bodyColor: darkMode?.value ? '#1f1f1f' : '#f5f5f5',
        primaryColor: primary.color,
        primaryColorHover: primary.hover,
        primaryColorPressed: primary.pressed,
        primaryColorSuppl: primary.suppl,
        infoColor: info.color,
        infoColorHover: info.hover,
        infoColorPressed: info.pressed,
        infoColorSuppl: info.suppl,
        successColor: success.color,
        successColorHover: success.hover,
        successColorPressed: success.pressed,
        successColorSuppl: success.suppl,
        warningColor: warning.color,
        warningColorHover: warning.hover,
        warningColorPressed: warning.pressed,
        warningColorSuppl: warning.suppl,
        errorColor: error.color,
        errorColorHover: error.hover,
        errorColorPressed: error.pressed,
        errorColorSuppl: error.suppl,
        borderRadius: '6px',
        ...common,
      },
      Dialog: {
        borderRadius: '12px',
        padding: '20px',
        closeMargin: '20px 20px 0 0',
        ...Dialog,
      },
      ...extra,
    }
  })
  const locale = computed(() => {
    if (!language?.value || !naiveLocaleMap[language.value])
      return naiveLocaleMap['zh-CN'].locale
    return naiveLocaleMap[language.value].locale
  })
  const dateLocale = computed(() => {
    if (!language?.value || !naiveLocaleMap[language.value])
      return naiveLocaleMap['zh-CN'].dateLocale
    return naiveLocaleMap[language.value].dateLocale
  })

  return {
    theme,
    themeOverrides,
    locale,
    dateLocale,
    color,
    setColor,
  }
}
