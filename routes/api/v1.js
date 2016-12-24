/*
 * Schedules by Student Run Computing and Technology
 *
 * routes/api/v1.js
 *
 * This API supports the Schedules project at schedules.gmu.edu as the backend
 * data source for the application as well as any other third party apps.
 *
 * iCal Generation is handled on a separate file.
 */

var express = require('express')
var router = express.Router()
// var Semester = require('../../models/Semester')
var ical = require('ical-generator')
var config = require('config')

// Load site wide configurations
var schoolSlugs = config.get('schoolSlugs')

var db = require('models')
// ////////////////////////////////////////////////////////////////////////////
// JSON API Section Get school and semester slug listing
router.get('/json/schools', function (req, res, next) {
  db.University.findAll({
    attributes: ['slug', 'name', 'website']
  }).then(function (query) {
    var schools
    res.json(query)
  })
})

// GET semester slug listing for school
router.get('/json/semesters/:SCHOOLSLUG', function (req, res, next) {
  db.Semester.findAll({
    attributes: ['slug', 'name'],
    where: {
      university: req.params['SCHOOLSLUG']
    }
  }).then(function (query) {
    res.json(query)
  })
})

// GET classes for a semester
router.get('/json/classes/:SEMSLUG', function (req, res, next) {
  db.Section.findAll({
    where: {
      semester: req.params['SEMSLUG']
    }
  }).then(function (query) {
    res.json(query)
  })
})

// GET Class information for one course by CRN
router.get('/json/classes/crn/:CRN', function (req, res, next) {
  db.Section.findAll({
    where: {
      crn: req.params['CRN']
    }
  }).then(function (query) {
    res.json(query)
  })
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
