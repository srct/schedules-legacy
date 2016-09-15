// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sectionSchema = new Schema({
  crn: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  section: { type: String, required: true },
  campus: { type: String, required: true },
  session_templates: [
    {
      date_range: { type: String, required: true },
      days: { type: String },
      time: { type: String },
      location: { type: String, required: true },
      class_type: { type: String, required: true },
      instructors: { type: String, required: true },
    }
  ],
  notification: { type: String, required: true }
});

sectionSchema.set('redisCache', true);

// make this available to our users in our Node applications
module.exports = sectionSchema;
