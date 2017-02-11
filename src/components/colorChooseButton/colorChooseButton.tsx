import Checkbox from 'material-ui/Checkbox';
import * as React from 'react';

interface ColorChooseButtonProps {
  color?:string
  label?:string
  onCheck?:()=>any
}

interface ColorChooseButtonState {

}

export default class ColorChooseButton extends React.Component<ColorChooseButtonProps, ColorChooseButtonState>{
  render(){
    return (
      <Checkbox
        label={this.props.label || ''}
        iconStyle={{
          fill: this.props.color || ''
        }}
        onCheck={this.props.onCheck}
      />
    )
  }
}