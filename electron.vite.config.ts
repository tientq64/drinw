import { defineConfig } from 'electron-vite'
import viteConfig from './vite.config'

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: 'src/main.ts'
            },
            outDir: 'out',
            emptyOutDir: false,
            minify: true,
            watch: {}
        }
    },
    preload: {
        build: {
            rollupOptions: {
                input: 'src/preload.ts'
            },
            outDir: 'out',
            emptyOutDir: false,
            minify: true
        }
    },
    renderer: {
        ...viteConfig
    }
})
