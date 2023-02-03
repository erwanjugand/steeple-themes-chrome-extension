console.info('Steeple themes : initialized')

const setTheme = theme => {
  document.documentElement.dataset.steepleThemeExtension = theme
}

chrome.storage.local.get(['steeple-theme']).then(result => {
  const value = result['steeple-theme']
  setTheme(value)
})

chrome.storage.onChanged.addListener(changes => {
  const newValue = changes['steeple-theme'].newValue
  if (!newValue) { return }
  setTheme(newValue)
});
