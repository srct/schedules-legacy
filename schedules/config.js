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
config.dataFiles = [
  'GMU2016F.min.json',
  'GMU2016S.min.json',
  'GMU2016SP.min.json'
]

module.exports = config;
