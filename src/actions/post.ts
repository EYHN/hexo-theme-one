import { getPost as getPostX } from '../lib/api';
import { post } from '../Interfaces/post';
export interface getPostAction {
  type: 'GET_POST'|'GET_POST_REQUEST'|'GET_POST_FAILURE',
  slug:string
  result:post
}
export const getPost = (slug:string,href?:string) => {
  return {
    types:["GET_POST_REQUEST","GET_POST","GET_POST_FAILURE"],
    promise:()=>getPostX(slug,href),
    slug:slug
  }
}