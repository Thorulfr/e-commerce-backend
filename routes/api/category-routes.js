const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    Category.findAll({
        include: {
            model: Product,
        },
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Category.findOne({
        where: {
            id: req.params.id,
        },
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
    // be sure to include its associated Products
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
