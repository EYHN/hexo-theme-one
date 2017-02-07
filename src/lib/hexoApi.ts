import { site } from '../Interfaces/site';
import { posts } from '../Interfaces/posts';
import { post } from '../Interfaces/post';
import { tagsItem } from '../Interfaces/tags';
import { tag } from '../Interfaces/tag';
import { categoriesItem } from '../Interfaces/categories';
import { category } from '../Interfaces/category';
export var apiHref = "https://delusion.coding.me/api"

const fetchConfig = {
}

export function getSite(href = apiHref) {
  return fetch(href + "/site.json",fetchConfig).then((res) => {
    return res.json() as Promise<site>;
  })
}

export function getPosts(index?: number, href = apiHref) {
  if (typeof index === 'undefined') {
    return fetch(href + "/posts.json",fetchConfig).then((res) => {
      return res.json().then((date)=>{
        date.pageIndex = 1;
        return date as Promise<posts>
      });
    })
  } else {
    return fetch(href + `/posts/${index}.json`,fetchConfig).then((res) => {
      return res.json().then((date)=>{
        date.pageIndex = index;
        return date as Promise<posts>
      });
    })
  }
}

export function getTags(name?: string, href = apiHref) {
  if (typeof name === 'undefined') {
    return fetch(href + "/tags.json",fetchConfig).then((res) => {
      return res.json() as Promise<Array<tagsItem>>;
    })
  } else {
    return fetch(href + `/tags/${name}.json`,fetchConfig).then((res) => {
      return res.json() as Promise<tag>;
    })
  }
}

export function getCategories(name?: string, href = apiHref) {
  if (typeof name === 'undefined') {
    return fetch(href + "/categories.json",fetchConfig).then((res) => {
      return res.json() as Promise<Array<categoriesItem>>;
    })
  } else {
    return fetch(href + `/categories/${name}.json`,fetchConfig).then((res) => {
      return res.json() as Promise<category>;
    })
  }
}

export function getPost(name: string, href = apiHref) {
  return fetch(href + `/articles/${name}.json`,fetchConfig).then((res) => {
    return res.json() as Promise<post>;
  })
}