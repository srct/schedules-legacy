var express = require('express');
var router = express.Router();

// Load site wide configurations
var config = require('../config');

router.get('/', function(req, res, next) {
  res.render('docs', { config });
})

module.exports = router;
