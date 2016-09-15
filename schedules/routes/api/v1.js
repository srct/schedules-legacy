////////////////////////////////////////////////////////////////////////////////
//                         Mason SRCT: Schedules API v1
// - This API supports the Schedules project at schedules.gmu.edu as the backend
//   data source for the application sent on the front end.
////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../../models/Semester');
var ical = require('ical-generator');

// Load site wide configurations
var config = require('../../config');

////////////////////////////////////////////////////////////////////////////////
// JSON API Section

// Get school and semester slug listing
router.get('/json/schools', function(req, res, next) {
  res.json(config.schoolSlugs);
});

// GET classes for a semester
router.get('/json/classes/:SEMSLUG', function(req, res, next) {
  var slug = req.params['SEMSLUG'];
  // find each person with matching slug
  var query = Semester.findOne({ 'slug': slug });
  // remove unwanted fields from request
  query.select('-_id -classes._id -classes.session_templates._id');
  // excecute the request (caches with redis)
  query.lean().exec(function (err, semester) {
    // if there was an error or nothing was returned
    if (err || (! semester)) {
      // send an error message
      res.json({
         'results' : 'error, try something different'
      })
    }
    // else send out the semester object as json
    else {
      res.json(semester);
    }
  })
});

////////////////////////////////////////////////////////////////////////////////
// ICAL API Section
router.get('/ical/:SCHOOL/:SEMSLUG/:CLASSES', function(req, res, next) {
  var schoolSlug = req.params['SCHOOL'];
  var semSlug = req.params['SEMSLUG'];
  var classes = req.params['CLASSES'];

  // Generate blank calendar
  cal = ical({domain: 'schedules.gmu.edu', name: 'SRCT Schedules Generated Calendar'});

  res.set({
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="' + ('calendar.ics') + '"'
  });

  res.send(cal.toString());;
})

module.exports = router;
