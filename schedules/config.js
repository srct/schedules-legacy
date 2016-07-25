var config = {}

// Application Name
config.siteName = "Schedules";
// Application Description (subtitle)
config.siteDescription = "A simple application to add your class schedule to calendar applications like Outlook and Google Calendar."

// MongoDB config
config.mongoDBURL = 'mongodb://localhost/schedules';
config.ReloadDB = true;

config.schoolSlugs = {
  // Slug: Long Name
  'GMU': 'George Mason University',
  'VT' : 'Virginia Tech'
}

// Data files to load:
config.dataFiles = [
  'GMU2016F.min.json',
  'GMU2016S.min.json',
  'GMU2016SP.min.json'
]

module.exports = config;
