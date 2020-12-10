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

// UPDATE ODONTOLOGO
router.put("/odontologo/:id", (req, res) => {
  const {
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
  const { id } = req.params;
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
      id,
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
          status:
            "Se han actualizado correctamente los datos del odontologo",
        });
      } else {
        console.log(err);
      }
    }
  );
});

// DELETE ODONTOLOGO
router.delete("/odontologo/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM drteeth.odontologo WHERE idOdontologo = ?",
    [id],
    (err) => {
      if (!err) {
        res.json({ status: "Se ha eliminado correctamente el odontologo" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
