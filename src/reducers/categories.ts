import { categoriesItem } from '../Interfaces/categories';
import { getCategoriesListAction } from '../actions/categories';

export interface categoriesState {
  categoriesList?: categoriesItem[];
  loading?: boolean;
  err?: boolean
}

const categories: (state: categoriesState, action: getCategoriesListAction) => categoriesState = (state: categoriesState = {}, action: getCategoriesListAction) => {
  switch (action.type) {
    case 'GET_CATEGORIESLIST':
      state.loading = false;
      state.err = false;
      return {
        ...state,
        categoriesList: action.result,
        loading: false,
        err: false
      };
    case 'GET_CATEGORIESLIST_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'GET_CATEGORIESLIST_FAILURE':
      return {
        ...state,
        loading: false,
        err: true
      }
  }
  return state;
}

export default categories;