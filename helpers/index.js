/*
 *  Mason SRCT: Schedules || Helpers index.js
 *
 *  - Main file for the supporting functions used in the schedules application.
 *  - This file aggregates all of the other functions and exports them to the
 *    calling file's scope.
 *  - The main idea here is to make it so that any function that might be used
 *    in multiple places can be put here and easily unit tested, debugged, and
 *    changed in all places that use the feature.
 *
 *  tl;dr: Forget staying thirsty, "Stay DRY, my friends."
 */

// var ical = require('ical-generator')        // ical-generator library
// var config = require('config')              // Site wide configs
// var db = require('../models')               // Database Object

/*
 * A brief note...since this is quite new and I don't know exactly how I want to
 * set this up, I'll be making it pretty simple for now. So basically:
 *
 * TODO: Make this not suck (dynamic loading of other files maybe?)
 */

var userException = function (message) {
  this.message = message
  this.name = 'userException'
}
module.exports.userException = userException

/**
 * Strip all non alpha numeric characters from input.
 *
 * @param inputString String to be cleaned
 * @since 0.0.0
 * @returns {String}
 */
var strClean = function (inputString) {
  return inputString.replace(/[^0-9a-z]/gi, '')
}
module.exports.strClean = strClean

/**
 * Separate and strip all non alpha numeric characters.
 *
 * @param rawString String to be split and cleaned
 * @param separator Character to be used as the separator (defaults to ',')
 * @since 0.0.0
 * @returns {Array|String}
 */
var strSplitClean = function (rawString, separator) {
  // Validate input for separator
  if (separator && separator.length !== 1) {
    throw new userException('separator must be a single char')
  }
  if (!separator) {
    separator = ','
  }
  if (!rawString) {
    return null
  }

  var output = []

  rawString.split(separator).forEach(function (rawSection) {
    var nextOutput = strClean(rawSection)

    if (nextOutput) {
      output.push(nextOutput)
    }
  })

  return output
}
module.exports.strSplitClean = strSplitClean
