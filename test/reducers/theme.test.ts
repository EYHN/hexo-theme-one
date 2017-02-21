import should = require('should');
import theme from '../../src/reducers/theme'

describe('Theme Reducers', function () {
  it('不输出undefined', function () {
    should(theme(undefined, undefined)).be.an.Object();
  });
  it('改变state - CHANGE_THEME', function () {
    should(theme(
      {
        uiux: {
          slogan: '321'
        }
      }, {
        type: 'CHANGE_THEME',
        theme: {
          uiux: {
            slogan: '123'
          }
        }
      }
    )).be.an.Object().and.be.eql({
      uiux: {
        slogan: '123'
      }
    });
  });
})