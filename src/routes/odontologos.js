const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST ALL
router.get("/odontologo", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM drteeth.odontologo",
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
router.get("/odontologo/:word", (req, res) => {
  const { word } = req.params;
  mysqlConnection.query(
    "SELECT * FROM drteeth.odontologo WHERE nombre REGEXP ?  or apellido REGEXP ?;",
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
router.post("/odontologo", (req, res) => {
  const {
    idOdontologo,
    nombre,
    apellido,
    direccion,
    telefono,
    email,
    numeroRegistro,
    genero,
    fechaNacimiento,
    documentoIdentidad,
    celular,
    contrasena,
  } = req.body;
  const query = `
      SET @idOdontologo= ?;
      SET @nombre = ?;
      SET @apellido = ?;
      SET @direccion = ?;
      SET @telefono = ?;
      SET @email = ?;
      SET @numeroRegistro = ?;
      SET @genero = ?;
      SET @fechaNacimiento = ?;
      SET @documentoIdentidad = ?;
      SET @celular = ?;
      SET @contrasena = ?;

      
      CALL odontologoAddOrEdit(@idOdontologo, @nombre, @apellido, @direccion, @telefono, @email, @numeroRegistro, @genero, @fechaNacimiento, @documentoIdentidad, @celular, @contrasena);`;
  mysqlConnection.query(
    query,
    [
      idOdontologo,
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      numeroRegistro,
      genero,
      fechaNacimiento,
      documentoIdentidad,
      celular,
      contrasena,
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
