import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const cartoProxy = {
    '/api/carto': {
      target: 'https://a.basemaps.cartocdn.com',
      changeOrigin: true,
      rewrite: (path) => {
        const cleanPath = path.replace(/^\/api\/carto/, '');
        const sep = cleanPath.includes('?') ? '&' : '?';
        return `${cleanPath}${sep}key=${env.CARTO_API_KEY || ''}`;
      }
    }
  };

  return {
    plugins: [react()],
    server: {
      port: 5174,
      host: true,
      proxy: cartoProxy
    },
    preview: {
      port: 5174,
      host: true,
      proxy: cartoProxy
    }
  };
});
