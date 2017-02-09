import { type } from 'os';
import site from '../../src/reducers/site'
import should = require('should');

describe('Site Reducers', function () {
  it('不输出undefined', function () {
    should(site(undefined, undefined)).be.an.Object();
  });
  it('改变state', function () {
    should(site({title:'321'}, {
      type:'CHANGE_SITE',
      date:{
        title:'123'
      }
    }
    )).be.an.Object().and.be.eql({title:'123'});
  });
})