import { changeTheme } from '../../src/actions/theme';
import should = require('should');

describe('Theme Action', function () {
  it('改变主题设置', function () {
    let state = changeTheme(
      {
        uiux: {
          slogan: '123'
        }
      }
    );
    state.should.be.an.Object();
    state.should.eql({
      type: 'CHANGE_THEME',
      theme: {
        uiux: {
          slogan: '123'
        }
      }
    });
  });
});