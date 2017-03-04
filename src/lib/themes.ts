import {
  cyan500,
  cyan700,
  darkBlack,
  fullBlack,
  fullWhite,
  grey100,
  grey300,
  grey400,
  grey500,
  grey600,
  pink500,
  pink700,
  pinkA100,
  pinkA200,
  pinkA400,
  red500,
  red700,
  redA200,
  blue700,
  blue500,
  grey900,
  lightBlue500,
  blueA200,
  lightBlue700,
  white
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiTheme } from 'material-ui/styles';

export const color:{[key:string]:__MaterialUI.Styles.ThemePalette} = {
  'red':{
    primary1Color: red500,
    primary2Color: red700,
    primary3Color: grey600,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
  },
  'cyan':{
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: cyan500,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
  },
  'pink':{
    primary1Color: pink500,
    primary2Color: pink700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    alternateTextColor: white,
  },
  'blue':{
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: blueA200,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
  },
  'lightBlue':{
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    primary3Color: grey400,
    accent1Color: lightBlue500,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
  },
  'white':{
    primary1Color: "#f1f3f4",
    primary2Color: grey400,
    primary3Color: grey400,
    accent1Color: grey400,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: darkBlack,
  }
}

export const theme:{[key:string]:__MaterialUI.Styles.ThemePalette} = {
  "dark":{
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  "light":{
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
}