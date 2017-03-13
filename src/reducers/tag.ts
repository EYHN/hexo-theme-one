import { tag as tagI } from '../Interfaces/tag';
import { getTagAction } from '../actions/tags';
export interface tagState extends tagI{
  loading?:boolean,
  error?:boolean
}

const tag:(state:Map<string,tagState>,action:getTagAction)=>Map<string,tagState> = (state:Map<string,getTagAction> = new Map, action: getTagAction)=>{
  if(action.type.startsWith('GET_TAG') && !action.type.startsWith('GET_TAGSLIST') && action.name){
      state = new Map(state.entries());
      let tag = state.get(action.name)
      let finded = !(typeof tag === 'undefined')
      switch(action.type){
        case "GET_TAG_REQUEST":
          tag = {
            ...tag,
            loading: true,
            name: action.name
          }
          break;
        case "GET_TAG_FAILURE":
          tag = {
            ...tag,
            loading: false,
            error: true,
            name: action.name
          }
          break;
        case "GET_TAG":
          tag = {
            ...tag,
            ...action.result,
            loading: false,
            error: false,
            name: action.name
          }
          break;
      }
      state.set(action.name,tag);
      return state;
  }
  return state
}
export default tag;