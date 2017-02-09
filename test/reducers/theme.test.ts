import should = require('should');
import theme from '../../src/reducers/theme'

describe('Theme Reducers', function () {
  it('不输出undefined', function () {
    should(theme(undefined, undefined)).be.an.Object();
  });
  it('改变state - CHANGE_MUI_THEME', function () {
    should(theme({ muiTheme: { fontFamily: "321" } }, {
      type: 'CHANGE_MUI_THEME',
      muiTheme: {
        fontFamily: "123"
      }
    }
    )).be.an.Object().and.be.eql({ muiTheme: { fontFamily: "123" } });
  });
  it('改变state - CHANGE_THEME', function () {
    should(theme(
      {
        muiTheme: { fontFamily: "321" },
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
      muiTheme: {
        fontFamily: "321",
      },
      uiux: {
        slogan: '123'
      }
    });
  });
})