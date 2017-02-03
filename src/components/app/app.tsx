import AppState from '../../stateI';
import * as React from 'react';
import { connect } from 'react-redux'
import zh_CN from '../../locale/zh_CN';
import en_US from '../../locale/en_US';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router, Route, hashHistory } from 'react-router';
import Home from '../home/home'
import TouchRipple from 'material-ui/internal/TouchRipple';
import Post from '../post/post';
import * as zh from 'react-intl/locale-data/zh';
import * as en from 'react-intl/locale-data/en';
import {IntlProvider,addLocaleData} from 'react-intl'
addLocaleData(zh);
addLocaleData(en);
var style = require('./app.less')

interface AppProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme
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
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div>
            <main id={style.main}>
              <Router history={hashHistory}>
                <Route path="/" component={Home} />
                <Route path="/post" component={Post} />
              </Router>
            </main>
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state:AppState) => {
  return {
    muiTheme: state.theme.muiTheme
  }
}

let AppX = connect(mapStateToProps)(App as any)

export default AppX