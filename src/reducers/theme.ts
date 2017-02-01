import { Action } from "redux";

export interface themeState {
  muiTheme?: __MaterialUI.Styles.MuiTheme;
}

export const theme = (state: themeState = {}, action: any) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        muiTheme: action.muiTheme
      }
  }
  return state
}