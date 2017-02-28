import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import background from '../../reducers/background';

const style = require("./sideHander.less");

interface SideHanderProps {
  className?:string
  phone?: boolean
}

export default class SideHander extends React.Component<SideHanderProps, undefined>{
  render() {
    return (
      <MenuItem className={style.SideHander + " " + this.props.className || ""}>
        <div style={{
          backgroundImage: `url(${'https://delusion.coding.me/img/daily_pic.min.jpg'})`
        }} className={style.bg}></div>
        <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" size={50}/>
        <footer>
          <b>cneyhn</b><br/>
          cneyhn@gmail.com
        </footer>
      </MenuItem>
    )
  }
}

