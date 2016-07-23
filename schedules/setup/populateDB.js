// grab the things we need
var mongoose = require('mongoose');
var Semester = require('../models/Semester');

var populateDB = function() {
  emptySemesters(); // NOTE: this is an asynchronous call
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
