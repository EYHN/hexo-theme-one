import { array_randS, resetSeed } from '../../src/lib/random';
import should = require('should');

describe('Theme lib', function () {
  it('数组随机', function () {
    should(array_randS([1,2,3])).be.a.Number().and.is.oneOf([1,2,3]);
  })
  it('数组一样结果一样', function () {
    let a = array_randS([1,2,3]);
    let b = array_randS([1,2,3]);
    should(a).equal(b).and.oneOf([1,2,3]);
    resetSeed();
    let c = array_randS([4,5,6]);
    let d = array_randS([4,5,6]);
    should(c).equal(d).and.oneOf([4,5,6]);
  })
})