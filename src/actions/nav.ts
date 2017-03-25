export interface setNavTitleAction {
  type: 'SET-NAV-TITLE',
  title:string
}

export interface fullModelAction {
  type: 'FULL-MODEL',
  fullModel:boolean
}

export interface backButtonAction {
  type: 'BACK-BUTTON',
  backButton:boolean
}

export const setNavTitle = (title: string) => {
  return {
    type: 'SET-NAV-TITLE',
    title:title
  }
}

export const fullModel = (fullModel: boolean) => {
  return {
    type: 'FULL-MODEL',
    fullModel:fullModel
  }
}

export const backButton = (backButton: boolean) => {
  return {
    type: 'BACK-BUTTON',
    backButton:backButton
  }
}