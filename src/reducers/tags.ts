import { tagsItem } from '../Interfaces/tags';
import { getTagsListAction } from '../actions/tags';

export interface tagsState {
  tagsList?: tagsItem[];
  loading?: boolean;
  err?: boolean
}

const tags: (state: tagsState, action: getTagsListAction) => tagsState = (state: tagsState = {}, action: getTagsListAction) => {
  switch (action.type) {
    case 'GET_TAGSLIST':
      state.loading = false;
      state.err = false;
      return {
        ...state,
        tagsList: action.result,
        loading: false,
        err: false
      };
    case 'GET_TAGSLIST_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'GET_TAGSLIST_FAILURE':
      return {
        ...state,
        loading: false,
        err: true
      }
  }
  return state;
}

export default tags;