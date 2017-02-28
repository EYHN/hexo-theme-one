import { setBackGroundImgAction, addBackGroundImgAction } from '../actions/background';
export interface backgroundState {
  backgroundImg?:{
    url:string
    key:string
  }[]
}

const background:(state:backgroundState,action:addBackGroundImgAction | setBackGroundImgAction)=>backgroundState = (state:backgroundState = {}, action: addBackGroundImgAction | setBackGroundImgAction)=>{
  switch(action.type){
    case "ADD-BG-IMAGE":
      let {backgroundImg:oldbg = []} = state
      return {
        ...state,
        backgroundImg: oldbg.concat(action.backgroundImg)
      }
    case "SET-BG-IMAGE":
      return {
        ...state,
        backgroundImg:action.backgroundImg
      }
  }
  return state;
}

export default background;