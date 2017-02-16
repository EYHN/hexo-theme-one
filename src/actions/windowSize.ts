import {windowSizeI} from "../windowSize"

export interface setWindowSizeAction {
  type: 'SET_WINDOW_SIZE',
  date: windowSizeI
}
export const setWindowSize = (date:windowSizeI) => {
  return {
    type:'SET_WINDOW_SIZE',
    date: date
  }
}