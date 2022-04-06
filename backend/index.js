'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ScarletLaw', {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() =>{
            console.log('Te has conectado a Scarlet DB');

            app.listen(port, ()=>{
                console.log('Servidor en http://localhost:' + port);
            })
        });