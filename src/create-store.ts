import AppState from './stateI';
import { createStore, applyMiddleware, combineReducers,compose } from 'redux'
import promiseMiddleware from './middlewares/promise-middleware'
import reducer from './reducers/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function(data:AppState) {
  var store = createStore<AppState>(reducer, data, composeEnhancers(
    applyMiddleware(promiseMiddleware)
  ));
  return store
}