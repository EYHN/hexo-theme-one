import { categoriesItem } from './categories';
import { tagsItem } from './tags';
export interface post {
  title?: string,
  slug?: string,
  date?: string,
  updated?: string,
  comments?: boolean,
  path?: string,
  excerpt?: string,
  content?: string,
  categories?: Array<categoriesItem>,
  tags?: Array<tagsItem>
  thumbnail?:string | Array<string>
  primarycolor?: string | Array<string>
  accentcolor?: string | Array<string>
}