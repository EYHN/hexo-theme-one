import { setNavTitleAction, fullModelAction, fullModel } from '../actions/nav';

export interface navState {
  title:string
  fullModel:boolean
}

const nav = (state:navState = {title:"",fullModel:false},action:setNavTitleAction | fullModelAction)=>{
  switch(action.type){
    case "SET-NAV-TITLE":
      return {
        ...state,
        title:action.title
      }
    case "FULL-MODEL":
      return {
        ...state,
        fullModel: action.fullModel
      }
  }
  return state;
}

export default nav;
