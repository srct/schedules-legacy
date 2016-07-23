////
// Set up the app variables
//   Express.js
var express = require('express');
var app = express();
//  MongoDB/Mongoose API
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/schedules');
// End set up app variables
////
// Define section schema
var sectionSchema = new Schema({
  crn: String,
  name: String,
  title: String,
  section: String,
  campus: String,
  sessions: [{
    date_range: String,
    days: String,
    time: String,
    location: String,
    class_type: String,
    instructors: String
  }],
  notification: Number
});
// end define section schema
////
// define Section model
var Section = mongoose.model('Section', sectionSchema);
// end define section object model
////
// define API endpoints
//   this should be fairly self explanitory
app.get('/api/:format/:year/:season/:crns', function(req, res) {
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
// end define API endpoints
////
// define listening port
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
// end app
////
