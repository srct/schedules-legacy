var express = require('express');
var router = express.Router();
// Load site wide configurations
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
