var express = require('express');
var router = express.Router();

// Load site wide configurations
var config = require('../config');

router.get('/docs', function(req, res, next) {
  res.render('docs', { config });
})

// TODO: Actually learn how to make this function set be passed around properly

/* GET home page. */
router.get('/:school/:semester/:crns', function(req, res, next) {
  var crns = req.params['crns'].split(',');
})

router.get('/:school/:semester', function(req, res, next) {
  var semester = req.params['semester'];
})

router.get('/:school', function(req, res, next) {
  var school = req.params['school'];
})

router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
