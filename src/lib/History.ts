import { hashHistory,browserHistory } from 'react-router';
const url = require('url');

const routerHistory = browserHistory;

export function buildPath(path:string){
  return url.resolve(window.rootUrl || "/",path);
}

export default routerHistory;