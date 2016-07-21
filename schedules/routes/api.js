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
router.get('/api/lists/schools', function(req, res, next) {
  res.send(JSON.stringify(schools));
});

// GET ical file
router.get('/api/:format/:school/:semester/:crns', function(req, res) {
  var crns = req.params['crns'].split(',');
  var format = req.params['format'];
  var school = req.params['school'];
  var semester = req.params['semester'];
  var crnNums = [{
    format,
    year,
    season,
    crns
  }];
  res.send(crnNums);
});

module.exports = router;
