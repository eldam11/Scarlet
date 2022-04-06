"use strict";

var validator = require("validator");
var fs = require("fs");
var path = require("path");
var Character = require("../models/character");
const { exists } = require("../models/character");

var controller = {
  test: (recibido, respuesta) => {
    return respuesta.status(200).send({
      status: "success",
      message: "Todo va bien.",
    });
  },

  save: (recibido, respuesta) => {
    var params = recibido.body;

    try {
      var validate_nombre = !validator.isEmpty(params.nombre);
      var validate_apellido = !validator.isEmpty(params.apellido);
      var validate_nivel = !validator.isEmpty(params.nivel);
      var validate_conocimiento = !validator.isEmpty(params.conocimiento);
      var validate_genero = !validator.isEmpty(params.genero);
      var validate_raza = !validator.isEmpty(params.raza);
      var validate_ramaPrincipal = !validator.isEmpty(params.ramaPrincipal);
      var validate_ramaSecundaria = !validator.isEmpty(params.ramaSecundaria);
    } catch (err) {
      return respuesta.status(500).send({
        status: "error",
        message: "Algo no ha ido bien.",
      });
    }
    if (
      validate_nombre &&
      validate_apellido &&
      validate_nivel &&
      validate_conocimiento &&
      validate_genero &&
      validate_raza &&
      validate_ramaPrincipal &&
      validate_ramaSecundaria
    ) {
      var character = new Character();
      character.nombre = params.nombre;
      character.apellido = params.apellido;
      character.nivel = params.nivel;
      character.conocimiento = params.conocimiento;
      character.genero = params.genero;
      character.raza = params.raza;
      character.ramaPrincipal = params.ramaPrincipal;
      character.ramaSecundaria = params.ramaSecundaria;
      character.imagen = null;

      character.save((err, characterSave) => {
        if (err || characterSave) {
          return respuesta.status(500).send({
            status: "error",
            message: "Algo no ha ido bien.",
          });
        } else {
          return respuesta.status(200).send({
            status: "success",
            message: "Todo va bien.",
            character: characterSave,
          });
        }
      });
    } else {
      return respuesta.status(500).send({
        status: "error",
        message: "Algo no ha ido bien.",
      });
    }
  },
  getCharacters: (recibido, respuesta) => {
    Character.find({})
      .sort("-_id")
      .exec((err, characters) => {
        if (err) {
          return respuesta.status(500).send({
            status: "error",
            message: "Algo no ha ido bien.",
          });
        }

        if (!characters) {
          return respuesta.status(404).send({
            status: "error",
            message: "No existen personajes.",
          });
        }
      });
  },
  getCharacter: (recibido, respuesta) => {
    var id = recibido.params.id;

    if (!id || id == null) {
      return respuesta.status(404).send({
        status: "error",
        message: "Algo no ha ido bien.",
      });
    } else {
      Character.findById(id, (err, characterRecover) => {
        if (err) {
          return respuesta.status(404).send({
            status: "error",
            message: "Algo no ha ido bien.",
          });
        }
        if (!characterRecover) {
          return respuesta.status(500).send({
            status: "error",
            message: "No existe.",
          });
        }

        return respuesta.status(200).send({
          status: "success",
          message: "Todo va bien.",
          character: characterRecover,
        });
      });
    }
  },
  updateCharacter: (recibido, respuesta) => {
    var id = recibido.params.id;
    var params = recibido.body;

    try {
      var validate_nombre = !validator.isEmpty(params.nombre);
      var validate_apellido = !validator.isEmpty(params.apellido);
      var validate_nivel = !validator.isEmpty(params.nivel);
      var validate_conocimiento = !validator.isEmpty(params.conocimiento);
      var validate_genero = !validator.isEmpty(params.genero);
      var validate_raza = !validator.isEmpty(params.raza);
      var validate_ramaPrincipal = !validator.isEmpty(params.ramaPrincipal);
      var validate_ramaSecundaria = !validator.isEmpty(params.ramaSecundaria);
    } catch (err) {
      return respuesta.status(500).send({
        status: "error",
        message: "Algo no ha ido bien.",
      });
    }
    if (
      validate_nombre &&
      validate_apellido &&
      validate_nivel &&
      validate_conocimiento &&
      validate_genero &&
      validate_raza &&
      validate_ramaPrincipal &&
      validate_ramaSecundaria
    ) {
      Character.findOneAndUpdate(
        { _id: id },
        params,
        { new: true },
        (err, characterUpdated) => {
          if (err || !characterUpdated) {
            return respuesta.status(400).send({
              status: "error",
              message: "No se pudo actualizar.",
            });
          }
          return respuesta.status(200).send({
            status: "success",
            message: "Todo va bien.",
            character: characterUpdated,
          });
        }
      );
    } else {
      return respuesta.status(400).send({
        status: "error",
        message: "No se pudo actualizar.",
      });
    }
  },
  delete: (recibido, respuesta) => {
    var id = recibido.params.id;
    Character.findOneAndDelete({ _id: id }, (err, characterDeleted) => {
      if (err) {
        return respuesta.status(404).send({
          status: "error",
          message: "Algo no ha ido bien.",
        });
      }
      if (!characterDeleted) {
        return respuesta.status(500).send({
          status: "error",
          message: "No existe.",
        });
      }
      return respuesta.status(200).send({
        status: "success",
        message: "Todo va bien.",
        character: characterDeleted,
      });
    });
  },
  uploadImage: (recibido, respuesta) => {
    var imageCharacter = "Imagen no subida";
    if (!recibido.files) {
      return respuesta.status(404).send({
        status: "error",
        message: "Algo no ha ido bien.",
      });
    }
    var file_path = recibido.files.file0.path;
    var file_split = file_path.split("\\");

    var file_name = file_split[2];
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    if (
      file_ext != "png" &&
      file_ext != "jpeg" &&
      file_ext != "jpg" &&
      file_ext != "gif"
    ) {
      fs.unlink(file_path, (err) => {
        return respuesta.status(600).send({
          status: "error",
          message: "Extension no valida.",
        });
      });
    } else {
      Character.findOneAndUpdate(
        { _id: id },
        { image: file_name },
        { new: true },
        (err, characterUpdated) => {
          if (err) {
            return respuesta.status(404).send({
              status: "error",
              message: "Algo no ha ido bien.",
            });
          }
          if (!characterUpdated) {
            return respuesta.status(500).send({
              status: "error",
              message: "No existe.",
            });
          }
          return respuesta.status(200).send({
            status: "success",
            message: "Todo va bien.",
            character: characterUpdated,
          });
        }
      );
    }
  },
  getCharacterImage: (recibido, respuesta) => {
    var imageCharacter = recibido.params.image;
    var path_file = './uploads/imagesCharacter/' + imageCharacter;

    if (fs.existsSync(path_file)) {
        return respuesta.sendFile(path.resolve(path_file));
    }else{
        return respuesta.status(500).send({
            status: 'error',
            message: 'No existe.'
        });
    }

  },
};

module.exports = controller;

/*
return respuesta.status(200).send({
            status: 'success',
            message: 'Todo va bien.'
        });

return respuesta.status(404).send({
            status: 'error',
            message: 'Algo no ha ido bien.'
        });

return respuesta.status(500).send({
            status: 'error',
            message: 'No existe.'
        });

*/
