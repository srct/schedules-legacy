"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var env       = process.env.NODE_ENV || "development";
var config    = {};

config.env = env;
config.sequelize       = require(path.join(__dirname, 'sequelize.json'))[env];
config.schoolSemesters = require(path.join(__dirname, 'schoolSemesters.json'));
config.siteInfo        = require(path.join(__dirname, 'siteInfo.json'));

module.exports = config;

