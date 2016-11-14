/* global it describe */
describe('standardjs linting', function () {
  this.timeout(20000)
  it('conforms to standard', require('mocha-standard'))
})
