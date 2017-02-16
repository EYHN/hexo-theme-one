import post from './post';
import theme from './theme';
import site from './site';
import posts from './posts';
import windowSize from './windowSize';
import { combineReducers } from 'redux'

var reducer;

export default reducer = combineReducers({
  theme,
  site,
  posts,
  postList:post,
  windowSize
});