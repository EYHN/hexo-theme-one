import { post } from './post';
export interface posts {
  total?:number,
  pageSize?: number,
  pageCount?: number,
  pageIndex?: number,
  data?: Array<post>
}