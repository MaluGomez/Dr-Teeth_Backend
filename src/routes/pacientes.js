const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST ALL
router.get("/paciente", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM drteeth.paciente",
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
router.get("/paciente/:word", (req, res) => {
  const { word } = req.params;
  mysqlConnection.query(
    "SELECT * FROM drteeth.paciente WHERE nombre REGEXP ?  or apellidos REGEXP ?;",
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

// CREATE PACIENTE
router.post("/paciente", (req, res) => {
  const {
    idPaciente,
    nombre,
    apellidos,
    numeroIdentificacion,
    tipoDocumento,
    fechaNacimiento,
    direccion,
    edad,
    nacionalidad,
    genero,
    rh,
    telefono,
    email,
    eps,
    ciudad,
    idOdontologo,
  } = req.body;
  const query = `
        SET @idPaciente= ?;
        SET @nombre = ?;
        SET @apellidos = ?;
        SET @numeroIdentificacion = ?;
        SET @tipoDocumento = ?;
        SET @fechaNacimiento = ?;
        SET @direccion = ?;
        SET @edad = ?;
        SET @nacionalidad = ?;
        SET @genero = ?;
        SET @rh = ?;
        SET @telefono = ?;
        SET @email = ?;
        SET @eps = ?;
        SET @ciudad = ?;
        SET @idOdontologo = ?;
        
        CALL pacienteAddOrEdit(@idPaciente, @nombre, @apellidos, @numeroIdentificacion, @tipoDocumento, @fechaNacimiento, @direccion, @edad, @nacionalidad, @genero, @rh, @telefono, @email, @eps, @ciudad, @idOdontologo);`;
  mysqlConnection.query(
    query,
    [
      idPaciente,
      nombre,
      apellidos,
      numeroIdentificacion,
      tipoDocumento,
      fechaNacimiento,
      direccion,
      edad,
      nacionalidad,
      genero,
      rh,
      telefono,
      email,
      eps,
      ciudad,
      idOdontologo,
    ],
    (err) => {
      if (!err) {
        res.json({
          status: "Se ha creado correctamente un nuevo paciente",
        });
      } else {
        console.log(err);
      }
    }
  );
});

// UPDATE PACIENTE
router.put("/paciente/:id", (req, res) => {
  const {
    nombre,
    apellidos,
    numeroIdentificacion,
    tipoDocumento,
    fechaNacimiento,
    direccion,
    edad,
    nacionalidad,
    genero,
    rh,
    telefono,
    email,
    eps,
    ciudad,
    idOdontologo,
  } = req.body;
  const { id } = req.params;
  const query = `
        SET @idPaciente= ?;
        SET @nombre = ?;
        SET @apellidos = ?;
        SET @numeroIdentificacion = ?;
        SET @tipoDocumento = ?;
        SET @fechaNacimiento = ?;
        SET @direccion = ?;
        SET @edad = ?;
        SET @nacionalidad = ?;
        SET @genero = ?;
        SET @rh = ?;
        SET @telefono = ?;
        SET @email = ?;
        SET @eps = ?;
        SET @ciudad = ?;
        SET @idOdontologo = ?;
      
        CALL pacienteAddOrEdit(@idPaciente, @nombre, @apellidos, @numeroIdentificacion, @tipoDocumento, @fechaNacimiento, @direccion, @edad, @nacionalidad, @genero, @rh, @telefono, @email, @eps, @ciudad, @idOdontologo);`;

  mysqlConnection.query(
    query,
    [
      id,
      nombre,
      apellidos,
      numeroIdentificacion,
      tipoDocumento,
      fechaNacimiento,
      direccion,
      edad,
      nacionalidad,
      genero,
      rh,
      telefono,
      email,
      eps,
      ciudad,
      idOdontologo,
    ],
    (err) => {
      if (!err) {
        res.json({
          status: "Se han actualizado correctamente los datos del paciente",
        });
      } else {
        console.log(err);
      }
    }
  );
});

// DELETE PACIENTE
router.delete("/paciente/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM drteeth.paciente WHERE idPaciente = ?",
    [id],
    (err) => {
      if (!err) {
        res.json({ status: "Se ha eliminado correctamente el paciente" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
