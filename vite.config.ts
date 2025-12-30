import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import viteReact from '@vitejs/plugin-react';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 8490,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    nitroV2Plugin({
      preset: 'vercel',
    }),
    tanstackStart(),
    viteReact(),
  ],
});
