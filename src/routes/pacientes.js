const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

// LIST ALL
router.get("/Paciente", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Paciente",
    (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// LIST PACIENTE FOR IDODONTOLOGO
router.get("/Paciente/Odontologo/:idOdontologo", (req, res) => {
  const { idOdontologo } = req.params;
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Paciente  WHERE idOdontologo = ?",
    [idOdontologo],
    (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// LIST ONE
router.get("/Paciente/:word", (req, res) => {
  const { word } = req.params;
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Paciente WHERE nombres REGEXP ?  or apellidos REGEXP ?;",
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
router.post("/Paciente", (req, res) => {
  const {idPaciente,nombres,apellidos,numeroIdentificacion,tipoIdentificacion,fechaNacimiento,direccion,genero,rh,telefono,email,eps
  } = req.body;
  const query = `
        SET @idPaciente= ?;
        SET @nombres = ?;
        SET @apellidos = ?;
        SET @numeroIdentificacion = ?;
        SET @tipoIdentificacion = ?;
        SET @fechaNacimiento = ?;
        SET @direccion = ?;
        SET @genero = ?;
        SET @rh = ?;
        SET @telefono = ?;
        SET @email = ?;
        SET @eps = ?;

        
        CALL newaddoreditPaciente(@idPaciente, @nombres, @apellidos, @numeroIdentificacion, @tipoIdentificacion, @fechaNacimiento, @direccion, @genero, @rh, @telefono, @email, @eps);`;
  mysqlConnection.query(
    query,
    [idPaciente,nombres,apellidos,numeroIdentificacion,tipoIdentificacion,fechaNacimiento,direccion,genero,rh,telefono,email,eps],
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
router.put('/Paciente/:id', (req, res) => {
  const {nombres,apellidos,numeroIdentificacion,tipoIdentificacion,fechaNacimiento,direccion,genero,rh,telefono,email,eps,idOdontologo } = req.body;
  const { id } = req.params;
  const query = `
      SET @idPaciente= ?;
      SET @nombres = ?;
      SET @apellidos = ?;
      SET @numeroIdentificacion = ?;
      SET @tipoIdentificacion = ?;
      SET @fechaNacimiento = ?;
      SET @direccion = ?;
      SET @genero = ?;
      SET @rh = ?;
      SET @telefono = ?;
      SET @email = ?;
      SET @eps = ?;
      SET @idOdontologo = ?;

  
  CALL newaddoreditPaciente(@idPaciente, @nombres, @apellidos, @numeroIdentificacion, @tipoIdentificacion, @fechaNacimiento, @direccion, @genero, @rh, @telefono, @email, @eps, @idOdontologo);`;
  mysqlConnection.query(query, [id,nombres,apellidos,numeroIdentificacion,tipoIdentificacion,fechaNacimiento,direccion,genero,rh,telefono,email,eps,idOdontologo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Se actualizaron correctamente los datos del paciente '});
    } else {
      console.log(err);
    }
  });
});

// DELETE PACIENTE
router.delete("/Paciente/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM proyecto_drteeth.Paciente WHERE idPaciente = ?",
    [id],
    (err) => {
      if (!err) {
        res.json({ status: "Se ha eliminado correctamente los datos del paciente" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
