import { readJsonFile } from 'vite-plugin-web-extension'

export const defineManifest = (): chrome.runtime.ManifestV3 => {
  const pkg = readJsonFile('package.json')

  return {
    manifest_version: 3,
    name: '__MSG_extensionName__',
    description: '__MSG_extensionDescription__',
    version: pkg.version,
    minimum_chrome_version: '111',
    author: { email: 'erwan.jugand@gmail.com' },
    icons: {
      '16': 'icons/16.png',
      '32': 'icons/32.png',
      '48': 'icons/48.png',
      '128': 'icons/128.png',
    },
    default_locale: 'en',
    action: {
      default_title: '__MSG_extensionName__',
      default_popup: 'src/popup.html',
    },
    permissions: ['storage', 'tabs', 'contextMenus', 'webNavigation'],
    content_scripts: [
      {
        js: ['src/contentScript.js'],
        css: ['src/themes.scss'],
        matches: [
          'https://www.steeple.fr/*',
          'https://app.steeple.com/*',
          'https://tv.steeple.fr/*',
          'https://tv.steeple.com/*',
        ],
      },
    ],
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
  }
}
