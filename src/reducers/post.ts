import { error } from 'util';
import { post as postI } from '../Interfaces/post';
import { getPostAction } from '../actions/post'
export interface postState extends postI{
  loading?:boolean,
  error?:boolean
}

const post:(state:Map<string,postState>,action:getPostAction)=>Map<string,postState> = (state:Map<string,postState> = new Map, action: getPostAction)=>{
  if(action.type.startsWith('GET_POST') && action.slug){
      state = new Map(state.entries());
      let post = state.get(action.slug)
      let finded = !(typeof post === 'undefined')
      switch(action.type){
        case "GET_POST_REQUEST":
          post = {
            ...post,
            loading: true,
            slug: action.slug
          }
          break;
        case "GET_POST_FAILURE":
          post = {
            ...post,
            loading: false,
            error: true,
            slug: action.slug
          }
          break;
        case "GET_POST":
          post = {
            ...post,
            ...action.result,
            loading: false,
            error: false,
            slug: action.slug
          }
          break;
      }
      state.set(action.slug,post);
      return state;
  }
  return state
}
export default post;