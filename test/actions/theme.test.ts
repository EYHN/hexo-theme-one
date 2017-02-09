import { changeTheme } from '../../src/actions/theme';

import {} from 'mocha'
import should = require('should');

describe('Theme Action', function() {
  it('changeTheme', function() {
    var state = changeTheme(null);
    state.should.be.an.Object();
    state.should.eql({
      type: 'CHANGE_THEME',
      muiTheme: null
    });
  });
});