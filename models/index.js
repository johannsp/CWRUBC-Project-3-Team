'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// Add step of loading .env for override information during development
const dotenv    = require('dotenv').config();
//
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// If password was left as null in ../config/config.json file
// and a DB_PASSWORD environment variable was defined, possibly
// in a .env hidden file loaded by the dotenv module, then use
// the value of DB_PASSWORD to set config.password.
if (config.password === null && process.env.DB_PASSWORD) {
  config.password = process.env.DB_PASSWORD;
}

// Add here any extra, third-party API keys which should
// be read from a .env or configured as an environment
// variable in the case of Heroku.  Assume the existence
// of any needed environment variables: and return their
// values as one or more properties of the exported db
// object. 
//
//db.APIKey_Extra = process.env.Extra_API_KEY;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
