var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../models/Semester');

// Load site wide configurations
var config = require('../config');

router.get('/api/json/classes/:SEMSLUG/:CRNS', function(req, res, next) {
  var slug = req.params['SEMSLUG'];
  var crns = req.params['CRNS'].split(',');
  
});

// GET entire semester
router.get('/api/json/classes/:SEMSLUG', function(req, res, next) {
  var slug = req.params['SEMSLUG'];
  if (jsonSlugCache[slug])
  {
    jsonSlugCache[slug].timesUsed++;
    console.log(jsonSlugCache[slug].timesUsed)
    res.send(jsonSlugCache[slug]['value']);
  }
  else {
    // find each person with matching slug
    var query = Semester.findOne({ 'slug': slug });
    query.select('-_id -classes._id -classes.session_templates._id');
    query.lean().exec(function (err, semester) {
      if (err || (! semester)) {
        res.json({
           'error' : 'semester not found'
        })
      }
      else {res.json(semester);}
    })
  }
});

// END API SECTION

router.get('/docs', function(req, res, next) {
  res.render('docs', { config });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
