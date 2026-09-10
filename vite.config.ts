import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from /<repo>/, so the build needs to know its
// public path. The Pages workflow sets VITE_BASE=/airjoy/; local dev and any
// root-hosted deploy use '/'. main.tsx feeds the same value to the router as its
// basename, so the two can never disagree.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 3002, strictPort: true, host: true, open: false },
  preview: { port: 3002, strictPort: true },
})
