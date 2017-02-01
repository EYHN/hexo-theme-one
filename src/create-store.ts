import { AppState } from './stateI';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from './middlewares/promise-middleware'
import reducer from './reducers/reducer'

export default function(data:AppState) {
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)
  return store
}