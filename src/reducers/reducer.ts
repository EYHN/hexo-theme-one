import post from './post';
import theme from './theme';
import site from './site';
import posts from './posts';
import windowSize from './windowSize';
import { combineReducers } from 'redux'
import background from './background';
import nav from './nav';

var reducer;

export default reducer = combineReducers({
  theme,
  site,
  posts,
  postList:post,
  windowSize,
  background,
  nav
});