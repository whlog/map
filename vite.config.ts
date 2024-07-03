import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: "[path][name]__[local]__[hash:base64:5]",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:6666", // 目标服务器API地址
        changeOrigin: true, // 开启代理的跨域
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，去除前缀
      },
      // 可以添加更多代理规则
    },
  },
});
