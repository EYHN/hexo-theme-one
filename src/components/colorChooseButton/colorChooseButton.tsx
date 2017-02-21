import Checkbox from 'material-ui/Checkbox';
import * as React from 'react';
var style = require('./colorChooseButton.less')

interface ColorChooseButtonProps extends __MaterialUI.Switches.CheckboxProps {
  color?:string
}

interface ColorChooseButtonState {

}

export default class ColorChooseButton extends React.Component<ColorChooseButtonProps, ColorChooseButtonState>{
  render(){
    return (
      <Checkbox
        iconStyle={{
          fill: this.props.color
        }}
        className={style.CheckBox}
        {
          ...this.props
        }
      />
    )
  }
}