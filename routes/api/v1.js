/*
 * Schedules by Student Run Computing and Technology
 *
 * routes/api/v1.js
 *
 * This API supports the Schedules project at schedules.gmu.edu as the backend
 * data source for the application as well as any other third party apps.
 *
 * TODO: iCal Generation is handled on a separate file.
 * TODO: shard this file into contents of a `v1` directory
 */

// Load Environment
var express = require('express')
var router = express.Router()
var ical = require('ical-generator')        // ical-generator library
var config = require('config')              // Site wide configs
var schoolSlugs = config.get('schoolSlugs') // Configured School Slugs
var db = require('models')                  // Database Object

////////////////////////////////////////////////////////////////////////////////
// JSON API Definitions
// TODO: separate out into its own file

/*
 * API Endpoint: __root/api/v1/json/schools
 *   - Returns a list of all of the schools available to use the rest of this
 *     API for.
 *   - The intention here is for this to be used by the front end and any other
 *     application to get a list of all the schools that the given deployment
 *     actually has data for.
 *   - TODO: Implement pagination of this API call in a non-breaking way
 */
router.get('/json/schools', function (req, res, next) {
  db.University.findAll({
    attributes: ['slug', 'name', 'website']
  }).then(function (query) {
    var schools
    res.json(query)
  })
})

/*
 * API Endpoint: __root/api/v1/json/semesters/{School Slug}
 *   - For a given school (given as the slug found from '/json/schools', return
 *     all of the semesters that belong to it.
 *   - TODO: Implement pagination of this API call in a non-breaking way
 */
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

/*
 * API Endpoint: __root/api/v1/classes/{Semester Slug}
 *   - For a given semester (given as the slug returned from
 *     `/json/semesters/:SCHOOLSLUG`), return all of the sections that belong to
 *     it.
 *   - TODO: Implement pagination of this API call in a non-breaking way
 */
router.get('/json/classes/:SEMSLUG', function (req, res, next) {
  db.Section.findAll({
    where: {
      semester: req.params['SEMSLUG']
    }
  }).then(function (query) {
    res.json(query)
  })
})

/*
 * API Endpoint: __root/api/v1/classes/{Semester Slug}/{Course Number/ID}
 *   - Retrieves an individual course record and sends it back to the user
 *
 * NOTE: Because unique CRN's are not guaranteed by all University's (like GMU),
 *       we need to collect the semester and the CRN, which forms a combination
 *       that is guaranteed to be unique.
 *
 * TODO: Implement this database call inside of the model itself to stay DRY
 */
router.get('/json/classes/:SEMESTER/:CRN', function (req, res, next) {
  db.Section.findAll({
    where: {
      'crn'      : req.params['CRN'],
      'semester' : req.params(['SEMESTER'])
    }
  }).then(function (query) {
    res.json(query)
  })
})

// ////////////////////////////////////////////////////////////////////////////
// ICAL API Section
// TODO: Separate out into it's own file

/*
 * API Endpoint: __root/api/v1/ical/{Semester Slug}/{Section CRN's}
 *   - Takes a semester slug and a list of CRN's, builds a calendar object, and
 *     sends an `.ics` file back to the requester.
 *
 * NOTES:
 *   - Since this is an open source project targeted to students, I'm going to
 *     explain this implementation a bit more in depth than would usually be
 *     necessary.
 *
 *   - This route makes use of JavaScript Promises to avoid a callback pyramid.
 *     The values `semester` and `sections` below are Asynchronous calls which
 *     do not resolve immediately. If we were to build the calendar right after
 *     that line it would result in an empty calendar. :cry:
 *     - Later, at this part of the code, we wait for all the promises to
 *       resolve before continuing execution by building the calendar:
 *
 *         Promise
 *           .all(
 *             [semester, sections]
 *           ).then(function (queries) {
 *             // ... execution continues here ...
 *           }).catch(function (errors) {
 *             // ... any errors handled here ...
 *           })
 *
 *     - The important thing to keep in mind is that we can set a variable to
 *       be equal to the _promise_ of a value that might take some time. This
 *       tells JS that while there may not be anything here yet, there will be,
 *       and provides useful methods to you that allow you to define callbacks
 *       for different types of events with single or multiple promises.
 *
 *     - For more information on how JavaScript promises work, check out the
 *       documentation at:
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *       It's super helpful. Otherwise, ask me!
 *
 * TODO: Remove the school part of this query...no need because of Sem Slugs
 */
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

  // TODO: look into separating this out into it's own helper file
  var makeCalendar = function(school, semester, sections) {
    // Generate blank calendar
    var cal = ical(
      {
        'domain' : 'schedules.gmu.edu',
        'prodId' : '//Student Run Computing and Technology//Schedules//EN',
        'name'   : school.get('slug') + ' Class Schedule Fall 2016'
      }
    )

    // Build the rest of the calendar

      // TODO: build the calendar events

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
