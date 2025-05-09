import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // <-- ADD THIS
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() // <-- ADD THIS to support JSX syntax in Vue
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
