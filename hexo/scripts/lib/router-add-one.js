var fs = require('hexo-fs');
var path = require('path');

module.exports = function (site) {
  var res = [];
  var generator = {};
  var postNameList = site.posts.sort('-date').filter(function (post) {
    return post.published;
  }).map((value) => {
    return value.slug;
  });
  var pageNameList = site.pages.map((value) => {
    return value.title
  })

  postNameList.forEach((value)=>{
    res.push({
      path: '/post/' + value + '/index.html',
      layout:'index',
      data: {}
    });
  })

  pageNameList.forEach((value)=>{
    res.push({
      path: '/page/' + value + '/index.html',
      layout:'index',
      data: {}
    });
  })

  res.push({
      path: '/search/index.html',
      layout:'index',
      data: {}
    });

  return res;
}