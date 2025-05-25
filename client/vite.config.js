import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/undelivered/', // ini penting!
  plugins: [react()],
});
