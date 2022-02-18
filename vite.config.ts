import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./"
  // server: { middlewareMode: 'html' },
  // build: {
  //   ssr: true,
  //   rollupOptions: {
  //     input: './src/SSREntry.ts'
  //   }
  // }
})
