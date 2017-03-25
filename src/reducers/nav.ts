import { setNavTitleAction, fullModelAction,backButtonAction } from '../actions/nav';

export interface navState {
  title:string
  fullModel:boolean
  backButton:boolean
}

const nav = (state:navState = {title:"",fullModel:true,backButton:false},action:setNavTitleAction | fullModelAction | backButtonAction)=>{
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
    case 'BACK-BUTTON':
      return {
        ...state,
        backButton: action.backButton
      }
  }
  return state;
}

export default nav;
