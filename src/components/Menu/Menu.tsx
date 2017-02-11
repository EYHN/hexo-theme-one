import { MuiTheme } from 'material-ui/styles';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchIcon from 'material-ui/svg-icons/action/search';
import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
let style = require('./Menu.less');
import * as $ from "jquery"

interface MenuProps {
  muiTheme?: MuiTheme
  onclickLeft?:(e:any)=>any
}

interface MenuStates {
  opacity: number
}

class Menu extends React.Component<MenuProps, MenuStates>{
  opacityHeight = 200;
  constructor() {
    super();
    this.state = {
      opacity: 0
    }
  }
  scrollListener: () => void;
  componentDidMount() {
    let listenDom = $(this.refs['DisplayTrigger'])
    let bodyDom = $("body");
    let windowDom = $(window);
    let isOnDisplay = false;
    this.scrollListener = () => {
      let sum = bodyDom.scrollTop() / 200;
      this.setState({
        opacity: (sum > 1) ? 1 : sum
      });
    }
    this.scrollListener();
    $(window).bind("scroll", this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  doColor() {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = this.props.muiTheme.appBar.color.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      sColorChange.push(this.state.opacity);
      return "rgba(" + sColorChange.join(",") + ")";
    } else {
      return sColor;
    }
  }

  render() {
    return (
      <div className={style.Menu}>
        <AppBar
          style={{
            backgroundColor: this.doColor(),
            boxShadow:`
            0px 1px 6px rgba(0, 0, 0, ${0.117647 * this.state.opacity}) , 0px 1px 4px rgba(0, 0, 0, ${0.117647 * this.state.opacity})
            `
          }}
          onLeftIconButtonTouchTap={this.props.onclickLeft}
          iconElementRight={<IconButton><SearchIcon/></IconButton>}
        />
      </div>
    )
  }
}

let MenuS = muiThemeable()(Menu);

export default MenuS;