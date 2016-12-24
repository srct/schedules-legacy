/*
 * Schedules by Student Run Computing and Technology
 *
 * routes/docs.js
 *
 * This routing file is for the documentation behind the application.
 *
 * Most of these should be basic renders of static templates that don't change.
 *
 * TODO: Look into just having these served by nginx on it's own?
 */

var express = require('express')
var router = express.Router()
var config = require('config')

// Load site wide configurations
var siteInfo = config.get('general')

router.get('/', function (req, res, next) {
  res.render('docs', { siteInfo })
})

module.exports = router
