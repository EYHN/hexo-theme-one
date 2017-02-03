import { postsState } from './reducers/posts';
import { themeState } from './reducers/theme';
import { siteState } from './reducers/site';

interface AppState {
  theme?:themeState,
  site?:siteState,
  posts?:postsState
}

export default AppState;