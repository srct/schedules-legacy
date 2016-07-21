var express = require('express');
var router = express.Router();

// Load site wide configurations
var config = require('../config');

router.get('/docs', function(req, res, next) {
  res.render('docs', { config });
})

// TODO: Actually learn how to make this function set be passed around properly

/* GET home page. */
// Save URL for entire schedules
router.get('/:school/:semester/:crns', function(req, res, next) {
  var crns = req.params['crns'].split(',');
  var semester = req.params['semester'];
  var school = req.params['school'];
  res.render('index', { config, crns, semester, school });
})

// Save URL for everything up to semester
router.get('/:school/:semester', function(req, res, next) {
  var semester = req.params['semester'];
  var school = req.params['school'];
  res.render('index', { config, semester, school });
})

// Save URL for school
router.get('/:school', function(req, res, next) {
  var school = req.params['school'];
  res.render('index', { config, school });
})

// All defaults
router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
