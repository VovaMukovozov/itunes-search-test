const rp = require('request-promise');
const redis = require('../redis');

const authMiddleware = async (req, res, next) => {
    try {
        const options = {
            uri: 'http://user:3000/auth',
            headers: {
                'Authorization': req.headers.authorization
            },
            json: true
        };
        await rp(options);
        next();
    } catch (err) {
        err.statusCode = 403;
        next(err);
    }
};

const addToFavourite = async (req, res, next) => {
    try {
        const options = {
            method: 'PUT',
            uri: 'http://user:3000/user/favourite',
            headers: {
                'Authorization': req.headers.authorization
            },
            body: {
                "name": req.query.q
            },
            json: true
        };
        await rp(options);
        next();
    } catch (err) {
        next(err);
    }
};


const search = async (req, res, next) => {

    try {
        const cache = await redis.getAsync(req.query.q);
        if(cache){
            return res.json(JSON.parse(cache));
        }
        const options = {
            uri: `https://itunes.apple.com/search?term=${req.query.q}&limit=25`,
            json: true
        };
        const result = await rp(options);
        redis.set(req.query.q, JSON.stringify(result));
        return res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addToFavourite,
    search,
    authMiddleware
};