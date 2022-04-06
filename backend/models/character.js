'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = Schema({
    nombre: String,
    apellido: String,
    nivel: Number,
    conocimiento: Number,
    genero: String,
    raza: String,
    ramaPrincipal: String,
    ramaSecundaria: String,
    imagen: String
});

module.exports = mongoose.model('Character',CharacterSchema);