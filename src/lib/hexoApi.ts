import { theme } from '../Interfaces/theme';
import { site } from '../Interfaces/site';
import { posts } from '../Interfaces/posts';
import { post } from '../Interfaces/post';
import { tagsItem } from '../Interfaces/tags';
import { tag } from '../Interfaces/tag';
import { categoriesItem } from '../Interfaces/categories';
import { category } from '../Interfaces/category';
import * as fetch from 'isomorphic-fetch';
import { page } from '../Interfaces/page';
const url = require('url');

export var apiHref = "https://delusion.coding.me/blog/api"

const fetchConfig = {
}

export function getSite(href = apiHref) {
  if (typeof window.one !== "undefined"){
    if (typeof window.one.site !== "undefined"){
      return new Promise<site>((value)=>{
        value(window.one.site)
      })
    }
  }
  return fetch(url.resolve(href,"./site.json"),fetchConfig).then((res) => {
    return res.json() as Promise<site>;
  })
}

export function getTheme(href = apiHref) {
  if (typeof window.one !== "undefined"){
    if (typeof window.one.theme !== "undefined"){
      return new Promise<theme>((value)=>{
        value(window.one.theme)
      })
    }
  }
  return fetch(url.resolve(href,"./theme.json"),fetchConfig).then((res) => {
    return res.json() as Promise<theme>;
  })
}

export function getPosts(index?: number, href = apiHref) {
  if (typeof index === 'undefined') {
    return fetch(url.resolve(href,"./posts.json"),fetchConfig).then((res) => {
      return res.json().then((date)=>{
        date.pageIndex =0;
        return date as Promise<posts>
      });
    })
  } else {
    return fetch(url.resolve(href,`./posts/${index}.json`),fetchConfig).then((res) => {
      return res.json().then((date)=>{
        date.pageIndex = index - 1;
        return date as Promise<posts>
      });
    })
  }
}

export function getTags(name?: string, href = apiHref) {
  if (typeof name === 'undefined') {
    return fetch(url.resolve(href,"./tags.json"),fetchConfig).then((res) => {
      return res.json() as Promise<Array<tagsItem>>;
    })
  } else {
    return fetch(url.resolve(href,`./tags/${name}.json`),fetchConfig).then((res) => {
      return res.json() as Promise<tag>;
    })
  }
}

export function getCategories(name?: string, href = apiHref) {
  if (typeof name === 'undefined') {
    return fetch(url.resolve(href,"./categories.json"),fetchConfig).then((res) => {
      return res.json() as Promise<Array<categoriesItem>>;
    })
  } else {
    return fetch(url.resolve(href,`./categories/${name}.json`),fetchConfig).then((res) => {
      return res.json() as Promise<category>;
    })
  }
}

export function getPost(name: string, href = apiHref) {
  return fetch(url.resolve(href,`./articles/${name}.json`),fetchConfig).then((res) => {
    return res.json() as Promise<post>;
  })
}

export function getPage(name: string, href = apiHref) {
  return fetch(url.resolve(href,`./page/${name}.json`),fetchConfig).then((res) => {
    return res.json() as Promise<page>;
  })
}