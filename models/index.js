var path = require('path')
var Sequelize = require('sequelize')
var config = require('config')

// get configuration for sequelize
//   worth noting that this changes depending on the environment
var sequelizeConf = config.get('sequelize')
sequelizeConf.logging = false

// make the new connection
var sequelize = new Sequelize(sequelizeConf)

// empty variable to load entire database into
var db = {}

var modelNames = [
  'Section',
  'Semester',
  'University'
]
// this section load every model file in the `models` dir into the database
modelNames.forEach(function (modelName) {
  var model = sequelize.import(path.join(__dirname, modelName))
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  console.log(modelName)
  if ('associate' in db[modelName]) {
    console.log('yep, it ran for this one')
    db[modelName].associate(db)
  }
})

// add the configs and module to the `db` object
db.sequelize = sequelize
db.Sequelize = Sequelize

// return the finished database object to the calling module
module.exports = db
