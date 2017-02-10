import { MuiTheme } from 'material-ui/styles';
import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
let style = require('./background.less');

interface BackgroundProps {
  muiTheme?: MuiTheme
}

export class Background extends React.Component<BackgroundProps, undefined>{
  render() {
    return (
      <div>
        <div className={style.ColorBackground} style={{
          backgroundColor:this.props.muiTheme.appBar.color
        }}></div>
      </div>
    )
  }
}

let BackgroundS = muiThemeable()(Background);

export default BackgroundS;