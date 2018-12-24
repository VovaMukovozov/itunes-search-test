const router = require("express").Router();
const { login,  register, auth, getAll, deleteOne, authMiddleware, addFavourites, getFavourites } = require('../controller/user');

router.get('/login', login);
router.get('/auth', auth);
router.post('/register', register);

router.get('/user', authMiddleware, getAll);
router.get('/user/favourite', authMiddleware, getFavourites);
router.put('/user/favourite', authMiddleware, addFavourites);
router.delete('/user/:id', authMiddleware, deleteOne);

module.exports = router;