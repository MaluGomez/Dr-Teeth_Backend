const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');


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
    idOdontologo,nombres,apellidos,direccionAtencion,telefono,email,numeroRegistro,genero,fechaNacimiento,documentoIdentidad,tipoDoc,descripcion,contrasena
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
      
      CALL newaddoreditOdontologo(@idOdontologo, @nombres, @apellidos, @direccionAtencion, @telefono, @email, @numeroRegistro, @genero, @fechaNacimiento, @documentoIdentidad,  @tipoDoc, @descripcion, @contrasena, @rol);`;
      bcrypt.hash(contrasena, 10, (err, hash) => 
      {
        mysqlConnection.query(
          query,
          [
            idOdontologo,nombres,apellidos,direccionAtencion,telefono,email,numeroRegistro,genero,fechaNacimiento,documentoIdentidad,tipoDoc,descripcion,contrasena,1
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
});


//EDIT-----------------------------------------------------------------------------------------------------

router.put('/Odontologo', (req, res) => {
  const {nombres, apellidos, direccionAtencion, telefono, email, numeroRegistro, genero, fechaNacimiento, documentoIdentidad, descripcion, idOdontologo } = req.body;
  console.log(nombres, apellidos, direccionAtencion, telefono, email, numeroRegistro, genero, fechaNacimiento, documentoIdentidad, descripcion, idOdontologo )
  const query = `UPDATE Odontologo
  SET nombres =?,
  apellidos =?,
  direccionAtencion =?,
  telefono =?,
  email =?,
  numeroRegistro =?,
  genero =?,
  fechaNacimiento =?,
  documentoIdentidad =?,
  descripcion =?
  WHERE idOdontologo =?;`;
  mysqlConnection.query(query, [nombres, apellidos, direccionAtencion, telefono, email, numeroRegistro, genero, fechaNacimiento, documentoIdentidad, descripcion, idOdontologo], (err) => {
    if(!err) {
      res.json({status: 'Se actualizo correctamente el registro'});
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
