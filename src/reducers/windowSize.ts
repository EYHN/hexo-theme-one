import {windowSizeI} from "../windowSize"
import {setWindowSizeAction} from "../actions/windowSize"

export interface windowState extends windowSizeI {
  
}

const initState:windowState = {
  smaller:{
        than: {
            phone: true,
            pad: true,
            desktop: true
        }
    },
    bigger:{
        than:{
            phone: true,
            pad: false,
            desktop: false
        }
    }
}

const windowSize:(state:windowState,action:setWindowSizeAction)=>windowState = (state:windowState = initState,action:setWindowSizeAction)=>{
  switch(action.type){
    case "SET_WINDOW_SIZE":
        return {
         ...state,
         ...action.date
        };
  }
  return state
}

export default windowSize;