var express = require('express');
var router = express.Router();

// Load site wide configurations
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
