var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../models/Semester');

// Load site wide configurations
var config = require('../config');

// TODO: Actually learn how to make this function set be passed around properly

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
