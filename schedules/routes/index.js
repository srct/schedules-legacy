var express = require('express');
var router = express.Router();
// Load site wide configurations
var config = require('../config');

router.get('/docs', function(req, res, next) {
  res.render('docs', { config });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config });
});

module.exports = router;
