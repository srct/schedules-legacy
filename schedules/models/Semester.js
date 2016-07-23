// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var semesterSchema = new Schema({
  school: { type: String, required: true },
  semester: { type: String, required: true },
  slug: { type: String, required: true },
  classes: [
    {
      crn: { type: String, required: true },
      name: { type: String, required: true },
      title: { type: String, required: true },
      section: { type: String, required: true },
      campus: { type: String, required: true },
      session_templates: [
        {
          date_range: { type: String, required: true },
          days: { type: String, required: true },
          time: { type: String, required: true },
          location: { type: String, required: true },
          class_type: { type: String, required: true },
          instructors: { type: String, required: true },
        }
      ],
      notification: { type: String, required: true }
    }
  ]
});

// the schema is useless so far
// we need to create a model using it
var Semester = mongoose.model('Semester', semesterSchema);

// make this available to our users in our Node applications
module.exports = Semester;
