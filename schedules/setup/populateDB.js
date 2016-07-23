// grab the things we need
var mongoose = require('mongoose');
var Semester = require('../models/Semester');
var fs = require("fs");

//////
// DATA FILES HERE - TODO: Make this programmatic instead of hard coded
//////
var datafiles = [
  'GMU2016F.min.json',
  'GMU2016S.min.json',
  'GMU2016SP.min.json'
]

var populateDB = function() {
  emptySemesters(); // NOTE: this is an asynchronous call
  var semesters = [];
  for (var i = 0; i < datafiles.length; i++) {
    var datafile = datafiles[i];
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
