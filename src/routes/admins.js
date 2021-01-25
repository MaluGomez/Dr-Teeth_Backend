const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST ALL
router.get("/Administrador", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Administrador",
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
router.get("/Administrador/:usu", (req, res) => {
  const { usu } = req.params;
  mysqlConnection.query(
    "SELECT * FROM proyecto_drteeth.Administrador WHERE usuario REGEXP ? ;",
    [usu],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// CREATE ADMINS
router.post("/Administrador", (req, res) => {
  const { idAdministrador, nombres, apellidos, email, telefono, contrasena } = req.body;
  console.log(idAdministrador, nombres, apellidos, email, telefono, contrasena)
  const query = `
      SET @idAdministrador= ?;
      SET @nombres = ?;
      SET @apellidos = ?;
      SET @email = ?;
      SET @telefono = ?;
      SET @contrasena = ?;
      SET @rol =?;
      
      CALL newaddoreditAdministrador(@idAdministrador, @nombres, @apellidos, @email, @telefono, @contrasena, @rol);`;
  mysqlConnection.query(
    query,
    [idAdministrador, nombres, apellidos, email, telefono, contrasena, 0],
    (err) => {
      if (!err) {
        res.json({
          status: "Se ha creado correctamente el nuevo usuario administrador",
        });
      } else {
        res.json({
          status: "Se ha producido un error al crear el usuario!!!!",
        });
        console.log(err);
      }
    }
  );
});

// UPDATE ADMIN
router.put("/Administrador/:id", (req, res) => {
  const { nombres, apellidos, email, telefono, contrasena, rol } = req.body;
  const { id} = req.params;
  const query = `
      SET @idAdministrador= ?;
      SET @nombres = ?;
      SET @apellidos = ?;
      SET @email = ?;
      SET @telefono = ?;
      SET @contrasena = ?;
      SET @rol = ?;
      
      CALL newaddoreditAdministrador(@idAdministrador, @nombres, @apellidos, @email, @telefono , @contrasena, @rol);`;
  
  mysqlConnection.query(query, [idAdministrador, nombres, apellidos, email, telefono, contrasena, rol], (err) => {
    if (!err) {
      res.json({
        status: "Se han actualizado correctamente los datos del administrador",
      });
    } else {
      console.log(err);
    }
  });
});

// DELETE ADMIN
router.delete("/Administrador/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM proyecto_drteeth.Administrador WHERE idAdministrador = ?",
      [id],
      (err) => {
        if (!err) {
          res.json({ status: "Se ha eliminado correctamente el administrador" });
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;
