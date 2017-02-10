import { fullWhite, grey600, pinkA100, pinkA200, pinkA400, red500 } from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiTheme } from 'material-ui/styles';
export const Theme:{[key:string]:MuiTheme} = {
  'lightBaseTheme':lightBaseTheme,
}

export const color:{[key:string]:__MaterialUI.Styles.ThemePalette} = {
  'red':{
    primary1Color: red500,
    primary2Color: red500,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
  }
}