import {site as siteI} from '../Interfaces/site'

export interface siteState extends siteI{

}

const site = (state: siteState = {}, action: any) => {
  switch (action.type) {
    case 'CHANGE_SITE':
      return {
        ...state,
        ...action
      }
  }
  return state
}

export default site;