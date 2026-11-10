import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev
export default defineConfig({
  // ĐƯỜNG DẪN CƠ SỞ: Bắt buộc phải trùng với tên repository của bạn trên GitHub để tránh lỗi 404 đường dẫn file
  base: '/Text_to_speech_Vn/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // LƯU Ý VỀ API: Khi chạy trên github.io (HTTPS), tính năng server.proxy của Vite sẽ KHÔNG CÒN TÁC DỤNG.
  // Bạn cần gọi trực tiếp URL API chính thức trong code (ví dụ: https://fpt.ai) thay vì dùng đầu số /api-tts.
  
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Xóa console.log để bảo mật API key khi public lên web
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/').split('/').toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
