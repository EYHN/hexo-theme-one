import { getTags as getTagsX } from '../lib/api';
import { tagsItem } from '../Interfaces/tags';
export interface getTagAction {
  type: 'GET_TAG'|'GET_TAG_REQUEST'|'GET_TAG_FAILURE',
  name:string
  result:tagsItem
}

export const getTag = (name:string,href?:string) => {
  return {
    types:["GET_TAG_REQUEST","GET_TAG","GET_TAG_FAILURE"],
    promise:()=>getTagsX(name,href),
    name:name
  }
}

export interface getTagsListAction {
  type: 'GET_TAGSLIST'|'GET_TAGSLIST_REQUEST'|'GET_TAGSLIST_FAILURE',
  result:tagsItem[]
}

export const getTagsList = (href?:string) => {
  return {
    types:["GET_TAGSLIST_REQUEST","GET_TAGSLIST","GET_TAGSLIST_FAILURE"],
    promise:()=>getTagsX(undefined,href)
  }
}