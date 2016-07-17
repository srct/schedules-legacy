var express = require('express');
var router = express.Router();

var schools = [
  {
    displayName: 'George Mason University',
    shortcode:   'GMU'
  },
  {
    displayName: 'Virginia Tech',
    shortcode:   'VT'
  }
]

/* GET Schools listing. */
router.get('/lists/schools', function(req, res, next) {
  res.send(JSON.stringify(schools));
});

// GET ical file
router.get('/ical/:year/:season/:crns', function(req, res) {
  var crns = req.params['crns'].split(',');
  var format = req.params['format'];
  var year = req.params['year'];
  var season = req.params['season'];
  var crnNums = [{
    format,
    year,
    season,
    crns
  }];
  res.send(crnNums);
});

module.exports = router;
