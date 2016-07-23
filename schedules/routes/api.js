var express = require('express');
var mongoose = require('mongoose');
var Semester = require('../models/Semester');
var api = express.Router();

// Load site wide configurations
var config = require('../config');

/* GET Schools listing. */
api.get('/api/lists/schools', function(req, res, next) {
  res.send(JSON.stringify(schools));
});

// GET ical file
api.get('/api/json/:SEMSLUG', function(req, res) {
  var slug = req.params['SEMSLUG'];

  // find each person with matching slug
  var query = Semester.findOne({ 'slug': slug });
  query.exec(function (err, semester) {
    if (err || (! semester)) { res.json({ 'results' : 'error, try something different' }) }
    else {res.json(semester);}
  })
  res.send(crnNums);
});

module.exports = api;
