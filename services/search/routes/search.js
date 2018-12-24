const router = require("express").Router();
const { search, authMiddleware, addToFavourite } = require('../controller/search');

router.get('/search', authMiddleware, addToFavourite, search);

module.exports = router;