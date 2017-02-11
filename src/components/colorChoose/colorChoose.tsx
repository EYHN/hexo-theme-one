import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import ColorChooseButton from '../colorChooseButton/colorChooseButton'
let style = require('./colorChoose.less');

interface ColorChooseProps {

}

interface ColorChooseState {

}

export default class ColorChoose extends React.Component<ColorChooseProps, ColorChooseState>{
  render(){
    return (
      <MenuItem className={style.MenuItem} disableTouchRipple={true} disableFocusRipple={true} disableKeyboardFocus={true}>
        <div>
          <ColorChooseButton
            color={'#472'}/>
        </div>
      </MenuItem>
    )
  }
}