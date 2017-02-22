export interface addBackGroundImgAction {
  type: 'ADD-BG-IMAGE',
  backgroundImg: string
}

export interface setBackGroundImgAction {
  type: 'SET-BG-IMAGE',
  backgroundImg: string[]
}

export const addBackGroundImg = (backgroundImg:string) => {
  return {
    type: 'ADD-BG-IMAGE',
    backgroundImg: backgroundImg
  }
}

export const setBackGroundImg = (backgroundImg:string[]) => {
  return {
    type: 'SET-BG-IMAGE',
    backgroundImg: backgroundImg
  }
}