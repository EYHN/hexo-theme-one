import { array_randS } from './lib/random';
import { darkBlack, grey600 } from 'material-ui/styles/colors';
import { MuiTheme } from 'material-ui/styles';
const url = require('url');
import { siteState } from './reducers/site';
import AppState from './stateI';
import { apiHref, getSite, getTheme } from './lib/api';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Store } from 'redux';
import createStore from './create-store';
import App from './components/app/app'
import reducer from './reducers/reducer'
import { registerListener } from './windowSize';
injectTapEventPlugin();

if(/webkit/.test(navigator.userAgent.toLowerCase())){
  require('!style!css!less!./lib/webkit-scrollrail/style.less');
  require('./lib/webkit-scrollrail/webkit-scrollrail.js');
  new window.webkitScrollbar({autohide:true});
}

var style = require('./main.less');

const Main = ({store}: { store: Store<any> }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

let store: Store<AppState>;

Promise.all([getSite() as siteState, getTheme()]).then((res) => {
  let u = url.parse(apiHref);
  res[0].siteUrl = u.protocol + '//' + u.host;
  let state:AppState = { site: res[0], theme: {
    ...res[1]
  }};
  if(typeof state.theme.color === 'undefined')state.theme.color = {};
  state.theme.color.accentColor = array_randS(state.theme.uiux.defaultAccentColor);
  state.theme.color.primaryColor = array_randS(state.theme.uiux.defaultPrimaryColor);
  store = createStore(state)
  registerListener(store);
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('app')
  );
})

export default store;