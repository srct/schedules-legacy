var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../../models/Semester');

// Load site wide configurations
var config = require('../../config');

// Setup Slug Cache for redis cache
var jsonSlugCache = { slugs: [] };

////////////////////////////////////////////////////////////////////////////////
// JSON API Section

// Get school and school slug listing
router.get('/json/schools', function(req, res, next) {
  res.json(config.schoolSlugs);
});

// TODO: FINISH THIS
// Get semester and semester slug listing for a given school
router.get('/json/semesters/:SCHOOL', function(req, res, next) {
  var schoolSlug = req.params['SCHOOL'];
  res.json({'TODO': schoolSlug});
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

module.exports = router;
