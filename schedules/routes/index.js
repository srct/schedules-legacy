var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Semester = require('../models/Semester');

// Load site wide configurations
var config = require('../config');

router.get('/docs', function(req, res, next) {
  res.render('docs', { config });
})

// GET ical file
var jsonSlugCache = { slugs: [] };
router.get('/api/json/classes/:SEMSLUG', function(req, res, next) {
  var slug = req.params['SEMSLUG'];
  if (jsonSlugCache[slug])
  {
    jsonSlugCache[slug].timesUsed++;
    console.log(jsonSlugCache[slug].timesUsed)
    res.send(jsonSlugCache[slug]['value']);
  }
  else {
    // find each person with matching slug
    var query = Semester.findOne({ 'slug': slug });
    query.select('-_id -classes._id -classes.session_templates._id');
    query.exec(function (err, semester) {
      if (err || (! semester)) {
        res.json({
           'results' : 'error, try something different'
        })
      }
      else {
        if (jsonSlugCache.slugs.length > 10) {
          var leastUsedAmount = jsonSlugCache[jsonSlugCache.slugs[0]].timesUsed;
          var leastUsed = 0;
          for (var i = 0; i < jsonSlugCache.slugs.length; i++) {
            var amountUsed = jsonSlugCache[jsonSlugCache.slugs[i]].timesUsed;
            if (amountUsed < leastUsedAmount) {
              leastUsedAmount = amountUsed;
              leastUsed = i;
            }
          }
          delete jsonSlugCache[jsonSlugCache.slugs[leastUsed]];
          jsonSlugCache.slugs.splice(leastUsed, 1);
        }
        jsonSlugCache[slug] = {
          'timesUsed' : 1
        }
        jsonSlugCache[slug].value = JSON.stringify(semester);
        jsonSlugCache.slugs.push(slug);
        res.send(jsonSlugCache[slug].value);
      }
    })
  }
});

// TODO: Actually learn how to make this function set be passed around properly

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config });
})

module.exports = router;
