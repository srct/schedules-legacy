// ////////////////////////////////////////////////////////////////////////////
//                         Mason SRCT: Schedules API v1
// - This API supports the Schedules project at schedules.gmu.edu as the backend
//   data source for the application sent on the front end.
// ////////////////////////////////////////////////////////////////////////////

var express = require('express')
var router = express.Router()
// var Semester = require('../../models/Semester')
var ical = require('ical-generator')
// var db = require('models')
var config = require('config')

// Load site wide configurations
var schoolSlugs = config.get('schoolSlugs')

// ////////////////////////////////////////////////////////////////////////////
// JSON API Section

// Get school and semester slug listing
router.get('/json/schools', function (req, res, next) {
  res.json(schoolSlugs)
})

// GET classes for a semester
router.get('/json/classes/:SEMSLUG', function (req, res, next) {
  // var slug = req.params['SEMSLUG']
  // find each person with matching slug

  // remove unwanted fields from request

  // excecute the request (caches with redis)

    // if there was an error or nothing was returned

      // send an error message

    // else send out the semester object as json
})

// ////////////////////////////////////////////////////////////////////////////
// ICAL API Section
router.get('/ical/:SCHOOL/:SEMSLUG/:CLASSES', function (req, res, next) {
/*
  var schoolSlug = req.params['SCHOOL']
  var semSlug = req.params['SEMSLUG']
  var classes = req.params['CLASSES']
*/
  // Generate blank calendar
  var cal = ical({domain: 'schedules.gmu.edu', name: 'SRCT Schedules Generated Calendar'})

  res.set({
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="' + ('calendar.ics') + '"'
  })

  res.send(cal.toString())
})

module.exports = router
