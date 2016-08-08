var config = {}

// Application Name
config.siteName = "Schedules";
// Application Description (subtitle)
config.siteDescription = "A simple application to add your class schedule to calendar applications like Outlook and Google Calendar."

// MongoDB config
config.mongoDBURL = 'mongodb://localhost/schedules';
config.ReloadDB = false;

config.schoolSlugs = {
  'GMU': {
    'longName': 'George Mason University',
    'semesters': [
      {'GMU2016F': 'Fall 2016'},
      {'GMU2016S': 'Summer 2016'},
      {'GMU2016SP': 'Spring 2016'}
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
