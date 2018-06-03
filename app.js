/* Library require */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');

/* router require */
var apiRouter = require('./routes/api');

/* config require */
var config = require('./config/index');

/* start express instance */
var app = express();

/* connect to database */
mongoose.connect(config.db)
    .then(connect => console.log('Connected To Database.'))
    .catch(error => console.log(error));

/* load middlewares */
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* router */
app.use('/api', apiRouter);
/* for other routes */
app.all('/*', (req, res) => {
    res.json({
        success: false, msg: 'Wrong EndPoint'
    });
});

module.exports = app;