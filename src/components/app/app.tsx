import color2Theme from '../../lib/color2Theme';
import { buildPath } from '../../lib/History';
import routerHistory from '../../lib/History';
import en_US from '../../locale/en_US';
import zh_CN from '../../locale/zh_CN';
import AppState from '../../stateI';
import Background from '../background/background';
import Category from '../category/category';
import Drawer from '../Drawer/Drawer';
import Footer from '../footer/footer';
import Header from '../header/header';
import Home from '../home/home';
import Menu from '../Menu/Menu';
import Page from '../page/page';
import Post from '../post/post';
import SearchX from '../search/search';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const MaterialIconseot = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot");
const MaterialIconsttf = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf");
const MaterialIconswoff = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff");
const MaterialIconswoff2 = require("../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2");
const url = require('url');
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
  siteUrl?: string
  backButton?: boolean
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
    return false;
  }

  back() {
    setTimeout(()=>{
      routerHistory.push(buildPath("/"));
    },0)
    return false;
  }

  render() {
    let {color = {}, fullModel = false, siteUrl = "/", backButton = false} = this.props;
    let {primaryColor, accentColor} = color;
    let t = color2Theme(primaryColor, accentColor, "light");
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
            <Header />
            <style>
              {
                `
                @font-face {
                  font-family: 'Material Icons';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${url.resolve(siteUrl, MaterialIconseot)}); /* For IE6-8 */
                  src: local('Material Icons'),
                      local('MaterialIcons-Regular'),
                      url(${url.resolve(siteUrl, MaterialIconswoff2)}) format('woff2'),
                      url(${url.resolve(siteUrl, MaterialIconswoff)}) format('woff'),
                      url(${url.resolve(siteUrl, MaterialIconsttf)}) format('truetype');
                }
                `
              }
            </style>
            <Menu onclickLeft={backButton ? this.back.bind(this) : this.MenuToggle.bind(this)} />
            <Background />
            <Drawer
              open={this.state.sidebar}
              onRequestChange={this.MenuToggle.bind(this)}
              onTouchTap={() => {
                this.setState({
                  ...this.state,
                  sidebar: false
                })
              }}
            />
            <div id={style.container} className={fullModel ? style.fullModel : undefined}>
              <main id={style.main}>
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="route-page"
                  transitionEnterTimeout={900}
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
            {/*<FloatingActionButton className={style.fixedFloatingButton}>
              <MoreVertIcon />
            </FloatingActionButton>*/}
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
    siteUrl: state.site.siteUrl,
    fullModel: state.nav.fullModel,
    backButton: state.nav.backButton
  }
}

let AppX = connect(mapStateToProps)(App as any)

export default AppX;