import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import routerHistory from './lib/History';
import { array_randS } from './lib/random';
import { darkBlack, grey600 } from 'material-ui/styles/colors';
import { MuiTheme } from 'material-ui/styles';
const url = require('url');
import { siteState } from './reducers/site';
import AppState from './stateI';
import { apiHref, getSite, getTheme } from './lib/api';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, applyRouterMiddleware, IndexRoute } from 'react-router';
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
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Home from './components/home/home';
import Post from './components/post/post';
import Page from './components/page/page';
import SearchX from './components/search/search'
import Category from './components/category/category'
import { History } from "history"
import Tag from './components/tag/tag';
const useScroll = require('react-router-scroll/lib/useScroll');
require('intl');
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');
injectTapEventPlugin();
const style = require('./main.less');

if(/webkit/.test(navigator.userAgent.toLowerCase())){
  require('!style!css!less!./lib/webkit-scrollrail/style.less');
  require('./lib/webkit-scrollrail/webkit-scrollrail.js');
  new window.webkitScrollbar({autohide:true});
}

let history:History;

const Main = ({store}: { store: Store<any> }) => (
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path={window.rootUrl || "/"} component={App}>
        <IndexRoute component={Home} />
        <Route path="/post/:slug" component={Post} />
        <Route path="/page/:title" component={Page} />
        <Route path="/search" component={SearchX} />
        <Route path="/categories/:name" component={Category} />
        <Route path="/tags/:name" component={Tag} />
      </Route>
    </Router>
  </Provider>
);

let store: Store<AppState>;

Promise.all([getSite() as siteState, getTheme()]).then((res) => {
  let u = url.parse(apiHref);
  if(!u.host){
    u = url.parse(url.resolve(url.resolve(window.location.protocol + "//" + window.location.host,window.rootUrl || ""),apiHref));
  }
  res[0].siteUrl = u.protocol + '//' + u.host + (window.rootUrl || "");
  let state:AppState = { site: res[0], theme: {
    ...res[1]
  }};
  if(typeof state.theme.color === 'undefined')state.theme.color = {};
  state.theme.color.accentColor = array_randS(state.theme.uiux.defaultAccentColor);
  state.theme.color.primaryColor = array_randS(state.theme.uiux.defaultPrimaryColor);
  store = createStore(state)
  registerListener(store);
  history = syncHistoryWithStore(routerHistory, store)
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('app')
  );
})

export default store;