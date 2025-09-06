const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sku: { type: DataTypes.STRING, unique: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  images: { type: DataTypes.TEXT },
  wc_product_id: { type: DataTypes.STRING },
  ml_item_id: { type: DataTypes.STRING }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;