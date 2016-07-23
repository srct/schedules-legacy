// grab the things we need
var mongoose = require('mongoose');
var Semester = require('../models/Semester');
var fs = require("fs");

// Load site wide configurations
var config = require('../config');

var populateDB = function() {
  if (config.ReloadDB) {
    emptySemesters(); // NOTE: this is an asynchronous call
    var semesters = [];
    for (var i = 0; i < config.dataFiles.length; i++) {
      var datafile = config.dataFiles[i];
      var semester = new Semester(JSON.parse(fs.readFileSync("./setup/dataFiles/" + datafile)));
      semesters.push(semester.toObject());
    }
    Semester.collection.insert(semesters, function(err) {
      if (err) { console.error('Database Error!', err) }
      else {
        var findItems = Semester.find();
        findItems.select('-_id');
        findItems.select('-classes');

        findItems.exec(function(err, users) {
          if (err) {console.error(err); }
          else { console.log(users); }
        });
      }
    });
  }
}

// Empty collections
// http://stackoverflow.com/questions/10081452/drop-database-with-mongoose
function emptySemesters() {
  Semester.remove({}, handleEmptySemesters);
}

function handleEmptySemesters(err) {
  if (err) { console.error('Database Error!', err) }
  else{
    console.log('semesters removed');
    loadFiles();
  }
}

function loadFiles() {
  console.log('Test successful')
}

module.exports = populateDB;
