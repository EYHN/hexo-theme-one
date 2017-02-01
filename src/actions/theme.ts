export interface changeThemeAction {
  type: 'CHANGE_THEME',
  muiTheme:__MaterialUI.Styles.MuiTheme
}

export const changeTheme = (muiTheme:__MaterialUI.Styles.MuiTheme) => ({
  type: 'CHANGE_THEME',
  muiTheme: muiTheme
})