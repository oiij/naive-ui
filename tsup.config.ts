import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['vue', 'naive-ui'],
  dts: true,
  minify: false,
})
