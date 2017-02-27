export interface setNavTitleAction {
  type: 'SET-NAV-TITLE',
  title:string
}

export interface fullModelAction {
  type: 'FULL-MODEL',
  fullModel:boolean
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