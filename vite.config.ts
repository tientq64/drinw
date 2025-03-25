import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginImportToRequire } from './plugins/vitePluginImportToRequire'

export default defineConfig({
    server: {
        port: 5500,
        strictPort: true
    },
    logLevel: 'error',
    plugins: [react(), vitePluginImportToRequire()]
})
