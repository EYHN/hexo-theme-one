import post from './post';
import theme from './theme';
import site from './site';
import posts from './posts';
import windowSize from './windowSize';
import { combineReducers } from 'redux'
import background from './background';
import nav from './nav';
import page from './page';
import category from './category';
import categories from './categories'
import { routerReducer } from 'react-router-redux';
import tags from './tags';
import tag from './tag';

var reducer;

export default reducer = combineReducers({
  theme,
  site,
  posts,
  postsList:post,
  windowSize,
  background,
  nav,
  pagesList:page,
  categoriesList:category,
  categories,
  routing: routerReducer,
  tags,
  tagsList: tag
});