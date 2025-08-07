import { readJsonFile } from 'vite-plugin-web-extension'

export const defineManifest = (): chrome.runtime.ManifestV3 => {
  const pkg = readJsonFile('package.json')

  return {
    action: {
      default_popup: 'src/popup.html',
      default_title: '__MSG_extensionName__',
    },
    author: { email: 'erwan.jugand@gmail.com' },
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    content_scripts: [
      {
        css: ['src/themes.scss'],
        js: ['src/contentScript.js'],
        matches: [
          'https://www.steeple.fr/*',
          'https://app.steeple.com/*',
          'https://tv.steeple.fr/*',
          'https://tv.steeple.com/*',
        ],
      },
    ],
    default_locale: 'en',
    description: '__MSG_extensionDescription__',
    icons: {
      '128': 'icons/128.png',
      '16': 'icons/16.png',
      '32': 'icons/32.png',
      '48': 'icons/48.png',
    },
    manifest_version: 3,
    minimum_chrome_version: '111',
    name: '__MSG_extensionName__',
    permissions: ['storage', 'tabs', 'contextMenus', 'webNavigation'],
    version: pkg.version,
  }
}
