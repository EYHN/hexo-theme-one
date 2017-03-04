import { getPage as getPageX } from '../lib/api';
import { page } from '../Interfaces/page';
export interface getPageAction {
  type: 'GET_PAGE'|'GET_PAGE_REQUEST'|'GET_PAGE_FAILURE',
  title:string
  result:page
}

export const getPage = (title:string,href?:string) => {
  return {
    types:["GET_PAGE_REQUEST","GET_PAGE","GET_PAGE_FAILURE"],
    promise:()=>getPageX(title,href),
    title:title
  }
}