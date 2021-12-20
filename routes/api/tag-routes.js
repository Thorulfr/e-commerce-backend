// Imports
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Endpoint is /api/tags

// Get all tags
router.get('/', (req, res) => {
    Tag.findAll({
        // Include associated products
        include: {
            model: Product,
        },
    })
        .then((dbTagData) => res.json(dbTagData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one tag
router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id,
        },
        // Include associated products
        include: {
            model: Product,
        },
    })
        .then((dbTagData) => {
            if (!dbTagData) {
                res.status(404).json({
                    message: 'No tag found with this id',
                });
                return;
            }
            res.json(dbTagData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new tag
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name,
    })
        .then((dbTagData) => res.json(dbTagData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a tag
router.put('/:id', (req, res) => {
    Tag.update(
        {
            tag_name: req.body.tag_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbTagData) => {
            if (!dbTagData) {
                res.status(404).json({
                    message: 'No tag found with this id',
                });
                return;
            }
            res.json(dbTagData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a tag
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbTagData) => {
            if (!dbTagData) {
                res.status(404).json({
                    message: 'No tag found with this id',
                });
                return;
            }
            res.json(dbTagData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
