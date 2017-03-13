import { postState } from './reducers/post';
import { postsState } from './reducers/posts';
import { themeState } from './reducers/theme';
import { siteState } from './reducers/site';
import { windowState } from './reducers/windowSize'
import { backgroundState } from './reducers/background';
import { navState } from './reducers/nav';
import { pageState } from './reducers/page';
import { categoryState } from './reducers/category';
import {categoriesState} from './reducers/categories';
import { RouterState } from 'react-router-redux'
import { tagsState } from './reducers/tags';
import { tagState } from './reducers/tag';

interface AppState {
  theme?:themeState,
  site?:siteState,
  posts?:postsState,
  postsList?:Map<string,postState>,
  windowSize?:windowState,
  background?:backgroundState,
  nav?:navState,
  pagesList?:Map<string,pageState>
  categoriesList?:Map<string,categoryState>,
  categories?:categoriesState
  routing?:RouterState
  tagsList?:Map<string,tagState>,
  tags?:tagsState
}

export default AppState;