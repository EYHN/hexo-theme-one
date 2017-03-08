import { postState } from './reducers/post';
import { postsState } from './reducers/posts';
import { themeState } from './reducers/theme';
import { siteState } from './reducers/site';
import { windowState } from './reducers/windowSize'
import { backgroundState } from './reducers/background';
import { navState } from './reducers/nav';
import { pageState } from './reducers/page';

interface AppState {
  theme?:themeState,
  site?:siteState,
  posts?:postsState,
  postsList?:Map<string,postState>,
  windowSize?:windowState,
  background?:backgroundState,
  nav?:navState,
  pagesList?:Map<string,pageState>
}

export default AppState;