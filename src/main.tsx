import AppState from './stateI';
import { apiHref,getSite } from './lib/hexoApi';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Store } from 'redux';
import createStore from './create-store';
import App from './components/app/app'
import reducer from './reducers/reducer'

injectTapEventPlugin();

var style = require('./main.less');

const Main = ({store}:{store:Store<any>}) => (
  <Provider store={store}>
    <App />
  </Provider>
);

let store:Store<AppState>;

async function main(){
  var site = await getSite();
  store = createStore({site})
  ReactDOM.render(
    <Main store={store}/>,
    document.getElementById('app')
  );
}

main();

export default store;