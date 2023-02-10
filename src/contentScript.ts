console.info('Steeple themes : initialized')

const setTheme = (theme: string) => {
  document.documentElement.dataset.steepleThemeExtension = theme
}

chrome.storage.local.get(['steeple-theme']).then(result => {
  const value: string | undefined = result['steeple-theme']
  if (!value) { return }
  setTheme(value)
})

chrome.storage.onChanged.addListener(changes => {
  const newValue: string | undefined = changes['steeple-theme'].newValue
  if (!newValue) { return }
  setTheme(newValue)
});
