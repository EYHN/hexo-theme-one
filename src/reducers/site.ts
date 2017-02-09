import {site as siteI} from '../Interfaces/site'

export interface siteState extends siteI{

}

const site = (state: siteState = {}, action: {type?:string,date?:siteI}  = {}) => {
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