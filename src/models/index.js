const sequelize = require('../config/db');
const Product = require('./product');

const syncDb = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Product, syncDb };