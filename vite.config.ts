import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginImportToRequire } from './plugins/vitePluginImportToRequire'

export default defineConfig({
    root: 'src',
    build: {
        rollupOptions: {
            input: 'src/index.html'
        },
        outDir: 'out',
        emptyOutDir: false,
        minify: true
    },
    server: {
        port: 5500,
        strictPort: true
    },
    logLevel: 'error',
    plugins: [react(), vitePluginImportToRequire()]
})
