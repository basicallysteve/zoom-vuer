import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  lib: {
    entry: path.resolve(__dirname, 'src/index.js'),  // or .ts
    name: 'VueZoomComponent',                        // global var for UMD
    fileName: (format) => `vue-zoom-component.${format}.js`
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: { vue: 'Vue' }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
  },
})
