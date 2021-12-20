// Imports
const router = require('express').Router();
const apiRoutes = require('./api');

// Prepend routes
router.use('/api', apiRoutes);

// Catch-all route
router.use((req, res) => {
    res.send('<h1>Wrong Route!</h1>');
});

module.exports = router;
