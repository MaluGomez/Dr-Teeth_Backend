const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST ALL
router.get("/Odontologo", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Odontologo",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// LIST ONE
router.get("/Odontologo/:word", (req, res) => {
  const { word } = req.params;
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Odontologo WHERE nombres REGEXP ?  or apellidos REGEXP ?;",
    [word, word],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// CREATE ODONTOLOGO
router.post("/Odontologo", (req, res) => {
  const {
    idOdontologo,
    nombres,
    apellidos,
    direccionAtencion,
    telefono,
    email,
    numeroRegistro,
    genero,
    fechaNacimiento,
    documentoIdentidad,
    tipoDoc,
    nombreUsuario,
    descripcion,
    contrasena,
    idAdministrador,
    idAsistente,
  } = req.body;
  const query = `
      SET @idOdontologo= ?;
      SET @nombres = ?;
      SET @apellidos = ?;
      SET @direccionAtencion = ?;
      SET @telefono = ?;
      SET @email = ?;
      SET @numeroRegistro = ?;
      SET @genero = ?;
      SET @fechaNacimiento = ?;
      SET @documentoIdentidad = ?;
      SET @tipoDoc = ?;
      SET @nombreUsuario = ?;
      SET @descripcion = ?;
      SET @contrasena = ?;
      SET @idAdministrador = ?;
      SET @idAsistente = ?;
      
      CALL newaddoreditOdontologo(@idOdontologo, @nombres, @apellidos, @direccionAtencion, @telefono, @email, @numeroRegistro, @genero, @fechaNacimiento, @documentoIdentidad,  @tipoDoc, @nombreUsuario, @descripcion, @contrasena, @idAdministrador, @idAsistente);`;
  mysqlConnection.query(
    query,
    [
      idOdontologo,
      nombres,
      apellidos,
      direccionAtencion,
      telefono,
      email,
      numeroRegistro,
      genero,
      fechaNacimiento,
      documentoIdentidad,
      tipoDoc,
      nombreUsuario,
      descripcion,
      contrasena,
      idAdministrador,
      idAsistente,
    ],
    (err) => {
      if (!err) {
        res.json({
          status: "Se ha creado correctamente el nuevo odontologo",
        });
      } else {
        console.log(err);
      }
    }
  );
});


module.exports = router;
