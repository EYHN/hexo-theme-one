import { page as pageI } from '../Interfaces/page';
import { getPageAction } from '../actions/page';
export interface pageState extends pageI{
  loading?:boolean,
  error?:boolean
}

const page:(state:Map<string,pageState>,action:getPageAction)=>Map<string,pageState> = (state:Map<string,pageState> = new Map, action: getPageAction)=>{
  if(action.type.startsWith('GET_PAGE') && action.title){
      let List = new Map(state.entries());
      let page = state.get(action.title)
      let finded = !(typeof page === 'undefined')
      switch(action.type){
        case "GET_PAGE_REQUEST":
          page = {
            ...page,
            loading: true,
            title: action.title
          }
          break;
        case "GET_PAGE_FAILURE":
          page = {
            ...page,
            loading: false,
            error: true,
            title: action.title
          }
          break;
        case "GET_PAGE":
          page = {
            ...page,
            ...action.result,
            loading: false,
            error: false,
            title: action.title
          }
          break;
      }
      List.set(action.title,page);
      return List;
  }
  return state
}
export default page;