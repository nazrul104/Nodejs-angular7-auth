var createError = require('http-errors');
var express = require('express');
var swagger = require("swagger-node-express");
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({path: '.env.devoret'});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, " +
        "Origin,Accept,X-Access-Token, X-Requested-With, Content-Type, " +
        "Access-Control-Request-Method, Access-Control-Request-Headers, x-csrf-token, x-requested-with, authorization");

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function (err) {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
