////////////////////////////////////////////////////////////////////////////////
//              Mason SRCT: Schedules Main Configuration File
// - This file holds many of the global options for ease of use. Some of these
//   settings are temporary because the dynamic methods have not been written in
//   yet.
////////////////////////////////////////////////////////////////////////////////
var config = {}

// Application Name
config.siteName = "Schedules";
// Application Description (subtitle)
config.siteDescription = "A simple application to add your class schedule to calendar applications like Outlook and Google Calendar."

// MongoDB config
config.mongoDBURL = 'mongodb://localhost/schedules';
config.ReloadDB = false;

// Object given to the front end to populate the semester and school selection
//   dropdown lists.
// TODO: Make this dynamic instead of hard coding it into the system.
config.schoolSlugs = {
  'schools': [
    'GMU',
    'VT'
  ],
  'GMU': {
    'longName': 'George Mason University',
    'semesters': [
      {
        slug: 'GMU2016F',
        longName: 'Fall 2016'
      },
      {
        slug: 'GMU2016S',
        longName: 'Summer 2016'
      },
      {
        slug: 'GMU2016SP',
        longName: 'Spring 2016'
      }
    ]
  },
  'VT' : {
    'longName': 'Virginia Tech',
    'semesters': []
  },
}

// Data files to load:
// TODO: Make this dynamic instead of hard coding it into the system. This is
//       neccessary in order to make it so that the system can be updated from
//       the site itself instead of relying on @patriot_down to upload the files
//       from the backend.
config.dataFiles = [
  'GMU2016F.min.json',
  'GMU2016S.min.json',
  'GMU2016SP.min.json'
]

module.exports = config;
