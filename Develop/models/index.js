const router = require('express').Router();


// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany (Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    foreignKey: 'product_id',
    model: ProductTag,
    unique: false
  }}),

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany( Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  unique: false
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};