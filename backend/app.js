'use strict'

var express = require('express');
var body_parser = require('body-parser');

var app = express();

var character_routes = require('./routes/character');


app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());


app.use('/api', character_routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});







module.exports = app;