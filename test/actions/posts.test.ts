import { updatePostsP } from '../../src/actions/posts';
import should = require('should');

describe('Posts Action', function() {
  it('state输出正常', function() {
    var state = updatePostsP(1,"1");
    state.should.be.an.Object();
    state.types.should.eql(["UPDATE_POSTS_REQUEST","UPDATE_POSTS","UPDATE_POSTS_FAILURE"]);
    should(state.promise()).be.Object().and.be.a.Promise();
  });
});