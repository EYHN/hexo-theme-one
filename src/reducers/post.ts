import { error } from 'util';
import { post } from '../Interfaces/post';
import { getPostAction } from '../actions/post'
export interface postState extends post{
  loading?:boolean,
  error?:boolean
}

const post:(state:Array<postState>,action:getPostAction)=>Array<postState> = (state: Array<postState> = [], action: getPostAction)=>{
  if(action.type.startsWith('GET_POST') && action.slug){
    let post = state.find((value)=>{
        return action.slug == value
      })
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
            loading: true,
            slug: action.slug
          }
          break;
      }
      if(!finded){
        state.push(post);
      }
      return state;
  }
  return state
}
export default post;