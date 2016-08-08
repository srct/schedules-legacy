var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../models/Semester');

// Load site wide configurations
var config = require('../config');

router.get('/', function(req, res, next) {
  res.render('docs', { config });
})

module.exports = router;
