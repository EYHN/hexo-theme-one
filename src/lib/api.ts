import * as hexo from "./hexoApi"

import { theme } from '../Interfaces/theme';
import { site } from '../Interfaces/site';
import { posts } from '../Interfaces/posts';
import { post } from '../Interfaces/post';
import { tagsItem } from '../Interfaces/tags';
import { tag } from '../Interfaces/tag';
import { categoriesItem } from '../Interfaces/categories';
import { category } from '../Interfaces/category';
import * as fetch from 'isomorphic-fetch';
const url = require('url');

let rootURL = window.rootUrl || "/";

export var apiHref = process.env.NODE_ENV === "production"?url.resolve(rootURL,"./api/"):"https://huaji8.top/api/"

export function getSite(href = apiHref) {
  return hexo.getSite(href);
}

export function getTheme(href = apiHref) {
  return hexo.getTheme(href);
}

export function getPosts(index?: number, href = apiHref) {
  return hexo.getPosts(index,href);
}

export function getTags(name?: string, href = apiHref) {
  return hexo.getTags(name,href);
}

export function getCategories(name?: string, href = apiHref) {
  return hexo.getCategories(name,href);
}

export function getPost(name: string, href = apiHref) {
  return hexo.getPost(name,href);
}

export function getPage(name: string, href = apiHref) {
  return hexo.getPage(name,href);
}