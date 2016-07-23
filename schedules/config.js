var config = {}

// Application Name
config.siteName = "Schedules";
// Application Description (subtitle)
config.siteDescription = "A simple application to add your class schedule to calendar applications like Outlook and Google Calendar."

// MongoDB config
config.mongoDBURL = 'mongodb://localhost/myappdatabase';

config.schoolSlugs = {
  // Slug: Long Name
  'GMU': 'George Mason University',
  'VT' : 'Virginia Tech'
}

// Data files to load:
config.dataFiles = [
  {
    // URL Slug for the API
    slug: 'GMU',
    // List of .json files to import (place in setup folder under SLUG folder)
    dataSource: [
      'fall2016GMU' // IE: get's put in 'setup/GMU/fall2016GMU.json'
    ],
    // Whether to actually import the data
    enabled: false
  }
]

module.exports = config;
