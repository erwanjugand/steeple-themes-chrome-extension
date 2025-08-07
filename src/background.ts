import { getTheme, onChangeTheme, setTheme, themes } from './themes'

getTheme.then(currentTheme => {
  chrome.contextMenus.create({
    id: 'steeple-theme-selector',
    title: chrome.i18n.getMessage('extensionName'),
  })

  themes.forEach(theme => {
    chrome.contextMenus.create({
      checked: theme === currentTheme,
      id: `steeple-theme-${theme}`,
      parentId: 'steeple-theme-selector',
      title: chrome.i18n.getMessage(`${theme}Action`),
      type: 'radio',
    })
  })
})

chrome.contextMenus.onClicked.addListener(({ parentMenuItemId, menuItemId }) => {
  if (parentMenuItemId !== 'steeple-theme-selector') return

  switch (menuItemId) {
    case 'steeple-theme-dark':
      setTheme('dark')
      break
    case 'steeple-theme-sepia':
      setTheme('sepia')
      break
    default:
      setTheme('default')
      break
  }
})

onChangeTheme(currentTheme => {
  themes.forEach(theme => {
    chrome.contextMenus.update(`steeple-theme-${theme}`, { checked: theme === currentTheme })
  })
})

chrome.tabs.onHighlighted.addListener(async () => {
  const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const currentUrl = currentTab?.url
  const visible = currentUrl?.includes('steeple.fr') || currentUrl?.includes('steeple.com')
  chrome.contextMenus.update('steeple-theme-selector', { visible })
})
