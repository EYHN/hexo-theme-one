import { postState } from './reducers/post';
import { postsState } from './reducers/posts';
import { themeState } from './reducers/theme';
import { siteState } from './reducers/site';
import { windowState } from './reducers/windowSize'
import { backgroundState } from './reducers/background';

interface AppState {
  theme?:themeState,
  site?:siteState,
  posts?:postsState,
  postList?:Map<string,postState>,
  windowSize?:windowState,
  background?:backgroundState
}

export default AppState;