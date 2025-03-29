export const themes = ['default', 'dark', 'sepia'] as const
export type Theme = (typeof themes)[number]

export const themeKeyStorage = 'steepleTheme'
export type ThemeStorage = { [themeKeyStorage]?: Theme }

export const setTheme = (theme: Theme) =>
  chrome.storage.local.set<ThemeStorage>({
    steepleTheme: theme,
  })

export const getTheme = chrome.storage.local
  .get<ThemeStorage>([themeKeyStorage])
  .then(({ steepleTheme }) => steepleTheme ?? 'default')

export const isTheme = (theme: unknown): theme is Theme => {
  if (typeof theme !== 'string') return false
  return (themes as ReadonlyArray<string>).includes(theme)
}

export const onChangeTheme = (callback: (theme: Theme) => void) => {
  chrome.storage.onChanged.addListener(changes => {
    if (!changes[themeKeyStorage]) return
    callback(changes[themeKeyStorage].newValue)
  })
}
