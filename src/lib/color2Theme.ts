import { MuiTheme } from 'material-ui/styles';
import {color} from './themes'
const color2Theme:(primaryColor:string,accentColor:string,Theme?:MuiTheme)=>MuiTheme = (primaryColor:string,accentColor:string,Theme?:MuiTheme)=>{
  primaryColor = primaryColor || 'cyan';
  accentColor = accentColor || primaryColor
  let resTheme:MuiTheme = {
    ...Theme,
    palette:{
      ...color[primaryColor],
      accent1Color:color[accentColor].accent1Color,
      alternateTextColor:color[accentColor].alternateTextColor
    }
  }
  return resTheme
}
export default color2Theme;