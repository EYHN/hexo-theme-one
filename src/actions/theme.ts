import {theme} from '../Interfaces/theme'

export interface changeThemeAction {
  type: 'CHANGE_THEME',
  theme:theme
}

export interface changeColorAction {
  type: 'CHANGE_COLOR',
  primaryColor:string,
  accentColor:String
}

export const changeTheme = (theme:theme) => ({
  type: 'CHANGE_THEME',
  theme: theme
})

export const changeColor = (primaryColor:string,accentColor:string) => ({
  type: 'CHANGE_COLOR',
  primaryColor: primaryColor,
  accentColor: accentColor
})