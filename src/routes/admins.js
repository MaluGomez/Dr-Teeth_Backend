const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST ALL
router.get("/admin", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM drteeth.administrador",
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
router.get("/admin/:usu", (req, res) => {
  const { usu } = req.params;
  mysqlConnection.query(
    "SELECT * FROM drteeth.administrador WHERE usuario REGEXP ? ;",
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
router.post("/admin", (req, res) => {
  const { idAdministrador, usuario, contrasena } = req.body;
  const query = `
      SET @idAdministrador= ?;
      SET @usuario = ?;
      SET @contrasena = ?;
      
      CALL adminAddOrEdit(@idAdministrador,  @usuario, @contrasena);`;
  mysqlConnection.query(
    query,
    [idAdministrador, usuario, contrasena],
    (err) => {
      if (!err) {
        res.json({
          status: "Se ha creado correctamente el nuevo usuario administrador",
        });
      } else {
        console.log(err);
      }
    }
  );
});

// UPDATE ADMIN
router.put("/admin/:id", (req, res) => {
  const { usuario, contrasena } = req.body;
  const { id } = req.params;
  const query = `
      SET @idAdministrador= ?;
      SET @usuario = ?;
      SET @contrasena = ?;
      
      CALL adminAddOrEdit(@idAdministrador,  @usuario, @contrasena);`;
  
  mysqlConnection.query(query, [id, usuario, contrasena], (err) => {
    if (!err) {
      res.json({
        status: "Se han actualizado correctamente los datos del administrador",
      });
    } else {
      console.log(err);
    }
  });
});

router.delete("/admin/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM drteeth.administrador WHERE idAdministrador = ?",
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
