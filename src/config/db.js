const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const dbFile = process.env.DATABASE_FILE || path.join(__dirname, '../../senydrop.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile,
  logging: false
});

module.exports = sequelize;