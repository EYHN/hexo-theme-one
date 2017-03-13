import { category as categoryI } from '../Interfaces/category';
import { getCategoryAction } from '../actions/categories';
export interface categoryState extends categoryI{
  loading?:boolean,
  error?:boolean
}

const category:(state:Map<string,categoryState>,action:getCategoryAction)=>Map<string,categoryState> = (state:Map<string,categoryState> = new Map, action: getCategoryAction)=>{
  if(action.type.startsWith('GET_CATEGORY') && action.name){
      state = new Map(state.entries());
      let category = state.get(action.name)
      let finded = !(typeof category === 'undefined')
      switch(action.type){
        case "GET_CATEGORY_REQUEST":
          category = {
            ...category,
            loading: true,
            name: action.name
          }
          break;
        case "GET_CATEGORY_FAILURE":
          category = {
            ...category,
            loading: false,
            error: true,
            name: action.name
          }
          break;
        case "GET_CATEGORY":
          category = {
            ...category,
            ...action.result,
            loading: false,
            error: false,
            name: action.name
          }
          break;
      }
      state.set(action.name,category);
      return state;
  }
  return state
}
export default category;