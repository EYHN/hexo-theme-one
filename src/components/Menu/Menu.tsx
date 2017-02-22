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
import * as _ from "underscore"

interface MenuProps {
  muiTheme?: MuiTheme
  onclickLeft?: (e: any) => any
}

interface MenuStates {
  className: string,
  outClassName: string
}

class Menu extends React.Component<MenuProps, MenuStates>{
  opacityHeight = 200;
  constructor() {
    super();
    this.state = {
      className: "",
      outClassName: ""
    }
  }
  scrollListener: (e:any) => void;
  componentDidMount() {
    let bodyDom = $("body");
    let windowDom = $(window);
    let top = true;
    let oldScrollTop = bodyDom.scrollTop();
    this.scrollListener = _.throttle((e:any) => {
      let scrollTop = bodyDom.scrollTop()
      if (scrollTop < 228 - 64 || (scrollTop < 228 && top)) {
        top = true
        let sum = scrollTop - 228 + 64;
        if (sum < 0) {
          if(this.state.className != style.transparent || this.state.outClassName != ""){
            this.setState({
              outClassName: "",
              className: style.transparent
            });
          }
        } else if(this.state.className != style.transparent || this.state.outClassName != style.stopAt200){
          this.setState({
            outClassName: style.stopAt200,
            className: style.transparent
          });
        }
      } else if(scrollTop > 228 || (scrollTop > 228 - 64 && !top)){
        top = false
        if(oldScrollTop < scrollTop && (this.state.className != "" || this.state.outClassName != style.hidden)){
          this.setState({
            outClassName: style.hidden,
            className: ""
          });
        }
        if (oldScrollTop > scrollTop && (this.state.className != "" || this.state.outClassName != "")){
          this.setState({
            outClassName: "",
            className: ""
          });
        }
      }
      oldScrollTop = scrollTop;
    },40);
    this.scrollListener({});
    $(window).scroll(this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  // doColor() {
  //   let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  //   var sColor = this.props.muiTheme.appBar.color.toLowerCase();
  //   if (sColor && reg.test(sColor)) {
  //     if (sColor.length === 4) {
  //       var sColorNew = "#";
  //       for (var i = 1; i < 4; i += 1) {
  //         sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
  //       }
  //       sColor = sColorNew;
  //     }
  //     //处理六位的颜色值
  //     var sColorChange = [];
  //     for (var i = 1; i < 7; i += 2) {
  //       sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  //     }
  //     sColorChange.push(this.state.opacity);
  //     return "rgba(" + sColorChange.join(",") + ")";
  //   } else {
  //     return sColor;
  //   }
  // }

  render() {
    return (
      <div className={style.Menu + " " + this.state.outClassName}>
        <AppBar
          className={this.state.className}
          onLeftIconButtonTouchTap={this.props.onclickLeft}
          iconElementRight={<IconButton><SearchIcon /></IconButton>}
        />
      </div>
    )
  }
}

let MenuS = muiThemeable()(Menu);

export default MenuS;