// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sectionSchema = require('./sectionSchema');

// create a schema
var semesterSchema = new Schema({
  school: { type: String, required: true },
  semester: { type: String, required: true },
  slug: { type: String, required: true },
  classes: [ sectionSchema ]
});

semesterSchema.set('redisCache', true);

// the schema is useless so far
// we need to create a model using it
var Semester = mongoose.model('Semester', semesterSchema);

// make this available to our users in our Node applications
module.exports = Semester;
