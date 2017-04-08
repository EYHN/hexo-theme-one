import background from '../../reducers/background';
import Avatar from 'material-ui/Avatar';
import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';

const style = require("./sideHander.less");

interface SideHanderProps {
  className?:string
  phone?: boolean
  Avatar:string
  background:string
  author:string
  slogan:string
}

export default class SideHander extends React.Component<SideHanderProps, undefined>{
  render() {
    let {Avatar:avatar = "",background = "",author = "",slogan = ""} = this.props;
    return (
      <MenuItem className={style.SideHander + " " + this.props.className || ""}>
        <div style={{
          backgroundImage: `url(${background})`
        }} className={style.bg}></div>
        <Avatar src={avatar} size={50}/>
        <footer>
          <b>{author}</b><br/>
          {slogan}
        </footer>
      </MenuItem>
    )
  }
}

