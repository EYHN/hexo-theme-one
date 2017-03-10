import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import background from '../../reducers/background';

const style = require("./sideHander.less");

interface SideHanderProps {
  className?:string
  phone?: boolean
  Avatar:string
  background:string
}

export default class SideHander extends React.Component<SideHanderProps, undefined>{
  render() {
    let {Avatar:avatar = "",background = ""} = this.props;
    return (
      <MenuItem className={style.SideHander + " " + this.props.className || ""}>
        <div style={{
          backgroundImage: `url(${background})`
        }} className={style.bg}></div>
        <Avatar src={avatar} size={50}/>
        <footer>
          <b>cneyhn</b><br/>
          cneyhn@gmail.com
        </footer>
      </MenuItem>
    )
  }
}

