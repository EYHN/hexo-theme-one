import {site as siteI} from '../Interfaces/site'

export interface siteState extends siteI{
  siteUrl?:string
}

const site = (state: siteState = {}, action: {type?:string,date?:siteState}  = {}) => {
  switch (action.type) {
    case 'CHANGE_SITE':
      return {
        ...state,
        ...action.date
      }
  }
  return state
}

export default site;