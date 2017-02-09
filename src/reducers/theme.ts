import {changeMuiThemeAction,changeThemeAction } from '../actions/theme'
import { theme as themeI } from '../Interfaces/theme'

export interface themeState extends themeI {
  muiTheme?: __MaterialUI.Styles.MuiTheme;
}

const theme = (
  state: themeState = {},
  action: changeMuiThemeAction | changeThemeAction
) => {
  if(typeof action === 'undefined')return state;
  switch (action.type) {
    case 'CHANGE_MUI_THEME':
      return {
        ...state,
        muiTheme: action.muiTheme
      }
    case 'CHANGE_THEME':
      return {
        ...state,
        ...action.theme
      }
  }
  return state
}

export default theme;