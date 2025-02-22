import { defineConfig } from "vite"

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
})
