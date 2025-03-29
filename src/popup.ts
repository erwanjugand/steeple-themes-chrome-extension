import { getTheme, isTheme, setTheme } from './themes'

document.addEventListener('DOMContentLoaded', async () => {
  // Translate popup
  const elementToTranslate = document.querySelectorAll<HTMLElement>('[data-i18n]')
  elementToTranslate.forEach(element => {
    element.innerText = chrome.i18n.getMessage(element.dataset.i18n || '')
  })

  // Set version
  const footerVersion = document.querySelector<HTMLElement>('.footer-version')
  if (footerVersion) {
    const { version } = chrome.runtime.getManifest()
    footerVersion.innerText = version
  }

  // Get current theme

  await getTheme.then(theme => {
    const activeAction = document.querySelector(`.main-action[data-theme="${theme}"]`)
    if (!activeAction) return
    activeAction.classList.add('active')
  })

  // Set theme
  const actions = document.querySelectorAll<HTMLButtonElement>('.main-action')
  actions.forEach(action => {
    action.addEventListener('click', async () => {
      const theme = action.dataset.theme
      if (!isTheme(theme)) return
      await setTheme(theme)

      actions.forEach(action => {
        action.classList.remove('active')
      })
      action.classList.add('active')
    })
  })
})
