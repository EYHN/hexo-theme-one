import {post} from '../Interfaces/post'
import {posts as postsI} from "../Interfaces/posts"

export interface postsState{
  total?:number,
  loading?:boolean,
  apiPageSize?: number,
  err?:boolean,
  postsList?:Array<post>
}

function updatePosts(posts:postsState = {},actionPosts:postsI):postsState{
  let { postsList = [] } = posts;
  for(
    let i = actionPosts.pageSize * (actionPosts.pageIndex - 1);
    i < actionPosts.total;
    i++){
      postsList[i] = actionPosts.data[i];
  }
  let res = {
    ...posts,
    total:actionPosts.total,
    apiPageSize:actionPosts.pageSize,
    postsList:postsList
  }
  return res;
}

const posts:(state:postsState,action:any)=>postsState = (state: postsState = {}, action: any) => {
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