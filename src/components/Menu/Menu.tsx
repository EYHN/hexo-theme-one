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
import * as _ from "underscore"
import { connect } from 'react-redux';
import AppState from '../../stateI';
import { Link } from 'react-router';

interface MenuProps {
  muiTheme?: MuiTheme
  onclickLeft?: (e: any) => void
  title?: string,
  fullModel?:boolean
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
  scrollListener: (e: any) => void;
  componentDidMount() {
    let bodyDom = $("body");
    let windowDom = $(window);
    let top = true;
    let oldScrollTop = bodyDom.scrollTop();
    this.scrollListener = _.throttle((e: any) => {
      let scrollTop = bodyDom.scrollTop()
      if (scrollTop < 228 - 64 || (scrollTop < 228 && top)) {
        top = true
        let sum = scrollTop - 228 + 64;
        if (sum < 0) {
          if (this.state.className != style.transparent || this.state.outClassName != style.fixedTop) {
            this.setState({
              outClassName: style.fixedTop,
              className: style.transparent
            });
          }
        } else if (this.state.className != style.transparent || this.state.outClassName != style.stopAt200) {
          this.setState({
            outClassName: style.stopAt200,
            className: style.transparent
          });
        }
      } else if (scrollTop > 228 || (scrollTop > 228 - 64 && !top)) {
        top = false
        if (oldScrollTop < scrollTop && (this.state.className != "" || this.state.outClassName != style.hidden)) {
          this.setState({
            outClassName: style.hidden,
            className: ""
          });
        }
        if (oldScrollTop > scrollTop && (this.state.className != "" || this.state.outClassName != "")) {
          this.setState({
            outClassName: "",
            className: ""
          });
        }
      }
      oldScrollTop = scrollTop;
    }, 40);
    this.scrollListener({});
    $(window).scroll(this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  render() {
    let {fullModel = false} = this.props
    return (
      <div className={style.Menu + " " + (fullModel?"":this.state.outClassName)}>
        <AppBar
          className={(fullModel?"":this.state.className)}
          onLeftIconButtonTouchTap={this.props.onclickLeft}
          iconElementRight={<IconButton href={"#/search"}><SearchIcon></SearchIcon></IconButton>}
          title={<span className={style.title}>{this.props.title || ""}</span>}
          titleStyle={{ fontSize: '22px' }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    title: state.nav.title,
    fullModel:state.nav.fullModel
  }
}

let MenuX = connect<AppState, MenuProps, MenuProps>(mapStateToProps)(Menu as any)

let MenuS = muiThemeable()(MenuX);

export default MenuS;