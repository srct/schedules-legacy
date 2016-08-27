////////////////////////////////////////////////////////////////////////////////
//                 Mason SRCT: Schedules Documentation Routes
// - This routing file is for the documentation behind the scheduels app
// - Most of these should really just be basic render functions without anything
//   more complex that that.
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();

// Load site wide configurations
var config = require('../config');

router.get('/', function(req, res, next) {
  res.render('docs', { config });
})

module.exports = router;
