// Imports
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Endpoint is /api/products

// Get all products
router.get('/', (req, res) => {
    Product.findAll({
        // Include associated categories and tags
        include: [
            {
                model: Category,
            },
            {
                model: Tag,
            },
        ],
    })
        .then((dbProductData) => res.json(dbProductData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one product
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id,
        },
        // Include associated categories and tags
        include: [
            {
                model: Category,
            },
            {
                model: Tag,
            },
        ],
    })
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create new product
router.post('/', (req, res) => {
    /* Expects:
        {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
        }
    */
    Product.create(req.body)
        .then((product) => {
            // If there are product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // If no product tags, just send the response
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// Update a product
router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            // Find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // Get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // Create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // Figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);
            // Run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Delete a product
router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
