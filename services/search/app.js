const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', require('./routes/search'));

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

// error handler
app.use( (err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
});

module.exports = app;