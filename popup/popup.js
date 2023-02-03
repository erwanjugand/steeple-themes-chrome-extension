document.addEventListener('DOMContentLoaded', async () => {
  // Translate popup
  const ElementToTranslate = document.querySelectorAll('[data-i18n]')
  ElementToTranslate.forEach(element => {
    element.innerText = chrome.i18n.getMessage(element.dataset.i18n)
  })

  // Set version
  const footerVersion = document.querySelector('.footer-version')
  const { version } = await chrome.runtime.getManifest()
  footerVersion.innerText = version

  // Get current theme
  await chrome.storage.local.get(['steeple-theme']).then(result => {
    const value = result['steeple-theme']
    const activeAction = document.querySelector(`.action[data-theme="${value}"]`)
    if (!activeAction) { return }
    activeAction.classList.add('active')
  })

  // Set theme
  const actions = document.querySelectorAll('.action')
  actions.forEach(action => {
    action.addEventListener('click', async () => {
      const theme = action.dataset.theme
      await chrome.storage.local.set({ 'steeple-theme': theme }).then(() => {
        actions.forEach(action => action.classList.remove('active'))
        action.classList.add('active')
      })
    })
  })
})
