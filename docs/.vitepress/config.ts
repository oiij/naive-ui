import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'NaiveUI Expand',
  description: 'An expand component for NaiveUI.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/started' },
    ],

    sidebar: [
      {
        text: 'Started',
        items: [
          { text: 'install', link: '/started' },
        ],
      },
      {
        text: 'components',
        items: [
          { text: 'ConfigProviders', link: '/components/config-providers' },
          { text: 'CopyButton', link: '/components/copy-button' },
          { text: 'SearchInput', link: '/components/search-input' },
          { text: 'TooltipButton', link: '/components/tooltip-button' },
        ],
      },
      {
        text: 'composables',
        items: [
          { text: 'UseNaiveForm', link: '/composables/use-naive-form' },
          { text: 'UseNaiveTheme', link: '/composables/use-naive-theme' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/oiij/naive-ui' },
    ],
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin)
    },
  },
  vite: {
    resolve: {
      alias: {
        '@oiij/naive-ui': resolve(__dirname, '../../src/index.ts'),
        '@oiij/naive-ui~components': resolve(__dirname, '../../src/components.ts'),
      },
    },
    ssr: {
      noExternal: ['naive-ui', 'vueuc'],
    },
  },
})
