const themes = ['default', 'dark', 'sepia'] as const
type Theme = (typeof themes)[number]

const themeKeyStorage = 'steepleTheme'
interface ThemeStorage {
  [themeKeyStorage]?: Theme
}

const setTheme = (theme: Theme) =>
  chrome.storage.local.set<ThemeStorage>({
    steepleTheme: theme,
  })

const getTheme = chrome.storage.local
  .get<ThemeStorage>([themeKeyStorage])
  .then(({ steepleTheme }) => steepleTheme ?? 'default')

const isTheme = (theme: unknown): theme is Theme => {
  if (typeof theme !== 'string') {
    return false
  }
  return (themes as readonly string[]).includes(theme)
}

const onChangeTheme = (callback: (theme: Theme) => void) => {
  chrome.storage.onChanged.addListener(changes => {
    if (!changes[themeKeyStorage]) return
    callback(changes[themeKeyStorage].newValue)
  })
}

export { themes, themeKeyStorage, setTheme, getTheme, isTheme, onChangeTheme }
export type { Theme, ThemeStorage }
