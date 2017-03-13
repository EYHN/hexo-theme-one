import { getCategories as getCategoriesX } from '../lib/api';
import { categoriesItem } from '../Interfaces/categories';
import { category } from '../Interfaces/category';
export interface getCategoryAction {
  type: 'GET_CATEGORY'|'GET_CATEGORY_REQUEST'|'GET_CATEGORY_FAILURE',
  name:string
  result:category
}
export const getCategory = (name:string,href?:string) => {
  return {
    types:["GET_CATEGORY_REQUEST","GET_CATEGORY","GET_CATEGORY_FAILURE"],
    promise:()=>getCategoriesX(name,href),
    name:name
  }
}

export interface getCategoriesListAction {
  type: 'GET_CATEGORIESLIST'|'GET_CATEGORIESLIST_REQUEST'|'GET_CATEGORIESLIST_FAILURE',
  result:categoriesItem[]
}

export const getCategoriesList = (href?:string) => {
  return {
    types:["GET_CATEGORIESLIST_REQUEST","GET_CATEGORIESLIST","GET_CATEGORIESLIST_FAILURE"],
    promise:()=>getCategoriesX(undefined,href)
  }
}