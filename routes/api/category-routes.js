// Imports
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Endpoint is /api/categories

// Get all categories
router.get('/', (req, res) => {
    Category.findAll({
        // Include associated products
        include: {
            model: Product,
        },
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one category
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id,
        },
        // Include associated products
        include: {
            model: Product,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new category
router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a category
router.put('/:id', (req, res) => {
    Category.update(
        {
            category_name: req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No category found with this id',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a category
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No category found with this id',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
