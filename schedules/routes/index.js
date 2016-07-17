var express = require('express');
var router = express.Router();

router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'Schedules' });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedules' });
});

module.exports = router;
