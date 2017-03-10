import getMuiTheme from 'material-ui/styles/getMuiTheme';
import color2Theme from '../../lib/color2Theme';
import Menu from '../Menu/Menu';
import AppState from '../../stateI';
import * as React from 'react';
import { connect } from 'react-redux'
import zh_CN from '../../locale/zh_CN';
import en_US from '../../locale/en_US';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Home from '../home/home'
import Post from '../post/post';
import Page from '../page/page';
import * as zh from 'react-intl/locale-data/zh';
import * as en from 'react-intl/locale-data/en';
import { IntlProvider, addLocaleData } from 'react-intl'
import Drawer from '../Drawer/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Background from '../background/background'
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchX from '../search/search'
import Category from '../category/category'
import Footer from '../footer/footer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
const MaterialIconseot = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot");
const MaterialIconsttf = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf");
const MaterialIconswoff = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff");
const MaterialIconswoff2 = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2");
addLocaleData(zh);
addLocaleData(en);
var style = require('./app.less')

interface AppProps {
  color?: {
    primaryColor?: string,
    accentColor?: string
  }
  children?: React.ReactElement<any>
  fullModel?: boolean
  location?: any
}

function chooseLocale() {
  switch (navigator.language.split('_')[0]) {
    case 'en':
      return en_US;
    case 'zh':
      return zh_CN;
    default:
      return zh_CN;
  }
}

interface AppComponentState {
  sidebar?: boolean
}

export class App extends React.Component<AppProps, AppComponentState>{
  constructor(props: any) {
    super(props);
    this.state = {
      sidebar: false
    }
  }

  MenuToggle() {
    this.setState((state) => ({
      ...state,
      sidebar: !this.state.sidebar
    }))
  }

  render() {
    let {color = {}, fullModel = false} = this.props;
    let {primaryColor, accentColor} = color;
    let t = color2Theme(primaryColor, accentColor,"light");
    t.fontFamily = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    let Theme = getMuiTheme(t);
    return (
      <IntlProvider
        locale={navigator.language}
        messages={chooseLocale()}>
        <MuiThemeProvider muiTheme={Theme}>
          <div style={{
            fontFamily: Theme.fontFamily
          }} className={style.body}>
            <style>
              {
                `
                @font-face {
                  font-family: 'Material Icons';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${MaterialIconseot}); /* For IE6-8 */
                  src: local('Material Icons'),
                      local('MaterialIcons-Regular'),
                      url(${MaterialIconswoff2}) format('woff2'),
                      url(${MaterialIconswoff}) format('woff'),
                      url(${MaterialIconsttf}) format('truetype');
                }
                `
              }
            </style>
            <Menu onclickLeft={this.MenuToggle.bind(this)} />
            <Background />
            <Drawer
              open={this.state.sidebar}
              onRequestChange={this.MenuToggle.bind(this)}
              onTouchTap={()=>{this.setState({
                ...this.state,
                sidebar: false
              })}}
            />
            <div id={style.container} className={fullModel ? style.fullModel : undefined}>
              <main id={style.main}>
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="route-page"
                  transitionEnterTimeout={450}
                  transitionLeaveTimeout={450}
                  className={style.TransitionGroup}
                >
                  {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                  })}
                </ReactCSSTransitionGroup>
              </main>
            </div>
            <Footer />
            <FloatingActionButton className={style.fixedFloatingButton}>
              <MoreVertIcon />
            </FloatingActionButton>
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    color: state.theme.color || {
      primaryColor: 'cyan',
      pccentColor: 'pink'
    },
    fullModel: state.nav.fullModel
  }
}

let AppX = connect(mapStateToProps)(App as any)

export default AppX;