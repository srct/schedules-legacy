////////////////////////////////////////////////////////////////////////////////
//              Mason SRCT: Schedules Application Main File
// - This is the main file for the schedules app, which loads in all of the
//   configuration and routing files. Essentially, any other file eventually
//   leads here.
// - Take care with this file, it can hurt if you mess it up.
////////////////////////////////////////////////////////////////////////////////

// Load in the different packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseRedisCache = require("mongoose-redis-cache");

// Load site wide configurations
var config = require('./config');

// Load in Routes
// TODO: Make this a dynamic loading system that simply scans the directory
var routes = require('./routes/index');
var docs = require('./routes/docs');
var apiV1 = require('./routes/api/v1');

// Instantiate the application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to mongo
mongoose.connect(config.mongoDBURL);
// Setup the mongo redis caching for performance
mongooseRedisCache(mongoose);

// Populate initial data
var populateDB = require('./setup/populateDB');
populateDB();

// Actually use the loaded routes
// TODO: make this automatic instead of being manually entered
app.use('/', routes);
app.use('/docs', docs);
app.use('/api/v1', apiV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
