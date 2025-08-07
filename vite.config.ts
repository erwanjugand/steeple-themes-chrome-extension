import { defineConfig } from 'vite'
import { defineManifest } from './src/manifest'
import webExtension from 'vite-plugin-web-extension'

export default defineConfig(() => ({
  plugins: [
    webExtension({
      disableAutoLaunch: true,
      manifest: () => defineManifest(),
      watchFilePaths: ['src/manifest.ts'],
    }),
  ],
}))
