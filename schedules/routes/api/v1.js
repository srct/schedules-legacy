var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../../models/Semester');

// Load site wide configurations
var config = require('../../config');

// GET ical file
var jsonSlugCache = { slugs: [] };
router.get('/json/classes/:SEMSLUG', function(req, res, next) {
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
           'results' : 'error, try something different'
        })
      }
      else {res.json(semester);}
    })
  }
});

module.exports = router;
