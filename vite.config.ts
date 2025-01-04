import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://8d360240-531c-438d-b359-b1c65e377469.lovableproject.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    headers: {
      'Content-Security-Policy': `frame-ancestors 'self' https://preview--pushnshop-transactional-market.lovable.app https://gptengineer.app https://lovable.dev http://localhost:3000 http://localhost:8080 https://8d360240-531c-438d-b359-b1c65e377469.lovableproject.com`
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === 'development' ? '/' : 'https://8d360240-531c-438d-b359-b1c65e377469.lovableproject.com',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/setupTests.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
}));