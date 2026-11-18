import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // caminhos relativos: funciona em qualquer subpasta do GitHub Pages (usuario.github.io/nome-do-repo/)
  base: './',
  plugins: [tailwindcss()],
  server: { port: 5174 },
  // duas páginas: a landing e a de planos
  build: { rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), planos: resolve(import.meta.dirname, 'planos.html') } } },
})
