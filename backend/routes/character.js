'use strict'

var express = require('express');
var CharacterController = require('../controllers/character');

var router = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/imagesCharacter'});

// --Rutas personaje
router.get('/test',CharacterController.test);
router.post('/save',CharacterController.save);
router.get('/characters',CharacterController.getCharacters);
router.get('/character/:id',CharacterController.getCharacter);
router.put('/character/:id',CharacterController.updateCharacter);
router.delete('/character/:id',CharacterController.delete);
router.post('/upload-image/:id', md_upload ,CharacterController.uploadImage);
router.get('/get-character-image/:id',CharacterController.getCharacterImage);



module.exports = router;