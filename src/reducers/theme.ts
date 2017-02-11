import { changeColorAction, changeThemeAction } from '../actions/theme';
import { theme as themeI } from '../Interfaces/theme'

export interface themeState extends themeI {
}

const theme = (
  state: themeState = {},
  action: changeThemeAction | changeColorAction
) => {
  if(typeof action === 'undefined')return state;
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        ...action.theme
      }
    case 'CHANGE_COLOR':
      return {
        ...state,
        color:{
          primaryColor:action.primaryColor,
          accentColor:action.primaryColor
        }
      }
  }
  return state
}

export default theme;