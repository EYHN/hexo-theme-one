import {posts} from "../Interfaces/posts"
import {getPosts as getPostsA} from "../lib/api"

export interface updatePostsAction {
  type: 'UPDATE_POSTS',
  posts: posts
}
export const updatePostsP = (index?:number,href?:string) => {
  return {
    types:["UPDATE_POSTS_REQUEST","UPDATE_POSTS","UPDATE_POSTS_FAILURE"],
    promise:()=>getPostsA(index,href)
  }
}