// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products have one category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Categories have many products
Category.hasMany(Product, {
    foreignKey: 'category_id',
});

// Products have many tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id',
});

// Tags have many products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
