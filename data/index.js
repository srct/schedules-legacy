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
 * Sequelize (Schedules' ORM) takes care of converting the nested objects into
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

console.log('day')
// Synchronize the database tables with their models (leave `{force: true}` to
// empty the database at each run)
// TODO: create a config switch that decides locally if the database is to be
//       completely wiped each and every run of the application or not.
sequelize.sync({ force: true })

// Loop through each school stored in the configuration and build the
// university object for it. Everything else happens _insider_ this loop.
for (var i = 0; i < schools.length; i++) {
  var school = schools[i]

  // Barebone university object pulls data from config and leaves an empty
  // array for any `Semesters` to be stored.
  var university = {
    'slug': school.slug,
    'name': school.name,
    'website': school.website,
    'Semesters': []
  }

  /*
   * Look through each of the `university`'s semesters and build a `semester`
   * object for them. Again, most everything else happens in here.
   *
   * NOTE: This entire loop runs independently for _each_ different university
   *       configured in the `config.yaml` file.
   */
  for (var j = 0; j < school.semesters.length; j++) {
    // pull the raw semester data to work with (really to shorten further uses)
    var rawSemester = school.semesters[j]

    // Fetch the large JSON object file that stores all of the `Section` data
    // for this particular semester.
    var rawSections = require(path.join(__dirname, 'dataFiles', rawSemester.dataFile))

    // Build a basic semester object according to the ORM. Again, leaves an
    // empty array to be populated in the next loop.
    var semester = {
      'slug': rawSemester.slug,
      'name': rawSemester.name,
      'Sections': []
    }

    /*
     * Loop through all of the hundreds of classes for the current university's
     * semester being processed currently. Builds the base `section` object and
     * does some processing to get the raw data into the ORM's needed format.
     *
     * NOTE: This is done independently for each `Semester` in each
     *       `University`. Keep in mind that this loop is run a stupid amount
     *       before adding some crazy expensive processing here.
     */
    for (var z = 0; z < rawSections.classes.length; z++) {
      var rawSection = rawSections.classes[z]
      var sectionDateRange = rawSection.session_templates[0].date_range

      var section = {
        'crn': rawSection.crn,
        'name': rawSection.name,
        'title': rawSection.title,
        'section': rawSection.section,
        'instructors': '', // build this from all total instructors
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

        (['M', 'T', 'W', 'R', 'F']).forEach(function(day) {
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
            if (section.instructors.search(session_template.instructors) < 0) {
              section.instructors += session_template.instructors
            }
          }
        })
      }
      /* END JANKY WORKAROUND DESCRIBED IN ABOVE BLOCK */
      console.log(section)
      semester.Sections.push(section)
    }
    university.Semesters.push(semester)
  }

  // Actually add the data to the database and sync it.
  sequelize.sync().then(function () {
    return models.University.create(university, {
      include: [
        models.Semester
      ]
    })
  })
}
