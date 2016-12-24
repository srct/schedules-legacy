/*
 * Schedules by Student Run Computing and Technology
 *
 * tests/standard_test.js
 *
 * This file describes the linting test to make sure that the project stays
 * nice looking.
 */

/* global it describe */
describe('standardjs linting', function () {
  this.timeout(20000)
  it('conforms to standard', require('mocha-standard'))
})
