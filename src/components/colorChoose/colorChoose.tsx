import AppState from '../../stateI';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import ColorChooseButton from '../colorChooseButton/colorChooseButton'
import { color as colorList } from '../../lib/themes'
import { connect } from 'react-redux'
let style = require('./colorChoose.less');

interface ColorChooseProps {
  primaryColor?:string
  accentColor?:string
}

interface ColorChooseState {

}

class ColorChoose extends React.Component<ColorChooseProps, ColorChooseState>{
  getColorChooseButtons() {
    let res: Array<React.ReactNode> = [];
    for (let color in colorList) {
      res.push(
        <ColorChooseButton
          checked={color == this.props.primaryColor || color == this.props.accentColor}
          color={colorList[color].primary1Color} />
      );
    }
    return res;
  }

  render() {
    return (
      <MenuItem className={style.MenuItem} disableTouchRipple={true} disableFocusRipple={true} disableKeyboardFocus={true}>
        <div>
          {
            this.getColorChooseButtons()
          }
        </div>
      </MenuItem>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {theme = {}} = state;
  let {color = {}} = theme;
  let {
      primaryColor='cyan',
      accentColor='pink'
    } = color;
  return {
    primaryColor,accentColor
  }
}

const ColorChooseX = connect<AppState, ColorChooseProps, ColorChooseProps>(mapStateToProps)(ColorChoose as any)
export default ColorChooseX;