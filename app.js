var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');

var apiRouter = require('./routes/api');

var config = require('./config/index');

var app = express();

mongoose.connect(config.db);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.get('/*', (req, res) => {
    res.json({
        success: false, msg: 'Wrong EndPoint'
    })
})

module.exports = app;