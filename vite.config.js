import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : './',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          pokebox: resolve(__dirname, 'pages/pokebox.html'),
        },
      },
    },
  }
})
