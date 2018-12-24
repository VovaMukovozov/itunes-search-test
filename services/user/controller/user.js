const jwt = require('jsonwebtoken');
const config = require('config');
const userConf = config.get('user');
const User = require('../model/User');

const authMiddleware = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, userConf.secret);
        req.user = await User.authenticate(decoded);
        next();
    } catch (err) {
        err.statusCode = 403;
        next(err);
    }
};

const addFavourites = async (req, res, next) => {
    try {
        const name = req.body.name;
        await User.updateOrCreateFavourites(req.user._id, name);
        return res.json({});
    } catch (err) {
        next(err);
    }
};

const getFavourites = async (req, res, next) => {
    try {
        const favourites = await User.favourites(req.user._id);
        return res.json(favourites.reverse());
    } catch (err) {
        next(err);
    }
};

const auth = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, userConf.secret);
        await User.authenticate(decoded);
        return res.json({});
    } catch (err) {
        err.statusCode = 403;
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const user = await User.login(req.query);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

const register = async (req, res, next) => {
    try {
        // save search
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await User.find({}, {password: 0});
        return res.json(users);
    } catch (err) {
        next(err);
    }
};

const deleteOne = async (req, res, next) => {
    const id = req.params.id;
    try {

        await User.deleteOne({ _id: id });
        return res.json({});
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getFavourites,
    addFavourites,
    authMiddleware,
    getAll,
    deleteOne,
    auth,
    login,
    register
};