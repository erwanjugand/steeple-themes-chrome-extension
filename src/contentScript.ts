import { getTheme, onChangeTheme, type Theme } from './themes'

console.info('Steeple themes : initialized')

const setPageTheme = (theme: Theme) => {
  document.documentElement.dataset.steepleThemeExtension = theme
}

getTheme.then(setPageTheme)
onChangeTheme(setPageTheme)
