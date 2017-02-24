export interface addBackGroundImgAction {
  type: 'ADD-BG-IMAGE',
  backgroundImg: {
    url: string
    key: string
  }
}

export interface setBackGroundImgAction {
  type: 'SET-BG-IMAGE',
  backgroundImg: {
    url: string
    key: string
  }[]
}

export const addBackGroundImg = (backgroundImg: string, key: string) => {
  return {
    type: 'ADD-BG-IMAGE',
    backgroundImg: {
      url: backgroundImg, key
    }
  }
}

export const setBackGroundImg = (backgroundImg: {
  url: string
  key: string
}[]) => {
  return {
    type: 'SET-BG-IMAGE',
    backgroundImg: backgroundImg
  }
}