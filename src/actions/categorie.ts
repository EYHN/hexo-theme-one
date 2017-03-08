import { getCategories as getCategoriesX } from '../lib/api';
import { categoriesItem } from '../Interfaces/categories';
export interface getCategoryAction {
  type: 'GET_CATEGORY'|'GET_CATEGORY_REQUEST'|'GET_CATEGORY_FAILURE',
  name:string
  result:categoriesItem
}
export const getCategory = (name:string,href?:string) => {
  return {
    types:["GET_CATEGORY_REQUEST","GET_CATEGORY","GET_CATEGORY_FAILURE"],
    promise:()=>getCategoriesX(name,href),
    name:name
  }
}