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
router.get('/ical/:SCHOOL/:SEMSLUG/:SECTIONS', function (req, res, next) {

  // Extract arguments and setup empty objects for them

  //   Get School Information
  var schoolSlug = req.params['SCHOOL']
  var school = db.University
    .findOne({
      'attributes': ['slug', 'name', 'website'],
      'where': {
        'slug': schoolSlug
      }
    })

  //  Get Semester Information
  var semSlug = req.params['SEMSLUG']
  var semester = db.Semester
    .findOne({
      'attributes': ['slug', 'name', 'university'],
      'where': {
        'slug': semSlug
      }
    })

  //  Get Section Information
  var sectionArgs = req.params['SECTIONS']
  var semesterSlugs = []

  //  Parse Section Args
  sectionArgs.split(',').forEach(function (sectionArg) {
    semesterSlugs.push(db.sequelize.escape(sectionArg))
  })

  var sections = db.Section
    .findAll({
      'where': {
        'semester': semSlug,
        'crn': {
          $in: semesterSlugs
        }
      }
    })

  var makeCalendar = function(school, semester, sections) {
    // Generate blank calendar
    var cal = ical(
      {
        domain: 'schedules.gmu.edu',
        prodId: '//Student Run Computing and Technology//Schedules//EN',
        name: school.get('slug') + ' Class Schedule Fall 2016'
      }
    )

    return cal
  }

  // Wait for all the queries to finish
  Promise
    .all(
      [school, semester, sections]
    ).then(function (queries) {
      // Check for invalid responses and throw appropriate errors
      if (!queries[0]) {
        throw 'Invalid School Given!'
      }
      if (!queries[1]) {
        throw 'Invalid Semester Given'
      }

      // Generate the calendar
      var semesterCalendar = makeCalendar(queries[0], queries[1], queries[2])

      res.set({
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="' + ('calendar.ics') + '"'
      })

      res.send(semesterCalendar.toString())
    })
    // Catch any errors and respond with grace
    .catch(function (error) {
      console.log(error)
      res.send(error)
    })
})

module.exports = router
