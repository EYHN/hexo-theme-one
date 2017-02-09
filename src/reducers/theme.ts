export interface themeState {
  muiTheme?: __MaterialUI.Styles.MuiTheme;
}

const theme = (
  state: themeState = {},
  action: { type?: string, muiTheme?: __MaterialUI.Styles.MuiTheme } = {}
) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        muiTheme: action.muiTheme
      }
  }
  return state
}

export default theme;