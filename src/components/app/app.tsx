import Menu from '../Menu/Menu';
import AppState from '../../stateI';
import * as React from 'react';
import { connect } from 'react-redux'
import zh_CN from '../../locale/zh_CN';
import en_US from '../../locale/en_US';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router, Route, hashHistory } from 'react-router';
import Home from '../home/home'
import Post from '../post/post';
import * as zh from 'react-intl/locale-data/zh';
import * as en from 'react-intl/locale-data/en';
import {IntlProvider,addLocaleData} from 'react-intl'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Background from '../background/background'
import muiThemeable from 'material-ui/styles/muiThemeable';
addLocaleData(zh);
addLocaleData(en);
var style = require('./app.less')

interface AppProps {
  Theme?: __MaterialUI.Styles.MuiTheme
}

function chooseLocale(){
    switch(navigator.language.split('_')[0]){
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return zh_CN;
    }
}

export class App extends React.Component<AppProps, undefined>{
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <IntlProvider
        locale={navigator.language} 
        messages={chooseLocale()}>
        <MuiThemeProvider muiTheme={this.props.Theme}>
          <div>
            <Menu/>
            <Background/>
            <div id={style.container}>
              <main
              id={style.main}>
                <Router history={hashHistory}>
                  <Route path="/" component={Home} />
                  <Route path="/post/:slug" component={Post} />
                </Router>
              </main>
            </div>
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state:AppState) => {
  return {
    Theme: state.theme.muiTheme
  }
}

let AppX = connect(mapStateToProps)(App as any)

export default AppX