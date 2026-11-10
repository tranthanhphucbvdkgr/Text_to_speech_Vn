import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Text_to_speech_Vn/', // Bắt buộc phải trùng tên repo
  plugins: [react()],
});
