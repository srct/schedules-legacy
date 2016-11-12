// //////////////////////////////////////////////////////////////////////////////
//                 Mason SRCT: Schedules Documentation Routes
// - This routing file is for the documentation behind the scheduels app
// - Most of these should really just be basic render functions without anything
//   more complex that that.
// //////////////////////////////////////////////////////////////////////////////
var express = require('express')
var router = express.Router()
var config = require('config')

// Load site wide configurations
var siteInfo = config.get('general')

router.get('/', function (req, res, next) {
  res.render('docs', { siteInfo })
})

module.exports = router
