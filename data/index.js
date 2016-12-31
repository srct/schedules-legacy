/*
 * Schedules by Student Run Computing and Technology
 *
 * data/index.js
 *
 * This file takes care if the initial database population for the schedules
 * application. Parsing the information stored in the config as well as the raw
 * data exports (json in `./dataFiles`) is the first step. The file then
 * incrementally builds up the `university` object for each school. This object
 * contains inside of it an array of each `Semester` object, which in turn has
 * all of the thousands of `Section` objects.
 *
 * Sequelize (Schedules's ORM) takes care of converting the nested objects into
 * Has-Many relationships (forming a splitting tree of data from the base
 * university objects).
 */
var config = require('config')
var path = require('path')
var db = require(path.join(__dirname, '..', 'models', 'index'))

// pull needed objects out of the config and database objects
var schools = config.schools
var sequelize = db.sequelize
var models = db.sequelize.models

/*
 * Loop through each school stored in the configuration and build the
 * university object for it. Once this is built, it is added to the database.
 *
 * Once the university object's database operation completes, the semesters
 * are built for the university while the function moves onto the next
 * school at the same time. (yay promises!)
 *
 */
var syncUniversities = function () {
  schools.forEach(function (school) {
    var university = {
      'slug': school.slug,
      'name': school.name,
      'website': school.website
    }

    models.University.create(university).then(function () {
      syncSemesters(school)
    })
  })
}

/*
 * Loop through each semester for a given school stored in the configuration
 * and build the semester object for it. Once built, it is added to the
 * database and the sections are built immediately after each semester's
 * database operation completes.
 *
 * The function moves onto the next semester at the same time (yay promises!)
 */
var syncSemesters = function (school) {
  school.semesters.forEach(function (rawSemester) {
    var semester = {
      'slug': rawSemester.slug,
      'name': rawSemester.name,
      'university': school.slug
    }
    models.Semester.create(semester).then(function () {
      syncSections(rawSemester)
    })
  })
}

/*
 * Loop through each section of a given semester stored in the data files and
 * build the section object for it. Once built, it is added to the section
 * table. After the last section is loaded, all data will be finished being
 * added to the system.
 */
var syncSections = function (semester) {
  // Fetch the large JSON object file that stores all of the `Section` data for
  // this particular semester.
  var rawSections = require(path.join(__dirname, 'dataFiles', semester.dataFile))
  var finalSections = []

  for (var z = 0; z < rawSections.classes.length; z++) {
    var rawSection = rawSections.classes[z]
    var sectionDateRange = rawSection.session_templates[0].date_range

    var section = {
      'crn': rawSection.crn,
      'name': rawSection.name,
      'title': rawSection.title,
      'section': rawSection.section,
      'semester': semester.slug, // this is the field setting the relationship
      'instructor': '', // build this from all total instructors
      'campus': rawSection.campus,
      'location': '', // taken from only the first session_template
      'class_type': '', // taken from only the first session_template
      'startDate': sectionDateRange.substr(0, 12),
      'endDate': sectionDateRange.substr(15, 12),
      'Msession': false,
      'MtimeStart': null,
      'MtimeEnd': null,
      'Mlocation': null,
      'MclassType': null,
      'Tsession': false,
      'TtimeStart': null,
      'TtimeEnd': null,
      'Tlocation': null,
      'TclassType': null,
      'Wsession': false,
      'WtimeStart': null,
      'WtimeEnd': null,
      'Wlocation': null,
      'WclassType': null,
      'Rsession': false,
      'RtimeStart': null,
      'RtimeEnd': null,
      'Rlocation': null,
      'RclassType': null,
      'Fsession': false,
      'FtimeStart': null,
      'FtimeEnd': null,
      'Flocation': null,
      'FclassType': null
    }

    // Pull generic session information (location and type) from first
    // session template
    section.location = rawSection.session_templates[0].location
    section.class_type = rawSection.session_templates[0].class_type

    /*
     * Loop through each session template for each section/class. This loop
     * is what allows different days of the week to meet on different times
     * and or locations.
     */
    for (var c = 0; c < rawSection.session_templates.length; c++) {
      var session_template = rawSection.session_templates[c]
      // raw value of the start/stop times (to be processed to time values)
      var sessionTime = session_template.time;

      (['M', 'T', 'W', 'R', 'F']).forEach(function (day) {
        if (session_template.days.indexOf(day) > -1) {
          // if here then there is a session for the day
          section[day + 'session'] = true

          // set initial length for start time
          var startLength = 8
          // test if the time has 2 digits in hours (adjust length if yes)
          if (sessionTime[1] === ':') {
            startLength = 7
          }
          // set the start time
          section[day + 'timeStart'] = sessionTime.substr(0, startLength)

          // set initial length for end time
          var endLength = 8
          // test if the time has 2 digits in hours (adjust length if yes)
          if (sessionTime[sessionTime.length - 8] === ' ') {
            endLength = 7
          }
          var endOffset = sessionTime.length - endLength
          // set the end time
          section[day + 'timeEnd'] = sessionTime.substr(endOffset, endLength)

          // Note down location and type information
          section[day + 'location'] = session_template.location
          section[day + 'classType'] = session_template.class_type

          // If the instructor is not yet in the entire listing, add it.
          // TODO: Make this tolerant of multiple instructors defined for
          //       one section. (ie. currently if you have 2 instructors in
          //       one section it'll search for all of them as one term and
          //       consequently add all of them to the full list.) Should
          if (section.instructor.search(session_template.instructors) < 0) {
            section.instructor += session_template.instructors
          }
        }
      })
    }
    /* END JANKY WORKAROUND DESCRIBED IN ABOVE BLOCK */
    finalSections.push(section)
    // models.Section.create(section).catch(function (err) { console.log(err) })
  }
  models.Section.bulkCreate(finalSections).catch(function (err) { console.log(err) })
}

// Synchronize the database tables with their models (leave `{force: true}` to
// empty the database at each run)
// TODO: create a config switch that decides locally if the database is to be
//       completely wiped each and every run of the application or not.
sequelize.sync({ force: true }).then(syncUniversities)

