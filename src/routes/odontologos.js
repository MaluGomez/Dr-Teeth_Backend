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
    descripcion,
    contrasena,
    rol,
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
      SET @descripcion = ?;
      SET @contrasena = ?;
      SET @rol = ?;
      SET @idAdministrador = ?;
      SET @idAsistente = ?;
      
      CALL newaddoreditOdontologo(@idOdontologo, @nombres, @apellidos, @direccionAtencion, @telefono, @email, @numeroRegistro, @genero, @fechaNacimiento, @documentoIdentidad,  @tipoDoc, @descripcion, @contrasena, @rol, @idAdministrador, @idAsistente);`;
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
      descripcion,
      contrasena,
      rol,
      idAdministrador,
      idAsistente,
    ],
    (err) => {
      if (!err) {
        res.json({
          status: "Se ha creado correctamente el nuevo odontólogo",
        });
      } else {
        console.log(err);
      }
    }
  );
});


module.exports = router;
