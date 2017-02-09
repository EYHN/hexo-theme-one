import { posts as postsI } from '../../src/Interfaces/posts';
import should = require('should');
import posts from '../../src/reducers/posts'

describe('Posts Reducers', function () {
  it('不输出undefined', function () {
    should(posts(undefined, undefined)).be.an.Object();
  });
  it('请求状态', function () {
    let res = posts(undefined, {
      type: 'UPDATE_POSTS_REQUEST'
    });
    should(res.err).not.be.ok();
    should(res.loading).be.ok();
  });
  it('err状态', function () {
    let res = posts(undefined, {
      type: 'UPDATE_POSTS_FAILURE'
    });
    should(res.err).be.ok();
    should(res.loading).not.ok();
  });
  it('更新posts列表', function () {
    let actionPosts: postsI = {
      total: 12,
      pageSize: 4,
      pageCount: 3,
      pageIndex: 1,
      data: [
        {
          title: '123'
        },
        {
          title: '321'
        },
        {
          title: '123456'
        },
        {
          title: '654321'
        }
      ]
    }
    let res = posts(undefined, {
      type: 'UPDATE_POSTS',
      result: actionPosts
    });
    res.apiPageSize.should.be.equal(4);
    res.total.should.be.equal(12);
    should(res.postsList[3]).be.undefined();
    res.postsList[4].should.eql({ title: '123' });
    res.postsList[5].should.eql({ title: '321' });
    res.postsList[6].should.eql({ title: '123456' });
    res.postsList[7].should.eql({ title: '654321' });
    should(res.err).not.ok();
    should(res.loading).not.ok();

    res = posts({
      total: 13,
      loading: true,
      err: false,
      apiPageSize: 10,
      postsList: [
        {
          title: '123'
        },
        {
          title: '321'
        },
        {
          title: '123456'
        },
        {
          title: '654321'
        }
      ]
    }, {
        type: 'UPDATE_POSTS',
        result: actionPosts
      });
    res.apiPageSize.should.be.equal(4);
    res.total.should.be.equal(12);
    res.postsList.should.eql([
      {
        title: '123'
      },
      {
        title: '321'
      },
      {
        title: '123456'
      },
      {
        title: '654321'
      },
      {
        title: '123'
      },
      {
        title: '321'
      },
      {
        title: '123456'
      },
      {
        title: '654321'
      }
    ])
  should(res.err).not.ok();
  should(res.loading).not.ok();
});
});