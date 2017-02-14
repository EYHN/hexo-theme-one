import post from './post';
import {postState} from './post'
import {posts as postsI} from "../Interfaces/posts"

export interface postsState{
  total?:number,
  loading?:boolean,
  apiPageSize?: number,
  err?:boolean,
  postsList?:Array<postState>
}

function updatePosts(posts:postsState = {},actionPosts:postsI):postsState{
  let { postsList = [] } = posts;
  postsList = postsList.concat();
  for(
    let i = actionPosts.pageSize * (actionPosts.pageIndex),a = 0;
    i < actionPosts.total && a < actionPosts.pageSize && a < actionPosts.data.length;
    i++,a++){
      postsList[i] = actionPosts.data[a];
  }
  let res = {
    ...posts,
    total:actionPosts.total,
    apiPageSize:actionPosts.pageSize,
    postsList:postsList
  }
  return res;
}

const posts:(state:postsState,action:any)=>postsState = (state: postsState = {}, action: any = {}) => {
  switch (action.type) {
    case 'UPDATE_POSTS':
      let posts = updatePosts(state,action.result);
      posts.loading = false;
      posts.err = false;
      return posts;
    case 'UPDATE_POSTS_REQUEST':
      return {
        ...state,
        loading:true
      }
    case 'UPDATE_POSTS_FAILURE':
      return {
        ...state,
        loading:false,
        err:true
      }
  }
  return state
}

export default posts;