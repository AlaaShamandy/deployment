const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorHandler = require('./lib/error-handler');
const dbconfig = require('./config/db');
const signin = require('./app/routes/signin');
const signup = require('./app/routes/signup');
const profile = require('./app/routes/profile');
const report = require('./app/routes/report');
const imagedb = require('./lib/imagedb');

const app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Establish the database connection */
mongoose.connect(dbconfig.url.prod, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
});

app.use('/api', signin.routes(router));
app.use('/api', signup.routes(router));
app.use('/api', profile.routes(router));
app.use('/api', report.routes(router));
app.use('/api', imagedb.routes(router));


/* Handle the error depending on the error status */
app.use(errorHandler.pageNotFoundHandler);
app.use(errorHandler.handler);

module.exports = app;
