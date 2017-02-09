import {theme} from '../Interfaces/theme'

export interface changeMuiThemeAction {
  type: 'CHANGE_MUI_THEME',
  muiTheme:__MaterialUI.Styles.MuiTheme
}

export interface changeThemeAction {
  type: 'CHANGE_THEME',
  theme:theme
}

export const changeMuiTheme = (muiTheme:__MaterialUI.Styles.MuiTheme) => ({
  type: 'CHANGE_MUI_THEME',
  muiTheme: muiTheme
})

export const changeTheme = (theme:theme) => ({
  type: 'CHANGE_THEME',
  theme: theme
})