const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const userConf = config.get('user');

const schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    favourites: [{
        name: { type: String, required: true },
        count: { type: Number, default: 1 }
    }]
},{
    timestamps: true
});

const User = mongoose.model('User', schema);

User.updateOrCreateFavourites = async function (id, name) {
    const user = await User.findOne({ _id: id });
    if(user) {
        const  found = user.favourites.find(function(element) {
            return element.name === name;
        });
        if(found) {
            found.count++;
        } else {
            if(user.favourites.length >= 10){
                user.favourites.sort(function(a, b){return a.count-b.count});
                user.favourites.shift();
            }
            user.favourites.push({name}) ;
        }
        await user.save();
    }
    return user;
};

User.favourites = async function (id) {
    const user = await User.findOne({ _id: id });
    return user.favourites;
};

User.create = async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        const error = new Error('Username "' + userParam.username + '" is already taken');
        error.statusCode = 409;
        throw error;
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save search
    await user.save();
    return {
        _id: user._id,
        username: user.username,
        token: jwt.sign({ username: user.username, password: userParam.password }, userConf.secret)
    }
};

User.authenticate = async function authenticate({ username, password }) {
    // fetch search
    const user = await User.findOne({ username });
    // check password

    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
};

User.login = async function login(userParam) {
    const user = await User.authenticate(userParam);
    return {
        _id: user._id,
        username: user.username,
        token: jwt.sign({ username: user.username, password: userParam.password }, userConf.secret)
    }
};

module.exports = User;